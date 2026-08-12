"use client";

import { useEffect, useState } from "react";
import { milestones } from "@/data/milestones";
import { clamp } from "@/lib/utils";
import { useJourneyStore } from "@/stores/journeyStore";

export function useJourneyNavigation() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const started = useJourneyStore((state) => state.started);
  const start = useJourneyStore((state) => state.start);
  const resetJourney = useJourneyStore((state) => state.resetJourney);
  const requestMilestone = useJourneyStore((state) => state.requestMilestone);
  const setProgress = useJourneyStore((state) => state.setProgress);
  const navigationPinned = useJourneyStore((state) => state.navigationPinned);
  const setNavigationPinned = useJourneyStore((state) => state.setNavigationPinned);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const syncProgress = () => {
      if (!started || navigationPinned) return;
      const track = document.getElementById("journey-track");
      if (!track) return;
      const startAt = innerHeight * 0.86;
      const finishAt = track.offsetTop + track.offsetHeight - innerHeight * 1.25;
      setProgress(clamp((scrollY - startAt) / Math.max(finishAt - startAt, 1)));
    };
    addEventListener("scroll", syncProgress, { passive: true });
    syncProgress();
    return () => removeEventListener("scroll", syncProgress);
  }, [navigationPinned, setProgress, started]);

  useEffect(() => {
    if (!navigationPinned) return;
    const track = document.getElementById("journey-track");
    const checkpointProgress = useJourneyStore.getState().vehicleProgress;
    if (track) {
      const startAt = innerHeight * 0.86;
      const finishAt = track.offsetTop + track.offsetHeight - innerHeight * 1.25;
      scrollTo({ top: startAt + checkpointProgress * Math.max(finishAt - startAt, 1) });
    }
    const lockedAt = performance.now();
    const arm = () => {
      if (performance.now() - lockedAt >= 700) setNavigationPinned(false);
    };
    addEventListener("wheel", arm, { passive: true });
    addEventListener("touchstart", arm, { passive: true });
    return () => {
      removeEventListener("wheel", arm);
      removeEventListener("touchstart", arm);
    };
  }, [navigationPinned, setNavigationPinned]);

  const begin = () => {
    resetJourney();
    setNavigationPinned(false);
    start();
    requestAnimationFrame(() =>
      scrollTo({ top: innerHeight * 0.86, behavior: reducedMotion ? "auto" : "smooth" }),
    );
  };

  const goToMilestone = (index: number) => {
    if (!started) start();
    const track = document.getElementById("journey-track");
    if (!track) return;
    const targetProgress = (index + 1) / (milestones.length + 1);
    const startAt = innerHeight * 0.86;
    const finishAt = track.offsetTop + track.offsetHeight - innerHeight * 1.25;
    setNavigationPinned(true);
    requestMilestone(index);
    scrollTo({
      top: startAt + targetProgress * Math.max(finishAt - startAt, 1),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return { begin, goToMilestone };
}
