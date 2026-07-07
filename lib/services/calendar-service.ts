import { revalidatePath } from "next/cache";
import type { CalendarEvent, CalendarEventStatus } from "@/lib/work-types";
import {
  getCalendarEvents,
  saveCalendarEvents,
} from "@/lib/repositories/calendar-repository";
import { ServiceError } from "./service-error";
import { slugify } from "./slug";

export function normalizeCalendarEvent(event: CalendarEvent): CalendarEvent {
  return {
    ...event,
    slug: event.slug || slugify(event.title, "evento"),
    status: event.status as CalendarEventStatus,
  };
}

export function revalidateCalendar() {
  revalidatePath("/admin");
  revalidatePath("/admin/calendario");
}

export async function upsertCalendarEvent(incoming: CalendarEvent) {
  if (!incoming.title.trim()) {
    throw new ServiceError("El evento necesita un titulo.");
  }

  if (!incoming.startDate) {
    throw new ServiceError("Indica una fecha para guardar el evento.");
  }

  const currentEvents = await getCalendarEvents();
  const existingIndex = currentEvents.findIndex(
    (event) => event.slug === incoming.slug
  );

  const nextEvents =
    existingIndex >= 0
      ? currentEvents.map((event) =>
          event.slug === incoming.slug ? incoming : event
        )
      : [...currentEvents, incoming];

  await saveCalendarEvents(nextEvents);
  revalidateCalendar();

  return incoming;
}

export async function deleteCalendarEvent(slug: string) {
  if (!slug) {
    throw new ServiceError("Falta el evento a eliminar.");
  }

  const currentEvents = await getCalendarEvents();
  const nextEvents = currentEvents.filter((event) => event.slug !== slug);

  if (nextEvents.length === currentEvents.length) {
    throw new ServiceError("No se ha encontrado ese evento.", 404);
  }

  await saveCalendarEvents(nextEvents);
  revalidateCalendar();
}
