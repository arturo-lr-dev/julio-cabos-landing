import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import type { CalendarEvent, CalendarEventStatus } from "@/lib/data";

export const runtime = "nodejs";

const contentPath = path.join(process.cwd(), "content", "calendar-events.json");

function slugify(value: string) {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `evento-${Date.now()}`
  );
}

async function readEvents() {
  const raw = await readFile(contentPath, "utf8");
  return JSON.parse(raw) as CalendarEvent[];
}

async function writeEvents(events: CalendarEvent[]) {
  await writeFile(contentPath, `${JSON.stringify(events, null, 2)}\n`, "utf8");
}

function revalidateCalendar() {
  revalidatePath("/admin");
  revalidatePath("/admin/calendario");
}

function normalizeEvent(event: CalendarEvent): CalendarEvent {
  return {
    ...event,
    slug: event.slug || slugify(event.title),
    status: event.status as CalendarEventStatus,
  };
}

export async function POST(request: Request) {
  const incoming = normalizeEvent((await request.json()) as CalendarEvent);

  if (!incoming.title.trim()) {
    return Response.json(
      { error: "El evento necesita un titulo." },
      { status: 400 }
    );
  }

  if (!incoming.startDate) {
    return Response.json(
      { error: "Indica una fecha para guardar el evento." },
      { status: 400 }
    );
  }

  const currentEvents = await readEvents();
  const existingIndex = currentEvents.findIndex(
    (event) => event.slug === incoming.slug
  );

  const nextEvents =
    existingIndex >= 0
      ? currentEvents.map((event) =>
          event.slug === incoming.slug ? incoming : event
        )
      : [...currentEvents, incoming];

  await writeEvents(nextEvents);
  revalidateCalendar();

  return Response.json({ ok: true, event: incoming });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return Response.json(
      { error: "Falta el evento a eliminar." },
      { status: 400 }
    );
  }

  const currentEvents = await readEvents();
  const nextEvents = currentEvents.filter((event) => event.slug !== slug);

  if (nextEvents.length === currentEvents.length) {
    return Response.json(
      { error: "No se ha encontrado ese evento." },
      { status: 404 }
    );
  }

  await writeEvents(nextEvents);
  revalidateCalendar();

  return Response.json({ ok: true });
}
