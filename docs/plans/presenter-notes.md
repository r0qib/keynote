# Presenter Notes

> What the presenter sees for each slide: the point, what to cover, what each click reveals, and the lines worth saying as written. These are reminders, not a script. The delivery is yours.
> Visuals and builds are in [`slide-deck-plan.md`](./slide-deck-plan.md). Slide IDs and build numbers match it, and the live deck (`src/slides/manifest.js`), one to one.
> A full word-for-word script (optional) is in [`presenter-script.md`](./presenter-script.md).

## How to read these notes

- **Point** is the one thing the slide must land. If you lose your thread, say this and move on.
- **[1]**, **[2]** … are clicks. Each one is a real build in the deck: a slide with `totalBuilds: 2` has clicks [1] and [2], and nothing more.
- Quoted blocks are punchlines and lines worth keeping word for word.
- **(pause)** means stop for 2 seconds. Teams viewers see your screen 1–2 s late, so every reveal needs it.
- **Poll Qn** means read that result from the Forms summary on your second screen. The questions are in Appendix A.
- **Spoken only** marks facts that never appear on a slide: the budget, the usage, the salary joke. Only **$25,000** is ever on screen.
- Never blame the audience. Every negative is "me" or "we".

**Clock (talk ≈ 50:41 + Q&A; S07 is now 2:30, so everything after it runs +0:30):** 0:00 Opening · 3:15 The Good · 6:40 poll · 8:40 The Bad · 15:20 The Ugly · 25:16 Making It Count · 31:16 How We Work · 43:56 Epilogue · 49:26 Close · 50:41 Q&A · 60:00 stop

**Cut list:** if rehearsals run long, disable **A** first (S13, S17, S19; saves about 3 min), then **B** (S11, S16, S25, S34; about 4.5 more) in the slide manifest. If you are behind on the day, give an A or B slide one sentence and move on. Poll readbacks: if Q4's slide (S17) is cut, read Q4 on S18; if Q5's (S11) is cut, read it on S12.

**Poll readbacks:** Q1 S30 · Q2 S15 · Q3 S24 · Q4 S17 · Q5 S11 · Q6 S18 · Q7 S22 · Q8 S43.

---

## Opening

### S01 · AI-Assisted Development: The Good, the Bad and the Ugly
`0:00 → 0:30 · 0:30`

**Point:** an honest talk about what works, what does not, and how we work now.

- Who I am: Rokibul, InformatiQ team, Brain Station 23
- The slide plays while people join. Start on time anyway; late joiners catch up
- Not a vendor pitch, and not an anti-AI talk either. Real experience, both sides
- Promise up front: I am in the "Ugly" part too

> "Some of it good, some of it bad, and some of it ugly. And I am in the ugly part."

---

### S02 · We build software for the North Sea.
`0:30 → 2:30 · 2:00` · 10 clicks

**Point:** pride. These are the products our team built, and most of the company has never seen them.

- Our team is isolated and mostly works with the client, so this is internal bragging, and we have earned it
- No jokes on this slide. Respect the products
- **[1]** WellMate · **[2]** WellBook · **[3]** GeologiQ · **[4]** Offset Analyzer · **[5]** LogistiQ · **[6]** Event Analyzer · **[7]** AnalytiQ · **[8]** Portal. One product per click, in that order
- **[9]** all eight together: finish on the whole picture of what we built
- **[10]** the global reveal: acquired by Halliburton, piloting across Brazil, Argentina, Mexico, and beyond. We are no longer limited to Norway/North Sea
- Descriptors: WellMate (Well program & planning), WellBook (Rig & project management), GeologiQ (Real-time 3D digital twin), Offset Analyzer (Multi-well offset analysis), LogistiQ (Offshore logistics), Event Analyzer (Incident analysis), AnalytiQ (Analytics engine), Portal (Unified suite portal)
- One thing only you know per product, if you want it. Do not make up numbers

> "We build software for the North Sea."

---

### S03 · Today's feature presentation.
`2:30 → 3:15 · 0:45` · 2 clicks

**Point:** where we are going. The workflow chapter is the big one.

- **[1]** the five chapters slide in: The Good · The Bad · The Ugly · Making It Count · How We Work
- **[2]** How We Work lifts. Say it: most of our time goes here
- Widths are roughly time. Making It Count and How We Work are the two widest
- Spoken only: the poll comes after the good news. The epilogue is not on the agenda, on purpose

> "Everything before the last chapter is the setup. And a bit of therapy."

---

## I · The Good

### S04 · I · The Good (chapter card)
`3:15 → 3:25 · 0:10`

**Point:** good news first.

- A beat, then move on

> "Good news first. And there is a lot of it."

---

### S05 · We got our time back.
`3:25 → 4:55 · 1:30` · 2 clicks

**Point:** AI took the toil, and we got real time back.

- Mon to Fri: CRUD APIs, unit tests, migrations, that one regex, API docs. Each block says "1 day"
- **[1]** the blocks collapse to minutes (15, 10, 12, 1, 5)
- **[2]** the question on screen: "...so what are we doing with it?" Leave it hanging. The next chapters answer it
- Also true, and spoken only: a fast guide into an unfamiliar codebase, with file and line numbers
- The mascot is me, being cool about it

