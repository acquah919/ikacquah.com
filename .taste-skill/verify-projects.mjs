import { writeFileSync, mkdirSync } from 'node:fs';
import { Browser, sleep } from 'file:///C:/Users/morte/.codex/skills/taste-skill/scripts/lib/cdp.mjs';

const browser = await Browser.launch();
const results = [];
const root = 'http://localhost:3000';
mkdirSync('.taste-skill/verification', { recursive: true });
function check(name, ok, evidence) {
  results.push({ name, passed: Boolean(ok), evidence });
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}: ${JSON.stringify(evidence)}`);
}
async function click(page, selector) {
  const point = await page.eval((s) => {
    const element = document.querySelector(s);
    if (!element) throw new Error(`Missing control: ${s}`);
    element.scrollIntoView({ block: 'center', inline: 'center', behavior: 'instant' });
    const rect = element.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  }, selector);
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...point, button: 'left', clickCount: 1 });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...point, button: 'left', clickCount: 1 });
  await sleep(650);
}
async function key(page, key, code = key) {
  await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key, code });
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key, code });
  await sleep(450);
}
async function setup(page, theme = 'light') {
  await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('ika-theme', '${theme}'); document.cookie = 'ika_consent=declined; Path=/; SameSite=Lax';` });
}
async function state(page) {
  return page.eval(() => ({
    title: document.querySelector('h1')?.textContent,
    overflow: document.documentElement.scrollWidth - innerWidth,
    mainHeadings: document.querySelectorAll('main h1').length,
    broken: [...document.images].filter((i) => i.complete && !i.naturalWidth).map((i) => i.src),
    selected: document.querySelector('[role="tab"][aria-selected="true"]')?.textContent.trim(),
    panel: document.querySelector('[role="tabpanel"] h3')?.textContent,
    focused: document.activeElement?.matches('button, a') ? document.activeElement.textContent.trim().slice(0, 120) : document.activeElement?.tagName,
    activeNav: document.querySelector('header a[aria-current="page"]')?.textContent,
    theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
    dir: document.documentElement.dir,
  }));
}

