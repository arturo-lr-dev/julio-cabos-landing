import { revalidatePath } from "next/cache";
import {
  MAX_IMAGES_PER_WORK,
  MAX_PUBLISHED_WORKS,
} from "@/lib/work-options";
import type {
  InstagramPost,
  InstagramPostStatus,
  Work,
  WorkCategory,
  WorkImage,
  WorkScale,
  WorkStatus,
} from "@/lib/work-types";
import {
  getInstagramPosts,
  saveInstagramPosts,
} from "@/lib/repositories/instagram-repository";
import {
  getWorks,
  saveWorks,
} from "@/lib/repositories/works-repository";
import { ServiceError } from "./service-error";
import { slugify } from "./slug";

export interface InstagramImportPayload {
  action?: "ignore" | "restore" | "import";
  id?: string;
  title?: string;
  category?: WorkCategory;
  status?: WorkStatus;
  scale?: WorkScale | "";
  brand?: string;
  year?: string;
  description?: string;
  showOnHome?: boolean;
}

export interface PreparedInstagramImport {
  post: InstagramPost;
  title: string;
  slug: string;
  status: WorkStatus;
}

export function getInstagramPostId(permalink: string) {
  return slugify(permalink.replace(/^https?:\/\//, ""), "instagram");
}

export function normalizeInstagramImages(images: WorkImage[]) {
  return images.map((image, index) => ({
    ...image,
    kind: index === 0 ? "principal" as const : "detalle" as const,
  }));
}

export function revalidateInstagramImport() {
  revalidatePath("/");
  revalidatePath("/galeria");
  revalidatePath("/admin");
  revalidatePath("/admin/instagram");
  revalidatePath("/admin/obras");
}

export async function upsertInstagramCandidate(input: {
  permalink: string;
  caption: string;
  images: WorkImage[];
}) {
  const permalink = input.permalink.trim();

  if (!permalink) {
    throw new ServiceError("Pega el enlace de Instagram antes de guardar.");
  }

  if (input.images.length === 0) {
    throw new ServiceError("Anade al menos una imagen para copiarla a la web.");
  }

  const id = getInstagramPostId(permalink);
  const currentPosts = await getInstagramPosts();
  const existingIndex = currentPosts.findIndex((post) => post.id === id);
  const savedPost: InstagramPost = {
    id,
    permalink,
    caption: input.caption.trim(),
    status: "candidate",
    createdAt: new Date().toISOString(),
    images: normalizeInstagramImages(input.images),
  };

  const nextPosts =
    existingIndex >= 0
      ? currentPosts.map((post) => (post.id === id ? savedPost : post))
      : [savedPost, ...currentPosts];

  await saveInstagramPosts(nextPosts);
  revalidateInstagramImport();

  return savedPost;
}

export async function updateInstagramPostStatus(
  id: string,
  action: "ignore" | "restore"
) {
  const currentPosts = await getInstagramPosts();
  const post = currentPosts.find((item) => item.id === id);

  if (!post) {
    throw new ServiceError("No se ha encontrado esa publicacion.", 404);
  }

  const status: InstagramPostStatus =
    action === "ignore" ? "ignored" : "candidate";

  await saveInstagramPosts(
    currentPosts.map((item) =>
      item.id === post.id ? { ...item, status } : item
    )
  );
  revalidateInstagramImport();
}

export async function prepareInstagramImport(
  payload: InstagramImportPayload
): Promise<PreparedInstagramImport> {
  if (!payload.id) {
    throw new ServiceError("Falta la publicacion de Instagram.");
  }

  const currentPosts = await getInstagramPosts();
  const post = currentPosts.find((item) => item.id === payload.id);

  if (!post) {
    throw new ServiceError("No se ha encontrado esa publicacion.", 404);
  }

  if (!payload.category) {
    throw new ServiceError("Selecciona una categoria para crear la obra.");
  }

  const title = payload.title?.trim() || post.caption.split("\n")[0] || "Obra";
  const slug = slugify(title, "instagram");
  const status = payload.status ?? "in-progress";
  const currentWorks = await getWorks();

  if (currentWorks.some((work) => work.slug === slug)) {
    throw new ServiceError("Ya existe una obra con ese titulo.");
  }

  if (
    status === "published" &&
    currentWorks.filter((work) => work.status === "published").length >=
      MAX_PUBLISHED_WORKS
  ) {
    throw new ServiceError(`Ya hay ${MAX_PUBLISHED_WORKS} obras publicadas.`);
  }

  return { post, title, slug, status };
}

export async function completeInstagramImport(
  payload: InstagramImportPayload,
  prepared: PreparedInstagramImport,
  copiedImages: WorkImage[]
) {
  if (!payload.category) {
    throw new ServiceError("Selecciona una categoria para crear la obra.");
  }

  const currentWorks = await getWorks();
  const currentPosts = await getInstagramPosts();
  const work: Work = {
    title: prepared.title,
    slug: prepared.slug,
    category: payload.category,
    scale: payload.scale ?? "",
    brand: payload.brand?.trim() ?? "",
    year: payload.year?.trim() ?? "",
    description: payload.description?.trim() || prepared.post.caption,
    status: prepared.status,
    featured: false,
    showOnHome: payload.showOnHome ?? true,
    images: copiedImages.slice(0, MAX_IMAGES_PER_WORK),
  };

  await saveWorks([...currentWorks, work]);
  await saveInstagramPosts(
    currentPosts.map((item) =>
      item.id === prepared.post.id
        ? { ...item, status: "imported", importedWorkSlug: prepared.slug }
        : item
    )
  );
  revalidateInstagramImport();

  return work;
}

export async function deleteInstagramPost(id: string) {
  if (!id) {
    throw new ServiceError("Falta la publicacion a eliminar.");
  }

  const currentPosts = await getInstagramPosts();
  const nextPosts = currentPosts.filter((post) => post.id !== id);

  if (nextPosts.length === currentPosts.length) {
    throw new ServiceError("No se ha encontrado esa publicacion.", 404);
  }

  await saveInstagramPosts(nextPosts);
  revalidateInstagramImport();
}
