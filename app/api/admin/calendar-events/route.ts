import {
  deleteCalendarEvent,
  normalizeCalendarEvent,
  upsertCalendarEvent,
} from "@/lib/services/calendar-service";
import { isServiceError } from "@/lib/services/service-error";
import type { CalendarEvent } from "@/lib/data";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const incoming = normalizeCalendarEvent((await request.json()) as CalendarEvent);

  try {
    const event = await upsertCalendarEvent(incoming);
    return Response.json({ ok: true, event });
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
    await deleteCalendarEvent(slug ?? "");
    return Response.json({ ok: true });
  } catch (error) {
    if (isServiceError(error)) {
      return Response.json({ error: error.message }, { status: error.status });
    }
    throw error;
  }
}
