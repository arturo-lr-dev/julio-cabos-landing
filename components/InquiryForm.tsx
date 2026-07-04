"use client";

import { useEffect, useState } from "react";
import {
  inquirySourceLabels,
  type InquirySource,
} from "@/lib/inquiry-types";

const sourceOptions: InquirySource[] = [
  "commission",
  "collaboration",
  "training",
  "course",
  "general",
];

const inputClass =
  "w-full bg-background border border-rule px-4 py-3 text-foreground placeholder-foreground-faint focus:outline-none focus:border-accent transition-colors";

const sourceByHash: Record<string, InquirySource> = {
  "#consulta-encargo": "commission",
  "#consulta-colaboracion": "collaboration",
  "#consulta-cursos": "training",
};

export default function InquiryForm({
  defaultSource = "general",
}: {
  defaultSource?: InquirySource;
}) {
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
          subject: inquirySourceLabels[formData.source],
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se ha podido enviar la consulta.");
      }

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
        error instanceof Error ? error.message : "No se ha podido enviar."
      );
    }
  }

  if (state === "success") {
    return (
      <div className="border border-rule bg-surface p-8">
        <p className="font-display text-2xl text-foreground">Consulta enviada</p>
        <p className="mt-3 text-foreground-muted">
          Gracias. Tu mensaje ha quedado registrado y Julio podra responderte
          desde su correo.
        </p>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="mt-6 text-sm text-accent"
        >
          Enviar otra consulta
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-rule bg-surface p-6">
      <div className="grid gap-4">
        <div>
          <label htmlFor="inquiry-source" className="mb-2 block eyebrow text-foreground-muted">
            Tipo de consulta
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
                {inquirySourceLabels[source]}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="inquiry-name" className="mb-2 block eyebrow text-foreground-muted">
              Nombre
            </label>
            <input
              id="inquiry-name"
              className={inputClass}
              value={formData.name}
              onChange={(event) =>
                setFormData({ ...formData, name: event.target.value })
              }
              required
              placeholder="Tu nombre"
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
            Telefono
          </label>
          <input
            id="inquiry-phone"
            className={inputClass}
            value={formData.phone}
            onChange={(event) =>
              setFormData({ ...formData, phone: event.target.value })
            }
            placeholder="Opcional"
          />
        </div>

        <div>
          <label htmlFor="inquiry-message" className="mb-2 block eyebrow text-foreground-muted">
            Mensaje
          </label>
          <textarea
            id="inquiry-message"
            className={`${inputClass} min-h-36 resize-y`}
            value={formData.message}
            onChange={(event) =>
              setFormData({ ...formData, message: event.target.value })
            }
            required
            placeholder="Cuentanos que necesitas, fechas, tipo de pieza o curso que te interesa..."
          />
        </div>

        <button
          type="submit"
          disabled={state === "sending"}
          className="bg-accent px-6 py-4 text-sm font-medium uppercase tracking-wide text-background transition-colors duration-300 hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {state === "sending" ? "Enviando..." : "Enviar consulta"}
        </button>

        {state === "error" ? (
          <p className="text-sm text-red-400">{errorMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
