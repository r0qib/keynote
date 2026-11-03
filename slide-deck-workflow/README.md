# Slide Deck Workflow & Autonomous Implementation Blueprint

> **Presentation:** *AI-Assisted Development: The Good, the Bad and the Ugly*  
> **Audience:** Engineers at Brain Station 23 / InformatiQ  
> **Format:** Microsoft Teams Live Screen Share (16:9 1080p, ~80 min total, 43 slides)  
> **Execution Mode:** Autonomous Run via AntiGravity CLI (Unattended, Decisive, File-Driven Memory)

---

## 1. Project Context & Objectives

### 1.1 The Presentation Story
This presentation is an honest, relatable, and humorous exploration of how software engineering teams (specifically working on the **InformatiQ** suite for Norwegian offshore drilling) use generative AI.

The narrative arc centers on one pivotal insight:
> *"The Bad is the AI. The Ugly… is us."*

- **Opening (S01–S04):** Contextualizes our work (software for the middle of the North Sea where wrong code has real consequences on rigs), features a fake "wrong slide" gag, and sets expectations.
- **Act I · The Good (S05–S08):** Authentic praise for AI: time returned to developers, self-writing user manuals, and the magic speed of early iterations.
- **Live Poll (S09):** Interactive MS Forms poll scanning habits and opinions, creating data called back throughout the rest of the talk.
- **Act II · The Bad (S10–S16):** The quirks and limitations of the models: keynotes vs. terminal reality, hallucinations, ignoring instructions, overengineering simple tasks, and the endless loop of fixing one bug to introduce another.
- **Act III · The Ugly (S17–S24):** Our own human shortcomings: doomscrolling while waiting for agents, claiming to follow expensive frameworks (AI-DLC, Spec Kit) that we abandon, budget panic, AI slop, and becoming passive "meat proxies".
- **Act IV · Making It Good (S25–S41):** The substantive solution (longest chapter, ~25% of total time): shifting from typist to orchestrator, planning for hours so the AI can run for hours, feature-specific workflows, model routing, verification gates ("never trust it passes"), and real cost discipline.
- **Finale & Q&A (S42–S43):** Payoff of the opening wrong-slide gag into 5 actionable takeaways, followed by questions (humans only).

### 1.2 References & Primary Source Documentation
All implementation agents must refer directly to the existing docs for granular details:
- **Slide Plan & Builds:** [`docs/plans/slide-deck-plan.md`](../docs/plans/slide-deck-plan.md) — Comprehensive visual layouts, copy, build click-steps, and transitions for every slide (S01–S43).
- **Presenter Notes:** [`docs/plans/presenter-notes.md`](../docs/plans/presenter-notes.md) — Glanceable talking points, timing checkpoints, jokes, and cue cards.
- **Presenter Script:** [`drafts/presenter-script.md`](../drafts/presenter-script.md) — Full run sheet, pre-flight checklists, cut lists (Tiers A and B).
- **Core Rules:** [`docs/notes/project_rules.md`](../docs/notes/project_rules.md) — Functional constraints (manifest toggle, presenter view, 16:9 ratio, no clutter).
- **Animation Guide:** [`docs/notes/animation_guide.md`](../docs/notes/animation_guide.md) — Keynote-grade motion guidelines (smooth easing, Framer Motion).
- **Agentic Workflow Reference:** [`docs/context/AGENTIC-WORKFLOWS.md`](../docs/context/AGENTIC-WORKFLOWS.md) — The operational methodology being implemented.

---

## 2. Technical Architecture & Foundation

### 2.1 Technology Stack
- **Framework:** React 18 (`src/`) with Vite 5.
- **Styling:** Tailwind CSS (`tailwind.config.js`).
- **Motion & Transitions:** Framer Motion 11 (`framer-motion`).
- **Icons & Assets:** Lucide React (`lucide-react`), custom SVGs in `src/assets/`.
- **Target Ratio:** 16:9 fixed presentation canvas (designed at 1920×1080), fitted dynamically to the viewport without page scrollbars.

