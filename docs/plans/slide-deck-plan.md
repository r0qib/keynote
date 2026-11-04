# Slide Deck Plan v2: AI-Assisted Development: The Good, the Bad and the Ugly

> **What this file is:** the source of truth for **what the audience sees**. It gives each slide's idea, its minimal on-screen copy, its visual and its click-by-click builds.
> **Presenter-side material** (talking points, story beats, timings, jokes) lives in [`presenter-notes.md`](./presenter-notes.md), plus an optional full script in [`presenter-script.md`](./presenter-script.md). Both are regenerated from this plan by the v2 run.
> **How it gets built:** [`deck-v2-workflow/README.md`](../../deck-v2-workflow/README.md).
> **v1 of this plan** is in git history and on the branch `snapshot/pre-deck-v2`.
> Slide IDs are new in v2 (S01–S43). Builds are numbered as in v1: `0` is the state on entry, and each further number is one press of `→`.

---

## 1. The talk in one breath

AI is genuinely good for us (**The Good**). It is also unreliable in very specific, very funny ways (**The Bad**: that part is the AI). The worst problems, though, come from how *we* use it (**The Ugly**: that part is us). The ugly part is the one we can fix (**Making It Count**): the role shift, using the time we got back to raise the bar, and planning first. Then the centrepiece: **How We Work**, the custom AI workflow the InformatiQ team runs on complex features. Halfway through, a number appears with no explanation: **$25,000**. The **epilogue** pays it off: the "unlimited" subscription, going all in, the morning access was revoked, and the two technical lessons we learned the hard way. They're the reason the workflow looks the way it does.

**Two jobs, one deck:**
1. An honest, funny, useful talk about the good, the bad and the ugly of AI-assisted development.
2. A quiet showcase of the InformatiQ team: the products we built (S02), how seriously we engineer with AI (S30–S37), and how we share it (S42). Team stats (budgets, usage, adoption) are **spoken, never shown**.

**Pivot line (spoken on S14):** *"The Bad is the AI. The Ugly… is us."*

---

## 2. Shape of the talk (~60 min total, ~51 min talking + Q&A)

