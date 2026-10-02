"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

interface ImpactChainProps {
  steps: string[];
}

export function ImpactChain({ steps }: ImpactChainProps) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="relative">
      <motion.div
        aria-hidden
        style={reduce ? undefined : { scaleX: grow }}
        className="absolute top-0 left-0 hidden h-px w-full origin-left bg-teal md:block"
      />
      <motion.div
        aria-hidden
        style={reduce ? undefined : { scaleY: grow }}
        className="absolute top-0 left-0 h-full w-px origin-top bg-teal md:hidden"
      />
      <ol
        ref={ref}
        className="grid gap-y-10 border-l border-line pl-8 md:grid-cols-5 md:gap-x-6 md:border-t md:border-l-0 md:pl-0"
      >
        {steps.map((step, index) => (
          <ChainStep
            key={step}
            index={index}
            total={steps.length}
            progress={scrollYProgress}
            reduce={reduce}
          >
            {step}
          </ChainStep>
        ))}
      </ol>
    </div>
  );
}

interface ChainStepProps {
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
  children: React.ReactNode;
}

function ChainStep({ index, total, progress, reduce, children }: ChainStepProps) {
  const start = index / total;
  const end = Math.min(start + 1 / total, 1);
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);

  return (
    <motion.li
      style={reduce ? undefined : { opacity, y }}
      className="relative flex flex-col gap-3 md:pt-10"
    >
      <span
        aria-hidden
        className="absolute top-2 -left-8 size-2 -translate-x-1/2 rounded-full bg-teal md:top-0 md:left-0 md:translate-x-0 md:-translate-y-1/2"
      />
      <span className="text-eyebrow text-graphite">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="text-display-sm">{children}</span>
    </motion.li>
  );
}
