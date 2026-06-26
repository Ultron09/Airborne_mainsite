"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Count to 100 over ~1.5 seconds.
    const duration = 1500;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      // Simple easing
      const easeProgress = 1 - Math.pow(1 - currentStep / steps, 3);
      const val = Math.min(100, Math.floor(easeProgress * 100));
      setProgress(val);

      if (currentStep >= steps) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Hold at 100% briefly before fading
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
        >
          <div className="absolute inset-0 bg-noise opacity-30" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <img
              src="/logo.webp"
              alt="Airborne HRS Logo"
              className="h-16 w-16 rounded-2xl object-contain shadow-[0_0_40px_rgba(0,214,161,0.5)]"
            />
          </motion.div>

          <div className="font-heading text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter">
            {progress.toString().padStart(3, "0")}<span className="text-primary text-4xl md:text-6xl align-top">%</span>
          </div>

          <div className="mt-8 text-primary font-mono text-sm tracking-[0.3em] uppercase opacity-70">
            Initializing Cognitive Fabric
          </div>
          
          <div className="w-64 h-1 bg-white/10 mt-8 rounded-full overflow-hidden relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-primary"
              style={{ width: `${progress}%` }}
              layout
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
