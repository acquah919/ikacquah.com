# bruno-portfolio - Project Overview

<!-- blueprint:source-hash 07c0981c2230990a42b6c8429748632b77b6f04d6113b43ddcc07e33cc79c348 -->

> A premium, story-driven, multilingual personal portfolio website for Dr Isaac Kwesi Acquah, medical physicist, lecturer, researcher, and consultant (University of Education, Winneba, Ghana), presenting his identity, research, services, publications, teaching, mentorship, and writing as an editorial experience rather than a digital CV.

Verified facts and remaining placeholders about the subject are listed in project-plan section 8.1. Nothing academic is invented; missing facts render as marked placeholders or not at all.

## Problem

Researchers in technical fields like medical physics are usually represented online by generic institutional profile pages: hard to navigate, visually dated, and reduced to static lists of degrees and papers. This project gives the professor an independent, memorable digital identity that explains who he is, what he studies, why it matters, who he teaches, and how to engage with him, within seconds for scanners and in depth for explorers.

Success: a first-time visitor quickly understands the professor, his field, his key research interests and their importance, where to find publications, what he teaches, what services he offers, and how to contact him.

Explicitly not: a hospital or student management system, research database, university site, social network, medical-advice platform, corporate consulting site, LMS, or a replacement for ORCID / Google Scholar / Scopus (link to those instead).

## Users

All visitors are anonymous; there are no accounts or access tiers.

- **Researchers and academics** - collaboration, expertise, publications, background.
- **Students** (undergraduate to PhD) - potential supervisor, research and mentorship opportunities.
- **Healthcare and medical professionals** - medical physics expertise, consultation, collaboration.
- **Universities and institutions** - speakers, external experts, partnerships.
- **General public** - what medical physics is and why the research matters, in plain language.
- **Secondary** - journalists, conference organizers, funders, professional bodies, industry, alumni, colleagues.

UX implication: support fast scanning and deep exploration through strong hierarchy, progressive disclosure, and concise summaries before detail.

## Features

MVP, in build-plan order. Feature 1 is the headline slice that establishes the visual system.

1. **Foundation & personal brand homepage** (headline) - the complete story-driven homepage plus the site foundation: typography, palette, editorial sections, Motion primitives, locale-aware routing with translation architecture (English enabled; fr, es, pt, ar pre-declared), light/dark theme with persisted preference and a synthesized switch sound, header (`@efferd/header-2` adapted) and layered footer (`@efferd/footer-6` adapted) with the name wordmark, language switcher, CV download, cookie consent, localized SEO metadata, and domain-specific interactive moments.
2. **About & academic journey** - biography, animated career timeline, affiliations, memberships, philosophy.
3. **Research showcase** - research areas and featured projects as immersive editorial features, not card grids.
4. **Research project pages** - `/research/[slug]` with problem, approach, impact, collaborators, visuals, related publications.
5. **Professional services** - consulting, collaboration, training, supervision, speaking, presented as expert capabilities (no pricing cards).
6. **Publications library** - selected and full publications with search, year and area filters, DOI links, academic profile links.
7. **Teaching & mentorship** - courses, lectures, workshops, supervision, students and alumni, mentoring philosophy.
8. **Blog & insights** - MDX-authored editorial journal with featured article, categories, article pages, reading time, related articles; per-locale article files with graceful fallback.
9. **Media & talks** - conferences, keynotes, interviews, podcasts, lectures, media coverage.
10. **Contact & collaboration** - professional contact details, form, department info, academic links.
11. **Motion-driven storytelling** - site-wide scroll reveals, transitions, parallax, hover, counters, page transitions.
12. **Responsive & accessible experience** - desktop, tablet, mobile parity; keyboard, focus, contrast, reduced motion.
13. **Academic SEO & sharing** - metadata, Open Graph, structured data, sitemap, robots, canonical URLs.
14. **Production readiness** - clean build, no hydration or console errors, deploy-ready.

Post-MVP: 15 CMS integration, 16 publication/profile sync, 17 research archive expansion, 18 newsletter, 19 privacy-conscious analytics (consent-gated), 20 additional language content (reviewed human translations enabled by configuration), 21 advanced media experiences, 22 ongoing content and design refinement.

## Data model

Local structured TypeScript modules under `data/` for the MVP, shaped so a headless CMS (Sanity, Contentful, Payload, Strapi) can replace them later without rebuilding the frontend. Slugs are lowercase kebab-case, unique within their module, and used directly in routes. Never fabricate publications, awards, statistics, collaborations, testimonials, outcomes, credentials, or appointments; unknown values stay as marked placeholders.

