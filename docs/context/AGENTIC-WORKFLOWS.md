# Custom Agentic Workflows: from a raw brief to reviewed, committed code

How we run long features (multi-day, 10–30 commits) with Claude Code: **plan once with the human, then
execute unattended** with a small team of purpose-built agents, then **review with the human at
checkpoints**. Used for the data-grid overhaul, both rounds of the data-inventory redesign, and the
Tecton design-system migration.

---

## 1. The problem

One long chat session doesn't hold up on a big feature:

| Pain | Why it happens |
| --- | --- |
| **Context rot** | One session reads too many files and loses the plan, the conventions and earlier decisions |
| **Cost** | The expensive model ends up doing grep, git and click-through work |
| **Drift** | Decisions made in turn 40 are forgotten by turn 200; settled questions get asked again |
| **No continuity** | A crash, a context limit or the next morning means starting over |
| **Babysitting** | The agent keeps stopping to ask questions, so it can't run while you're away |
| **Unverified "done"** | Lint, tests and build pass, and the UI is still broken at 1280 px |

## 2. The idea in one picture

```
 ATTENDED (human + Opus)            UNATTENDED (orchestrator + agents)          ATTENDED (human)
┌───────────────────────┐        ┌──────────────────────────────────────┐    ┌──────────────────┐
│ raw brief + screenshots│        │  for each unit, in DAG order:        │    │ checkpoint review│
│ → plan mode / brainstorm│──────▶│  implement → verify → review → fix   │───▶│ browser / visual │
│ → all questions settled │ kick- │  → commit → log → curate notes       │    │ answers → log    │
│ → plan + agents + files │ off   │  (never asks; decides and logs)      │    │ "continue"       │
└───────────────────────┘ prompt └──────────────────────────────────────┘    └──────────────────┘
```

Three rules hold it together:

1. **Every question is answered up front.** Execution never asks. It decides, logs the decision and keeps going.
2. **The files are the memory, not the chat.** Any new session can pick up from the working folder.
3. **The right model for each job.** Opus judges, Sonnet builds and reviews, Haiku runs things.

---

## 3. Phase 1: Planning (attended, the only phase where the human talks)

**Input:** a rough brief (`draft-plan-prompt.md`: field lists, general rules) plus annotated screenshots
of what's wrong (`issues-screenshots/issue-feedback.md`).

**Steps:**

1. **Plan mode / brainstorm.** Opus reads the brief, the project `CLAUDE.md` and the relevant design and domain docs.
2. **Targeted exploration.** Explorer subagents answer specific questions ("where is the card contract?") with `file:line` refs, so planning doesn't spend Opus context on file dumps.
3. **Ask everything now.** Layout direction, recipes, edge cases. Answers go into `plan.md § Settled decisions` and are never re-asked.
4. **Design spec (Opus designer agent).** One decisive option per question, with exact token classes, sizes, states, `data-testid`s and ASCII mockups.
5. **Write the plan as contracts plus units:**
   - **Global constraints**: rules every unit follows (tokens only, en+nb i18n, datum frame on depths…)
   - **Review focus**: what the reviewer checks, in priority order
   - **Shared contracts**: the interfaces units build against (`CardSpec`, `FactSpec`…)
   - **Units**: scope, files, dependencies and the **exact verify commands** for each
6. **Execution order.** A DAG plus a strict lane, with a review mode and checkpoints per unit.
7. **Generate the agents.** Feature-scoped definitions in `.claude/agents/<prefix>-*.md`, kept out of git through `.git/info/exclude`.
8. **Write the kickoff prompt** into the folder's README.

> Kickoff (Opus, high effort): *"Continue the data-inventory redesign. Read
> `temp-notes/data-inventory-redesign/README.md` and follow its session protocol autonomously.
> Do not ask me anything; log decisions in `decisions.md`."*

## 4. The working folder (the workflow's brain)

`temp-notes/<feature>/` is gitignored scratch. For work the team should see, like the Tecton migration, it goes in `docs/<feature>/` and is committed.

