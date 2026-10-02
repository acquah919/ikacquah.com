"use client";

import { useMediaQuery } from "./use-media-query";

/**
 * Hydration-safe reduced-motion flag: false on the server and during
 * hydration, then the real preference. Use it to gate scroll-linked bindings;
 * `MotionConfig reducedMotion="user"` already handles declarative animations.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
