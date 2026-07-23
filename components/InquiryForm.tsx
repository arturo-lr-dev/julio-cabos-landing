"use client";

import { useEffect, useRef, useState } from "react";
import {
  inquirySourceLabels,
  type InquirySource,
} from "@/lib/inquiry-types";
import { getSiteContent, type Locale } from "@/lib/site-content";
import { trackAnalyticsEvent } from "@/lib/analytics";

const sourceOptions = [
  "commission",
  "collaboration",
  "training",
  "course",
  "general",
] satisfies InquirySource[];

type FormSource = (typeof sourceOptions)[number];

const inputClass =
  "w-full bg-background border border-rule px-4 py-3 text-foreground placeholder-foreground-faint focus:outline-none focus:border-accent transition-colors";

const sourceByHash: Record<string, InquirySource> = {
  "#consulta-encargo": "commission",
  "#consulta-colaboracion": "collaboration",
  "#consulta-cursos": "training",
};

export default function InquiryForm({
  defaultSource = "general",
  locale = "es",
}: {
  defaultSource?: InquirySource;
  locale?: Locale;
}) {
  const { ui } = getSiteContent(locale);
  const getSourceLabel = (source: InquirySource) =>
    sourceOptions.includes(source as FormSource)
      ? ui.form.sources[source as FormSource]
      : inquirySourceLabels[source];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: defaultSource,
    message: "",
  });
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const hasTrackedStart = useRef(false);

  const trackFormStart = () => {
    if (hasTrackedStart.current) return;

    hasTrackedStart.current = true;
    trackAnalyticsEvent("inicio_formulario", {
      nombre_formulario: "consulta",
      tipo_consulta: formData.source,
      idioma: locale,
    });
  };

  useEffect(() => {
    function syncSourceFromHash() {
      const source = sourceByHash[window.location.hash];

      if (source) {
        setFormData((current) => ({ ...current, source }));
      }
    }

    syncSourceFromHash();
    window.addEventListener("hashchange", syncSourceFromHash);

    return () => window.removeEventListener("hashchange", syncSourceFromHash);
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setState("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          subject: getSourceLabel(formData.source),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || ui.form.sendError);
      }

      trackAnalyticsEvent("envio_formulario", {
        nombre_formulario: "consulta",
        tipo_consulta: formData.source,
        idioma: locale,
      });
      setState("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        source: defaultSource,
        message: "",
      });
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : ui.form.sendError
      );
    }
  }

  if (state === "success") {
    return (
      <div className="border border-rule bg-surface p-8">
        <p className="font-display text-2xl text-foreground">{ui.form.successTitle}</p>
        <p className="mt-3 text-foreground-muted">
          {ui.form.successText}
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-sm text-accent"
        >
          {ui.form.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocusCapture={trackFormStart}
      className="border border-rule bg-surface p-6"
    >
      <div className="grid gap-4">
        <div>
          <label htmlFor="inquiry-source" className="mb-2 block eyebrow text-foreground-muted">
            {ui.form.source}
          </label>
          <select
            id="inquiry-source"
            className={inputClass}
            value={formData.source}
            onChange={(event) =>
              setFormData({
                ...formData,
                source: event.target.value as InquirySource,
              })
            }
          >
            {sourceOptions.map((source) => (
              <option key={source} value={source}>
                {getSourceLabel(source)}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="inquiry-name" className="mb-2 block eyebrow text-foreground-muted">
              {ui.form.name}
            </label>
            <input
              id="inquiry-name"
              className={inputClass}
              value={formData.name}
              onChange={(event) =>
                setFormData({ ...formData, name: event.target.value })
              }
              required
              placeholder={ui.form.namePlaceholder}
            />
          </div>
          <div>
            <label htmlFor="inquiry-email" className="mb-2 block eyebrow text-foreground-muted">
              Email
            </label>
            <input
              id="inquiry-email"
              type="email"
              className={inputClass}
              value={formData.email}
              onChange={(event) =>
                setFormData({ ...formData, email: event.target.value })
              }
              required
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div>
          <label htmlFor="inquiry-phone" className="mb-2 block eyebrow text-foreground-muted">
              {ui.form.phone}
          </label>
          <input
            id="inquiry-phone"
            className={inputClass}
            value={formData.phone}
            onChange={(event) =>
              setFormData({ ...formData, phone: event.target.value })
            }
            placeholder={ui.form.phonePlaceholder}
          />
        </div>

        <div>
          <label htmlFor="inquiry-message" className="mb-2 block eyebrow text-foreground-muted">
            {ui.form.message}
          </label>
          <textarea
            id="inquiry-message"
            className={`${inputClass} min-h-36 resize-y`}
            value={formData.message}
            onChange={(event) =>
              setFormData({ ...formData, message: event.target.value })
            }
            required
            placeholder={ui.form.messagePlaceholder}
          />
        </div>

        <button
          type="submit"
          disabled={state === "sending"}
          className="bg-accent px-6 py-4 text-sm font-medium uppercase tracking-wide text-background transition-colors duration-300 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state === "sending" ? ui.form.sending : ui.form.submit}
        </button>

        {state === "error" ? (
          <p className="text-sm text-red-400">{errorMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
