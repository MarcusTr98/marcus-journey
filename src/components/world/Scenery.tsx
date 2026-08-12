"use client";

import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { routeCurve } from "./Road";
import { milestones } from "@/data/milestones";

const FOLIAGE = ["#2f8f68", "#49a978", "#70bd79", "#26785d"];
const FIREFLY_COLORS = ["#fff4a8", "#7de8ff", "#ff78ba", "#a78bfa", "#8affcb"];
type Instance = { position: THREE.Vector3; scale: number; tone: number };
const FLOWER_COLORS = ["#ff4f9a", "#ffd447", "#ffffff", "#8b5cf6", "#ff6b35", "#54d6ff"];

const LANDMARK_CENTERS = milestones.map((milestone, index) => {
  const previous = milestones[Math.max(0, index - 1)].position;
  const next = milestones[Math.min(milestones.length - 1, index + 1)].position;
  const tangentX = next[0] - previous[0];
  const tangentZ = next[2] - previous[2];
  const length = Math.hypot(tangentX, tangentZ) || 1;
  const side = index % 2 === 0 ? -1 : 1;
  const clearance = milestone.id === "store" ? 4.8 : 4.2;
  return new THREE.Vector3(
    milestone.position[0] + (-tangentZ / length) * clearance * side,
    0,
    milestone.position[2] + (tangentX / length) * clearance * side,
  );
});

function outsideLandmarks(position: THREE.Vector3, radius: number) {
  return LANDMARK_CENTERS.every((center) => center.distanceToSquared(position) > radius * radius);
}

function useInstanceMatrices(
  ref: RefObject<THREE.InstancedMesh | null>,
  instances: Instance[],
  y: number,
  scaleFactor = 1,
) {
  useLayoutEffect(() => {
    if (!ref.current) return;
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3();
    instances.forEach((item, index) => {
      position.copy(item.position).add(new THREE.Vector3(0, y * item.scale, 0));
      scale.setScalar(item.scale * scaleFactor);
      matrix.compose(position, new THREE.Quaternion(), scale);
      ref.current?.setMatrixAt(index, matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [instances, ref, scaleFactor, y]);
}

function TreeCrowns({
  trees,
  color,
  upper,
  shadows,
}: {
  trees: Instance[];
  color: string;
  upper: boolean;
  shadows: boolean;
}) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useInstanceMatrices(ref, trees, upper ? 2.05 : 1.35);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, trees.length]} castShadow={shadows}>
      <coneGeometry args={upper ? [0.48, 1.18, 7] : [0.68, 1.45, 7]} />
      <meshStandardMaterial color={color} roughness={upper ? 0.9 : 0.92} flatShading />
    </instancedMesh>
  );
}

function InstancedTrees({ trees, shadows }: { trees: Instance[]; shadows: boolean }) {
  const trunks = useRef<THREE.InstancedMesh>(null);
  useInstanceMatrices(trunks, trees, 0.55);
  return (
    <group>
      <instancedMesh ref={trunks} args={[undefined, undefined, trees.length]} castShadow={shadows}>
        <cylinderGeometry args={[0.09, 0.15, 1.1, 7]} />
        <meshStandardMaterial color="#936747" roughness={0.92} />
      </instancedMesh>
      {FOLIAGE.map((color, tone) => {
        const lowerTrees = trees.filter((tree) => tree.tone % FOLIAGE.length === tone);
        const upperTrees = trees.filter((tree) => (tree.tone + 1) % FOLIAGE.length === tone);
        return (
          <group key={color}>
            <TreeCrowns trees={lowerTrees} color={color} upper={false} shadows={shadows} />
            <TreeCrowns trees={upperTrees} color={color} upper shadows={shadows} />
          </group>
        );
      })}
    </group>
  );
}

function InstancedRocks({ rocks }: { rocks: Instance[] }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const matrix = new THREE.Matrix4();
    rocks.forEach((rock, index) => {
      matrix.compose(
        rock.position,
        new THREE.Quaternion().setFromEuler(new THREE.Euler(0.1, rock.scale * 2, -0.08)),
        new THREE.Vector3(rock.scale, rock.scale * 0.65, rock.scale),
      );
      ref.current?.setMatrixAt(index, matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [rocks]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, rocks.length]} castShadow>
      <dodecahedronGeometry args={[0.48, 0]} />
      <meshStandardMaterial color="#9aa6a5" roughness={0.9} flatShading />
    </instancedMesh>
  );
}

