"use client";
import dynamic from "next/dynamic";import { Suspense } from "react";
const Canvas=dynamic(()=>import("@react-three/fiber").then(m=>m.Canvas),{ssr:false});
const Scene=dynamic(()=>import("./MarcusJourneyScene"),{ssr:false});
export default function Experience(){return <div className="experience" aria-label="Interactive 3D career journey"><Suspense fallback={<div className="scene-loading">BUILDING THE JOURNEY…</div>}><Canvas shadows camera={{position:[7,8,14],fov:42}} dpr={[1,1.5]} gl={{antialias:true,powerPreference:"high-performance"}} fallback={<div className="fallback">3D is unavailable. Use Quick Profile to explore Marcus&apos;s work.</div>}><Scene/></Canvas></Suspense></div>}
