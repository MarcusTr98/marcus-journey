"use client";

import { Html } from "@react-three/drei";
import { useEffect, useState } from "react";
import type { Milestone as MilestoneType } from "@/types";
import { milestones } from "@/data/milestones";
import { landmarkMeta, type LandmarkKind } from "@/data/landmarks";
import { useJourneyStore } from "@/stores/journeyStore";
import Image from "next/image";

type LandmarkOffset = [number, number];
const beamPositions = [-1.15, 0, 1.15];

function Block({
  position,
  size,
  color,
  glow = false,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  glow?: boolean;
}) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color={color}
        roughness={0.48}
        metalness={glow ? 0.45 : 0.12}
        emissive={glow ? color : "#000"}
        emissiveIntensity={glow ? 0.55 : 0}
      />
    </mesh>
  );
}

function LandmarkStructure({ kind, accent }: { kind: LandmarkKind; accent: string }) {
  switch (kind) {
    case "factory":
      return (
        <group>
          <Block position={[0, 0.8, 0]} size={[3.6, 1.5, 2.5]} color="#58646a" />
          {beamPositions.map((x) => (
            <mesh key={x} position={[x, 1.72, 0]} rotation={[0, 0, Math.PI / 4]}>
              <boxGeometry args={[1.45, 0.12, 2.65]} />
              <meshStandardMaterial color="#F46300" />
            </mesh>
          ))}
          <Block position={[0, 0.38, 1.38]} size={[2.7, 0.45, 0.12]} color="#ffc064" glow />
        </group>
      );
    case "campus":
      return (
        <group>
          <Block position={[0, 0.8, 0]} size={[3.4, 1.55, 2.1]} color="#f2e4ce" />
          <Block position={[0, 1.85, 0]} size={[3.8, 0.32, 2.45]} color="#F46300" />
          {[-1.15, 0, 1.15].map((x) => (
            <Block
              key={x}
              position={[x, 0.85, 1.08]}
              size={[0.55, 0.72, 0.08]}
              color="#0d668d"
              glow
            />
          ))}
        </group>
      );
    case "stage":
      return (
        <group>
          <Block position={[0, 0.22, 0]} size={[3.7, 0.42, 2.7]} color="#20262c" />
          {[-1.6, 1.6].map((x) => (
            <group key={x}>
              <Block position={[x, 1.25, 0]} size={[0.12, 2.5, 0.12]} color="#aeb9bd" />
              <pointLight position={[x, 2.3, 1]} color={accent} intensity={2.2} distance={5} />
            </group>
          ))}
          <Block position={[0, 1.25, -1.05]} size={[2.9, 1.65, 0.12]} color="#351756" glow />
        </group>
      );
    case "lab":
      return (
        <group>
          <Block position={[0, 0.55, 0]} size={[3.3, 1.05, 2.3]} color="#183643" />
          {[-1, 0, 1].map((x, i) => (
            <group key={x} position={[x, 1.35, 0]}>
              <mesh>
                <sphereGeometry args={[0.35, 12, 8]} />
                <meshStandardMaterial
                  color={["#00A859", "#005EB8", "#F46300"][i]}
                  emissiveIntensity={1.2}
                  emissive={["#00A859", "#005EB8", "#F46300"][i]}
                />
              </mesh>
              <Block position={[0, -0.55, 0]} size={[0.09, 0.65, 0.09]} color="#ccd8d8" />
            </group>
          ))}
        </group>
      );
    case "cinema":
      return (
        <group>
          <Block position={[0, 1.05, 0]} size={[3.6, 2.05, 0.28]} color="#0a3044" glow />
          <mesh position={[0, 1.05, 0.2]}>
            <circleGeometry args={[0.58, 3]} />
            <meshStandardMaterial color="#fff4cf" emissive="#fff" emissiveIntensity={1.4} />
          </mesh>
          <Block position={[0, 0.18, 0]} size={[3.9, 0.35, 2.5]} color="#29151c" />
        </group>
      );
    case "electronics":
      return (
        <group>
          {[-1.05, 0, 1.05].map((x, i) => (
            <group key={x} position={[x, 0.8, 0]}>
              <Block
                position={[0, 0, 0]}
                size={[0.85, 1.5, 1.35]}
                color={["#005EB8", "#F46300", "#00A859"][i]}
              />
              <Block position={[0, 0.12, 0.7]} size={[0.58, 0.72, 0.05]} color="#bff5ff" glow />
            </group>
          ))}
          <mesh position={[0, 2, 0]}>
            <torusKnotGeometry args={[0.38, 0.1, 48, 8]} />
            <meshStandardMaterial color="#ffc629" emissive="#F46300" emissiveIntensity={1} />
          </mesh>
        </group>
      );
    case "command":
      return (
        <group>
          <Block position={[0, 0.75, 0]} size={[3.4, 1.4, 2.25]} color="#314f3d" />
          <Block position={[0, 1.2, 1.16]} size={[2.7, 0.72, 0.08]} color="#dcebd7" />
          {[-0.85, 0, 0.85].map((x, i) => (
            <Block
              key={x}
              position={[x, 1.2, 1.22]}
              size={[0.55, 0.1 + 0.18 * i, 0.04]}
              color={accent}
              glow
            />
          ))}
        </group>
      );
    case "security":
      return (
        <group>
          <mesh position={[0, 1.25, 0]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[1.8, 1.8, 0.55]} />
            <meshStandardMaterial color="#123d4a" metalness={0.55} />
          </mesh>
          <mesh position={[0, 1.25, 0.42]}>
            <torusGeometry args={[0.7, 0.1, 8, 24]} />
            <meshStandardMaterial color="#00e38c" emissive="#00A859" emissiveIntensity={2} />
          </mesh>
          <Block position={[0, 0.18, 0]} size={[3, 0.35, 2.4]} color="#17242a" />
        </group>
      );
    case "commerce":
      return (
        <group>
          <Block position={[0, 1, 0]} size={[3.7, 1.9, 2.5]} color="#F46300" />
          {[-1.15, 0, 1.15].map((x, i) => (
            <Block
              key={x}
              position={[x, 1, 1.28]}
              size={[0.72, 1.15, 0.08]}
              color={["#0e87bd", "#151d24", "#00A859"][i]}
              glow
            />
          ))}
          <mesh position={[0, 2.35, 0]} rotation={[0, Math.PI / 4, 0]}>
            <octahedronGeometry args={[0.5]} />
            <meshStandardMaterial color="#fff" emissive="#F46300" emissiveIntensity={2} />
          </mesh>
        </group>
      );
    case "classroom":
      return (
        <group>
          <Block position={[0, 1, -0.75]} size={[3.4, 1.7, 0.15]} color="#123f36" />
          {[-1, 0, 1].map((x) => (
            <group key={x} position={[x, 0.55, 0.45]}>
              <Block position={[0, 0, 0]} size={[0.72, 0.18, 0.7]} color="#a87543" />
              <mesh position={[0, 0.55, 0]}>
                <sphereGeometry args={[0.22, 10, 7]} />
                <meshStandardMaterial color="#e9b77a" />
              </mesh>
            </group>
          ))}
          <mesh position={[0, 1.1, -0.58]}>
            <torusGeometry args={[0.42, 0.09, 8, 20]} />
            <meshStandardMaterial color="#82ffd0" emissive="#00A859" emissiveIntensity={1.4} />
          </mesh>
        </group>
      );
    case "smart-factory":
      return (
        <group>
          {[-1.2, 0, 1.2].map((x, i) => (
            <group key={x}>
              <Block
                position={[x, 0.65 + i * 0.25, 0]}
                size={[0.82, 1.3 + i * 0.5, 1.5]}
                color={["#005EB8", "#132d3a", "#F46300"][i]}
                glow
              />
              <mesh position={[x, 1.6 + i * 0.5, 0]}>
                <sphereGeometry args={[0.18, 10, 8]} />
                <meshStandardMaterial color="#8dffe0" emissive="#00A859" emissiveIntensity={2} />
              </mesh>
            </group>
          ))}
          <Block position={[0, 0.15, 0]} size={[4, 0.28, 2.8]} color="#17242a" />
        </group>
      );
    default:
      return null;
  }
}

