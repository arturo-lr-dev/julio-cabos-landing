"use client";

import Image from "next/image";
import type { Locale } from "@/lib/site-content";
import { getMiniatureCoachUrl, miniatureCoachCopy } from "@/lib/miniature-coach";
import { trackAnalyticsEvent } from "@/lib/analytics";

export default function MiniatureCoachPromo({ locale }: { locale: Locale }) {
  const copy = miniatureCoachCopy[locale];

  return (
    <div className="mt-6 border border-rule bg-background-elevated p-4 md:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="flex min-w-0 items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden md:h-20 md:w-20">
            <Image
              src="/images/miniature-coach.jpg"
              alt={copy.imageAlt}
              fill
              sizes="(max-width: 767px) 64px, 80px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0">
            <p className="eyebrow text-accent">{copy.title}</p>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground-muted">
              {copy.description}
            </p>
          </div>
        </div>

        <a
          href={getMiniatureCoachUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackAnalyticsEvent("miniature_coach_click", {
              resource_name: "miniature_coach",
              source_page: "home",
              source_section: "training",
              link_domain: "chatgpt.com",
              language: locale,
            })
          }
          aria-label={`${copy.cta}. ${copy.externalNote}`}
          className="group inline-flex min-h-10 shrink-0 items-center gap-3 border border-rule-strong px-4 py-2 eyebrow text-foreground transition-colors hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <span>{copy.cta}</span>
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            ↗
          </span>
        </a>
      </div>
    </div>
  );
}
