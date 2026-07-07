import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import { getSiteContent, type Locale } from "@/lib/site-content";

export default function CommissionsSection({
  locale = "es",
}: {
  locale?: Locale;
}) {
  const { commissions, collaborations, ui } = getSiteContent(locale);

  return (
    <SectionWrapper id="obras-por-encargo" topRule>
      <div className="grid grid-cols-12 gap-8 md:gap-12">
        <FadeIn className="col-span-12 lg:col-span-5">
          <SectionLabel index="04" label={ui.sections.commissions} className="mb-6" />
          <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
            {ui.commissions.heading[0]}
            <span className="font-display-italic block text-accent/95">
              {ui.commissions.heading[1]}
            </span>
          </h2>
        </FadeIn>

        <FadeIn delay={150} className="col-span-12 lg:col-span-7">
          <p className="text-lg md:text-xl text-foreground leading-relaxed font-light max-w-2xl">
            {commissions.text}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-px bg-rule">
            <div className="bg-background-elevated p-7 md:p-8">
              <h3 className="font-display text-2xl md:text-3xl text-foreground">
                {commissions.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {commissions.items.map((item) => (
                  <li key={item} className="flex gap-3 text-foreground-muted">
                    <span className="mt-2 h-px w-5 bg-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={commissions.href}
                className="mt-8 inline-flex items-center gap-4 eyebrow text-foreground hover:text-accent transition-colors"
              >
                {commissions.cta}
                <span aria-hidden className="h-px w-8 bg-current" />
              </a>
            </div>

            <div id="colaboraciones" className="bg-background p-7 md:p-8">
              <h3 className="font-display text-2xl md:text-3xl text-foreground">
                {collaborations.title}
              </h3>
              <p className="mt-5 text-foreground-muted leading-relaxed">
                {collaborations.text}
              </p>
              <ul className="mt-6 space-y-3">
                {collaborations.items.map((item) => (
                  <li key={item} className="flex gap-3 text-foreground-muted">
                    <span className="mt-2 h-px w-5 bg-accent shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href={collaborations.href}
                className="mt-8 inline-flex items-center gap-4 eyebrow text-foreground hover:text-accent transition-colors"
              >
                {collaborations.cta}
                <span aria-hidden className="h-px w-8 bg-current" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
