"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { Heading } from "@/lib/headings";
import { cn } from "@/lib/utils";

export function ArticleToc({ headings }: { headings: Heading[] }) {
  const t = useTranslations("Blog");
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    if (headings.length === 0) return;
    const nodes = headings
      .map(heading => document.getElementById(heading.id))
      .filter((el): el is HTMLElement => el !== null);
    if (nodes.length === 0) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          ratios.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        let best = headings[0].id;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (bestRatio > 0) setActive(best);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    nodes.forEach(node => observer.observe(node));
    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label={t("onThisPage")} className="flex flex-col gap-4">
      <p className="text-eyebrow text-muted-foreground">{t("onThisPage")}</p>
      <ol className="relative flex flex-col gap-1 border-s border-border">
        {headings.map(heading => {
          const isActive = heading.id === active;
          return (
            <li key={heading.id} className="relative">
              {isActive && (
                <motion.span
                  layoutId={reduce ? undefined : "toc-active"}
                  aria-hidden
                  className="absolute top-1.5 -inset-s-px h-4 w-0.5 bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <a
                href={`#${heading.id}`}
                className={cn(
                  "block py-1.5 ps-4 text-[0.8125rem] leading-snug transition-colors duration-300",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {heading.title}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
