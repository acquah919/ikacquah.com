"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useLocale } from "next-intl";
import { getDirection } from "@/i18n/config";
import { cn } from "@/lib/utils";
import { ScanPlate } from "./scan-plate";

interface ScanCompareProps {
  labels: {
    aria: string;
    mri: string;
    ct: string;
    hint: string;
    illustrative: string;
  };
  className?: string;
}

export function ScanCompare({ labels, className }: ScanCompareProps) {
  const rtl = getDirection(useLocale()) === "rtl";
  const [value, setValue] = useState(58);
  const raw = useMotionValue(58);
  const position = useSpring(raw, { stiffness: 320, damping: 32, mass: 0.6 });
  const clip = useTransform(position, p =>
    rtl ? `inset(0 0 0 ${100 - p}%)` : `inset(0 ${100 - p}% 0 0)`,
  );
  const inlineStart = useTransform(position, p => `${p}%`);
  const ctOpacity = useTransform(position, [0, 18, 100], [0, 1, 1]);
  const mriOpacity = useTransform(position, [0, 82, 100], [1, 1, 0]);

  const update = (next: number) => {
    setValue(next);
    raw.set(next);
  };

  return (
    <figure className={cn("group/scan flex flex-col gap-4", className)}>
      <div className="relative aspect-4/3 overflow-hidden rounded-md bg-black shadow-[0_30px_80px_-40px_rgb(0_0_0/0.8)] ring-1 ring-foreground/10 select-none">
        <ScanPlate variant="mri" className="absolute inset-0" />
        <motion.div style={{ clipPath: clip }} className="absolute inset-0">
          <ScanPlate variant="ct" />
        </motion.div>

        <motion.span
          aria-hidden
          style={{ insetInlineStart: inlineStart }}
          className="pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-white/80 rtl:translate-x-1/2"
        >
          <span className="absolute top-1/2 inset-s-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-charcoal/70 text-white backdrop-blur-sm transition-transform duration-300 group-hover/scan:scale-105 group-focus-within/scan:ring-2 group-focus-within/scan:ring-teal-bright">
            <svg
              viewBox="0 0 24 24"
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
            >
              <path d="M9 6 5 12l4 6M15 6l4 6-4 6" />
            </svg>
          </span>
        </motion.span>

        <motion.span
          aria-hidden
          style={{ opacity: ctOpacity }}
          className="text-eyebrow pointer-events-none absolute top-4 inset-s-4 rounded-full bg-charcoal/60 px-3 py-1.5 text-white/90 backdrop-blur-sm"
        >
          {labels.ct}
        </motion.span>
        <motion.span
          aria-hidden
          style={{ opacity: mriOpacity }}
          className="text-eyebrow pointer-events-none absolute top-4 inset-e-4 rounded-full bg-charcoal/60 px-3 py-1.5 text-white/90 backdrop-blur-sm"
        >
          {labels.mri}
        </motion.span>

        <span
          aria-hidden
          className="text-eyebrow pointer-events-none absolute bottom-4 inset-e-4 -translate-x-1/2 text-white/60 transition-opacity duration-500 group-hover/scan:opacity-0"
        >
          {labels.hint}
        </span>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={value}
          onChange={event => update(Number(event.target.value))}
          aria-label={labels.aria}
          aria-valuetext={`${value}% ${labels.ct}`}
          className="sr-slider absolute inset-0 z-10 h-full w-full opacity-0 focus-visible:opacity-0"
        />
      </div>
      <figcaption className="text-eyebrow text-muted-foreground">
        {labels.illustrative}
      </figcaption>
    </figure>
  );
}
