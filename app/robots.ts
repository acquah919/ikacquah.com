import type { MetadataRoute } from "next";
import { absoluteUrl, isIndexableEnvironment, siteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isIndexableEnvironment) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: siteUrl.origin,
  };
}
