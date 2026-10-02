import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/seo";

// Routes are added here as their features ship; each entry lists every
// enabled locale as an alternate so search engines see the language set.
const routes = ["/", "/publications", "/blog"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(getPathname({ locale, href })),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: href === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, absoluteUrl(getPathname({ locale: l, href }))]),
        ),
      },
    })),
  );
}
