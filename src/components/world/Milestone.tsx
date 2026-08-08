"use client";

import type { Milestone as MilestoneType } from "@/types";
import { milestones } from "@/data/milestones";

type LandmarkOffset = [number, number];

function StoreLandmark({ offset }: { offset: LandmarkOffset }) {
  return (
    <group position={[offset[0], 0, offset[1]]}>
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[4.2, 0.24, 3.5]} />
        <meshStandardMaterial color="#111d23" roughness={0.88} />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow>
        <boxGeometry args={[2.65, 1.85, 2.35]} />
        <meshStandardMaterial color="#F46300" roughness={0.38} metalness={0.18} />
      </mesh>
      <mesh position={[0, 1.08, 1.19]}>
        <boxGeometry args={[2.2, 1.25, 0.05]} />
        <meshStandardMaterial color="#0c3a50" emissive="#005EB8" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, 1.78, 1.35]} rotation={[0.14, 0, 0]}>
        <boxGeometry args={[3.15, 0.16, 0.65]} />
        <meshStandardMaterial color="#f7c45c" emissive="#F46300" emissiveIntensity={0.45} />
      </mesh>
      {[-1.55, 1.55].map((x, index) => (
        <group key={x} position={[x, 0, -0.2]}>
          <mesh position={[0, 0.72, 0]} castShadow>
            <boxGeometry args={[0.65, 1.42, 1.5]} />
            <meshStandardMaterial color={index ? "#005EB8" : "#00A859"} roughness={0.42} />
          </mesh>
          {[0.35, 0.72, 1.08].map((y) => (
            <mesh key={y} position={[0, y, 0.77]}>
              <boxGeometry args={[0.42, 0.08, 0.03]} />
              <meshStandardMaterial color="#d8fbff" emissive="#ffffff" emissiveIntensity={0.8} />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, 2.35, 0]} rotation={[0, Math.PI / 4, 0]}>
        <octahedronGeometry args={[0.48]} />
        <meshStandardMaterial color="#ffffff" emissive="#F46300" emissiveIntensity={1.8} />
      </mesh>
      <pointLight position={[0, 2.2, 1.8]} color="#ff9b55" intensity={1.7} distance={6} />
    </group>
  );
}

function StandardLandmark({ data, offset }: { data: MilestoneType; offset: LandmarkOffset }) {
  return (
    <group position={[offset[0], 0, offset[1]]}>
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[2.6, 1.1, 2.6]} />
        <meshStandardMaterial color={data.accent} roughness={0.65} />
      </mesh>
      <mesh position={[0, 1.5, 0]}>
        <octahedronGeometry args={[0.38]} />
        <meshStandardMaterial color="#ffffff" emissive={data.accent} emissiveIntensity={1.5} />
      </mesh>
      {[...Array(3)].map((_, index) => (
        <mesh key={index} position={[1.65, 0.3, index * 0.7 - 1]}>
          <boxGeometry args={[0.45, 0.6, 0.45]} />
          <meshStandardMaterial color="#405159" />
        </mesh>
      ))}
    </group>
  );
}

export default function Milestone({ data, index }: { data: MilestoneType; index: number }) {
  const previous = milestones[Math.max(0, index - 1)].position;
  const next = milestones[Math.min(milestones.length - 1, index + 1)].position;
  const tangentX = next[0] - previous[0];
  const tangentZ = next[2] - previous[2];
  const length = Math.hypot(tangentX, tangentZ) || 1;
  const side = index % 2 === 0 ? -1 : 1;
  const clearance = data.id === "store" ? 5.4 : 4.6;
  const offset: LandmarkOffset = [
    (-tangentZ / length) * clearance * side,
    (tangentX / length) * clearance * side,
  ];
  return (
    <group position={data.position}>
      {data.id === "store" ? (
        <StoreLandmark offset={offset} />
      ) : (
        <StandardLandmark data={data} offset={offset} />
      )}
    </group>
  );
}
