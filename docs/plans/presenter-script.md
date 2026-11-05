# Presenter Script: AI-Assisted Development: The Good, the Bad and the Ugly

> **Optional.** This is a full word-for-word script in my own voice, for rehearsing and for the days I want a safety net. The talk itself is delivered from the slides and [`presenter-notes.md`](./presenter-notes.md); I may not use this at all.
> What the audience sees is in [`slide-deck-plan.md`](./slide-deck-plan.md). Slide IDs (`S01`…`S43`) and click counts match the live deck.
> Length: about 6,478 spoken words, roughly 50 minutes at ~130 wpm, plus pauses. The Q&A fills the rest of the hour.

**Conventions**

- `[click]` advances one build (one press of `→`). The number of `[click]`s on a slide equals that slide's `totalBuilds` in the manifest.
- `(pause)` means stop talking for 2 seconds. On Teams, viewers see my screen 1–2 s late, so every reveal needs it.
- Anything else in parentheses is a stage direction, not spoken.
- Facts in the story (the budget, the usage, the salary joke) are spoken only. They never go on a slide. Only $25,000 does.
- The audience is never the villain. When something is bad, it's me.

## Run sheet

| Clock | Slide | Checkpoint |
| --- | --- | --- |
| 0:00 | S01 Title | Start on time; late joiners will catch up |
| 6:40 | S07 Poll | Paste the link in the chat **now** |
| 8:40 | S08 · The Bad | Past 10:40? Cut S11 |
| 15:20 | S14 · The Ugly | Past 17:20? Cut S13, S17 |
| 25:16 | S23 · Making It Count | Past 27:16? Cut S19, S25 |
| 31:16 | S29 · How We Work | Past 33:16? Cut S16, S34 |
| 43:56 | S38 · The $25,000 story | Must start by 45:56 |
| 50:41 | S43 Q&A | Hard stop at 60:00 |

Disable cut slides in the manifest before going live. Skipping builds on the fly looks messy.

---

## Opening

### S01 · AI-Assisted Development: The Good, the Bad and the Ugly  (0:30 · starts 0:00)

*Cue: Point: honest talk, real experience, no vendor pitch. Who I am, InformatiQ team. Say "I am in the ugly part too."*

Hi everyone, I'm Rokibul, from the InformatiQ team. While the last few people find the right Teams button, let me set expectations.

This is not a vendor pitch, and it's not an "AI will take our jobs" panic talk either. It's what our team has actually lived through, building real products with AI agents every single day. Some of it is good. Some of it is bad. And some of it is, well, ugly.

And I promise you this: when we get to the ugly part, the ugly part is me. So you're safe. Let's start with who we are.

---

### S02 · We build software for the North Sea.  (2:00 · starts 0:30)

*Cue: Pride, no jokes. [1] WellMate. [2] WellBook. [3] GeologiQ. [4] Offset Analyzer. [5] LogistiQ. [6] Event Analyzer. [7] AnalytiQ. [8] Portal. [9] All eight together.*

Before any AI talk, I want to show you what we build.

Our team is a bit isolated. We mostly work with the client, day in and day out, which means a lot of you have probably never seen these products. So think of the next two minutes as a little internal bragging. I think we've earned it. And I'll warn you now: there are no jokes on this slide. This one I mean. These products are what our team is proud of, and the people who use them are the reason we care about getting things right.

We build software for the North Sea.

[click] WellMate. Drilling telemetry. (Add the one sentence only you know.)

[click] WellBook. Well operations.

[click] GeologiQ. Subsurface models. (Pause here. Let people read the logo.)

[click] Offset Analyzer. Offset benchmarking.

[click] LogistiQ. Offshore logistics.

[click] Event Analyzer. Incident analysis.

[click] AnalytiQ. Our analytics engine.

[click] And Portal. The unified front door to all of it.

[click] Eight products. All built by this group of people, and I'm genuinely proud of every one of them. Look at them sitting together like that. WellMate to Portal, and everything in between. Each of them started as a conversation, a whiteboard, and a lot of coffee, and each one is now something people rely on. Please remember this slide, because every story I tell you today, the good, the bad and the ugly, happened while we were building these.

---

### S03 · Today's feature presentation.  (0:45 · starts 2:30)

*Cue: Point: where we are going. [1] The five chapters slide in. [2] How We Work lifts: "Most of our time goes here."*

So, the plan. Like any good Western, we start with the good, then the bad, then the ugly.

[click] And then, because complaining only gets you so far, two more chapters about what we do about it: Making It Count, and How We Work. The width of each piece is roughly how much time it gets. There's a quick poll after the good news, so keep your phones nearby.

[click] And this last one lifts for a reason. Most of our time goes here. This is the real reason I'm here. Everything before it is the setup, and honestly, a bit of therapy.

---

## I · The Good

### S04 · I · The Good (chapter card)  (0:10 · starts 3:15)

*Cue: Chapter card. A beat, then move on.*

Good news first. And there is a lot of it. I promise I'll get to the less cheerful bits, but I think we should start by being grateful for what we've got.

---

### S05 · We got our time back.  (1:30 · starts 3:25)

*Cue: Point: AI took the toil. [1] The week collapses to minutes. [2] "...so what are we doing with it?" Leave it hanging.*

Let's start with the obvious win. Time.

