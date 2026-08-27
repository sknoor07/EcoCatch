// "use client";

// import { useRef, useState, useMemo, Suspense } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { OrbitControls, Environment, ContactShadows, Html, Float, MeshReflectorMaterial } from "@react-three/drei";
// import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
// import * as THREE from "three";
// import { useLoading } from "./loading-provider";

// /* ─── Curved Pipe Generator ─── */
// function CurvedPipe({
//   points,
//   radius = 0.08,
//   color = "#6B7280",
//   isExploded,
//   explodeOffset = [0, 0, 0],
// }: {
//   points: [number, number, number][];
//   radius?: number;
//   color?: string;
//   isExploded: boolean;
//   explodeOffset?: [number, number, number];
// }) {
//   const ref = useRef<THREE.Mesh>(null);
//   const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p))), [points]);

//   useFrame((_, delta) => {
//     if (ref.current) {
//       const target = new THREE.Vector3(
//         isExploded ? points[0][0] + explodeOffset[0] : points[0][0],
//         isExploded ? points[0][1] + explodeOffset[1] : points[0][1],
//         isExploded ? points[0][2] + explodeOffset[2] : points[0][2]
//       );
//       ref.current.position.lerp(target, delta * 3);
//     }
//   });

//   return (
//     <mesh ref={ref} castShadow>
//       <tubeGeometry args={[curve, 32, radius, 12, false]} />
//       <meshPhysicalMaterial color={color} metalness={0.7} roughness={0.25} clearcoat={0.3} />
//     </mesh>
//   );
// }

// /* ─── Bolt Circle ─── */
// function BoltCircle({ radius, y, count = 12, isExploded }: { radius: number; y: number; count?: number; isExploded: boolean }) {
//   const ref = useRef<THREE.InstancedMesh>(null);
//   const dummy = useMemo(() => new THREE.Object3D(), []);

//   useFrame(() => {
//     if (!ref.current) return;
//     for (let i = 0; i < count; i++) {
//       const angle = (i / count) * Math.PI * 2;
//       dummy.position.set(Math.cos(angle) * radius, y + (isExploded ? 0.5 : 0), Math.sin(angle) * radius);
//       dummy.rotation.set(0, 0, 0);
//       dummy.scale.setScalar(1);
//       dummy.updateMatrix();
//       ref.current.setMatrixAt(i, dummy.matrix);
//     }
//     ref.current.instanceMatrix.needsUpdate = true;
//   });

//   return (
//     <instancedMesh ref={ref} args={[undefined, undefined, count]} castShadow>
//       <cylinderGeometry args={[0.035, 0.035, 0.14, 8]} />
//       <meshStandardMaterial color="#9CA3AF" metalness={0.85} roughness={0.15} />
//     </instancedMesh>
//   );
// }

// /* ─── Ladder ─── */
// function Ladder({ isExploded }: { isExploded: boolean }) {
//   const ref = useRef<THREE.Group>(null);
//   useFrame((_, delta) => {
//     if (ref.current) ref.current.position.lerp(new THREE.Vector3(1.65, isExploded ? 1 : 0, 0), delta * 3);
//   });

//   const rungs = 8;
//   return (
//     <group ref={ref}>
//       {/* Rails */}
//       <mesh position={[0, 0, -0.12]} castShadow>
//         <cylinderGeometry args={[0.03, 0.03, 3.6, 8]} />
//         <meshPhysicalMaterial color="#4B5563" metalness={0.8} roughness={0.2} clearcoat={0.5} />
//       </mesh>
//       <mesh position={[0, 0, 0.12]} castShadow>
//         <cylinderGeometry args={[0.03, 0.03, 3.6, 8]} />
//         <meshPhysicalMaterial color="#4B5563" metalness={0.8} roughness={0.2} clearcoat={0.5} />
//       </mesh>
//       {/* Rungs */}
//       {Array.from({ length: rungs }).map((_, i) => (
//         <mesh key={i} position={[0, -1.4 + i * 0.4, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
//           <cylinderGeometry args={[0.025, 0.025, 0.24, 8]} />
//           <meshPhysicalMaterial color="#6B7280" metalness={0.8} roughness={0.2} />
//         </mesh>
//       ))}
//     </group>
//   );
// }

