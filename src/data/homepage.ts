import type { Language } from "@/types";

// Headline metrics are kept in data so the UI never owns or invents the numbers.
export const homepageMetrics: {
  id: string;
  value: string;
  labels: Record<Language, string>;
}[] = [
  {
    id: "critical-defects",
    value: "<0.01%",
    labels: {
      vi: "Lỗi nghiêm trọng",
      en: "Serious defects",
      zh: "严重缺陷",
    },
  },
  {
    id: "training-time",
    value: "−53.3%",
    labels: {
      vi: "Thời lượng đào tạo giảm · 15→7 ngày",
      en: "Training time reduction · 15→7 days",
      zh: "培训时间缩短 · 15→7天",
    },
  },
  {
    id: "shift-workforce",
    value: "~400",
    labels: {
      vi: "Người/ca",
      en: "People per shift",
      zh: "人/班",
    },
  },
];
