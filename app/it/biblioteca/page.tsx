import type { Metadata } from "next";
import { PublicLibraryPage } from "@/app/(es)/biblioteca/page";
import { getSocialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Biblioteca — Julio Cabos",
  description:
    "Libri, manuali tecnici, guide e collaborazioni editoriali di Julio Cabos raccolti in oltre due decenni.",
  alternates: {
    canonical: "/it/biblioteca",
    languages: {
      "x-default": "/biblioteca",
      es: "/biblioteca",
      en: "/en/biblioteca",
      it: "/it/biblioteca",
    },
  },
  ...getSocialMetadata({
    title: "Biblioteca — Julio Cabos",
    description: "L'archivio editoriale dell'atelier di Julio Cabos.",
    locale: "it_IT",
    path: "/it/biblioteca",
  }),
};

export default function ItalianLibraryPage() {
  return <PublicLibraryPage locale="it" />;
}
