import type { Metadata, Viewport } from "next";
import { Fraunces, Inter_Tight } from "next/font/google";
import "./globals.css";
import { getJsonLd } from "@/lib/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const inter = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Julio Cabos — Pintura de miniaturas",
  description:
    "Pintura de miniaturas con criterio artístico. Formación presencial y online, galería y contacto.",
  keywords: [
    "pintura de miniaturas",
    "Julio Cabos",
    "miniature painting",
    "cursos pintura miniaturas",
    "formación miniaturas",
  ],
  authors: [{ name: "Julio Cabos" }],
  creator: "Julio Cabos",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Julio Cabos — Pintura de miniaturas",
    description: "Pintura de miniaturas con criterio artístico.",
    type: "website",
    locale: "es_ES",
    siteName: "Julio Cabos",
    url: "/",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Julio Cabos — Pintura de miniaturas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Julio Cabos — Pintura de miniaturas",
    description: "Pintura de miniaturas con criterio artístico.",
    images: ["/og-image.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = getJsonLd(SITE_URL);

  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
