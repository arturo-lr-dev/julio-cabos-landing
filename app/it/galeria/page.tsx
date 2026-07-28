import type { Metadata } from "next";
import { PublicGalleryPage } from "@/app/galeria/page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galleria — Julio Cabos",
  description:
    "Opere di miniatura pubblicate da Julio Cabos con categoria, scala e dettagli del progetto.",
  alternates: {
    canonical: "/it/galeria",
    languages: {
      es: "/galeria",
      en: "/en/galeria",
      it: "/it/galeria",
    },
  },
};

export default async function ItalianGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ filtro?: string }>;
}) {
  const params = await searchParams;

  return <PublicGalleryPage filter={params.filtro} locale="it" />;
}
