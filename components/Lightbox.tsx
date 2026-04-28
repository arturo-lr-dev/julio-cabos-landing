"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { GalleryImage } from "@/lib/data";

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentImage = images[currentIndex];

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de imágenes"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/95 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors duration-300"
        aria-label="Cerrar visor"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation - Previous */}
      <button
        onClick={goPrev}
        className="absolute left-4 md:left-8 z-10 w-14 h-14 flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors duration-300"
        aria-label="Imagen anterior"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Navigation - Next */}
      <button
        onClick={goNext}
        className="absolute right-4 md:right-8 z-10 w-14 h-14 flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors duration-300"
        aria-label="Imagen siguiente"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Image container */}
      <div className="relative z-10 w-full max-w-5xl mx-6 md:mx-12">
        <div
          className="relative w-full"
          style={{ aspectRatio: currentImage.aspectRatio }}
        >
          <Image
            src={currentImage.src}
            alt={currentImage.alt}
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 1280px"
            priority
          />
        </div>

        {/* Caption */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground leading-relaxed">
              {currentImage.alt}
            </p>
            {currentImage.series && (
              <p className="mt-1 text-xs text-foreground-muted uppercase tracking-wider">
                Serie: {currentImage.series}
              </p>
            )}
          </div>
          <span className="eyebrow text-foreground-faint shrink-0 ml-4">
            {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(images.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[90vw] overflow-x-auto px-4 py-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => onNavigate(i)}
            className={`relative w-12 h-12 md:w-16 md:h-16 shrink-0 overflow-hidden transition-all duration-300 ${
              i === currentIndex
                ? "ring-2 ring-accent scale-110"
                : "opacity-50 hover:opacity-80"
            }`}
            aria-label={`Ir a imagen ${i + 1}`}
          >
            <Image
              src={img.src}
              alt=""
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
