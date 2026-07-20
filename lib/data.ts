import worksContent from "@/content/works.json";
import {
  MAX_IMAGES_PER_WORK,
  MAX_PUBLISHED_WORKS,
} from "@/lib/work-options";
import type { GalleryImage, Work } from "@/lib/work-types";

export { siteContent } from "@/lib/site-content";
export {
  MAX_DRAFT_WORKS,
  MAX_HOME_WORKS,
  MAX_IMAGES_PER_WORK,
  MAX_PUBLISHED_WORKS,
  categoryLabels,
  calendarEventTypeLabels,
  courseLevelOptions,
  workCategoryLabels,
  workSaleStatusLabels,
  workScaleOptions,
} from "@/lib/work-options";
export type {
  CalendarEvent,
  CalendarEventStatus,
  CalendarEventType,
  Course,
  CourseLevel,
  CourseStatus,
  GalleryCategory,
  GalleryImage,
  GalleryWork,
  InstagramPost,
  InstagramPostStatus,
  Work,
  WorkCategory,
  WorkImage,
  WorkSaleStatus,
  WorkScale,
  WorkStatus,
} from "@/lib/work-types";

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
      saleStatus: work.saleStatus ?? "none",
      salePrice: work.salePrice,
      saleNote: work.saleNote,
      imageLabel: `Imagen ${index + 1}`,
    }))
  );
