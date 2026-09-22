"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  compareTrajectoryEntries,
  getTrajectoryEntries,
  trajectoryCategoryLabels,
  trajectoryPeriods,
} from "@/lib/trajectory-content";
import type { Locale } from "@/lib/site-content";
import type { TrajectoryCategory, TrajectoryEntry } from "@/lib/trajectory-types";

const categories: Array<TrajectoryCategory | "all"> = [
  "all",
  "career",
  "work",
  "publications",
  "training",
  "awards",
  "events",
  "collaborations",
  "press",
  "legacy",
];

const libraryIds = new Set([
  "colores-artisticos-densos-guia-practica",
  "minipedia",
  "como-pintar-figuras-con-acrilicos",
  "painting-pin-up-figures",
  "tank-fight-1916",
  "pintando-caballos",
  "birreme",
  "pintando-bustos-fantasia",
  "painting-figures-with-acrylics",
]);

const copy = {
  es: {
    back: "Sobre Julio",
    eyebrow: "Archivo profesional · Trayectoria",
    title: "Una vida de oficio, obra y transmisión",
    intro: "El archivo documental detrás de una forma de pintar: publicaciones, cursos, colaboraciones, premios y encuentros que han dado forma al trabajo de Julio Cabos.",
    note: "En Todo, los grandes hitos cuentan la carrera. Los filtros abren el archivo documental completo.",
    source: "Fuente",
    library: "Biblioteca",
    featured: "Hito principal",
    reference: "Referencias documentales",
    period: trajectoryPeriods,
  },
  en: {
    back: "About Julio",
    eyebrow: "Professional archive · Career",
    title: "A life of craft, work and transmission",
    intro: "The documentary record behind a way of painting: publications, courses, collaborations, awards and encounters that have shaped Julio Cabos's work.",
    note: "In All, the major milestones tell the career story. The filters open the full documentary archive.",
    source: "Source",
    library: "Library",
    featured: "Major milestone",
    reference: "Documentary references",
    period: trajectoryPeriods,
  },
  it: {
    back: "Su Julio",
    eyebrow: "Archivio professionale · Percorso",
    title: "Una vita di mestiere, opere e trasmissione",
    intro: "L'archivio documentale dietro un modo di dipingere: pubblicazioni, corsi, collaborazioni, premi e incontri che hanno dato forma al lavoro di Julio Cabos.",
    note: "In Tutto, i grandi passaggi raccontano il percorso. I filtri aprono l'archivio documentale completo.",
    source: "Fonte",
    library: "Biblioteca",
    featured: "Passaggio principale",
    reference: "Riferimenti documentali",
    period: trajectoryPeriods,
  },
} as const;

const levelRank = (entry: TrajectoryEntry) => {
  if (entry.displayLevel === "featured" || entry.featured) return 0;
  if (entry.displayLevel === "standard") return 1;
  return 2;
};

