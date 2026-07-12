// Homepage screenshot helper. Scrolls the page so scroll-reveal animations
// fire, then captures full-page stills across viewports + themes.
//   BASE=http://localhost:3987 OUT=public/_review/after node scripts/shoot-home.mjs
import { chromium } from "playwright-core";
import path from "node:path";
import { mkdirSync } from "node:fs";

const EXEC = process.env.HOME + "/.cache/ms-playwright/chromium-1223/chrome-linux64/chrome";
const BASE = process.env.BASE || "http://localhost:3987";
const OUT = path.resolve(process.env.OUT || "public/_review/shots");
mkdirSync(OUT, { recursive: true });

const viewports = [
  { tag: "desktop-1728", width: 1728, height: 1080 },
  { tag: "mobile-390", width: 390, height: 844 },
];
const themes = ["light", "dark"];

const browser = await chromium.launch({ executablePath: EXEC, args: ["--no-sandbox"] });
for (const v of viewports) {
  for (const theme of themes) {
    const ctx = await browser.newContext({
      viewport: { width: v.width, height: v.height },
      deviceScaleFactor: 2,
      colorScheme: theme,
    });
    const page = await ctx.newPage();
    await page.addInitScript((t) => {
      try {
        localStorage.setItem("theme", t);
        document.documentElement.classList.toggle("dark", t === "dark");
      } catch (e) {}
    }, theme);
    await page.goto(BASE + "/", { waitUntil: "networkidle", timeout: 45000 }).catch(() =>
      page.goto(BASE + "/", { waitUntil: "load", timeout: 45000 })
    );
    await page.evaluate((t) => document.documentElement.classList.toggle("dark", t === "dark"), theme);
    await page.evaluate(async () => {
      const h = document.body.scrollHeight;
      for (let y = 0; y <= h; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 110));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 500));
    });
    const name = `home-${v.tag}-${theme}`;
    await page.screenshot({ path: path.join(OUT, name + ".png"), fullPage: true });
    console.log("shot:", name);
    await ctx.close();
  }
}
await browser.close();
console.log("done ->", OUT);
