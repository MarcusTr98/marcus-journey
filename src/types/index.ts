export type Language = "vi" | "en" | "zh";
export type JourneyMode = "auto" | "drive" | "quick";
export type JourneyStage = "foundation" | "transformation" | "present" | "destination";
export interface Milestone {
  id: string;
  shortTitle: string;
  title: string;
  period: string;
  role: string;
  summary: string;
  highlights: string[];
  accent: string;
  position: [number, number, number];
  upgrade: string;
  stage: JourneyStage;
  projectUrl?: string;
  projectLinks?: { label: string; url: string }[];
}
