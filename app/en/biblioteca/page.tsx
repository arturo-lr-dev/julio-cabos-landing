import type { Metadata } from "next";
import { PublicLibraryPage } from "@/app/(es)/biblioteca/page";
import { getSocialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Library — Julio Cabos",
  description:
    "Books, technical manuals, guides and editorial collaborations by Julio Cabos across more than two decades.",
  alternates: {
    canonical: "/en/biblioteca",
    languages: {
      "x-default": "/biblioteca",
      es: "/biblioteca",
      en: "/en/biblioteca",
      it: "/it/biblioteca",
    },
  },
  ...getSocialMetadata({
    title: "Library — Julio Cabos",
    description: "The editorial archive of Julio Cabos's studio.",
    locale: "en_GB",
    path: "/en/biblioteca",
  }),
};

export default function EnglishLibraryPage() {
  return <PublicLibraryPage locale="en" />;
}