> "AI made the first draft practically free."

> "...so what are we doing with that time?"

---

### S06 · Our user manuals write themselves.
`4:55 → 6:40 · 1:45` · 2 clicks

**Point:** a real team win, and a human still signs off.

- Everyone needs manuals, nobody enjoys writing them, and they are stale by release day
- Our flow is the four-step stepper on the left: Capture · Annotate · Write · Review
- Spoken only: it is incremental. It keeps a snapshot of the last state and only looks at what changed
- **[1]** the manual page gets written: captured screenshots, numbered pins, the three steps
- **[2]** "Reviewed": a human checks it. That is the point of the mascot being done, not gone
- If you have a real before/after (time per release), say it. Do not estimate one

> "We removed the toil. Not the person."

---

## Poll

### S07 · Be honest. It's anonymous.
`6:40 → 9:10 · 2:30` · 2 clicks

**Point:** before the bad news, tell us yours. Honestly.

- **Paste the poll link in the chat now.** The QR is for phones. Test it through a Teams share beforehand
- About 2 minutes, with a timer on screen. Habits and opinions, not a test
- Say it up front: no names recorded, nothing goes near anyone's performance review. "I literally cannot see who answered"
- While they answer, read one or two early answers from the results screen
- Move on at about 60-70% responses
- **[1]** start the 2:00 timer: it grows, counts down, and the last 10 s turn red
- **[2]** the QR closes into a check: poll closed. Talk through the headline numbers if you want a quick one
- Results are read back later: Q2 on S15, Q3 on S24, Q4 on S17, Q5 on S11, Q6 on S18, Q7 on S22, Q1 on S30, Q8 on S43

> "Before I tell you what goes wrong, tell me what goes wrong for you."

> "I do not want to know who watches Reels while the agent is thinking. Just how many of you."

---

## II · The Bad

### S08 · II · The Bad (chapter card)
`8:40 → 8:50 · 0:10`

**Point:** the AI is the problem in this chapter.

- A beat, then move on

> "Now the parts that make us want to throw the laptop out of the window."

---

### S09 · The keynote vs. my terminal.
`8:50 → 10:20 · 1:30` · 3 clicks

**Point:** the gap between how AI is sold and what we live with.

- Three real, verified public claims, in date order. Sources are in Appendix C
- Cognition, Devin, 2024: "The first AI software engineer."
- **[1]** OpenAI, Codex, 2025: "Can work on many tasks in parallel." Anthropic, Claude Opus 4, 2025: "The best coding model in the world."
- **[2]** my terminal: "Add a confirmation before deleting a well." The reply: "Done ✓ Added a confirmation dialog."
- **[3]** the mock plays: click Delete, the toast says "Well deleted." and then the dialog "Are you sure you want to delete this well?" appears. The confirmation exists. It just comes after the deletion
- Be fair: these are impressive tools. A launch page is not day 47 of a real project

> "The confirmation exists. It just comes after the deletion."

---

### S10 · 99% of 70% of the time.
`10:20 → 11:20 · 1:00` · 1 click

**Point:** it is 99% right, 70% of the time.

- Say the first line straight and confident. Hold the 99% and wait for the nods
- **[1]** the ring splits: of 70% of the time. Pause and let it land
- Why it happens: long chats dilute early instructions. The rule you gave on turn 3 competes with 40 turns of everything else
- This is the number to remember when someone says "it follows instructions"

> "The AI follows my instructions 99% of the time."

> "The worst part is not the 70%. It is that I never know which part I am in."

---

### S11 · Did you even read what I said?
`11:20 → 12:50 · 1:30` · cut B · 4 clicks

**Point:** it follows the instruction, and then adds things nobody asked for.

- One big window, two scenarios, same terminal as S09
- **[1]** scenario 1: "Fix the date format in the wells table. Don't touch the API." The table is fixed, and api/wells.ts changed too: "also normalized dates in the API for consistency"
- **[2]** scenario 2: the rule pinned at the top is CLAUDE.md "Keep comments minimal." I ask for "Make the Save button blue." It adds a new design token, a ButtonVariant type, changes Submit and Cancel too, and a JSDoc block on every touched function
- **[3]** "Remove the comments." It removes them all and adds exactly one line: // removed all comments
- **[4]** the closing line. Say it, then move on
- **Poll Q5** biggest frustration: read the top answer. If S11 is cut, read it on S12
- Cut tier B

> "Technically correct. The best kind of correct."

---

### S12 · I asked for a circle.
`12:50 → 14:20 · 1:30` · 4 clicks

**Point:** architecture needs judgement. The AI overshoots, undershoots, or builds something else, and once it is on the wrong track it is very hard to bring back.

- This is a metaphor. Say so: "Read: a simple architecture." Anything that needs system design or architectural judgement behaves like this
- Every AI turn gets a typing bubble first, then the same reply style: "Perfect! Here's your circle." / "You're absolutely right, my apologies!" / "You're right to push back."
- **[1]** a rectangle · **[2]** "That's a rectangle." So: a trapezium · **[3]** "Just a circle." A circle with parts bolted on
- **[4]** the target: three attempts around the bull, never in it. Each correction lands further away
- **Spoken only:** once it is on the wrong track, it is very hard to bring it back. Sometimes the right call is to sacrifice the whole session (all that context) and start a new one. That is not a failure, it is a decision
- Never the bull, but the dartboard is still on the wall

