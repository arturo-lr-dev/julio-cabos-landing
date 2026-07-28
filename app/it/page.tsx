import type { Metadata } from "next";
import { PublicHome } from "@/app/page";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Julio Cabos — Pittura di miniature",
  description:
    "Pittura di miniature con sensibilità artistica. Formazione in presenza e online, galleria, biblioteca e contatti.",
  alternates: {
    canonical: "/it",
    languages: {
      es: "/",
      en: "/en",
      it: "/it",
    },
  },
  openGraph: {
    title: "Julio Cabos — Pittura di miniature",
    description: "Pittura di miniature con sensibilità artistica.",
    locale: "it_IT",
    url: "/it",
  },
};

export default async function ItalianHome() {
  return <PublicHome locale="it" />;
}
