/**
 * Single source of truth for languages. Enabling a locale is a configuration
 * change here plus reviewed content: a `messages/<locale>.json` dictionary and
 * localized values in `data/`. Nothing else in the app hard-codes a locale.
 */
export type TextDirection = "ltr" | "rtl";

export interface LocaleDefinition {
  /** Language name in English, used for accessible labels. */
  label: string;
  /** Language name in its own language, shown in the switcher. */
  nativeLabel: string;
  dir: TextDirection;
  /** Only enabled locales are routed, prerendered, and offered for switching. */
  enabled: boolean;
  /** Open Graph locale code. */
  ogLocale: string;
  /**
   * Companion font note. Latin locales share Fraunces and Spline Sans.
   * When `ar` is enabled, map an Arabic display and body font here and load it
   * in `app/[locale]/layout.tsx` for that locale only.
   */
  fontHint?: string;
}

export const localeRegistry = {
  en: {
    label: "English",
    nativeLabel: "English",
    dir: "ltr",
    enabled: true,
    ogLocale: "en_GB",
  },
  fr: {
    label: "French",
    nativeLabel: "Français",
    dir: "ltr",
    enabled: true,
    ogLocale: "fr_FR",
  },
  es: {
    label: "Spanish",
    nativeLabel: "Español",
    dir: "ltr",
    enabled: true,
    ogLocale: "es_ES",
  },
  pt: {
    label: "Portuguese",
    nativeLabel: "Português",
    dir: "ltr",
    enabled: true,
    ogLocale: "pt_PT",
  },
  ar: {
    label: "Arabic",
    nativeLabel: "العربية",
    dir: "rtl",
    enabled: true,
    ogLocale: "ar_AR",
    fontHint: "Pair with an Arabic display and body face (for example Noto Naskh Arabic and Noto Sans Arabic).",
  },
} as const satisfies Record<string, LocaleDefinition>;

export type Locale = keyof typeof localeRegistry;

export const allLocales = Object.keys(localeRegistry) as Locale[];

/** Locales that are routed and offered to visitors. */
export const locales = allLocales.filter((locale) => localeRegistry[locale].enabled);

/** Declared but not yet enabled; shown as "coming soon" in the switcher. */
export const plannedLocales = allLocales.filter((locale) => !localeRegistry[locale].enabled);

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function getDirection(locale: Locale): TextDirection {
  return localeRegistry[locale].dir;
}

export function isLocale(value: string): value is Locale {
  return value in localeRegistry;
}
