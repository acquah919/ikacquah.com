"use server";

import { adjustReaction, getReactionCounts, type ReactionCounts } from "@/lib/reactions";

export async function loadReactions(slug: string): Promise<ReactionCounts> {
  return getReactionCounts(slug);
}

export async function submitReaction(
  slug: string,
  kind: "clap" | "love",
  delta: 1 | -1,
): Promise<ReactionCounts> {
  return adjustReaction(slug, kind, delta);
}