### Professor (`data/professor.ts`, singleton)

- `name` (string), `title` (string), `university` (string), `department` (string)
- `shortBio` (string), `fullBio` (string or rich blocks)
- `portrait` (Image: `src`, `alt`, `width`, `height`)
- `location` (string), `email` (string, optional), `phone` (string, optional)
- `cvUrl` (string, optional)
- `links` (ProfileLink[]: `label`, `href`, `kind` such as orcid, scholar, researchgate, linkedin)

### ResearchArea (`data/research.ts`)

- `title`, `slug` (unique), `description` (short), `longDescription`
- `image` (Image), `tags` (string[])
- `projects` (ResearchProject.slug[]), `publications` (Publication.id[])
- `collaborators` (string[], optional), `period` (string, optional)

### ResearchProject (`data/projects.ts`)

- `title`, `slug` (unique), `description`, `area` (ResearchArea.slug)
- `image` (Image), `year` (number), `status` (`active` | `completed` | `planned`)
- `problem`, `approach`, `impact` (strings)
- `collaborators` (string[]), `publications` (Publication.id[]), `links` (Link[])

### Publication (`data/publications.ts`)

- `id` (unique), `title`, `authors` (string[]), `journal`, `year` (number)
- `type` (`journal` | `conference` | `book-chapter` | `thesis` | `other`)
- `abstract` (optional), `doi` (optional), `url` (optional), `areas` (ResearchArea.slug[])

### Service (`data/services.ts`)

- `title`, `slug`, `description`, `category`, `expertise` (string[]), `cta` (Link, optional)

### Course (`data/teaching.ts`)

- `title`, `description`, `level` (undergraduate | postgraduate | professional), `institution`, `year`, `url` (optional)

### Student (`data/mentorship.ts`)

- `name`, `program`, `topic`, `status` (current | alumni), `year`, `achievement` (optional)
- Publish only intentionally provided information.

### Award (`data/awards.ts`)

- `name`, `organization`, `year`, `description`, `url` (optional)

### MediaItem (`data/media.ts`)

- `title`, `type` (talk | interview | podcast | conference | lecture | coverage), `date`, `description`, `thumbnail` (Image), `url` or `embedUrl`

### BlogPost (`data/blog.ts`)

- `title`, `slug` (unique), `excerpt`, `content`, `cover` (Image), `category`, `publishedAt` (ISO date), `readingTime` (minutes), `tags` (string[]), `related` (BlogPost.slug[])

### ContactSubmission (transient)

- `name`, `email`, `message`; validated server-side, delivered through a production email/form provider, never persisted in the frontend.

> Lock the `Image` shape (`src`, `alt`, `width`, `height`) and slug rules in feature 1; every later feature depends on them.

## Tech stack

- **Next.js 16 (App Router, Turbopack)** - framework; React Server Components by default, client components only for interactivity.
- **React 19 + TypeScript (strict)** - UI and type safety.
- **Tailwind CSS v4** - CSS-first design tokens, layout, responsive typography.
- **shadcn/ui (style `base-lyra`, on `@base-ui/react`)** - selective primitives (Button, Sheet, Dialog, Tabs, Inputs, Selects, Accordion, Tooltip), restyled to the identity.
- **Motion for React (`motion/react`)** - hero and scroll reveals, staggered text, parallax, hover, layout and page transitions, counters; honors `prefers-reduced-motion`.
- **next-intl** - locale segment routing (`/[locale]/...`, prefix always), proxy-based detection (URL, cookie, `Accept-Language`, default `en`), message dictionaries for UI strings, `Link`/`useRouter` that preserve the current page across locales, `hreflang` link headers. Academic content is localized per field in `data/` with English fallback.
- **next-themes** - class-based light/dark theme, system default, persisted per visitor, hydration-safe.
- **Lucide React** - sparse, meaningful icons.
- **next/font** - DM Serif Display (display) and Inter (body/UI); per-locale companion fonts (Arabic) are mapped in the locale registry and loaded only when that locale is enabled.
- **next/image** - optimized, responsive, lazy images with meaningful alt text.
- **bun** - package manager and script runner.
- **ESLint + TypeScript + `next build`** - quality gates.

## Monetization

Not in v1. The site is a professional identity, not a product.

