import Image from "next/image";
import Link from "next/link";
import FadeIn from "./FadeIn";
import SectionLabel from "./SectionLabel";
import SectionWrapper from "./SectionWrapper";
import type { Locale } from "@/lib/site-content";

const copy = {
  es: {
    label: "Biblioteca",
    title: "Una vida entre",
    accent: "pinceles y páginas",
    text: "Durante más de veinte años, Julio Cabos ha compartido oficio y conocimiento a través de libros, manuales y publicaciones especializadas.",
    cta: "Entrar en la Biblioteca",
    href: "/biblioteca",
  },
  en: {
    label: "Library",
    title: "A life between",
    accent: "brushes and pages",
    text: "For more than twenty years, Julio Cabos has shared craft and knowledge through books, manuals and specialist publications.",
    cta: "Enter the Library",
    href: "/en/biblioteca",
  },
} satisfies Record<Locale, object>;

export default function LibraryTeaser({ locale = "es" }: { locale?: Locale }) {
  const content = copy[locale] as (typeof copy)["es"];

  return (
    <SectionWrapper id="biblioteca" topRule>
      <div className="grid grid-cols-12 items-center gap-x-0 gap-y-10 lg:gap-14">
        <FadeIn className="col-span-12 lg:col-span-5">
          <SectionLabel index="07" label={content.label} className="mb-6" />
          <h2 className="font-display text-4xl leading-[1.02] text-foreground md:text-5xl lg:text-6xl">
            {content.title}
            <span className="font-display-italic block text-accent/95">
              {content.accent}
            </span>
          </h2>
          <p className="mt-7 max-w-lg text-base font-light leading-relaxed text-foreground-muted md:text-lg">
            {content.text}
          </p>
          <Link
            href={content.href}
            className="group mt-9 inline-flex min-h-12 items-center gap-4 border border-rule-strong px-6 py-3 eyebrow text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span>{content.cta}</span>
            <span
              aria-hidden
              className="block h-px w-7 bg-current transition-all duration-500 group-hover:w-12"
            />
          </Link>
        </FadeIn>

        <FadeIn delay={150} className="col-span-12 lg:col-span-7">
          <Link
            href={content.href}
            aria-label={content.cta}
            className="group relative block min-h-[420px] overflow-hidden bg-background-elevated md:min-h-[560px]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(201,166,104,0.14),transparent_58%)]" />
            <div className="absolute inset-x-[8%] bottom-[4%] h-px bg-rule-strong shadow-[0_18px_45px_rgba(0,0,0,0.8)]" />

            <div className="absolute left-[8%] top-[17%] h-[62%] w-[34%] -rotate-[4deg] overflow-hidden shadow-2xl transition-transform duration-1000 group-hover:-translate-y-2 group-hover:-rotate-[2deg]">
              <Image
                src="/images/library/covers/wolfe-la-batalla-del-atlantico.jpeg"
                alt="Wölfe! La batalla del Atlántico"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 32vw, 230px"
              />
            </div>
            <div className="absolute left-[34%] top-[9%] z-10 h-[72%] w-[37%] rotate-[2deg] overflow-hidden shadow-2xl transition-transform duration-1000 group-hover:-translate-y-3 group-hover:rotate-0">
              <Image
                src="/images/library/covers/colores-artisticos-densos.png"
                alt="Colores Artísticos Densos"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 36vw, 250px"
              />
            </div>
            <div className="absolute right-[6%] top-[22%] h-[61%] w-[34%] rotate-[5deg] overflow-hidden shadow-2xl transition-transform duration-1000 group-hover:-translate-y-2 group-hover:rotate-[3deg]">
              <Image
                src="/images/library/covers/painting-pin-up-figures.jpeg"
                alt="Painting Pin-Up Figures"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 32vw, 230px"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-background/15" />
          </Link>
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
