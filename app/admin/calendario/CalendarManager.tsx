"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import {
  calendarEventTypeLabels,
  type CalendarEvent,
  type CalendarEventType,
} from "@/lib/data";
import type { CalendarItem } from "@/lib/calendar-content";

const inputClass =
  "mt-2 w-full rounded-md border border-rule-strong bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent";

const labelClass = "text-sm font-medium text-foreground";

const weekdays = ["L", "M", "X", "J", "V", "S", "D"];

function toDate(value: string) {
  return new Date(`${value}T12:00:00`);
}

function toInputDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDate(value: string) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(toDate(value));
}

function formatMonth(date: Date) {
  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function getCalendarDays(monthDate: Date) {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - firstWeekday);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return date;
  });
}

function eventDefaults(date: string): CalendarEvent {
  return {
    title: "",
    slug: "",
    type: "recordatorio",
    status: "active",
    location: "",
    startDate: date,
    endDate: "",
    description: "",
    publicUrl: "",
  };
}

export default function CalendarManager({
  events,
  items,
}: {
  events: CalendarEvent[];
  items: CalendarItem[];
}) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [monthDate, setMonthDate] = useState(() => new Date());
  const [selectedDate, setSelectedDate] = useState(() => toInputDate(new Date()));
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calendarDays = useMemo(() => getCalendarDays(monthDate), [monthDate]);
  const selectedItems = items.filter((item) => item.startDate === selectedDate);
  const upcomingItems = items
    .filter((item) => item.startDate >= toInputDate(new Date()))
    .slice(0, 8);
  const formEvent = selectedEvent ?? eventDefaults(selectedDate);

  function moveMonth(direction: -1 | 1) {
    setMonthDate(
      (current) => new Date(current.getFullYear(), current.getMonth() + direction, 1)
    );
  }

  function selectDay(date: Date) {
    const value = toInputDate(date);
    setSelectedDate(value);
    setSelectedEvent(null);
  }

  function editEvent(event: CalendarEvent) {
    setSelectedEvent(event);
    setSelectedDate(event.startDate);
  }

  async function saveEvent(status: CalendarEvent["status"]) {
    const form = formRef.current;
    if (!form) return;

    const formData = new FormData(form);
    const event: CalendarEvent = {
      title: String(formData.get("title") ?? "").trim(),
      slug: String(formData.get("slug") ?? "").trim(),
      type: String(formData.get("type") ?? "recordatorio") as CalendarEventType,
      status,
      location: String(formData.get("location") ?? "").trim(),
      startDate: String(formData.get("startDate") ?? ""),
      endDate: String(formData.get("endDate") ?? ""),
      description: String(formData.get("description") ?? "").trim(),
      publicUrl: String(formData.get("publicUrl") ?? "").trim(),
    };

    const response = await fetch("/api/admin/calendar-events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    }).catch(() => null);

    if (!response) {
      setError("No se ha podido conectar con el guardado.");
      return;
    }

    const payload = (await response.json()) as {
      error?: string;
      event?: CalendarEvent;
    };

    if (!response.ok) {
      setError(payload.error ?? "No se ha podido guardar el evento.");
      return;
    }

    setError(null);
    setMessage(status === "active" ? "Evento guardado." : "Evento ocultado.");
    setSelectedEvent(payload.event ?? null);
    router.refresh();
  }

  async function deleteEvent() {
    if (!selectedEvent?.slug) return;

    const response = await fetch(
      `/api/admin/calendar-events?slug=${encodeURIComponent(selectedEvent.slug)}`,
      { method: "DELETE" }
    ).catch(() => null);

    if (!response) {
      setError("No se ha podido conectar con el borrado.");
      return;
    }

    const payload = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setError(payload.error ?? "No se ha podido eliminar el evento.");
      return;
    }

    setSelectedEvent(null);
    setError(null);
    setMessage("Evento eliminado.");
    router.refresh();
  }

  return (
    <div className="mx-auto mt-6 grid max-w-7xl gap-5 xl:grid-cols-[1fr_420px]">
      <section className="rounded-lg border border-rule-strong bg-surface/70 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold capitalize">
              {formatMonth(monthDate)}
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              Cursos automaticos y eventos editables en una sola vista.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => moveMonth(-1)}
              className="rounded-md border border-rule-strong px-4 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
            >
              Anterior
            </button>
            <button
              type="button"
              onClick={() => setMonthDate(new Date())}
              className="rounded-md border border-rule-strong px-4 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
            >
              Hoy
            </button>
            <button
              type="button"
              onClick={() => moveMonth(1)}
              className="rounded-md border border-rule-strong px-4 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
            >
              Siguiente
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-7 gap-px overflow-hidden rounded-lg border border-rule bg-rule">
          {weekdays.map((weekday) => (
            <div
              key={weekday}
              className="bg-background/80 px-2 py-3 text-center text-xs font-medium text-foreground-muted"
            >
              {weekday}
            </div>
          ))}
          {calendarDays.map((date) => {
            const dateKey = toInputDate(date);
            const dayItems = items.filter((item) => item.startDate === dateKey);
            const isCurrentMonth = date.getMonth() === monthDate.getMonth();
            const isSelected = selectedDate === dateKey;

            return (
              <button
                key={dateKey}
                type="button"
                onClick={() => selectDay(date)}
                className={`min-h-24 bg-background p-2 text-left transition hover:bg-accent/10 ${
                  isSelected ? "ring-1 ring-inset ring-accent" : ""
                } ${isCurrentMonth ? "" : "opacity-45"}`}
              >
                <span className="text-sm tabular-nums">{date.getDate()}</span>
                <div className="mt-2 space-y-1">
                  {dayItems.slice(0, 3).map((item) => (
                    <span
                      key={`${item.source}-${item.id}`}
                      className={`block truncate rounded px-2 py-1 text-[11px] ${
                        item.source === "course"
                          ? "bg-accent/15 text-accent"
                          : "bg-foreground/10 text-foreground-muted"
                      }`}
                    >
                      {item.title}
                    </span>
                  ))}
                  {dayItems.length > 3 ? (
                    <span className="block text-[11px] text-foreground-faint">
                      +{dayItems.length - 3} mas
                    </span>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2">
          <section className="rounded-lg border border-rule bg-background/35 p-4">
            <h3 className="font-semibold">Dia seleccionado</h3>
            <p className="mt-1 text-sm text-foreground-muted">
              {formatDate(selectedDate)}
            </p>
            <div className="mt-4 space-y-3">
              {selectedItems.length === 0 ? (
                <p className="text-sm text-foreground-muted">
                  No hay nada en este dia.
                </p>
              ) : null}
              {selectedItems.map((item) => (
                <article
                  key={`${item.source}-${item.id}`}
                  className="rounded-md border border-rule bg-background/40 p-3"
                >
                  <p className="text-xs uppercase tracking-wider text-accent">
                    {item.source === "course" ? "Curso" : item.type}
                  </p>
                  <h4 className="mt-1 font-medium">{item.title}</h4>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {item.location || "Sin ubicacion"}
                  </p>
                  {item.source === "course" ? (
                    <Link
                      href={item.href ?? "/admin/cursos"}
                      className="mt-3 inline-flex text-sm text-accent"
                    >
                      Editar curso
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() =>
                        editEvent(
                          events.find((event) => event.slug === item.id) ??
                            eventDefaults(item.startDate)
                        )
                      }
                      className="mt-3 text-sm text-accent"
                    >
                      Editar evento
                    </button>
                  )}
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-rule bg-background/35 p-4">
            <h3 className="font-semibold">Proximos</h3>
            <div className="mt-4 space-y-3">
              {upcomingItems.map((item) => (
                <article
                  key={`${item.source}-${item.id}`}
                  className="flex items-start justify-between gap-4 border-b border-rule pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {formatDate(item.startDate)} - {item.location || "Sin ubicacion"}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs uppercase tracking-wider text-accent">
                    {item.source === "course" ? "Curso" : item.type}
                  </span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="rounded-lg border border-rule-strong bg-surface/70 p-5">
        <h2 className="text-xl font-semibold">
          {selectedEvent ? "Editar evento" : "Nuevo evento"}
        </h2>
        <p className="mt-1 text-sm text-foreground-muted">
          Para cursos, edita la ficha del curso. Aqui se gestionan ferias,
          concursos, charlas y recordatorios.
        </p>

        {message ? (
          <div className="mt-5 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-4 text-sm text-emerald-100">
            {message}
          </div>
        ) : null}

        {error ? (
          <div className="mt-5 rounded-lg border border-accent/35 bg-accent/10 p-4 text-sm text-accent">
            {error}
          </div>
        ) : null}

        <form
          key={selectedEvent?.slug ?? selectedDate}
          ref={formRef}
          className="mt-5 grid gap-5"
        >
          <input type="hidden" name="slug" defaultValue={formEvent.slug} />

          <label className={labelClass}>
            Titulo
            <input
              className={inputClass}
              name="title"
              defaultValue={formEvent.title}
              placeholder="AMT Torrent, charla online..."
            />
          </label>

          <label className={labelClass}>
            Tipo
            <select className={inputClass} name="type" defaultValue={formEvent.type}>
              {Object.entries(calendarEventTypeLabels)
                .filter(([value]) => value !== "curso")
                .map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
            </select>
          </label>

          <label className={labelClass}>
            Fecha inicio
            <input
              className={inputClass}
              name="startDate"
              type="date"
              defaultValue={formEvent.startDate}
            />
          </label>

          <label className={labelClass}>
            Fecha fin
            <input
              className={inputClass}
              name="endDate"
              type="date"
              defaultValue={formEvent.endDate}
            />
          </label>

          <label className={labelClass}>
            Ubicacion
            <input
              className={inputClass}
              name="location"
              defaultValue={formEvent.location}
              placeholder="Madrid, Torrent, online..."
            />
          </label>

          <label className={labelClass}>
            Enlace
            <input
              className={inputClass}
              name="publicUrl"
              defaultValue={formEvent.publicUrl}
              placeholder="https://..."
            />
          </label>

          <label className={labelClass}>
            Descripcion
            <textarea
              className={`${inputClass} min-h-28 resize-y`}
              name="description"
              defaultValue={formEvent.description}
            />
          </label>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => saveEvent("active")}
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition hover:bg-accent-hover"
            >
              Guardar evento
            </button>
            {selectedEvent ? (
              <>
                <button
                  type="button"
                  onClick={() => saveEvent("hidden")}
                  className="rounded-md border border-rule-strong px-4 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
                >
                  Ocultar
                </button>
                <button
                  type="button"
                  onClick={deleteEvent}
                  className="rounded-md border border-red-400/30 px-4 py-2 text-sm text-red-100 transition hover:bg-red-400/10"
                >
                  Eliminar
                </button>
              </>
            ) : null}
            <button
              type="button"
              onClick={() => setSelectedEvent(null)}
              className="rounded-md border border-rule-strong px-4 py-2 text-sm transition hover:border-accent/50 hover:bg-accent/10"
            >
              Limpiar
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
