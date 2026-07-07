import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import { getSiteContent, type Locale } from "@/lib/site-content";

export default function TextBlock({ locale = "es" }: { locale?: Locale }) {
  const { message, ui } = getSiteContent(locale);
  const lines = message.text.filter((l) => l !== "");
  const [first, ...rest] = lines;

  return (
    <SectionWrapper narrow topRule>
      <FadeIn>
        <SectionLabel index="06" label={ui.sections.manifesto} className="mb-8" />
      </FadeIn>

      <FadeIn delay={120}>
        <blockquote className="font-display-italic text-foreground text-3xl md:text-4xl lg:text-5xl leading-[1.15] tracking-tight">
          <span aria-hidden className="text-accent mr-2">“</span>
          {first}
        </blockquote>
      </FadeIn>

      <FadeIn delay={240}>
        <div className="mt-10 max-w-xl space-y-4">
          {rest.map((line, i) => (
            <p
              key={i}
              className="text-base md:text-lg text-foreground-muted leading-relaxed font-light"
            >
              {line}
            </p>
          ))}
        </div>
      </FadeIn>
    </SectionWrapper>
  );
}
