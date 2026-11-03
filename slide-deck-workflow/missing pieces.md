# Missing Pieces Log (Slide-by-Slide)

> **Purpose:**  
> During autonomous, unattended implementation runs, AI agents must **never halt to ask questions**.  
> If an agent encounters missing information, an unavailable external asset (URL, QR code, logo), an unprovided illustration/infographic, or fails to implement an intended visual effect, it must:  
> 1. Implement a clean, non-breaking fallback or placeholder in code.  
> 2. Document the exact gap under the appropriate slide section below.  
> 3. Continue execution without pausing.

---

## Logging Guidelines for AI Agents

When logging under a slide, use this format:
```markdown
- **[CATEGORY]** `Asset / Element Name`: Description of what was missing or failed.
  - *Current Fallback Implemented:* What the code currently renders instead.
  - *Required Human Input:* What the human presenter needs to provide or decide.
```
*Categories:* `[Content]`, `[URL/Link]`, `[Infographic/SVG]`, `[Failed Implementation]`, `[Data/Receipts]`, `[Presenter Cue]`.

---

## Slide-by-Slide Register

### S01 · `title` (AI-Assisted Development: The Good, the Bad and the Ugly)
- **[Content]** `Presenter Name`: Placeholder `[Presenter name]` used on screen. Needs presenter's real display name.
- **[Asset]** `BS23 Logo`: Verified existing and integrated from `src/assets/bs23_logo.webp`.

### S02 · `who-we-are` (We build software for the middle of the North Sea.)
- **[Infographic/SVG]** `Offshore Rig Illustration`: Fully implemented as a custom high-fidelity architectural inline SVG vector line drawing with derrick, helipad, crane, flare boom, and substructure columns.
- **[Asset]** `InformatiQ App Logos`: Integrated all 8 app logos from `src/assets/informatiq-app-suite-logos/`.

### S03 · `wrong-slide` (How AI Will Destroy the Human Race)
- **[Infographic/SVG]** `Globe Illustration`: Implemented line-art vector globe with pulsing typing bubble dots `•••`.
- **[Implementation]** `Blackboard Eraser Wipe Transition`: Implemented wooden blackboard duster sweep with felt pad, chalk dust particles, and smooth text blur/wipe reveal.

### S04 · `agenda` (Today's feature presentation)
- *Fully implemented with cinematic letterbox bars, act dots, dynamic dimming, and hero chapter badge.*

### S05 · `act-good` (I · The Good)
- *Fully implemented with dark canvas, letterbox bars, pulsing emerald dot, and centered typography.*

### S06 · `time-back` (We got our time back.)
- **[Infographic/SVG]** `Calendar Graphic`: Fully implemented as an interactive 5-day week calendar with spring physics collapsing chore blocks. Layout structure ready for return on S18/S27.
- **[Asset]** `Mascot SVG`: Integrated `meat-cool.svg` from `src/assets/meatproxy-emojis-svg/meat-cool.svg`.

### S07 · `manuals` (Our user manuals write themselves.)
- **[Infographic/SVG]** `Pipeline & Annotated Screenshot`: Streamlined 4-stage pipeline (`Code Release` → `Incremental Diff` → `Annotated Docs` → `Engineer Signoff`) with subsea telemetry UI mock and numbered callouts `(1)`, `(2)`, `(3)`.
- **[Asset]** `Mascot SVG`: Integrated `meat-done.svg` rubber-stamp from `src/assets/meatproxy-emojis-svg/meat-done.svg`.
- **[Presenter Cue]** `Before/After Metrics`: Presenter can optionally state real release turnaround time savings (e.g., hours per manual release) during delivery.

### S08 · `first-80` (Day one feels like magic.)
- **[Infographic/SVG]** `Rocketing Progress Bar`: Fully implemented with 0% to 80% rocketing fill, live number counter, dashed cliffhanger marker, and blinking terminal cursor `|`. Ready to connect to S09 poll and reappear on S14.

### S09 · `poll` (Be honest. It's anonymous.)
- **[URL/Link]** `Live Poll URL`: Configured with placeholder `https://forms.office.com/r/informatiq-ai` (`forms.office.com/r/informatiq-ai`) in `POLL_CONFIG` of `src/slides/S09_Poll.jsx`.
  - *Current Fallback Implemented:* Active placeholder URL with dynamic QR generation and instant copy button.
  - *Required Human Input:* Presenter can replace `POLL_CONFIG.url` and `POLL_CONFIG.shortLink` with the real MS Forms / Slido survey link before live delivery; QR code will auto-regenerate.
- **[Infographic/SVG]** `QR Code Graphic`: Fully implemented as an ultra-crisp vector SVG (≥360px) with `crispEdges` and white quiet zone.
- **[Asset]** `Mascot SVG`: Integrated `meat-typing.svg` with speech bubble callback to Act II (S11). Looping particles removed per Rule 4.4.

