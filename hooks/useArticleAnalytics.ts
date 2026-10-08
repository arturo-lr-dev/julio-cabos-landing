"use client";

import { useEffect, useRef } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";
import type { Locale } from "@/lib/site-content";

type UseArticleAnalyticsOptions = {
  articleId: string;
  locale: Locale;
};

function getSourcePage() {
  const referrer = document.referrer;
  if (!referrer) return undefined;

  try {
    const referrerUrl = new URL(referrer);
    if (referrerUrl.origin !== window.location.origin) return undefined;

    if (referrerUrl.pathname === "/" || /^\/(en|it)$/.test(referrerUrl.pathname)) {
      return "home";
    }

    if (referrerUrl.pathname.includes("/biblioteca")) {
      return "library";
    }
  } catch {
    return undefined;
  }

  return undefined;
}

export default function useArticleAnalytics({
  articleId,
  locale,
}: UseArticleAnalyticsOptions) {
  const articleReadMarkerRef = useRef<HTMLDivElement>(null);
  const trackedViewKeyRef = useRef<string | null>(null);
  const trackedReadKeyRef = useRef<string | null>(null);
  const articleKey = `${articleId}:${locale}`;

  useEffect(() => {
    if (trackedViewKeyRef.current === articleKey) return;

    trackedViewKeyRef.current = articleKey;
    trackAnalyticsEvent("article_view", {
      article_id: articleId,
      language: locale,
      source_page: getSourcePage(),
    });
  }, [articleId, articleKey, locale]);

  useEffect(() => {
    const marker = articleReadMarkerRef.current;
    if (!marker) return;

    const markUserScrolled = () => {
      hasUserScrolledRef.current = true;
    };
    const hasUserScrolledRef = { current: false };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          !entry.isIntersecting ||
          !hasUserScrolledRef.current ||
          trackedReadKeyRef.current === articleKey
        ) {
          return;
        }

        trackedReadKeyRef.current = articleKey;
        trackAnalyticsEvent("article_read", {
          article_id: articleId,
          language: locale,
          read_threshold: 75,
        });
        observer.disconnect();
      },
      { threshold: 0.01 }
    );

    window.addEventListener("scroll", markUserScrolled, { passive: true });
    observer.observe(marker);

    return () => {
      window.removeEventListener("scroll", markUserScrolled);
      observer.disconnect();
    };
  }, [articleId, articleKey, locale]);

  function trackArticleCta(ctaDestination: string) {
    trackAnalyticsEvent("article_cta_click", {
      article_id: articleId,
      cta_destination: ctaDestination,
      source_section: "article",
      language: locale,
    });
  }

  return { articleReadMarkerRef, trackArticleCta };
}
