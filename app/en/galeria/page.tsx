import { PublicGalleryPage } from "@/app/(es)/galeria/page";
import type { Metadata } from "next";
import { getSocialMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery — Julio Cabos",
  description:
    "Published miniature works by Julio Cabos with category, scale and project details.",
  alternates: {
    canonical: "/en/galeria",
    languages: {
      "x-default": "/galeria",
      es: "/galeria",
      en: "/en/galeria",
      it: "/it/galeria",
    },
  },
  ...getSocialMetadata({
    title: "Gallery — Julio Cabos",
    description:
      "Published miniature works by Julio Cabos with category, scale and project details.",
    locale: "en_GB",
    path: "/en/galeria",
  }),
};

export default async function EnglishGalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ filtro?: string }>;
}) {
  const params = await searchParams;

  return <PublicGalleryPage filter={params.filtro} locale="en" />;
}
