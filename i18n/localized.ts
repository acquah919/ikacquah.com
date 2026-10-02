import { defaultLocale, type Locale } from "./config";

/**
 * A content value with an English original and optional reviewed
 * translations. English is required so every field always has a fallback;
 * this mirrors field-level localization in headless CMSs for a later migration.
 */
export type Localized<T> = { [defaultLocale]: T } & Partial<Record<Locale, T>>;

/** Returns the value for `locale`, falling back to English. */
export function localize<T>(value: Localized<T>, locale: Locale): T {
  const translated = (value as Partial<Record<Locale, T>>)[locale];
  return translated === undefined ? (value as Record<typeof defaultLocale, T>)[defaultLocale] : translated;
}

/** Convenience for content modules: `const t = pick(locale); t(area.title)`. */
export function pick(locale: Locale) {
  return <T>(value: Localized<T>) => localize(value, locale);
}

/** Marks an English-only value; reads clearly at the call site in data files. */
export function en<T>(value: T): Localized<T> {
  return { en: value };
}
