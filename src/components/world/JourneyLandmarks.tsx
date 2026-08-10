"use client";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { useJourneyStore } from "@/stores/journeyStore";
import { FINISH_POSITION, TROPHY_POSITION } from "@/data/journeyPath";
import { graduationCurveProgress } from "./Road";

const labels = {
  vi: {
    start: "GO!",
    congrats: "CHÚC MỪNG TỐT NGHIỆP!",
    sub: "Một hành trình hoàn thành. Một hành trình mới bắt đầu.",
  },
  en: {
    start: "GO!",
    congrats: "CONGRATULATIONS, GRADUATE!",
    sub: "One journey completed. Another begins.",
  },
  zh: {
    start: "GO!",
    congrats: "恭喜毕业！",
    sub: "一段旅程完成，新的旅程启程。",
  },
};
function StartLine() {
  const language = useJourneyStore((s) => s.language),
    t = labels[language];
  return (
    <group position={[0, 0.08, 4.7]}>
      {Array.from({ length: 10 }, (_, x) =>
        Array.from({ length: 2 }, (_, z) => (
          <mesh key={`${x}-${z}`} position={[-1.25 + x * 0.28, 0, z * 0.28 - 0.14]}>
            <boxGeometry args={[0.28, 0.025, 0.28]} />
            <meshStandardMaterial color={(x + z) % 2 ? "#f4f0df" : "#10181b"} />
          </mesh>
        )),
      )}
      <mesh position={[-1.55, 1.45, 0]}>
        <boxGeometry args={[0.1, 2.9, 0.1]} />
        <meshStandardMaterial
          color="#00A859"
          emissive="#00A859"
          emissiveIntensity={0.55}
          metalness={0.45}
        />
      </mesh>
      <mesh position={[1.55, 1.45, 0]}>
        <boxGeometry args={[0.1, 2.9, 0.1]} />
        <meshStandardMaterial
          color="#005EB8"
          emissive="#005EB8"
          emissiveIntensity={0.75}
          metalness={0.45}
        />
      </mesh>
      <mesh position={[0, 2.65, 0]}>
        <boxGeometry args={[3.2, 0.52, 0.16]} />
        <meshStandardMaterial color="#F46300" emissive="#F46300" emissiveIntensity={0.9} />
      </mesh>
      <pointLight position={[0, 2.5, 0.7]} color="#ffb36f" intensity={2.2} distance={6} />
      <Html center position={[0, 2.66, 0.12]} transform distanceFactor={7}>
        <div className="world-label start-label">{t.start}</div>
      </Html>
    </group>
  );
}
function GraduationMonument() {
  return (
    <group position={[TROPHY_POSITION[0], 0.04, TROPHY_POSITION[2]]}>
      <mesh position={[0, 0.16, 0]} receiveShadow>
        <boxGeometry args={[4.4, 0.3, 3.2]} />
        <meshStandardMaterial color="#13242c" roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <boxGeometry args={[3.8, 0.12, 2.7]} />
        <meshStandardMaterial color="#005EB8" metalness={0.3} roughness={0.35} />
      </mesh>
      {[-1.65, 1.65].map((x) => (
        <mesh key={x} position={[x, 1.7, -0.72]} castShadow>
          <boxGeometry args={[0.22, 2.7, 0.22]} />
          <meshStandardMaterial color="#f2ede0" roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 2.95, -0.72]}>
        <boxGeometry args={[3.5, 0.34, 0.28]} />
        <meshStandardMaterial color="#F46300" emissive="#F46300" emissiveIntensity={0.45} />
      </mesh>
      <group position={[0, 1.05, 0.08]} rotation={[-0.2, 0, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.55, 1.05, 0.12]} />
          <meshStandardMaterial color="#f8f2df" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0, 0.075]}>
          <boxGeometry args={[1.25, 0.75, 0.025]} />
          <meshStandardMaterial color="#e4ebea" />
        </mesh>
        <mesh position={[0, 0.2, 0.1]}>
          <boxGeometry args={[0.75, 0.055, 0.02]} />
          <meshStandardMaterial color="#005EB8" />
        </mesh>
        <mesh position={[0, -0.05, 0.1]}>
          <boxGeometry args={[0.95, 0.035, 0.02]} />
          <meshStandardMaterial color="#F46300" />
        </mesh>
      </group>
      <mesh position={[0, 0.55, 0.62]} castShadow>
        <boxGeometry args={[1.8, 0.65, 0.9]} />
        <meshStandardMaterial color="#1b313b" roughness={0.48} />
      </mesh>
      <pointLight position={[0, 2.5, 1]} color="#ffc629" intensity={1.8} distance={6} />
    </group>
  );
}
function GraduationCelebration() {
  const group = useRef<THREE.Group>(null),
    progress = useJourneyStore((s) => s.vehicleProgress),
    language = useJourneyStore((s) => s.language),
    t = labels[language],
    active =
      progress > graduationCurveProgress - 0.008 && progress < graduationCurveProgress + 0.045;
  const pieces = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        x: ((i * 37) % 100) / 12 - 4.1,
        y: 1 + ((i * 53) % 100) / 18,
        z: ((i * 29) % 100) / 20 - 2.5,
        color: ["#F46300", "#005EB8", "#00A859", "#ffd43b", "#f7f2df"][i % 5],
        speed: 0.7 + (i % 7) * 0.1,
      })),
    [],
  );
  useFrame((_, delta) => {
    if (!active || !group.current) return;
    group.current.children.forEach((child, i) => {
      child.position.y -= delta * pieces[i].speed;
      child.rotation.x += delta * (1 + (i % 3));
      child.rotation.z += delta * (1.4 + (i % 4));
      if (child.position.y < 0.1) child.position.y = 5.8;
    });
  });
  return (
    <group visible={active} position={TROPHY_POSITION}>
      <group ref={group}>
        {pieces.map((p, i) => (
          <mesh key={i} position={[p.x, p.y, p.z]} rotation={[i * 0.4, i * 0.2, 0]}>
            <boxGeometry args={[0.12, 0.2, 0.025]} />
            <meshStandardMaterial color={p.color} emissive={p.color} emissiveIntensity={0.25} />
          </mesh>
        ))}
      </group>
      <Html center position={[0, 4.7, 0]} distanceFactor={10}>
        <div className="graduation-message">
          <b>{t.congrats}</b>
          <span>{t.sub}</span>
        </div>
      </Html>
    </group>
  );
}
function FinishFlag() {
  return (
    <group position={FINISH_POSITION}>
      <mesh position={[1.55, 1.65, 0]}>
        <cylinderGeometry args={[0.035, 0.05, 3.3, 10]} />
        <meshStandardMaterial color="#dbe4e2" metalness={0.7} />
      </mesh>
      {Array.from({ length: 6 }, (_, x) =>
        Array.from({ length: 5 }, (_, y) => (
          <mesh key={`${x}-${y}`} position={[1.78 + x * 0.25, 2.8 - y * 0.25, 0]}>
            <boxGeometry args={[0.25, 0.25, 0.04]} />
            <meshStandardMaterial color={(x + y) % 2 ? "#f6f2df" : "#07141b"} />
          </mesh>
        )),
      )}
      <mesh position={[0, 0.04, 0]}>
        <boxGeometry args={[3.4, 0.04, 0.6]} />
        <meshStandardMaterial color="#F46300" emissive="#F46300" emissiveIntensity={0.45} />
      </mesh>
    </group>
  );
}
export default function JourneyLandmarks() {
  return (
    <>
      <StartLine />
      <GraduationMonument />
      <GraduationCelebration />
      <FinishFlag />
    </>
  );
}
