"use client";

import { useRef, useState } from "react";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";
import { getSiteContent, type Locale } from "@/lib/site-content";
import { trackAnalyticsEvent } from "@/lib/analytics";

export default function WaitlistSection({ locale = "es" }: { locale?: Locale }) {
  const { ui } = getSiteContent(locale);
  const niveles = ui.waitlist.levels;
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    nivel: "",
  });
  const [estado, setEstado] = useState<
    "idle" | "enviando" | "exito" | "error"
  >("idle");
  const [mensajeError, setMensajeError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const hasTrackedStart = useRef(false);

  const trackFormStart = () => {
    if (hasTrackedStart.current) return;

    hasTrackedStart.current = true;
    trackAnalyticsEvent("inicio_formulario", {
      nombre_formulario: "lista_espera",
      idioma: locale,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("enviando");
    setMensajeError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.nombre,
          email: formData.email,
          level: formData.nivel,
          source: "waitlist",
          subject: ui.waitlist.subject,
          message: ui.waitlist.message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al enviar");
      }

      trackAnalyticsEvent("envio_formulario", {
        nombre_formulario: "lista_espera",
        nivel_experiencia: formData.nivel || "no_seleccionado",
        idioma: locale,
      });
      setEstado("exito");
      setSubmittedEmail(formData.email);
      setFormData({ nombre: "", email: "", nivel: "" });
    } catch (err) {
      setEstado("error");
      setMensajeError(
        err instanceof Error ? err.message : ui.waitlist.error
      );
    }
  };

  return (
    <SectionWrapper id="lista-espera" topRule>
      <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
        <FadeIn className="col-span-12 md:col-span-5">
          <SectionLabel
            index="08"
            label={ui.sections.waitlist}
            className="mb-6"
          />
          <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            {ui.waitlist.heading[0]}
            <span className="font-display-italic block text-accent/95">
              {ui.waitlist.heading[1]}
            </span>
          </h2>
          <p className="mt-6 text-foreground-muted leading-relaxed max-w-md">
            {ui.waitlist.text}
          </p>
          <p className="mt-4 text-foreground-muted leading-relaxed max-w-md">
            {ui.waitlist.note}
          </p>
        </FadeIn>

        <FadeIn delay={150} className="col-span-12 md:col-span-7">
          {estado === "exito" ? (
            <div className="bg-surface border border-rule p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-accent"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg></span>
                <span className="font-display text-2xl text-foreground">{ui.waitlist.successTitle}</span>
              </div>
              <p className="text-foreground-muted leading-relaxed">
                {ui.waitlist.successTextBefore}{" "}
                <span className="text-foreground">{submittedEmail}</span>{" "}
                {ui.waitlist.successTextAfter}
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              onFocusCapture={trackFormStart}
              className="bg-surface border border-rule p-8 md:p-10">
              <div className="space-y-6">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="nombre"
                    className="block eyebrow text-foreground-muted mb-2"
                  >
                    {ui.waitlist.name}
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                      setFormData({ ...formData, nombre: e.target.value })
                    }
                    required
                    className="w-full bg-background border border-rule px-4 py-3 text-foreground placeholder-foreground-faint focus:outline-none focus:border-accent transition-colors"
                    placeholder={ui.waitlist.namePlaceholder}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block eyebrow text-foreground-muted mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full bg-background border border-rule px-4 py-3 text-foreground placeholder-foreground-faint focus:outline-none focus:border-accent transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* Nivel */}
                <div>
                  <span className="block eyebrow text-foreground-muted mb-3">
                    {ui.waitlist.level}
                  </span>
                  <div className="grid grid-cols-3 gap-px bg-rule">
                    {niveles.map((nivel) => (
                      <label
                        key={nivel.value}
                        className={`cursor-pointer bg-surface px-4 py-3 text-center text-sm transition-all duration-300 ${
                          formData.nivel === nivel.value
                            ? "text-accent bg-accent/5"
                            : "text-foreground-muted hover:text-foreground"
                        }`}
                      >
                        <input
                          type="radio"
                          name="nivel"
                          value={nivel.value}
                          checked={formData.nivel === nivel.value}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              nivel: e.target.value,
                            })
                          }
                          className="sr-only"
                          required
                        />
                        {nivel.label}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Botón */}
                <button
                  type="submit"
                  disabled={estado === "enviando"}
                  className="w-full bg-accent text-background py-4 px-6 text-sm font-medium tracking-wide uppercase hover:bg-accent-hover transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {estado === "enviando"
                    ? ui.waitlist.sending
                    : ui.waitlist.submit}
                </button>

                {/* Error */}
                {estado === "error" && (
                  <p className="text-sm text-red-400">{mensajeError}</p>
                )}

                {/* Nota privacidad */}
                <p className="text-xs text-foreground-faint text-center">
                  {ui.waitlist.privacy}
                </p>
              </div>
            </form>
          )}
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
