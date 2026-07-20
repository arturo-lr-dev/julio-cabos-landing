import { revalidatePath } from "next/cache";
import {
  MAX_DRAFT_WORKS,
  MAX_PUBLISHED_WORKS,
} from "@/lib/work-options";
import type { Work, WorkImage, WorkSaleStatus, WorkStatus } from "@/lib/work-types";
import {
  getWorks,
  reorderWorks,
  saveWorks,
} from "@/lib/repositories/works-repository";
import { ServiceError } from "./service-error";
import { slugify } from "./slug";

export function getWorkSlug(work: Pick<Work, "slug" | "title">) {
  return work.slug || slugify(work.title, "obra");
}

export function normalizeMainImage(images: WorkImage[]) {
  const mainIndex = images.findIndex((image) => image.kind === "principal");
  const safeMainIndex = mainIndex >= 0 ? mainIndex : 0;

  return images.map((image, index) => ({
    ...image,
    kind: index === safeMainIndex ? "principal" as const : "detalle" as const,
  }));
}

export function revalidateAdminAndPublicWorks() {
  revalidatePath("/");
  revalidatePath("/galeria");
  revalidatePath("/admin");
  revalidatePath("/admin/obras");
}

export async function upsertWork(incoming: Work, images: WorkImage[]) {
  const slug = getWorkSlug(incoming);
  const status = incoming.status as WorkStatus;
  const saleStatus = (incoming.saleStatus ?? "none") as WorkSaleStatus;
  const isCommercialWork = saleStatus !== "none";

  if (status === "published" && !incoming.category) {
    throw new ServiceError("Selecciona una categoria antes de publicar la obra.");
  }

  const currentWorks = await getWorks();
  const existingIndex = currentWorks.findIndex((work) => work.slug === slug);
  const otherWorks = currentWorks.filter((work) => work.slug !== slug);

  if (
    status === "published" &&
    existingIndex === -1 &&
    otherWorks.filter((work) => work.status === "published").length >=
      MAX_PUBLISHED_WORKS
  ) {
    throw new ServiceError(`Ya hay ${MAX_PUBLISHED_WORKS} obras publicadas.`);
  }

  if (
    status === "draft" &&
    existingIndex === -1 &&
    otherWorks.filter((work) => work.status === "draft").length >=
      MAX_DRAFT_WORKS
  ) {
    throw new ServiceError("Solo puede haber un borrador.");
  }

  const savedWork: Work = {
    ...incoming,
    slug,
    status,
    saleStatus,
    salePrice: isCommercialWork ? incoming.salePrice?.trim() ?? "" : "",
    saleNote: isCommercialWork ? incoming.saleNote?.trim() ?? "" : "",
    images: normalizeMainImage(images),
  };

  const nextWorks =
    existingIndex >= 0
      ? currentWorks.map((work) => (work.slug === slug ? savedWork : work))
      : [...currentWorks, savedWork];

  await saveWorks(nextWorks);
  revalidateAdminAndPublicWorks();

  return savedWork;
}

export async function deleteWork(slug: string) {
  if (!slug) {
    throw new ServiceError("Falta la obra a eliminar.");
  }

  const currentWorks = await getWorks();
  const nextWorks = currentWorks.filter((work) => work.slug !== slug);

  if (nextWorks.length === currentWorks.length) {
    throw new ServiceError("No se ha encontrado esa obra.", 404);
  }

  await saveWorks(nextWorks);
  revalidateAdminAndPublicWorks();
}

export async function reorderAdminWorks(order: string[]) {
  const currentWorks = await getWorks();
  await saveWorks(reorderWorks(currentWorks, order));
  revalidateAdminAndPublicWorks();
}
