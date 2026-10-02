"use client";

import { useState, useSyncExternalStore } from "react";
import { Download } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/components/ui/button";
import { navHref, visibleNavigation } from "@/data/navigation";
import { professor } from "@/data/professor";
import { useActiveSection } from "@/hooks/use-active-section";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";
import { Wordmark } from "./wordmark";

type SurfaceTheme = "light" | "dark";
type HeaderState = `${"top" | "scrolled"}|${SurfaceTheme}`;

/** Theme of the section currently sitting under the header bar. */
function readSurfaceTheme(): SurfaceTheme {
  const documentDark = document.documentElement.classList.contains("dark");
  const hits = document.elementsFromPoint(window.innerWidth / 2, 40);
  for (const el of hits) {
    if (el.closest("header")) continue;
    const surface = el.closest<HTMLElement>("[data-theme]");
    if (surface?.dataset.theme === "dark") return "dark";
    if (surface?.dataset.theme === "light")
      return documentDark ? "dark" : "light";
  }
  return documentDark ? "dark" : "light";
}

function subscribeToViewport(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  window.addEventListener("resize", onChange);
  return () => {
    window.removeEventListener("scroll", onChange);
    window.removeEventListener("resize", onChange);
  };
}

function readHeaderState(): HeaderState {
  return `${window.scrollY > 24 ? "scrolled" : "top"}|${readSurfaceTheme()}`;
}

const indicatorSpring = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.7,
} as const;

export function SiteHeader() {
  const t = useTranslations("Header");
  const tNav = useTranslations("Nav");
  const state = useSyncExternalStore(
    subscribeToViewport,
    readHeaderState,
    (): HeaderState => "top|light",
  );
  const [position, surface] = state.split("|") as [
    "top" | "scrolled",
    SurfaceTheme,
  ];
  const scrolled = position === "scrolled";
  const pathname = usePathname();
  const activeId = useActiveSection(
    visibleNavigation.map(item => item.hash ?? ""),
  );
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <header
      data-scrolled={scrolled || undefined}
      data-surface={surface}
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 mx-auto w-full border text-foreground transition-[max-width,background-color,border-color,color,box-shadow,top,border-radius] duration-500 ease-(--ease-editorial)",
        surface === "dark" && "dark",
        scrolled
          ? "max-w-[min(76rem,calc(100%-1.5rem))] border-foreground/10 bg-background/85 shadow-[0_18px_50px_-30px_rgb(0_0_0/0.45)] backdrop-blur-md supports-backdrop-filter:bg-background/75 md:top-3 md:rounded-[1.75rem]"
          : "max-w-[100vw] border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label={tNav("label")}
        className={cn(
          "flex items-center justify-between transition-[height,padding] duration-500 ease-(--ease-editorial)",
          scrolled
            ? "h-14 px-4 md:ps-6 md:pe-3"
            : "container-editorial h-20 md:h-24",
        )}
      >
        <Wordmark
          transitionTypes={pathname !== "/" ? ["nav-back"] : undefined}
        />

        <ul
          className="hidden items-center lg:flex"
          onPointerLeave={() => setHovered(null)}
        >
          {visibleNavigation.map(item => {
            const isActive = item.hash
              ? item.hash === activeId
              : pathname === item.pathname;
            return (
              <li key={item.key} className="relative">
                <Link
                  href={navHref(item)}
                  transitionTypes={
                    item.pathname !== "/" ? ["nav-forward"] : undefined
                  }
                  onPointerEnter={() => setHovered(item.key)}
                  onFocus={() => setHovered(item.key)}
                  onBlur={() => setHovered(null)}
                  className={cn(
                    "relative block rounded-full px-3 py-2 text-[0.8125rem] font-medium tracking-tight transition-colors duration-300 xl:px-3.5",
                    isActive || hovered === item.key
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {hovered === item.key && (
                    <motion.span
                      layoutId="nav-hover"
                      aria-hidden
                      transition={indicatorSpring}
                      className="absolute inset-0 rounded-full bg-foreground/[0.06]"
                    />
                  )}
                  <span className="relative z-10">{tNav(item.key)}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      transition={indicatorSpring}
                      className="absolute bottom-0.5 start-1/2 size-1 -translate-x-1/2 rounded-full bg-accent"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-0.5 md:gap-1">
          <LanguageSwitcher className="hidden md:inline-flex" />
          <ThemeToggle className="hidden md:inline-flex" />
          <Button
            size="sm"
            variant="outline"
            nativeButton={false}
            className="ms-1 hidden md:inline-flex"
            render={
              <a href={professor.cv.href} download={professor.cv.fileName} />
            }
          >
            {t("downloadCv")}
            <Download aria-hidden className="size-3.5" />
          </Button>
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
