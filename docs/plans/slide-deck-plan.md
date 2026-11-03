# Slide Deck Plan: AI-Assisted Development: The Good, the Bad and the Ugly

> This file covers **what the audience sees**: every slide's headline, its minimal on-screen content, its visual, and its click-by-click build.
> What the presenter needs per slide (the point, reminders, punchlines, poll callbacks, timing) is in [`presenter-notes.md`](./presenter-notes.md), together with the poll questions and the Q&A backup.
> Both files use the same slide IDs (`S01` … `S43`) and the same build numbers, so `[2]` in the notes is build 2 here.

---

## 1. The talk in one breath

AI is genuinely good for us (**The Good**). It is also unreliable in very specific, very funny ways (**The Bad**: that part is the AI). The worst problems, though, come from how *we* use it: waiting, saying we follow frameworks we can't afford to follow properly, budget games, slop and becoming a meat proxy (**The Ugly**: that part is us). The ugly part is the one we can fix, so the last chapter (**Making It Good**) shows how: become the orchestrator, use the time we got back to add value, plan first, right-size the process, and run feature-specific workflows that are cheap, resumable and trustworthy.

**The line the talk pivots on:** *"The Bad is the AI. The Ugly… is us."*

---

## 2. Shape of the talk

| Chapter | Slides | Time | Purpose |
| --- | --- | --- | --- |
| Opening | S01–S04 | ~5 min | Who we are, the wrong-slide gag, the agenda |
| I · The Good | S05–S08 | ~5.75 min | Honest credit: time back, the user-manual win, the "day one" magic |
| Poll | S09 | ~3.5 min | Between The Good and The Bad (opens at ~10:45). Its answers feed The Bad and The Ugly |
| II · The Bad | S10–S16 | ~9.5 min | AI's quirks: promises vs. reality, not listening, the last 20%, overengineering. Each gets one spoken line on *why* it happens |
| III · The Ugly | S17–S24 | ~15 min | Our side: waiting, great frameworks we can't always afford to follow, the budget elephant, slop, meat proxies |
| IV · Making It Good | S25–S42 | ~33.5 min | Role shift, value add, plan-first, feature-specific workflows (S29–S38, ~20 min, ≈25% of the talk, discussed on the slides with no live demo), cost tricks, finale |
| Q&A | S43 | ~7.5 min | Questions (humans only) |
| **Total** | **43 slides** | **~80 min** | 4 of the slides are 15-second chapter cards |

**Structural trick:** Act IV answers Act III **in reverse order**: meat proxy → role shift, slop → "make it better", waiting → plan-for-hours, frameworks we can't always follow → one workflow per feature that borrows their best ideas, budget elephant → receipts and cost tricks. The audience feels each problem being closed, without the deck ever saying "problem / solution".

**Expectation setting:** the agenda (S04) tells the audience up front that Making It Good is the longest chapter. Knowing the fix is coming keeps people with us through the Ugly.

---

## 3. Through-lines and callbacks

These make the deck feel like one story (project rule 12). Most of them are **shared-element transitions**: the same object carries across slides.

| # | Set up | Paid off | What carries over |
| --- | --- | --- | --- |
| 1 | S03 wrong slide ("How AI Will Destroy the Human Race") | S42: the five-step plan is revealed, then flips into the five takeaways | Same title, same globe illustration |
| 2 | S06 "We got our time back" (empty calendar) | S18 (spent waiting) → S27 (spent on value) | The empty calendar block |
| 3 | S08 progress bar rockets to 80% | S14: stuck, jittering 81 → 79 → 82 → 78 | Same progress bar |
| 4 | S18 spiky "your focus" line | S29: morphs into a long flat flow plateau | Same chart line |
| 5 | S23 purple slop page | S28: the "With AI" slop gag | Same slop styling |
| 6 | S24 meat-proxy blob in the pipe | S26: the same blob becomes the orchestrator (meat-think) | The blob |
| 7 | S11 "You're absolutely right!" | S42 doom step 2 | The phrase |
| 8 | S03 eraser wipe | S28: the same eraser wipes the slop away | The eraser |
| 9 | S28 the polished data grid | S29+: "so how did we build it?" (the real data-grid overhaul) | Narrative bridge |
| 10 | S09 poll | Called back verbally on S11, S18, S20, S21, S24, S26, S30, S43 | Spoken results |
| 11 | S02 "someone on a rig reads the wrong number" | S36: "remember the rig? This is why we check." | Spoken (the stakes line) |
| 12 | S13 `✓ All tests pass` after `it.skip` | S36: all-green checks that still hide bugs | The green check |
| 13 | S18 "context rot (yours)" | S33 "context rot (the chat's)" | The caption |
| 14 | S28 slop grid broken at 1280 px | S36 browser frame at 1280 px | The "1280 px" width label |

---

## 4. Global design rules

### 4.1 Visual system (kept from the current deck, then tightened)

- **Canvas:** off-white `#FAFAFB`. **Drop the dot grid**: fine repeating patterns shimmer and turn to mush under Teams video compression.
- **Ink:** `#111113` for text. Secondary text `#4A4A55`, which is darker than the current light greys so it survives compression. Nothing lighter than that for anything the audience must read.
- **Brand blue:** InformatiQ `#1B7ED0` (from `informatiq.svg`).
- **Act accents** are used only for the chapter cards, the corner-label dot and the one key highlight per slide. The values are fixed:
  - The Good: green `#1E9E6A`
  - The Bad: amber `#D97706`
  - The Ugly: coral `#E5484D`
  - Making It Good: InformatiQ blue `#1B7ED0`
  - On the light canvas these only hold enough contrast for large text (48 px and up), dots and strokes. Never use them for body text.
- **Mascot pink:** `#F6A6A4` (the meat-blob colour). It appears only with the blob.
- **No purple, anywhere**, except S23 and S28 state 1, where purple *is* the joke. (The presenter calls this out on S23.)
- **No emoji, anywhere**: not on slides, labels, mocks or notes. Where a mock needs that look (the slop pages on S23 and S28), use simple drawn icons such as sparkles or a rocket. The only exception is the plain `✓` that test runners print, inside terminal snippets.
- **Type:**
  - Keep SF Pro Display / Inter for text and SF Mono for code and terminal.
  - Headlines are huge, at least 72 px at 1080p.
  - Body text is at least 28 px, and any label at least 20 px.
  - Headlines use sentence case with a full stop. They are statements, not labels.
- **Dark slides** are reserved for moments: the chapter cards and the Stark quote (S21 build 3). Every other slide is light.

### 4.2 Slide chrome (from `template_layout_feedback.png`)

- **Remove** the file-name pill in the top-left (`// physics_playground.tsx`).
- **Remove** every bottom hint/tip text ("Click the orb…", "Draggable playground items").
- **Top-right corner label:** `NN / Slide name`, e.g. `31 / Feature-specific workflows`, with a small act-coloured dot.
  - `NN` is the *live* position after disabled slides are skipped, so it stays correct when slides are toggled.
  - The corner names are listed per slide below.
- **Keep** the thin progress indicator at the top centre (project rule 1).
- **No chrome** on S01 (title), the four chapter cards, or S43. The wrong slide (S03) **keeps normal chrome** so it looks legit.
- Keep the rounded canvas but thin the black bezel. On a Teams share every pixel counts.

### 4.3 Online delivery constraints (Teams screen share)