| File | Purpose | Written by |
| --- | --- | --- |
| `README.md` | Session protocol: start checklist, hard rules, budget, failure table, kickoff | planning |
| `plan.md` | Constraints, settled decisions, shared contracts, units | planning (contract amendments get logged) |
| `specs/*.md` | Designer output (the UI spec) | designer |
| `execution-order.md` | DAG, lane, review mode, checkpoints, failure rule | planning |
| `agents.md` | Roster, unit loop, keep-alive, brief **templates** | planning |
| `execution-notes.md` | Codebase index: paths, commands, data facts, gotchas | planning |
| `important-notes.md` | **Living notes** that every agent reads first, curated after each unit | agents append, orchestrator curates |
| `progress.md` | `[ ] [~] [x] [!]` status per unit, plus a session log with hashes and tokens | orchestrator |
| `decisions.md` | One line per execution-time decision, with the reason | orchestrator |
| `human-review.md` | Questions, gaps and checkpoint instructions for the human | agents/orchestrator; human answers |
| `tools/wait.sh` | Keep-alive signal waiter | planning |
| `.signals/` | `<unit>-<role>.done` completion reports | agents |

---

## 5. The team: model, effort and job

The **orchestrator** is the Opus session the user starts. It plans, decides, dispatches, verifies and
keeps the tracking files. **It never writes product code.**

| Agent | Model · effort | Does | Never |
| --- | --- | --- | --- |
| `*-designer` | **Opus** · high | UI/interaction spec into `specs/` | Edit code, browse |
| `*-implementer` | **Sonnet** · medium–xhigh | One unit: specs first, code, i18n, runs verify | Commit, delete files it didn't create |
| `*-reviewer` | **Sonnet** · medium–xhigh | One pass over the unit diff, **HIGH/MEDIUM only** | Edit files |
| `*-explorer` | **Sonnet** · medium | One question, ≤ 40 lines, `file:line` refs | Edit, read whole trees |
| `*-browser-runner` | **Haiku** | Runs a given Playwright script verbatim, returns raw JSON | Improvise, judge |
| `*-browser-validator` | **Sonnet** | Judges runner output against a checklist, recomputes the numbers | Browse, edit |
| `*-committer` | **Haiku** | `git add -- <paths>` + commit, reports hash or hook tail | Push, amend, `--no-verify`, `add -A` |

**Routing rule:** pay for judgment, not for typing. Opus does design and orchestration, Sonnet does
reasoning-heavy building and review, and Haiku does mechanical work that **has been fully scripted for it**.
Model, effort and `maxTurns` sit in each agent's frontmatter, so routing can't drift mid-run.

Example agent definition:

```markdown
---
name: dir-implementer
description: Implements exactly one unit from plan.md with meaningful specs and runs its verify commands. Never commits.
tools: Read, Write, Edit, Bash, Glob, Grep
model: sonnet
effort: medium
maxTurns: 150
---
Read the files your brief lists, in order, and nothing else... Your last action: write your report
to the .signals file your brief names, then return the same text.
```

---

## 6. Phase 2: Execution (unattended)

### The unit loop

```
pick next ready unit (DAG + progress.md) → mark [~]
   │
   ▼
implementer (fresh, Sonnet) ──report──▶ orchestrator runs verify itself (| tail -40)
   │                                         │ red → SendMessage failing tail to SAME implementer (≤ ~5 rounds)
   ▼                                         ▼ green
reviewer (Sonnet, HIGH/MEDIUM only) ──▶ ONE fix round via SendMessage → re-verify  (no re-review)
   │
   ▼
committer (Haiku, explicit paths, Conventional Commit, hooks run) → progress [x] + hash
   │
   ▼
log decisions · curate important-notes.md · next unit
```

- **One implementer at a time.** Units share i18n files, registries and contracts, so parallel edits collide.
- **One commit per unit.** Any unit can be reverted cleanly.
- **Fix rounds reuse the same agent** through `SendMessage`, so the context it built up isn't thrown away.
- **Full suite and build run only at checkpoints**; between them, verify with targeted specs plus `tsc`, lint and i18n.

### Session protocol (makes it resumable)

