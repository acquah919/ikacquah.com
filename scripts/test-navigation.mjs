import { spawnSync } from "node:child_process";

const bun = process.platform === "win32" ? "bun.exe" : "bun";
const env = { ...process.env, NEXT_NAV_TEST: "1" };
for (const args of [["run", "build"], ["x", "playwright", "test", ...process.argv.slice(2)]]) {
  const result = spawnSync(bun, args, { stdio: "inherit", env });
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}
