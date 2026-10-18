import { Browser, sleep } from 'file:///C:/Users/morte/.codex/skills/taste-skill/scripts/lib/cdp.mjs';
import { readFileSync, writeFileSync } from 'node:fs';

const folder = '.taste-skill/footer-radpulse';
const browser = await Browser.launch();
const results = [];
try {
  for (const locale of ['en', 'ar']) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      const page = await browser.newPage({ width, height: 900 });
      await page.send('Page.addScriptToEvaluateOnNewDocument', { source: "document.cookie='ika_consent=declined; Path=/; SameSite=Lax';" });
      await page.goto(`http://localhost:3000/${locale}/projects/radpulse-africa`, { settleMs: 200 });
      await page.eval(() => document.fonts.ready);
      await page.eval(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
      await sleep(1100);
      const state = await page.eval(() => {
        const footer = document.querySelector('footer');
        const bounds = footer.getBoundingClientRect();
        const clipped = [...footer.querySelectorAll('a,button')].filter(el => { const r = el.getBoundingClientRect(); return r.bottom > bounds.bottom + 1 || r.top < bounds.top - 1 || r.right > innerWidth + 1 || r.left < -1; }).map(el => el.textContent.trim());
        return { width: innerWidth, clipped, overflow: document.documentElement.scrollWidth > innerWidth, footerHeight: bounds.height, position: getComputedStyle(footer.firstElementChild).position, signature: !!footer.querySelector('.footer-signature'), languages: footer.querySelectorAll('li button').length };
      });
      const pass = !state.clipped.length && !state.overflow && !state.signature && state.languages === 5 && state.position === (width < 1024 ? 'static' : 'fixed');
      results.push({ locale, width, pass, ...state });
      console.log(`${pass ? 'PASS' : 'FAIL'} Footer ${locale} @${width} ${JSON.stringify(state)}`);
      if (locale === 'en' && [390, 768, 1440].includes(width)) await page.screenshot({ path: `${folder}/restored-footer-${width}.jpg`, quality: 88 });
      await page.close();
    }
  }
  for (const locale of ['fr', 'es', 'pt']) {
    const expected = JSON.parse(readFileSync(`messages/${locale}.json`, 'utf8')).Projects;
    const html = await (await fetch(`http://localhost:3000/${locale}/projects/radpulse-africa`)).text();
    const pass = html.includes(expected.pausedStatus) && !expected.demoProgress.includes('?') && !expected.endedStatus.includes('?');
    results.push({ name: `Playback translation ${locale}`, pass });
    console.log(`${pass ? 'PASS' : 'FAIL'} Playback translation ${locale}`);
  }
} finally {
  await browser.close();
  writeFileSync(`${folder}/final-layout.json`, JSON.stringify(results, null, 2));
}
console.log(JSON.stringify({ passed: results.filter(r => r.pass).length, total: results.length }));
if (results.some(r => !r.pass)) process.exitCode = 1;