Look at a normal week. Monday, CRUD APIs. Tuesday, unit tests. Wednesday, migrations. Thursday, that one regex that nobody ever gets right the first time. Friday, API docs. Each of those used to be the kind of chore that quietly eats a whole day, and you'd spend that day feeling busy and not very proud.

[click] Now look at it. Fifteen minutes. Ten. Twelve. One minute for the regex, which, frankly, is a miracle I'm still not over. Five for the docs.

And it's not just the chores. It's also great at the thing nobody puts on a slide: dropping into a codebase or a library I've never seen, and giving me a guided tour, with file names and line numbers. The first draft of almost anything is now practically free. I want to be careful with the word free, because I'll come back to what free actually costs. But the toil, the part of the job that nobody ever wanted, is largely gone.

(pause)

[click] Which leaves one question. If the toil is gone, so what are we doing with that time? Hold on to that, because the rest of this talk is basically my answer.

---

### S06 · Our user manuals write themselves.  (1:45 · starts 4:55)

*Cue: Point: manuals generated, human reviewed. [1] Screenshots, pins, the page is written. [2] Reviewed. "We removed the toil, not the person."*

Here's one I'm really happy about. Our user manuals write themselves.

Everyone needs manuals. Nobody wants to write them. And the day after you finish one, the product changes and it's stale. We all know that cycle, and I've definitely been on the wrong side of it.

So we built a workflow. It captures the screens, annotates them, writes the text, and then a person reviews it. Four steps, that's the stepper on the left. And one more thing that makes it practical: it's incremental. It keeps a snapshot of the last state, so next time it only looks at what changed, and doesn't redo the whole manual.

[click] Here's the page it produced. Real screenshots from the product, numbered pins on the exact buttons, and the steps in plain language: pick the well, set the depth range, click Export.

[click] And then the last stage. Reviewed. A human reads it, fixes the wrong bits, and signs it off. That part is not optional. The AI writes the first draft, and a person owns the final one. It's a pattern you'll see again and again in this talk: the AI does the typing, and we keep the responsibility. If a manual says to click the wrong button, that's on us, not on the model.

We removed the toil. Not the person.

---

## Poll

### S07 · Be honest. It's anonymous.  (2:00 · starts 6:40)

*Cue: Paste the link in the chat now. Anonymous, 8 questions, 2 minutes. [1] Poll closed (QR turns into a check). Answers are read back later.*

Okay. Before I tell you everything that goes wrong, I'd like you to tell me what goes wrong for you.

Scan the QR code, or I'll paste the link in the chat right now. (Paste it.) It's eight quick questions, about two minutes, and none of them is a test. They're about habits and opinions.

It's anonymous. I mean it. Names are not recorded, and I literally cannot see who answered. Nothing here goes anywhere near anyone's performance review. I don't want to know who watches Reels while the agent is thinking. I just want to know how many of you.

(pause. Let them answer. While they do, keep talking lightly.)

I'll read some of the results back to you as we go, so answer honestly, and you're co-presenting the rest of this talk. If the answer is embarrassing, good. That's the right answer. There are no wrong answers here, only slightly funnier ones. If you're wondering whether anyone else picks the embarrassing option, I'll tell you: they do. The results will tell us.

(Read one or two early answers from the results screen. Wait until about two thirds have answered.)

[click] Okay, that's closed. Thank you. I'll keep those numbers open on my second screen, and I'll read the interesting ones back to you at the right moment. You'll know when. For now: let's get into the bad.

---

## II · The Bad

### S08 · II · The Bad (chapter card)  (0:10 · starts 8:40)

*Cue: Chapter card. A beat, then move on.*

Now the bad. In this chapter, the problem is the AI. Not us. Yet. These are the moments that make me want to throw the laptop out of the window, and then, because it's a company laptop, put it back down gently.

---

### S09 · The keynote vs. my terminal.  (1:30 · starts 8:50)

*Cue: Point: promises vs. my terminal. [1] Claims two and three. [2] My terminal, the request and the reply. [3] Delete, toast, then the late dialog.*

Let me show you the gap between how this is sold and what I see in my terminal.

On the left, the keynote. These are real, public claims, and I checked each of them against the original announcements, because I'd hate to be unfair. In March 2024, Cognition introduced Devin as "the first AI software engineer."

[click] In May 2025, OpenAI launched Codex, which "can work on many tasks in parallel." And that same month, Anthropic launched Claude Opus 4 as "the best coding model in the world." I'm not saying anyone is lying. These are genuinely impressive tools, and I use them every day. A launch page is just not day forty-seven of a real project.

[click] So here's my terminal. I ask for something simple: add a confirmation before deleting a well. And it comes back, very happy. "Done," with a green check. "Added a confirmation dialog."

[click] Let's try it. I click Delete. "Well deleted." Toast. Gone. And then, a moment later, the dialog politely asks: "Are you sure you want to delete this well?"

(pause)

The confirmation exists. It just comes after the deletion. Technically, I got exactly what I asked for.

---

### S10 · 99% of 70% of the time.  (1:00 · starts 10:20)

*Cue: Say 99% confidently, wait for nods. [1] The ring splits: "of 70% of the time." The worst part: you never know which part you are in.*

Here's a number I like to quote. It follows my instructions ninety-nine percent of the time.

(pause. Let them nod. Hold the big number.)

It sounds great, doesn't it? Ninety-nine percent. You'd ship that.

[click] Of seventy percent of the time.

