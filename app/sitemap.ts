import type { MetadataRoute } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { listAvailablePosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

// These are the real standalone pages. Homepage sections such as Research,
// Teaching, Services, and Contact are anchors on `/`, not separate URLs.
const staticRoutes = ["/", "/publications", "/blog"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((href) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(getPathname({ locale, href })),
    })),
  );

  // Only list article URLs that actually exist in that language. The UI can
  // still show an English fallback to visitors, but search engines shouldn't
  // be told those fallback copies are translated pages.
  const articleEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    listAvailablePosts(locale).map((post) => ({
      url: absoluteUrl(
        getPathname({ locale, href: `/blog/${post.slug}` }),
      ),
      lastModified: post.updated ?? post.date,
    })),
  );

  return [...staticEntries, ...articleEntries];
}
