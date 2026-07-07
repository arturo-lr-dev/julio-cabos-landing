import { Resend } from "resend";
import {
  inquirySourceLabels,
  normalizeInquirySource,
  type Inquiry,
} from "@/lib/inquiry-types";
import { createInquiry } from "@/lib/services/inquiries-service";

export const runtime = "nodejs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createInquiryId() {
  return `consulta-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function notifyByEmail(inquiry: Inquiry) {
  if (!process.env.RESEND_API_KEY) {
    return { sent: false, reason: "RESEND_API_KEY no configurado" };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const destination =
    process.env.INQUIRIES_NOTIFICATION_EMAIL ||
    process.env.CONTACT_EMAIL ||
    "manuelmoralesg2@gmail.com";
  const sourceLabel = inquirySourceLabels[inquiry.source];
  const details = [
    `<p><strong>Nombre:</strong> ${escapeHtml(inquiry.name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(inquiry.email)}</p>`,
    inquiry.phone
      ? `<p><strong>Telefono:</strong> ${escapeHtml(inquiry.phone)}</p>`
      : "",
    `<p><strong>Origen:</strong> ${escapeHtml(sourceLabel)}</p>`,
    inquiry.level
      ? `<p><strong>Nivel:</strong> ${escapeHtml(inquiry.level)}</p>`
      : "",
    inquiry.course
      ? `<p><strong>Curso:</strong> ${escapeHtml(inquiry.course)}</p>`
      : "",
    `<p><strong>Mensaje:</strong></p><p>${escapeHtml(inquiry.message).replace(/\n/g, "<br />")}</p>`,
  ].join("");

  const { error } = await resend.emails.send({
    from: "Julio Cabos <onboarding@resend.dev>",
    to: [destination],
    subject: `Nueva consulta - ${sourceLabel} - ${inquiry.name}`,
    html: `
      <h2>Nueva consulta desde juliocabos.es</h2>
      ${details}
      <hr />
      <p style="color:#666; font-size:12px;">Tambien queda guardada en el panel de administracion.</p>
    `,
  });

  if (error) {
    console.error("Resend inquiry error:", error);
    return { sent: false, reason: "Error al enviar el aviso" };
  }

  return { sent: true };
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      name?: string;
      nombre?: string;
      email?: string;
      phone?: string;
      source?: string;
      subject?: string;
      message?: string;
      nivel?: string;
      level?: string;
      course?: string;
    };
    const name = String(payload.name ?? payload.nombre ?? "").trim();
    const email = String(payload.email ?? "").trim().toLowerCase();
    const phone = String(payload.phone ?? "").trim();
    const source = normalizeInquirySource(payload.source);
    const level = String(payload.level ?? payload.nivel ?? "").trim();
    const course = String(payload.course ?? "").trim();
    const fallbackMessage =
      source === "waitlist"
        ? "Quiere unirse a la lista de espera."
        : "Solicitud recibida desde la web.";
    const message = String(payload.message ?? fallbackMessage).trim();
    const subject =
      String(payload.subject ?? "").trim() || inquirySourceLabels[source];

    if (!name || !email || !message) {
      return Response.json(
        { error: "Nombre, email y mensaje son obligatorios." },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return Response.json({ error: "El email no es valido." }, { status: 400 });
    }

    const now = new Date().toISOString();
    const inquiry: Inquiry = {
      id: createInquiryId(),
      name,
      email,
      phone,
      source,
      subject,
      message,
      level,
      course,
      status: "new",
      notes: "",
      createdAt: now,
      updatedAt: now,
    };
    await createInquiry(inquiry);

    const notification = await notifyByEmail(inquiry);

    return Response.json({ ok: true, inquiry, notification });
  } catch (error) {
    console.error("Inquiry error:", error);
    return Response.json(
      { error: "No se ha podido registrar la consulta." },
      { status: 500 }
    );
  }
}
