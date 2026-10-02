"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface EmailRevealProps {
  email: string;
  className?: string;
}

export function EmailReveal({ email, className }: EmailRevealProps) {
  const t = useTranslations("Sections");
  const [revealed, setRevealed] = useState(false);
  const [user, domain] = email.split("@");

  if (revealed) {
    return (
      <a
        href={`mailto:${email}`}
        className={cn(
          "underline decoration-foreground/30 underline-offset-4 transition-colors hover:text-accent",
          className,
        )}
      >
        {email}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setRevealed(true)}
      aria-label={t("revealEmail")}
      className={cn(
        "cursor-pointer text-start underline decoration-dotted decoration-foreground/40 underline-offset-4 transition-colors hover:text-accent",
        className,
      )}
    >
      <span aria-hidden>
        {user} [at] {domain}
      </span>
    </button>
  );
}
