import GalleryPageClient from "@/app/galeria/GalleryPageClient";
import { getGalleryWorksFromContent } from "@/lib/work-content";
import type { Locale } from "@/lib/site-content";
import type { GalleryCategory } from "@/lib/work-types";
import type { Metadata } from "next";
import { getSocialMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Galería — Julio Cabos",
  description:
    "Obras publicadas de Julio Cabos con categoría, escala y datos de cada proyecto.",
  alternates: {
    canonical: "/galeria",
    languages: {
      "x-default": "/galeria",
      es: "/galeria",
      en: "/en/galeria",
      it: "/it/galeria",
    },
  },
  ...getSocialMetadata({
    title: "Galería — Julio Cabos",
    description:
      "Obras publicadas de Julio Cabos con categoría, escala y datos de cada proyecto.",
    locale: "es_ES",
    path: "/galeria",
  }),
};

type GalleryFilter = GalleryCategory | "todas" | "disponibles";

function getInitialFilter(filter?: string): GalleryFilter {
  return filter === "disponibles" ? "disponibles" : "todas";
}

export async function PublicGalleryPage({
  locale = "es",
  filter,
}: {
  locale?: Locale;
  filter?: string;
}) {
  const galleryWorks = await getGalleryWorksFromContent();

  return (
    <GalleryPageClient
      galleryWorks={galleryWorks}
      initialFilter={getInitialFilter(filter)}
      locale={locale}
    />
  );
}

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ filtro?: string }>;
}) {
  const params = await searchParams;

  return <PublicGalleryPage filter={params.filtro} locale="es" />;
}
