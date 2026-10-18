"use client";

import Image from "next/image";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { AppAppearance, PhoneDevice, ProjectScreen } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { getDirection, type Locale } from "@/i18n/config";
import { localize } from "@/i18n/localized";
import { cn } from "@/lib/utils";
import { PhoneFrame } from "./phone-frame";

interface ProjectWalkthroughProps {
  screens: ProjectScreen[];
  locale: Locale;
}

const CHAPTER_DURATION_MS = 5000;

function ScreenImages({ screen, appearance, title, reduced }: { screen: ProjectScreen; appearance: AppAppearance; title: string; reduced: boolean }) {
  const [darkReady, setDarkReady] = useState(false);
  const visibleAppearance = appearance === "dark" && darkReady ? "dark" : "light";

  return (["light", "dark"] as const).map(theme => (
    <motion.div key={theme} className="absolute inset-0" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} data-screenshot={theme} aria-hidden={theme !== visibleAppearance} initial={false} animate={{ opacity: theme === visibleAppearance ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.3 }}>
      <Image src={screen[theme]} alt={title} fill sizes="280px" loading="eager" onLoad={() => { if (theme === "dark") setDarkReady(true); }} className="object-contain object-top" />
    </motion.div>
  ));
}

export function ProjectWalkthrough({ screens, locale }: ProjectWalkthroughProps) {
  const t = useTranslations("Projects");
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [device, setDevice] = useState<PhoneDevice>("android");
  const [appearance, setAppearance] = useState<AppAppearance>("light");
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const viewer = useRef<HTMLDivElement>(null);
  const chapterButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const screen = screens[index];
  const title = localize(screen.title, locale);
  const rtl = getDirection(locale) === "rtl";

  useEffect(() => {
    const pause = () => setPlaying(false);
    const visibility = () => { if (document.hidden) pause(); };
    const observer = new IntersectionObserver(entries => {
      if (!entries[0].isIntersecting) pause();
    }, { threshold: 0 });
    if (viewer.current) observer.observe(viewer.current);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (index === screens.length - 1) {
        setPlaying(false);
        setEnded(true);
      } else setIndex(index + 1);
    }, CHAPTER_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [index, playing, screens.length]);

  function select(next: number) {
    setPlaying(false);
    setEnded(false);
    setIndex(Math.max(0, Math.min(screens.length - 1, next)));
  }

  function togglePlayback() {
    if (!playing && (ended || index === screens.length - 1)) { setIndex(0); setEnded(false); }
    setPlaying(value => !value);
  }

  return (
    <DirectionProvider direction={getDirection(locale)}>
    <section id="application" aria-labelledby="walkthrough-heading" className="project-walkthrough scroll-mt-24 py-20 md:py-28">
      <div className="container-editorial">
        <div className="mb-12 flex flex-col gap-5 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-eyebrow text-accent">{t("walkthroughEyebrow")}</p>
            <h2 id="walkthrough-heading" className="mt-4 font-display text-[clamp(2.5rem,5.5vw,5rem)] leading-[1.05] tracking-tight">{t("walkthroughTitle")}</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">{t("walkthroughNote")}</p>
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <div ref={viewer} className="walkthrough-device flex min-w-0 flex-col items-center gap-6 lg:sticky lg:top-24">
            <ToggleGroup value={[screen.id]} onValueChange={values => {
              const next = screens.findIndex(chapter => chapter.id === values[0]);
              if (next >= 0) select(next);
            }} aria-label={t("chapters")} className="walkthrough-mobile-chapters lg:hidden">
              {screens.map(chapter => <ToggleGroupItem key={chapter.id} value={chapter.id}>{t(`screenLabels.${chapter.id}`)}</ToggleGroupItem>)}
            </ToggleGroup>
            <div className="flex flex-wrap justify-center gap-3">
              <ToggleGroup value={[device]} onValueChange={values => { if (values[0]) setDevice(values[0] as PhoneDevice); }} aria-label={t("deviceFrame")} className="project-options">
                <ToggleGroupItem value="android">Pixel 11 Pro</ToggleGroupItem>
                <ToggleGroupItem value="iphone">iPhone 18 Pro</ToggleGroupItem>
              </ToggleGroup>
              <ToggleGroup value={[appearance]} onValueChange={values => { if (values[0]) setAppearance(values[0] as AppAppearance); }} aria-label={t("appAppearance")} className="project-options">
                <ToggleGroupItem value="light">{t("light")}</ToggleGroupItem>
                <ToggleGroupItem value="dark">{t("dark")}</ToggleGroupItem>
              </ToggleGroup>
            </div>
            <PhoneFrame src={screen[appearance]} alt={title} device={device} appearance={appearance} className="walkthrough-phone w-[280px] max-w-full">
              <AnimatePresence initial={false}>
                <motion.div key={screen.id} className="absolute inset-0" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.35 }}>
                  <ScreenImages screen={screen} appearance={appearance} title={title} reduced={reduced} />
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>
            <div className="flex items-center gap-3" aria-label={t("playbackControls")}>
              <Button variant="outline" size="icon" onClick={() => select(index - 1)} disabled={index === 0} aria-label={t("previousScreen")}><ArrowLeft data-icon="inline-start" className="rtl:rotate-180" /></Button>
              <Button onClick={togglePlayback} aria-pressed={playing} className="min-w-36">
                {ended ? <RotateCcw data-icon="inline-start" /> : playing ? <Pause data-icon="inline-start" /> : <Play data-icon="inline-start" />}
                {ended ? t("restart") : playing ? t("pause") : t("play")}
              </Button>
              <Button variant="outline" size="icon" onClick={() => select(index + 1)} disabled={index === screens.length - 1} aria-label={t("nextScreen")}><ArrowRight data-icon="inline-end" className="rtl:rotate-180" /></Button>
            </div>
            <div className="flex w-full max-w-[280px] flex-col gap-3">
              <div key={`${index}-${playing}-${ended}`} className="flex gap-1.5" role="progressbar" aria-label={t("demoProgress")} aria-valuemin={1} aria-valuemax={screens.length} aria-valuenow={index + 1} aria-valuetext={t("screenCount", { current: index + 1, total: screens.length })}>
                {screens.map((chapter, chapterIndex) => (
                  <div key={chapter.id} className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/15">
                    <span className="walkthrough-progress-fill" data-current={chapterIndex === index} data-playing={playing} data-complete={chapterIndex < index || ended} style={{ animationDuration: `${CHAPTER_DURATION_MS}ms` }} />
                  </div>
                ))}
              </div>
              <p className="flex justify-between gap-3 text-[0.8125rem] tabular-nums text-muted-foreground" aria-live="polite" aria-atomic="true">
                <span>{t("screenCount", { current: index + 1, total: screens.length })}</span>
                <span className={cn(playing && "text-accent")}>{ended ? t("endedStatus") : playing ? t("playingStatus") : t("pausedStatus")}</span>
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <div role="tablist" aria-label={t("chapters")} aria-orientation="vertical" className="hidden flex-col lg:flex">
              {screens.map((chapter, chapterIndex) => (
                <button key={chapter.id} ref={node => { chapterButtons.current[chapterIndex] = node; }} id={`chapter-${chapter.id}`} type="button" role="tab" aria-selected={index === chapterIndex} aria-controls="walkthrough-caption" tabIndex={index === chapterIndex ? 0 : -1}
                  onClick={() => select(chapterIndex)}
                  onKeyDown={event => {
                    const forward = event.key === "ArrowDown" || event.key === (rtl ? "ArrowLeft" : "ArrowRight");
                    const back = event.key === "ArrowUp" || event.key === (rtl ? "ArrowRight" : "ArrowLeft");
                    if (!forward && !back && event.key !== "Home" && event.key !== "End") return;
                    event.preventDefault();
                    const next = event.key === "Home" ? 0 : event.key === "End" ? screens.length - 1 : (chapterIndex + (forward ? 1 : -1) + screens.length) % screens.length;
                    select(next);
                    chapterButtons.current[next]?.focus();
                  }}
                  className={cn("walkthrough-chapter group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 py-6 text-start outline-offset-4 transition-colors focus-visible:outline-2 focus-visible:outline-ring", index === chapterIndex && "is-active")}
                >
                  <span className="chapter-number text-sm tabular-nums">{String(chapterIndex + 1).padStart(2, "0")}</span>
                  <span className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight tracking-tight" lang="en">{localize(chapter.title, locale)}</span>
                  <span className="chapter-marker" aria-hidden="true" />
                </button>
              ))}
            </div>
            <div role="tabpanel" id="walkthrough-caption" aria-labelledby={`chapter-${screen.id}`} tabIndex={0} className="mt-8 min-h-28 outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring">
              <p className="max-w-lg text-base leading-relaxed" lang="en">{localize(screen.description, locale)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    </DirectionProvider>
  );
}
