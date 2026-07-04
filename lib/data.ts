import worksContent from "@/content/works.json";

export const siteContent = {
  hero: {
    title: "Julio Cabos",
    eyebrow: "Aprende · Encarga · Colabora",
    headline: "Pintar con criterio cambia tu forma de ver.",
    subtitle: "Miniaturas pintadas y enseñadas con criterio artístico",
    description:
      "Más de veinte años de experiencia profesional enseñando, creando y dando vida a miniaturas de exposición.",
    cta: "Aprender conmigo",
    ctaHref: "#formacion",
    secondaryCta: "Obras por encargo",
    secondaryHref: "#obras-por-encargo",
    quote:
      "La pintura de miniaturas no es solo técnica. Es entender la luz, el volumen y las decisiones que hacen que una figura funcione.",
    backgroundImage: "/images/hero.webp",
  },
  authority: [
    { value: "30+", label: "Libros publicados" },
    { value: "20+", label: "Años de experiencia" },
    { value: "Director de pintura", label: "Andrea Miniatures · Scale75" },
    { value: "Formador internacional", label: "Europa · EEUU" },
  ],
  pathways: {
    title: "¿Qué estás buscando?",
    subtitle: "Elige tu camino. Te acompañaré según tus objetivos.",
    items: [
      {
        title: "Aprender",
        kicker: "con Julio",
        text:
          "Cursos presenciales y formación online para aprender a pintar miniaturas con criterio.",
        cta: "Ver formación",
        href: "#formacion",
        image: "/images/about.webp",
      },
      {
        title: "Obras",
        kicker: "por encargo",
        text:
          "Piezas únicas pintadas a mano para coleccionistas, marcas y proyectos privados.",
        cta: "Encargar una obra",
        href: "#obras-por-encargo",
        image: "/images/gallery/templario.webp",
      },
      {
        title: "Colaboraciones",
        kicker: "profesionales",
        text:
          "Box art, dirección artística y proyectos editoriales para empresas del sector.",
        cta: "Colaborar conmigo",
        href: "#colaboraciones",
        image: "/images/gallery/arquero.webp",
      },
    ],
  },
  message: {
    text: [
      "No enseño a copiar efectos. Enseño a comprender por qué funcionan.",
      "Un método que te da libertad, seguridad y criterio para enfrentarte a cualquier miniatura.",
      "",
      "Antes de coger el pincel, aprendemos a mirar: luz, color, volumen y decisiones.",
    ],
  },
  training: {
    title: "Formación",
    text: "No se trata de memorizar recetas. Se trata de aprender a analizar una figura antes de pintar: dónde está la luz, qué volumen manda y qué decisiones hacen que una miniatura funcione.",
    primaryCta: "Solicitar información",
    primaryHref: "#contacto",
    secondaryCta: "Próximamente online",
    secondaryHref: "#",
  },
  commissions: {
    title: "Obras por encargo",
    text:
      "Trabajo con un número reducido de proyectos al año para garantizar dedicación, criterio y acabado profesional. Si buscas una pieza realizada específicamente para tu colección o marca, estudiaré tu proyecto con detalle.",
    items: [
      "Piezas únicas para colecciones privadas",
      "Box art y miniaturas de exposición",
      "Proyectos especiales para marcas y editoriales",
    ],
    cta: "Solicitar una obra",
    href: "#contacto",
  },
  collaborations: {
    title: "Colaboraciones profesionales",
    text:
      "Experiencia en dirección de pintura, publicaciones especializadas, box art y desarrollo visual para empresas del sector.",
    items: [
      "Fabricantes de miniaturas y marcas de pintura",
      "Editoriales, publicaciones y material didáctico",
      "Asesoramiento artístico y proyectos a medida",
    ],
    cta: "Proponer colaboración",
    href: "#contacto",
  },
  about: {
    title: "Sobre Julio",
    image: "/hoy.png",
    text: [
      "Julio Cabos no ha construido su trayectoria alrededor de una técnica aislada, sino de una forma de mirar la miniatura antes de pintarla.",
      "Más de dos décadas de trabajo profesional, dirección artística, publicaciones y formación internacional sostienen un método basado en comprender la luz, el color, el volumen y las decisiones que hacen funcionar una figura.",
      "Hoy combina obra por encargo, colaboraciones profesionales y formación para alumnos que quieren pintar con más seguridad, criterio y libertad.",
    ],
    cta: "Ver trayectoria",
    ctaHref: "/files/CV-Julio-Cabos.pdf",
  },
  contact: {
    title: "Contacto",
    text: "Cuéntame si quieres aprender, encargar una pieza o proponer una colaboración profesional. Responderé personalmente para valorar el mejor camino.",
    email: "Juliocabosg@gmail.com",
    cta: "Enviar email",
  },
  footer: {
    name: "Julio Cabos",
    instagram: "https://www.instagram.com/juliocabos",
    facebook: "https://www.facebook.com/julio.cabos",
  },
};

