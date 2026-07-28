import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.juliocabos.es";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          es: `${SITE_URL}/`,
          en: `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          es: `${SITE_URL}/`,
          en: `${SITE_URL}/en`,
        },
      },
    },
    {
      url: `${SITE_URL}/galeria`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          es: `${SITE_URL}/galeria`,
          en: `${SITE_URL}/en/galeria`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/galeria`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          es: `${SITE_URL}/galeria`,
          en: `${SITE_URL}/en/galeria`,
        },
      },
    },
    {
      url: `${SITE_URL}/biblioteca`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          es: `${SITE_URL}/biblioteca`,
          en: `${SITE_URL}/en/biblioteca`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/biblioteca`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          es: `${SITE_URL}/biblioteca`,
          en: `${SITE_URL}/en/biblioteca`,
        },
      },
    },
  ];
}
