import type { Metadata } from "next";
import JulioNoteDetail from "@/components/JulioNoteDetail";
import { getSocialMetadata } from "@/lib/seo";

const notePath = "/en/biblioteca/cuadernos/el-color-se-construye-por-capas";
const noteTitle = "Color Is Built in Layers | Julio Cabos";
const noteDescription =
  "Glazing and color building in miniature painting. A workshop note by Julio Cabos.";

export const metadata: Metadata = {
  title: noteTitle,
  description: noteDescription,
  alternates: {
    canonical: notePath,
  },
  ...getSocialMetadata({
    title: noteTitle,
    description: noteDescription,
    locale: "en_GB",
    path: notePath,
  }),
};

export default function EnglishJulioNotePage() {
  return <JulioNoteDetail locale="en" />;
}