type LegacyGalleryCategory = "box-art" | "encargo" | "detalle" | "coleccion";
export type WorkCategory =
  | "historico"
  | "fantasia"
  | "box-art"
  | "busto"
  | "diorama"
  | "escenografia";
export type GalleryCategory = WorkCategory;
export type WorkStatus = "draft" | "in-progress" | "published" | "hidden";
export type CourseStatus = "draft" | "active" | "hidden";
export type CourseLevel =
  | "Iniciacion"
  | "Intermedio"
  | "Avanzado"
  | "Todos los niveles";
export type WorkScale =
  | "Busto"
  | "28 mm"
  | "54 mm"
  | "75 mm"
  | "90 mm"
  | "120 mm"
  | "1/10"
  | "1/9"
  | "1/6";

export interface WorkImage {
  src: string;
  alt: string;
  aspectRatio: "4/5" | "3/4" | "1/1" | "3/5";
  kind: "principal" | "detalle";
}

export interface Work {
  title: string;
  slug: string;
  category: WorkCategory;
  scale?: WorkScale | "";
  brand?: string;
  year?: string;
  description: string;
  status: WorkStatus;
  featured: boolean;
  showOnHome: boolean;
  images: WorkImage[];
}

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
  aspectRatio: "4/5" | "3/4" | "1/1" | "3/5";
  series?: string;
  title?: string;
  scale?: WorkScale | "";
  brand?: string;
  year?: string;
  imageLabel?: string;
}

export interface GalleryWork {
  slug: string;
  title: string;
  category: GalleryCategory;
  scale?: WorkScale | "";
  brand?: string;
  year?: string;
  cover: GalleryImage;
  images: GalleryImage[];
}

export interface Course {
  title: string;
  slug: string;
  status: CourseStatus;
  location: string;
  startDate: string;
  endDate?: string;
  price: string;
  seatsTotal: number;
  seatsAvailable: number;
  level: CourseLevel;
  materials: string;
  description: string;
  bookingUrl: string;
  posterImage?: string;
  posterAlt?: string;
}

export const MAX_PUBLISHED_WORKS = 10;
export const MAX_DRAFT_WORKS = 1;
export const MAX_IMAGES_PER_WORK = 5;

export const courseLevelOptions: CourseLevel[] = [
  "Iniciacion",
  "Intermedio",
  "Avanzado",
  "Todos los niveles",
];

const legacyGalleryImages: Array<
  Omit<GalleryImage, "category"> & { category: LegacyGalleryCategory }
