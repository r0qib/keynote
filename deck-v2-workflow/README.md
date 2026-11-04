# Deck v2 Workflow: autonomous rebuild of the slide deck

> **Kickoff prompt.** Start a new Claude Code session on **Opus** in this repo, then paste:
>
> *"Run the deck v2 build. Read `deck-v2-workflow/README.md` and follow its session protocol autonomously, from the first pending batch to the end. Do not ask me anything; log decisions in `deck-v2-workflow/decisions.md`."*

This folder is the workflow's brain. It follows the team's own custom-workflow method (`docs/context/AGENTIC-WORKFLOWS.md`), sized down for a slide deck:

- **Planning is done.** Every question was settled with the presenter, and the answers are in the plan and in `decisions.md § Settled in planning`.
- **Execution is unattended.** It never asks. It decides, logs, and keeps going.
- **The files are the memory.** Any new session resumes from `progress.md`.

---

## 1. Sources of truth (read in this order, and only what you need)

| File | What it is | Who reads it |
| --- | --- | --- |
| `docs/plans/slide-deck-plan.md` | **The spec.** §3 copy rules, §4 design system, §5 manifest and file mapping, §6 one section per slide | Builders read §3, §4 and their own slides' sections only. The reviewer reads the same |
| `deck-v2-workflow/progress.md` | Batch list with status `[ ] [~] [x] [!]`, scope and verify list | Orchestrator |
| `deck-v2-workflow/important-notes.md` | Codebase index and living memory. Every agent reads it first | All agents; the orchestrator curates it |
| `deck-v2-workflow/decisions.md` | Planning decisions plus one line per execution-time decision | Orchestrator writes; builders read the "Settled" part |
| `deck-v2-workflow/review-log.md` | Non-blocking review findings parked for the human | Orchestrator writes |
| `deck-v2-workflow/missing-pieces.md` | Assets, facts and URLs we don't have, with the placeholder used | Anyone appends |
| `deck-v2-workflow/human-review.md` | The morning report for the presenter | Orchestrator writes at the end |
| `drafts/slide_feedback/slide-feedback.md` and `feedback_images/` | The presenter's raw feedback. **Read-only.** Context for the "why", if the plan is ambiguous | Builders, only when needed |

**Never edit (raw inputs and history):**
- `drafts/**`
- `docs/context/**`
- `docs/notes/**`
- `slide-deck-workflow/**` (the v1 workflow)
- the git branch `snapshot/pre-deck-v2`

`docs/plans/slide-deck-plan.md` is only edited in batch D1, and only to sync build counts and timings with what was built.

---

## 2. Roles: model, effort, job

The **orchestrator** is the Opus session the presenter starts. It reads this folder, dispatches agents, keeps the tracking files, and commits through the committer.
- **It never writes slide code** and never reads whole source files or screenshots.
- It reads agent reports, `git diff --stat`, and the **verbatim** build/snap output the Haiku snap-runner returns. It judges that raw output itself, rather than trusting anyone's "it passes".

| Agent (`.claude/agents/`) | Model · effort | Does | Never |
| --- | --- | --- | --- |
| `deck-builder` | Opus · high | Builds one batch: slide components, shared components, manifest entries. Runs build and snap and fixes every text flag. **Doesn't look at screenshots** (except one PNG when a flag is unclear) | Commit, edit files outside its brief, delete files it didn't create (except the moves and deletions the brief names) |
| `deck-snap-runner` | Haiku | Runs the exact build and snap commands it is given, and returns the output **verbatim**, plus the list of contact sheets | Interpret, fix, or look at images |
| `deck-reviewer` | Sonnet · medium | One pass over the batch: the spec sections, the diff, and the **contact sheets** (full-size PNGs only for builds that look wrong). This is the visual screenshot check. Reports **HIGH/MEDIUM only**, plus a short list of LOW findings for the log | Edit files |
| `deck-browser-tester` | Sonnet · low | Batch T1: runs the full-deck browser session `tools/e2e-deck.js` through the Playwright MCP (fallback: `node tools/e2e.mjs`). Returns the raw JSON | Improvise extra testing, fix, edit |
| `deck-writer` | Sonnet · high | Batch D1: presenter notes, presenter script, the manifest `notes` field | Edit slide code |
| `deck-design-director` | Opus · high | Batch Z1: a deck-wide visual review of the **final-build contact sheets** (~5 images), for consistency and polish | Edit files |
| `deck-committer` | Haiku | `git add -- <explicit paths>`, then one commit with the given message. Reports the hash, or the hook output | Push, amend, force, `--no-verify`, `add -A` / `add .` |

