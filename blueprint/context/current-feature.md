# Feature: Projects showcase and blog upgrade

**Status:** implemented and verified; ready for review without commit or deployment
**Branch:** `fetaure/projects-page`
**Approval:** User explicitly approved the implementation plan in chat.
**Previous packet:** Preserved unchanged in `pending/publications-library.md`.

## Goal

Add localized project routes, a factual RadPulse Africa case study using the supplied Word document and real screenshots inside Android and iPhone frames, a controlled screenshot walkthrough, and a searchable, filterable, paginated title-based blog grid inspired by the supplied Blog 8 screenshot.

## Contract

- Keep the Fraunces/Spline Sans identity, semantic tokens, themes, locale routing, and article transitions.
- Publish only RadPulse Africa. Document Android, version 1.0.0, ongoing development, four imaging modalities, six QC capabilities, equipment-only records, and the supplied Expo URL. Describe intended benefits as goals.
- Add localized project catalogue/detail routes, navigation, breadcrumbs, metadata, and sitemap. Unknown projects return 404.
- Use Android/iPhone CSS frames and light/dark screenshots. Walkthrough chapters: Home, Equipment, Tasks, Records, More, About. Playback starts on request, advances every five seconds, pauses offscreen/when hidden, and stops at the end. Manual selection pauses it. Include previous/next, play/pause/restart, keyboard access, and reduced motion.
- Blog: title/category/date/reading time in 3/2/1 columns; content-derived categories; case-insensitive title/category/tag search; filter then paginate newest-first at six posts per page (latest user refinement); reset on filter changes; result range, numbered pages, previous/next, clearable empty state. Client receives metadata only and keeps local control state.
- Use compatible shadcn Base UI primitives and Motion entrances. The screenshot replaces paid React Bits installation.
- Localize interface messages for five active locales; English fallback for untranslated project prose.

## Build steps

- [x] Add typed project data and optimized screenshot assets.
- [x] Build catalogue, case study, phone frames, and walkthrough.
- [x] Integrate navigation, locale messages, metadata, and sitemap.
- [x] Build blog grid, filters, pagination, and motion.
- [x] Verify focused lint, generated route types, typecheck, build, and browser behavior.

## Verification

Use existing Bun commands and live browser evidence. No unit-test runner is configured. The latest explicit Next.js skill request authorizes its required Playwright production navigation harness, documented as `bun run test:browser`; do not add unrelated test infrastructure. Check routes/404s, screenshots, playback/timers, navigation, search/category combinations, pagination/reset/empty state, themes, RTL, keyboard, reduced motion, and responsive overflow.

Baseline: full lint has six errors in global-error, article-reactions, theme-provider, and theme-toggle, plus ten warnings. Typecheck has stale generated project-route references. Require focused source lint and typecheck/build to pass; report unrelated baseline lint separately. Preserve existing .taste-skill artifacts. No commit, merge, push, or deploy is authorized.

## Accepted refinements

- Latest user request: use the Vercel Next.js Partial Prefetching optimizer and its referenced article to improve navigation; change blog pagination from three to six articles per page. User explicitly chose to finish the full migration and navigation improvements together on the current branch. Install the requested local skill and the production regression tooling its workflow requires. Preserve the previous footer style, RadPulse repairs, publications packet, and all unrelated work.
- [x] Change blog page size to six, retaining search/category behavior and local pagination state.
- [x] Establish the production instant-navigation baseline before changing cache or Link behavior. Eight unlocked baseline cases passed, then the same eight passed with the official instant helper. Existing primary destinations already satisfy the selected readiness contract; do not manufacture a prefetch failure.
- [x] Repair route-aware homepage section observation and next-intl fallback-language prefetch warnings while preserving existing destinations and prefetch policy.
- [x] Apply Cache Components and Partial Prefetching adoption together on the current branch, as explicitly selected by the user.
- [x] Verify the final production navigation tests, focused lint, typecheck, and normal production build; keep the test API out of normal builds.

Navigation implementation and final verification:

