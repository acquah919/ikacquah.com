import { Section } from "@/components/editorial/section";
import { SectionHeading } from "@/components/editorial/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { statement } from "@/data/home";
import { sectionIds } from "@/data/navigation";
import { professor } from "@/data/professor";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/localized";

export function Statement({ locale }: { locale: Locale }) {
  const t = pick(locale);
  const labels = t(statement.factLabels);
  const former = professor.former[0];
  const facts = [
    {
      label: labels.role,
      value: `${t(professor.current.role)}, ${t(professor.current.unit!)}, ${t(professor.current.institution)}`,
    },
    former && {
      label: labels.former,
      value: `${t(former.role)}, ${t(former.institution)}`,
    },
    { label: labels.location, value: t(professor.location) },
    { label: labels.values, value: t(professor.values).join(" \u00b7 ") },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact));

  return (
    <Section id={sectionIds.about} theme="white" aria-labelledby="statement-heading">
      <div className="container-editorial grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="min-w-0 lg:col-span-5">
          <SectionHeading
            id="statement-heading"
            index={statement.index}
            eyebrow={t(statement.eyebrow)}
            lines={t(statement.lines)}
          />
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
          <div className="flex flex-col gap-7">
            {t(statement.paragraphs).map((paragraph, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <p className="text-lead text-muted-foreground first:text-foreground">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-16">
            <dl className="grid gap-8 border-t border-border pt-8 sm:grid-cols-2">
              {facts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-3">
                  <dt className="text-eyebrow text-muted-foreground">{fact.label}</dt>
                  <dd className="font-display text-xl leading-snug text-foreground">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
