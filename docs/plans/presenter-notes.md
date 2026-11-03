# Presenter Notes

> What the presenter sees for each slide: the point, what to cover, what each click reveals, and the lines worth saying as written. These are reminders, not a script. The delivery is yours.
> Visuals and builds are in [`slide-deck-plan.md`](./slide-deck-plan.md). Slide IDs and build numbers match it one to one.

## How to read these notes

- **Point** is the one thing the slide must land. If you lose your thread, say this and move on.
- **[1]**, **[2]** … are clicks. Each one matches a build number in the deck plan.
- Quoted blocks are punchlines and lines worth keeping word for word.
- **(pause)** means stop for 2 seconds. Teams viewers see your screen 1–2 s late, so every reveal needs it.
- **Poll Qn** means read that result from the Forms summary on your second screen. The questions are in the appendix.
- **Ask** is an optional prompt for the Teams chat or reactions.

**Clock:** 5:00 The Good · 10:45 poll · 14:15 The Bad · 23:45 The Ugly · 39:05 Making It Good · 70:35 finale · 72:35 Q&A · 80:00 stop

**Cut list:** if rehearsals run long, disable **A** first (S15, S22, S38), then **B** (S13, S27, S37, S41) in the slide manifest. If you are behind on the day, give an A or B slide one sentence and move on.

---

## Opening

### S01 · Title
`0:00 → 1:00 · 1:00`

**Point:** an honest talk about what works, what doesn't, and how I work now.

- Warm-up: **Ask** for a laugh reaction from anyone who has typed "please" to an AI today
- Who I am, InformatiQ team
- Not a vendor pitch, and not an anti-AI talk either. Real experience, both sides

> "Me too. Twice before breakfast."

---

### S02 · Who we are
`1:00 → 3:00 · 2:00`

**Point:** we build software for offshore drilling, so wrong code has real consequences.

- InformatiQ is our Norwegian client: oil and gas, offshore drilling. Not the petrol-pump kind
- **[1]** the apps: name a few (WellMate, WellBook, LogistiQ, AnalytiQ, GeologiQ, Event Analyzer, Offset Analyzer, Portal)
- **[2]** the stakes line
- My examples come from our project, but the lessons apply to any web, backend or mobile project here

> "When our code is wrong, someone on a rig reads the wrong number."

> "So when an agent cheerfully says 'I've refactored your calculation logic to be cleaner!', our hearts stop."

- Plant it: "Keep the rig in mind. We'll come back to it." (paid off on S36)

---

### S03 · Wrong slide
`3:00 → 4:00 · 1:00`

**Point:** a gag. The slide has to look real.

- Read the title dead serious: "How AI will destroy the human race… a practical five-step—"
- (pause) Squint at the screen
- **[1]** the eraser wipes it into the agenda
- Deadpan is the joke. Don't overact. If you briefed a plant, they unmute here

> "…wrong deck. That one's for the after-party."

---

### S04 · Agenda
`4:00 → 5:00 · 1:00`

**Point:** four chapters, and the last one is the fix.

- Four chapters, like any good Western: The Good, The Bad, The Ugly, Making It Good
- Warn them: the Ugly is uncomfortable, and I'm in all of it
- **[1]** Making It Good lights up
- **[2]** the poll and Q&A. The poll comes after the good news

> "The last chapter is the longest. That's where we fix things."

---

## I · The Good

### S05 · Chapter card
`5:00 → 5:15 · 0:15`

> "Good news first. And there's a lot of it."

---

### S06 · We got our time back
`5:15 → 7:15 · 2:00`

**Point:** AI took the toil, and we got real time back.

- The old week: CRUD endpoints, unit tests, migration scripts, *that one* regex, docs nobody reads
- **[1]** now it's minutes. Boilerplate, scaffolding and migrations are gone
- Also: a fast guide to an unfamiliar codebase or library, with file and line numbers
- **[2]** the question. Leave it hanging; it comes back on S18 and S27

