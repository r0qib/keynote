# Autonomous Implementation Decision Log

> **Context & Purpose:**  
> The slide generation phase runs **unattended and autonomously**. No questions are answered by human developers during execution.  
> When an AI agent encounters design choices, layout ambiguities, technical trade-offs, or missing assets, the agent must make a decisive, principled judgment, proceed forward, and log the decision here.  
>  
> **What MUST be logged:**  
> - Architectural choices (state synchronization, manifest schema, hook structures)  
> - Significant layout or composition interpretations  
> - Fallback visual implementations when assets are missing  
> - Animation choreography and pacing decisions  
> - Content trims or adaptations made to preserve 16:9 1080p legibility  
>  
> **What should NOT be logged:**  
> - Trivial syntax choices or minor CSS class adjustments  
> - Routine bug fixes that adhere directly to the plan  

---

## Log Entry Standard Format

```markdown
#### [DATE] · [SLIDE_ID] · [TITLE / TOPIC]
- **Autonomous Decision:** Concrete description of the choice made.
- **Rationale:** Why this decision was made (e.g. Teams readability, performance, narrative alignment).
- **Alternatives Rejected:** What other options were considered and why they were declined.
```

---

## Foundation & Architectural Decisions (Batch 0)

#### 2026-11-03 · ARCH-01 · Manifest-Driven Slide Architecture
- **Autonomous Decision:** Centralized all 43 slides into `src/slides/manifest.js` containing active state, cut tiers (`A`, `B`), timing, notes, and build steps. Slides are imported dynamically or through a strict registry map.
- **Rationale:** Strictly satisfies Project Rule 1. Allows instant toggling of slides before delivery while automatically recalculating the on-screen slide numbering (`02 / 38`) without breaking transitions.
- **Alternatives Rejected:** Hardcoding slides in `App.jsx` array (violates Rule 1, causes index corruption when slides are disabled).

#### 2026-11-03 · ARCH-02 · Dual-Window Presenter Synchronization via BroadcastChannel
- **Autonomous Decision:** Implemented window synchronization between the audience presentation view (`/`) and presenter view (`/presenter`) using the browser's native `BroadcastChannel` API (`'informatiq-slide-sync'`), with a `localStorage` fallback.
- **Rationale:** Microsoft Teams screen-sharing shares the audience window exclusively on Screen A while the presenter keeps notes, elapsed timers, and next-slide previews private on Screen B (satisfies Project Rule 2). `BroadcastChannel` provides zero-latency local event transmission without needing a backend server. Confirmed by user in planning session.
- **Alternatives Rejected:** Single-window overlay or floating drawer (risks accidentally sharing presenter notes to 50+ Teams attendees during presentation).

#### 2026-11-03 · ARCH-03 · Overwrite-in-Place Legacy Demo Slide Retirement
- **Autonomous Decision:** Overwrite existing experimental demo files in `src/slides/` directly as the new slide implementations (S01–S43) are written.
- **Rationale:** Keeps repository directory structure minimal, prevents unused file accumulation, and ensures clean imports. Confirmed by user in planning session.
- **Alternatives Rejected:** Archiving into a separate folder or maintaining legacy routing.

#### 2026-11-03 · TEAM-01 · Implementer + Reviewer Paired Subagent Protocol
- **Autonomous Decision:** Adopted a disciplined 2-agent sequential pair per batch: 1 Implementer subagent writes the slide components and manifest entries, followed by 1 Reviewer subagent who verifies against the design system/Teams compression rules and runs `npm run build`.
- **Rationale:** Aligns with the core InformatiQ agentic workflow principle ("one review pass, HIGH/MEDIUM only") while maintaining minimal subagent fan-out (max 1 active agent at any given moment). Catches regressions before marking batches complete. Confirmed by user in planning session.
- **Alternatives Rejected:** Unchecked single-agent runs (prone to missed visual guidelines) and broad parallel swarms (violates minimal subagent constraint, causes manifest collisions).

#### 2026-11-03 · DESIGN-01 · Removal of Dot Grid and Micro-Borders
- **Autonomous Decision:** Enforced a solid `#FAFAFB` background canvas and removed dot grids, background blurs, and hairline (<2px) strokes across all slides.
- **Rationale:** Real-world Microsoft Teams video encoding uses aggressive lossy compression that turns fine dot grids and micro-gradients into shimmering compression artifacts.
- **Alternatives Rejected:** Keeping the subtle dot grid from early prototypes (would degrade Teams presentation visual quality).

#### 2026-11-03 · DESIGN-02 · Custom Inline SVG Components for Missing Illustrations
- **Autonomous Decision:** When static SVG assets are not present in `src/assets/`, implement them as clean, self-contained React SVG components with standard `stroke-2`, vector paths, and theme-token colors.
- **Rationale:** Prevents layout breakage, avoids external network dependencies during offline rehearsals, and allows Framer Motion path animation (`pathLength`).
- **Alternatives Rejected:** Using generic Lucide icons for specialized concepts (e.g. offshore rig, meat proxy pipe) or omitting visuals entirely.

---

## Per-Slide Decision Register

