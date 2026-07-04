"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import Lightbox from "./Lightbox";
import type { GalleryImage, GalleryWork } from "@/lib/data";

const INITIAL_COUNT = 5;

function getMeta(image: GalleryImage) {
  return [image.scale, image.brand, image.year].filter(Boolean).join(" · ");
}

export default function GalleryGrid({
  works,
}: {
  works: GalleryWork[];
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState<GalleryImage[]>([]);

  const visible = works.slice(0, INITIAL_COUNT);

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
      <SectionWrapper id="galeria" topRule>
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-end mb-10 md:mb-12">
          <FadeIn className="col-span-12 md:col-span-4">
            <SectionLabel
              index="05"
              label="Así es el resultado"
              className="mb-5"
            />
            <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-tight">
              Obras{" "}
              <span className="font-display-italic text-accent/90">
                seleccionadas
              </span>
            </h2>
            <p className="mt-6 text-sm md:text-base text-foreground-muted leading-relaxed">
              Piezas que muestran el nivel, el detalle y la dedicación de cada
              proyecto.
            </p>
            <Link
              href="/galeria"
              className="mt-8 inline-flex items-center gap-4 border border-rule-strong px-5 py-3 eyebrow text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              Ver galería completa
              <span aria-hidden>→</span>
            </Link>
          </FadeIn>

          <div className="col-span-12 md:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {visible.map((work, i) => {
              const img = work.cover;

              return (
              <FadeIn key={work.slug} delay={i * 80}>
                <figure
                  className="group cursor-pointer"
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
                  </div>

                  <figcaption className="mt-3 flex items-baseline justify-between gap-3">
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-foreground leading-snug">
                        {work.title}
                      </span>
                      {getMeta(img) ? (
                        <span className="mt-1 block truncate text-xs text-foreground-muted">
                          {getMeta(img)}
                        </span>
                      ) : null}
                    </span>
                    <span className="eyebrow tnum text-foreground-faint group-hover:text-accent transition-colors shrink-0">
                      Nº {String(i + 1).padStart(2, "0")}
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