## UI/UX

Feel: premium editorial magazine meets world-class scientific portfolio meets sophisticated personal brand. Inspired by the confidence and typographic scale of modern personal-brand sites, with a fully original identity centered on medical physics ("where physics meets medicine").

Palette: Warm Ivory `#F7F5F0`, Near Black `#111315`, Graphite `#555B60`, Deep Teal `#145C63`, Muted Blue `#527C88`, Soft Border `#D9D9D4`, White. Dark sections: Deep Charcoal `#0B1114`, Warm White `#F4F1EA`, Scientific Teal `#4FA3A5`, Cool Gray `#B9C4C7`. Gradients are subtle (radial glows, charcoal to teal, ivory to white); no neon or SaaS purple.

Typography: DM Serif Display for oversized editorial headings that can fill large parts of the viewport; Inter for body and small uppercase metadata labels. Strong contrast between giant statements, small metadata, and readable copy.

Imagery: an editorial portrait of the professor as a scientist (no stock-doctor cliches) plus real or clearly illustrative scientific imagery (CT, MRI, PET, dose maps, planning, simulations, instruments) treated as design material.

Layout rhythm: alternate LIGHT, DARK, IMAGE, TYPOGRAPHY, DATA; full-screen and split sections, asymmetric grids, overlapping elements, timelines, horizontal galleries. No repetitive card grids.

Homepage narrative (six acts): the Person, the Scientist, the Impact, the Educator, the Thinker, the Connection. Recommended order: hero, personal statement, about, research, featured project, impact, services, teaching, mentorship, publications, blog, media, philosophy, contact, footer; refine by content availability.

Navigation: floating header (`I.K. Acquah | About | Research | Services | Get in touch | Blog || EN | theme | Download CV`) that compacts into a pill on scroll; full-screen animated mobile menu carrying the language list, theme toggle, and CV; labels for unshipped routes are hidden by configuration; active-section indicator where appropriate.

Theme: light (ivory) and dark (charcoal) site-wide; dark sections use a lifted teal-tinted surface in dark mode so the light/dark rhythm survives. Cookie consent notice for functional preferences.

Routes (all under a locale prefix, e.g. `/en/...`; `/` redirects to the detected locale):

- `/[locale]` - story-driven homepage
- `/[locale]/about` - biography, timeline, affiliations, philosophy
- `/[locale]/research` - areas and featured projects
- `/[locale]/research/[slug]` - project detail
- `/[locale]/services` - professional expertise
- `/[locale]/publications` - searchable, filterable library
- `/[locale]/teaching` - courses, lectures, supervision
- `/[locale]/mentorship` - students, alumni, mentoring impact
- `/[locale]/blog`, `/[locale]/blog/[slug]` - editorial journal and articles
- `/[locale]/contact` - contact details and form

Accessibility is a core requirement: keyboard navigation, visible focus, contrast, semantic headings, accessible forms, meaningful alt text, reduced-motion support. Mobile is designed independently: simplified compositions, reduced parallax, dramatic but readable type, large tap targets.

Technical correctness: no nested anchors, no hydration mismatches, no unnecessary client components, no broken routes, no console errors, valid semantic HTML.

## Deployment

- Target: **Vercel**, standard Next.js production pipeline.
- Build `bun run build`, start `bun run start`, output `.next/`.
- Env vars: `NEXT_PUBLIC_SITE_URL` (canonical origin for metadata, sitemap, `hreflang`; falls back to `http://localhost:3000`). The contact form provider (feature 10) will add its keys by name when chosen.
- No database, storage, workers, or cron. Health path: `/`.
- Domain: > TODO, not decided in the plans.

## Open questions

- Name, roles, affiliation, former post, research themes, values, and public email are verified (project-plan 8.1). Still missing: degrees and institutions, dates, publications with DOIs, named consultancy services, courses, awards and memberships, personal academic profile URLs, the sanitized CV PDF (a labelled placeholder PDF is served), and the production domain.
- Only English content exists. The switcher shows the other declared languages as disabled "coming soon" entries until reviewed translations are supplied and the locale is enabled in `i18n/config.ts`.
- No portrait in a laboratory or research environment exists yet; the current assets are a studio portrait (cutout on white) and a graduation photograph. The plan's editorial lab portrait remains a content TODO.
- Contact form provider (email service, spam protection) is unspecified; decide before feature 10.
- Mentorship testimonials and student data are conditional on real, approved content.
