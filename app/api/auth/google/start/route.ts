import { NextResponse } from "next/server";
import {
  ADMIN_OAUTH_STATE_COOKIE,
  getSecureCookieOptions,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

function getGoogleClientId() {
  return process.env.GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_ID;
}

function createState() {
  const bytes = new Uint8Array(24);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function GET(request: Request) {
  const clientId = getGoogleClientId();

  if (!clientId) {
    return NextResponse.redirect(
      new URL("/admin/login?error=missing-google-config", request.url)
    );
  }

  const state = createState();
  const redirectUri = new URL("/api/auth/google/callback", request.url).toString();
  const googleUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");

  googleUrl.searchParams.set("client_id", clientId);
  googleUrl.searchParams.set("redirect_uri", redirectUri);
  googleUrl.searchParams.set("response_type", "code");
  googleUrl.searchParams.set("scope", "openid email profile");
  googleUrl.searchParams.set("state", state);
  googleUrl.searchParams.set("prompt", "select_account");

  const response = NextResponse.redirect(googleUrl);
  response.cookies.set(ADMIN_OAUTH_STATE_COOKIE, state, {
    ...getSecureCookieOptions(),
    maxAge: 60 * 10,
  });

  return response;
}