### 2.2 Slide Manifest Contract (`src/slides/manifest.js`)
Per Project Rule 1, slides are strictly configured in a centralized manifest.
Each slide entry conforms to this contract:
```javascript
export const slideManifest = [
  {
    id: 'S01',
    key: 'title',
    title: 'AI-Assisted Development: The Good, the Bad and the Ugly',
    cornerLabel: '', // empty for unbadged slides (S01, chapter cards, S43)
    act: 'Opening',
    durationMinutes: 1.0,
    enabled: true,    // toggled off to skip before presentation
    cutTier: null,    // null | 'A' | 'B' (A = cut first, B = cut second)
    totalBuilds: 0,   // number of click-steps on this slide
    componentName: 'Slide01_Title',
    notes: 'Warm-up: Ask for laugh reaction. Who I am, InformatiQ team...',
  },
  // ... S02 to S43
];
```
**Dynamic Renumbering Rule:**
The slide counter on screen (e.g., `02 / Who we are` or `31 / Feature-specific workflows`) calculates its live index exclusively from currently **enabled** slides. If slide S15 is disabled, S16 becomes index 15 on screen.

### 2.3 Presenter View Architecture (Project Rule 2)
To fulfill the requirement of an independent presenter view for Teams screen-sharing:
1. **Audience View (`/`):** The clean presentation window shared in Microsoft Teams. No notes, no dock, no timer, only slide chrome.
2. **Presenter View (`/presenter` or toggleable popup):** Opened on the presenter's secondary monitor.
   - Shows live elapsed timer and pacing indicator against planned timestamps.
   - Displays current slide preview and next slide preview.
   - Shows cue card notes and poll callbacks for the active slide.
   - Displays build state (e.g., `Build 1 / 3`).
   - Synchronized with the audience window via `BroadcastChannel` (`'informatiq-slide-sync'`) and mirrored to `localStorage`.
   - Keyboard hotkeys (`→`, `Space`, `←`, `Home`, `End`) in either window advance both synchronously.

### 2.4 Multi-Click Build Mechanism
Slides with progressive reveals (e.g., S02 logos rising, S11 keynote vs terminal bullet reveals) use a unified `buildStep` state:
- When the user presses `→` or `Space`:
  - If current slide has `buildStep < totalBuilds`: increment `buildStep`.
  - If `buildStep === totalBuilds`: transition to the next slide with `buildStep = 0`.
- When the user presses `←`:
  - If `buildStep > 0`: decrement `buildStep`.
  - If `buildStep === 0`: transition to previous slide at its maximum `totalBuilds`.

---

## 3. Design System & Visual Guidelines

### 3.1 Color System
- **Canvas:** Off-white `#FAFAFB`.
  - *Hard Rule:* **Drop the dot grid.** Repeating dot patterns shimmer and produce heavy video artifacts under Teams compression.
- **Ink (Primary Text):** `#111113`.
- **Secondary Text / Muted:** `#4A4A55`.
  - *Rule:* Do not use light gray text. It washes out under screen-share compression.
- **Brand Blue:** InformatiQ `#1B7ED0` (from `src/assets/informatiq-app-suite-logos/informatiq.svg`).
- **Act Accent Colors:** Used only for chapter cards, corner dot badges, and one focal highlight per slide:
  - Act I · The Good: Green `#1E9E6A`
  - Act II · The Bad: Amber `#D97706`
  - Act III · The Ugly: Coral `#E5484D`
  - Act IV · Making It Good: InformatiQ Blue `#1B7ED0`
- **Mascot Pink:** `#F6A6A4` (reserved exclusively for the meat blob).
- **Dark Canvas Exception:** Chapter cards (S05, S10, S17, S25) and S21 (Tony Stark quote). All other slides are light canvas.

