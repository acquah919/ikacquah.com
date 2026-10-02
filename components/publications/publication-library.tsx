"use client";

import {
  startTransition,
  useDeferredValue,
  useMemo,
  useState,
  ViewTransition,
} from "react";
import { ArrowUpRight, Download, FileText, RotateCcw, Search } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import type {
  Publication,
  PublicationFormat,
  PublicationType,
} from "@/data/publications";

interface AreaOption {
  slug: string;
  label: string;
}

interface PublicationLibraryProps {
  publications: Publication[];
  areas: AreaOption[];
}

type SelectablePublicationType = PublicationType | "all";
type SelectableFormat = PublicationFormat | "all";

export function PublicationLibrary({ publications, areas }: PublicationLibraryProps) {
  const t = useTranslations("Publications");
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const [area, setArea] = useState("all");
  const [type, setType] = useState<SelectablePublicationType>("all");
  const [format, setFormat] = useState<SelectableFormat>("all");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase());
  const areaLabels = useMemo(
    () => new Map(areas.map((option) => [option.slug, option.label])),
    [areas],
  );
  const years = useMemo(
    () => [...new Set(publications.map((publication) => publication.year))].sort((a, b) => b - a),
    [publications],
  );
  const hasWordFiles = publications.some((publication) => publication.file.format === "docx");

  const filtered = useMemo(
    () =>
      publications.filter((publication) => {
        const searchable = [
          publication.title,
          ...publication.authors,
          publication.journal,
          ...publication.areas.map((slug) => areaLabels.get(slug)),
        ]
          .filter(Boolean)
          .join(" ")
          .toLocaleLowerCase();

        return (
          (!deferredQuery || searchable.includes(deferredQuery)) &&
          (year === "all" || publication.year === Number(year)) &&
          (area === "all" || publication.areas.includes(area)) &&
          (type === "all" || publication.type === type) &&
          (format === "all" || publication.file.format === format)
        );
      }),
    [area, areaLabels, deferredQuery, format, publications, type, year],
  );

  const clearFilters = () => {
    startTransition(() => {
      setQuery("");
      setYear("all");
      setArea("all");
      setType("all");
      setFormat("all");
    });
  };

  const hasFilters =
    query.length > 0 || year !== "all" || area !== "all" || type !== "all" || format !== "all";
  const typeLabel = (publicationType: PublicationType) => {
    if (publicationType === "book-chapter") return t("types.bookChapter");
    return t(`types.${publicationType}`);
  };

  return (
    <section
      aria-labelledby="publication-library-heading"
      className="bg-card py-20 text-card-foreground md:py-28 lg:py-36"
    >
      <div className="container-editorial">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="text-eyebrow text-accent">{t("archiveEyebrow")}</p>
            <h2 id="publication-library-heading" className="text-display-md mt-5 max-w-3xl">
              {t("archiveTitle")}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground lg:col-span-4 lg:col-start-9">
            {t("archiveLead")}
          </p>
        </div>

        <div className="mt-12 border-y border-border py-6">
          <div
            className={
              hasWordFiles
                ? "grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(15rem,1.5fr)_repeat(4,minmax(8rem,0.7fr))]"
                : "grid gap-4 md:grid-cols-2 xl:grid-cols-[minmax(15rem,1.5fr)_repeat(3,minmax(8rem,0.7fr))]"
            }
          >
            <label className="relative block">
              <span className="sr-only">{t("searchLabel")}</span>
              <Search
                aria-hidden
                className="pointer-events-none absolute top-1/2 inset-s-4 size-4 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.currentTarget.value)}
                placeholder={t("searchPlaceholder")}
                className="h-12 w-full rounded-sm border border-border bg-background ps-11 pe-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 hover:border-foreground/30 focus:border-accent"
              />
            </label>

            <FilterSelect
              label={t("yearLabel")}
              value={year}
              onChange={(value) => startTransition(() => setYear(value))}
              options={[
                { value: "all", label: t("allYears") },
                ...years.map((option) => ({ value: String(option), label: String(option) })),
              ]}
            />
            <FilterSelect
              label={t("areaLabel")}
              value={area}
              onChange={(value) => startTransition(() => setArea(value))}
              options={[
                { value: "all", label: t("allAreas") },
                ...areas.map((option) => ({ value: option.slug, label: option.label })),
              ]}
            />
            <FilterSelect
              label={t("typeLabel")}
              value={type}
              onChange={(value) =>
                startTransition(() => setType(value as SelectablePublicationType))
              }
              options={[
                { value: "all", label: t("allTypes") },
                { value: "journal", label: t("types.journal") },
                { value: "conference", label: t("types.conference") },
                { value: "book-chapter", label: t("types.bookChapter") },
                { value: "thesis", label: t("types.thesis") },
                { value: "other", label: t("types.other") },
              ]}
            />
            {hasWordFiles ? (
              <FilterSelect
                label={t("formatLabel")}
                value={format}
                onChange={(value) => startTransition(() => setFormat(value as SelectableFormat))}
                options={[
                  { value: "all", label: t("allFormats") },
                  { value: "pdf", label: "PDF" },
                  { value: "docx", label: "DOCX" },
                ]}
              />
            ) : null}
          </div>

          <div className="mt-5 flex min-h-8 items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground" aria-live="polite">
              {t("resultCount", { count: filtered.length })}
            </p>
            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-2 text-xs font-medium text-foreground transition-colors hover:text-accent"
              >
                <RotateCcw aria-hidden className="size-3.5" />
                {t("clear")}
              </button>
            )}
          </div>
        </div>

        {filtered.length > 0 ? (
          <motion.ol layout className="divide-y divide-border">
            {filtered.map((publication, index) => (
              <ViewTransition
                key={publication.id}
                name={`publication-${publication.id}`}
                default="publication-item"
              >
                <motion.li
                  layout="position"
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: Math.min(index * 0.035, 0.22),
                    ease: [0.22, 1, 0.36, 1],
                    layout: { type: "spring", stiffness: 260, damping: 30 },
                  }}
                  className="group relative grid gap-6 py-8 md:grid-cols-[5.5rem_minmax(0,1fr)_auto] md:items-start md:py-10"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-editorial group-hover:scale-x-100 rtl:origin-right"
                  />

                  <div className="flex items-baseline gap-4 md:flex-col md:gap-2">
                    <span className="text-eyebrow tabular-nums text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <time
                      dateTime={String(publication.year)}
                      className="font-display text-2xl leading-none text-foreground"
                    >
                      {publication.year}
                    </time>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="text-eyebrow text-accent">{typeLabel(publication.type)}</span>
                    </div>
                    <h3 className="mt-4 max-w-4xl font-display text-[clamp(1.65rem,3vw,2.75rem)] leading-[1.05] tracking-[-0.018em] transition-colors duration-300 group-hover:text-accent">
                      {publication.title}
                    </h3>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      {publication.authors.length > 0
                        ? publication.authors.join(", ")
                        : t("detailsPending")}
                      {publication.journal ? ` · ${publication.journal}` : ""}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {publication.areas.map((slug) => (
                        <li
                          key={slug}
                          className="rounded-full bg-muted px-3 py-1.5 text-[0.6875rem] text-muted-foreground"
                        >
                          {areaLabels.get(slug) ?? slug}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-3 md:flex-col md:items-end">
                    <span className="inline-flex min-w-14 justify-center rounded-full border border-border px-3 py-1.5 text-[0.625rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                      {publication.file.format}
                      {publication.file.size ? ` · ${publication.file.size}` : ""}
                    </span>
                    <PublicationActions publication={publication} />
                  </div>
                </motion.li>
              </ViewTransition>
            ))}
          </motion.ol>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-80 flex-col items-center justify-center border-b border-border text-center"
          >
            <FileText aria-hidden className="size-9 text-muted-foreground/50" strokeWidth={1.25} />
            <p className="mt-5 font-display text-2xl">{t("emptyTitle")}</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">{t("emptyBody")}</p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 text-sm font-medium text-accent underline underline-offset-4"
            >
              {t("clear")}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

interface FilterSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

function FilterSelect({ label, value, options, onChange }: FilterSelectProps) {
  return (
    <label className="grid gap-1.5">
      <span className="text-eyebrow text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
        className="h-8 min-w-0 cursor-pointer appearance-none bg-transparent bg-[linear-gradient(45deg,transparent_50%,currentColor_50%),linear-gradient(135deg,currentColor_50%,transparent_50%)] bg-position-[calc(100%-8px)_50%,calc(100%-3px)_50%] bg-size-[5px_5px,5px_5px] bg-no-repeat pe-7 text-sm font-medium text-foreground outline-none rtl:bg-position-[8px_50%,3px_50%]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function PublicationActions({ publication }: { publication: Publication }) {
  const t = useTranslations("Publications");
  const isPdf = publication.file.format === "pdf";

  return (
    <div className="flex items-center gap-3">
      {publication.doi && (
        <a
          href={publication.doi}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-accent"
        >
          DOI
          <ArrowUpRight aria-hidden className="size-3.5" />
        </a>
      )}
      {publication.url && (
        <a
          href={publication.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground transition-colors hover:text-accent"
        >
          {t("viewRecord")}
          <ArrowUpRight aria-hidden className="size-3.5" />
        </a>
      )}
      {publication.file.href ? (
        <a
          href={publication.file.href}
          target={isPdf ? "_blank" : undefined}
          rel={isPdf ? "noreferrer" : undefined}
          download={isPdf ? undefined : true}
          className="inline-flex items-center gap-2 whitespace-nowrap text-xs font-medium text-foreground transition-colors hover:text-accent"
        >
          {isPdf ? t("openPdf") : t("downloadWord")}
          {isPdf ? (
            <ArrowUpRight aria-hidden className="size-3.5" />
          ) : (
            <Download aria-hidden className="size-3.5" />
          )}
        </a>
      ) : (
        <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs text-muted-foreground">
          <FileText aria-hidden className="size-3.5" />
          {t("filePending")}
        </span>
      )}
    </div>
  );
}
