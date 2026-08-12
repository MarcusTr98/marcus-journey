"use client";

import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { routeCurve } from "./Road";
import { milestones } from "@/data/milestones";

const FOLIAGE = ["#2f8f68", "#49a978", "#70bd79", "#26785d"];
const FIREFLY_COLORS = ["#fff4a8", "#7de8ff", "#ff78ba", "#a78bfa", "#8affcb"];
type Instance = { position: THREE.Vector3; scale: number; tone: number };

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
  const treeCount = 66;
  const trees = useMemo(
    () =>
      Array.from({ length: treeCount + 22 }, (_, index) => {
        const progress = (index + 0.65) / (treeCount + 1);
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
        .slice(0, treeCount),
    [treeCount],
  );
  const rocks = useMemo(() => {
    const count = 24;
    return Array.from({ length: count + 8 }, (_, index) => {
      const point = routeCurve.getPointAt((index + 1) / (count + 1));
      const tangent = routeCurve.getTangentAt((index + 1) / (count + 1));
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
  return (
    <group>
      <InstancedTrees trees={trees} shadows />
      <InstancedRocks rocks={rocks} />
      <RoadsideFireflies count={300} />
    </group>
  );
}
