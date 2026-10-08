import type { Metadata } from "next";
import JulioNoteDetail from "@/components/JulioNoteDetail";
import { getSocialMetadata } from "@/lib/seo";
import { libraryPublications } from "@/lib/library-content";

const notePath = "/en/biblioteca/cuadernos/el-color-se-construye-por-capas";
const noteTitle = "Color Is Built in Layers | Julio Cabos";
const noteDescription =
  "Glazing and color building in miniature painting. A workshop note by Julio Cabos.";
const noteId = (() => {
  const publication = libraryPublications.find(
    (item) => item.internalUrl === "/biblioteca/cuadernos/el-color-se-construye-por-capas"
  );
  if (!publication) {
    throw new Error("No se encontró la publicación de Biblioteca para el artículo de Veladuras");
  }
  return publication.id;
})();

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
  return <JulioNoteDetail articleId={noteId} locale="en" />;
}
