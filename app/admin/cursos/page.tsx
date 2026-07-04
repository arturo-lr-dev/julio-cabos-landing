import Link from "next/link";
import type { Course } from "@/lib/data";
import { getCoursesFromContent } from "@/lib/course-content";
import CourseEditor from "./CourseEditor";
import CoursesOrderList from "./CoursesOrderList";

export const metadata = {
  title: "Cursos | Administracion Julio Cabos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const emptyCourse: Course = {
  title: "",
  slug: "",
  status: "draft",
  location: "",
  startDate: "",
  endDate: "",
  price: "",
  seatsTotal: 0,
  seatsAvailable: 0,
  level: "Todos los niveles",
  materials: "",
  description: "",
  bookingUrl: "",
  posterImage: "",
  posterAlt: "",
};

export default async function AdminCoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ nuevo?: string; curso?: string }>;
}) {
  const params = await searchParams;
  const courses = await getCoursesFromContent();
  const isNewCourse = params.nuevo === "1";
  const shouldShowNewCourse = isNewCourse || courses.length === 0;
  const selectedCourse = shouldShowNewCourse
    ? emptyCourse
    : (courses.find((course) => course.slug === params.curso) ?? courses[0]);

  return (
    <main className="min-h-screen bg-[#080807] px-5 py-6 text-foreground sm:px-8 lg:px-10">
      <header className="mx-auto flex max-w-7xl flex-col gap-5 border-b border-rule pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/admin" className="text-sm text-accent">
            Volver al panel
          </Link>
          <p className="eyebrow mt-4 text-accent">Cursos</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            Formulario estandar de curso
          </h1>
          <p className="mt-1 max-w-2xl text-foreground-muted">
            Estos datos alimentan la seccion de formacion: fecha, plazas,
            precio, nivel, material necesario y enlace de reserva.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/#formacion"
            className="rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10"
          >
            Ver formacion
          </Link>
          <Link
            href="/admin/cursos?nuevo=1"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition hover:bg-accent-hover"
          >
            Nuevo curso
          </Link>
        </div>
      </header>

      <div className="mx-auto mt-6 grid max-w-7xl gap-5 xl:grid-cols-[360px_1fr]">
        <aside className="rounded-lg border border-rule-strong bg-surface/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Cursos existentes</h2>
            <span className="text-sm text-accent">{courses.length}</span>
          </div>
          <div className="mt-4 space-y-3">
            {shouldShowNewCourse ? (
              <article className="rounded-md border border-accent/45 bg-accent/10 p-3">
                <p className="font-medium text-accent">Nuevo curso</p>
                <p className="mt-1 text-xs text-foreground-muted">
                  Formulario vacio listo para preparar una nueva fecha.
                </p>
              </article>
            ) : null}
            <CoursesOrderList
              courses={courses}
              selectedSlug={selectedCourse.slug}
            />
          </div>
        </aside>

        <CourseEditor
          key={shouldShowNewCourse ? "new-course" : selectedCourse.slug}
          selectedCourse={selectedCourse}
          isNewCourse={shouldShowNewCourse}
        />
      </div>
    </main>
  );
}
