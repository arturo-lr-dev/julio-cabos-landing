import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import type { Course, CourseStatus } from "@/lib/data";

export const runtime = "nodejs";

const contentPath = path.join(process.cwd(), "content", "courses.json");
const uploadsRoot = path.join(process.cwd(), "public", "uploads", "courses");

function slugify(value: string) {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `curso-${Date.now()}`
  );
}

function sanitizeFilename(value: string) {
  const extension = path.extname(value).toLowerCase() || ".webp";
  const basename = path.basename(value, extension);
  return `${slugify(basename)}${extension}`;
}

async function readCourses() {
  const raw = await readFile(contentPath, "utf8");
  return JSON.parse(raw) as Course[];
}

async function writeCourses(courses: Course[]) {
  await writeFile(contentPath, `${JSON.stringify(courses, null, 2)}\n`, "utf8");
}

function revalidateAdminAndPublicCourses() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/cursos");
}

function normalizeCourse(course: Course): Course {
  return {
    ...course,
    slug: course.slug || slugify(course.title),
    status: course.status as CourseStatus,
    seatsTotal: Math.max(0, Number(course.seatsTotal) || 0),
    seatsAvailable: Math.max(0, Number(course.seatsAvailable) || 0),
  };
}

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

  if (!incoming.title.trim()) {
    return Response.json(
      { error: "El curso necesita un titulo." },
      { status: 400 }
    );
  }

  if (incoming.status === "active" && !incoming.startDate) {
    return Response.json(
      { error: "Indica una fecha antes de activar el curso." },
      { status: 400 }
    );
  }

  if (incoming.seatsAvailable > incoming.seatsTotal) {
    return Response.json(
      { error: "Las plazas disponibles no pueden superar las plazas totales." },
      { status: 400 }
    );
  }

  const currentCourses = await readCourses();
  const existingIndex = currentCourses.findIndex(
    (course) => course.slug === incoming.slug
  );
  const existingCourse = existingIndex >= 0 ? currentCourses[existingIndex] : null;

  if (posterFile) {
    await mkdir(path.join(uploadsRoot, incoming.slug), { recursive: true });
    const filename = sanitizeFilename(posterFile.name);
    const destination = path.join(uploadsRoot, incoming.slug, filename);
    const buffer = Buffer.from(await posterFile.arrayBuffer());
    await writeFile(destination, buffer);
    incoming.posterImage = `/uploads/courses/${incoming.slug}/${filename}`;
    incoming.posterAlt = incoming.posterAlt || incoming.title;
  } else if (removePoster) {
    incoming.posterImage = "";
    incoming.posterAlt = "";
  } else if (!incoming.posterImage && existingCourse?.posterImage) {
    incoming.posterImage = existingCourse.posterImage;
    incoming.posterAlt = existingCourse.posterAlt;
  }

  const nextCourses =
    existingIndex >= 0
      ? currentCourses.map((course) =>
          course.slug === incoming.slug ? incoming : course
        )
      : [...currentCourses, incoming];

  await writeCourses(nextCourses);
  revalidateAdminAndPublicCourses();

  return Response.json({ ok: true, course: incoming });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return Response.json({ error: "Falta el curso a eliminar." }, { status: 400 });
  }

  const currentCourses = await readCourses();
  const nextCourses = currentCourses.filter((course) => course.slug !== slug);

  if (nextCourses.length === currentCourses.length) {
    return Response.json(
      { error: "No se ha encontrado ese curso." },
      { status: 404 }
    );
  }

  await writeCourses(nextCourses);
  revalidateAdminAndPublicCourses();

  return Response.json({ ok: true });
}

export async function PATCH(request: Request) {
  const payload = (await request.json()) as {
    order?: string[];
  };

  if (!Array.isArray(payload.order)) {
    return Response.json({ error: "Falta el orden de los cursos." }, { status: 400 });
  }

  const currentCourses = await readCourses();
  const coursesBySlug = new Map(
    currentCourses.map((course) => [course.slug, course])
  );
  const orderedCourses: Course[] = [];
  const usedSlugs = new Set<string>();

  for (const slug of payload.order) {
    const course = coursesBySlug.get(slug);

    if (!course || usedSlugs.has(slug)) {
      continue;
    }

    orderedCourses.push(course);
    usedSlugs.add(slug);
  }

  const missingCourses = currentCourses.filter(
    (course) => !usedSlugs.has(course.slug)
  );

  await writeCourses([...orderedCourses, ...missingCourses]);
  revalidateAdminAndPublicCourses();

  return Response.json({ ok: true });
}
