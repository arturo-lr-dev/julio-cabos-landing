import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import { siteContent } from "@/lib/data";

export default function TrainingSection() {
  const { training } = siteContent;

  return (
    <SectionWrapper id="formacion" topRule>
      <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
        <FadeIn className="col-span-12 md:col-span-5">
          <SectionLabel index="03" label="Formación" className="mb-6" />
          <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Aprender
            <span className="font-display-italic block text-accent/95">
              a ver
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={150} className="col-span-12 md:col-span-7 md:pt-4">
          <p className="text-lg md:text-xl text-foreground leading-relaxed font-light max-w-xl">
            {training.text}
          </p>

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
                Sesiones intensivas en taller. Plazas limitadas, formación
                personalizada según el nivel del alumno.
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
                En desarrollo. Material grabado, ejercicios pautados y
                seguimiento personal a distancia.
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
