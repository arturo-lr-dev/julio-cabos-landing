import type { Metadata } from "next";
import { PublicLibraryPage } from "@/app/biblioteca/page";

export const metadata: Metadata = {
  title: "Biblioteca — Julio Cabos",
  description:
    "Libri, manuali tecnici, guide e collaborazioni editoriali di Julio Cabos raccolti in oltre due decenni.",
  alternates: {
    canonical: "/it/biblioteca",
    languages: {
      es: "/biblioteca",
      en: "/en/biblioteca",
      it: "/it/biblioteca",
    },
  },
  openGraph: {
    title: "Biblioteca — Julio Cabos",
    description: "L'archivio editoriale dell'atelier di Julio Cabos.",
    url: "/it/biblioteca",
    locale: "it_IT",
  },
};

export default function ItalianLibraryPage() {
  return <PublicLibraryPage locale="it" />;
}
