export type InquirySource =
  | "commission"
  | "collaboration"
  | "training"
  | "course"
  | "waitlist"
  | "general";

export type InquiryStatus = "new" | "read" | "pending" | "answered" | "archived";

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  source: InquirySource;
  subject: string;
  message: string;
  level?: string;
  course?: string;
  status: InquiryStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const inquirySourceLabels: Record<InquirySource, string> = {
  commission: "Obra por encargo",
  collaboration: "Colaboracion profesional",
  training: "Curso presencial",
  course: "Cursos, plazas y proyectos",
  waitlist: "Lista de espera",
  general: "Consulta general",
};

export const inquiryStatusLabels: Record<InquiryStatus, string> = {
  new: "Nueva",
  read: "Leida",
  pending: "Pendiente",
  answered: "Respondida",
  archived: "Archivada",
};

export function normalizeInquirySource(value?: string): InquirySource {
  const allowed: InquirySource[] = [
    "commission",
    "collaboration",
    "training",
    "course",
    "waitlist",
    "general",
  ];

  return allowed.includes(value as InquirySource)
    ? (value as InquirySource)
    : "general";
}

export function normalizeInquiryStatus(value?: string): InquiryStatus {
  const allowed: InquiryStatus[] = [
    "new",
    "read",
    "pending",
    "answered",
    "archived",
  ];

  return allowed.includes(value as InquiryStatus)
    ? (value as InquiryStatus)
    : "new";
}

