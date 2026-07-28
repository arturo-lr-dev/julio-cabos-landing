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

const italianPublicationCopy: Record<
  string,
  {
    subtitle: string;
    roleLabel: string;
    contribution: string;
    description: string;
  }
> = {
  "colores-artisticos-densos-guia-practica": {
    subtitle: "Guida pratica all'uso di Julio Cabos",
    roleLabel: "Di Julio Cabos",
    contribution: "Guida pratica scritta da Julio Cabos per AK Interactive.",
    description:
      "Una guida pratica dedicata all'uso dei colori acrilici artistici densi nella pittura di miniature.",
  },
  "madre-buho": {
    subtitle: "Tutorial digitale passo dopo passo",
    roleLabel: "Di Julio Cabos",
    contribution: "Tutorial digitale sviluppato interamente da Julio Cabos.",
    description:
      "Un progetto completo che affronta la costruzione dell'albero, del terreno e della vegetazione, insieme alla pittura di tessuti, pelle, occhi, gufi e al montaggio finale della scena.",
  },
  minipedia: {
    subtitle: "Collezione Impara a dipingere miniature",
    roleLabel: "Contributo editoriale",
    contribution:
      "Una collezione con la partecipazione di Julio Cabos nel corso della sua carriera editoriale.",
    description:
      "Una raccolta di quaderni tecnici dedicati alla preparazione e alla pittura di miniature.",
  },
  "como-pintar-figuras-con-acrilicos": {
    subtitle: "La guida completa per pittori principianti ed esperti",
    roleLabel: "Con Julio Cabos",
    contribution:
      "La copertina presenta esplicitamente la guida come sviluppata con Julio Cabos.",
    description:
      "Manuale di pittura acrilica rivolto a pittori di figure principianti ed esperti.",
  },
  "painting-pin-up-figures": {
    subtitle: "Guida completa per pittori di pin-up, dal livello base all'avanzato",
    roleLabel: "Autore",
    contribution: "Libro di Julio Cabos dedicato alla pittura di figure pin-up.",
    description:
      "Guida alla pittura della figura femminile, dalle basi ai processi avanzati.",
  },
  "tank-fight-1916": {
    subtitle: "Come dipingere mezzi corazzati, terreno e figure",
    roleLabel: "Autore",
    contribution: "Libro firmato da Julio Cabos.",
    description:
      "Guida completa al diorama dedicata a mezzi corazzati, terreno e figure della Prima guerra mondiale.",
  },
  "wolfe-la-batalla-del-atlantico": {
    subtitle: "La battaglia dell'Atlantico",
    roleLabel: "Coautore",
    contribution: "Con Eduardo Delgado e Iván Galán.",
    description:
      "Pubblicazione collettiva di storia e modellismo dedicata alla battaglia dell'Atlantico.",
  },
  "pintando-caballos": {
    subtitle: "Manuale di modellismo",
    roleLabel: "Contributo pittorico",
    contribution:
      "Julio Cabos ha partecipato come uno dei pittori presenti nella pubblicazione.",
    description:
      "Manuale dedicato alla pittura e alla trasformazione dei cavalli nel modellismo.",
  },
  birreme: {
    subtitle: "Le navi da guerra romane: storia e diorama",
    roleLabel: "Contributo editoriale",
    contribution:
      "Pubblicazione con partecipazione confermata di Julio Cabos nel corso della sua carriera professionale.",
    description:
      "Storia e modellismo delle navi da guerra romane esplorati attraverso il diorama.",
  },
  "ejercito-aleman-segunda-guerra-mundial": {
    subtitle: "Uno studio attraverso diorami, figure e vignette",
    roleLabel: "Contributo editoriale",
    contribution:
      "Pubblicazione con partecipazione confermata di Julio Cabos nel corso della sua carriera professionale.",
    description:
      "Studio storico e modellistico sviluppato attraverso diorami, figure e vignette.",
  },
  "steampunk-in-miniature": {
    subtitle: "Steampunk in miniatura",
    roleLabel: "Contributo editoriale",
    contribution:
      "Pubblicazione con partecipazione confermata di Julio Cabos nel corso della sua carriera professionale.",
    description:
      "Pubblicazione specialistica sull'universo steampunk applicato alla miniatura.",
  },
  "pintando-bustos-fantasia": {
    subtitle: "Tecniche di pittura per busti fantasy",
    roleLabel: "Contributo editoriale",
    contribution:
      "Pubblicazione con partecipazione confermata di Julio Cabos nel corso della sua carriera professionale.",
    description:
      "Guida tecnica dedicata alla pittura acrilica dei busti fantasy.",
  },
  "la-figura-femenina": {
    subtitle: "Tecniche di pittura",
    roleLabel: "Contributo editoriale",
    contribution:
      "Pubblicazione con partecipazione confermata di Julio Cabos nel corso della sua carriera professionale.",
    description:
      "Pubblicazione tecnica incentrata sulla pittura della figura femminile.",
  },
  "das-boot": {
    subtitle: "Il sommergibile tedesco nella storia e nel diorama",
    roleLabel: "Contributo editoriale",
    contribution:
      "Pubblicazione con partecipazione confermata di Julio Cabos nel corso della sua carriera professionale.",
    description:
      "Storia e modellismo del sommergibile tedesco esplorati attraverso il diorama.",
  },
  "el-baron-rojo": {
    subtitle: "Un profilo completo tra storia e miniatura",
    roleLabel: "Contributo editoriale",
    contribution:
      "Pubblicazione con partecipazione confermata di Julio Cabos nel corso della sua carriera professionale.",
    description:
      "Storia, pittura di figure e modellismo intorno alla figura del Barone Rosso.",
  },
  "painting-figures-with-acrylics": {
    subtitle: "Guida completa per pittori di figure",
    roleLabel: "Contributo editoriale",
    contribution:
      "Pubblicazione con partecipazione confermata di Julio Cabos; il rapporto con l'edizione spagnola resta da documentare.",
    description:
      "Guida in lingua inglese dedicata alla pittura di figure con colori acrilici.",
  },
  "faq-tecnicas-pintura-figuras": {
    subtitle: "Domande frequenti sulle tecniche di pittura delle figure",
    roleLabel: "Contributo editoriale",
    contribution:
      "Pubblicazione del team Miniaturas Andrea con partecipazione confermata di Julio Cabos.",
    description:
      "Risposta collettiva alle domande frequenti sulle tecniche di pittura delle figure.",
  },
};

