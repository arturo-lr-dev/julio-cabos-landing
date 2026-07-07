"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AdminShellProps {
  children: React.ReactNode;
  adminName: string;
  adminEmail: string;
  adminPicture?: string;
  unreadInquiryCount: number;
}

const navigation = [
  { label: "Inicio", href: "/admin", enabled: true },
  { label: "Obras", href: "/admin/obras", enabled: true },
  { label: "Cursos", href: "/admin/cursos", enabled: true },
  { label: "Instagram", href: "/admin/instagram", enabled: true },
  { label: "Calendario", href: "/admin/calendario", enabled: true },
  { label: "Videos", href: "", enabled: false },
  { label: "Alumnos", href: "", enabled: false },
  { label: "Consultas", href: "/admin/consultas", enabled: true },
  { label: "Patreon", href: "", enabled: false },
  { label: "Configuracion", href: "", enabled: false },
];

function getInitials(name?: string, email?: string) {
  const source = name?.trim() || email?.split("@")[0] || "Admin";
  const words = source.split(/\s+/).filter(Boolean);

  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminShell({
  children,
  adminName,
  adminEmail,
  adminPicture,
  unreadInquiryCount,
}: AdminShellProps) {
  const pathname = usePathname();
  const adminInitials = getInitials(adminName, adminEmail);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#080807] text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-b border-rule-strong bg-black/35 px-5 py-6 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto lg:border-b-0 lg:border-r">
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
            {navigation.map((item) => {
              const active = item.enabled && isActive(pathname, item.href);
              const content = (
                <>
                  <span>{item.label}</span>
                  {item.label === "Consultas" && unreadInquiryCount > 0 ? (
                    <span
                      className="size-2.5 rounded-full bg-accent shadow-[0_0_14px_rgba(201,166,104,0.75)]"
                      aria-label={`${unreadInquiryCount} consultas nuevas`}
                    />
                  ) : null}
                </>
              );
              const className = `flex items-center justify-between gap-3 rounded-md px-4 py-3 text-sm transition ${
                active
                  ? "bg-accent/15 text-accent ring-1 ring-accent/20"
                  : item.enabled
                    ? "text-foreground/85 hover:bg-foreground/5"
                    : "cursor-not-allowed text-foreground-faint opacity-55"
              }`;

              return item.enabled ? (
                <Link key={item.label} href={item.href} className={className}>
                  {content}
                </Link>
              ) : (
                <span key={item.label} className={className} aria-disabled="true">
                  {content}
                </span>
              );
            })}
          </nav>

          <div className="mt-6 border-t border-rule pt-5 lg:mt-10">
            <div className="flex items-center gap-3">
              <div
                className="grid size-12 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/15 bg-cover bg-center text-sm font-semibold text-accent"
                style={
                  adminPicture
                    ? { backgroundImage: `url(${adminPicture})` }
                    : undefined
                }
                aria-label={adminName}
              >
                {!adminPicture ? adminInitials : null}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {adminName}
                </p>
                {adminEmail ? (
                  <p className="truncate text-xs text-foreground-muted">
                    {adminEmail}
                  </p>
                ) : null}
                <p className="mt-1 text-xs text-accent">Administrador</p>
              </div>
            </div>
            <Link
              href="/api/auth/logout"
              className="mt-4 inline-flex text-sm text-accent"
            >
              Cerrar sesion
            </Link>
          </div>
        </aside>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
