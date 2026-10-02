import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/editorial/section";
import { SectionHeading } from "@/components/editorial/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { ScanCompare } from "@/components/research/scan-compare";
import { research } from "@/data/home";
import { sectionIds } from "@/data/navigation";
import { researchAreas } from "@/data/research";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/localized";

export async function ResearchAreas({ locale }: { locale: Locale }) {
  const t = pick(locale);
  const ui = await getTranslations({ locale, namespace: "Sections" });

  return (
    <Section id={sectionIds.research} theme="dark" aria-labelledby="research-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_100%_100%,rgb(20_92_99/0.55),transparent_60%)]"
      />

      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="min-w-0 lg:col-span-7">
            <SectionHeading
              id="research-heading"
              index={research.index}
              eyebrow={t(research.eyebrow)}
              lines={t(research.lines)}
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="text-lead text-muted-foreground">{t(research.intro)}</p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-10 md:mt-28 lg:grid-cols-12 lg:items-center">
          <Reveal y={40} amount={0.2} className="lg:col-span-7">
            <ScanCompare
              labels={{
                aria: ui("compareLabel"),
                mri: ui("mri"),
                ct: ui("syntheticCt"),
                hint: ui("dragHint"),
                illustrative: ui("illustrative"),
              }}
            />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="text-[0.9375rem] leading-relaxed text-foreground/85">
              {t(research.compareCaption)}
            </p>
          </Reveal>
        </div>

        <ol className="mt-24 border-b border-foreground/12 md:mt-32">
          {researchAreas.map((area, index) => {
            const title = t(area.title);
            return (
              <Reveal
                as="li"
                key={area.slug}
                delay={index * 0.05}
                amount={0.2}
                y={20}
                className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 gap-y-4 border-t border-foreground/12 py-8 md:grid-cols-12 md:gap-x-6 md:py-10"
              >
                <span className="text-eyebrow tabular-nums text-muted-foreground transition-colors duration-500 group-hover:text-accent md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-display-md md:col-span-5 md:transition-transform md:duration-500 md:ease-(--ease-editorial) md:group-hover:translate-x-3 md:rtl:group-hover:-translate-x-3">
                  {title}
                </h3>

                <div className="col-span-2 flex flex-col gap-4 md:col-span-5 md:col-start-7 md:opacity-60 md:transition-opacity md:duration-500 md:group-hover:opacity-100">
                  <p className="max-w-md text-[0.9375rem] leading-relaxed text-foreground/85">
                    {t(area.description)}
                  </p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-2" aria-label={ui("topics", { title })}>
                    {t(area.tags).map((tag) => (
                      <li key={tag} className="text-eyebrow text-muted-foreground/80">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <ArrowUpRight
                  aria-hidden
                  className="hidden size-5 self-center justify-self-end text-accent opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-x-1 group-hover:opacity-100 md:col-span-1 md:block rtl:-scale-x-100 rtl:group-hover:-translate-x-1"
                />
              </Reveal>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
