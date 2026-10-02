# Project Plan

> A modern, premium personal portfolio website for a university professor and medical physicist. The website will present his academic identity, research, professional services, publications, teaching, mentorship, and writing through a highly visual, story-driven experience.

---

## 1. Problem - What problem are we solving?

University professors, particularly researchers in highly technical fields such as medical physics, are often represented online through generic institutional profile pages that are difficult to navigate, visually outdated, and focused primarily on static academic information.

The goal of this project is to create a **modern, professional, memorable digital identity** for a medical physicist who is also a university professor, researcher, educator, mentor, and scientific leader.

The website should solve several problems:

- Present the professor's professional identity clearly within seconds.
- Explain complex research areas in a way that is understandable and visually engaging.
- Make publications, research projects, teaching activities, services, and academic achievements easy to discover.
- Establish credibility with researchers, students, universities, collaborators, healthcare professionals, and the public.
- Give the professor a professional platform that is independent of the university's standard profile system.
- Humanize the professor rather than presenting him only as a list of degrees, publications, and positions.
- Turn his career and research journey into a compelling story.
- Provide a flexible foundation that can grow with new research, publications, blog posts, projects, awards, and collaborations.

### Core product idea

The website should communicate:

> **Who he is → What he studies → Why it matters → Who he teaches → What impact he has → How people can engage with him.**

The site should feel like the **digital identity of a respected scientist**, not a digital CV.

### Success criteria

The website is successful when a first-time visitor can quickly understand:

- Who the professor is.
- What field he works in.
- What his key research interests are.
- What makes his work important.
- How to find his publications.
- What he teaches or mentors.
- What professional services or collaborations he offers.
- How to contact him.

The final experience should be visually memorable while remaining academically credible and highly usable.

### Explicit exclusions

The project is not intended to become:

- A hospital management system.
- A student management system.
- A research database platform.
- A full university website.
- A social networking platform.
- A medical advice platform.
- A generic corporate consulting website.
- An academic LMS.
- A publication-management system replacing ORCID, Google Scholar, Scopus, etc.

External academic platforms can be linked to rather than recreated.

---

## 2. Users - Who is this for?

The primary audience is people who need to quickly understand the professor's expertise, research, achievements, and professional work.

### Primary users

**Researchers and academics**

Researchers looking for:

- Collaboration opportunities.
- Research expertise.
- Publications.
- Academic background.
- Conference and professional connections.

**Students**

Undergraduate, master's, and PhD students looking for:

- A potential supervisor.
- Research opportunities.
- Information about the professor's research.
- Teaching interests.
- Mentorship opportunities.
- Academic background.

**Healthcare and medical professionals**

Professionals interested in:

- Medical physics expertise.
- Research collaborations.
- Clinical or technical services.
- Scientific consultation.
- Healthcare technology.

**Universities and institutions**

Academic institutions looking for:

- Speakers.
- Researchers.
- Collaborators.
- External experts.
- Professional partnerships.

**General/public audience**

Visitors who may not have a medical-physics background but want to understand:

- What medical physics is.
- What the professor researches.
- How physics contributes to healthcare.
- Why the research matters.

### Secondary users

- Journalists and media professionals.
- Conference organizers.
- Research funders.
- Professional organizations.
- Industry partners.
- Alumni and former students.
- Colleagues.

### UX implication

The website must support both:

**fast scanning** for busy academics and professionals

and

**deeper exploration** for users who want to understand the research and career story.

The site therefore needs excellent hierarchy, progressive disclosure, clear navigation, and concise summaries before detailed content.

---

## 3. Features - What does the MVP need?

### Core identity

- Premium hero section introducing the professor.
- Professional portrait and scientific visual identity.
- Concise positioning statement.
- Clear calls to action.
- Downloadable CV.

### About

- Professional biography.
- Academic background.
- Career timeline.
- Current role and affiliations.
- Research interests.
- Professional memberships.
- Personal/academic philosophy.

### Research

- Research overview.
- Research areas.
- Featured projects.
- Project detail pages.
- Research impact.
- Scientific imagery.
- Links to related publications.

