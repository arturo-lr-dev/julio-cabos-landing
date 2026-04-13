import { siteContent } from "./data";

export function getJsonLd(siteUrl: string) {
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const serviceId = `${siteUrl}/#service`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Julio Cabos",
        jobTitle: "Pintor profesional de miniaturas",
        description: siteContent.about.text.join(" "),
        url: siteUrl,
        image: `${siteUrl}${siteContent.about.image}`,
        email: `mailto:${siteContent.contact.email}`,
        sameAs: [siteContent.footer.instagram],
        knowsAbout: [
          "Pintura de miniaturas",
          "Formación artística",
          "Dirección de pintura",
          "Box art",
        ],
        worksFor: [
          { "@type": "Organization", name: "Andrea Miniatures" },
          { "@type": "Organization", name: "Scale75" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: "Julio Cabos",
        url: siteUrl,
        inLanguage: "es-ES",
        author: { "@id": personId },
      },
      {
        "@type": "ProfessionalService",
        "@id": serviceId,
        name: "Julio Cabos — Pintura de miniaturas y formación",
        description:
          "Formación presencial y online en pintura de miniaturas, encargos de pintura y dirección artística.",
        provider: { "@id": personId },
        areaServed: "ES",
        serviceType: [
          "Formación en pintura de miniaturas",
          "Encargos de pintura",
          "Dirección artística",
        ],
        image: `${siteUrl}/og-image.jpg`,
        url: siteUrl,
      },
    ],
  };
}
