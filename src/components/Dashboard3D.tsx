"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTranslations } from 'next-intl';

function ChartBars() {
  const groupRef = useRef<THREE.Group>(null);
  const data = useMemo(() => [0.4, 0.7, 0.5, 0.9, 0.6, 0.8, 1.0], []);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {data.map((val, i) => (
        <mesh key={i} position={[(i - 3) * 0.8, val * 1.5 - 1.5, 0]}>
          <boxGeometry args={[0.5, val * 3, 0.5]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#00D6A1" : "#34F5C5"} 
            emissive={i % 2 === 0 ? "#00D6A1" : "#34F5C5"}
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>
      ))}
      {/* Base Platform */}
      <mesh position={[0, -1.6, 0]}>
        <cylinderGeometry args={[4, 4, 0.1, 32]} />
        <meshStandardMaterial color="#021F1B" wireframe opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

function DataRings() {
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ringRef1.current) {
      ringRef1.current.rotation.x = Math.sin(t * 0.5) * 0.2 + Math.PI / 2;
      ringRef1.current.rotation.z = t * 0.5;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.x = Math.cos(t * 0.4) * 0.2 + Math.PI / 2;
      ringRef2.current.rotation.z = -t * 0.3;
    }
  });

  return (
    <group position={[0, 1, 0]}>
      <mesh ref={ringRef1}>
        <torusGeometry args={[3, 0.05, 16, 100]} />
        <meshStandardMaterial color="#00D6A1" emissive="#00D6A1" emissiveIntensity={0.8} />
      </mesh>
      <mesh ref={ringRef2} scale={1.2}>
        <torusGeometry args={[3, 0.02, 16, 100]} />
        <meshStandardMaterial color="#34F5C5" emissive="#34F5C5" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export default function Dashboard3D() {
  const t = useTranslations('Analytics');

  return (
    <div className="w-full h-[500px] relative rounded-3xl overflow-hidden glass-panel border border-primary/20">
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold text-primary backdrop-blur-md shadow-[0_0_10px_rgba(0,214,161,0.2)]">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          {t('badge')}
        </div>
      </div>
      <Canvas camera={{ position: [0, 2, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#34F5C5" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D6A1" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <ChartBars />
          <DataRings />
        </Float>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2.2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-8 pointer-events-none z-10">
        <div className="text-center glass-panel p-3 rounded-xl border border-white/5 backdrop-blur-md">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('metric1')}</p>
          <p className="text-xl font-bold text-white font-mono">2.4x</p>
        </div>
        <div className="text-center glass-panel p-3 rounded-xl border border-white/5 backdrop-blur-md">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t('metric2')}</p>
          <p className="text-xl font-bold text-white font-mono">94%</p>
        </div>
      </div>
    </div>
  );
}
