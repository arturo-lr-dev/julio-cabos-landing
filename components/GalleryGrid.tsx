"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import Lightbox from "./Lightbox";
import { galleryImages, categoryLabels } from "@/lib/data";

const INITIAL_COUNT = 9;

export default function GalleryGrid() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const visible = galleryImages.slice(0, INITIAL_COUNT);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
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

        {/* Masonry grid using CSS columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
          {visible.map((img, i) => (
            <FadeIn
              key={img.src}
              delay={i * 80}
              className="break-inside-avoid"
            >
              <figure
                className="group relative cursor-pointer overflow-hidden bg-surface"
                onClick={() => openLightbox(i)}
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
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Category badge on hover */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <span className="eyebrow text-foreground/90 bg-background/60 backdrop-blur-sm px-3 py-1.5">
                      {categoryLabels[img.category]}
                    </span>
                  </div>
                  
                  {/* Expand icon on hover */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <div className="w-10 h-10 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground">
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <figcaption className="mt-4 flex items-baseline justify-between gap-4 px-1">
                  <span className="text-sm text-foreground-muted leading-snug font-light">
                    {img.alt.split("—")[0]?.trim()}
                  </span>
                  <span className="eyebrow tnum text-foreground-faint group-hover:text-accent transition-colors duration-500 shrink-0">
                    Nº {String(i + 1).padStart(2, "0")}
                  </span>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>

        {/* CTA to full gallery */}
        <div className="mt-20 flex flex-col items-center gap-4">
          <span aria-hidden className="block w-px h-12 bg-rule" />
          <Link
            href="/galeria"
            className="group inline-flex items-center gap-4 px-1 py-2 eyebrow text-foreground hover:text-accent transition-colors duration-300"
          >
            <span
              aria-hidden
              className="block w-10 h-px bg-current transition-all duration-500 group-hover:w-16"
            />
            <span>
              Ver obra completa ({galleryImages.length} piezas)
            </span>
            <span
              aria-hidden
              className="block w-10 h-px bg-current transition-all duration-500 group-hover:w-16"
            />
          </Link>
        </div>
      </SectionWrapper>

      <Lightbox
        images={visible}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
