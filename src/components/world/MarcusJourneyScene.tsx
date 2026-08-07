"use client";
import { useFrame, useThree } from "@react-three/fiber";
import { Environment as DreiEnvironment, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import Car from "./Car";
import Road, { routeCurve } from "./Road";
import WorldEnvironment from "./Environment";
import { useJourneyStore } from "@/stores/journeyStore";

const TROPHY_CAMERA_POSITION = new THREE.Vector3(7.2, 6.6, -97.5);
const TROPHY_FOCUS = new THREE.Vector3(0.4, 0.8, -107);

export default function MarcusJourneyScene() {
  const car = useRef<THREE.Group>(null);
  const focus = useRef(new THREE.Vector3(0, 0, 0));
  const { camera } = useThree();
  const progress = useJourneyStore((s) => s.progress);
  const quality = useJourneyStore((s) => s.quality);
  useFrame((_, delta) => {
    if (!car.current) return;
    const p = Math.min(0.995, progress);
    const point = routeCurve.getPointAt(p);
    const tangent = routeCurve.getTangentAt(p);
    car.current.position.lerp(point, 1 - Math.exp(-delta * 6));
    const desiredRotation = Math.atan2(tangent.x, tangent.z);
    const angleDelta = Math.atan2(
      Math.sin(desiredRotation - car.current.rotation.y),
      Math.cos(desiredRotation - car.current.rotation.y),
    );
    car.current.rotation.y += angleDelta * (1 - Math.exp(-delta * 7));
    const isAtGraduation = progress > 0.75 && progress < 0.89;
    const target = isAtGraduation
      ? TROPHY_CAMERA_POSITION
      : point.clone().add(new THREE.Vector3(7, 8, 10));
    camera.position.lerp(target, 1 - Math.exp(-delta * 2.8));
    focus.current.lerp(
      isAtGraduation ? TROPHY_FOCUS : new THREE.Vector3(point.x, point.y, point.z - 2),
      1 - Math.exp(-delta * 4),
    );
    camera.lookAt(focus.current);
  });
  return (
    <>
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
