# Fix: Direct RadPulse APK downloads

**Status:** verified; ready for review without commit or deployment
**Branch:** `fix/radpulse-apk-downloads`
**Approval:** User explicitly requested implementation of the direct APK plan in chat.
**Previous packet:** Preserved in `pending/projects-showcase-and-navigation.md`; the publications review packet remains unchanged.

## Goal and contract

Replace both Expo dashboard actions on the RadPulse Africa detail page with direct, anonymous Android APK downloads. Use the existing completed preview build, Android version 1.0.0. Keep the current visual design, device frames, walkthrough, and development status.

- Rename the shared typed URL to `apkDownloadUrl` and use the verified stable Expo artifact URL, not a temporary CDN redirect.
- Both actions read Download Android APK in their respective locale, use a download icon, and render ordinary anchors without a new tab or intervening modal.
- Localize the label for English, French, Spanish, Portuguese, and Arabic.
- Record the 2026-10-30 artifact expiry beside the shared URL; replace it with a newer build before expiry.
- No new routes, APIs, credentials, hosting services, or mobile builds. Expo hosts the file; Android handles installation.
- Preserve the untracked app.json, unrelated local files, and the publications review record. No commit, merge, push, or deployment.

## Steps

- [x] Update project data, both actions, locale labels, and maintainer expiry note.
- [x] Verify anonymous APK delivery and focused browser coverage for both actions, keyboard, responsive layouts, all locales, and RTL.
- [x] Run focused lint, typecheck, production build, and the existing navigation suite; record evidence and leave ready for review.

## Verification

Use the existing Bun commands and Playwright production harness. Confirm the anonymous artifact endpoint returns HTTP200 with an APK attachment filename and no login/dashboard HTML. Verify real browser download behavior once; use a small attachment fixture for repeatable button tests so the suite does not repeatedly transfer the 145 MB APK. Preserve the existing 18 navigation tests.

Check both themes at mobile, tablet, and desktop widths, localized labels and keyboard activation. Capture final development runtime/compilation checks using the installed next-dev-loop skill when the user's dev server is available.

Baseline global lint has seven printed errors in four unrelated files (global-error, article-reactions, theme-provider, theme-toggle), plus five warnings. Require no new errors. Regular audit/check/try gates remain manual; independent review when-sensitive does not select this small public-link change.

## Evidence

- Both actions now use the same `apkDownloadUrl` and localized download labels. The lower action uses the existing button variants on a native anchor so both actions retain link semantics and work with Enter. Styling and the walkthrough are unchanged.
- Anonymous upstream HEAD returned HTTP200, application/octet-stream, Content-Disposition attachment with an .apk filename, and 145244262 bytes. The data keeps Expo's stable artifact URL, not its resolved CDN URL. Expiry is documented beside the shared URL as 2026-10-30.
- A real, anonymous browser activation started the CDN APK download with the expected filename, kept the case study URL, and opened no new page. The download was cancelled after it started to avoid retaining the 145 MB binary; physical Android installation was not performed.
- Seven new Playwright cases passed: both actions activate by keyboard and download a small intercepted attachment without an application popup; all five locale labels match, both links share the APK URL, and mobile/tablet/desktop widths (390, 768, 1440) fit with correct Arabic RTL.
- Final production browser run passed 25/25 cases, including all 18 existing navigation tests. Tests ran against the rebuilt `.next-navigation` artifact; the final rerun used `NEXT_NAV_TEST=1 bunx playwright test` after refining the test's distinction between application popups and Edge's own Downloads UI.
- Additional live layout checks passed 12/12 English/Arabic combinations across both themes at 390, 768, and 1440, with no overflow or browser exceptions. Evidence and screenshots are under `.taste-skill/apk-downloads/`.
- Focused ESLint passed with no violations. `bunx tsc --noEmit` and the normal `bun run build` passed. Full lint retains the same seven printed errors in four unrelated files plus five warnings; no new source error was introduced.
- Next MCP reported compilation issues=[] and empty configuration/session errors. No new dependencies, public routes, APIs, credentials, hosting services, or mobile builds were added.
- The previous feature packet was preserved byte-for-byte (`bbb7b9c1d841ca75a886b9a32c9f454ae4ecbd94`); the publications packet remains unchanged (`dbd26cd77bb060573dca83e11a03d98a69b58db0`). The pre-existing untracked app.json is untouched.
- Findings and review ledgers have no active finding or review request. Regular optional audit/check/try gates and the when-sensitive independent-review gate were unselected for this small link change. No commit, merge, push, or deployment occurred.
