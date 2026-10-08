import type { Metadata } from "next";
import JulioNoteDetail from "@/components/JulioNoteDetail";
import { getSocialMetadata } from "@/lib/seo";

const notePath = "/biblioteca/cuadernos/el-color-se-construye-por-capas";
const noteTitle = "El color se construye por capas | Julio Cabos";
const noteDescription =
  "Veladuras y construcción del color en pintura de miniaturas. Una nota de taller de Julio Cabos.";

export const metadata: Metadata = {
  title: noteTitle,
  description: noteDescription,
  alternates: {
    canonical: notePath,
  },
  ...getSocialMetadata({
    title: noteTitle,
    description: noteDescription,
    locale: "es_ES",
    path: notePath,
  }),
};

export default function JulioNotePage() {
  return <JulioNoteDetail />;
}