// /* ─── Railing ─── */
// function Railing({ isExploded }: { isExploded: boolean }) {
//   const ref = useRef<THREE.Group>(null);
//   useFrame((_, delta) => {
//     if (ref.current) ref.current.position.lerp(new THREE.Vector3(0, isExploded ? 2.2 : 0, 0), delta * 3);
//   });

//   const posts = 16;
//   return (
//     <group ref={ref}>
//       <mesh position={[0, 1.85, 0]} castShadow>
//         <torusGeometry args={[1.65, 0.04, 8, 64]} />
//         <meshPhysicalMaterial color="#374151" metalness={0.7} roughness={0.3} clearcoat={0.4} />
//       </mesh>
//       {Array.from({ length: posts }).map((_, i) => {
//         const angle = (i / posts) * Math.PI * 2;
//         return (
//           <mesh key={i} position={[Math.cos(angle) * 1.65, 1.7, Math.sin(angle) * 1.65]} castShadow>
//             <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
//             <meshPhysicalMaterial color="#4B5563" metalness={0.8} roughness={0.2} />
//           </mesh>
//         );
//       })}
//     </group>
//   );
// }

// /* ─── Manhole Cover ─── */
// function ManholeCover({ isExploded }: { isExploded: boolean }) {
//   const ref = useRef<THREE.Group>(null);
//   useFrame((_, delta) => {
//     if (ref.current) ref.current.position.lerp(new THREE.Vector3(0.6, isExploded ? 2.5 : 1.65, 0.6), delta * 3);
//   });

//   return (
//     <group ref={ref} rotation={[0, 0.5, 0]}>
//       <mesh castShadow>
//         <cylinderGeometry args={[0.25, 0.25, 0.06, 24]} />
//         <meshPhysicalMaterial color="#1F2937" metalness={0.6} roughness={0.4} clearcoat={0.3} />
//       </mesh>
//       {/* Handle */}
//       <mesh position={[0, 0.06, 0]} castShadow>
//         <torusGeometry args={[0.12, 0.02, 8, 16, Math.PI]} />
//         <meshPhysicalMaterial color="#374151" metalness={0.7} roughness={0.3} />
//       </mesh>
//     </group>
//   );
// }

// /* ─── Foundation ─── */
// function Foundation({ isExploded }: { isExploded: boolean }) {
//   const ref = useRef<THREE.Group>(null);
//   useFrame((_, delta) => {
//     if (ref.current) ref.current.position.lerp(new THREE.Vector3(0, isExploded ? -3.2 : -1.9, 0), delta * 3);
//   });

//   return (
//     <group ref={ref}>
//       <mesh receiveShadow castShadow>
//         <cylinderGeometry args={[2.4, 2.5, 0.3, 64]} />
//         <meshPhysicalMaterial color="#57534E" metalness={0.05} roughness={0.95} clearcoat={0.1} />
//       </mesh>
//       <mesh receiveShadow position={[0, 0.18, 0]}>
//         <torusGeometry args={[2.2, 0.1, 16, 100]} />
//         <meshPhysicalMaterial color="#78716C" metalness={0.15} roughness={0.85} />
//       </mesh>
//       {/* Rebar hints */}
//       <mesh position={[0, -0.05, 0]}>
//         <cylinderGeometry args={[2.3, 2.3, 0.05, 64]} />
//         <meshStandardMaterial color="#44403C" metalness={0.3} roughness={0.9} wireframe />
//       </mesh>
//     </group>
//   );
// }

// /* ─── Main Digester Tank ─── */
// function DigesterTank({ isExploded }: { isExploded: boolean }) {
//   const ref = useRef<THREE.Group>(null);
//   useFrame((_, delta) => {
//     if (ref.current) ref.current.position.lerp(new THREE.Vector3(0, isExploded ? -1.6 : 0, 0), delta * 3);
//   });

