"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { GlyphMatrix } from "@/components/ui/glyph-matrix";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const MEDICAL_GLYPHS = [
  "α",
  "β",
  "γ",
  "Δ",
  "λ",
  "μ",
  "Ω",
  "∑",
  "∫",
  "∇",
  "∂",
  "√",
  "±",
  "°",
  "ψ",
  "φ",
  "θ",
  "σ",
  "ħ",
  "⊕",
  "⊗",
  "⊙",
  "Gy",
  "Sv",
  "Bq",
  "eV",
  "CT",
  "MRI",
  "DNA",
  "RNA",
  "e⁻",
] as const;

export function FieldGlyphs() {
  const { resolvedTheme } = useTheme();
  const reduce = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const sync = () => setEnabled(media.matches && !reduce);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [reduce]);

  if (!enabled) return null;

  return (
    <GlyphMatrix
      glyphs={MEDICAL_GLYPHS}
      cellSize={18}
      mutationRate={0.02}
      interval={160}
      fadeBottom={0.72}
      color={
        resolvedTheme === "dark"
          ? "oklch(0.748 0.132 128)"
          : "oklch(0.452 0.108 128)"
      }
      className="absolute inset-0 opacity-35 dark:opacity-25"
    />
  );
}
