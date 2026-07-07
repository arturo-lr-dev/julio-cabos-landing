import { PublicGalleryPage } from "@/app/galeria/page";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery — Julio Cabos",
  description:
    "Published miniature works by Julio Cabos with category, scale and project details.",
  alternates: {
    canonical: "/en/galeria",
    languages: {
      es: "/galeria",
      en: "/en/galeria",
    },
  },
};

export default async function EnglishGalleryPage() {
  return <PublicGalleryPage locale="en" />;
}
