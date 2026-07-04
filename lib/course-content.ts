import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Course } from "@/lib/data";

const coursesPath = path.join(process.cwd(), "content", "courses.json");

export async function getCoursesFromContent() {
  const raw = await readFile(coursesPath, "utf8");
  return JSON.parse(raw) as Course[];
}

export async function getActiveCoursesFromContent() {
  const courses = await getCoursesFromContent();
  return courses.filter((course) => course.status === "active");
}
