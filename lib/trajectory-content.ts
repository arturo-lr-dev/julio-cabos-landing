import type { Locale } from "@/lib/site-content";
import type { TrajectoryCategory, TrajectoryEntry } from "@/lib/trajectory-types";
import { expandedTrajectoryEntries } from "@/lib/trajectory-expanded-content";

const text = (es: string, en: string, it: string): Record<Locale, string> => ({ es, en, it });

export const trajectoryCategoryLabels: Record<Locale, Record<TrajectoryCategory | "all", string>> = {
  es: { all: "Todo", career: "Etapas profesionales", work: "Obra", publications: "Publicaciones", training: "Formación", awards: "Premios y reconocimientos", events: "Eventos", collaborations: "Colaboraciones", press: "Prensa / entrevistas", legacy: "Legado" },
  en: { all: "All", career: "Professional stages", work: "Works", publications: "Publications", training: "Training", awards: "Awards & recognition", events: "Events", collaborations: "Collaborations", press: "Press / interviews", legacy: "Legacy" },
  it: { all: "Tutto", career: "Fasi professionali", work: "Opere", publications: "Pubblicazioni", training: "Formazione", awards: "Premi e riconoscimenti", events: "Eventi", collaborations: "Collaborazioni", press: "Stampa / interviste", legacy: "Eredità" },
};

export const trajectoryPeriods = {
  beginnings: { es: "Finales de los 80 — 1999", en: "Late 1980s — 1999", it: "Fine anni 80 — 1999" },
  professionalisation: { es: "2000 — 2009", en: "2000 — 2009", it: "2000 — 2009" },
  international: { es: "2010 — 2015", en: "2010 — 2015", it: "2010 — 2015" },
  recognition: { es: "2016 — 2020", en: "2016 — 2020", it: "2016 — 2020" },
  present: { es: "2021 — actualidad", en: "2021 — present", it: "2021 — oggi" },
} as const;