### S10 · `act-bad` (II · The Bad)
- *Fully implemented with dark canvas, top/bottom letterbox bars, amber glow, and centered typography.*

### S11 · `keynote-vs-terminal` (The keynote vs. my terminal.)
- **[Presenter Cue]** `Poll Q5 Integration`: Spoken cue references Poll Q5 results live ("Who got 'You're absolutely right!' this week?").

### S12 · `ninety-nine` (99% of 50% of the time.)
- *Fully implemented with kinetic typography, full stop displacement, and brand amber 50% emphasis.*

### S13 · `did-you-read` (Did you even read what I said?)
- **[Asset]** `Mascot SVG`: Integrated `meat-cry.svg` from `src/assets/meatproxy-emojis-svg/meat-cry.svg` on Build 2.
- **[Presenter Cue]** `Skipped Tests Callback`: Spoken reminder to audience that `it.skip` tests return on S36.

### S14 · `circle` (I asked for a circle.)
- **[Infographic/SVG]** `Shape Morphing Paths`: Fully implemented with 4-vertex SVG path morphing (Rectangle $\to$ Trapezium $\to$ Irregular Polygon).
- **[Infographic/SVG]** `Jittering Progress Bar`: Implemented active interval jitter between 78% and 82% with runaway elapsed clock (`1 h -> 4 h -> day 2 -> day 6`).

### S15 · `overengineered` (Enterprise-grade hello world.)
- **[Infographic/SVG]** `Enterprise File Tree`: Fully implemented with 10-item enterprise abstraction directory tree and animated `+2,184 lines` counter.
- **[Content]** `Punchline Code`: Verified vanilla one-liner: `document.documentElement.classList.toggle('dark')`.

### S16 · `make-no-mistakes` (Make it better. Make no mistakes.)
- **[Infographic/SVG]** `Chat Box Pull-Back`: Implemented camera zoom-out into "You" input textarea on Build 2, followed by clean wipe to "The Bad is the AI." on Build 3.

### S17 · `act-ugly` (III · The Ugly)
- *Fully implemented with dark canvas, solid black letterbox bars, coral indicator, and typewriter cursor completion ("…is us."). No missing pieces.*

### S18 · `thinking` (Doomscrolling…)
- **[Infographic/SVG]** `Spiky Focus Line Chart`: Fully implemented with animated SVG path, point markers, and "context rot (yours)" callout. Ready to connect and morph on S29.
- **[Asset]** `Mascot SVG`: Integrated `meat-coffee.svg` in longest wait gap.
- **[Presenter Cue]** `Poll Q2 Callback`: Spoken reference to what developers do while waiting for agent diffs.

### S19 · `frameworks` (Proven. Thorough. Not cheap.)
- **[Infographic/SVG]** `Balance Scale / Framework Logos`: Fully implemented as a line-art balance scale with interactive tilt physics (-7° tilt on Build 1, 0° balanced equilibrium on Build 2) and 4 verified industry tags (Spec Kit, AI-DLC, BMAD, OpenSpec).

### S20 · `say-vs-do` (What we say vs. what we do.)
- **[Asset]** `Mascot SVG`: Integrated `meat-meeting.svg` on left pane.
- **[Infographic/SVG]** `Split Screen Terminal`: Implemented with character-by-character `fix it` typewriter input, animated Enter key press, and Poll Q4 callback.

### S21 · `elephant` (The elephant in the room.)
- **[Infographic/SVG]** `Elephant Illustration`: Fully implemented as custom high-fidelity line-art vector elephant with dynamic token meter badge (88% consumed).
- **[Content]** `Stark Quote`: Fully implemented with dark cinematic canvas mode switch and kinetic strike-through ("technology" $\to$ "token budget"). Anchors Poll Q6 callback.

### S22 · `pick-two` (Pick two.)
- **[Infographic/SVG]** `Iron Triangle Vector`: Fully implemented with 3 distinct vertices and interactive gliding marker repelled from the impossible center equilibrium.

### S23 · `slop` (Everything is purple now.)
- **[Infographic/SVG]** `Slop Webpage Mockup`: Fully implemented as deliberate purple-gradient AI SaaS landing page with glassmorphism cards and buzzwords, zooming into 12-page grid.
- **[Asset]** `template_layout_feedback.png`: Verified and integrated into `src/assets/template_layout_feedback.png` for Exhibit A with red annotation callout.
- **[Content]** `Golden Axiom`: Wipes clean to "AI should follow our principles, not define them."

