import type { Metadata } from "next";
import LouisianaTigersArticle from "@/components/LouisianaTigersArticle";
import { getSocialMetadata } from "@/lib/seo";

const notePath = "/it/biblioteca/cuadernos/louisiana-tigers-special-battalion-1862";
const noteTitle = "Louisiana Tigers — Battaglione Speciale 1862 | Julio Cabos";
const noteDescription =
  "Processo di pittura, documentazione storica e opera terminata dei Louisiana Tigers — Battaglione Speciale 1862, di Julio Cabos.";

export const metadata: Metadata = {
  title: noteTitle,
  description: noteDescription,
  alternates: {
    canonical: notePath,
    languages: {
      "x-default": "/biblioteca/cuadernos/louisiana-tigers-special-battalion-1862",
      es: "/biblioteca/cuadernos/louisiana-tigers-special-battalion-1862",
      en: "/en/biblioteca/cuadernos/louisiana-tigers-special-battalion-1862",
      it: notePath,
    },
  },
  ...getSocialMetadata({
    title: noteTitle,
    description: noteDescription,
    locale: "it_IT",
    path: notePath,
    image: "/images/notas-julio/louisiana-tigers/portada.jpeg",
  }),
};

export default function ItalianLouisianaTigersPage() {
  return <LouisianaTigersArticle articleId="louisiana-tigers-special-battalion-1862" locale="it" />;
}
