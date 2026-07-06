import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import { siteContent } from "@/lib/site-content";

const storyItems = [
  {
    label: "El oficio",
    title: "Antes del efecto, la mirada.",
    text:
      "La pintura empieza antes de coger el pincel: analizar la luz, entender el volumen y decidir qué necesita la figura para funcionar.",
    image: "/oficio.JPG",
    alt: "Julio Cabos pintando una miniatura en su mesa de trabajo",
  },
  {
    label: "Obra y reconocimiento",
    title: "Una trayectoria construida pieza a pieza.",
    text:
      "Premios, publicaciones y proyectos profesionales acompañan una carrera dedicada a la miniatura de exposición y al trabajo de alto nivel.",
    image: "/hoy_old.JPG",
    alt: "Julio Cabos con un reconocimiento profesional junto a vitrinas de miniaturas",
  },
  {
    label: "Formación",
    title: "Enseñar a comprender, no a copiar.",
    text:
      "Sus cursos no se centran en repetir recetas, sino en dar al alumno criterio para resolver cualquier figura con más seguridad.",
    image: "/formacion.jpeg",
    alt: "Julio Cabos en una sesión de formación con alumnos",
  },
  {
    label: "Hoy",
    title: "Obra, formación y colaboraciones.",
    text:
      "Julio trabaja con coleccionistas, marcas y alumnos desde una misma idea: pintar miniaturas entendiendo por qué funcionan.",
    image: "/Julio_pintando.jpeg",
    alt: "Julio Cabos pintando durante una demostración de miniaturas",
  },
];

export default function AboutSection() {
  const { about } = siteContent;

  return (
    <SectionWrapper id="sobre-mi" topRule>
      <div className="space-y-12 md:space-y-16">
        <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-end">
          <FadeIn className="col-span-12 lg:col-span-5">
            <SectionLabel index="08" label={about.title} className="mb-6" />
            <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
              La trayectoria
              <span className="font-display-italic block text-accent/95">
                como relato de oficio
              </span>
            </h2>
          </FadeIn>

          <FadeIn delay={120} className="col-span-12 lg:col-span-7">
            <div className="space-y-5 max-w-2xl">
              {about.text.map((paragraph, i) => (
                <p
                  key={i}
                  className={`text-foreground-muted leading-relaxed font-light ${
                    i === 0
                      ? "text-lg md:text-xl text-foreground"
                      : "text-base md:text-lg"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={180}>
          <figure className="relative overflow-hidden bg-surface">
            <div className="relative aspect-[16/10] md:aspect-[21/9]">
              <Image
                src={about.image}
                alt="Julio Cabos en su taller"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1100px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
            </div>
            <figcaption className="absolute bottom-5 left-5 md:bottom-8 md:left-8 eyebrow text-foreground-muted">
              Taller · Madrid · España
            </figcaption>
          </figure>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/60">
          {storyItems.map((item, index) => (
            <FadeIn
              key={item.label}
              delay={index * 90}
              className="bg-background p-0"
            >
              <article className="grid grid-cols-1 lg:grid-cols-2 min-h-full">
                <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-surface">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </div>
                <div className="flex min-h-[260px] flex-col justify-between p-6 md:p-8">
                  <div>
                    <p className="eyebrow text-accent">{item.label}</p>
                    <h3 className="mt-5 font-display text-3xl md:text-4xl leading-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-5 text-sm md:text-base leading-relaxed text-foreground-muted font-light">
                      {item.text}
                    </p>
                  </div>
                  <span className="mt-8 eyebrow text-foreground-faint tnum">
                    0{index + 1}
                  </span>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={240} className="grid grid-cols-12 gap-8 items-center rule-t pt-8">
          <div className="col-span-12 md:col-span-7">
            <p className="font-display text-3xl md:text-4xl leading-tight text-foreground">
              Más que un currículum, una forma de trabajar.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-right">
            <a
              href={about.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-4 eyebrow text-foreground hover:text-accent transition-colors duration-300"
            >
              <span>{about.cta} profesional (PDF)</span>
              <span
                aria-hidden
                className="block w-8 h-px bg-current transition-all duration-500 group-hover:w-14"
              />
            </a>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
