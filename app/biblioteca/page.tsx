import type { Metadata } from "next";
import DocumentLanguage from "@/components/DocumentLanguage";
import LibraryPageClient from "@/components/LibraryPageClient";
import { libraryPublications } from "@/lib/library-content";
import type { Locale } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Biblioteca — Julio Cabos",
  description:
    "Libros, manuales técnicos, guías y colaboraciones editoriales de Julio Cabos a lo largo de más de dos décadas.",
  alternates: {
    canonical: "/biblioteca",
    languages: {
      es: "/biblioteca",
      en: "/en/biblioteca",
      it: "/it/biblioteca",
    },
  },
  openGraph: {
    title: "Biblioteca — Julio Cabos",
    description: "El archivo editorial del estudio de Julio Cabos.",
    url: "/biblioteca",
    locale: "es_ES",
  },
};

export function PublicLibraryPage({ locale = "es" }: { locale?: Locale }) {
  return (
    <>
      <DocumentLanguage locale={locale} />
      <LibraryPageClient publications={libraryPublications} locale={locale} />
    </>
  );
}

export default function LibraryPage() {
  return <PublicLibraryPage locale="es" />;
}
