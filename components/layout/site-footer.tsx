import { Download } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { DisplayHeading } from "@/components/editorial/display-heading";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { Reveal } from "@/components/motion/reveal";
import { navHref, visibleNavigation } from "@/data/navigation";
import { footer } from "@/data/home";
import { displayName, professor } from "@/data/professor";
import type { Locale } from "@/i18n/config";
import { localize } from "@/i18n/localized";
import { Link } from "@/i18n/navigation";
import { BackToTop } from "./back-to-top";
import { EmailReveal } from "./email-reveal";

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Footer" });
  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tSections = await getTranslations({ locale, namespace: "Sections" });
  const year = new Date().getFullYear();

  return (
    <footer
      data-theme="dark"
      style={{ viewTransitionName: "site-footer" }}
      className="dark relative w-full bg-background text-foreground md:h-(--footer-height) md:[--footer-height:34rem] md:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)] lg:[--footer-height:31rem]"
    >
      <div className="md:fixed md:bottom-0 md:h-(--footer-height) md:w-full">
        <div className="relative isolate overflow-hidden bg-background md:sticky md:top-[calc(100vh-var(--footer-height))] md:h-full">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute inset-0 bg-linear-to-b from-background via-background to-[#0f2d32]" />
            <div className="absolute -bottom-1/2 inset-s-[-10%] h-[80vmax] w-[80vmax] rounded-full bg-[radial-gradient(closest-side,rgb(79_163_165/0.2),transparent_70%)]" />
            <div className="absolute -top-1/3 nset-e-[-20%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(closest-side,rgb(82_124_136/0.14),transparent_70%)]" />
          </div>

          <div className="container-editorial flex h-full flex-col justify-between gap-12 py-16 md:py-14">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
              <Reveal className="flex flex-col gap-6 lg:col-span-5">
                <DisplayHeading as="p" size="md">
                 {displayName}
                  <span className="text-accent">.</span>
                </DisplayHeading>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                  {localize(footer.descriptor, locale)}
                </p>
                <a
                  href={professor.cv.href}
                  download={professor.cv.fileName}
                  className="group inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-accent"
                >
                  <Download
                    aria-hidden
                    className="size-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                  {t("cv")}
                </a>
              </Reveal>

              <Reveal
                as="div"
                delay={0.08}
                className="lg:col-span-2 lg:col-start-7"
              >
                <nav aria-label={t("explore")}>
                  <p className="text-eyebrow mb-5 text-muted-foreground">
                    {t("explore")}
                  </p>
                  <ul className="flex flex-col gap-3">
                    {visibleNavigation.map(item => (
                      <li key={item.key}>
                        <Link
                          href={navHref(item)}
                          transitionTypes={
                            item.pathname !== "/" ? ["nav-forward"] : undefined
                          }
                          className="text-sm text-foreground/80 transition-colors duration-300 hover:text-accent"
                        >
                          {tNav(item.key)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Reveal>

              <Reveal delay={0.16} className="lg:col-span-2">
                <p className="text-eyebrow mb-5 text-muted-foreground">
                  {t("connect")}
                </p>
                <dl className="flex flex-col gap-4 text-sm">
                  {professor.email && (
                    <div className="flex flex-col gap-1">
                      <dt className="text-xs text-muted-foreground">
                        {tSections("emailLabel")}
                      </dt>
                      <dd className="text-foreground/80">
                        <EmailReveal email={professor.email} />
                      </dd>
                    </div>
                  )}
                  <div className="flex flex-col gap-1">
                    <dt className="text-xs text-muted-foreground">
                      {tSections("locationLabel")}
                    </dt>
                    <dd className="text-foreground/80">
                      {localize(professor.location, locale)}
                    </dd>
                  </div>
                </dl>
              </Reveal>

              <Reveal delay={0.24} className="lg:col-span-2">
                <p className="text-eyebrow mb-3 text-muted-foreground">
                  {t("language")}
                </p>
                <LanguageSwitcher variant="list" />
              </Reveal>
            </div>

            <div className="flex flex-col gap-4 border-t border-foreground/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>
                &copy; {year} {professor.honorific} {professor.fullName}.{" "}
                {t("rights")}
              </p>
              <BackToTop />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
