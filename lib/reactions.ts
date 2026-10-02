import fs from "node:fs";
import path from "node:path";
import { listPosts } from "@/lib/blog";
import { routing } from "@/i18n/routing";

export interface ReactionCounts {
  claps: number;
  loves: number;
}

const FILE = path.join(process.cwd(), "data/reactions.json");
const empty: ReactionCounts = { claps: 0, loves: 0 };

function knownSlugs() {
  return new Set(routing.locales.flatMap((locale) => listPosts(locale).map((post) => post.slug)));
}

function readAll(): Record<string, ReactionCounts> {
  try {
    const raw = fs.readFileSync(FILE, "utf8");
    return JSON.parse(raw) as Record<string, ReactionCounts>;
  } catch {
    return {};
  }
}

export function getReactionCounts(slug: string): ReactionCounts {
  const all = readAll();
  return all[slug] ?? empty;
}

export function adjustReaction(
  slug: string,
  kind: "clap" | "love",
  delta: 1 | -1,
): ReactionCounts {
  if (!knownSlugs().has(slug)) {
    throw new Error("Unknown article");
  }

  const all = readAll();
  const current = all[slug] ?? { ...empty };
  if (kind === "clap") {
    current.claps = Math.max(0, current.claps + delta);
  } else {
    current.loves = Math.max(0, current.loves + delta);
  }
  all[slug] = current;
  fs.writeFileSync(FILE, `${JSON.stringify(all, null, 2)}\n`, "utf8");
  return current;
}
