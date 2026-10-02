export interface Heading {
  id: string;
  title: string;
}

export function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Collect `##` headings from an MDX body so the reading nav can track them. */
export function extractHeadings(body: string): Heading[] {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((match) => ({
    id: slugify(match[1]),
    title: match[1],
  }));
}
