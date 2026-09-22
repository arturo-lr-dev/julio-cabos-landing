import type { Metadata } from "next";
import TrajectoryPageClient from "@/components/TrajectoryPageClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSocialMetadata } from "@/lib/seo";

export const metadata: Metadata = { title: "Career — Julio Cabos", description: "The professional and documentary archive of Julio Cabos's career.", alternates: { canonical: "/en/sobre-julio/trayectoria", languages: { "x-default": "/sobre-julio/trayectoria", es: "/sobre-julio/trayectoria", en: "/en/sobre-julio/trayectoria", it: "/it/sobre-julio/trayectoria" } }, ...getSocialMetadata({ title: "Career — Julio Cabos", description: "The professional and documentary archive of Julio Cabos's career.", locale: "en_GB", path: "/en/sobre-julio/trayectoria" }) };

export default function EnglishTrajectoryPage() {
  return (
    <>
      <Header locale="en" />
      <TrajectoryPageClient locale="en" />
      <Footer locale="en" />
    </>
  );
}
