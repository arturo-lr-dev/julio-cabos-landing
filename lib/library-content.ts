import publicationsJson from "@/content/library-publications.json";
import type {
  LibraryPublication,
  PublicationSection,
  PublicationType,
} from "@/lib/library-types";
import type { Locale } from "@/lib/site-content";

export const libraryPublications = (publicationsJson as LibraryPublication[])
  .filter((publication) => publication.status === "published")
  .sort((a, b) => a.sortOrder - b.sortOrder);

export function getPublicationsBySection(section: PublicationSection) {
  return libraryPublications.filter(
    (publication) => publication.displaySection === section
  );
}

export function getLocalizedPublication(
  publication: LibraryPublication,
  locale: Locale
) {
  return {
    ...publication,
    subtitle: publication.subtitle[locale],
    roleLabel: publication.roleLabel[locale],
    contribution: publication.contribution[locale],
    description: publication.description[locale],
  };
}

const typeLabels: Record<Locale, Record<PublicationType, string>> = {
  es: {
    book: "Libro",
    "technical-guide": "Guía técnica",
    "digital-guide": "Tutorial digital",
    collection: "Colección",
  },
  en: {
    book: "Book",
    "technical-guide": "Technical guide",
    "digital-guide": "Digital tutorial",
    collection: "Collection",
  },
};

export function getPublicationTypeLabel(type: PublicationType, locale: Locale) {
  return typeLabels[locale][type];
}

export const libraryCopy = {
  es: {
    back: "Volver al estudio",
    languageHref: "/en/biblioteca",
    languageLabel: "EN",
    eyebrow: "El estudio · Archivo editorial",
    title: "Biblioteca",
    intro:
      "Durante más de dos décadas, Julio Cabos ha participado como autor y colaborador en libros, manuales técnicos, guías y publicaciones especializadas sobre pintura y modelismo. Esta selección reúne parte de ese trabajo editorial.",
    opening: "Oficio, método y conocimiento compartidos a lo largo del tiempo.",
    sections: {
      table: "Sobre la mesa",
      notebooks: "Cuadernos de taller",
      shelf: "Estantería principal",
      archive: "Archivo editorial",
    },
    tableText:
      "La publicación más reciente: una guía práctica nacida del trabajo diario con el color.",
    notebooksText:
      "Materiales de estudio en los que Julio abre su proceso y acompaña cada decisión paso a paso.",
    shelfText:
      "Libros y manuales en los que la autoría o la contribución de Julio forma parte central de la publicación.",
    archiveText:
      "Trabajos colectivos, artículos y colaboraciones que documentan distintas etapas de una trayectoria editorial.",
    viewAk: "Ver publicación en AK Interactive",
    request: "Solicitar a Julio",
    pdfMeta: "Tutorial PDF en español · 32 páginas",
    direct: "Disponible directamente a través de Julio.",
    preview: "Una mirada al interior",
    open: "Abrir ficha",
    close: "Cerrar ficha",
    language: "Idioma",
    type: "Tipo",
    participation: "Participación de Julio",
    tags: "Temas",
    external: "Ver publicación",
    footer:
      "Las publicaciones mostradas incluyen obras propias, trabajos colectivos, artículos y colaboraciones editoriales desarrolladas a lo largo de la trayectoria profesional de Julio Cabos. Cuando ha sido posible documentarlo, cada ficha detalla su participación específica.",
  },
  en: {
    back: "Back to the studio",
    languageHref: "/biblioteca",
    languageLabel: "ES",
    eyebrow: "The studio · Editorial archive",
    title: "Library",
    intro:
      "For more than two decades, Julio Cabos has contributed as an author and collaborator to books, technical manuals, guides and specialist publications on painting and modelling. This selection brings together part of that editorial work.",
    opening: "Craft, method and knowledge shared over time.",
    sections: {
      table: "On the table",
      notebooks: "Workshop notebooks",
      shelf: "Main shelf",
      archive: "Editorial archive",
    },
    tableText:
      "The latest publication: a practical guide born from daily work with colour.",
    notebooksText:
      "Study materials in which Julio opens up his process and accompanies each decision step by step.",
    shelfText:
      "Books and manuals in which Julio's authorship or contribution is central to the publication.",
    archiveText:
      "Collective works, articles and collaborations documenting different stages of an editorial career.",
    viewAk: "View publication at AK Interactive",
    request: "Request from Julio",
    pdfMeta: "Spanish-language PDF tutorial · 32 pages",
    direct: "Available directly from Julio.",
    preview: "A look inside",
    open: "Open publication record",
    close: "Close publication record",
    language: "Language",
    type: "Type",
    participation: "Julio's contribution",
    tags: "Topics",
    external: "View publication",
    footer:
      "The publications shown include Julio's own works, collective projects, articles and editorial collaborations developed throughout his professional career. Where documented, each record describes his specific contribution.",
  },
} satisfies Record<Locale, object>;
