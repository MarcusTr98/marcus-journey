"use client";
import type { ThreeElements } from "@react-three/fiber";
import type { RefObject } from "react";
import type * as THREE from "three";
import { RoundedBox } from "@react-three/drei";
import { useJourneyStore } from "@/stores/journeyStore";
import { milestones } from "@/data/milestones";
import VehicleUpgradeEffect from "./VehicleUpgradeEffect";
function Wheel({ x, z, upgraded }: { x: number; z: number; upgraded: boolean }) {
  return (
    <group position={[x, 0.38, z]} rotation={[0, 0, Math.PI / 2]}>
      <mesh castShadow>
        <cylinderGeometry args={[upgraded ? 0.34 : 0.27, upgraded ? 0.34 : 0.27, 0.24, 16]} />
        <meshStandardMaterial color="#0a0d0f" roughness={0.88} />
      </mesh>
      <mesh position={[0, 0.125, 0]}>
        <cylinderGeometry args={[upgraded ? 0.2 : 0.15, upgraded ? 0.2 : 0.15, 0.018, 12]} />
        <meshStandardMaterial
          color={upgraded ? "#c8d2d1" : "#596367"}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.025, 10]} />
        <meshStandardMaterial color="#F46300" emissive="#F46300" emissiveIntensity={0.35} />
      </mesh>
    </group>
  );
}
function RoofLoad() {
  return (
    <group position={[0, 1.35, -0.18]}>
      <mesh>
        <boxGeometry args={[1.18, 0.055, 1.35]} />
        <meshStandardMaterial color="#111a1e" metalness={0.75} />
      </mesh>
      {[-0.48, 0.48].map((x) => (
        <mesh key={x} position={[x, 0.13, 0]}>
          <boxGeometry args={[0.045, 0.28, 1.2]} />
          <meshStandardMaterial color="#28343a" metalness={0.7} />
        </mesh>
      ))}
      <RoundedBox
        args={[0.58, 0.34, 0.75]}
        radius={0.08}
        smoothness={2}
        position={[-0.28, 0.23, 0.08]}
      >
        <meshStandardMaterial color="#9c5d29" roughness={0.72} />
      </RoundedBox>
      <RoundedBox
        args={[0.42, 0.27, 0.55]}
        radius={0.06}
        smoothness={2}
        position={[0.35, 0.19, -0.05]}
      >
        <meshStandardMaterial color="#005EB8" roughness={0.5} />
      </RoundedBox>
    </group>
  );
}
function Drone() {
  return (
    <group position={[0, 2.05, -0.05]}>
      <mesh>
        <sphereGeometry args={[0.16, 14, 10]} />
        <meshStandardMaterial color="#00A859" emissive="#00A859" emissiveIntensity={2} />
      </mesh>
      {[-1, 1].map((x) => (
        <group key={x}>
          <mesh position={[x * 0.33, 0, 0]}>
            <boxGeometry args={[0.5, 0.035, 0.035]} />
            <meshStandardMaterial color="#bcd0d2" metalness={0.8} />
          </mesh>
          <mesh position={[x * 0.57, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.16, 0.018, 6, 16]} />
            <meshStandardMaterial color="#82ffd0" emissive="#00A859" emissiveIntensity={1.2} />
          </mesh>
        </group>
      ))}
      <pointLight color="#00A859" intensity={1.3} distance={2.5} />
    </group>
  );
}
export default function Car({
  groupRef,
  ...props
}: ThreeElements["group"] & { groupRef: RefObject<THREE.Group | null> }) {
  const currentMilestone = useJourneyStore((state) => state.currentMilestone),
    stage = Math.min(milestones.length, Math.max(1, currentMilestone + 2)),
    body = stage < 2 ? "#9b6545" : stage < 7 ? "#F46300" : "#ed4e16";
  return (
    <group ref={groupRef} {...props}>
      <VehicleUpgradeEffect>
        <RoundedBox
          args={[1.55, 0.38, 2.48]}
          radius={0.13}
          smoothness={3}
          position={[0, 0.61, 0]}
          castShadow
        >
          <meshStandardMaterial
            color={body}
            roughness={stage > 6 ? 0.25 : 0.52}
            metalness={stage > 6 ? 0.42 : 0.14}
          />
        </RoundedBox>
        <RoundedBox
          args={[1.22, 0.58, 1.25]}
          radius={0.16}
          smoothness={3}
          position={[0, 1.02, -0.2]}
          castShadow
        >
          <meshStandardMaterial
            color={stage < 2 ? "#aeb8b5" : "#c9e3e9"}
            roughness={0.15}
            metalness={0.5}
          />
        </RoundedBox>
        <mesh position={[0, 1.08, 0.41]} rotation={[Math.PI / 2.8, 0, 0]}>
          <boxGeometry args={[1.04, 0.035, 0.53]} />
          <meshPhysicalMaterial
            color="#0b2d3b"
            metalness={0.45}
            roughness={0.08}
            transmission={0.2}
          />
        </mesh>
        {[-0.615, 0.615].map((x) => (
          <mesh key={`sideglass-${x}`} position={[x, 1.06, -0.25]} rotation={[0, Math.PI / 2, 0]}>
            <boxGeometry args={[0.74, 0.32, 0.026]} />
            <meshStandardMaterial color="#123c4b" metalness={0.55} roughness={0.12} />
          </mesh>
        ))}
        <RoundedBox
          args={[1.42, 0.18, 0.72]}
          radius={0.08}
          smoothness={2}
          position={[0, 0.76, 0.91]}
        >
          <meshStandardMaterial color={body} roughness={0.3} metalness={0.3} />
        </RoundedBox>
        <mesh position={[0, 0.57, 1.27]}>
          <boxGeometry args={[1.3, 0.16, 0.08]} />
          <meshStandardMaterial color="#10171a" metalness={0.78} />
        </mesh>
        <mesh position={[0, 0.72, 1.29]}>
          <boxGeometry args={[0.48, 0.15, 0.035]} />
          <meshStandardMaterial color="#1c262a" metalness={0.8} />
        </mesh>
        {[-0.43, 0.43].map((x) => (
          <group key={`head-${x}`} position={[x, 0.78, 1.305]}>
            <mesh>
              <boxGeometry args={[0.3, 0.14, 0.035]} />
              <meshStandardMaterial
                color="#fff4bd"
                emissive="#ffd55e"
                emissiveIntensity={stage > 4 ? 4 : 1.5}
              />
            </mesh>
            {stage > 4 && <pointLight color="#ffd77a" intensity={0.7} distance={3} />}
          </group>
        ))}
        {[-0.47, 0.47].map((x) => (
          <mesh key={`tail-${x}`} position={[x, 0.69, -1.255]}>
            <boxGeometry args={[0.24, 0.13, 0.035]} />
            <meshStandardMaterial color="#ff2418" emissive="#ff1608" emissiveIntensity={2.5} />
          </mesh>
        ))}
        {[-0.78, 0.78].flatMap((x) =>
          [-0.77, 0.77].map((z) => <Wheel key={`${x}-${z}`} x={x} z={z} upgraded={stage > 1} />),
        )}
        {stage > 1 && (
          <group position={[-0.79, 0.86, -0.36]}>
            <RoundedBox args={[0.18, 0.38, 0.72]} radius={0.04} smoothness={2}>
              <meshStandardMaterial color="#d68a22" roughness={0.58} metalness={0.25} />
            </RoundedBox>
            <mesh position={[-0.105, 0.08, 0]}>
              <boxGeometry args={[0.025, 0.06, 0.45]} />
              <meshStandardMaterial color="#ffe0a0" emissive="#F46300" emissiveIntensity={0.35} />
            </mesh>
          </group>
        )}
        {stage > 2 && (
          <mesh position={[0, 1.29, 0.04]}>
            <boxGeometry args={[0.78, 0.055, 0.55]} />
            <meshStandardMaterial color="#07141b" emissive="#005EB8" emissiveIntensity={1.5} />
          </mesh>
        )}
        {stage > 3 && <RoofLoad />}
        {stage > 5 && (
          <group position={[0, 0.58, -1.28]}>
            <mesh>
              <boxGeometry args={[1.42, 0.12, 0.22]} />
              <meshStandardMaterial color="#182328" metalness={0.85} />
            </mesh>
            {[-0.58, 0.58].map((x) => (
              <mesh key={x} position={[x, 0.16, 0]}>
                <cylinderGeometry args={[0.055, 0.055, 0.32, 10]} />
                <meshStandardMaterial color="#cbd3d3" metalness={0.9} />
              </mesh>
            ))}
          </group>
        )}
        {stage > 6 && (
          <mesh position={[0, 1.15, 0]}>
            <sphereGeometry args={[1.18, 24, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshPhysicalMaterial
              color="#005EB8"
              transparent
              opacity={0.16}
              roughness={0.05}
              transmission={0.45}
              emissive="#005EB8"
              emissiveIntensity={0.75}
            />
          </mesh>
        )}
        {stage > 7 && (
          <>
            {[-0.82, 0.82].map((x) => (
              <mesh key={`skirt-${x}`} position={[x, 0.55, 0]}>
                <boxGeometry args={[0.09, 0.15, 2.05]} />
                <meshStandardMaterial color="#172227" metalness={0.82} />
              </mesh>
            ))}
          </>
        )}
        {stage > 8 && (
          <group position={[0, 0.97, -1.23]}>
            <mesh>
              <boxGeometry args={[1.28, 0.08, 0.42]} />
              <meshStandardMaterial color="#10191d" metalness={0.88} />
            </mesh>
            {[-0.52, 0.52].map((x) => (
              <mesh key={x} position={[x, -0.18, 0]}>
                <boxGeometry args={[0.06, 0.4, 0.08]} />
                <meshStandardMaterial color="#10191d" />
              </mesh>
            ))}
          </group>
        )}
        {stage > 9 && <Drone />}
        {stage > 10 && (
          <>
            <mesh position={[0, 0.34, 1.22]}>
              <boxGeometry args={[1.48, 0.06, 0.32]} />
              <meshStandardMaterial color="#00A859" emissive="#00A859" emissiveIntensity={1.1} />
            </mesh>
            <pointLight position={[0, 0.55, 0]} color="#F46300" intensity={1.2} distance={3} />
          </>
        )}
      </VehicleUpgradeEffect>
    </group>
  );
}
