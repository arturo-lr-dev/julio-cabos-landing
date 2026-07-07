import {
  MAX_IMAGES_PER_WORK,
  type Work,
  type WorkImage,
} from "@/lib/data";
import {
  deleteWork,
  getWorkSlug,
  reorderAdminWorks,
  upsertWork,
} from "@/lib/services/works-service";
import { isServiceError } from "@/lib/services/service-error";
import { saveUploadedFile } from "@/lib/uploads/upload-files";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const formData = await request.formData();
  const rawWork = formData.get("work");

  if (typeof rawWork !== "string") {
    return Response.json({ error: "Faltan datos de la obra." }, { status: 400 });
  }

  const incoming = JSON.parse(rawWork) as Work;
  const slug = getWorkSlug(incoming);

  const images: WorkImage[] = [];
  for (const [index, image] of incoming.images
    .slice(0, MAX_IMAGES_PER_WORK)
    .entries()) {
    const fileField = `image-${index}`;
    const file = formData.get(fileField);

    if (file instanceof File) {
      const savedFile = await saveUploadedFile({
        file,
        folder: "works",
        ownerSlug: slug,
        fallbackExtension: ".webp",
        fallbackPrefix: "obra",
      });
      images.push({
        ...image,
        src: savedFile.publicPath,
        alt: image.alt || file.name,
      });
      continue;
    }

    images.push(image);
  }

  try {
    const savedWork = await upsertWork(incoming, images);
    return Response.json({ ok: true, work: savedWork });
  } catch (error) {
    if (isServiceError(error)) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    await deleteWork(slug ?? "");
    return Response.json({ ok: true });
  } catch (error) {
    if (isServiceError(error)) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}

export async function PATCH(request: Request) {
  const payload = (await request.json()) as {
    order?: string[];
  };

  if (!Array.isArray(payload.order)) {
    return Response.json({ error: "Falta el orden de las obras." }, { status: 400 });
  }

  await reorderAdminWorks(payload.order);

  return Response.json({ ok: true });
}
