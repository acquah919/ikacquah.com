# instant-nav rig: ikacquah.com

- BUILD: `bun run test:browser` builds with NEXT_NAV_TEST=1 into `.next-navigation`, then invokes Playwright. The normal build remains in `.next`.
- EXPOSE: `experimental.exposeTestingApiInProductionBuild` is enabled only when NEXT_NAV_TEST=1 at build time. Real production builds leave it disabled.
- RUN: `bun run test:browser`; individual cases may be selected with `--grep`. Playwright uses http://localhost:3100 and owns `bun run start --port 3100`, with NEXT_NAV_TEST=1 and reuseExistingServer=false.
- TEST USER: public, no authentication. English locale, consent declined, reduced motion, clean browser context per test; four existing English articles and one RadPulse project.
- DRIFT: no remote data, account, permissions, or feature flags. Test content comes from the same checked-out local data and MDX as the build.
- BASELINE: eight unlocked cases passed, then all eight passed using the official instant helper on the same production artifact before changing cache flags or Link behavior. The existing public routes already satisfy their selected readiness contracts; no artificial prefetch failure was introduced.
- REGRESSIONS: a separate section-marker lifecycle test failed before the hook repair and passed afterward. A locale-fallback navigation test preserves the original English destination and NEXT_LOCALE cookie. The current four posts appear on one page with the six-post limit.
- CONTRACTS: header Projects, Blog, and Publications links must show destination headings and primary catalogue/library content before the click completes; catalogue RadPulse link must show its title and phone preview; blog article title link must show the article title and publication metadata; article return link must show the blog titles; mobile menu Projects must show its catalogue. Each has a separate click-driven test, preserving the current viewport/default or explicit prefetch policy. All content remains available after navigation. No personalized or navigation-only data exists.
- LOOP: build, Playwright-owned start, tests, automatic server cleanup, edit, repeat. No remote deployment, push, or commit is part of this rig.
- LIVENESS: n/a; fresh local build and Playwright-owned start; stale port ownership fails rather than reusing an existing process.
- WALLS: Windows uses installed Edge through Playwright, avoiding browser downloads. Other systems use Playwright Chromium, or set PLAYWRIGHT_CHANNEL to an installed compatible browser. Automatic prefetch behavior is verified in production only. Existing user development and production servers remain on their own ports.

## Verified navigation

| Source and link | Ready on click | Prefetch trigger |
| --- | --- | --- |
| `/en`, header Projects | Catalogue heading and featured project link | Default viewport shell |
| `/en`, header Blog | Heading, article titles, search and categories | Default viewport shell |
| `/en`, header Publications | Library heading and search | Default viewport shell |
| `/en/projects`, RadPulse title | Case-study heading and phone preview | Explicit viewport prefetch |
| `/en/projects`, Explore the project | Case-study heading and phone preview | Explicit viewport prefetch |
| `/en/blog`, beginner article title | Full title and publication metadata | Existing explicit viewport prefetch |
| Beginner article, return to Blog | Heading and article titles | Default viewport shell |
| Mobile `/en` or tablet `/ar`, menu Projects | Localized catalogue heading and project link | Default when menu link appears |

All selected content is public and local. Images and the client bundle load normally; no personalized or navigation-only content was introduced. Prefetching remains best-effort on real connections. The shared route heading/return link is the fallback if detail prefetch has not finished.

## Adoption and regression evidence

- Cache Components and Partial Prefetching are enabled globally on Next.js 16.3.4. The article destination first passed route-level adoption before the global flag was enabled. Its temporary export was removed by the official codemod.
- The original eight unlocked and locked checks passed before migration; the expanded 10-check baseline passed with Cache Components and Partial Prefetching disabled, then again with Cache Components enabled alone.
- Enabling Partial Prefetching exposed a real catalogue-to-detail gap: the URL and shared shell committed, while the RadPulse title/phones waited for navigation. Explicit prefetch on the two exact catalogue links restored the original content readiness.
- Removing only those link props reproduced two failing readiness tests. Separate diagnostics proved both shells stayed available and all detail markers rendered after releasing the lock. Restoring the props passed both tests. Temporary diagnostics were removed; only positive regression tests ship.
- Final production suite: 18/18 passed. The added lifecycle checks cover browser Back/filter restoration, locale route/query/hash preservation, unknown slug not-found/noindex, Arabic tablet layout, no-JavaScript catalogue/footer, and RadPulse content before the external client bundle loads.
- Development route sweep: 37/37 pages rendered across all five locales. The reduced-motion hydration issue was repaired. Final MCP compilation/session checks are clean.
- The error-only catch-all has instant=false because it has no page to prefetch. No valid page is opted out. Unknown slugs render not-found/noindex with a streamed HTTP200 response; the generic catch-all returns HTTP404.
- No new data cache needs a mutation lifecycle: articles/projects remain build-time local data; the footer year has a daily cache lifetime. Locale-changing next-intl links retain their intentional prefetch opt-out so locale cookie synchronization works.
- Normal production output explicitly disables the testing API. Test output enables it only under NEXT_NAV_TEST=1.

Production captures: [before prefetch](.taste-skill/navigation/radpulse-before-prefetch.png), [after prefetch](.taste-skill/navigation/radpulse-after-prefetch.png). Final development evidence: `.taste-skill/navigation/dev-sweep.json`, `catch-all-final.json`, and `final-dev-errors.json`.
