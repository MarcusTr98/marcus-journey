import type { Language } from "@/types";

export const profile = {
  legalName: "Trần Thu Huyền",
  preferredName: "Marcus Tran",
  email: "marcus.tran2202@gmail.com",
  phoneDisplay: "0907 640 098",
  phoneHref: "tel:+84907640098",
  location: "Hải Phòng, Việt Nam",
  github: "https://github.com/MarcusTr98",
} as const;

export const cvByLanguage: Record<Language, string> = {
  vi: "/cv/marcus-tran-cv-vi.pdf",
  en: "/cv/marcus-tran-cv-en.pdf",
  zh: "/cv/marcus-tran-cv-zh.pdf",
};
