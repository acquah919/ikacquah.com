import { Section } from "@/components/editorial/section";
import { SectionHeading } from "@/components/editorial/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { educator } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/localized";

export function Educator({ locale }: { locale: Locale }) {
  const t = pick(locale);
  const sequence = t(educator.sequence);

  return (
    <Section theme="white" aria-labelledby="educator-heading">
      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-6">
            <SectionHeading
              id="educator-heading"
              index={educator.index}
              eyebrow={t(educator.eyebrow)}
              lines={t(educator.lines)}
            />
          </div>
          <div className="flex flex-col gap-10 lg:col-span-5 lg:col-start-8 lg:pt-24">
            <Reveal>
              <p className="text-lead text-muted-foreground">{t(educator.body)}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {t(educator.pillars).map((pillar) => (
                  <li key={pillar} className="flex items-center gap-3 text-sm text-foreground">
                    <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                    {pillar}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <ol
          className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:mt-28 lg:grid-cols-5"
          aria-label={t(educator.eyebrow)}
        >
          {sequence.map((word, index) => (
            <Reveal
              as="li"
              key={word}
              delay={index * 0.12}
              amount={0.4}
              className="group flex flex-col gap-4"
            >
              <span className="text-eyebrow tabular-nums text-muted-foreground transition-colors duration-500 group-hover:text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="block h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-(--ease-editorial) group-hover:scale-x-100 rtl:origin-right" />
              <span className="font-display text-3xl uppercase tracking-tight sm:text-4xl">{word}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