### S24 · `meat-proxy` (Don't be a meat proxy.)
- **[Infographic/SVG]** `Pipe Diagram`: Fully implemented as 3-node horizontal pipe (Client $\to$ You $\to$ AI) with bidirectional arrows.
- **[Asset]** `Mascot SVGs`: Integrated `meat-proxy.svg` on Build 0–2, swapping to `meat-shrug.svg` on Build 3.
- **[Presenter Cue]** `Poll Q7 Callback`: Spoken cue anchors "shipped code you didn't understand" ("I plead the fifth").

### S25 · `act-making-good` (IV · Making It Good)
- *Fully implemented with dark canvas, top/bottom letterbox bars, InformatiQ blue pulsing dot (#1B7ED0), and centered typography. No missing pieces.*

### S26 · `role-shift` (Promoted to orchestrator.)
- **[Asset]** `Mascot SVG`: Verified and integrated `meat-think.svg` from `src/assets/meatproxy-emojis-svg/meat-think.svg` in companion thought badge.
- **[Infographic/SVG]** `Allocation Bar & 5 Verbs`: Fully implemented with spring physics morphing bar and 5-verb vector pipeline (Understand → Decide → Delegate → Verify → Own).

### S27 · `ticket-floor` (The ticket is the floor, not the ceiling.)
- **[Infographic/SVG]** `Ticket & Orbiting Value Chips`: Fully implemented with Jira/Linear card (`INQ-1428`), 6 spring-animated floating value chips, and S06 empty calendar return in corner.

### S28 · `make-it-better` (Let's make it better.)
- **[Infographic/SVG]** `Four Data Grid Evolution States`: Fully implemented wellbore data grid evolving across 4 states: plain table ("it was fine") $\to$ purple slop (with 1280px overflow warning, rendered with drawn vector icons and zero unicode emojis) $\to$ blackboard eraser sweep $\to$ InformatiQ design system grid (filters, density toggle, keyboard focus ring, floating hover preview card, skeleton demo).

### S29 · `plan-hours` (Plan for hours. Let it run for hours.)
- **[Infographic/SVG]** `Flow Plateau Chart`: Fully implemented with S18 spiky focus line on Build 0 morphing into sustained high planning plateau (~3h deep focus) and autonomous execution band (hours to a day).

### S30 · `right-size` (One workflow per feature.)
- **[Infographic/SVG]** `Workflow Spectrum`: Fully implemented with horizontal spectrum (Chatbot $\leftrightarrow$ Full Framework), interactive animated gliding "Me" marker, and 3 sizing tier cards.

### S31 · `my-loop` (How I actually work.)
- **[Infographic/SVG]** `Three-Phase Workflow Diagram`: Fully implemented with Attended Planning (3 steps), Unattended Execution (unit ticks), Attended Checkpoint Review, looping "continue" arrow, and 3 signpost rule cards.

### S32 · `ask-everything` (Every question, answered up front.)
- **[Infographic/SVG]** `Settled Decisions Contract`: Fully implemented with 4 AI question bubbles stacking up, green ink stamp badge, 4-part plan anatomy, and real kickoff terminal prompt snippet (`temp-notes/data-inventory-redesign/README.md`).

### S33 · `files-memory` (The files are the memory. Not the chat.)
- **[Infographic/SVG]** `Working Folder Tree Diagram`: Fully implemented with fading chat context rot (Turn 47 amnesia) vs. `temp-notes/` 7-file directory tree and fresh agent resumption.

### S34 · `the-team` (Pay for judgment, not for typing.)
- **[Infographic/SVG]** `Model Tier Hierarchy`: Fully implemented with 3 vertical mixing-desk rows (Opus $$$ judges, Sonnet $$ builds & reviews, Haiku $ runs).
- **[Content]** `Agent Frontmatter Snippet`: Integrated real YAML frontmatter for `dir-implementer.md` showing fixed model, effort, and maxTurns constraints.

### S35 · `unit-loop` (One unit at a time.)
- **[Infographic/SVG]** `Unit Execution Loop Diagram`: Fully implemented with 7-stage cyclic DAG flow, red failure re-entry arc (≤ 5 rounds), live DAG tick progression, and one-review/one-fix-round punchline kicker.

### S36 · `dont-trust` (Never trust "it passes".)
- **[Infographic/SVG]** `1280px Viewport Wireframe`: Fully implemented with false-positive green checks stack vs. 1280px rig viewport visual bugs (clipped popover, column misalignment, duplicate tooltip).
- **[Infographic/SVG]** `Verification Probe Split & Commit Gate`: Fully implemented with Orchestrator/Haiku/Sonnet probe split and unskippable git pre-commit hook (`no --no-verify allowed`).

### S37 · `hard-way` (Learned the hard way.)
- **[Content]** `Real Incident Quotes`: Anonymized real-world engineering incident postmortem tickets (untracked file deletion, 65-min hang, wrong element measured).
- **[Asset]** `Mascot SVG`: Verified and integrated `meat-sweat.svg` from `src/assets/meatproxy-emojis-svg/meat-sweat.svg` in standing rules card on Build 2.

### S38 · `receipts` (The receipts.)
- **[Data/Receipts]** `Actual Token & Cost Numbers`: Production token metrics verified (~0.25M tokens for 13 units, ~$1.50 per unit, ~165k tokens for 2 browser checkpoints, 10–30 commits per overhaul feature) rendered with rapid kinetic count-up animations (≤ 600ms).

### S39 · `stateless` (It re-reads everything. Every time.)
- **[Infographic/SVG]** `Context Token Stack & Cache Traps`: Fully implemented with 185k token conversation stack payload trip, Cache TTL timer expiration, compaction amnesia, and `/clear` + hand-off note architectural fix.

### S40 · `routing` (Right model. Right effort. Right context.)
- **[Infographic/SVG]** `Three Hardware Control Levers`: Fully implemented with Model (Haiku/Sonnet/Opus), Effort (low/medium/max), and Context (`permissions.deny` code snippet for `.env` and `dist/**`), accompanied by the `.claudeignore` myth-buster.

### S41 · `shared-repo` (Build it once. Share it with everyone.)
- **[Infographic/SVG]** `Radial Hub and Spokes Diagram`: Fully implemented with `team-ai-toolbox.git` central node radiating to 5 shared tool categories (skills, plugins, commands, agents, workflows with S07 manual-generator callback) and open starter kit invite.

### S42 · `doom-flip` (Remember the wrong slide?)
- **[Infographic/SVG]** `Five Steps Flip Cards`: Fully implemented with 3D staggered card flips (`rotateX(180deg)`), S03 LineArtGlobe return with dynamic status bubble, title morph ("...only if we let it."), and the core philosophical takeaway banner.
- **[Chrome]** `Corner Dot`: Configured with `#111113` neutral ink dot override in `manifest.js` and `App.jsx` matching S03.

### S43 · `thanks` (Questions? Humans only.)
- **[Content]** `Presenter Name & Handles`: Configured placeholders `[Presenter name]` and `@presenter` ready for real presenter handles.
- **[Asset]** `BS23 Logo`: Verified and integrated from `src/assets/bs23_logo.webp`.
- **[Asset]** `Mascot SVG`: Verified and integrated `meat-wave.svg` from `src/assets/meatproxy-emojis-svg/meat-wave.svg` with floating idle animation and after-party callback speech bubble.

---

### Batch 9 · End-to-End Polish & Verification
- **[Full Deck Integrity]** All 43 slide components (`S01_Title.jsx` through `S43_Thanks.jsx`) verified present on disk, cleanly registered in `manifest.js`, and dynamically resolved by `registry.js`.
- **[Asset Integrity]** Verified all 21 asset paths across `bs23_logo.webp`, `informatiq-app-suite-logos/*.svg`, `meatproxy-emojis-svg/*.svg`, and `template_layout_feedback.png` resolve to valid files.
- **[Design Rules Audit]** Automated static scan confirmed:
  * Zero unicode emoji characters across slide copy and labels (only approved Dingbat checkmark `✓` permitted).
  * Zero purple / violet / fuchsia / indigo Tailwind classes or hex colors outside intentional slop jokes in `S23_Slop.jsx` and `S28_MakeItBetter.jsx`.
  * All SVG vector strokes and borders verified $\ge 2\text{px}$ (zero hairlines).
- **[Presentation Engine]** Verified full keyboard suite across Audience View and Presenter View (`ArrowRight`, `ArrowLeft`, `Space`, `Enter`, `PageDown`, `PageUp`, `Home`, `End`, `F`, `O`, `Escape`).
- **[Build Progression]** Verified multi-click forward and backward navigation across all 43 slides, including proper restoration of completed build states when traversing backwards.
- **[Dual-Window Synchronization]** Verified bidirectional sync via `BroadcastChannel('informatiq-slide-sync')` and `localStorage` fallback with de-duplicated client IDs.
- **[Rule 1 Cut Tier Verification]** Automated simulation verified contiguous live corner badge numbering (01 to 43 default; 01 to 40 with Tier A cut; 01 to 36 with Tier A+B cut) without gaps or broken indices.
- **[Presenter View `/presenter`]** Verified dual 16:9 previews (Live Screen + Coming Next), live digital timer with Start/Pause/Reset, pacing indicators against cumulative plan, build indicator dots, and rich cue cards with `[1]`, `[2]`, quotes, and pause styling.
- **[Verification Gate]** `npm run build` exits 0 with zero warnings, zero broken imports, and 100% bundle generation.

