"use client";

import { useState } from "react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import FadeIn from "./FadeIn";
import { galleryImages } from "@/lib/data";

const INITIAL_COUNT = 6;

export default function GalleryGrid() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? galleryImages : galleryImages.slice(0, INITIAL_COUNT);
  const hasMore = galleryImages.length > INITIAL_COUNT;

  return (
    <SectionWrapper id="galeria">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {visible.map((img, i) => (
          <FadeIn key={img.src} delay={i < INITIAL_COUNT ? i * 100 : 0}>
            <div className="group relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
          </FadeIn>
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="px-8 py-3 border border-accent text-accent text-sm font-light tracking-wide uppercase hover:bg-accent hover:text-background transition-colors duration-300"
          >
            {expanded
              ? "Ver menos"
              : `Ver más (${galleryImages.length - INITIAL_COUNT})`}
          </button>
        </div>
      )}
    </SectionWrapper>
  );
}
