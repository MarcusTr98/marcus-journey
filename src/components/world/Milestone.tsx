"use client";

import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import type { Milestone as MilestoneType } from "@/types";
import { milestones } from "@/data/milestones";
import { landmarkMeta, type LandmarkKind } from "@/data/landmarks";

type LandmarkOffset = [number, number];
const beamPositions = [-1.15, 0, 1.15];
const MAP_COLORS = ["#ff4fa3", "#ffd43b", "#64e7ff", "#8b5cf6", "#00c98d", "#ff6b35"];
const vietnamStar = new THREE.Shape();
Array.from({ length: 10 }, (_, index) => {
  const radius = index % 2 === 0 ? 0.26 : 0.105;
  const angle = Math.PI / 2 + (index * Math.PI) / 5;
  return new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius);
}).forEach((point, index) => {
  if (index === 0) vietnamStar.moveTo(point.x, point.y);
  else vietnamStar.lineTo(point.x, point.y);
});
vietnamStar.closePath();

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

function RotatingRoofSign({ kind }: { kind: "phone" | "laptop" }) {
  const sign = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (sign.current) sign.current.rotation.y += delta * 0.85;
  });
  return (
    <group ref={sign} rotation={[0, 0, -0.32]}>
      {kind === "phone" ? (
        <group>
          <Block position={[0, 0, 0]} size={[0.78, 1.2, 0.2]} color="#ffffff" glow />
          <Block position={[0, 0.02, 0.12]} size={[0.52, 0.78, 0.06]} color="#ff3340" glow />
          <Block position={[0, 0.02, -0.12]} size={[0.52, 0.78, 0.06]} color="#ff3340" glow />
          <Block position={[0, 0.48, 0.13]} size={[0.2, 0.035, 0.02]} color="#ffccd0" />
          <mesh position={[0, -0.48, 0.17]}>
            <circleGeometry args={[0.065, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
          </mesh>
        </group>
      ) : (
        <group>
          <Block position={[0, 0.2, 0]} size={[1.2, 0.78, 0.16]} color="#ffffff" glow />
          <Block position={[0, 0.22, 0.1]} size={[0.9, 0.52, 0.055]} color="#ff7a18" glow />
          <Block position={[0, -0.35, 0.28]} size={[1.38, 0.12, 0.72]} color="#fff2dc" />
          <Block position={[0, -0.27, 0.52]} size={[0.62, 0.025, 0.24]} color="#ffb067" />
        </group>
      )}
    </group>
  );
}

function AutomatedFactory() {
  const robot = useRef<THREE.Group>(null);
  const products = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (robot.current) robot.current.rotation.z = -0.35 + Math.sin(clock.elapsedTime * 1.4) * 0.38;
    if (products.current) products.current.position.x = ((clock.elapsedTime * 0.55) % 1.8) - 0.9;
  });
  return (
    <group>
      <Block position={[0, 0.18, 0]} size={[4.4, 0.3, 3.2]} color="#17242a" />
      <Block position={[0, 0.65, 0.25]} size={[3.65, 0.42, 1.15]} color="#31515d" />
      <group ref={products}>
        {[-0.75, 0, 0.75].map((x, index) => (
          <Block
            key={x}
            position={[x, 1.02, 0.25]}
            size={[0.42, 0.3, 0.46]}
            color={MAP_COLORS[index]}
            glow
          />
        ))}
      </group>
      <group position={[-1.25, 1.05, -0.55]}>
        <Block position={[0, 0, 0]} size={[0.48, 1.25, 0.48]} color="#F46300" />
        <group ref={robot} position={[0, 0.62, 0]}>
          <Block position={[0.55, 0, 0]} size={[1.15, 0.24, 0.28]} color="#ffd43b" />
          <Block position={[1.08, -0.32, 0]} size={[0.24, 0.75, 0.28]} color="#ff4fa3" />
        </group>
      </group>
      <group position={[1.1, 1.75, -0.72]}>
        <Block position={[0, 0, 0]} size={[1.75, 1.25, 0.14]} color="#eef6f5" />
        {[0.52, 0.16, -0.2, -0.56].map((y, index) => (
          <Block
            key={y}
            position={[-0.56 + index * 0.37, y, 0.09]}
            size={[0.23, 0.2 + index * 0.14, 0.04]}
            color={MAP_COLORS[index + 1]}
            glow
          />
        ))}
        <Block position={[0, -0.48, 0.09]} size={[1.35, 0.045, 0.035]} color="#203944" />
      </group>
      <mesh position={[1.85, 2.45, -0.72]} rotation={[0, 0, -0.65]}>
        <coneGeometry args={[0.16, 0.55, 3]} />
        <meshStandardMaterial color="#00c98d" emissive="#00c98d" emissiveIntensity={1.4} />
      </mesh>
      <pointLight position={[0, 2.3, 0.5]} color="#68e8ff" intensity={3.2} distance={7} />
    </group>
  );
}