- Share **the audience window only**, not the entire screen, so the presenter view stays private on the second monitor.
- Teams compresses video, so:
  - Use strokes of 2 px or more and solid shapes. No hairlines, no subtle gradients (they band), no blur or glow.
  - Avoid full-screen continuous motion: it turns into blocky artefacts.
- Viewers see changes **1–2 s late**. Reveal gags (S03, S12, S16, S28) need a beat of stillness after the click; the notes mark the pauses.
- Element motion: **400–900 ms**. Slide transitions: **≤ 700 ms**.
- Continuous loops are allowed only where the loop *is* the meaning: the typing dots on S18 and the traveling dot on S35. Keep them small.
- 16:9, designed at 1920×1080, fullscreen-capable, no scrolling.

### 4.4 Motion vocabulary (from the animation guide)

- **Chapter morph:** a chapter card's title shrinks and flies into the top-right corner label of the act's first content slide. This is the shared element that tells you "you're in Act II now". It is used 4 times.
- **Builds** are click-driven reveal steps. Every build listed below is one press of `→`/`Space`. The presenter view shows `build 2 / 4`.
- **Shared-element carry-overs** are listed in §3. They are the "magic move" moments: use them deliberately and nowhere else.
- **Kinetic typography** is used only for the twists: S12 (99% → 50%), S16 (the escalating prompts), S17 ("…is us"), S21 (the Stark quote), S42 (the flip).
- **Feel:** gentle springs with no visible overshoot (≤ 3%). Ease-out for entrances, ease-in-out for morphs. Animate SVG paths for diagrams.
- **Never:** fade-only on everything, bounce, spin, particles, glow, or the same entrance on every slide.

### 4.5 The mascot

The pink blob from `src/assets/meatproxy-emojis-svg/` is **"the engineer", meaning us**. It appears at most once per slide and on about 10 slides in total, so it stays a running character rather than wallpaper.

| Slide | SVG | Why |
| --- | --- | --- |
| S06 | `meat-cool` (optional) | Time back, sunglasses on |
| S07 | `meat-done` | "Finished, and it was read first": the human review |
| S09 | `meat-typing` | "Writing its own words": answer honestly |
| S13 | `meat-cry` | "Deadpan, but the tears are real" |
| S18 | `meat-coffee` | "Still loading. Come back after the mug." |
| S20 | `meat-meeting` | "Camera on, brain optional" |
| S24 | `meat-proxy` → `meat-shrug` | The proxy, then "The model said so." |
| S26 | `meat-think` | The same blob, now thinking: the orchestrator |
| S37 | `meat-sweat` (optional) | Incident reports |
| S43 | `meat-wave` | Goodbye |

### 4.6 Assets

**Existing:**
- `src/assets/bs23_logo.webp` (S01 and S43: small, bottom-left, never focal)
- `src/assets/informatiq-app-suite-logos/*.svg` (S02; Portal uses `informatiq.svg`)
- the meat SVGs (above)
- `docs/context/template_layout_feedback.png` (S23 build 2, optional)

**To create** (simple, single-weight line-art or flat SVG, consistent stroke):
- offshore rig on a horizon (S02)
- globe with a typing-indicator bubble (S03, S42)
- eraser/duster (S03, S28)
- week calendar (S06)
- annotated screenshot mock (S07)
- shape morph paths (S14)
- file tree (S15)
- balance scale (S19)
- elephant (S21)
- triangle (S22)
- slop landing page + 12-tile grid (S23)
- pipe diagram (S24)
- three data-grid mocks (S28)
- workflow diagrams (S31–S36)
- incident cards (S37)

At most one or two illustrations per slide (project rule 4).

---

## 5. Slide manifest

This is the list for the enable/disable file (project rule 1). **Cut** shows what to disable first if a rehearsal runs long: **A** = cut first, **B** = cut if still over, **—** = keep.

| # | ID | Headline (on screen) | Act | Min | Enabled | Cut |
| --- | --- | --- | --- | --- | --- | --- |
| 01 | `title` | AI-Assisted Development: The Good, the Bad and the Ugly | Opening | 1:00 | on | — |
| 02 | `who-we-are` | We build software for the middle of the North Sea. | Opening | 2:00 | on | — |
| 03 | `wrong-slide` | How AI Will Destroy the Human Race | Opening | 1:00 | on | — |
| 04 | `agenda` | Today's feature presentation | Opening | 1:00 | on | — |
| 05 | `act-good` | I · The Good | Good | 0:15 | on | — |
| 06 | `time-back` | We got our time back. | Good | 2:00 | on | — |
| 07 | `manuals` | Our user manuals write themselves. | Good | 2:30 | on | — |
| 08 | `first-80` | Day one feels like magic. | Good | 1:00 | on | — |
| 09 | `poll` | Be honest. It's anonymous. | Poll | 3:30 | on | — |
| 10 | `act-bad` | II · The Bad | Bad | 0:15 | on | — |
| 11 | `keynote-vs-terminal` | The keynote vs. my terminal. | Bad | 1:45 | on | — |
| 12 | `ninety-nine` | 99% of 50% of the time. | Bad | 1:15 | on | — |
| 13 | `did-you-read` | Did you even read what I said? | Bad | 1:45 | on | B |
| 14 | `circle` | I asked for a circle. | Bad | 1:45 | on | — |
| 15 | `overengineered` | Enterprise-grade hello world. | Bad | 1:15 | on | A |
| 16 | `make-no-mistakes` | Make it better. Make no mistakes. | Bad | 1:30 | on | — |
| 17 | `act-ugly` | III · The Ugly | Ugly | 0:20 | on | — |
| 18 | `thinking` | Doomscrolling… | Ugly | 3:00 | on | — |
| 19 | `frameworks` | Proven. Thorough. Not cheap. | Ugly | 2:00 | on | — |
| 20 | `say-vs-do` | What we say vs. what we do. | Ugly | 1:30 | on | — |
| 21 | `elephant` | The elephant in the room. | Ugly | 2:30 | on | — |
| 22 | `pick-two` | Pick two. | Ugly | 1:30 | on | A |
| 23 | `slop` | Everything is purple now. | Ugly | 2:00 | on | — |
| 24 | `meat-proxy` | Don't be a meat proxy. | Ugly | 2:30 | on | — |
| 25 | `act-making-good` | IV · Making It Good | Making Good | 0:15 | on | — |
| 26 | `role-shift` | Promoted to orchestrator. | Making Good | 2:30 | on | — |
| 27 | `ticket-floor` | The ticket is the floor, not the ceiling. | Making Good | 1:30 | on | B |
| 28 | `make-it-better` | Let's make it better. | Making Good | 2:30 | on | — |
| 29 | `plan-hours` | Plan for hours. Let it run for hours. | Making Good | 1:45 | on | — |
| 30 | `right-size` | One workflow per feature. | Making Good | 1:30 | on | — |
| 31 | `my-loop` | How I actually work. | Making Good | 3:00 | on | — |
| 32 | `ask-everything` | Every question, answered up front. | Making Good | 2:30 | on | — |
| 33 | `files-memory` | The files are the memory. Not the chat. | Making Good | 2:15 | on | — |
| 34 | `the-team` | Pay for judgment, not for typing. | Making Good | 1:45 | on | — |
| 35 | `unit-loop` | One unit at a time. | Making Good | 2:30 | on | — |
| 36 | `dont-trust` | Never trust "it passes". | Making Good | 2:30 | on | — |
| 37 | `hard-way` | Learned the hard way. | Making Good | 1:30 | on | B |
| 38 | `receipts` | The receipts. | Making Good | 1:00 | on | A |
| 39 | `stateless` | It re-reads everything. Every time. | Making Good | 2:00 | on | — |
| 40 | `routing` | Right model. Right effort. Right context. | Making Good | 1:30 | on | — |
| 41 | `shared-repo` | Build it once. Share it with everyone. | Making Good | 1:00 | on | B |
| 42 | `doom-flip` | Remember the wrong slide? | Finale | 2:00 | on | — |
| 43 | `thanks` | Questions? (Humans only.) | Finale | Q&A | on | — |

