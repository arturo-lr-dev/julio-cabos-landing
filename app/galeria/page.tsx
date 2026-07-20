import GalleryPageClient from "./GalleryPageClient";
import { getGalleryWorksFromContent } from "@/lib/work-content";
import type { Locale } from "@/lib/site-content";
import type { GalleryCategory } from "@/lib/work-types";

export const dynamic = "force-dynamic";

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
