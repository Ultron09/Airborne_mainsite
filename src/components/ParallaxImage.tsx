"use client";

import { useRef } from "react";
import Image, { ImageProps } from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps extends Omit<ImageProps, "src"> {
  src: string;
  offset?: number;
}

export default function ParallaxImage({ src, alt, offset = 40, className = "", ...props }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Moves the image slightly on the Y axis as you scroll past it
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[calc(100%+80px)] -top-[40px]">
        <Image
          src={src}
          alt={alt}
          fill
          {...props}
        />
      </motion.div>
    </div>
  );
}