### Services

- Professional scientific services.
- Research collaboration opportunities.
- Consulting.
- Training/workshops.
- Academic supervision.
- Speaking or expert engagements.

### Publications

- Selected publications.
- Full publication list.
- Search.
- Year filtering.
- Research-area filtering.
- DOI/external links.
- Google Scholar/ORCID/ResearchGate links.

### Teaching

- Courses.
- Lectures.
- Workshops.
- Student projects.
- Thesis supervision.
- Educational interests.

### Mentorship

- Current students.
- Former students/alumni.
- Supervised research.
- Student achievements.
- Testimonials where real content is available.

### Blog

- Featured article.
- Article archive.
- Categories.
- Individual article pages.
- Reading-time indicators.
- Related articles.
- Scientific and academic commentary.

### Media

- Talks.
- Interviews.
- Podcasts.
- Conference appearances.
- Public lectures.
- Media coverage.

### Contact

- Professional contact details.
- Contact form.
- University/department information.
- Academic profile links.

### Global UX

- Responsive navigation.
- Sticky header.
- Mobile menu.
- Smooth scrolling.
- Scroll progress.
- Accessible interaction states.
- Reduced-motion support.

### Motion

- Hero reveal animation.
- Scroll-triggered section reveals.
- Text animation.
- Image reveals.
- Subtle parallax.
- Hover interactions.
- Number animations.
- Page transitions where appropriate.

### SEO

- Page metadata.
- Open Graph metadata.
- Sitemap.
- Robots configuration.
- Semantic HTML.
- Structured data where appropriate.

---

## 4. Data - What are we storing?

The application should use structured content rather than scattering information throughout components.

### Professor profile

Store:

- Name.
- Professional title.
- University.
- Department.
- Short biography.
- Full biography.
- Profile image.
- Location.
- Email.
- Phone where appropriate.
- CV URL.
- Professional links.

### Research areas

Store:

- Title.
- Slug.
- Description.
- Long description.
- Research image.
- Related projects.
- Related publications.
- Research tags.
- Collaborators.
- Year/date information where relevant.

### Research projects

Store:

- Project title.
- Description.
- Research area.
- Project image.
- Year.
- Status.
- Collaborators.
- Impact.
- Related publications.
- External links.

### Publications

Store:

- Title.
- Authors.
- Journal.
- Year.
- Publication type.
- Abstract/summary where appropriate.
- DOI.
- External URL.
- Research categories.

### Services

Store:

- Service title.
- Description.
- Category.
- Relevant expertise.
- Optional CTA/link.

### Teaching

Store:

- Course title.
- Description.
- Level.
- Institution.
- Year.
- Course URL where available.

### Students / mentorship

Store:

- Name.
- Degree/program.
- Research topic.
- Status.
- Year.
- Alumni status.
- Achievement information.

Only publish information that is appropriate and intentionally provided.

### Awards

Store:

- Award name.
- Organization.
- Year.
- Description.
- Supporting link.

### Media

Store:

- Title.
- Type.
- Date.
- Description.
- Thumbnail.
- External URL/embed URL.

### Blog

Store:

- Title.
- Slug.
- Excerpt.
- Content.
- Cover image.
- Category.
- Publication date.
- Reading time.
- Tags.
- Related articles.

### Contact

The application may receive:

- Name.
- Email.
- Message.

Contact submissions should be handled through an appropriate production email/form provider rather than stored permanently in the frontend.

### Data principles

Do not fabricate:

- Publications.
- Awards.
- Statistics.
- Collaborations.
- Student testimonials.
- Research outcomes.
- Credentials.
- Academic appointments.

Use structured placeholders until real content is available.

---

## 5. Tech - What stack are we using?

### Framework

**Next.js 16+**

Use:

- App Router.
- TypeScript.
- React Server Components by default.
- Client components only when interactivity requires them.

The architecture should be optimized for performance, maintainability, SEO, and progressive enhancement.

### Styling

**Tailwind CSS**

Use Tailwind for:

- Layout.
- Responsive styling.
- Design tokens.
- Typography.
- Spacing.
- Responsive breakpoints.

