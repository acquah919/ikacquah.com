"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

export function BackToTop() {
  const t = useTranslations("Footer");

  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 380, damping: 18 }}
      className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      {t("backToTop")}
      <span className="inline-flex size-7 items-center justify-center rounded-full border border-foreground/15">
        <ArrowUp aria-hidden className="size-3.5" />
      </span>
    </motion.button>
  );
}