That's the number that actually matters. And the worst part isn't the seventy, it's that I never know which part I'm in. The longer the chat, the more the rule I gave on turn three has to compete with forty turns of everything else, and early instructions get diluted. So it's very right, most of the time, and I can't tell when "most" ends. That uncertainty is the whole cost. If I knew which thirty percent was wrong, I'd just check those. Instead, I have to check all of it, with the same level of suspicion, every single time.

---

### S11 · Did you even read what I said?  (1:30 · starts 11:20 · cut B)

*Cue: Point: follows the instruction, adds the rest. [1] Date format, and the API got touched. [2] Blue Save button: tokens, types, JSDoc. [3] // removed all comments. [4] Closing line.*

This one is subtler. It doesn't ignore what I say. It follows my instruction, and then it keeps going.

[click] First scenario. "Fix the date format in the wells table. Don't touch the API." The table is fixed. Lovely. And in the diff, api/wells.ts has changed. Reason given: "also normalized dates in the API for consistency." Consistency. With the thing I told it not to touch.

[click] Second scenario. Look at the top: my project rule says "Keep comments minimal." Now I ask for something tiny: make the Save button blue. What I get is a brand new design token, a new ButtonVariant type, the Submit and Cancel buttons restyled, because why not, and a JSDoc block on every function it touched. The button is blue. It is very, very blue. And I'd like you to notice the pattern: nothing it did was stupid. Each decision, taken alone, is defensible. Together, it's a pull request I now have to read line by line, for a one-word request.

[click] So I say: "Remove the comments." And it does. All of them. And then it adds exactly one line: "removed all comments."

(pause)

[click] Technically correct. The best kind of correct.

---

### S12 · I asked for a circle.  (1:30 · starts 12:50)

*Cue: Point: metaphor for architecture. [1] Rectangle. [2] Trapezium. [3] Overshoot. [4] Never the bull. Spoken: sometimes sacrifice the whole session and start fresh.*

This one is a metaphor, so bear with me. I asked for a circle. Read that as: I asked for a simple architecture.

Anything that needs real design judgement, system design, trade-offs, architectural thinking, is where the AI struggles the most. It overshoots, or undershoots, or just builds something else.

[click] "Draw a circle." It thinks for a moment. "Perfect! Here's your circle." That's a rectangle.

[click] "That's a rectangle." "You're absolutely right, my apologies!" And here's... a trapezium. I didn't know it knew that word.

[click] "Just a circle." "You're right to push back." And we get a circle. With a lot of extra parts bolted on. Because it was right to push back, and also, it had ideas.

[click] Now look where all of them land. Around the bull. Never in it. And each correction lands further from the centre than the last one.

That's the part that hurts. Once it's on the wrong track, it's genuinely hard to bring it back. Every correction adds more noise to the context. So sometimes the best thing I can do is sacrifice the whole session: throw all that context away, and start a new one with a better first message. It feels wasteful. It's usually the fastest way out.

---

### S13 · Enterprise-grade dark mode.  (1:00 · starts 14:20 · cut A)

*Cue: Point: toggle in, architecture out. [1] The file explosion. [2] THEME_ARCHITECTURE.md, 40 pages. Cut tier A.*

And sometimes it does exactly what you asked, and then a lot more. "Add a dark mode toggle." Just a toggle. One component.

[click] And the files start to appear. A ThemeProvider. A ThemeContext. A useTheme hook. A ThemeRegistry. Tokens for dark, tokens for light. Storybook stories for the toggle. It's like watching a very enthusiastic new colleague on their first day.

(pause)

[click] But my favourite part is that it wrote documentation. THEME_ARCHITECTURE.md. Look at this table of contents. "Philosophy of Darkness." "Theme Lifecycle Hooks." "Migration Strategy." Page one of forty.

For a toggle. And me, I'm just standing here looking at it. It's not wrong. It's thorough! It's just a lot, and it's mine to review. A forty-page architecture document for a toggle. I'd love to say I read all forty pages. I did not.

---

## III · The Ugly

### S14 · III · The Ugly (chapter card)  (0:10 · starts 15:20)

*Cue: Pivot line: "The Bad is the AI. The Ugly... is us." I am in every slide of this chapter.*

The Bad is the AI. The Ugly... is us.

(pause)

I mean that. In this chapter, it's my habits, my process and my budget. Which means that I'm in every slide of it. You're safe. I'm the example.

---

### S15 · Doomscrolling…  (1:30 · starts 15:31)

*Cue: Silent 3-4 s on the bubble. [1] It becomes Doomscrolling. Poll Q2. [2] Context rot, mine. Chat is fine for small things.*

(Say nothing. Let the dots pulse for a few seconds. Count to four in your head.)

You know this one. You've sent a prompt. The dots are going. You are waiting.

[click] And while I wait, here's what I do. I watch it type, like a proud parent. Then I get bored. I open another tab, for a second. And then I'm doomscrolling.

Chat-based development is a loop. Prompt, wait, review, prompt again. Look at the focus line: a burst of attention, nothing, a burst, nothing. After an hour of that, I haven't had a single stretch of real thinking.

Quick poll result: (read Q2). So that's what we do while it thinks. No judgement. I've also looked at the feed.

[click] And the real cost isn't the lost minutes. It's the lost thread. When it finally finishes, I've forgotten the mental model, I re-read the diff to get it back, and the model has its own version of the same problem: a long chat full of stale turns. Context rot. Mine, and the model's.

