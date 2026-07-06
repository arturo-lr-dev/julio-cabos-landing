import { siteContent } from "@/lib/site-content";

const icons = [
  <svg
    key="books"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M4 5.5c2.6 0 5 .7 8 2.3v12c-3-1.6-5.4-2.3-8-2.3V5.5Z" />
    <path d="M20 5.5c-2.6 0-5 .7-8 2.3v12c3-1.6 5.4-2.3 8-2.3V5.5Z" />
    <path d="M12 7.8v12" />
  </svg>,
  <svg
    key="clock"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5v5l3.2 2" />
  </svg>,
  <svg
    key="figure"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.35"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 3.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2Z" />
    <path d="M11.5 7.8 9.8 12l-2.6 1.4" />
    <path d="M12.8 8 15 12.2l2.6 1.3" />
    <path d="M10 13.2h4l1.2 6.3H8.8L10 13.2Z" />
    <path d="M10.2 19.5h3.6" />
  </svg>,
  <svg
    key="globe"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8.5" />
    <path d="M3.8 12h16.4" />
    <path d="M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5" />
    <path d="M12 3.5C9.8 5.8 8.7 8.6 8.7 12s1.1 6.2 3.3 8.5" />
  </svg>,
];

export default function AuthorityStrip() {
  return (
    <section className="relative px-6 md:px-12 border-y border-rule bg-background/95">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
        {siteContent.authority.map((item, index) => (
          <div
            key={`${item.value}-${item.label}`}
            className="bg-background px-5 py-7 md:px-8 md:py-8 flex items-center gap-5"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center text-accent md:h-14 md:w-14">
              {icons[index]}
            </span>
            <div>
              <p className="font-display text-foreground text-3xl md:text-4xl leading-none">
                {item.value}
              </p>
              <p className="mt-2 eyebrow text-foreground-muted leading-relaxed">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
