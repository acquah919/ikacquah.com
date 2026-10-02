import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

/**
 * Locale negotiation at the request layer so the first HTML response is
 * already in the right language. Priority: locale in the URL, remembered
 * cookie, `Accept-Language`, default.
 *
 * Vercel's generated *.vercel.app aliases remain useful for deployment
 * previews, but they must not compete with the custom domain in search.
 */
export default function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);
  const hostname = (
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    ""
  )
    .split(":")[0]
    .toLowerCase();

  if (hostname.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  // Everything except API routes, Next internals, and files with an extension
  // (favicon.ico, sitemap.xml, robots.txt, the CV PDF, images).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
