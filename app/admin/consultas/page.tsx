import Link from "next/link";
import {
  getInquiriesFromContent,
  getPendingInquiryCount,
} from "@/lib/inquiry-content";
import InquiryManager from "./InquiryManager";

export const metadata = {
  title: "Consultas | Administracion Julio Cabos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await getInquiriesFromContent();
  const pendingCount = getPendingInquiryCount(inquiries);

  return (
    <main className="min-h-screen bg-[#080807] px-5 py-6 text-foreground sm:px-8 lg:px-10">
      <header className="mx-auto flex max-w-7xl flex-col gap-5 border-b border-rule pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/admin" className="text-sm text-accent">
            Volver al panel
          </Link>
          <p className="eyebrow mt-4 text-accent">Consultas</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            Bandeja de consultas
          </h1>
          <p className="mt-1 max-w-2xl text-foreground-muted">
            Aqui entran las solicitudes de obras por encargo, colaboraciones,
            cursos y lista de espera. El boton responder abre el correo con el
            resumen preparado.
          </p>
        </div>
        <div className="grid gap-2 rounded-lg border border-rule-strong bg-surface/70 px-5 py-4 text-sm">
          <span className="text-foreground-muted">Pendientes</span>
          <strong className="text-3xl text-accent">{pendingCount}</strong>
        </div>
      </header>

      <div className="mx-auto mt-6 max-w-7xl">
        <InquiryManager inquiries={inquiries} />
      </div>
    </main>
  );
}
