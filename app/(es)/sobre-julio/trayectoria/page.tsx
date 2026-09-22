import type { Metadata } from "next";
import TrajectoryPageClient from "@/components/TrajectoryPageClient";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSocialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Trayectoria — Julio Cabos",
  description: "Archivo profesional y documental de la trayectoria de Julio Cabos.",
  alternates: { canonical: "/sobre-julio/trayectoria", languages: { "x-default": "/sobre-julio/trayectoria", es: "/sobre-julio/trayectoria", en: "/en/sobre-julio/trayectoria", it: "/it/sobre-julio/trayectoria" } },
  ...getSocialMetadata({ title: "Trayectoria — Julio Cabos", description: "Archivo profesional y documental de la trayectoria de Julio Cabos.", locale: "es_ES", path: "/sobre-julio/trayectoria" }),
};

export default function TrajectoryPage() {
  return (
    <>
      <Header locale="es" />
      <TrajectoryPageClient locale="es" />
      <Footer locale="es" />
    </>
  );
}
