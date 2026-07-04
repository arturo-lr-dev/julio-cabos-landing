import { readFile } from "node:fs/promises";
import path from "node:path";
import type { CalendarEvent, Course } from "@/lib/data";

const calendarEventsPath = path.join(
  process.cwd(),
  "content",
  "calendar-events.json"
);

export interface CalendarItem {
  id: string;
  source: "course" | "event";
  title: string;
  type: string;
  status: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  href?: string;
}

export async function getCalendarEventsFromContent() {
  const raw = await readFile(calendarEventsPath, "utf8");
  return JSON.parse(raw) as CalendarEvent[];
}

export function getCalendarItemsFromCoursesAndEvents(
  courses: Course[],
  events: CalendarEvent[]
): CalendarItem[] {
  const courseItems: CalendarItem[] = courses
    .filter((course) => course.startDate)
    .map((course) => ({
      id: course.slug,
      source: "course" as const,
      title: course.title,
      type: "curso",
      status: course.status,
      location: course.location,
      startDate: course.startDate,
      endDate: course.endDate,
      description: course.description,
      href: `/admin/cursos?curso=${course.slug}`,
    }));

  const eventItems: CalendarItem[] = events.map((event) => ({
    id: event.slug,
    source: "event",
    title: event.title,
    type: event.type,
    status: event.status,
    location: event.location,
    startDate: event.startDate,
    endDate: event.endDate,
    description: event.description,
    href: event.publicUrl,
  }));

  return [...courseItems, ...eventItems].sort((a, b) =>
    a.startDate.localeCompare(b.startDate)
  );
}
