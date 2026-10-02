import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/editorial/section";
import { SectionHeading } from "@/components/editorial/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { services } from "@/data/home";
import { sectionIds } from "@/data/navigation";
import type { Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { pick } from "@/i18n/localized";

export function Services({ locale }: { locale: Locale }) {
  const t = pick(locale);

  return (
    <Section id={sectionIds.services} theme="ivory" aria-labelledby="services-heading">
      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <SectionHeading
              id="services-heading"
              index={services.index}
              eyebrow={t(services.eyebrow)}
              lines={t(services.lines)}
            />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9 lg:pt-24">
            <p className="text-lead text-muted-foreground">{t(services.body)}</p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-md bg-border md:mt-28 lg:grid-cols-2">
          {t(services.strands).map((strand, index) => (
            <Reveal
              as="article"
              key={strand.title}
              delay={index * 0.1}
              amount={0.25}
              className="group relative flex flex-col gap-8 bg-card p-8 md:p-12"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-700 ease-(--ease-editorial) group-hover:scale-x-100 rtl:origin-right"
              />
              <span className="text-eyebrow tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-display-sm">{strand.title}</h3>
              <p className="max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">
                {strand.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12 grid gap-8 lg:grid-cols-12">
          <p className="text-sm leading-relaxed text-muted-foreground lg:col-span-7">
            {t(services.disclaimer)}
          </p>
          <div className="lg:col-span-4 lg:col-start-9 lg:text-end">
            <Link
              href={{ pathname: "/", hash: sectionIds.connect }}
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
            >
              {t(services.ctaLabel)}
              <ArrowUpRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