Create a coherent design system rather than styling each page independently.

### UI system

**shadcn/ui**

Use shadcn/ui selectively for:

- Buttons.
- Sheet/mobile menu.
- Dialogs.
- Tabs.
- Inputs.
- Selects.
- Accordion.
- Tooltips.
- Navigation elements.
- Form components.

Customize shadcn components to match the website identity rather than using default styles everywhere.

### Animation

**Motion for React (`motion/react`)**

Use Motion for:

- Hero animation.
- Scroll-based reveals.
- Image transitions.
- Staggered text.
- Hover interactions.
- Navigation state transitions.
- Layout transitions.
- Page transitions.
- Number animations.
- Subtle parallax.

Animation should be purposeful rather than decorative.

Implement support for:

`prefers-reduced-motion`

### Icons

**Lucide React**

Use icons sparingly and consistently.

Do not use icons as decoration when they don't add meaning.

### Fonts

Primary display font:

**DM Serif Display**

Body/UI font:

**Inter**

Use strong typographic hierarchy and responsive type scaling.

### Images

Use Next.js Image.

Images must be:

- Optimized.
- Responsive.
- Lazy-loaded where appropriate.
- Professionally cropped.
- Accessible with meaningful alt text.

### Content architecture

The initial MVP can use local structured TypeScript/JSON data.

Recommended content modules:

```text
data/
  professor.ts
  research.ts
  projects.ts
  publications.ts
  services.ts
  teaching.ts
  mentorship.ts
  awards.ts
  media.ts
  blog.ts
```

Design the architecture so the content can later move to a CMS without rebuilding the frontend.

### Future CMS option

The project should remain compatible with future integration of a headless CMS such as:

- Sanity.
- Contentful.
- Payload.
- Strapi.

A CMS is not required for the initial MVP unless content-management requirements justify introducing one.

### Forms

Use a production-ready form architecture with:

- Client validation where useful.
- Server-side validation.
- Spam protection.
- Accessible error states.

### Hosting

Preferred deployment:

**Vercel**

The project should be deployable through a standard Next.js production pipeline.

### Quality tools

Use:

- ESLint.
- TypeScript.
- Next.js build checks.
- Automated formatting where configured.

---

## 7. UI/UX - How should this look and feel?

The website should feel like:

> **A premium editorial magazine meets a world-class scientific portfolio meets a sophisticated personal brand.**

It should be inspired by the confidence, storytelling, typography, photography, and large visual compositions of modern celebrity/personal-brand websites such as Trevor Noah's site, while maintaining a completely original identity centered on medical physics.

---

### Design personality

The visual identity should communicate:

**Intelligence**
**Precision**
**Discovery**
**Humanity**
**Medicine**
**Physics**
**Leadership**
**Impact**

The site should feel:

- modern
- sophisticated
- cinematic
- minimal
- confident
- warm
- scientific
- premium
- human

---

### Color direction

Primary palette:

```text
Warm Ivory      #F7F5F0
Near Black      #111315
Graphite        #555B60
Deep Teal       #145C63
Muted Blue      #527C88
Soft Border     #D9D9D4
White           #FFFFFF
```

Dark sections:

```text
Deep Charcoal   #0B1114
Warm White      #F4F1EA
Scientific Teal #4FA3A5
Cool Gray       #B9C4C7
```

Use beautiful gradients selectively.

Preferred gradient behavior:

- subtle radial glows.
- charcoal → teal.
- ivory → white.
- transparent teal atmospheric glows.
- soft scientific backgrounds.

Avoid:

- neon gradients.
- generic purple SaaS gradients.
- excessive rainbow gradients.
- gradients behind every component.

Gradients should create depth and atmosphere.

---

### Typography

Display:

**DM Serif Display**

Body/UI:

**Inter**

Large editorial headings should sometimes occupy significant portions of the viewport.

Use typography as a primary design element.

Example visual direction:

```text
PHYSICS

that moves

MEDICINE

forward.
```

Use small uppercase metadata labels around large headings.

---

### Photography

Photography should be central to the experience.