export function getPublicationsBySection(section: PublicationSection) {
  return libraryPublications.filter(
    (publication) => publication.displaySection === section
  );
}

export function getLocalizedPublication(
  publication: LibraryPublication,
  locale: Locale
) {
  if (locale === "it" && italianPublicationCopy[publication.id]) {
    return {
      ...publication,
      ...italianPublicationCopy[publication.id],
    };
  }

  const fallbackLocale = locale === "it" ? "es" : locale;
  return {
    ...publication,
    subtitle: publication.subtitle[locale] ?? publication.subtitle[fallbackLocale],
    roleLabel: publication.roleLabel[locale] ?? publication.roleLabel[fallbackLocale],
    contribution:
      publication.contribution[locale] ?? publication.contribution[fallbackLocale],
    description:
      publication.description[locale] ?? publication.description[fallbackLocale],
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
  it: {
    book: "Libro",
    "technical-guide": "Guida tecnica",
    "digital-guide": "Tutorial digitale",
    collection: "Collezione",
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
  it: {
    back: "Torna all'atelier",
    languageHref: "/",
    languageLabel: "ES",
    eyebrow: "L'atelier · Archivio editoriale",
    title: "Biblioteca",
    intro:
      "Da oltre due decenni, Julio Cabos partecipa come autore e collaboratore a libri, manuali tecnici, guide e pubblicazioni specialistiche dedicate alla pittura e al modellismo. Questa selezione raccoglie una parte di quel lavoro editoriale.",
    opening: "Mestiere, metodo e conoscenza condivisi nel tempo.",
    sections: {
      table: "Sul tavolo",
      notebooks: "Quaderni di bottega",
      shelf: "Scaffale principale",
      archive: "Archivio editoriale",
    },
    tableText:
      "La pubblicazione più recente: una guida pratica nata dal lavoro quotidiano con il colore.",
    notebooksText:
      "Materiali di studio in cui Julio apre il proprio processo e accompagna ogni decisione passo dopo passo.",
    shelfText:
      "Libri e manuali nei quali la paternità o il contributo di Julio costituiscono una parte centrale della pubblicazione.",
    archiveText:
      "Opere collettive, articoli e collaborazioni che documentano diverse fasi di un percorso editoriale.",
    viewAk: "Vedi la pubblicazione su AK Interactive",
    request: "Richiedi a Julio",
    pdfMeta: "Tutorial PDF in spagnolo · 32 pagine",
    direct: "Disponibile direttamente tramite Julio.",
    preview: "Uno sguardo all'interno",
    open: "Apri la scheda",
    close: "Chiudi la scheda",
    language: "Lingua",
    type: "Tipo",
    participation: "Partecipazione di Julio",
    tags: "Temi",
    external: "Vedi la pubblicazione",
    footer:
      "Le pubblicazioni presentate comprendono opere proprie, lavori collettivi, articoli e collaborazioni editoriali sviluppati nel corso della carriera professionale di Julio Cabos. Quando è stato possibile documentarlo, ogni scheda descrive il suo contributo specifico.",
  },
} satisfies Record<Locale, object>;
