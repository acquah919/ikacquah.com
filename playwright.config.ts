import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/navigation",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  reporter: "list",
  use: {
    ...devices["Desktop Chrome"],
    channel: process.env.PLAYWRIGHT_CHANNEL ?? (process.platform === "win32" ? "msedge" : undefined),
    baseURL: "http://localhost:3100",
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    command: "bun run start --port 3100",
    url: "http://localhost:3100/en",
    env: { NEXT_NAV_TEST: "1" },
    reuseExistingServer: false,
    timeout: 60_000,
  },
});
