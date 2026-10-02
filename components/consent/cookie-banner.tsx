"use client";

import { useSyncExternalStore } from "react";
import { Cookie } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

const COOKIE = "ika_consent";
const MAX_AGE = 60 * 60 * 24 * 365;
const CHANGE_EVENT = "ika:consent";

type Consent = "unknown" | "accepted" | "declined" | "unset";

function readConsent(): Consent {
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE}=(accepted|declined)`),
  );
  return match ? (match[1] as Consent) : "unset";
}

function writeConsent(value: "accepted" | "declined") {
  document.cookie = `${COOKIE}=${value}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${
    location.protocol === "https:" ? "; Secure" : ""
  }`;
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
}

export function CookieBanner() {
  const consent = useSyncExternalStore(
    subscribe,
    readConsent,
    (): Consent => "unknown",
  );
  const t = useTranslations("Cookie");
  const open = consent === "unset";

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          role="region"
          aria-label={t("title")}
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: 24,
            scale: 0.98,
            transition: { duration: 0.25 },
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 26,
            mass: 0.9,
            delay: 1.2,
          }}
          className="fixed inset-x-4 bottom-4 z-40 sm:inset-x-auto sm:inset-e-6 sm:bottom-6 sm:max-w-sm"
        >
          <div className="rounded-md border border-border bg-popover/95 p-5 text-popover-foreground shadow-[0_24px_60px_-24px_rgb(0_0_0/0.35)] backdrop-blur-md">
            <div className="flex items-start gap-3">
              <Cookie
                aria-hidden
                className="mt-0.5 size-4 shrink-0 text-accent"
              />
              <div className="flex flex-col gap-1.5">
                <p className="font-display text-lg leading-snug">
                  {t("title")}
                </p>
                <p className="text-[0.8125rem] leading-relaxed text-muted-foreground">
                  {t("body")}
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <Button size="sm" onClick={() => writeConsent("accepted")}>
                {t("accept")}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => writeConsent("declined")}
              >
                {t("decline")}
              </Button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
