"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // If scrolling up, reverse direction
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  // The text loops cleanly. The magic number `-20%, -40%` works depending on how many
  // duplicates there are. We'll duplicate it 4 times, meaning each one is 25% of the total width.
  // We wrap it between -20% and -45% for seamless looping.
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  return (
    <div className="parallax overflow-hidden flex whitespace-nowrap m-0 leading-none">
      <motion.div className="scroller flex text-6xl md:text-8xl lg:text-9xl font-heading font-extrabold uppercase tracking-tighter" style={{ x }}>
        <span className="block mr-12 text-transparent opacity-100" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.7)" }}>{children} </span>
        <span className="block mr-12 text-transparent opacity-100" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.7)" }}>{children} </span>
        <span className="block mr-12 text-transparent opacity-100" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.7)" }}>{children} </span>
        <span className="block mr-12 text-transparent opacity-100" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.7)" }}>{children} </span>
        <span className="block mr-12 text-transparent opacity-100" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.7)" }}>{children} </span>
        <span className="block mr-12 text-transparent opacity-100" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.7)" }}>{children} </span>
      </motion.div>
    </div>
  );
}

export default function VelocityMarquee({ text }: { text: string }) {
  return (
    <section className="relative w-full py-20 flex flex-col gap-4 overflow-hidden bg-black/40 border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      <ParallaxText baseVelocity={-2}>{text}</ParallaxText>
      <ParallaxText baseVelocity={2}>{text}</ParallaxText>
    </section>
  );
}