function MemoryPostcard({
  data,
  index,
  offset,
}: {
  data: MilestoneType;
  index: number;
  offset: LandmarkOffset;
}) {
  const current = useJourneyStore((s) => s.currentMilestone);
  const vehicleProgress = useJourneyStore((s) => s.vehicleProgress);
  const [visible, setVisible] = useState(false);
  const active = current === index;
  useEffect(() => {
    if (!active) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = window.setTimeout(() => setVisible(false), 3600);
    return () => window.clearTimeout(timer);
  }, [active]);
  if (!visible || vehicleProgress >= 0.985) return null;
  const meta = landmarkMeta[data.id];
  return (
    <Html
      center
      sprite
      position={[offset[0], 4.35, offset[1]]}
      distanceFactor={9}
      zIndexRange={[24, 0]}
    >
      <article
        className="memory-postcard"
        style={{ "--memory-accent": data.accent } as React.CSSProperties}
      >
        <div className={`memory-placeholder memory-${meta.kind}`}>
          {meta.image ? (
            <Image src={meta.image} alt="" fill sizes="290px" />
          ) : (
            <>
              <span>{meta.icon}</span>
              <small>PHOTO PLACEHOLDER</small>
            </>
          )}
          <b className="memory-captured">{String(index + 1).padStart(2, "0")} · MEMORY UNLOCKED</b>
        </div>
      </article>
    </Html>
  );
}

export default function Milestone({ data, index }: { data: MilestoneType; index: number }) {
  if (data.id === "graduation") return null;
  const previous = milestones[Math.max(0, index - 1)].position;
  const next = milestones[Math.min(milestones.length - 1, index + 1)].position;
  const tangentX = next[0] - previous[0],
    tangentZ = next[2] - previous[2];
  const length = Math.hypot(tangentX, tangentZ) || 1;
  const side = index % 2 === 0 ? -1 : 1;
  const clearance = data.id === "graduation" ? 5.6 : data.id === "store" ? 4.8 : 4.2;
  const offset: LandmarkOffset = [
    (-tangentZ / length) * clearance * side,
    (tangentX / length) * clearance * side,
  ];
  const meta = landmarkMeta[data.id];
  return (
    <group position={data.position}>
      <group position={[offset[0], 0, offset[1]]}>
        <mesh position={[0, 0.1, 0]} receiveShadow>
          <cylinderGeometry args={[2.25, 2.55, 0.2, 8]} />
          <meshStandardMaterial color="#111d23" roughness={0.9} />
        </mesh>
        {data.id !== "graduation" && <LandmarkStructure kind={meta.kind} accent={data.accent} />}
      </group>
      <MemoryPostcard data={data} index={index} offset={offset} />
    </group>
  );
}