**Routing rule: pay for judgement, not for typing.**
- Opus designs.
- Sonnet does the screenshot checking, reviewing, browser testing and writing.
- Haiku runs commands and commits from exact instructions.

**Screenshots are expensive context.** `snap` writes 3×3 labelled **contact sheets** (`contact-NN.png`, one image instead of nine), and reviewers read those first.

---

## 3. Session protocol

**Start of every session:**
1. Read this README, `progress.md`, the last ~30 lines of `decisions.md`, and `important-notes.md`.
2. Run `git status --short` and `git log --oneline -5`.
   - A dirty tree that matches a `[~]` batch: **resume that batch**. Re-dispatch its builder with a brief that says "files already partially changed; inspect `git status` for your paths and finish".
   - Changes that belong to no batch: **leave them alone** and note them in `decisions.md`.
3. Clear stale signals: `rm -f deck-v2-workflow/.signals/*`.
4. Append a session header to `progress.md § Session log`: date, HEAD hash, the batch you're starting.
5. No dev server needed: `tools/snap.mjs` and `tools/e2e.mjs` start and stop their own on port 5199. A full-deck snap takes ~5–6 min, so the snap-runner's Bash call needs a 600000 ms timeout (batch snaps take under a minute).

**The batch loop.** Work through batches in `progress.md` order:

```
pick next [ ] batch → mark [~]
   │
   ▼
deck-builder (fresh, Opus, background) ──signal──▶ deck-snap-runner (Haiku) runs, returns output VERBATIM:
   │                                                 npm run build 2>&1 | tail -15
   │                                                 npm run snap -- --slides <ids> --out .snaps/<batch> 2>&1 | tail -40
   │                                   orchestrator reads the raw output:
   │                                   red (build fails / CRASH / console / NAV / letterbox)
   │                                     → SendMessage the failing tail to the SAME builder (≤ 3 rounds)
   ▼ green
deck-reviewer (fresh, Sonnet, background) ──▶ HIGH/MEDIUM findings
   │                                             → ONE fix round via SendMessage to the SAME builder → snap-runner re-verifies (no re-review)
   │                                           LOW findings → review-log.md
   ▼
deck-committer (Haiku) with the explicit path list → hash
   │
   ▼
progress [x] + hash · log decisions · curate important-notes.md · next batch
```

- **One builder at a time.** Batches share the manifest, `App.jsx` and shared components, so parallel edits collide.
- **One commit per batch**, on `main`, so any batch can be reverted cleanly.
- **Fix rounds reuse the same agent** via `SendMessage`, keeping its context.
- **Verification has two gates.**
  - **Must pass:** `npm run build` and snap with no CRASH, no console errors, no NAV, no letterbox.
  - **Must be fixed or justified:** small-text, clipped, off-stage and overlap findings. Either fix them, or explain them in the builder report. Intentional cases (e.g. S20 sparkles overlapping, a mock UI) should carry `data-overlap-ok` / `data-mock` instead.
- **End a session only between batches**, never in the middle of one. Record `next:` in `progress.md`.

**Keep the prompt cache warm (the 4:50 rule).** The cache TTL is 5 minutes, and an idle orchestrator pays for a full re-cache. So:
- Dispatch every agent **in the background** (set `run_in_background: true` if the Agent tool offers it).
- Then loop on the cheap waiter until it prints `done:`. Each `timeout` is one cheap turn that keeps the cache alive.
  ```sh
  sh deck-v2-workflow/tools/wait.sh <signal-id> 270
  ```
