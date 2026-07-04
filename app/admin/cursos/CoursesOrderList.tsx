"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Course } from "@/lib/data";

function formatDate(value: string) {
  if (!value) return "Sin fecha";
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

function getStatusLabel(status: Course["status"]) {
  if (status === "active") return "Activo";
  if (status === "hidden") return "Oculto";
  return "Borrador";
}

export default function CoursesOrderList({
  courses,
  selectedSlug,
}: {
  courses: Course[];
  selectedSlug?: string;
}) {
  const router = useRouter();
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function moveCourse(slug: string, direction: -1 | 1) {
    const currentIndex = courses.findIndex((course) => course.slug === slug);
    const nextIndex = currentIndex + direction;

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= courses.length) {
      return;
    }

    const nextCourses = [...courses];
    const [movedCourse] = nextCourses.splice(currentIndex, 1);
    nextCourses.splice(nextIndex, 0, movedCourse);

    setSavingSlug(slug);
    setError(null);

    const response = await fetch("/api/admin/courses", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: nextCourses.map((course) => course.slug),
      }),
    }).catch(() => null);

    setSavingSlug(null);

    if (!response) {
      setError("No se ha podido conectar con el guardado del orden.");
      return;
    }

    const payload = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setError(payload.error ?? "No se ha podido guardar el orden.");
      return;
    }

    router.refresh();
  }

  return (
    <div className="space-y-3">
      {error ? (
        <div className="rounded-md border border-red-400/30 bg-red-400/10 p-3 text-xs text-red-100">
          {error}
        </div>
      ) : null}

      {courses.map((course, index) => {
        const isSelected = course.slug === selectedSlug;
        const isSaving = savingSlug === course.slug;

        return (
          <article
            key={course.slug}
            className={`rounded-md border bg-background/35 p-3 ${
              isSelected ? "border-accent/45" : "border-rule"
            }`}
          >
            <Link href={`/admin/cursos?curso=${course.slug}`}>
              <p className="truncate font-medium">{course.title}</p>
              <p className="mt-1 text-xs text-foreground-muted">
                {formatDate(course.startDate)} - {course.location || "Sin ciudad"}
              </p>
              <p className="mt-2 text-xs text-accent">
                {getStatusLabel(course.status)} - {course.seatsAvailable} /{" "}
                {course.seatsTotal} plazas
              </p>
            </Link>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => moveCourse(course.slug, -1)}
                disabled={index === 0 || isSaving}
                className="rounded-md border border-rule-strong px-3 py-2 text-xs text-foreground-muted transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                Subir
              </button>
              <button
                type="button"
                onClick={() => moveCourse(course.slug, 1)}
                disabled={index === courses.length - 1 || isSaving}
                className="rounded-md border border-rule-strong px-3 py-2 text-xs text-foreground-muted transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                Bajar
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
