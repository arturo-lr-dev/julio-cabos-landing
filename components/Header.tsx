"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Galería", href: "#galeria" },
  { label: "Formación", href: "#formacion" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || menuOpen
            ? "bg-background/80 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-12 h-16 md:h-20">
          <a
            href="#"
            className="text-foreground text-sm md:text-base font-light tracking-widest uppercase"
          >
            Julio Cabos
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-foreground-muted text-sm font-light tracking-wide hover:text-foreground transition-colors"
                >
                  {link.label}
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
        className={`fixed inset-0 z-40 bg-background flex flex-col items-center justify-center transition-opacity duration-500 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col items-center gap-10">
          {navLinks.map((link, i) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-foreground text-2xl font-light tracking-widest uppercase hover:text-accent transition-colors duration-300"
                style={{
                  transitionDelay: menuOpen ? `${i * 75}ms` : "0ms",
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                  transition:
                    "color 0.3s, opacity 0.4s ease-out, transform 0.4s ease-out",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