- Every agent's **last action** is to write its report to `deck-v2-workflow/.signals/<signal-id>.done` and return the same text.
  - Signal ids are `<batch>-<role>`, e.g. `B3-build`, `B3-snap`, `B3-review`. A re-run of the snap-runner gets `-2`, `-3`, … (e.g. `B3-snap-2`).
  - Fix-round reports start with `"<batch> fix round <n>"`. Check that prefix, so you don't consume a stale signal.
- After ~15 timeouts in a row (~70 min) with no signal, treat the agent as stalled (see the failure table).

---

## 4. Brief templates

Paste and fill these as the agent prompt. Keep briefs short: they list *exactly* what to read, in order, and say "do not explore".

### Builder brief

```
You are deck-builder for batch <BATCH>: <title>.
Read, in order, and nothing else unless blocked:
1. deck-v2-workflow/important-notes.md
2. docs/plans/slide-deck-plan.md §3, §4, and the §6 sections for: <slide ids>
3. deck-v2-workflow/decisions.md § Settled in planning
4. The legacy sources named in plan §5 for your slides (src/slides/legacy/…)
5. <extra files for this batch, from progress.md>
Scope: <files you may create/edit, from progress.md>. Nothing else.
Do: implement the slides exactly per spec, set each slide's manifest totalBuilds/canvas,
use the shared components in src/components/deck/, design px only, no responsive classes.
Verify yourself before reporting:
  npm run build 2>&1 | tail -15
  npm run snap -- --slides <ids> --out .snaps/<BATCH> --contact none 2>&1 | tail -40
  Fix every flag (small-text, clipped, off-stage, overlap) or justify it. Don't Read screenshots —
  the Sonnet reviewer does the visual check. Exception: one PNG if a flag is unclear.
Log any judgement call as one line to append in your report under "Decisions:"; missing assets/facts under "Missing:".
Last action: write your report (≤ 25 lines: files changed, builds per slide, snap summary,
Decisions:, Missing:, Open issues:) to deck-v2-workflow/.signals/<BATCH>-build.done, then return the same text.
```

### Reviewer brief

```
You are deck-reviewer for batch <BATCH>. Do not edit anything.
Read: deck-v2-workflow/important-notes.md · plan §3, §4 and §6 for <slide ids> · `git diff HEAD -- <paths>`
(new files: read them) · the contact sheets .snaps/<BATCH>/contact-*.png (you can see images; each tile is
labelled slide · build). Open a full-size PNG only for a build that looks wrong on the sheet (≤ 4 PNGs).
Check, in priority order:
1. Spec fidelity: each build shows what §6 says, on-screen copy matches, builds count matches manifest.
2. Copy rules §3: no explanatory/meta text, no audience-blaming "you/your", word budget, no emoji, no purple outside S20/S26.
3. Design §4: type scale & hierarchy, full-bleed, space well used, no clipping/overlap/truncation, Teams-safe strokes/contrast.
4. Motion: one designed moment per slide, appleEase/springs, ambient loops only where allowed, imports exist.
5. Code: shared components reused, no dead code, short comments only, no historical comments.
Report HIGH and MEDIUM findings only, each with slide+build, what's wrong, and the concrete fix.
Add up to 5 LOW findings under "LOW (for the log)". ≤ 30 lines.
Last action: write the report to deck-v2-workflow/.signals/<BATCH>-review.done, then return the same text.
```

### Snap-runner brief

```
You are deck-snap-runner. Run exactly these commands (Bash timeout 600000), nothing else:
npm run build 2>&1 | tail -15
npm run snap -- <ARGS> 2>&1 | tail -40
ls <OUT>/contact-*.png
Report the output of each command VERBATIM, under a heading with the command. No interpretation.
Last action: write the report to deck-v2-workflow/.signals/<SIGNAL>.done, then return the same text.
```

`<ARGS>` is e.g. `--slides S09,S10,S11 --out .snaps/B3`. For Z1 it's `--out .snaps/final --contact final`.

### Browser-tester brief (T1)

