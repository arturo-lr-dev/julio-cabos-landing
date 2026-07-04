import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import {
  MAX_DRAFT_WORKS,
  MAX_IMAGES_PER_WORK,
  MAX_PUBLISHED_WORKS,
  type Work,
  type WorkImage,
  type WorkStatus,
} from "@/lib/data";

export const runtime = "nodejs";

const contentPath = path.join(process.cwd(), "content", "works.json");
const uploadsRoot = path.join(process.cwd(), "public", "uploads", "works");

function slugify(value: string) {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `obra-${Date.now()}`
  );
}

function sanitizeFilename(value: string) {
  const extension = path.extname(value).toLowerCase() || ".webp";
  const basename = path.basename(value, extension);
  return `${slugify(basename)}${extension}`;
}

async function readWorks() {
  const raw = await readFile(contentPath, "utf8");
  return JSON.parse(raw) as Work[];
}

async function writeWorks(works: Work[]) {
  await writeFile(contentPath, `${JSON.stringify(works, null, 2)}\n`, "utf8");
}

function normalizeMainImage(images: WorkImage[]) {
  const mainIndex = images.findIndex((image) => image.kind === "principal");
  const safeMainIndex = mainIndex >= 0 ? mainIndex : 0;

  return images.map((image, index) => ({
    ...image,
    kind: index === safeMainIndex ? "principal" as const : "detalle" as const,
  }));
}

function revalidateAdminAndPublicWorks() {
  revalidatePath("/");
  revalidatePath("/galeria");
  revalidatePath("/admin");
  revalidatePath("/admin/obras");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const rawWork = formData.get("work");

  if (typeof rawWork !== "string") {
    return Response.json({ error: "Faltan datos de la obra." }, { status: 400 });
  }

  const incoming = JSON.parse(rawWork) as Work;
  const slug = incoming.slug || slugify(incoming.title);
  const status = incoming.status as WorkStatus;

  if (status === "published" && !incoming.category) {
    return Response.json(
      { error: "Selecciona una categoria antes de publicar la obra." },
      { status: 400 }
    );
  }

  const currentWorks = await readWorks();
  const existingIndex = currentWorks.findIndex((work) => work.slug === slug);
  const otherWorks = currentWorks.filter((work) => work.slug !== slug);

  if (
    status === "published" &&
    existingIndex === -1 &&
    otherWorks.filter((work) => work.status === "published").length >=
      MAX_PUBLISHED_WORKS
  ) {
    return Response.json(
      { error: `Ya hay ${MAX_PUBLISHED_WORKS} obras publicadas.` },
      { status: 400 }
    );
  }

  if (
    status === "draft" &&
    existingIndex === -1 &&
    otherWorks.filter((work) => work.status === "draft").length >=
      MAX_DRAFT_WORKS
  ) {
    return Response.json(
      { error: "Solo puede haber un borrador." },
      { status: 400 }
    );
  }

  await mkdir(path.join(uploadsRoot, slug), { recursive: true });

  const images: WorkImage[] = [];
  for (const [index, image] of incoming.images
    .slice(0, MAX_IMAGES_PER_WORK)
    .entries()) {
    const fileField = `image-${index}`;
    const file = formData.get(fileField);

    if (file instanceof File) {
      const filename = sanitizeFilename(file.name);
      const destination = path.join(uploadsRoot, slug, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(destination, buffer);
      images.push({
        ...image,
        src: `/uploads/works/${slug}/${filename}`,
        alt: image.alt || file.name,
      });
      continue;
    }

    images.push(image);
  }

  const savedWork: Work = {
    ...incoming,
    slug,
    status,
    images: normalizeMainImage(images),
  };

  const nextWorks =
    existingIndex >= 0
      ? currentWorks.map((work) => (work.slug === slug ? savedWork : work))
      : [...currentWorks, savedWork];

  await writeWorks(nextWorks);
  revalidateAdminAndPublicWorks();

  return Response.json({ ok: true, work: savedWork });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return Response.json({ error: "Falta la obra a eliminar." }, { status: 400 });
  }

  const currentWorks = await readWorks();
  const nextWorks = currentWorks.filter((work) => work.slug !== slug);

  if (nextWorks.length === currentWorks.length) {
    return Response.json(
      { error: "No se ha encontrado esa obra." },
      { status: 404 }
    );
  }

  await writeWorks(nextWorks);
  revalidateAdminAndPublicWorks();

  return Response.json({ ok: true });
}

export async function PATCH(request: Request) {
  const payload = (await request.json()) as {
    order?: string[];
  };

  if (!Array.isArray(payload.order)) {
    return Response.json({ error: "Falta el orden de las obras." }, { status: 400 });
  }

  const currentWorks = await readWorks();
  const worksBySlug = new Map(currentWorks.map((work) => [work.slug, work]));
  const orderedWorks: Work[] = [];
  const usedSlugs = new Set<string>();

  for (const slug of payload.order) {
    const work = worksBySlug.get(slug);

    if (!work || usedSlugs.has(slug)) {
      continue;
    }

    orderedWorks.push(work);
    usedSlugs.add(slug);
  }

  const missingWorks = currentWorks.filter((work) => !usedSlugs.has(work.slug));

  await writeWorks([...orderedWorks, ...missingWorks]);
  revalidateAdminAndPublicWorks();

  return Response.json({ ok: true });
}
