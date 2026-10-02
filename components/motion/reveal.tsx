"use client";

import { motion, type HTMLMotionProps } from "motion/react";

export const editorialEase = [0.22, 1, 0.36, 1] as const;

type RevealTag =
  | "div"
  | "li"
  | "p"
  | "span"
  | "figure"
  | "figcaption"
  | "article";

const elements = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  figure: motion.figure,
  figcaption: motion.figcaption,
  article: motion.article,
};

interface RevealProps extends HTMLMotionProps<"div"> {
  as?: RevealTag;
  delay?: number;
  y?: number;
  amount?: number;
  once?: boolean;
}

export function Reveal({
  as = "div",
  children,
  delay = 0,
  y = 28,
  amount = 0.3,
  once = true,
  ...props
}: RevealProps) {
  const Element = elements[as] as typeof motion.div;
  return (
    <Element
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.85, ease: editorialEase, delay }}
      {...props}
    >
      {children}
    </Element>
  );
}
