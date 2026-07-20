import type {
  CalendarEventType,
  CourseLevel,
  GalleryCategory,
  WorkCategory,
  WorkSaleStatus,
  WorkScale,
} from "@/lib/work-types";

export const MAX_PUBLISHED_WORKS = 20;
export const MAX_HOME_WORKS = 10;
export const MAX_DRAFT_WORKS = 1;
export const MAX_IMAGES_PER_WORK = 5;

export const workCategoryLabels: Record<WorkCategory, string> = {
  historico: "Histórico",
  fantasia: "Fantasía",
  "box-art": "Box Art",
  busto: "Busto",
  diorama: "Diorama",
  escenografia: "Escenografía",
};

export const categoryLabels: Record<GalleryCategory, string> =
  workCategoryLabels;

export const workSaleStatusLabels: Record<WorkSaleStatus, string> = {
  none: "Solo galeria",
  "for-sale": "En venta",
  reserved: "Reservada",
  sold: "Vendida",
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

export const courseLevelOptions: CourseLevel[] = [
  "Iniciacion",
  "Intermedio",
  "Avanzado",
  "Todos los niveles",
];

export const calendarEventTypeLabels: Record<CalendarEventType, string> = {
  curso: "Curso",
  feria: "Feria",
  concurso: "Concurso",
  charla: "Charla",
  recordatorio: "Recordatorio",
};
