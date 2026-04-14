import Image from "next/image";
import { siteContent } from "@/lib/data";

export default function HeroSection() {
  const { hero } = siteContent;

  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Background image with slow ken-burns */}
      <div className="absolute inset-0">
        <Image
          src={hero.backgroundImage}
          alt="Miniatura pintada por Julio Cabos"
          fill
          className="object-cover ken-burns"
          priority
          sizes="100vw"
        />
      </div>

      {/* Atmospheric overlays — deep base + warm vignette */}
      <div className="absolute inset-0 bg-background/0" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/45 to-background/55" />
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 30% 40%, transparent 0%, var(--background) 100%)",
        }}
      />

      {/* Top hairline + label row */}
      <div className="absolute top-0 left-0 right-0 z-10 px-6 md:px-12 pt-24 md:pt-28">
        <div className="max-w-6xl mx-auto flex items-center justify-between hero-animate">
          <span className="eyebrow text-foreground-muted">
            <span className="ml-3">PORTFOLIO &amp; ATELIER</span>
          </span>
          <span className="hidden md:inline eyebrow text-foreground-muted">
            EST. <span className="tnum">2002</span>
          </span>
        </div>
      </div>

      {/* Editorial composition */}
      <div className="relative z-10 h-full px-6 md:px-12 flex items-end pb-28 md:pb-36">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-12 gap-6 items-end">
            {/* Display name — takes most of the width */}
            <h1 className="col-span-12 lg:col-span-9 hero-animate-delay-1 font-display text-foreground leading-[0.92] text-[clamp(3.5rem,11vw,9.5rem)]">
              Julio
              <span className="font-display-italic block text-accent/95">
                Cabos
              </span>
            </h1>

            {/* Specimen card — like a museum object label */}
            <aside className="col-span-12 lg:col-span-3 hero-animate-delay-2 rule-t pt-6 lg:rule-t-0 lg:border-l lg:border-rule lg:pl-6 lg:pt-0">
              <p className="font-display-italic text-xl md:text-2xl text-foreground leading-snug">
                {hero.subtitle}.
              </p>
              <p className="mt-4 text-sm text-foreground-muted font-light leading-relaxed">
                {hero.description}
              </p>
              <a
                href={hero.ctaHref}
                className="group inline-flex items-center gap-3 mt-8 eyebrow text-foreground hover:text-accent transition-colors duration-300"
              >
                <span>{hero.cta}</span>
                <span
                  aria-hidden
                  className="block w-8 h-px bg-current transition-all duration-500 group-hover:w-14"
                />
              </a>
            </aside>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hero-animate-delay-3 flex flex-col items-center gap-2 text-foreground-muted">
        <span className="eyebrow scroll-hint">SCROLL</span>
        <span aria-hidden className="block w-px h-8 bg-current opacity-30" />
      </div>
    </section>
  );
}
