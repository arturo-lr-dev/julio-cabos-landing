import { PublicHome } from "@/app/(es)/page";
import type { Metadata } from "next";
import { getSocialMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Julio Cabos — Miniature painting",
  description:
    "Miniature painting with artistic judgement. In-person and online training, gallery and contact.",
  alternates: {
    canonical: "/en",
    languages: {
      "x-default": "/",
      es: "/",
      en: "/en",
      it: "/it",
    },
  },
  ...getSocialMetadata({
    title: "Julio Cabos — Miniature painting",
    description: "Miniature painting with artistic judgement.",
    locale: "en_GB",
    path: "/en",
  }),
};

export default function EnglishHome() {
  return <PublicHome locale="en" />;
}