> "A trapezium. I did not know it knew that word."

> "Sometimes the fastest way forward is to throw the session away."

---

### S13 · Enterprise-grade dark mode.
`14:20 → 15:20 · 1:00` · cut A · 2 clicks

**Point:** asked for a toggle, got an architecture. The punchline is the documentation it wrote.

- Prompt on screen: "Add a dark mode toggle."
- **[1]** the file tree explodes: ThemeProvider.tsx, ThemeContext.ts, useTheme.ts, ThemeRegistry.ts, tokens/dark.ts, tokens/light.ts, ThemeToggle.stories.tsx...
- **[2]** THEME_ARCHITECTURE.md scrolls through an absurd table of contents ("Philosophy of Darkness", "Theme Lifecycle Hooks", "Migration Strategy"), counting up to page 1 of 40. The mascot reacts
- It is not wrong, it is overkill, and you still have to review all of it
- Cut tier A

> "A forty-page architecture document. For a toggle."

---

## III · The Ugly

### S14 · III · The Ugly (chapter card)
`15:20 → 15:31 · 0:10`

**Point:** the pivot. The Bad was the AI. The Ugly is us.

- Say the pivot line slowly, then a beat before moving on
- Everything in this chapter is my habit, process or budget. I am in every slide of it

> "The Bad is the AI. The Ugly... is us."

> "And I am in every slide of this chapter."

---

### S15 · Doomscrolling…
`15:31 → 17:01 · 1:30` · 2 clicks

**Point:** chat-driven development wastes our time and shreds our focus.

- Build 0 is only a huge typing bubble. **Stay silent for 3-4 seconds.** Let it be awkward
- No corner badge, no progress bar until [1]
- **[1]** the bubble becomes the headline: Doomscrolling... Prompt, wait, review, prompt again. The phone feed, the coffee
- **Poll Q2:** what do you do while it thinks? Read the top answer. If Reels wins: "I said it was anonymous. I did not say it was not funny."
- **[2]** context rot. Say it about me, not them: I lose the thread, and so does the model
- Be fair: chat is fine for a small bug, a quick question or brainstorming

> "It is not a time problem. It is an attention problem."

> "Building a big feature this way is like writing a book by text message."

---

### S16 · Proven. Thorough. Not cheap.
`17:01 → 18:01 · 1:00` · cut B · 2 clicks

**Point:** the frameworks are proven and thorough. They are also not cheap, and that is a respectful statement.

- Respect them: Spec Kit, AI-DLC, BMAD, OpenSpec. They are real, they are thought through, and plenty of teams ship with them
- **[1]** a weight called "Tokens" levels the scale
- **[2]** a weight called "Time" tips it the other way
- The point is a balance, not a verdict. For us the question is what we can afford, in tokens and in time
- Details for Q&A are in Appendix C
- Cut tier B

> "Proven. Thorough. Not cheap."

---

### S17 · What we say vs. what we do.
`18:01 → 19:01 · 1:00` · cut A · 1 click

**Point:** the gap between what we say and what we do.

- Left: in the meeting, "We follow spec-driven development."
- **[1]** right: what I actually do. A terminal, and I type: fix it. Enter
- Make this about me, with a smile. "Guilty" is allowed
- **Poll Q4:** do you strictly follow a framework? Read the top answer. If S17 is cut, read it on S18
- Cut tier A

> "I said spec-driven in the meeting. And then I typed: fix it."

---

### S18 · The elephant in the room.
`19:01 → 20:31 · 1:30` · 3 clicks

**Point:** because of budget limits we cut corners. We one-shot, and we skip review, docs and QA.

- The lane: Plan · Spec · Implement · Review · Test · Docs · QA. The meter above it drains
- **[1]** Review and Docs are cut. Scissors, the lane closes the gap
- **[2]** Plan, Spec, Test and QA are cut
- **[3]** only Implement is left, with a stamp: "One shot."
- **Poll Q6:** when does your monthly budget usually run out? Read the top answer. If "first week": "Do not ask. I will not."
- No numbers here. The real budget story comes much later, and it is the reason the final chapters exist

> "We do not skip review because we do not care. We skip it because the meter is running."

---

### S19 · The three-body problem.
`20:31 → 21:31 · 1:00` · cut A · 2 clicks

**Point:** the framework, the budget and on-time delivery pull against each other. The slide does not explain it. You do.

- Title is the three-body problem. Corners: The framework · The budget · On time
- **[1]** the mascot runs from corner to corner. Whichever corner it reaches lights up and the other two dim and wobble
- **[2]** the collapse: exhausted, melted in the middle
- Say it once, lightly: pick two. It is a real constraint, not a complaint
- Tease: more out of the same budget in the last chapters
- Cut tier A

> "Pick two. Every company has its version of this."

---

### S20 · Everything is purple now.
`21:31 → 22:46 · 1:15` · 2 clicks

**Point:** AI has default taste, and it is everywhere, and it is purple.

