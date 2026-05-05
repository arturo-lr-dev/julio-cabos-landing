"use client";

import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import SectionLabel from "./SectionLabel";
import FadeIn from "./FadeIn";

const niveles = [
  { value: "principiante", label: "Principiante" },
  { value: "intermedio", label: "Intermedio" },
  { value: "avanzado", label: "Avanzado" },
];

export default function WaitlistSection() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    nivel: "",
  });
  const [estado, setEstado] = useState<
    "idle" | "enviando" | "exito" | "error"
  >("idle");
  const [mensajeError, setMensajeError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEstado("enviando");
    setMensajeError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al enviar");
      }

      setEstado("exito");
      setFormData({ nombre: "", email: "", nivel: "" });
    } catch (err) {
      setEstado("error");
      setMensajeError(
        err instanceof Error ? err.message : "Error al enviar el formulario"
      );
    }
  };

  return (
    <SectionWrapper id="lista-espera" topRule>
      <div className="grid grid-cols-12 gap-8 md:gap-12 items-start">
        <FadeIn className="col-span-12 md:col-span-5">
          <SectionLabel
            index="05"
            label="Próximamente"
            className="mb-6"
          />
          <h2 className="font-display text-foreground text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
            Cursos
            <span className="font-display-italic block text-accent/95">
              online
            </span>
          </h2>
          <p className="mt-6 text-foreground-muted leading-relaxed max-w-md">
            Estamos preparando un programa completo de formación a distancia:
            material grabado, ejercicios pautados y seguimiento personal.
          </p>
          <p className="mt-4 text-foreground-muted leading-relaxed max-w-md">
            Déjanos tus datos y te avisaremos en cuanto abramos las inscripciones.
          </p>
        </FadeIn>

        <FadeIn delay={150} className="col-span-12 md:col-span-7">
          {estado === "exito" ? (
            <div className="bg-surface border border-rule p-8 md:p-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-accent"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg></span>
                <span className="font-display text-2xl text-foreground">¡Listo!</span>
              </div>
              <p className="text-foreground-muted leading-relaxed">
                Te has añadido a la lista de espera. Te escribiremos a{" "}
                <span className="text-foreground">{formData.email}</span>{" "}
                en cuanto abramos las inscripciones.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-surface border border-rule p-8 md:p-10">
              <div className="space-y-6">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="nombre"
                    className="block eyebrow text-foreground-muted mb-2"
                  >
                    Nombre
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
                    placeholder="Tu nombre"
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
                    Tu nivel
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
                    ? "Enviando..."
                    : "Unirme a la lista de espera"}
                </button>

                {/* Error */}
                {estado === "error" && (
                  <p className="text-sm text-red-400">{mensajeError}</p>
                )}

                {/* Nota privacidad */}
                <p className="text-xs text-foreground-faint text-center">
                  Sin spam. Solo un aviso cuando lancemos.
                </p>
              </div>
            </form>
          )}
        </FadeIn>
      </div>
    </SectionWrapper>
  );
}
