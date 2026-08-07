import { create } from "zustand";
import type { JourneyMode, Language, Quality } from "@/types";
interface JourneyState {
  currentMilestone: number;
  progress: number;
  unlockedUpgrades: string[];
  language: Language;
  quality: Quality;
  soundEnabled: boolean;
  mode: JourneyMode;
  started: boolean;
  setProgress: (v: number) => void;
  setCurrentMilestone: (v: number) => void;
  setLanguage: (v: Language) => void;
  toggleQuality: () => void;
  toggleSound: () => void;
  setMode: (v: JourneyMode) => void;
  start: () => void;
}
export const useJourneyStore = create<JourneyState>((set) => ({
  currentMilestone: -1,
  progress: 0,
  unlockedUpgrades: [],
  language: "vi",
  quality: "high",
  soundEnabled: false,
  mode: "auto",
  started: false,
  setProgress: (progress) => set({ progress }),
  setCurrentMilestone: (currentMilestone) => set({ currentMilestone }),
  setLanguage: (language) => set({ language }),
  toggleQuality: () => set((s) => ({ quality: s.quality === "high" ? "low" : "high" })),
  toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
  setMode: (mode) => set({ mode }),
  start: () => set({ started: true }),
}));