The professor should have a high-quality editorial portrait.

Ideal visual direction:

- distinguished medical physicist.
- professional academic clothing.
- modern laboratory/research environment.
- subtle scientific equipment.
- cinematic but realistic lighting.
- sophisticated composition.
- natural expression.

Avoid stereotypical:

- stethoscopes.
- generic hospital corridors.
- fake doctor-stock imagery.
- exaggerated medical poses.

The professor should look like an accomplished scientist rather than a stock “doctor.”

---

### Scientific imagery

Use real scientific content wherever possible:

- MRI.
- CT.
- PET.
- Radiation dose maps.
- Treatment-planning images.
- Imaging data.
- Physics simulations.
- Laboratory equipment.
- Research environments.
- Computational visualizations.

Scientific imagery should become part of the design language.

Use image cropping, layering, masking, scale, and subtle motion to make technical images visually compelling.

---

### Layout

Do not rely on repetitive card grids.

Use a mixture of:

- full-screen sections.
- editorial layouts.
- asymmetric grids.
- large image compositions.
- split-screen layouts.
- overlapping elements.
- large typography.
- timelines.
- horizontal galleries.
- minimal text sections.
- data-driven moments.

Create strong visual rhythm by changing layout patterns from section to section.

---

### Storytelling structure

The homepage should behave like a narrative.

#### Act I — The Person

Introduce the professor.

Who is he?

#### Act II — The Scientist

Reveal his research.

What does he investigate?

#### Act III — The Impact

Explain why the work matters.

What difference does it make?

#### Act IV — The Educator

Show teaching and mentorship.

Who is he helping develop?

#### Act V — The Thinker

Show his ideas and philosophy.

What does he believe?

#### Act VI — The Connection

Invite collaboration.

How can people engage with him?

---

### Homepage flow

Recommended order:

1. Hero.
2. Personal statement.
3. About.
4. Research.
5. Featured research project.
6. Research impact.
7. Services.
8. Teaching.
9. Mentorship.
10. Publications.
11. Blog/Insights.
12. Media.
13. Personal philosophy.
14. Contact.
15. Footer.

The exact order can be refined during design based on content availability.

---

### Hero experience

The hero should be visually dominant.

Possible composition:

Large portrait on one side.

Large editorial typography on the other.

Supporting scientific texture or visualization in the background.

Primary message:

> **PHYSICS THAT MOVES MEDICINE FORWARD.**

Supporting text should explain his role and research in one or two concise sentences.

Primary CTA:

**Explore Research**

Secondary CTA:

**View Publications**

Additional CTA:

**Download CV**

---

### Animation philosophy

Animation should make the website feel alive.

Use:

- fade/reveal.
- slide.
- image masking.
- staggered text.
- scroll-linked movement.
- subtle parallax.
- layout transitions.
- hover transformations.
- animated numbers.
- navigation transitions.

Motion should:

**guide → reveal → connect → reinforce**

rather than distract.

Avoid excessive:

- bouncing.
- spinning.
- flashing.
- particle effects.
- continuous animation.
- exaggerated cursor effects.

---

### Accessibility

The experience must remain usable without animation.

Requirements:

- keyboard navigation.
- visible focus states.
- good contrast.
- semantic headings.
- accessible buttons.
- accessible forms.
- meaningful alt text.
- reduced-motion support.

Animation should enhance the experience, not become a dependency.

---

### Responsive design

Desktop should feel immersive.

Tablet should maintain hierarchy without unnecessary complexity.

Mobile should be designed independently rather than treated as a compressed desktop version.

On mobile:

- simplify complex compositions.
- prioritize content hierarchy.
- reduce parallax.
- reduce decorative animation.
- keep typography dramatic but readable.
- maintain strong photography.
- ensure large tap targets.

---

### Navigation UX

Use a sticky navigation.

Desktop (revised 2026-09-07, see section 8):

```text
I.K. Acquah | About | Research | Services | Get in touch | Blog || EN v | theme | Download CV
```

