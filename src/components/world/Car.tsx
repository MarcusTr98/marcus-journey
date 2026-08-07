"use client";
import type { ThreeElements } from "@react-three/fiber";
import type { RefObject } from "react";
import type * as THREE from "three";
import { useJourneyStore } from "@/stores/journeyStore";
export default function Car({
  groupRef,
  ...props
}: ThreeElements["group"] & { groupRef: RefObject<THREE.Group | null> }) {
  const progress = useJourneyStore((s) => s.progress);
  return (
    <group ref={groupRef} {...props}>
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[1.4, 0.38, 2.3]} />
        <meshStandardMaterial
          color="#F46300"
          roughness={0.38}
          metalness={0.15}
        />
      </mesh>
      <mesh position={[0, 0.94, -0.18]} castShadow>
        <boxGeometry args={[1.15, 0.45, 1.15]} />
        <meshStandardMaterial
          color="#d8e5e9"
          roughness={0.2}
          metalness={0.35}
        />
      </mesh>
      <mesh position={[0, 0.95, 0.42]} rotation={[Math.PI / 2.85, 0, 0]}>
        <boxGeometry args={[1.02, 0.035, 0.5]} />
        <meshStandardMaterial
          color="#123440"
          metalness={0.7}
          roughness={0.12}
        />
      </mesh>
      <mesh position={[0, 0.61, 1.18]}>
        <boxGeometry args={[1.3, 0.16, 0.09]} />
        <meshStandardMaterial color="#162127" metalness={0.7} />
      </mesh>
      {[-0.43, 0.43].map((x) => (
        <mesh key={`lamp-${x}`} position={[x, 0.68, 1.235]}>
          <boxGeometry args={[0.28, 0.13, 0.04]} />
          <meshStandardMaterial
            color="#fff6c5"
            emissive="#ffd96a"
            emissiveIntensity={3}
          />
        </mesh>
      ))}
      {[-0.45, 0.45].map((x) => (
        <mesh key={`tail-${x}`} position={[x, 0.65, -1.19]}>
          <boxGeometry args={[0.23, 0.12, 0.04]} />
          <meshStandardMaterial
            color="#ff2e20"
            emissive="#ff1608"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
      <mesh position={[0, 1.17, -0.16]}>
        <boxGeometry args={[0.72, 0.06, 0.55]} />
        <meshStandardMaterial
          color="#07141b"
          emissive="#005EB8"
          emissiveIntensity={progress > 0.35 ? 2 : 0.1}
        />
      </mesh>
      {[-0.72, 0.72].flatMap((x) =>
        [-0.72, 0.72].map((z) => (
          <mesh
            key={`${x}${z}`}
            position={[x, 0.38, z]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
          >
            <cylinderGeometry args={[0.28, 0.28, 0.22, 12]} />
            <meshStandardMaterial color="#101418" />
          </mesh>
        )),
      )}
      {progress > 0.48 && (
        <mesh position={[0, 1.25, 0]}>
          <sphereGeometry
            args={[1.05, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]}
          />
          <meshStandardMaterial
            color="#005EB8"
            transparent
            opacity={0.18}
            emissive="#005EB8"
            emissiveIntensity={0.8}
          />
        </mesh>
      )}
      {progress > 0.2 && (
        <group position={[0, 1.31, -0.18]}>
          <mesh>
            <boxGeometry args={[1.12, 0.05, 1.28]} />
            <meshStandardMaterial color="#17252b" metalness={0.75} />
          </mesh>
          <mesh position={[-0.34, 0.17, 0]}>
            <boxGeometry args={[0.5, 0.3, 0.72]} />
            <meshStandardMaterial color="#8d5a2b" roughness={0.8} />
          </mesh>
          <mesh position={[0.32, 0.12, 0.12]}>
            <boxGeometry args={[0.42, 0.22, 0.52]} />
            <meshStandardMaterial color="#005EB8" roughness={0.55} />
          </mesh>
        </group>
      )}
      {progress > 0.62 && (
        <group position={[0, 0.93, -1.22]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.25, 0.08, 0.35]} />
            <meshStandardMaterial color="#121c20" metalness={0.75} />
          </mesh>
          <mesh position={[-0.52, 0.2, 0]}>
            <boxGeometry args={[0.06, 0.4, 0.08]} />
            <meshStandardMaterial color="#121c20" />
          </mesh>
          <mesh position={[0.52, 0.2, 0]}>
            <boxGeometry args={[0.06, 0.4, 0.08]} />
            <meshStandardMaterial color="#121c20" />
          </mesh>
        </group>
      )}
      {progress > 0.78 && (
        <group position={[0, 1.75, 0]}>
          <mesh>
            <sphereGeometry args={[0.15, 12, 8]} />
            <meshStandardMaterial color="#00A859" emissive="#00A859" />
          </mesh>
          <mesh position={[0, -0.25, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.5]} />
            <meshStandardMaterial color="#86ffc0" />
          </mesh>
        </group>
      )}
    </group>
  );
}
