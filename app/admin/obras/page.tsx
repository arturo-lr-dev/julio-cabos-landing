import Link from "next/link";
import { type Work, type WorkCategory } from "@/lib/data";
import { getWorksFromContent } from "@/lib/work-content";
import WorkEditor from "./WorkEditor";
import WorksOrderList from "./WorksOrderList";

export const metadata = {
  title: "Obras | Administracion Julio Cabos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type WorkFormData = Omit<Work, "category"> & {
  category: WorkCategory | "";
};

const emptyWork: WorkFormData = {
  title: "",
  slug: "",
  category: "",
  scale: "",
  brand: "",
  year: "",
  description: "",
  status: "draft",
  featured: false,
  showOnHome: true,
  images: [],
};

export default async function AdminWorksPage({
  searchParams,
}: {
  searchParams: Promise<{ nueva?: string; obra?: string }>;
}) {
  const params = await searchParams;
  const works = await getWorksFromContent();
  const isNewWork = params.nueva === "1";
  const shouldShowNewWork = isNewWork || works.length === 0;
  const selectedWork =
    shouldShowNewWork
      ? emptyWork
      : (works.find((work) => work.slug === params.obra) ?? works[0]);
  const publishedWorkCount = works.filter(
    (work) => work.status === "published"
  ).length;
  const draftWorkCount = works.filter((work) => work.status === "draft").length;

  return (
    <main className="min-h-screen bg-[#080807] px-5 py-6 text-foreground sm:px-8 lg:px-10">
      <header className="mx-auto flex max-w-7xl flex-col gap-5 border-b border-rule pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/admin" className="text-sm text-accent">
            Volver al panel
          </Link>
          <p className="eyebrow mt-4 text-accent">Obras</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            Formulario estandar de obra
          </h1>
          <p className="mt-1 max-w-2xl text-foreground-muted">
            Estos campos seran la fuente unica para la galeria publica:
            titulo, categoria, metadatos, estado, portada e imagenes.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/galeria"
            className="rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10"
          >
            Ver galeria
          </Link>
          <Link
            href="/admin/obras?nueva=1"
            className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-background transition hover:bg-accent-hover"
          >
            Nueva obra
          </Link>
        </div>
      </header>

      <div className="mx-auto mt-6 grid max-w-7xl gap-5 xl:grid-cols-[360px_1fr]">
        <aside className="rounded-lg border border-rule-strong bg-surface/70 p-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">Obras existentes</h2>
            <span className="text-sm text-accent">{works.length}</span>
          </div>
          <div className="mt-4 space-y-3">
            {shouldShowNewWork ? (
              <article className="rounded-md border border-accent/45 bg-accent/10 p-3">
                <p className="font-medium text-accent">Nueva obra</p>
                <p className="mt-1 text-xs text-foreground-muted">
                  Formulario vacio listo para publicar desde cero.
                </p>
              </article>
            ) : null}
            <WorksOrderList works={works} selectedSlug={selectedWork.slug} />
          </div>
        </aside>

        <WorkEditor
          key={shouldShowNewWork ? "new-work" : selectedWork.slug}
          selectedWork={selectedWork}
          isNewWork={shouldShowNewWork}
          publishedWorkCount={publishedWorkCount}
          draftWorkCount={draftWorkCount}
        />
      </div>
    </main>
  );
}
