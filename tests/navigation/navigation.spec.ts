import { expect, test, type Page } from "@playwright/test";
import { instant } from "@next/playwright";

async function navigate(page: Page, action: () => Promise<void>) {
  await instant(page, action);
}

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([{ name: "ika_consent", value: "declined", url: baseURL! }]);
});

test("header Projects opens the catalogue with its featured project ready", async ({ page }) => {
  await page.goto("/en");
  await navigate(page, async () => {
    await page.locator('header a[href="/en/projects"]').click();
    await page.waitForURL("**/en/projects");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main:visible h1")).toHaveText("Ideas, put to work.");
    await expect(page.locator('main:visible a[href="/en/projects/radpulse-africa"]').first()).toBeVisible();
  });
});

test("header Blog opens the article titles and filters ready", async ({ page }) => {
  await page.goto("/en");
  await navigate(page, async () => {
    await page.locator('header a[href="/en/blog"]').click();
    await page.waitForURL("**/en/blog");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main:visible h1")).toHaveText("Notes & perspectives.");
    await expect(page.locator("#blog-search")).toBeVisible();
    await expect(page.locator("#blog-results > li")).toHaveCount(4);
  });
});

test("header Publications opens the library ready", async ({ page }) => {
  await page.goto("/en");
  await navigate(page, async () => {
    await page.locator('header a[href="/en/publications"]').click();
    await page.waitForURL("**/en/publications");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main:visible h1")).toContainText("Research,");
    await expect(page.getByPlaceholder("Search title, author, journal, or area")).toBeVisible();
  });
});

test("featured RadPulse link opens its title and project artwork ready", async ({ page }) => {
  await page.goto("/en/projects");
  const link = page.locator('main:visible a[href="/en/projects/radpulse-africa"]').first();
  await navigate(page, async () => {
    await link.click();
    await page.waitForURL("**/en/projects/radpulse-africa");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main:visible h1")).toHaveText("RadPulse Africa");
    await expect(page.locator("main:visible .project-hero-image")).toBeVisible();
  });
  await expect(page.locator("#application")).toBeAttached();
});

test("blog title opens the selected article heading and metadata ready", async ({ page }) => {
  await page.goto("/en/blog");
  await navigate(page, async () => {
    await page.locator('#blog-results a[href="/en/blog/the-beauty-of-being-a-beginner"]').click();
    await page.waitForURL("**/en/blog/the-beauty-of-being-a-beginner");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main:visible h1")).toHaveText("The Beauty of Being a Beginner: Why We Need to Stop Rushing Through Life");
    await expect(page.locator("main:visible time")).toBeVisible();
  });
  await expect(page.locator(".editorial-prose")).toBeVisible();
});

test("article return link opens the blog titles ready", async ({ page }) => {
  await page.goto("/en/blog/the-beauty-of-being-a-beginner");
  await navigate(page, async () => {
    await page.locator('main:visible a[href="/en/blog"]').click();
    await page.waitForURL("**/en/blog");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main:visible h1")).toHaveText("Notes & perspectives.");
    await expect(page.locator("#blog-results > li")).toHaveCount(4);
  });
});

test("mobile menu Projects opens the catalogue ready", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await navigate(page, async () => {
    await page.getByRole("dialog").getByRole("link", { name: /Projects/ }).click();
    await page.waitForURL("**/en/projects");
    await expect(page.locator("main:visible h1")).toHaveText("Ideas, put to work.");
  });
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("blog uses six per page and retains live search", async ({ page }) => {
  await page.goto("/en/blog");
  await expect(page.locator("#blog-results > li")).toHaveCount(4);
  await expect(page.locator("#blog-results-heading")).toContainText("1 to 4 of 4");
  await expect(page.getByRole("button", { name: "Page 2", exact: true })).toHaveCount(0);
  await page.locator("#blog-search").fill("FOOTBALL");
  await expect(page.locator("#blog-results > li")).toHaveCount(1);
  await expect(page.locator("#blog-results-heading")).toContainText("1 to 1 of 1");
  await page.locator(".blog-search button").click();
  await expect(page.locator("#blog-results > li")).toHaveCount(4);
});

test("homepage section highlighting resets and reconnects after route changes", async ({ page }) => {
  await page.goto("/en");
  const research = page.locator('header a[href="/en#research"]');
  await research.click();
  await expect(research).toHaveAttribute("aria-current", "page");
  await page.locator('header a[href="/en/projects"]').click();
  await page.waitForURL("**/en/projects");
  await expect(research).not.toHaveAttribute("aria-current", "page");
  await page.locator('header a[href="/en"]').click();
  await page.waitForURL("**/en");
  const about = page.locator('header a[href="/en#about"]');
  await about.click();
  await expect(about).toHaveAttribute("aria-current", "page");
  await research.click();
  await expect(research).toHaveAttribute("aria-current", "page");
});

test("French blog fallback opens the original English article and updates the locale", async ({ page, context }) => {
  await page.goto("/fr/blog");
  await page.locator('#blog-results a[href="/en/blog/the-beauty-of-being-a-beginner"]').click();
  await page.waitForURL("**/en/blog/the-beauty-of-being-a-beginner");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("main:visible h1")).toContainText("The Beauty of Being a Beginner");
  expect((await context.cookies()).find(cookie => cookie.name === "NEXT_LOCALE")?.value).toBe("en");
});

