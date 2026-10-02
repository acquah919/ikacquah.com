import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware wrappers around the Next.js navigation APIs. Always import
 * `Link`, `useRouter`, `usePathname`, `redirect`, and `getPathname` from here
 * instead of `next/link` or `next/navigation` for in-app routes.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
