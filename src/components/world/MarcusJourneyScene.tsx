"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment as DreiEnvironment, PerformanceMonitor, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import Car from "./Car";
import Road, { graduationCurveProgress, milestoneCurveProgress, routeCurve } from "./Road";
import WorldEnvironment from "./Environment";
import { useJourneyStore } from "@/stores/journeyStore";
import { TROPHY_POSITION } from "@/data/journeyPath";
import { milestones } from "@/data/milestones";

const TROPHY_CAMERA_POSITION = new THREE.Vector3(8.6, 7.2, TROPHY_POSITION[2] + 11);
const TROPHY_FOCUS = new THREE.Vector3(0, 1, TROPHY_POSITION[2]);
const MAX_PROGRESS_PER_SECOND = 0.052;
const CHECKPOINT_HOLD_SECONDS = 1.5;
const STAGE_SKY = {
  foundation: new THREE.Color("#07141b"),
  transformation: new THREE.Color("#071923"),
  present: new THREE.Color("#081d22"),
  destination: new THREE.Color("#0b1828"),
};

export default function MarcusJourneyScene() {
  const car = useRef<THREE.Group>(null);
  const focus = useRef(new THREE.Vector3(0, 0, 0));
  const actualProgress = useRef(0);
  const checkpointHold = useRef(0);
  const { camera, scene } = useThree();
  const progress = useJourneyStore((s) => s.progress);
  const quality = useJourneyStore((s) => s.quality);
  const setQuality = useJourneyStore((s) => s.setQuality);
  useFrame((_, delta) => {
    if (!car.current) return;
    const journeyState = useJourneyStore.getState();
    const stage = milestones[Math.max(0, journeyState.currentMilestone)]?.stage ?? "foundation";
    if (scene.background instanceof THREE.Color) {
      scene.background.lerp(STAGE_SKY[stage], 1 - Math.exp(-delta * 0.7));
    }
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerp(STAGE_SKY[stage], 1 - Math.exp(-delta * 0.7));
    }
    if (journeyState.requestedMilestone !== null) {
      const requestedIndex = journeyState.requestedMilestone;
      actualProgress.current = milestoneCurveProgress[requestedIndex];
      checkpointHold.current = CHECKPOINT_HOLD_SECONDS;
      journeyState.setCurrentMilestone(requestedIndex);
      journeyState.requestMilestone(null);
    }
    checkpointHold.current = Math.max(0, checkpointHold.current - delta);
    const nextIndex = journeyState.currentMilestone + 1;
    const nextCheckpoint = milestoneCurveProgress[nextIndex];
    const drivingForward = progress > actualProgress.current;

    if (checkpointHold.current <= 0) {
      const dampedProgress = THREE.MathUtils.damp(actualProgress.current, progress, 4.2, delta);
      const checkpointDistance =
        drivingForward && nextCheckpoint !== undefined
          ? nextCheckpoint - actualProgress.current
          : Number.POSITIVE_INFINITY;
      const approachFactor = THREE.MathUtils.smoothstep(checkpointDistance, 0.0015, 0.018);
      const maxStep =
        MAX_PROGRESS_PER_SECOND * THREE.MathUtils.lerp(0.34, 1, approachFactor) * delta;
      const proposed =
        actualProgress.current +
        THREE.MathUtils.clamp(dampedProgress - actualProgress.current, -maxStep, maxStep);

      if (
        drivingForward &&
        nextCheckpoint !== undefined &&
        progress >= nextCheckpoint &&
        proposed >= nextCheckpoint - 0.00035
      ) {
        actualProgress.current = nextCheckpoint;
        checkpointHold.current = CHECKPOINT_HOLD_SECONDS;
        journeyState.setCurrentMilestone(nextIndex);
      } else {
        actualProgress.current = proposed;
      }
    }
    const p = THREE.MathUtils.clamp(actualProgress.current, 0, 0.998);
    if (Math.abs(journeyState.vehicleProgress - p) > 0.00025) {
      journeyState.setVehicleProgress(p);
    }
    const point = routeCurve.getPointAt(p);
    const tangent = routeCurve.getTangentAt(p);
    car.current.position.copy(point);
    const desiredRotation = Math.atan2(tangent.x, tangent.z);
    const angleDelta = Math.atan2(
      Math.sin(desiredRotation - car.current.rotation.y),
      Math.cos(desiredRotation - car.current.rotation.y),
    );
    car.current.rotation.y += angleDelta * (1 - Math.exp(-delta * 7));
    const isAtGraduation =
      p > graduationCurveProgress - 0.008 && p < graduationCurveProgress + 0.045;
    const roadNormal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
    const chaseTarget = point
      .clone()
      .addScaledVector(tangent, -9.5)
      .addScaledVector(roadNormal, 4.8)
      .add(new THREE.Vector3(0, 7.2, 0));
    const lookAhead = routeCurve.getPointAt(Math.min(0.998, p + 0.014));
    const target = isAtGraduation ? TROPHY_CAMERA_POSITION : chaseTarget;
    camera.position.lerp(target, 1 - Math.exp(-delta * 3.5));
    focus.current.lerp(
      isAtGraduation ? TROPHY_FOCUS : lookAhead.setY(0.65),
      1 - Math.exp(-delta * 5),
    );
    camera.lookAt(focus.current);
  });
  return (
    <>
      <PerformanceMonitor onDecline={() => setQuality("low")} flipflops={2} />
      <color attach="background" args={["#07141b"]} />
      <fog attach="fog" args={["#07141b", 14, 44]} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[8, 14, 6]} intensity={2.2} castShadow={quality === "high"} />
      {quality === "high" && <Stars radius={55} depth={25} count={900} factor={2} />}
      <DreiEnvironment preset="warehouse" environmentIntensity={0.25} />
      <Road />
      <WorldEnvironment />
      <Car groupRef={car} />
    </>
  );
}
