import type { Metadata } from "next";
import { locale as getRootLocale } from "next/root-params";
import { RouteFallback } from "@/components/navigation/route-fallback";
import { Suspense } from "react";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { DirectionalTransition } from "@/components/motion/directional-transition";
import { Reveal } from "@/components/motion/reveal";
import { DevicePair } from "@/components/projects/device-pair";
import { PhoneFrame } from "@/components/projects/phone-frame";
import { ProjectWalkthrough } from "@/components/projects/project-walkthrough";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { creatorScreen, getProject, projects } from "@/data/projects";
import { displayName } from "@/data/professor";
import type { Locale } from "@/i18n/config";
import { localize } from "@/i18n/localized";
import { getPathname, Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { absoluteUrl, alternatesForAvailableLocales, ogLocales, serializeJsonLd } from "@/lib/seo";

interface ProjectPageProps { params: Promise<{ locale: string; slug: string }> }

export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(routing.locales, locale) || !project) return {};
  const path = `/projects/${slug}`;
  const description = localize(project.summary, "en");
  return {
    title: project.title, description,
    alternates: alternatesForAvailableLocales("en", path, ["en"]),
    openGraph: { type: "website", title: project.title, description, url: getPathname({ locale: "en", href: path }), siteName: displayName, ...ogLocales("en", ["en"]) },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const locale = await getRootLocale();
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Projects" });
  return (
    <Suspense fallback={<DirectionalTransition><main id="main" className="flex-1"><RouteFallback title={t("eyebrow")} href="/projects" label={t("backToProjects")} /></main></DirectionalTransition>}>
      <ProjectPageContent params={params} locale={locale} />
    </Suspense>
  );
}

