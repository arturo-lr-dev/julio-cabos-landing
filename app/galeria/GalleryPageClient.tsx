"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";
import FadeIn from "@/components/FadeIn";
import {
  categoryLabels,
  workSaleStatusLabels,
  workCategoryLabels,
} from "@/lib/work-options";
import type { Locale } from "@/lib/site-content";
import type {
  GalleryCategory,
  GalleryImage,
  GalleryWork,
  WorkCategory,
  WorkSaleStatus,
} from "@/lib/work-types";

const categories: WorkCategory[] = [
  "historico",
  "fantasia",
  "box-art",
  "busto",
  "diorama",
  "escenografia",
];

const categoryLabelsEn: Record<WorkCategory, string> = {
  historico: "Historical",
  fantasia: "Fantasy",
  "box-art": "Box art",
  busto: "Bust",
  diorama: "Diorama",
  escenografia: "Scenery",
};

const saleStatusLabelsEn: Record<WorkSaleStatus, string> = {
  none: "Gallery only",
  "for-sale": "For sale",
  reserved: "Reserved",
  sold: "Sold",
};

type GalleryFilter = GalleryCategory | "todas" | "disponibles";

function getCategoryLabel(category: WorkCategory, locale: Locale) {
  return locale === "en" ? categoryLabelsEn[category] : categoryLabels[category];
}

function getSaleStatusLabel(status: WorkSaleStatus, locale: Locale) {
  return locale === "en" ? saleStatusLabelsEn[status] : workSaleStatusLabels[status];
}

function getSaleBadgeClass(status: WorkSaleStatus) {
  if (status === "for-sale") {
    return "border-accent bg-accent text-background";
  }

  if (status === "reserved") {
    return "border-sky-300/70 bg-sky-300 text-background";
  }

  return "border-foreground-muted bg-foreground text-background";
}

function getMeta(image: GalleryImage, locale: Locale) {
  return [getCategoryLabel(image.category, locale), image.scale, image.brand, image.year]
    .filter(Boolean)
    .join(" - ");
}

