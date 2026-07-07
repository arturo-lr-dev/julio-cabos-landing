import { NextResponse } from "next/server";
import {
  ADMIN_OAUTH_STATE_COOKIE,
  ADMIN_SESSION_COOKIE,
  createAdminSessionCookie,
  getSecureCookieOptions,
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
  return NextResponse.redirect(new URL(`/admin/login?error=${error}`, request.url));
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
  const response = NextResponse.redirect(new URL("/admin", request.url));

  response.cookies.set(ADMIN_SESSION_COOKIE, sessionCookie, {
    ...getSecureCookieOptions(),
    maxAge: 60 * 60 * 24 * 7,
  });
  response.cookies.delete(ADMIN_OAUTH_STATE_COOKIE);

  return response;
}
