import { getSiteContent, type Locale } from "@/lib/site-content";

const icons = [
  <svg
    key="books"
    className="h-full w-full"
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
    className="h-full w-full"
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
    className="h-full w-full"
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
    className="h-full w-full"
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

export default function AuthorityStrip({ locale = "es" }: { locale?: Locale }) {
  const { authority } = getSiteContent(locale);

  return (
    <section className="relative overflow-hidden border-y border-rule bg-background/95 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-rule">
        {authority.map((item, index) => (
          <div
            key={`${item.value}-${item.label}`}
            className="flex min-w-0 flex-col items-start gap-4 bg-background px-4 py-6 sm:flex-row sm:items-center sm:gap-5 sm:px-5 sm:py-7 md:px-8 md:py-8"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center text-accent sm:h-12 sm:w-12 md:h-14 md:w-14">
              {icons[index]}
            </span>
            <div className="min-w-0">
              <p className="font-display text-[1.65rem] leading-[1.05] text-foreground sm:text-3xl sm:leading-none md:text-4xl">
                {item.value}
              </p>
              <p className="mt-2 text-[0.625rem] font-medium uppercase leading-relaxed tracking-[0.18em] text-foreground-muted sm:text-[0.6875rem] sm:tracking-[0.22em]">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
