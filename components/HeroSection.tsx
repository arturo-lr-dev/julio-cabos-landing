import Image from "next/image";
import { getSiteContent, type Locale } from "@/lib/site-content";
import TrackedLink from "./TrackedLink";

export default function HeroSection({ locale = "es" }: { locale?: Locale }) {
  const { hero, ui } = getSiteContent(locale);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Background image with slow ken-burns */}
      <div
        className="absolute -top-6 -bottom-6 left-0 right-0 md:left-[42%] lg:left-[46%]"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 24%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 24%, black 100%)",
        }}
      >
        <Image
          src={hero.backgroundImage}
          alt={ui.heroImageAlt}
          fill
          className="object-cover object-[58%_50%] md:object-contain md:object-[right_top] ken-burns"
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
        />
      </div>

      {/* Atmospheric overlays — deep base + warm vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/82 md:via-background/48 to-background/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/8 to-background/25" />
      <div
        className="absolute inset-0 opacity-26 mix-blend-multiply"
        style={{
          background:
            "radial-gradient(ellipse 82% 60% at 82% 48%, transparent 0%, var(--background) 100%)",
        }}
      />

      {/* Editorial composition */}
      <div className="relative z-10 min-h-[100svh] px-6 md:px-12 pt-28 md:pt-36 pb-24 md:pb-28 flex items-start md:items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-12 gap-8 items-end">
            <div className="col-span-12 lg:col-span-6">
              <p className="hero-animate eyebrow text-accent mb-8">
                {hero.eyebrow}
              </p>
              <h1 className="hero-animate-delay-1 font-display text-foreground leading-[0.95] text-[clamp(3.05rem,6.8vw,6.8rem)] max-w-[39rem]">
                {hero.headline.split(" ").slice(0, 3).join(" ")}
                <span className="font-display-italic block text-accent/95">
                  {hero.headline.split(" ").slice(3).join(" ")}
                </span>
            </h1>

              <p className="hero-animate-delay-2 mt-6 md:mt-8 max-w-md text-base md:text-lg text-foreground-muted leading-relaxed font-light">
                {hero.description}
              </p>

              <div className="hero-animate-delay-3 mt-7 md:mt-10 flex flex-col sm:flex-row gap-4">
                <TrackedLink
                  href={hero.ctaHref}
                  eventName="cta_click"
                  eventParameters={{
                    cta_name: "hero_primary",
                    destination: hero.ctaHref,
                    language: locale,
                  }}
                  className="inline-flex min-h-12 items-center justify-center bg-accent px-8 py-4 eyebrow text-background hover:bg-accent-hover transition-colors duration-300"
                >
                  {hero.cta}
                </TrackedLink>
                <TrackedLink
                  href={hero.secondaryHref}
                  eventName="cta_click"
                  eventParameters={{
                    cta_name: "hero_secondary",
                    destination: hero.secondaryHref,
                    language: locale,
                  }}
                  className="inline-flex min-h-12 items-center justify-center border border-rule-strong px-8 py-4 eyebrow text-foreground hover:border-accent hover:text-accent transition-colors duration-300"
                >
                  {hero.secondaryCta}
                </TrackedLink>
              </div>
            </div>

            <aside className="hidden lg:block col-span-12 lg:col-span-4 lg:col-start-9 hero-animate-delay-2 mt-10 lg:mt-0 lg:translate-x-8 lg:-translate-y-16 xl:translate-x-12 xl:-translate-y-20 border-l border-rule pl-6 max-w-sm">
              <blockquote className="font-display-italic text-xl md:text-2xl text-foreground leading-snug">
                <span aria-hidden className="text-accent">“</span>
                {hero.quote}
                <span aria-hidden className="text-accent">”</span>
              </blockquote>
              <p className="mt-5 eyebrow text-foreground-muted">
                — Julio Cabos
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
