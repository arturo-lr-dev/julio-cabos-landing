import {
  deleteCourse,
  getExistingCourse,
  normalizeCourse,
  reorderAdminCourses,
  upsertCourse,
} from "@/lib/services/courses-service";
import { isServiceError } from "@/lib/services/service-error";
import { saveUploadedFile } from "@/lib/uploads/upload-files";
import type { Course } from "@/lib/data";

export const runtime = "nodejs";

async function getIncomingCourse(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.includes("multipart/form-data")) {
    return {
      course: normalizeCourse((await request.json()) as Course),
      posterFile: null,
      removePoster: false,
    };
  }

  const formData = await request.formData();
  const rawCourse = formData.get("course");

  if (typeof rawCourse !== "string") {
    throw new Error("Faltan datos del curso.");
  }

  const posterFile = formData.get("poster");

  return {
    course: normalizeCourse(JSON.parse(rawCourse) as Course),
    posterFile: posterFile instanceof File ? posterFile : null,
    removePoster: formData.get("removePoster") === "1",
  };
}

export async function POST(request: Request) {
  let incoming: Course;
  let posterFile: File | null;
  let removePoster: boolean;

  try {
    const parsed = await getIncomingCourse(request);
    incoming = parsed.course;
    posterFile = parsed.posterFile;
    removePoster = parsed.removePoster;
  } catch {
    return Response.json(
      { error: "No se han podido leer los datos del curso." },
      { status: 400 }
    );
  }

  const existingCourse = await getExistingCourse(incoming.slug);

  if (posterFile) {
    const savedFile = await saveUploadedFile({
      file: posterFile,
      folder: "courses",
      ownerSlug: incoming.slug,
      fallbackExtension: ".webp",
      fallbackPrefix: "curso",
    });
    incoming.posterImage = savedFile.publicPath;
    incoming.posterAlt = incoming.posterAlt || incoming.title;
  } else if (removePoster) {
    incoming.posterImage = "";
    incoming.posterAlt = "";
  } else if (!incoming.posterImage && existingCourse?.posterImage) {
    incoming.posterImage = existingCourse.posterImage;
    incoming.posterAlt = existingCourse.posterAlt;
  }

  try {
    const course = await upsertCourse(incoming);
    return Response.json({ ok: true, course });
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
    await deleteCourse(slug ?? "");
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
    return Response.json({ error: "Falta el orden de los cursos." }, { status: 400 });
  }

  await reorderAdminCourses(payload.order);

  return Response.json({ ok: true });
}
