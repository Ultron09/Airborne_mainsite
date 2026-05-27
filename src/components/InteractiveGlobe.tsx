"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Float, PointMaterial, Points, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Random points on a sphere
const generateGlobePoints = (count = 1000, radius = 2) => {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(-1 + (2 * i) / count);
    const theta = Math.sqrt(count * Math.PI) * phi;
    
    positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
    positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }
  return positions;
};

const GlobePoints = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = generateGlobePoints(2000, 2.1);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial 
        transparent 
        color="#00D6A1" 
        size={0.03} 
        sizeAttenuation={true} 
        depthWrite={false} 
        opacity={0.6}
      />
    </Points>
  );
};

const InnerCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.y = state.clock.elapsedTime * -0.1;
      coreRef.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <Sphere ref={coreRef} args={[1.9, 32, 32]}>
      <MeshDistortMaterial
        color="#063C35"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        transparent
        opacity={0.8}
        wireframe={true}
      />
    </Sphere>
  );
};

const NodeMarker = ({ position, color, label }: { position: [number, number, number], color: string, label: string }) => {
  return (
    <Float speed={2} floatIntensity={1} rotationIntensity={1}>
      <mesh position={position}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color={color} />
        <pointLight color={color} intensity={2} distance={2} />
      </mesh>
    </Float>
  );
};

export default function InteractiveGlobe() {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="#34F5C5" />
        
        <GlobePoints />
        <InnerCore />
        
        {/* Active Nodes */}
        <group>
          {/* US-NY */}
          <NodeMarker position={[1.5, 0.8, 1.2]} color="#00D6A1" label="US-NY" />
          {/* UK-LND */}
          <NodeMarker position={[0.8, 1.2, 1.5]} color="#7FFFE1" label="UK-LND" />
          {/* IN-KA */}
          <NodeMarker position={[-1.2, 0.5, -1.5]} color="#34F5C5" label="IN-KA" />
          {/* US-IL */}
          <NodeMarker position={[1.2, 0.9, 1.0]} color="#00D6A1" label="US-IL" />
        </group>
      </Canvas>
    </div>
  );
}
