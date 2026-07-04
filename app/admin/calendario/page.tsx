import Link from "next/link";
import {
  getCalendarEventsFromContent,
  getCalendarItemsFromCoursesAndEvents,
} from "@/lib/calendar-content";
import { getCoursesFromContent } from "@/lib/course-content";
import CalendarManager from "./CalendarManager";

export const metadata = {
  title: "Calendario | Administracion Julio Cabos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminCalendarPage() {
  const courses = await getCoursesFromContent();
  const events = await getCalendarEventsFromContent();
  const items = getCalendarItemsFromCoursesAndEvents(courses, events);

  return (
    <main className="min-h-screen bg-[#080807] px-5 py-6 text-foreground sm:px-8 lg:px-10">
      <header className="mx-auto flex max-w-7xl flex-col gap-5 border-b border-rule pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/admin" className="text-sm text-accent">
            Volver al panel
          </Link>
          <p className="eyebrow mt-4 text-accent">Calendario</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            Agenda editable
          </h1>
          <p className="mt-1 max-w-2xl text-foreground-muted">
            Los cursos aparecen automaticamente. Los eventos sueltos se crean y
            editan aqui.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/cursos?nuevo=1"
            className="rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10"
          >
            Nuevo curso
          </Link>
          <Link
            href="/admin/cursos"
            className="rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10"
          >
            Ver cursos
          </Link>
        </div>
      </header>

      <CalendarManager events={events} items={items} />
    </main>
  );
}