Chat is fine for a quick question or a small bug. But building a big feature this way is like writing a book by text message.

---

### S16 · Proven. Thorough. Not cheap.  (1:00 · starts 17:01 · cut B)

*Cue: Point: respect the frameworks. [1] Tokens level the scale. [2] Time tips it. A balance, not a verdict.*

Now, frameworks. Spec Kit, AI-DLC, BMAD, OpenSpec. I want to be really clear that I respect every one of these. They're proven, they're thorough, and a lot of smart people thought hard about them. I'm not here to make fun of them.

But there is a cost side, and I think it's fair to say it out loud.

[click] First, tokens. Every phase, every document, every review round is something we pay for in tokens. That levels the scale. The frameworks had the advantage, and now they have a price.

[click] And then, time. The process takes time to run, and it takes time to carry. That tips it the other way. None of this makes the frameworks wrong. It makes it a balance, and for us, the balance depends on what we can afford.

---

### S17 · What we say vs. what we do.  (1:00 · starts 18:01 · cut A)

*Cue: Point: say vs. do, mine. Left: "We follow spec-driven development." [1] Right: the terminal, "fix it." Poll Q4. Cut tier A.*

And here's the gap I'm most guilty of. In the meeting, I say, with a straight face: "We follow spec-driven development."

[click] And then the meeting ends, I open my terminal, and I type: "fix it."

(pause)

Poll result: (read Q4). So I'm in good company.

I'm not saying this to shame anyone, least of all me. I'm saying it because that gap is where the budget goes, and it's where most of our quality problems come from too. What we say and what we do. The workflow in the second half of this talk is, in a way, my attempt to close that gap: not by pretending to follow a heavy process, but by building a lighter one that I will actually follow.

---

### S18 · The elephant in the room.  (1:30 · starts 19:01)

*Cue: Point: budget makes us cut corners. [1] Review and Docs cut. [2] Plan, Spec, Test, QA cut. [3] "One shot." Poll Q6. No numbers yet.*

There's an elephant in the room. Budget.

Look at this pipeline. Plan. Spec. Implement. Review. Test. Docs. QA. That's the proper way. And look at the meter above it. That's what it costs us to do it properly.

[click] First to go: review, and documentation. Snip. The lane closes the gap, and nobody mentions it.

[click] Then planning. The spec. The tests. QA. Snip, snip, snip. It's surprisingly easy to talk yourself into each one of these. "It's a small change." "The tests passed last time." "I'll document it later." Famous last words, every one.

[click] Until all that's left is the one stage we can't skip. Implement. One shot.

I'm not proud of that. We don't skip review because we don't care. We skip it because the meter is running and we are watching it. Poll result: (read Q6). That's the elephant. And it's part of the reason the last chapters of this talk exist. There's a story behind the budget. I'll get to it. For now, just notice that every corner we cut is a corner someone will have to turn later.

---

### S19 · The three-body problem.  (1:00 · starts 20:31 · cut A)

*Cue: Point: three corners, pick two. [1] The run starts. [2] The collapse. Real constraint, not a complaint. Cut tier A.*

And this is the squeeze. We're expected to follow the framework, stay within budget, and deliver on time.

[click] And here I am, trying to satisfy all three. The framework. The budget. On time. Whichever corner I reach, the other two start wobbling. Watch how this goes, lap after lap.

(pause. Let them watch the run.)

[click] And then, well. That's what happens in the middle.

I'm not complaining. It's a real constraint, and every company has its own version of it. We just need to be honest about it. Pick two. If you work in a company, you've felt that triangle. And the good news is that there's a lot more we can get out of the same budget. That's coming in the last chapters.

---

### S20 · Everything is purple now.  (1:15 · starts 21:31)

*Cue: Let the slop land. [1] Back to clean: "Everything is purple now." [2] "AI should follow our principles, not its defaults."*

(Let the purple sit for a second. Smile.)

Ask an AI to design a landing page and, sooner or later, this is what you get. A purple gradient. Glass cards. Sparkles, so many sparkles. "Revolutionize your workflow." Rainbow pills. An "AI-powered" badge on everything, and a floating "Ask AI" bubble in the corner, just in case you'd forgotten what it was.

It's the default taste of the model, and it's everywhere. You can spot it from across the room.

[click] And that is what we have to get away from. Everything is purple now.

[click] AI should follow our principles, not its defaults. Our design system, our conventions, our users. If we don't give it those, we're not designing anything. We're just accepting the first thing it hands us. Taste is a decision, and if I don't make it, the model makes it for me, and the model's taste is the average of everything it has ever seen. Which, it turns out, is purple.

---

### S21 · Make it better. Make no mistakes.  (1:00 · starts 22:46)

*Cue: Point: my lazy prompts. "make it better" [1] "Make it better. Make no mistakes." [2] "MAKE. NO. MISTAKES." Read each louder.*

And here's another one that's entirely on me. Look at this prompt: "make it better."

Not great. Not specific. Not even a full sentence. But when the answer isn't good enough, what do I do? I escalate.

[click] "Make it better. Make no mistakes." As if it was planning to make mistakes on purpose, until I asked it nicely not to.

[click] And when that doesn't work: "MAKE. NO. MISTAKES."

(pause)

The AI is not going to be perfect, and it won't be for quite a while. That's the Bad chapter, and I'm not letting it off the hook. But shouting at it is not a fix. The fix is how I ask. A clear prompt costs me a few more seconds, and saves the whole round of back and forth.

