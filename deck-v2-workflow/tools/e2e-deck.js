async (page) => {
  // Full-deck browser session. Works with Playwright (MCP browser_run_code_unsafe) and puppeteer (tools/e2e.mjs).
  const BASE = 'http://localhost:5199';
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const errors = [];
  const watch = (p, tag) => {
    p.on('console', (m) => m.type() === 'error' && errors.push(`${tag}: ${m.text().slice(0, 160)}`));
    p.on('pageerror', (e) => errors.push(`${tag}: ${String(e).slice(0, 160)}`));
  };
  const state = (p) =>
    p.evaluate(() => {
      const s = window.__informatiqSync;
      return s ? { i: s.activeSlideIndex, b: s.buildStep, id: s.activeSlide?.id } : null;
    });
  const checks = [];
  const check = (name, ok, detail = '') => checks.push({ name, ok: !!ok, detail: ok ? '' : String(detail).slice(0, 200) });

  if (page.setViewportSize) await page.setViewportSize({ width: 1920, height: 1080 });
  else await page.setViewport({ width: 1920, height: 1080 });
  watch(page, 'audience');
  await page.goto(BASE, { waitUntil: 'load' });
  await page.evaluate(() => localStorage.clear());
  await page.goto(BASE, { waitUntil: 'load' });
  await sleep(800);

  const slides = await page.evaluate(() =>
    window.__informatiqSync.activeSlides.map((s) => ({ id: s.id, builds: s.totalBuilds || 0, corner: s.cornerLabel || '', chromeAt: s.chromeFromBuild || 0 })),
  );
  const totalSteps = slides.reduce((n, s) => n + s.builds + 1, 0);
  check('deck has slides', slides.length > 0, slides.length);

  // 1. Forward through every build of every slide.
  const crashes = [];
  const badges = [];
  let expected = { i: 0, b: 0 };
  let forwardOk = true;
  for (let step = 1; step < totalSteps; step++) {
    await page.keyboard.press('ArrowRight');
    await sleep(350);
    const s = await state(page);
    const cur = slides[expected.i];
    expected = expected.b < cur.builds ? { i: expected.i, b: expected.b + 1 } : { i: expected.i + 1, b: 0 };
    if (!s || s.i !== expected.i || s.b !== expected.b) {
      forwardOk = false;
      check('forward step order', false, `step ${step}: expected ${JSON.stringify(expected)} got ${JSON.stringify(s)}`);
      break;
    }
    const dom = await page.evaluate(() => ({
      crash: !!document.querySelector('[data-testid="slide-error"]'),
      badge: (document.querySelector('[data-testid="corner-badge"]')?.innerText || '').trim(),
    }));
    if (dom.crash) crashes.push(`${slides[s.i].id} b${s.b}`);
    if (s.b === slides[s.i].chromeAt) {
      const want = slides[s.i].corner ? String(s.i + 1).padStart(2, '0') : null;
      if (want && !dom.badge.startsWith(`${want} /`)) badges.push(`${slides[s.i].id}: badge "${dom.badge}" expected ${want} / …`);
      if (!want && dom.badge) badges.push(`${slides[s.i].id}: unexpected badge "${dom.badge}"`);
    }
  }
  if (forwardOk) check('forward reaches last build of last slide', true);
  check('no slide crashes', crashes.length === 0, crashes.join(', '));
  check('corner badges numbered live', badges.length === 0, badges.slice(0, 5).join(' | '));

  // 2. Extra ArrowRight at the very end stays put.
  const endState = await state(page);
  await page.keyboard.press('ArrowRight');
  await sleep(300);
  const afterEnd = await state(page);
  check('stays on last step past the end', JSON.stringify(endState) === JSON.stringify(afterEnd), JSON.stringify(afterEnd));

  // 3. Backward through every step to the start.
  for (let step = 1; step < totalSteps; step++) {
    await page.keyboard.press('ArrowLeft');
    await sleep(120);
  }
  await sleep(400);
  const start = await state(page);
  check('backward returns to S01 b0', start && start.i === 0 && start.b === 0, JSON.stringify(start));

  // 4. Entering a slide backwards lands on its last build.
  await page.keyboard.press('End');
  await sleep(400);
  const end = await state(page);
  check('End jumps to last slide', end && end.i === slides.length - 1, JSON.stringify(end));
  const withBuilds = slides.findIndex((s, idx) => idx > 0 && s.builds > 0);
  if (withBuilds > 0) {
    await page.evaluate((idx) => window.__informatiqSync.goToSlide(idx + 1), withBuilds);
    await sleep(300);
    await page.keyboard.press('ArrowLeft');
    await sleep(300);
    const back = await state(page);
    check('ArrowLeft into a slide lands on its last build', back && back.i === withBuilds && back.b === slides[withBuilds].builds, JSON.stringify(back));
  }
  await page.keyboard.press('Home');
  await sleep(300);
  const home = await state(page);
  check('Home jumps to first slide', home && home.i === 0 && home.b === 0, JSON.stringify(home));

  // 5. Key mashing does not break state.
  for (let k = 0; k < 15; k++) await page.keyboard.press('ArrowRight');
  await sleep(1200);
  const mash = await state(page);
  check('rapid presses keep a valid state', mash && mash.i >= 0 && mash.b <= slides[mash.i].builds, JSON.stringify(mash));

  // 6. Presenter view stays in sync both ways.
  const opener = page.context ? page.context() : page.browser();
  const presenter = await opener.newPage();
  watch(presenter, 'presenter');
  if (presenter.setViewportSize) await presenter.setViewportSize({ width: 1440, height: 900 });
  else await presenter.setViewport({ width: 1440, height: 900 });
  await presenter.goto(`${BASE}/?presenter=true`, { waitUntil: 'load' });
  await sleep(1000);
  await page.bringToFront();
  await page.keyboard.press('ArrowRight');
  await sleep(700);
  const a1 = await state(page);
  const p1 = await state(presenter);
  check('presenter follows audience', a1 && p1 && a1.i === p1.i && a1.b === p1.b, `audience ${JSON.stringify(a1)} presenter ${JSON.stringify(p1)}`);
  await presenter.bringToFront();
  await presenter.keyboard.press('ArrowRight');
  await sleep(700);
  const a2 = await state(page);
  const p2 = await state(presenter);
  check('audience follows presenter keys', a2 && p2 && a2.i === p2.i && a2.b === p2.b && (p2.i !== p1.i || p2.b !== p1.b), `audience ${JSON.stringify(a2)} presenter ${JSON.stringify(p2)}`);
  const presenterUi = await presenter.evaluate(() => {
    const t = document.body.innerText;
    return { hasTimer: /\d{1,2}:\d{2}/.test(t), hasBuild: /Build \d+ \/ \d+|Single Step/i.test(t), chars: t.length };
  });
  check('presenter shows timer and build state', presenterUi.hasTimer && presenterUi.hasBuild, JSON.stringify(presenterUi));
  await presenter.close();

  // 7. Overview opens and closes.
  await page.bringToFront();
  const before = await page.evaluate(() => document.body.innerText.length);
  await page.keyboard.press('o');
  await sleep(600);
  const opened = await page.evaluate(() => document.body.innerText.length);
  await page.keyboard.press('Escape');
  await sleep(600);
  const closed = await page.evaluate(() => document.body.innerText.length);
  check('overview opens (O) and closes (Esc)', opened > before && Math.abs(closed - before) < 50, `${before} -> ${opened} -> ${closed}`);

  // 8. No black bars and a filled viewport at common window shapes.
  const shapes = [[1920, 1080], [1440, 900], [1280, 720], [1512, 982]];
  const bars = [];
  for (const [w, h] of shapes) {
    if (page.setViewportSize) await page.setViewportSize({ width: w, height: h });
    else await page.setViewport({ width: w, height: h });
    await sleep(500);
    const edge = await page.evaluate(() => {
      const at = (x, y) => {
        for (const n of document.elementsFromPoint(x, y)) {
          const c = getComputedStyle(n).backgroundColor;
          if (c && c !== 'rgba(0, 0, 0, 0)') return c;
        }
        return getComputedStyle(document.body).backgroundColor;
      };
      return [at(innerWidth / 2, 1), at(innerWidth / 2, innerHeight - 2), at(1, innerHeight / 2), at(innerWidth - 2, innerHeight / 2)];
    });
    if (edge.some((c) => /^rgba?\(0, 0, 0(, 1)?\)$/.test(c))) bars.push(`${w}x${h}: ${edge.join(' ')}`);
  }
  check('no black bars at 16:9, 16:10, 720p, MacBook', bars.length === 0, bars.join(' | '));

  check('no console or page errors', errors.length === 0, errors.slice(0, 5).join(' | '));
  const failed = checks.filter((c) => !c.ok);
  return { pass: failed.length === 0, slides: slides.length, steps: totalSteps, failed, checks: checks.map((c) => `${c.ok ? 'PASS' : 'FAIL'} ${c.name}`) };
}
