"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useArticleAnalytics from "@/hooks/useArticleAnalytics";
import type { Locale } from "@/lib/site-content";
import { louisianaTigersCopy, type LouisianaCarousel } from "@/lib/louisiana-tigers-content";
import styles from "./LouisianaTigersArticle.module.css";

type ProcessSlide = {
  src: string;
  alt: string;
  caption: string;
};

const imageRoot = "/images/notas-julio/louisiana-tigers";

function toSlides(carousel: LouisianaCarousel): ProcessSlide[] {
  return carousel.slides.map(([file, caption]) => ({
    src: `${imageRoot}/${file}`,
    alt: caption,
    caption,
  }));
}

function ProcessCarousel({
  carousel,
  previousLabel,
  nextLabel,
  choosePhotoLabel,
  showPhotoLabel,
}: {
  carousel: LouisianaCarousel;
  previousLabel: string;
  nextLabel: string;
  choosePhotoLabel: string;
  showPhotoLabel: string;
}) {
  const slides = toSlides(carousel);
  const trackRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const goTo = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children[index] as HTMLElement | undefined;
    const firstSlide = track?.children[0] as HTMLElement | undefined;
    if (!track || !slide || !firstSlide) return;

    track.scrollTo({
      left: slide.offsetLeft - firstSlide.offsetLeft,
      behavior: "smooth",
    });
    setCurrent(index);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    const updateCurrentFromScroll = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        const slides = Array.from(track.children) as HTMLElement[];
        const closest = slides.reduce(
          (bestIndex, slide, index) => {
            const best = slides[bestIndex];
            const distance = Math.abs(slide.offsetLeft - track.scrollLeft);
            const bestDistance = Math.abs(best.offsetLeft - track.scrollLeft);
            return distance < bestDistance ? index : bestIndex;
          },
          0
        );
        setCurrent(closest);
      }, 80);
    };

    track.addEventListener("scroll", updateCurrentFromScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", updateCurrentFromScroll);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const previous = () => goTo((current - 1 + slides.length) % slides.length);
  const next = () => goTo((current + 1) % slides.length);

  return (
    <div
      className={styles.carousel}
      tabIndex={0}
      aria-label={carousel.label}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          previous();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          next();
        }
      }}
    >
      <div className={styles.carouselHead}>
        <span>{carousel.label}</span>
        <span className={styles.carouselCount} aria-live="polite">
          {current + 1} / {slides.length}
        </span>
      </div>

      <div ref={trackRef} className={styles.track}>
        {slides.map((slide) => (
          <figure className={styles.slide} key={slide.src}>
            <div className={styles.slideMedia}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 680px) calc(100vw - 44px), 830px"
                className={styles.slideImage}
                loading="lazy"
              />
            </div>
            <figcaption>{slide.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className={styles.controls}>
        <button type="button" onClick={previous} aria-label={previousLabel}>
          ← {previousLabel}
        </button>
        <div className={styles.dots} aria-label={choosePhotoLabel}>
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.src}
              aria-label={`${showPhotoLabel} ${index + 1}`}
              aria-current={current === index}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button type="button" onClick={next} aria-label={nextLabel}>
          {nextLabel} →
        </button>
      </div>

      {carousel.note ? <p className={styles.carouselNote}>{carousel.note}</p> : null}
    </div>
  );
}

export default function LouisianaTigersArticle({
  articleId,
  locale = "es",
}: {
  articleId: string;
  locale?: Locale;
}) {
  const copy = louisianaTigersCopy[locale];
  const { articleReadMarkerRef, trackArticleCta } = useArticleAnalytics({
    articleId,
    locale,
  });

  return (
    <>
      <Header locale={locale} />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div>
            <div className={styles.eyebrow}>{copy.eyebrow}</div>
            <h1>
              {copy.titleLineOne}
              <br />
              {copy.titleLineTwo}
            </h1>
            <p className={styles.heroSubtitle}>{copy.subtitle}</p>
            <div className={styles.meta}>
              {copy.metaFirstLine}
              <br />
              {copy.metaSecondLine}
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src={`${imageRoot}/portada.jpeg`}
              alt={copy.imageAlt}
              fill
              priority
              sizes="(max-width: 680px) calc(100vw - 44px), 720px"
              className={styles.containImage}
            />
          </div>
        </section>

        <div className={styles.wrap}>
          {copy.sections.map((section) => (
            <section className={styles.article} key={section.index}>
              <div className={styles.eyebrow}>{section.index}</div>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>
                  {paragraph.split("\n").map((line, index) => (
                    <span key={line}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </p>
              ))}
              {section.advice ? (
                <aside>
                  <span>{section.advice.label}</span>
                  <p>{section.advice.text}</p>
                </aside>
              ) : null}
              {section.carousel ? (
                <ProcessCarousel
                  carousel={section.carousel}
                  previousLabel={copy.previous}
                  nextLabel={copy.next}
                  choosePhotoLabel={copy.choosePhoto}
                  showPhotoLabel={copy.showPhoto}
                />
              ) : null}
              {section.secondTitle ? <h3>{section.secondTitle}</h3> : null}
              {section.secondCarousel ? (
                <ProcessCarousel
                  carousel={section.secondCarousel}
                  previousLabel={copy.previous}
                  nextLabel={copy.next}
                  choosePhotoLabel={copy.choosePhoto}
                  showPhotoLabel={copy.showPhoto}
                />
              ) : null}
            </section>
          ))}

          <div ref={articleReadMarkerRef} aria-hidden="true" className={styles.readMarker} />
          <div className={styles.backLink}>
            <Link
              href={locale === "es" ? "/biblioteca" : `/${locale}/biblioteca`}
              onClick={() => trackArticleCta("library")}
            >
              {copy.back}
            </Link>
          </div>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