- Build 0 is the slop itself: purple gradient, glass cards, sparkles, "Revolutionize Your Workflow", rainbow pills, a floating "Ask AI". **Let it land, say nothing for a beat**
- **[1]** it shrinks into the clean slide. The headline lands, and a small framed thumbnail of the slop stays as evidence
- **[2]** the principle: AI should follow our principles, not its defaults
- This is also the setup for S26, where purple comes back as a joke

> "AI should follow our principles, not its defaults."

---

### S21 · Make it better. Make no mistakes.
`22:46 → 23:46 · 1:00` · 2 clicks

**Point:** it is on us. Lazy, escalating prompts instead of clear ones.

- The bubbles are mine. Say "me" every time
- "make it better" -> **[1]** "Make it better. Make no mistakes." -> **[2]** "MAKE. NO. MISTAKES."
- Read each one louder. Let the mascot sweat, then burn
- Bad is the AI: it will not be perfect soon. The fix is how I ask

> "It is not going to be perfect. It will not be perfect soon. So the fix is how I ask."

---

### S22 · Don't be a meat proxy.
`23:46 → 25:16 · 1:30` · 5 clicks

**Point:** passing messages between the client and the model without thinking.

- Client -> me (the blob) -> AI. Say "I have been the pipe"
- **[1]** a1f3c2 forward client email to AI
- **[2]** b7e9d1 paste AI answer to client
- **[3]** d9b6e3 ask AI what the client meant
- **[4]** e2c1f7 who is JSON?
- **[5]** the shrug: "The model said so."
- **Poll Q7:** have you ever shipped AI-written code you did not fully understand? Read it, then take the shame on yourself first
- The lesson, one sentence: add judgement, not just transport

> "The model said so. The most dangerous four words in code review."

---

## IV · Making It Count

### S23 · IV · Making It Count (chapter card)
`25:16 → 25:26 · 0:10`

**Point:** we can fix the ugly part.

- A beat, then move on
- Mood shift: the ugly part is the one we can actually change

> "The ugly part is the part we can fix."

---

### S24 · The role shift.
`25:26 → 26:56 · 1:30` · 2 clicks

**Point:** we never coded all day. Now the coding is largely solved, and the role has shifted.

- Sub on screen: "(no raise included)". Keep it
- Before: a day bar. Coding ~4 h, then meetings, debugging, reviews, thinking. We never coded all day; four hours on a good day
- **[1]** the coding segment shrinks to a sliver labelled "AI". Planning, designing, evaluating and deciding grow into the time. Debugging transforms into "Second-phase fixing" (fixing what was missed in the first phase)
- **[2]** the identity swap: the workhorse becomes a decision maker. "Product owner · Project manager · Decision maker"
- **Poll Q3:** do you miss writing code by hand? Read it with kindness. Some of us do
- We are not the workhorse any more

> "No raise included."

> "We are not the workhorse we used to be."

---

### S25 · The ticket is the floor, not the ceiling.
`26:56 → 27:41 · 0:45` · cut B · 1 click

**Point:** with the time back, look over the fence.

- The ticket sits on the floor. Where it ends is where most of us stop
- **[1]** the fence, the mascot peeks over it, and beyond it are polished products. Competitors, best practices, great products
- One line on screen: "Look over the fence."
- Cut tier B

> "The ticket is the floor, not the ceiling."

---

### S26 · Let's make it better.
`27:41 → 29:41 · 2:00` · 2 clicks

**Point:** with the heavy lifting delegated, we can deliver thoughtful UX that was not affordable before. It is balance, not more features.

- Same wellbore grid in every state. It reads as one component evolving
- Before AI: respectable. Search, sort icons, plain borders, pagination. It worked and served its purpose
- **[1]** the slop version, unlabelled: purple header, glass rows, rainbow pills, sparkles, "Ask AI". The headline becomes "Beautiful, isn't it?" **Let them wonder, then reveal the joke yourself**
- **[2]** with AI, done right: calm grid, search and filter chips, density toggle, a quick skeleton on entry, colour only where it means something (status dots, one out-of-range value)
- The hero detail: a Remarks column that truncates, a cursor moves in, and a popover opens with the full text. Smooth, rich, not distracting
- Spoken only: the purple is the same joke as S20

> "Beautiful, isn't it?"

> "Colour only where it means something."

---

### S27 · Plan for hours. Let it run for hours.
`29:41 → 30:56 · 1:15` · 2 clicks

**Point:** plan deeply in one focused block, then let agents execute for hours.

- Two lanes, "Me" and "Agents", on a 09:00 to 18:00 axis with a moving sun
- Build 0 is the chaos: the spiky focus line from S15 (prompt, wait, scroll, prompt)
- **[1]** the line becomes one solid block: "Plan · ~3 h". Then the Agents lane fills with a long "Execute" band that runs past 18:00. Overnight
- **[2]** Me gets small blocks during execution: Review, Next plan, Client. I am free while it runs
- Callback: this is the answer to the question on S05, so what are we doing with the time?

> "I plan for hours. It runs for hours. And I get my day back."

---

### S28 · $25,000
`30:56 → 31:16 · 0:20`

**Point:** a number with no explanation. It is an open loop; do not close it yet.