```
You are deck-browser-tester. Steps, exactly:
1. Start the dev server in the background: `npx vite --port 5199 --strictPort > /tmp/deck-vite.log 2>&1 &`,
   then wait until `curl -s -o /dev/null -w "%{http_code}" http://localhost:5199` prints 200 (≤ 30 s).
2. Call mcp__plugin_playwright_playwright__browser_run_code_unsafe with filename
   "deck-v2-workflow/tools/e2e-deck.js" (do not paste or modify the code). Then call browser_close.
3. If the MCP tool is unavailable or errors before returning JSON, run instead:
   node deck-v2-workflow/tools/e2e.mjs   (Bash timeout 600000)
4. Stop the server: `pkill -f "vite --port 5199"`.
Report: which runner was used, then the returned JSON verbatim. No interpretation, no extra testing.
Last action: write the report to deck-v2-workflow/.signals/T1-e2e.done, then return the same text.
```

### Committer brief

```
You are deck-committer. Run exactly:
git add -- <path1> <path2> ...
git commit -m "<message>"
Then run: git log --oneline -1
Report the hash, or the full hook/commit error output. Do nothing else.
Last action: write the report to deck-v2-workflow/.signals/<BATCH>-commit.done, then return the same text.
```

Commit messages are Conventional Commits, e.g. `feat(deck): rebuild opening and chapter cards (S01–S04, S08, S14, S23, S29)`. No batch codes in code or comments; batch codes are fine in commit messages.

---

## 5. Failure table (decided in advance)

| Situation | Action |
| --- | --- |
| Build red, or snap CRASH / console / NAV | Same builder via SendMessage, up to 3 rounds. Still red: revert that batch's slide files to placeholders (manifest still points at them, so the deck still runs), mark `[!]` with the reason, continue to the next batch |
| Letterbox / small text / overlap persists after the fix round | Log it in `review-log.md` with slide+build, mark the batch `[x]` with a note. Z1 sweeps these |
| Review finding judged wrong | Drop it, and log why in `decisions.md` |
| Commit hook fails | The builder fixes it, re-verify, commit again. **Never `--no-verify`** |
| The spec is ambiguous or contradicts itself | Choose what best serves the presenter's intent (§1 and §3 of the plan, and the raw feedback). Log it in `decisions.md` and continue |
| An asset / fact / URL is missing | Use a clean placeholder that doesn't break the layout. Log it in `missing-pieces.md` |
| A real vendor quote (S09) can't be verified | Use an unattributed paraphrase without quotation marks. Log it |
| T1 browser session fails a check | Don't fix in T1. Pass the failed checks into the Z1 builder fix round, and re-run T1's session at the end of Z1 |
| Playwright MCP unavailable to the tester | The tester falls back to `node deck-v2-workflow/tools/e2e.mjs` (same test, puppeteer-core) |
| Agent stalls (no signal after ~70 min) | `TaskStop`, then SendMessage "continue". Still stuck: re-dispatch fresh with a brief that names the partial files |
| Orchestrator context getting heavy | Finish the current batch, write `next:` in `progress.md`, and keep going. The files make compaction safe |

---

## 6. Hard rules

- **Git:** work on `main`. One commit per batch, explicit paths only. Never push, force, amend, `--no-verify`, `add -A` or `add .`. Never touch `snapshot/pre-deck-v2`.
- **Deleting:** only the files `progress.md` names: v1 slide moves into `legacy/` in B0, and the `legacy/` deletion in Z1. Agents never delete anything else.
- **Never edit** the read-only paths in §1.
- **No questions to the human.** Decide, log, continue.
- **Comments in code:** short, only where needed, and never historical ("changed from v1…", "per feedback…").
- **Everything the audience sees** follows plan §3 and §4. When in doubt, cut text.
- **Done means:**
  - every batch is `[x]`, or `[!]` with a reason;
  - Z1 is complete;
  - `npm run build` is green;
  - the final snap is clean of CRASH/console/NAV/letterbox;
  - the final browser session (`e2e-deck.js`) passes, or its remaining failures are listed in `human-review.md`;
  - `human-review.md` is written.
