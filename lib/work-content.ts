import {
  getGalleryImages,
  getGalleryWorks,
  getPrimaryGalleryImages,
  getSelectedGalleryImages,
  getSelectedGalleryWorks,
  getWorks,
} from "@/lib/repositories/works-repository";

export async function getWorksFromContent() {
  return getWorks();
}

export async function getGalleryImagesFromContent() {
  return getGalleryImages(await getWorks());
}

export async function getPrimaryGalleryImagesFromContent() {
  return getPrimaryGalleryImages(await getWorks());
}

export async function getGalleryWorksFromContent() {
  return getGalleryWorks(await getWorks());
}

export async function getSelectedGalleryImagesFromContent() {
  return getSelectedGalleryImages(await getWorks());
}

export async function getSelectedGalleryWorksFromContent() {
  return getSelectedGalleryWorks(await getWorks());
}
