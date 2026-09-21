import type { Metadata } from "next";
import { PublicGalleryPage } from "@/app/(es)/galeria/page";
import { getSocialMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galleria — Julio Cabos",
  description:
    "Opere di miniatura pubblicate da Julio Cabos con categoria, scala e dettagli del progetto.",
  alternates: {
    canonical: "/it/galeria",
    languages: {
      "x-default": "/galeria",
      es: "/galeria",
      en: "/en/galeria",
      it: "/it/galeria",
    },
  },
  ...getSocialMetadata({
    title: "Galleria — Julio Cabos",
    description:
      "Opere di miniatura pubblicate da Julio Cabos con categoria, scala e dettagli del progetto.",
    locale: "it_IT",
    path: "/it/galeria",
  }),
};

export default async function ItalianGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ filtro?: string }>;
}) {
  const params = await searchParams;

  return <PublicGalleryPage filter={params.filtro} locale="it" />;
}
