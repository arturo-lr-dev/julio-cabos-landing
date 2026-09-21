import type { Metadata } from "next";
import LibraryPageClient from "@/components/LibraryPageClient";
import { libraryPublications } from "@/lib/library-content";
import type { Locale } from "@/lib/site-content";
import { getSocialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Biblioteca — Julio Cabos",
  description:
    "Libros, manuales técnicos, guías y colaboraciones editoriales de Julio Cabos a lo largo de más de dos décadas.",
  alternates: {
    canonical: "/biblioteca",
    languages: {
      "x-default": "/biblioteca",
      es: "/biblioteca",
      en: "/en/biblioteca",
      it: "/it/biblioteca",
    },
  },
  ...getSocialMetadata({
    title: "Biblioteca — Julio Cabos",
    description: "El archivo editorial del estudio de Julio Cabos.",
    locale: "es_ES",
    path: "/biblioteca",
  }),
};

export function PublicLibraryPage({ locale = "es" }: { locale?: Locale }) {
  return <LibraryPageClient publications={libraryPublications} locale={locale} />;
}

export default function LibraryPage() {
  return <PublicLibraryPage locale="es" />;
}
