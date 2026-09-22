import type { Locale } from "@/lib/site-content";

export type TrajectoryCategory =
  | "career"
  | "work"
  | "publications"
  | "training"
  | "awards"
  | "events"
  | "collaborations"
  | "press"
  | "legacy";

export type VerificationStatus = "verified" | "documented" | "approximate" | "pending" | "contradictory";
export type Confidence = "high" | "medium" | "low";
export type DisplayLevel = "featured" | "standard" | "reference";
export type TrajectoryPeriod = "beginnings" | "professionalisation" | "international" | "recognition" | "present";
export type LocalizedTrajectoryText = Record<Locale, string>;

export interface TrajectorySource {
  name: string;
  url?: string;
  type: "primary" | "institutional" | "editorial" | "secondary" | "community" | "platform";
  priority?: "high" | "medium" | "low";
}

export interface TrajectoryEntry {
  id: string;
  date?: string;
  year: string;
  displayDate?: LocalizedTrajectoryText;
  sortYear: number;
  period: TrajectoryPeriod;
  category: TrajectoryCategory;
  title: LocalizedTrajectoryText;
  summary?: LocalizedTrajectoryText;
  description?: LocalizedTrajectoryText;
  relationship?: string;
  location?: string;
  sourceName?: string;
  sourceUrl?: string;
  sourceType?: TrajectorySource["type"];
  source?: LocalizedTrajectoryText;
  sources?: TrajectorySource[];
  verificationStatus: VerificationStatus;
  confidence?: Confidence;
  editorialNotes?: string;
  relatedPublication?: string;
  relatedWork?: string;
  relatedTraining?: string;
  image?: string;
  imageMode?: "none" | "licensed" | "remote-og";
  topics?: string[];
  displayLevel?: DisplayLevel;
  showIn?: Array<"timeline" | "library" | "gallery" | "training" | "legacy">;
  featured?: boolean;
  groupKey?: string;
}
