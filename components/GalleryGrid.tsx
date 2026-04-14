"use client";

import { useState } from "react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import { galleryImages } from "@/lib/data";

const INITIAL_COUNT = 6;

export default function GalleryGrid() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded
    ? galleryImages
    : galleryImages.slice(0, INITIAL_COUNT);
  const hasMore = galleryImages.length > INITIAL_COUNT;

  return (
    <SectionWrapper id="galeria" topRule>
      <FadeIn>
        <header className="mb-12 md:mb-16 flex items-end justify-between gap-6">
          <div>
            <SectionLabel index="03" label="Galería" className="mb-4" />
            <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-tight">
              Obra <span className="font-display-italic text-accent/90">seleccionada</span>
            </h2>
          </div>
          <p className="hidden md:block max-w-xs text-sm text-foreground-muted leading-relaxed">
            Una selección de piezas pintadas a lo largo de los últimos años:
            box art, encargos y trabajos personales.
          </p>
        </header>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-12 md:gap-x-6 md:gap-y-16">
        {visible.map((img, i) => {
          const num = String(i + 1).padStart(2, "0");
          return (
            <FadeIn
              key={img.src}
              delay={i < INITIAL_COUNT ? i * 90 : 0}
              className="group"
            >
              <figure className="relative">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  {/* Subtle bottom gradient for caption legibility on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/0 to-background/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Catalog caption */}
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="text-sm text-foreground-muted leading-snug font-light">
                    {img.alt.split("—")[0]?.trim()}
                  </span>
                  <span className="eyebrow tnum text-foreground-faint shrink-0">
                    Nº {num}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-20 flex flex-col items-center gap-4">
          <span aria-hidden className="block w-px h-12 bg-rule" />
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="group inline-flex items-center gap-4 px-1 py-2 eyebrow text-foreground hover:text-accent transition-colors duration-300"
          >
            <span
              aria-hidden
              className="block w-10 h-px bg-current transition-all duration-500 group-hover:w-16"
            />
            <span>
              {expanded
                ? "Ver menos"
                : `Ver toda la obra (${galleryImages.length})`}
            </span>
            <span
              aria-hidden
              className="block w-10 h-px bg-current transition-all duration-500 group-hover:w-16"
            />
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}
