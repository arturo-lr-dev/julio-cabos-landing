"use client";

import { sendGAEvent } from "@next/third-parties/google";

const CONSENT_STORAGE_KEY = "julio_cabos_cookie_consent_v1";

export type AnalyticsEventName =
  | "navigation_click"
  | "cta_click"
  | "gallery_filter"
  | "artwork_view"
  | "artwork_inquiry_click"
  | "course_view"
  | "course_booking_click"
  | "form_start"
  | "form_submit"
  | "social_click"
  | "language_change";

type AnalyticsParameter = string | number | boolean;
export type AnalyticsParameters = Record<string, AnalyticsParameter | undefined>;

function hasAnalyticsConsent() {
  try {
    const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!storedConsent) return false;

    const parsedConsent = JSON.parse(storedConsent) as {
      analytics?: unknown;
      version?: unknown;
    };

    return parsedConsent.analytics === true && parsedConsent.version === 1;
  } catch {
    return false;
  }
}

export function trackAnalyticsEvent(
  eventName: AnalyticsEventName,
  parameters: AnalyticsParameters = {}
) {
  if (
    typeof window === "undefined" ||
    !hasAnalyticsConsent() ||
    !Array.isArray(window.dataLayer)
  ) {
    return;
  }

  const definedParameters = Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined)
  );

  sendGAEvent("event", eventName, definedParameters);
}