Start: read README → progress → decisions → notes → only the plan sections for the next units. Then
`git status`: a dirty tree that matches a `[~]` unit means **resume it**, and changes that belong to no unit are
**left alone**. Clear stale `.signals`. Log the session header (HEAD and tokens left).
End: only between units, never in the middle of one. Record `next:` in `progress.md`.

### Failure table (decided in advance)

| Situation | Action |
| --- | --- |
| Verify red | Same implementer, up to ~5 rounds, then narrow the unit, revert and re-brief, or block (logged) |
| Review finding judged wrong | Drop it and log why |
| Commit hook fails | Implementer fixes → verify → commit again. **Never `--no-verify`** |
| Plan contract proves wrong | Smallest sound change, update `plan.md § Shared contracts`, log it |
| Agent stalls | Safety valve → `TaskStop` + `SendMessage` "continue", or re-dispatch |

---

## 7. Efficiency: context and tokens

**Context engineering, so every agent knows only what it needs:**

- **Briefs come from templates** and list *exactly* what to read, in order, plus "do not explore".
- **Section-scoped reading.** Agents read `plan.md` only at their unit's heading plus the named contracts.
- `execution-notes.md` acts as the **codebase index** and `important-notes.md` as the **living memory**. Agents read those instead of re-discovering the repo.
- **Short reports** (≤ 25 lines) with a fixed format. The orchestrator **never reads whole source files**. It reads `| tail -N`, `git diff --stat` and the reports.
- An explorer is used only when the notes can't answer, for one question.

**Prompt-cache keep-alive.** The cache TTL is 5 minutes, and an idle orchestrator pays for a full re-cache. So
while an agent runs, the orchestrator loops on a cheap wait:

```sh
sh tools/wait.sh R1-impl 270   # returns "done: <report>" as soon as .signals/R1-impl.done exists, else "timeout"
```

Each timeout is one cheap cache-read turn. After 15 timeouts in a row (~70 min) a safety valve
ends the turn so the harness notification can arrive.

**Why not one generic workflow engine?** Hand-rolled orchestration gives us `SendMessage` fix rounds,
resume across sessions, human checkpoints and per-feature agents, all written down in files.

**Real numbers:** data-inventory round 1 ran **13 units on ~0.25M orchestrator tokens**. Two scripted browser
checkpoints on the data-grid overhaul cost **~165k tokens**.

---

## 8. Quality gates

| Layer | Gate |
| --- | --- |
| Implementer | Specs first for pure behaviour; targeted specs, `tsc`, lint, i18n check |
| Orchestrator | Re-runs verify itself and doesn't trust "it passes" |
| Reviewer | Fresh eyes on the diff: correctness, duplicated building blocks, contracts, tokens, i18n, test-ids, tests that test behaviour |
| Git hooks | `pre-commit`: design:check → tecton:check → lint. `pre-push`: + test:ci + build |
| Final unit (Z1) | Contract cleanup, a simplify pass, **two parallel reviewers**, full gates |
| Human | Checkpoint review in the browser (below) |

The review is **one pass, HIGH/MEDIUM only**, then one fix round. Perfectionism loops are where token
budgets go to die.

---

## 9. Browser and end-to-end testing

The rule: **scripts over clicking, cheapest model, numbers you can check.** It runs at
**checkpoints**, not after every unit, and only while no implementer is editing (the dev server serves the working tree).

### The split: runner and validator

```
orchestrator writes the probe ──▶ Haiku runner executes it VERBATIM ──▶ raw JSON + artifact paths
                                                                          │
                     Sonnet validator judges against the checklist ◀──────┘  (recomputes the numbers)
```

- **The runner gets a numbered plan with the exact script inline.** Haiku runs a script faithfully, but it won't derive selectors or invent measurements.
- **The validator never browses.** It re-derives whether each number *can* be right.

### Making probes cheap and trustworthy