---

### S22 · Don't be a meat proxy.  (1:30 · starts 23:46)

*Cue: Point: do not be a pipe. [1] Forward client email to AI. [2] Paste AI answer to client. [3] Ask AI what the client meant. [4] "Who is JSON?" [5] The shrug: "The model said so." Poll Q7.*

Which brings me to the one I worry about most. Don't be a meat proxy.

On one side, the client. On the other, the AI. And in the middle, me. The pipe.

[click] Look at the commit log of a meat proxy. "Forward client email to AI."

[click] "Paste AI answer to client."

[click] "Ask AI what the client meant."

[click] And my personal favourite: "Who is JSON?"

(pause)

Poll result: (read Q7). So we've all been the pipe at least once. It's fine. This is a safe space.

[click] And when someone asks why: "The model said so."

(pause)

If I'm only passing messages along, I'm adding nothing a pipe couldn't. My job is judgement. Questions, context, a no when it's needed. If the client's request doesn't make sense, I should be the one who notices, not the one who forwards it with a nice greeting. And if the model's answer doesn't make sense, I should be able to say why, in my own words. That's what the next chapter is about.

---

## IV · Making It Count

### S23 · IV · Making It Count (chapter card)  (0:10 · starts 25:16)

*Cue: Chapter card. Mood shift: the ugly part is the one we can change.*

The good news about the ugly part is that it's the part we can fix. We can't make the model perfect. We can change what we do with it. So that's what the next chapter is about: making it count.

---

### S24 · The role shift.  (1:30 · starts 25:26)

*Cue: Point: the role has shifted. Before: coding was ~4 h. [1] Coding shrinks to AI. [2] Workhorse to decision maker. "No raise included." Poll Q3.*

So, what do we do with the time? First, we have to notice that the role itself changed.

Here's a myth: that engineers write code all day. We never did. On a good day, coding was about four hours. The rest was meetings, debugging, reviews, and thinking.

[click] Now the coding part is largely solved. It shrinks to a sliver, labelled "AI". And look at what grows into the freed time: planning, designing, evaluating, deciding.

Poll result: (read Q3). Which is fair. Some of us miss it. I miss it too, a bit.

[click] And here's the real shift. I used to be the engineer who implemented everything by hand. Now I'm more of a product owner, a project manager, a decision maker. Not the workhorse I used to be. The title changed, the responsibility changed, and as the sub-line says: no raise included. Less typing, more deciding. And honestly, deciding is the harder part, which is why it deserves our full attention.

---

### S25 · The ticket is the floor, not the ceiling.  (0:45 · starts 26:56 · cut B)

*Cue: Point: the ticket is the floor, not the ceiling. [1] The fence, the peek, what is beyond: "Look over the fence." Cut tier B.*

With that time back, the ticket becomes the floor, not the ceiling.

The ticket says what to build. It doesn't say what great looks like. If I only deliver the ticket, I've done the minimum, and I used to have no choice. Now there's time to look over the fence.

[click] Look at what the competitors do. Look at what the best products in the world do. Pick the best practices, and bring them into our own work. We just need the curiosity to look. It's a small shift in mindset, from "done" to "done well". And it's only possible because the AI gave us the time.

---

### S26 · Let's make it better.  (2:00 · starts 27:41)

*Cue: Point: thoughtful UX with the time back. [1] The slop version: "Beautiful, isn't it?" Reveal the joke. [2] Done right: calm grid, meaningful colour, popover.*

Here's one wellbore data grid, three ways.

The "before AI" version. Search. Sort icons on the headers. Plain borders, basic pagination. It was a respectable table. It worked, it did the job, and nobody complained.

[click] Now look at this one. A purple header. Glass rows. Icons on every column. Rainbow status pills. Sparkles. A floating "Ask AI" bubble. "Beautiful, isn't it?"

(pause. Let them squirm.)

I know. It's the purple from earlier. This is what happens when the tool decides.

[click] And this is what happens when we decide. Calm. A search, a few filter chips, a compact and comfortable toggle. A quick skeleton when it loads, so the page never feels empty. And colour only where it means something: a muted dot for status, and one highlighted value that's out of range. No decoration.

Then the small detail. This Remarks column holds long text, so it truncates neatly. Hover, and a popover opens with the full note, smoothly, without shouting.

This is the point. It's not about adding features because we suddenly can. It's about balance: the experience, the interface and the usability. With AI doing the heavy lifting, I finally have the time to deliver the version that wasn't affordable before. Thoughtful, not just more. That's what I'd like us to do with the time we got back. Nobody opens a table and says, "what a lot of features." They say it's easy to use, or they say nothing at all, and that silence is the best review you can get.

---

### S27 · Plan for hours. Let it run for hours.  (1:15 · starts 29:41)

*Cue: Point: plan for hours, execute for hours. [1] The line becomes "Plan · ~3 h"; agents run overnight. [2] Review, Next plan, Client: I am free while it runs.*

So how do we use the time? Remember this focus line from the doomscrolling slide? Prompt, wait, scroll, prompt. That's a normal day with chat. Lots of motion, not much thinking. It reads as chaos, because it is.

Now look at it as a day with two lanes: me, and the agents.

[click] I take one long block and I plan. Properly. About three hours. That is the entire reason it works. After the plan, the agents get a long execution band that starts where my plan ends, and keeps going past six in the evening. Overnight. Units tick off along the way.