> = [
  { src: "/images/gallery/samurai.webp", alt: "Samurái — miniatura pintada por Julio Cabos", category: "box-art", aspectRatio: "4/5", series: "samurai" },
  { src: "/images/gallery/templario.webp", alt: "Templario — encargo de pintura", category: "encargo", aspectRatio: "3/4", series: "templario" },
  { src: "/images/gallery/abanderado.webp", alt: "Abanderado — figura histórica", category: "box-art", aspectRatio: "4/5", series: "abanderado" },
  { src: "/images/gallery/paracaidista.webp", alt: "Paracaidista — box art", category: "box-art", aspectRatio: "3/5", series: "paracaidista" },
  { src: "/images/gallery/soldado.webp", alt: "Soldado — box art", category: "box-art", aspectRatio: "4/5", series: "soldado" },
  { src: "/images/gallery/arquero.webp", alt: "Arquero — encargo de pintura", category: "encargo", aspectRatio: "3/4", series: "arquero" },
  { src: "/images/gallery/arabia.webp", alt: "Figura árabe — box art", category: "box-art", aspectRatio: "4/5", series: "arabia" },
  { src: "/images/gallery/lancero.webp", alt: "Lancero — figura histórica", category: "box-art", aspectRatio: "3/4", series: "lancero" },
  { src: "/images/gallery/samurai-2.webp", alt: "Samurái — detalle", category: "detalle", aspectRatio: "1/1", series: "samurai" },
  { src: "/images/gallery/samurai-3.webp", alt: "Samurái — detalle", category: "detalle", aspectRatio: "4/5", series: "samurai" },
  { src: "/images/gallery/samurai-4.webp", alt: "Samurái — detalle", category: "detalle", aspectRatio: "1/1", series: "samurai" },
  { src: "/images/gallery/samurai-5.webp", alt: "Samurái — detalle", category: "detalle", aspectRatio: "3/4", series: "samurai" },
  { src: "/images/gallery/templario-2.webp", alt: "Templario — detalle", category: "detalle", aspectRatio: "1/1", series: "templario" },
  { src: "/images/gallery/templario-3.webp", alt: "Templario — detalle", category: "detalle", aspectRatio: "4/5", series: "templario" },
  { src: "/images/gallery/templario-4.webp", alt: "Templario — detalle", category: "detalle", aspectRatio: "3/4", series: "templario" },
  { src: "/images/gallery/templario-5.webp", alt: "Templario — detalle", category: "detalle", aspectRatio: "1/1", series: "templario" },
  { src: "/images/gallery/templario-6.webp", alt: "Templario — detalle", category: "detalle", aspectRatio: "4/5", series: "templario" },
  { src: "/images/gallery/templario-7.webp", alt: "Templario — detalle", category: "detalle", aspectRatio: "3/4", series: "templario" },
  { src: "/images/gallery/templario-8.webp", alt: "Templario — detalle", category: "detalle", aspectRatio: "1/1", series: "templario" },
  { src: "/images/gallery/arquero-2.webp", alt: "Arquero — detalle", category: "detalle", aspectRatio: "4/5", series: "arquero" },
  { src: "/images/gallery/arquero-3.webp", alt: "Arquero — detalle", category: "detalle", aspectRatio: "3/4", series: "arquero" },
  { src: "/images/gallery/arquero-4.webp", alt: "Arquero — detalle", category: "detalle", aspectRatio: "1/1", series: "arquero" },
  { src: "/images/gallery/soldado-2.webp", alt: "Soldado — detalle", category: "detalle", aspectRatio: "3/4", series: "soldado" },
  { src: "/images/gallery/soldado-3.webp", alt: "Soldado — detalle", category: "detalle", aspectRatio: "4/5", series: "soldado" },
  { src: "/images/gallery/soldado-4.webp", alt: "Soldado — detalle", category: "detalle", aspectRatio: "1/1", series: "soldado" },
  { src: "/images/gallery/arabia-2.webp", alt: "Figura árabe — detalle", category: "detalle", aspectRatio: "3/4", series: "arabia" },
  { src: "/images/gallery/paracaidista-2.webp", alt: "Paracaidista — detalle", category: "detalle", aspectRatio: "4/5", series: "paracaidista" },
  { src: "/images/gallery/paracaidista-3.webp", alt: "Paracaidista — detalle", category: "detalle", aspectRatio: "1/1", series: "paracaidista" },
  { src: "/images/gallery/paracaidista-4.webp", alt: "Paracaidista — detalle", category: "detalle", aspectRatio: "3/4", series: "paracaidista" },
  { src: "/images/gallery/paracaidista-5.webp", alt: "Paracaidista — detalle", category: "detalle", aspectRatio: "4/5", series: "paracaidista" },
  { src: "/images/gallery/lancero-2.webp", alt: "Lancero — detalle", category: "detalle", aspectRatio: "1/1", series: "lancero" },
  { src: "/images/gallery/mini-1.webp", alt: "Miniatura de colección", category: "coleccion", aspectRatio: "3/4" },
  { src: "/images/gallery/mini-2.webp", alt: "Miniatura de colección", category: "coleccion", aspectRatio: "4/5" },
];

const workDefaults: Record<
  string,
  Pick<
    Work,
    | "title"
    | "category"
    | "scale"
    | "brand"
    | "description"
    | "featured"
    | "showOnHome"
  >
