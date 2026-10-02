import type { Metadata } from "next";
import { localeRegistry, type Locale } from "@/i18n/config";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
);

type Href = Parameters<typeof getPathname>[0]["href"];

export function alternatesFor(
  locale: Locale,
  href: Href,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = getPathname({ locale: l, href });
  }
  languages["x-default"] = typeof href === "string" ? href : href.pathname;
  return {
    canonical: getPathname({ locale, href }),
    languages,
  };
}

export function ogLocales(locale: Locale) {
  return {
    locale: localeRegistry[locale].ogLocale,
    alternateLocale: routing.locales
      .filter(l => l !== locale)
      .map(l => localeRegistry[l].ogLocale),
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}
