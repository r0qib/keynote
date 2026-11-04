#!/usr/bin/env node
// Fallback runner for tools/e2e-deck.js when the Playwright MCP is unavailable (uses puppeteer-core + local Chrome).
// Usage: node deck-v2-workflow/tools/e2e.mjs   (starts its own vite on :5199 if needed)
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = resolve(new URL('../..', import.meta.url).pathname);
const BASE = 'http://localhost:5199';
const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const reachable = async () => {
  try {
    return (await fetch(BASE)).ok;
  } catch {
    return false;
  }
};

let server = null;
if (!(await reachable())) {
  server = spawn('npx', ['vite', '--port', '5199', '--strictPort'], { cwd: ROOT, stdio: 'ignore', detached: true });
  for (let i = 0; i < 60 && !(await reachable()); i++) await new Promise((r) => setTimeout(r, 500));
}

const test = (0, eval)(readFileSync(new URL('./e2e-deck.js', import.meta.url), 'utf8'));
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  const page = await browser.newPage();
  const result = await test(page);
  console.log(JSON.stringify(result, null, 2));
  process.exitCode = result.pass ? 0 : 1;
} catch (e) {
  console.error(e);
  process.exitCode = 2;
} finally {
  await browser.close();
  if (server) process.kill(-server.pid);
}