async function ProjectPageContent({ params, locale }: ProjectPageProps & { locale: Locale }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(routing.locales, locale) || !project) notFound();
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "Projects" });

  return (
    <DirectionalTransition>
      <main id="main" className="projects-page flex-1">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({
          "@context": "https://schema.org", "@type": "SoftwareApplication", name: project.title,
          description: localize(project.summary, "en"), applicationCategory: "UtilitiesApplication",
          operatingSystem: project.platform, softwareVersion: project.version,
          author: { "@type": "Person", name: displayName },
          url: absoluteUrl(`/en/projects/${slug}`),
          screenshot: absoluteUrl(project.screens[0].light),
          creativeWorkStatus: "In development",
        }) }} />

        <section className="pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="container-editorial">
            <nav aria-label={t("breadcrumb")} className="mb-12 flex items-center gap-3 text-sm text-muted-foreground">
              <Link href="/projects" transitionTypes={["nav-back"]} className="inline-flex items-center gap-2 hover:text-foreground"><ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />{t("eyebrow")}</Link>
              <span aria-hidden="true">/</span><span aria-current="page" lang="en">{project.title}</span>
            </nav>
            <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col items-start">
                <Reveal initial={false}><Badge variant="secondary">{t("inDevelopment")}</Badge></Reveal>
                <Reveal initial={false} delay={0.06}><h1 className="mt-6 font-display text-[clamp(3.5rem,7.5vw,7.5rem)] leading-[0.95] tracking-tight" lang="en">{project.title}</h1></Reveal>
                <Reveal initial={false} delay={0.12}><p className="mt-6 max-w-md text-xl leading-relaxed" lang="en" dir="ltr">{localize(project.tagline, typedLocale)}</p></Reveal>
                <Reveal initial={false} delay={0.18}><p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground" lang="en" dir="ltr">{localize(project.summary, typedLocale)}</p></Reveal>
                <Reveal initial={false} delay={0.24} className="mt-9 flex flex-wrap items-center gap-5">
                  <Button nativeButton={false} render={<a href="#application" />}>{t("seeItInAction")}<ArrowLeft data-icon="inline-end" className="-rotate-90" /></Button>
                  <a href={project.apkDownloadUrl} className="project-action inline-flex items-center gap-2 text-sm font-medium">{t("downloadApk")}<Download className="size-4" aria-hidden="true" /></a>
                </Reveal>
                <Reveal initial={false} delay={0.3}><p className="mt-7 text-sm text-muted-foreground">{project.platform} <span aria-hidden="true">/</span> {t("version", { version: project.version })}</p></Reveal>
              </div>
              <Reveal initial={false} delay={0.15}><DevicePair screens={project.screens} locale={typedLocale} /></Reveal>
            </div>
            {locale !== "en" && <p className="mt-10 max-w-xl text-sm leading-relaxed text-muted-foreground">{t("fallback")}</p>}
          </div>
        </section>

        <section className="project-story py-20 md:py-28">
          <div className="container-editorial grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5"><p className="text-eyebrow text-accent">{t("motivationEyebrow")}</p><h2 className="mt-5 font-display text-[clamp(2.5rem,4.3vw,4.5rem)] leading-[1.05] tracking-tight">{t("motivationTitle")}</h2></div>
            <div className="lg:col-span-6 lg:col-start-7">
              {localize(project.story.motivation, typedLocale).map((paragraph, index) => <Reveal key={paragraph} delay={index * 0.08}><p className="mb-6 text-lg leading-relaxed" lang="en" dir="ltr">{paragraph}</p></Reveal>)}
              <Reveal><p className="text-base leading-relaxed text-muted-foreground" lang="en" dir="ltr">{localize(project.story.vision, typedLocale)}</p></Reveal>
            </div>
          </div>
          <div className="container-editorial mt-16">
            <p className="mb-6 text-sm text-muted-foreground">{t("modalities")}</p>
            <ul className="flex flex-wrap gap-x-10 gap-y-5" lang="en" dir="ltr">{project.modalities.map(modality => <li key={modality} className="font-display text-[clamp(1.75rem,3vw,2.75rem)] tracking-tight">{modality}</li>)}</ul>
          </div>
        </section>

        <ProjectWalkthrough screens={project.screens} locale={typedLocale} />

        <section className="project-story py-20 md:py-28" aria-labelledby="capabilities-heading">
          <div className="container-editorial grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4"><p className="text-eyebrow text-accent">{t("capabilitiesEyebrow")}</p><h2 id="capabilities-heading" className="mt-5 font-display text-[clamp(2.5rem,4.3vw,4.5rem)] leading-[1.05] tracking-tight">{t("capabilitiesTitle")}</h2></div>
            <ol className="flex flex-col lg:col-span-7 lg:col-start-6">
              {project.capabilities.map((capability, index) => (
                <Reveal as="li" key={capability.title.en} delay={0.04 * index} className="project-capability grid grid-cols-[2rem_1fr] gap-5 py-7 first:pt-0">
                  <span className="pt-1 text-sm tabular-nums text-accent">{String(index + 1).padStart(2, "0")}</span>
                  <div lang="en" dir="ltr"><h3 className="font-display text-2xl tracking-tight md:text-3xl">{localize(capability.title, typedLocale)}</h3><p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">{localize(capability.description, typedLocale)}</p></div>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="container-editorial mt-14"><p className="project-privacy max-w-4xl font-display text-[clamp(1.75rem,3.5vw,3.25rem)] leading-tight tracking-tight">{t("privacy")}</p></div>
        </section>

        <section className="py-20 md:py-28">
          <div className="container-editorial grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <p className="text-eyebrow text-accent">{t("creatorEyebrow")}</p>
              <h2 className="mt-5 font-display text-[clamp(2.5rem,4.3vw,4.5rem)] leading-[1.05] tracking-tight">{t("creatorTitle")}</h2>
              <Reveal><p className="mt-7 font-display text-2xl tracking-tight" lang="en">Dr Isaac Kwesi Acquah</p></Reveal>
              <Reveal delay={0.06}><p className="mt-4 max-w-xl text-lg leading-relaxed" lang="en" dir="ltr">Dr Acquah is a medical physicist and lecturer in the Department of Physics Education at the University of Education, Winneba, Ghana. He previously worked as a medical physicist at Korle-Bu Teaching Hospital.</p></Reveal>
              <Reveal delay={0.12}><p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground" lang="en" dir="ltr">His interests span radiation protection and quality assurance, MRI-only radiotherapy and synthetic CT, AI in medical imaging, and physics education. RadPulse Africa translates that practical experience into a tool for professional practice.</p></Reveal>
            </div>
            <Reveal className="flex justify-center lg:col-span-5"><PhoneFrame src={creatorScreen("light")} alt="The RadPulse Africa creator screen, featuring Dr Isaac Kwesi Acquah" device="iphone" className="w-[260px] max-w-full" /></Reveal>
          </div>
        </section>

        <section data-theme="dark" className="dark bg-background py-20 text-foreground md:py-28">
          <div className="container-editorial grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6"><p className="text-eyebrow text-accent">{t("developmentEyebrow")}</p><h2 className="mt-5 font-display text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[1.05] tracking-tight">{t("developmentTitle")}</h2></div>
            <div className="lg:col-span-5 lg:col-start-8">
              <p className="text-lg leading-relaxed" lang="en" dir="ltr">{localize(project.story.development, typedLocale)}</p>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t("feedback")}</p>
              <div className="mt-8 flex flex-col items-start gap-5">
                <a href={project.apkDownloadUrl} className={buttonVariants()}>{t("downloadApk")}<Download data-icon="inline-end" aria-hidden="true" /></a>
                <Link href={{ pathname: "/", hash: "connect" }} className="project-action inline-flex items-center gap-2 text-base">{t("shareFeedback")}<ArrowUpRight aria-hidden="true" className="size-4 rtl:-scale-x-100" /></Link>
              </div>
            </div>
          </div>
        </section>
        <div className="container-editorial py-10"><Link href="/projects" transitionTypes={["nav-back"]} className="project-action inline-flex items-center gap-3 text-sm"><ArrowLeft className="size-4 rtl:rotate-180" aria-hidden="true" />{t("backToProjects")}</Link></div>
      </main>
    </DirectionalTransition>
  );
}
