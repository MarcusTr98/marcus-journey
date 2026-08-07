"use client";
import { milestones } from "@/data/milestones";
import Milestone from "./Milestone";
import JourneyLandmarks from "./JourneyLandmarks";
import Scenery from "./Scenery";
export default function Environment() {
  return (
    <>
      <JourneyLandmarks />
      <Scenery />
      {milestones.map((m, i) => (
        <Milestone key={m.id} data={m} index={i} />
      ))}
    </>
  );
}
