import {
  galleryImages,
  MAX_DRAFT_WORKS,
  MAX_IMAGES_PER_WORK,
  MAX_PUBLISHED_WORKS,
  siteContent,
  type Course,
  type GalleryImage,
  type Work,
  workCategoryLabels,
  works,
} from "@/lib/data";

export type AdminStatus = "Publicado" | "Borrador" | "En preparacion";

export interface AdminWork {
  title: string;
  meta: string;
  image: string;
  status: AdminStatus;
  updatedAt: string;
  galleryCount: number;
}

export interface AdminCourse {
  title: string;
  date: string;
  location: string;
  seats: string;
}

function formatCourseDate(course: Course) {
  if (!course.startDate) return "Sin fecha";

  const formatter = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
  });
  const start = formatter.format(new Date(`${course.startDate}T12:00:00`));

  if (!course.endDate || course.endDate === course.startDate) {
    return start;
  }

  return `${start} - ${formatter.format(new Date(`${course.endDate}T12:00:00`))}`;
}

export function getAdminWorks(currentWorks: Work[] = works): AdminWork[] {
  return currentWorks.map((work) => ({
    title: work.title,
    meta: [work.scale, work.brand ?? workCategoryLabels[work.category]]
      .filter(Boolean)
      .join(" · "),
    image: work.images[0]?.src ?? "/placeholders/gallery-1.svg",
    status:
      work.status === "published"
        ? "Publicado"
        : work.status === "draft"
          ? "Borrador"
          : "En preparacion",
    updatedAt: "Sincronizada con la galeria publica",
    galleryCount: Math.min(work.images.length, MAX_IMAGES_PER_WORK),
  }));
}

export function getAdminCourses(currentCourses: Course[]): AdminCourse[] {
  return currentCourses.map((course) => ({
    title: course.title,
    date: formatCourseDate(course),
    location: course.location || "Sin ciudad",
    seats:
      course.status === "active"
        ? `${course.seatsAvailable} / ${course.seatsTotal} plazas`
        : course.status === "hidden"
          ? "Oculto"
          : "Borrador",
  }));
}

export function getAdminStats(
  currentWorks: Work[] = works,
  currentGalleryImages: GalleryImage[] = galleryImages,
  currentCourses: Course[] = [],
  pendingInquiryCount = adminMessages.length
) {
  const adminWorks = getAdminWorks(currentWorks);

  return [
    {
      label: "Obras publicadas",
      value: String(
        currentWorks.filter((work) => work.status === "published").length
      ),
      detail: `Maximo ${MAX_PUBLISHED_WORKS} visibles`,
    },
    {
      label: "Imagenes en galeria",
      value: String(currentGalleryImages.length),
      detail: `Hasta ${MAX_IMAGES_PER_WORK} por obra`,
    },
    {
      label: "Borradores",
      value: String(adminWorks.filter((work) => work.status !== "Publicado").length),
      detail: `Maximo ${MAX_DRAFT_WORKS} en preparacion`,
    },
    {
      label: "Cursos activos",
      value: String(
        currentCourses.filter((course) => course.status === "active").length
      ),
      detail: `${currentCourses.length} cursos en el panel`,
    },
    {
      label: "Consultas pendientes",
      value: String(pendingInquiryCount),
      detail: "Desde formularios publicos",
    },
  ];
}

export function getPublicContentSections(galleryImageCount = galleryImages.length) {
  return [
    {
      title: "Inicio",
      source: "siteContent.hero",
      publicUrl: "/",
      detail: siteContent.hero.headline,
    },
    {
      title: "Formacion",
      source: "siteContent.training",
      publicUrl: "/#formacion",
      detail: siteContent.training.title,
    },
    {
      title: "Obras por encargo",
      source: "siteContent.commissions",
      publicUrl: "/#obras-por-encargo",
      detail: siteContent.commissions.title,
    },
    {
      title: "Sobre Julio",
      source: "siteContent.about",
      publicUrl: "/#sobre-mi",
      detail: siteContent.about.title,
    },
    {
      title: "Contacto",
      source: "siteContent.contact",
      publicUrl: "/#contacto",
      detail: siteContent.contact.email,
    },
    {
      title: "Galeria",
      source: "works -> galleryImages",
      publicUrl: "/galeria",
      detail: `${galleryImageCount} imagenes publicadas`,
    },
  ];
}

export const adminMessages = [
  {
    name: "Manuel Rodriguez",
    subject: "Consulta sobre curso presencial",
    time: "Hoy, 10:24",
  },
  {
    name: "Carlos Lopez",
    subject: "Informacion sobre encargos",
    time: "Ayer, 18:15",
  },
  {
    name: "David Martinez",
    subject: "Colaboracion - Proyecto editorial",
    time: "Ayer, 12:03",
  },
];

export const patreonIdeas = [
  {
    title: "Tutorial cuero templario",
    status: "Terminado",
    dueDate: "15 septiembre",
  },
  {
    title: "Volumen en armaduras",
    status: "Grabando",
    dueDate: "Sin fecha",
  },
];

export const adminNavigation = [
  "Inicio",
  "Obras",
  "Cursos",
  "Instagram",
  "Calendario",
  "Videos",
  "Alumnos",
  "Consultas",
  "Patreon",
  "Configuracion",
];
