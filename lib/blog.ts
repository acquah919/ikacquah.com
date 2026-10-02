import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

export interface BlogFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  tags?: string[];
  /** Slug of the original article when this file is a translation. */
  translationOf?: string;
}

export interface BlogPost {
  slug: string;
  locale: Locale;
  sourceLocale: Locale;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  tags?: string[];
  readingTime: number;
  body: string;
}

const BLOG_ROOT = path.join(process.cwd(), "content/blog");

function estimateReadingTime(body: string): number {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_[\]()!-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const wordsPerMinute = 200;

  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

function readLocaleDir(locale: Locale): Omit<BlogPost, "sourceLocale">[] {
  const dir = path.join(BLOG_ROOT, locale);
  if (!fs.existsSync(BLOG_ROOT) || !fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const fm = data as BlogFrontmatter;

      return {
        slug: file.replace(/\.mdx?$/, ""),
        locale,
        title: fm.title,
        excerpt: fm.excerpt,
        date: fm.date,
        category: fm.category,
        tags: fm.tags,
        readingTime: estimateReadingTime(content),
        body: content.trim(),
      };
    })
    .filter((post) => post.title && post.date)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

function withSource(posts: Omit<BlogPost, "sourceLocale">[], sourceLocale: Locale): BlogPost[] {
  return posts.map((post) => ({ ...post, sourceLocale }));
}

/** Posts for a locale, falling back to English when that locale has none. */
export function listPosts(locale: Locale): BlogPost[] {
  const own = readLocaleDir(locale);
  if (own.length > 0) return withSource(own, locale);
  if (locale === defaultLocale) return [];
  return withSource(readLocaleDir(defaultLocale), defaultLocale);
}

export function getPost(locale: Locale, slug: string): BlogPost | null {
  const own = readLocaleDir(locale).find((post) => post.slug === slug);
  if (own) return { ...own, sourceLocale: locale };
  if (locale === defaultLocale) return null;
  const fallback = readLocaleDir(defaultLocale).find((post) => post.slug === slug);
  return fallback ? { ...fallback, sourceLocale: defaultLocale } : null;
}

export function postLocales(slug: string): Locale[] {
  if (!fs.existsSync(BLOG_ROOT)) return [];
  return fs
    .readdirSync(BLOG_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && isLocale(entry.name))
    .filter((entry) => {
      const dir = path.join(BLOG_ROOT, entry.name);
      return fs.readdirSync(dir).some((file) => file.replace(/\.mdx?$/, "") === slug);
    })
    .map((entry) => entry.name as Locale);
}
