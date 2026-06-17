"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Sparkles, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from 'three';

const AnimatedGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} args={[2.5, 64, 64]}>
        <MeshDistortMaterial
          color="#00D6A1"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.2}
          transparent
          opacity={0.15}
          wireframe
        />
      </Sphere>
    </Float>
  );
}

export default function Background3D() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // default true to avoid hydration mismatch and avoid early load

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile());
    
    if (!checkMobile()) {
      // Delay initialization to improve main thread performance
      const timer = setTimeout(() => setMounted(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted || isMobile) return null;

  return (
    <div className="fixed inset-0 -z-20 h-full w-full pointer-events-none mix-blend-screen opacity-80">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00D6A1" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#34F5C5" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={200} scale={15} size={2} speed={0.4} opacity={0.2} color="#7FFFE1" />
        <AnimatedGeometry />
      </Canvas>
    </div>
  );
}
