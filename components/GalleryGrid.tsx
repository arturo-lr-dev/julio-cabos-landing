"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import Lightbox from "./Lightbox";
import { getSiteContent, type Locale } from "@/lib/site-content";
import { MAX_HOME_WORKS, workSaleStatusLabels } from "@/lib/work-options";
import type { GalleryImage, GalleryWork, WorkSaleStatus } from "@/lib/work-types";
import { trackAnalyticsEvent } from "@/lib/analytics";

const saleStatusLabelsEn: Record<WorkSaleStatus, string> = {
  none: "Gallery only",
  "for-sale": "For sale",
  reserved: "Reserved",
  sold: "Sold",
};

const saleStatusLabelsIt: Record<WorkSaleStatus, string> = {
  none: "Solo galleria",
  "for-sale": "In vendita",
  reserved: "Riservata",
  sold: "Venduta",
};

function getSaleStatusLabel(status: WorkSaleStatus, locale: Locale) {
  if (locale === "en") return saleStatusLabelsEn[status];
  if (locale === "it") return saleStatusLabelsIt[status];
  return workSaleStatusLabels[status];
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

function getMeta(image: GalleryImage, separator: string) {
  return [image.scale, image.brand, image.year].filter(Boolean).join(separator);
}

export default function GalleryGrid({
  works,
  locale = "es",
}: {
  works: GalleryWork[];
  locale?: Locale;
}) {
  const { ui } = getSiteContent(locale);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);

  const visible = works.slice(0, MAX_HOME_WORKS);

  const openLightbox = (work: GalleryWork) => {
    const coverIndex = work.images.findIndex(
      (image) => image.src === work.cover.src
    );

    setLightboxImages(work.images);
    setLightboxIndex(Math.max(coverIndex, 0));
    setLightboxOpen(true);
    trackAnalyticsEvent("vista_obra", {
      id_obra: work.slug,
      ubicacion_galeria: "inicio",
      estado_venta: work.saleStatus ?? "none",
      idioma: locale,
    });
  };

  return (
    <>
      <SectionWrapper id="galeria" topRule>
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-end mb-10 md:mb-12">
          <FadeIn className="col-span-12 md:col-span-4">
            <SectionLabel
              index="05"
              label={ui.sections.gallery}
              className="mb-5"
            />
            <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-tight">
              {ui.gallery.heading[0]}{" "}
              <span className="font-display-italic text-accent/90">
                {ui.gallery.heading[1]}
              </span>
            </h2>
            <p className="mt-6 text-sm md:text-base text-foreground-muted leading-relaxed">
              {ui.gallery.text}
            </p>
            <Link
              href={ui.gallery.href}
              onClick={() =>
                trackAnalyticsEvent("clic_llamada_accion", {
                  nombre_accion: "ver_galeria_completa",
                  destino: ui.gallery.href,
                  idioma: locale,
                })
              }
              className="mt-8 inline-flex items-center gap-4 border border-rule-strong px-5 py-3 eyebrow text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              {ui.gallery.full}
              <span aria-hidden>→</span>
            </Link>
          </FadeIn>

          <div className="col-span-12 md:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {visible.map((work, i) => {
              const img = work.cover;
              const saleStatus = work.saleStatus ?? "none";
              const hasCommercialStatus = saleStatus !== "none";

              return (
              <FadeIn key={work.slug} delay={i * 80}>
                <figure
                  className={`group cursor-pointer ${
                    hasCommercialStatus ? "border border-accent/45 bg-surface/70 p-2" : ""
                  }`}
                  onClick={() => openLightbox(work)}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {hasCommercialStatus ? (
                      <div className="absolute left-2 top-2 z-10 flex max-w-[calc(100%-1rem)] flex-col items-start gap-2">
                        <span
                          className={`border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide shadow-lg ${getSaleBadgeClass(saleStatus)}`}
                        >
                          {getSaleStatusLabel(saleStatus, locale)}
                        </span>
                        {work.salePrice ? (
                          <span className="bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur">
                            {work.salePrice}
                          </span>
                        ) : null}
                      </div>
                    ) : null}
                  </div>

                  <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-foreground leading-snug">
                        {work.title}
                      </span>
                      {work.saleStatus && work.saleStatus !== "none" ? (
                        <span className="mt-1 block truncate text-xs font-medium text-accent">
                          {getSaleStatusLabel(work.saleStatus, locale)}
                          {work.salePrice ? ` · ${work.salePrice}` : ""}
                        </span>
                      ) : null}
                      {getMeta(img, ui.gallery.metaSeparator) ? (
                        <span className="mt-1 block truncate text-xs text-foreground-muted">
                          {getMeta(img, ui.gallery.metaSeparator)}
                        </span>
                      ) : null}
                    </span>
                    <span className="eyebrow tnum text-foreground-faint group-hover:text-accent transition-colors shrink-0">
                      {ui.gallery.number} {String(i + 1).padStart(2, "0")}
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
              );
            })}
          </div>
        </div>
      </SectionWrapper>

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
