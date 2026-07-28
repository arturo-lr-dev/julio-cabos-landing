import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import DocumentLanguage from "@/components/DocumentLanguage";

export const metadata: Metadata = {
  title: "Informativa sui cookie — Julio Cabos",
  description:
    "Informazioni sui cookie necessari e analitici utilizzati dal sito di Julio Cabos.",
  alternates: {
    canonical: "/it/politica-de-cookies",
    languages: {
      es: "/politica-de-cookies",
      it: "/it/politica-de-cookies",
    },
  },
};

export default function ItalianCookiePolicyPage() {
  return (
    <>
      <DocumentLanguage locale="it" />
      <main className="px-6 pb-24 pt-14 md:px-12 md:pb-32 md:pt-20">
        <article className="mx-auto max-w-3xl">
          <Link
            href="/it"
            className="eyebrow text-foreground-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            ← Torna alla home
          </Link>

          <header className="mt-16 border-b border-rule pb-10">
            <p className="eyebrow text-accent">Informazioni legali</p>
            <h1 className="mt-4 font-display text-5xl leading-none text-foreground sm:text-6xl md:text-7xl">
              Informativa sui cookie
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-light leading-relaxed text-foreground-muted">
              Questa pagina spiega quali cookie utilizza juliocabos.es e come
              puoi controllarne l&apos;uso.
            </p>
          </header>

          <div className="space-y-12 pt-12 text-base font-light leading-relaxed text-foreground-muted">
            <section aria-labelledby="cookie-necessari">
              <h2
                id="cookie-necessari"
                className="font-display text-3xl text-foreground"
              >
                Cookie necessari
              </h2>
              <p className="mt-4">
                Sono indispensabili per il funzionamento tecnico e sicuro del
                sito. Non vengono utilizzati per finalità pubblicitarie e non
                possono essere disattivati dal pannello delle preferenze.
              </p>
            </section>

            <section aria-labelledby="cookie-analitici">
              <h2
                id="cookie-analitici"
                className="font-display text-3xl text-foreground"
              >
                Cookie analitici
              </h2>
              <p className="mt-4">
                Con il tuo consenso viene utilizzato Google Analytics 4 per
                ottenere statistiche aggregate sull&apos;uso del sito, come le
                pagine visitate e le modalità di navigazione. Queste
                informazioni aiutano a comprendere e migliorare il sito.
              </p>
              <p className="mt-4">
                Google Analytics utilizza abitualmente il cookie{" "}
                <code className="text-foreground">_ga</code> e cookie i cui
                nomi iniziano con{" "}
                <code className="text-foreground">_ga_</code>. La durata e il
                trattamento possono variare in base alla configurazione del
                servizio.
              </p>
            </section>

            <section aria-labelledby="cookie-consenso">
              <h2
                id="cookie-consenso"
                className="font-display text-3xl text-foreground"
              >
                Consenso e revoca
              </h2>
              <p className="mt-4">
                Google Analytics non viene caricato finché non accetti
                espressamente i cookie analitici. Puoi accettare, rifiutare o
                modificare la tua scelta in qualsiasi momento tramite
                “Configura i cookie”, disponibile nel piè di pagina.
              </p>
              <p className="mt-4">
                Quando revochi il consenso, il caricamento di Analytics viene
                interrotto e il sito tenta di eliminare dal dominio i cookie
                analitici conosciuti.
              </p>
            </section>

            <section
              aria-labelledby="cookie-titolare"
              className="border border-accent/35 bg-accent/5 p-6"
            >
              <h2
                id="cookie-titolare"
                className="font-display text-3xl text-foreground"
              >
                Informazioni in attesa di completamento
              </h2>
              <p className="mt-4">
                Da completare a cura del titolare del sito: identità legale
                completa del responsabile e un contatto specifico per le
                richieste relative alla privacy.
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer locale="it" />
    </>
  );
}
