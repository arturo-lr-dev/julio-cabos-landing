import {
  MAX_IMAGES_PER_WORK,
  type InstagramPost,
  type WorkCategory,
  type WorkImage,
  type WorkScale,
  type WorkStatus,
} from "@/lib/data";
import {
  completeInstagramImport,
  deleteInstagramPost,
  getInstagramPostId,
  prepareInstagramImport,
  updateInstagramPostStatus,
  upsertInstagramCandidate,
} from "@/lib/services/instagram-service";
import { isServiceError } from "@/lib/services/service-error";
import {
  copyPublicUpload,
  getUploadExtension,
  saveUploadedFile,
} from "@/lib/uploads/upload-files";

export const runtime = "nodejs";

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

  const id = getInstagramPostId(permalink);

  const images: WorkImage[] = [];
  for (let index = 0; index < MAX_IMAGES_PER_WORK; index += 1) {
    const file = formData.get(`image-${index}`);

    if (!(file instanceof File)) {
      continue;
    }

    const savedFile = await saveUploadedFile({
      file,
      folder: "instagram",
      ownerSlug: id,
      fallbackExtension: ".jpg",
      fallbackPrefix: "instagram",
    });
    images.push({
      src: savedFile.publicPath,
      alt: incoming.caption || file.name,
      aspectRatio: "4/5",
      kind: images.length === 0 ? "principal" : "detalle",
    });
  }

  try {
    const post = await upsertInstagramCandidate({
      permalink,
      caption: incoming.caption,
      images,
    });
    return Response.json({ ok: true, post });
  } catch (error) {
    if (isServiceError(error)) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
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

  if (payload.action === "ignore" || payload.action === "restore") {
    try {
      await updateInstagramPostStatus(payload.id ?? "", payload.action);
      return Response.json({ ok: true });
    } catch (error) {
      if (isServiceError(error)) {
        return Response.json({ error: error.message }, { status: error.status });
      }
      throw error;
    }
  }

  if (payload.action !== "import") {
    return Response.json({ error: "Accion no valida." }, { status: 400 });
  }

  let prepared;

  try {
    prepared = await prepareInstagramImport(payload);
  } catch (error) {
    if (isServiceError(error)) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }

  const copiedImages: WorkImage[] = [];
  for (const [index, image] of prepared.post.images
    .slice(0, MAX_IMAGES_PER_WORK)
    .entries()) {
    const extension = getUploadExtension(image.src, ".jpg");
    const filename = `instagram-${index + 1}${extension}`;
    const copiedFile = await copyPublicUpload({
      fromPublicPath: image.src,
      folder: "works",
      ownerSlug: prepared.slug,
      filename,
    });
    copiedImages.push({
      ...image,
      src: copiedFile.publicPath,
      alt: `${prepared.title} - imagen ${index + 1}`,
      kind: index === 0 ? "principal" : "detalle",
    });
  }

  try {
    const work = await completeInstagramImport(payload, prepared, copiedImages);
    return Response.json({ ok: true, work });
  } catch (error) {
    if (isServiceError(error)) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    await deleteInstagramPost(id ?? "");
    return Response.json({ ok: true });
  } catch (error) {
    if (isServiceError(error)) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