### Opening (S01–S04)
#### S01 · `title`
- **Autonomous Decision:** Implemented clean typographic layout with staggered Framer Motion underlines for "Good" (#1E9E6A), "Bad" (#D97706), and "Ugly" (#E5484D) entering with distinct timing delays (0.8s, 1.1s, 1.4s). Quiet BS23 logo anchored in bottom-left at opacity 0.8.
- **Rationale:** Strict adherence to Apple WWDC typographic minimalism. Underlines visually establish the 3 act color tokens immediately without visual noise.
- **Alternatives Rejected:** Overly complex 3D floating pills or particle effects from legacy prototypes (distracting, violate Teams compression rules).

#### S02 · `who-we-are`
- **Autonomous Decision:** Created a custom high-fidelity architectural vector line-art offshore drilling rig (derrick, helipad with 'H', living quarters, crane, flare boom, substructure legs) and aligned the 8 InformatiQ suite app logos horizontally across the lower-third horizon line. Build 0 draws horizon and rig, Build 1 staggers logos upward, Build 2 reveals the stakes line. During review, all rig detail and ripple strokes were hardened to strictly ≥ 2px (eliminating hairlines) for Teams video resilience.
- **Rationale:** No external static offshore rig SVG was provided. An inline vector graphic ensures zero network dependencies, perfect scaling, and crisp 2px line rendering under Teams video compression.
- **Alternatives Rejected:** Using generic Lucide icons or stock photography of oil platforms (violates monochrome line-art aesthetic and design guidelines).

#### S03 · `wrong-slide`
- **Autonomous Decision:** Executed the deadpan gag using a serious orthographic line-art globe with animated typing indicator dots `•••` on Build 0. On Build 1, an authentic blackboard wooden duster sweeps across the text with trailing chalk dust specks, fading/blurring the original text and revealing the after-party warning. During review, the unicode warning emoji was replaced with an inline SVG warning icon, and globe latitude strokes were standardized to ≥ 2px.
- **Rationale:** The gag must appear 100% legitimate initially to work comedically for the audience. The physical eraser wipe and subtle dust specks deliver the punchline without breaking the presentation flow. Replacing unicode emojis with inline SVGs prevents OS-specific color emoji rendering differences on Teams calls.
- **Alternatives Rejected:** Abrupt slide skip or unstyled alert box (ruins the deadpan comedic timing).

#### S04 · `agenda`
- **Autonomous Decision:** Implemented solid top and bottom letterbox bars (24px height) invoking a cinematic Western motif. Laid out the four acts horizontally with their respective colored dots. On Build 1, Acts I-III dim to opacity 0.42 while Act IV ("Making It Good") receives an InformatiQ blue underline and the badge "the longest chapter (~45%)" with an inline SVG star. Build 2 reveals the live poll and Q&A footer.
- **Rationale:** Provides clear narrative orientation and foreshadows where the presenter will spend substantive time (the fix in Act IV), directly supporting the presenter notes.
- **Alternatives Rejected:** Generic bulleted list or 4 vertical cards with identical visual weight.

---

### Act I · The Good (S05–S08)
#### S05 · `act-good`
- **Autonomous Decision:** Implemented cinematic chapter card with full dark canvas (`bg-[#111113]`), solid top/bottom black letterbox bars, pulsing green dot kicker "ACT I", huge bold title "The Good" in brand green (`#1E9E6A`), and subtle radial emerald ambient glow behind center stage. During review, letterbox divider borders were hardened to `border-2` (eliminating hairlines).
- **Rationale:** Establishes the chapter card visual language shared across S05, S10, S17, and S25. Green color connects smoothly into S06's corner accent dot. Letterbox bars create an intentional tonal shift from the Opening.
- **Alternatives Rejected:** Light background card (fails to provide distinct chapter boundary transition).

#### S06 · `time-back`
- **Autonomous Decision:** Built a 5-column week calendar grid (MON–FRI). Build 0 renders full chore blocks describing manual toil (CRUD endpoints, Unit tests, Migration script, That one regex, Docs nobody reads). Build 1 shrinks blocks down with spring physics (`springPhysics`) into thin green slivers (10-15 min) leaving the calendar vast and open, while `meat-cool.svg` slides in wearing sunglasses from the bottom-right. Build 2 overlays the quiet ink statement in the center: `"…so what are we doing with it?"`. Updated `totalBuilds` from 1 to 2 in `manifest.js`. During review, internal block dividers were hardened to `border-t-2`.
- **Rationale:** Physical shrinking of blocks provides immediate visceral satisfaction of toil elimination. The hanging question on Build 2 sets up callbacks on S18 and S27 without cluttering the initial reveal.
- **Alternatives Rejected:** Generic bar chart or pie chart of time savings (misses the relatable day-to-day engineer schedule context).

#### S07 · `manuals`
- **Autonomous Decision:** Created a split screen composition: Left side features a 7-stage automated documentation pipeline with SVG connector paths, highlighting stage 2 ("What changed?") in emerald `#1E9E6A` with a "THE CLEVER BIT" badge. Right side displays a clean, neutral web app window mockup (subsea BPV monitor) with metrics and controls. Build 0 shows pipeline and app mockup; Build 1 animates numbered callout pins `(1)`, `(2)`, `(3)` onto the screenshot with spring pops and activates the diff glow; Build 2 lights up stage 6 ("Human Review") with a green checkmark, rubber-stamps with `meat-done.svg`, and reveals the takeaway banner: *"A human still signs off. We removed the toil, not the person."* During review, sub-borders across the badge pill, app header, and status chip were hardened to `border-2` for strict Teams video screen-share legibility.
- **Rationale:** Conveys both the technical architecture (incremental diff snapshot) and the tangible output (annotated user manual) simultaneously, reinforcing that human verification remains mandatory.
- **Alternatives Rejected:** Real customer production screenshot (violates confidentiality) or purely abstract architecture diagram (fails to show what the generated manual actually looks like).

#### S08 · `first-80`
- **Autonomous Decision:** Designed a massive, thick progress bar centered on canvas. Build 0 renders the 0% empty track with a 100% boundary marker. Build 1 triggers an animated rocket fill 0% → 80% with an animated numerical counter in 0.65s using `appleEase`, stopping abruptly at a dashed 80% marker with an endlessly blinking terminal cursor caret `|`. Subtext highlights *"the first 80% (in an afternoon)"* with quote *"Ten-x engineer. Already drafting the LinkedIn post."*
- **Rationale:** High contrast and massive scale emphasize initial AI speed while the abrupt halt and blinking caret create narrative tension and a cliffhanger bridge into the S09 audience poll, while preserving the bar for reuse on S14.
- **Alternatives Rejected:** Standard thin loading bar or multi-bar comparative graph (dilutes the dramatic impact of stopping dead at 80%).

---

### Poll Interlude (S09)
#### S09 · `poll`
- **Autonomous Decision:** 
  1. Built an ultra-crisp vector SVG QR code (≥360px) with pure white quiet zone and `shape-rendering="crispEdges"` encoding `https://forms.office.com/r/informatiq-ai`. Supported both instant pre-rendered SVG and dynamic runtime regeneration via `qrcode`. During review, the card container was expanded to `max-w-[460px] md:max-w-[480px]` ensuring the `md:w-[360px]` SVG renders at full unconstrained size without clipping or margin clamping.
  2. Assigned neutral ink dot (`#111113`) to `ACT_COLORS.Poll` across `App.jsx`, `PresenterView.jsx`, and modals, visually reflecting that the interlude sits between Act I and Act II and belongs to neither act. During review, dark theme PresenterView contrast was hardened so the neutral indicator is rendered with a clean light border/pill on dark headers.
  3. Reserved a stable layout slot below the ≥72px headline for Build 1's afterthought `"(Trust me. I'm one of you.)"`, ensuring zero visual jump or layout shift when advancing build steps.
  4. Embedded a subtle circular presenter pacing ring (2:30 countdown) in the QR card header with start/pause/reset controls to aid presenter timing without drawing attendee attention.
  5. Positioned mascot `meat-typing.svg` with static, high-res presentation (removing continuous bobbing and floating particles per Rule 4.3 and Rule 4.4 to eliminate lossy Teams compression blur and preserve video bitrate) and speech bubble (`"I can't see who answered. Only the percentages."` and `"Camera on, brain optional? Answer question 4."`).
  6. Provided an interactive copy-to-clipboard button with visual checkmark feedback for easy pasting into Microsoft Teams chat.