### 3.2 Visual Constraints & Prohibitions
- **No Purple:** Purple is strictly forbidden across the entire deck, *except* on S23 and S28 where purple AI slop is the deliberate joke.
- **No Emoji Characters:** Never render unicode emojis in slide copy or graphics. The only permitted glyph is the terminal checkmark `✓`.
- **No Floating File Pills:** Eliminate the top-left `// filename.tsx` demo pills.
- **No Generic Card Layouts:** Avoid defaulting to 3-column feature cards or generic PowerPoint grids. Use diagrams, horizontal timelines, comparisons, and custom visual metaphors.
- **Teams Compression Optimization:**
  - Minimum stroke width: `2px`. No hairline borders.
  - Solid shapes over subtle gradients (which band in video).
  - Avoid heavy box-shadows, blurs, and particle effects.

### 3.3 Typography Standards
- **Font Families:** SF Pro Display / Inter for headings and body; SF Mono for terminal and code.
- **Headlines:** Minimum 72px at 1080p. Statements in sentence case with terminal punctuation (e.g., *"We got our time back."*).
- **Body Copy:** Minimum 28px.
- **Labels / Badges:** Minimum 20px.
- **Generous Whitespace:** Slides must feel spacious and focused on one idea.

### 3.4 Mascot Usage (`src/assets/meatproxy-emojis-svg/`)
The pink blob mascot represents "the engineer / us". It is a recurring character, used on ~10 slides total (never wallpaper):
- S06: `meat-cool.svg` (time back)
- S07: `meat-done.svg` (human review completed)
- S09: `meat-typing.svg` (live poll)
- S13: `meat-cry.svg` (deadpan sadness)
- S18: `meat-coffee.svg` (waiting for agent)
- S20: `meat-meeting.svg` (passive meeting listener)
- S24: `meat-proxy.svg` → `meat-shrug.svg` (the meat proxy)
- S26: `meat-think.svg` (promoted to orchestrator)
- S37: `meat-sweat.svg` (production incidents)
- S43: `meat-wave.svg` (closing thank you)

---

## 4. Animation & Motion Guidelines

### 4.1 Keynote Standard (Apple WWDC / Google I/O feel)
- Motion must be intentional, purposeful, and choreograph storytelling.
- Use `appleEase` (`[0.16, 1, 0.3, 1]`) and gentle spring physics (`stiffness: 280, damping: 22`). Overshoot must be $\le 3\%$.
- Durations: Element motion **400–900 ms**; Slide transitions **$\le$ 700 ms**.
- Avoid repetitive animations (no standard fade-in on everything, no spin, no bounce).

### 4.2 Key Animation Archetypes
1. **Chapter Morph:** Title on a chapter card shrinks and travels into the top-right corner dot/badge of the following slide.
2. **Progressive SVG Drawing:** Path animation (`drawSvg` with `pathLength`) for flowcharts, horizon lines, pipelines, and connectors.
3. **Staggered Ensembles:** Stagger item reveals by 60–90ms so elements enter in sequence without feeling mechanical.
4. **Shared Element Transitions ("Magic Move"):**
   - Calendar block in S06 $\to$ S18 $\to$ S27
   - Rocketing progress bar in S08 $\to$ jittering stuck bar in S14
   - Eraser wipe in S03 $\to$ S28
   - Mascot blob in S24 $\to$ S26

---

## 5. Tuned-down Autonomous Agentic Workflow Protocol

This protocol adapts [`docs/context/AGENTIC-WORKFLOWS.md`](../docs/context/AGENTIC-WORKFLOWS.md) for the autonomous generation of the slide deck using AntiGravity CLI subagents.

```
                  BATCH EXECUTION LOOP (Sequential Pair)
┌────────────────────────────────────────────────────────────────────────┐
│  STEP 1: Implementer Subagent                                          │
│  - Reads next batch scope from progress.md                             │
│  - Reads exact slide specs in docs/plans/slide-deck-plan.md            │
│  - Reads presenter notes in docs/plans/presenter-notes.md              │
│  - Overwrites/creates slide components in src/slides/S<id>_<name>.jsx  │
│  - Registers slides in src/slides/manifest.js                          │
│                                                                        │
│  STEP 2: Reviewer Subagent                                             │
│  - Checks diff against Design Rules (Teams contrast, no purple/emoji)   │
│  - Runs verification gate: npm run build                               │
│  - If build red -> sends targeted fix to Implementer (max 1 fix round) │
│  - Logs autonomous choices in decision log.md                          │
│  - Logs missing pieces in missing pieces.md                            │
│  - Marks batch slides as [x] in progress.md                            │
└────────────────────────────────────────────────────────────────────────┘
```

