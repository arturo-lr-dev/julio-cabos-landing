import type { Locale } from "@/lib/site-content";

// Keep the external destination here so a future migration only needs one edit.
export const MINIATURE_COACH_URL =
  "https://chatgpt.com/g/g-6a0362fe27308191b9373dabb9198589-miniature-coach";

export const miniatureCoachCopy = {
  es: {
    title: "Miniature Coach",
    description:
      "Asistente especializado en pintura de miniaturas. Analiza tus proyectos, planifica iluminación y color, prepara procesos de pintura y te acompaña paso a paso.",
    cta: "Abrir Miniature Coach",
    externalNote: "Se abrirá en ChatGPT en una pestaña nueva.",
    imageAlt: "Miniature Coach, asistente de pintura de miniaturas",
  },
  en: {
    title: "Miniature Coach",
    description:
      "A specialist assistant for miniature painting. Analyse your projects, plan lighting and colour, prepare painting processes and get step-by-step guidance.",
    cta: "Open Miniature Coach",
    externalNote: "It will open in ChatGPT in a new tab.",
    imageAlt: "Miniature Coach, miniature painting assistant",
  },
  it: {
    title: "Miniature Coach",
    description:
      "Assistente specializzato nella pittura di miniature. Analizza i tuoi progetti, pianifica luce e colore, prepara i processi di pittura e ti accompagna passo dopo passo.",
    cta: "Apri Miniature Coach",
    externalNote: "Si aprirà in ChatGPT in una nuova scheda.",
    imageAlt: "Miniature Coach, assistente per la pittura di miniature",
  },
} satisfies Record<Locale, object>;

export function getMiniatureCoachUrl() {
  return MINIATURE_COACH_URL;
}