- **Measurable → one `browser_evaluate` that returns compact JSON.** Batch every check for a page (overflow, heights, clipping, control presence) into a single call.
- **Visual → one element-scoped screenshot**, not a full page.
- **Drive by URL** (`?wellboreId=<guid>`) instead of clicking through pickers. Use data-rich fixtures (`16/1-D-5`, `16/1-D-10`).
- **Target `data-testid`, never utility classes.** A real false pass measured the wrong element that shared a class.
- **Real tolerances** of a few px, not tens. A `< 40px` tolerance passed two elements on different rows.
- **Check two widths** (1280 and ~1920/2560). Page-level `scrollWidth - clientWidth === 0` is the overflow signal.
- Ask for **raw JSON next to PASS/FAIL**, and compare against what you predicted before reading the verdict.
- Artifacts go **only** in the gitignored `.playwright-mcp/<feature>/`, and are deleted at session end.

```js
// one probe, one round-trip
() => {
  const r = (id) => document.querySelector(`[data-testid="${id}"]`)?.getBoundingClientRect();
  return {
    overflowX: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    header: r('inventory-pane-header')?.height,
    sortMenuInViewport: (r('inventory-sort-menu')?.right ?? 0) <= innerWidth,
    rows: document.querySelectorAll('[data-testid="record-row"]').length,
  };
}
```

### Committed E2E suite and human checkpoints

- `e2e/` Playwright suite (kit, focus, a11y, visual, **both colour modes**) over `/ui-showcase` and the real pages. `npm run e2e`.
- The BFF login needs a human, so the suite runs at **attended checkpoints** (CP-A and CP-B in the Tecton migration), driven by a Haiku `tm-runner` that runs the exact commands and reports pass/fail plus raw failure lines.
- The checkpoint is written into `human-review.md`: which routes, which widths, which commands, and which planning calls to confirm. The session **stops there** and resumes when the human says "continue".

What browser checks catch that lint and 4,900 unit tests don't: **misalignment, duplicated tooltips across panels, and popovers clipped off-screen.**

---

## 10. Safety rails (learned the hard way)

- **Agents never delete files they didn't create.** One agent removed untracked user files during a run, and they couldn't be recovered.
- **Stage explicit paths only.** No `add -A`, push, amend, force or `--no-verify`. Never merge `development` or `test`.
- **No plan codes in the product.** Unit IDs and ticket codes stay out of code, comments and commits.
- **Stale signals.** A signal file can be rewritten after it was consumed. Fix-round reports start with `"<unit> fix round"`, and the orchestrator checks that prefix.
- **Stalls happen.** One implementer sat idle for ~65 min. `TaskStop` plus a `SendMessage` resume recovered it with its context intact.

## 11. Memory across features

Claude Code's project memory carries the **lessons**, not the code:

- *feedback* memories: model routing, browser-token discipline, "verify subagent measurements", autonomous-run rules (one review, one fix round, few agents, keep the cache warm)
- *project* memories: where each feature's folder lives, its status and HEAD, what's left for the human

Each new feature's plan is therefore designed with the previous feature's lessons already built in.

---

## 12. Where to take it next

1. **Scaffold skill.** Make `/new-workflow <feature>` generate the folder, agent definitions, `wait.sh` and brief templates from one template. Today each feature copies them from the last one.
2. **A browser lane in the DAG.** Make visual verification a unit type (`V1`, `V2`) with runner and validator briefs, instead of an afterthought.
3. **Per-unit cost telemetry.** Log tokens per unit and per role in `progress.md` to find the expensive steps.
4. **Worktree isolation.** Run the browser checkpoint against a frozen worktree, so implementers keep going in parallel.
5. **A retro unit.** The final unit writes the run's lessons into memory automatically.
6. **Self-hosted auth for E2E.** A stored, refreshable session would let the browser suite run unattended.

---

## 13. Talk track (5 slides)

1. **Problem.** Long features break single chat sessions: context, cost, drift, babysitting.
2. **Plan once, run unattended.** The settled-decisions plan, contracts and units, and the working folder as memory.
3. **The team.** Opus judges, Sonnet builds and reviews, Haiku runs. The unit loop, with one review and one fix round.
4. **Efficiency.** Scoped briefs, living notes, cache keep-alive, scripted browser probes. ~0.25M tokens for 13 units.
5. **Trust.** Gates at every layer, the runner/validator split, human checkpoints, and safety rails learned from real incidents.
