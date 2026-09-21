import type { Metadata } from "next";

const SOCIAL_LOCALES = ["es_ES", "en_GB", "it_IT"] as const;

export function getSocialMetadata({
  title,
  description,
  path,
  locale,
}: {
  title: string;
  description: string;
  path: string;
  locale: (typeof SOCIAL_LOCALES)[number];
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      title,
      description,
      type: "website",
      locale,
      alternateLocale: SOCIAL_LOCALES.filter((item) => item !== locale),
      siteName: "Julio Cabos",
      url: path,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"],
    },
  };
}