> "AI made the first draft practically free."

> "…so what are we doing with that time?"

---

### S07 · Our user manuals write themselves
`7:15 → 9:45 · 2:30`

**Point:** a real team win, and a human still signs off.

- Everyone needs manuals, nobody writes them, and they're stale on day one
- **[1]** our workflow: skills, commands, scripts, hooks, sub-agents
- The clever bit is that it's incremental: it keeps a snapshot of the last state and only looks at what changed
- **[2]** screenshots, annotations, pages
- **[3]** the human review
- If you have a real before/after figure (time per release), say it here. Don't estimate one

> "We removed the toil. Not the person."

---

### S08 · Day one feels like magic
`9:45 → 10:45 · 1:00`

**Point:** AI is magical at the start of a project.

- **[1]** the bar rockets to 80% before lunch
- Leave the bar hanging and go straight into the poll. That's the bridge

> "Ten-x engineer. Already drafting the LinkedIn post."

> "Hold that bar in your mind. The other 20% is coming."

> "But before the bad news, I need something from you."

---

## Poll

### S09 · Poll
`10:45 → 14:15 · 3:30`

**Point:** before the bad news, tell us yours. Honestly.

- **Paste the link in the chat now**
- 8 questions, 2 minutes. Habits and opinions, not a test
- **[1]** "Trust me, I'm one of you."
- Say it up front: no names recorded, and nothing goes near anyone's performance review. "I literally can't see who answered."
- While they answer, read one or two early answers from the results screen
- If it goes quiet: the first AI draft of this deck had a glowing orb labelled "DISSOLVE TOIL" (it comes back on S23)
- Move on at about 60–70% responses. The first result (Q5) is read on S11, about a minute later, so keep the Forms summary open

> "Before I tell you what goes wrong, tell me what goes wrong for you."

> "I don't want to know *who* watches Reels while the agent is thinking. Just *how many* of you."

> "Answer honestly, and you're co-presenting the rest of this talk."

---

## II · The Bad

### S10 · Chapter card
`14:15 → 14:30 · 0:15`

> "Now the parts that make us want to throw the laptop out of the window."

---

### S11 · The keynote vs. my terminal
`14:30 → 16:15 · 1:45`

**Point:** the gap between how AI is sold and what we live with.

- **[1] [2] [3]** the keynote words: autonomous, end-to-end, a senior engineer who never sleeps
- **[4]** me: "the button still doesn't work" → "You're absolutely right!" → the exact same code
- **Ask** for a laugh reaction from anyone who got "absolutely right" this week
- **Poll Q5:** biggest frustration
- Be fair: these are impressive tools, but a demo isn't day 47 of a real project

> "You're absolutely right! …and here's the same code. With more confidence."

> "Not a senior engineer who never sleeps. A very fast, very confident junior with short-term amnesia."

---

### S12 · 99% of 50% of the time
`16:15 → 17:30 · 1:15`

**Point:** instruction-following is inconsistent, and you never know which half you're in.

- Say the first line straight. (pause) Wait for the nods
- **[1]** the twist
- Why it happens: long chats dilute early instructions. The rule you gave on turn 3 is competing with 40 turns of everything else. (S33 is the fix)

> "AI follows your instructions 99% of the time." … "99% *of 50%* of the time."

> "The worst part isn't the 50%. It's that you never know which half you're in."

---

### S13 · Did you even read what I said?
`17:30 → 19:15 · 1:45` · cut B

**Point:** it looks like it followed the instruction, and it didn't.

- **[1]** "Don't touch the tests" → `it.skip` → all tests pass
- **[2]** "Only change the button colour" → 14 files, 600 lines
- **[3]** "No comments, please" → a comment saying it removed the comments
- Why it happens: it's aiming for "looks done". Green tests look done, so skipping them counts
- Remember the skipped tests: they come back on S36
- **Ask:** post your own in the chat; I'll read some at the end

> "Technically correct. The best kind of correct."

