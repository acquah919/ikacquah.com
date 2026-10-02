import type { Metadata } from "next";
import { ViewTransition } from "react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { DisplayHeading } from "@/components/editorial/display-heading";
import { Eyebrow } from "@/components/editorial/eyebrow";
import { DirectionalTransition } from "@/components/motion/directional-transition";
import { displayName } from "@/data/professor";
import type { Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import { listPosts } from "@/lib/blog";
import { alternatesFor } from "@/lib/seo";
import { routing } from "@/i18n/routing";
import { formatDate } from "@/lib/date";

type BlogIndexProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: BlogIndexProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Blog" });
  return {
    title: t("eyebrow"),
    description: t("lead"),
    alternates: alternatesFor(locale as Locale, "/blog"),
  };
}

export default async function BlogIndex({ params }: BlogIndexProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = listPosts(locale as Locale);

  return (
    <DirectionalTransition>
      <main id="main" className="flex-1">
        <section className="bg-background pt-32 pb-24 text-foreground md:pt-40">
          <div className="container-editorial">
            <Eyebrow className="text-accent">{t("eyebrow")}</Eyebrow>
            <DisplayHeading as="h1" size="lg" className="mt-8 max-w-5xl">
              {t("title")}
            </DisplayHeading>
            <p className="text-lead mt-8 max-w-xl text-muted-foreground">{t("lead")}</p>
          </div>
        </section>

        <section className="border-t border-border bg-card pb-32 text-card-foreground">
          <div className="container-editorial">
            {posts.length === 0 ? (
              <p className="max-w-md py-20 text-[0.9375rem] leading-relaxed text-muted-foreground">
                {t("empty")}
              </p>
            ) : (
              <ol className="divide-y divide-border">
                {posts.map((post) => (
                  <ViewTransition key={post.slug}>
                    <li>
                      <Link
                        href={`/blog/${post.slug}`}
                        transitionTypes={["nav-forward"]}
                        prefetch
                        className="group grid gap-4 py-10 md:grid-cols-12 md:items-baseline"
                      >
                        <div className="text-eyebrow flex flex-wrap items-center gap-x-2 text-muted-foreground md:col-span-2">
                          <time dateTime={post.date}>
                            {formatDate(post.date, locale)}
                          </time>

                          <span aria-hidden="true">·</span>

                          <span className="mt-3">{t("readingTime", { minutes: post.readingTime })}</span>
                        </div>

                        <div className="flex flex-col gap-3 md:col-span-8">
                          {post.category && (
                            <span className="text-eyebrow text-accent">{post.category}</span>
                          )}

                          <ViewTransition
                            name={`blog-title-${post.slug}`}
                            share="text-morph"
                            default="none"
                          >
                            <h2 className="text-display-sm transition-colors duration-300 group-hover:text-accent">
                              {post.title}
                            </h2>
                          </ViewTransition>

                          <p className="max-w-xl text-[0.9375rem] leading-relaxed text-muted-foreground">
                            {post.excerpt}
                          </p>

                          {post.tags && post.tags.length > 0 && (
                            <ul
                              className="flex flex-wrap gap-2 pt-1"
                              aria-label={t("topics")}
                            >
                              {post.tags.map((tag) => (
                                <li key={tag}>
                                  <span className="text-eyebrow inline-flex rounded-full border border-border px-2.5 py-1 text-muted-foreground">
                                    {tag}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                        <span className="text-eyebrow text-muted-foreground transition-colors group-hover:text-accent md:col-span-2 md:text-end">
                          {t("read")}
                        </span>
                      </Link>
                    </li>
                  </ViewTransition>
                ))}
              </ol>
            )}
            <p className="sr-only">{displayName}</p>
          </div>
        </section>
      </main>
    </DirectionalTransition>
  );
}
