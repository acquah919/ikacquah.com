import { ArrowRight } from "lucide-react";
import { Section } from "@/components/editorial/section";
import { SectionHeading } from "@/components/editorial/section-heading";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { Reveal } from "@/components/motion/reveal";
import { impact } from "@/data/home";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/localized";

export function Impact({ locale }: { locale: Locale }) {
  const t = pick(locale);
  const chain = t(impact.chain);

  return (
    <Section theme="ivory" padded={false} aria-labelledby="impact-heading">
      <div className="grid lg:grid-cols-12">
        <ParallaxImage
          image={impact.image}
          alt={t(impact.image.alt)}
          sizes="(min-width: 1024px) 50vw, 100vw"
          amount={6}
          className="clip-graduation aspect-4/5 sm:aspect-16/10 lg:col-span-6 lg:aspect-auto lg:min-h-svh"
        />

        <div className="flex flex-col justify-center py-24 lg:col-span-5 lg:col-start-8 lg:py-32">
          <div className="container-editorial lg:px-0 lg:pe-8">
            <SectionHeading
              id="impact-heading"
              index={impact.index}
              eyebrow={t(impact.eyebrow)}
              lines={t(impact.lines)}
              size="lg"
              accent="last"
            />

            <Reveal delay={0.1} className="mt-12">
              <ol
                className="flex flex-wrap items-center gap-x-3 gap-y-2"
                aria-label={t(impact.eyebrow)}
              >
                {chain.map((step, index) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="text-eyebrow text-foreground">{step}</span>
                    {index < chain.length - 1 && (
                      <ArrowRight
                        aria-hidden
                        className="size-3.5 text-accent rtl:-scale-x-100"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </Reveal>

            <dl className="mt-14 flex flex-col divide-y divide-border border-y border-border">
              {t(impact.pillars).map((pillar, index) => (
                <Reveal
                  key={pillar.title}
                  delay={0.15 + index * 0.1}
                  amount={0.4}
                  className="group grid gap-3 py-7 sm:grid-cols-[8rem_1fr] sm:gap-8"
                >
                  <dt className="font-display text-2xl text-foreground transition-colors duration-500 group-hover:text-accent">
                    {pillar.title}
                  </dt>
                  <dd className="text-[0.9375rem] leading-relaxed text-muted-foreground">
                    {pillar.body}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
