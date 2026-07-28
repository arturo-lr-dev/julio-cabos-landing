"use client";

export const OPEN_COOKIE_SETTINGS_EVENT = "julio:open-cookie-settings";

import type { Locale } from "@/lib/site-content";

export default function CookieSettingsButton({
  locale = "es",
}: {
  locale?: Locale;
}) {
  return (
    <button
      type="button"
      className="nav-link cursor-pointer text-left hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))}
    >
      {locale === "it" ? "Configura i cookie" : "Configurar cookies"}
    </button>
  );
}
