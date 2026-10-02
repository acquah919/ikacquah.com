"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const rings = [
  { cx: 420, cy: 400, rx: 380, ry: 300, travel: 18 },
  { cx: 430, cy: 395, rx: 320, ry: 245, travel: 26 },
  { cx: 440, cy: 390, rx: 262, ry: 194, travel: 36 },
  { cx: 448, cy: 386, rx: 206, ry: 148, travel: 46 },
  { cx: 454, cy: 383, rx: 152, ry: 106, travel: 56 },
  { cx: 458, cy: 381, rx: 100, ry: 68, travel: 66 },
  { cx: 460, cy: 380, rx: 50, ry: 33, travel: 78 },
];

export function IsodoseField({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const finePointer = useMediaQuery("(pointer: fine)");
  const reduce = usePrefersReducedMotion();
  const active = finePointer && !reduce;

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || !active) return;

    let px = 0;
    let py = 0;
    let raf = 0;
    let visible = true;

    const flush = () => {
      raf = 0;
      if (!visible) return;
      svg.style.setProperty("--iso-x", px.toFixed(3));
      svg.style.setProperty("--iso-y", py.toFixed(3));
    };

    const onMove = (event: PointerEvent) => {
      px = (event.clientX / window.innerWidth) * 2 - 1;
      py = (event.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(flush);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = Boolean(entry?.isIntersecting);
      },
      { rootMargin: "80px" },
    );
    io.observe(svg);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, [active]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className={cn(className)}
      viewBox="0 0 800 800"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      style={{ "--iso-x": 0, "--iso-y": 0 } as React.CSSProperties}
    >
      {rings.map((ring, index) => (
        <ellipse
          key={`${ring.rx}-${ring.ry}`}
          cx={ring.cx}
          cy={ring.cy}
          rx={ring.rx}
          ry={ring.ry}
          strokeWidth={index === rings.length - 1 ? 1.6 : 1}
          className={index === rings.length - 1 ? "text-accent" : undefined}
          style={{
            transform: `translate(calc(var(--iso-x) * ${ring.travel}px), calc(var(--iso-y) * ${ring.travel}px))`,
            transition: active
              ? "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)"
              : undefined,
            willChange: active ? "transform" : undefined,
          }}
        />
      ))}
    </svg>
  );
}
