import type { Metadata } from "next";
import JulioNoteDetail from "@/components/JulioNoteDetail";
import { getSocialMetadata } from "@/lib/seo";
import { libraryPublications } from "@/lib/library-content";

const notePath = "/it/biblioteca/cuadernos/el-color-se-construye-por-capas";
const noteTitle = "Il colore si costruisce a strati | Julio Cabos";
const noteDescription =
  "Velature e costruzione del colore nella pittura di miniature. Una nota di laboratorio di Julio Cabos.";
const noteId = (() => {
  const publication = libraryPublications.find(
    (item) => item.internalUrl === "/biblioteca/cuadernos/el-color-se-construye-por-capas"
  );
  if (!publication) {
    throw new Error("Non è stata trovata la pubblicazione della Biblioteca per l'articolo sulle velature");
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
    locale: "it_IT",
    path: notePath,
  }),
};

export default function ItalianJulioNotePage() {
  return <JulioNoteDetail articleId={noteId} locale="it" />;
}
