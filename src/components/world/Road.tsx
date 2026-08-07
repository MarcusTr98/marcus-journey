"use client";
import * as THREE from "three";
import { useMemo } from "react";
export const routePoints=[new THREE.Vector3(0,0,5),new THREE.Vector3(0,0,-6),new THREE.Vector3(4,0,-16),new THREE.Vector3(-4,0,-27),new THREE.Vector3(4,0,-39),new THREE.Vector3(-4,0,-51),new THREE.Vector3(3,0,-63),new THREE.Vector3(0,0,-78)];
export const routeCurve=new THREE.CatmullRomCurve3(routePoints,false,"catmullrom",.16);
export default function Road(){const geometry=useMemo(()=>new THREE.TubeGeometry(routeCurve,180,1.15,10,false),[]);return <group><mesh geometry={geometry} rotation={[0,0,0]} position={[0,.04,0]} receiveShadow><meshStandardMaterial color="#26363c" roughness={.92}/></mesh><mesh position={[0,-.14,-36]} receiveShadow><boxGeometry args={[35,.3,92]}/><meshStandardMaterial color="#101c22" roughness={1}/></mesh></group>}