[click] And look at my lane now. While it runs, I'm not watching it type. I review the previous work. I start the next plan. I talk to the client. I'm free while it runs.

Plan for hours. Let it run for hours. And that's the answer to the question I left hanging at the start.

---

### S28 · $25,000  (0:20 · starts 30:56)

*Cue: Hold on to that number. Do not explain. S38 pays it off.*

(pause. Let the number sit.)

Hold on to that number. I'll explain. Not yet. (Smile. Move on.)

---

## V · How We Work

### S29 · V · How We Work (chapter card)  (0:10 · starts 31:16)

*Cue: Chapter card. This is the centrepiece: how we actually work.*

Everything so far was the setup. Now, how we actually work. This is the part of the talk that I'd like you to take back to your own teams.

---

### S30 · How we work now.  (1:30 · starts 31:26)

*Cue: Point: a workflow per complex feature. [1] Gather and Plan: with me. [2] Orchestrate and Remember: without me. [3] The loop: next feature. Poll Q1.*

So here's how we work now. Not in theory. This is what we actually do.

We use this workflow when a feature is complex: it touches a lot of areas, or it's a whole new module, or it's a bunch of smaller features that I've bundled together so I can plan them all at once and then build them together. And the workflow isn't some general template we squeeze the feature into. We design it around the feature.

Poll result for how you work: (read Q1). That's the baseline we're comparing against.

Four stations. [click] Gather, and Plan. That's the part where I'm in the room. Zone one: with me.

[click] Then Orchestrate, and Remember. That's the part where the agents do the work, and I'm not in the room. Without me.

[click] And then a loop back to the start, because there's always a next feature.

It might not always be the absolute cheapest way of working. But it strikes a good balance between quality, complexity and token usage, and we got there by experimenting, and by making some expensive mistakes, which is a story for later. The next few slides walk through each station.

---

### S31 · The requirement is just the start.  (1:45 · starts 32:56)

*Cue: Point: the requirement is just the start. [1] Four sources. [2] Be the user: who, first, next. [3] Everything flows into the Brief.*

Station one: gather. A client sends us a requirement. Here it is. "Wellbore search." And that's not where we stop. That's where we start.

[click] As the engineer, I go and gather the rest. Have we solved this in another project? How did the big players solve it? Is there that one blog post that nails it? What assets do we already have that we could reuse?

[click] Then I do the thing I think matters most. I become the user. Who uses this? What would I look for first? What comes next? And, the honest one: if I were the user, would I be happy with this requirement? Because sometimes the answer is no, and it's much cheaper to find that out now than in week three.

[click] And then I compose everything into one brief. The requirement, the sources, and my thoughts as a user, all in one place. This is where ownership and expertise show, because nobody else has this mix of context. And the AI is going to need every word of it. A thin requirement gives you a thin result, no matter how clever the model is. A rich brief is the cheapest quality improvement we have.

---

### S32 · Plan with a co-worker.  (1:45 · starts 34:41)

*Cue: Point: plan with a co-worker. [1] The questions attack the brief. [2] My answers, each pair stamped in. [3] The plan becomes unit cards: six bands each.*

Station two: plan. I give the agent the brief, and how I'd personally implement it. Then we work like co-workers.

[click] Only this co-worker is relentless. It attacks the plan from every angle. What happens with zero results? What about offline? Which users do we serve first? How do we verify this? What about mobile? It prompts me with every decision it can foresee, ahead of time, before a single line of code exists.

[click] And I answer. Because I hold the context and the requirements, and it doesn't. Each answer stamps into the plan. Some decisions are easy, some are real trade-offs, and I'm glad to be asked now rather than in week three.

[click] The output is a plan, unit by unit. And a unit isn't just "what to do next". Open one and you see: the rules, a short version of the context, the task, the tests, the verification, and the rules for the agent doing the work. Everything an agent needs, on one card.

That card matters, because the agent that gets it won't have anything else. There's no chat history to fall back on. If it isn't on the card, it doesn't exist. So planning is where we spend our best thinking, and our most capable model.

---

### S33 · One manager. Many fresh minds.  (2:00 · starts 36:26)

*Cue: Point: one manager, many fresh minds. [1] Explore once, build the pack. [2] Deal specific cards to fresh agents. [3] Explore every time vs. once.*

Station three: orchestrate. The main session doesn't do the work. It's a project manager. It delegates, and it checks that the others actually did what they were asked.

[click] First, we explore the codebase once. Conventions, design rules, the domain, how we test. One scan, and it produces a pack of context cards.

[click] Then the orchestrator deals the cards. The designer gets the design rules and the domain. The implementer gets conventions and the domain. The reviewer gets conventions and tests. The tester gets tests. And each of them is a fresh agent. Clean head, short agenda. Nobody has to re-explore the whole codebase just to learn how we name things.

[click] And look at what that does to the cost. If every agent explores on its own, that's four scans and a tall bar. If we explore once and hand it out, it's one scan and a short bar. We aren't only saving tokens. The agents also don't pollute their own context with things they don't need, so each one stays sharp, with a small and clear agenda.

Fresh agents, and a very small bill. Notice what the manager is not doing: it isn't writing code, and it isn't exploring the whole codebase over and over. Its job is to know who needs what, and to check the result. It's the same lesson as the three-body problem, just solved the other way: we get framework, budget and quality closer together by being deliberate about who knows what.

