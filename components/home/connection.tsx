import { ArrowUpRight, Download } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/editorial/section";
import { SectionHeading } from "@/components/editorial/section-heading";
import { EmailReveal } from "@/components/layout/email-reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { connection } from "@/data/home";
import { sectionIds } from "@/data/navigation";
import { professor } from "@/data/professor";
import type { Locale } from "@/i18n/config";
import { pick } from "@/i18n/localized";

export async function Connection({ locale }: { locale: Locale }) {
  const t = pick(locale);
  const ui = await getTranslations({ locale, namespace: "Sections" });

  return (
    <Section id={sectionIds.connect} theme="ivory" aria-labelledby="connection-heading">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_50%_100%,rgb(20_92_99/0.14),transparent_70%)] dark:bg-[radial-gradient(70%_60%_at_50%_100%,rgb(79_163_165/0.16),transparent_70%)]"
      />

      <div className="container-editorial">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading
              id="connection-heading"
              index={connection.index}
              eyebrow={t(connection.eyebrow)}
              lines={t(connection.lines)}
              size="xl"
              accent="last"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <p className="text-lead text-muted-foreground">{t(connection.body)}</p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-10 lg:col-span-5 lg:col-start-8">
            <ul className="flex flex-col gap-3">
              {t(connection.invitations).map((item) => (
                <li key={item} className="flex items-center gap-4 text-foreground">
                  <span aria-hidden className="h-px w-6 bg-accent" />
                  <span className="text-[0.9375rem] leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <dl className="grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
              {professor.email && (
                <div className="flex flex-col gap-2">
                  <dt className="text-eyebrow text-muted-foreground">{ui("emailLabel")}</dt>
                  <dd>
                    <EmailReveal email={professor.email} className="text-sm" />
                  </dd>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <dt className="text-eyebrow text-muted-foreground">{ui("locationLabel")}</dt>
                <dd className="text-sm text-foreground">{t(professor.location)}</dd>
              </div>
            </dl>

            <div className="flex flex-wrap items-center gap-3">
              {professor.email && (
                <Magnetic>
                  <Button
                    size="lg"
                    nativeButton={false}
                    render={<a href={`mailto:${professor.email}`} />}
                  >
                    {t(connection.cta)}
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 rtl:-scale-x-100"
                    />
                  </Button>
                </Magnetic>
              )}
              <Magnetic>
                <Button
                  size="lg"
                  variant="ghost"
                  nativeButton={false}
                  render={<a href={professor.cv.href} download={professor.cv.fileName} />}
                >
                  {t(connection.secondaryCta)}
                  <Download aria-hidden className="size-4" />
                </Button>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
