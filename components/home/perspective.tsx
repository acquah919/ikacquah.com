import { Section } from "@/components/editorial/section";
import { Eyebrow } from "@/components/editorial/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { SplitLines } from "@/components/motion/split-lines";
import { perspective } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/localized";

export function Perspective({ locale }: { locale: Locale }) {
  const t = pick(locale);
  const lines = t(perspective.lines).map((text, index, all) => ({
    text,
    className: index === all.length - 1 ? "text-teal-bright" : undefined,
  }));

  return (
    <Section theme="teal" aria-labelledby="perspective-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_20%_0%,rgb(79_163_165/0.28),transparent_60%),radial-gradient(60%_50%_at_100%_100%,rgb(11_17_20/0.6),transparent_70%)]"
      />
      <div className="container-editorial">
        <Reveal className="flex items-baseline gap-4">
          <span className="text-eyebrow tabular-nums text-warm-white/60">{perspective.index}</span>
          <Eyebrow className="text-teal-bright">{t(perspective.eyebrow)}</Eyebrow>
        </Reveal>
        <div className="mt-12 lg:max-w-[11ch] lg:text-display-lg">
          <SplitLines
            as="h2"
            id="perspective-heading"
            lines={lines}
            className="text-display-lg"
            stagger={0.09}
          />
        </div>
      </div>
    </Section>
  );
}
