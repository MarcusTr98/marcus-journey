"use client";
import type { ThreeElements } from "@react-three/fiber";import type { RefObject } from "react";import type * as THREE from "three";
import { useJourneyStore } from "@/stores/journeyStore";
export default function Car({groupRef,...props}:ThreeElements["group"]&{groupRef:RefObject<THREE.Group|null>}){const progress=useJourneyStore(s=>s.progress);return <group ref={groupRef} {...props}>
 <mesh position={[0,.55,0]} castShadow><boxGeometry args={[1.4,.38,2.3]}/><meshStandardMaterial color="#F46300" roughness={.38} metalness={.15}/></mesh>
 <mesh position={[0,.94,-.18]} castShadow><boxGeometry args={[1.15,.45,1.15]}/><meshStandardMaterial color="#d8e5e9" roughness={.2} metalness={.35}/></mesh>
 <mesh position={[0,.95,.42]} rotation={[Math.PI/2.85,0,0]}><boxGeometry args={[1.02,.035,.5]}/><meshStandardMaterial color="#123440" metalness={.7} roughness={.12}/></mesh>
 <mesh position={[0,.61,1.18]}><boxGeometry args={[1.3,.16,.09]}/><meshStandardMaterial color="#162127" metalness={.7}/></mesh>
 {[-.43,.43].map(x=><mesh key={`lamp-${x}`} position={[x,.68,1.235]}><boxGeometry args={[.28,.13,.04]}/><meshStandardMaterial color="#fff6c5" emissive="#ffd96a" emissiveIntensity={3}/></mesh>)}
 {[-.45,.45].map(x=><mesh key={`tail-${x}`} position={[x,.65,-1.19]}><boxGeometry args={[.23,.12,.04]}/><meshStandardMaterial color="#ff2e20" emissive="#ff1608" emissiveIntensity={2}/></mesh>)}
 <mesh position={[0,1.17,-.16]}><boxGeometry args={[.72,.06,.55]}/><meshStandardMaterial color="#07141b" emissive="#005EB8" emissiveIntensity={progress>.35?2:.1}/></mesh>
 {[-.72,.72].flatMap(x=>[-.72,.72].map(z=><mesh key={`${x}${z}`} position={[x,.38,z]} rotation={[0,0,Math.PI/2]} castShadow><cylinderGeometry args={[.28,.28,.22,12]}/><meshStandardMaterial color="#101418"/></mesh>))}
 {progress>.48&&<mesh position={[0,1.25,0]}><sphereGeometry args={[1.05,20,12,0,Math.PI*2,0,Math.PI/2]}/><meshStandardMaterial color="#005EB8" transparent opacity={.18} emissive="#005EB8" emissiveIntensity={.8}/></mesh>}
 {progress>.2&&<group position={[0,1.31,-.18]}><mesh><boxGeometry args={[1.12,.05,1.28]}/><meshStandardMaterial color="#17252b" metalness={.75}/></mesh><mesh position={[-.34,.17,0]}><boxGeometry args={[.5,.3,.72]}/><meshStandardMaterial color="#8d5a2b" roughness={.8}/></mesh><mesh position={[.32,.12,.12]}><boxGeometry args={[.42,.22,.52]}/><meshStandardMaterial color="#005EB8" roughness={.55}/></mesh></group>}
 {progress>.62&&<group position={[0,.93,-1.22]}><mesh position={[0,0,0]}><boxGeometry args={[1.25,.08,.35]}/><meshStandardMaterial color="#121c20" metalness={.75}/></mesh><mesh position={[-.52,.2,0]}><boxGeometry args={[.06,.4,.08]}/><meshStandardMaterial color="#121c20"/></mesh><mesh position={[.52,.2,0]}><boxGeometry args={[.06,.4,.08]}/><meshStandardMaterial color="#121c20"/></mesh></group>}
 {progress>.78&&<group position={[0,1.75,0]}><mesh><sphereGeometry args={[.15,12,8]}/><meshStandardMaterial color="#00A859" emissive="#00A859"/></mesh><mesh position={[0,-.25,0]}><cylinderGeometry args={[.015,.015,.5]}/><meshStandardMaterial color="#86ffc0"/></mesh></group>}
 </group>}
