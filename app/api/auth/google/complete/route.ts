import { NextResponse } from "next/server";
import {
  ADMIN_OAUTH_STATE_COOKIE,
  ADMIN_SESSION_COOKIE,
  getSecureCookieOptions,
  verifyAdminSessionCookie,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const sessionValue = formData.get("session");
  const session = await verifyAdminSessionCookie(
    typeof sessionValue === "string" ? sessionValue : null
  );

  if (!session) {
    return NextResponse.redirect(
      new URL("/admin/login?error=invalid-session", request.url),
      303
    );
  }

  const response = NextResponse.redirect(new URL("/admin", request.url), 303);
  response.cookies.set(ADMIN_SESSION_COOKIE, sessionValue as string, {
    ...getSecureCookieOptions(),
    maxAge: 60 * 60 * 24 * 7,
  });
  response.cookies.delete(ADMIN_OAUTH_STATE_COOKIE);

  return response;
}
