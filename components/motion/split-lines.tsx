"use client";

import { motion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";
import { editorialEase } from "./reveal";

type HeadingTag = "h1" | "h2" | "h3" | "p" | "div";

export interface SplitLine {
  text: string;
  className?: string;
}

interface SplitLinesProps {
  lines: (string | SplitLine)[];
  as?: HeadingTag;
  id?: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  trigger?: "mount" | "inView";
}

const containers = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  div: motion.div,
};

const lineVariants: Variants = {
  hidden: { y: "108%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: "spring", stiffness: 140, damping: 18, mass: 0.65 },
      opacity: { duration: 0.4, ease: editorialEase },
    },
  },
};

export function SplitLines({
  lines,
  as = "h2",
  id,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  trigger = "inView",
}: SplitLinesProps) {
  const Container = containers[as];
  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const triggerProps =
    trigger === "mount"
      ? { animate: "visible" }
      : { whileInView: "visible", viewport: { once: true, amount: 0.35 } };

  return (
    <Container
      id={id}
      className={className}
      initial="hidden"
      variants={containerVariants}
      {...triggerProps}
    >
      {lines.map((line, index) => {
        const item = typeof line === "string" ? { text: line } : line;
        return (
          <span
            key={`${item.text}-${index}`}
            className="-mb-[0.08em] -mx-[0.28em] block px-[0.28em] pt-[0.16em] pb-[0.3em] [clip-path:inset(0_-0.5em)]"
          >
            <motion.span
              variants={lineVariants}
              className={cn(
                "inline-block w-max max-w-full pe-[0.22em]",
                lineClassName,
                item.className,
              )}
            >
              {item.text}
            </motion.span>
          </span>
        );
      })}
    </Container>
  );
}
