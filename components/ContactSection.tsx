import SectionWrapper from "./SectionWrapper";
import FadeIn from "./FadeIn";
import { siteContent } from "@/lib/data";

export default function ContactSection() {
  const { contact } = siteContent;

  return (
    <SectionWrapper id="contacto" narrow className="text-center">
      <FadeIn>
        <h2 className="text-3xl md:text-4xl font-light tracking-tight">
          {contact.title}
        </h2>
        <p className="mt-6 text-foreground-muted text-lg leading-relaxed font-light">
          {contact.text}
        </p>
        <a
          href={`mailto:${contact.email}`}
          className="inline-block mt-10 px-8 py-4 bg-accent text-background font-medium text-sm tracking-wide uppercase hover:bg-accent-hover transition-colors"
        >
          {contact.cta}
        </a>
      </FadeIn>
    </SectionWrapper>
  );
}
