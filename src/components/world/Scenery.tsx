"use client";

import { useMemo } from "react";
import { useJourneyStore } from "@/stores/journeyStore";

const FOLIAGE = ["#1d5c46", "#267256", "#318262", "#174938"];

function LowPolyTree({
  position,
  scale,
  tone,
  shadows,
}: {
  position: [number, number, number];
  scale: number;
  tone: number;
  shadows: boolean;
}) {
  const color = FOLIAGE[tone % FOLIAGE.length];
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.55, 0]} castShadow={shadows}>
        <cylinderGeometry args={[0.09, 0.15, 1.1, 7]} />
        <meshStandardMaterial color="#68462f" roughness={1} />
      </mesh>
      <mesh position={[0, 1.35, 0]} castShadow={shadows}>
        <coneGeometry args={[0.68, 1.45, 7]} />
        <meshStandardMaterial color={color} roughness={0.92} flatShading />
      </mesh>
      <mesh position={[0, 2.05, 0]} castShadow={shadows}>
        <coneGeometry args={[0.48, 1.18, 7]} />
        <meshStandardMaterial
          color={FOLIAGE[(tone + 1) % FOLIAGE.length]}
          roughness={0.9}
          flatShading
        />
      </mesh>
      <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.72, 9]} />
        <meshStandardMaterial color="#15382e" roughness={1} />
      </mesh>
    </group>
  );
}

function Rock({ position, scale }: { position: [number, number, number]; scale: number }) {
  return (
    <mesh
      position={position}
      scale={[scale, scale * 0.65, scale]}
      rotation={[0.1, scale * 2, -0.08]}
      castShadow
    >
      <dodecahedronGeometry args={[0.48, 0]} />
      <meshStandardMaterial color="#53636a" roughness={0.96} flatShading />
    </mesh>
  );
}

export default function Scenery() {
  const quality = useJourneyStore((state) => state.quality);
  const treeCount = quality === "high" ? 66 : 38;
  const trees = useMemo(
    () =>
      Array.from({ length: treeCount }, (_, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        return {
          position: [side * (6 + ((index * 7) % 7)), 0, 3 - index * (140 / treeCount)] as [
            number,
            number,
            number,
          ],
          scale: 0.72 + ((index * 11) % 9) * 0.055,
          tone: index,
        };
      }),
    [treeCount],
  );
  const rocks = useMemo(
    () =>
      Array.from({ length: quality === "high" ? 24 : 12 }, (_, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        return {
          position: [side * (5.4 + ((index * 5) % 8)), 0.28, -2 - index * 5.6] as [
            number,
            number,
            number,
          ],
          scale: 0.45 + (index % 4) * 0.12,
        };
      }),
    [quality],
  );

  return (
    <group>
      {trees.map((tree, index) => (
        <LowPolyTree key={`tree-${index}`} {...tree} shadows={quality === "high"} />
      ))}
      {rocks.map((rock, index) => (
        <Rock key={`rock-${index}`} {...rock} />
      ))}
    </group>
  );
}