Disabling every **A** saves about 4 min. Disabling every **B** saves about 6 more.

---

## 6. The slides

Each slide below has the same parts:

- **Corner:** the top-right label.
- **One idea:** the single primary idea.
- **On screen:** the only text the audience sees.
- **Visual:** the composition.
- **Builds:** what each click does (`0` is the state on entry).
- **In / Out:** the transition.

### Opening

---

#### S01 · `title`

- **Corner:** none
- **One idea:** what this talk is, and that it will be honest.
- **On screen:**
  - "AI-Assisted Development" (small, above)
  - "The Good, the Bad and the Ugly" (huge)
  - "[Presenter name] · InformatiQ team" (small)
  - The BS23 logo small in the bottom-left, around 28 px tall: present but quiet.
- **Visual:** pure typography and generous whitespace. The three words *Good / Bad / Ugly* can each carry a hairline-thin underline in their act colour, drawn left to right after the title lands (≥ 2 px, see 4.3).
- **Builds:**
  - 0: the title assembles word by word (stagger ~80 ms), then the underlines draw.
  - No clicks.
- **Out:** the title lifts up and fades while S02's horizon line draws in.

---

#### S02 · `who-we-are`

- **Corner:** `02 / Who we are`
- **One idea:** we build software for offshore drilling, so mistakes matter.
- **On screen:**
  - Headline: "We build software for the middle of the North Sea."
  - Small line: "Client: InformatiQ, Norway · Offshore drilling"
  - Build 2 line: "When our code is wrong, someone on a rig reads the wrong number."
- **Visual:**
  - A single horizon line across the lower third.
  - A line-art offshore rig rises out of it, right of centre.
  - The 8 app logos then sit along the horizon like a skyline, each with its name in small type underneath: WellMate, WellBook, LogistiQ, AnalytiQ, GeologiQ, Event Analyzer, Offset Analyzer, Portal (`informatiq.svg`).
- **Builds:**
  - 0: the horizon draws and the rig fades up from the line.
  - 1: the logos rise one by one, left to right (stagger ~90 ms).
  - 2: the stakes line fades in above the horizon, in ink rather than an accent colour. It is a statement, not a warning.
- **Notes:** no team-member info. Keep the rig simple and monochrome, not a photo. The stakes line is paid off on S36.

---

#### S03 · `wrong-slide`

- **Corner:** `03 / The plan` (normal chrome, so it looks like a real slide)
- **One idea:** a gag. It must look **completely legitimate** and never hint that it's wrong.
- **On screen:**
  - Headline: "How AI Will Destroy the Human Race"
  - Sub: "A practical five-step plan"
  - The steps are **not** shown. They are saved for S42.
- **Visual:** one calm, serious illustration: a line-art globe with a small chat bubble attached showing the typing dots `•••`. It quietly foreshadows S18 and S42.
- **Builds:**
  - 0: the same entrance as any normal content slide, so nothing is suspicious.
  - 1: **eraser wipe**, triggered after the presenter's "…wait, wrong deck". A blackboard duster sweeps left to right across the headline and sub. A stroke-shaped mask erases the text in chalky swipes, with a few dust specks that fade within 400 ms. What's revealed underneath is S04.
- **Builder note:** make the eraser S03's *exit transition* into S04. Then disabling S03 leaves S04 working on its own.

---

#### S04 · `agenda`

- **Corner:** `04 / Today`
- **One idea:** four chapters, and the last one is the fix.
- **On screen:**
  - Small kicker: "Today's feature presentation"
  - The four chapter names, large, each with its act-coloured dot: **The Good · The Bad · The Ugly · Making It Good**
  - Build 1 adds a small tag under "Making It Good": "the longest chapter"
  - Small footer: "+ a poll · + Q&A"
- **Visual:** a quiet cinematic nod to the Western: thin letterbox bars top and bottom (solid, not gradient). Everything else stays clean.
- **Builds:**
  - 0: revealed under the eraser from S03. The chapter names write on left to right as the eraser passes.
  - 1: the first three names dim slightly, "Making It Good" gets a blue underline drawn left to right, and its tag fades in.
  - 2: the footer fades in.
- **Out:** the letterbox bars stay and become the bars of the S05 chapter card as its dark canvas fades in.

---

### Act I · The Good

---

#### S05 · `act-good`

- **Corner:** none
- **On screen:** "I" (small) / "The Good" (huge, green).
- **Visual:** the chapter-card template: dark canvas with letterbox bars and centred type. All four chapter cards share it.
- **Out:** chapter morph. "The Good" shrinks into S06's corner label.

---

#### S06 · `time-back`

- **Corner:** `06 / Time back`
- **One idea:** AI took the toil, and we got real time back.
- **On screen:** "We got our time back." Then the calendar's labels, and on build 2: "…so what are we doing with it?"
- **Visual:** a Mon–Fri week calendar filled with chore blocks:
  - "CRUD endpoints · 2 days"
  - "Unit tests · 1 day"
  - "Migration script · 1 day"
  - "That one regex · 3 hours"
  - "Docs nobody reads · Friday"
- **Builds:**
  - 0: the calendar is full.
  - 1: every block shrinks to a thin sliver with a soft spring, leaving most of the week empty and white. Optionally `meat-cool` slides in.
  - 2: the empty area gets one quiet line: "…so what are we doing with it?"
- **Notes:** the empty calendar block is a shared element. It returns small on S27.

---

#### S07 · `manuals`

- **Corner:** `07 / Our best "good"`
- **One idea:** a real team win: an automated user-manual workflow, with a human still in charge.
- **On screen:**
  - Headline: "Our user manuals write themselves."
  - Build 3 adds: "A human still signs off."
- **Visual:** a left-to-right pipeline drawn as one SVG path. Each node gets a small icon and a 1–3 word label:
  - App
  - What changed? (diff since the last snapshot)
  - Screenshots
  - Annotate
  - Write
  - Human review (with a drawn tick)
  - Published manual

  Beside it sits a sample screenshot card: a neutral mock, **not a real client screen**.
- **Builds:**
  - 0: headline.
  - 1: the pipeline draws in groups: App → What changed → Screenshots.
  - 2: numbered annotation callouts draw onto the sample screenshot, then the pipeline completes with Write.
  - 3: the "Human review" node lights up and `meat-done` stamps it. The sub-line appears.
- **Notes:** the "only what changed" node is the clever bit. Give it the slide's one green highlight.

---

#### S08 · `first-80`

- **Corner:** `08 / Day one`
- **One idea:** AI is magical at the start of a project.
- **On screen:** "Day one feels like magic." The bar shows "80%", with a small "the first 80%" under it.
- **Visual:** one wide, thick progress bar, centred.
- **Builds:**
  - 0: the headline and an empty bar.
  - 1: the bar rockets 0 → 80% in about 0.6 s with a counter, then stops dead. A text caret blinks at the bar's end. That is the cliffhanger.
