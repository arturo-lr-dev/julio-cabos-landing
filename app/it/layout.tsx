import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { GA_ID, rootClassName, SITE_URL } from "@/app/root-config";
import CookieConsent from "@/components/CookieConsent";
import { getJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  authors: [{ name: "Julio Cabos" }],
  creator: "Julio Cabos",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function ItalianRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getJsonLd(SITE_URL);

  return (
    <html lang="it" className={rootClassName}>
      <body className="min-h-screen bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <CookieConsent
          gaId={GA_ID}
          isProduction={process.env.NODE_ENV === "production"}
        />
      </body>
    </html>
  );
}
