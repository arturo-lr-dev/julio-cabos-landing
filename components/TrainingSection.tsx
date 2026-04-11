import SectionWrapper from "./SectionWrapper";
import { siteContent } from "@/lib/data";

export default function TrainingSection() {
  const { training } = siteContent;

  return (
    <SectionWrapper id="formacion" className="text-center">
      <h2 className="text-3xl md:text-4xl font-light tracking-tight">
        {training.title}
      </h2>
      <p className="mt-6 text-foreground-muted max-w-xl mx-auto text-lg leading-relaxed font-light">
        {training.text}
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href={training.primaryHref}
          className="px-8 py-4 bg-accent text-background font-medium text-sm tracking-wide uppercase hover:bg-accent-hover transition-colors text-center"
        >
          {training.primaryCta}
        </a>
        <a
          href={training.secondaryHref}
          className="px-8 py-4 border border-foreground-muted/30 text-foreground-muted text-sm tracking-wide uppercase hover:border-accent hover:text-accent transition-colors text-center"
        >
          {training.secondaryCta}
        </a>
      </div>
    </SectionWrapper>
  );
}