export default function GalleryPageClient({
  galleryWorks,
  initialFilter = "todas",
  locale = "es",
}: {
  galleryWorks: GalleryWork[];
  initialFilter?: GalleryFilter;
  locale?: Locale;
}) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>(initialFilter);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);
  const availableWorks = useMemo(
    () =>
      galleryWorks.filter(
        (work) =>
          work.saleStatus === "for-sale" || work.saleStatus === "reserved"
      ),
    [galleryWorks]
  );

  const filteredWorks = useMemo(() => {
    if (activeFilter === "todas") return galleryWorks;
    if (activeFilter === "disponibles") return availableWorks;
    return galleryWorks.filter((work) => work.category === activeFilter);
  }, [activeFilter, availableWorks, galleryWorks]);

  const openLightbox = (work: GalleryWork) => {
    const coverIndex = work.images.findIndex(
      (image) => image.src === work.cover.src
    );

    setLightboxImages(work.images);
    setLightboxIndex(Math.max(coverIndex, 0));
    setLightboxOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-rule">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          <Link href={locale === "en" ? "/en" : "/"} className="group flex items-baseline gap-2">
            <span className="font-display text-foreground text-xl md:text-2xl leading-none">
              Julio
            </span>
            <span className="font-display-italic text-accent text-xl md:text-2xl leading-none">
              Cabos
            </span>
          </Link>
          <Link
            href={locale === "en" ? "/en" : "/"}
            className="text-sm text-foreground-muted hover:text-accent transition-colors"
          >
            {locale === "en" ? "Back" : "Volver"}
          </Link>
        </nav>
      </header>

      <main className="pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <div className="mb-16 md:mb-24">
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden className="text-foreground-faint">
                  -
                </span>
                <span className="eyebrow text-foreground-muted">{locale === "en" ? "Gallery" : "Galería"}</span>
              </div>
              <h1 className="font-display text-foreground text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
                {locale === "en" ? "Full" : "Obra"}{" "}
                <span className="font-display-italic text-accent/90">
                  {locale === "en" ? "body of work" : "completa"}
                </span>
              </h1>
              <p className="text-foreground-muted max-w-xl text-lg leading-relaxed">
                {locale === "en"
                  ? `${galleryWorks.length} published works, ordered as in the admin panel. Each entry keeps category, scale, brand and work details.`
                  : `${galleryWorks.length} obras publicadas, ordenadas como en el panel de administración. Cada ficha conserva categoría, escala, marca y datos de la obra.`}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="flex flex-wrap gap-3 mb-12 md:mb-16">
              <button
                onClick={() => setActiveFilter("todas")}
                className={`eyebrow px-5 py-2.5 border transition-all duration-300 ${
                  activeFilter === "todas"
                    ? "border-accent text-accent bg-accent/5"
                    : "border-rule text-foreground-muted hover:text-foreground hover:border-foreground-muted"
                }`}
              >
                {locale === "en" ? "All" : "Todas"} ({galleryWorks.length})
              </button>
              <button
                onClick={() => setActiveFilter("disponibles")}
                className={`eyebrow px-5 py-2.5 border transition-all duration-300 ${
                  activeFilter === "disponibles"
                    ? "border-accent text-accent bg-accent/5"
                    : "border-rule text-foreground-muted hover:text-foreground hover:border-foreground-muted"
                }`}
              >
                {locale === "en" ? "Available" : "Disponibles"} ({availableWorks.length})
              </button>
              {categories.map((cat) => {
                const count = galleryWorks.filter(
                  (work) => work.category === cat
                ).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`eyebrow px-5 py-2.5 border transition-all duration-300 ${
                      activeFilter === cat
                        ? "border-accent text-accent bg-accent/5"
                        : "border-rule text-foreground-muted hover:text-foreground hover:border-foreground-muted"
                    }`}
                  >
                    {(locale === "en" ? categoryLabelsEn[cat] : workCategoryLabels[cat])} ({count})
                  </button>
                );
              })}
            </div>
          </FadeIn>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {filteredWorks.map((work, i) => {
              const img = work.cover;
              const saleStatus = work.saleStatus ?? "none";
              const hasCommercialStatus = saleStatus !== "none";
              const canAskAboutWork =
                saleStatus === "for-sale" || saleStatus === "reserved";
              const globalIndex = galleryWorks.findIndex(
                (item) => item.slug === work.slug
              );

              return (
                <FadeIn
                  key={work.slug}
                  delay={i < 12 ? i * 60 : 0}
                  className="break-inside-avoid"
                >
                  <figure
                    className={`group relative cursor-pointer overflow-hidden bg-surface ${
                      hasCommercialStatus
                        ? "border border-accent/45 p-2 shadow-[0_0_0_1px_rgba(214,176,103,0.12)]"
                        : ""
                    }`}
                    onClick={() => openLightbox(work)}
                  >
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ aspectRatio: img.aspectRatio }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-contain transition-transform duration-[900ms] ease-out group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {hasCommercialStatus ? (
                        <div className="absolute left-4 top-4 z-10 flex max-w-[calc(100%-2rem)] flex-col items-start gap-2">
                          <span
                            className={`border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide shadow-lg ${getSaleBadgeClass(saleStatus)}`}
                          >
                            {getSaleStatusLabel(saleStatus, locale)}
                          </span>
                          {work.salePrice ? (
                            <span className="bg-background/90 px-3 py-1.5 text-sm font-medium text-foreground backdrop-blur">
                              {work.salePrice}
                            </span>
                          ) : null}
                        </div>
                      ) : null}

                      <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        <span className="eyebrow text-foreground/90 bg-background/60 backdrop-blur-sm px-3 py-1.5">
                          {getCategoryLabel(img.category, locale)}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        <div className="w-10 h-10 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="text-foreground"
                          >
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <figcaption className="mt-4 flex items-baseline justify-between gap-4 px-1">
                      <span className="min-w-0">
                        <span className="block truncate text-sm text-foreground leading-snug">
                          {work.title}
                        </span>
                        {work.saleStatus && work.saleStatus !== "none" ? (
                          <span className="mt-2 block truncate text-sm font-medium text-accent">
                            {getSaleStatusLabel(work.saleStatus, locale)}
                            {work.salePrice ? ` · ${work.salePrice}` : ""}
                          </span>
                        ) : null}
                        <span className="mt-1 block truncate text-xs text-foreground-muted">
                          {work.images.length === 1
                            ? locale === "en" ? "1 image" : "1 imagen"
                            : locale === "en" ? `${work.images.length} images` : `${work.images.length} imágenes`}
                        </span>
                        {getMeta(img, locale) ? (
                          <span className="mt-1 block truncate text-xs text-foreground-faint">
                            {getMeta(img, locale)}
                          </span>
                        ) : null}
                        {work.saleNote ? (
                          <span className="mt-1 block truncate text-xs text-foreground-faint">
                            {work.saleNote}
                          </span>
                        ) : null}
                      </span>
                      <span className="eyebrow tnum text-foreground-faint group-hover:text-accent transition-colors duration-500 shrink-0">
                        No. {String(globalIndex + 1).padStart(2, "0")}
                      </span>
                    </figcaption>
                    {canAskAboutWork ? (
                      <a
                        href={`${locale === "en" ? "/en" : ""}/#consulta-encargo`}
                        onClick={(event) => event.stopPropagation()}
                        className="mt-4 inline-flex w-full justify-center border border-accent/60 bg-accent/10 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-accent transition hover:bg-accent hover:text-background"
                      >
                        {locale === "en" ? "Ask about this work" : "Consultar esta obra"}
                      </a>
                    ) : null}
                  </figure>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </main>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
