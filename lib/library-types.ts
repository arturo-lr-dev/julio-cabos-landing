import type { Locale } from "@/lib/site-content";

export type LocalizedText = Record<Locale, string>;

export type PublicationType =
  | "book"
  | "technical-guide"
  | "digital-guide"
  | "collection";

export type PublicationSection =
  | "on-the-table"
  | "workshop-notebooks"
  | "main-shelf"
  | "editorial-archive";

export type PublicationRole =
  | "author"
  | "coauthor"
  | "painter"
  | "contributor";

export interface LibraryPublication {
  id: string;
  title: string;
  subtitle: LocalizedText;
  publisher: string;
  year: string;
  languages: string[];
  type: PublicationType;
  julioRole?: PublicationRole;
  roleLabel: LocalizedText;
  contribution: LocalizedText;
  description: LocalizedText;
  coverImage: string;
  previewImages?: string[];
  displaySection: PublicationSection;
  featured: boolean;
  externalUrls?: Partial<Record<Locale, string>>;
  purchaseMode: "none" | "external" | "contact-julio";
  price?: number;
  currency?: "EUR";
  tags: string[];
  participationConfirmed: true;
  creditStatus: "documented" | "undocumented";
  status: "published";
  sortOrder: number;
}
