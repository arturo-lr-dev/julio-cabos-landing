import GalleryPageClient from "./GalleryPageClient";
import { getGalleryWorksFromContent } from "@/lib/work-content";
import type { Locale } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export async function PublicGalleryPage({ locale = "es" }: { locale?: Locale }) {
  const galleryWorks = await getGalleryWorksFromContent();

  return <GalleryPageClient galleryWorks={galleryWorks} locale={locale} />;
}

export default async function GalleryPage() {
  return <PublicGalleryPage locale="es" />;
}