---

### S34 · Right model. Right effort.  (1:15 · starts 38:26 · cut B)

*Cue: Point: right model, right effort. Opus plans and reviews. [1] Sonnet implements. [2] Haiku: scripts, commits, clean-up. [3] Effort sliders. Cut tier B.*

Within orchestration, we also pick the right model and the right effort for the job. Think of a mixing desk.

The most capable model, Opus, does the thinking: planning, deciding, designing, and reviewing. The jobs where judgement matters most.

[click] A mid-tier model, Sonnet, implements and writes the unit tests.

[click] And the smallest model, Haiku, gets the chores: running Playwright scripts, committing the working directory in sensible batches with proper messages, cleaning up comments and debris. Here's the trick: it only gets instructions that can't be misread. It isn't asked to think. It's asked to follow.

[click] And each of those channels has an effort slider, which we set by how complex the feature is. A complex feature pushes Sonnet's slider up. A trivial chore leaves everything low. The right model, with the right effort. You wouldn't ask your most senior engineer to rename files, and you wouldn't ask an intern to design the architecture. Same idea.

---

### S35 · Built for this feature. Then retired.  (1:15 · starts 39:41)

*Cue: Point: specialists for one feature. Before: one general agent, ever-growing instructions. [1] Specialists from the template. [2] Shipped, retired.*

Here's something we learned. We used to use general-purpose agents: a code reviewer, a UI designer, a backend expert. And over time, their instructions got longer and longer, because we kept trying to make one agent good at everything. The result? Mediocre. It never really shone.

[click] Now we do it differently. For one complex feature, we generate specialists, from a template in our own workflow repo. A grid designer. A grid implementer. A grid reviewer. Short instructions, one job, and sharper results. It's also cheaper, because each one carries less.

The workflow repo matters here too. It holds how we design these agents, so we don't spend a pile of tokens inventing them from scratch every time.

[click] And when the feature ships, we retire them. The agents fade away. The template stays, ready for the next one. They were made for one feature, and they leave when the feature does. No leftovers, no stale instructions.

---

### S36 · The files are the memory.  (1:45 · starts 40:56)

*Cue: Point: the files are the memory. [1] Session runs, laptop dies. [2] New session resumes at unit 7. [3] The four files: progress, decisions, notes, review-log.*

Station four: remember. And the rule is: the chat is not the memory. The files are.

[click] Here's a session, running. Units ticking off, one by one. And then my laptop dies. It happens. Or the session crashes. Or I close the lid at the wrong moment.

[click] A new session starts. It reads one file, progress.md, and resumes at unit seven, exactly where the last one stopped. We never rely on the agent's own memory, or on the harness's to-do list. The file is the truth.

[click] And there are three other files. Decisions: because the implementation is autonomous, agents will hit calls we never planned. They log every one, and I read them later and fix the ones I disagree with. Notes: what one agent discovers, the next fresh agent reads, like a convention we never mentioned. About ninety percent of it is disposable after the feature, which is how it stays out of our permanent project memory. And the review log: a reviewer always finds something, even in perfect code, it's the nature of these models. So the non-severe findings get parked there for a quick human look.

Four files. That's the whole memory. If my laptop dies, my progress doesn't. If the session dies, nothing is lost. And that's a really comforting feeling when a run is going to take hours.

---

### S37 · Code is the new context.  (1:15 · starts 42:41)

*Cue: Point: code is the new context. Docs drift out of sync. [1] The stack collapses to three. [2] All four stations done: "Better code. Fewer docs."*

One more thing that has changed, and it's a bit counter-intuitive. We save fewer of the markdown files we generate.

Here's a stack of docs next to the code they describe. See the red marks? The comments say twenty results. The code says fifty. The docs have drifted. Documentation that mirrors code always drifts, and every drift is debt.

[click] So most of it dissolves. What's left: product context, the business side. Decision records. And a small memory bank, only for things that go against convention or are specific to our domain. And the code becomes the centre.

Newer models are really good at reading a well-designed codebase. So writing better code with less context as text gives a better result, and a code base that any model can understand.

[click] Better code. Fewer docs. That's the fourth station done, and the whole map is lit. Which leaves the question I promised you, earlier. The number.

---

## Epilogue · The $25,000 lesson

### S38 · It's unlimited.  (1:30 · starts 43:56)

*Cue: Remember this number? [1] "It's unlimited." Copilot pricing change, AWS Bedrock, Halliburton. [2] All in: client prototype to production in one month.*

(pause)

Remember this number?

[click] About two or three months ago, our company gave us an enterprise Claude Code subscription, through AWS Bedrock. Before that, we were mostly on GitHub Copilot, and we were happy with it. But Copilot changed to a more usage-based pricing model, and it was getting expensive. Around the same time, our client was acquired by Halliburton, a US company, and we were introduced to Claude Code through their enterprise subscription.

And the message was: you aren't using enough AI. It's an unlimited plan, make the most of it. Just use it for work.

(pause)

Unlimited. And I did what any nerd like me would do.

[click] I went all in.

I had just been handed a new project. The client had built a prototype, vibe-coded, by someone who isn't technical. I thought: this is a perfect chance to see what this thing can really do. So I used agents. I brainstormed. I reviewed repeatedly, refactored, simplified. And I tried to follow Anthropic's recommended ways of working, almost as if I worked there. Within a single month, that prototype was a production-ready application. And I'm genuinely proud of it: the code quality, the UX, the product.