//   return (
//     <group ref={ref}>
//       <mesh castShadow receiveShadow>
//         <cylinderGeometry args={[1.55, 1.55, 3.4, 64]} />
//         <meshPhysicalMaterial
//           color="#1B4332"
//           metalness={0.35}
//           roughness={0.4}
//           clearcoat={0.4}
//           clearcoatRoughness={0.2}
//         />
//       </mesh>
//       {/* Structural ribs */}
//       {[-1.3, 0, 1.3].map((y, i) => (
//         <mesh key={i} position={[0, y, 0]} castShadow>
//           <torusGeometry args={[1.57, 0.07, 16, 100]} />
//           <meshPhysicalMaterial color="#2D5A3D" metalness={0.6} roughness={0.3} clearcoat={0.5} />
//         </mesh>
//       ))}
//       {/* Top rim */}
//       <mesh position={[0, 1.7, 0]} castShadow>
//         <torusGeometry args={[1.55, 0.1, 16, 100]} />
//         <meshPhysicalMaterial color="#374151" metalness={0.6} roughness={0.3} clearcoat={0.4} />
//       </mesh>
//       <BoltCircle radius={1.55} y={1.75} isExploded={isExploded} />
//       {/* Bottom rim */}
//       <mesh position={[0, -1.7, 0]} castShadow>
//         <torusGeometry args={[1.55, 0.1, 16, 100]} />
//         <meshPhysicalMaterial color="#374151" metalness={0.6} roughness={0.3} clearcoat={0.4} />
//       </mesh>
//       <ManholeCover isExploded={isExploded} />
//       <Ladder isExploded={isExploded} />
//       <Railing isExploded={isExploded} />
//     </group>
//   );
// }

// /* ─── Gas Holder (Glass Dome) ─── */
// function GasHolder({ isExploded }: { isExploded: boolean }) {
//   const ref = useRef<THREE.Group>(null);
//   useFrame((_, delta) => {
//     if (ref.current) ref.current.position.lerp(new THREE.Vector3(0, isExploded ? 4.5 : 2.1, 0), delta * 3);
//   });

//   return (
//     <group ref={ref}>
//       <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2} enabled={isExploded}>
//         <mesh castShadow>
//           <sphereGeometry args={[1.65, 64, 64, 0, Math.PI * 2, 0, Math.PI / 2]} />
//           <meshPhysicalMaterial
//             color="#86EFAC"
//             metalness={0.1}
//             roughness={0.15}
//             transmission={0.5}
//             thickness={1.2}
//             transparent
//             opacity={0.8}
//             side={THREE.DoubleSide}
//             clearcoat={1}
//             clearcoatRoughness={0.1}
//           />
//         </mesh>
//         {/* Inner glow shell */}
//         <mesh>
//           <sphereGeometry args={[1.6, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
//           <meshBasicMaterial color="#4ADE80" transparent opacity={0.08} side={THREE.BackSide} />
//         </mesh>
//         {/* Base ring */}
//         <mesh position={[0, 0, 0]} castShadow>
//           <torusGeometry args={[1.65, 0.08, 16, 100]} />
//           <meshPhysicalMaterial color="#22C55E" metalness={0.4} roughness={0.25} clearcoat={0.6} />
//         </mesh>
//       </Float>
//     </group>
//   );
// }

// /* ─── Pressure Gauge ─── */
// function PressureGauge({ isExploded }: { isExploded: boolean }) {
//   const ref = useRef<THREE.Group>(null);
//   const needleRef = useRef<THREE.Mesh>(null);

//   useFrame((state, delta) => {
//     if (ref.current) ref.current.position.lerp(new THREE.Vector3(1.0, isExploded ? 2.2 : 0.2, 0.8), delta * 3);
//     if (needleRef.current) {
//       needleRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.3 - 0.5;
//     }
//   });

//   return (
//     <group ref={ref}>
//       <mesh castShadow>
//         <cylinderGeometry args={[0.22, 0.22, 0.18, 24]} />
//         <meshPhysicalMaterial color="#1F2937" metalness={0.5} roughness={0.3} clearcoat={0.5} />
//       </mesh>
//       <mesh position={[0, 0.1, 0]}>
//         <cylinderGeometry args={[0.18, 0.18, 0.04, 24]} />
//         <meshPhysicalMaterial color="#F3F4F6" metalness={0.3} roughness={0.2} />
//       </mesh>
//       {/* Needle */}
//       <mesh ref={needleRef} position={[0, 0.13, 0.06]} rotation={[0, 0, -0.5]}>
//         <boxGeometry args={[0.015, 0.14, 0.008]} />
//         <meshStandardMaterial color="#EF4444" metalness={0.3} roughness={0.4} />
//       </mesh>
//       {/* Center pin */}
//       <mesh position={[0, 0.14, 0.06]}>
//         <cylinderGeometry args={[0.02, 0.02, 0.02, 12]} />
//         <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
//       </mesh>
//     </group>
//   );
// }

