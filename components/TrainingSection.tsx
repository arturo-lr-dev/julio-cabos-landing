"use client";

import Image from "next/image";
import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import { getSiteContent, type Locale } from "@/lib/site-content";
import type { Course } from "@/lib/work-types";
import { trackAnalyticsEvent } from "@/lib/analytics";

function formatCourseDate(course: Course, locale: Locale) {
  const { ui } = getSiteContent(locale);
  if (!course.startDate) return ui.training.datePending;

  const formatter = new Intl.DateTimeFormat(ui.training.locale, {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const start = formatter.format(new Date(`${course.startDate}T12:00:00`));

  if (!course.endDate || course.endDate === course.startDate) {
    return start;
  }

  return `${start} - ${formatter.format(new Date(`${course.endDate}T12:00:00`))}`;
}

const italianCourseCopy: Record<
  string,
  Partial<Pick<Course, "title" | "level" | "materials" | "description" | "posterAlt">>
> = {
  "curso-de-pintura-en-valencia": {
    title: "Corso di pittura a Valencia",
    level: "Intermedio",
    materials: "Pennelli, aerografo e compressore",
    description:
      "Durante il fine settimana lavorerai su incarnati realistici, True Metal con effetti di usura, cuoio e texture, tessuti e volumi, integrazione di aerografo e pennello, velature, sfumature e finiture finali.",
    posterAlt: "Locandina del corso di pittura a Valencia",
  },
  "curso-intensivo-madrid": {
    title: "Corso di pittura dei cavalli",
    level: "Intermedio",
    materials: "Compressore, aerografo e pennelli",
    description:
      "Un corso per imparare a dipingere i cavalli con la tecnica mista di Julio, combinando aerografo e pennello.",
    posterAlt: "Locandina del corso di pittura dei cavalli",
  },
};

function getLocalizedCourse(course: Course, locale: Locale): Course {
  if (locale !== "it") return course;
  return { ...course, ...italianCourseCopy[course.slug] };
}

export default function TrainingSection({
  courses = [],
  locale = "es",
}: {
  courses?: Course[];
  locale?: Locale;
}) {
  const { training, ui } = getSiteContent(locale);
  const [previewCourse, setPreviewCourse] = useState<Course | null>(null);

  return (
    <SectionWrapper id="formacion" topRule>
      <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
        <FadeIn className="col-span-12 md:col-span-5">
          <SectionLabel index="03" label={ui.sections.training} className="mb-6" />
          <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            {ui.training.heading[0]}
            <span className="font-display-italic block text-accent/95">
              {ui.training.heading[1]}
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={150} className="col-span-12 md:col-span-7 md:pt-4">
          <p className="text-lg md:text-xl text-foreground leading-relaxed font-light max-w-xl">
            {training.text}
          </p>

          {courses.length > 0 ? (
            <div className="mt-10 grid gap-px bg-rule">
              {courses.slice(0, 3).map((course) => {
                const localizedCourse = getLocalizedCourse(course, locale);
                return (
                <article
                  key={course.slug}
                  className="bg-background p-5 md:p-6"
                >
                  <div
                    className={
                      course.posterImage
                        ? "grid gap-5 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]"
                        : "grid gap-5"
                    }
                  >
                    {course.posterImage ? (
                      <button
                        type="button"
                        onClick={() => {
                          trackAnalyticsEvent("vista_curso", {
                            id_curso: course.slug,
                            ubicacion: "seccion_formacion",
                            idioma: locale,
                          });
                          setPreviewCourse(localizedCourse);
                        }}
                        className="group relative aspect-[4/5] w-full overflow-hidden bg-surface outline-none transition hover:bg-background-elevated focus-visible:ring-2 focus-visible:ring-accent"
                        aria-label={
                          locale === "it"
                            ? `Ingrandisci la locandina di ${localizedCourse.title}`
                            : `Ampliar cartel de ${localizedCourse.title}`
                        }
                      >
                        <Image
                          src={course.posterImage}
                          alt={localizedCourse.posterAlt || localizedCourse.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 240px, 280px"
                          className="object-contain p-2 transition-transform duration-700 group-hover:scale-110"
                        />
                      </button>
                    ) : null}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                      <p className="eyebrow text-accent">
                        {localizedCourse.location} - {formatCourseDate(course, locale)}
                      </p>
                      <h3 className="mt-3 font-display text-2xl text-foreground leading-tight">
                        {localizedCourse.title}
                      </h3>
                      <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
                        {localizedCourse.description}
                      </p>
                      <p className="mt-4 text-xs uppercase tracking-wider text-foreground-faint">
                        {localizedCourse.level} - {course.price} -{" "}
                        {course.seatsAvailable} {ui.training.seats}
                      </p>
                      </div>
                      {course.bookingUrl ? (
                        <a
                          href={course.bookingUrl}
                          onClick={() =>
                            trackAnalyticsEvent("clic_reserva_curso", {
                              id_curso: course.slug,
                              ubicacion: "seccion_formacion",
                              idioma: locale,
                            })
                          }
                          className="shrink-0 border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10"
                        >
                          {ui.training.book}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
                );
              })}
            </div>
          ) : null}

          {/* Two offerings as catalogue items */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule">
            <a
              href={training.primaryHref}
              onClick={() =>
                trackAnalyticsEvent("clic_llamada_accion", {
                  nombre_accion: "formacion_presencial",
                  destino: training.primaryHref,
                  idioma: locale,
                })
              }
              className="group bg-background hover:bg-background-elevated transition-colors duration-500 p-6 md:p-8 flex flex-col gap-4"
            >
              <span className="eyebrow text-accent tnum">I.</span>
              <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight">
                {ui.training.inPersonTitle}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {ui.training.inPersonText}
              </p>
              <span className="mt-2 inline-flex items-center gap-3 eyebrow text-foreground group-hover:text-accent transition-colors duration-300">
                <span>{training.primaryCta}</span>
                <span
                  aria-hidden
                  className="block w-6 h-px bg-current transition-all duration-500 group-hover:w-12"
                />
              </span>
            </a>

            <div className="bg-background p-6 md:p-8 flex flex-col gap-4 opacity-80">
              <span className="eyebrow text-foreground-faint tnum">II.</span>
              <h3 className="font-display text-2xl md:text-3xl text-foreground/70 leading-tight">
                {ui.training.onlineTitle}
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {ui.training.onlineText}
              </p>
              <span className="mt-2 eyebrow text-foreground-faint">
                {training.secondaryCta}
              </span>
            </div>
          </div>
        </FadeIn>
      </div>

      {previewCourse?.posterImage ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={`Cartel de ${previewCourse.title}`}
        >
          <button
            type="button"
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={() => setPreviewCourse(null)}
            aria-label="Cerrar cartel"
          />
          <button
            type="button"
            onClick={() => setPreviewCourse(null)}
            className="absolute right-5 top-5 z-20 flex h-12 w-12 items-center justify-center text-foreground-muted transition hover:text-accent"
            aria-label="Cerrar cartel"
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
          <div className="pointer-events-none relative z-10 flex h-full w-full items-center justify-center p-6 pt-20 md:p-12">
            <Image
              src={previewCourse.posterImage}
              alt={previewCourse.posterAlt || previewCourse.title}
              width={1400}
              height={1400}
              className="h-auto max-h-[calc(100vh-7rem)] w-auto max-w-full object-contain"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      ) : null}
    </SectionWrapper>
  );
}
