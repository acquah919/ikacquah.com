"use client";

import Image from "next/image";
import { ArrowDown, Download } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/editorial/eyebrow";
import { SplitLines } from "@/components/motion/split-lines";
import { sectionIds } from "@/data/navigation";
import type { DisplayLine } from "@/data/home";
import { Link } from "@/i18n/navigation";
import { HeroBackdrop } from "./hero-backdrop";

interface HeroStageProps {
  eyebrow: string;
  roles: string[];
  lines: DisplayLine[];
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  cv: { href: string; fileName: string };
  portrait: { src: string; alt: string; width: number; height: number };
}

const PORTRAIT_BLUR =
  "data:image/webp;base64,UklGRiABAABXRUJQVlA4WAoAAAAQAAAACwAADQAAQUxQSIUAAAABgJpt27Ll/iz/0aqmfwBWodKJDMAE7s4G7s4INJrHP+Hv994XNkREhCQtlHcDSiWlan9ExpX9676VbCiVlKjRN2MqEiWpdAxDypMkUW/0Hm5Hmkqqm18YzNtmZZgQIsQQGVznywb4YuyM8p8DDhw8E20DX0wDAFZQOCB0AAAAEAIAnQEqDAAOAAOAWiWwAnQGLr2cMWGAYAD+zZ4Itwk3DzN0VNeU4wTTh2wLqxbQ+Lk5uZ04qYk72QoKd3jZmu1DE3FhoRSsZ2UExxC6teABbP9Z0WYAo61T+a7DBl8ouPY2uH1a5dZosgDIgUgymNQAAAA=";

const spring = { type: "spring", stiffness: 120, damping: 20, mass: 0.7 } as const;
const fadeTween = { duration: 0.5, ease: [0.22, 1, 0.36, 1] } as const;

export function HeroStage({
  eyebrow,
  roles,
  lines,
  lead,
  primaryCta,
  secondaryCta,
  cv,
  portrait,
}: HeroStageProps) {
  const reduce = useReducedMotion();
  const displayLines = lines.map((line) => ({
    text: line.text,
    className: line.style === "caps" ? "uppercase" : "italic text-accent",
  }));

  const enter = reduce
    ? { initial: false as const, animate: { opacity: 1, y: 0, scale: 1 } }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { ...spring, opacity: fadeTween },
      };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-svh flex-col overflow-x-clip overflow-y-hidden bg-background pt-24 text-foreground md:pt-28"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={fadeTween}
        className="absolute inset-0 -z-10"
      >
        <HeroBackdrop />
      </motion.div>

      <div className="container-editorial grid flex-1 grid-cols-1 items-end gap-x-8 gap-y-8 lg:grid-cols-12 lg:gap-x-10">
        <div className="relative z-20 min-w-0 pt-8 pb-8 lg:col-span-7 lg:pb-24 lg:pe-4">
          <motion.div {...enter} className="flex flex-col gap-3">
            <Eyebrow className="text-accent">{eyebrow}</Eyebrow>
            <p className="text-eyebrow text-muted-foreground">{roles.join("  \u00b7  ")}</p>
          </motion.div>

          <SplitLines
            as="h1"
            id="hero-heading"
            trigger="mount"
            delay={reduce ? 0 : 0.12}
            stagger={0.07}
            lines={displayLines}
            className="text-display-xl mt-8 max-w-full pe-[0.12em] md:mt-10"
          />

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: reduce ? 0 : 0.38, opacity: fadeTween }}
            className="text-lead mt-8 max-w-md text-muted-foreground md:mt-10"
          >
            {lead}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: reduce ? 0 : 0.48, opacity: fadeTween }}
            className="mt-10 flex flex-wrap items-center gap-3 md:mt-12"
          >
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href={{ pathname: "/", hash: sectionIds.research }} />}
            >
              {primaryCta}
              <ArrowDown aria-hidden className="size-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<a href={cv.href} download={cv.fileName} />}
            >
              {secondaryCta}
              <Download aria-hidden className="size-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 36, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 70,
            damping: 16,
            mass: 0.85,
            opacity: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          }}
          className="portrait-plate relative z-0 mx-auto w-full max-w-[16rem] self-end sm:max-w-[20rem] md:max-w-[24rem] lg:col-span-5 lg:max-w-none"
        >
          <Image
            key={portrait.src}
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            priority
            placeholder="blur"
            blurDataURL={PORTRAIT_BLUR}
            sizes="(min-width: 1024px) 38vw, (min-width: 640px) 24rem, 20rem"
            className="h-auto max-h-[78svh] w-full object-contain object-bottom"
          />
        </motion.div>
      </div>
    </section>
  );
}
