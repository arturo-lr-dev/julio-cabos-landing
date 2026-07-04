import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  MAX_IMAGES_PER_WORK,
  MAX_PUBLISHED_WORKS,
  type GalleryImage,
  type GalleryWork,
  type Work,
} from "@/lib/data";

const worksPath = path.join(process.cwd(), "content", "works.json");

export async function getWorksFromContent() {
  const raw = await readFile(worksPath, "utf8");
  return JSON.parse(raw) as Work[];
}

function mapWorkImageToGalleryImage(
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

function getPrimaryImage(work: Work) {
  return (
    work.images.find((image) => image.kind === "principal") ?? work.images[0]
  );
}

export async function getGalleryImagesFromContent(): Promise<GalleryImage[]> {
  const works = await getWorksFromContent();

  return works
    .filter((work) => work.status === "published")
    .slice(0, MAX_PUBLISHED_WORKS)
    .flatMap((work) =>
      work.images
        .slice(0, MAX_IMAGES_PER_WORK)
        .map((image, index) => mapWorkImageToGalleryImage(work, image, index))
    );
}

export async function getPrimaryGalleryImagesFromContent(): Promise<
  GalleryImage[]
> {
  const works = await getWorksFromContent();

  return works
    .filter((work) => work.status === "published")
    .slice(0, MAX_PUBLISHED_WORKS)
    .flatMap((work) => {
      const primaryImage = getPrimaryImage(work);
      if (!primaryImage) return [];
      const index = work.images.indexOf(primaryImage);
      return [mapWorkImageToGalleryImage(work, primaryImage, index)];
    });
}

export async function getGalleryWorksFromContent(): Promise<GalleryWork[]> {
  const works = await getWorksFromContent();

  return works
    .filter((work) => work.status === "published")
    .slice(0, MAX_PUBLISHED_WORKS)
    .flatMap((work) => {
      const images = work.images
        .slice(0, MAX_IMAGES_PER_WORK)
        .map((image, index) => mapWorkImageToGalleryImage(work, image, index));

      if (images.length === 0) return [];

      const primaryImage = getPrimaryImage(work);
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

export async function getSelectedGalleryImagesFromContent(): Promise<
  GalleryImage[]
> {
  const works = await getWorksFromContent();

  return works
    .filter((work) => work.status === "published" && work.showOnHome)
    .slice(0, MAX_PUBLISHED_WORKS)
    .flatMap((work) => {
      const primaryImage = getPrimaryImage(work);
      if (!primaryImage) return [];
      const index = work.images.indexOf(primaryImage);
      return [mapWorkImageToGalleryImage(work, primaryImage, index)];
    });
}

export async function getSelectedGalleryWorksFromContent(): Promise<
  GalleryWork[]
> {
  const works = await getWorksFromContent();

  return works
    .filter((work) => work.status === "published" && work.showOnHome)
    .slice(0, MAX_PUBLISHED_WORKS)
    .flatMap((work) => {
      const images = work.images
        .slice(0, MAX_IMAGES_PER_WORK)
        .map((image, index) => mapWorkImageToGalleryImage(work, image, index));

      if (images.length === 0) return [];

      const primaryImage = getPrimaryImage(work);
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
