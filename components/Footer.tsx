import { siteContent } from "@/lib/data";

export default function Footer() {
  const { footer } = siteContent;

  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <span className="text-foreground-muted text-sm font-light tracking-widest uppercase">
          {footer.name}
        </span>
        <div className="flex items-center gap-6">
          <a
            href={footer.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-foreground-muted hover:text-foreground transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>
        <span className="text-foreground-muted/50 text-xs">
          &copy; {new Date().getFullYear()} Julio Cabos
        </span>
      </div>
    </footer>
  );
}
