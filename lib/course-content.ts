import {
  getActiveCourses,
  getCourses,
} from "@/lib/repositories/courses-repository";

export async function getCoursesFromContent() {
  return getCourses();
}

export async function getActiveCoursesFromContent() {
  return getActiveCourses(await getCourses());
}