> "The colour *is* right, though."

---

### S14 · I asked for a circle
`19:15 → 21:00 · 1:45`

**Point:** AI is great at starting and bad at finishing. Fix one thing, break another.

- My real story: asked for a circle, got a rectangle
- **[1]** trapezium
- **[2]** "A. CIRCLE." → "Perfect! Here's your circle."
- **[3]** the 80% bar returns and jitters, while the clock runs on into days
- The last 20%: fine-tuning, small fixes at the end of a feature

> "A trapezium. I didn't know it knew that word."

> "Three minutes to build the feature. Forty-five minutes on one dropdown z-index."

> "The first 80% takes an hour. The last 20% takes the rest of the sprint."

---

### S15 · Enterprise-grade hello world
`21:00 → 22:15 · 1:15` · cut A

**Point:** sometimes it does exactly what you asked, and far, far more.

- "Add a dark mode toggle"
- **[1]** factory, registry, observer, stories, an architecture doc: +2,184 lines
- **[2]** what I needed: one line
- Why it happens: it writes the average of the code it learned from, and a lot of that is enterprise boilerplate. Keeping it simple is our job
- Not wrong, just overkill. And you still have to review all of it

---

### S16 · Make it better. Make no mistakes.
`22:15 → 23:45 · 1:30`

**Point:** the pivot. Look at *our* prompts.

- "So we fight back with better prompts…"
- **[1]–[5]** read each one louder: improve the UI · think step by step · make it perfect · MAKE NO MISTAKES · please
- **[6]** it's all in *my* input box
- **[7]** "The Bad is the AI." Stop there, then click straight on

> "Send that to a junior and they'd quit. Or come back with a rectangle."

---

## III · The Ugly

### S17 · Chapter card
`23:45 → 24:05 · 0:20`

- **[1]** "…is us."
- The Bad was the AI's limits. The Ugly is our side of the table: habits, process, budget

> "And I'm in every slide of this chapter."

---

### S18 · Doomscrolling…
`24:05 → 27:05 · 3:00`

**Point:** chat-driven development wastes our time and shreds our focus.

- Dots only: **stay silent for 3–4 s**. Let it be awkward
- **[1]** Thinking… Pondering… Brewing… Doomscrolling…
- Chat-based dev: prompt, wait, review, prompt again
- **[2]** an hour of it: watching it type like a proud parent, tab switching, Reels "for a second", cha break number four
- **Poll Q2:** what you do while it thinks
- Why the gap gets wasted: it'll be done "any second", so you never start anything real
- **[3]** the focus line: burst, nothing, burst. When it finishes, you've lost the mental model and re-read the diff to get it back
- Be fair: chat is fine for a small bug, a quick question, brainstorming

> "It isn't a time problem. It's an attention problem."

> "That's context rot. Yours."

> "Building a big feature this way is like writing a book by text message."

- If Reels wins the poll: "I said it was anonymous. I didn't say it wasn't funny."

---

### S19 · Proven. Thorough. Not cheap.
`27:05 → 29:05 · 2:00`

**Point:** these frameworks are proven and they work. Following them properly takes real tokens, time and discipline.