- Requested optimizer and required adoption/development-verification skills installed project-locally from vercel/next.js canary, following the official article. Next.js remains 16.3.4, which supports the required APIs; the official @next/playwright helper is pinned to 16.3.4.
- Production browser harness uses installed Edge, an isolated `.next-navigation` build, runner-owned port 3100, and a testing API enabled only when NEXT_NAV_TEST=1. No CI or deployment settings changed.
- Before repair: homepage -> Research -> Projects -> homepage -> About failed to restore the active section marker. After the route-aware external-store/observer repair, the same regression passed.
- Before repair: French blog emitted eight next-intl unsupported-prefetch errors. After conditional locale-compatible prefetch, the same development visit emitted none. English article destinations and locale cookie synchronization are unchanged.
- Cache Components adoption passed the unchanged 10-test suite with Partial Prefetching off. The article route was then adopted independently and the same suite passed before enabling Partial Prefetching globally. The first-party remove-partial-prefetch transform removed the redundant route export (one file changed, zero errors). Its Windows launcher could not resolve .bin/jscodeshift, so the installed official transform was run through its jscodeshift JavaScript entry point.
- Read locale identity through next/root-params so the localized shared shell can prerender. Keep URL-dependent detail content under focused Suspense boundaries with a real heading and return link; header navigation and language controls have filled fallbacks. The footer year uses a daily cache boundary. Public content remains local data/MDX, updated by the normal build workflow; no content writer or personalized cache was added.
- Global Partial Prefetching initially preserved 9/10 cases. The catalogue title link committed the shared Projects shell but deferred RadPulse's heading/phones. Explicit viewport prefetch on the two catalogue detail links preserves their previous ready-on-click content. Removing only those two props reproduced both failures; diagnostic checks proved the shell stayed visible and detail content appeared after the lock released. Reapplying them restored both passing contracts. No artificial prefetch=false control was used.
- `bun run test:browser` passed all 18 retained cases plus two temporary screenshot capture cases. After removing the temporary cases, the final production suite passed 18/18 against the same artifact. Coverage includes eight English instant source-link contracts and Arabic tablet navigation, six-post page size with the current four posts, live search, section-marker lifecycle, French-to-English article navigation, query/hash-preserving locale changes, Back restoring blog filters, unknown slug not-found/noindex states, no-JavaScript catalogue/footer content, and RadPulse's initial preview before the client bundle loads.
- The five-locale development sweep passed 37 visible-route checks. It exposed a pre-existing reduced-motion HeroStage hydration mismatch; using the existing hydration-safe hook eliminated all five observed mismatches. Only the error-only generic catch-all opts out of instant validation because it always throws notFound. Its final check returns HTTP404 with the correct localized page/noindex and no validation error. All valid content routes remain adopted.
- Unknown project/article URLs render the localized not-found page and noindex after streaming. Their HTTP response is 200 once the shared shell has been sent, the standard streamed notFound behavior. Generic unknown routes retain HTTP404. Client navigation requires JavaScript; the streamed RadPulse screen renders before the external client bundle loads.
- Final focused source/tooling lint passed with zero violations. HeroStage retains its three existing unused-CV warnings. Full lint reports the same four failing source locations as before: global-error, article-reactions, theme-provider, and theme-toggle (seven printed errors, five existing warnings). No new lint error was introduced.
- `bunx tsc --noEmit` and the normal `bun run build` passed. Both cache flags are enabled in the final output. The testing API is false in `.next` and true only in the isolated `.next-navigation` artifact.
- Final Next MCP compilation/session checks are clean. Evidence is under `.taste-skill/navigation/`, including the 37-route sweep, catch-all follow-up, and before/after production navigation captures. The requested click-through contract and commands are documented in `instant-nav.rig.md`.
- The restored footer appearance, RadPulse repairs, and unrelated local files are preserved. The publications packet remains byte-identical (`dbd26cd77bb060573dca83e11a03d98a69b58db0`). No commit, merge, push, or deployment occurred.

- Removed the Android-build/iPhone-presentation explanatory note at the user's request.
- Updated frames and selectors to Pixel 11 Pro and iPhone 18 Pro.
- Kept blog list keys stable by article slug to prevent duplicate named ViewTransition mounts during filter animations.
- Added compact chapter controls above the phone on mobile so selecting a screen does not require scrolling past the device.
- Installed and integrated the explicitly requested `@magicui/iphone` and `@magicui/android` components, adapting media slots for optimized screenshots and assigning unique SVG mask IDs.
- The final About chapter uses the matching light/dark creator screenshots supplied by the user. Both appearances preload and crossfade after the dark asset loads.
- Replaced the email reveal control with a server-rendered mailto link in the contact section and footer.