function RoadsideFlowers({ flowers }: { flowers: Instance[] }) {
  return (
    <group>
      {flowers.map((flower, index) => (
        <group key={index} position={flower.position} scale={flower.scale}>
          <mesh position={[0, 0.16, 0]} castShadow>
            <cylinderGeometry args={[0.018, 0.025, 0.32, 6]} />
            <meshStandardMaterial color="#25885a" />
          </mesh>
          <group position={[0, 0.36, 0]} rotation={[0, index * 1.71, 0]}>
            {[0, 1, 2, 3, 4].map((petal) => (
              <mesh
                key={petal}
                position={[
                  Math.cos((petal / 5) * Math.PI * 2) * 0.09,
                  0,
                  Math.sin((petal / 5) * Math.PI * 2) * 0.09,
                ]}
                rotation={[0, -(petal / 5) * Math.PI * 2, 0.3]}
              >
                <sphereGeometry args={[0.065, 7, 5]} />
                <meshStandardMaterial
                  color={FLOWER_COLORS[index % FLOWER_COLORS.length]}
                  emissive={FLOWER_COLORS[index % FLOWER_COLORS.length]}
                  emissiveIntensity={0.12}
                />
              </mesh>
            ))}
            <mesh>
              <sphereGeometry args={[0.055, 8, 6]} />
              <meshStandardMaterial color="#ffb000" emissive="#ffb000" emissiveIntensity={0.28} />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
}

function RoadsideFireflies({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const material = useRef<THREE.PointsMaterial>(null);
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    for (let index = 0; index < count; index += 1) {
      const progress = (index + 0.35) / (count + 0.7);
      const point = routeCurve.getPointAt(progress);
      const tangent = routeCurve.getTangentAt(progress);
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      const side = index % 2 === 0 ? -1 : 1;
      const distance = 3.5 + ((index * 17) % 13) * 0.38;
      point
        .addScaledVector(normal, side * distance)
        .addScaledVector(tangent, (((index * 19) % 11) - 5) * 0.12);
      positions.push(point.x, 0.45 + ((index * 23) % 17) * 0.16, point.z);
      const color = new THREE.Color(FIREFLY_COLORS[index % FIREFLY_COLORS.length]);
      colors.push(color.r, color.g, color.b);
    }
    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    buffer.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return buffer;
  }, [count]);
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (points.current) points.current.position.y = Math.sin(time * 0.55) * 0.09;
    if (material.current) material.current.opacity = 0.58 + Math.sin(time * 1.7) * 0.22;
  });
  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        ref={material}
        size={0.13}
        vertexColors
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

export default function Scenery() {
  const treeCount = 80;
  const trees = useMemo(() => {
    const candidateCount = treeCount + 22;
    return Array.from({ length: candidateCount }, (_, index) => {
      const progress = (index + 0.65) / (candidateCount + 1);
      const point = routeCurve.getPointAt(progress);
      const tangent = routeCurve.getTangentAt(progress);
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      const side = index % 2 === 0 ? -1 : 1;
      const position = point
        .clone()
        .addScaledVector(normal, side * (7.7 + ((index * 7) % 7) * 0.72))
        .addScaledVector(tangent, (((index * 13) % 9) - 4) * 0.18);
      return {
        position,
        scale: 0.72 + ((index * 11) % 9) * 0.055,
        tone: index,
      };
    })
      .filter(({ position }) => outsideLandmarks(position, 4.25))
      .slice(0, treeCount);
  }, [treeCount]);
  const rocks = useMemo(() => {
    const count = 24;
    const candidateCount = count + 8;
    return Array.from({ length: candidateCount }, (_, index) => {
      const progress = (index + 1) / (candidateCount + 1);
      const point = routeCurve.getPointAt(progress);
      const tangent = routeCurve.getTangentAt(progress);
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      const position = point
        .clone()
        .addScaledVector(normal, (index % 2 ? 1 : -1) * (7.2 + (index % 5) * 0.65))
        .setY(0.28);
      return {
        position,
        scale: 0.45 + (index % 4) * 0.12,
        tone: 0,
      };
    })
      .filter(({ position }) => outsideLandmarks(position, 3.8))
      .slice(0, count);
  }, []);
  const flowers = useMemo(
    () =>
      Array.from({ length: 76 }, (_, index) => {
        const progress = 0.035 + (index / 75) * 0.94;
        const point = routeCurve.getPointAt(progress);
        const tangent = routeCurve.getTangentAt(progress);
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        const side = index % 2 === 0 ? -1 : 1;
        const position = point
          .clone()
          .addScaledVector(normal, side * (3.25 + ((index * 7) % 8) * 0.34))
          .addScaledVector(tangent, (((index * 11) % 7) - 3) * 0.18)
          .setY(0.03);
        return { position, scale: 0.72 + (index % 5) * 0.09, tone: index };
      }).filter(({ position }) => outsideLandmarks(position, 2.8)),
    [],
  );
  return (
    <group>
      <InstancedTrees trees={trees} shadows />
      <InstancedRocks rocks={rocks} />
      <RoadsideFlowers flowers={flowers} />
      <RoadsideFireflies count={300} />
    </group>
  );
}