The wordmark is the lecturer's name set in the display serif, legible first,
distinctive second. The five labels are the complete primary menu; utility
controls (language switcher, light/dark toggle, CV download) sit after them.
A label whose route has not shipped yet is hidden by configuration, never
linked to a missing page.

The navigation should subtly change after scrolling.

Mobile should use a full-screen animated menu that also carries the language
list, theme toggle, and CV download.

Use an active section indicator where appropriate.

---

### Research UX

Research should be one of the most visually impressive areas.

Use large images, large numbers, research labels, and project previews.

A research project should feel more like an editorial feature than a standard card.

Example:

```text
FEATURED RESEARCH

PROJECT TITLE

A concise explanation of the scientific
problem and why it matters.

YEAR
RESEARCH AREA
COLLABORATORS

Explore Project →
```

---

### Publications UX

Publications should remain academically credible but easy to scan.

Use:

- strong year hierarchy.
- publication titles.
- journal.
- authors.
- DOI links.
- filters.
- search.

Avoid an unnecessarily dense academic database aesthetic.

---

### Blog UX

The blog should feel like the professor's intellectual journal.

Possible categories:

- Medical Physics.
- Research.
- AI.
- Healthcare Technology.
- Education.
- Scientific Leadership.
- Academic Life.

Use large editorial article cards and a strong featured article.

Article pages should prioritize comfortable reading.

---

### Services UX

Services should feel professional but academic.

Avoid agency-style pricing cards.

Present services as expert capabilities:

- Scientific Consulting.
- Research Collaboration.
- Medical Physics Expertise.
- Training.
- Workshops.
- Academic Supervision.
- Expert Speaking.

---

### Overall visual rule

The site should deliberately alternate between:

**LIGHT → DARK → IMAGE → TYPOGRAPHY → DATA → LIGHT → DARK**

This prevents visual fatigue and creates a premium editorial rhythm.

---

### Design quality benchmark

Before considering a section finished, ask:

- Does this feel custom-designed?
- Does this communicate authority?
- Is there enough whitespace?
- Is the visual hierarchy obvious?
- Does the typography feel premium?
- Is the imagery compelling?
- Does the animation have a purpose?
- Is the section visually different from the previous section?
- Does it work beautifully on mobile?
- Could a visitor understand the content without knowing medical physics?

The ultimate goal is:

> **A website that makes a respected medical physicist feel approachable, intellectually significant, visually distinctive, and globally credible.**

---

## Constraints and guiding principles

### Content integrity

Academic information must always be based on verified material supplied by the professor.

Do not invent content to make the site appear more impressive.

### Scientific integrity

Medical and scientific imagery should be authentic or clearly illustrative.

Do not present AI-generated scientific visuals as real research data.

### Accessibility

Accessibility is a core requirement, not a later enhancement.

### Performance

Visual richness must not come at the cost of performance.

### Maintainability

Components and data must be structured so future updates are easy.

### Originality

Use external websites only as inspiration for design principles.

Do not reproduce copyrighted layouts, wording, branding, or assets.

### Technical correctness

The application must not contain:

- nested anchors.
- hydration mismatches.
- unnecessary client components.
- broken routes.
- console errors.
- invalid semantic HTML.

The production build must succeed before the project is considered complete.

---

## 8. Revision 2 (2026-09-07) - foundation requirements added after the Feature 1 review

The owner reviewed the first homepage slice and added requirements that cut
across every future page. They are recorded here so the build plan, overview,
and specs stay aligned instead of drifting.

### 8.1 The subject

The site belongs to **Dr Isaac Kwesi Acquah**: medical physicist, lecturer,
researcher, and consultant. Verified facts supplied so far (from the owner's
earlier single-page site):

- Lecturer, Department of Physics Education, University of Education,
  Winneba (UEW), Ghana.
- Formerly Medical Physicist, Korle-Bu Teaching Hospital.
- Doctoral research (PhD).
- Research themes: MRI-only radiotherapy and synthetic CT generation, AI in
  medical imaging, radiation protection with QA and dose safety, physics
  education.
- Stated values: clinical rigour, pedagogical innovation.
- Offers medical physics and academic consultancy; clinical or
  radiation-related services carry a regulatory disclaimer.