> = {
  samurai: {
    title: "Samurai",
    category: "box-art",
    scale: "75 mm",
    brand: "Scale75",
    description: "Miniatura de exposicion con varios detalles de proceso.",
    featured: true,
    showOnHome: true,
  },
  templario: {
    title: "Templario",
    category: "historico",
    scale: "54 mm",
    brand: "Pegaso Models",
    description: "Encargo de pintura con estudio de metal, tela y cuero.",
    featured: true,
    showOnHome: true,
  },
  abanderado: {
    title: "Abanderado",
    category: "historico",
    scale: "54 mm",
    brand: "Andrea Miniatures",
    description: "Figura historica con protagonismo de color y bandera.",
    featured: true,
    showOnHome: true,
  },
  paracaidista: {
    title: "Paracaidista",
    category: "box-art",
    scale: "54 mm",
    brand: "Pegaso Models",
    description: "Box art de figura militar con multiples vistas de detalle.",
    featured: true,
    showOnHome: true,
  },
  soldado: {
    title: "Soldado",
    category: "box-art",
    description: "Trabajo de box art con estudio de uniforme y equipo.",
    featured: false,
    showOnHome: true,
  },
  arquero: {
    title: "Arquero",
    category: "fantasia",
    description: "Encargo de pintura con composicion escenica.",
    featured: false,
    showOnHome: true,
  },
  arabia: {
    title: "Figura arabe",
    category: "historico",
    description: "Figura historica con tratamiento de telas claras.",
    featured: false,
    showOnHome: true,
  },
  lancero: {
    title: "Lancero",
    category: "historico",
    description: "Figura historica con lanza y lectura vertical.",
    featured: false,
    showOnHome: true,
  },
  "miniaturas-coleccion": {
    title: "Miniaturas de coleccion",
    category: "fantasia",
    description: "Piezas de coleccion y ejemplos complementarios.",
    featured: false,
    showOnHome: false,
  },
};

function getLegacyTitle(image: { alt: string }) {
  return image.alt.split(/—|â€”|-/)[0]?.trim() || "Obra";
}

function getWorkCategoryFromGalleryCategory(
  category: LegacyGalleryCategory
): WorkCategory {
  if (category === "box-art") return "box-art";
  if (category === "encargo") return "fantasia";
  return "fantasia";
}

export const workCategoryLabels: Record<WorkCategory, string> = {
  historico: "Histórico",
  fantasia: "Fantasía",
  "box-art": "Box Art",
  busto: "Busto",
  diorama: "Diorama",
  escenografia: "Escenografía",
};

export const workScaleOptions: WorkScale[] = [
  "Busto",
  "28 mm",
  "54 mm",
  "75 mm",
  "90 mm",
  "120 mm",
  "1/10",
  "1/9",
  "1/6",
];

export const legacyWorks: Work[] = Object.values(
  legacyGalleryImages.reduce<Record<string, Work>>((acc, image) => {
    const slug =
      image.series ??
      (image.category === "coleccion"
        ? "miniaturas-coleccion"
        : image.src.replace(/[^a-z0-9]+/gi, "-"));
    const defaults = workDefaults[slug];

    if (!acc[slug]) {
      acc[slug] = {
        title: defaults?.title ?? getLegacyTitle(image),
        slug,
        category:
          defaults?.category ?? getWorkCategoryFromGalleryCategory(image.category),
        scale: defaults?.scale,
        brand: defaults?.brand,
        description:
          defaults?.description ??
          "Obra importada desde la galeria existente.",
        status: "published",
        featured: defaults?.featured ?? false,
        showOnHome: defaults?.showOnHome ?? image.category !== "coleccion",
        images: [],
      };
    }

    acc[slug].images.push({
      src: image.src,
      alt: image.alt,
      aspectRatio: image.aspectRatio,
      kind: image.category === "detalle" ? "detalle" : "principal",
    });

    return acc;
  }, {})
);

export const works: Work[] = (worksContent as Work[]).map((work) => ({
  ...work,
  images: work.images.slice(0, MAX_IMAGES_PER_WORK),
}));

export const galleryImages: GalleryImage[] = works
  .filter((work) => work.status === "published")
  .slice(0, MAX_PUBLISHED_WORKS)
  .flatMap((work) =>
    work.images.slice(0, MAX_IMAGES_PER_WORK).map((image, index) => ({
      src: image.src,
      alt: image.alt || `${work.title} - imagen ${index + 1}`,
      category: work.category,
      aspectRatio: image.aspectRatio,
      series: work.slug,
      title: work.title,
      scale: work.scale,
      brand: work.brand,
      year: work.year,
      imageLabel: `Imagen ${index + 1}`,
    }))
  );

export const categoryLabels: Record<GalleryCategory, string> = workCategoryLabels;
