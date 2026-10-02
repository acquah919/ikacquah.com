"use client";

import { useEffect, useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslations } from "next-intl";
import { loadReactions, submitReaction } from "@/app/actions/reactions";
import { playClap, playLove } from "@/lib/reaction-sound";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

const MAX_CLAPS = 10;
const MAX_LOVES = 10;
const STORAGE_KEY = "ika-article-reactions";

interface ArticleReactionsProps {
  slug: string;
  initialClaps: number;
  initialLoves: number;
}

interface StoredReaction {
  claps: number;
  loves: number;
}

function normalizeStored(raw: unknown): StoredReaction {
  if (!raw || typeof raw !== "object") return { claps: 0, loves: 0 };
  const value = raw as { claps?: unknown; loves?: unknown; loved?: unknown };
  return {
    claps: typeof value.claps === "number" ? value.claps : 0,
    loves:
      typeof value.loves === "number"
        ? value.loves
        : value.loved === true
          ? 1
          : 0,
  };
}

function readStore(): Record<string, StoredReaction> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    const next: Record<string, StoredReaction> = {};
    for (const [key, value] of Object.entries(parsed)) {
      next[key] = normalizeStored(value);
    }
    return next;
  } catch {
    return {};
  }
}

function writeStore(next: Record<string, StoredReaction>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function ArticleReactions({
  slug,
  initialClaps,
  initialLoves,
}: ArticleReactionsProps) {
  const t = useTranslations("Blog");
  const reduce = usePrefersReducedMotion();
  const [, startTransition] = useTransition();
  const [claps, setClaps] = useState(initialClaps);
  const [loves, setLoves] = useState(initialLoves);
  const [mine, setMine] = useState<StoredReaction>({ claps: 0, loves: 0 });
  const [burst, setBurst] = useState<"clap" | "love" | null>(null);

  useEffect(() => {
    const stored = readStore()[slug] ?? { claps: 0, loves: 0 };
    setMine(stored);
    void loadReactions(slug)
      .then(next => {
        setClaps(next.claps);
        setLoves(next.loves);
      })
      .catch(() => {
        setClaps(n => n + stored.claps);
        setLoves(n => n + stored.loves);
      });
  }, [slug]);

  const persistMine = (next: StoredReaction) => {
    setMine(next);
    const all = readStore();
    all[slug] = next;
    writeStore(all);
  };

  const onClap = () => {
    if (mine.claps >= MAX_CLAPS) return;
    setClaps(n => n + 1);
    persistMine({ ...mine, claps: mine.claps + 1 });
    setBurst("clap");
    void playClap();
    startTransition(async () => {
      try {
        const next = await submitReaction(slug, "clap", 1);
        setClaps(next.claps);
      } catch {
        // Local count already updated.
      }
    });
  };

  const onLove = () => {
    if (mine.loves >= MAX_LOVES) return;
    setLoves(n => n + 1);
    persistMine({ ...mine, loves: mine.loves + 1 });
    setBurst("love");
    void playLove();
    startTransition(async () => {
      try {
        const next = await submitReaction(slug, "love", 1);
        setLoves(next.loves);
      } catch {
        // Local count already updated.
      }
    });
  };

  return (
    <div className="mt-16 flex flex-wrap items-center gap-3 border-t border-border pt-10">
      <p className="text-eyebrow me-4 text-muted-foreground">
        {t("appreciate")}
      </p>
      <ReactionButton
        pressed={mine.claps > 0}
        disabled={mine.claps >= MAX_CLAPS}
        onClick={onClap}
        label={t("clap")}
        count={claps}
        emoji="👏"
        burst={burst === "clap"}
        reduce={reduce}
        onBurstEnd={() => setBurst(null)}
      />
      <ReactionButton
        pressed={mine.loves > 0}
        disabled={mine.loves >= MAX_LOVES}
        onClick={onLove}
        label={t("love")}
        count={loves}
        emoji="❤️"
        burst={burst === "love"}
        reduce={reduce}
        onBurstEnd={() => setBurst(null)}
      />
    </div>
  );
}

function ReactionButton({
  pressed,
  disabled,
  onClick,
  label,
  count,
  emoji,
  burst,
  reduce,
  onBurstEnd,
}: {
  pressed: boolean;
  disabled?: boolean;
  onClick: () => void;
  label: string;
  count: number;
  emoji: string;
  burst: boolean;
  reduce: boolean;
  onBurstEnd: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed}
      aria-label={`${label}, ${count}`}
      className={cn(
        "relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors duration-200",
        pressed
          ? "border-leaf-deep/30 bg-leaf/15 text-foreground"
          : "border-border bg-card text-muted-foreground hover:border-leaf-deep/40 hover:text-foreground",
        disabled && "cursor-default opacity-70",
      )}
    >
      <motion.span
        aria-hidden
        animate={burst && !reduce ? { scale: [1, 1.28, 1] } : { scale: 1 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="text-lg leading-none"
      >
        {emoji}
      </motion.span>
      <span>{label}</span>
      <span className="tabular-nums text-foreground">{count}</span>
      <AnimatePresence>
        {burst && !reduce && (
          <motion.span
            key={emoji}
            aria-hidden
            initial={{ opacity: 0.9, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -28, scale: 1.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={onBurstEnd}
            className="pointer-events-none absolute inset-s-4 top-0 text-lg"
          >
            {emoji}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
