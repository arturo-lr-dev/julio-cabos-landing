"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoogleAnalytics } from "@next/third-parties/google";
import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { OPEN_COOKIE_SETTINGS_EVENT } from "./CookieSettingsButton";

const CONSENT_STORAGE_KEY = "julio_cabos_cookie_consent_v1";
const CONSENT_VERSION = 1;

type CookieConsentValue = {
  necessary: true;
  analytics: boolean;
  timestamp: string;
  version: 1;
};

type ConsentState = CookieConsentValue | null | undefined;

const cookieCopy = {
  es: {
    aria: "Consentimiento de cookies",
    eyebrow: "Privacidad y estadísticas",
    title: "Tú decides sobre las cookies analíticas",
    intro:
      "Las cookies necesarias están siempre activas. Google Analytics solo se cargará si aceptas las analíticas. Puedes cambiar tu elección cuando quieras.",
    policy: "Política de cookies",
    accept: "Aceptar analíticas",
    reject: "Rechazar",
    configure: "Configurar",
    preferences: "Preferencias",
    settingsTitle: "Configurar cookies",
    close: "Cerrar configuración de cookies",
    settingsDescription:
      "Elige si permites la medición estadística anónima del uso de la web. Las cookies necesarias no pueden desactivarse.",
    necessary: "Cookies necesarias",
    necessaryDescription: "Permiten el funcionamiento técnico y seguro de la web.",
    alwaysActive: "Siempre activas",
    analytics: "Cookies analíticas",
    analyticsDescription: "Google Analytics 4 para estadísticas de uso.",
    viewPolicy: "Consultar la política de cookies",
    save: "Guardar preferencias",
    policyHref: "/politica-de-cookies",
  },
  it: {
    aria: "Consenso ai cookie",
    eyebrow: "Privacy e statistiche",
    title: "Sei tu a decidere sui cookie analitici",
    intro:
      "I cookie necessari sono sempre attivi. Google Analytics verrà caricato solo se accetti i cookie analitici. Puoi modificare la tua scelta in qualsiasi momento.",
    policy: "Informativa sui cookie",
    accept: "Accetta gli analitici",
    reject: "Rifiuta",
    configure: "Configura",
    preferences: "Preferenze",
    settingsTitle: "Configura i cookie",
    close: "Chiudi la configurazione dei cookie",
    settingsDescription:
      "Scegli se consentire la misurazione statistica anonima dell'uso del sito. I cookie necessari non possono essere disattivati.",
    necessary: "Cookie necessari",
    necessaryDescription: "Consentono il funzionamento tecnico e sicuro del sito.",
    alwaysActive: "Sempre attivi",
    analytics: "Cookie analitici",
    analyticsDescription: "Google Analytics 4 per le statistiche di utilizzo.",
    viewPolicy: "Consulta l'informativa sui cookie",
    save: "Salva le preferenze",
    policyHref: "/it/politica-de-cookies",
  },
};

function isCookieConsentValue(value: unknown): value is CookieConsentValue {
  if (!value || typeof value !== "object") return false;

  const consent = value as Partial<CookieConsentValue>;

  return (
    consent.necessary === true &&
    typeof consent.analytics === "boolean" &&
    typeof consent.timestamp === "string" &&
    consent.version === CONSENT_VERSION
  );
}

function setGoogleAnalyticsDisabled(gaId: string | undefined, disabled: boolean) {
  if (!gaId) return;

  (window as unknown as Record<string, unknown>)[`ga-disable-${gaId}`] =
    disabled;
}

