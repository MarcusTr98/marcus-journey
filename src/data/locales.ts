import type { Language } from "@/types";

export const languages: readonly Language[] = ["vi", "en", "zh"];

export function isLanguage(value: string): value is Language {
  return languages.includes(value as Language);
}

export const localeMetadata = {
  vi: {
    title: "Kỹ thuật quy trình & Kaizen",
    description:
      "Kinh nghiệm sản xuất, cải tiến liên tục và các dự án kỹ thuật quy trình của Marcus Tran.",
  },
  en: {
    title: "Process Engineering & Kaizen",
    description:
      "Marcus Tran's manufacturing experience, continuous-improvement work and process-engineering projects.",
  },
  zh: {
    title: "工艺工程与持续改善",
    description: "Marcus Tran的制造业经验、持续改善成果与工艺工程项目。",
  },
} as const;