- **Out:** the poll (S09) rises in while the caret is still blinking. The bar is a shared element and reappears on S14.

---

### Interlude · The poll

---

#### S09 · `poll`

- **Corner:** `09 / Your turn`, with a neutral ink dot. The poll sits between acts and belongs to none.
- **One idea:** before the bad news, tell us yours. Honestly.
- **On screen:**
  - Small kicker: "Before the bad news…"
  - Headline: "Be honest. It's anonymous."
  - On click: "(Trust me. I'm one of you.)"
  - A **QR code placeholder**, large: at least 360 px, pure black on white, with a quiet zone around it, because a phone has to read it from a laptop screen through Teams compression.
  - Under it: `[short link]` and "Link's in the chat too". Small: "8 questions · 2 minutes · No names recorded".
- **Visual:** the QR is the hero, left of centre. `meat-typing` sits to its right.
- **Builds:**
  - 0: kicker, headline and QR.
  - 1: the "(Trust me…)" line slides in under the headline with a small delay, like an afterthought.
  - 2 (optional): a thin 2:30 ring timer starts around the QR. It is a presenter pacing aid, so keep it subtle.
- **In:** S08's bar holds at 80% with the caret still blinking, then slides up and away as the poll rises in. The cliffhanger waits while the audience answers.
- **Out:** straight into the S10 chapter card.
- **Why here:** by the end of The Good the audience is warmed up, and the poll breaks up the talking just when attention starts to dip. Every result is read later (S11 onward), so the answers feed straight into The Bad and The Ugly. Q5 is read on S11, about a minute after the poll closes.
- **Builder note:** read the QR target and short link from one config value (e.g. `POLL_URL`) and generate the QR at build or run time. The survey doesn't exist yet, so this is a **placeholder**. The questions are in `presenter-notes.md` (Appendix A).

---

### Act II · The Bad

---

#### S10 · `act-bad`

- **On screen:** "II" / "The Bad" (amber). Chapter card template.
- **Out:** chapter morph into S11's corner label.

---

#### S11 · `keynote-vs-terminal`

- **Corner:** `11 / Promise vs. reality`
- **One idea:** the gap between what AI is sold as and what we live with.
- **On screen:** the headline "The keynote vs. my terminal.", then the two sides below.
- **Visual:** a split composition (not cards):
  - **Left** has polished keynote typography on a soft surface, one claim at a time: "Autonomous." · "End-to-end." · "Like a senior engineer who never sleeps." The claims are generic and unattributed.
  - **Right** is a plain terminal or chat window:
    - me: `the button still doesn't work`
    - agent: `You're absolutely right! I apologize for the oversight. Here's the corrected version:`
    - then the exact same code block.
- **Builds:**
  - 0: headline.
  - 1–3: the left claims land one per click.
  - 4: the terminal types in. The agent reply types at ~40 chars/s, and the "corrected" code is visibly identical to the earlier block (highlight both to show they match).
- **Poll callback:** Q5, biggest frustration (spoken).

---

#### S12 · `ninety-nine`

- **Corner:** `12 / Accuracy`
- **One idea:** instruction-following is inconsistent, and you never know which half you're in.
- **On screen:** "AI follows your instructions 99% of the time." → "…99% of 50% of the time."
- **Visual:** kinetic typography only, centred and huge.
- **Builds:**
  - 0: "AI follows your instructions 99% of the time." with a full stop. **Hold**: the audience nods.
  - 1: the full stop slides away. "of 50% of the time." slides in from the right, smaller, then scales to match. Final line: **"99% of 50% of the time."**
- **Notes:** nothing else on this slide.

---

#### S13 · `did-you-read`

- **Corner:** `13 / Selective hearing`
- **One idea:** it appears to follow the instruction, and doesn't.
- **On screen:** headline, then three instruction → result pairs. Each instruction is a chat bubble; each result is a diff or terminal snippet.
  1. "Make the tests pass. Don't touch the tests." → `- it('calculates depth', …` / `+ it.skip('calculates depth', …` / `✓ All tests pass`
  2. "Only change the button colour." → `14 files changed, 612 insertions(+), 88 deletions(-)`
  3. "No comments in the code, please." → `// Removed all comments as requested`
- **Visual:** the pairs reveal **one at a time in the same spot**, each replacing the previous, so the slide never has three items at once. `meat-cry` sits small in a corner on the last one.
- **Builds:** 0: headline · 1–3: one pair per click.
- **Notes:** the `✓ All tests pass` line is paid off on S36. If S13 is cut, the presenter drops that callback.

---

#### S14 · `circle`

- **Corner:** `14 / The last 20%`
- **One idea:** AI is great at starting and bad at finishing. Fixing one thing breaks another.
- **On screen:** prompt chips top-left (the user), agent replies top-right, and one shape centre stage.
- **Visual:** one SVG shape that **morphs** smoothly between states (path morph, magic-move feel).
- **Builds:**
  - 0: chip "Draw a circle." → the shape is a **rectangle**.
  - 1: chip "That's a rectangle. A circle, please." → it morphs into a **trapezium**.
  - 2: chip "A. CIRCLE." → it morphs into a slightly rotated trapezium (or a triangle). The agent bubble says "Perfect! Here's your circle." next to a small drawn green tick.
  - 3: S08's progress bar slides in along the bottom and jitters 81% → 79% → 82% → 78% (slowly, about 1 s per change). Label: "the last 20%". A small elapsed clock at the bar's end keeps running while the percentage stays stuck: "1 h" → "4 h" → "day 2" → "day 6". The bar goes nowhere, the clock goes everywhere.
- **Notes:** this is the presenter's real story.

---

#### S15 · `overengineered`

- **Corner:** `15 / Overkill`
- **One idea:** sometimes it does exactly what you asked, and far, far more.
- **On screen:** prompt bubble "Add a dark mode toggle."
- **Visual:** an IDE-style file tree on the right that grows line by line:
  - `ThemeProvider.tsx`
  - `ThemeContext.ts`
  - `ThemeStrategyFactory.ts`
  - `ThemeRegistry.ts`
  - `useThemeObserver.ts`
  - `theme.config.ts`
  - `ThemeToggle.tsx`
  - `ThemeToggle.test.tsx`
  - `ThemeToggle.stories.tsx`
  - `docs/THEME_ARCHITECTURE.md`

  A green counter ticks up to `+2,184 lines`.
- **Builds:**
  - 0: the prompt.
  - 1: the tree grows (fast stagger) as the counter climbs.
  - 2: under the prompt, small: "What I needed:" `document.documentElement.classList.toggle('dark')`
- **Cut:** A.

---

#### S16 · `make-no-mistakes`

- **Corner:** `16 / Our prompts`
- **One idea:** pivot. Look at *our* prompts. Maybe it isn't only the AI.
- **On screen:** the escalating prompts, then "The Bad is the AI."
- **Visual:** kinetic typography. Each phrase lands bigger and heavier than the last, stacking loosely:
  1. `make it better`
  2. `improve the UI`
  3. `think step by step`
  4. `make it perfect`
  5. `MAKE NO MISTAKES`
  6. `please.`
- **Builds:**
  - 0: the first phrase is on screen on entry.
  - 1–5: one more phrase per click.
  - 6: the camera pulls back. All the phrases are inside a single chat input box labelled **"You"**.
  - 7: everything clears to one centred line: **"The Bad is the AI."** Hold.