- Only "$25,000" on screen, centred, big. No badge, no headline
- Say a beat of nothing first. Then: "Hold on to that number."
- Do not explain it. S38 brings back the same number in the same place, then tells the story

> "Hold on to that number. I will explain. Not yet."

---

## V · How We Work

### S29 · V · How We Work (chapter card)
`31:16 → 31:26 · 0:10`

**Point:** everything so far was the setup. Now: how we actually work.

- A beat, then move on
- The centrepiece of the talk begins here

> "Everything so far was the setup. This is how we actually work."

---

### S30 · How we work now.
`31:26 → 32:56 · 1:30` · 3 clicks

**Point:** we design a workflow per complex feature. I am in the room for the first half; agents run the second.

- When: a complex feature that touches many areas, a new module, or a bundle of smaller features planned together
- Four stations: Gather · Plan · Orchestrate · Remember
- **[1]** Gather and Plan, with the zone "With me"
- **[2]** Orchestrate and Remember, with the zone "Without me"
- **[3]** the loop arrow, back to the start: the next feature. Then the map shrinks into the mini-map you will see on every following slide
- Honest: it is not always the absolute lowest-cost approach, but it balances quality, complexity and tokens. We got there by experiment
- **Poll Q1:** how do you mostly work with AI agents? Read the top answer

> "It is not a general workflow we squeeze a feature into. We design the workflow around the feature."

---

### S31 · The requirement is just the start.
`32:56 → 34:41 · 1:45` · 3 clicks

**Point:** the client requirement is only the start. This is where ownership and expertise show.

- The ticket: INQ-1502, "Wellbore search." It continues the wellbore grid from S25 and S26
- **[1]** four sources arrive: Past projects · How others solved it · That blog post · Our existing assets. Have we solved this in another project? Did a big player already solve it? Did I read something? What assets do we already have?
- **[2]** I become the user (mascot in the "user's shoes" frame): Who uses this? What do I need first? What comes next? Would *I* be happy with this requirement?
- **[3]** everything flows into the ticket and it grows into a rich Brief
- This is where I can make the best impact and prove my expertise and value

> "The requirement is the start. The brief is mine."

---

### S32 · Plan with a co-worker.
`34:41 → 36:26 · 1:45` · 3 clicks

**Point:** I bring the requirements and how I would implement them. The AI is a co-worker that attacks the plan from every angle, and I decide.

- Build 0: the Brief from S31, shrunk
- **[1]** the attack. Questions arrive from every direction: Zero results? Offline? Which users first? How do we verify it? Mobile?
- **[2]** my answers snap onto each question, each one stamps a check on the brief. The agent prompts me with every decision it can foresee; I decide, because I hold the context
- **[3]** the brief splits into a stack of unit cards. One expands into six bands: Rules · Context (short) · Task · Tests · Verify · Agent rules
- Each unit carries everything its agent needs, so the agents work only within their own context
- Plan and spec markdown files exist, too. Very common. Do not dwell on them

> "It asks every question it can think of. I answer the ones only I can."

---

### S33 · One manager. Many fresh minds.
`36:26 → 38:26 · 2:00` · 3 clicks

**Point:** the main session only orchestrates, like a project manager. The workers are fresh agents, and each gets only the context it needs.

- **[1]** explore once. One scan of the codebase produces a context pack: Conventions · Design rules · Domain · Tests
- **[2]** deal the cards. The orchestrator hands specific cards to fresh agents: Designer, Implementer, Reviewer, Tester. Each one glows "fresh"
- **[3]** the contrast, no numbers: "Explore every time" (four beams, tall token bar) vs. "Explore once" (one beam, short bar)
- The main session delegates and checks that the work was actually done. Workers stay in their own context
- Clear, concise agendas. No redundant work. Contexts stay short, so fresh agents stay cheap

> "Explore once. Hand it out. Do not rot the context."

---

### S34 · Right model. Right effort.
`38:26 → 39:41 · 1:15` · cut B · 3 clicks

**Point:** match the model and the effort level to the job.

- Opus plans, decides, designs and reviews
- **[1]** Sonnet implements and writes unit tests
- **[2]** Haiku runs scripts, commits and cleans up. Fully scripted chores with instructions that cannot fail: Playwright scripts, batched commits with proper messages, removing comments and debris
- **[3]** the effort sliders move. We pick effort by the complexity of the feature (low, medium, high, max)
- Like channels on a mixing desk. The mini-map stays on Orchestrate: routing is part of orchestration
- Cut tier B

> "Haiku with an instruction it cannot misread."

---

### S35 · Built for this feature. Then retired.
`39:41 → 40:56 · 1:15` · 2 clicks

**Point:** general-purpose agents get mediocre. Specialised, temporary ones get sharp and cheaper.

- We used to use general-purpose agents: a code reviewer, a UI designer, a backend expert. Their instructions kept growing and the results were mediocre
- Build 0: one general agent, its instruction document growing taller, gauge at "meh"
- **[1]** a template from our workflow repo stamps out three specialists with feature-specific names: grid-designer, grid-implementer, grid-reviewer. Short documents, the gauge goes to "sharp"
- **[2]** "Feature shipped": the agents retire and fade into the repo; the template stays
- The workflow repo also holds how we design these agents, so we do not burn tokens crafting them from scratch each time

