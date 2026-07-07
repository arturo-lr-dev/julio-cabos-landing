import Link from "next/link";
import { getInstagramPostsFromContent } from "@/lib/instagram-content";
import InstagramInbox from "./InstagramInbox";

export const metadata = {
  title: "Instagram | Administracion Julio Cabos",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminInstagramPage() {
  const posts = await getInstagramPostsFromContent();

  return (
    <main className="min-h-screen bg-[#080807] px-5 py-6 text-foreground sm:px-8 lg:px-10">
      <header className="mx-auto flex max-w-7xl flex-col gap-5 border-b border-rule pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/admin" className="text-sm text-accent">
            Volver al panel
          </Link>
          <p className="eyebrow mt-4 text-accent">Instagram</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal">
            Bandeja de publicaciones
          </h1>
          <p className="mt-1 max-w-2xl text-foreground-muted">
            Guarda publicaciones de Instagram como candidatas, elige cuales
            interesan y conviertelas en obras copiadas a la web.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/obras"
            className="rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10"
          >
            Ver obras
          </Link>
          <Link
            href="/galeria"
            className="rounded-md border border-rule-strong px-4 py-2 text-sm text-accent transition hover:border-accent/50 hover:bg-accent/10"
          >
            Ver galeria
          </Link>
        </div>
      </header>

      <InstagramInbox posts={posts} />
    </main>
  );
}
