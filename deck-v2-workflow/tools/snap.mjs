#!/usr/bin/env node
// Renders every slide at every build step, screenshots it and runs layout checks.
// Usage:
//   node deck-v2-workflow/tools/snap.mjs [--slides S01,S02] [--out .snaps/<run>] [--sizes 1920x1080,1440x900]
//                                        [--settle 1400] [--url http://localhost:5199] [--no-shots]
// Prints a compact summary; full results in <out>/report.json.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import puppeteer from 'puppeteer-core';

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, arr) => {
    if (a.startsWith('--')) acc.push([a.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true]);
    return acc;
  }, []),
);

const ROOT = resolve(new URL('../..', import.meta.url).pathname);
const URL_BASE = args.url || 'http://localhost:5199';
const OUT = resolve(ROOT, args.out || `.snaps/${new Date().toISOString().replace(/[:.]/g, '-')}`);
const SIZES = String(args.sizes || '1920x1080,1440x900').split(',').map((s) => s.split('x').map(Number));
const SETTLE = Number(args.settle || 1400);
const ONLY = args.slides ? new Set(String(args.slides).split(',').map((s) => s.trim())) : null;
const SHOTS = !args['no-shots'];
const MIN_FONT = 24;
const MIN_FONT_MOCK = 16;
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

async function reachable(url) {
  try {
    const r = await fetch(url);
    return r.ok;
  } catch {
    return false;
  }
}

async function ensureServer() {
  if (await reachable(URL_BASE)) return null;
  const port = new URL(URL_BASE).port || '5199';
  const proc = spawn('npx', ['vite', '--port', port, '--strictPort'], { cwd: ROOT, stdio: 'ignore', detached: true });
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 500));
    if (await reachable(URL_BASE)) return proc;
  }
  throw new Error(`dev server did not start on ${URL_BASE}`);
}

// Runs inside the page. Returns layout problems for the current slide state.
function inspect({ MIN_FONT, MIN_FONT_MOCK }) {
  const stage = document.querySelector('[data-testid="slide-stage"]') || document.querySelector('main');
  const viewport = document.querySelector('[data-testid="slide-viewport"]') || document.body;
  const stageRect = stage.getBoundingClientRect();
  const scale = stage.offsetWidth ? stageRect.width / stage.offsetWidth : 1;

  const effOpacity = (el) => {
    let o = 1;
    for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden') return 0;
      o *= Number(cs.opacity);
    }
    return o;
  };

  const textEls = [];
  const walker = document.createTreeWalker(stage, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  while (walker.nextNode()) {
    const t = walker.currentNode;
    if (!t.textContent.trim()) continue;
    const el = t.parentElement;
    if (!el || seen.has(el) || el.closest('svg')) continue;
    seen.add(el);
    const r = el.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    if (effOpacity(el) < 0.05) continue;
    textEls.push({ el, r, text: el.textContent.trim().slice(0, 60) });
  }

  const smallText = [];
  const clipped = [];
  const outside = [];
  for (const { el, r, text } of textEls) {
    const fs = parseFloat(getComputedStyle(el).fontSize);
    const mock = !!el.closest('[data-mock]');
    if (fs < (mock ? MIN_FONT_MOCK : MIN_FONT)) smallText.push({ text, fontSize: fs, mock });
    const cs = getComputedStyle(el);
    if ((cs.textOverflow === 'ellipsis' || cs.overflow === 'hidden' || cs.webkitLineClamp !== 'none') && el.scrollWidth > el.clientWidth + 1) {
      clipped.push({ text, scrollWidth: el.scrollWidth, clientWidth: el.clientWidth });
    }
    if (r.left < stageRect.left - 2 || r.right > stageRect.right + 2 || r.top < stageRect.top - 2 || r.bottom > stageRect.bottom + 2) {
      outside.push({ text });
    }
  }

  const overlaps = [];
  for (let i = 0; i < textEls.length; i++) {
    for (let j = i + 1; j < textEls.length; j++) {
      const a = textEls[i];
      const b = textEls[j];
      if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
      if (a.el.closest('[data-overlap-ok]') || b.el.closest('[data-overlap-ok]')) continue;
      const w = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left);
      const h = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
      if (w <= 0 || h <= 0) continue;
      const minArea = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
      if ((w * h) / minArea > 0.25) overlaps.push([a.text, b.text]);
    }
  }

  // Letterbox: sample the four screen edges; pure black there means bars.
  const W = innerWidth;
  const H = innerHeight;
  const bgAt = (x, y) => {
    for (const n of document.elementsFromPoint(x, y)) {
      const c = getComputedStyle(n).backgroundColor;
      if (c && c !== 'rgba(0, 0, 0, 0)' && c !== 'transparent') return c;
    }
    return getComputedStyle(document.body).backgroundColor;
  };
  const edges = { top: bgAt(W / 2, 1), bottom: bgAt(W / 2, H - 2), left: bgAt(1, H / 2), right: bgAt(W - 2, H / 2) };
  const isBlack = (c) => /^rgba?\(0, 0, 0(, 1)?\)$/.test(c);
  const letterbox = Object.entries(edges).filter(([, c]) => isBlack(c)).map(([k]) => k);

  const errorBoundary = !!document.querySelector('[data-testid="slide-error"]') || /Slide Error/i.test(document.body.innerText);

  return {
    scale: Number(scale.toFixed(3)),
    errorBoundary,
    letterbox,
    smallText: smallText.slice(0, 12),
    smallTextCount: smallText.length,
    clipped: clipped.slice(0, 8),
    outside: outside.slice(0, 8),
    overlaps: overlaps.slice(0, 8),
  };
}