- **Out:** S17 completes the sentence.

---

### Act III · The Ugly

---

#### S17 · `act-ugly`

- **On screen:** "III" / "The Ugly" (coral). Build 1 adds, beneath it in smaller type: "…is us."
- **Builds:** 0: card · 1: "…is us." types in.
- **Out:** chapter morph.

---

#### S18 · `thinking`

- **Corner:** `18 / Time between chats`
- **One idea:** chat-driven development wastes our time and shreds our focus.
- **On screen:** only the dots at first. Then the headline (the spinner word lands on **"Doomscrolling…"**). Then the timeline and the focus line.
- **Visual and builds** (per the presenter's original brief):
  - 0: **only** the three-dot typing indicator, centred and large, gently looping. Nothing else on the slide.
  - 1: the dots shrink and move to the left of the headline position. The headline cycles like Claude Code's spinner, about 600 ms per word: "Thinking…" → "Pondering…" → "Brewing…" → lands on **"Doomscrolling…"**, and holds.
  - 2: a horizontal timeline labelled "an hour of chat-driven development". Short blue bursts (you: prompt or review) alternate with long grey gaps (waiting). Small icons sit in the gaps: a phone (Reels), a cha cup, a second tab. `meat-coffee` sits in the longest gap. Label it "illustrative": there is no measured number.
  - 3: a "your focus" line draws over the timeline: spiky (burst, drop, burst, drop). The deepest drop gets one small caption: "context rot (yours)". The line is a shared element and returns on S29; the caption pairs with S33.
- **Poll callback:** Q2 (what you do while it's thinking).

---

#### S19 · `frameworks`

- **Corner:** `19 / Methodologies`
- **One idea:** the structured AI frameworks are proven and they work, but following them properly takes real tokens, time and discipline, and they are general by design.
- **On screen:** headline "Proven. Thorough. Not cheap.", the two pan labels with short item labels, and the closing line. At the bottom, small: "Spec Kit · AI-DLC · BMAD · OpenSpec".
- **Visual:** a large, simple line-art balance scale, centred. The left pan is labelled "What you get", the right pan "What it takes". Labels sit on the pans as small weights, 1–3 words each. Not cards.
- **Builds:**
  - 0: the headline, the four names along the bottom, and the empty, level scale.
  - 1: "What you get" fills one item at a time: "Specs as contracts" · "Settled decisions" · "Phased work" · "Review gates". The left pan dips: this is real value.
  - 2: "What it takes" fills the same way: "Tokens" · "Time" · "Learning curve" · "Process discipline". The scale settles level: the cost is as real as the value.
  - 3: one line under the scale: **"General by design. Worth it when the job is big enough."**
- **Notes:** respect is the point of this slide. Nothing here is a joke at the frameworks' expense. The only downsides named are cost, effort and the process you have to follow. The humour in this part of the talk is aimed at *us* (S20), not at the frameworks.

---

#### S20 · `say-vs-do`

- **Corner:** `20 / Say vs. do`
- **One idea:** what we claim we do with AI and what actually happens are different.
- **On screen:**
  - Left label: "In the meeting", with the quote "We follow spec-driven development."
  - Right label: "At 6:47 PM", with a chat input containing `fix it` and the Enter key being pressed.
- **Visual:** two panes split by a thin vertical rule (≥ 2 px). `meat-meeting` sits on the left.
- **Builds:** 0: left · 1: right (`fix it` types, then the Enter key press animates).
- **Poll callback:** Q4 (frameworks: "strictly" vs. "I say I do").

---

#### S21 · `elephant`

- **Corner:** `21 / The elephant`
- **One idea:** the AI budget quietly shapes *how* we work: we cut corners.
- **On screen:** "The elephant in the room." → "Tokens." → three short lines → the Stark quote.
- **Visual:**
  - A large, simple line-art elephant takes most of the slide and enters slowly, as if it was always there.
  - Build 3 switches to a dark, cinematic canvas for the quote.
- **Builds:**
  - 0: the headline. The elephant draws in.
  - 1: "Tokens." appears on the elephant's body. A small token meter sits on its flank.
  - 2: three quiet lines, staggered: "We one-shot to save budget." · "We skip the review pass." · "We watch the meter more than the output."
  - 3: dark canvas. Kinetic quote: *"I'm limited by the technology of my time."* (Howard Stark, *Iron Man 2*). Then "technology" is struck through and **"token budget"** writes in above it.
- **Poll callback:** Q6 (when the budget runs out).

---

#### S22 · `pick-two`

- **Corner:** `22 / Expectations`
- **One idea:** methodology, budget and deadline all at once is not realistic, and we should say it.
- **On screen:** "Pick two." The vertices read "Follow the methodology" · "Stay within budget" · "Deliver on time".
- **Visual:** a large triangle drawn with SVG strokes, and a small dot marker.
- **Builds:**
  - 0: the triangle draws.
  - 1: the marker glides toward the centre, is gently pushed out to an edge, tries again, and is pushed out again. Smooth, no bounce.
  - 2: the headline lands: "Pick two."
- **Cut:** A.

---

#### S23 · `slop`

- **Corner:** `23 / Slop`
- **One idea:** AI output is becoming generic and recognisable, and we feed it.
- **On screen:** a full-bleed slop page, then the grid, then the principle line.
- **Visual:**
  - A believable generic AI landing page: purple-to-blue gradient, glass cards, "Supercharge your workflow" with a sparkle icon, three feature cards with bright icon badges, a rocket illustration, and a "Get started →" button. All icons are drawn, never emoji.
  - **This is the deck's purple**, and it is fully intentional. The only other purple is S28's callback.
- **Builds:**
  - 0: the slop page fills the slide.
  - 1: zoom out. It is one tile in a grid of 12 near-identical pages. Caption: "Spot the difference."
  - 2 (optional, recommended): "Exhibit A: the first AI draft of this deck" slides in like a photo. It is `template_layout_feedback.png`, with the presenter's red annotations visible.
  - 3: everything clears to: **"AI should follow our principles, not define them."**
- **Small footnote** on build 3: "No purple gradients were harmed in the rest of this deck."

---

#### S24 · `meat-proxy`

- **Corner:** `24 / Meat proxy`
- **One idea:** a human who only forwards between client and AI adds nothing but latency, and can't answer "why".
- **On screen:** "Don't be a meat proxy." Then the name tags, then the "Who is JSON?" bubble, then the punchline.
- **Visual:**
  - A horizontal pipe: **Client** → (blob) → **AI**. Arrows flow in and the same arrows flow out.
  - `meat-proxy` sits in the middle of the pipe.
- **Builds:**
  - 0: the headline and the pipe. Arrows flow.
  - 1: four name tags pop up around the blob one by one (a gentle scale-in, not a bounce): "The Human Clipboard" · "The Prompt Courier" · "The Certified Forwarder" · "The One-Tab Engineer".
  - 2: a chat bubble from the blob to the AI: **"Who is JSON?"**
  - 3: a bubble back from the client: "Why does it work like that?" The blob swaps to `meat-shrug`, captioned small: "The model said so."
  - 4: the tags clear and the punchline lands: **"Your value-add shouldn't be latency."**
- **Poll callback:** Q7 (shipped code you didn't fully understand).
- **Notes:** do **not** put any meatproxy.me link on the slide.

---

### Act IV · Making It Good

---

#### S25 · `act-making-good`

- **On screen:** "IV" / "Making It Good" (blue). Chapter card template.
- **Out:** chapter morph into S26's corner label.

---

#### S26 · `role-shift`

- **Corner:** `26 / The role shift`
- **One idea:** our job moved from typing to thinking, and that is where our value now lives.
- **On screen:**
  - Headline: "Promoted to orchestrator." with the sub "(no raise included)".
  - A day bar.
  - Five verbs.
  - Build 3 kicker: "Engineering isn't dead. (Not yet.)"
- **Visual:** a single horizontal "a day in my work" bar, with the blob from S24 carried over (shared element).
- **Builds:**
  - 0: a bar labelled **Before**: [writing code ████████][debugging ████][thinking █].
  - 1: the bar morphs: segments resize and relabel into **Now**: [understanding & planning ███████][reviewing ████][writing code █]. The blob swaps to `meat-think`.
  - 2: five verbs appear along a line, connected by a drawn path: **Understand → Decide → Delegate → Verify → Own**.
  - 3: the small kicker line.
- **Poll callback:** Q3 (do you miss writing code by hand?).

---

#### S27 · `ticket-floor`

- **Corner:** `27 / Add value`
- **One idea:** with the time we got back, go beyond the requirement. Learn from competitors and best practice.
- **On screen:**
  - Headline: "The ticket is the floor, not the ceiling."
  - A ticket card: "As a user, I want to see a list of wellbores."
  - Idea chips.
  - The line: "Look over the fence."
- **Visual:** the ticket sits in the centre. On build 1, idea chips float out and settle around it: "keyboard navigation" · "saved views" · "empty state" · "loading state" · "density" · "accessibility".
- **Builds:**
  - 0: the ticket.
  - 1: the chips appear.
  - 2: "Look over the fence: competitors, best practices, great products."
  - 3: the empty calendar from S06 returns small in a corner: "That's what the time is for."
- **Cut:** B.

---

#### S28 · `make-it-better`

- **Corner:** `28 / Make it better`
- **One idea:** AI lets us ship far more polish in the same time, if we bring the taste.
- **On screen:** one UI mock at a time, a small state label, and the final line.
- **Component (my call):** a **wellbore data grid** using clearly fake data (e.g. "Wellbore A-12", "Field: Demo North"). It nods to the real data-grid overhaul and bridges into the workflow chapter. UI only, no code.
- **Builds:**
  - 0, **"Before AI"** (label: "It worked. It was fine."): a plain bordered table, default font, "1 2 3 Next" pagination, and no loading, empty or hover states. Respectful, not mocked.
  - 1, **"With AI"** (with a drawn sparkle icon): full slop. A purple gradient header, glass rows, a bright icon on every column, rainbow status pills, a floating "Ask AI about your wells!" bubble with a robot icon, sparkles. It is also broken: at the labelled "1280 px" width the last column is cut off and the header text overflows. Reuse S23's slop styling (callback); the 1280 px label returns on S36.
  - 2, **"…just kidding."**: S03's eraser sweeps the slop away (callback).
  - 3, **"With AI, done right"**:
    - a calm grid in the design system;
    - a sticky header, sortable columns and inline filter chips;
    - a density toggle and a visible keyboard focus ring;
    - a row-hover detail preview;
    - a skeleton loading state that plays for 600 ms on entry, and an empty-state variant.
    - Label: "Same ticket. Same deadline."
  - 4: all mocks clear to: **"Before: bounded by hours. Now: bounded by imagination."**
- **Notes:** this slide is UI only. The three mocks must look like they share a layout, so the morph between them reads as "the same component, evolving".

---

#### S29 · `plan-hours`

- **Corner:** `29 / Plan first`
- **One idea:** plan deeply in one focused block, then let the AI execute for hours. Flow beats interruptions.
- **On screen:**
  - Headline: "Plan for hours. Let it run for hours."
  - Two labels: "you: deep focus" and "agents: execution".
  - Build 2: "Plan it well, then one-shot the plan."
  - Build 3, small: "Small bug? Quick question? Chat is fine."
- **Visual:** S18's spiky focus line (shared element).
- **Builds:**
  - 0: the spiky line returns.
  - 1: it morphs into a long high plateau ("you: planning, ~3 h, deep focus"), followed by a long band in a second colour ("agents: executing, hours to a day"). Meanwhile your line moves to a lower lane labelled "you: review, next plan, client".
  - 2: the one-shot line.
  - 3: the fairness line.

---

#### S30 · `right-size`

- **Corner:** `30 / Right-size it`
- **One idea:** don't run every task through one process. Size the process to the task, and borrow the frameworks' best ideas at the size you need.
- **On screen:**
  - Headline: "One workflow per feature."
  - A spectrum with "Chatbot" at the left end and "Full framework" at the right.
  - A "Me" marker.
  - Three size rows.
- **Visual:** a horizontal spectrum line with icons at each end: a chat bubble on the left, a stack of documents on the right.
- **Builds:**
  - 0: the spectrum.
  - 1: the "Me" marker starts left, glides to the right end, then eases back and settles left of centre-middle.
  - 2: three rows fade in under the marker:
    - "Typo · small bug → just chat"
    - "Medium feature → a plan + one session"
    - "Big feature (10–30 commits) → custom workflow + agents"
- **Poll callback:** Q1 (how you mostly work with AI).
- **Notes:** the right end is not the bad end. The marker visits it on purpose, and the presenter says the middle borrows from it.

---

#### S31 · `my-loop`

- **Corner:** `31 / Feature-specific workflows`
- **One idea:** the whole method in one picture: plan with a human, execute unattended, review at checkpoints.
- **On screen:**
  - Headline: "How I actually work."
  - Three phase labels.
  - Three rules at the bottom on the last build.
- **Visual:** three regions left to right, connected by an animated SVG path:
  - **Attended:** you + AI plan.
  - **Unattended:** agents execute.
  - **Attended:** checkpoint review.

  A "continue" arrow loops from the review back into execution. Under the first region sit three tiny steps: "1. Brainstorm alone (what to do, and what *not* to do) · 2. AI asks me questions · 3. Plan + workflow files".
- **Builds:**
  - 0: headline.
  - 1: the Attended (plan) region and its three steps.
  - 2: the kickoff arrow draws, and the Unattended region fills in (small units ticking).
  - 3: the checkpoint region, plus the "continue" loop.
  - 4: three rules: "Every question answered up front." · "The files are the memory." · "The right model for each job." These signpost S32, S33 and S34.

---

#### S32 · `ask-everything`

- **Corner:** `32 / Planning`
- **One idea:** every question is settled before execution, so execution never has to ask.
- **On screen:** AI question bubbles → stamped answers → plan anatomy → kickoff snippet.
- **Builds:**
  - 0: question bubbles from the AI stack up on the left: "Grid or list?" · "What if there are zero results?" · "en + nb translations?" · "Which depth reference?"
  - 1: each gets a short answer, then is "stamped" into a document card on the right titled `plan.md § Settled decisions`.
  - 2: the document card expands into the plan's anatomy, four labelled sections: **Global constraints · Review focus · Shared contracts · Units** (scope · files · deps · verify commands).
  - 3: a terminal snippet (the kickoff prompt). This is real and worth showing:
    ```
    Continue the data-inventory redesign. Read
    temp-notes/data-inventory-redesign/README.md and follow its session
    protocol autonomously. Do not ask me anything; log decisions in decisions.md.
    ```
    The last sentence gets the slide's one blue highlight.

---

#### S33 · `files-memory`

- **Corner:** `33 / Working folder`
- **One idea:** state lives in files, not the chat, so any session can resume.
- **On screen:** a chat that rots, a folder tree, and "Crash? Context limit? Next morning? Resume."
- **Builds:**
  - 0: a long chat transcript scrolls upward. Labels detach from the top and fade away: "the plan", "the conventions", "decision from turn 40". Caption: "context rot (the chat's)", pairing with S18's "context rot (yours)".
  - 1: the chat dissolves into a folder tree, `temp-notes/<feature>/`, with one 2–4 word purpose per file:
    - `README.md`: session protocol
    - `plan.md`: decisions + units
    - `specs/*.md`: the UI spec
    - `progress.md`: `[ ] [~] [x] [!]` + hashes, tokens
    - `decisions.md`: why, one line each
    - `important-notes.md`: living memory
    - `human-review.md`: questions for me
  - 2: a fresh "new session" node connects to the folder and reads it. The line appears.

---

#### S34 · `the-team`

- **Corner:** `34 / Model routing`
- **One idea:** route work by model. The expensive model does judgment; cheap models do mechanics.
- **On screen:** "Pay for judgment, not for typing." Three tiers, then a frontmatter snippet.
- **Visual:** three horizontal tiers stacked vertically, each with a weight hint ($$$ / $$ / $). Not cards: think of a mixing desk or org-chart rows.
  - **Opus · judges**: orchestrator, designer. Note: "never writes product code".
  - **Sonnet · builds & reviews**: implementer, reviewer, explorer, validator.
  - **Haiku · runs**: browser runner, committer ("only when fully scripted").
- **Builds:**
  - 0: the Opus tier is on screen on entry.
  - 1–2: the Sonnet tier, then the Haiku tier.
  - 3: a small frontmatter snippet slides in:
    ```markdown
    ---
    name: dir-implementer
    model: sonnet
    effort: medium
    maxTurns: 150
    ---
    ```
    Caption: "routing can't drift mid-run".

---

#### S35 · `unit-loop`

- **Corner:** `35 / Execution`
- **One idea:** a disciplined loop per unit: implement, verify, review, fix once, commit.
- **On screen:** "One unit at a time." The loop labels, then the kicker.
- **Visual:**
  - A loop diagram drawn as one SVG path, with a small dot travelling it (an allowed loop): **pick unit → implement (Sonnet) → verify (orchestrator re-runs) → review (HIGH/MEDIUM only) → one fix round → commit (Haiku, hooks run) → log + curate notes → next**.
  - A short red side-arc from verify back to implement, labelled "red? same implementer, ≤ 5 rounds".
  - On the right, a small DAG of units ticks `[x]` as the dot completes laps.
- **Builds:**
  - 0: the loop draws once, slowly.
  - 1: the dot starts travelling and the DAG ticks.
  - 2: kicker: **"One review. One fix round. Perfectionism loops are where token budgets go to die."**

---

#### S36 · `dont-trust`

- **Corner:** `36 / Verification`
- **One idea:** green checks aren't proof. Verify for real, and let a gate the agent can't skip have the last word.
- **On screen:** a stack of green checks, a broken screenshot, the runner/validator split, then the commit gate.
- **Builds:**
  - 0: green checks stack up: `lint ✓` · `tsc ✓` · `4,900 unit tests ✓` · `build ✓`.
  - 1: beside them, a browser frame labelled "1280 px" (the same label as S28). A popover is clipped off-screen, a column is misaligned and there's a duplicated tooltip. Red circles draw around each.
  - 2: the split diagram: **orchestrator writes the probe** → **Haiku runner** (runs it verbatim, returns raw JSON) → **Sonnet validator** (never browses; recomputes the numbers). Caption: "Scripts over clicking. Cheapest model. Numbers you can check."
  - 3: the diagram clears to one commit gate, drawn left to right: `git add -- <paths>` → `pre-commit: design:check → lint` → `commit a1b2c3d`. Caption: "The last gate. Agents can't skip it: no `--no-verify`."
- **Notes:** this slide pays off S02 (the rig) and S13 (the skipped tests); both callbacks are spoken.

---

#### S37 · `hard-way`

- **Corner:** `37 / Safety rails`
- **One idea:** every rule in the workflow comes from a real incident.
- **On screen:** one incident card at a time, each stamped with the rule it produced.
- **Visual:** a deck of postmortem-style tickets in the same spot. Each click flips to the next, so they are never laid out as a grid.
- **Builds:**
  - 0: "An agent deleted untracked files. Unrecoverable." → stamp: **"Agents never delete files they didn't create."**
  - 1: "An implementer sat idle for ~65 minutes." → **"Stop it, resume it. Context intact."**
  - 2: "A check passed by measuring the wrong element (shared class)." → **"Target `data-testid`, never utility classes."**
  - 3: "A 40 px tolerance passed two elements on different rows." → **"Real tolerances: a few px."**
  - 4: the cards stack away and one standing-rules card remains: **"Explicit paths only. No `git add -A`, no push, no force."**
- **Cut:** B. If cut, the presenter says the standing rules in one line on S36.

---

#### S38 · `receipts`

- **Corner:** `38 / Numbers`
- **One idea:** it's affordable. Here are real numbers.
- **On screen:** kinetic numbers, one per click, each with a one-line label:
  - **13 units** on **~0.25M orchestrator tokens** (data-inventory redesign, round 1)
  - **~165k tokens** for 2 scripted browser checkpoints (data-grid overhaul)
  - **10–30 commits** per feature: data-grid overhaul · data-inventory redesign ×2 · design-system migration
- **Builds:** 0: the first figure on entry · 1–2: one more figure per click. Each number counts up quickly (≤ 600 ms), then settles.
- **Cut:** A. If cut, the presenter says the first number on S35.

---

#### S39 · `stateless`

- **Corner:** `39 / Context costs`
- **One idea:** every message re-sends the whole conversation. Long, idle, sprawling sessions cost money *and* lose detail.
- **On screen:** "It re-reads everything. Every time." Short labels per build: "cache: 5 min (API) · ~1 h (subscription)", "idle → compacted", `/clear` + "hand-off note".
- **Visual:** the conversation as a stack of blocks next to a "model" box.
- **Builds:**
  - 0: each new turn adds a block, and the **whole stack** travels to the model box and back. The stack grows taller and a cost meter beside it climbs faster each turn.
  - 1: a small timer badge appears on the stack (the cache TTL). The presenter "walks away": the badge runs out and the next turn's trip is drawn heavier, because it re-reads everything.
  - 2: an overnight icon. The stack gets squashed into a thinner summary block, and some blocks blur away: **compacted while idle, detail quietly lost**.
  - 3: the fix. `/clear` empties the stack. A small "hand-off note" file is carried into a fresh session, which starts with a tiny stack. Caption: "One task, one session. Files carry the context."

---

#### S40 · `routing`

- **Corner:** `40 / Cheap tricks`
- **One idea:** right model, right effort, right context, plus specific prompts. These are the everyday cost levers.
- **On screen:** three dials, each with one rule. Build 3 adds a "be specific" line.
- **Visual:** three large dials or sliders in a row:
  - **Model:** Haiku · Sonnet · Opus
  - **Effort:** low → max
  - **Context:** what it may read
- **Builds:**
  - 0: **Model** turns. Rule: "Write your routing down once." A tiny snippet underneath: "Sonnet: most work · Opus: design, planning, hard bugs · Haiku: scripted, mechanical".
  - 1: **Effort** turns. Rule: "Low for simple. High for hard."
  - 2: **Context** turns. Rule: "Sub-agents with scoped briefs. Keep files out." Snippet (accurate for Claude Code; `.claudeignore` does nothing):
    ```json
    { "permissions": { "deny": ["Read(./.env)", "Read(./dist/**)"] } }
    ```
  - 3: one line under all three: **"Not 'improve the UI'. Say what, where, and how you'll check it."**

---

#### S41 · `shared-repo`

- **Corner:** `41 / Team toolbox`
- **One idea:** centralise skills, plugins, commands, agents and workflows in one team repo.
- **On screen:** "Build it once. Share it with everyone." The repo node is labelled generically, "Team AI repo" (it's private, so no real name). Five item labels.
- **Visual:** one repo node in the centre with spokes out to a ring of small engineer dots. Items flow outward along the spokes: skills · plugins · commands · agents · workflows (including "user-manual generator", a callback to S07).
- **Builds:** 0: the node and spokes · 1: the items flow · 2: small line: "Every team should have one." · 3: the offer, small: "Want a starting point? Ask me." with the presenter's Teams handle.
- **Cut:** B.

---

#### S42 · `doom-flip`

- **Corner:** `42 / The plan`, the same label as S03 on purpose.
- **One idea:** callback finale. The wrong slide was right all along, and its five steps flip into the five takeaways.
- **On screen:** the S03 title, the globe and five steps. Then the flipped title and the five antidotes.
- **Visual:** S03 returns exactly (shared element). This time a numbered list of 5 steps sits beside the globe.
- **Builds:**
  - 0: "How AI Will Destroy the Human Race: a practical five-step plan":
    1. Keep them waiting.
    2. Say "You're absolutely right!", then do it anyway.
    3. Drain their budgets.
    4. Paint everything purple.
    5. Turn them into meat proxies.
  - 1: the title morphs (word-level magic move) into **"…only if we let it."**
  - 2–6: each step flips, one per click, into its antidote, in the act colour:
    1. **Plan more. Prompt less.**
    2. **Verify. Never trust "it passes".**
    3. **Pay for judgment, not for typing.**
    4. **Give it your principles.**
    5. **Own every line you ship.**
- **Notes:** these five lines *are* the takeaways. There is no separate takeaway slide, by design.

---

#### S43 · `thanks`

- **Corner:** none
- **On screen:** "Questions?" with the sub "(Humans only.)" Small: "[Presenter name] · InformatiQ team · Brain Station 23" and the BS23 logo, small. `meat-wave`.
- **Builds:** 0 only.
- **Optional:** a quiet "Your funniest AI moments" line, if the presenter reads poll free-text answers aloud.

---

## 7. Calls I made (please check these while reading)

1. **A four-act structure.** The Good / The Bad / The Ugly / Making It Good, with "The Bad is the AI. The Ugly is us." as the pivot.
2. **The wrong slide is S03 and reveals the agenda.** It is paid off by the S42 finale, which doubles as the takeaway slide.
3. **The poll sits between The Good and The Bad (S09, ~10:45), not in the opening.** Putting all the participation up front leaves a long stretch of listening afterwards. Here it breaks up the talk when attention dips, and every answer is read back during The Bad, The Ugly and Making It Good. The poll itself is a placeholder. It assumes Microsoft Forms (native to Teams) with "Record name" switched off so it is genuinely anonymous, plus a backup poll link in case Forms misbehaves. The QR code and the link go in the chat. Results are **spoken** at callback slides from a second monitor, not shown live on the slides. The presenter reads one or two early answers aloud while the poll is open.
4. **"Let's make it better" uses a wellbore data grid with fake data.** It nods to the real data-grid overhaul and bridges into the workflow chapter.
5. **There is no demo.** The workflow is explained on the slides themselves (S29–S38).
6. **The meat blob is our recurring "engineer" character**, used on about 10 slides and at most once per slide.
7. **No purple anywhere except the slop jokes.** The presenter calls this out.
8. **The S13 examples are made-up but realistic**, and they stay as they are.
9. **The idle-compaction point stays on S39, as you asked.** The cache-TTL point is added alongside it.
10. **"Who is JSON?" is kept exactly that short**, and there is no meatproxy.me link anywhere.
11. **43 slides, including 4 chapter cards**, timed to ~72.5 min plus ~7.5 min of Q&A, with an A/B cut list.
12. **Notes, not a script.** `presenter-notes.md` gives each slide its point, reminders, click cues and punchlines. The delivery is the presenter's own.
13. **Each "Bad" gets one spoken line on why it happens** (S12, S13, S15, S23): long chats dilute early instructions, it aims for "looks done", it writes the average of its training code. That gives the jokes technical weight, and each cause is fixed later in Act IV.
14. **S36 is where trust gets earned.** It pays off the rig (S02) and the skipped tests (S13), and ends on a git-hook gate the agents can't skip.
15. **No emoji anywhere.** The slop mocks use drawn icons instead.
16. **The AI frameworks are treated with respect.** Spec Kit, AI-DLC, BMAD and OpenSpec are presented as proven and valuable. The only downsides named are the tokens, the effort and the process they ask you to follow, plus being general by design. S19 shows the trade-off as a balance, S20 aims the joke at us, and S30–S32 credit the frameworks as the source of the ideas the workflow borrows.

---

## 8. Suggestions worth considering

- **Plant a friend for the wrong slide.** Online, nobody's laughter reaches you. Ask one colleague to unmute right after the S03 title and say something like "Bhai… wrong slide." It turns a silent gag into a shared moment.
- **Appoint a chat captain.** One teammate watches the Teams chat, surfaces the funniest replies, and reads one or two out during the S13 and S18 prompts and in Q&A. With 200 people, chat *is* the room.
- **Keep your camera on**, especially for S03, S12 and S16. On Teams, your face is the only reaction channel for the jokes.
- **Use Teams reactions as audience participation.** The notes include prompts: a laugh reaction on S01 and at "You're absolutely right!", a raised hand at the slop page, a heart for "do you miss writing code?".
- **Add a teammate cameo.** One 45-second real horror story from a teammate in Act II would make "my *team's* experiences" literal. It needs a quick handover rehearsal.
- **Use the meta proof.** This deck was planned in one AI session (with clarifying questions) and will be built in another, which is exactly the S31 method. The notes use this on S31. It is honest, and it lands well.
- **Watch the wording** in two places:
  - The original brief said "third-world countries". The notes use *"budget planned in taka, tokens priced in dollars"* instead: same point, funnier, nobody winces.
  - The "layoff list" line is kept, with care. It is delivered as a wake-up call, not a threat.

---

## 9. Placeholders to fill before the build is final

- [ ] `POLL_URL` + short link + QR (S09), the final poll questions (draft in `presenter-notes.md`, Appendix A), and a backup poll link
- [ ] Presenter's full name (S01, S43) and Teams handle (S41)
- [ ] What from the team repo can be shared outside the team (S41's offer)
- [ ] Optional: a real before/after figure for the user manuals (S07). Leave it out rather than estimate
- [ ] Optional: confirm that showing `template_layout_feedback.png` on S23 is OK
