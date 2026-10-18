import { Browser, sleep } from 'file:///C:/Users/morte/.codex/skills/taste-skill/scripts/lib/cdp.mjs';
import { mkdirSync, writeFileSync } from 'node:fs';

const root = 'http://localhost:3010';
const out = '.taste-skill/showcase-implementation';
mkdirSync(out, { recursive: true });
const results = [];
const browser = await Browser.launch();
const check = (name, pass, detail) => {
  results.push({ name, pass: !!pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'} ${name}${pass ? '' : ': ' + JSON.stringify(detail)}`);
};
async function click(page, selector, pause = 750) {
  const point = await page.eval(s => {
    const el = document.querySelector(s);
    if (!el) throw Error('Missing ' + s);
    el.scrollIntoView({ block: 'center', behavior: 'instant' });
    const r = el.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
  }, selector);
  await page.send('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
  await page.send('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point });
  await sleep(pause);
}
async function key(page, value) {
  await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: value, code: value });
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: value, code: value });
  await sleep(200);
}
async function type(page, value) {
  await click(page, '#blog-search', 0);
  await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'a', code: 'KeyA', modifiers: 2, windowsVirtualKeyCode: 65 });
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'a', code: 'KeyA', modifiers: 2, windowsVirtualKeyCode: 65 });
  if (value) await page.send('Input.insertText', { text: value });
  else await key(page, 'Backspace');
  await sleep(650);
}
async function pageAt(route, width = 1440, theme = 'light', reducedMotion = false) {
  const page = await browser.newPage({ width, height: width < 600 ? 844 : 1000, mobile: width < 600, reducedMotion });
  await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('ika-theme', '${theme}'); document.cookie='ika_consent=declined; Path=/; SameSite=Lax';` });
  page.loggedErrors = [];
  browser.on(page.sessionId, 'Runtime.consoleAPICalled', event => {
    if (event.type === 'error') page.loggedErrors.push(event.args.map(a => a.value ?? a.description).join(' '));
  });
  await page.goto(root + route, { settleMs: 650 });
  return page;
}
async function state(page) {
  return page.eval(() => ({
    overflow: document.documentElement.scrollWidth > innerWidth,
    h1: document.querySelector('main h1')?.textContent,
    h1Count: document.querySelectorAll('main h1').length,
    broken: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src),
    rows: document.querySelectorAll('#blog-results > li').length,
    range: document.querySelector('#blog-results-heading')?.textContent,
    query: document.querySelector('#blog-search')?.value,
    category: document.querySelector('.blog-category-controls button[aria-pressed=true]')?.textContent,
    selected: document.querySelector('[role=tab][aria-selected=true]')?.id,
    playing: document.querySelector('#application button[aria-pressed].min-w-36')?.getAttribute('aria-pressed'),
    models: [...document.querySelectorAll('[data-model]')].map(x => x.dataset.model),
  }));
}
try {
  for (const locale of ['en', 'fr', 'es', 'pt', 'ar']) {
    for (const route of ['/projects', '/projects/radpulse-africa', '/blog']) {
      const response = await fetch(root + '/' + locale + route);
      check(`200 ${locale}${route}`, response.status === 200, response.status);
    }
  }
  check('Unknown project returns 404', (await fetch(root + '/en/projects/missing-project')).status === 404);
  const sitemap = await (await fetch(root + '/sitemap.xml')).text();
  check('Sitemap includes projects and English case study', sitemap.includes('/en/projects/radpulse-africa') && sitemap.includes('/ar/projects'));

  const blog = await pageAt('/en/blog');
  check('Blog starts with three of four posts', (await state(blog)).rows === 3 && (await state(blog)).range.includes('1 to 3 of 4'), await state(blog));
  await click(blog, 'button[aria-label="Page 2"]');
  check('Second page has final article', (await state(blog)).rows === 1 && (await state(blog)).range.includes('4 to 4 of 4'), await state(blog));
  await type(blog, 'FOOTBALL');
  check('Case-insensitive search resets page', (await state(blog)).rows === 1 && (await state(blog)).range.includes('1 to 1 of 1'), await state(blog));
  await click(blog, '.blog-search button');
  check('Search clear button clears query', (await state(blog)).query === '', await state(blog));
  await click(blog, '.blog-category-controls button:nth-child(4)');
  check('Category filters two reflections', (await state(blog)).rows === 2, await state(blog));
  await type(blog, 'beginner');
  check('Search and category combine', (await state(blog)).rows === 1, await state(blog));
  await type(blog, 'zzzznothing');
  check('No-results state and clear action', (await state(blog)).rows === 0 && await blog.eval(() => document.body.textContent.includes('No articles found.')), await state(blog));
  await click(blog, '[data-slot=empty-content] button');
  check('Clear restores page one', (await state(blog)).rows === 3 && (await state(blog)).range.includes('1 to 3 of 4'), await state(blog));
  for (let i = 0; i < 5; i++) {
    await click(blog, '.blog-category-controls button:nth-child(4)', 30);
    check(`Stable post identity while entering ${i}`, await blog.eval(() => [...document.querySelectorAll('#blog-results a')].map(a => a.getAttribute('href')).filter(h => h.includes('beginner')).length <= 1));
    await click(blog, '.blog-category-controls button:first-child', 30);
  }
  await sleep(700);
  check('No duplicate-transition console errors', !blog.loggedErrors.some(e => /ViewTransition|same name|Minified React error/.test(e)), blog.loggedErrors);
  await click(blog, '#blog-results a');
  check('Article navigation still works', await blog.eval(() => location.pathname.includes('/blog/the-beauty-of-being-a-beginner')), await blog.eval(() => location.pathname));
  await blog.close();

  const detail = await pageAt('/en/projects/radpulse-africa');
  check('Requested phone models present', (await state(detail)).models.includes('iPhone 18 Pro') && (await state(detail)).models.includes('Pixel 11 Pro'), await state(detail));
  check('Requested note removed', !await detail.eval(() => document.querySelector('main').textContent.includes('iPhone shown as a presentation frame')));
  await click(detail, 'a[href="#application"]');
  for (let i = 0; i < 6; i++) {
    await click(detail, `[role=tab]:nth-child(${i + 1})`);
    check(`Walkthrough chapter ${i + 1}`, await detail.eval(n => document.querySelector('[role=tab][aria-selected=true]') === document.querySelectorAll('[role=tab]')[n], i));
  }
  await key(detail, 'Home');
  await key(detail, 'ArrowDown');
  check('Walkthrough keyboard selects next screen', (await state(detail)).selected === 'chapter-equipment', await state(detail));
  await click(detail, '#application [aria-label="App appearance"] button:last-child');
  check('Dark screenshot selected', await detail.eval(() => document.querySelector('.walkthrough-phone [data-screenshot=dark][aria-hidden=false] img')?.getAttribute('src').includes('equipment-dark')));
  await click(detail, '#application [aria-label="Phone frame"] button:last-child');
  check('iPhone model selector updates frame', await detail.eval(() => document.querySelector('.walkthrough-phone').dataset.model === 'iPhone 18 Pro'));
  check('Magic UI mock components render', await detail.eval(() => !!document.querySelector('[data-slot=iphone] svg') && !!document.querySelector('svg[data-slot=android]')));
  for (const device of [1, 2]) {
    await click(detail, `#application [aria-label="Phone frame"] button:nth-child(${device})`);
    for (let chapter = 0; chapter < 6; chapter++) {
      await click(detail, `[role=tab]:nth-child(${chapter + 1})`);
      for (const appearance of [1, 2]) {
        await click(detail, `#application [aria-label="App appearance"] button:nth-child(${appearance})`);
        await detail.eval(() => Promise.all([...document.querySelectorAll('.walkthrough-phone img')].map(image => image.decode())));
        const current = await detail.eval(() => {
          const node = document.querySelector('.walkthrough-phone [data-screenshot][aria-hidden=false]');
          const image = node?.querySelector('img');
          return { appearance: node?.dataset.screenshot, opacity: node ? getComputedStyle(node).opacity : null, width: image?.naturalWidth, box: image?.getBoundingClientRect().width, src: image?.getAttribute('src') };
        });
        check(`Frame ${device}, chapter ${chapter + 1}, ${appearance === 1 ? 'light' : 'dark'} screenshot`, current.appearance === (appearance === 1 ? 'light' : 'dark') && Number(current.opacity) > 0.95 && current.width > 0 && current.box > 0 && (chapter !== 5 || current.src.includes(`creator-${appearance === 1 ? 'light' : 'dark'}`)), current);
      }
    }
  }
  check('Every Magic UI SVG mask has a unique id', await detail.eval(() => { const ids = [...document.querySelectorAll('main svg [id]')].map(node => node.id); return ids.length === new Set(ids).size; }));
  await click(detail, '#chapter-home');
  await click(detail, '#application button[aria-pressed].min-w-36');
  await sleep(5300);
  check('Playback advances after five seconds', (await state(detail)).selected === 'chapter-equipment', await state(detail));
  await click(detail, '#chapter-records');
  check('Manual selection pauses playback', (await state(detail)).playing === 'false', await state(detail));
  await click(detail, '#application button[aria-pressed].min-w-36');
  await detail.eval(() => { Object.defineProperty(document, 'hidden', { configurable: true, value: true }); document.dispatchEvent(new Event('visibilitychange')); });
  await sleep(200);
  check('Visibility-change handler pauses playback', (await state(detail)).playing === 'false', await state(detail));
  await detail.eval(() => { delete document.hidden; });
  await click(detail, '#application button[aria-pressed].min-w-36');
  await detail.eval(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await sleep(400);
  check('Offscreen playback pauses', (await state(detail)).playing === 'false', await state(detail));
  await click(detail, '#chapter-about');
  await click(detail, '#application button[aria-pressed].min-w-36');
  await sleep(5300);
  check('Playback ends and offers replay', (await state(detail)).playing === 'false' && await detail.eval(() => document.querySelector('#application button[aria-pressed].min-w-36').textContent.includes('Replay')), await state(detail));
  check('Project nav active on detail', await detail.eval(() => document.querySelector('header a[aria-current=page]')?.getAttribute('href') === '/en/projects'));
  check('No walkthrough browser errors', !detail.consoleErrors.length && !detail.loggedErrors.length, { exceptions: detail.consoleErrors, console: detail.loggedErrors });
  await detail.close();
  const contact = await pageAt('/en', 1440);
  check('Footer email is immediately visible', await contact.eval(() => document.querySelector('footer a[href="mailto:ikacquah@uew.edu.gh"]')?.textContent.trim() === 'ikacquah@uew.edu.gh'));
  check('Contact section email is immediately visible', await contact.eval(() => [...document.querySelectorAll('main a[href="mailto:ikacquah@uew.edu.gh"]')].some(a => a.textContent.trim() === 'ikacquah@uew.edu.gh')));
  check('Obfuscated email and reveal button removed', await contact.eval(() => !document.body.textContent.includes('[at]') && !document.querySelector('button[aria-label="Reveal email address"]')));
  await contact.close();

  for (const theme of ['light', 'dark']) {
    for (const route of ['/en/projects', '/en/projects/radpulse-africa', '/en/blog']) {
      for (const width of [320, 390, 768, 1024, 1440]) {
        const page = await pageAt(route, width, theme);
        await page.wheel(650, { pauseMs: 1 });
        await sleep(450);
        const current = await state(page);
        check(`${theme} ${route} @${width}`, !current.overflow && current.h1Count === 1 && !current.broken.length && !page.consoleErrors.length, current);
        if (theme === 'light' && [390, 1440].includes(width)) {
          await page.eval(() => window.scrollTo({ top: 0, behavior: 'instant' }));
          await sleep(200);
          await page.screenshot({ path: `${out}/${route.endsWith('africa') ? 'detail' : route.endsWith('blog') ? 'blog' : 'catalogue'}-${width}.jpg`, quality: 88, fullPage: true });
        }
        await page.close();
      }
    }
  }
  for (const route of ['/ar/projects/radpulse-africa', '/ar/blog']) {
    const page = await pageAt(route, 390);
    check(`RTL ${route}`, await page.eval(() => document.documentElement.dir === 'rtl') && !(await state(page)).overflow, await state(page));
    if (route.includes('projects')) {
      await click(page, '.walkthrough-mobile-chapters button:nth-child(2)');
      check('RTL mobile chapter selection', (await state(page)).selected === 'chapter-equipment', await state(page));
      await key(page, 'ArrowLeft');
      check('RTL mobile chapter keyboard direction', await page.eval(() => document.activeElement === document.querySelector('.walkthrough-mobile-chapters button:nth-child(3)')));
    }
    await page.close();
  }
  const reduced = await pageAt('/en/projects/radpulse-africa', 390, 'light', true);
  await click(reduced, '.walkthrough-mobile-chapters button:nth-child(3)');
  check('Reduced-motion chapter selection', (await state(reduced)).selected === 'chapter-tasks', await state(reduced));
  await reduced.close();
  const noScript = await browser.newPage({ width: 390, height: 844, mobile: true });
  await noScript.send('Emulation.setScriptExecutionDisabled', { value: true });
  await noScript.goto(root + '/en/projects/radpulse-africa');
  check('Initial project content readable without JS', await noScript.eval(() => !!document.querySelector('main h1') && getComputedStyle(document.querySelector('main h1').parentElement).opacity === '1'));
  await noScript.close();
} finally {
  writeFileSync(`${out}/behavior-results.json`, JSON.stringify(results, null, 2));
  await browser.close();
}
console.log(`${results.filter(r => r.pass).length}/${results.length} checks passed`);
if (results.some(r => !r.pass)) process.exitCode = 1;

