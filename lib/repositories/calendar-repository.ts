import path from "node:path";
import type { CalendarEvent, Course } from "@/lib/work-types";
import { readJsonFile, writeJsonFile } from "./json-file";

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

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  return readJsonFile<CalendarEvent[]>(calendarEventsPath);
}

export async function saveCalendarEvents(events: CalendarEvent[]) {
  await writeJsonFile(calendarEventsPath, events);
}

export function getCalendarItemsFromCoursesAndEvents(
  courses: Course[],
  events: CalendarEvent[]
): CalendarItem[] {
  const courseItems: CalendarItem[] = courses
    .filter((course) => course.startDate)
    .map((course) => ({
      id: course.slug,
      source: "course",
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
