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
          {[-1.25, 1.25].map((x) => (
            <group key={x} position={[x, 2.65, -0.9]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.26, 0.38, 2.2, 10]} />
                <meshStandardMaterial color="#d5dadd" roughness={0.55} />
              </mesh>
              <mesh position={[0, 1.18, 0]}>
                <cylinderGeometry args={[0.3, 0.24, 0.2, 10]} />
                <meshStandardMaterial color="#F46300" />
              </mesh>
            </group>
          ))}
        </group>
      );
    case "campus":
      return (
        <group>
          <Block position={[0, 0.8, 0]} size={[3.4, 1.55, 2.1]} color="#f2e4ce" />
          <Block position={[0, 1.85, 0]} size={[3.8, 0.32, 2.45]} color="#F46300" />
          {[-1.15, 0, 1.15].map((x, index) => (
            <Block
              key={x}
              position={[x, 0.85, 1.08]}
              size={[0.55, 0.72, 0.08]}
              color={["#F37021", "#00A859", "#005EB8"][index]}
              glow
            />
          ))}
          <Block position={[-1.15, 0.18, 1.2]} size={[1.05, 0.18, 0.5]} color="#F37021" />
          <Block position={[0, 0.18, 1.2]} size={[1.05, 0.18, 0.5]} color="#00A859" />
          <Block position={[1.15, 0.18, 1.2]} size={[1.05, 0.18, 0.5]} color="#005EB8" />
          <group position={[-0.95, 2.55, 0.35]}>
            <Block position={[0, 0, 0]} size={[0.18, 0.9, 0.28]} color="#F37021" />
            <Block position={[0.3, 0.36, 0]} size={[0.55, 0.18, 0.28]} color="#F37021" />
            <Block position={[0.3, 0, 0]} size={[0.48, 0.18, 0.28]} color="#F37021" />
            <Block position={[0.78, 0, 0]} size={[0.18, 0.9, 0.28]} color="#00A859" />
            <Block position={[1.03, 0.36, 0]} size={[0.5, 0.18, 0.28]} color="#00A859" />
            <Block position={[1.03, 0, 0]} size={[0.44, 0.18, 0.28]} color="#00A859" />
            <Block position={[1.5, 0.36, 0]} size={[0.72, 0.18, 0.28]} color="#005EB8" />
            <Block position={[1.5, -0.02, 0]} size={[0.18, 0.75, 0.28]} color="#005EB8" />
          </group>
        </group>
      );
    case "stage":
      return (
        <group>
          <Block position={[0, 0.22, 0]} size={[4.5, 0.42, 3.2]} color="#0b2f26" />
          {[-1.95, 1.95].map((x) => (
            <group key={x}>
              <Block position={[x, 1.55, 0]} size={[0.14, 3.1, 0.14]} color="#b9cbc5" />
              <pointLight position={[x, 2.65, 1]} color="#4dff9c" intensity={3} distance={6} />
            </group>
          ))}
          <Block position={[0, 3.05, 0]} size={[4.05, 0.18, 0.18]} color="#00A859" glow />
          <Block position={[0, 1.45, -1.3]} size={[3.45, 2.1, 0.12]} color="#075b3d" glow />
          {[-2.15, 2.15].map((x) => (
            <group key={`speaker-${x}`} position={[x, 0.95, 0.9]}>
              <Block position={[0, 0, 0]} size={[0.62, 1.55, 0.62]} color="#14251f" />
              {[0.35, -0.35].map((y) => (
                <mesh key={y} position={[0, y, 0.33]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.21, 0.27, 0.08, 16]} />
                  <meshStandardMaterial
                    color="#7effb6"
                    emissive="#00A859"
                    emissiveIntensity={0.7}
                  />
                </mesh>
              ))}
            </group>
          ))}
          {[-1.15, 0, 1.15].map((x) => (
            <mesh key={x} position={[x, 2.65, 0.65]} rotation={[Math.PI / 4, 0, 0]}>
              <coneGeometry args={[0.35, 1.4, 12, 1, true]} />
              <meshBasicMaterial color="#71ffc1" transparent opacity={0.3} />
            </mesh>
          ))}
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
          <Block position={[0, 1.05, 0]} size={[3.6, 2.05, 0.28]} color="#087fbd" glow />
          <mesh position={[0, 1.05, 0.2]}>
            <circleGeometry args={[0.58, 3]} />
            <meshStandardMaterial color="#fff8d4" emissive="#ffb347" emissiveIntensity={2.2} />
          </mesh>
          <Block position={[0, 0.18, 0]} size={[3.9, 0.35, 2.5]} color="#F46300" glow />
          <pointLight position={[0, 1.4, 1.2]} color="#6ee7ff" intensity={3.2} distance={6} />
        </group>
      );
    case "electronics":
      return (
        <group>
          <Block position={[0, 0.9, 0]} size={[3.8, 1.75, 2.45]} color="#fff5e9" />
          <Block position={[0, 2, 0]} size={[4.05, 0.35, 2.7]} color="#F46300" glow />
          {[-1.12, 0, 1.12].map((x) => (
            <group key={x} position={[x, 0.92, 1.28]}>
              <Block position={[0, -0.43, 0]} size={[0.9, 0.12, 0.55]} color="#F46300" />
              <Block position={[0, 0.1, 0]} size={[0.82, 0.75, 0.08]} color="#172b35" glow />
              <Block position={[0, -0.25, 0.18]} size={[0.95, 0.08, 0.45]} color="#d8dfe1" />
            </group>
          ))}
          <pointLight position={[0, 1.4, 1.5]} color="#ffb36f" intensity={2.8} distance={6} />
        </group>
      );
    case "solutions":
      return (
        <group>
          <Block position={[0, 0.72, 0]} size={[3.7, 1.35, 2.45]} color="#42543a" />
          <Block position={[-0.55, 1.18, 1.26]} size={[2.15, 0.72, 0.08]} color="#dcebd7" />
          {[-0.85, 0, 0.85].map((x, i) => (
            <Block
              key={x}
              position={[x - 0.55, 1.12, 1.32]}
              size={[0.45, 0.12 + 0.17 * i, 0.04]}
              color={accent}
              glow
            />
          ))}
          <mesh position={[1.15, 1.05, 1.32]} rotation={[0, 0, Math.PI / 4]}>
            <boxGeometry args={[0.9, 0.9, 0.16]} />
            <meshStandardMaterial color="#10252c" metalness={0.55} />
          </mesh>
          <mesh position={[1.15, 1.05, 1.43]}>
            <torusGeometry args={[0.36, 0.07, 8, 24]} />
            <meshStandardMaterial color="#00e38c" emissive="#00A859" emissiveIntensity={2} />
          </mesh>
          <mesh position={[-1.5, 2.2, -0.45]}>
            <cylinderGeometry args={[0.035, 0.045, 2.8, 8]} />
            <meshStandardMaterial color="#d9e0d7" metalness={0.65} />
          </mesh>
          <Block position={[-0.95, 2.75, -0.43]} size={[1.05, 0.62, 0.06]} color="#d71920" glow />
          <mesh position={[-0.95, 2.75, -0.38]} rotation={[0, 0, Math.PI / 4]}>
            <octahedronGeometry args={[0.17]} />
            <meshStandardMaterial color="#ffd43b" emissive="#F46300" emissiveIntensity={1.4} />
          </mesh>
          <Block position={[1.05, 2.25, -0.65]} size={[1.15, 0.28, 0.65]} color="#63794f" />
          <mesh position={[1.05, 2.55, -0.65]}>
            <coneGeometry args={[0.32, 0.55, 8]} />
            <meshStandardMaterial color="#536744" />
          </mesh>
        </group>
      );
    case "commerce":
      return (
        <group>
          <Block position={[0, 1, 0]} size={[3.9, 1.9, 2.5]} color="#f3f1eb" />
          <Block position={[0, 2.12, 0]} size={[4.15, 0.35, 2.72]} color="#d71920" />
          <Block position={[0, 1.75, 1.29]} size={[3.4, 0.35, 0.08]} color="#d71920" glow />
          <group position={[0, 2.65, 0.2]}>
            <Block position={[0, 0, 0]} size={[0.8, 1.25, 0.18]} color="#ffffff" glow />
            <Block position={[0, 0.05, 0.11]} size={[0.52, 0.78, 0.06]} color="#ff3340" glow />
            <mesh position={[0, -0.48, 0.17]}>
              <circleGeometry args={[0.07, 14]} />
              <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
            </mesh>
          </group>
          <pointLight position={[0, 2.6, 1]} color="#ff3040" intensity={3.5} distance={7} />
          {[-1.15, 0, 1.15].map((x) => (
            <group key={x} position={[x, 0.92, 1.31]}>
              <Block position={[0, 0, 0]} size={[0.72, 1.1, 0.08]} color="#ffffff" />
              <Block position={[0, 0.08, 0.06]} size={[0.42, 0.68, 0.05]} color="#162a34" glow />
              <mesh position={[0, -0.4, 0.1]}>
                <circleGeometry args={[0.055, 12]} />
                <meshStandardMaterial color="#d71920" />
              </mesh>
            </group>
          ))}
        </group>
      );
    case "robot":
      return (
        <group position={[0, 0.15, 0]}>
          <Block position={[0, 0.12, 0]} size={[3.2, 0.24, 2.5]} color="#17242a" />
          <Block position={[0, 1.35, 0]} size={[1.25, 1.35, 0.85]} color="#e6edf0" />
          <mesh position={[0, 1.42, 0.47]}>
            <circleGeometry args={[0.26, 20]} />
            <meshStandardMaterial color="#ff934f" emissive="#F46300" emissiveIntensity={2.2} />
          </mesh>
          <Block position={[0, 2.35, 0]} size={[1.05, 0.72, 0.78]} color="#f6f8f7" />
          <Block position={[0, 2.35, 0.41]} size={[0.72, 0.34, 0.05]} color="#123849" glow />
          {[-0.22, 0.22].map((x) => (
            <mesh key={x} position={[x, 2.39, 0.46]}>
              <sphereGeometry args={[0.07, 10, 8]} />
              <meshStandardMaterial color="#58e7ff" emissive="#005EB8" emissiveIntensity={2.5} />
            </mesh>
          ))}
          <mesh position={[0, 3.03, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.7, 8]} />
            <meshStandardMaterial color="#d8e7ea" metalness={0.6} />
          </mesh>
          <mesh position={[0, 3.4, 0]}>
            <sphereGeometry args={[0.12, 12, 8]} />
            <meshStandardMaterial color="#59efff" emissive="#005EB8" emissiveIntensity={2.5} />
          </mesh>
          {[-1, 1].map((x) => (
            <group key={x}>
              <mesh position={[x, 1.5, 0]} rotation={[0, 0, x * -0.25]}>
                <capsuleGeometry args={[0.16, 0.85, 6, 10]} />
                <meshStandardMaterial color="#F46300" metalness={0.35} />
              </mesh>
              <mesh position={[x * 0.38, 0.55, 0]}>
                <capsuleGeometry args={[0.18, 0.75, 6, 10]} />
                <meshStandardMaterial color="#005EB8" metalness={0.35} />
              </mesh>
            </group>
          ))}
          <group position={[0, 0.25, 0.95]} scale={0.62}>
            <Block position={[0, 0.35, 0]} size={[1.8, 0.55, 1.15]} color="#F46300" />
            <Block position={[0, 0.75, -0.05]} size={[1.2, 0.52, 0.9]} color="#eaf3f4" />
            {[-0.72, 0.72].map((x) =>
              [-0.42, 0.42].map((z) => (
                <mesh key={`${x}-${z}`} position={[x, 0.15, z]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.22, 0.22, 0.18, 12]} />
                  <meshStandardMaterial color="#11191d" />
                </mesh>
              )),
            )}
          </group>
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
      position={[offset[0], data.id === "toyota" ? 5.65 : 4.55, offset[1]]}
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