- **Rationale:** Ensures guaranteed camera scanability from laptop screens through Teams lossy video compression while giving the presenter clear pacing cues and comedic relief before plunging into Act II (The Bad).
- **Alternatives Rejected:** Using a generic raster PNG QR code (blurs under video compression and fails camera scanning), keeping continuous looping animations on the mascot (violates Rule 4.3/4.4 and causes video encoding artifacts), or hardcoding a static non-interactive URL string.

---

### Act II · The Bad (S10–S16)
#### S10 · `act-bad`
- **Autonomous Decision:** Reused cinematic chapter card architecture from S05 with dark canvas (`bg-[#111113]`), top/bottom black letterbox bars (`border-2 border-neutral-900`), pulsating amber indicator dot, and huge title "The Bad" in brand amber (`#D97706`). Subtitle: *"The models are weird in very specific ways."*
- **Rationale:** Establishes consistency across act transition cards while visually switching the deck's thematic accent from Act I green (`#1E9E6A`) to Act II amber (`#D97706`).
- **Alternatives Rejected:** Light canvas card (dilutes the dramatic chapter break).

#### S11 · `keynote-vs-terminal`
- **Autonomous Decision:** Designed a non-generic split composition contrasting stage marketing against terminal realities. Left side features high-polish keynote typography ("Autonomous.", "Zero context loss.", "Like a senior engineer who never sleeps."). Right side features a dark, realistic macOS terminal window where the user complains `"the button still doesn't work"` and the agent sycophantically apologizes before outputting the exact same broken invocation (`onClick={handleClick()}`). Bottom footer anchors the Poll Q5 developer frustration callback: *"Not a senior engineer who never sleeps. A very fast junior with short-term amnesia."* During review, the code badge border was hardened from `border` to `border-2` for strict Teams screen-share readability.
- **Rationale:** Avoids generic 2-column cards; makes the humor visceral and relatable for developers, while directly tying into the audience poll from S09.
- **Alternatives Rejected:** Mock chat app UI with generic blue bubbles (lacks the authentic code editor/terminal feel).

#### S12 · `ninety-nine`
- **Autonomous Decision:** Implemented pure kinetic typography centered on screen. Build 0 shows *"AI follows your instructions 99% of the time."* with confident full stop. On Build 1, the full stop slides away and *"of 50% of the time."* slides in with an emphatic brand amber underline on `50%`. Presenter subtext reveals context dilution: *"The worst part isn't the 50%. It's that you never know which half you're in."*
- **Rationale:** Emphasizes the comedic twist purely through typography timing, creating an intentional pause for audience nods before flipping the claim.
- **Alternatives Rejected:** Complex pie chart or accuracy graph (distracts from the deadpan one-liner).

#### S13 · `did-you-read`
- **Autonomous Decision:** Built a single fixed viewport that cycles through 3 instruction-result pairs in place (never showing all 3 at once):
  1. `"Don't touch the tests"` $\to$ `it.skip` diff and green pass badge (sets up S36 callback).
  2. `"Only change the button colour"` $\to$ 14 files changed, 612 insertions git diff stat.
  3. `"No comments in the code, please"` $\to$ single comment `// Removed all comments as requested`, paired with `meat-cry.svg` sitting sadly in the lower-right corner.
- **Rationale:** Prevents visual clutter on 16:9 slides, maintains large readable typography (≥20px), and introduces `meat-cry.svg` at the exact emotional punchline.
- **Alternatives Rejected:** 3-column side-by-side layout (unreadable text under Teams 1080p compression).

#### S14 · `circle`
- **Autonomous Decision:** Implemented SVG path morphing across 4-point coordinates (`M x y L x y L x y L x y Z`) allowing Framer Motion to smoothly morph between a Rectangle (Build 0), an Isosceles Trapezium (Build 1), and a Skewed Irregular Polygon (Build 2) labelled `"Perfect! Here's your circle. ✓"`. On Build 3, S08's progress bar returns along the bottom, dynamically jittering between 78% and 82% via an active interval while an elapsed runaway clock ticks `1 h -> 4 h -> day 2 -> day 6`. During review, the fine dot-grid canvas background was removed per DESIGN-01 to prevent video shimmering under Teams lossy compression.
- **Rationale:** Directly pays off S08's cliffhanger while illustrating the agony of the "last 20%" through both visual shape failure and stuck progress animation.
- **Alternatives Rejected:** Static images of shapes (loses the fluid "magic-move" morphing effect).

