"use client";
import * as THREE from "three";
import { useMemo } from "react";
import { PATH_POINTS, TROPHY_POSITION } from "@/data/journeyPath";
import { milestones } from "@/data/milestones";
export const routePoints = PATH_POINTS.map((point) => new THREE.Vector3(...point));
export const routeCurve = new THREE.CatmullRomCurve3(routePoints, false, "catmullrom", 0.14);

function findClosestCurveProgress(position: [number, number, number]) {
  const target = new THREE.Vector3(...position);
  let closestProgress = 0;
  let closestDistance = Number.POSITIVE_INFINITY;
  for (let sample = 0; sample <= 1600; sample += 1) {
    const progress = sample / 1600;
    const distance = routeCurve.getPointAt(progress).distanceToSquared(target);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestProgress = progress;
    }
  }
  return closestProgress;
}

export const milestoneCurveProgress = milestones.map((milestone) =>
  findClosestCurveProgress(milestone.position),
);
export const trophyCurveProgress = findClosestCurveProgress(TROPHY_POSITION);
export const graduationCurveProgress =
  milestoneCurveProgress[milestones.findIndex(({ id }) => id === "graduation")];

function createRoad() {
  const segments = 240,
    width = 2.6,
    vertices: number[] = [],
    indices: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments,
      p = routeCurve.getPointAt(t),
      tangent = routeCurve.getTangentAt(t);
    const side = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize().multiplyScalar(width / 2);
    const left = p.clone().add(side),
      right = p.clone().sub(side);
    vertices.push(left.x, 0.02, left.z, right.x, 0.02, right.z);
    if (i < segments) {
      const a = i * 2;
      indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export default function Road() {
  const geometry = useMemo(createRoad, []);
  const markings = useMemo(
    () =>
      Array.from({ length: 55 }, (_, i) => {
        const t = (i + 0.5) / 56,
          p = routeCurve.getPointAt(t),
          tan = routeCurve.getTangentAt(t);
        return { p, rotation: Math.atan2(tan.x, tan.z) };
      }),
    [],
  );
  const checkpointMarkers = useMemo(
    () =>
      milestoneCurveProgress.map((progress, index) => {
        const point = routeCurve.getPointAt(progress);
        const tangent = routeCurve.getTangentAt(progress);
        return {
          point,
          rotation: Math.atan2(tangent.x, tangent.z),
          color: milestones[index].id === "graduation" ? "#FFC629" : milestones[index].accent,
        };
      }),
    [],
  );
  return (
    <group>
      <mesh geometry={geometry} receiveShadow>
        <meshStandardMaterial color="#30383b" roughness={0.96} side={THREE.DoubleSide} />
      </mesh>
      {markings.map((m, i) => (
        <mesh key={i} position={[m.p.x, 0.055, m.p.z]} rotation={[0, m.rotation, 0]}>
          <boxGeometry args={[0.07, 0.025, 0.75]} />
          <meshStandardMaterial color="#e9e0ba" emissive="#8d875f" emissiveIntensity={0.15} />
        </mesh>
      ))}
      {checkpointMarkers.map((marker, index) => (
        <group
          key={milestones[index].id}
          position={[marker.point.x, 0.075, marker.point.z]}
          rotation={[0, marker.rotation, 0]}
        >
          {[-0.22, 0, 0.22].map((z) => (
            <mesh key={z} position={[0, 0, z]}>
              <boxGeometry args={[2.25, 0.025, 0.075]} />
              <meshStandardMaterial
                color={marker.color}
                emissive={marker.color}
                emissiveIntensity={1.4}
              />
            </mesh>
          ))}
        </group>
      ))}
      <mesh position={[0, -0.12, -108]} receiveShadow>
        <boxGeometry args={[36, 0.24, 255]} />
        <meshStandardMaterial color="#101c22" roughness={1} />
      </mesh>
    </group>
  );
}