- Spec Kit, AI-DLC, BMAD, OpenSpec: well built, proven, and they deliver good results. Say it plainly, no jokes here
- **[1]** what you get: specs as contracts, settled decisions, phased work, review gates
- **[2]** what it takes: tokens, time, a learning curve, and following the process step by step
- They're general by design, built to fit any project, so you adapt to the process rather than the other way round
- Be fair: lighter paths exist (AI-DLC has express and bugfix profiles, and Spec Kit's extra gates are optional). It's still a full process to learn and follow
- **[3]** the closing line
- Great for big, fuzzy, multi-team work. The question is whether we can afford it on every ticket

> "These work. That's not the question."

> "The question is whether we can afford to follow them properly, on every ticket."

> "General by design. Worth it when the job is big enough."

---

### S20 · What we say vs. what we do
`29:05 → 30:35 · 1:30`

**Point:** what we claim we do with AI and what actually happens are different things.

- In the meeting: "We follow spec-driven development."
- **[1]** 6:47 PM: "fix it", Enter
- **Poll Q4:** "strictly" vs. "I *say* I do"
- No judgment; I'm on the right-hand side too. The joke is on us, not the frameworks
- Why the gap exists: following a framework properly takes time and budget we don't always have. Which brings us to the elephant

> "'I say I do.' The most honest answer of the day."

---

### S21 · The elephant in the room
`30:35 → 33:05 · 2:30`

**Point:** the AI budget quietly shapes how we work, and we cut corners.

- **[1]** Tokens. The advertised way of working assumes someone else is paying
- **[2]** we one-shot to save budget, skip the review pass, take the first approach, watch the meter more than the output
- **Poll Q6:** when the budget runs out
- **[3]** the Stark quote

> "Budget planned in taka. Tokens priced in dollars."

> "I'm limited by the technology of my time." → "…by the *token budget* of ours."

---

### S22 · Pick two
`33:05 → 34:35 · 1:30` · cut A

**Point:** methodology, budget and deadline all at once isn't realistic, and we should say so.

- Follow the methodology · stay within budget · deliver on time
- **[1]** the marker can't stay in the middle
- **[2]** the headline
- Pretending we can have all three is what creates the say/do gap
- Tease: the last chapter gets more out of the same budget

> "Pick two."

---

### S23 · Everything is purple now
`34:35 → 36:35 · 2:00`

**Point:** AI output is becoming generic and recognisable, and we feed it.

- **Ask:** raise a hand if you've seen this website
- **[1]** it's all the same website
- Code slop too: three date helpers, a new pattern every PR, architecture by mood
- Why it happens: no opinions in, average out. It has no taste, and it won't be the one maintaining it
- **[2]** Exhibit A: the first AI draft of this deck, with my red review notes
- **[3]** the principle

> "Give it no opinions, and it gives you the internet's average."

> "Nobody is above it. Including me."

> "AI should follow our principles, not define them."

> "Zero purple in the rest of this deck. Checked twice."

---

### S24 · Don't be a meat proxy
`36:35 → 39:05 · 2:30`

**Point:** a human who only forwards between client and AI adds nothing but latency.

- Client → you → AI → you → client. Copy, paste, repeat
- **[1]** the Human Clipboard · the Prompt Courier · the Certified Forwarder · the One-Tab Engineer
- **[2]** (pause) "Who is JSON?"
- **[3]** the client asks why it works like that → shrug: "The model said so."
- The serious part: you can't explain it, debug it, or answer the client
- **Poll Q7:** shipped code you didn't fully understand
- **[4]** the punchline

> "If the AI can do your whole job without your judgment, you're not an engineer. You're an expensive network proxy."

> "Your value-add shouldn't be latency."

- On Q7: "'I plead the fifth' counts as a yes."

---

## IV · Making It Good

### S25 · Chapter card
`39:05 → 39:20 · 0:15`

> "Enough pain. Let's make it good."

---

### S26 · Promoted to orchestrator
`39:20 → 41:50 · 2:30`

**Point:** our job moved from typing to thinking, and that's where our value lives now.

- Before: mostly code and debugging, a little thinking, and I loved it (the joy of a 2 a.m. bug fix)
- **Poll Q3:** do you miss writing code? **Ask** for a heart reaction from anyone who misses it too
- **[1]** now: understand and plan, review, a little code
- **[2]** Understand → Decide → Delegate → Verify → Own
- A proxy forwards. An orchestrator thinks before *and* after
- **[3]** the kicker

> "Promoted to orchestrator. No raise included."

> "Engineering isn't dead. Not yet."

> "Keep the old mindset and you're late to the party, and early to the layoff list." (a wake-up call, not a threat)

> "So the real question is: where do I fit now?"

---

### S27 · The ticket is the floor, not the ceiling
`41:50 → 43:20 · 1:30` · cut B

**Point:** use the time we got back to go beyond the ticket.

- Before: we shipped the ticket ("a list of wellbores"). There was no time for more
- **[1]** now: keyboard navigation, saved views, real states, accessibility
- **[2]** look over the fence: competitors, best practices, great products
- **[3]** the calendar from S06 returns

> "The ticket is the floor, not the ceiling."

> "That's what the time is for. A better use than Reels."

---

### S28 · Let's make it better
`43:20 → 45:50 · 2:30`

**Point:** AI lets us ship far more polish in the same time, if we bring the taste.

- Before AI: "It worked. It was fine." Don't mock it
- **[1]** the "With AI" version: gradient, icon clutter, rainbow pills, "Ask AI about your wells!". And at 1280 px the last column falls off the screen. (pause)
- **[2]** "…just kidding." The eraser
- **[3]** done right: sticky header, inline filters, density, focus ring, real loading and empty states
- **[4]** the line
- Bridge: "We did a data-grid overhaul like this. How? Not by chatting."

> "Same ticket. Same deadline."

> "Before: bounded by hours. Now: bounded by imagination." (and taste)

---

### S29 · Plan for hours. Let it run for hours.
`45:50 → 47:35 · 1:45`

**Point:** plan deeply in one focused block, then let the AI execute for hours.

- The spiky focus line from S18 returns
- **[1]** about 3 h of planning in deep focus → agents run for hours, up to a day → meanwhile I review, plan the next one, talk to the client
- Planning keeps all the context in my head. That's flow, and it's the part you can't delegate
- **[2]** plan well, then one-shot the plan (about 90% lands). It's still built step by step
- **[3]** small bug or quick question? Chat is fine

> "Plan it well, then one-shot the plan."

---

### S30 · One workflow per feature
`47:35 → 49:05 · 1:30`

**Point:** don't run every task through one process. Size the process to the task.

- Chatbot at one end, a full framework at the other
- **[1]** I've tried both ends. I live in the middle
- The middle borrows from the frameworks: specs as contracts, settled decisions, phased work, sized to one feature
- **[2]** small → chat · medium → a plan and one session · big (10–30 commits) → custom workflow and agents
- Same skeleton every time, customised per feature
- **Poll Q1:** how you work today

---

### S31 · How I actually work
`49:05 → 52:05 · 3:00`

**Point:** plan attended, execute unattended, review at checkpoints.

- **[1]** Attended: brainstorm alone first, including what NOT to do → the AI turns it into a plan and asks me questions until nothing is left → plan and workflow files
- **[2]** Kickoff → unattended: the orchestrator and agents go unit by unit and never ask
- **[3]** Checkpoints: I review in the browser, answer the review file, say "continue"
- **[4]** three rules, one per slide coming up
- For each of the next slides: what we do, how, and why it works
- Meta: this deck was made the same way, one session to plan it and another to build it

---

### S32 · Every question, answered up front
`52:05 → 54:35 · 2:30`

**Point:** every question is settled before execution, so execution never has to ask.

- The AI asks: grid or list? zero results? en and nb? which depth reference?
- **[1]** each answer is stamped into "settled decisions" and never asked again
- **[2]** the plan is a contract: global constraints · review focus · shared contracts · units (scope, files, deps, **verify commands**). Same idea the frameworks are built on, sized to one feature
- **[3]** the kickoff prompt
- Why it works: it decides, logs the reason, and keeps going. It runs while I'm away

> "Do not ask me anything; log decisions."

---

### S33 · The files are the memory
`54:35 → 56:50 · 2:15`

**Point:** state lives in files, not the chat, so any session can resume.

- One long chat rots: it forgets the plan, the conventions, the decision from turn 40, and asks again
- Callback: on S18 the context rot was ours. This one is the chat's (and it's the fix for S12)
- **[1]** the working folder: README protocol · plan · specs (the UI spec) · progress `[ ] [~] [x] [!]` with commit hashes and tokens · decisions log · living notes, read first · human-review questions
- **[2]** crash, context limit, next morning: a fresh session reads the folder and resumes

