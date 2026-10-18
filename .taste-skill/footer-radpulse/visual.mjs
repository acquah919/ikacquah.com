import { Browser, sleep } from 'file:///C:/Users/morte/.codex/skills/taste-skill/scripts/lib/cdp.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

const folder = '.taste-skill/footer-radpulse';
mkdirSync(folder, { recursive: true });
const browser = await Browser.launch();
const results = [];
try {
  for (const width of [1440, 768, 390, 320]) {
    const page = await browser.newPage({ width, height: 1000 });
    await page.send('Page.addScriptToEvaluateOnNewDocument', { source: "localStorage.setItem('ika-theme','light'); document.cookie='ika_consent=declined; Path=/; SameSite=Lax';" });
    await page.goto('http://localhost:3000/en/projects/radpulse-africa', { settleMs: 500 });
    await page.eval(() => document.fonts.ready);
    await page.eval(() => document.querySelector('footer').scrollIntoView({ block: 'start', behavior: 'instant' }));
    await sleep(1100);
    const metrics = await page.eval(() => {
      const footer = document.querySelector('footer');
      const signature = footer.querySelector('.footer-signature');
      const rect = footer.getBoundingClientRect();
      const children = [...signature.querySelectorAll('span')].map(el => ({ text: el.textContent, x: el.getBoundingClientRect().x, right: el.getBoundingClientRect().right, width: el.scrollWidth }));
      return { width: innerWidth, overflow: document.documentElement.scrollWidth > innerWidth, footerHeight: rect.height, signature: children, clip: { x: 0, y: scrollY + rect.top, width: innerWidth, height: rect.height, scale: 1 } };
    });
    const capture = await page.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: metrics.clip });
    writeFileSync(`${folder}/footer-${width}.png`, Buffer.from(capture.data, 'base64'));
    results.push(metrics);
    if (width === 390 || width === 1440) {
      await page.eval(() => document.querySelector('#application').scrollIntoView({ block: 'start', behavior: 'instant' }));
      await sleep(500);
      await page.screenshot({ path: `${folder}/walkthrough-${width}.jpg`, quality: 88 });
    }
    await page.close();
  }
} finally { await browser.close(); }
writeFileSync(`${folder}/visual-results.json`, JSON.stringify(results, null, 2));
console.log(JSON.stringify(results));
