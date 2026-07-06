"use client";

import { useCallback, useEffect } from "react";
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
  const hasMultipleImages = images.length > 1;

  const goNext = useCallback(() => {
    onNavigate((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    onNavigate((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowRight":
          if (hasMultipleImages) goNext();
          break;
        case "ArrowLeft":
          if (hasMultipleImages) goPrev();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose, goNext, goPrev, hasMultipleImages]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Visor de imagenes"
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/95 backdrop-blur-xl"
        onClick={onClose}
        aria-label="Cerrar visor"
      />

      <button
        onClick={onClose}
        className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center text-foreground-muted transition-colors duration-300 hover:text-accent"
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

      {hasMultipleImages ? (
        <>
          <button
            onClick={goPrev}
            className="absolute left-4 z-10 flex h-14 w-14 items-center justify-center text-foreground-muted transition-colors duration-300 hover:text-accent md:left-8"
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

          <button
            onClick={goNext}
            className="absolute right-4 z-10 flex h-14 w-14 items-center justify-center text-foreground-muted transition-colors duration-300 hover:text-accent md:right-8"
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
        </>
      ) : null}

      <div className="relative flex h-full w-full items-center justify-center px-6 pb-28 pt-20 md:px-20">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={1400}
          height={1400}
          className="h-auto max-h-[calc(100vh-150px)] w-auto max-w-full object-contain"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
      </div>

      {hasMultipleImages ? (
        <div className="absolute bottom-6 left-1/2 z-10 flex max-w-[90vw] -translate-x-1/2 gap-2 overflow-x-auto px-4 py-2">
          {images.map((img, index) => (
            <button
              key={img.src}
              onClick={() => onNavigate(index)}
              className={`relative h-12 w-12 shrink-0 overflow-hidden transition-all duration-300 md:h-16 md:w-16 ${
                index === currentIndex
                  ? "scale-110 ring-2 ring-accent"
                  : "opacity-50 hover:opacity-80"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
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
      ) : null}
    </div>
  );
}
