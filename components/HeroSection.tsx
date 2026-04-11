import Image from "next/image";
import { siteContent } from "@/lib/data";

export default function HeroSection() {
  const { hero } = siteContent;

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center">
      <Image
        src={hero.backgroundImage}
        alt="Miniatura pintada por Julio Cabos"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-background/20" />
      <div className="relative z-10 text-center px-6">
        <h1 className="hero-animate text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground">
          {hero.title}
        </h1>
        <p className="hero-animate-delay-1 mt-4 text-lg md:text-xl text-foreground-muted font-light max-w-lg mx-auto">
          {hero.subtitle}
        </p>
        <p className="hero-animate-delay-2 mt-3 text-sm md:text-base text-foreground-muted/70 font-light max-w-md mx-auto">
          {hero.description}
        </p>
        <a
          href={hero.ctaHref}
          className="hero-animate-delay-3 inline-block mt-10 px-8 py-3 border border-accent text-accent text-sm font-light tracking-wide uppercase hover:bg-accent hover:text-background transition-colors duration-300"
        >
          {hero.cta}
        </a>
      </div>
    </section>
  );
}
