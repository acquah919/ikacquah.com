import { expect, test } from "@playwright/test";

const APK_URL = "https://expo.dev/artifacts/eas/MG1COCzqmUL2sdreJePeIcJGFezFMTJUMYmKPryvH4s.apk";
const downloadLabels = {
  en: "Download Android APK",
  fr: "Télécharger l'APK Android",
  es: "Descargar APK para Android",
  pt: "Baixar APK para Android",
  ar: "تنزيل ملف APK لأندرويد",
};

test.beforeEach(async ({ context, baseURL }) => {
  await context.addCookies([{ name: "ika_consent", value: "declined", url: baseURL! }]);
});

for (const [index, position] of ["hero", "development section"].entries()) {
  test(`${position} APK action downloads with Enter and keeps the case study open`, async ({ page }) => {
    let popups = 0;
    page.on("popup", () => popups++);
    // Exercise browser download behavior without fetching the full public APK.
    await page.route(APK_URL, route => route.fulfill({
      status: 200,
      headers: {
        "content-type": "application/vnd.android.package-archive",
        "content-disposition": 'attachment; filename="radpulse-africa.apk"',
      },
      body: "RadPulse APK download fixture",
    }));
    await page.goto("/en/projects/radpulse-africa");
    const actions = page.locator("main:visible").getByRole("link", { name: downloadLabels.en, exact: true });
    await expect(actions).toHaveCount(2);
    const action = actions.nth(index);
    await expect(action).toHaveAttribute("href", APK_URL);
    await expect(action).not.toHaveAttribute("target", "_blank");
    await action.focus();
    await expect(action).toBeFocused();
    const downloadPromise = page.waitForEvent("download");
    await action.press("Enter");
    const download = await downloadPromise;
    expect(download.url()).toBe(APK_URL);
    expect(download.suggestedFilename()).toBe("radpulse-africa.apk");
    expect(await download.failure()).toBeNull();
    await expect(page).toHaveURL("/en/projects/radpulse-africa");
    expect(popups).toBe(0);
  });
}

for (const [locale, label] of Object.entries(downloadLabels)) {
  test(`${locale} APK actions remain readable from mobile through desktop`, async ({ page }) => {
    await page.goto(`/${locale}/projects/radpulse-africa`);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.locator("html")).toHaveAttribute("dir", locale === "ar" ? "rtl" : "ltr");
    const main = page.locator("main:visible");
    const actions = main.getByRole("link", { name: label, exact: true });
    await expect(actions).toHaveCount(2);
    await expect(main.locator('a[href*="expo.dev/accounts/"]')).toHaveCount(0);
    for (const action of await actions.all()) {
      await expect(action).toHaveAttribute("href", APK_URL);
      await expect(action).not.toHaveAttribute("target", "_blank");
    }
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const action of await actions.all()) {
        await action.scrollIntoViewIfNeeded();
        await expect(action).toBeVisible();
        const bounds = await action.boundingBox();
        expect(bounds).not.toBeNull();
        expect(bounds!.x).toBeGreaterThanOrEqual(0);
        expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width);
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    }
  });
}
