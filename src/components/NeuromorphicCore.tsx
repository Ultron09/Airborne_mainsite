"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Generate thousands of random points in a sphere
function Particles({ count = 3000 }) {
  const points = useRef<THREE.Points>(null);
  
  // Track mouse position for parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Create a sphere distribution
      // eslint-disable-next-line react-hooks/purity
      const r = 15 * Math.cbrt(Math.random());
      // eslint-disable-next-line react-hooks/purity
      const theta = Math.random() * 2 * Math.PI;
      // eslint-disable-next-line react-hooks/purity
      const phi = Math.acos(2 * Math.random() - 1);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  useFrame(() => {
    if (points.current) {
      // Subtle constant rotation
      points.current.rotation.y += 0.001;
      points.current.rotation.x += 0.0005;

      // Parallax effect based on mouse
      const targetX = mousePosition.x * 2;
      const targetY = mousePosition.y * 2;
      
      points.current.position.x += (targetX - points.current.position.x) * 0.05;
      points.current.position.y += (targetY - points.current.position.y) * 0.05;
      
      // Scroll effect (Zooming into the network)
      const scrollZ = scrollY * 0.01;
      points.current.position.z = scrollZ;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00D6A1" // Airborne Neon Cyan
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function NeuromorphicCore() {
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    // Optimize pixel ratio for mobile devices
    const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDpr(isMobile ? 1 : Math.min(2, window.devicePixelRatio));
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#050505]">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        dpr={dpr}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#050505", 5, 20]} />
        <ambientLight intensity={0.5} />
        <Particles count={4000} />
      </Canvas>
      {/* Vignette overlay for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#050505] opacity-80" />
    </div>
  );
}
