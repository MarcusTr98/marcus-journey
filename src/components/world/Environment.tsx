"use client";
import { milestones } from "@/data/milestones";
import Milestone from "./Milestone";
export default function Environment() {
  return (
    <>
      {milestones.map((m, i) => (
        <Milestone key={m.id} data={m} index={i} />
      ))}
      {[...Array(60)].map((_, i) => {
        const x = ((i * 17) % 31) - 15,
          z = -((i * 13) % 145) + 5;
        return (
          <mesh key={i} position={[x, 0.35, z]}>
            <coneGeometry
              args={[0.3 + (i % 3) * 0.12, 0.7 + (i % 2) * 0.3, 5]}
            />
            <meshStandardMaterial color={i % 2 ? "#173c34" : "#1d4c3e"} />
          </mesh>
        );
      })}
    </>
  );
}
