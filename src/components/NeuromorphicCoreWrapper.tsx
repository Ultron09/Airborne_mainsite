"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const NeuromorphicCore = dynamic(() => import("./NeuromorphicCore"), { ssr: false });

export default function NeuromorphicCoreWrapper() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(checkMobile());

    if (!checkMobile()) {
      // Delay loading the 3D background to prioritize main content render and reduce TBT
      const timer = setTimeout(() => {
        setMounted(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!mounted || isMobile) return null;

  return <NeuromorphicCore />;
}