function ReferenceGroup({ group, locale, sourceLabel, categoryLabels }: { group: TrajectoryEntry[]; locale: Locale; sourceLabel: string; categoryLabels: Record<TrajectoryCategory | "all", string> }) {
  return (
    <div className="border-t border-rule pt-6">
      <p className="eyebrow text-foreground-faint">{sourceLabel}</p>
      <div className="mt-3">
        {group.length > 1 && (
          <p className="mb-2 text-xs uppercase tracking-[.16em] text-accent/80">
            {group[0].year} · {categoryLabels[group[0].category]}
          </p>
        )}
        <div className="space-y-3">
          {group.map((entry) => (
            <article key={entry.id} className="grid gap-1 md:grid-cols-[110px_1fr_auto] md:items-baseline md:gap-4">
              <span className="eyebrow text-foreground-faint">{entry.displayDate?.[locale] ?? entry.year}</span>
              <div>
                <h3 className="font-display text-xl leading-tight text-foreground">{entry.title[locale]}</h3>
                <p className="mt-1 text-sm leading-relaxed text-foreground-muted">{entry.summary?.[locale] ?? entry.description?.[locale] ?? ""}</p>
              </div>
              {(entry.sourceName || entry.sourceUrl) && <span className="text-xs text-foreground-faint">{entry.sourceName ?? "Fuente"} {entry.sourceUrl && <a href={entry.sourceUrl} target="_blank" rel="noreferrer" aria-label={`${entry.sourceName ?? "Fuente"} ↗`} className="text-accent transition-colors hover:text-foreground">↗</a>}</span>}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TrajectoryPageClient({ locale }: { locale: Locale }) {
  const [category, setCategory] = useState<TrajectoryCategory | "all">("all");
  const timelineRef = useRef<HTMLDivElement>(null);
  const filterInteraction = useRef(false);
  const entries = useMemo(() => getTrajectoryEntries(category), [category]);
  const t = copy[locale];
  const labels = trajectoryCategoryLabels[locale];

  const scrollToFilteredTimeline = () => {
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      window.requestAnimationFrame(() => timelineRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  };

  useEffect(() => {
    if (filterInteraction.current) scrollToFilteredTimeline();
  }, [category]);

  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-28 md:px-12 md:pt-36">
      <div className="mx-auto max-w-6xl">
        <Link href={locale === "es" ? "/#sobre-mi" : locale === "en" ? "/en#sobre-mi" : "/it#sobre-mi"} className="eyebrow text-foreground-muted transition-colors hover:text-accent">
          ← {t.back}
        </Link>

        <header className="mt-12 max-w-4xl border-b border-rule pb-14 md:mt-20 md:pb-20">
          <p className="eyebrow text-accent">{t.eyebrow}</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[.98] tracking-tight text-foreground md:text-7xl">{t.title}</h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground-muted md:text-xl">{t.intro}</p>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-foreground-faint">{t.note}</p>
        </header>

        <div className="sticky top-16 z-20 -mx-6 mt-8 overflow-x-auto border-b border-rule bg-background/95 px-6 py-4 backdrop-blur md:top-20 md:-mx-12 md:px-12">
          <div className="mx-auto flex max-w-6xl gap-2 whitespace-nowrap">
            {categories.map((item) => (
              <button key={item} type="button" onClick={() => { filterInteraction.current = true; setCategory(item); if (category === item) scrollToFilteredTimeline(); }} aria-pressed={category === item} className={`border px-3 py-2 text-xs transition-colors ${category === item ? "border-accent bg-accent text-background" : "border-rule-strong text-foreground-muted hover:border-accent hover:text-accent"}`}>
                {labels[item]}
              </button>
            ))}
          </div>
        </div>

        <div ref={timelineRef} className="mt-16 scroll-mt-24 md:mt-24">
          {(Object.keys(trajectoryPeriods) as Array<keyof typeof trajectoryPeriods>).map((period) => {
            const periodEntries = entries.filter((entry) => entry.period === period).sort(compareTrajectoryEntries);
            if (!periodEntries.length) return null;
            const referenceGroups = new Map<string, TrajectoryEntry[]>();
            const blocks: Array<{ type: "entry"; entry: TrajectoryEntry } | { type: "reference"; key: string; entries: TrajectoryEntry[] }> = [];
            const addedReferenceGroups = new Set<string>();
            for (const entry of periodEntries) {
              if (levelRank(entry) < 2) {
                blocks.push({ type: "entry", entry });
                continue;
              }
              const groupKey = entry.groupKey ?? `${entry.year}-${entry.category}`;
              referenceGroups.set(groupKey, [...(referenceGroups.get(groupKey) ?? []), entry]);
              if (!addedReferenceGroups.has(groupKey)) {
                blocks.push({ type: "reference", key: groupKey, entries: referenceGroups.get(groupKey) ?? [] });
                addedReferenceGroups.add(groupKey);
              } else {
                const block = blocks.find((candidate) => candidate.type === "reference" && candidate.key === groupKey);
                if (block?.type === "reference") block.entries = referenceGroups.get(groupKey) ?? block.entries;
              }
            }

            return (
              <section key={period} className="grid grid-cols-1 gap-8 border-t border-rule py-10 md:grid-cols-[220px_1fr] md:gap-16 md:py-14">
                <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">{t.period[period][locale]}</h2>
                <div className="relative border-l border-rule pl-6 md:pl-10">
                  <div className="space-y-12">
                    {blocks.map((block) => {
                      if (block.type === "reference") {
                        return <ReferenceGroup key={`reference-${block.entries[0].id}`} group={block.entries} locale={locale} sourceLabel={t.reference} categoryLabels={labels} />;
                      }
                      const entry = block.entry;
                      const isFeatured = levelRank(entry) === 0;
                      const summary = entry.summary?.[locale] ?? entry.description?.[locale] ?? "";
                      const sourceName = entry.sourceName ?? entry.source?.[locale];
                      return (
                        <article key={entry.id} className={`relative max-w-3xl ${isFeatured ? "border-l-2 border-accent/70 pl-5 md:pl-7" : "opacity-90"}`}>
                          <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full border border-accent bg-background md:-left-[47px]" />
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className="eyebrow text-accent">{entry.displayDate?.[locale] ?? entry.year}</span>
                            <span className="text-xs uppercase tracking-[.16em] text-foreground-faint">{labels[entry.category]}</span>
                            {isFeatured && <span className="text-xs uppercase tracking-[.16em] text-accent/80">{t.featured}</span>}
                          </div>
                          <h3 className={`mt-3 font-display leading-tight text-foreground ${isFeatured ? "text-3xl md:text-4xl" : "text-2xl"}`}>{entry.title[locale]}</h3>
                          <p className={`mt-3 max-w-2xl leading-relaxed text-foreground-muted ${isFeatured ? "text-lg" : "text-base"}`}>{summary}</p>
                          {sourceName && <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-foreground-faint"><span>{sourceName}</span>{entry.sourceUrl && <a href={entry.sourceUrl} target="_blank" rel="noreferrer" className="text-accent transition-colors hover:text-foreground">fuente ↗</a>}{entry.relatedPublication && libraryIds.has(entry.relatedPublication) && <Link href={`${locale === "es" ? "" : `/${locale}`}/biblioteca`} className="text-accent transition-colors hover:text-foreground">{t.library} ↗</Link>}</div>}
                        </article>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