- Public email is shown obfuscated as `ikacquah [at] uew.edu.gh`.
- Location: Winneba / Accra, Ghana. Copyright line: Dr Isaac Kwesi Acquah,
  all rights reserved.

Not yet supplied and therefore still placeholders: degrees and institutions,
appointment dates, publication list with DOIs, named consultancy services,
course names, awards and memberships, personal ORCID / Scholar / ResearchGate
/ GitHub URLs, the sanitized CV PDF, and the production domain.

### 8.2 Internationalization is core architecture

- Locale-aware URLs: `/en`, `/en/about`, `/fr/research/...`. The locale is a
  route segment, never client-only state.
- Supported locales are configured in one place. English (`en`) is the only
  enabled locale until reviewed translations exist; `fr`, `es`, `pt`, `ar`
  are pre-declared with names and text direction so enabling one is a
  configuration change plus content, not a rewrite.
- Detection priority: explicit choice, saved preference (cookie), browser
  `Accept-Language`, default `en`. Never IP or geography alone.
- The switcher lives in the global navigation, shows language names (not only
  flags), preserves the current page, persists the choice, works on keyboard
  and mobile. Locales that are declared but not enabled appear as disabled
  "coming soon" entries so the multilingual intent is visible without serving
  unreviewed content.
- UI strings live in message dictionaries; academic content lives in the data
  layer as per-field localized values with English fallback. Publication
  metadata is never translated. Blog posts are localized per file and only
  when a reviewed translation exists.
- Server and client render the same locale; no flash of English before a
  switch; correct `<html lang dir>`; localized metadata, canonical, and
  `hreflang` with `x-default`.
- RTL readiness: logical CSS properties, direction-aware icons, an Arabic
  companion font mapped per locale when `ar` is enabled.
- Machine translation may draft; published academic content is human-reviewed.

### 8.3 Light and dark mode

Site-wide theme toggle in the navigation, persisted per visitor, defaulting to
the system preference. The toggle plays a short synthesized "light switch"
click on user action. Dark sections keep their cinematic rhythm in dark mode
through a lifted, teal-tinted surface rather than inverting to light.

### 8.4 Cookie consent

A small, elegant consent notice explains that the site stores functional
preferences (language, theme) and records the visitor's choice for a year. No
analytics ship until consent-gated analytics are planned.

### 8.5 Downloadable CV

A public, sanitized CV PDF is downloadable from the header, hero area, and
footer. A clearly labelled placeholder PDF is served until the real file is
supplied.

### 8.6 Header and footer blocks

The header adapts the `@efferd/header-2` block (floating pill that compacts on
scroll) and the footer adapts `@efferd/footer-6` (layered sticky footer with
animated link groups). Both are restyled to this design system and wired to
the i18n, theme, and data layers; nothing from the blocks' demo content ships.

### 8.7 Blog

The blog uses MDX files as its authoring format, taking cues from the Next.js
blog for reading experience. Still delivered as its own feature.

### 8.8 Interactivity and craft

The site should feel like a medical physics portfolio, not a template:
domain-specific interactive moments (an MRI to synthetic CT comparison, an
isodose field that responds to the pointer), spring-based micro-interactions
(navigation indicator, magnetic calls to action, the bulb toggle), and the
layered footer reveal. All gated by pointer capability and
`prefers-reduced-motion`, never at the cost of performance or accessibility.

### 8.9 Instant navigation

Reference: Next.js 16.3 Instant Navigations (nextjs.org/blog/making-v0-
navigations-instant). Every route is prerendered per locale, no dynamic data
is read in layouts, and the proxy only redirects and sets the locale cookie,
so client navigations stay instant with static prefetch. Cache Components stay
off until dynamic personalized content exists; the `instant()` Playwright
helper is the intended regression test once browser tests are set up.

### 8.10 SEO and performance

Localized titles and descriptions, canonical URLs, `hreflang`, Open Graph with
a generated social image, Person structured data, sitemap and robots, and
`next/image` everywhere. Performance budgets apply on mobile as much as
desktop.
