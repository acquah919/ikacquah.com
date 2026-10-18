import { Browser, sleep } from 'file:///C:/Users/morte/.codex/skills/taste-skill/scripts/lib/cdp.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

const root = 'http://localhost:3000';
const route = '/en/projects/radpulse-africa';
const folder = '.taste-skill/footer-radpulse';
const play = '#application button[aria-pressed].min-w-36';
const expectedBuild = 'https://expo.dev/accounts/ikacquahs-team/projects/radpulse-africa/builds/b3bf204d-5bd1-4c1e-ad3c-506147da6829';
const results = [];
const browser = await Browser.launch();
mkdirSync(folder, { recursive: true });
function check(name, pass, evidence) {
  results.push({ name, pass: !!pass, evidence });
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${pass ? '' : ' ' + JSON.stringify(evidence)}`);
}
async function pageAt(width, locale = 'en', theme = 'light', reducedMotion = false, scripts = true) {
  const page = await browser.newPage({ width, height: 900, reducedMotion });
  page.warnings = [];
  browser.on(page.sessionId, 'Runtime.consoleAPICalled', event => {
    if (['warning', 'error'].includes(event.type)) page.warnings.push(event.args.map(arg => arg.value ?? arg.description ?? '').join(' '));
  });
  await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('ika-theme','${theme}'); document.cookie='ika_consent=declined; Path=/; SameSite=Lax';` });
  if (!scripts) await page.send('Emulation.setScriptExecutionDisabled', { value: true });
  await page.goto(root + route.replace('/en/', `/${locale}/`), { settleMs: 600 });
  await page.eval(() => document.fonts.ready);
  return page;
}
async function click(page, selector) {
  await page.eval(s => document.querySelector(s).scrollIntoView({ block: 'center', behavior: 'instant' }), selector);
  await sleep(100);
  const point = await page.eval(s => { const r = document.querySelector(s).getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, selector);
  await page.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point });
  await sleep(180);
}
async function state(page) {
  return page.eval(() => ({
    chapter: document.querySelector('#application [role=tab][aria-selected=true]').id,
    playing: document.querySelector('#application button[aria-pressed].min-w-36').getAttribute('aria-pressed') === 'true',
    label: document.querySelector('#application button[aria-pressed].min-w-36').textContent,
    progress: document.querySelector('#application [role=progressbar]').getAttribute('aria-valuenow'),
    activeScale: document.querySelector('.walkthrough-progress-fill[data-current=true]') ? getComputedStyle(document.querySelector('.walkthrough-progress-fill[data-current=true]')).transform : null,
  }));
}
const chapter = (width, index) => width < 1024 ? `.walkthrough-mobile-chapters button:nth-child(${index + 1})` : `#application [role=tab]:nth-child(${index + 1})`;

