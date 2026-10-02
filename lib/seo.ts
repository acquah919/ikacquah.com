import type { Metadata } from "next";
import { defaultLocale, localeRegistry, type Locale } from "@/i18n/config";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const PRODUCTION_SITE_URL = "https://www.ikacquah.com";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");

function resolveSiteUrl() {
  const candidate = new URL(configuredSiteUrl || PRODUCTION_SITE_URL);

  // The canonical host is the www hostname. Normalize the bare domain and
  // never let a generated Vercel hostname leak into canonical metadata.
  if (candidate.hostname === "ikacquah.com") {
    candidate.hostname = "www.ikacquah.com";
    candidate.protocol = "https:";
  }
  if (candidate.hostname.endsWith(".vercel.app")) {
    return new URL(PRODUCTION_SITE_URL);
  }

  return candidate;
}

/**
 * Canonical public origin used by metadata, structured data, robots, and the
 * sitemap. The production domain is the safe fallback so a missing Vercel
 * environment variable can never emit localhost URLs into search metadata.
 */
export const siteUrl = resolveSiteUrl();

/** Prevent preview/development deployments from asking crawlers to index them. */
export const isIndexableEnvironment = process.env.VERCEL_ENV
  ? process.env.VERCEL_ENV === "production"
  : process.env.NODE_ENV === "production";

type Href = Parameters<typeof getPathname>[0]["href"];

export function alternatesFor(
  locale: Locale,
  href: Href,
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = getPathname({ locale: l, href });
  }

  // The unprefixed route performs locale negotiation and is therefore the
  // appropriate catch-all target for visitors whose language isn't listed.
  languages["x-default"] = typeof href === "string" ? href : href.pathname;

  return {
    canonical: getPathname({ locale, href }),
    languages,
  };
}

/**
 * Alternate metadata for content that exists only in a subset of locales
 * (currently blog posts). This avoids advertising fallback copies as genuine
 * translations.
 */
export function alternatesForAvailableLocales(
  canonicalLocale: Locale,
  href: Href,
  availableLocales: readonly Locale[],
): NonNullable<Metadata["alternates"]> {
  const languages: Record<string, string> = {};

  for (const locale of availableLocales) {
    languages[locale] = getPathname({ locale, href });
  }

  const xDefaultLocale = availableLocales.includes(defaultLocale)
    ? defaultLocale
    : canonicalLocale;
  languages["x-default"] = getPathname({ locale: xDefaultLocale, href });

  return {
    canonical: getPathname({ locale: canonicalLocale, href }),
    languages,
  };
}

export function ogLocales(
  locale: Locale,
  availableLocales: readonly Locale[] = routing.locales,
) {
  return {
    locale: localeRegistry[locale].ogLocale,
    alternateLocale: availableLocales
      .filter((l) => l !== locale)
      .map((l) => localeRegistry[l].ogLocale),
  };
}

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

/** Safely serialize JSON-LD embedded in HTML. */
export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
