import { NextResponse } from "next/server";
import {
  ADMIN_OAUTH_STATE_COOKIE,
  ADMIN_SESSION_COOKIE,
} from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL("/admin/login", request.url));

  response.cookies.delete(ADMIN_SESSION_COOKIE);
  response.cookies.delete(ADMIN_OAUTH_STATE_COOKIE);

  return response;
}
