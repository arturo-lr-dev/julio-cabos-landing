import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import { siteContent } from "@/lib/data";

export default function AboutSection() {
  const { about } = siteContent;

  return (
    <SectionWrapper id="sobre-mi" topRule>
      <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-start">
        {/* Image — slightly offset, like a plate in a monograph */}
        <FadeIn className="col-span-12 md:col-span-5">
          <figure className="relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface">
              <Image
                src={about.image}
                alt="Julio Cabos en su taller"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-4 eyebrow text-foreground-faint">
              <span className="tnum">Plate I</span>
              <span className="ml-3">— Julio Cabos en el taller</span>
            </figcaption>
          </figure>
        </FadeIn>

        {/* Text — wider column, like an essay */}
        <FadeIn delay={150} className="col-span-12 md:col-span-7">
          <SectionLabel index="02" label="Sobre Julio" className="mb-6" />

          <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Dos décadas
            <span className="font-display-italic block text-accent/95">
              pintando con criterio
            </span>
          </h2>

          {/* Drop-cap on first paragraph */}
          <div className="mt-10 space-y-5 max-w-xl">
            {about.text.map((paragraph, i) => (
              <p
                key={i}
                className={`text-foreground-muted leading-relaxed font-light ${
                  i === 0 ? "text-lg md:text-xl text-foreground" : "text-base md:text-lg"
                }`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Small biographical specs */}
          <dl className="mt-10 grid grid-cols-2 max-w-md gap-y-3 gap-x-6 rule-t pt-6">
            <dt className="eyebrow text-foreground-faint">Libros</dt>
            <dd className="font-display text-2xl text-foreground tnum">+30</dd>
            <dt className="eyebrow text-foreground-faint">Trayectoria</dt>
            <dd className="font-display text-2xl text-foreground tnum">20+ años</dd>
            <dt className="eyebrow text-foreground-faint">Estudios</dt>
            <dd className="text-sm text-foreground">
              Andrea Miniatures · Scale75
            </dd>
          </dl>

          <a
            href={about.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 mt-10 eyebrow text-foreground hover:text-accent transition-colors duration-300"
          >
            <span>{about.cta} (PDF)</span>
            <span
              aria-hidden
              className="block w-8 h-px bg-current transition-all duration-500 group-hover:w-14"
            />
          </a>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
