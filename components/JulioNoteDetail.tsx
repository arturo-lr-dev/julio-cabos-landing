import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Locale } from "@/lib/site-content";

const noteImages = [
  "/images/notas-julio/veladuras/01-carta-color-barba-ojos.jpeg",
  "/images/notas-julio/veladuras/02-busto-proceso-01.jpeg",
  "/images/notas-julio/veladuras/03-busto-proceso-02.jpeg",
  "/images/notas-julio/veladuras/04-busto-proceso-03.jpeg",
  "/images/notas-julio/veladuras/05-carta-color-piel-sombras.jpeg",
  "/images/notas-julio/veladuras/06-busto-proceso-04.jpeg",
] as const;

const noteCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    introduction: string;
    workshopLabel: string;
    paragraphs: string[];
    learnEyebrow: string;
    learnTitle: string;
    learnText: string;
    coursesCta: string;
    contactQuestion: string;
    contactCta: string;
    back: string;
    imageAlts: string[];
    libraryPath: string;
    formationPath: string;
    contactPath: string;
  }
> = {
  es: {
    eyebrow: "Biblioteca · Notas de Julio · Técnica",
    title: "El color se construye por capas",
    introduction:
      "Veladuras, variedad cromática y control del pincel para conseguir transiciones suaves sin perder definición ni contraste.",
    workshopLabel: "Notas de taller",
    paragraphs: [
      "Este es un resumen del trabajo realizado durante un curso de pintura para un grupo muy reducido.",
      "En las cartas de color se utilizaron pinturas acrílicas de tubo de Scale75, aunque actualmente este mismo planteamiento puede realizarse con otras gamas, como los acrílicos artísticos densos de AK Interactive.",
      "Una de las claves principales de la pintura acrílica son las veladuras. Al superponer colores sobre los que les preceden se genera una mayor variedad cromática y un resultado más natural.",
      "Combinando este proceso con un uso controlado del pincel se consiguen transiciones muy suaves, pero a la vez bien definidas y con el contraste necesario para resaltar la escultura.",
    ],
    learnEyebrow: "Seguir aprendiendo",
    learnTitle: "Aprender el proceso",
    learnText:
      "Este tipo de ejercicios forma parte del trabajo que Julio desarrolla en sus cursos de pintura para grupos reducidos.",
    coursesCta: "Ver próximos cursos",
    contactQuestion: "¿Buscas trabajar una técnica o proyecto concreto?",
    contactCta: "Consultar formación con Julio",
    back: "Volver a Biblioteca",
    imageAlts: [
      "Carta de color manuscrita para barba y ojos",
      "Busto en proceso de pintura, primera fase",
      "Busto en proceso de pintura, segunda fase",
      "Busto en proceso de pintura, tercera fase",
      "Carta de color manuscrita para piel y sombras",
      "Busto en proceso de pintura, cuarta fase",
    ],
    libraryPath: "/biblioteca",
    formationPath: "/#formacion",
    contactPath: "/?consulta=curso#consulta-cursos",
  },
  en: {
    eyebrow: "Library · Julio's Notes · Technique",
    title: "Color Is Built in Layers",
    introduction:
      "Glazing, chromatic variation and brush control to achieve smooth transitions without losing definition or contrast.",
    workshopLabel: "Workshop notes",
    paragraphs: [
      "This is a summary of the work carried out during a painting course for a very small group.",
      "The color charts were created using Scale75 tube acrylics, although the same approach can now be applied with other ranges, such as AK Interactive's Dense Artistic Acrylics.",
      "One of the key techniques in acrylic painting is glazing. By layering colors over those applied previously, a greater chromatic variety is created, resulting in a more natural finish.",
      "Combined with controlled brushwork, this process makes it possible to achieve very smooth transitions while retaining clear definition and the contrast needed to bring out the sculpture.",
    ],
    learnEyebrow: "Keep learning",
    learnTitle: "Learn the process",
    learnText:
      "Exercises like this are part of the work Julio develops in his painting courses for small groups.",
    coursesCta: "View upcoming courses",
    contactQuestion: "Looking to work on a specific technique or project?",
    contactCta: "Ask Julio about training",
    back: "Back to Library",
    imageAlts: [
      "Handwritten color chart for beard and eyes",
      "Bust in progress, first stage",
      "Bust in progress, second stage",
      "Bust in progress, third stage",
      "Handwritten color chart for skin and shadows",
      "Bust in progress, fourth stage",
    ],
    libraryPath: "/en/biblioteca",
    formationPath: "/en#formacion",
    contactPath: "/en?consulta=curso#consulta-cursos",
  },
  it: {
    eyebrow: "Biblioteca · Note di Julio · Tecnica",
    title: "Il colore si costruisce a strati",
    introduction:
      "Velature, varietà cromatica e controllo del pennello per ottenere transizioni morbide senza perdere definizione e contrasto.",
    workshopLabel: "Note di laboratorio",
    paragraphs: [
      "Questo è un riassunto del lavoro svolto durante un corso di pittura per un gruppo molto ristretto.",
      "Per le carte colore sono stati utilizzati colori acrilici in tubo Scale75, anche se oggi lo stesso approccio può essere applicato con altre gamme, come gli acrilici artistici densi di AK Interactive.",
      "Una delle tecniche fondamentali della pittura acrilica è la velatura. Sovrapponendo i colori a quelli applicati in precedenza si crea una maggiore varietà cromatica, ottenendo un risultato più naturale.",
      "Combinando questo processo con un uso controllato del pennello è possibile ottenere transizioni molto morbide, mantenendo allo stesso tempo una buona definizione e il contrasto necessario per valorizzare la scultura.",
    ],
    learnEyebrow: "Continuare a imparare",
    learnTitle: "Imparare il processo",
    learnText:
      "Questo tipo di esercizi fa parte del lavoro che Julio sviluppa nei suoi corsi di pittura per piccoli gruppi.",
    coursesCta: "Vedi i prossimi corsi",
    contactQuestion: "Vuoi lavorare su una tecnica o un progetto specifico?",
    contactCta: "Chiedi a Julio informazioni sulla formazione",
    back: "Torna alla Biblioteca",
    imageAlts: [
      "Carta colore manoscritta per barba e occhi",
      "Busto in fase di pittura, prima fase",
      "Busto in fase di pittura, seconda fase",
      "Busto in fase di pittura, terza fase",
      "Carta colore manoscritta per pelle e ombre",
      "Busto in fase di pittura, quarta fase",
    ],
    libraryPath: "/it/biblioteca",
    formationPath: "/it#formacion",
    contactPath: "/it?consulta=curso#consulta-cursos",
  },
};

