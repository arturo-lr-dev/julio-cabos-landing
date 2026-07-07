import { PublicHome } from "@/app/page";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Julio Cabos — Miniature painting",
  description:
    "Miniature painting with artistic judgement. In-person and online training, gallery and contact.",
  alternates: {
    canonical: "/en",
    languages: {
      es: "/",
      en: "/en",
    },
  },
  openGraph: {
    title: "Julio Cabos — Miniature painting",
    description: "Miniature painting with artistic judgement.",
    locale: "en_GB",
    url: "/en",
  },
};

export default async function EnglishHome() {
  return <PublicHome locale="en" />;
}
