import Image from "next/image";
import Link from "next/link";
import {
  adminMessages,
  adminNavigation,
  getAdminCourses,
  getAdminStats,
  getAdminWorks,
  getPublicContentSections,
  patreonIdeas,
} from "@/lib/admin-data";
import { getCoursesFromContent } from "@/lib/course-content";
import {
  getGalleryImagesFromContent,
  getWorksFromContent,
} from "@/lib/work-content";

const statusStyles = {
  Publicado: "border-emerald-400/30 bg-emerald-400/10 text-emerald-100",
  Borrador: "border-foreground-muted/25 bg-foreground/5 text-foreground-muted",
  "En preparacion": "border-accent/35 bg-accent/10 text-accent",
};

function getAdminNavigationHref(item: string) {
  if (item === "Obras") return "/admin/obras";
  if (item === "Cursos") return "/admin/cursos";
  return `#${item.toLowerCase()}`;
}

export const metadata = {
  title: "Administracion | Julio Cabos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const works = await getWorksFromContent();
  const courses = await getCoursesFromContent();
  const galleryImages = await getGalleryImagesFromContent();
  const adminStats = getAdminStats(works, galleryImages, courses);
  const adminWorks = getAdminWorks(works);
  const adminCourses = getAdminCourses(courses);
  const publicContentSections = getPublicContentSections(galleryImages.length);

  return (
    <main className="min-h-screen bg-[#080807] text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-rule-strong bg-black/35 px-5 py-6 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-4 lg:block">
            <Image
              src="/images/logo-julio-cabos.png"
              alt="Julio Cabos"
              width={170}
              height={80}
              className="h-auto w-36 lg:w-44"
              priority
            />
            <p className="eyebrow mt-2 text-accent lg:text-center">
              Administracion
            </p>
          </div>

          <nav className="mt-8 grid gap-1 sm:grid-cols-3 lg:grid-cols-1">
            {adminNavigation.map((item) => (
              <Link
                key={item}
                href={getAdminNavigationHref(item)}
                className={`rounded-md px-4 py-3 text-sm transition hover:bg-foreground/5 ${
                  item === "Inicio"
                    ? "bg-accent/15 text-accent ring-1 ring-accent/20"
                    : "text-foreground/85"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="mt-10 hidden border-t border-rule pt-5 text-sm text-foreground-muted lg:block">
            <p className="font-medium text-foreground">Julio Cabos</p>
            <p>Administrador</p>
            <button className="mt-2 text-accent">Cerrar sesion</button>
          </div>
        </aside>

        <section className="px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex flex-col gap-5 border-b border-rule pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="eyebrow text-accent">Panel privado</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-normal">
                Bienvenido, Julio
              </h1>
              <p className="mt-1 text-foreground-muted">
                Resumen de actividad y contenido conectado con la web publica.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10"
              >
                Ver web
              </Link>
              <Link
                href="/admin/obras?nueva=1"
                className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition hover:bg-accent-hover"
              >
                Anadir obra
              </Link>
            </div>
          </header>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {adminStats.map((stat) => (
              <article
                key={stat.label}
                className="rounded-lg border border-rule-strong bg-surface/70 p-5"
              >
                <p className="text-3xl font-semibold tabular-nums">
                  {stat.value}
                </p>
                <h2 className="mt-2 text-sm text-foreground">{stat.label}</h2>
                <p className="mt-4 text-sm text-foreground-muted">
                  {stat.detail}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
            <section
              id="obras"
              className="rounded-lg border border-rule-strong bg-surface/70 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">Ultimas obras</h2>
                <Link href="/admin/obras" className="text-sm text-accent">
                  Ver todas
                </Link>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {adminWorks.slice(0, 4).map((work) => (
                  <article key={work.title}>
                    <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-background">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        sizes="(min-width: 1280px) 16vw, (min-width: 640px) 35vw, 80vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <h3 className="font-medium">{work.title}</h3>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[11px] ${statusStyles[work.status]}`}
                      >
                        {work.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {work.meta}
                    </p>
                    <p className="mt-1 text-xs text-foreground-faint">
                      {work.updatedAt} · {work.galleryCount} fotos
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section
              id="cursos"
              className="rounded-lg border border-rule-strong bg-surface/70 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">Proximos cursos</h2>
                <button className="text-sm text-accent">Calendario</button>
              </div>
              <div className="mt-4 divide-y divide-rule">
                {adminCourses.map((course) => (
                  <article key={course.title} className="py-4 first:pt-0">
                    <p className="font-medium">{course.title}</p>
                    <p className="mt-1 text-sm text-foreground-muted">
                      {course.date} · {course.location}
                    </p>
                    <p className="mt-2 text-sm text-accent">{course.seats}</p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <div className="mt-5 grid gap-5 xl:grid-cols-3">
            <section
              id="configuracion"
              className="rounded-lg border border-rule-strong bg-surface/70 p-5 xl:col-span-3"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">
                    Contenido ya conectado
                  </h2>
                  <p className="mt-1 text-sm text-foreground-muted">
                    Estas piezas existen hoy en la web y son las primeras
                    candidatas a editar desde el panel.
                  </p>
                </div>
                <span className="text-sm text-accent">
                  {publicContentSections.length} bloques detectados
                </span>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {publicContentSections.map((section) => (
                  <article
                    key={section.title}
                    className="rounded-md border border-rule bg-background/35 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium">{section.title}</h3>
                        <p className="mt-1 text-sm text-foreground-muted">
                          {section.detail}
                        </p>
                      </div>
                      <Link
                        href={section.publicUrl}
                        className="shrink-0 text-sm text-accent"
                      >
                        Ver
                      </Link>
                    </div>
                    <p className="mt-4 text-xs text-foreground-faint">
                      Origen: {section.source}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section
              id="consultas"
              className="rounded-lg border border-rule-strong bg-surface/70 p-5"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">Consultas recientes</h2>
                <button className="text-sm text-accent">Ver todas</button>
              </div>
              <div className="mt-4 divide-y divide-rule">
                {adminMessages.map((message) => (
                  <article key={message.name} className="py-4 first:pt-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">{message.name}</p>
                        <p className="mt-1 text-sm text-foreground-muted">
                          {message.subject}
                        </p>
                      </div>
                      <time className="shrink-0 text-xs text-foreground-faint">
                        {message.time}
                      </time>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section
              id="patreon"
              className="rounded-lg border border-rule-strong bg-surface/70 p-5"
            >
              <h2 className="text-lg font-semibold">Patreon editorial</h2>
              <div className="mt-4 space-y-3">
                {patreonIdeas.map((idea) => (
                  <article
                    key={idea.title}
                    className="rounded-md border border-rule bg-background/35 p-4"
                  >
                    <p className="font-medium">{idea.title}</p>
                    <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                      <span className="text-accent">{idea.status}</span>
                      <span className="text-foreground-muted">
                        {idea.dueDate}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-rule-strong bg-surface/70 p-5">
              <h2 className="text-lg font-semibold">Acciones rapidas</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                {[
                  "Anadir obra",
                  "Nuevo curso",
                  "Crear evento",
                  "Pegar video",
                  "Exportar alumnos",
                  "Configurar home",
                ].map((action) => (
                  <Link
                    key={action}
                    href={
                      action === "Anadir obra"
                        ? "/admin/obras?nueva=1"
                        : action === "Nuevo curso"
                          ? "/admin/cursos?nuevo=1"
                          : "#"
                    }
                    className="rounded-md border border-rule-strong px-4 py-3 text-left text-sm transition hover:border-accent/45 hover:bg-accent/10"
                  >
                    {action}
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
