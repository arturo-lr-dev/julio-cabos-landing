import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import FadeIn from "./FadeIn";
import { siteContent } from "@/lib/data";

export default function AboutSection() {
  const { about } = siteContent;

  return (
    <SectionWrapper id="sobre-mi">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        <FadeIn>
          <div className="relative aspect-[3/4] overflow-hidden bg-surface">
            <Image
              src={about.image}
              alt="Julio Cabos"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight">
            {about.title}
          </h2>
          <div className="mt-6 space-y-4">
            {about.text.map((paragraph, i) => (
              <p
                key={i}
                className="text-foreground-muted text-base md:text-lg leading-relaxed font-light"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <a
            href={about.ctaHref}
            className="inline-block mt-8 px-6 py-3 border border-accent text-accent text-sm tracking-wide uppercase hover:bg-accent hover:text-background transition-colors duration-300"
          >
            {about.cta}
          </a>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
