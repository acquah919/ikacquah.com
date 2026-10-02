import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Instant navigation strategy (project-plan 8.9): every locale route is
  // prerendered and prefetched as static content. Cache Components stay off
  // until dynamic, personalized content exists.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        // The current CV asset is explicitly marked as a placeholder in
        // `data/professor.ts`. Keep it downloadable for layout testing, but
        // don't let search engines index the placeholder PDF. Remove this
        // header when the verified CV replaces the placeholder.
        source: "/cv/Isaac-Kwesi-Acquah-CV.pdf",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