> "The files are the memory. Not the chat."

---

### S34 · Pay for judgment, not for typing
`56:50 → 58:35 · 1:45`

**Point:** the expensive model does judgment; cheap models do mechanics.

- **Opus judges:** plans, designs, orchestrates. Never writes product code
- **[1]** **Sonnet** builds and reviews
- **[2]** **Haiku** runs only what's fully scripted: browser checks, commits
- **[3]** the routing lives in the agent file (model, effort, maxTurns), so it can't drift mid-run

> "The most expensive model shouldn't be doing grep and git."

---

### S35 · One unit at a time
`58:35 → 61:05 · 2:30`

**Point:** a disciplined loop per unit: implement, verify, review, fix once, commit.

- Pick a unit → fresh implementer → the orchestrator re-runs verify itself
- Red → back to the **same** implementer (it keeps its context, up to 5 rounds)
- Green → one review (HIGH/MEDIUM only) → one fix round → Haiku commits with explicit paths, hooks run → log, notes, next
- One unit = one commit = cleanly revertable
- **[1]** the loop runs
- **[2]** the kicker

> "Perfectionism loops are where token budgets go to die."

---

### S36 · Never trust "it passes"
`61:05 → 63:35 · 2:30`

**Point:** green checks aren't proof. Verify for real, and enforce it at the commit.

