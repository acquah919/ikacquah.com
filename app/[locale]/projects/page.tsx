import type { Metadata } from "next";
import Image from "next/image";
import { locale as getRootLocale } from "next/root-params";
import { ArrowUpRight } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { DirectionalTransition } from "@/components/motion/directional-transition";
import { Reveal } from "@/components/motion/reveal";
import { DevicePair } from "@/components/projects/device-pair";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import { displayName } from "@/data/professor";
import type { Locale } from "@/i18n/config";
import { localize } from "@/i18n/localized";
import { getPathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { alternatesFor, ogLocales } from "@/lib/seo";

interface ProjectsPageProps { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Projects" });
  return {
    title: t("metaTitle"), description: t("metaDescription"),
    alternates: alternatesFor(locale, "/projects"),
    openGraph: { type: "website", title: t("metaTitle"), description: t("metaDescription"), url: getPathname({ locale, href: "/projects" }), siteName: displayName, ...ogLocales(locale) },
  };
}

export default async function ProjectsPage() {
  const locale = await getRootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "Projects" });

  return (
    <DirectionalTransition>
      <main id="main" className="projects-page flex-1">
        <section className="pt-32 pb-12 md:pt-40 md:pb-20">
          <div className="container-editorial">
            <p className="text-eyebrow text-accent">{t("eyebrow")}</p>
            <h1 className="project-index-heading mt-7 max-w-5xl font-display leading-[0.98] tracking-tight">{t("title")}</h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">{t("lead")}</p>
          </div>
        </section>

        {projects.map((project, index) => (
          <article key={project.slug} className="project-feature py-16 md:py-24">
            <div className="container-editorial grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col items-start">
                <Reveal initial={false} className="mb-10 flex flex-wrap items-center gap-4">
                  <Badge variant="secondary">{t(project.status === "in-development" ? "inDevelopment" : "completed")}</Badge>
                </Reveal>
                <Reveal initial={false} delay={0.12}>
                  <h2 className="mt-5 font-display text-[clamp(3.2rem,5.5vw,5.75rem)] leading-[0.98] tracking-tight" lang="en">
                    <Link href={`/projects/${project.slug}`} prefetch={true} transitionTypes={["nav-forward"]} className="project-title-link">{project.title}</Link>
                  </h2>
                </Reveal>
                <Reveal initial={false} delay={0.18}><p className="mt-7 max-w-lg text-lg leading-relaxed" lang="en" dir="ltr">{localize(project.summary, typedLocale)}</p></Reveal>
                <Reveal initial={false} delay={0.24}><p className="mt-6 text-sm text-muted-foreground">{project.platform} <span aria-hidden="true">/</span> {t("version", { version: project.version })}</p></Reveal>
                <Reveal initial={false} delay={0.3} className="mt-10">
                  <Link href={`/projects/${project.slug}`} prefetch={true} transitionTypes={["nav-forward"]} className="project-action inline-flex items-center gap-4 text-base font-medium">
                    {t("exploreProject")}<ArrowUpRight className="size-5 rtl:-scale-x-100" aria-hidden="true" />
                  </Link>
                </Reveal>
              </div>
              <Reveal initial={false} delay={0.12} className="min-w-0">
                {project.previewImage ? (
                  <figure className="mx-auto w-fit max-w-full rounded-3xl bg-background p-2 ring-1 ring-foreground/10 ease-(--ease-editorial) hover:shadow-lg hover:shadow-foreground/10 hover:ring-accent/30 motion-safe:transition-[transform,box-shadow] motion-safe:duration-500 motion-safe:hover:-translate-y-1 sm:rounded-[2rem] sm:p-3">
                    <Image
                      src={project.previewImage.src}
                      alt={localize(project.previewImage.alt, typedLocale)}
                      width={project.previewImage.width}
                      height={project.previewImage.height}
                      priority={index === 0}
                      unoptimized
                      className="h-auto max-w-full rounded-2xl sm:rounded-[1.375rem]"
                    />
                  </figure>
                ) : (
                  <DevicePair screens={project.screens} locale={typedLocale} />
                )}
              </Reveal>
            </div>
          </article>
        ))}
        <section className="py-16 md:py-20">
          <div className="container-editorial flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{t("catalogueNote")}</p>
            <Link href={{ pathname: "/", hash: "connect" }} className="project-action inline-flex items-center gap-3 text-base font-medium">{t("getInTouch")}<ArrowUpRight aria-hidden="true" className="size-5 rtl:-scale-x-100" /></Link>
          </div>
        </section>
      </main>
    </DirectionalTransition>
  );
}
