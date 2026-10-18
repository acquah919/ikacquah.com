"use client";

import { useMemo, useSyncExternalStore } from "react";

/**
 * Tracks which of the given section ids currently occupies the reading band
 * of the viewport. Returns `null` before hydration and when none is in view.
 */
export function useActiveSection(ids: readonly string[], pathname: string) {
  const key = ids.filter(Boolean).join("|");
  const store = useMemo(() => {
    let active: string | null = null;

    return {
      getSnapshot: () => active,
      subscribe(onChange: () => void) {
        if (pathname !== "/" || !key) return () => {};

        const sectionIds = key.split("|");
        const observed = new Set<HTMLElement>();
        const ratios = new Map<string, number>();
        const observer = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
            }
            let best: string | null = null;
            let bestRatio = 0;
            for (const [id, ratio] of ratios) {
              if (ratio > bestRatio) {
                best = id;
                bestRatio = ratio;
              }
            }
            if (active !== best) {
              active = best;
              onChange();
            }
          },
          { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
        );
        const watchSections = () => {
          for (const id of sectionIds) {
            const element = document.getElementById(id);
            if (element && !observed.has(element)) {
              observed.add(element);
              observer.observe(element);
            }
          }
          if (observed.size === sectionIds.length) pendingSections.disconnect();
        };
        // A navigation can commit the header before streamed sections arrive.
        const pendingSections = new MutationObserver(watchSections);
        pendingSections.observe(document.body, { childList: true, subtree: true });
        watchSections();

        return () => {
          observer.disconnect();
          pendingSections.disconnect();
        };
      },
    };
  }, [key, pathname]);

  return useSyncExternalStore(store.subscribe, store.getSnapshot, () => null);
}
