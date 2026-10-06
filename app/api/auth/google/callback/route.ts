import { NextResponse } from "next/server";
import {
  ADMIN_OAUTH_STATE_COOKIE,
  createAdminSessionCookie,
  createAdminSessionHandoffToken,
  isAllowedAdminEmail,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

interface GoogleUserInfo {
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
}

function getGoogleClientId() {
  return process.env.GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_ID;
}

function getGoogleClientSecret() {
  return process.env.GOOGLE_CLIENT_SECRET || process.env.AUTH_GOOGLE_SECRET;
}

function redirectToLogin(request: Request, error: string) {
  return NextResponse.redirect(
    new URL(`/admin/login?error=${error}`, request.url),
    303
  );
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const clientId = getGoogleClientId();
  const clientSecret = getGoogleClientSecret();

  const cookieHeader = request.headers.get("cookie") ?? "";
  const stateCookie = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_OAUTH_STATE_COOKIE}=`))
    ?.split("=")[1];

  if (!code || !state || !stateCookie || state !== stateCookie) {
    return redirectToLogin(request, "invalid-state");
  }

  if (!clientId || !clientSecret) {
    return redirectToLogin(request, "missing-google-config");
  }

  const redirectUri = new URL("/api/auth/google/callback", request.url).toString();
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
    }),
  });

  if (!tokenResponse.ok) {
    return redirectToLogin(request, "google-token");
  }

  const tokenPayload = (await tokenResponse.json()) as {
    access_token?: string;
  };

  if (!tokenPayload.access_token) {
    return redirectToLogin(request, "google-token");
  }

  const userInfoResponse = await fetch(
    "https://www.googleapis.com/oauth2/v3/userinfo",
    {
      headers: {
        Authorization: `Bearer ${tokenPayload.access_token}`,
      },
    }
  );

  if (!userInfoResponse.ok) {
    return redirectToLogin(request, "google-user");
  }

  const userInfo = (await userInfoResponse.json()) as GoogleUserInfo;
  const email = userInfo.email?.toLowerCase();

  if (!email || userInfo.email_verified === false || !isAllowedAdminEmail(email)) {
    return redirectToLogin(request, "not-allowed");
  }

  const sessionCookie = await createAdminSessionCookie({
    email,
    name: userInfo.name,
    picture: userInfo.picture,
  });
  const handoffToken = await createAdminSessionHandoffToken(sessionCookie);
  // Finish OAuth with a normal HTML response instead of setting the session
  // cookie on a cross-site redirect response. Some browsers discard cookies
  // set on that redirect chain before the first /admin request.
  const response = new NextResponse(
    `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>Accediendo…</title></head><body><p>Accediendo al panel…</p><form id="session-handoff" method="post" action="/api/auth/google/complete"><input type="hidden" name="handoff" value="${handoffToken}"><noscript><button type="submit">Continuar al panel</button></noscript></form><script>document.getElementById("session-handoff").submit();</script></body></html>`,
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
        "Content-Type": "text/html; charset=utf-8",
      },
    }
  );

  response.cookies.delete(ADMIN_OAUTH_STATE_COOKIE);

  return response;
}