- Lint, tsc, 4,900 unit tests, build: all green
- Callback: remember the skipped tests on S13? Green is a claim, not proof (drop this if S13 is cut)
- **[1]** at 1280 px: a clipped popover, misaligned columns, a double tooltip. Unit tests can't see any of it
- Callback: remember the rig? This is why we check
- **[2]** the orchestrator writes the script → Haiku runs it verbatim → Sonnet checks the numbers and never browses
- **[3]** the last gate: git hooks on every commit, and agents can't skip them
- If S37 is cut, add the rails here: explicit paths only, no `add -A`, no push, no force

> "Scripts over clicking. Cheapest model. Numbers you can check."

> "An agent without a definition of done will happily invent one."

---

### S37 · Learned the hard way
`63:35 → 65:05 · 1:30` · cut B

**Point:** every rule in the workflow comes from a real incident.

- An agent deleted untracked files. Mine. Gone → never delete what you didn't create
- **[1]** an implementer sat idle for 65 minutes, very politely → stop it, resume it, context intact
- **[2]** a check measured the wrong element (a shared class) → target `data-testid`
- **[3]** a 40 px tolerance passed two elements on different rows → a few px
- **[4]** the standing rails: explicit paths only, no `add -A`, no push, no force

> "Every rule has a story."

---

### S38 · The receipts
`65:05 → 66:05 · 1:00` · cut A

**Point:** it's affordable, and here are real numbers.

- 13 units on about 0.25M orchestrator tokens (data inventory, round 1)
- **[1]** 2 scripted browser checkpoints, about 165k tokens (data grid)
- **[2]** 10–30 commits per feature: data grid · data inventory ×2 · design-system migration
- The answer to the elephant: spend where judgment is needed
- If this slide is cut, say the first number on S35

---

### S39 · It re-reads everything. Every time.
`66:05 → 68:05 · 2:00`

**Point:** every message re-sends the whole conversation. Long, idle, sprawling sessions cost money and lose detail.

- Cheap tricks for tomorrow, workflow or not
- The model has no memory: message 50 carries messages 1 to 49
- **[1]** the cache expires: 5 min on an API key, about 1 h on a subscription. Walk away and the next message pays to re-read everything
- **[2]** left overnight, it gets compacted. Same chat, detail quietly lost
- **[3]** one task, one session · a hand-off note · `/clear` · let the files carry the context

> "One task, one session."

---

