import path from "node:path";
import type { Course } from "@/lib/work-types";
import { getAdminFirestore } from "@/lib/firebase-admin";
import { readJsonFile, writeJsonFile } from "./json-file";

const coursesPath = path.join(process.cwd(), "content", "courses.json");
const coursesDocument = "content/courses";

function isFirestoreConfigured() {
  return Boolean(
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
      (process.env.FIREBASE_PROJECT_ID &&
        process.env.FIREBASE_CLIENT_EMAIL &&
        process.env.FIREBASE_PRIVATE_KEY)
  );
}

export async function getCourses(): Promise<Course[]> {
  if (isFirestoreConfigured()) {
    const snapshot = await getAdminFirestore().doc(coursesDocument).get();
    if (snapshot.exists) {
      return (snapshot.data()?.items as Course[] | undefined) ?? [];
    }

    const initialCourses = await readJsonFile<Course[]>(coursesPath);
    await getAdminFirestore().doc(coursesDocument).set({ items: initialCourses });
    return initialCourses;
  }

  return readJsonFile<Course[]>(coursesPath);
}

export async function saveCourses(courses: Course[]) {
  if (isFirestoreConfigured()) {
    await getAdminFirestore().doc(coursesDocument).set({ items: courses });
    return;
  }

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
