"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { motion, type Variants } from "motion/react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { editorialEase } from "@/components/motion/reveal";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navHref, visibleNavigation } from "@/data/navigation";
import { professor } from "@/data/professor";
import { Link } from "@/i18n/navigation";
import { Wordmark } from "./wordmark";

const list: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 320, damping: 30, mass: 0.8 },
  },
};

/** Full-screen menu with navigation, language, theme, and CV. */
export function MobileMenu() {
  const t = useTranslations("Header");
  const tNav = useTranslations("Nav");
  const tCommon = useTranslations("Common");
  const tFooter = useTranslations("Footer");
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="sm" className="-me-2 text-sm" />}>
        {tCommon("menu")}
      </SheetTrigger>
      <SheetContent
        side="top"
        showCloseButton={false}
        className="dark inset-0 flex h-dvh w-full flex-col overflow-y-auto bg-background text-foreground data-[side=top]:h-dvh data-[side=top]:border-none"
      >
        <SheetTitle className="sr-only">{tCommon("menu")}</SheetTitle>
        <SheetDescription className="sr-only">
          {t("menuDescription", { name: professor.fullName })}
        </SheetDescription>

        <div className="container-editorial flex h-20 shrink-0 items-center justify-between">
          <Wordmark onClick={close} transitionTypes={["nav-back"]} />
          <Button variant="ghost" size="sm" className="-me-2 text-sm" onClick={close}>
            {tCommon("close")}
          </Button>
        </div>

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={list}
          className="container-editorial flex flex-col gap-1 pt-6 pb-4"
        >
          {visibleNavigation.map((entry, index) => (
            <motion.li key={entry.key} variants={item}>
              <Link
                href={navHref(entry)}
                onClick={close}
                transitionTypes={entry.pathname !== "/" ? ["nav-forward"] : undefined}
                className="group flex items-baseline gap-5 border-b border-foreground/10 py-4"
              >
                <span className="text-eyebrow w-6 tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-[2.375rem] leading-none tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {tNav(entry.key)}
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.45, duration: 0.6, ease: editorialEase } }}
          className="container-editorial mt-auto grid gap-8 pb-10 pt-6 sm:grid-cols-2"
        >
          <div>
            <p className="text-eyebrow mb-3 text-muted-foreground">{tFooter("language")}</p>
            <LanguageSwitcher variant="list" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <ThemeToggle withLabel className="-ms-3" />
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href={professor.cv.href} download={professor.cv.fileName} />}
            >
              {t("downloadCv")}
              <Download aria-hidden className="size-4" />
            </Button>
          </div>
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
