"use client";

import { useMemo, useState } from "react";
import {
  inquirySourceLabels,
  inquiryStatusLabels,
  type Inquiry,
  type InquirySource,
  type InquiryStatus,
} from "@/lib/inquiry-types";

const statusStyles: Record<InquiryStatus, string> = {
  new: "border-accent/40 bg-accent/10 text-accent",
  read: "border-sky-400/30 bg-sky-400/10 text-sky-100",
  pending: "border-amber-400/35 bg-amber-400/10 text-amber-100",
  answered: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  archived: "border-foreground-muted/20 bg-foreground/5 text-foreground-muted",
};

const inputClass =
  "w-full rounded-md border border-rule bg-background px-3 py-2 text-sm text-foreground outline-none transition focus:border-accent";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function createMailto(inquiry: Inquiry) {
  const source = inquirySourceLabels[inquiry.source];
  const subject = `Respuesta a tu consulta desde juliocabos.es`;
  const body = [
    `Hola ${inquiry.name},`,
    "",
    "Gracias por escribir desde juliocabos.es.",
    "",
    "Tu consulta:",
    `"${inquiry.message}"`,
    "",
    `Origen: ${source}`,
    `Fecha: ${formatDate(inquiry.createdAt)}`,
    inquiry.level ? `Nivel: ${inquiry.level}` : "",
    inquiry.course ? `Curso: ${inquiry.course}` : "",
    "",
    "Respuesta de Julio:",
    "",
  ]
    .filter((line) => line !== "")
    .join("\n");

  return `mailto:${encodeURIComponent(inquiry.email)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export default function InquiryManager({
  inquiries,
}: {
  inquiries: Inquiry[];
}) {
  const [items, setItems] = useState(inquiries);
  const [selectedId, setSelectedId] = useState(inquiries[0]?.id ?? "");
  const [sourceFilter, setSourceFilter] = useState<InquirySource | "all">("all");
  const [statusFilter, setStatusFilter] = useState<InquiryStatus | "all">("all");
  const [saving, setSaving] = useState(false);
  const selectedInquiry =
    items.find((inquiry) => inquiry.id === selectedId) ?? items[0];
  const filteredItems = useMemo(
    () =>
      items.filter((inquiry) => {
        const sourceMatches =
          sourceFilter === "all" || inquiry.source === sourceFilter;
        const statusMatches =
          statusFilter === "all" || inquiry.status === statusFilter;

        return sourceMatches && statusMatches;
      }),
    [items, sourceFilter, statusFilter]
  );

  async function updateInquiry(
    inquiry: Inquiry,
    changes: Partial<Pick<Inquiry, "status" | "notes">>
  ) {
    setSaving(true);

    try {
      const response = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: inquiry.id, ...changes }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "No se ha podido guardar la consulta.");
      }

      setItems((currentItems) =>
        currentItems.map((current) =>
          current.id === data.inquiry.id ? data.inquiry : current
        )
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[420px_1fr]">
      <section className="rounded-lg border border-rule-strong bg-surface/70 p-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            className={inputClass}
            value={sourceFilter}
            onChange={(event) =>
              setSourceFilter(event.target.value as InquirySource | "all")
            }
          >
            <option value="all">Todos los origenes</option>
            {Object.entries(inquirySourceLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <select
            className={inputClass}
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as InquiryStatus | "all")
            }
          >
            <option value="all">Todos los estados</option>
            {Object.entries(inquiryStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 space-y-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((inquiry) => (
              <button
                key={inquiry.id}
                type="button"
                onClick={() => setSelectedId(inquiry.id)}
                className={`w-full rounded-md border p-4 text-left transition ${
                  selectedInquiry?.id === inquiry.id
                    ? "border-accent/50 bg-accent/10"
                    : "border-rule bg-background/35 hover:border-accent/35"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{inquiry.name}</p>
                    <p className="mt-1 truncate text-sm text-foreground-muted">
                      {inquiry.subject}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] ${statusStyles[inquiry.status]}`}
                  >
                    {inquiryStatusLabels[inquiry.status]}
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3 text-xs text-foreground-faint">
                  <span>{inquirySourceLabels[inquiry.source]}</span>
                  <time>{formatDate(inquiry.createdAt)}</time>
                </div>
              </button>
            ))
          ) : (
            <p className="rounded-md border border-rule bg-background/35 p-4 text-sm text-foreground-muted">
              No hay consultas con esos filtros.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-lg border border-rule-strong bg-surface/70 p-5">
        {selectedInquiry ? (
          <div>
            <div className="flex flex-col gap-4 border-b border-rule pb-5 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="eyebrow text-accent">
                  {inquirySourceLabels[selectedInquiry.source]}
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {selectedInquiry.name}
                </h2>
                <p className="mt-1 text-sm text-foreground-muted">
                  {selectedInquiry.email}
                  {selectedInquiry.phone ? ` - ${selectedInquiry.phone}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a
                  href={createMailto(selectedInquiry)}
                  className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition hover:bg-accent-hover"
                >
                  Responder
                </a>
                <button
                  type="button"
                  onClick={() =>
                    updateInquiry(selectedInquiry, { status: "answered" })
                  }
                  className="rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/45 hover:bg-accent/10"
                >
                  Marcar respondida
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateInquiry(selectedInquiry, { status: "archived" })
                  }
                  className="rounded-md border border-rule-strong px-4 py-2 text-sm text-foreground-muted transition hover:border-accent/45 hover:text-foreground"
                >
                  Archivar
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <div className="rounded-md border border-rule bg-background/35 p-4">
                <p className="text-xs uppercase text-foreground-faint">Estado</p>
                <select
                  className={`${inputClass} mt-2`}
                  value={selectedInquiry.status}
                  disabled={saving}
                  onChange={(event) =>
                    updateInquiry(selectedInquiry, {
                      status: event.target.value as InquiryStatus,
                    })
                  }
                >
                  {Object.entries(inquiryStatusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="rounded-md border border-rule bg-background/35 p-4">
                <p className="text-xs uppercase text-foreground-faint">Fecha</p>
                <p className="mt-2 text-sm">{formatDate(selectedInquiry.createdAt)}</p>
              </div>
              <div className="rounded-md border border-rule bg-background/35 p-4">
                <p className="text-xs uppercase text-foreground-faint">Datos</p>
                <p className="mt-2 text-sm">
                  {[selectedInquiry.level, selectedInquiry.course]
                    .filter(Boolean)
                    .join(" - ") || "Sin datos adicionales"}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-md border border-rule bg-background/35 p-5">
              <p className="text-xs uppercase text-foreground-faint">Mensaje</p>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground-muted">
                {selectedInquiry.message}
              </p>
            </div>

            <form
              className="mt-5"
              onSubmit={(event) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                updateInquiry(selectedInquiry, {
                  notes: String(formData.get("notes") ?? ""),
                });
              }}
            >
              <label
                htmlFor="notes"
                className="text-xs uppercase text-foreground-faint"
              >
                Notas internas
              </label>
              <textarea
                id="notes"
                name="notes"
                key={selectedInquiry.id}
                defaultValue={selectedInquiry.notes}
                rows={5}
                className={`${inputClass} mt-2 resize-y`}
                placeholder="Ej: Le interesa Madrid, responder cuando haya fechas..."
              />
              <button
                type="submit"
                disabled={saving}
                className="mt-3 rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10 disabled:opacity-50"
              >
                Guardar notas
              </button>
            </form>
          </div>
        ) : (
          <div className="rounded-md border border-rule bg-background/35 p-8 text-center">
            <h2 className="text-xl font-semibold">Sin consultas todavia</h2>
            <p className="mt-2 text-sm text-foreground-muted">
              Cuando alguien escriba desde la web, aparecera aqui.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
