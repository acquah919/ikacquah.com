"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState, ViewTransition } from "react";
import { DirectionProvider } from "@base-ui/react/direction-provider";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { getDirection, type Locale } from "@/i18n/config";
import { Link } from "@/i18n/navigation";
import type { BlogPostSummary } from "@/lib/blog";
import { formatDate } from "@/lib/date";

interface BlogLibraryProps { posts: BlogPostSummary[]; locale: Locale }

const PAGE_SIZE = 6;

export function BlogLibrary({ posts, locale }: BlogLibraryProps) {
  const t = useTranslations("Blog");
  const reduced = usePrefersReducedMotion();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase(locale));
  const categories = useMemo(() => [...new Set(posts.flatMap(post => post.category ? [post.category] : []))].sort((a, b) => a.localeCompare(b, locale)), [posts, locale]);
  const filtered = useMemo(() => posts.filter(post => {
    const searchable = [post.title, post.category, ...(post.tags ?? [])].filter(Boolean).join(" ").toLocaleLowerCase(locale);
    return (category === "all" || post.category === category) && (!deferredQuery || searchable.includes(deferredQuery));
  }).sort((a, b) => b.date.localeCompare(a.date)), [posts, category, deferredQuery, locale]);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(1, pageCount));
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const resultsHeading = useRef<HTMLHeadingElement>(null);
  const focusResults = useRef(false);

  useEffect(() => {
    if (focusResults.current) {
      resultsHeading.current?.focus({ preventScroll: true });
      resultsHeading.current?.scrollIntoView({ block: "start", behavior: reduced ? "instant" : "smooth" });
      focusResults.current = false;
    }
  }, [currentPage, reduced]);

  function clearFilters() { setQuery(""); setCategory("all"); setPage(1); }
  function changePage(next: number) { focusResults.current = true; setPage(next); }

  return (
    <DirectionProvider direction={getDirection(locale)}>
    <section className="pb-20 md:pb-28" aria-labelledby="blog-results-heading">
      <div className="container-editorial">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <ToggleGroup value={[category]} onValueChange={values => { if (values[0]) { setCategory(values[0]); setPage(1); } }} aria-label={t("categories")} className="blog-category-controls max-w-full">
            <ToggleGroupItem value="all">{t("allCategories")}</ToggleGroupItem>
            {categories.map(value => <ToggleGroupItem value={value} key={value}><span lang="en">{value}</span></ToggleGroupItem>)}
          </ToggleGroup>
          <FieldGroup className="w-full xl:max-w-80">
            <Field>
              <FieldLabel htmlFor="blog-search" className="sr-only">{t("searchLabel")}</FieldLabel>
              <InputGroup className="blog-search">
                <InputGroupInput id="blog-search" type="search" placeholder={t("searchPlaceholder")} value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} aria-controls="blog-results" />
                <InputGroupAddon align="inline-start"><Search aria-hidden="true" /></InputGroupAddon>
                {query && <InputGroupAddon align="inline-end"><InputGroupButton size="icon-sm" onClick={() => { setQuery(""); setPage(1); }} aria-label={t("clearFilters")}><X aria-hidden="true" /></InputGroupButton></InputGroupAddon>}
              </InputGroup>
            </Field>
          </FieldGroup>
        </div>

        <div className="mt-8 mb-9 flex flex-wrap items-center justify-between gap-4">
          <h2 ref={resultsHeading} id="blog-results-heading" tabIndex={-1} className="scroll-mt-28 text-sm text-muted-foreground outline-none" aria-live="polite" aria-atomic="true">
            <span className="sr-only">{t("resultsHeading")}: </span>{t("resultRange", { start: filtered.length ? (currentPage - 1) * PAGE_SIZE + 1 : 0, end: Math.min(currentPage * PAGE_SIZE, filtered.length), total: filtered.length })}
          </h2>
          {(query || category !== "all") && <Button variant="link" size="sm" onClick={clearFilters}>{t("clearFilters")}</Button>}
        </div>

        <ol id="blog-results" className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3" aria-busy={query.trim().toLocaleLowerCase(locale) !== deferredQuery}>
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((post, index) => (
              <motion.li key={post.slug} layout={!reduced} initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -6 }} transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}>
                <Link href={`/blog/${post.slug}`} locale={post.sourceLocale !== locale ? post.sourceLocale : undefined} transitionTypes={["nav-forward"]} prefetch={post.sourceLocale === locale ? true : undefined} className="blog-post-link group flex h-full flex-col items-start py-7">
                  <div className="flex w-full items-center justify-between gap-3">
                    {post.category && <Badge variant="secondary" lang={post.sourceLocale}>{post.category}</Badge>}
                    <ArrowUpRight aria-hidden="true" className="ms-auto size-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:-scale-x-100" />
                  </div>
                  <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8125rem] leading-relaxed text-muted-foreground">
                    <time dateTime={post.date}>{formatDate(post.date, locale)}</time><span aria-hidden="true">·</span><span>{t("readingTime", { minutes: post.readingTime })}</span>
                  </div>
                  <ViewTransition name={`blog-title-${post.slug}`} share="text-morph" default="none">
                    <h2 className="mt-4 font-display text-[clamp(1.8rem,2.5vw,2.5rem)] leading-[1.16] tracking-tight" lang={post.sourceLocale} dir={getDirection(post.sourceLocale)}>{post.title}</h2>
                  </ViewTransition>
                </Link>
              </motion.li>
            ))}
          </AnimatePresence>
        </ol>

        {filtered.length === 0 && (
          <Empty className="min-h-72">
            <EmptyHeader><EmptyTitle>{posts.length === 0 ? t("empty") : t("noResultsTitle")}</EmptyTitle><EmptyDescription>{t("noResultsBody")}</EmptyDescription></EmptyHeader>
            <EmptyContent><Button variant="outline" onClick={clearFilters}>{t("clearFilters")}</Button></EmptyContent>
          </Empty>
        )}

        {pageCount > 1 && (
          <Pagination aria-label={t("pagination")} className="mt-12 justify-start">
            <PaginationContent>
              <PaginationItem><Button variant="ghost" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} aria-label={t("previousPage")}><ArrowLeft data-icon="inline-start" className="rtl:rotate-180" /><span className="hidden sm:inline">{t("previousPage")}</span></Button></PaginationItem>
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(number => <PaginationItem key={number}><Button variant={currentPage === number ? "outline" : "ghost"} size="icon" onClick={() => changePage(number)} aria-label={t("pageLabel", { page: number })} aria-current={currentPage === number ? "page" : undefined}>{number}</Button></PaginationItem>)}
              <PaginationItem><Button variant="ghost" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)} aria-label={t("nextPage")}><span className="hidden sm:inline">{t("nextPage")}</span><ArrowRight data-icon="inline-end" className="rtl:rotate-180" /></Button></PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
    </DirectionProvider>
  );
}
