import { revalidatePath } from "next/cache";
import {
  getInquiries,
  saveInquiries,
} from "@/lib/repositories/inquiries-repository";
import { normalizeInquiryStatus, type Inquiry } from "@/lib/inquiry-types";
import { ServiceError } from "./service-error";

export function revalidateInquiries() {
  revalidatePath("/admin");
  revalidatePath("/admin/consultas");
}

export async function createInquiry(inquiry: Inquiry) {
  const currentInquiries = await getInquiries();

  await saveInquiries([inquiry, ...currentInquiries]);
  revalidateInquiries();

  return inquiry;
}

export async function updateInquiry(payload: {
  id?: string;
  status?: string;
  notes?: string;
}) {
  if (!payload.id) {
    throw new ServiceError("Falta la consulta.");
  }

  const inquiries = await getInquiries();
  const existing = inquiries.find((inquiry) => inquiry.id === payload.id);

  if (!existing) {
    throw new ServiceError("No se ha encontrado esa consulta.", 404);
  }

  const updated = {
    ...existing,
    status: payload.status
      ? normalizeInquiryStatus(payload.status)
      : existing.status,
    notes:
      typeof payload.notes === "string" ? payload.notes.trim() : existing.notes,
    updatedAt: new Date().toISOString(),
  };

  await saveInquiries(
    inquiries.map((inquiry) => (inquiry.id === updated.id ? updated : inquiry))
  );
  revalidateInquiries();

  return updated;
}