// /* ─── Annotation ─── */
// function Annotation({ position, text, visible }: { position: [number, number, number]; text: string; visible: boolean }) {
//   return (
//     <Html position={position} center style={{ transition: "opacity 0.5s", opacity: visible ? 1 : 0, pointerEvents: "none" }}>
//       <div className="flex items-center gap-2 whitespace-nowrap">
//         <div className="h-2 w-2 rounded-full bg-[#4ADE80] shadow-[0_0_10px_#4ADE80]" />
//         <div className="rounded-lg bg-white/95 dark:bg-black/95 backdrop-blur px-3 py-1.5 text-xs font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] shadow-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/10">
//           {text}
//         </div>
//       </div>
//     </Html>
//   );
// }

// /* ─── Ground Plane ─── */
// function Ground() {
//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.35, 0]} receiveShadow>
//       <planeGeometry args={[50, 50]} />
//       <MeshReflectorMaterial
//         blur={[300, 100]}
//         resolution={1024}
//         mixBlur={1}
//         mixStrength={40}
//         roughness={1}
//         depthScale={1.2}
//         minDepthThreshold={0.4}
//         maxDepthThreshold={1.4}
//         color="#050505"
//         metalness={0.5}
//         mirror={0.5}
//       />
//     </mesh>
//   );
// }

// /* ─── Scene Assembly ─── */
// function Scene({ isExploded }: { isExploded: boolean }) {
//   const groupRef = useRef<THREE.Group>(null);

//   useFrame((state) => {
//     if (groupRef.current && !isExploded) {
//       groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <Foundation isExploded={isExploded} />
//       <DigesterTank isExploded={isExploded} />
//       <GasHolder isExploded={isExploded} />
//       <PressureGauge isExploded={isExploded} />

//       {/* Curved Inlet Pipe */}
//       <CurvedPipe
//         isExploded={isExploded}
//         points={[[-2.2, 0.4, 0], [-1.7, 0.4, 0], [-1.55, 0.6, 0], [-1.55, 1.0, 0]]}
//         explodeOffset={[-1.5, 0, 0]}
//         color="#6B7280"
//       />
//       {/* Inlet Flange */}
//       <mesh position={[-2.2, 0.4, 0]} castShadow rotation={[0, 0, Math.PI / 2]}>
//         <cylinderGeometry args={[0.3, 0.3, 0.08, 24]} />
//         <meshPhysicalMaterial color="#4B5563" metalness={0.8} roughness={0.2} clearcoat={0.5} />
//       </mesh>

//       {/* Curved Outlet Pipe */}
//       <CurvedPipe
//         isExploded={isExploded}
//         points={[[2.2, -0.3, 0], [1.7, -0.3, 0], [1.55, -0.1, 0], [1.55, 0.3, 0]]}
//         explodeOffset={[1.5, 0, 0]}
//         color="#6B7280"
//       />
//       {/* Outlet Flange */}
//       <mesh position={[2.2, -0.3, 0]} castShadow rotation={[0, 0, Math.PI / 2]}>
//         <cylinderGeometry args={[0.3, 0.3, 0.08, 24]} />
//         <meshPhysicalMaterial color="#4B5563" metalness={0.8} roughness={0.2} clearcoat={0.5} />
//       </mesh>

//       {/* Annotations */}
//       <Annotation position={[0, -2.6, 0]} text="Concrete Foundation" visible={isExploded} />
//       <Annotation position={[0, 0, 1.8]} text="Main Digester" visible={isExploded} />
//       <Annotation position={[0, 5.0, 0]} text="Gas Holder (Methane)" visible={isExploded} />
//       <Annotation position={[-3.2, 0.4, 0]} text="Organic Inlet" visible={isExploded} />
//       <Annotation position={[3.2, -0.3, 0]} text="Slurry Outlet" visible={isExploded} />
//       <Annotation position={[1.4, 2.4, 1.0]} text="Pressure Monitor" visible={isExploded} />
//       <Annotation position={[2.0, 1.0, 0]} text="Access Ladder" visible={isExploded} />
//     </group>
//   );
// }

