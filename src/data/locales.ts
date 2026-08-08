import type { Language } from "@/types";

export const languages: readonly Language[] = ["vi", "en", "zh"];

export function isLanguage(value: string): value is Language {
  return languages.includes(value as Language);
}

export const localeMetadata = {
  vi: {
    title: "Marcus Journey — Từ sản xuất đến đổi mới số",
    description: "Hành trình tương tác của Marcus Tran qua sản xuất, Kaizen và công nghệ.",
  },
  en: {
    title: "Marcus Journey — Production to Digital Innovation",
    description: "Marcus Tran's interactive journey through production, Kaizen and technology.",
  },
  zh: {
    title: "Marcus Journey — 从生产走向数字创新",
    description: "Marcus Tran 跨越生产、改善与科技的互动旅程。",
  },
} as const;