## Final evidence

### Approved footer and RadPulse follow-up

User approved the footer redesign and RadPulse repair plan in chat, then requested restoration of the previous footer style during implementation. The previous footer layout, typography, reveal, navigation, and language list are restored; the direct email remains. Keep the same work branch and preserve the completed showcase/blog work and publications packet.

- [x] Restore the previous footer style at the user's request and remove the replacement signature, animation component, and footer-only styles. Keep the reveal on desktop; use normal flow below 1024px so the existing contact/language content is not clipped on tablets.
- [x] Explicitly position and size all phone image parents; keep Magic UI frames and screenshot proportions.
- [x] Add visible five-second chapter progress, restart Play from the last screen, and retain pause/resume, manual selection, offscreen/hidden pausing, and end/replay behavior.
- [x] Update the shared Expo action to the exact supplied build URL and localize new playback labels in all five locales.
- [x] Verify development warnings, responsive footer and phone controls, playback lifecycle, no-JavaScript/reduced-motion/RTL behavior, focused lint, typecheck, and production build.

Follow-up evidence:

- Restored the original footer composition, background, typography, language list, and desktop reveal. Removed the replacement signature and animation component. Tablet clipping observed at 768px was repaired by limiting the fixed reveal to desktop widths of 1024px and above.
- `bunx eslint` on the footer, phone frame, walkthrough, Magic UI devices, and project data: passed with no violations.
- `bunx tsc --noEmit`: passed. Final `bun run build`: passed, including route generation and TypeScript.
- Full lint: the same four pre-existing failing source locations remain (global-error, article-reactions, theme-provider, theme-toggle), printed as seven errors and nine unused-variable warnings. No new failing source location was introduced; the unused footer import was removed.
- Browser verification: 51/51 assertions passed for playback, pause/resume, final-screen restart, natural end/replay, visibility/offscreen pausing, both device/appearance creator screenshots, cached-load warnings, exact Expo URLs, responsive layouts, Arabic/reduced motion, keyboard Space, and the initial screen without JavaScript.
- Final footer containment and translation checks: 13/13 passed. All links and five language controls fit at 320, 390, 768, 1024, and 1440 in English and Arabic. French, Spanish, and Portuguese playback labels render correctly.
- Additional client catalogue/detail navigation and rapid play/pause checks passed; no browser exceptions, image-position warnings, or duplicate view-transition warnings were captured.
- Evidence is in `.taste-skill/footer-radpulse/verification.json` and `final-layout.json`, with final creator and restored-footer screenshots. The earlier `footer-*.png` files show the rejected redesign and are retained as work evidence only.
- Publications pending packet remains byte-identical to the preserved original (`dbd26cd77bb060573dca83e11a03d98a69b58db0`). Existing findings/review ledgers are unchanged, with no findings or independent-review request. Audit and independent review were unselected for this ordinary component change. No commit, merge, push, or deployment occurred.

### Previous showcase and blog evidence

- `bun run build`: passed; all five project catalogue/detail locales prerendered.
- `bunx tsc --noEmit`: passed on the final source and regenerated route types.
- Focused ESLint on the new and changed product implementation: passed. Existing unused-import warnings in the previously edited header/footer/contact files are unchanged.
- Full-project lint still reports the original error locations in global-error, article-reactions, theme-provider, and theme-toggle. The error-page rule is repeated once per relevant route, so its printed duplicate count increases with the new project route; no new failing source location was introduced.
- Isolated real-browser verification: 115/115 assertions passed, including every chapter/appearance/frame combination, stable blog transition identity, pagination, search, empty results, direct email links, playback lifecycle, RTL keyboard navigation, reduced motion, 404s, and sitemap.
- Widths 320, 390, 768, 1024, and 1440 passed overflow and image-loading checks in both site themes.
- Normal-scroll visual checks at 390, 768, and 1440 found no hidden case-study content. Inspected the repaired dark creator screenshot in both Magic UI devices.
- The preserved publications packet has the exact same Git blob hash as the original packet: `dbd26cd77bb060573dca83e11a03d98a69b58db0`.
- Runtime evidence and screenshots are under `.taste-skill/showcase-implementation/`. Audit and independent review remain manual/unselected for this ordinary public-content change; no review request or finding is pending in the existing ledgers.