// function SceneWrapper({ isExploded }: { isExploded: boolean }) {
//   const { setSceneReady } = useLoading();

//   useEffect(() => {
//     // Signal scene is ready after a short delay to ensure init
//     const t = setTimeout(() => setSceneReady(true), 1000);
//     return () => clearTimeout(t);
//   }, [setSceneReady]);

//   return (
//     <>
//       <Scene isExploded={isExploded} />
//       <Ground />
//       <Environment preset="city" />
//       <ContactShadows position={[0, -3.35, 0]} opacity={0.7} scale={16} blur={2.5} far={6} color="#000000" />
//     </>
//   );
// }

// // Need useEffect import
// import { useEffect } from "react";

// export function BiogasPlant3D() {
//   const [isExploded, setIsExploded] = useState(false);

//   return (
//     <section id="plants" className="relative py-24 px-4 bg-[#FAF9F6] dark:bg-[#0A0A0A]">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-12 text-center">
//           <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">Explore</p>
//           <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
//             Interactive Plant Model
//           </h2>
//           <p className="mt-4 text-[#86868b] max-w-xl mx-auto">
//             Click anywhere on the canvas to toggle the exploded view. Drag to rotate, scroll to zoom.
//           </p>
//         </div>

//         <div
//           className="relative h-[600px] w-full cursor-pointer overflow-hidden rounded-3xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#050505]"
//           onClick={() => setIsExploded(!isExploded)}
//         >
//           <Suspense fallback={
//             <div className="absolute inset-0 flex items-center justify-center text-[#86868b] text-sm">
//               Initializing 3D Engine...
//             </div>
//           }>
//             <Canvas shadows camera={{ position: [8, 6, 8], fov: 32 }} gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}>
//               <color attach="background" args={["#050505"]} />
//               <fog attach="fog" args={["#050505", 12, 30]} />

//               <ambientLight intensity={0.3} />
//               <directionalLight position={[8, 12, 5]} intensity={1.8} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-far={30} shadow-bias={-0.0001} />
//               <directionalLight position={[-5, 4, -5]} intensity={0.5} color="#A7F3D0" />
//               <pointLight position={[0, 6, 0]} intensity={0.8} color="#4ADE80" distance={12} decay={2} />
//               <spotLight position={[0, 12, 0]} angle={0.4} penumbra={0.6} intensity={1} castShadow />

//               <SceneWrapper isExploded={isExploded} />

//               <OrbitControls
//                 enablePan={false}
//                 minDistance={7}
//                 maxDistance={18}
//                 autoRotate={!isExploded}
//                 autoRotateSpeed={0.6}
//                 enableDamping
//                 dampingFactor={0.05}
//                 maxPolarAngle={Math.PI / 2 - 0.05}
//               />

//               <EffectComposer>
//                 <Bloom intensity={0.4} luminanceThreshold={0.85} luminanceSmoothing={0.9} />
//                 <ToneMapping adaptive />
//               </EffectComposer>
//             </Canvas>
//           </Suspense>

//           <div className="absolute bottom-6 left-6 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] shadow-lg border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/10 transition-transform active:scale-95 select-none">
//             {isExploded ? "🔧 Click to Assemble" : "💥 Click to Explode"}
//           </div>

//           <div className="absolute top-6 right-6 flex flex-col gap-2">
//             <div className="rounded-full bg-white/80 dark:bg-black/80 backdrop-blur px-3 py-1.5 text-xs font-medium text-[#86868b] border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/10">
//               🖱 Click to explode
//             </div>
//             <div className="rounded-full bg-white/80 dark:bg-black/80 backdrop-blur px-3 py-1.5 text-xs font-medium text-[#86868b] border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/10">
//               🔄 Drag to rotate
//             </div>
//           </div>
//         </div>

