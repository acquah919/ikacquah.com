import type { Metadata } from "next";
import { ViewTransition } from "react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/blog/article-body";
import { ArticleReactions } from "@/components/blog/article-reactions";
import { ArticleToc } from "@/components/blog/article-toc";
import { DisplayHeading } from "@/components/editorial/display-heading";
import { Eyebrow } from "@/components/editorial/eyebrow";
import { DirectionalTransition } from "@/components/motion/directional-transition";
import { displayName, professor } from "@/data/professor";
import { defaultLocale, type Locale } from "@/i18n/config";
import { getPathname, Link } from "@/i18n/navigation";
import { getPost, listAvailablePosts, postLocales } from "@/lib/blog";
import { formatDate } from "@/lib/date";
import { extractHeadings } from "@/lib/headings";
import {
  absoluteUrl,
  alternatesForAvailableLocales,
  ogLocales,
  serializeJsonLd,
} from "@/lib/seo";
import { routing } from "@/i18n/routing";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    listAvailablePosts(locale).map((post) => ({ locale, slug: post.slug })),
  );
}

type BlogArticleProps = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: BlogArticleProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const typedLocale = locale as Locale;
  const post = getPost(typedLocale, slug);
  if (!post) return {};

  const availableLocales = postLocales(slug);
  const fallback = post.sourceLocale !== typedLocale;
  const href = `/blog/${slug}`;
  const canonicalPath = getPathname({ locale: post.sourceLocale, href });

  return {
    title: post.title,
    description: post.excerpt,
    alternates: alternatesForAvailableLocales(
      post.sourceLocale,
      href,
      availableLocales,
    ),
    robots: fallback ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: canonicalPath,
      siteName: displayName,
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: [displayName],
      tags: post.tags,
      ...ogLocales(post.sourceLocale, availableLocales),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogArticle({ params }: BlogArticleProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const typedLocale = locale as Locale;
  const post = getPost(typedLocale, slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: "Blog" });
  const fallback = post.sourceLocale !== typedLocale;
  const headings = extractHeadings(post.body);
  const articlePath = getPathname({
    locale: post.sourceLocale,
    href: `/blog/${slug}`,
  });
  const articleUrl = absoluteUrl(articlePath);
  const authorUrl = absoluteUrl(
    getPathname({ locale: defaultLocale, href: "/" }),
  );
  const articleJsonLd = serializeJsonLd({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#blog-posting`,
    headline: post.title,
    description: post.excerpt,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    datePublished: post.date,
    ...(post.updated ? { dateModified: post.updated } : {}),
    inLanguage: post.sourceLocale,
    articleSection: post.category,
    keywords: post.tags,
    author: {
      "@type": "Person",
      "@id": absoluteUrl("/#person"),
      name: professor.fullName,
      honorificPrefix: professor.honorific,
      url: authorUrl,
    },
  });

  return (
    <DirectionalTransition>
      <main id="main" className="flex-1">
        <article className="bg-background pt-32 pb-32 text-foreground md:pt-40">
          <script
            id="blog-posting-jsonld"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: articleJsonLd }}
          />
          <div className="container-editorial grid gap-16 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-32">
                <ArticleToc headings={headings} />
              </div>
            </aside>

            <div className="lg:col-span-8 lg:col-start-5">
              <Eyebrow className="text-accent">{post.category ?? t("eyebrow")}</Eyebrow>
              <ViewTransition name={`blog-title-${post.slug}`} share="text-morph" default="none">
                <DisplayHeading as="h1" size="md" className="mt-8">
                  {post.title}
                </DisplayHeading>
              </ViewTransition>
              <div className="mt-6 flex flex-wrap items-center gap-x-2 text-sm text-muted-foreground">
                <time dateTime={post.date}>
                  {t("published")} {formatDate(post.date, locale)}
                </time>

                <span aria-hidden="true">·</span>

                <span>{t("readingTime", { minutes: post.readingTime })}</span>
              </div>
              {fallback && (
                <p className="mt-6 rounded-md border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
                  {t("fallback")}
                </p>
              )}
              <p className="text-lead mt-10 text-muted-foreground">{post.excerpt}</p>

              {post.tags && post.tags.length > 0 && (
                <ul
                  className="mt-8 flex flex-wrap gap-2"
                  aria-label={t("topics")}
                >
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <span className="text-eyebrow inline-flex rounded-full border border-border bg-card px-3 py-1.5 text-muted-foreground">
                        {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-12">
                <ArticleBody source={post.body} />
              </div>

              <ArticleReactions slug={post.slug} initialClaps={0} initialLoves={0} />
              <p className="mt-16">
                <Link
                  href="/blog"
                  transitionTypes={["nav-back"]}
                  className="text-sm text-foreground/80 transition-colors hover:text-accent"
                >
                  ← {t("eyebrow")}
                </Link>
              </p>
            </div>
          </div>
        </article>
      </main>
    </DirectionalTransition>
  );
}
