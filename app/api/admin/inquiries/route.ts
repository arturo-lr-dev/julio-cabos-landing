import { revalidatePath } from "next/cache";
import {
  getInquiriesFromContent,
  writeInquiriesToContent,
} from "@/lib/inquiry-content";
import { normalizeInquiryStatus } from "@/lib/inquiry-types";

export const runtime = "nodejs";

function revalidateInquiries() {
  revalidatePath("/admin");
  revalidatePath("/admin/consultas");
}

export async function PATCH(request: Request) {
  const payload = (await request.json()) as {
    id?: string;
    status?: string;
    notes?: string;
  };

  if (!payload.id) {
    return Response.json({ error: "Falta la consulta." }, { status: 400 });
  }

  const inquiries = await getInquiriesFromContent();
  const existing = inquiries.find((inquiry) => inquiry.id === payload.id);

  if (!existing) {
    return Response.json(
      { error: "No se ha encontrado esa consulta." },
      { status: 404 }
    );
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
  const nextInquiries = inquiries.map((inquiry) =>
    inquiry.id === updated.id ? updated : inquiry
  );

  await writeInquiriesToContent(nextInquiries);
  revalidateInquiries();

  return Response.json({ ok: true, inquiry: updated });
}