//         <p className="mt-6 text-center text-xs text-[#86868b]">
//           Want true photorealism? Replace the procedural model with a Blender GLB file using <code className="rounded bg-[#1A1A1A]/5 px-1 py-0.5 dark:bg-[#E5E5E5]/10">useGLTF("/models/plant.glb")</code>
//         </p>
//       </div>
//     </section>
//   );
// }

// "use client";

// import { useRef, useState, useEffect, Suspense } from "react";
// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { OrbitControls, Environment, ContactShadows, Html, MeshReflectorMaterial } from "@react-three/drei";
// import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
// import * as THREE from "three";
// import { STLLoader } from "three-stdlib";
// import { useLoading } from "./loading-provider";

// /* ─── STL Model Loader ─── */
// function RealPlantModel({ isExploded }: { isExploded: boolean }) {
//   // Load the STL file from the public folder
//   const geometry = useLoader(STLLoader, "/models/plant.stl");
//   const meshRef = useRef<THREE.Mesh>(null);

//   // Optional: Add a subtle floating/exploding effect if it's a single mesh
//   useFrame((_, delta) => {
//     if (meshRef.current) {
//       const targetY = isExploded ? 0.5 : 0;
//       meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, delta * 3);
//     }
//   });

//   return (
//     <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow position={[0, -1.5, 0]} scale={0.05} rotation={[-Math.PI / 2, 0, 0]}>
//       {/* STL files do not contain materials/colors, so we apply a high-quality physical material here */}
//       <meshPhysicalMaterial 
//         color="#2D5A3D" 
//         metalness={0.4} 
//         roughness={0.3} 
//         clearcoat={0.5} 
//         clearcoatRoughness={0.2} 
//       />
//     </mesh>
//   );
// }

// /* ─── Annotation ─── */
// function Annotation({ position, text, visible }: { position: [number, number, number]; text: string; visible: boolean }) {
//   return (
//     <Html position={position} center style={{ transition: "opacity 0.5s", opacity: visible ? 1 : 0, pointerEvents: "none" }}>
//       <div className="flex items-center gap-2 whitespace-nowrap">
//         <div className="h-2 w-2 rounded-full bg-[#4ADE80] shadow-[0_0_10px_#4ADE80]" />
//         <div className="rounded-lg bg-white/95 dark:bg-black/95 backdrop-blur px-3 py-1.5 text-xs font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] shadow-xl border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/10">
//           {text}
//         </div>
//       </div>
//     </Html>
//   );
// }

// /* ─── Ground Plane ─── */
// function Ground() {
//   return (
//     <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.35, 0]} receiveShadow>
//       <planeGeometry args={[50, 50]} />
//       <MeshReflectorMaterial
//         blur={[300, 100]}
//         resolution={1024}
//         mixBlur={1}
//         mixStrength={40}
//         roughness={1}
//         depthScale={1.2}
//         minDepthThreshold={0.4}
//         maxDepthThreshold={1.4}
//         color="#050505"
//         metalness={0.5}
//         mirror={0.5}
//       />
//     </mesh>
//   );
// }

// /* ─── Scene Assembly ─── */
// function Scene({ isExploded }: { isExploded: boolean }) {
//   const groupRef = useRef<THREE.Group>(null);

//   useFrame((state) => {
//     if (groupRef.current && !isExploded) {
//       groupRef.current.rotation.y = state.clock.elapsedTime * 0.08;
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <RealPlantModel isExploded={isExploded} />

//       {/* Adjust annotation positions based on your actual STL scale and dimensions */}
//       <Annotation position={[0, -2.6, 0]} text="Concrete Foundation" visible={isExploded} />
//       <Annotation position={[0, 0, 1.8]} text="Main Digester" visible={isExploded} />
//       <Annotation position={[0, 4.0, 0]} text="Gas Holder Dome" visible={isExploded} />
//     </group>
//   );
// }

// function SceneWrapper({ isExploded }: { isExploded: boolean }) {
//   const { setSceneReady } = useLoading();

//   useEffect(() => {
//     const t = setTimeout(() => setSceneReady(true), 1000);
//     return () => clearTimeout(t);
//   }, [setSceneReady]);

//   return (
//     <>
//       <Scene isExploded={isExploded} />
//       <Ground />
//       <Environment preset="city" />
//       <ContactShadows position={[0, -3.35, 0]} opacity={0.7} scale={16} blur={2.5} far={6} color="#000000" />
//     </>
//   );
// }

