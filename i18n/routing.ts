import { defineRouting } from "next-intl/routing";
import { LOCALE_COOKIE_MAX_AGE, defaultLocale, locales } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale,
  // The locale is always part of the URL so server and client agree on it and
  // every page has a unique, indexable address per language.
  localePrefix: "always",
  localeDetection: true,
  // We generate hreflang/canonical metadata ourselves so pages that are only
  // available in some languages (for example blog posts) can advertise only
  // their real translations.
  alternateLinks: false,
  // URL prefix, remembered cookie, then Accept-Language, then English.
  localeCookie: { maxAge: LOCALE_COOKIE_MAX_AGE },
});
