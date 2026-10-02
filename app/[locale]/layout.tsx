import type { Metadata } from "next";
import {
  Fraunces,
  Noto_Naskh_Arabic,
  Noto_Sans_Arabic,
  Spline_Sans,
} from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import Script from "next/script";
import "../globals.css";
import { cn } from "@/lib/utils";
import { CookieBanner } from "@/components/consent/cookie-banner";
import { SiteFooter } from "@/components/layout/site-footer";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SiteHeader } from "@/components/navigation/site-header";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { displayName, professor } from "@/data/professor";
import { researchAreas } from "@/data/research";
import { getDirection } from "@/i18n/config";
import { localize } from "@/i18n/localized";
import { routing } from "@/i18n/routing";
import { absoluteUrl, ogLocales, siteUrl } from "@/lib/seo";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const spline = Spline_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-spline",
  display: "swap",
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-sans-arabic",
  display: "swap",
  weight: ["400", "500", "600"],
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-noto-naskh",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("defaultTitle", {
    name: displayName,
    title: localize(professor.title, locale),
  });

  return {
    metadataBase: siteUrl,
    title: { default: title, template: `%s | ${displayName}` },
    description: localize(professor.shortBio, locale),
    applicationName: displayName,
    authors: [{ name: displayName }],
    creator: displayName,
    openGraph: {
      type: "profile",
      siteName: displayName,
      firstName: "Isaac Kwesi",
      lastName: "Acquah",
      ...ogLocales(locale),
    },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
  };
}

function personJsonLd(locale: (typeof routing.locales)[number]) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: professor.fullName,
    honorificPrefix: professor.honorific,
    jobTitle: localize(professor.title, locale),
    description: localize(professor.shortBio, locale),
    image: absoluteUrl(professor.portrait.src),
    url: absoluteUrl(`/${locale}`),
    worksFor: {
      "@type": "CollegeOrUniversity",
      name: localize(professor.current.institution, locale),
      department: professor.current.unit
        ? {
            "@type": "Organization",
            name: localize(professor.current.unit, locale),
          }
        : undefined,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Winneba",
      addressCountry: professor.countryCode,
    },
    knowsAbout: researchAreas.map(area => localize(area.title, locale)),
    knowsLanguage: routing.locales,
  };
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Common" });
  const arabic = locale === "ar";

  return (
    <html
      lang={locale}
      dir={getDirection(locale)}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(
        "dark h-full antialiased",
        spline.variable,
        fraunces.variable,
        arabic && notoSansArabic.variable,
        arabic && notoNaskhArabic.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider>
          <NextIntlClientProvider>
            <a
              href="#main"
              className="sr-only z-100 rounded-sm bg-foreground px-4 py-2 text-sm text-background focus:not-sr-only focus:fixed focus:top-4 focus:start-4"
            >
              {t("skipToContent")}
            </a>
            <MotionProvider>
              <SiteHeader />
              <div className="relative z-10 flex-1 bg-background">
                {children}
              </div>
              <SiteFooter locale={locale} />
            </MotionProvider>
            <CookieBanner />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Script
          id="person-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: personJsonLd(locale) }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
