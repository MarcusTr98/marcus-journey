"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { useJourneyStore } from "@/stores/journeyStore";

const RING_DELAYS = [0, 0.12, 0.24];
const EFFECT_DURATION = 1.35;

export default function VehicleUpgradeEffect({ children }: { children: ReactNode }) {
  const currentMilestone = useJourneyStore((state) => state.currentMilestone);
  const model = useRef<THREE.Group>(null);
  const rings = useRef<Array<THREE.Mesh | null>>([]);
  const ringMaterials = useRef<Array<THREE.MeshBasicMaterial | null>>([]);
  const glow = useRef<THREE.PointLight>(null);
  const elapsed = useRef(EFFECT_DURATION);
  const previousMilestone = useRef(-1);

  useEffect(() => {
    if (currentMilestone >= 0 && currentMilestone !== previousMilestone.current) {
      elapsed.current = 0;
      previousMilestone.current = currentMilestone;
    }
  }, [currentMilestone]);

  useFrame((_, delta) => {
    elapsed.current = Math.min(EFFECT_DURATION, elapsed.current + delta);
    const time = elapsed.current;
    const active = time < EFFECT_DURATION;

    if (model.current) {
      const jumpProgress = Math.min(time / 0.72, 1);
      const jump = active ? Math.sin(jumpProgress * Math.PI) * 0.62 : 0;
      model.current.position.y = THREE.MathUtils.damp(model.current.position.y, jump, 14, delta);
      model.current.rotation.z = active
        ? Math.sin(time * 11) * 0.025 * (1 - time / EFFECT_DURATION)
        : 0;
      const pulse = active ? 1 + Math.sin(Math.min(time / 0.58, 1) * Math.PI) * 0.08 : 1;
      model.current.scale.setScalar(THREE.MathUtils.damp(model.current.scale.x, pulse, 12, delta));
    }

    RING_DELAYS.forEach((delay, index) => {
      const ring = rings.current[index];
      const material = ringMaterials.current[index];
      if (!ring || !material) return;
      const local = (time - delay) / 0.82;
      const visible = local >= 0 && local <= 1;
      ring.visible = visible;
      if (visible) {
        const scale = 0.45 + local * 1.7;
        ring.scale.setScalar(scale);
        ring.position.y = 0.12 + local * 0.62;
        ring.rotation.z += delta * (2.2 + index * 0.45);
        material.opacity = Math.sin(local * Math.PI) * 0.9;
      }
    });

    if (glow.current) {
      glow.current.intensity = active ? Math.sin(Math.min(time / 0.7, 1) * Math.PI) * 5 : 0;
    }
  });

  return (
    <group>
      <group ref={model}>{children}</group>
      {RING_DELAYS.map((_, index) => (
        <mesh
          key={index}
          ref={(node) => {
            rings.current[index] = node;
          }}
          rotation={[Math.PI / 2, 0, 0]}
          visible={false}
        >
          <torusGeometry args={[1.05, 0.035, 8, 48]} />
          <meshBasicMaterial
            ref={(node) => {
              ringMaterials.current[index] = node;
            }}
            color={index === 1 ? "#dff8ff" : "#ffffff"}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
      <pointLight ref={glow} color="#ffffff" intensity={0} distance={5} position={[0, 1, 0]} />
    </group>
  );
}
