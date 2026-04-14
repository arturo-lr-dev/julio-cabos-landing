import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import { siteContent } from "@/lib/data";

export default function TextBlock() {
  const { message } = siteContent;
  const lines = message.text.filter((l) => l !== "");
  const [first, ...rest] = lines;

  return (
    <SectionWrapper narrow topRule>
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
