"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Exact mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing position
  const springConfig = { damping: 20, stiffness: 200, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only run on non-touch devices
    if (typeof window !== 'undefined' && ("ontouchstart" in window || navigator.maxTouchPoints > 0)) {
      return;
    }

    // Hide default cursor completely for that immersive feel
    document.documentElement.classList.add('hide-cursor');

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('hide-cursor');
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        html.hide-cursor, html.hide-cursor * {
          cursor: none !important;
        }
      `}} />
      
      {/* Outer Orbital Ring 1 (Dashed) */}
      <motion.div
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-primary/40 border-dashed pointer-events-none z-[9998]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
          rotate: 360,
          borderColor: isHovering ? "rgba(0,214,161,1)" : "rgba(0,214,161,0.4)"
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 8, ease: "linear" },
          scale: { type: "spring", stiffness: 300, damping: 20 }
        }}
      />

      {/* Outer Orbital Ring 2 (Solid, opposite rotation) */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 rounded-full border border-primary/20 pointer-events-none z-[9998]"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicking ? 0.9 : isHovering ? 1.2 : 1,
          rotate: -360,
          opacity: isHovering ? 0 : 1
        }}
        transition={{
          rotate: { repeat: Infinity, duration: 12, ease: "linear" },
          scale: { type: "spring", stiffness: 300, damping: 20 }
        }}
      />

      {/* Core Dot (Immediate tracking with difference blending) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
          backgroundColor: "#ffffff"
        }}
        animate={{
          scale: isHovering ? 4 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
    </>
  );
}
