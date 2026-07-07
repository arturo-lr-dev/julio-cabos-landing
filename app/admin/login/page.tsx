import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Acceso privado | Julio Cabos",
  robots: { index: false, follow: false },
};

const errorMessages: Record<string, string> = {
  "missing-google-config":
    "Falta configurar Google Client ID y Google Client Secret.",
  "invalid-state": "La sesion de acceso ha caducado. Intentalo de nuevo.",
  "google-token": "Google no ha podido confirmar el acceso.",
  "google-user": "No se ha podido leer el perfil de Google.",
  "not-allowed": "Ese correo no tiene permiso para entrar en el panel.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error ? errorMessages[params.error] : null;

  return (
    <main className="min-h-screen bg-[#080807] px-5 py-10 text-foreground">
      <section className="mx-auto flex min-h-[calc(100vh-80px)] max-w-md flex-col justify-center">
        <div className="rounded-lg border border-rule-strong bg-surface/70 p-8">
          <div className="flex justify-center">
            <Image
              src="/images/logo-julio-cabos.png"
              alt="Julio Cabos"
              width={190}
              height={90}
              className="h-auto w-44"
              priority
            />
          </div>

          <p className="eyebrow mt-8 text-center text-accent">Administracion</p>
          <h1 className="mt-3 text-center text-3xl font-semibold tracking-normal">
            Acceso privado
          </h1>
          <p className="mt-3 text-center text-sm text-foreground-muted">
            Solo Julio y Manuel pueden entrar al panel. Usa tu cuenta de Google
            autorizada.
          </p>

          {error ? (
            <div className="mt-6 rounded-lg border border-accent/35 bg-accent/10 p-4 text-sm text-accent">
              {error}
            </div>
          ) : null}

          <Link
            href="/api/auth/google/start"
            className="mt-8 flex w-full items-center justify-center rounded-md bg-accent px-4 py-3 text-sm font-medium text-background transition hover:bg-accent-hover"
          >
            Entrar con Google
          </Link>

          <Link
            href="/"
            className="mt-4 flex justify-center text-sm text-foreground-muted transition hover:text-accent"
          >
            Volver a la web
          </Link>
        </div>
      </section>
    </main>
  );
}
