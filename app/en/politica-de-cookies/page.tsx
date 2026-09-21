import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getSocialMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cookie policy — Julio Cabos",
  description:
    "Information about the necessary and analytical cookies used on the Julio Cabos website.",
  alternates: {
    canonical: "/en/politica-de-cookies",
    languages: {
      "x-default": "/politica-de-cookies",
      es: "/politica-de-cookies",
      en: "/en/politica-de-cookies",
      it: "/it/politica-de-cookies",
    },
  },
  ...getSocialMetadata({
    title: "Cookie policy — Julio Cabos",
    description:
      "Information about the necessary and analytical cookies used on the Julio Cabos website.",
    locale: "en_GB",
    path: "/en/politica-de-cookies",
  }),
};

export default function EnglishCookiePolicyPage() {
  return (
    <>
      <main className="px-6 pb-24 pt-14 md:px-12 md:pb-32 md:pt-20">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/en"
            className="eyebrow text-foreground-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            ← Back to home
          </Link>

          <header className="mt-16 border-b border-rule pb-10">
            <p className="eyebrow text-accent">Legal information</p>
            <h1 className="mt-4 font-display text-5xl leading-none text-foreground sm:text-6xl md:text-7xl">
              Cookie policy
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-foreground-muted">
              This page explains which cookies are used on juliocabos.es and how
              you can control their use.
            </p>
          </header>

          <div className="space-y-12 pt-12 text-base font-light leading-relaxed text-foreground-muted">
            <section aria-labelledby="cookies-necessary">
              <h2
                id="cookies-necessary"
                className="font-display text-3xl text-foreground"
              >
                Necessary cookies
              </h2>
              <p className="mt-4">
                These are essential for the technical and secure operation of the
                website. They are not used for advertising and cannot be disabled
                from the preferences panel.
              </p>
            </section>

            <section aria-labelledby="cookies-analytics">
              <h2
                id="cookies-analytics"
                className="font-display text-3xl text-foreground"
              >
                Analytics cookies
              </h2>
              <p className="mt-4">
                With your consent, Google Analytics 4 is used to collect
                aggregated statistics about website usage, such as pages visited
                and browsing patterns. This information helps the site owner
                understand and improve the website.
              </p>
              <p className="mt-4">
                Google Analytics commonly uses the cookie{" "}
                <code className="text-foreground">_ga</code> and cookies whose
                names begin with <code className="text-foreground">_ga_</code>.
                Their duration and handling may vary according to the service
                configuration.
              </p>
            </section>

            <section aria-labelledby="cookies-consent">
              <h2
                id="cookies-consent"
                className="font-display text-3xl text-foreground"
              >
                Consent and withdrawal
              </h2>
              <p className="mt-4">
                Google Analytics is not loaded until you explicitly accept the
                analytics cookies. You can accept, reject or change your choice
                at any time through the “Configure cookies” option in the footer.
              </p>
              <p className="mt-4">
                When consent is withdrawn, Analytics loading is stopped and the
                site attempts to remove known analytical cookies from the domain.
              </p>
            </section>

            <section
              aria-labelledby="cookies-controller"
              className="border border-accent/35 bg-accent/5 p-6"
            >
              <h2
                id="cookies-controller"
                className="font-display text-3xl text-foreground"
              >
                Information pending completion
              </h2>
              <p className="mt-4">
                Pending completion by the website owner: full legal identity of
                the responsible party and a specific contact channel for privacy
                enquiries.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer locale="en" />
    </>
  );
}
