import type { Metadata } from "next";
import LouisianaTigersArticle from "@/components/LouisianaTigersArticle";
import { getSocialMetadata } from "@/lib/seo";

const notePath = "/en/biblioteca/cuadernos/louisiana-tigers-special-battalion-1862";
const noteTitle = "Louisiana Tigers — Special Battalion 1862 | Julio Cabos";
const noteDescription =
  "Painting process, historical documentation and finished work for Louisiana Tigers — Special Battalion 1862, by Julio Cabos.";

export const metadata: Metadata = {
  title: noteTitle,
  description: noteDescription,
  alternates: {
    canonical: notePath,
    languages: {
      "x-default": "/biblioteca/cuadernos/louisiana-tigers-special-battalion-1862",
      es: "/biblioteca/cuadernos/louisiana-tigers-special-battalion-1862",
      en: notePath,
      it: "/it/biblioteca/cuadernos/louisiana-tigers-special-battalion-1862",
    },
  },
  ...getSocialMetadata({
    title: noteTitle,
    description: noteDescription,
    locale: "en_GB",
    path: notePath,
    image: "/images/notas-julio/louisiana-tigers/portada.jpeg",
  }),
};

export default function EnglishLouisianaTigersPage() {
  return <LouisianaTigersArticle articleId="louisiana-tigers-special-battalion-1862" locale="en" />;
}
