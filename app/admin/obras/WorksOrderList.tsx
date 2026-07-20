"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  MAX_IMAGES_PER_WORK,
  type Work,
  workCategoryLabels,
  workSaleStatusLabels,
} from "@/lib/data";

export default function WorksOrderList({
  works,
  selectedSlug,
}: {
  works: Work[];
  selectedSlug?: string;
}) {
  const router = useRouter();
  const [savingSlug, setSavingSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function moveWork(slug: string, direction: -1 | 1) {
    const currentIndex = works.findIndex((work) => work.slug === slug);
    const nextIndex = currentIndex + direction;

    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= works.length) {
      return;
    }

    const nextWorks = [...works];
    const [movedWork] = nextWorks.splice(currentIndex, 1);
    nextWorks.splice(nextIndex, 0, movedWork);

    setSavingSlug(slug);
    setError(null);

    const response = await fetch("/api/admin/works", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: nextWorks.map((work) => work.slug),
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

      {works.map((work, index) => {
        const isSelected = work.slug === selectedSlug;
        const isSaving = savingSlug === work.slug;

        return (
          <article
            key={work.slug}
            className={`rounded-md border bg-background/35 p-2 ${
              isSelected ? "border-accent/45" : "border-rule"
            }`}
          >
            <div className="grid grid-cols-[64px_1fr] gap-3">
              <Link
                href={`/admin/obras?obra=${work.slug}`}
                className="relative aspect-square overflow-hidden rounded bg-background"
              >
                <Image
                  src={work.images[0]?.src ?? "/placeholders/gallery-1.svg"}
                  alt={work.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </Link>
              <Link
                href={`/admin/obras?obra=${work.slug}`}
                className="min-w-0"
              >
                <p className="truncate font-medium">{work.title}</p>
                <p className="mt-1 text-xs text-foreground-muted">
                  {workCategoryLabels[work.category]} ·{" "}
                  {Math.min(work.images.length, MAX_IMAGES_PER_WORK)} fotos
                </p>
                <p className="mt-2 text-xs text-accent">
                  {work.status === "published" ? "Publicado" : "Borrador"}
                  {work.saleStatus && work.saleStatus !== "none"
                    ? ` - ${workSaleStatusLabels[work.saleStatus]}`
                    : ""}
                </p>
              </Link>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => moveWork(work.slug, -1)}
                disabled={index === 0 || isSaving}
                className="rounded-md border border-rule-strong px-3 py-2 text-xs text-foreground-muted transition hover:border-accent/50 hover:bg-accent/10 hover:text-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                Subir
              </button>
              <button
                type="button"
                onClick={() => moveWork(work.slug, 1)}
                disabled={index === works.length - 1 || isSaving}
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
