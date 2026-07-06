import path from "node:path";
import type { Course } from "@/lib/work-types";
import { readJsonFile, writeJsonFile } from "./json-file";

const coursesPath = path.join(process.cwd(), "content", "courses.json");

export async function getCourses(): Promise<Course[]> {
  return readJsonFile<Course[]>(coursesPath);
}

export async function saveCourses(courses: Course[]) {
  await writeJsonFile(coursesPath, courses);
}

export function getActiveCourses(courses: Course[]) {
  return courses.filter((course) => course.status === "active");
}

export function reorderCourses(courses: Course[], order: string[]): Course[] {
  const coursesBySlug = new Map(courses.map((course) => [course.slug, course]));
  const usedSlugs = new Set<string>();
  const orderedCourses: Course[] = [];

  for (const slug of order) {
    const course = coursesBySlug.get(slug);
    if (!course || usedSlugs.has(slug)) continue;
    orderedCourses.push(course);
    usedSlugs.add(slug);
  }

  return [
    ...orderedCourses,
    ...courses.filter((course) => !usedSlugs.has(course.slug)),
  ];
}
