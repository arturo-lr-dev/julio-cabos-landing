import type { Metadata } from "next";
import { PublicLibraryPage } from "@/app/biblioteca/page";

export const metadata: Metadata = {
  title: "Library — Julio Cabos",
  description:
    "Books, technical manuals, guides and editorial collaborations by Julio Cabos across more than two decades.",
  alternates: {
    canonical: "/en/biblioteca",
    languages: { es: "/biblioteca", en: "/en/biblioteca" },
  },
  openGraph: {
    title: "Library — Julio Cabos",
    description: "The editorial archive of Julio Cabos's studio.",
    url: "/en/biblioteca",
    locale: "en_GB",
  },
};

export default function EnglishLibraryPage() {
  return <PublicLibraryPage locale="en" />;
}
