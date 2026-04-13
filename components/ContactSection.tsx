import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import { siteContent } from "@/lib/data";

export default function ContactSection() {
  const { contact } = siteContent;

  return (
    <SectionWrapper id="contacto" topRule>
      <div className="grid grid-cols-12 gap-8 md:gap-12 items-end">
        <FadeIn className="col-span-12 md:col-span-7">
          <SectionLabel index="05" label="Contacto" className="mb-6" />
          <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Hablemos
            <span className="font-display-italic block text-accent/95">
              de tu proyecto
            </span>
          </h2>
          <p className="mt-8 max-w-lg text-base md:text-lg text-foreground-muted leading-relaxed font-light">
            {contact.text}
          </p>
        </FadeIn>

        <FadeIn delay={150} className="col-span-12 md:col-span-5 md:text-right">
          <a
            href={`mailto:${contact.email}`}
            className="group inline-block"
          >
            <span className="block eyebrow text-foreground-faint mb-3">
              ESCRIBIR A
            </span>
            <span className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground group-hover:text-accent transition-colors duration-500 break-all">
              {contact.email}
            </span>
            <span
              aria-hidden
              className="block h-px bg-current mt-3 w-full md:ml-auto md:w-3/4 transition-all duration-700 group-hover:bg-accent"
            />
          </a>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
