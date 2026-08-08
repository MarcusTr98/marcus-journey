"use client";

import { useLayoutEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useJourneyStore } from "@/stores/journeyStore";
import { routeCurve } from "./Road";

const FOLIAGE = ["#1d5c46", "#267256", "#318262", "#174938"];
type Instance = { position: THREE.Vector3; scale: number; tone: number };

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
        <meshStandardMaterial color="#68462f" roughness={1} />
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
      <meshStandardMaterial color="#53636a" roughness={0.96} flatShading />
    </instancedMesh>
  );
}

export default function Scenery() {
  const quality = useJourneyStore((state) => state.quality);
  const treeCount = quality === "high" ? 66 : 38;
  const trees = useMemo(
    () =>
      Array.from({ length: treeCount }, (_, index) => {
        const progress = (index + 0.65) / (treeCount + 1);
        const point = routeCurve.getPointAt(progress);
        const tangent = routeCurve.getTangentAt(progress);
        const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
        const side = index % 2 === 0 ? -1 : 1;
        return {
          position: point
            .clone()
            .addScaledVector(normal, side * (6.4 + ((index * 7) % 7) * 0.72))
            .addScaledVector(tangent, (((index * 13) % 9) - 4) * 0.18),
          scale: 0.72 + ((index * 11) % 9) * 0.055,
          tone: index,
        };
      }),
    [treeCount],
  );
  const rocks = useMemo(() => {
    const count = quality === "high" ? 24 : 12;
    return Array.from({ length: count }, (_, index) => {
      const point = routeCurve.getPointAt((index + 1) / (count + 1));
      const tangent = routeCurve.getTangentAt((index + 1) / (count + 1));
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();
      return {
        position: point
          .clone()
          .addScaledVector(normal, (index % 2 ? 1 : -1) * (5.8 + (index % 5) * 0.65))
          .setY(0.28),
        scale: 0.45 + (index % 4) * 0.12,
        tone: 0,
      };
    });
  }, [quality]);
  return (
    <group>
      <InstancedTrees trees={trees} shadows={quality === "high"} />
      <InstancedRocks rocks={rocks} />
    </group>
  );
}
