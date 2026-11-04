# Deck v2 Progress

Status codes: `[ ]` pending · `[~]` in progress · `[x]` done (built, snapped, reviewed, committed) · `[!]` blocked (reason logged).

**next:** B5

---

## Batches

### [x] B0 · Foundation: full-bleed stage, design tokens, shared components, manifest v2 · 087b6b4
- **Slides:** none (all show `PlaceholderSlide` after this batch)
- **Do:**
  1. `git mv` every `src/slides/S*.jsx` into `src/slides/legacy/` (the registry glob `./S*.jsx` won't pick them up there).
  2. Create `src/theme.js`: act names → accent and chapter-card canvas (plan §4.2), and the type scale (plan §4.3). Act keys: `Opening`, `Good`, `Poll`, `Bad`, `Ugly`, `Count`, `How`, `Epilogue`, `Close`.
  3. Add Tailwind tokens to `tailwind.config.js`: `text-display` / `headline` / `sub` / `body` / `label` / `code` (px sizes with line-heights), and colours `ink`, `muted`, `canvas`, plus the accents.
  4. Create `src/components/deck/`:
     - `Stage` (1920 × 1080, uniform scale-to-fit, centred, `data-testid="slide-stage"`)
     - `SlideFrame`, `Headline`, `Kicker`
     - `ChapterCard` (props: numeral, name, act)
     - `Mascot` (animated wrapper: bob / blink / wave presets)
     - `TypingBubble` (size prop, slow pulse)
     - `ChatTurn` (one style for `me` and `ai`)
     - `CodeWindow` (editor / terminal chrome, large, mono ≥ 28 px)

     `WorkflowMiniMap` comes in B8.
  5. `src/App.jsx` audience view:
     - Remove the black background, padding, bezel, rounded corners and shadow.
     - The outer element `data-testid="slide-viewport"` fills 100vw × 100vh, with the active slide's `canvas` as its background (a string, or an array indexed by `buildStep`; animated ≤ 400 ms; default `#FAFAFB`).
     - The slide renders inside `Stage`.
     - Chrome (progress bar, corner badge at 24 px mono with the act dot) lives inside the stage, top area.
     - Act colours come from `theme.js`.
     - Slide transition ≤ 500 ms.
  6. `src/index.css`: body background `#FAFAFB` (not black).
  7. `src/components/PresenterView.jsx`: previews use `Stage` (or its scaling logic), act colours from `theme.js`. Notes, timer, sync and previews must keep working.
  8. `src/components/SlideErrorBoundary.jsx`: add `data-testid="slide-error"` to the fallback root. In `App.jsx`, give the corner badge `data-testid="corner-badge"`, rendered only when the slide has a badge. `tools/e2e-deck.js` relies on both.
  9. `src/slides/PlaceholderSlide.jsx`: a design-px placeholder that shows the slide id and title large, so the deck runs with no crashes.
  10. Rewrite `src/slides/manifest.js` for the 43 v2 slides (plan §5):
      - fields: `id`, `key`, `title`, `cornerLabel` (`''` where the corner is —), `act`, `durationMinutes`, `enabled: true`, `cutTier`, `totalBuilds` (from plan §6; where §6 says "as v1", copy the legacy manifest value and note it), `componentName` (new names, plan §5 mapping), `canvas` (chapter-card tints; `S20` purple slop gradient; default omitted), `notes` (one-line cue for now).
      - Keep the `getActiveSlides` / `getSlideCornerBadge` exports working.
  11. `src/motion.js`: keep the exports. Add any shared variants the components need.
  12. Copy the v1 manifest to `src/slides/legacy/manifest.v1.js` before rewriting it (reference only, not imported).
  13. `index.html`: body background `#FAFAFB`.
- **Scope:** `index.html`, `src/App.jsx`, `src/index.css`, `src/theme.js`, `src/motion.js`, `tailwind.config.js`, `src/components/**`, `src/slides/manifest.js`, `src/slides/PlaceholderSlide.jsx`, `src/slides/registry.js` (only if needed), `src/slides/legacy/**` (moves only).
- **Verify:** build green. `npm run snap -- --out .snaps/B0` shows no CRASH / console / NAV / letterbox at 1920×1080 **and** 1440×900. Open `/?presenter=true` in the snap browser, or check by code reading that the presenter view renders.
- **Commit paths:** `index.html src tailwind.config.js package.json .gitignore deck-v2-workflow`

### [x] B1 · Opening + chapter cards: S01, S02, S03, S04, S08, S14, S23, S29 · bb94920
- **Legacy:** `S01_Title`, `S02_WhoWeAre`, `S04_Agenda`, `S05_ActGood` (for what *not* to do), the logos in `src/assets/informatiq-app-suite-logos/`, `src/assets/bs23_logo.webp`.
- **Notes:** the S01 ambient shapes and the chapter-card motifs should share one visual language (`src/components/deck/AmbientShapes.jsx` or similar). S02 is 9 builds, logos large.
- **Scope:** `src/slides/S01_Title.jsx`, `S02_WhoWeAre.jsx`, `S03_Agenda.jsx`, `S04_ActGood.jsx`, `S08_ActBad.jsx`, `S14_ActUgly.jsx`, `S23_ActCount.jsx`, `S29_ActHowWeWork.jsx`, `src/components/deck/**`, `src/slides/manifest.js` (these entries).
- **Verify:** build; `snap --slides S01,S02,S03,S04,S08,S14,S23,S29`.

### [x] B2 · The Good + Poll: S05, S06, S07 · f277f5b
- **Legacy:** `S06_TimeBack`, `S07_Manuals` (crash: missing `springPhysics` import), `S09_Poll`.
- **Scope:** `src/slides/S05_TimeBack.jsx`, `S06_Manuals.jsx`, `S07_Poll.jsx`, manifest entries.
- **Verify:** build; `snap --slides S05,S06,S07`.

### [x] B3 · The Bad (1): S09, S10, S11 · d2644bb
- **Legacy:** `S11_KeynoteVsTerminal`, `S12_NinetyNine`, `S13_DidYouRead`.
- **Notes:** S09 needs real, verified vendor claims (WebFetch the official announcements; log URLs in `missing-pieces.md § Facts`). S11 uses one large `CodeWindow`.
- **Scope:** `src/slides/S09_KeynoteVsTerminal.jsx`, `S10_NinetyNine.jsx`, `S11_DidYouRead.jsx`, manifest entries, `deck-v2-workflow/missing-pieces.md` (append).
- **Verify:** build; `snap --slides S09,S10,S11`.

### [x] B4 · The Bad (2): S12, S13
- **Legacy:** `S14_Circle`, `S15_Overengineered`.
- **Scope:** `src/slides/S12_Circle.jsx`, `S13_Overengineered.jsx`, manifest entries.
- **Verify:** build; `snap --slides S12,S13`.

### [ ] B5 · The Ugly (1): S15, S16, S17, S18
- **Legacy:** `S18_Thinking`, `S19_Frameworks`, `S20_SayVsDo`, `S21_Elephant`.
- **Scope:** `src/slides/S15_Thinking.jsx`, `S16_Frameworks.jsx`, `S17_SayVsDo.jsx`, `S18_Elephant.jsx`, manifest entries.
- **Verify:** build; `snap --slides S15,S16,S17,S18`.

### [ ] B6 · The Ugly (2): S19, S20, S21, S22
- **Legacy:** `S22_PickTwo`, `S23_Slop`, `S16_MakeNoMistakes`, `S24_MeatProxy`. See `drafts/slide_feedback/feedback_images/s24.png`.
- **Scope:** `src/slides/S19_ThreeBody.jsx`, `S20_Slop.jsx`, `S21_MakeNoMistakes.jsx`, `S22_MeatProxy.jsx`, manifest entries.
- **Verify:** build; `snap --slides S19,S20,S21,S22`.

### [ ] B7 · Making It Count (1): S24, S25, S26
- **Legacy:** `S26_RoleShift` (see `feedback_images/s26.png`: clipped labels), `S27_TicketFloor`, `S28_MakeItBetter`.
- **Scope:** `src/slides/S24_RoleShift.jsx`, `S25_TicketFloor.jsx`, `S26_MakeItBetter.jsx`, manifest entries.
- **Verify:** build; `snap --slides S24,S25,S26`.

### [ ] B8 · Plan first, the teaser, the workflow map: S27, S28, S30, S31
- **Legacy:** `S29_PlanHours`, `S31_MyLoop` (ideas only).
- **Notes:**
  - Create `src/components/deck/WorkflowMiniMap.jsx`. It's used by S31–S37.
  - Record S28's exact number geometry in `important-notes.md`.
- **Scope:** `src/slides/S27_PlanHours.jsx`, `S28_TheNumber.jsx`, `S30_WorkflowMap.jsx`, `S31_Gather.jsx`, `src/components/deck/WorkflowMiniMap.jsx`, manifest entries, `deck-v2-workflow/important-notes.md` (append).
- **Verify:** build; `snap --slides S27,S28,S30,S31`.

### [ ] B9 · How We Work (1): S32, S33, S34
- **Legacy (ideas):** `S32_AskEverything`, `S35_UnitLoop`, `S34_TheTeam`, `S40_Routing`. Background: `docs/context/AGENTIC-WORKFLOWS.md` §2–§7.
- **Scope:** `src/slides/S32_PlanTogether.jsx`, `S33_Orchestrator.jsx`, `S34_RightModel.jsx`, manifest entries.
- **Verify:** build; `snap --slides S32,S33,S34`.

### [ ] B10 · How We Work (2): S35, S36, S37
- **Legacy (ideas):** `S33_FilesMemory`.
- **Scope:** `src/slides/S35_Specialists.jsx`, `S36_FilesMemory.jsx`, `S37_CodeContext.jsx`, manifest entries.
- **Verify:** build; `snap --slides S35,S36,S37`.

### [ ] B11 · Epilogue: S38, S39, S40, S41
- **Legacy (ideas):** `S37_HardWay`, `S39_Stateless`.
- **Notes:** S38 build 0 must match S28's number geometry (`important-notes.md`). No budget figures on screen.
- **Scope:** `src/slides/S38_Unlimited.jsx`, `S39_TheMorning.jsx`, `S40_Cache.jsx`, `S41_FreshSessions.jsx`, manifest entries.
- **Verify:** build; `snap --slides S28,S38,S39,S40,S41`. Compare the S28 and S38 b0 screenshots: the number must be identical.

### [ ] B12 · Close: S42, S43
- **Legacy:** `S41_SharedRepo`, `S43_Thanks`.
- **Scope:** `src/slides/S42_SharedRepo.jsx`, `S43_Thanks.jsx`, manifest entries.
- **Verify:** build; `snap --slides S42,S43`.

### [ ] D1 · Presenter docs (deck-writer, Sonnet)
- **Do:**
  1. Rewrite `docs/plans/presenter-notes.md` for S01–S43, with the same section style as v1 (point, reminders, click cues `[n]` matching the real builds, punchlines, poll callbacks, timing checkpoints). Story beats come from `drafts/slide_feedback/slide-feedback.md`: the S31/S33 workflow details, "How It All Started", "The $25,000 Lesson", "The New Reality", Lesson 1 and Lesson 2. That includes the spoken-only facts: the $1,100 soft budget, ~$3,000 actual, the salary joke, Copilot's pricing change, the Halliburton acquisition, AWS Bedrock, the top-10 list. Also: the S12 note about sometimes sacrificing the session to get back on track, and the S41 closer "That's why the workflow looks the way it does."
  2. Keep or adapt the Poll appendix (questions must not reference removed slides) and the Before-going-live and Facts appendices. Add the S09 vendor-claim sources from `missing-pieces.md`.
  3. Write `docs/plans/presenter-script.md`: an optional, full word-for-word script in the presenter's voice (first person, conversational, honest, a bit nerdy and funny), per slide with `[click]` markers. Target ~51 min at ~130 wpm.
  4. Update each manifest entry's `notes` with a 1–2 line cue (shown in the presenter view).
  5. Sync `docs/plans/slide-deck-plan.md §5` timings and build counts with what was built (facts only).
- **Read:** plan §1–§3 and §5–§6, the manifest, the feedback file, v1 `docs/plans/presenter-notes.md` (for tone and structure), and `drafts/presenter-script.md` (v1 script, for voice; read-only).
- **Scope:** `docs/plans/presenter-notes.md`, `docs/plans/presenter-script.md`, `src/slides/manifest.js` (`notes` field only), `docs/plans/slide-deck-plan.md` (§5 facts only).
- **Verify:** build; spot-check that every `[n]` cue ≤ that slide's `totalBuilds`.

### [ ] T1 · Full browser session (deck-browser-tester, Sonnet · low)
- **Do:** run the Browser-tester brief (README §4). It runs `deck-v2-workflow/tools/e2e-deck.js` through the Playwright MCP (fallback: `node deck-v2-workflow/tools/e2e.mjs`). The session checks:
  - every build forward, then everything backward;
  - live corner-badge numbering;
  - crashes and console errors;
  - End / Home, and ArrowLeft into a slide landing on its last build;
  - key mashing;
  - presenter ↔ audience sync both ways, and the presenter timer and build state;
  - overview open and close;
  - no black bars at 1920×1080, 1440×900, 1280×720 and 1512×982.
- **Don't fix anything here.** Record the failed checks in `progress.md` under T1 for Z1. No commit; nothing changes.

### [ ] Z1 · Deck-wide polish and final verification
- **Do:**
  1. Snap-runner: `--out .snaps/final --contact final`. This is the full deck at both sizes, plus contact sheets of each slide's final build.
  2. Dispatch `deck-design-director` (Opus) on `.snaps/final/contact-*.png` only (~5 images), plus the `review-log.md` open items. It reviews:
     - consistency: type scale, spacing, colours, mascot use, chapter cards;
     - the "WWDC bar".

     It returns a ranked list of HIGH/MEDIUM fixes (≤ 15).
  3. Dispatch one `deck-builder` fix round for those fixes **plus T1's failed checks**. It may touch any slide or shared component.
  4. Delete `src/slides/legacy/` (`git rm -r`).
  5. Snap-runner again (`--out .snaps/final --contact final`): it must be clean of CRASH / console / NAV / letterbox at both sizes. Then re-dispatch `deck-browser-tester` (signal `Z1-e2e`) for the final browser session.
  6. Update `AGENTS.md`'s file list if anything moved.
  7. Write `human-review.md` (the morning report), including any browser checks that still fail.
- **Commit paths:** `src docs/plans deck-v2-workflow AGENTS.md`

---

## Session log

<!-- one line per session start/end: date · HEAD · batch · tokens left if known -->
- 2026-11-05 · session 1 start · HEAD 7f68065 · starting B0
- 2026-11-05 · session 2 start · HEAD 7f68065 · resuming B0 (tree partially changed: legacy moves, theme.js, tailwind, motion, manifest.v1)
