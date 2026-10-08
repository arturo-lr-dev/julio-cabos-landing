import type { Metadata } from "next";
import JulioNoteDetail from "@/components/JulioNoteDetail";
import { getSocialMetadata } from "@/lib/seo";
import { libraryPublications } from "@/lib/library-content";

const notePath = "/biblioteca/cuadernos/el-color-se-construye-por-capas";
const noteTitle = "El color se construye por capas | Julio Cabos";
const noteDescription =
  "Veladuras y construcción del color en pintura de miniaturas. Una nota de taller de Julio Cabos.";
const noteId = (() => {
  const publication = libraryPublications.find(
    (item) => item.internalUrl === notePath
  );
  if (!publication) {
    throw new Error(`No se encontró la publicación de Biblioteca para ${notePath}`);
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
    locale: "es_ES",
    path: notePath,
  }),
};

export default function JulioNotePage() {
  return <JulioNoteDetail articleId={noteId} />;
}
