# Talking Points: What to Say, Where

> I compared your own writing (`drafts/ideas.md`, `drafts/slide_feedback/slide-feedback.md`, `docs/context/slide-plans.md`, `docs/notes/*`) with the current deck (`src/slides/manifest.js`) and `docs/plans/presenter-notes.md`.
> Nothing here changes a slide. It's all **spoken**, and each item points to the slide where it fits.
> Each content slide ends with a **Note clue**: a short, paste-ready line for the presenter view. It keeps the existing click cues `[1] [2]` and adds the new reminders.

**Priority:** ★ say it (it's in your notes and the deck misses it) · ◆ nice, if time · ○ optional aside
**Source:** `ideas` = drafts/ideas.md · `plans` = docs/context/slide-plans.md · `fb` = slide-feedback.md
**Poll:** `Poll Qn` = read that result from the new 10-question survey (`docs/plans/audience-survey.md`).

**Time:** the notes plan ~51 min of talk plus Q&A until 60:00. Using every ★ adds about 6–8 min.
- **60-min slot:** use the ★ items only. Disable cut tier A (S13, S17, S19) to win back ~3 min. If S17 is cut, read Poll Q5 on S16. If S19 is cut, read Poll Q7 on S18.
- **80-min slot** (the length in your original context): ★ and ◆ both fit.

---

## The biggest gaps (from your notes, not yet in the deck)

1. **The urgency of the role shift** (ideas #1, #2, plans "Role shift"). "AI is here to replace us: the old us." You only shifted recently. Newcomers don't need to shift, but we do, like our parents moving from button phones to smartphones. The layoff-list line. The optimism line. → **S24**
2. **AI is subsidised today** (ideas #3). Prices only go up from here. Copilot already repriced. Learn it now, the way we used to learn a framework. → **S39** and **S42**
3. **"Our learning didn't stop, it changed direction"** (ideas #4). → **S42**
4. **Iron Man 2:** "We are limited by the token budget of our time." (plans "Cost") → **S18**
5. **Meat proxy names and punchline** (plans "Meat proxy"): the Human Clipboard, the Prompt Courier, the Certified Forwarder, the One-Tab Engineer. "Your value-add shouldn't be latency." → **S22**
6. **"Before, effort and time bounded us. Now our imagination does."** (plans "Add value") → **S26**
7. **A concrete replacement for vague prompts** (plans draft note). → **S21**
8. **The planned one-shot:** a one-shot with no plan is a gamble. A one-shot of a 3-hour plan lands about 90%. (plans draft note) → **S27**, as the answer to S18's "One shot."
9. **Constrain the agents with tests, lint and verify criteria** (plans draft note). → **S32**
10. **"Trust me, I'm one of you. It's actually anonymous."** (plans "Questions with form") → **S07**
11. **Flow state.** Planning puts all the context in your head. Chat comes in bursts that destroy attention. (plans "Time between chats") → **S15**, **S27**
12. **AI is stateless, plus `/clear` and `.claudeignore` hygiene** (plans "Cost optimization", "Why AI is not…"). → **S40**, **S41**, **S33**
13. **The model strategy written down** (plans). Yours is literally in your global CLAUDE.md. → **S34**
14. **Meta proof:** this deck was built with the workflow you're describing. Opus orchestrator, deck-builder (Opus), deck-reviewer (Sonnet), deck-committer and snap-runner (Haiku), and `progress.md` / `decisions.md` / `review-log.md` in `deck-v2-workflow/`. → **S33–S36**. It isn't in your notes, but it's real and it lands.

---

## Opening

### S01 · Title
- ★ Set the "we, not you" rule up front (fb S29: "if anyone is to blame, it's the presenter").
  > "This talk says *we*, never *you*. If anyone gets blamed today, it's me."
- ◆ "It's not a vendor pitch and it's not an anti-AI talk. It's two or three months of real work, the good and the embarrassing."

**Note clue:** Rokibul · InformatiQ · BS23. Not a vendor pitch, not anti-AI. "If anyone gets blamed today, it's me." Poll in ~6 min.

### S02 · We build software for the North Sea.
- Already well covered. Keep it pride only, no jokes.
- ○ One line per app: what it does, and who uses it offshore. Only things you know; no invented numbers.

**Note clue:** Pride, no jokes. One line each: who uses it, what it solves. [1] WellMate [2] WellBook [3] GeologiQ [4] Offset Analyzer [5] LogistiQ [6] Event Analyzer [7] AnalytiQ [8] Portal [9] all eight. "Internal bragging, and we earned it."

### S03 · Agenda
- ◆ "Everything before the last chapter is the setup, and a bit of therapy." (already in notes)

**Note clue:** [1] five chapters. [2] How We Work lifts: "Most of our time goes here." Poll comes after the good news.

---

## I · The Good

### S04 · Chapter card
**Note clue:** "Good news first. And there is a lot of it."

### S05 · We got our time back.
- ★ Plant the seed for S25/S26 (plans "Add value"):
  > "Before AI, we shipped what the ticket asked for, because that's all the time we had."
- ◆ The time isn't free. It's a question. Leave it hanging; S27 answers it.
- ◆ Spoken only: AI is a fast guide into an unfamiliar codebase, down to file and line.

**Note clue:** AI took the toil. [1] the week collapses to minutes. Before AI we shipped only the ticket, because that's all the time we had. Bonus: a guide into unknown codebases. [2] "...so what are we doing with it?" Leave it hanging (S27 answers it).

### S06 · Our user manuals write themselves.
- ★ Make it concrete (plans draft note). It's a **big** workflow: skills, commands, scripts, hooks and sub-agents. It captures screenshots, **annotates** them, writes the page, and works **incrementally**: it keeps a snapshot of the last state and only touches what changed. A human reviewer signs off.
- ★ "We didn't replace the human. We made their job easier." (already the punchline; keep it)
- ◆ "It lives in our shared repo. You'll see that again at the very end." (sets up S42)

**Note clue:** Big workflow: skills + commands + scripts + hooks + sub-agents. Captures, annotates, writes. Incremental (snapshot, only what changed). [1] page written. [2] Reviewed: "We removed the toil, not the person." It lives in our shared repo (→ S42).

### S07 · Poll
- ★ Say the line from your plan (plans):
  > "Trust me, I'm one of you. It's actually anonymous."
- ★ Question count is still to be decided (5–7). The 2:00 timer is on the slide: click [1] to start it.
- ★ "The honest answer is the useful one. Especially if the honest answer is *I say I do, but I don't*."
- ◆ Paste the link in the Teams chat as well. Move on at 60–70% responses.

**Note clue:** PASTE LINK IN CHAT. "Trust me, I'm one of you. It's actually anonymous." The honest answer is the useful one. [1] start the 2:00 timer. [2] closed.

---

## II · The Bad

### S08 · Chapter card
**Note clue:** "The Bad is mostly the AI. It's not perfect, and it won't be soon."

### S09 · The keynote vs. my terminal.
- ◆ (plans "Why AI is not what we are told")
  > "We all know this. And we still fall into the trap of trusting it like the keynote."
- Keep the fairness line: they're impressive tools, but a launch page isn't day 47 of a real project.

**Note clue:** Real claims, not made up. [1] Codex, Opus 4. [2] my request, "Done ✓". [3] delete → toast → dialog late. "We all know this, and we still fall for it." Launch page ≠ day 47.

### S10 · 99% of 70% of the time.
- ◆ Bridge line (plans): "It overshoots where it shouldn't, and misses where it has to be precise." That sets up S11 and S12.

**Note clue:** Say 99% confidently, wait for the nods. [1] "of 70%". The worst part: I never know which part I'm in. Overshoots where it shouldn't, misses where it must be precise.

### S11 · Did you even read what I said?
- ★ **Poll Q1** (biggest frustration). Read the top answer.
- ◆ The fix comes later (S32), and it isn't writing rules in CAPS. Tell it the scope (which files it may touch) and give it a check it must pass.

**Note clue:** Follows the instruction, adds the rest. [1] date format, API touched. [2] blue Save: tokens, types, JSDoc despite CLAUDE.md. [3] // removed all comments. [4] "Technically correct." POLL Q1 frustration.

### S12 · I asked for a circle.
- ★ **Poll Q2** (what you do when it goes down the wrong track).
- ★ This is already in the notes; make sure you say it (fb S14): **once it's on the wrong track, sacrifice the session.** Add the practical part (plans):
  > "`/clear` is cheap if every step is self-contained. Design the work so throwing a session away doesn't hurt."
- Sets up S41.

**Note clue:** METAPHOR: simple architecture. [1] rectangle [2] trapezium [3] overshoot [4] never the bull. Wrong track = sacrifice the session, /clear. Cheap only if steps are self-contained (→ S41). POLL Q2 wrong track.

### S13 · Enterprise-grade dark mode. *(cut A)*
- ◆ "Not wrong. Overkill. And I have to review all 40 pages. The review cost is the hidden cost."
- ◆ "This is what it does when nobody gives it constraints. Remember that for S20."

**Note clue:** Asked for a toggle, got an architecture. [1] file explosion. [2] THEME_ARCHITECTURE.md, 40 pages. Not wrong, overkill, and I review all of it. No constraints → this.

---

## III · The Ugly

### S14 · Chapter card
**Note clue:** "The Bad is the AI. The Ugly… is us." Slow. "And I'm in every slide of this chapter."

### S15 · Doomscrolling…
- ★ **Poll Q3** (what you do during a long run).
- ★ The attention argument (plans "Time between chats"):
  > "A burst of attention, then nothing. Another burst, then nothing. It doesn't waste time. It destroys attention span."
- ★ Be fair: chat is fine for a small bug, a quick question or brainstorming. Big features are the problem.
- ◆ "The fix is coming. Plan ahead with the edge cases, then let it run long." (→ S27)

**Note clue:** SILENT 3-4 s. [1] Doomscrolling. Burst of attention, then nothing: it kills attention span, not just time. Chat is fine for small bugs and brainstorming. POLL Q3. [2] context rot: MINE. Fix → S27.

### S16 · Proven. Thorough. Not cheap. *(cut B)*
- ★ **Poll Q4** (what makes methodologies heavy).
- ★ The reasons, from your plan: complexity, the learning curve, not fitting our project or client process, and **the cost: tokens**. For a small task it feels like waterfall.
- ★ Your stance:
  > "When I have a budget, I spend it on the outcome, not the ceremony."
  > "Learn from them. Take the principles (spec as a contract, phased work, settled decisions) and adapt them."
- ○ Sensitive, optional (plans): "Our budgets aren't the budgets these frameworks were designed around. Nobody likes saying it." Say "our market", not "third world", or skip it.

**Note clue:** Respect them: Spec Kit, AI-DLC, BMAD, OpenSpec. Heavy because: complexity, learning curve, doesn't fit the project, TOKENS. Small task = waterfall. [1] Tokens level it. [2] Time tips it. "Budget goes to the outcome, not the ceremony." Borrow the principles. POLL Q4.

### S17 · What we say vs. what we do. *(cut A)*
- ★ **Poll Q5** (honest methodology adherence: always / 50% / 20% / "I say I do"). This is the big readback. Let the "I say I do" bar speak.
  > "How many of us actually follow these end to end? Probably very few. Me included."

**Note clue:** Left: "We follow spec-driven development." [1] terminal: fix it. Guilty, me. POLL Q5: read the "I say I do" bar. "Probably very few. Me included."

### S18 · The elephant in the room.
- ★ **Poll Q6** (how much the token limit shapes your work).
- ★ The cost paragraph from your plan:
  > "Honestly, we worry about token usage more than about the output being perfect."
  - We can't afford to let AI review its own output properly.
  - Trying different approaches eats the budget, so we stop trying.
  - We one-shot to make the budget last until the end of the month.
- ★ The closer:
  > "Howard Stark said, 'I'm limited by the technology of my time.' We're limited by the token budget of ours."
- Still no numbers here. The real figures come in S39.

**Note clue:** The budget makes us cut corners. [1] Review, Docs cut. [2] Plan, Spec, Test, QA cut. [3] One shot. We worry about tokens more than quality, skip AI review, stop exploring. POLL Q6. Close: IRON MAN 2, "limited by the token budget of our time." No numbers.

### S19 · The three-body problem. *(cut A)*
- ★ **Poll Q7** (which corner you cut first). If S19 is cut, read it on S18.
- ◆ Name the three expectations without blaming anyone (plans): "Use AI. Follow a documented methodology. Deliver on time and within budget. Pick two."
- Tease: "More out of the same budget is coming in the last chapters."

**Note clue:** [1] the mascot runs corner to corner. [2] collapse. Use AI + follow the method + on time and in budget: pick two. A constraint, not a complaint. POLL Q7 corners. Tease: more for the same budget later.

### S20 · Everything is purple now.
- ★ Slop isn't only purple UI (plans "Anti slop"). It's code too: inconsistent patterns and architecture drift, because the early excitement made us over-trust it.
- ★ The fix: project-specific rules, centralised instructions, design guidelines, constraints and **our opinions**.
  > "Don't become a slop machine. Think, guide, constrain, review."

**Note clue:** Let the slop land, silent. [1] clean: "Everything is purple now." Slop is code too: drift, inconsistency, from over-trust. [2] "AI follows our principles, not its defaults." Rules, guidelines, constraints, opinions. "Don't be a slop machine."

### S21 · Make it better. Make no mistakes.
- ★ Give the concrete alternative (plans draft note). This is the "how I ask" the slide promises:
  > "Not 'improve the UI'. Say: the filter row wraps at 1280 px; keep it on one line, let the chips scroll; it's done when the 1280 screenshot shows one row."
  - Which part · what outcome · how · how we know it's done.
  - "'Think step by step' with no context does nothing."
- Keep the reminder: the AI won't be perfect soon, so the fix is how I ask.

**Note clue:** MY lazy prompts. Read each one louder. [1] Make no mistakes. [2] MAKE. NO. MISTAKES. Fix = which part + outcome + how + done-when. Example: filter row at 1280 px. "Think step by step" with no context = nothing.

### S22 · Don't be a meat proxy.
- ★ **Poll Q8** (merged AI code you couldn't explain). Take the shame first.
- ★ Name the species (plans). Pick two:
  > "The Human Clipboard. The Prompt Courier. The Certified Forwarder. The One-Tab Engineer."
- ★ Two punchlines:
  > "If AI can do my whole job without me, what am I for?"
  > "Your value-add shouldn't be latency."
- ★ The cost (plans): if I wasn't in the planning, I can't answer the client's question, and I don't know why the code is broken.
- ◆ The way out, in one breath: understand the requirement → bring my own opinion → brainstorm the alternatives → plan and delegate → review and own it. "Don't outsource your brain."

**Note clue:** I've been the pipe. [1] forward email [2] paste answer [3] ask AI what client meant [4] who is JSON? [5] "The model said so." Clipboard / Courier / Forwarder / One-Tab. Can't answer the client if I wasn't in the plan. "Your value-add shouldn't be latency." POLL Q8.

---

## IV · Making It Count

### S23 · Chapter card
**Note clue:** "The ugly part is the part we can fix."

### S24 · The role shift. **(the biggest gap)**
- ★ **Poll Q9** (how the role shift feels).
- ★ Your confession (ideas #1):
  > "I didn't shift until recently. Then it hit me: the way I worked wasn't enough any more, and I'd be first in line to be replaced."
- ★ The provocation, then the turn:
  > "AI is here to replace us. The *old* us. It already did."
  > "Every good technology replaced some human work, and every time it made us more productive."
- ★ Newcomers vs us (ideas #2):
  > "Freshers never had the old role, so they don't have to shift. We do. Like our parents: it took them ten years to go from button phones to smartphones."
- ★ The warning, with a smile (plans): "Keep the old mindset and we're late to the party, walking ourselves onto the next layoff list."
- ★ The optimism (plans): "Engineering isn't dead. AI isn't replacing us completely. At least not this year."
- Keep the existing beats: never coded all day (~4 h), now product owner / PM / decision maker, "no raise included".

**Note clue:** Never coded all day: ~4 h on a good day. [1] coding → AI. [2] workhorse → decision maker. "No raise included." CONFESS: I shifted late, first in line. "AI replaces the OLD us." Tech always replaced and multiplied. Freshers vs us = parents and smartphones. Late to the party = layoff list. "Engineering isn't dead. Not this year." POLL Q9.

### S25 · The ticket is the floor, not the ceiling. *(cut B)*
- ◆ (plans "Explore your competitor"):
  > "AI replaced me as the code writer. That gave me the bandwidth to look at competitors and best practices, not just the ticket."

**Note clue:** Where the ticket ends is where most of us stop. [1] "Look over the fence": competitors, best practices. AI took the typing, so I have the bandwidth to innovate.

### S26 · Let's make it better.
- ★ The line (plans):
  > "Before, effort and time bounded us. Now our imagination does."
- ★ Respect the past: "The pre-AI table wasn't bad. It was the best we could afford."
- ★ Restraint (fb S28): "Not more features because we can. Balance UX, UI and usability. Colour only where it means something."

**Note clue:** Before: respectable (search, sort). [1] "Beautiful, isn't it?" Let them wonder, then reveal the joke (S20 callback). [2] done right: density, skeleton, meaningful colour, popover. Before we were bounded by time; now by imagination. Pre-AI wasn't bad. Not more features, better ones.

### S27 · Plan for hours. Let it run for hours.
- ★ Flow state (plans):
  > "When I plan, I'm in flow. All the context is in my head. Chat never gets me there."
- ★ The planned one-shot. It answers S18's "One shot." (plans draft note):
  > "One-shotting without a plan is gambling. One-shotting a plan I spent three hours on lands about 90%. And the implementation still runs unit by unit."
- Callback: this is the answer to S05's question.

**Note clue:** Build 0 = the chaos from S15. [1] "Plan · ~3 h", agents run past 18:00. Planning = flow state. PLANNED ONE-SHOT: no plan = gamble; 3 h plan = ~90%, still unit by unit (answers S18). [2] I'm free: review, next plan, client. Answers S05.

### S28 · $25,000
**Note clue:** Silence. "Hold on to that number." Do NOT explain (S38).

---

## V · How We Work

### S29 · Chapter card
**Note clue:** "Everything so far was the setup. This is how we actually work."

### S30 · How we work now.
- ★ **Poll Q10** (how you work on a non-trivial feature). Read it as a contrast with what follows.
- ◆ "Not a framework, not chat. In between, and reshaped per feature: the same skeleton every time, customised for the feature."

**Note clue:** For complex features, new modules, or bundled small features. [1] Gather + Plan = with me. [2] Orchestrate + Remember = without me. [3] loop. Same skeleton, customised per feature. Not always the cheapest; it's the balance. POLL Q10.

### S31 · The requirement is just the start.
- Covered well (it's your own feedback). ◆ Add: "This is where I prove ownership. AI can't do this part for me."

**Note clue:** INQ-1502. [1] four sources: past projects, how others solved it, the blog, our assets. [2] be the user: who, first, next, would I be happy? [3] → Brief. "Ownership lives here."

### S32 · Plan with a co-worker.
- ★ Constrain the agents (plans draft note). The Tests and Verify bands are the point:
  > "An agent is done when the lint, the build and the tests say so. Not when it says 'Done ✓'." (S09 callback)
- ◆ "Ask it for several options and pick one. Don't accept the first."

**Note clue:** Brief + how I'd build it. [1] it attacks from every angle. [2] I decide; I hold the context. [3] unit cards: Rules · Context · Task · Tests · Verify · Agent rules. Done = lint/build/tests pass, not "Done ✓" (S09). Ask for options.

### S33 · One manager. Many fresh minds.
- ★ The concrete example (fb S31):
  > "My review agent doesn't explore the codebase to learn our conventions. It's handed them. The designer gets the design rules, nothing else."
- ◆ The honest cost note (plans): "More agents can cost a bit more than one chat. Overall it's cheaper, because nobody explores twice."
- ○ `.claudeignore` (or your tool's equivalent) so exploration skips what doesn't matter.
- ○ **Meta:** "The deck you're watching was built this way: an Opus orchestrator dispatching builder, reviewer and committer agents."

**Note clue:** Main session = PM: delegates, checks. [1] explore once → context pack. [2] deal cards to fresh agents. Reviewer is HANDED the conventions; the designer gets only the design rules. [3] explore every time vs once. A bit more per agent, cheaper overall. Meta: this deck.

### S34 · Right model. Right effort. *(cut B)*
- ★ Write the strategy down (plans) so you don't decide every time:
  > "Mine is literally in my global CLAUDE.md: Sonnet for most work, Opus for planning, UI and hard reviews, Haiku for commits and browser tests with a full plan."
- ○ Meta: this deck's agents are builder Opus/high, reviewer Sonnet/medium, committer and snap-runner Haiku.

**Note clue:** Opus: plan, decide, design, review. [1] Sonnet: implement, tests. [2] Haiku: scripts, commits, clean-up, "instructions it can't fail". [3] effort by complexity. It's WRITTEN in my CLAUDE.md, so I don't decide each time. Meta: deck agents.

### S35 · Built for this feature. Then retired.
- ◆ (plans) "It's a one-time setup that pays back: consistent results, and honestly the work gets enjoyable again."

**Note clue:** General agents → growing instructions → meh. [1] specialists from the template. [2] shipped, retired; the template stays. The repo holds how to design them: no tokens wasted crafting. One-time setup, consistent results, fun again.

### S36 · The files are the memory.
- ○ **Meta, optional live peek:** `deck-v2-workflow/decisions.md` and `review-log.md` are real. The agents that built this deck logged their calls there. Only alt-tab if you've tested it on the Teams share.

**Note clue:** Never the chat or the harness to-do list. [1] laptop dies. [2] resume at unit 7. [3] progress · decisions (calls made mid-run, I check them) · notes (memory for fresh agents, ~90% disposable) · review-log (a reviewer always finds something). Meta: this deck's files.

### S37 · Code is the new context.
- ◆ (fb S33):
  > "Bad code plus a pile of context docs loses to good code plus a little text. Any LLM can read a well-designed codebase."

**Note clue:** Docs that mirror code drift = debt. [1] three stay: product context, decision records, memory bank. [2] "Better code. Fewer docs." Good code + little text beats bad code + many docs.

---

## Epilogue · The $25,000 lesson

### S38 · "It's unlimited."
- Covered fully in the notes (your own feedback text). Keep the storytelling tone.

**Note clue:** "Remember this number?" [1] ∞: Copilot repriced, Bedrock enterprise, Halliburton. "Unlimited, just use it for work." I went all in. [2] vibe-coded prototype → production in 1 month. Proud. Followed Anthropic's way like an employee. NO figures on screen.

### S39 · Access revoked.
- ★ Add the subsidy point (ideas #3) after the gauge:
  > "And here's the thing: this is the *cheap* era. AI is subsidised today. What we pay is below what it costs. Copilot already repriced this year. Prices go up, not down. Learn to use it efficiently now."
- Keep the salary joke and "I didn't miss the limit, I missed the email."

**Note clue:** Access denied, the missed email. [1] top 10: me, $25,000. "Use more AI" → "you use too much." [2] gauge, spoken: soft $1,100, real ~$3,000. Salary joke. THIS IS THE CHEAP ERA: subsidised, Copilot already repriced, it only goes up. Then: caching, the workflow, the hard way.

### S40 · Five minutes.
- ★ Say "stateless" (plans):
  > "AI is stateless. Every request sends everything again from the start. The cache is the only reason that's affordable."
- ○ Hygiene: avoid unnecessary file reads; ignore files.

**Note clue:** STATELESS: every request re-sends everything; cache = affordable. Bedrock 5-min TTL. [1] coffee break: 100K reprocessed for "ok, continue". Reads ≪ writes. [2] ping every 4:50. "Somewhat hacky. Genuinely useful."

### S41 · Start fresh.
- ★ The `/clear` habit, and the hidden compaction (plans):
  > "That idle session you come back to may already be compacted. You lose context without noticing."
- Callback to S12: sacrificing a session is only cheap with a handoff.

**Note clue:** Idle session may already be compacted: silent context loss. [1] compaction twice, details fall out. [2] handoff (decisions, status, files, next) → fresh session. /clear habit (S12 callback). Closer: "That's why the workflow looks the way it does."

---

## Close

### S42 · Build it once. Share it with everyone.
- ★ Your line (ideas #4):
  > "Our learning didn't stop. It changed direction. We used to learn frameworks and libraries. Now we learn to engineer AI."
- ★ The call to action (ideas #3): "Invest the time like you did for your first framework, while it's still subsidised."
- ◆ Callback: "The manual workflow from S06 lives here."

**Note clue:** Agents, skills, plugins, workflows, versioned. [1] out to the projects (manuals from S06). [2] company-wide: BS23 could do this. LEARNING CHANGED DIRECTION: frameworks → engineering AI. Learn it like a framework, now, while it's subsidised. "Reusable code → reusable AI engineering."

### S43 · Questions?
- ★ The current note mentions free-text Q8, but the new survey is all multiple choice. Either add the optional bonus free-text question (see the survey file) or open with the most surprising poll bar instead.
- ◆ One-breath recap before Q&A: "Shift the role. Plan before you prompt. Share what you build."

**Note clue:** Thank you. "Humans only." Recap: shift the role, plan before you prompt, share what you build. Warm up with the most surprising poll bar (or the bonus free-text answer). Hard stop 60:00.

---

## From your notes, deliberately skipped today
- **Wrong slide / "How AI will destroy the human race".** You removed it in your feedback.
- **"Our experience" screenshots of real AI chats.** That would mean new slide content. Tell the stories verbally on S11/S12 if you have them.
- **Explicit "third world" phrasing (S16).** Optional and sensitive. Use "our market" or skip it.
