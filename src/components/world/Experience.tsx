"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useEffect } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useJourneyStore } from "@/stores/journeyStore";
const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), { ssr: false });
const Scene = dynamic(() => import("./MarcusJourneyScene"), { ssr: false });

// Redraw when the page scroll changes progress, and let the canvas sleep between updates.
function ScrollFramePump() {
  const invalidate = useThree((state) => state.invalidate);
  useEffect(
    () =>
      useJourneyStore.subscribe((state, previous) => {
        if (
          state.progress !== previous.progress ||
          state.started !== previous.started ||
          state.requestedMilestone !== previous.requestedMilestone
        ) {
          invalidate();
        }
      }),
    [invalidate],
  );
  return null;
}

export default function Experience() {
  const setSceneReady = useJourneyStore((state) => state.setSceneReady);
  return (
    <div className="experience" aria-label="Interactive 3D career journey">
      <Suspense fallback={null}>
        <Canvas
          frameloop="demand"
          camera={{ position: [7, 8, 14], fov: 42 }}
          dpr={[1, 1.25]}
          gl={{ antialias: false, powerPreference: "low-power" }}
          onCreated={({ gl }) => {
            gl.toneMapping = THREE.NeutralToneMapping;
            gl.toneMappingExposure = 1;
            setSceneReady(true);
          }}
          fallback={
            <div className="fallback">
              3D is unavailable. Use Quick Profile to explore Marcus&apos;s work.
            </div>
          }
        >
          <ScrollFramePump />
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
