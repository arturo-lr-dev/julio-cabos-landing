import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Julio Cabos | Pintura de Miniaturas",
  description:
    "Pintura de miniaturas con criterio artístico. Formación presencial y online, galería y contacto.",
  keywords: [
    "pintura de miniaturas",
    "Julio Cabos",
    "miniature painting",
    "cursos pintura miniaturas",
    "formación miniaturas",
  ],
  openGraph: {
    title: "Julio Cabos | Pintura de Miniaturas",
    description: "Pintura de miniaturas con criterio artístico.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="antialiased">
      <body className="min-h-screen bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
