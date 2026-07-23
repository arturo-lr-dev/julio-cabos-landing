"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSiteContent, type Locale } from "@/lib/site-content";
import { trackAnalyticsEvent } from "@/lib/analytics";

export default function Header({ locale = "es" }: { locale?: Locale }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { ui } = getSiteContent(locale);
  const navLinks = ui.nav;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-rule bg-background/88 backdrop-blur-xl transition-all duration-500">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          <a
            href="#"
            onClick={() =>
              trackAnalyticsEvent("navigation_click", {
                destination: "#",
                location: "header_logo",
                language: locale,
              })
            }
            className="group relative block h-12 w-32 md:h-14 md:w-40"
            aria-label="Julio Cabos"
          >
            <Image
              src="/images/logo-julio-cabos.png"
              alt="Julio Cabos"
              fill
              sizes="(max-width: 768px) 128px, 160px"
              className="object-contain brightness-110 contrast-110 transition-opacity duration-300 group-hover:opacity-90"
              priority
            />
          </a>

          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() =>
                    trackAnalyticsEvent("navigation_click", {
                      destination: link.href,
                      location: "header_desktop",
                      language: locale,
                    })
                  }
                  className="group inline-flex items-baseline gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
                >
                  <span className="font-light tracking-wide">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <Link
            href={ui.alternateHref}
            onClick={() =>
              trackAnalyticsEvent("language_change", {
                from_language: locale,
                to_language: ui.alternateLanguage.toLowerCase(),
                location: "header_desktop",
              })
            }
            className="hidden md:inline-flex min-h-9 items-center border border-rule-strong px-3 eyebrow text-foreground-muted transition-colors hover:border-accent hover:text-accent"
            aria-label={`${ui.language}: ${ui.alternateLanguage}`}
          >
            {ui.alternateLanguage}
          </Link>

          <div className="flex items-center gap-4 md:hidden">
            <Link
              href={ui.alternateHref}
              className="inline-flex min-h-9 items-center border border-rule-strong px-3 eyebrow text-foreground-muted transition-colors hover:border-accent hover:text-accent"
              aria-label={`${ui.language}: ${ui.alternateLanguage}`}
              onClick={() => {
                trackAnalyticsEvent("language_change", {
                  from_language: locale,
                  to_language: ui.alternateLanguage.toLowerCase(),
                  location: "header_mobile",
                });
                setMenuOpen(false);
              }}
            >
              {ui.alternateLanguage}
            </Link>

            <button
              className="relative h-9 w-7 p-0"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? ui.menuClose : ui.menuOpen}
            >
              <span
                className={`absolute left-0 block w-7 h-px bg-foreground transition-all duration-300 ease-out ${
                  menuOpen
                    ? "top-1/2 -translate-y-1/2 rotate-45"
                    : "top-2 translate-y-0 rotate-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 block w-7 h-px bg-foreground transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block w-7 h-px bg-foreground transition-all duration-300 ease-out ${
                  menuOpen
                    ? "bottom-1/2 translate-y-1/2 -rotate-45"
                    : "bottom-2 translate-y-0 rotate-0"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-background flex flex-col px-6 pt-28 pb-12 transition-opacity duration-500 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-2">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className="rule-b py-5"
              style={{
                transitionDelay: menuOpen ? `${i * 75}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 0.5s ease-out, transform 0.5s ease-out",
              }}
            >
              <a
                href={link.href}
                className="flex items-baseline gap-4 text-foreground hover:text-accent transition-colors"
                onClick={() => {
                  trackAnalyticsEvent("navigation_click", {
                    destination: link.href,
                    location: "header_mobile",
                    language: locale,
                  });
                  setMenuOpen(false);
                }}
              >
                <span className="font-display text-3xl leading-none">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto eyebrow text-foreground-faint">
          <Link
            href={ui.alternateHref}
            onClick={() =>
              trackAnalyticsEvent("language_change", {
                from_language: locale,
                to_language: ui.alternateLanguage.toLowerCase(),
                location: "mobile_menu_footer",
              })
            }
            className="hover:text-accent"
          >
            {ui.language}: {ui.alternateLanguage}
          </Link>
          <span className="mx-3">/</span>
          {ui.atelier}
        </div>
      </div>
    </>
  );
}
