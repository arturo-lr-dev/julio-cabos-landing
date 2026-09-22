import type { Metadata } from "next";
import TrajectoryPageClient from "@/components/TrajectoryPageClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSocialMetadata } from "@/lib/seo";

export const metadata: Metadata = { title: "Percorso — Julio Cabos", description: "L'archivio professionale e documentale del percorso di Julio Cabos.", alternates: { canonical: "/it/sobre-julio/trayectoria", languages: { "x-default": "/sobre-julio/trayectoria", es: "/sobre-julio/trayectoria", en: "/en/sobre-julio/trayectoria", it: "/it/sobre-julio/trayectoria" } }, ...getSocialMetadata({ title: "Percorso — Julio Cabos", description: "L'archivio professionale e documentale del percorso di Julio Cabos.", locale: "it_IT", path: "/it/sobre-julio/trayectoria" }) };

export default function ItalianTrajectoryPage() {
  return (
    <>
      <Header locale="it" />
      <TrajectoryPageClient locale="it" />
      <Footer locale="it" />
    </>
  );
}
