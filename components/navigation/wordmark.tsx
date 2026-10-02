"use client";

import { useTranslations } from "next-intl";
import { displayName } from "@/data/professor";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  onClick?: () => void;
  transitionTypes?: string[];
}

export function Wordmark({
  className,
  onClick,
  transitionTypes,
}: WordmarkProps) {
  const t = useTranslations("Header");

  return (
    <Link
      href="/"
      onClick={onClick}
      transitionTypes={transitionTypes}
      aria-label={t("home", { name: displayName })}
      className={cn(
        "font-display text-[1.375rem] leading-none tracking-tight whitespace-nowrap text-foreground",
        className,
      )}
    >
      {displayName}
    </Link>
  );
}
