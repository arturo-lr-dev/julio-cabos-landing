import type { Metadata } from "next";
import LouisianaTigersArticle from "@/components/LouisianaTigersArticle";
import { getSocialMetadata } from "@/lib/seo";
import { libraryPublications } from "@/lib/library-content";

const notePath = "/biblioteca/cuadernos/louisiana-tigers-special-battalion-1862";
const noteTitle = "Louisiana Tigers — Special Battalion 1862 | Julio Cabos";
const noteDescription =
  "Proceso de pintura, documentación histórica y obra terminada del Louisiana Tigers — Special Battalion 1862, por Julio Cabos.";
const noteId = "louisiana-tigers-special-battalion-1862";

if (!libraryPublications.some((publication) => publication.id === noteId)) {
  throw new Error(`No se encontró la publicación de Biblioteca para ${noteId}`);
}

export const metadata: Metadata = {
  title: noteTitle,
  description: noteDescription,
  alternates: {
    canonical: notePath,
    languages: {
      "x-default": notePath,
      es: notePath,
      en: "/en/biblioteca/cuadernos/louisiana-tigers-special-battalion-1862",
      it: "/it/biblioteca/cuadernos/louisiana-tigers-special-battalion-1862",
    },
  },
  ...getSocialMetadata({
    title: noteTitle,
    description: noteDescription,
    locale: "es_ES",
    path: notePath,
    image: "/images/notas-julio/louisiana-tigers/portada.jpeg",
  }),
};

export default function LouisianaTigersPage() {
  return <LouisianaTigersArticle articleId={noteId} locale="es" />;
}
