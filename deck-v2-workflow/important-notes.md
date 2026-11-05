# Important Notes (codebase index + living memory)

Every agent reads this first. Agents may propose additions in their report; the orchestrator curates (keep it short, delete what's stale).

## Stack
React 18 + Vite 5 + Tailwind 3 + Framer Motion 11 + lucide-react. `npm run build` = `vite build`. No tests; verification = build + `npm run snap`.

## Engine map (state at planning time; B0 changes the shell)
- `src/App.jsx`: audience view. Before B0 the canvas was letterboxed: black `bg-[#000000]` wrapper with padding + `aspect-video` `<main>` with rounded bezel (this is the black-bars bug). Corner badge + top progress bar live here. `ACT_COLORS` map here → move to `src/theme.js`. Exposes `window.__informatiqSync` (used by snap).
- `src/hooks/usePresentationSync.js`: state `{activeSlideIndex, buildStep, direction, …}` synced via BroadcastChannel `informatiq-slide-sync` + localStorage `informatiq-presentation-state`. API: `goToSlide(i)`, `nextBuildOrSlide()`, `prevBuildOrSlide()`, timer fns, `activeSlides`, `totalSlides`.
- `src/slides/manifest.js`: `slideManifest[]`, `getActiveSlides()`, `getSlideCornerBadge(index)` (live numbering from enabled slides). Slide props: `{ activeSlide, buildStep }`.
- `src/slides/registry.js`: `import.meta.glob(['./S*.jsx','./Slide*.jsx'])` — top level only, so `src/slides/legacy/` is ignored. Missing component → `PlaceholderSlide`.
- `src/components/PresenterView.jsx`: `/?presenter=true`; already renders previews in a 1920×1080 box scaled by ResizeObserver (`SlideFrame`, ~line 37). Reuse that idea for `Stage`.
- `src/components/SlideErrorBoundary.jsx`: fallback must carry `data-testid="slide-error"` (B0).
- `src/motion.js`: `appleEase`, `playfulEase`, `springPhysics`, `bouncierSpring`, `slideVariants`, `fadeUp`, `popIn`, `drawSvg`, `floatAnim`. **Import what you use** — v1 S07 crashed on an unimported `springPhysics`.
- `index.html` body has `bg-[#F8F9FA]` classes; `src/index.css` sets body `#000000` → make both `#FAFAFB` (B0).
- v1 manifest is copied by B0 to `src/slides/legacy/manifest.v1.js` (not imported) for "as v1" build counts.

## Assets
- Logos: `src/assets/informatiq-app-suite-logos/{wellMate,wellBook,geologiQ,offsetAnalyzer,logistiQ,eventAnalyzer,analytiQ,portal,informatiq}.svg` (wide aspect ratios; Portal slide uses `informatiq.svg` per plan, `portal.svg` also exists — pick the one that looks like the Portal mark and log it).
- BS23 logo: `src/assets/bs23_logo.webp`.
- Mascot: `src/assets/meatproxy-emojis-svg/meat-*.svg` (44 poses; README in that folder describes each). Import as URL (`import x from '…svg'`) or inline for part animation.
- Feedback screenshots: `drafts/slide_feedback/feedback_images/{s01,s02,s24,s26}.png` (read-only).

## Snap tool (`deck-v2-workflow/tools/snap.mjs`, `npm run snap -- …`)
- Flags: `--slides S01,S02` (ids or keys) · `--out .snaps/<name>` · `--sizes 1920x1080,1440x900` (default) · `--settle 1400` ms per build · `--no-shots` · `--url` (default starts its own vite on :5199).
- Screenshots every build at the first size, final build only at other sizes. `report.json` in the out dir.
- Contact sheets: `contact-NN.png` = 3×3 labelled tiles of first-size shots (`--contact all` default, `final` = last build per slide, `none`). Reviewers read these instead of single PNGs.
- Flags per state: `NAV` (build didn't land), `CRASH` (error boundary), `console` errors, `letterbox` (black screen edge), `small-text` (< 24 px design px; < 16 px inside `[data-mock]`), `clipped` (ellipsis/overflow text), `off-stage`, `overlap` (text boxes overlapping > 25%; suppress with `[data-overlap-ok]` only when intentional).
- Exit code 1 on CRASH/console/NAV. Font sizes are read from computed style, so they're design px once slides render inside the scaled `Stage`.
- Settle time matters: if an entrance animation is longer than 1.4 s, pass a larger `--settle` for that slide or the screenshot catches it mid-flight.

## Browser session (`tools/e2e-deck.js`)
- A bare `async (page) => {…}` function. Playwright MCP runs it with `browser_run_code_unsafe` + `filename`. `node deck-v2-workflow/tools/e2e.mjs` runs the same file with puppeteer-core. Both need the app on :5199 (`e2e.mjs` starts it).
- Relies on `window.__informatiqSync`, `[data-testid="slide-error"]` and `[data-testid="corner-badge"]` (B0). It returns `{pass, failed[], checks[]}`.
- Planning-time baseline on the v1 deck: navigation, presenter sync and overview all passed; it failed on black bars, the S07 `springPhysics` crash, and missing badge test-ids.

## Living memory (appended during the run)
- **Shared parts (B0):** import from `src/components/deck/index.js`: Stage, SlideFrame, Headline, Kicker, ChapterCard, ActShape, Mascot (`pose="meat-cool"`, `preset` bob|blink|wave|none), TypingBubble, ChatTurn, CodeWindow (default width 1240, 30 px mono), CanvasBackground.
- **Type tokens:** `text-display` 200 · `headline` 96 · `sub` 48 · `body` 36 · `label` 28 · `code` 30 · `badge` 24. Safe area: `px-safe-x` / `py-safe-y`.
- **Slides never paint their own background**; the manifest `canvas` (string, or array by buildStep) does it, via CanvasBackground.
- **Chrome:** corner badge top 33 / right 120, progress pill top-centre, inside the 96 px top band. Keep slide content below y=96. `chromeFromBuild` in the manifest hides chrome before that build (S15 = 1).
- **Framer Motion won't animate `fontSize`** (stays at initial value). Use a CSS transition or `scale` instead.
- **ActShape** props: `morph`, `glitch`, `duration`, `delay` (S01 + ChapterCard).
- **SlideFrame** is `flex flex-col`; a `flex-row` className won't win. Nest a `flex flex-1` div for row layouts.
- **Headline** size overrides: use `style={{ fontSize }}`, not a className (conflicts with `text-headline`).
- **openai.com blocks WebFetch/curl (403);** verify via `web.archive.org/web/<date>/<url>`.
- **ChatAvatar** (named export) gives typing rows the same avatar as ChatTurn AI turns.
- **Framer `layout`/`layoutId` misbehave inside the scaled Stage** (page-px deltas applied in design px). For morphs, measure offsetLeft/offsetTop and animate x/y/scale yourself (see S15 `offsetWithin`).
- **TypingBubble** `dots={false}` draws just the bubble.
- **Reviewers keep flagging under-scaled slides (B2, B5).** Size for a Teams share: the main visual should fill most of the safe area (≈1680×888), no empty band > ~200 px, body text ≥ 36 px, mock UI text ≥ 24 px where it must be read, strokes ≥ 6 px on big shapes.
- **snap `clipped` can't be suppressed;** intentional ellipsis (S26 b2 Remarks) always flags 2. Expected.
- **$25,000 (S28 → S38 b0):** use `<TheNumber />` from deck (geometry in `THE_NUMBER`): text `$25,000`, font-sans, 240 px, weight 800, tracking −0.03em, line-height 1, colour ink `#111113`, a full-width row `left 0 · top 420 · width 1920 · height 240`, text centred. Place it directly in a full-stage container (S28 uses `absolute inset-0`, no SlideFrame). S28's entrance is fade + blur + scale 0.96 → 1 and a slow opacity breath (1 → 0.84, 7 s) on a wrapper. Pass motion props for S38's slide-up; don't restyle.
- **WorkflowMiniMap (S31–S37):** `<WorkflowMiniMap active="Plan" />` (name or index; earlier stations show done) or `complete` for S37 b2. Fixed at `left 120 · top 96`, about 610 × 56 (4 px border, 46 px pills), 26 px labels, upcoming labels `#3A3A44`. Render it as the first child of SlideFrame and give the Headline `className="mt-[84px]"`, so the headline sits at y = 180 (single line at 96 px fits 1680 wide for ≤ ~34 chars). Each station has `data-station` for morph measurements (S30 uses them).
- **S31 → S32 Brief:** the final brief is at `left 560 · top 330 · 800 × 640`, 6 px ink border, radius 32, header "Brief" + "Wellbore search", five icon rows (History · Globe · Newspaper · Boxes · User) with grey bars.
- **S32 b0 copies S31's Brief markup** (not shared). If S31's brief changes, mirror it in S32.
- **InfinityMark** (deck): `<InfinityMark width stroke delay duration />`; `infinityPoints(width, n)` + `pointsToPath()` for equal-point-count `d` morphs.
- **Snap settle:** S40 b1 needs `--settle 5500`; most slides are fine at 2000–3600.
- **meat-wave.svg** is a traced bitmap (no arm group): wave the whole img around a bottom origin.
- **S31 → S32 Brief** is 7 text rows (56 px rows, 28 px text): 4 sources + 3 user questions. S32 mirrors S31's markup.
- **Kicker `variant="aside"`** (40 px / 500, muted, mt 16) is the one style for parenthetical asides (S12, S24, S43).
- **Manifest `darkCanvas`** (bool or array by buildStep) switches the chrome to white badge/dot/pill with a text-shadow (S20 b0).
- **src/slides/legacy/ was deleted in Z1**; v1 sources live on branch `snapshot/pre-deck-v2`.