| Chapter | Slides | Talk time | Purpose |
| --- | --- | --- | --- |
| Opening | S01–S03 | ~3.5 min | Title (plays while people join), our products, agenda |
| I · The Good | S04–S06 | ~3.5 min | Time back, user manuals |
| Poll | S07 | ~2 min | Anonymous poll; answers are read back later |
| II · The Bad | S08–S13 | ~6.5 min | The AI's quirks |
| III · The Ugly | S14–S22 | ~10 min | Our side of it |
| IV · Making It Count | S23–S28 | ~6.5 min | Role shift, raising the bar, plan-first, then the $25,000 teaser |
| V · How We Work | S29–S37 | ~12.5 min | The workflow centrepiece |
| Epilogue · The $25,000 lesson | S38–S41 | ~5.5 min | The story and the two hard lessons (no chapter number, so the reveal isn't spoiled) |
| Close | S42–S43 | ~1.5 min + Q&A | Share it, then questions |

The cut tiers in §5 can save about 6 more minutes if a rehearsal runs long.

**Story devices (each replaces something v1 had):**
- **The $25,000 open loop.** S28 shows the number with no explanation. S38 brings back the identical number in the identical position, then tells the story. This replaces v1's wrong-slide / doom-flip callback.
- **The workflow map.** S30 introduces 4 stations (Gather · Plan · Orchestrate · Remember). Each later V slide shows a small "you are here" mini-map in the same place.
- **The mascot** (the pink "meat" blob) is *the engineer, meaning me/us*. It is the recurring character (§4.6).
- **Visual rhymes, not shared elements.** Slides are separate components, so "carry-overs" are done by placing the same element at the same position, size and colour at the end of one slide and the start of the next.

---

## 3. Copy principles (apply to every slide; these come straight from the feedback)

1. **The slide shows; the presenter tells.** No captions that explain the slide, no meta labels, no "exhibit", "audience perspective", "spot the difference", "retrospective" or footers. If a line explains the joke or the point, delete it.
2. **Never blame the audience.** No "you/your" in anything negative. When something is bad, it's *me* or *we* (e.g. "context rot", never "context rot (yours)"). Imperatives are fine when they're advice ("Start fresh.").
3. **Word budget.** A headline is ≤ 8 words. Other on-screen copy is ≤ ~20 words per slide, excluding the *content* of a mock UI, code or terminal. Most slides should have far fewer.
4. **Real, not made up.** Quotes attributed to real companies must be real (§S09). Team numbers stay off screen, with one exception: **$25,000** (S28, S38, S39).
5. **Headlines** are sentence case and statements, with a full stop when they're a sentence.
6. **No humour on S02.** It's about pride in our products.

---

## 4. Global design system

### 4.1 Canvas: full bleed, no black bars (fixes "black bars top/bottom")

- The viewport is **edge to edge**: no black background, no padding, no bezel, no rounded frame, no drop shadow.
- Slides are composed on a fixed **1920 × 1080 design stage** (`data-testid="slide-stage"`). It is scaled uniformly to fit the window (`scale = min(vw/1920, vh/1080)`) and centred.
- The **outer viewport** (`data-testid="slide-viewport"`) takes the active slide's `canvas` background from the manifest, so colour always fills the full window on 16:9, 16:10 or any other window. The background colour animates between slides (≤ 400 ms).
- Slides whose visual must bleed (the S20 slop, chapter cards) set `canvas` in the manifest: a CSS background string, or an array indexed by `buildStep` (S20: purple gradient at build 0, `#FAFAFB` after). The default is `#FAFAFB`.
- All sizes inside slides are **design px at 1920 × 1080**. **No responsive breakpoint classes** (`sm:`, `md:`, `lg:`…) inside slides; they are what made text tiny.
- The presenter view's previews use the same stage component.

### 4.2 Colour

- Canvas `#FAFAFB` · ink `#111113` · secondary `#4A4A55` (nothing lighter for readable text) · InformatiQ blue `#1B7ED0` · mascot pink `#F6A6A4` (only with the blob).
- Act accents, for chapter cards, the corner dot and one focal highlight per slide:

| Act | Accent | Chapter card canvas (light) |
| --- | --- | --- |
| Opening / Close | `#1B7ED0` | none |
| I · The Good | green `#1E9E6A` | `#EEF7F2` |
| Poll | ink `#111113` | none |
| II · The Bad | amber `#D97706` | `#FBF3E8` |
| III · The Ugly | coral `#E5484D` | `#FCEFEF` |
| IV · Making It Count | teal `#0E7C86` | `#EBF5F6` |
| V · How We Work | blue `#1B7ED0` | `#EDF4FB` |
| Epilogue | ink `#111113` | none |

- **No purple** except where purple *is* the joke (S20, and S26 build 1).
- **No emoji characters** anywhere. Use drawn icons. The only allowed glyph is `✓` inside terminals.
- Teams compression: strokes ≥ 2 px, solid shapes, no hairlines. A soft gradient is OK only on large slow ambient shapes (S01) and in the slop jokes.

### 4.3 Typography (design px at 1920 × 1080)

| Role | Size | Weight / notes |
| --- | --- | --- |
| Display (hero number, chapter title, S01 title) | 160–240 | 800–900, tight tracking (−0.03em) |
| Headline | 88–112 | 800, leading 1.0–1.05 |
| Sub-headline / kicker | 44–56 | 500–600 |
| Body / labels inside visuals | 32–40 | 500–600 |
| Small label / caption | 26–28 | 500, secondary colour |
| Code / terminal / editor | 28–34 | SF Mono; mock windows should be large (≥ 60% of the stage width) |
| Corner badge | 24 | mono, 600 |
| Mock UI internals (tables, app chrome inside a mock) | ≥ 18 | wrapped in an element with `data-mock` |

- The audience must be able to read anything from the back of a Teams call: **nothing under 24 px outside `data-mock`**. `tools/snap.mjs` enforces this.
- Use a **clear hierarchy**: one dominant element per build. Not everything big.
- Add Tailwind tokens for this scale (`text-display`, `text-headline`, `text-sub`, `text-body`, `text-label`, `text-code`) and use them.
- Fonts: SF Pro Display / Inter for text, SF Mono for code.

### 4.4 Layout

- Safe area: 120 px left/right, 96 px top/bottom. The corner badge sits inside the top-right of the safe area.
- **Use the space.** Visuals are big; no tiny diagram floating in a sea of white (S02 and S15 feedback). Generous whitespace means *balanced*, not *empty*.
- No default card grids. Prefer diagrams, timelines, big single objects and metaphors.
- Nothing clipped, truncated (`…`) or overlapping, ever (S24 and S22 feedback). Labels must fit their containers at design size.

### 4.5 Motion (Apple WWDC / Google I/O feel)

- Easing `appleEase [0.16, 1, 0.3, 1]`. Springs `stiffness 280, damping 22`, overshoot ≤ 3%. Element motion 400–900 ms. Slide transition ≤ 500 ms.
- Every slide has **one** designed moment (a morph, a draw-on, a count-up, a reveal). Vary them: not the same fade-up everywhere.
- **Ambient loops** are allowed only on S01 (background), the typing bubbles (S12, S15), the mascot run (S19) and the keep-alive pulse (S40). They must be slow, non-distracting and low-contrast.
- Framer Motion `layout` / `layoutId` is for morphs *within* a slide (S15 dots → title, S20 slop → content, S26 grid states).
- Teams lag: viewers see changes 1–2 s late, so give reveals a beat of stillness.
- Import everything you use from `src/motion.js`. A missing import (`springPhysics`) crashed S06 in v1.

### 4.6 The mascot (`src/assets/meatproxy-emojis-svg/`)

The blob is *me / us, the engineer*. Use it at most once per slide, and animate it (bob, blink, run, wave) rather than leaving it static where it's the focal point.

| Slide | SVG | Moment |
| --- | --- | --- |
| S05 | `meat-cool` | time back |
| S06 | `meat-done` | reviewed and done |
| S13 | `meat-mindblown` or `meat-melt` | reading the 40-page theme architecture doc |
| S15 | `meat-coffee` | waiting |
| S19 | `meat-sweat` → `meat-melt` | running between the three corners, exhausted |
| S22 | `meat-proxy` → `meat-shrug` | the proxy |
| S24 | `meat-printer` or `meat-clerk` → `meat-think` | workhorse → decision maker |
| S25 | `meat-lurk` or `meat-eyes` | peeking over the fence |
| S31 | `meat-think` | being the user |
| S38 | `meat-rocket` | all in |
| S40 | `meat-coffee` | the coffee break that kills the cache |
| S43 | `meat-wave` | goodbye (animated wave) |

The SVG README lists all available poses. Inline the SVG, or wrap it in `motion`, to animate parts.

### 4.7 Shared building blocks (create once in `src/components/deck/`)

`Stage` (scaled 1920 × 1080) · `SlideFrame` (safe-area padding) · `Headline` / `Kicker` · `ChapterCard` (all five chapter cards) · `Mascot` (animated wrapper) · `TypingBubble` (three-dot indicator, any size) · `ChatTurn` (one consistent style for human and AI turns) · `CodeWindow` (editor or terminal chrome, large) · `WorkflowMiniMap` (V section). Slides use these instead of re-inventing them, so the deck stays consistent.

---

## 5. Slide manifest

`enabled` is on for all. **Cut A** = disable first, **B** = second. Corner shows `NN / name`, with NN the live position. "—" means no corner badge.

| ID | key | Headline (on screen) | Act | Corner | Min | Cut |
| --- | --- | --- | --- | --- | --- | --- |
| S01 | `title` | AI-Assisted Development: The Good, the Bad and the Ugly | Opening | — | 0:30 | — |
| S02 | `who-we-are` | We build software for the North Sea. | Opening | Who we are | 2:00 | — |
| S03 | `agenda` | Today's feature presentation. | Opening | Agenda | 0:45 | — |
| S04 | `act-good` | I · The Good | Good | — | 0:10 | — |
| S05 | `time-back` | We got our time back. | Good | Time back | 1:30 | — |
| S06 | `manuals` | Our user manuals write themselves. | Good | User manuals | 1:45 | — |
| S07 | `poll` | Be honest. It's anonymous. | Poll | Poll | 2:00 | — |
| S08 | `act-bad` | II · The Bad | Bad | — | 0:10 | — |
| S09 | `keynote-vs-terminal` | The keynote vs. my terminal. | Bad | Promises | 1:30 | — |
| S10 | `ninety-nine` | 99% of 70% of the time. | Bad | Reliability | 1:00 | — |
| S11 | `did-you-read` | Did you even read what I said? | Bad | Listening | 1:30 | B |
| S12 | `circle` | I asked for a circle. | Bad | The sweet spot | 1:30 | — |
| S13 | `overengineered` | Enterprise-grade dark mode. | Bad | Overengineering | 1:00 | A |
| S14 | `act-ugly` | III · The Ugly | Ugly | — | 0:10 | — |
| S15 | `thinking` | Doomscrolling… | Ugly | Waiting | 1:30 | — |
| S16 | `frameworks` | Proven. Thorough. Not cheap. | Ugly | Frameworks | 1:00 | B |
| S17 | `say-vs-do` | What we say vs. what we do. | Ugly | Say vs. do | 1:00 | A |
| S18 | `elephant` | The elephant in the room. | Ugly | Budget | 1:30 | — |
| S19 | `three-body` | The three-body problem. | Ugly | Pick two | 1:00 | A |
| S20 | `slop` | Everything is purple now. | Ugly | Slop | 1:15 | — |
| S21 | `make-no-mistakes` | Make it better. Make no mistakes. | Ugly | Prompting | 1:00 | — |
| S22 | `meat-proxy` | Don't be a meat proxy. | Ugly | Meat proxy | 1:30 | — |
| S23 | `act-count` | IV · Making It Count | Count | — | 0:10 | — |
| S24 | `role-shift` | The role shift. | Count | Role shift | 1:30 | — |
| S25 | `ticket-floor` | The ticket is the floor, not the ceiling. | Count | Raise the bar | 0:45 | B |
| S26 | `make-it-better` | Let's make it better. | Count | Make it better | 2:00 | — |
| S27 | `plan-hours` | Plan for hours. Let it run for hours. | Count | Plan first | 1:15 | — |
| S28 | `the-number` | $25,000 | Count | — | 0:20 | — |
| S29 | `act-how` | V · How We Work | How | — | 0:10 | — |
| S30 | `workflow-map` | How we work now. | How | The workflow | 1:30 | — |
| S31 | `gather` | The requirement is just the start. | How | Gather | 1:45 | — |
| S32 | `plan-together` | Plan with a co-worker. | How | Plan | 1:45 | — |
| S33 | `orchestrator` | One manager. Many fresh minds. | How | Orchestrate | 2:00 | — |
| S34 | `right-model` | Right model. Right effort. | How | Routing | 1:15 | B |
| S35 | `specialists` | Built for this feature. Then retired. | How | Specialists | 1:15 | — |
| S36 | `files-memory` | The files are the memory. | How | Remember | 1:45 | — |
| S37 | `code-context` | Code is the new context. | How | Context | 1:15 | — |
| S38 | `unlimited` | "It's unlimited." | Epilogue | The $25,000 lesson | 1:30 | — |
| S39 | `the-morning` | Access revoked. | Epilogue | The morning after | 1:15 | — |
| S40 | `cache` | Five minutes. | Epilogue | Lesson 1 | 1:30 | — |
| S41 | `fresh-sessions` | Start fresh. | Epilogue | Lesson 2 | 1:15 | — |
| S42 | `shared-repo` | Build it once. Share it with everyone. | Close | Share it | 1:15 | — |
| S43 | `thanks` | Questions? | Close | — | Q&A | — |

**Totals:** ~51 min of talk. **A** cuts save ~3 min. **B** cuts save ~4.5 min more. Q&A fills the remaining ~9 min.

### Component file mapping (old → new)

Batch 0 moves every v1 component into `src/slides/legacy/`, which is outside the registry glob, so it's kept as reference. Each new `src/slides/Sxx_Name.jsx` is then written from its legacy source, or from scratch. `legacy/` is deleted in the final batch.

| New | From legacy | New | From legacy |
| --- | --- | --- | --- |
| S01_Title | S01_Title | S23_ActCount | (ChapterCard) |
| S02_WhoWeAre | S02_WhoWeAre | S24_RoleShift | S26_RoleShift |
| S03_Agenda | S04_Agenda | S25_TicketFloor | S27_TicketFloor |
| S04_ActGood | (ChapterCard) | S26_MakeItBetter | S28_MakeItBetter |
| S05_TimeBack | S06_TimeBack | S27_PlanHours | S29_PlanHours |
| S06_Manuals | S07_Manuals | S28_TheNumber | new |
| S07_Poll | S09_Poll | S29_ActHowWeWork | (ChapterCard) |
| S08_ActBad | (ChapterCard) | S30_WorkflowMap | S31_MyLoop (ideas) |
| S09_KeynoteVsTerminal | S11_KeynoteVsTerminal | S31_Gather | new |
| S10_NinetyNine | S12_NinetyNine | S32_PlanTogether | S32_AskEverything (ideas) |
| S11_DidYouRead | S13_DidYouRead | S33_Orchestrator | S35_UnitLoop (ideas) |
| S12_Circle | S14_Circle | S34_RightModel | S34_TheTeam, S40_Routing |
| S13_Overengineered | S15_Overengineered | S35_Specialists | new |
| S14_ActUgly | (ChapterCard) | S36_FilesMemory | S33_FilesMemory |
| S15_Thinking | S18_Thinking | S37_CodeContext | new |
| S16_Frameworks | S19_Frameworks | S38_Unlimited | S37_HardWay (ideas) |
| S17_SayVsDo | S20_SayVsDo | S39_TheMorning | new |
| S18_Elephant | S21_Elephant | S40_Cache | S39_Stateless (ideas) |
| S19_ThreeBody | S22_PickTwo | S41_FreshSessions | S39_Stateless (ideas) |
| S20_Slop | S23_Slop | S42_SharedRepo | S41_SharedRepo |
| S21_MakeNoMistakes | S16_MakeNoMistakes | S43_Thanks | S43_Thanks |
| S22_MeatProxy | S24_MeatProxy | | |

**Dropped entirely:** S03_WrongSlide, S08_First80, S30_RightSize, S36_DontTrust, S38_Receipts, S40_Routing (its ideas go into S34), S42_DoomFlip. Every reference to the wrong-slide gag, the doom flip, the eraser and "camera on, brain optional" goes too.

---

## 6. The slides

Each slide has: **Idea** (the one thing), **On screen** (the only copy), **Visual**, **Builds**. Global rules (§3, §4) always apply; they aren't repeated here.

### Opening

#### S01 · `title`
- **Idea:** the opening frame. People look at it while everyone joins, so it should feel alive.
- **On screen:** eyebrow "AI-Assisted Development", then the title "The Good, the Bad and the Ugly", then "Rokibul Islam · InformatiQ team". The BS23 logo is small at bottom-left. No other footer text.
- **Visual:**
  - **Tight lockup.** The eyebrow sits directly above the title (≈ 24–32 px gap; v1 had a huge gap).
  - **Title** at display size over two lines. "Good", "Bad" and "Ugly" are set in their act colours (solid, not gradient).
  - **Ambient art** on the right ~45% of the stage, slowly morphing infinitely (20–30 s cycles). It is a composition of three soft organic shapes:
    - green, smooth and round ("good");
    - amber, slightly jagged and glitchy, with an occasional subtle pixel-shift ("bad");
    - coral, lumpy, a little melted ("ugly").
  - The shapes drift and overlap gently. Low contrast, never distracting, survives Teams compression (large shapes, slow motion).
- **Builds:** 0 only. The title draws in once on entry; the ambient art loops forever.

#### S02 · `who-we-are`
- **Idea:** pride. These are the products our isolated team built. The audience doesn't know them.
- **On screen:** headline "We build software for the North Sea." plus, per product, the logo, the name and one short descriptor. Nothing humorous. No stakes line.
- **Order (exact):** WellMate · WellBook · GeologiQ · Offset Analyzer · LogistiQ · Event Analyzer · AnalytiQ · Portal.
- **Descriptors** (from v1; flagged in `missing-pieces.md` for the presenter to confirm): WellMate *Drilling telemetry* · WellBook *Well operations* · GeologiQ *Subsurface models* · Offset Analyzer *Offset benchmark* · LogistiQ *Offshore logistics* · Event Analyzer *Incident analysis* · AnalytiQ *Analytics engine* · Portal *Unified portal* (Portal uses `informatiq.svg`).
- **Visual:**
  - **The spotlight.** Each click brings the next product into a big centre spotlight: logo ≥ 280 px wide, name at sub-headline size, descriptor below.
  - **The tray.** As the next product arrives, the previous one glides (layout animation) into an organised **4 × 2 tray** that fills the lower half of the stage. Logos in the tray are still large (≥ 140 px), name underneath.
  - **Final build:** the spotlight clears and the full tray settles centred and enlarged to use the whole slide.
  - **Background:** a very subtle horizon line, with the offshore rig line-art small at the far right edge of the horizon.
  - Logos must render crisp and large. The logo SVGs have wide aspect ratios, so size by height/width box, not by square tiles.
- **Builds:** 0: headline and horizon. 1–8: one product each. 9: all eight settle into the final arrangement. (`totalBuilds: 9`)

#### S03 · `agenda`
- **Idea:** where we're going. The workflow chapter is the big one.
- **On screen:** headline, then five chapters: "The Good · The Bad · The Ugly · Making It Count · How We Work". No poll announcement. The epilogue is **not** listed.
- **Visual:** a horizontal **film-strip / timeline** spanning the stage. Each chapter is a segment whose **width is proportional to its time**, in its act colour, with its roman numeral and name in large type. The Making It Count and How We Work segments are visibly the longest.
- **Builds:** 0: headline and empty strip track. 1: the segments slide in left to right in sequence (one build, staggered). 2: the "V · How We Work" segment lifts and brightens a little; the presenter says "most of our time goes here". (`totalBuilds: 2`)

### I · The Good

#### S04 · `act-good`, S08 · `act-bad`, S14 · `act-ugly`, S23 · `act-count`, S29 · `act-how` (chapter cards)
- **Shared `ChapterCard` component.** Full-bleed **light** tinted canvas (§4.2), not dark.
- **Content:** a huge roman numeral in the act accent (display size, ~240 px), and the chapter name in ink at display size. Nothing else: no kicker, no subtitle, no "InformatiQ Engineering · Retrospective".
- **Motion:** the numeral and name arrive with one confident move (e.g. the numeral slides up and the name wipes in). A single large, slow, quiet motif in the accent colour fills the background: for example one big soft shape that drifts, distinct per act and matching the S01 shape for Good/Bad/Ugly. No letterbox bars.
- **Builds:** 0.

#### S05 · `time-back`
- **Idea:** AI gave us real hours back.
- Keep v1's content and idea (the week calendar, chores collapsing to minutes) and apply the global rules: bigger type, fill the stage, no meta text. Use `meat-cool`.
- **Builds:** as v1 (verify `totalBuilds` against the component).

#### S06 · `manuals`
- **Idea:** our user manuals are now generated (captured, annotated, written), and a human reviews them.
- Keep v1's content and idea, **fix the crash** (`springPhysics` not imported), and apply the global rules: bigger, less text. Use `meat-done`.
- **Builds:** as v1.

#### S07 · `poll`
- Keep v1 (the QR code and link, `POLL_URL` placeholder). **Remove "camera on, brain optional"** and any other jokey caption. Bigger QR. The headline and the QR are the slide.
- **Builds:** as v1.

### II · The Bad

#### S09 · `keynote-vs-terminal`
- **Idea:** the gap between real promises and my real terminal.
- **Visual:** a split.
  - **Left: "the keynote".** A dark stage-like panel showing **three real, attributable public claims** in big quote type, each with a small source line (company and product, year). Use claims the vendors really made. Verify each one (WebFetch the official announcement if available) and record the URL in `missing-pieces.md` under "Facts". Candidates to verify:
    - Anthropic, Claude Opus 4 launch (May 2025): "the world's best coding model", and that it can "work continuously for several hours".
    - OpenAI, Codex launch (May 2025): "a cloud-based software engineering agent that can work on many tasks in parallel".
    - Cognition, Devin (Mar 2024): "the first AI software engineer".

    If a quote can't be verified, paraphrase it without quotation marks and say so in the log. **Never invent a quote.**
  - **Right: "my terminal".** A large `CodeWindow` playing out one stack-agnostic, everyday failure:
    - me: `Add a confirmation before deleting a well.`
    - AI: `Done ✓ Added a confirmation dialog.`
    - Then a tiny mock: clicking **Delete** shows a toast "Well deleted." *and then* the dialog "Are you sure you want to delete this well?" pops up.

    The confirmation exists. It just comes after the deletion.
- **On screen:** headline plus the two panels. No commentary.
- **Builds:** 0: headline and the keynote panel with the first claim. 1: claims two and three. 2: the terminal types the request and the reply. 3: the mock plays: delete → toast → the late dialog. (`totalBuilds: 3`)

#### S10 · `ninety-nine`
- **Idea:** it's 99% right… 70% of the time.
- **On screen:** "99%", then "of 70% of the time." No other copy.
- **Visual (more engaging than v1):**
  - **Build 0:** a giant **99%** counts up quickly at display size (~240 px) inside a confident ring gauge that fills almost all the way round.
  - **Build 1:** the ring **splits**. 30% of it detaches and drops away greyed and cracked. The text **"of 70% of the time."** slides in beneath, and the 99% shrinks a little and shifts left to make room. Optional: a grid of 100 small dots, where 70 light up, then 99% of those stay lit.
  - Pick one visual and do it well.
- **Builds:** 0, 1. (`totalBuilds: 1`)

#### S11 · `did-you-read`
- **Idea:** it follows the instruction *and* adds things nobody asked for, sometimes things that go against the request.
- **Visual:** one **large editor / terminal window** (≥ 75% of the stage width, code ≥ 28 px) with two scenarios played one at a time in the same window.
- **Scenario 1 (follows it, and drifts the other way):**
  - me: `Fix the date format in the wells table. Don't touch the API.`
  - The diff shows the table date format fixed ✓, plus `api/wells.ts` changed: "also normalized dates in the API for consistency".
- **Scenario 2 (button colour, merged with the comments gag):**
  - The project rule is pinned at the top of the window: `CLAUDE.md: Keep comments minimal.`
  - me: `Make the Save button blue.`
  - The diff shows:
    - a new design token `--color-action-primary-blue-500`;
    - a new `ButtonVariant` type;
    - the **Submit** and **Cancel** buttons changed too;
    - a JSDoc block on every touched function.
  - me: `Remove the comments.`
  - The diff removes them all and adds exactly one line: `// removed all comments`.
- **Closing line (keep):** "Technically correct. The best kind of correct." **Remove** "green checks don't mean working software" and any similar extra lines.
- **Builds:** 0: headline. 1: scenario 1 prompt and diff. 2: scenario 2 prompt and diff. 3: "remove the comments" and `// removed all comments`. 4: the closing line. (`totalBuilds: 4`)

#### S12 · `circle`
- **Idea:** a **metaphor**. For anything that needs system design or architectural judgement, the AI overshoots, undershoots or builds something else. It rarely hits the sweet spot, and once it's on the wrong track it's very hard to bring back. (The notes cover the fix: sometimes you throw away the whole session.)
- **On screen:** headline "I asked for a circle." and the chat. A small sub-line makes the metaphor explicit: "(Read: a simple architecture.)"
- **Visual:** a chat column on the left and a large drawing canvas on the right. **Every AI turn uses the same `ChatTurn` style**, never mixed card colours. Before each AI reply, a `TypingBubble` shows for ~900 ms. The AI replies, in order:
  1. "Perfect! Here's your circle." → draws a **rectangle**.
  2. me: "That's a rectangle." → "You're absolutely right, my apologies!" → draws a **trapezium**.
  3. me: "Just a circle." → "You're right to push back." → draws a circle covered in extra bolted-on shapes (overshoot), *or* a tiny dot (undershoot). Pick the funnier one.
- **Final build:** a target / dartboard replaces the canvas, with the three attempts landing around the bull, never in it. Each correction lands *further* from the centre.
- **Builds:** 0: headline and prompt. 1–3: the three exchanges. 4: the target. (`totalBuilds: 4`)

#### S13 · `overengineered`
- **Idea:** asked for a dark-mode toggle, got an architecture. The punchline is the documentation it wrote.
- **On screen:** headline "Enterprise-grade dark mode." Prompt: `Add a dark mode toggle.`
- **Visual:**
  1. The file tree **explodes** outward: `ThemeProvider.tsx`, `ThemeContext.ts`, `useTheme.ts`, `ThemeRegistry.ts`, `tokens/dark.ts`, `tokens/light.ts`, `ThemeToggle.stories.tsx`…
  2. Then the punchline: a document `THEME_ARCHITECTURE.md` slides in and **auto-scrolls** through an absurdly long table of contents (e.g. "1. Philosophy of Darkness", "4.3 Theme Lifecycle Hooks", "9. Migration Strategy (v1 → v2)"), with a page counter ticking up to "page 1 of 40".
  3. The mascot (`meat-mindblown` or `meat-melt`) reacts beside it.
- **Builds:** 0: prompt. 1: the file explosion. 2: the doc and the mascot. (`totalBuilds: 2`)

### III · The Ugly

#### S15 · `thinking`
- **Idea:** we wait for the agent, and we doomscroll.
- **Build 0:** **nothing on the slide** except one **huge** chat typing bubble (three dots, messaging-app style, ~360 px wide) in the dead centre, gently pulsing. No title, no corner badge.
- **Build 1:** the bubble **morphs** (`layoutId`) smoothly into the headline "Doomscrolling…", and v1's content follows at the new, much bigger size: the spiky focus line, the phone/feed motif and `meat-coffee`. Use the space.
- **Later builds:** as v1, enlarged. Drop any "(yours)" caption ("context rot", no owner).
- **Builds:** v1 count + 1.

#### S16 · `frameworks`
- Keep v1's idea and content: Spec Kit, AI-DLC, BMAD, OpenSpec are proven, thorough and not cheap, shown as a balance. Apply the global rules (bigger, less text). Treat the frameworks with respect.

#### S17 · `say-vs-do`
- Keep v1's idea. Make the two columns **much larger and more prominent**: big type, well spaced, readable from far away. Remove any small print and the "camera on, brain optional" mascot caption.

#### S18 · `elephant`
- **Idea:** because of budget limits, we cut corners. We one-shot, and we skip review, documentation and QA.
- **On screen:** headline "The elephant in the room." Stage labels only.
- **Visual:**
  - **No elephant drawing** (the v1 one was ugly). If an elephant appears at all, it's a tiny, tasteful line-icon next to the headline.
  - The slide is a **pipeline**: a full horizontal lane of stages: Plan · Spec · Implement · Review · Test · Docs · QA.
  - Above it, a budget meter (no numbers) **drains**.
  - With each click a stage is **snipped out** (a scissor cut, then the lane closes the gap), until only "Implement" is left. A stamp lands on it: "One shot."
- **Builds:** 0: the full pipeline and full meter. 1: Review and Docs cut. 2: Spec, Test and QA cut. 3: the "One shot." stamp. (`totalBuilds: 3`)

#### S19 · `three-body`
- **Idea:** framework/process, budget and on-time delivery pull against each other. The slide doesn't explain it; the presenter does.
- **On screen:** headline "The three-body problem." Corner labels: "The framework", "The budget", "On time".
- **Visual:**
  - A big triangle fills the stage.
  - The mascot **runs** from corner to corner. Whichever corner it reaches lights up while the other two dim and wobble.
  - It gets visibly more exhausted each lap: speed drops, `meat-sweat`, then `meat-melt` collapsing in the middle.
- **Builds:** 0: the triangle. 1: the run starts (it loops on its own). 2: the collapse. (`totalBuilds: 2`)

#### S20 · `slop`
- **Idea:** AI's default taste is everywhere, and it's purple.
- **Build 0 (the slide *is* slop):** the full-bleed canvas is a purple / violet gradient (manifest `canvas` set for this slide). It's filled with glassmorphism cards, drawn sparkle icons, gradient text "Revolutionize Your Workflow", rainbow pills, "AI-powered" badges and a floating "Ask AI" bubble, plus a few gently twinkling sparkles. Pure 2024 AI-landing-page energy.
- **Build 1:** everything **shrinks and morphs** into the clean slide: the canvas returns to `#FAFAFB` and the headline "Everything is purple now." lands. A small framed thumbnail of the slop remains as evidence.
- **Build 2:** the principle line: **"AI should follow our principles, not its defaults."** Fix the broken animation from v1: it must animate in once, cleanly.
- **Remove:** "Spot the difference" and "Exhibit A: the first AI draft of the deck".
- **Builds:** 0, 1, 2. (`totalBuilds: 2`)

#### S21 · `make-no-mistakes` (moved from The Bad)
- **Idea:** it's on us. Lazy, escalating prompts instead of clear ones. (The AI isn't perfect and won't be soon; the fix is how we ask.)
- Keep v1's kinetic escalation: "make it better" → "Make it better. Make no mistakes." → "MAKE. NO. MISTAKES." Frame it as *our* habit: the prompts come from "me". Apply the global rules.

#### S22 · `meat-proxy`
- **Idea:** passing messages between client and model without thinking.
- **Visual:**
  - The client → me (blob) → AI pipe, as in v1.
  - The proxy's "thoughts" appear **one by one as a commit-log list** (`git log --oneline` style, short hash plus message), stacking downward beside the blob, **never overlapping**. For example: `a1f3c2 forward client email to AI` · `b7e9d1 paste AI answer to client` · `c4d2a8 forward client reply to AI` · `d9b6e3 ask AI what the client meant` · …
  - The list **stops at** `e2c1f7 who is JSON?`.
  - Then the blob swaps to `meat-shrug` with "The model said so."
- **Builds:** 0: the pipe. 1–4: one log line each, ending on "who is JSON?". 5: the shrug. Labels can't overlap the blob or each other (v1 had overlapping chips). (`totalBuilds: 5`)

### IV · Making It Count

#### S24 · `role-shift`
- **Idea:** we never coded all day (four hours on a good day). Now the coding part is largely solved, and the role has shifted: from the engineer who implements everything by hand to product owner, project manager and decision maker.
- **On screen:** headline "The role shift." with the small sub "(no raise included)" (keep). Segment labels only.
- **Visual:**
  - A single **day bar** (8 h) that fills the width, labels **inside or above** each segment and always fully readable (v1 truncated them, see feedback image s26).
  - **Before:** Coding ~4 h · Meetings · Debugging · Reviews · Thinking.
  - **Now:** the Coding segment shrinks to a sliver labelled "AI". Planning · Designing · Evaluating · Deciding grow into the freed time.
  - Then the identity swap. Beside the bar, the mascot changes from workhorse (`meat-printer` or `meat-clerk`) to `meat-think`. Its title tag flips from "Engineer: writes the code" to "Product owner · Project manager · Decision maker".
- **Builds:** 0: the before bar. 1: the morph to now. 2: the identity swap. (`totalBuilds: 2`)

#### S25 · `ticket-floor`
- **Idea:** with the time back, look over the fence: competitors, best practices, great products.
- **On screen:** headline and one line: "Look over the fence." Remove v1's two idea-chip builds and the "reclaimed focus" card.
- **Visual:**
  - A ticket card sits on a "floor" line at the bottom-left.
  - A long picket fence is drawn across the stage. The mascot (`meat-lurk` / `meat-eyes`) climbs up and peeks over it.
  - Beyond the fence, three or four beautiful abstract "great product" silhouettes rise into view (polished UI shapes, no brand logos).
- **Builds:** 0: the ticket on the floor and the headline. 1: the fence, the peek and what's beyond, plus the line. (`totalBuilds: 1`)

#### S26 · `make-it-better`
- **Idea:** with the heavy lifting delegated, we can deliver thoughtful UX that wasn't affordable before. It's not about more features; it's balance.
- **Component:** one wellbore data grid with fake data ("Wellbore A-12", "Demo North"…). Every state shares the same layout box, so the change reads as *the same component evolving*. Wrap mock internals in `data-mock`.
- **Build 0, "Before AI":**
  - A simple, respectable table: a **search bar**, **sort icons** on the headers, plain borders and basic pagination.
  - It worked and served its purpose. Not deliberately bare.
  - No label mocking it.
- **Build 1, the slop joke (unlabelled):**
  - Purple gradient header, glass rows, an icon on every column, rainbow status pills, sparkles, a floating "Ask AI" bubble.
  - **No text saying it's bad.** Instead, a large, earnest question to the audience: **"Beautiful, isn't it?"**
  - The presenter reveals the joke.
- **Build 2, "With AI, done right":**
  - A calm, refined grid: search and filter chips, a compact/comfortable density toggle, and a brief **skeleton loading** state on entry (~600 ms).
  - **Colour only where it means something:** status (e.g. a muted green/amber/red dot for well status) and one highlighted out-of-range value. No decorative colour.
  - **The hero detail:** a long-text "Remarks" column truncates neatly. Build 2 also auto-hovers one cell (an animated cursor moves in), and a **popover** opens smoothly with the full text, fluid and rich but not distracting.
- **Remove entirely:** the eraser / "sweeping the slop away" build; "Same ticket. Same deadline."; "(InformatiQ design system)"; "100% WCAG"; "Before: bounded by hours…"; every explanatory label.
- **Builds:** 0, 1, 2. (`totalBuilds: 2`)

#### S27 · `plan-hours`
- **Idea:** plan deeply in one focused block, then let agents execute for hours.
- **Visual:** a clear **two-lane day timeline**, labelled "Me" and "Agents", with a time axis from 09:00 to 18:00 and a sun or clock indicator moving along it.
  - **Build 0:** S15's spiky, interrupted focus line (prompt, wait, scroll, prompt…) in the "Me" lane. It reads as chaos.
  - **Build 1:** the line **morphs** into one long solid block, "Plan · ~3 h". The "Agents" lane then fills with a long "Execute" band that starts where the plan ends and runs past 18:00 (an arrow off the edge: "overnight"). Small unit ticks complete along it.
  - **Build 2:** the "Me" lane fills with smaller blocks during execution: "Review", "Next plan", "Client". The point: I'm free while it runs.
- **On screen:** headline. Lane labels. Block labels (1–2 words each). **No "(yours)"** anywhere.
- **Builds:** 0, 1, 2. (`totalBuilds: 2`)

#### S28 · `the-number` (teaser)
- **On screen:** only **$25,000**, centred, display size (~240 px), ink. No headline, no badge, no mascot. A very slow, subtle breathing of letter-spacing or opacity at most. The presenter says "hold on to that number".
- **Exact geometry:** record the number's font, size, weight and position in `important-notes.md`. S38 starts with the identical number in the identical position.
- **Builds:** 0.

### V · How We Work

> Every content slide in this chapter shows the `WorkflowMiniMap` in the same spot (top-left, inside the safe area, small, about 520 × 56 px). It has 4 stations, Gather · Plan · Orchestrate · Remember, with the current station highlighted. S30 introduces the full-size map; S37 shows all stations done.

#### S30 · `workflow-map`
- **Idea:** we design a custom workflow per complex feature or module, or for a bundle of smaller features planned together. Two halves: I'm in the room for the first, agents run the second.
- **On screen:** headline "How we work now." 4 station names. Two zone labels: "With me" / "Without me".
- **Visual:**
  - A large path draws across the stage, connecting 4 big stations, each with a drawn icon:
    - **Gather** (magnifier / sources)
    - **Plan** (document)
    - **Orchestrate** (conductor node with branches)
    - **Remember** (files)
  - A soft zone behind Gather and Plan is labelled "With me", with the mascot `meat-think` small. A zone behind Orchestrate and Remember is labelled "Without me".
  - A small loop arrow from Remember back to the start: next feature.
- **Builds:** 0: headline. 1: Gather and Plan with the "With me" zone. 2: Orchestrate and Remember with the "Without me" zone. 3: the loop arrow. Then the map shrinks toward the mini-map position (a visual rhyme for S31). (`totalBuilds: 3`)

#### S31 · `gather`
- **Idea:** the client's requirement is only the start. As the engineer, I gather the rest: have we solved this in another project, how did the big players solve it, that blog post, the assets we already have. Then I become the user: who uses this, what would I look for first, what comes next, would *I* be happy with this requirement? Then I compose it into one brief. This is where ownership and expertise show.
- **On screen:** headline "The requirement is just the start." Source labels (1–3 words each).
- **Visual:**
  - The client's ticket sits small in the centre.
  - Sources orbit in from around the stage, one per click: "Past projects" · "How others solved it" · "That blog post" · "Our existing assets".
  - Then the mascot (`meat-think`) steps into a "user's shoes" frame with three quick thought bubbles: "Who uses this?" · "What do I need first?" · "What comes next?"
  - Finally every source and thought **flows into** the ticket, which grows into a rich "Brief" document.
- **Builds:** 0: the ticket. 1: the four sources. 2: be the user. 3: the composition into the brief. (`totalBuilds: 3`)

#### S32 · `plan-together`
- **Idea:** I bring the requirements and how I'd implement them. The AI is a co-worker that attacks the plan from every angle and asks every decision it can foresee, and I decide, because I hold the context. The output is a unit-by-unit plan, and each unit carries everything its agent needs.
- **On screen:** headline "Plan with a co-worker." Short question bubbles. Unit anatomy labels.
- **Visual:**
  - **Build 1, the attack:** the brief from S31 sits in the centre. AI question bubbles arrive from different directions, with small arrows hitting the brief: "Zero results?" · "Offline?" · "Which users first?" · "How do we verify it?" · "Mobile?"
  - **Build 2, my answers:** answer chips from "me" snap onto each question, and each pair stamps into the document.
  - **Build 3, the plan:** the document splits into a **stack of unit cards**. One unit card expands to show its anatomy as six labelled bands: **Rules · Context (short) · Task · Tests · Verify · Agent rules**.
- **Builds:** 0: headline and the brief. 1–3 as above. (`totalBuilds: 3`)

#### S33 · `orchestrator`
- **Idea:** the main session only orchestrates, like a project manager: it delegates and checks. The workers are fresh agents, and each gets *only* the context it needs. The codebase, conventions and rules are explored once, then sliced and handed out. Nobody re-explores, contexts stay short, and fresh agents stay cheap.
- **On screen:** headline "One manager. Many fresh minds." Agent role labels. Two tiny meter labels: "Explore once" / "Explore every time".
- **Visual:**
  - **Build 1, explore once:** a single scan beam sweeps a codebase block and produces a "context pack": a deck of cards labelled Conventions · Design rules · Domain · Tests.
  - **Build 2, deal:** the orchestrator node at the top deals **specific cards** to fresh agent nodes below: Designer (gets Design rules + Domain), Implementer (Conventions + Domain), Reviewer (Conventions + Tests), Tester (Tests). Each agent glows "fresh".
  - **Build 3, the contrast:** a compact side-by-side of two token meters, with no numbers. "Explore every time": four scan beams, a tall bar. "Explore once": one beam, a short bar.
- **Builds:** 0: headline, orchestrator and codebase. 1–3 as above. (`totalBuilds: 3`)

#### S34 · `right-model`
- **Idea:** match the model and the effort level to the job. The most capable model plans, decides, designs and reviews. A mid model implements and writes tests. A small model runs fully scripted chores (Playwright scripts, batched commits, cleaning up comments and debris) from instructions that can't be misread.
- **On screen:** headline "Right model. Right effort." Tier labels and jobs.
- **Visual:**
  - Three horizontal tiers, like mixing-desk channels, not cards:
    - **Opus**: Plan · Decide · Design · Review
    - **Sonnet**: Implement · Unit tests
    - **Haiku**: Run scripts · Commit · Clean up
  - Each tier has an **effort slider** that animates to a different setting per task (e.g. Sonnet's slider moves from "medium" to "high" as a "complex feature" chip arrives).
- **Builds:** 0: Opus tier. 1: Sonnet tier. 2: Haiku tier. 3: the effort sliders move. (`totalBuilds: 3`)

#### S35 · `specialists`
- **Idea:** we used to use general-purpose agents (a code reviewer, a UI designer, a backend expert). Their instructions grew and grew, and the results were mediocre. Now we generate specialised, temporary agents for one complex feature from our own workflow repo, which holds how we design them. Results are sharper and cheaper. When the feature ships, the agents retire.
- **On screen:** headline "Built for this feature. Then retired." Minimal labels.
- **Visual:**
  - **Build 0, general purpose:** one generic agent node whose instruction document **grows taller and taller** (lines piling up past the top of the stage) while a small output-quality gauge sits at "meh".
  - **Build 1, specialists:** a template from the "Workflow repo" stamps out three small, sharp agents with feature-specific names (`grid-designer`, `grid-implementer`, `grid-reviewer`). Their documents are short, and the quality gauge rises.
  - **Build 2, retired:** a "Feature shipped ✓" check lands. The three agents fade into the repo, and the template stays.
- **Builds:** 0, 1, 2. (`totalBuilds: 2`)

#### S36 · `files-memory`
- **Idea:** we never rely on the chat or the harness's to-do list for progress. Files hold the state, so a session can die (even my laptop) and the next one resumes exactly where it stopped.
- **The files:**
  - `progress.md`: unit by unit.
  - `decisions.md`: the calls agents made mid-run, for me to check.
  - `notes.md`: the living memory for the next fresh agent; ~90% of it is disposable after the feature.
  - `review-log.md`: non-severe findings parked for a human glance, because a reviewer *always* finds something.
- **On screen:** headline "The files are the memory." File names and 2–4 word purposes.
- **Visual:**
  - **Build 1, the laptop dies:** a session runs (units ticking `[x]`), then the laptop screen goes black (battery icon empties).
  - **Build 2, resume:** a new session node lights up, reads `progress.md` and resumes at **unit 7** exactly. The `[~]` becomes `[x]` and it continues.
  - **Build 3, the folder:** the four files fan out, each with its purpose. `notes.md` shows a small "90% disposable" fade effect after a "feature shipped" tick.
- **Builds:** 0: headline and the running session. 1–3 as above. (`totalBuilds: 3`)

#### S37 · `code-context`
- **Idea:** we save fewer of the markdown files we generate. Documentation that mirrors code drifts out of sync, which is debt. Newer models read well-designed code very well. We keep only product context, the complex-feature notes, decision records and a small memory bank for things that go against convention. Write better code with less context-as-text.
- **On screen:** headline "Code is the new context." Kicker: "Better code. Fewer docs."
- **Visual:**
  - **Build 0:** a tall stack of markdown docs beside a code block. Red "out of sync" diff marks appear between them.
  - **Build 1:** the stack **collapses**: most docs dissolve. Three thin ones remain, labelled Product context · Decision records · Memory bank. The code block grows cleaner and larger and becomes the centre.
  - **Build 2:** the mini-map shows all four stations complete, and the kicker lands.
- **Builds:** 0, 1, 2. (`totalBuilds: 2`)

### Epilogue · The $25,000 lesson

> No chapter card (so nothing spoils it). Corner dot in ink. The tone is storytelling: big, simple visuals and very few words. **No budget figures on screen**; the presenter tells those. Only $25,000 appears.

#### S38 · `unlimited`
- **Build 0:** **$25,000**, identical to S28: same position, size and weight. The presenter: "Remember this number?"
- **Build 1:** the number slides up and shrinks out of the way. The headline **"It's unlimited."** lands with a large drawn **∞** that draws itself on. Small "from → to" marks: "GitHub Copilot → Claude Code".
- **Build 2, all in:** the ∞ gives way to a **sketchy wireframe** (rough, hand-drawn-looking prototype) that morphs into a **polished app** silhouette, with a "1 month" label. `meat-rocket`.
- **Builds:** 0, 1, 2. (`totalBuilds: 2`)

#### S39 · `the-morning`
- **On screen:** headline "Access revoked."
- **Build 0:** a terminal: `claude` → `Error: access denied for this account`. In a corner, a mail icon with an unread badge: "Usage warning" (the missed email).
- **Build 1:** a leaderboard titled "Top 10 users". The rows are anonymous bars. One row slides up and highlights: **"me · $25,000"**. This is the only place the full number is tied to me.
- **Build 2:** the ∞ from S38 snaps into a small gauge with a needle. No numbers, no budget figures. The presenter tells the new-reality part (soft budget, actual usage, the salary joke).
- **Builds:** 0, 1, 2. (`totalBuilds: 2`)

#### S40 · `cache`
- **Idea:** lesson 1. Our enterprise setup has a 5-minute prompt-cache TTL. Let it expire (a coffee break) and the next tiny message re-processes the whole 100K context. The fix in our workflow: the main session pings every 4:50 to keep the cache warm while sub-agents work.
- **On screen:** headline "Five minutes." Labels: "5:00", "4:50" and "cached" / "re-cached". No dollar figures.
- **Visual:**
  - **Build 0:** a big context block (a stack labelled "100K context") with a circular **5:00 countdown ring**, glowing "cached".
  - **Build 1:** `meat-coffee` walks off. The ring runs out. Then a tiny message "ok, continue" is sent, and the **entire** block flashes and is re-processed: a heavy animated sweep through all of it.
  - **Build 2, the fix:** a heartbeat pulse every **4:50** keeps the ring topped up. Sub-agent nodes work below while the main block stays "cached".
- **Builds:** 0, 1, 2. (`totalBuilds: 2`)

#### S41 · `fresh-sessions`
- **Idea:** lesson 2. Don't blindly resume yesterday's session. It may be compacted (repeatedly), and the details quietly drop out. Ask for a handoff document, then start a fresh session with it.
- **On screen:** headline "Start fresh." Labels: "Yesterday", "Compacted", "Handoff", "Fresh session".
- **Visual:**
  - **Build 0:** yesterday's long conversation stack.
  - **Build 1:** it gets **squeezed** (compaction) once, then again. Little detail blocks fall out and fade ("the decision from turn 40", "the edge case"). It looks smaller but holes are visible.
  - **Build 2:** a neat **handoff doc** (Decisions · Status · Files · Next) is carried into a **fresh**, clean, small session that lights up.
- **Builds:** 0, 1, 2. (`totalBuilds: 2`)
- The presenter closes with: "That's why the workflow looks the way it does." It's spoken; there's no slide for it.

### Close

#### S42 · `shared-repo`
- **Idea:** our team culture is to build, version and centralise our own agents, plugins, skills and workflows. In this era, reusable code isn't enough; we need reusable AI engineering, across sub-teams and projects. Brain Station 23 could do this company-wide.
- **On screen:** headline "Build it once. Share it with everyone." Item labels: "Agents · Skills · Plugins · Workflows". One kicker on the final build: "Reusable code → reusable AI engineering."
- **Visual:**
  - **Build 0:** a central "Team AI repo" node with version tags (`v1.4`, `v2.0`) on its items.
  - **Build 1:** items flow out along spokes to several project / sub-team nodes.
  - **Build 2:** the whole picture shrinks into one of many similar hubs across a wider "company" field, connected. Then the kicker lands.
- **No** Teams handle, no repo name, no "ask me".
- **Builds:** 0, 1, 2. (`totalBuilds: 2`)

#### S43 · `thanks`
- **On screen:** "Questions?" (display size), then "(Humans only.)" (keep), then one warm, funny closing line: **"Session ended. Cache kept warm for 4:50."** It pays off S40. If the implementer finds a better callback, log it in `decisions.md`.
- **Visual:** a big, animated `meat-wave` (the arm/body waves; a gentle loop is allowed) as the hero. A clean full-bleed canvas.
- **Remove:** the "Brain Station 23 / InformatiQ Norway" footer, "InformatiQ Tech Talk", "See you at the after party", the mascot caption, and the GitHub and Teams links.
- **Builds:** 0.

---

## 7. Calls made during planning (check these when you review)

1. **Slide IDs renumbered to S01–S43.** v1 components move to `src/slides/legacy/` as reference and are deleted at the end.
2. **Act IV is "Making It Count"** and gets teal `#0E7C86`, so that V · How We Work can own InformatiQ blue.
3. **The epilogue has no chapter card and isn't on the agenda**, to protect the $25,000 reveal.
4. **$25,000 is the only team number on screen.** The budget, usage and salary joke are spoken.
5. **S09 uses real vendor claims, verified with sources**, or unattributed paraphrases if a claim can't be verified.
6. **S09's terminal example:** a delete confirmation that appears *after* the delete. It's stack-agnostic.
7. **S12's sub-line "(Read: a simple architecture.)"** makes the metaphor explicit.
8. **S13's headline is now "Enterprise-grade dark mode."** It matches the dark-mode joke better than "hello world".
9. **S02's headline is shortened to "We build software for the North Sea."**, and the stakes line is removed (no humour on S02).
10. **The workflow is 4 stations** (Gather · Plan · Orchestrate · Remember). Right-model and specialists live under Orchestrate; code-is-context closes the chapter.
11. **S43's closing line is "Session ended. Cache kept warm for 4:50."**
12. **Chapter cards are light and tinted, and share one component.** The S01 shapes are reused as per-act motifs.
13. **Shared-element "magic moves" across slides** are done as visual rhymes (same element, same geometry), because slides are separate components.
14. **A fixed 1920 × 1080 stage with a full-bleed background** fixes both the black bars and the tiny type.
