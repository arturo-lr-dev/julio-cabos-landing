import GalleryPageClient from "./GalleryPageClient";
import { getGalleryWorksFromContent } from "@/lib/work-content";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const galleryWorks = await getGalleryWorksFromContent();

  return <GalleryPageClient galleryWorks={galleryWorks} />;
}
