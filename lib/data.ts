export const siteContent = {
  hero: {
    title: "Julio Cabos",
    subtitle: "Pintura de miniaturas con criterio artístico",
    description:
      "Más de dos décadas dedicado a la pintura, la formación y la búsqueda de un estándar artístico en cada pieza.",
    cta: "Aprender conmigo",
    ctaHref: "#formacion",
    backgroundImage: "/images/hero.webp",
  },
  message: {
    text: [
      "La pintura de miniaturas no es solo técnica.",
      "Es entender la luz, el volumen y las decisiones que hacen que una figura funcione.",
      "",
      "Este es un espacio para aprender a pintar con criterio.",
    ],
  },
  training: {
    title: "Formación",
    text: "Formación presencial y online para todos los niveles. Un enfoque basado en entender la pintura, no solo ejecutarla.",
    primaryCta: "Cursos presenciales",
    primaryHref: "#contacto",
    secondaryCta: "Próximamente online",
    secondaryHref: "#",
  },
  about: {
    title: "Sobre Julio",
    image: "/images/about.webp",
    text: [
      "Julio Cabos es un pintor profesional de miniaturas con más de dos décadas de experiencia en el sector.",
      "Ha sido director de pintura en empresas de referencia como Andrea Miniatures y Scale75, liderando proyectos para coleccionistas y desarrollando publicaciones especializadas.",
      "Autor de más de 30 libros y formador internacional, combina su trabajo como pintor freelance con la enseñanza, ayudando a otros a entender la pintura desde el criterio y la experiencia.",
    ],
    cta: "Ver trayectoria",
    ctaHref: "/files/CV%20Funcional%20Julio.pdf",
  },
  contact: {
    title: "Contacto",
    text: "Si quieres aprender con Julio o colaborar en algún proyecto, puedes ponerte en contacto aquí.",
    email: "Juliocabosg@gmail.com",
    cta: "Enviar email",
  },
  footer: {
    name: "Julio Cabos",
    instagram: "https://www.instagram.com/juliocabos",
    facebook: "https://www.facebook.com/julio.cabos",
  },
};

export type GalleryCategory = "box-art" | "encargo" | "detalle" | "coleccion";

export interface GalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
  aspectRatio: "4/5" | "3/4" | "1/1" | "3/5";
  series?: string;
}

export const galleryImages: GalleryImage[] = [
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

export const categoryLabels: Record<GalleryCategory, string> = {
  "box-art": "Box Art",
  "encargo": "Encargos",
  "detalle": "Detalles",
  "coleccion": "Colección",
};
