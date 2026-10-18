import type { Metadata } from "next";
import { locale as getRootLocale } from "next/root-params";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { DisplayHeading } from "@/components/editorial/display-heading";
import { Eyebrow } from "@/components/editorial/eyebrow";
import { DirectionalTransition } from "@/components/motion/directional-transition";
import { BlogLibrary } from "@/components/blog/blog-library";
import { displayName } from "@/data/professor";
import type { Locale } from "@/i18n/config";
import { getPathname } from "@/i18n/navigation";
import { listPosts } from "@/lib/blog";
import { alternatesFor, ogLocales } from "@/lib/seo";
import { routing } from "@/i18n/routing";

type BlogIndexProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: BlogIndexProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Blog" });
  const title = t("eyebrow");
  const description = t("lead");
  const typedLocale = locale as Locale;

  return {
    title,
    description,
    alternates: alternatesFor(typedLocale, "/blog"),
    openGraph: {
      type: "website",
      title,
      description,
      url: getPathname({ locale: typedLocale, href: "/blog" }),
      siteName: displayName,
      ...ogLocales(typedLocale),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogIndex() {
  const locale = await getRootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = listPosts(locale as Locale);

  return (
    <DirectionalTransition>
      <main id="main" className="flex-1">
        <section className="bg-background pt-32 pb-14 text-foreground md:pt-40 md:pb-20">
          <div className="container-editorial">
            <Eyebrow className="text-accent">{t("eyebrow")}</Eyebrow>
            <DisplayHeading as="h1" size="lg" className="mt-8 max-w-5xl">
              {t("title")}
            </DisplayHeading>
            <p className="text-lead mt-8 max-w-xl text-muted-foreground">{t("lead")}</p>
          </div>
        </section>

        <BlogLibrary
          locale={locale as Locale}
          posts={posts.map(({ slug, sourceLocale, title, date, category, tags, readingTime }) => ({ slug, sourceLocale, title, date, category, tags, readingTime }))}
        />
      </main>
    </DirectionalTransition>
  );
}