### 5.1 The Iron Rules of Unattended Autonomous Execution

1. **Zero Interactive Interruption:**  
   During the implementation phase, AI agents **NEVER stop to ask questions** to the human user. Every settling decision has been recorded, or must be decided autonomously by the agent and documented in [`decision log.md`](./decision%20log.md).
2. **Strict Minimal Subagent Fan-Out (Implementer + Reviewer Pair):**  
   To prevent context thrashing, token exhaustion, and file collisions:
   - **Do NOT launch wide swarms of parallel agents.**
   - Run in disciplined **sequential batches** (Batch 0 through Batch 9).
   - Use an **Implementer + Reviewer pair**: exactly one subagent is active at any time. The Implementer writes the batch; the Reviewer verifies against design rules and runs `npm run build`.
   - Maximum 1 fix round per batch. Perfectionism loops are prohibited.
3. **Overwrite in Place:**  
   Legacy experimental demo slides in `src/slides/` are replaced directly in place as new slides are written.
4. **Files Are the Source of Truth:**  
   Agents must never assume context carries over across conversations or resets. The working state is completely preserved in:
   - [`progress.md`](./progress.md)
   - [`missing pieces.md`](./missing%20pieces.md)
   - [`decision log.md`](./decision%20log.md)
   - `src/slides/manifest.js`
5. **Mandatory Build Verification Gate:**  
   Before marking any slide as complete, the agent must run:
   ```bash
   npm run build
   ```
   If the build fails, the Implementer must diagnose and fix the failure immediately before committing.
6. **No Blind Mocking / No Hallucinated Data:**  
   If an illustration, external URL, or specific metric is not readily available:
   - Implement an elegant, clean SVG or semantic placeholder that does not break the layout.
   - Record the exact gap and suggested resolution in [`missing pieces.md`](./missing%20pieces.md).

---

## 6. Execution Batches

The 43 slides are grouped into logical execution units to maintain clean boundaries and allow incremental verification:

| Batch | Scope | Slides | Description |
|---|---|---|---|
| **Batch 0** | Core Engine | Foundation | Slide manifest, router/navigation, presenter view dual-window sync, layout container |
| **Batch 1** | Opening | S01–S04 | Title, Who we are (rig & logos), Wrong-slide gag, Agenda |
| **Batch 2** | Act I · The Good | S05–S08 | Chapter card, Time back, User manuals, Day one magic |
| **Batch 3** | Interactive Poll | S09 | Live QR code & MS Forms poll interaction |
| **Batch 4** | Act II · The Bad | S10–S16 | Keynote vs terminal, 99%, Did you read?, Circle/Trapezium, Overengineered, Make no mistakes |
| **Batch 5** | Act III · The Ugly | S17–S24 | Chapter card, Doomscrolling, Frameworks, Say vs Do, Elephant, Pick Two, Slop, Meat Proxy |
| **Batch 6** | Act IV · Making It Good (I) | S25–S33 | Role shift, Floor not ceiling, Make it better, Plan hours, Right-size, My loop, Ask everything, Files as memory |
| **Batch 7** | Act IV · Making It Good (II) | S34–S41 | The team, Unit loop, Don't trust it passes, Hard way incidents, Receipts, Stateless agents, Routing, Shared repo |
| **Batch 8** | Finale & Q&A | S42–S43 | Doom flip payoff (5 takeaways), Closing thank you & Q&A |
| **Batch 9** | Polish & E2E Verification | Deck | Global keyboard shortcuts, full run-through verification, asset integrity, build validation |
