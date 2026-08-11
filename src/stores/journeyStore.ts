import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { JourneyMode, Language, Quality } from "@/types";
interface JourneyState {
  currentMilestone: number;
  progress: number;
  vehicleProgress: number;
  unlockedUpgrades: string[];
  visitedMilestones: number[];
  language: Language;
  quality: Quality;
  soundEnabled: boolean;
  mode: JourneyMode;
  started: boolean;
  sceneReady: boolean;
  requestedMilestone: number | null;
  navigationPinned: boolean;
  minorUpgradePulse: number;
  setProgress: (v: number) => void;
  setVehicleProgress: (v: number) => void;
  setCurrentMilestone: (v: number) => void;
  setLanguage: (v: Language) => void;
  toggleQuality: () => void;
  setQuality: (v: Quality) => void;
  toggleSound: () => void;
  setMode: (v: JourneyMode) => void;
  start: () => void;
  setSceneReady: (v: boolean) => void;
  requestMilestone: (v: number | null) => void;
  setNavigationPinned: (v: boolean) => void;
  triggerMinorUpgrade: () => void;
  resetJourney: () => void;
}
export const useJourneyStore = create<JourneyState>()(
  persist(
    (set) => ({
      currentMilestone: -1,
      progress: 0,
      vehicleProgress: 0,
      unlockedUpgrades: [],
      visitedMilestones: [],
      language: "vi",
      quality: "high",
      soundEnabled: false,
      mode: "auto",
      started: false,
      sceneReady: false,
      requestedMilestone: null,
      navigationPinned: false,
      minorUpgradePulse: 0,
      setProgress: (progress) => set({ progress }),
      setVehicleProgress: (vehicleProgress) => set({ vehicleProgress }),
      setCurrentMilestone: (currentMilestone) =>
        set((state) => ({
          currentMilestone,
          visitedMilestones: state.visitedMilestones.includes(currentMilestone)
            ? state.visitedMilestones
            : [...state.visitedMilestones, currentMilestone].sort((a, b) => a - b),
        })),
      setLanguage: (language) => set({ language }),
      toggleQuality: () => set((s) => ({ quality: s.quality === "high" ? "low" : "high" })),
      setQuality: (quality) => set({ quality }),
      toggleSound: () => set((s) => ({ soundEnabled: !s.soundEnabled })),
      setMode: (mode) => set({ mode }),
      start: () => set({ started: true }),
      setSceneReady: (sceneReady) => set({ sceneReady }),
      requestMilestone: (requestedMilestone) => set({ requestedMilestone }),
      setNavigationPinned: (navigationPinned) => set({ navigationPinned }),
      triggerMinorUpgrade: () =>
        set((state) => ({ minorUpgradePulse: state.minorUpgradePulse + 1 })),
      resetJourney: () =>
        set({
          progress: 0,
          vehicleProgress: 0,
          currentMilestone: -1,
          requestedMilestone: null,
          navigationPinned: false,
          visitedMilestones: [],
        }),
    }),
    {
      name: "marcus-journey-preferences",
      partialize: ({ language, quality }) => ({ language, quality }),
      skipHydration: true,
    },
  ),
);
