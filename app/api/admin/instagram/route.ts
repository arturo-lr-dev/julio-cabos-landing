import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import {
  MAX_IMAGES_PER_WORK,
  MAX_PUBLISHED_WORKS,
  type InstagramPost,
  type InstagramPostStatus,
  type Work,
  type WorkCategory,
  type WorkImage,
  type WorkScale,
  type WorkStatus,
} from "@/lib/data";

export const runtime = "nodejs";

const instagramPath = path.join(
  process.cwd(),
  "content",
  "instagram-posts.json"
);
const worksPath = path.join(process.cwd(), "content", "works.json");
const instagramUploadsRoot = path.join(
  process.cwd(),
  "public",
  "uploads",
  "instagram"
);
const worksUploadsRoot = path.join(process.cwd(), "public", "uploads", "works");

function slugify(value: string) {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `instagram-${Date.now()}`
  );
}

function sanitizeFilename(value: string) {
  const extension = path.extname(value).toLowerCase() || ".jpg";
  const basename = path.basename(value, extension);
  return `${slugify(basename)}${extension}`;
}

async function readInstagramPosts() {
  const raw = await readFile(instagramPath, "utf8");
  return JSON.parse(raw) as InstagramPost[];
}

async function writeInstagramPosts(posts: InstagramPost[]) {
  await writeFile(instagramPath, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
}

async function readWorks() {
  const raw = await readFile(worksPath, "utf8");
  return JSON.parse(raw) as Work[];
}

async function writeWorks(works: Work[]) {
  await writeFile(worksPath, `${JSON.stringify(works, null, 2)}\n`, "utf8");
}

function normalizeMainImage(images: WorkImage[]) {
  return images.map((image, index) => ({
    ...image,
    kind: index === 0 ? "principal" as const : "detalle" as const,
  }));
}

function revalidateInstagramImport() {
  revalidatePath("/");
  revalidatePath("/galeria");
  revalidatePath("/admin");
  revalidatePath("/admin/instagram");
  revalidatePath("/admin/obras");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const rawPost = formData.get("post");

  if (typeof rawPost !== "string") {
    return Response.json(
      { error: "Faltan datos de la publicacion." },
      { status: 400 }
    );
  }

  const incoming = JSON.parse(rawPost) as Pick<
    InstagramPost,
    "caption" | "permalink"
  >;
  const permalink = incoming.permalink.trim();

  if (!permalink) {
    return Response.json(
      { error: "Pega el enlace de Instagram antes de guardar." },
      { status: 400 }
    );
  }

  const id = slugify(permalink.replace(/^https?:\/\//, ""));
  await mkdir(path.join(instagramUploadsRoot, id), { recursive: true });

  const images: WorkImage[] = [];
  for (let index = 0; index < MAX_IMAGES_PER_WORK; index += 1) {
    const file = formData.get(`image-${index}`);

    if (!(file instanceof File)) {
      continue;
    }

    const filename = sanitizeFilename(file.name);
    const destination = path.join(instagramUploadsRoot, id, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(destination, buffer);
    images.push({
      src: `/uploads/instagram/${id}/${filename}`,
      alt: incoming.caption || file.name,
      aspectRatio: "4/5",
      kind: images.length === 0 ? "principal" : "detalle",
    });
  }

  if (images.length === 0) {
    return Response.json(
      { error: "Anade al menos una imagen para copiarla a la web." },
      { status: 400 }
    );
  }

  const currentPosts = await readInstagramPosts();
  const existingIndex = currentPosts.findIndex((post) => post.id === id);
  const savedPost: InstagramPost = {
    id,
    permalink,
    caption: incoming.caption.trim(),
    status: "candidate",
    createdAt: new Date().toISOString(),
    images: normalizeMainImage(images),
  };

  const nextPosts =
    existingIndex >= 0
      ? currentPosts.map((post) => (post.id === id ? savedPost : post))
      : [savedPost, ...currentPosts];

  await writeInstagramPosts(nextPosts);
  revalidateInstagramImport();

  return Response.json({ ok: true, post: savedPost });
}

export async function PATCH(request: Request) {
  const payload = (await request.json()) as {
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
  };

  if (!payload.id) {
    return Response.json(
      { error: "Falta la publicacion de Instagram." },
      { status: 400 }
    );
  }

  const currentPosts = await readInstagramPosts();
  const post = currentPosts.find((item) => item.id === payload.id);

  if (!post) {
    return Response.json(
      { error: "No se ha encontrado esa publicacion." },
      { status: 404 }
    );
  }

  if (payload.action === "ignore" || payload.action === "restore") {
    const status: InstagramPostStatus =
      payload.action === "ignore" ? "ignored" : "candidate";
    const nextPosts = currentPosts.map((item) =>
      item.id === post.id ? { ...item, status } : item
    );

    await writeInstagramPosts(nextPosts);
    revalidateInstagramImport();

    return Response.json({ ok: true });
  }

  if (payload.action !== "import") {
    return Response.json({ error: "Accion no valida." }, { status: 400 });
  }

  const title = payload.title?.trim() || post.caption.split("\n")[0] || "Obra";
  const slug = slugify(title);
  const status = payload.status ?? "in-progress";

  if (!payload.category) {
    return Response.json(
      { error: "Selecciona una categoria para crear la obra." },
      { status: 400 }
    );
  }

  const currentWorks = await readWorks();
  const existingWork = currentWorks.some((work) => work.slug === slug);

  if (existingWork) {
    return Response.json(
      { error: "Ya existe una obra con ese titulo." },
      { status: 400 }
    );
  }

  if (
    status === "published" &&
    currentWorks.filter((work) => work.status === "published").length >=
      MAX_PUBLISHED_WORKS
  ) {
    return Response.json(
      { error: `Ya hay ${MAX_PUBLISHED_WORKS} obras publicadas.` },
      { status: 400 }
    );
  }

  await mkdir(path.join(worksUploadsRoot, slug), { recursive: true });

  const copiedImages: WorkImage[] = [];
  for (const [index, image] of post.images
    .slice(0, MAX_IMAGES_PER_WORK)
    .entries()) {
    const source = path.join(process.cwd(), "public", image.src);
    const extension = path.extname(image.src) || ".jpg";
    const filename = `instagram-${index + 1}${extension}`;
    const destination = path.join(worksUploadsRoot, slug, filename);
    await copyFile(source, destination);
    copiedImages.push({
      ...image,
      src: `/uploads/works/${slug}/${filename}`,
      alt: `${title} - imagen ${index + 1}`,
      kind: index === 0 ? "principal" : "detalle",
    });
  }

  const work: Work = {
    title,
    slug,
    category: payload.category,
    scale: payload.scale ?? "",
    brand: payload.brand?.trim() ?? "",
    year: payload.year?.trim() ?? "",
    description: payload.description?.trim() || post.caption,
    status,
    featured: false,
    showOnHome: payload.showOnHome ?? true,
    images: copiedImages,
  };

  await writeWorks([...currentWorks, work]);
  await writeInstagramPosts(
    currentPosts.map((item) =>
      item.id === post.id
        ? { ...item, status: "imported", importedWorkSlug: slug }
        : item
    )
  );
  revalidateInstagramImport();

  return Response.json({ ok: true, work });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return Response.json(
      { error: "Falta la publicacion a eliminar." },
      { status: 400 }
    );
  }

  const currentPosts = await readInstagramPosts();
  const nextPosts = currentPosts.filter((post) => post.id !== id);

  if (nextPosts.length === currentPosts.length) {
    return Response.json(
      { error: "No se ha encontrado esa publicacion." },
      { status: 404 }
    );
  }

  await writeInstagramPosts(nextPosts);
  revalidateInstagramImport();

  return Response.json({ ok: true });
}
