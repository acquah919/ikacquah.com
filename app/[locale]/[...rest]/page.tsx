import { notFound } from "next/navigation";

// Unknown paths have no page content to prerender or prefetch.
export const instant = false;

/** Any path under a valid locale that has no page renders the localized 404. */
export default function CatchAll() {
  notFound();
}
