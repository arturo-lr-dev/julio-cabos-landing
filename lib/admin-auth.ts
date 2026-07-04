export const ADMIN_SESSION_COOKIE = "julio_admin_session";
export const ADMIN_OAUTH_STATE_COOKIE = "julio_admin_oauth_state";

export interface AdminSession {
  email: string;
  name?: string;
  picture?: string;
  exp: number;
}

const defaultAllowedEmails = ["juliocabosg@gmail.com", "manuelmoralesg2@gmail.com"];

function getAuthSecret() {
  return (
    process.env.AUTH_SECRET ||
    process.env.ADMIN_AUTH_SECRET ||
    "dev-only-change-this-secret-before-production"
  );
}

export function getAllowedAdminEmails() {
  return (process.env.ADMIN_ALLOWED_EMAILS || defaultAllowedEmails.join(","))
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdminEmail(email: string) {
  return getAllowedAdminEmails().includes(email.trim().toLowerCase());
}

function base64UrlEncode(value: string | ArrayBuffer) {
  const bytes =
    typeof value === "string"
      ? new TextEncoder().encode(value)
      : new Uint8Array(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function base64UrlDecode(value: string) {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    Math.ceil(value.length / 4) * 4,
    "="
  );
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new TextDecoder().decode(bytes);
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getAuthSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(value)
  );

  return base64UrlEncode(signature);
}

export async function createAdminSessionCookie(
  session: Omit<AdminSession, "exp">,
  maxAgeSeconds = 60 * 60 * 24 * 7
) {
  const payload: AdminSession = {
    ...session,
    email: session.email.toLowerCase(),
    exp: Math.floor(Date.now() / 1000) + maxAgeSeconds,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = await sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export async function verifyAdminSessionCookie(
  cookieValue?: string | null
): Promise<AdminSession | null> {
  if (!cookieValue) return null;

  const [encodedPayload, signature] = cookieValue.split(".");
  if (!encodedPayload || !signature) return null;

  const expectedSignature = await sign(encodedPayload);
  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as AdminSession;
    const now = Math.floor(Date.now() / 1000);

    if (!payload.email || payload.exp < now) return null;
    if (!isAllowedAdminEmail(payload.email)) return null;

    return payload;
  } catch {
    return null;
  }
}

export function getSecureCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}
