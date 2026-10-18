"use client";

import { Suspense, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./mobile-menu";
import { Wordmark } from "./wordmark";
import { NavigationLinks, RouteNavigation, RouteWordmark } from "./route-navigation";

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

export function SiteHeader() {
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
        <Suspense fallback={<Wordmark />}>
          <RouteWordmark />
        </Suspense>
        <Suspense fallback={<NavigationLinks />}>
          <RouteNavigation />
        </Suspense>

        <div className="flex items-center gap-0.5 md:gap-1">
          <LanguageSwitcher className="hidden md:inline-flex" />
          <ThemeToggle className="hidden md:inline-flex" />

          <div className="xl:hidden">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