function LandmarkStructure({ kind, accent }: { kind: LandmarkKind; accent: string }) {
  const fptLogo = useTexture("/landmarks/fpt-logo.svg");
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
          <Block position={[0, 0.13, 0.25]} size={[4.7, 0.24, 3.2]} color="#16303b" />
          <Block position={[0, 1.15, -0.35]} size={[1.65, 2.25, 1.65]} color="#f4efe5" />
          <Block position={[-1.55, 0.82, 0.05]} size={[1.55, 1.55, 2.2]} color="#fff8ec" />
          <Block position={[1.55, 0.82, 0.05]} size={[1.55, 1.55, 2.2]} color="#fff8ec" />
          <Block position={[0, 2.4, -0.35]} size={[1.95, 0.25, 1.9]} color="#F37021" />
          {[-1.82, -1.28, -0.28, 0.28, 1.28, 1.82].map((x, index) => (
            <Block
              key={x}
              position={[x, index === 2 || index === 3 ? 1.2 : 0.85, 1.18]}
              size={[0.34, index === 2 || index === 3 ? 1.25 : 0.62, 0.08]}
              color={index < 2 ? "#F37021" : index < 4 ? "#00A859" : "#005EB8"}
              glow
            />
          ))}
          <Block position={[0, 0.24, 1.35]} size={[1.7, 0.15, 0.6]} color="#d9dee0" />
          <Block position={[0, 0.42, 1.26]} size={[1.4, 0.12, 0.42]} color="#eef2f2" />
          <group position={[0, 2.85, 0.15]}>
            <Block position={[0, 0, -0.08]} size={[2.75, 1.12, 0.22]} color="#ffffff" />
            <mesh position={[0, 0, 0.045]}>
              <planeGeometry args={[2.58, 1.06]} />
              <meshBasicMaterial map={fptLogo} transparent toneMapped={false} side={2} />
            </mesh>
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
              <Block position={[0, 0, 0]} size={[0.62, 1.55, 0.62]} color="#481a62" />
              {[0.35, -0.35].map((y) => (
                <mesh key={y} position={[0, y, 0.33]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.21, 0.27, 0.08, 16]} />
                  <meshStandardMaterial
                    color="#ffe35b"
                    emissive="#ff4fa3"
                    emissiveIntensity={1.2}
                  />
                </mesh>
              ))}
            </group>
          ))}
          {[-1.15, 0, 1.15].map((x, index) => (
            <mesh key={x} position={[x, 2.65, 0.65]} rotation={[Math.PI / 4, 0, 0]}>
              <coneGeometry args={[0.35, 1.4, 12, 1, true]} />
              <meshBasicMaterial
                color={["#ff58a8", "#fff16a", "#64e7ff"][index]}
                transparent
                opacity={0.38}
              />
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
          <group position={[0, 2.75, 0.1]}>
            <RotatingRoofSign kind="laptop" />
          </group>
          <pointLight position={[0, 2.75, 0.8]} color="#ff9a3d" intensity={3.4} distance={7} />
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
          <Block position={[-0.95, 2.75, -0.43]} size={[1.2, 0.78, 0.08]} color="#DA251D" glow />
          <mesh position={[-0.95, 2.75, -0.375]}>
            <shapeGeometry args={[vietnamStar]} />
            <meshBasicMaterial color="#FFFF00" toneMapped={false} side={2} />
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
          <group position={[0, 3.35, 0.2]}>
            <RotatingRoofSign kind="phone" />
          </group>
          <pointLight position={[0, 3.2, 1]} color="#ff3040" intensity={3.8} distance={8} />
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
          <Block position={[0, 1.35, 0]} size={[1.25, 1.35, 0.85]} color="#ffd43b" />
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
          {[-1, 1].map((x, index) => (
            <group key={x}>
              <Block
                position={[x, 1.48, 0]}
                size={[0.34, 1.02, 0.36]}
                color={index ? "#ff4fa3" : "#F46300"}
              />
              <Block position={[x * 0.38, 0.55, 0]} size={[0.4, 0.85, 0.5]} color="#005EB8" />
              <mesh position={[x, 2.02, 0]}>
                <cylinderGeometry args={[0.19, 0.19, 0.12, 12]} />
                <meshStandardMaterial color="#ffffff" />
              </mesh>
            </group>
          ))}
          <group position={[-1.35, 0.38, 1.35]} rotation={[0, 0.52, 0]} scale={0.72}>
            <Block position={[0, 0.35, 0]} size={[1.8, 0.55, 1.15]} color="#00c98d" />
            <Block position={[0, 0.75, -0.05]} size={[1.2, 0.52, 0.9]} color="#fff1a8" />
            <Block position={[0, 0.72, 0.48]} size={[0.75, 0.22, 0.08]} color="#8b5cf6" glow />
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
      return <AutomatedFactory />;
    default:
      return null;
  }
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
    </group>
  );
}