#### S15 · `overengineered`
- **Autonomous Decision:** Built an asymmetric 2-column layout (5-col prompt vs 7-col file tree). Build 0 presents the simple prompt `"Add a dark mode toggle."`. Build 1 cascades a 10-file enterprise architecture tree (`ThemeProvider`, `ThemeStrategyFactory`, `ThemeRegistry`, `docs/THEME_ARCHITECTURE.md`) with a live number counter climbing to `+2,184 lines`. Build 2 drops the comedic punchline at the bottom: *"What I actually needed:"* `document.documentElement.classList.toggle('dark')`. During review, one-liner code container and line counter badge borders were hardened to `border-2`.
- **Rationale:** Captures the real-world frustration of LLM enterprise bloat vs. simple vanilla code, with Build 2 timed as a distinct comedic reveal.
- **Alternatives Rejected:** Fictional generic enterprise classes (using real React/TS theme patterns makes it instantly recognizable to engineers).

#### S16 · `make-no-mistakes`
- **Autonomous Decision:** Engineered a 4-step kinetic prompt escalation:
  - Build 0: Polite prompts (`make it better`, `improve the UI`).
  - Build 1: Escalating desperate instructions stack up, culminating in a huge amber badge `MAKE NO MISTAKES` and a tiny italic `please.`.
  - Build 2: Camera pulls back smoothly (`scale: 0.92`) into a full chat textarea box labelled `"You"`, revealing that all these desperate commands were sent in one input field.
  - Build 3: Screen clears cleanly to the bold, centered punchline: **"The Bad is the AI."** (holding for Act III's opening on S17).
- **Rationale:** Delivers the critical narrative pivot of the presentation: transitioning from blaming the AI's shortcomings to examining our own developer prompts, before handing off to Act III ("...is us.").
- **Alternatives Rejected:** Splitting across two slides (weakens the dramatic zoom-out reveal into the single chat box).

---

### Act III · The Ugly (S17–S24)
#### S17 · `act-ugly`
- **Autonomous Decision:** Implemented full cinematic dark card (`bg-[#111113]`) with solid black letterbox bars (`border-2 border-neutral-900`) and brand coral title (`#E5484D`). Build 0 holds on "The Ugly" with a subtle reminder "(The Bad was the AI.)". On Build 1, typewriter cursor completes the pivotal line: `"…is us."` with an animated coral cursor caret.
- **Rationale:** Completes the dramatic comedic pivot initiated in S16's conclusion ("The Bad is the AI"). Letterbox bars and coral ambient glow visually establish Act III's tonal identity.
- **Alternatives Rejected:** Static slide with both lines present immediately (loses the theatrical pause and comedic payoff).

#### S18 · `thinking`
- **Autonomous Decision:** Engineered an automatic cycling Claude Code terminal spinner on Build 0 ("Thinking…" $\to$ "Pondering…" $\to$ "Brewing…" $\to$ "Doomscrolling…"). Build 1 displays an illustrative 1-hour timeline with short blue prompt bursts and long waiting gaps populated with vector SVGs (Reels phone, second tab) and `meat-coffee.svg` in the longest gap ("Cha break #4"). Build 2 draws an animated SVG spiky mental focus curve over the timeline with a callout for *"context rot (yours)"* anchoring the Poll Q2 callback. During review, timeline meta pill borders were hardened to strictly `border-2`.
- **Rationale:** Focuses on the core message that chat-driven development is an attention problem rather than merely a time problem. The focus line sets up a direct callback to be paired on S29.
- **Alternatives Rejected:** Generic clock or hourglass animation (fails to capture the relatable developer behavior of tab switching while waiting for agents).

#### S19 · `frameworks`
- **Autonomous Decision:** Built a centered mechanical line-art balance scale with interactive tilt physics using Framer Motion. Build 0 renders an empty level scale and framework tags (Spec Kit, AI-DLC, BMAD, OpenSpec). Build 1 populates the left pan ("What you get") with four verified contract badges and tilts the beam down (-7°). Build 2 populates the right pan ("What it takes") with overhead costs (tokens, latency, learning curve, discipline), re-leveling the beam to 0° and revealing the takeaway: *"General by design. Worth it when the job is big enough."*
- **Rationale:** Strict adherence to presenter notes: respectful appraisal with zero jokes at framework expense. The physics-driven re-leveling emphasizes that the cost is as real as the value.
- **Alternatives Rejected:** Side-by-side pros/cons comparison table (drab and unengaging for a keynote).

#### S20 · `say-vs-do`
- **Autonomous Decision:** Created a split-screen card separated by a 2px vertical border. Left pane ("In the meeting · 11:30 AM") features `meat-meeting.svg` and the quote *"We follow spec-driven development."* Right pane ("At 6:47 PM · Friday Night") features a dark terminal window where a character-by-character typewriter effect types `fix it` and presses an animated Enter key badge. Bottom footer anchors the Poll Q4 callback. During review, standup badge and terminal divider borders were hardened to `border-2` and `border-t-2`.
- **Rationale:** Directly captures the humorous say/do gap with authentic developer details (Friday night deploy panic) without mocking the frameworks themselves.
- **Alternatives Rejected:** Plain text bullets of hypothetical vs real workflows.

#### S21 · `elephant`
- **Autonomous Decision:** Built a custom continuous line-art vector elephant taking center stage on Builds 0–2. On Build 1, a token budget meter appears on the elephant's flank showing 88% consumption. Build 2 staggers three quiet behavioral changes (one-shotting, skipping reviews, meter watching). Build 3 transitions into a dark cinematic quote card featuring the Howard Stark Iron Man quote with kinetic strike-through: *"I'm limited by the ~~technology~~ token budget of my time."* anchoring Poll Q6. During review, token meter and line number badge borders were hardened to strictly `border-2`.

#### S22 · `pick-two`
- **Autonomous Decision:** Implemented a large equilateral triangle with 3 distinct vertices ("Follow methodology", "Stay within budget", "Deliver on time"). On Build 1, an interactive "You Are Here" marker glides toward the center, gets physically repelled toward the edges, and loops smoothly. Build 2 drops the punchline banner: *"You cannot have all three at full volume. Pretending we can is what creates the say/do gap."* During review, marker tag border was hardened to `border-2`.

#### S23 · `slop`
- **Autonomous Decision:** Crafted a multi-stage progressive critique of AI visual and code slop:
  - Build 0: High-fidelity generic purple-to-indigo gradient landing page with sparkle badges, glass cards, and meaningless buzzwords.
  - Build 1: Zooms out into a 12-page grid of near-identical copies ("Spot the difference").
  - Build 2: Slides in `template_layout_feedback.png` (from planning phase) with real red annotations ("Exhibit A: The first AI draft of this deck!").
  - Build 3: Wipes clean to the golden axiom: *"AI should follow our principles, not define them."* with the footnote: *"No purple gradients were harmed in the rest of this deck."*
  During review, grid badge and golden axiom footnote borders were hardened to `border-2`.
- **Rationale:** Adheres strictly to the rule that purple is permitted ONLY here as the punchline. Incorporating Exhibit A gives authentic vulnerability to the presentation.
- **Alternatives Rejected:** Using real third-party SaaS screenshots (risks offending specific companies).

#### S24 · `meat-proxy`
- **Autonomous Decision:** Implemented a 3-node horizontal pipe (Client $\to$ You $\to$ AI) with bidirectional arrows. Build 0 features `meat-proxy.svg`. Build 1 pops up 4 humorous name tags ("The Human Clipboard", "The Prompt Courier", "The Certified Forwarder", "The One-Tab Engineer"). Build 2 displays the chat bubble *"Who is JSON?"*. Build 3 swaps the mascot to `meat-shrug.svg` ("The model said so.") and lands the closing punchline: *"Your value-add shouldn't be latency."* with Poll Q7 callback. During review, client dialogue bubble and shrug tag borders were hardened to `border-2`.

---

### Act IV · Making It Good (S25–S41)
#### S25 · `act-making-good`
- **Autonomous Decision:** Implemented cinematic chapter card with full dark canvas (`bg-[#111113]`), solid top/bottom black letterbox bars (`h-8`, `border-neutral-900`), pulsing InformatiQ blue dot (`#1B7ED0`) kicker "ACT IV", huge bold title "Making It Good" in brand blue (`#1B7ED0`), and subtle radial blue ambient glow behind center stage.
- **Rationale:** Establishes Act IV as the core constructive turning point in the presentation, mirroring S05, S10, and S17 while signaling the arrival of the practical solution.
- **Alternatives Rejected:** Light background chapter card (breaks the cinematic chapter boundary rhythm established in previous acts).

#### S26 · `role-shift`
- **Autonomous Decision:** Built a horizontal "day in the work" allocation bar that morphs dynamically with spring physics from Before (70% code, 20% debug, 10% thinking) to Now (60% plan & architecture, 30% review & verification, 10% code). Placed `meat-think.svg` in a companion badge with dynamic "60% plan" pill. Build 2 introduces a 5-verb vector pipeline (**Understand → Decide → Delegate → Verify → Own**) with step badges and bottom punchline *"Engineering isn't dead. (Not yet.)"* anchoring Poll Q3 callback. During review, step badge borders were hardened to `border-2`.
- **Rationale:** Visually establishes the shift from manual typist to tech lead/orchestrator, providing direct continuity from S24's meat proxy mascot.
- **Alternatives Rejected:** Static pie charts or vertical lists (lacks visceral physical transformation feel).

#### S27 · `ticket-floor`
- **Autonomous Decision:** Centered a Jira/Linear-style user story card (`INQ-1428`: "As a user, I want to see a list of wellbores") with standard acceptance criteria. On Build 1, 6 value-add idea chips float out and settle around the ticket with spring physics. Build 2 reveals a bottom banner (*"Look over the fence: competitors, best practices, great products"*) and brings back the S06 empty calendar in the corner (*"That's what the time is for. A better use than Reels"*). During review, acceptance criteria checkmarks were upgraded to vector Lucide `Check` icons (removing unicode glyphs), and ticket borders were hardened to `border-2`.
- **Rationale:** Directly addresses the mindset shift from delivering the bare minimum to using saved time for customer delight and craft.
- **Alternatives Rejected:** Plain text bullet list of feature ideas.

#### S28 · `make-it-better`
- **Autonomous Decision:** Engineered a live, evolving wellbore data grid component spanning 4 visual states:
  - Build 0: Plain bordered table with basic pagination ("It worked. It was fine.").
  - Build 1: Full deliberate AI slop callback to S23 (purple gradient header, rainbow pills, sparkles, robot bubble, broken layout at 1280px setting up S36). All decorative slop symbols use drawn Lucide vector icons (`Sparkles`, `Zap`, `Rocket`, `Globe`, `Palette`, `Ruler`, `AlertTriangle`) instead of unicode emojis.
  - Build 2: Blackboard wooden duster eraser sweeps across the slop grid with trailing chalk dust (callback to S03).
  - Build 3: InformatiQ design system grid with sticky header, sortable columns, inline filter chips, density toggle, keyboard focus ring (`j/k`), floating hover detail preview card, skeleton state preview, and punchline banner: *"Before: bounded by hours. Now: bounded by imagination."*
  During review, table strokes were hardened to `border-2` across all states.
- **Rationale:** Strictly enforces zero purple in normal presentation while allowing purple exclusively as the comedic punchline in Build 1 before being swept away. Enforces zero unicode emoji rule across all states. Provides an authentic demo of the InformatiQ data grid overhaul.
- **Alternatives Rejected:** Showing external screenshots of third-party grids (violates internal domain context and design system fidelity).

#### S29 · `plan-hours`
- **Autonomous Decision:** Re-used the exact SVG spiky focus line path from S18 on Build 0 to recall the fragmented chat-driven doomscrolling experience. On Build 1, morphed the visual into a dual-lane architecture: a sustained high planning plateau (~3h deep focus) in InformatiQ blue paired with an autonomous execution band (hours to a full day) running in dark charcoal, while the developer line shifts to a low cognitive lane. Build 2 reveals the one-shot rule banner. During review, lane container borders were hardened to `border-2`.
- **Rationale:** Shared visual language between S18 and S29 grounds the transformation in the audience's memory.
- **Alternatives Rejected:** Generic Gantt chart or calendar view.

#### S30 · `right-size`
- **Autonomous Decision:** Implemented a horizontal spectrum line (Chatbot $\leftrightarrow$ Full Framework) where a "Me" marker animates to the right end (visiting frameworks), eases back, and settles left-of-center. Build 2 introduces 3 size tiers (Small $\to$ Just chat, Medium $\to$ A plan + one session, Big $\to$ Custom workflow + autonomous agents) anchoring Poll Q1 callback. During review, spectrum track was converted to solid InformatiQ blue (`#1B7ED0`) to prevent video compression gradient banding.
- **Rationale:** Clarifies that large enterprise frameworks are not evil—their contracts and specs are valuable, but must be right-sized per feature rather than mandated dogmatically.
- **Alternatives Rejected:** Single rigid workflow flowchart for all project sizes.

#### S31 · `my-loop`
- **Autonomous Decision:** Laid out the three-phase loop horizontally (Phase 1: Attended Planning $\to$ Phase 2: Unattended Execution $\to$ Phase 3: Attended Review) with an animated looping "continue" arrow back to Phase 2. Build 1 details the 3 planning steps (brainstorm alone, AI interview, workflow files). Build 2 simulates live unattended units ticking. Build 3 introduces the 3 foundational signpost cards pointing ahead to S32, S33, and S34. During review, step cards, unit queue, and code pill borders were hardened to `border-2`.
- **Rationale:** Serves as the executive architectural diagram for the entire "Making It Good" methodology, framing the subsequent deep-dive slides.
- **Alternatives Rejected:** Linear waterfall diagram without feedback loop.

#### S32 · `ask-everything`
- **Autonomous Decision:** Placed AI question bubbles stacking up on the left ("Grid or list?", "Zero results?", "en + nb translations?", "TVD vs MD?"). On Build 1, questions get answered and stamped with an authentic green ink badge into `plan.md § Settled Decisions`. Build 2 outlines the 4 plan sections (Global constraints, Review focus, Shared contracts, DAG units) and showcases the real kickoff terminal prompt with the highlighted rule: *"Do not ask me anything; log decisions in decisions.md."* During review, the full `temp-notes/data-inventory-redesign/README.md` path was verified in the snippet, stamp checkmark was upgraded to Lucide `Check`, and section borders were hardened to `border-2`.
- **Rationale:** Emphasizes that autonomous execution requires complete upfront ambiguity resolution.
- **Alternatives Rejected:** Abstract theory about prompt engineering without showing the real kickoff command and file references.

#### S33 · `files-memory`
- **Autonomous Decision:** Contrasted a degrading chat thread (Turn 47 with fading earlier turns and amnesia alert: "context rot (the chat's)", callback to S18 and fix for S12) against a structured `temp-notes/<feature>/` directory tree with all 7 living files (`README.md`, `plan.md`, `specs/*.md`, `progress.md`, `decisions.md`, `important-notes.md`, `human-review.md`) and their 2–4 word roles. Build 2 connects a fresh session node demonstrating instant resumption without token bleed. During review, `important-notes.md` was added to match the plan specification, and all file cards were hardened to `border-2`.
- **Rationale:** Establishes the core insight that context should live in repository markdown files rather than volatile chat contexts.
- **Alternatives Rejected:** Generic diagram of a computer hard drive or cloud database.

#### S34 · `the-team`
- **Autonomous Decision:** Laid out three horizontal mixing-desk model tiers stacked vertically (Opus $$$ judges, Sonnet $$ builds & reviews, Haiku $ runs). Hardened rule badge *"Never writes product code"* for Opus. On Build 3, an agent configuration snippet slides in (`dir-implementer.md`) demonstrating immutable frontmatter routing (`model: sonnet`, `effort: medium`, `maxTurns: 150`) with caption *"Routing can't drift mid-run"* and spoken payoff banner *"The most expensive model shouldn't be doing grep and git."* All card borders hardened to `border-2`.
- **Rationale:** Visually establishes the org chart of model routing, dispelling the myth of using one omniscient model for menial tasks.
- **Alternatives Rejected:** Vertical cards with identical weights (fails to convey cost hierarchy).

#### S35 · `unit-loop`
- **Autonomous Decision:** Built a 7-stage cyclic unit loop (**Pick unit → Implement → Verify → Review → One fix round → Commit → Log & curate notes**) with a red failure branch (*"red? same implementer, ≤ 5 rounds"*). Paired on the right with a live 5-unit feature DAG checklist from `progress.md` where Unit 4 ticks active/done as the loop completes. Build 2 lands the punchline kicker: *"One review. One fix round. Perfectionism loops are where token budgets go to die."* Replaced unicode checkmarks with Lucide `Check` icons.
- **Rationale:** Demonstrates atomic unit progression with deterministic commit boundaries and bounded fix cycles.
- **Alternatives Rejected:** Free-form flowchart with unbounded revision loops.

#### S36 · `dont-trust`
- **Autonomous Decision:** Visualized the gap between tests and reality using a 3-part layout:
  - Left: Stack of green checks (`lint`, `tsc`, `4,900 unit tests` with S13 skipped-test callback, `build`).
  - Middle: Rig-standard 1280px browser wireframe revealing 3 visual bugs invisible to unit tests: clipped popover, misaligned column, duplicate tooltip.
  - Right: Verification probe split (Orchestrator writes probe script in Opus $\to$ Haiku runner executes headless and outputs raw JSON $\to$ Sonnet validator recomputes bounds and math).
  - Build 3: Lands the unskippable pre-commit git hook gate (`no --no-verify allowed`) paying off the North Sea rig stakes from S02. All borders hardened to `border-2`. During review, the 1280px overflow pill border was also hardened to `border-2` (eliminating the final hairline).
- **Rationale:** Unit tests assert DOM structure, but layout breakage requires headless DOM geometry probes with non-negotiable commit gates.
- **Alternatives Rejected:** Static bulleted list of testing guidelines.

#### S37 · `hard-way`
- **Autonomous Decision:** Designed an interactive postmortem deck cycling through 3 real engineering incident tickets:
  - Incident 1: Agent deleted untracked work $\to$ Stamped rule: *"Agents never delete files they didn't create."*
  - Incidents 2 & 3: 65-minute idle hang $\to$ *"Stop it, resume it"*; wrong element measured $\to$ *"Target data-testid only"*.
  - Build 2: Reveals the permanent standing safety protocol (explicit paths only, local commits only, pixel tolerances) paired with the `meat-sweat.svg` mascot and presenter quote: *"Every rule has a story."*
- **Rationale:** Grounding rules in real incidents creates relatable credibility and narrative punch.
- **Alternatives Rejected:** Abstract checklist of DOs and DONTs.

#### S38 · `receipts`
- **Autonomous Decision:** Built 3 large kinetic stats counting up rapidly (≤ 600ms via `requestAnimationFrame`):
  1. **13 units** on **~0.25M orchestrator tokens** (~$1.50 per unit, total ~$20) for Data Inventory redesign.
  2. **~165k tokens** for 2 scripted browser checkpoints in Data Grid overhaul.
  3. **10–30 commits** per feature across data grid, inventory, and design system.
  Build 2 reveals the takeaway banner: *"The answer to the elephant: spend where judgment is needed."*
- **Rationale:** Direct answer to the cost question raised on S21, proving high-leverage agent workflows are shockingly inexpensive when bounded.
- **Alternatives Rejected:** Complex financial spreadsheet or vague percentage approximations.

#### S39 · `stateless`
- **Autonomous Decision:** Contrasted a 185k-token sprawling chat stack re-reading the entire conversation history every single turn against the two silent idle risks: Cache TTL expiration (5m API / 1h sub) and idle compaction amnesia. On Build 2, demonstrates the fix: `/clear` wiping context clean and carrying curated hand-off markdown files into a fresh ~4k token session. Tagline: *"One task, one session. Files carry the context."*
- **Rationale:** Explains the mechanics of LLM token consumption in simple, visceral terms while giving engineers an immediate practical rule.
- **Alternatives Rejected:** Highly technical token formula diagram.

#### S40 · `routing`
- **Autonomous Decision:** Engineered 3 physical mixing-desk hardware control dials (Model, Effort, Context). Showcases the real Claude Code configuration snippet for `permissions.deny` blocking `.env` and `dist/**`, while actively dispelling the myth that `.claudeignore` works in Claude Code. Build 2 lands the punchline banner: *"Not 'improve the UI'. Say what, where, and how you'll check it."* as the direct antidote to S16.
- **Rationale:** Equips developers with three concrete dials they can adjust immediately in their daily workflow.
- **Alternatives Rejected:** Long bullet list of prompt engineering tips.

#### S41 · `shared-repo`
- **Autonomous Decision:** Created a central vector repository hub (`team-ai-toolbox.git`) radiating outward along spokes to team engineers. Highlights 5 shared asset types: Domain Skills, Custom Plugins, Slash Commands, Curated Subagents, and Living Workflows (featuring the S07 user-manual generator callback). Build 2 reveals an inviting offer for other teams to get a starter kit by messaging the presenter on Teams.
- **Rationale:** Bridges individual developer wins into collective compound engineering capability across the department.
- **Alternatives Rejected:** Abstract enterprise governance diagram.

---

### Finale & Q&A (S42–S43)
#### S42 · `doom-flip`
- **Autonomous Decision:** Re-introduced the S03 line-art vector globe on the left paired with a 5-card horizontal stack on the right. On Build 0, renders the initial S03 gag title ("How AI Will Destroy the Human Race: A practical five-step plan") alongside the 5 doom steps. On Build 1, morphs the title into *"…only if we let it."* in brand blue (`#1B7ED0`). On Build 2, executes a staggered 3D card flip (`rotateX(180deg)` with `perspective: 1200px` and `backfaceVisibility: hidden`) flipping each doom card into its corresponding practical antidote with its respective Act color token (Green `#1E9E6A`, Amber `#D97706`, Blue `#1B7ED0`, Coral `#E5484D`). Lands the core philosophical footnote banner: *"The Bad was the AI. The Ugly was us. The fix was always in our hands."* Enabled slide-level `dotColor: '#111113'` in `manifest.js` and `App.jsx` to preserve the exact neutral ink dot callback to S03.
- **Rationale:** Paying off the opening S03 gag in the finale creates strong narrative coherence. The card flip physically embodies the shift from helplessness to engineering agency. Using `rotateX` rather than `rotateY` for wide cards avoids camera edge distortion and maintains crisp 1080p alignment under Teams screen sharing.
- **Alternatives Rejected:** Static takeaway bullet list or separate takeaway slide (violates the plan's specification that S42 *is* the takeaway slide).

#### S43 · `thanks`
- **Autonomous Decision:** Implemented unbadged finale Q&A slide (`cornerLabel: ''`, `totalBuilds: 0`). Paired the massive bold headline ("Questions?") and monospaced deadpan sub ("(Humans only.)") on the left with the `meat-wave.svg` mascot on the right undergoing subtle idle waving float animation (`y: [0, -10, 0], rotate: [0, 1.5, -1.5, 0]`) with a callback speech bubble *"See you at the after-party!"*. Embedded the floor action prompt banner (*"Ask me anything: workflows, prompt templates, incident postmortems, or how to avoid the purple."*), presenter pill, GitHub/Teams handles, and the quiet BS23 logo anchored at the bottom-left at opacity 0.8.
- **Rationale:** Leaves the audience on a warm, humorous, yet thoroughly professional closing frame while the presenter moderates Q&A from Teams chat.
- **Alternatives Rejected:** Blank or generic "Thank You" slide with bullet points.

---

### Batch 9 · End-to-End Polish & Verification
#### Complete Deck Audit & Verification
- **Autonomous Decision:**
  - Audited all 43 slides (S01 to S43) for asset integrity, clean exports, zero unicode emojis (Dingbat checkmark `✓` permitted), zero purple/violet/fuchsia/indigo Tailwind classes or hex colors outside intentional slop parodies (S23, S28), and zero hairline SVG strokes (all strokes verified $\ge 2\text{px}$).
  - Tested keyboard navigation across Audience View (`App.jsx`) and Presenter View (`PresenterView.jsx`): verified `ArrowRight`, `ArrowLeft`, `Space`, `Enter`, `PageDown`, `PageUp`, `Home`, `End`, `F`, `O`, `Escape`. Aligned `Enter` and `F` handling between both views.
  - Verified multi-click forward and backward progression across all 43 slides, confirming that reversing into a previous slide immediately restores all of that slide's completed build states (`buildStep: prevSlide.totalBuilds`).
  - Verified dual-window synchronization logic via native `BroadcastChannel` (`'informatiq-slide-sync'`) with bidirectional `localStorage` (`'informatiq-presentation-state'`) fallback and tab sender de-duplication to prevent feedback echo loops.
  - Tested dynamic live slide counter recalculation (Project Rule 1): simulated cutting Tier A (3 slides) and Tier A+B (7 slides), confirming that on-screen corner numbers adjust seamlessly without gaps (01 to 40, 01 to 36).
  - Verified Presenter View at `/presenter` (and `/?presenter=true` / `/#presenter`), confirming scaled 16:9 previews ("ON SCREEN NOW" and "COMING UP NEXT"), digital timer controls (Start/Pause/Reset), pacing checkpoints against cumulative planned duration, build indicator pills, and formatted presenter notes with visual callouts for `[1]`, `[2]`, quotes, and `(PAUSE 2s)`.
  - Executed verification gate: `npm run build` succeeds with zero errors.
- **Rationale:** Ensures complete production readiness, zero regressions, rock-solid dual-window reliability, and seamless delivery during the live presentation.
- **Alternatives Rejected:** Manual ad-hoc spot checks without comprehensive automated integrity scans.

---

### Runtime Bugfix & Resilience Hardening
#### 2026-11-03 · BUGFIX-01 · Framer Motion Spring Easing Misconfiguration & ErrorBoundary Hardening
- **Autonomous Decision:**
  1. **Root Cause Resolved:** Fixed Framer Motion runtime crash (`TypeError: a is not a function`) occurring on S21 (and earlier on S18/S19/S12/S13/S15) where `{ type: 'spring', stiffness, damping }` was incorrectly assigned to the `ease:` property instead of the transition object itself (`transition={springPhysics}` or `transition={{ ...springPhysics, delay }}`). When Framer Motion encounters a non-string object in `ease`, it expects an easing function `(t: number) => number` and calls `ease(t)`, throwing a fatal error.
  2. **Deck-Wide Correction:** Audited and corrected all 14 slide files (`S12`, `S13`, `S15`, `S18`, `S19`, `S21`, `S23`, `S24`, `S26`, `S27`, `S29`, `S30`, `S32`, `S33`) to use proper Framer Motion spring transition syntax.
  3. **Engine-Level Defense-in-Depth:** Updated `src/motion.js` so that `springPhysics` and `bouncierSpring` are wrapped as callable functions `(t) => t` with spring configuration properties attached. Even if a future component or edit passes `ease: springPhysics`, it will safely evaluate as an easing function without crashing.
  4. **Slide Error Boundary Added:** Implemented `src/components/SlideErrorBoundary.jsx` and wrapped active slide rendering in both audience view (`App.jsx`) and presenter view (`PresenterView.jsx`). If an unhandled error ever occurs in a slide, it displays a non-fatal localized error card and allows the user to continue navigating with arrow keys rather than freezing the entire presentation.
- **Rationale:** Ensures that neither Audience View nor Presenter View becomes unresponsive during live presentation delivery.
- **Alternatives Rejected:** Only fixing S21 (would leave 13 other slides vulnerable to identical runtime crashes).

#### 2026-11-03 · BUGFIX-02 · Backwards Navigation Blank Screen Resolution, Presenter Shortcut & Visual Polish
- **Autonomous Decision:**
  1. **Root Cause of Blank Screen on Reverse Navigation:** `AnimatePresence mode="wait"` combined with `slideVariants` having an exit transition of `duration: 0.35` and `when: 'beforeChildren'`. When navigating backwards or pressing keys rapidly, the exiting slide was unmounted to `opacity: 0`, and rapid state updates dropped the subsequent mount, leaving `<main>` completely empty and blank white. Replaced `AnimatePresence mode="wait"` in `App.jsx` with direct immediate mounting `<motion.div key={activeSlide?.id}>` with crisp 0.18s `appleEase` transition. Removed `when: 'beforeChildren'` and `staggerChildren` from `motion.js`.
  2. **Presenter View Keyboard Shortcut:** Added `P` and `p` keyboard listener in `App.jsx` to launch `/?presenter=true` in dual-window mode (`window.open('/?presenter=true', 'informatiq-presenter', 'width=1440,height=900')`). Documented shortcut in `SHORTCUTS.md`.
  3. **Removed Developer Planning Artifacts & Internal Notes:** Cleaned out all planning references across the deck, including:
     - Hardcoded slide numbers (`S07`, `S12`, `S13`, `S18`, `S20`, `S21`, `S23`, `S24`, `S36`).
     - Planning tokens (`CUT TIER A`, `CUT TIER B`, `Callback sets up...`, `Poll QX Callback`, `Payoff to...`, `Step X of Y`, `THE CLEVER BIT`, `Shared Element returns on...`).
  4. **Removed On-Screen Keyboard Hints & Badges from Audience View:** Cleaned out `<kbd>` tags and keyboard instructions (e.g. `Enter ↵`, `j/k`, `Space to advance`) from audience slides so that attendees only see polished presentation content.
  5. **Respectful Framework Appraisal & Keynote Aesthetic:** Ensured slides regarding existing methodologies (AIDLC, SpecKit, BMAD in S19/S22/S30) maintain a respectful, professional tone rather than criticizing them, emphasizing pragmatic alignment to risk and feature scope. Simplified cluttered slides (e.g. S07 overhauled from 7 cramped stages to 4 clean stages; S18 timeline active immediately without empty initial step).
  6. **Automated Headless Browser Verification:** Executed automated Puppeteer verification in Chrome 156 against the live dev server, validating forward jumps across all 43 slides, backward navigation from slide 20 down to 0, rapid backwards rewind from 42 down to 0 at 40ms intervals, presenter view launch via `P`, and verifying 0 console errors and 0 blank screens. Production build `npm run build` succeeds cleanly.
- **Rationale:** Delivers a reliable, presentation-grade keynote deck suitable for live screen sharing with zero distracting internal planning clutter.


