"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const navLinks = [
  { num: "01", label: "Inicio", href: "#" },
  { num: "02", label: "Aprender", href: "#formacion" },
  { num: "03", label: "Obras por encargo", href: "#obras-por-encargo" },
  { num: "04", label: "Colaboraciones", href: "#colaboraciones" },
  { num: "05", label: "Galería", href: "#galeria" },
  { num: "06", label: "Sobre Julio", href: "#sobre-mi" },
  { num: "07", label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 96);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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
          <a
            href="#"
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

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
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
