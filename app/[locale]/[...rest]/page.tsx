import { notFound } from "next/navigation";

/** Any path under a valid locale that has no page renders the localized 404. */
export default function CatchAll() {
  notFound();
}
