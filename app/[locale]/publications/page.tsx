import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { DirectionalTransition } from "@/components/motion/directional-transition";
import { PublicationLibrary } from "@/components/publications/publication-library";
import { PublicationsHero } from "@/components/publications/publications-hero";
import { publications } from "@/data/publications";
import { researchAreas } from "@/data/research";
import type { Locale } from "@/i18n/config";
import { localize } from "@/i18n/localized";
import { routing } from "@/i18n/routing";
import { alternatesFor } from "@/lib/seo";

type PublicationsPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: PublicationsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Publications" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: alternatesFor(locale as Locale, "/publications"),
  };
}

export default async function PublicationsPage({ params }: PublicationsPageProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const localizedAreas = researchAreas.map((area) => ({
    slug: area.slug,
    label: localize(area.title, locale as Locale),
  }));
  const pdfCount = publications.filter((publication) => publication.file.format === "pdf").length;
  const wordCount = publications.length - pdfCount;

  return (
    <DirectionalTransition>
      <main id="main" className="flex-1">
        <PublicationsHero
          count={publications.length}
          pdfCount={pdfCount}
          wordCount={wordCount}
        />
        <PublicationLibrary publications={publications} areas={localizedAreas} />
      </main>
    </DirectionalTransition>
  );
}
