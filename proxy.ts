import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale negotiation at the request layer so the first HTML response is
 * already in the right language. Priority: locale in the URL, remembered
 * cookie, `Accept-Language`, default. Also emits `hreflang` link headers.
 */
export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next internals, and files with an extension
  // (favicon.ico, sitemap.xml, robots.txt, the CV PDF, images).
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