const legacyTrajectoryEntries: TrajectoryEntry[] = [
  { id: "beginnings", year: "ca. 1990", sortYear: 1990, period: "beginnings", category: "press", title: text("Los comienzos", "The beginnings", "Gli inizi"), description: text("Julio sitúa sus primeros pasos profesionales en el entorno de Modelismo & Historia, TodoModelismo y Euromodelismo.", "Julio places his first professional steps around Modelismo & Historia, TodoModelismo and Euromodelismo.", "Julio colloca i suoi primi passi professionali nell'ambito di Modelismo & Historia, TodoModelismo ed Euromodelismo."), source: text("Figure Painter Magazine #40 · ECO Leganés", "Figure Painter Magazine #40 · ECO Leganés", "Figure Painter Magazine #40 · ECO Leganés"), verificationStatus: "approximate", featured: true },
  { id: "airbrush-first-classes", year: "ca. 1990", sortYear: 1990, period: "beginnings", category: "training", title: text("Primeras clases con aerógrafo", "First airbrush classes", "Prime lezioni con aerografo"), description: text("Una entrevista sitúa alrededor de 1990 sus primeras clases relacionadas con el aerógrafo.", "An interview places his first airbrush-related classes around 1990.", "Un'intervista colloca intorno al 1990 le sue prime lezioni legate all'aerografo."), source: text("Figure Painter Magazine #40", "Figure Painter Magazine #40", "Figure Painter Magazine #40"), verificationStatus: "approximate" },
  { id: "inicio-aerografia", year: "Primeros años", sortYear: 1998, period: "beginnings", category: "publications", title: text("Inicio a la aerografía", "Getting started with airbrushing", "Iniziare con l'aerografia"), description: text("Artículo firmado por Julio C. Cabos Gómez en TodoModelismo nº8.", "Article signed by Julio C. Cabos Gómez in TodoModelismo no. 8.", "Articolo firmato da Julio C. Cabos Gómez in TodoModelismo n. 8."), source: text("U-Modelismo", "U-Modelismo", "U-Modelismo"), sourceUrl: "https://www.u-modelismo.com/manuales/inicio_a_la_aerografia/", verificationStatus: "documented" },
  { id: "how-to-paint-acrylics", year: "Finales de los 90", sortYear: 1999, period: "beginnings", category: "publications", title: text("How to Paint Figures with Acrylics", "How to Paint Figures with Acrylics", "How to Paint Figures with Acrylics"), description: text("Manual de Andrea Press de 44 páginas atribuido a Julio Cabos.", "A 44-page Andrea Press manual attributed to Julio Cabos.", "Manuale Andrea Press di 44 pagine attribuito a Julio Cabos."), relatedPublication: "como-pintar-figuras-con-acrilicos", verificationStatus: "approximate" },
  { id: "figure-international-4", year: "2002", sortYear: 2002, period: "professionalisation", category: "publications", title: text("Figure International nº4", "Figure International no. 4", "Figure International n. 4"), description: text("Julio aparece como colaborador y participante en un proyecto editorial/modelístico.", "Julio appears as a contributor and participant in an editorial/model-making project.", "Julio appare come collaboratore e partecipante a un progetto editoriale e modellistico."), verificationStatus: "documented" },
  { id: "andrea-stage", year: "2007", sortYear: 2007, period: "professionalisation", category: "press", title: text("Evidencia de la etapa Andrea", "Evidence from the Andrea period", "Evidenza del periodo Andrea"), description: text("Una crónica de visita al estudio relaciona el trabajo de Julio con numerosos box arts de Andrea Miniatures.", "A studio visit connects Julio's work with numerous Andrea Miniatures box arts.", "Una visita allo studio collega il lavoro di Julio a numerosi box art di Andrea Miniatures."), source: text("Crónica de Zyclyon, 2007", "Zyclyon report, 2007", "Cronaca di Zyclyon, 2007"), sourceUrl: "https://zyclyon.blogspot.com/2007/04/", verificationStatus: "pending", displayLevel: "reference", showIn: ["timeline"], groupKey: "andrea-stage" },
  { id: "world-expo-2008", year: "2008", sortYear: 2008, period: "professionalisation", category: "events", title: text("World Expo — Girona", "World Expo — Girona", "World Expo — Girona"), description: text("Calvin Tan documenta obra de Julio y su vinculación profesional con Andrea Miniatures.", "Calvin Tan documents Julio's work and his professional connection with Andrea Miniatures.", "Calvin Tan documenta il lavoro di Julio e il suo legame professionale con Andrea Miniatures."), source: text("Zyclyon · The second day", "Zyclyon · The second day", "Zyclyon · The second day"), sourceUrl: "https://zyclyon.blogspot.com/2008/07/the-second-day.html", verificationStatus: "documented" },
  { id: "premios-ejercito-2009", year: "2009", sortYear: 2009, period: "professionalisation", category: "awards", title: text("Premios Ejército — Dioramas", "Premios Ejército — Dioramas", "Premios Ejército — Dioramas"), description: text("Julio Cabos e Íñigo Rodríguez reciben el premio de Miniaturas, categoría Dioramas.", "Julio Cabos and Íñigo Rodríguez receive the Miniatures prize in the Dioramas category.", "Julio Cabos e Íñigo Rodríguez ricevono il premio Miniature nella categoria Diorami."), source: text("Ejército de Tierra · noticia oficial", "Spanish Army · official report", "Esercito spagnolo · notizia ufficiale"), sourceUrl: "https://ejercito.defensa.gob.es/noticias/2009/06/Noticia599.html", verificationStatus: "documented", featured: true },
  { id: "swiss-world-expo-2011", year: "2011", sortYear: 2011, period: "international", category: "awards", title: text("Swiss World Expo", "Swiss World Expo", "Swiss World Expo"), description: text("Oro en Historical Figures: Advanced Painting.", "Gold in Historical Figures: Advanced Painting.", "Oro in Historical Figures: Advanced Painting."), source: text("Resultados oficiales 2011", "Official 2011 results", "Risultati ufficiali 2011"), sourceUrl: "https://mtxms.ch/content/results/2011.pdf", verificationStatus: "documented", featured: true },
  { id: "figure-international-40", year: "2011", sortYear: 2011, period: "international", category: "publications", title: text("Lawrence de Arabia", "Lawrence of Arabia", "Lawrence d'Arabia"), description: text("Artículo de Julio Cabos destacado en portada de Figure International nº40.", "Julio Cabos feature highlighted on the cover of Figure International no. 40.", "Articolo di Julio Cabos in evidenza sulla copertina di Figure International n. 40."), relatedPublication: "painting-figures-with-acrylics", verificationStatus: "documented" },
  { id: "dallas-2012", year: "2012", sortYear: 2012, period: "international", category: "training", title: text("Workshop en Dallas", "Dallas workshop", "Workshop a Dallas"), description: text("Workshop de pintura impartido en Lone Star Figure Show.", "Painting workshop held at the Lone Star Figure Show.", "Workshop di pittura tenuto al Lone Star Figure Show."), verificationStatus: "documented", relatedTraining: "Lone Star Figure Show" },
  { id: "leganes-2012", year: "2012", sortYear: 2012, period: "international", category: "training", title: text("Técnica combinada aerógrafo-pincel", "Combined airbrush and brush technique", "Tecnica combinata aerografo-pennello"), description: text("Ponencia/curso en Leganés sobre una técnica combinada presentada como parte de su trabajo de investigación y desarrollo.", "Talk/course in Leganés on a combined technique presented as part of his research and development work.", "Conferenza/corso a Leganés su una tecnica combinata presentata come parte del suo lavoro di ricerca e sviluppo."), verificationStatus: "documented" },
  { id: "international-teaching-2013", year: "2013–2015", sortYear: 2013, period: "international", category: "training", title: text("Formación internacional", "International teaching", "Formazione internazionale"), description: text("Dallas, Brasil, Varsovia, Polonia y Madrid forman parte de una etapa de cursos, demostraciones y workshops con Andrea Miniatures.", "Dallas, Brazil, Warsaw, Poland and Madrid form part of a period of courses, demonstrations and workshops with Andrea Miniatures.", "Dallas, Brasile, Varsavia, Polonia e Madrid fanno parte di un periodo di corsi, dimostrazioni e workshop con Andrea Miniatures."), source: text("Andrea Europe · cursos organizados con Julio Cabos", "Andrea Europe · courses organised with Julio Cabos", "Andrea Europe · corsi organizzati con Julio Cabos"), sourceUrl: "https://www.andrea-world.com/es/andrea-news/28/cursos-de-pintura-organizados-por-andrea-europe-con-julio-cabos.html", verificationStatus: "documented", featured: true },
  { id: "technical-publishing-2013", year: "2013", sortYear: 2013, period: "international", category: "publications", title: text("Libros y vídeos técnicos", "Technical books and videos", "Libri e video tecnici"), description: text("Painting Pin-Up Figures y Painting Fantasy Figures in Acrylics amplían su trabajo como autor y divulgador.", "Painting Pin-Up Figures and Painting Fantasy Figures in Acrylics expand his work as an author and educator.", "Painting Pin-Up Figures e Painting Fantasy Figures in Acrylics ampliano il suo lavoro come autore e divulgatore."), relatedPublication: "painting-pin-up-figures", verificationStatus: "documented" },
  { id: "amt-honorary-2015", year: "2015", sortYear: 2015, period: "international", category: "awards", title: text("Socio de Honor de AMT", "Honorary member of AMT", "Socio onorario di AMT"), description: text("AMT nombra a Julio Socio de Honor; también participa como jurado de Fantasía en AMT Torrent.", "AMT names Julio an honorary member; he also serves as a Fantasy judge at AMT Torrent.", "AMT nomina Julio socio onorario; partecipa inoltre come giudice di Fantasy ad AMT Torrent."), verificationStatus: "documented" },
  { id: "scale75", year: "2016", sortYear: 2016, period: "recognition", category: "press", title: text("Evidencia editorial de la etapa Scale75", "Editorial evidence from the Scale75 period", "Evidenza editoriale del periodo Scale75"), description: text("Euromodelismo nº273 identifica a Jorge y Julio Cabos como responsables de Scale75 dentro del contexto de la marca.", "Euromodelismo no. 273 identifies Jorge and Julio Cabos as responsible for Scale75 in the context of the brand.", "Euromodelismo n. 273 identifica Jorge e Julio Cabos come responsabili di Scale75 nel contesto del marchio."), source: text("Euromodelismo nº273", "Euromodelismo no. 273", "Euromodelismo n. 273"), verificationStatus: "pending", displayLevel: "reference", showIn: ["timeline"], groupKey: "scale75-stage" },
  { id: "figure-painter-40", year: "2016", sortYear: 2016, period: "recognition", category: "press", title: text("Entrevista en Figure Painter Magazine", "Figure Painter Magazine interview", "Intervista su Figure Painter Magazine"), description: text("El número 40 reúne una entrevista extensa en primera persona, una de las principales fuentes biográficas de la trayectoria.", "Issue 40 contains an extensive first-person interview, one of the main biographical sources for the career record.", "Il numero 40 contiene un'ampia intervista in prima persona, una delle principali fonti biografiche del percorso."), verificationStatus: "documented" },
  { id: "world-master-2017", year: "2017", sortYear: 2017, period: "recognition", category: "awards", title: text("World Master", "World Master", "World Master"), description: text("En World Model Expo Chicago, Julio es reconocido como uno de los cuatro World Master.", "At World Model Expo Chicago, Julio is recognised as one of four World Masters.", "Al World Model Expo Chicago, Julio viene riconosciuto come uno dei quattro World Master."), verificationStatus: "documented", featured: true },
  { id: "freak-wars-2018", year: "2018", sortYear: 2018, period: "recognition", category: "events", title: text("Freak Wars — Madrid", "Freak Wars — Madrid", "Freak Wars — Madrid"), description: text("El Ayuntamiento de Madrid cita a Julio entre los ponentes de referencia.", "Madrid City Council cites Julio among the event's reference speakers.", "Il Comune di Madrid cita Julio tra i relatori di riferimento dell'evento."), verificationStatus: "documented" },
  { id: "legado-docente", year: "2011–actualidad", sortYear: 2011, period: "international", category: "legacy", title: text("Maestro y referente", "Teacher and influence", "Maestro e riferimento"), description: text("Testimonios documentados de pintores como Alfonso Giráldez y otros artistas identifican a Julio como maestro, referente o influencia. Se presenta como legado docente, no como una lista de discípulos.", "Documented testimonies from painters such as Alfonso Giráldez and other artists identify Julio as a teacher, reference or influence. It is presented as a teaching legacy, not as a list of disciples.", "Testimonianze documentate di pittori come Alfonso Giráldez e altri artisti identificano Julio come maestro, riferimento o influenza. Viene presentato come eredità didattica, non come elenco di discepoli."), verificationStatus: "documented", featured: true },
  { id: "premios-ejercito-2025", year: "2025", sortYear: 2025, period: "present", category: "awards", title: text("Premios Ejército — Máster Figuras", "Premios Ejército — Master Figures", "Premios Ejército — Master Figures"), description: text("Granadero del Reg. Zamora. Hamburgo, 1807 recibe un premio junto a Luis Ángel Ruiz Fernández.", "Granadero del Reg. Zamora. Hamburgo, 1807 receives a prize together with Luis Ángel Ruiz Fernández.", "Granadero del Reg. Zamora. Hamburgo, 1807 riceve un premio insieme a Luis Ángel Ruiz Fernández."), verificationStatus: "documented", featured: true },
  { id: "ak-guide-2026", year: "2026", sortYear: 2026, period: "present", category: "publications", title: text("Artist Dense Acrylic Color", "Artist Dense Acrylic Color", "Artist Dense Acrylic Color"), description: text("AK Interactive publica Practical User Guide by Julio Cabos, una guía de 112 páginas sobre su enfoque de trabajo con color.", "AK Interactive publishes Practical User Guide by Julio Cabos, a 112-page guide to his approach to working with colour.", "AK Interactive pubblica Practical User Guide by Julio Cabos, una guida di 112 pagine sul suo approccio al colore."), relatedPublication: "colores-artisticos-densos-guia-practica", verificationStatus: "documented", featured: true },
];

