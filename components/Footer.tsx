import { siteContent } from "@/lib/data";

export default function Footer() {
  const { footer } = siteContent;
  const year = new Date().getFullYear();

  return (
    <footer className="relative px-6 md:px-12 pt-16 pb-10 rule-t">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-6">
            <p className="font-display-italic text-foreground text-3xl md:text-4xl leading-tight">
              {footer.name}
            </p>
            <p className="mt-2 eyebrow text-foreground-faint">
              ATELIER · MADRID · ES
            </p>
          </div>

          <nav className="col-span-6 md:col-span-3">
            <span className="eyebrow text-foreground-faint block mb-3">
              ÍNDICE
            </span>
            <ul className="space-y-1.5 text-sm text-foreground-muted">
              <li><a href="#galeria" className="nav-link hover:text-foreground transition-colors">Galería</a></li>
              <li><a href="#formacion" className="nav-link hover:text-foreground transition-colors">Formación</a></li>
              <li><a href="#sobre-mi" className="nav-link hover:text-foreground transition-colors">Sobre Julio</a></li>
              <li><a href="#contacto" className="nav-link hover:text-foreground transition-colors">Contacto</a></li>
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-3">
            <span className="eyebrow text-foreground-faint block mb-3">
              REDES
            </span>
            <ul className="space-y-1.5 text-sm text-foreground-muted">
              <li>
                <a
                  href={footer.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link hover:text-foreground transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 rule-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-foreground-faint">
          <span className="eyebrow tnum">
            © {year} JULIO CABOS — TODOS LOS DERECHOS RESERVADOS
          </span>
          <span className="eyebrow">
            DISEÑO &amp; CÓDIGO — <span className="text-foreground-muted">MMXXVI</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
