import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero/hero";
import { DirectionalTransition } from "@/components/motion/directional-transition";
import { Connection } from "@/components/home/connection";
import { Educator } from "@/components/home/educator";
import { Impact } from "@/components/home/impact";
import { Perspective } from "@/components/home/perspective";
import { ResearchAreas } from "@/components/home/research-areas";
import { Services } from "@/components/home/services";
import { Statement } from "@/components/home/statement";
import { displayName, professor } from "@/data/professor";
import { localize } from "@/i18n/localized";
import { routing } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: {
      absolute: t("homeTitle", {
        name: displayName,
        title: localize(professor.title, locale),
        university: localize(professor.current.institution, locale),
      }),
    },
    alternates: alternatesFor(locale, "/"),
  };
}

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  return (
    <DirectionalTransition>
    <main id="main" className="flex-1">
      <Hero locale={locale} />
      <Statement locale={locale} />
      <ResearchAreas locale={locale} />
      <Impact locale={locale} />
      <Educator locale={locale} />
      <Services locale={locale} />
      <Perspective locale={locale} />
      <Connection locale={locale} />
    </main>
    </DirectionalTransition>
  );
}
