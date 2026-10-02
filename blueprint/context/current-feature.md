# Feature: Publications library

**From build-plan:** feature 6
**Status:** ready for review
**Branch:** `feature/publications-library`
**Depends on:** the locale, theme, navigation, and motion foundation currently
carried by `feature/personal-brand-homepage`

## Goal

Add a polished, searchable publications page for Dr Isaac Kwesi Acquah. It
must support a library of about 15 PDF and Word documents without presenting
unverified sample content as real academic work.

## Visitor experience

- `/[locale]/publications` opens from the primary navigation with the existing
  directional View Transition.
- An animated editorial hero introduces the archive and visually references
  PDF and Word documents.
- Visitors can search and filter by year, research area, publication type, and
  file format.
- Publication rows show verified metadata when present, DOI and external links
  when supplied, and an open or download action when a file exists.
- Fifteen initial records are visibly marked as samples and file actions stay
  unavailable until verified documents are supplied.
- Filter changes animate row movement and entry while respecting reduced
  motion settings.

## In scope

1. Structured publication and file types in `data/publications.ts`.
2. Fifteen demonstration records with 12 PDF slots and 3 DOCX slots.
3. Responsive hero and archive components under `components/publications/`.
4. Search plus year, area, type, and format filtering.
5. Route metadata, canonical URLs, locale alternates, and sitemap inclusion.
6. Primary navigation, mobile menu, and footer access.
7. English, French, Spanish, Portuguese, and Arabic interface copy.
8. A file-placement guide in `public/publications/README.md`.

## Out of scope

- Invented publication titles, authors, journals, years presented as factual,
  DOI values, citations, or academic profile URLs.
- Publication detail pages or an embedded document reader.
- Automatic ORCID, Google Scholar, Scopus, or ResearchGate synchronization.
- Uploading the lecturer's real documents before they are supplied.
- A CMS or database.

## Data contract

`Publication` contains:

- `id`, `title`, `authors`, `journal`, `year`, and `type`
- optional `abstract`, `doi`, and external `url`
- `areas` containing research-area slugs
- `file` with `format`, optional public `href`, and optional display `size`
- optional `featured`, `sample`, and `sampleNumber` flags

Publication files live under `public/publications/` and use lowercase,
hyphenated filenames. Their public URLs start with `/publications/`.

## Build steps

- [x] Define publication types, demonstration records, and placement guide.
- [x] Build the animated hero, archive list, search, and filters.
- [x] Add the localized route, metadata, navigation, and sitemap entry.
- [x] Pass focused lint, typecheck, production build, and responsive review.

## Verification

- `bun run lint`
- `bunx tsc --noEmit`
- `bun run build`
- Confirm `/en/publications` and `/ar/publications` render without errors.
- Confirm search and every filter update the count and visible rows.
- Confirm route transitions and reduced-motion behavior.
- Confirm no horizontal overflow at mobile, tablet, and desktop widths.

Verification completed:

- Focused ESLint for every changed TypeScript and TSX file: passed.
- `bunx tsc --noEmit`: passed.
- `bun run build`: passed and prerendered all five publication routes.
- Browser widths 390, 820, and 1440: no horizontal overflow.
- English search: 15 records to 1; DOCX filter: 15 to 3; clear: back to 15.
- Arabic at 390: `lang="ar"`, `dir="rtl"`, 15 records, no overflow.
- Full-project lint remains blocked by existing errors in `app/global-error.tsx`,
  `components/blog/article-reactions.tsx`, and the theme components.

## Notes for implementation

- Academic titles stay in their original language when real records arrive.
- Sample years and categories exist only to exercise the filters and are
  covered by a prominent demonstration-content notice.
- A missing file renders a non-interactive pending state, never a broken link.
- PDF files open in a new tab. Word files download.