> "We make them for the feature, and we retire them when it ships."

---

### S36 · The files are the memory.
`40:56 → 42:41 · 1:45` · 3 clicks

**Point:** we never rely on the chat or the harness's to-do list for progress. Files hold the state, so a session can die and the next one resumes exactly where it stopped.

- **[1]** a session runs, units ticking [x], and then the laptop dies. It is a real risk, and a joke about mine
- **[2]** a new session reads progress.md and resumes at unit 7. The [~] becomes [x] and it continues
- **[3]** the four files: progress.md (Unit by unit) · decisions.md (Calls made mid-run) · notes.md (Memory for fresh agents) · review-log.md (Parked for a human)
- decisions.md: the run is autonomous, so when an agent faces a call we did not plan for, it logs it. I check them later, and fix the wrong ones
- notes.md: a convention one agent discovers, the next fresh one reads. About 90% of it is disposable after the feature
- review-log.md: a reviewer always finds something, even in perfect code. Non-severe findings are parked here for a human glance

> "The laptop can die. The progress file does not."

> "A reviewer always finds something. That is the nature of LLMs."

---

### S37 · Code is the new context.
`42:41 → 43:56 · 1:15` · 2 clicks

**Point:** documentation that mirrors code drifts out of sync, and that is debt. Newer models read well-designed code very well.

- Build 0: a tall stack of markdown docs beside a code block; red "out of sync" marks between them. The code says a limit of 50 and byRelevance; the comments say 20 results and spud date
- **[1]** the stack collapses. Only three thin docs stay: Product context · Decision records · Memory bank. The code grows cleaner and becomes the centre
- **[2]** all four stations complete in the mini-map, and the kicker lands: "Better code. Fewer docs."
- Spoken only: we save fewer of the markdown files we generate. Plan and spec files exist, too, but they are not the point
- The memory bank is only populated when something goes against convention or is specific to our domain

> "Code is the new context, as long as the code is well designed."

---

## Epilogue · The $25,000 lesson

### S38 · It's unlimited.
`43:56 → 45:26 · 1:30` · 2 clicks

**Point:** the $25,000 story begins. Storytelling tone: big, simple, few words.

- Build 0: **$25,000**, identical to S28. Same position, size and weight. No badge, no headline yet. "Remember this number?"
- **[1]** the number moves up. "It's unlimited." with a big ∞ drawing itself on. Small mark: GitHub Copilot to Claude Code
- Copilot: we were happy with it, but it moved to a more usage-based pricing model and the cost kept climbing
- About two or three months ago our company gave us an enterprise Claude Code subscription through AWS Bedrock. Around the same time our client was acquired by Halliburton, a US company, and we were introduced to Claude Code through their enterprise subscription
- We were encouraged to use AI more, because the company felt we were not using enough. The message: it is an unlimited plan, make the most of it, just use it for work-related tasks
- **[2]** all in: the infinity gives way to a sketch that morphs into a polished app. "1 month". The rocket
- A new project had just been handed to me. The client's prototype had been vibe-coded by someone who is not technical. In one month it became production-ready. I am proud of the code quality, the UX and the product. I even followed Anthropic's recommended ways of working, as if I were an Anthropic employee
- No budget figures on screen. Say them, do not show them

> "Remember this number?"

> "It is an unlimited plan. Make the most of it. Just use it for work."

> "And I did what any nerd like me would do. I went all in."

---

### S39 · Access revoked.
`45:26 → 46:41 · 1:15` · 2 clicks

**Point:** access revoked, the top 10 list, and the new reality. The only place the number is tied to me.

- **Headline:** Access revoked.
- Build 0: a terminal says "Error: access denied for this account." In the corner, a mail icon with an unread badge: "Usage warning". The email I missed
- **[1]** "Top 10 users". Anonymous bars, one slides up: **me · $25,000**. About two months in, the next morning, I learned I was among the top ten highest-spending users, at roughly $25,000 in API-equivalent usage
- The message flipped: two months earlier we were told to use more AI; now it was "you are probably using too much, we need limits"
- **[2]** the infinity snaps into a gauge. No numbers on screen. Say the new reality: each of us has a soft monthly limit of about $1,100. It is not a hard cap and we can still consume around $3,000 a month. But $3,000 of tokens is not as much as it sounds with multiple agents and large context windows
- The salary joke goes here: we sometimes spend more on AI tokens than we earn in salary. It is funny, and it is also kind of true
- Then: that is when I started looking at token consumption and caching. As a team we experimented and landed on the workflow. Some lessons were learned the hard way

> "I did not miss the limit. I missed the email about the limit."

> "Sometimes we spend more on AI tokens than we earn in salary. That is a joke. Sort of."

---

### S40 · Five minutes.
`46:41 → 48:11 · 1:30` · 2 clicks

**Point:** lesson 1: prompt caching matters more than you think.

