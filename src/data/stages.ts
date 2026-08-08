import type { JourneyStage, Language } from "@/types";

export const stageOrder: JourneyStage[] = [
  "foundation",
  "transformation",
  "present",
  "destination",
];

const stageLabels: Record<Language, Record<JourneyStage, string>> = {
  vi: {
    foundation: "Nền tảng sản xuất",
    transformation: "Chuyển mình tại FPT",
    present: "Năng lực hiện tại",
    destination: "Đích đến nghề nghiệp",
  },
  en: {
    foundation: "Manufacturing foundation",
    transformation: "FPT transformation",
    present: "Present capabilities",
    destination: "Career destination",
  },
  zh: {
    foundation: "制造业基础",
    transformation: "FPT转型历程",
    present: "当前能力",
    destination: "职业目标",
  },
};

export function getStageLabel(language: Language, stage: JourneyStage) {
  return stageLabels[language][stage];
}