Things were going great.

---

### S39 · Access revoked.  (1:15 · starts 45:26)

*Cue: Access denied; the missed email. [1] Top 10 users: me, $25,000. [2] Gauge: soft $1,100, actual ~$3,000, salary joke. Spoken only.*

And then, one morning: access denied.

Apparently, I'd had a warning email about my usage, and somehow I'd missed it. That's the little unread badge in the corner.

[click] The next morning, I found out I was among the top ten highest-spending users. And in that list, one of the rows is me. Twenty-five thousand dollars, in API-equivalent usage.

(pause)

Two months earlier, the message was: use more AI. Now it was: you're probably using too much. We need to put some limits in place.

[click] Which brings us to the new reality. Each of us now has a soft monthly limit of about eleven hundred dollars. It's not a hard cap. We can still consume around three thousand dollars' worth a month. But trust me, three thousand dollars' worth of tokens isn't as much as it sounds, when you have multiple agents and large context windows.

We do joke that we sometimes spend more on AI tokens than we earn in salary. It's funny. It's also a little bit true.

So that's when I started looking seriously at token consumption, at caching, and at how to optimise without hurting the quality. As a team we experimented, and we ended up with the workflow you just saw. Two lessons along the way were learned the hard way.

---

### S40 · Five minutes.  (1:30 · starts 46:41)

*Cue: Lesson 1. Enterprise setup (AWS Bedrock) = 5-minute cache TTL. [1] Coffee break: ring runs out, whole context reprocessed. [2] Ping every 4:50 keeps it warm.*

Lesson one: prompt caching is more important than you think.

Claude Code, Codex, Copilot, they all cache, so they don't have to reprocess the same context again and again. But the cache policy depends on your plan and your provider. Individual Claude plans have a longer default lifetime. Our enterprise setup, through AWS Bedrock, has a five-minute TTL.

Picture a long session, a hundred thousand tokens of context, cached, ring full.

[click] Now I take a coffee break. The ring runs out. I come back and I send one tiny message. "Ok, continue." And the whole context has to be processed and cached all over again. A potentially huge amount of input tokens, just because the cache went stale. And a cache read is significantly cheaper than a cache write.

[click] So, in our workflow, the main session sends a lightweight request every four minutes and fifty seconds, to keep the cache warm. That's especially useful when sub-agents are busy for several minutes and the main session would otherwise go cold. It's a hacky solution. But given a five-minute TTL, it's become a genuinely useful part of our workflow.

---

### S41 · Start fresh.  (1:15 · starts 48:11)

*Cue: Lesson 2. [1] Compaction, twice: details fall out. [2] Handoff doc into a fresh session. Closer, spoken: "That's why the workflow looks the way it does."*

Lesson two: stop reusing old sessions. Start fresh.

Here's yesterday's session. Long. Hours of work, half the context window used. I leave it idle, and come back the next day expecting everything to be exactly as I left it.

[click] It isn't. If you read the Claude Code documentation, you'll see it can compact the conversation. And instead of the full history, it may continue from a compacted version of it. The details of compaction are internal to the provider. I don't know what's kept, what's summarised, what's dropped. And repeated compaction can quietly lose a decision, or an edge case, or a convention. So I assume the agent remembers everything, but its working context is different from what I expect. And sometimes, it just gets worse.

[click] So now I do this. Before I leave, I ask the agent to write a handoff document. The decisions, the current status, the relevant files, what's left. And then I start a fresh session, and I give it that. A clean, small start, without relying on a squeezed history.

(pause)

And if you've been paying attention, you've noticed something. Fresh agents with short context. Files as memory. Keep the cache warm. Handoffs instead of old sessions. That's why the workflow looks the way it does.

---

## Close

### S42 · Build it once. Share it with everyone.  (1:15 · starts 49:26)

*Cue: Point: build it once, share it. Agents, skills, plugins, workflows, versioned. [1] Out to the projects. [2] Company-wide hubs: "Reusable AI engineering."*

One last thing, and it's about the team. Everything I showed you, the specialists, the skills, the workflow, doesn't live on my laptop. We build it, we version it, and we keep it in one place. Agents. Skills. Plugins. Workflows. A repo, with versions.

[click] And from there, they go out to every project. We build it once, and we share it with everyone. So nobody re-invents the same code reviewer in every project, and the improvement one person makes reaches everyone else.

[click] And zoom out a bit more. Our hub is one of many. Brain Station 23 could do exactly this, company-wide, so that we aren't each duplicating our AI engineering over and over. Imagine every project starting with the best version of a reviewer, a designer, a workflow, already tuned, instead of a blank file.

In this era, writing reusable code isn't enough. We need to think about reusable AI engineering.

---

### S43 · Questions?  (9:00 · starts 50:41)

*Cue: Thank you. Humans only. Closing line: "Session ended. Cache kept warm for 4:50." Read one or two Q8 answers to warm up the Q&A.*

That's it from me. Thank you.

If you remember one thing: the Good is real, the Bad is the AI, and the Ugly is us, which means we can fix it. Plan first. Give the agents fresh, small contexts. Keep the files as the memory. And mind the meter.

Now, questions. Humans only, please.

(Read one or two answers to the free-text poll question to warm the room up. And since the session has ended, the cache is being kept warm for 4:50.)

---