// export function BiogasPlant3D() {
//   const [isExploded, setIsExploded] = useState(false);

//   return (
//     <section id="plants" className="relative py-24 px-4 bg-[#FAF9F6] dark:bg-[#0A0A0A]">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-12 text-center">
//           <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">Explore</p>
//           <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
//             Interactive Plant Model
//           </h2>
//           <p className="mt-4 text-[#86868b] max-w-xl mx-auto">
//             Click anywhere on the canvas to toggle the exploded view. Drag to rotate, scroll to zoom.
//           </p>
//         </div>

//         <div
//           className="relative h-[600px] w-full cursor-pointer overflow-hidden rounded-3xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#050505]"
//           onClick={() => setIsExploded(!isExploded)}
//         >
//           <Suspense fallback={
//             <div className="absolute inset-0 flex items-center justify-center text-[#86868b] text-sm">
//               Loading 3D Model...
//             </div>
//           }>
//             <Canvas shadows camera={{ position: [8, 6, 8], fov: 32 }} gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}>
//               <color attach="background" args={["#050505"]} />
//               <fog attach="fog" args={["#050505", 12, 30]} />

//               <ambientLight intensity={0.3} />
//               <directionalLight position={[8, 12, 5]} intensity={1.8} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} shadow-camera-far={30} shadow-bias={-0.0001} />
//               <directionalLight position={[-5, 4, -5]} intensity={0.5} color="#A7F3D0" />
//               <pointLight position={[0, 6, 0]} intensity={0.8} color="#4ADE80" distance={12} decay={2} />
//               <spotLight position={[0, 12, 0]} angle={0.4} penumbra={0.6} intensity={1} castShadow />

//               <SceneWrapper isExploded={isExploded} />

//               <OrbitControls
//                 enablePan={false}
//                 minDistance={7}
//                 maxDistance={18}
//                 autoRotate={!isExploded}
//                 autoRotateSpeed={0.6}
//                 enableDamping
//                 dampingFactor={0.05}
//                 maxPolarAngle={Math.PI / 2 - 0.05}
//               />

//               <EffectComposer>
//                 <Bloom intensity={0.4} luminanceThreshold={0.85} luminanceSmoothing={0.9} />
//                 <ToneMapping adaptive />
//               </EffectComposer>
//             </Canvas>
//           </Suspense>

//           <div className="absolute bottom-6 left-6 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] shadow-lg border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/10 transition-transform active:scale-95 select-none">
//             {isExploded ? "🔧 Click to Assemble" : "💥 Click to Explode"}
//           </div>

//           <div className="absolute top-6 right-6 flex flex-col gap-2">
//             <div className="rounded-full bg-white/80 dark:bg-black/80 backdrop-blur px-3 py-1.5 text-xs font-medium text-[#86868b] border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/10">
//               🖱 Click to explode
//             </div>
//             <div className="rounded-full bg-white/80 dark:bg-black/80 backdrop-blur px-3 py-1.5 text-xs font-medium text-[#86868b] border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/10">
//               🔄 Drag to rotate
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { useLoading } from "./loading-provider";

