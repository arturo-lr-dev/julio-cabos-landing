import type { Viewport } from "next";
import { cookies } from "next/headers";
import "@/app/globals.css";
import { rootClassName } from "@/app/root-config";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSessionCookie,
} from "@/lib/admin-auth";
import { getInquiriesFromContent } from "@/lib/inquiry-content";
import AdminShell from "./AdminShell";

export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const adminSession = await verifyAdminSessionCookie(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  );
  const inquiries = await getInquiriesFromContent();
  const unreadInquiryCount = inquiries.filter(
    (inquiry) => inquiry.status === "new"
  ).length;

  return (
    <html lang="es" className={rootClassName}>
      <body className="min-h-screen bg-background text-foreground font-sans">
        <AdminShell
          adminName={adminSession?.name || "Administrador"}
          adminEmail={adminSession?.email || ""}
          adminPicture={adminSession?.picture}
          unreadInquiryCount={unreadInquiryCount}
        >
          {children}
        </AdminShell>
      </body>
    </html>
  );
}
