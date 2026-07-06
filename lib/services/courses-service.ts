import { revalidatePath } from "next/cache";
import type { Course, CourseStatus } from "@/lib/work-types";
import {
  getCourses,
  reorderCourses,
  saveCourses,
} from "@/lib/repositories/courses-repository";
import { ServiceError } from "./service-error";
import { slugify } from "./slug";

export function normalizeCourse(course: Course): Course {
  return {
    ...course,
    slug: course.slug || slugify(course.title, "curso"),
    status: course.status as CourseStatus,
    seatsTotal: Math.max(0, Number(course.seatsTotal) || 0),
    seatsAvailable: Math.max(0, Number(course.seatsAvailable) || 0),
  };
}

export function revalidateAdminAndPublicCourses() {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/cursos");
}

export async function getExistingCourse(slug: string) {
  const courses = await getCourses();
  return courses.find((course) => course.slug === slug) ?? null;
}

export async function upsertCourse(incoming: Course) {
  if (!incoming.title.trim()) {
    throw new ServiceError("El curso necesita un titulo.");
  }

  if (incoming.status === "active" && !incoming.startDate) {
    throw new ServiceError("Indica una fecha antes de activar el curso.");
  }

  if (incoming.seatsAvailable > incoming.seatsTotal) {
    throw new ServiceError(
      "Las plazas disponibles no pueden superar las plazas totales."
    );
  }

  const currentCourses = await getCourses();
  const existingIndex = currentCourses.findIndex(
    (course) => course.slug === incoming.slug
  );

  const nextCourses =
    existingIndex >= 0
      ? currentCourses.map((course) =>
          course.slug === incoming.slug ? incoming : course
        )
      : [...currentCourses, incoming];

  await saveCourses(nextCourses);
  revalidateAdminAndPublicCourses();

  return incoming;
}

export async function deleteCourse(slug: string) {
  if (!slug) {
    throw new ServiceError("Falta el curso a eliminar.");
  }

  const currentCourses = await getCourses();
  const nextCourses = currentCourses.filter((course) => course.slug !== slug);

  if (nextCourses.length === currentCourses.length) {
    throw new ServiceError("No se ha encontrado ese curso.", 404);
  }

  await saveCourses(nextCourses);
  revalidateAdminAndPublicCourses();
}

export async function reorderAdminCourses(order: string[]) {
  const currentCourses = await getCourses();
  await saveCourses(reorderCourses(currentCourses, order));
  revalidateAdminAndPublicCourses();
}