async function run() {
  mkdirSync(OUT, { recursive: true });
  const server = await ensureServer();
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars'] });
  const results = [];
  try {
    for (const [w, h] of SIZES) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
      let stepErrors = [];
      page.on('console', (m) => m.type() === 'error' && stepErrors.push(m.text().slice(0, 200)));
      page.on('pageerror', (e) => stepErrors.push(String(e).slice(0, 200)));
      await page.goto(URL_BASE, { waitUntil: 'load' });
      await page.evaluate(() => localStorage.clear());
      await page.reload({ waitUntil: 'load' });
      await page.waitForFunction(() => window.__informatiqSync?.activeSlides);
      const slides = await page.evaluate(() =>
        window.__informatiqSync.activeSlides.map((s) => ({ id: s.id, key: s.key, totalBuilds: s.totalBuilds || 0 })),
      );
      const primary = w === SIZES[0][0] && h === SIZES[0][1];
      for (let i = 0; i < slides.length; i++) {
        const s = slides[i];
        if (ONLY && !ONLY.has(s.id) && !ONLY.has(s.key)) continue;
        stepErrors = [];
        await page.evaluate((idx) => window.__informatiqSync.goToSlide(idx), i);
        for (let b = 0; b <= s.totalBuilds; b++) {
          if (b > 0) await page.keyboard.press('ArrowRight');
          await new Promise((r) => setTimeout(r, SETTLE));
          const state = await page.evaluate(() => ({
            index: window.__informatiqSync.activeSlideIndex,
            build: window.__informatiqSync.buildStep,
          }));
          const checks = await page.evaluate(inspect, { MIN_FONT, MIN_FONT_MOCK });
          const shotName = `${s.id}_${s.key}_b${b}_${w}x${h}.png`;
          // Secondary sizes only need the final build screenshot.
          if (SHOTS && (primary || b === s.totalBuilds)) await page.screenshot({ path: join(OUT, shotName) });
          results.push({
            slide: s.id,
            key: s.key,
            build: b,
            size: `${w}x${h}`,
            navOk: state.index === i && state.build === b,
            consoleErrors: [...stepErrors],
            ...checks,
            shot: SHOTS && (primary || b === s.totalBuilds) ? shotName : null,
          });
          stepErrors = [];
        }
      }
      await page.close();
    }
  } finally {
    await browser.close();
    if (server) process.kill(-server.pid);
  }

  writeFileSync(join(OUT, 'report.json'), JSON.stringify(results, null, 2));
  const bad = results.filter(
    (r) => !r.navOk || r.errorBoundary || r.consoleErrors.length || r.letterbox.length || r.smallTextCount || r.clipped.length || r.outside.length || r.overlaps.length,
  );
  const lines = bad.map((r) => {
    const p = [];
    if (!r.navOk) p.push('NAV');
    if (r.errorBoundary) p.push('CRASH');
    if (r.consoleErrors.length) p.push(`console:${r.consoleErrors.length} "${r.consoleErrors[0]}"`);
    if (r.letterbox.length) p.push(`letterbox:${r.letterbox.join('/')}`);
    if (r.smallTextCount) p.push(`small-text:${r.smallTextCount} e.g. "${r.smallText[0].text}"@${r.smallText[0].fontSize}px`);
    if (r.clipped.length) p.push(`clipped:${r.clipped.length} "${r.clipped[0].text}"`);
    if (r.outside.length) p.push(`off-stage:${r.outside.length} "${r.outside[0].text}"`);
    if (r.overlaps.length) p.push(`overlap:${r.overlaps.length} "${r.overlaps[0][0]}" x "${r.overlaps[0][1]}"`);
    return `${r.slide} b${r.build} ${r.size}: ${p.join(' | ')}`;
  });
  console.log(`snap: ${results.length} states, ${bad.length} with issues -> ${OUT}`);
  console.log(lines.slice(0, 60).join('\n') || 'all clean');
  if (lines.length > 60) console.log(`... ${lines.length - 60} more in report.json`);
  process.exitCode = bad.some((r) => r.errorBoundary || r.consoleErrors.length || !r.navOk) ? 1 : 0;
}

run().catch((e) => {
  console.error(e);
  process.exit(2);
});
