"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import React, { useRef } from "react";
import Link from "next/link";

export const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const Hover3DCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2, z: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ perspective: 1000 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FloatingElement = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    animate={{ y: [0, -15, 0] }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };

export const MagneticButton = ({ children, className = "", href }: { children: React.ReactNode, className?: string, href?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Magnetic pull distance (max 20px)
    x.set((e.clientX - centerX) * 0.2);
    y.set((e.clientY - centerY) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.div>
  );

  if (href) {
    if (href.startsWith("http")) {
      return <a href={href}>{Inner}</a>;
    }
    return <Link href={href}>{Inner}</Link>;
  }
  
  return <button>{Inner}</button>;
};

const defaultScrollOffset: any = ["start end", "center center"];

export const ScrollReveal = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: defaultScrollOffset
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div ref={ref} style={{ opacity, scale, y }} className={className}>
      {children}
    </motion.div>
  );
};

const tiltSpringConfig = { damping: 20, stiffness: 200, mass: 0.5 };

export const IsometricTilt = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Transform mouse position to rotation degrees
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), tiltSpringConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), tiltSpringConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalize coordinates between -0.5 and 0.5
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
