"use client";

import { FileText } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/editorial/eyebrow";
import { SplitLines } from "@/components/motion/split-lines";

interface PublicationsHeroProps {
  count: number;
  pdfCount: number;
  wordCount: number;
}

const documents = [
  { className: "start-[4%] top-[18%]", delay: 0, format: "PDF", rotation: -8 },
  { className: "end-[3%] top-[7%]", delay: 0.5, format: "PDF", rotation: 7 },
  { className: "start-[28%] bottom-[3%]", delay: 1, format: "PDF", rotation: 2 },
] as const;

export function PublicationsHero({ count, pdfCount, wordCount }: PublicationsHeroProps) {
  const t = useTranslations("Publications");
  const reduce = useReducedMotion();

  return (
    <section
      data-theme="dark"
      className="dark relative isolate overflow-hidden bg-background pt-32 pb-20 text-foreground md:pt-40 md:pb-28 lg:min-h-176"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(70%_80%_at_85%_20%,rgb(79_163_165/0.23),transparent_65%),radial-gradient(55%_75%_at_5%_100%,rgb(143_192_88/0.12),transparent_68%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-[0.09] mask-[linear-gradient(to_bottom,black,transparent_88%)]"
      />

      <div className="container-editorial grid items-center gap-16 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow className="text-accent">{t("eyebrow")}</Eyebrow>
          </motion.div>
          <SplitLines
            as="h1"
            trigger="mount"
            delay={reduce ? 0 : 0.08}
            lines={[
              { text: t("titleFirst") },
              { text: t("titleSecond"), className: "italic normal-case text-accent" },
            ]}
            className="text-display-xl mt-8 max-w-4xl"
          />
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduce ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-lead mt-8 max-w-2xl text-muted-foreground"
          >
            {t("lead")}
          </motion.p>
          <motion.dl
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: reduce ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-foreground/10 pt-6"
          >
            <div>
              <dt className="text-eyebrow text-muted-foreground">{t("records")}</dt>
              <dd className="mt-2 font-display text-3xl leading-none">{count}</dd>
            </div>
            <div>
              <dt className="text-eyebrow text-muted-foreground">{t("formats")}</dt>
              <dd className="mt-2 font-display text-3xl leading-none">
                {pdfCount} <span className="font-sans text-xs text-muted-foreground">PDF</span>
                {wordCount > 0 ? (
                  <>
                    <span className="mx-3 text-border">/</span>
                    {wordCount} <span className="font-sans text-xs text-muted-foreground">DOCX</span>
                  </>
                ) : null}
              </dd>
            </div>
          </motion.dl>
        </div>

        <div
          aria-hidden
          className="relative mx-auto h-80 w-full max-w-120 lg:col-span-5 lg:h-120"
        >
          <motion.div
            className="absolute inset-[12%] rounded-full border border-accent/25"
            animate={reduce ? undefined : { rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_24px_rgb(143_192_88/0.65)]" />
          </motion.div>
          <div className="absolute inset-[26%] rounded-full border border-dashed border-foreground/15" />

          {documents.map((document) => (
            <motion.div
              key={`${document.format}-${document.delay}`}
              className={`absolute flex aspect-4/5 w-34 flex-col justify-between rounded-md border border-paper/70 bg-paper/95 p-5 text-ink shadow-[0_24px_70px_-28px_rgb(0_0_0/0.8)] backdrop-blur-sm sm:w-40 ${document.className}`}
              initial={
                reduce
                  ? { rotate: document.rotation }
                  : { opacity: 0, y: 24, rotate: document.rotation - 2 }
              }
              animate={
                reduce
                  ? { rotate: document.rotation }
                  : {
                      opacity: 1,
                      y: [0, -10, 0],
                      rotate: [document.rotation, document.rotation + 1.5, document.rotation],
                    }
              }
              transition={{
                opacity: { duration: 0.55, delay: document.delay, ease: "easeOut" },
                y: {
                  duration: 5.5,
                  delay: document.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 5.5,
                  delay: document.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <FileText className="size-7 text-leaf-deep" strokeWidth={1.4} />
              <div className="space-y-2">
                <span className="block h-px w-full bg-stone/60" />
                <span className="block h-px w-4/5 bg-stone/60" />
                <span className="block h-px w-3/5 bg-stone/60" />
              </div>
              <span className="text-eyebrow text-ink/60">{document.format}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
