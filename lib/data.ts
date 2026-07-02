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
