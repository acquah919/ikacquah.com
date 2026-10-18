"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { navHref, visibleNavigation } from "@/data/navigation";
import { useActiveSection } from "@/hooks/use-active-section";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Wordmark } from "./wordmark";

const indicatorSpring = { type: "spring", stiffness: 420, damping: 32, mass: 0.7 } as const;

export function NavigationLinks({ pathname = null }: { pathname?: string | null }) {
  const t = useTranslations("Nav");
  const activeId = useActiveSection(visibleNavigation.map(item => item.hash ?? ""), pathname ?? "");
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <ul className="hidden items-center xl:flex" onPointerLeave={() => setHovered(null)}>
      {visibleNavigation.map(item => {
        const active = item.hash ? item.hash === activeId : pathname === item.pathname || pathname?.startsWith(`${item.pathname}/`);
        return (
          <li key={item.key} className="relative">
            <Link
              href={navHref(item)}
              aria-current={active ? "page" : undefined}
              transitionTypes={item.pathname !== "/" ? ["nav-forward"] : undefined}
              onPointerEnter={() => setHovered(item.key)}
              onFocus={() => setHovered(item.key)}
              onBlur={() => setHovered(null)}
              className={cn("relative block rounded-full px-3 py-2 text-[0.8125rem] font-medium tracking-tight transition-colors duration-300 xl:px-3.5", active || hovered === item.key ? "text-foreground" : "text-muted-foreground")}
            >
              {hovered === item.key && <motion.span layoutId="nav-hover" aria-hidden transition={indicatorSpring} className="absolute inset-0 rounded-full bg-foreground/[0.06]" />}
              <span className="relative z-10">{t(item.key)}</span>
              {active && <motion.span layoutId="nav-active" aria-hidden transition={indicatorSpring} className="absolute bottom-0.5 start-1/2 size-1 -translate-x-1/2 rounded-full bg-accent" />}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function RouteNavigation() {
  return <NavigationLinks pathname={usePathname()} />;
}

export function RouteWordmark() {
  const pathname = usePathname();
  return <Wordmark transitionTypes={pathname !== "/" ? ["nav-back"] : undefined} />;
}