function removeGoogleAnalyticsCookies() {
  const cookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter(
      (name): name is string =>
        Boolean(name) && (name === "_ga" || name.startsWith("_ga_"))
    );

  const hostnameParts = window.location.hostname.split(".");
  const domains = new Set<string | undefined>([undefined]);

  if (window.location.hostname !== "localhost") {
    domains.add(window.location.hostname);

    if (hostnameParts.length >= 2) {
      domains.add(`.${hostnameParts.slice(-2).join(".")}`);
    }
  }

  for (const name of cookieNames) {
    for (const domain of domains) {
      const domainAttribute = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; Max-Age=0; path=/${domainAttribute}; SameSite=Lax`;
    }
  }
}

function persistConsent(analytics: boolean): CookieConsentValue {
  const consent: CookieConsentValue = {
    necessary: true,
    analytics,
    timestamp: new Date().toISOString(),
    version: CONSENT_VERSION,
  };

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));

  return consent;
}

export default function CookieConsent({
  gaId,
  isProduction,
}: {
  gaId?: string;
  isProduction: boolean;
}) {
  const [consent, setConsent] = useState<ConsentState>(undefined);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const copy = pathname.startsWith("/it") ? cookieCopy.it : cookieCopy.es;

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;

      try {
        const storedValue = localStorage.getItem(CONSENT_STORAGE_KEY);
        const parsedValue = storedValue ? JSON.parse(storedValue) : null;
        const storedConsent = isCookieConsentValue(parsedValue)
          ? parsedValue
          : null;

        setConsent(storedConsent);
        setAnalyticsEnabled(storedConsent?.analytics ?? false);
        setGoogleAnalyticsDisabled(gaId, storedConsent?.analytics !== true);

        if (storedValue && !storedConsent) {
          localStorage.removeItem(CONSENT_STORAGE_KEY);
        }
      } catch {
        setConsent(null);
        setGoogleAnalyticsDisabled(gaId, true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [gaId]);

  useEffect(() => {
    const openSettings = () => {
      previouslyFocusedRef.current = document.activeElement as HTMLElement;
      setAnalyticsEnabled(consent?.analytics ?? false);
      setSettingsOpen(true);
    };

    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);

    return () =>
      window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, [consent]);

  useEffect(() => {
    if (!settingsOpen || isAdminRoute) return;

    const dialog = dialogRef.current;
    const focusableElements = dialog?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    focusableElements?.[0]?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocusedRef.current?.focus();
    };
  }, [isAdminRoute, settingsOpen]);

  const saveConsent = (analytics: boolean) => {
    const nextConsent = persistConsent(analytics);

    setGoogleAnalyticsDisabled(gaId, !analytics);

    if (!analytics) {
      removeGoogleAnalyticsCookies();
    }

    setConsent(nextConsent);
    setAnalyticsEnabled(analytics);
    setSettingsOpen(false);
  };

  const handleDialogKeyDown = (
    event: ReactKeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();
      setSettingsOpen(false);
      return;
    }

    if (event.key !== "Tab") return;

    const focusableElements = Array.from(
      dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) ?? []
    );

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <>
      {!isAdminRoute && consent === null && !settingsOpen ? (
        <section
          aria-label={copy.aria}
          className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-5xl border border-rule-strong bg-background-elevated/98 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:inset-x-6 sm:p-6"
        >
          <div className="grid items-end gap-5 lg:grid-cols-[1fr_auto] lg:gap-10">
            <div>
              <p className="eyebrow text-accent">{copy.eyebrow}</p>
              <h2 className="mt-2 font-display text-2xl text-foreground sm:text-3xl">
                {copy.title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm font-light leading-relaxed text-foreground-muted sm:text-base">
                {copy.intro}{" "}
                <Link
                  href={copy.policyHref}
                  className="text-foreground underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {copy.policy}
                </Link>
                .
              </p>
            </div>

            <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[31rem]">
              <button
                type="button"
                onClick={() => saveConsent(true)}
                className="min-h-12 border border-accent bg-accent px-5 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                {copy.accept}
              </button>
              <button
                type="button"
                onClick={() => saveConsent(false)}
                className="min-h-12 border border-accent px-5 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {copy.reject}
              </button>
              <button
                type="button"
                onClick={() => {
                  previouslyFocusedRef.current =
                    document.activeElement as HTMLElement;
                  setAnalyticsEnabled(false);
                  setSettingsOpen(true);
                }}
                className="min-h-12 border border-rule-strong px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-foreground-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {copy.configure}
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {!isAdminRoute && settingsOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSettingsOpen(false);
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            aria-describedby="cookie-settings-description"
            onKeyDown={handleDialogKeyDown}
            className="max-h-[calc(100dvh-2rem)] w-full max-w-xl overflow-y-auto border border-rule-strong bg-background-elevated p-6 shadow-2xl shadow-black/60 sm:p-8"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="eyebrow text-accent">{copy.preferences}</p>
                <h2
                  id="cookie-settings-title"
                  className="mt-2 font-display text-3xl text-foreground"
                >
                  {copy.settingsTitle}
                </h2>
              </div>
              <button
                type="button"
                aria-label={copy.close}
                onClick={() => setSettingsOpen(false)}
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-rule-strong text-xl text-foreground-muted transition-colors hover:border-foreground-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>

            <p
              id="cookie-settings-description"
              className="mt-4 text-sm font-light leading-relaxed text-foreground-muted"
            >
              {copy.settingsDescription}
            </p>

            <div className="mt-7 divide-y divide-rule border-y border-rule">
              <div className="flex items-center justify-between gap-5 py-5">
                <div>
                  <h3 className="text-base text-foreground">
                    {copy.necessary}
                  </h3>
                  <p className="mt-1 text-sm text-foreground-muted">
                    {copy.necessaryDescription}
                  </p>
                </div>
                <span className="eyebrow shrink-0 text-foreground-muted">
                  {copy.alwaysActive}
                </span>
              </div>

              <div className="flex items-center justify-between gap-5 py-5">
                <label htmlFor="analytics-consent">
                  <span className="block text-base text-foreground">
                    {copy.analytics}
                  </span>
                  <span className="mt-1 block text-sm text-foreground-muted">
                    {copy.analyticsDescription}
                  </span>
                </label>
                <input
                  id="analytics-consent"
                  type="checkbox"
                  checked={analyticsEnabled}
                  onChange={(event) =>
                    setAnalyticsEnabled(event.target.checked)
                  }
                  className="h-6 w-6 shrink-0 cursor-pointer accent-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                />
              </div>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href={copy.policyHref}
                onClick={() => setSettingsOpen(false)}
                className="text-sm text-foreground-muted underline decoration-rule-strong underline-offset-4 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {copy.viewPolicy}
              </Link>
              <button
                type="button"
                onClick={() => saveConsent(analyticsEnabled)}
                className="min-h-12 border border-accent bg-accent px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                {copy.save}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {!isAdminRoute &&
      isProduction &&
      gaId &&
      consent?.analytics === true ? (
        <GoogleAnalytics gaId={gaId} />
      ) : null}
    </>
  );
}