- Tools like Claude Code, Codex and Copilot cache so they do not reprocess the same context. Policies differ by plan and provider. Individual Claude plans have a longer default cache lifetime; our enterprise setup through AWS Bedrock has a five-minute TTL
- Build 0: a 100K context block, a 5:00 ring, glowing "cached"
- **[1]** the coffee break. The ring runs out. Then a tiny "ok, continue", and the whole block flashes as it is processed again. A short message can mean a huge amount of input tokens
- Cache reads are significantly cheaper than cache writes, so avoid letting the cache expire needlessly
- **[2]** the fix: our main session sends a lightweight ping every 4:50 to keep the cache warm while sub-agents work. A somewhat hacky solution, but useful given the five-minute TTL
- No dollar figures on screen

> "Five minutes. And a coffee break takes exactly that long."

> "Somewhat hacky. Genuinely useful."

---

### S41 · Start fresh.
`48:11 → 49:26 · 1:15` · 2 clicks

**Point:** lesson 2: do not blindly resume yesterday's session. Ask for a handoff, then start fresh.

- Build 0: yesterday's long conversation stack
- You leave a session idle and come back the next day, expecting everything as you left it. That is not necessarily what happens
- **[1]** compaction, once, then again. Little detail blocks fall out: "the decision from turn 40", "the edge case". It looks smaller but there are holes
- The exact compaction details are internal to the provider, so we do not know what is kept, summarised or dropped. Repeated compaction can lose decisions and context, and the result can be worse
- **[2]** the handoff doc (Decisions · Status · Files · Next) goes into a fresh, clean, small session
- Ask the agent for the handoff before you leave. Include the decisions, current status, relevant files, outstanding tasks
- **End on the closer, spoken, no slide:** "That's why the workflow looks the way it does."

> "That's why the workflow looks the way it does."

---

## Close

### S42 · Build it once. Share it with everyone.
`49:26 → 50:41 · 1:15` · 2 clicks

**Point:** our team culture is to build, version and centralise our own agents, plugins, skills and workflows. Reusable code is not enough. We need reusable AI engineering.

- Build 0: a central "Team AI repo" with versioned items (v1.4, v2.0)
- **[1]** the items flow out to project nodes: the products from S02
- **[2]** our hub is one hub among many: the same idea, company-wide. Brain Station 23 could do this for everyone. Then the kicker: "Reusable code -> reusable AI engineering."
- If your team has several projects and sub-teams, this is probably the way to go
- The point: our AI engineering should not be duplicated every time
- No Teams handle, no repo name, no "ask me"

> "Reusable code is not enough any more. We need reusable AI engineering."

---

### S43 · Questions?
`50:41 → 59:41 · 9:00`

**Point:** thank you. Questions, humans only.

- Thank you
- Warm up with one or two funny free-text answers from poll Q8
- The chat captain feeds you questions. Hard stop at 60:00
- Do not reveal anything new on the slide. It is only the mascot waving

> "Humans only."

---

## If asked (Q&A)

- **Why not just use the framework?** Respect for them; they are proven. For us the question is cost, in tokens and in time. For big, fuzzy, multi-team work they can carry the process. For everyday work we borrow their ideas: specs as contracts, settled decisions, phased work.
- **Is the workflow expensive?** It is not always the cheapest way of working, but it balances quality, complexity and tokens. The waste in chat-driven work is re-exploring, re-asking and long stale contexts, and the workflow caps those.
- **No budget for Opus?** Spend the best model on planning, deciding, designing and reviewing. A mid model implements; the smallest runs fully scripted chores.
- **How do I start tomorrow?** Brainstorm before you prompt. Keep the plan in a file, not the chat. Start fresh sessions with a handoff note instead of resuming old ones.
- **Does it work with Copilot?** The principles transfer: plan files, scoped context, the right model per task, scripted checks. The tooling differs.
- **What about juniors?** A real risk. Use AI as a tutor, not an answer machine: ask it why, write some things by hand, review every line.
- **What if the plan is wrong mid-run?** Agents log the call in decisions.md; I check it after the run and fix the wrong ones. Big changes wait for a checkpoint.
- **Is it safe to run agents unattended?** Only with hard rails: explicit paths, no push, no force, never delete what it did not create, deny rules for anything sensitive, and human checkpoints.

---

## Appendix A · Poll questions (S07)

Anonymous, about 2 minutes (timer on S07). Each question lists the slide where you read its result.

**Q1. How do you mostly work with AI coding agents?** → S30
- Chat back-and-forth until it works
- Plan first, then let it run
- A structured framework (Spec Kit, BMAD, AI-DLC, OpenSpec…)
- Mostly autocomplete
- I don't. I'm here for the memes.

**Q2. Your agent says "Thinking…". What are you doing?** → S15
- Watching it type, like a proud parent
- Working on something else
- Reels / Shorts / Facebook
- Cha break
- Starting a second agent to keep the first one company

**Q3. Do you miss writing code by hand?** → S24
- Yes, that was the fun part
- Sometimes
- No, never going back
- I still write most of my code

**Q4. Do you *strictly* follow an AI development framework?** → S17 (if cut, S18)
- Yes, strictly
- Partly, when it's worth it
- I tried. I gave up.
- I *say* I do…
- What's BMAD?

**Q5. Your biggest frustration with AI agents?** → S11 (if cut, S12)
- Ignores my instructions
- Fixes one thing, breaks another
- Overcomplicates simple things
- Burns through my budget
- All the waiting
- Confidently wrong

