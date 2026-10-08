import type { Language } from "@/types";

// Headline metrics are kept in data so the UI never owns or invents the numbers.
export const homepageMetrics: {
  id: string;
  value: string;
  labels: Record<Language, string>;
}[] = [
  {
    id: "critical-defects",
    value: "<1%",
    labels: {
      vi: "Lỗi nghiêm trọng",
      en: "Serious defects",
      zh: "严重缺陷",
    },
  },
  {
    id: "operational-waste",
    value: "~30%",
    labels: {
      vi: "Lãng phí vận hành giảm",
      en: "Less operational waste",
      zh: "运营浪费减少",
    },
  },
  {
    id: "equipment-incidents",
    value: "50%",
    labels: {
      vi: "Sự cố thiết bị giảm",
      en: "Fewer equipment incidents",
      zh: "设备故障减少",
    },
  },
];