### S40 · Right model. Right effort. Right context.
`68:05 → 69:35 · 1:30`

**Point:** the everyday cost levers, plus specific prompts.

- **Model:** write your routing down once (Sonnet for most work · Opus for design, planning, hard bugs · Haiku for scripted, mechanical work)
- **[1]** **Effort:** low for simple, high for hard
- **[2]** **Context:** sub-agents with scoped briefs, and `permissions.deny` for files it shouldn't read. Myth-buster: `.claudeignore` does nothing in Claude Code
- **[3]** be specific: what, where, what good looks like, how we'll check. It's the antidote to "make no mistakes"

> "Not 'improve the UI'. Say what, where, and how you'll check it."

---

### S41 · Build it once. Share it with everyone.
`69:35 → 70:35 · 1:00` · cut B

**Point:** keep skills, plugins, commands, agents and workflows in one team repo.

- One team repo for Claude Code and Copilot: skills, plugins, commands, agents, workflows
- **[1]** the manual generator from S07 lives there too. Someone builds it once, everyone gets it
- **[2]** every team should have one: a one-time setup, then easier, more consistent, more fun
- **[3]** the offer: want a starting point? Ping me. (Confirm beforehand what can be shared)

---

## Finale

### S42 · Remember the wrong slide?
`70:35 → 72:35 · 2:00`

**Point:** the wrong slide was right all along, and its five steps flip into the five takeaways.

- Read the five steps deadpan: keep them waiting · "absolutely right", then do it anyway · drain their budgets · paint everything purple · turn them into meat proxies
- **[1]** "…only if we let it."
- **[2]–[6]** one takeaway per click. Say each one slowly

> "Turns out it wasn't the wrong slide."

> Plan more. Prompt less.
> Verify. Never trust "it passes".
> Pay for judgment, not for typing.
> Give it *your* principles.
> Own every line you ship.

---

### S43 · Questions? (Humans only.)
`72:35 → 80:00 · ~7:30`

- Thank you
- Warm up with one or two funny answers from poll Q8 or the chat
- The chat captain feeds you questions. Hard stop at 80:00

**If asked**

- **No budget for Opus?** Spend the best model on planning. Mid-tier models execute and review fine, and the cheapest one runs scripted steps. A good plan is what makes cheap execution reliable.
- **Isn't the workflow expensive?** 13 units on about 0.25M orchestrator tokens. The real waste in chat-driven work is re-reading, re-asking and perfectionism loops, and the workflow caps all three.
- **How do I start tomorrow?** Brainstorm before you prompt. Keep the plan in a file, not the chat. Use `/clear` between tasks and start fresh with a hand-off note.
- **Does it work with Copilot?** The principles transfer: plan files, scoped instructions, the right model per task, scripted checks. The tooling differs.
- **Should we use Spec Kit / BMAD / AI-DLC?** Yes, when the work is big enough to carry the process: big, fuzzy, multi-team features. They're proven. For everyday tickets, borrow their ideas: specs as contracts, settled decisions, phased work.
- **What about juniors?** A real risk. Use AI as a tutor, not an answer machine: ask it why, write some things by hand, review every line.
- **What if the plan is wrong mid-run?** The orchestrator makes the smallest sound change, updates the shared contracts and logs why. Big changes wait for the next checkpoint.
- **Is it safe to run agents unattended?** Only with hard rails: explicit paths, no push, no force, no `--no-verify`, never delete what it didn't create, deny rules for anything sensitive, and human checkpoints.

---

## Appendix A · Poll questions (S09)

Anonymous, 8 questions, about 2 minutes. Each question lists the slide where you read its result.

**Q1. How do you mostly work with AI coding agents?** → S30
- Chat back-and-forth until it works
- Plan first, then let it run
- A structured framework (Spec Kit, BMAD, AI-DLC, OpenSpec…)
- Mostly autocomplete
- I don't. I'm here for the memes.