try {
  for (const width of [390, 1440]) {
    const page = await pageAt(width);
    check(`Exact build links @${width}`, await page.eval(url => { const links = [...document.querySelectorAll('main a[href*="expo.dev"]')]; return links.length === 2 && links.every(a => a.href === url); }, expectedBuild));
    await click(page, play);
    const started = await state(page);
    check(`Immediate play feedback @${width}`, started.playing && started.label.includes('Pause') && started.activeScale !== 'matrix(0, 0, 0, 1, 0, 0)', started);
    await sleep(5100);
    check(`Five-second advance @${width}`, (await state(page)).chapter === 'chapter-equipment', await state(page));
    await click(page, play);
    await sleep(5100);
    check(`Pause holds screen @${width}`, !(await state(page)).playing && (await state(page)).chapter === 'chapter-equipment', await state(page));
    await click(page, play);
    await sleep(1200);
    check(`Resume starts fresh interval @${width}`, (await state(page)).chapter === 'chapter-equipment', await state(page));
    await sleep(3900);
    check(`Resume advances @${width}`, (await state(page)).chapter === 'chapter-tasks', await state(page));
    await click(page, chapter(width, 5));
    check(`Manual selection pauses @${width}`, !(await state(page)).playing && (await state(page)).chapter === 'chapter-about', await state(page));
    await click(page, play);
    check(`Play from final chapter restarts immediately @${width}`, (await state(page)).playing && (await state(page)).chapter === 'chapter-home', await state(page));
    await click(page, chapter(width, 4));
    await click(page, play);
    await sleep(10200);
    check(`Natural end offers Replay @${width}`, !(await state(page)).playing && (await state(page)).chapter === 'chapter-about' && (await state(page)).label.includes('Replay'), await state(page));
    await click(page, play);
    check(`Replay restarts @${width}`, (await state(page)).playing && (await state(page)).chapter === 'chapter-home', await state(page));
    await page.eval(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
    await sleep(100);
    check(`Visibility handler pauses @${width}`, !(await state(page)).playing, await state(page));
    await page.eval(() => { delete document.hidden; document.dispatchEvent(new Event('visibilitychange')); });
    check(`Becoming visible stays paused @${width}`, !(await state(page)).playing, await state(page));
    await click(page, play);
    await page.eval(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await sleep(250);
    check(`Offscreen viewer pauses @${width}`, !(await state(page)).playing, await state(page));

    for (const device of [1, 2]) {
      await click(page, `#application [aria-label="Phone frame"] button:nth-child(${device})`);
      for (const appearance of [1, 2]) {
        await click(page, '#application ' + chapter(width, 5).replace('#application ', ''));
        await click(page, `#application [aria-label="App appearance"] button:nth-child(${appearance})`);
        await page.eval(() => Promise.all([...document.querySelectorAll('.walkthrough-phone img')].map(img => img.decode())));
        await sleep(350);
        const image = await page.eval(() => { const node = document.querySelector('.walkthrough-phone [data-screenshot][aria-hidden=false] img'); const parent = node.parentElement; return { src: node.getAttribute('src'), loaded: node.complete && node.naturalWidth > 0, position: getComputedStyle(parent).position, explicit: parent.style.position, width: parent.getBoundingClientRect().width, height: parent.getBoundingClientRect().height }; });
        check(`Creator screenshot frame ${device} theme ${appearance} @${width}`, image.loaded && image.src.includes(`creator-${appearance === 1 ? 'light' : 'dark'}`) && image.explicit === 'absolute' && image.width > 0 && image.height > 0, image);
      }
    }
    await page.eval(() => document.querySelector('.walkthrough-phone').scrollIntoView({ block: 'center', behavior: 'instant' }));
    await page.screenshot({ path: `${folder}/creator-dark-${width}.jpg`, quality: 88 });
    await page.send('Page.reload', { ignoreCache: false });
    await sleep(1000);
    check(`No image warnings after cached reload @${width}`, !page.warnings.some(w => /invalid.*position|has "fill"|same name mounted|ViewTransition/.test(w)), page.warnings);
    check(`No browser exceptions @${width}`, !page.consoleErrors.length, page.consoleErrors);
    await page.close();
  }

  for (const width of [320, 390, 768, 1024, 1440]) {
    for (const theme of ['light', 'dark']) {
      const page = await pageAt(width, 'en', theme);
      await page.eval(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' }));
      await sleep(600);
      const layout = await page.eval(() => ({ overflow: document.documentElement.scrollWidth > innerWidth, restored: !document.querySelector('.footer-signature') && !!document.querySelector('footer .lg\\:fixed'), email: document.querySelector('footer a[href^="mailto:"]')?.textContent, languages: document.querySelectorAll('footer li button').length, invalidParents: [...document.querySelectorAll('main img')].filter(img => !['absolute', 'relative', 'fixed'].includes(getComputedStyle(img.parentElement).position)).length }));
      check(`Restored footer and image bounds ${theme} @${width}`, !layout.overflow && layout.restored && layout.email === 'ikacquah@uew.edu.gh' && layout.languages === 5 && !layout.invalidParents, layout);
      if (theme === 'light' && [390, 768, 1440].includes(width)) await page.screenshot({ path: `${folder}/restored-footer-${width}.jpg`, quality: 88 });
      await page.close();
    }
  }

  const rtl = await pageAt(390, 'ar', 'dark', true);
  await click(rtl, '.walkthrough-mobile-chapters button:last-child');
  await click(rtl, play);
  const rtlState = await rtl.eval(() => ({ dir: document.documentElement.dir, status: document.querySelector('#application [aria-live=polite]').textContent, barAnimation: getComputedStyle(document.querySelector('.walkthrough-progress-fill[data-current=true]')).animationName, overflow: document.documentElement.scrollWidth > innerWidth }));
  check('Arabic localized playback and reduced motion', rtlState.dir === 'rtl' && !rtlState.status.includes('?') && rtlState.barAnimation === 'none' && !rtlState.overflow, rtlState);
  await rtl.send('Input.dispatchKeyEvent', { type: 'keyDown', key: ' ', code: 'Space', windowsVirtualKeyCode: 32 });
  await rtl.send('Input.dispatchKeyEvent', { type: 'keyUp', key: ' ', code: 'Space', windowsVirtualKeyCode: 32 });
  await sleep(150);
  check('Keyboard Space pauses playback', !(await state(rtl)).playing, await state(rtl));
  await rtl.close();

  const nojs = await pageAt(390, 'en', 'light', false, false);
  const fallback = await nojs.eval(() => { const img = document.querySelector('.walkthrough-phone [data-screenshot=light] img'); return { chapter: img?.alt, opacity: getComputedStyle(img.parentElement).opacity, width: img?.getBoundingClientRect().width, email: document.querySelector('footer a[href^="mailto:"]')?.textContent }; });
  check('Readable initial walkthrough without JavaScript', fallback.opacity === '1' && fallback.width > 0 && fallback.email === 'ikacquah@uew.edu.gh', fallback);
  await nojs.close();
} finally {
  await browser.close();
  writeFileSync(`${folder}/verification.json`, JSON.stringify(results, null, 2));
}
console.log(JSON.stringify({ passed: results.filter(r => r.pass).length, total: results.length }));
if (results.some(r => !r.pass)) process.exitCode = 1;