export function BiogasPlant3D() {
  // Update these to match your new exploded sequence folder/names
  const framePath = "/images/explode/";
  const framePrefix = "ezgif-frame-";
  const frameExtension = ".jpg";
  const totalFrames = 300; // Set to however many frames your explosion animation has
  const framePadding = 3; 
  const smoothing = 0.02; // Controls the smoothness/speed of the explosion

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isExploded, setIsExploded] = useState(false);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(1);
  const targetFrameRef = useRef(1);
  const rafRef = useRef<number>(0);

  const getFrameName = useCallback(
    (index: number) => {
      const padded = index.toString().padStart(framePadding, "0");
      return `${framePath}${framePrefix}${padded}${frameExtension}`;
    },
    [framePath, framePrefix, frameExtension, framePadding]
  );

  const { setSceneReady } = useLoading();

  // 1. REUSED: Preload images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loaded = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = getFrameName(i);
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) setIsLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) setIsLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;
    return () => { imagesRef.current = []; };
  }, [getFrameName, totalFrames]);

  // 2. REUSED: Draw frame to canvas (keeps aspect ratio)
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex - 1];

    if (!canvas || !container || !ctx || !img || !img.complete) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    }

    const scale = Math.max(rect.width / img.width, rect.height / img.height);
    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;
    const x = (rect.width - drawWidth) / 2;
    const y = (rect.height - drawHeight) / 2;

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  }, []);

  // 3. REUSED: Animation loop (smooth scrubbing)
  useEffect(() => {
    if (!isLoaded) return;
    const loop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      
      if (Math.abs(diff) < 0.1) {
        currentFrameRef.current = targetFrameRef.current;
      } else {
        currentFrameRef.current += diff * smoothing;
      }

      drawFrame(Math.round(currentFrameRef.current));
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isLoaded, smoothing, drawFrame]);

  // 4. Handle Window Resize
  useEffect(() => {
    const handleResize = () => {
      if (isLoaded) drawFrame(Math.round(currentFrameRef.current));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLoaded, drawFrame]);

  // 5. NEW: Click handler instead of Scroll handler
  const toggleExplode = () => {
    if (!isLoaded) return;
    const nextState = !isExploded;
    setIsExploded(nextState);
    
    // Set target to last frame if exploded, or frame 1 if assembled
    targetFrameRef.current = nextState ? totalFrames : 1;
  };

  useEffect(() => {
    if (isLoaded) {
      setSceneReady(true);
    }
  }, [isLoaded, setSceneReady]);

  return (
    <section id="plants" className="relative py-24 px-4 bg-[#FAF9F6] dark:bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium tracking-[0.2em] text-[#86868b] uppercase mb-4">
            Explore
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-[#1A1A1A] dark:text-[#E5E5E5] sm:text-5xl">
            Interactive Plant Model
          </h2>
          <p className="mt-4 text-[#86868b] max-w-xl mx-auto">
            Click anywhere on the visualizer to seamlessly explode the model and view the internals.
          </p>
        </div>

        {/* Fixed height container (no scroll logic needed) */}
        <div
          ref={containerRef}
          className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full cursor-pointer overflow-hidden rounded-3xl border border-[#1A1A1A]/10 dark:border-[#E5E5E5]/10 bg-[#050505] shadow-2xl"
          onClick={toggleExplode}
        >
          {/* Loading Overlay */}
          {!isLoaded && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505] text-white">
              <Loader2 className="mb-4 h-8 w-8 animate-spin text-[#4ADE80]" />
              <div className="w-48">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-[#4ADE80] transition-all duration-100"
                    style={{
                      width: `${Math.floor((loadedCount / totalFrames) * 100)}%`,
                    }}
                  />
                </div>
                <div className="mt-2 text-center text-xs text-[#86868b]">
                  Loading High-Res Model: {Math.floor((loadedCount / totalFrames) * 100)}%
                </div>
              </div>
            </div>
          )}

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className={`absolute left-0 top-0 h-full w-full object-cover transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* UI Controls */}
          {isLoaded && (
            <>
              <div className="absolute bottom-6 left-6 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-md px-5 py-2.5 text-sm font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] shadow-lg border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/10 transition-transform active:scale-95 select-none">
                {isExploded ? "🔧 Click to Assemble" : "💥 Click to Explode"}
              </div>

              {/* These labels fade in only when the model is exploded */}
              <div 
                className={`absolute top-6 right-6 flex flex-col gap-2 transition-all duration-700 ${
                  isExploded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
                }`}
              >
                <div className="rounded-full bg-white/95 dark:bg-black/95 backdrop-blur px-4 py-2 text-xs font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/10 shadow-lg">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#4ADE80] mr-2"></span>
                  Gas Holder Dome
                </div>
                <div className="rounded-full bg-white/95 dark:bg-black/95 backdrop-blur px-4 py-2 text-xs font-semibold text-[#1A1A1A] dark:text-[#E5E5E5] border border-[#1A1A1A]/5 dark:border-[#E5E5E5]/10 shadow-lg">
                  <span className="inline-block w-2 h-2 rounded-full bg-[#0EA5E9] mr-2"></span>
                  Internal Mixer
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}