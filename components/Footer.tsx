import { getSiteContent, type Locale } from "@/lib/site-content";
import Link from "next/link";
import CookieSettingsButton from "./CookieSettingsButton";
import TrackedLink from "./TrackedLink";

export default function Footer({ locale = "es" }: { locale?: Locale }) {
  const { footer, ui } = getSiteContent(locale);
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
              {ui.atelier} · {locale.toUpperCase()}
            </p>
          </div>

          <nav className="col-span-6 md:col-span-3">
            <span className="eyebrow text-foreground-faint block mb-3">
              {ui.footer.index}
            </span>
            <ul className="space-y-1.5 text-sm text-foreground-muted">
              {ui.nav.slice(1).map((link) => (
                <li key={link.href}>
                  <TrackedLink
                    href={link.href}
                    eventName="navigation_click"
                    eventParameters={{
                      destination: link.href,
                      location: "footer",
                      language: locale,
                    }}
                    className="nav-link hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </TrackedLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-6 md:col-span-3">
            <span className="eyebrow text-foreground-faint block mb-3">
              {ui.footer.social}
            </span>
            <ul className="space-y-1.5 text-sm text-foreground-muted">
              <li>
                <TrackedLink
                  href={footer.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="social_click"
                  eventParameters={{
                    network: "instagram",
                    location: "footer",
                    language: locale,
                  }}
                  className="nav-link hover:text-foreground transition-colors"
                >
                  Instagram
                </TrackedLink>
              </li>
              <li>
                <TrackedLink
                  href={footer.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="social_click"
                  eventParameters={{
                    network: "facebook",
                    location: "footer",
                    language: locale,
                  }}
                  className="nav-link hover:text-foreground transition-colors"
                >
                  Facebook
                </TrackedLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-6 rule-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-foreground-faint">
          <span className="eyebrow tnum">
            © {year} JULIO CABOS — {ui.footer.rights}
          </span>
          <nav
            aria-label="Privacidad"
            className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-foreground-muted"
          >
            <Link
              href="/politica-de-cookies"
              className="nav-link hover:text-foreground transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Política de cookies
            </Link>
            <CookieSettingsButton />
          </nav>
          <span className="eyebrow">
            {ui.footer.credits} — <span className="text-foreground-muted">MMXXVI</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
