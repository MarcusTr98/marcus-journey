"use client";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type * as THREE from "three";
import { useJourneyStore } from "@/stores/journeyStore";
import { FINISH_POSITION, MINOR_LEARNING_POSITION, TROPHY_POSITION } from "@/data/journeyPath";
import {
  graduationCurveProgress,
  milestoneCurveProgress,
  routeCurve,
} from "./Road";
import { milestones } from "@/data/milestones";

const fptPosition = routeCurve.getPointAt(
  milestoneCurveProgress[milestones.findIndex(({ id }) => id === "fpt")],
);
const graduationPosition = routeCurve.getPointAt(graduationCurveProgress);
const celebrationColors = ["#ff4fa3", "#ffd43b", "#64e7ff", "#8b5cf6", "#ff6b35"];

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
      {[-1.15, 1.15].map((x, index) => (
        <group key={x} position={[x, 1.1, 0.2]} rotation={[0, 0, x * -0.18]}>
          <mesh rotation={[0, 0, index ? -0.48 : 0.48]}>
            <coneGeometry args={[0.55, 4.2, 18, 1, true]} />
            <meshBasicMaterial
              color={index ? "#64e7ff" : "#ffd43b"}
              transparent
              opacity={0.22}
              depthWrite={false}
            />
          </mesh>
          <pointLight
            position={[0, 1.8, 0]}
            color={index ? "#64e7ff" : "#ffd43b"}
            intensity={2.8}
            distance={7}
          />
        </group>
      ))}
      <Html center position={[0, 2.66, 0.12]} transform distanceFactor={7}>
        <div className="world-label start-label">{t.start}</div>
      </Html>
    </group>
  );
}