test("Explore project action opens the case study ready", async ({ page }) => {
  await page.goto("/en/projects");
  await instant(page, async () => {
    await page.getByRole("link", { name: "Explore the project", exact: true }).click();
    await page.waitForURL("**/en/projects/radpulse-africa");
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("main:visible h1")).toHaveText("RadPulse Africa");
    await expect(page.locator("main:visible .project-hero-image")).toBeVisible();
  });
});

test("language switching preserves the nested route, query, and anchor", async ({ page, context }) => {
  await page.goto("/en/projects/radpulse-africa?ref=navigation#application");
  await page.locator("header").getByRole("button", { name: "Change language, current: English" }).click();
  await page.getByRole("menuitemradio", { name: "Français" }).click();
  await page.waitForURL("**/fr/projects/radpulse-africa?ref=navigation#application");
  await expect(page.locator("html")).toHaveAttribute("lang", "fr");
  await expect(page.locator("main:visible h1")).toHaveText("RadPulse Africa");
  expect((await context.cookies()).find(cookie => cookie.name === "NEXT_LOCALE")?.value).toBe("fr");
});

test("browser Back restores blog filters and results", async ({ page }) => {
  await page.goto("/en/blog");
  await page.locator("#blog-search").fill("FOOTBALL");
  await expect(page.locator("#blog-results > li")).toHaveCount(1);
  await page.locator("#blog-results a").click();
  await page.waitForURL(/\/en\/blog\/[^/]+$/);
  await expect(page.locator("main:visible h1")).toContainText("Football");
  await page.goBack();
  await expect(page.locator("main:visible #blog-search")).toHaveValue("FOOTBALL");
  await expect(page.locator("main:visible #blog-results > li")).toHaveCount(1);
});

test("unknown project renders the not-found page and prevents indexing", async ({ page }) => {
  await page.goto("/en/projects/not-a-project");
  await expect(page.locator("main:visible h1")).toHaveText("This page is not here.");
  await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
});

test("unknown article renders the not-found page and prevents indexing", async ({ page }) => {
  await page.goto("/en/blog/not-an-article");
  await expect(page.locator("main:visible h1")).toHaveText("This page is not here.");
  await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
});

test("Arabic tablet navigation keeps the RTL catalogue ready", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await page.locator("header").getByRole("button", { name: "القائمة", exact: true }).click();
  await instant(page, async () => {
    await page.getByRole("dialog").locator('a[href="/ar/projects"]').click();
    await page.waitForURL("**/ar/projects");
    await expect(page.locator("main:visible h1")).toBeVisible();
    await expect(page.locator('main:visible a[href="/ar/projects/radpulse-africa"]').first()).toHaveText("RadPulse Africa");
  });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("catalogue navigation and footer remain readable without JavaScript", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, baseURL, viewport: { width: 1440, height: 1000 } });
  try {
    const page = await context.newPage();
    await page.goto("/en/projects");
    await expect(page.locator("main h1")).toHaveText("Ideas, put to work.");
    await expect(page.locator('header a[href="/en/blog"]')).toBeVisible();
    await expect(page.locator('footer a[href="mailto:ikacquah@uew.edu.gh"]')).toHaveText("ikacquah@uew.edu.gh");
    await expect(page.getByRole("link", { name: "Explore the project", exact: true })).toHaveAttribute("href", "/en/projects/radpulse-africa");
  } finally {
    await context.close();
  }
});

test("RadPulse initial screen renders before the client bundle loads", async ({ page }) => {
  await page.route("**/_next/static/chunks/*.js", route => route.abort());
  await page.goto("/en/projects/radpulse-africa");
  await expect(page.locator("main:visible h1")).toHaveText("RadPulse Africa");
  const artwork = page.locator("main:visible .project-hero-image");
  await expect(artwork).toBeVisible();
  await expect(artwork).toHaveAttribute("src", "/assets/projects/radpulse-africa/project-detail.webp");
  await expect(artwork).toHaveJSProperty("naturalWidth", 755);
});
