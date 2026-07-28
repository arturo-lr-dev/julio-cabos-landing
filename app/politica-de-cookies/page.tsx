import Link from "next/link";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies — Julio Cabos",
  description:
    "Información sobre las cookies necesarias y analíticas utilizadas en la web de Julio Cabos.",
  alternates: {
    canonical: "/politica-de-cookies",
    languages: {
      es: "/politica-de-cookies",
      it: "/it/politica-de-cookies",
    },
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <main className="px-6 pb-24 pt-14 md:px-12 md:pb-32 md:pt-20">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="eyebrow text-foreground-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            ← Volver al inicio
          </Link>

          <header className="mt-16 border-b border-rule pb-10">
            <p className="eyebrow text-accent">Información legal</p>
            <h1 className="mt-4 font-display text-5xl leading-none text-foreground sm:text-6xl md:text-7xl">
              Política de cookies
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-foreground-muted">
              Esta página explica qué cookies utiliza juliocabos.es y cómo
              puedes controlar su uso.
            </p>
          </header>

          <div className="space-y-12 pt-12 text-base font-light leading-relaxed text-foreground-muted">
            <section aria-labelledby="cookies-necessary">
              <h2
                id="cookies-necessary"
                className="font-display text-3xl text-foreground"
              >
                Cookies necesarias
              </h2>
              <p className="mt-4">
                Son las imprescindibles para el funcionamiento técnico y
                seguro de la web. No se utilizan con fines publicitarios y no
                pueden desactivarse desde el panel de preferencias.
              </p>
            </section>

            <section aria-labelledby="cookies-analytics">
              <h2
                id="cookies-analytics"
                className="font-display text-3xl text-foreground"
              >
                Cookies analíticas
              </h2>
              <p className="mt-4">
                Con tu consentimiento se utiliza Google Analytics 4 para
                obtener estadísticas agregadas sobre el uso de la web, como
                las páginas visitadas y la forma de navegación. Esta
                información ayuda a comprender y mejorar el sitio.
              </p>
              <p className="mt-4">
                Google Analytics utiliza habitualmente la cookie{" "}
                <code className="text-foreground">_ga</code> y cookies con
                nombres que comienzan por{" "}
                <code className="text-foreground">_ga_</code>. Su duración y
                tratamiento pueden variar según la configuración del servicio.
              </p>
            </section>

            <section aria-labelledby="cookies-consent">
              <h2
                id="cookies-consent"
                className="font-display text-3xl text-foreground"
              >
                Consentimiento y retirada
              </h2>
              <p className="mt-4">
                Google Analytics no se carga mientras no aceptes expresamente
                las cookies analíticas. Puedes aceptar, rechazar o cambiar tu
                elección en cualquier momento mediante “Configurar cookies”,
                disponible en el pie de página.
              </p>
              <p className="mt-4">
                Al retirar el consentimiento se detiene la carga de Analytics y
                se intentan eliminar del dominio las cookies analíticas
                conocidas.
              </p>
            </section>

            <section
              aria-labelledby="cookies-controller"
              className="border border-accent/35 bg-accent/5 p-6"
            >
              <h2
                id="cookies-controller"
                className="font-display text-3xl text-foreground"
              >
                Información pendiente
              </h2>
              <p className="mt-4">
                Pendiente de completar por el titular de la web: identidad
                legal completa del responsable del sitio y un medio de contacto
                específico para consultas de privacidad.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer locale="es" />
    </>
  );
}