function StartCelebration() {
  const group = useRef<THREE.Group>(null);
  const elapsed = useRef(0);
  const started = useJourneyStore((s) => s.started);
  const progress = useJourneyStore((s) => s.vehicleProgress);
  const active = started && progress < 0.045;
  const particles = useMemo(
    () =>
      Array.from({ length: 54 }, (_, index) => {
        return {
          x: ((index * 37) % 100) / 12 - 4.1,
          z: ((index * 29) % 100) / 24 - 2.1,
          delay: ((index * 13) % 31) / 31,
          speed: 0.18 + (index % 5) * 0.025,
          sway: 0.35 + (index % 4) * 0.12,
          color: celebrationColors[index % celebrationColors.length],
        };
      }),
    [],
  );
  useFrame((_, delta) => {
    if (!active || !group.current) return;
    elapsed.current += delta;
    group.current.children.forEach((child, index) => {
      const particle = particles[index];
      const phase = (elapsed.current * particle.speed + particle.delay) % 1;
      child.position.set(
        particle.x + Math.sin(phase * Math.PI * 4 + index) * particle.sway,
        6.4 - phase * 6.1,
        particle.z,
      );
      child.rotation.x += delta * (1.5 + (index % 3));
      child.rotation.z += delta * (2 + (index % 5) * 0.3);
    });
  });
  return (
    <group visible={active} position={[0, 0, 4.7]}>
      <group ref={group}>
        {particles.map((particle, index) => (
          <mesh key={index}>
            <boxGeometry args={[0.12, 0.24, 0.025]} />
            <meshStandardMaterial
              color={particle.color}
              emissive={particle.color}
              emissiveIntensity={0.65}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function MinorLearningCheckpoint() {
  const language = useJourneyStore((state) => state.language);
  const label = {
    vi: "CLB IT · WORKSHOP · MINI PROJECTS",
    en: "IT CLUB · WORKSHOPS · MINI PROJECTS",
    zh: "IT俱乐部 · 技术工坊 · 小型项目",
  }[language];
  return (
    <group position={MINOR_LEARNING_POSITION}>
      <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.15, 0.055, 8, 40]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1.6} />
      </mesh>
      {[-0.7, 0, 0.7].map((x, index) => (
        <mesh key={x} position={[x, 0.42, 0]} rotation={[0, 0, Math.PI / 4]}>
          <octahedronGeometry args={[0.18]} />
          <meshStandardMaterial
            color={celebrationColors[index]}
            emissive={celebrationColors[index]}
            emissiveIntensity={1.4}
          />
        </mesh>
      ))}
      <Html center sprite position={[0, 1.15, 0]} distanceFactor={7} zIndexRange={[10, 0]}>
        <div className="world-label">+ LEVEL · {label}</div>
      </Html>
    </group>
  );
}

function BuntingGate({ position }: { position: { x: number; z: number } }) {
  const colors = ["#ff4fa3", "#ffd43b", "#00c98d", "#4ea5ff", "#8b5cf6", "#ff6b35"];
  return (
    <group position={[position.x, 0.04, position.z]}>
      {[-1.72, 1.72].map((x) => (
        <mesh key={x} position={[x, 1.45, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.06, 2.9, 10]} />
          <meshStandardMaterial color="#f2eee2" metalness={0.35} />
        </mesh>
      ))}
      <mesh position={[0, 2.82, 0]}>
        <boxGeometry args={[3.45, 0.035, 0.035]} />
        <meshStandardMaterial color="#f6ead2" />
      </mesh>
      {colors.map((color, index) => (
        <mesh key={color} position={[-1.38 + index * 0.55, 2.58, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.2, 0.48, 3]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
        </mesh>
      ))}
    </group>
  );
}
function GraduationMonument() {
  const cap = useRef<THREE.Group>(null);
  const diploma = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (cap.current) {
      cap.current.position.y = 2.45 + Math.sin(time * 1.35) * 0.16;
      cap.current.rotation.y = time * 0.72;
    }
    if (diploma.current) {
      diploma.current.position.y = 2.18 + Math.sin(time * 1.1 + 1.4) * 0.13;
      diploma.current.rotation.y = -time * 0.58;
    }
  });
  return (
    <group
      position={[TROPHY_POSITION[0] - 1.7, 0.04, TROPHY_POSITION[2] - 0.7]}
      rotation={[0, -0.08, 0]}
    >
      <mesh position={[0, 0.16, 0]} receiveShadow>
        <boxGeometry args={[4.7, 0.3, 3.15]} />
        <meshStandardMaterial color="#8d1723" roughness={0.58} />
      </mesh>
      <mesh position={[0, 0.39, 0]} castShadow>
        <boxGeometry args={[4.15, 0.18, 2.7]} />
        <meshStandardMaterial color="#ef3340" metalness={0.18} roughness={0.34} />
      </mesh>
      <mesh position={[0, 0.73, 0]} castShadow>
        <boxGeometry args={[3.35, 0.52, 2.05]} />
        <meshStandardMaterial color="#ff5a4e" metalness={0.15} roughness={0.32} />
      </mesh>
      <mesh position={[0, 1.02, 0]} castShadow>
        <boxGeometry args={[2.95, 0.09, 1.72]} />
        <meshStandardMaterial color="#ffd447" emissive="#ff9d2e" emissiveIntensity={0.3} />
      </mesh>
      <group ref={diploma} position={[-0.83, 2.18, 0.1]} rotation={[-0.12, 0, -0.08]}>
        <mesh castShadow>
          <boxGeometry args={[1.45, 0.98, 0.1]} />
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
      <group ref={cap} position={[0.82, 2.45, 0.08]} rotation={[0, 0, 0]}>
        <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
          <boxGeometry args={[1.05, 0.1, 1.05]} />
          <meshStandardMaterial color="#102d4a" roughness={0.38} />
        </mesh>
        <mesh position={[0, -0.2, 0]} castShadow>
          <boxGeometry args={[0.5, 0.35, 0.5]} />
          <meshStandardMaterial color="#163d63" />
        </mesh>
        <mesh position={[0.48, -0.25, 0.15]} rotation={[0, 0, -0.45]}>
          <cylinderGeometry args={[0.025, 0.025, 0.72, 8]} />
          <meshStandardMaterial color="#ffc629" />
        </mesh>
        <mesh position={[0.62, -0.55, 0.15]}>
          <sphereGeometry args={[0.08, 10, 8]} />
          <meshStandardMaterial color="#ffc629" emissive="#F46300" emissiveIntensity={0.5} />
        </mesh>
      </group>
      {[-1.45, 1.45].map((x) => (
        <mesh key={x} position={[x, 3.35, 0]} rotation={[0, 0, x < 0 ? -0.34 : 0.34]}>
          <coneGeometry args={[0.7, 4.6, 20, 1, true]} />
          <meshBasicMaterial color="#fff3bd" transparent opacity={0.075} depthWrite={false} />
        </mesh>
      ))}
      <pointLight position={[-1.2, 3.4, 0.5]} color="#fff1b8" intensity={2.6} distance={7} />
      <pointLight position={[1.2, 3.4, 0.5]} color="#ffd66b" intensity={2.3} distance={7} />
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
      <StartCelebration />
      <BuntingGate position={fptPosition} />
      <BuntingGate position={graduationPosition} />
      <MinorLearningCheckpoint />
      <GraduationMonument />
      <GraduationCelebration />
      <FinishFlag />
    </>
  );
}
