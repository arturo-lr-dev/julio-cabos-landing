import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { GA_ID, rootClassName, SITE_URL } from "@/app/root-config";
import CookieConsent from "@/components/CookieConsent";
import { getJsonLd } from "@/lib/schema";
import { getSocialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Julio Cabos — Pintura de miniaturas",
  description:
    "Pintura de miniaturas con criterio artístico. Formación presencial y online, galería y contacto.",
  authors: [{ name: "Julio Cabos" }],
  creator: "Julio Cabos",
  alternates: {
    canonical: "/",
    languages: {
      "x-default": "/",
      es: "/",
      en: "/en",
      it: "/it",
    },
  },
  robots: { index: true, follow: true },
  ...getSocialMetadata({
    title: "Julio Cabos — Pintura de miniaturas",
    description: "Pintura de miniaturas con criterio artístico.",
    locale: "es_ES",
    path: "/",
  }),
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function SpanishRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getJsonLd(SITE_URL);

  return (
    <html lang="es" className={rootClassName}>
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
