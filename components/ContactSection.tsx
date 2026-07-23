import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import { getSiteContent, type Locale } from "@/lib/site-content";
import InquiryForm from "./InquiryForm";
import TrackedLink from "./TrackedLink";

export default function ContactSection({ locale = "es" }: { locale?: Locale }) {
  const { contact, ui } = getSiteContent(locale);

  return (
    <SectionWrapper id="contacto" topRule>
      <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
        <FadeIn className="col-span-12 md:col-span-7">
          <SectionLabel index="09" label={ui.sections.contact} className="mb-6" />
          <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            {ui.contact.heading[0]}
            <span className="font-display-italic block text-accent/95">
              {ui.contact.heading[1]}
            </span>
          </h2>
          <p className="mt-8 max-w-lg text-base md:text-lg text-foreground-muted leading-relaxed font-light">
            {contact.text}
          </p>
        </FadeIn>

        <FadeIn delay={150} className="col-span-12 md:col-span-5">
          <span id="consulta-encargo" className="block scroll-mt-28" />
          <span id="consulta-colaboracion" className="block scroll-mt-28" />
          <span id="consulta-cursos" className="block scroll-mt-28" />
          <InquiryForm locale={locale} />
          <TrackedLink
            href={`mailto:${contact.email}`}
            eventName="clic_llamada_accion"
            eventParameters={{
              nombre_accion: "contacto_email",
              ubicacion: "seccion_contacto",
              idioma: locale,
            }}
            className="group mt-6 inline-block"
          >
            <span className="block eyebrow text-foreground-faint mb-3">
              {ui.contact.direct}
            </span>
            <span className="font-display text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors duration-500 break-all">
              {contact.email}
            </span>
            <span
              aria-hidden
              className="block h-px bg-current mt-3 w-full md:ml-auto md:w-3/4 transition-all duration-700 group-hover:bg-accent"
            />
          </TrackedLink>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
