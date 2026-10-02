"use client";

import { useTransition } from "react";
import { Check, ChevronDown, Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { allLocales, isLocale, localeRegistry, type Locale } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  /** `dropdown` for the header; `list` for the mobile menu and footer. */
  variant?: "dropdown" | "list";
  className?: string;
}

function useSwitchLocale() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (!isLocale(next) || !localeRegistry[next].enabled || next === locale) return;
    const { hash } = window.location;
    startTransition(() => {
      router.replace(`${pathname}${hash}`, { locale: next });
    });
  };

  return { locale, pending, switchTo };
}

export function LanguageSwitcher({ variant = "dropdown", className }: LanguageSwitcherProps) {
  const t = useTranslations("Language");
  const { locale, pending, switchTo } = useSwitchLocale();
  const enabled = allLocales.filter((l) => localeRegistry[l].enabled);
  const planned = allLocales.filter((l) => !localeRegistry[l].enabled);
  const current = localeRegistry[locale];

  if (variant === "list") {
    return (
      <ul className={cn("flex flex-col", className)} aria-label={t("label")}>
        {allLocales.map((code) => {
          const def = localeRegistry[code];
          const active = code === locale;
          return (
            <li key={code}>
              <button
                type="button"
                disabled={!def.enabled || pending}
                aria-current={active ? "true" : undefined}
                onClick={() => switchTo(code)}
                className="flex w-full items-center justify-between gap-4 border-b border-foreground/10 py-3 text-start text-sm transition-colors duration-300 enabled:hover:text-accent disabled:cursor-default disabled:text-muted-foreground/60"
              >
                <span lang={code}>{def.nativeLabel}</span>
                {active ? (
                  <Check aria-hidden className="size-4 text-accent" />
                ) : !def.enabled ? (
                  <span className="text-eyebrow text-muted-foreground/60">{t("comingSoon")}</span>
                ) : null}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className={cn("gap-1.5 px-2.5 uppercase tracking-[0.12em]", className)}
            aria-label={t("change", { language: current.label })}
          />
        }
      >
        <Languages aria-hidden className="size-4 text-muted-foreground" />
        <span className="text-xs">{locale}</span>
        <ChevronDown aria-hidden className="size-3.5 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={10} className="min-w-52 rounded-md p-1.5">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-eyebrow px-2.5 pt-2 pb-2">
            {t("label")}
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuRadioGroup value={locale} onValueChange={(value) => switchTo(String(value))}>
          {enabled.map((code) => (
            <DropdownMenuRadioItem
              key={code}
              value={code}
              className="rounded-sm py-2.5 ps-2.5 pe-9 text-sm"
            >
              <span lang={code}>{localeRegistry[code].nativeLabel}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        {planned.length > 0 && (
          <>
            <DropdownMenuSeparator className="my-1.5" />
            <DropdownMenuGroup>
              {planned.map((code) => (
                <DropdownMenuItem
                  key={code}
                  disabled
                  className="justify-between rounded-sm py-2.5 ps-2.5 pe-2.5 text-sm"
                >
                  <span lang={code}>{localeRegistry[code].nativeLabel}</span>
                  <span className="text-eyebrow text-muted-foreground">{t("comingSoon")}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export type { Locale };
