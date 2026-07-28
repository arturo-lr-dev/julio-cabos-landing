"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  getLocalizedPublication,
  getPublicationTypeLabel,
  libraryCopy,
} from "@/lib/library-content";
import type { LibraryPublication } from "@/lib/library-types";
import type { Locale } from "@/lib/site-content";
import { trackAnalyticsEvent } from "@/lib/analytics";

function PublicationCover({
  publication,
  sizes,
}: {
  publication: LibraryPublication;
  sizes: string;
}) {
  return (
    <Image
      src={publication.coverImage}
      alt={`${publication.title} — ${publication.publisher}`}
      fill
      className="object-contain"
      sizes={sizes}
    />
  );
}

export default function LibraryPageClient({
  publications,
  locale = "es",
}: {
  publications: LibraryPublication[];
  locale?: Locale;
}) {
  const copy = libraryCopy[locale] as (typeof libraryCopy)["es"];
  const [selected, setSelected] = useState<LibraryPublication | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const grouped = useMemo(
    () => ({
      table: publications.find((item) => item.displaySection === "on-the-table"),
      notebooks: publications.filter(
        (item) => item.displaySection === "workshop-notebooks"
      ),
      shelf: publications.filter((item) => item.displaySection === "main-shelf"),
      archive: publications.filter(
        (item) => item.displaySection === "editorial-archive"
      ),
    }),
    [publications]
  );

  const madreBuho = grouped.notebooks.find((item) => item.id === "madre-buho");
  const minipedia = grouped.notebooks.find((item) => item.id === "minipedia");

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  const openPublication = (publication: LibraryPublication) => {
    setSelected(publication);
    trackAnalyticsEvent("vista_publicacion", {
      id_publicacion: publication.id,
      seccion_biblioteca: publication.displaySection,
      idioma: locale,
    });
  };

  const requestHref = `${locale === "en" ? "/en" : "/"}?consulta=madre-buho#contacto`;
  const tableExternalUrl = grouped.table?.externalUrls?.[locale];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-rule bg-background/88 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:h-20 md:px-12">
          <Link
            href={locale === "en" ? "/en" : "/"}
            className="font-display text-xl text-foreground md:text-2xl"
          >
            Julio <span className="font-display-italic text-accent">Cabos</span>
          </Link>
          <div className="flex items-center gap-5">
            <Link
              href={locale === "en" ? "/en#biblioteca" : "/#biblioteca"}
              className="text-sm text-foreground-muted transition-colors hover:text-accent"
            >
              <span aria-hidden>←</span>{" "}
              <span className="hidden sm:inline">{copy.back}</span>
            </Link>
            <Link
              href={copy.languageHref}
              className="inline-flex min-h-9 items-center border border-rule-strong px-3 eyebrow text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            >
              {copy.languageLabel}
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="relative min-h-[92svh] overflow-hidden px-6 pb-20 pt-28 md:px-12 md:pt-36">
          <div className="mx-auto grid min-h-[70svh] max-w-6xl grid-cols-12 items-center gap-x-0 gap-y-10 lg:gap-16">
            <div className="col-span-12 lg:col-span-5">
              <p className="eyebrow text-accent">{copy.eyebrow}</p>
              <h1 className="mt-7 font-display text-[clamp(3.75rem,5.8vw,5.75rem)] leading-[0.9] text-foreground">
                {copy.title}
              </h1>
              <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-foreground-muted">
                {copy.intro}
              </p>
              <p className="mt-7 border-l border-accent/50 pl-5 font-display-italic text-xl leading-relaxed text-foreground/85">
                {copy.opening}
              </p>
            </div>

            <div className="relative col-span-12 min-h-[480px] lg:col-span-7 lg:min-h-[650px]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(201,166,104,0.13),transparent_60%)]" />
              <div className="absolute bottom-[7%] left-[5%] right-[5%] h-px bg-rule-strong" />
              {[
                ["/images/library/covers/tank-fight-1916.jpeg", "Tank Fight, 1916", "left-[4%] top-[23%] h-[58%] w-[30%] -rotate-[5deg]"],
                ["/images/library/covers/painting-pin-up-figures.jpeg", "Painting Pin-Up Figures", "left-[26%] top-[13%] z-10 h-[68%] w-[32%] -rotate-[1deg]"],
                ["/images/library/covers/colores-artisticos-densos.png", "Colores Artísticos Densos", "right-[20%] top-[7%] z-20 h-[74%] w-[34%] rotate-[2deg]"],
                ["/images/library/covers/wolfe-la-batalla-del-atlantico.jpeg", "Wölfe!", "right-[1%] top-[24%] z-10 h-[57%] w-[29%] rotate-[6deg]"],
              ].map(([src, alt, className]) => (
                <div key={src} className={`absolute overflow-hidden shadow-2xl ${className}`}>
                  <Image src={src} alt={alt} fill className="object-cover" sizes="240px" />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {grouped.table ? (
          <section className="px-6 py-20 md:px-12 md:py-28">
            <div className="rule-t mx-auto max-w-6xl pt-12 md:pt-16">
              <div className="grid grid-cols-12 gap-x-0 gap-y-10 lg:gap-14">
                <div className="col-span-12 lg:col-span-4">
                  <p className="eyebrow text-foreground-muted">01 · {copy.sections.table}</p>
                  <h2 className="mt-6 font-display text-4xl leading-tight text-foreground md:text-6xl">
                    {copy.sections.table}
                  </h2>
                  <p className="mt-6 max-w-sm leading-relaxed text-foreground-muted">
                    {copy.tableText}
                  </p>
                </div>
                <article className="col-span-12 grid gap-10 lg:col-span-8 md:grid-cols-[minmax(240px,0.8fr)_1.2fr] md:items-center">
                  <button
                    type="button"
                    onClick={() => openPublication(grouped.table!)}
                    className="group relative aspect-[469/653] w-full max-w-sm justify-self-center overflow-hidden bg-foreground shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    aria-label={`${copy.open}: ${grouped.table.title}`}
                  >
                    <PublicationCover publication={grouped.table} sizes="380px" />
                    <span className="absolute inset-0 border border-background/10 transition group-hover:border-accent/50" />
                  </button>
                  <div>
                    <p className="eyebrow text-accent">{grouped.table.publisher}</p>
                    <h3 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
                      {grouped.table.title}
                    </h3>
                    <p className="mt-3 font-display-italic text-xl text-foreground-muted">
                      {getLocalizedPublication(grouped.table, locale).subtitle}
                    </p>
                    <p className="mt-7 leading-relaxed text-foreground-muted">
                      {getLocalizedPublication(grouped.table, locale).description}
                    </p>
                    {tableExternalUrl ? (
                      <a
                        href={tableExternalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackAnalyticsEvent("clic_publicacion", {
                            id_publicacion: grouped.table!.id,
                            tipo_accion: "enlace_externo",
                            idioma: locale,
                          })
                        }
                        className="mt-8 inline-flex min-h-12 items-center gap-4 border border-rule-strong px-6 eyebrow text-foreground transition hover:border-accent hover:text-accent"
                      >
                        {copy.viewAk} <span aria-hidden>↗</span>
                      </a>
                    ) : null}
                  </div>
                </article>
              </div>
            </div>
          </section>
        ) : null}

        {madreBuho ? (
          <section className="bg-background-elevated px-6 py-20 md:px-12 md:py-28">
            <div className="mx-auto max-w-6xl">
              <div className="grid grid-cols-12 gap-x-0 gap-y-10 lg:gap-14">
                <div className="col-span-12 lg:col-span-4">
                  <p className="eyebrow text-foreground-muted">02 · {copy.sections.notebooks}</p>
                  <h2 className="mt-6 font-display text-4xl leading-tight text-foreground md:text-6xl">
                    {copy.sections.notebooks}
                  </h2>
                  <p className="mt-6 max-w-sm leading-relaxed text-foreground-muted">
                    {copy.notebooksText}
                  </p>
                </div>
                <article className="col-span-12 lg:col-span-8">
                  <div className="grid gap-9 md:grid-cols-[minmax(220px,0.72fr)_1.28fr] md:items-center">
                    <button
                      type="button"
                      onClick={() => openPublication(madreBuho)}
                      className="relative aspect-[4/5.3] w-full max-w-sm justify-self-center overflow-hidden shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      aria-label={`${copy.open}: ${madreBuho.title}`}
                    >
                      <PublicationCover publication={madreBuho} sizes="360px" />
                    </button>
                    <div>
                      <p className="eyebrow text-accent">{getLocalizedPublication(madreBuho, locale).roleLabel}</p>
                      <h3 className="mt-4 font-display text-4xl text-foreground md:text-5xl">{madreBuho.title}</h3>
                      <p className="mt-4 font-display-italic text-xl text-foreground-muted">
                        {getLocalizedPublication(madreBuho, locale).subtitle}
                      </p>
                      <p className="mt-6 leading-relaxed text-foreground-muted">
                        {getLocalizedPublication(madreBuho, locale).description}
                      </p>
                      <p className="mt-6 text-sm text-foreground">{copy.pdfMeta}</p>
                      <p className="mt-2 font-display text-3xl text-accent">15 €</p>
                      <p className="mt-2 text-sm text-foreground-muted">{copy.direct}</p>
                      <Link
                        href={requestHref}
                        onClick={() =>
                          trackAnalyticsEvent("clic_publicacion", {
                            id_publicacion: madreBuho.id,
                            tipo_accion: "solicitud",
                            idioma: locale,
                          })
                        }
                        className="mt-7 inline-flex min-h-12 items-center bg-accent px-7 eyebrow text-background transition-colors hover:bg-accent-hover"
                      >
                        {copy.request}
                      </Link>
                    </div>
                  </div>

                  <div className="mt-14">
                    <p className="eyebrow text-foreground-muted">{copy.preview}</p>
                    <div className="mt-5 grid grid-cols-3 gap-3 md:gap-5">
                      {madreBuho.previewImages?.map((src, index) => (
                        <div key={src} className="relative aspect-[4/3] overflow-hidden bg-background">
                          <Image
                            src={src}
                            alt={`${madreBuho.title} — ${copy.preview} ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                            sizes="(max-width: 768px) 33vw, 250px"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </div>

              {minipedia ? (
                <button
                  type="button"
                  onClick={() => openPublication(minipedia)}
                  className="mt-16 grid w-full gap-8 border-t border-rule pt-10 text-left outline-none md:grid-cols-[1.1fr_0.9fr] md:items-center focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="relative aspect-[1735/1485] overflow-hidden bg-foreground">
                    <PublicationCover publication={minipedia} sizes="600px" />
                  </div>
                  <div>
                    <p className="eyebrow text-accent">{minipedia.publisher}</p>
                    <h3 className="mt-4 font-display text-3xl text-foreground md:text-4xl">{minipedia.title}</h3>
                    <p className="mt-4 leading-relaxed text-foreground-muted">
                      {getLocalizedPublication(minipedia, locale).description}
                    </p>
                  </div>
                </button>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className="px-6 py-20 md:px-12 md:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-12 gap-x-0 gap-y-10 lg:gap-10">
              <div className="col-span-12 lg:col-span-4">
                <p className="eyebrow text-foreground-muted">03 · {copy.sections.shelf}</p>
                <h2 className="mt-6 font-display text-4xl leading-tight text-foreground md:text-6xl">
                  {copy.sections.shelf}
                </h2>
                <p className="mt-6 max-w-sm leading-relaxed text-foreground-muted">{copy.shelfText}</p>
              </div>
              <div className="col-span-12 grid grid-cols-2 gap-4 md:gap-6 lg:col-span-8 lg:grid-cols-6">
                {grouped.shelf.map((publication, index) => (
                  <button
                    key={publication.id}
                    type="button"
                    onClick={() => openPublication(publication)}
                    className={`group min-w-0 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      index < 2 ? "lg:col-span-3" : "lg:col-span-2"
                    }`}
                  >
                    <span className="relative block aspect-[3/4.25] overflow-hidden bg-surface shadow-xl">
                      <PublicationCover publication={publication} sizes="(max-width: 768px) 50vw, 260px" />
                      <span className="absolute inset-0 bg-background/0 transition-colors group-hover:bg-background/10" />
                    </span>
                    <span className="mt-4 block text-sm leading-snug text-foreground">{publication.title}</span>
                    <span className="mt-1 block text-xs text-foreground-muted">{publication.publisher}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-24 pt-10 md:px-12 md:pb-32 md:pt-16">
          <div className="rule-t mx-auto max-w-6xl pt-12 md:pt-16">
            <div className="max-w-2xl">
              <p className="eyebrow text-foreground-muted">04 · {copy.sections.archive}</p>
              <h2 className="mt-6 font-display text-4xl text-foreground md:text-6xl">{copy.sections.archive}</h2>
              <p className="mt-6 leading-relaxed text-foreground-muted">{copy.archiveText}</p>
            </div>

            <div className="mt-14 columns-2 gap-4 md:columns-3 md:gap-6 lg:columns-4">
              {grouped.archive.map((publication) => (
                <button
                  key={publication.id}
                  type="button"
                  onClick={() => openPublication(publication)}
                  className="group mb-8 block w-full break-inside-avoid text-left outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="relative block w-full overflow-hidden bg-surface shadow-xl" style={{ aspectRatio: "0.71" }}>
                    <PublicationCover publication={publication} sizes="(max-width: 768px) 50vw, 240px" />
                  </span>
                  <span className="mt-3 block text-sm leading-snug text-foreground transition-colors group-hover:text-accent">
                    {publication.title}
                  </span>
                  <span className="mt-1 block text-xs text-foreground-muted">{publication.publisher}</span>
                </button>
              ))}
            </div>

            <p className="mt-16 max-w-3xl border-l border-rule-strong pl-6 font-display-italic text-lg leading-relaxed text-foreground-muted">
              {copy.footer}
            </p>
          </div>
        </section>
      </main>

      {selected ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="publication-dialog-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={() => setSelected(null)}
            aria-label={copy.close}
          />
          <div className="relative z-10 max-h-[92vh] w-full max-w-5xl overflow-y-auto border border-rule bg-background-elevated shadow-2xl">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center bg-background/80 text-2xl text-foreground-muted transition hover:text-accent focus-visible:outline-2 focus-visible:outline-accent"
              aria-label={copy.close}
            >
              ×
            </button>
            <div className="grid md:grid-cols-[0.85fr_1.15fr]">
              <div className="relative min-h-[430px] bg-background p-8 md:min-h-[680px]">
                <PublicationCover publication={selected} sizes="(max-width: 768px) 90vw, 430px" />
              </div>
              <div className="p-8 md:p-12">
                <p className="eyebrow text-accent">{selected.publisher}</p>
                <h2 id="publication-dialog-title" className="mt-5 font-display text-4xl leading-tight text-foreground md:text-5xl">
                  {selected.title}
                </h2>
                <p className="mt-3 font-display-italic text-xl text-foreground-muted">
                  {getLocalizedPublication(selected, locale).subtitle}
                </p>
                <p className="mt-7 leading-relaxed text-foreground-muted">
                  {getLocalizedPublication(selected, locale).description}
                </p>

                <dl className="mt-9 space-y-6 border-t border-rule pt-7">
                  <div>
                    <dt className="eyebrow text-foreground-faint">{copy.participation}</dt>
                    <dd className="mt-2 text-foreground">{getLocalizedPublication(selected, locale).roleLabel}</dd>
                    <dd className="mt-2 text-sm leading-relaxed text-foreground-muted">
                      {getLocalizedPublication(selected, locale).contribution}
                    </dd>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <dt className="eyebrow text-foreground-faint">{copy.language}</dt>
                      <dd className="mt-2 uppercase text-foreground">{selected.languages.join(" · ")}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow text-foreground-faint">{copy.type}</dt>
                      <dd className="mt-2 text-foreground">
                        {getPublicationTypeLabel(selected.type, locale)}
                        {selected.year ? ` · ${selected.year}` : ""}
                      </dd>
                    </div>
                  </div>
                  <div>
                    <dt className="eyebrow text-foreground-faint">{copy.tags}</dt>
                    <dd className="mt-3 flex flex-wrap gap-2">
                      {selected.tags.map((tag) => (
                        <span key={tag} className="border border-rule px-3 py-1 text-xs text-foreground-muted">
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                {selected.purchaseMode === "external" && selected.externalUrls?.[locale] ? (
                  <a
                    href={selected.externalUrls[locale]}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackAnalyticsEvent("clic_publicacion", {
                        id_publicacion: selected.id,
                        tipo_accion: "enlace_externo_modal",
                        idioma: locale,
                      })
                    }
                    className="mt-9 inline-flex min-h-12 items-center gap-3 border border-rule-strong px-6 eyebrow text-foreground transition hover:border-accent hover:text-accent"
                  >
                    {copy.external} <span aria-hidden>↗</span>
                  </a>
                ) : null}
                {selected.purchaseMode === "contact-julio" ? (
                  <Link
                    href={requestHref}
                    onClick={() => {
                      trackAnalyticsEvent("clic_publicacion", {
                        id_publicacion: selected.id,
                        tipo_accion: "solicitud_modal",
                        idioma: locale,
                      });
                      setSelected(null);
                    }}
                    className="mt-9 inline-flex min-h-12 items-center bg-accent px-7 eyebrow text-background transition hover:bg-accent-hover"
                  >
                    {copy.request}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
