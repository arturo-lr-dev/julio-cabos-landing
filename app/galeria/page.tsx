"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Lightbox from "@/components/Lightbox";
import FadeIn from "@/components/FadeIn";
import { galleryImages, categoryLabels, GalleryCategory } from "@/lib/data";

const categories: GalleryCategory[] = [
  "box-art",
  "encargo",
  "detalle",
  "coleccion",
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<GalleryCategory | "todas">(
    "todas"
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = useMemo(() => {
    if (activeFilter === "todas") return galleryImages;
    return galleryImages.filter((img) => img.category === activeFilter);
  }, [activeFilter]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-rule">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          <Link href="/" className="group flex items-baseline gap-2">
            <span className="font-display text-foreground text-xl md:text-2xl leading-none">
              Julio
            </span>
            <span className="font-display-italic text-accent text-xl md:text-2xl leading-none">
              Cabos
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-foreground-muted hover:text-accent transition-colors"
          >
            Volver
          </Link>
        </nav>
      </header>

      <main className="pt-24 md:pt-32 pb-24 md:pb-32 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero section */}
          <FadeIn>
            <div className="mb-16 md:mb-24">
              <div className="flex items-center gap-3 mb-6">
                <span aria-hidden className="text-foreground-faint">—</span>
                <span className="eyebrow text-foreground-muted">Galería</span>
              </div>
              <h1 className="font-display text-foreground text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-8">
                Obra{" "}
                <span className="font-display-italic text-accent/90">completa</span>
              </h1>
              <p className="text-foreground-muted max-w-xl text-lg leading-relaxed">
                {galleryImages.length} piezas pintadas a lo largo de los últimos
                años. Cada miniatura cuenta una historia de luz, volumen y
                decisión artística.
              </p>
            </div>
          </FadeIn>

          {/* Filters */}
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
                Todas ({galleryImages.length})
              </button>
              {categories.map((cat) => {
                const count = galleryImages.filter(
                  (img) => img.category === cat
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
                    {categoryLabels[cat]} ({count})
                  </button>
                );
              })}
            </div>
          </FadeIn>

          {/* Masonry grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {filteredImages.map((img, i) => (
              <FadeIn
                key={img.src}
                delay={i < 12 ? i * 60 : 0}
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
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
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

                    {/* Expand icon */}
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

                  {/* Caption */}
                  <figcaption className="mt-4 flex items-baseline justify-between gap-4 px-1">
                    <span className="text-sm text-foreground-muted leading-snug font-light">
                      {img.alt.split("—")[0]?.trim()}
                    </span>
                    <span className="eyebrow tnum text-foreground-faint group-hover:text-accent transition-colors duration-500 shrink-0">
                      Nº{" "}
                      {String(
                        galleryImages.indexOf(img) + 1
                      ).padStart(2, "0")}
                    </span>
                  </figcaption>
                </figure>
              </FadeIn>
            ))}
          </div>
        </div>
      </main>

      <Lightbox
        images={filteredImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