function NoteImage({ src, alt, sizes }: { src: string; alt: string; sizes: string }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-surface">
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

export default function JulioNoteDetail({ locale = "es" }: { locale?: Locale }) {
  const copy = noteCopy[locale];

  return (
    <>
      <Header locale={locale} />

      <main className="pt-16 md:pt-20">
        <section className="px-6 pb-20 pt-16 md:px-12 md:pb-28 md:pt-24">
          <div className="mx-auto max-w-6xl">
            <Link
              href={copy.libraryPath}
              className="eyebrow text-foreground-muted transition-colors hover:text-accent"
            >
              <span aria-hidden>←</span> {copy.back}
            </Link>

            <div className="mt-16 grid grid-cols-12 items-end gap-x-0 gap-y-12 lg:mt-24 lg:gap-14">
              <div className="col-span-12 lg:col-span-5">
                <p className="eyebrow text-accent">{copy.eyebrow}</p>
                <h1 className="mt-7 max-w-xl font-display text-5xl leading-[0.95] tracking-tight text-foreground md:text-7xl">
                  {copy.title}
                </h1>
                <p className="mt-8 max-w-lg text-lg font-light leading-relaxed text-foreground-muted md:text-xl">
                  {copy.introduction}
                </p>
              </div>

              <div className="col-span-12 grid grid-cols-2 gap-3 lg:col-span-7 lg:gap-5">
                <NoteImage src={noteImages[0]} alt={copy.imageAlts[0]} sizes="(max-width: 1024px) 50vw, 300px" />
                <NoteImage src={noteImages[1]} alt={copy.imageAlts[1]} sizes="(max-width: 1024px) 50vw, 300px" />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto grid max-w-6xl grid-cols-12 gap-x-0 gap-y-12 lg:gap-16">
            <div className="col-span-12 lg:col-span-4">
              <p className="eyebrow text-foreground-muted">{copy.workshopLabel}</p>
              <div className="mt-7 max-w-md space-y-6 leading-relaxed text-foreground-muted">
                {copy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="col-span-12 grid grid-cols-2 gap-3 sm:gap-5 lg:col-span-8">
              {noteImages.slice(2).map((src, index) => (
                <NoteImage
                  key={src}
                  src={src}
                  alt={copy.imageAlts[index + 2]}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 360px"
                />
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 pt-8 md:px-12 md:pb-32 md:pt-12">
          <div className="mx-auto max-w-6xl border-t border-rule pt-12 md:pt-16">
            <div className="grid grid-cols-12 gap-x-0 gap-y-12 lg:gap-16">
              <div className="col-span-12 lg:col-span-5">
                <p className="eyebrow text-accent">{copy.learnEyebrow}</p>
                <h2 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-5xl">
                  {copy.learnTitle}
                </h2>
                <p className="mt-6 max-w-md leading-relaxed text-foreground-muted">{copy.learnText}</p>
                <Link
                  href={copy.formationPath}
                  className="group mt-8 inline-flex items-center gap-4 eyebrow text-foreground transition-colors hover:text-accent"
                >
                  <span>{copy.coursesCta}</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>

              <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-10">
                <p className="leading-relaxed text-foreground-muted">{copy.contactQuestion}</p>
                <Link
                  href={copy.contactPath}
                  className="group mt-5 inline-flex items-center gap-4 eyebrow text-foreground transition-colors hover:text-accent"
                >
                  <span>{copy.contactCta}</span>
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>

            <Link
              href={copy.libraryPath}
              className="mt-20 inline-flex items-center gap-3 eyebrow text-foreground-muted transition-colors hover:text-accent md:mt-28"
            >
              <span aria-hidden>←</span> {copy.back}
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </>
  );
}