try {
  for (const route of ['/en/projects', '/en/projects/radpulse-africa', '/fr/projects', '/fr/projects/radpulse-africa', '/es/projects', '/es/projects/radpulse-africa', '/pt/projects', '/pt/projects/radpulse-africa', '/ar/projects', '/ar/projects/radpulse-africa']) {
    const response = await fetch(root + route);
    const html = await response.text();
    check(`Route ${route}`, response.status === 200 && !html.includes('NEXT_HTTP_ERROR_FALLBACK;500'), response.status);
  }
  const missing = await fetch(root + '/en/projects/project-that-does-not-exist');
  check('Unknown project returns 404', missing.status === 404, missing.status);
  const sitemap = await (await fetch(root + '/sitemap.xml')).text();
  const projectUrls = [...sitemap.matchAll(/<loc>[^<]*\/projects[^<]*<\/loc>/g)].map((m) => m[0]);
  check('Sitemap contains both project routes for all five locales', projectUrls.length === 10, projectUrls.length);

  const page = await browser.newPage();
  await setup(page);
  await page.goto(root + '/en/projects/radpulse-africa');
  check('Detail navigation stays active', (await state(page)).activeNav === 'Projects', await state(page));
  const total = await page.eval(() => document.querySelectorAll('[role="tab"]').length);
  check('All seven supplied screenshots are available', total === 7, total);
  for (let index = 0; index < total; index++) {
    await click(page, `[role="tab"]:nth-child(${index + 1})`);
    const current = await state(page);
    check(`Screen ${index + 1} selection`, current.selected === current.panel, current.panel);
  }
  await click(page, 'button[aria-label="Next screen"]');
  check('Next wraps to first screen', (await state(page)).selected === 'Your QC notebook', await state(page));
  await click(page, 'button[aria-label="Previous screen"]');
  check('Previous wraps to final screen', (await state(page)).selected === 'Experience behind the app', await state(page));
  await click(page, '[role="tab"]:last-child');
  await key(page, 'Home');
  check('Home key selects and focuses first screen', (await state(page)).focused === 'Your QC notebook' && (await state(page)).selected === 'Your QC notebook', await state(page));
  await key(page, 'ArrowRight');
  check('Arrow key selects and focuses next screen', (await state(page)).focused === 'Imaging systems' && (await state(page)).selected === 'Imaging systems', await state(page));
  await key(page, 'End');
  check('End key selects final screen', (await state(page)).selected === 'Experience behind the app', await state(page));
  check('No browser exceptions during screen interactions', !page.consoleErrors.length, page.consoleErrors);

  await click(page, 'main a[href="/en/projects"]');
  check('Back link navigates to catalogue', await page.eval(() => location.pathname === '/en/projects'), await page.eval(() => location.pathname));
  await click(page, 'main a[href="/en/projects/radpulse-africa"] h2');
  for (let attempt = 0; attempt < 20 && !await page.eval(() => location.pathname.endsWith('/radpulse-africa')); attempt++) await sleep(100);
  check('Project link navigates to detail', await page.eval(() => location.pathname.endsWith('/radpulse-africa')), await page.eval(() => location.pathname));
  await click(page, 'a[href="#application"]');
  check('Inside the app anchor reaches explorer', await page.eval(() => Math.abs(document.querySelector('#application').getBoundingClientRect().top) < 150), await page.eval(() => document.querySelector('#application').getBoundingClientRect().top));
  const expo = await page.eval(() => { const a = document.querySelector('a[href^="https://expo.dev"]'); return { href: a?.href, target: a?.target, rel: a?.rel }; });
  check('Expo project link is real and safely opens separately', expo.href === 'https://expo.dev/accounts/ikacquahs-team/projects/radpulse-africa' && expo.target === '_blank' && expo.rel.includes('noopener'), expo);

  for (const theme of ['light', 'dark']) {
    for (const route of ['/en/projects', '/en/projects/radpulse-africa']) {
      for (const width of [320, 390, 768, 1024, 1440]) {
        const viewport = await browser.newPage({ width, height: width < 600 ? 844 : 900, mobile: width < 600 });
        await setup(viewport, theme);
        await viewport.goto(root + route, { settleMs: 800 });
        await viewport.wheel(1200, { pauseMs: 10 });
        await sleep(850);
        const current = await state(viewport);
        check(`${theme} ${route} @${width}px`, current.overflow <= 0 && current.mainHeadings === 1 && !current.broken.length && !viewport.consoleErrors.length && current.theme === theme, { ...current, exceptions: viewport.consoleErrors });
        if (theme === 'light' && [390, 1440].includes(width)) {
          await viewport.eval(() => window.scrollTo({ top: 0, behavior: 'instant' }));
          await sleep(600);
          await viewport.screenshot({ path: `.taste-skill/verification/${route.endsWith('africa') ? 'detail' : 'catalogue'}-${width}-light.jpg`, quality: 85 });
        }
        await viewport.close();
      }
    }
  }

  const mobile = await browser.newPage({ width: 390, height: 844, mobile: true });
  await setup(mobile);
  await mobile.goto(root + '/en');
  await click(mobile, 'header button[data-slot="sheet-trigger"]');
  const menu = await mobile.eval(() => [...document.querySelectorAll('[role="dialog"] a')].find((a) => a.textContent.trim().includes('Projects'))?.getAttribute('href'));
  check('Mobile menu includes Projects', menu === '/en/projects', menu);
  await click(mobile, '[role="dialog"] a[href="/en/projects"]');
  check('Mobile project link navigates and closes menu', await mobile.eval(() => location.pathname === '/en/projects' && !document.querySelector('[role="dialog"]')), await mobile.eval(() => location.pathname));

  const rtl = await browser.newPage({ width: 390, height: 844, mobile: true });
  await setup(rtl);
  await rtl.goto(root + '/ar/projects/radpulse-africa');
  check('Arabic locale retains RTL layout', (await state(rtl)).dir === 'rtl' && (await state(rtl)).overflow <= 0, await state(rtl));
  await click(rtl, '[role="tab"]:first-child');
  await key(rtl, 'ArrowLeft');
  check('RTL arrow keys follow visual direction', (await state(rtl)).selected === 'Imaging systems', await state(rtl));

  const reduced = await browser.newPage({ width: 390, height: 844, mobile: true, reducedMotion: true });
  await setup(reduced);
  await reduced.goto(root + '/en/projects/radpulse-africa');
  await click(reduced, '[role="tab"]:nth-child(3)');
  check('Screen explorer works with reduced motion', (await state(reduced)).selected === 'A record of every visit' && (await state(reduced)).overflow <= 0, await state(reduced));

  const noScript = await browser.newPage({ width: 390, height: 844, mobile: true });
  await noScript.send('Emulation.setScriptExecutionDisabled', { value: true });
  await noScript.goto(root + '/en/projects');
  const visible = await noScript.eval(() => [...document.querySelectorAll('main h1, main h2')].every((el) => getComputedStyle(el).opacity === '1'));
  check('Project content remains visible without JavaScript', visible, visible);
} catch (error) {
  check('Verification completed', false, String(error.stack));
} finally {
  writeFileSync('.taste-skill/verification/results.json', JSON.stringify(results, null, 2));
  await browser.close();
}
process.exit(results.some((result) => !result.passed) ? 1 : 0);
