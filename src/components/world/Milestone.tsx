"use client";
import type { Milestone as MilestoneType } from "@/types";
export default function Milestone({ data, index }: { data: MilestoneType; index: number }) {
  return (
    <group position={data.position}>
      <mesh position={[index % 2 ? 2.2 : -2.2, 0.55, 0]} castShadow>
        <boxGeometry args={[2.6, 1.1, 2.6]} />
        <meshStandardMaterial color={data.accent} roughness={0.65} />
      </mesh>
      <mesh position={[index % 2 ? 2.2 : -2.2, 1.5, 0]}>
        <octahedronGeometry args={[0.38]} />
        <meshStandardMaterial color="#ffffff" emissive={data.accent} emissiveIntensity={1.5} />
      </mesh>
      {[...Array(3)].map((_, i) => (
        <mesh key={i} position={[index % 2 ? 3.8 : -3.8, 0.3, i * 0.7 - 1]}>
          <boxGeometry args={[0.45, 0.6, 0.45]} />
          <meshStandardMaterial color="#405159" />
        </mesh>
      ))}
    </group>
  );
}
