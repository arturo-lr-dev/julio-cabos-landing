"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { num: "02", label: "Galería", href: "#galeria" },
  { num: "03", label: "Formación", href: "#formacion" },
  { num: "04", label: "Sobre Julio", href: "#sobre-mi" },
  { num: "05", label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "bg-background/85 backdrop-blur-xl border-b border-rule"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          {/* Wordmark */}
          <a href="#" className="group flex items-baseline gap-2">
            <span className="font-display text-foreground text-xl md:text-2xl leading-none">
              Julio
            </span>
            <span className="font-display-italic text-accent text-xl md:text-2xl leading-none">
              Cabos
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group inline-flex items-baseline gap-1.5 text-sm text-foreground-muted hover:text-foreground transition-colors"
                >
                  <span className="font-light tracking-wide">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile hamburger / X */}
          <button
            className="relative md:hidden w-6 h-6 p-0"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span
              className={`absolute left-0 block w-6 h-px bg-foreground transition-all duration-300 ease-out ${
                menuOpen
                  ? "top-1/2 -translate-y-1/2 rotate-45"
                  : "top-1 translate-y-0 rotate-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 block w-6 h-px bg-foreground transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block w-6 h-px bg-foreground transition-all duration-300 ease-out ${
                menuOpen
                  ? "bottom-1/2 translate-y-1/2 -rotate-45"
                  : "bottom-1 translate-y-0 rotate-0"
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Fullscreen mobile menu */}
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
                onClick={() => setMenuOpen(false)}
              >
                <span className="font-display text-3xl leading-none">
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-auto eyebrow text-foreground-faint">
          ATELIER · MADRID
        </div>
      </div>
    </>
  );
}