**Q6. When does your monthly AI budget usually run out?** → S18
- It never does
- Last week of the month
- Mid-month
- First week. Don't ask.
- I don't know my budget

**Q7. Have you ever shipped AI-written code you didn't fully understand?** → S22
- Never
- Once or twice
- Regularly
- I plead the fifth

**Q8 (optional, free text). Your best "I told it NOT to do that, and it did" moment.** → S43

---

## Appendix B · Before going live

- [ ] Two screens: the audience window on screen A; presenter view and poll results on screen B
- [ ] In Teams, share **the audience window only**, then check the presenter view isn't visible in the share
- [ ] Camera on
- [ ] Forms: "Record name" off, and "Anyone can respond" (or org-only with names off)
- [x] Replace the placeholder `POLL_URL` in `S07_Poll.jsx` with the real Forms link (see `missing-pieces.md`)
- [ ] Scan the QR **through a Teams share from a phone**. If it won't scan, make it bigger
- [ ] Poll link copied, ready to paste at S07. A **backup poll** (a second Form or a StrawPoll) is ready in case Forms misbehaves
- [ ] If your Forms has a Present mode, open it on screen B for live results; otherwise keep the Responses tab open
- [x] Confirmed the S02 product descriptors (WellMate: Well program & planning · WellBook: Rig & project management · GeologiQ: Real-time 3D digital twin · Offset Analyzer: Multi-well offset analysis · LogistiQ: Offshore logistics · Event Analyzer: Incident analysis · AnalytiQ: Analytics engine · Portal: Unified suite portal)
- [ ] Chat captain briefed: watches the chat and sends you the best replies privately
- [ ] Notifications off (Teams, Slack, OS). Phone face down. Water

---

## Appendix C · Facts behind the claims

For when someone pushes back in Q&A.

**S09 vendor claims (verified 2026-11-05, verbatim)**

- **Cognition, "Introducing Devin", 2024-03-12:** "the first AI software engineer". https://cognition.com/blog/introducing-devin (the old cognition.ai URL redirects here)
- **OpenAI, "Introducing Codex", May 2025:** "a cloud-based software engineering agent that can work on many tasks in parallel". The slide quotes the fragment "Can work on many tasks in parallel." https://openai.com/index/introducing-codex/ (blocks fetchers with a 403; read it via https://web.archive.org/web/20250519212447/https://openai.com/index/introducing-codex/)
- **Anthropic, "Introducing Claude 4", 2025-05-22:** "the best coding model in the world". The same page also says "work continuously for several hours" (not used on screen). https://www.anthropic.com/news/claude-4

**Our story (the presenter's account, spoken only)**

- GitHub Copilot moved to a more usage-based pricing model and the cost kept rising. About two or three months ago the company gave us an enterprise Claude Code subscription through AWS Bedrock. Our client was acquired by Halliburton (a US company) around then, and we were introduced to Claude Code through their enterprise subscription.
- The message was to use more AI. After about two months my Claude Code access was revoked (I had missed a usage-warning email). The next morning I learned I was among the top 10 highest-spending users, at about $25,000 in API-equivalent usage. The message flipped to "you are probably using too much".
- Now: a soft limit of about $1,100 per person per month. It is not a hard cap; we can still consume about $3,000 of usage a month.
- Cache: our enterprise setup (AWS Bedrock) has a five-minute prompt-cache TTL. The main session pings about every 4:50 to keep it warm.

**Technical background (checked 2026-11-02)**

- **Caching (Claude Code):** the main-conversation cache TTL is about 1 h on a subscription and 5 min on an API key; subagents default to 5 min. Cache writes cost more than base input (1.25× for 5 min, 2× for 1 h); cache reads cost about 0.1×. Long idle sessions can be compacted before the cache expires. Sources: code.claude.com/docs/en/prompt-caching · code.claude.com/docs/en/settings-reference
- **Ignore files:** Claude Code has no `.claudeignore`; use `permissions.deny` `Read(...)` rules in `settings.json` (code.claude.com/docs/en/permissions). Copilot's content exclusion isn't supported in agent mode or the CLI. Cursor's `.cursorignore` isn't a hard guarantee.
- **Effort and subagents:** effort levels are `low` · `medium` · `high` · `xhigh` · `max`, depending on the model. Subagent frontmatter supports `model`, `effort` and `maxTurns` (code.claude.com/docs/en/sub-agents).
- **Spec Kit:** core flow `constitution` → `specify` → `plan` → `tasks` → `implement` → `converge`; optional gates `clarify`, `checklist`, `analyze` (github.com/github/spec-kit).
- **AWS AI-DLC:** the original blog has 3 phases (Inception, Construction, Operations), with "bolts" instead of sprints. The awslabs repo lists "5 phases and 33 stages", with profiles such as express, feature, bugfix and enterprise (github.com/awslabs/aidlc-workflows).
- **BMAD Method:** planning runs Analysis → Planning → Solutioning, with skills such as brainstorming, product brief, PRD, UX and architecture. v6 is stable; a v7 alpha is in progress.
- **OpenSpec:** "fluid, not rigid", built around `propose` → `apply` → `archive`, with a change folder holding the proposal, specs, design and tasks.
