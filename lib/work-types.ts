export type WorkCategory =
  | "historico"
  | "fantasia"
  | "box-art"
  | "busto"
  | "diorama"
  | "escenografia";

export type GalleryCategory = WorkCategory;
export type WorkStatus = "draft" | "in-progress" | "published" | "hidden";
export type WorkSaleStatus = "none" | "for-sale" | "reserved" | "sold";
export type CourseStatus = "draft" | "active" | "hidden";
export type InstagramPostStatus = "candidate" | "ignored" | "imported";
export type CalendarEventStatus = "active" | "hidden";
export type CalendarEventType =
  | "curso"
  | "feria"
  | "concurso"
  | "charla"
  | "recordatorio";
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
  saleStatus?: WorkSaleStatus;
  salePrice?: string;
  saleNote?: string;
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
  saleStatus?: WorkSaleStatus;
  salePrice?: string;
  saleNote?: string;
  imageLabel?: string;
}

export interface GalleryWork {
  slug: string;
  title: string;
  category: GalleryCategory;
  scale?: WorkScale | "";
  brand?: string;
  year?: string;
  saleStatus?: WorkSaleStatus;
  salePrice?: string;
  saleNote?: string;
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

export interface InstagramPost {
  id: string;
  permalink: string;
  caption: string;
  status: InstagramPostStatus;
  createdAt: string;
  importedWorkSlug?: string;
  images: WorkImage[];
}

export interface CalendarEvent {
  title: string;
  slug: string;
  type: CalendarEventType;
  status: CalendarEventStatus;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  publicUrl?: string;
}
