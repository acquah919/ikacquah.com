import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import * as rootParams from "next/root-params";
import type { Locale } from "./config";
import { routing } from "./routing";

type Messages = Record<string, unknown>;

function mergeMessages(base: Messages, override: Messages): Messages {
  const result: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = result[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      current &&
      typeof current === "object" &&
      !Array.isArray(current)
    ) {
      result[key] = mergeMessages(current as Messages, value as Messages);
    } else {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Loads the UI dictionary for a locale layered over English, so a missing key
 * in a translation falls back to the English string instead of rendering
 * blank or throwing.
 */
async function loadMessages(locale: Locale): Promise<Messages> {
  const english = (await import("@/messages/en.json")).default as Messages;
  if (locale === "en") return english;
  try {
    const translated = (await import(`@/messages/${locale}.json`)).default as Messages;
    return mergeMessages(english, translated);
  } catch {
    return english;
  }
}

export default getRequestConfig(async ({ locale }) => {
  if (!locale) {
    const paramValue = await rootParams.locale();
    if (hasLocale(routing.locales, paramValue)) {
      locale = paramValue;
    } else {
      notFound();
    }
  }

  return {
    locale,
    messages: await loadMessages(locale as Locale),
    timeZone: "Africa/Accra",
    onError(error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[i18n] ${error.code}: ${error.message}`);
      }
    },
    getMessageFallback({ key, namespace }) {
      // Never show a raw key to visitors; the English merge above means this
      // only triggers when a key is missing from English itself.
      return process.env.NODE_ENV === "production" ? "" : `${namespace}.${key}`;
    },
  };
});