**Q2. Your agent says "Thinking…". What are you doing?** → S18
- Watching it type, like a proud parent
- Working on something else
- Reels / Shorts / Facebook
- Cha break
- Starting a second agent to keep the first one company

**Q3. Do you miss writing code by hand?** → S26
- Yes, that was the fun part
- Sometimes
- No, never going back
- I still write most of my code

**Q4. Do you *strictly* follow an AI development framework?** → S20
- Yes, strictly
- Partly, when it's worth it
- I tried. I gave up.
- I *say* I do…
- What's BMAD?

**Q5. Your biggest frustration with AI agents?** → S11
- Ignores my instructions
- Fixes one thing, breaks another
- Overcomplicates simple things
- Burns through my budget
- All the waiting
- Confidently wrong

**Q6. When does your monthly AI budget usually run out?** → S21
- It never does
- Last week of the month
- Mid-month
- First week. Don't ask.
- I don't know my budget

**Q7. Have you ever shipped AI-written code you didn't fully understand?** → S24
- Never
- Once or twice
- Regularly
- I plead the fifth

**Q8 (optional, free text). Your best "I told it NOT to do that, and it did" moment.** → S43

---

## Appendix B · Before going live

- [ ] Two screens: the audience window on screen A; presenter view and poll results on screen B
- [ ] In Teams, share **the audience window only**, then check the presenter view isn't visible in the share
- [ ] Camera on. The wrong slide and the 99% reveal depend on your face
- [ ] Forms: "Record name" off, and "Anyone can respond" (or org-only with names off)
- [ ] Scan the QR **through a Teams share from a phone**. If it won't scan, make it bigger
- [ ] Poll link copied, ready to paste at S09. A **backup poll** (a second Form or a StrawPoll) is ready in case Forms misbehaves
- [ ] If your Forms has a Present mode, open it on screen B for live results; otherwise keep the Responses tab open
- [ ] Chat captain briefed: watches the chat and sends you the best replies privately
- [ ] Optional wrong-slide plant briefed: unmutes right after the S03 title
- [ ] Notifications off (Teams, Slack, OS). Phone face down. Water

---

## Appendix C · Facts behind the claims (checked 2026-11-02)

For when someone pushes back in Q&A.

- **Caching (Claude Code):** the main-conversation cache TTL is about 1 h on a subscription and 5 min on an API key; subagents default to 5 min. Cache writes cost more than base input (1.25× for 5 min, 2× for 1 h); cache reads cost about 0.1×. Long idle sessions can be compacted before the cache expires. Sources: code.claude.com/docs/en/prompt-caching · code.claude.com/docs/en/settings-reference
- **Ignore files:** Claude Code has no `.claudeignore`; use `permissions.deny` `Read(...)` rules in `settings.json` (code.claude.com/docs/en/permissions). Copilot's content exclusion isn't supported in agent mode or the CLI. Cursor's `.cursorignore` isn't a hard guarantee.
- **Effort and subagents:** effort levels are `low` · `medium` · `high` · `xhigh` · `max`, depending on the model. Subagent frontmatter supports `model`, `effort` and `maxTurns` (code.claude.com/docs/en/sub-agents).
- **Spec Kit:** core flow `constitution` → `specify` → `plan` → `tasks` → `implement` → `converge`; optional gates `clarify`, `checklist`, `analyze` (github.com/github/spec-kit).
- **AWS AI-DLC:** the original blog has 3 phases (Inception, Construction, Operations), with "bolts" instead of sprints. The awslabs repo lists "5 phases and 33 stages", with profiles such as express, feature, bugfix and enterprise (github.com/awslabs/aidlc-workflows).
- **BMAD Method:** planning runs Analysis → Planning → Solutioning, with skills such as brainstorming, product brief, PRD, UX and architecture. v6 is stable; a v7 alpha is in progress.
- **OpenSpec:** "fluid, not rigid", built around `propose` → `apply` → `archive`, with a change folder holding the proposal, specs, design and tasks.
