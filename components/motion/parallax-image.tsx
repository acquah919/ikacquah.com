"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";
import type { Image as ImageData } from "@/types/content";

interface ParallaxImageProps {
  image: Omit<ImageData, "alt">;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  amount?: number;
  priority?: boolean;
}

export function ParallaxImage({
  image,
  alt,
  sizes,
  className,
  imageClassName,
  amount = 8,
  priority = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const active = !reduce && isDesktop;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${amount}%`, `${amount}%`],
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={active ? { y, scale: 1 + amount / 50 } : undefined}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imageClassName)}
        />
      </motion.div>
    </div>
  );
}
