import path from "node:path";
import {
  MAX_IMAGES_PER_WORK,
  MAX_PUBLISHED_WORKS,
} from "@/lib/work-options";
import type { GalleryImage, GalleryWork, Work } from "@/lib/work-types";
import { readJsonFile, writeJsonFile } from "./json-file";

const worksPath = path.join(process.cwd(), "content", "works.json");

export async function getWorks(): Promise<Work[]> {
  return readJsonFile<Work[]>(worksPath);
}

export async function saveWorks(works: Work[]) {
  await writeJsonFile(worksPath, works);
}

export function limitWorkImages(work: Work): Work {
  return {
    ...work,
    images: work.images.slice(0, MAX_IMAGES_PER_WORK),
  };
}

export function getPublishedWorks(works: Work[]) {
  return works
    .filter((work) => work.status === "published")
    .slice(0, MAX_PUBLISHED_WORKS);
}

export function mapWorkImageToGalleryImage(
  work: Work,
  image: Work["images"][number],
  index: number
): GalleryImage {
  return {
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
  };
}

export function getPrimaryWorkImage(work: Work) {
  return (
    work.images.find((image) => image.kind === "principal") ?? work.images[0]
  );
}

export function getGalleryImages(works: Work[]): GalleryImage[] {
  return getPublishedWorks(works).flatMap((work) =>
    work.images
      .slice(0, MAX_IMAGES_PER_WORK)
      .map((image, index) => mapWorkImageToGalleryImage(work, image, index))
  );
}

export function getPrimaryGalleryImages(works: Work[]): GalleryImage[] {
  return getPublishedWorks(works).flatMap((work) => {
    const primaryImage = getPrimaryWorkImage(work);
    if (!primaryImage) return [];
    const index = work.images.indexOf(primaryImage);
    return [mapWorkImageToGalleryImage(work, primaryImage, index)];
  });
}

export function getGalleryWorks(works: Work[]): GalleryWork[] {
  return getPublishedWorks(works).flatMap((work) => {
    const images = work.images
      .slice(0, MAX_IMAGES_PER_WORK)
      .map((image, index) => mapWorkImageToGalleryImage(work, image, index));

    if (images.length === 0) return [];

    const primaryImage = getPrimaryWorkImage(work);
    const primaryIndex = primaryImage ? work.images.indexOf(primaryImage) : 0;
    const cover = images[primaryIndex] ?? images[0];

    return [
      {
        slug: work.slug,
        title: work.title,
        category: work.category,
        scale: work.scale,
        brand: work.brand,
        year: work.year,
        cover,
        images,
      },
    ];
  });
}

export function getSelectedGalleryImages(works: Work[]): GalleryImage[] {
  return getPrimaryGalleryImages(works.filter((work) => work.showOnHome));
}

export function getSelectedGalleryWorks(works: Work[]): GalleryWork[] {
  return getGalleryWorks(works.filter((work) => work.showOnHome));
}

export function reorderWorks(works: Work[], order: string[]): Work[] {
  const worksBySlug = new Map(works.map((work) => [work.slug, work]));
  const usedSlugs = new Set<string>();
  const orderedWorks: Work[] = [];

  for (const slug of order) {
    const work = worksBySlug.get(slug);
    if (!work || usedSlugs.has(slug)) continue;
    orderedWorks.push(work);
    usedSlugs.add(slug);
  }

  return [
    ...orderedWorks,
    ...works.filter((work) => !usedSlugs.has(work.slug)),
  ];
}
