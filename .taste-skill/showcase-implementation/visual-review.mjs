import { Browser, sleep } from 'file:///C:/Users/morte/.codex/skills/taste-skill/scripts/lib/cdp.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

const browser = await Browser.launch();
const folder = '.taste-skill/showcase-implementation/visual';
mkdirSync(folder, { recursive: true });
const checks = [];
try {
  for (const width of [1440, 768, 390]) {
    const page = await browser.newPage({ width, height: width < 600 ? 844 : 1000, mobile: width < 600 });
    await page.send('Page.addScriptToEvaluateOnNewDocument', { source: "localStorage.setItem('ika-theme','light'); document.cookie='ika_consent=declined; Path=/; SameSite=Lax';" });
    await page.goto('http://localhost:3010/en/projects/radpulse-africa', { settleMs: 500 });
    const height = await page.eval(() => document.documentElement.scrollHeight);
    for (let y = 0; y < height; y += 500) {
      await page.eval(top => window.scrollTo({ top, behavior: 'instant' }), y);
      await sleep(160);
    }
    await sleep(700);
    checks.push(await page.eval(() => ({ width: innerWidth, hiddenContent: [...document.querySelectorAll('main p, main h1, main h2, main h3')].filter(el => getComputedStyle(el.parentElement).opacity === '0').map(el => el.textContent), overflow: document.documentElement.scrollWidth > innerWidth })));
    await page.eval(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await sleep(250);
    await page.screenshot({ path: `${folder}/detail-${width}-full.jpg`, quality: 87, fullPage: true });
    await page.screenshot({ path: `${folder}/detail-${width}-hero.jpg`, quality: 87 });
    await page.eval(() => document.querySelector('#application').scrollIntoView({ block: 'start', behavior: 'instant' }));
    await sleep(250);
    await page.screenshot({ path: `${folder}/detail-${width}-walkthrough.jpg`, quality: 87 });
    await page.eval(() => {
      const chapter = innerWidth < 1024 ? document.querySelector('.walkthrough-mobile-chapters button:last-child') : document.querySelector('#chapter-about');
      chapter.click();
      document.querySelector('#application [aria-label="App appearance"] button:last-child').click();
      document.querySelector('.walkthrough-phone').scrollIntoView({ block: 'center', behavior: 'instant' });
    });
    await sleep(900);
    await page.eval(() => Promise.all([...document.querySelectorAll('.walkthrough-phone img')].map(image => image.decode())));
    await page.screenshot({ path: `${folder}/detail-${width}-creator-dark.jpg`, quality: 90 });
    await page.close();
  }
} finally { await browser.close(); }
writeFileSync(`${folder}/visibility.json`, JSON.stringify(checks, null, 2));
console.log(JSON.stringify(checks));
