import type { Metadata } from "next";
import { PublicHome } from "@/app/(es)/page";
import { getSocialMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Julio Cabos — Pittura di miniature",
  description:
    "Pittura di miniature con sensibilità artistica. Formazione in presenza e online, galleria, biblioteca e contatti.",
  alternates: {
    canonical: "/it",
    languages: {
      "x-default": "/",
      es: "/",
      en: "/en",
      it: "/it",
    },
  },
  ...getSocialMetadata({
    title: "Julio Cabos — Pittura di miniature",
    description: "Pittura di miniature con sensibilità artistica.",
    locale: "it_IT",
    path: "/it",
  }),
};

export default function ItalianHome() {
  return <PublicHome locale="it" />;
}