export const trajectoryEntries: TrajectoryEntry[] = [
  ...legacyTrajectoryEntries,
  ...expandedTrajectoryEntries.filter(
    (expandedEntry) => !legacyTrajectoryEntries.some((legacyEntry) => legacyEntry.id === expandedEntry.id),
  ),
].map((entry) => ({
  ...entry,
  displayLevel: entry.displayLevel ?? (entry.featured ? "featured" : "standard"),
  showIn: entry.showIn ?? ["timeline"],
}));

const getDocumentedStartDate = (entry: TrajectoryEntry) => {
  const match = entry.date?.match(/^(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?/);
  if (!match || !match[2]) return null;
  return {
    value: Number(`${match[1]}${match[2]}${match[3] ?? "00"}`),
    precision: match[3] ? "day" : "month",
  } as const;
};

const sameYearEditorialRank = (entry: TrajectoryEntry) => {
  if (entry.category === "career") return 0;
  if (entry.displayLevel === "featured" || entry.featured) return 1;
  if (entry.displayLevel === "standard") return 2;
  return 3;
};

export const compareTrajectoryEntries = (a: TrajectoryEntry, b: TrajectoryEntry) => {
  const byYear = a.sortYear - b.sortYear;
  if (byYear !== 0) return byYear;

  const aStart = getDocumentedStartDate(a);
  const bStart = getDocumentedStartDate(b);
  if (aStart && bStart && aStart.value !== bStart.value) return aStart.value - bStart.value;

  const byEditorialPriority = sameYearEditorialRank(a) - sameYearEditorialRank(b);
  if (byEditorialPriority !== 0) return byEditorialPriority;

  return a.id.localeCompare(b.id);
};

export function getTrajectoryEntries(category?: TrajectoryCategory | "all") {
  return trajectoryEntries
    .filter((entry) => !category || category === "all" || entry.category === category)
    .sort(compareTrajectoryEntries);
}
