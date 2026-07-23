import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import FadeIn from "./FadeIn";
import { getSiteContent, type Locale } from "@/lib/site-content";
import TrackedLink from "./TrackedLink";

export default function PathwaysSection({ locale = "es" }: { locale?: Locale }) {
  const { pathways } = getSiteContent(locale);

  return (
    <SectionWrapper id="servicios" topRule>
      <FadeIn>
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-tight">
            {pathways.title}
          </h2>
          <p className="mt-4 text-foreground-muted leading-relaxed">
            {pathways.subtitle}
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
        {pathways.items.map((item, index) => (
          <FadeIn key={item.title} delay={index * 120}>
            <article className="group relative min-h-[430px] overflow-hidden border border-rule bg-surface">
              <Image
                src={item.image}
                alt={`${item.title} ${item.kicker}`}
                fill
                className="object-cover opacity-55 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 33vw"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/65 to-background/10" />
              <div className="absolute inset-0 p-7 md:p-8 flex flex-col justify-end">
                <div className="mb-auto">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="eyebrow text-accent mb-3">{item.kicker}</p>
                <h3 className="font-display text-foreground text-4xl md:text-5xl leading-none">
                  {item.title}
                </h3>
                <p className="mt-5 text-sm md:text-base text-foreground-muted leading-relaxed max-w-sm">
                  {item.text}
                </p>
                <TrackedLink
                  href={item.href}
                  eventName="clic_llamada_accion"
                  eventParameters={{
                    nombre_accion: `camino_${index + 1}`,
                    destino: item.href,
                    idioma: locale,
                  }}
                  className="mt-8 inline-flex min-h-11 items-center justify-between gap-6 bg-accent px-6 py-3 eyebrow text-background hover:bg-accent-hover transition-colors duration-300"
                >
                  <span>{item.cta}</span>
                  <span aria-hidden>→</span>
                </TrackedLink>
                {item.secondaryCta && item.secondaryHref ? (
                  <p className="mt-5 max-w-xs text-xs leading-relaxed text-foreground-muted">
                    {item.secondaryText ? (
                      <span className="block">{item.secondaryText}</span>
                    ) : null}
                    <TrackedLink
                      href={item.secondaryHref}
                      eventName="clic_llamada_accion"
                      eventParameters={{
                        nombre_accion: `camino_${index + 1}_secundario`,
                        destino: item.secondaryHref,
                        idioma: locale,
                      }}
                      className="mt-2 inline-flex items-center gap-2 text-accent transition-colors hover:text-accent-hover"
                    >
                      <span>{item.secondaryCta}</span>
                      <span aria-hidden>→</span>
                    </TrackedLink>
                  </p>
                ) : null}
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </SectionWrapper>
  );
}
