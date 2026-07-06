import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import { siteContent } from "@/lib/site-content";
import type { Course } from "@/lib/work-types";

function formatCourseDate(course: Course) {
  if (!course.startDate) return "Fecha por confirmar";

  const formatter = new Intl.DateTimeFormat("es-ES", {
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

export default function TrainingSection({ courses = [] }: { courses?: Course[] }) {
  const { training } = siteContent;

  return (
    <SectionWrapper id="formacion" topRule>
      <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
        <FadeIn className="col-span-12 md:col-span-5">
          <SectionLabel index="03" label="Aprender con Julio" className="mb-6" />
          <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Aprende a mirar
            <span className="font-display-italic block text-accent/95">
              antes de pintar
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={150} className="col-span-12 md:col-span-7 md:pt-4">
          <p className="text-lg md:text-xl text-foreground leading-relaxed font-light max-w-xl">
            {training.text}
          </p>

          {courses.length > 0 ? (
            <div className="mt-10 grid gap-px bg-rule">
              {courses.slice(0, 3).map((course) => (
                <article
                  key={course.slug}
                  className="bg-background p-5 md:p-6"
                >
                  <div
                    className={
                      course.posterImage
                        ? "grid gap-5 md:grid-cols-[180px_1fr]"
                        : "grid gap-5"
                    }
                  >
                    {course.posterImage ? (
                      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                        <Image
                          src={course.posterImage}
                          alt={course.posterAlt || course.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 180px"
                          className="object-cover"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                      <p className="eyebrow text-accent">
                        {course.location} - {formatCourseDate(course)}
                      </p>
                      <h3 className="mt-3 font-display text-2xl text-foreground leading-tight">
                        {course.title}
                      </h3>
                      <p className="mt-3 text-sm text-foreground-muted leading-relaxed">
                        {course.description}
                      </p>
                      <p className="mt-4 text-xs uppercase tracking-wider text-foreground-faint">
                        {course.level} - {course.price} -{" "}
                        {course.seatsAvailable} plazas disponibles
                      </p>
                      </div>
                      {course.bookingUrl ? (
                        <a
                          href={course.bookingUrl}
                          className="shrink-0 border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10"
                        >
                          Reservar
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {/* Two offerings as catalogue items */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-rule">
            <a
              href={training.primaryHref}
              className="group bg-background hover:bg-background-elevated transition-colors duration-500 p-6 md:p-8 flex flex-col gap-4"
            >
              <span className="eyebrow text-accent tnum">I.</span>
              <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight">
                Cursos presenciales
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                Sesiones intensivas y plazas limitadas. Trabajo directo sobre
                luz, color, volumen y toma de decisiones.
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
                Cursos online
              </h3>
              <p className="text-sm text-foreground-muted leading-relaxed">
                En desarrollo. Material grabado, ejercicios pautados y una
                forma clara de aplicar el método desde casa.
              </p>
              <span className="mt-2 eyebrow text-foreground-faint">
                {training.secondaryCta}
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
