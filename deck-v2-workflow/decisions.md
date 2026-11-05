# Decisions

## Settled in planning (with the presenter, 2026-11-05) — never re-ask

1. **Scope:** reimagine the deck per `drafts/slide_feedback/slide-feedback.md`; v2 spec is `docs/plans/slide-deck-plan.md`.
2. **Removed slides:** wrong slide, first-80, right-size, ask-everything, don't-trust, receipts, routing (merged into S34), doom-flip. Remove every reference to them.
3. **S16 make-no-mistakes moves to The Ugly** (it's our mistake), as S21.
4. **Act IV is named "Making It Count."**
5. **Agenda shape:** I Good · II Bad · III Ugly · IV Making It Count · V How We Work (own chapter, the showpiece). The $25,000 story is an un-numbered **epilogue**, not on the agenda.
6. **$25,000 teaser:** shown alone on S28 (end of Act IV, before V); paid off at S38 with the identical number.
7. **Only $25,000 appears on screen.** The new budget ($1,100 soft / ~$3,000 actual), the salary joke and team usage stats are spoken only.
8. **Length:** ~60 min total including Q&A (~51 min talk).
9. **Git:** current work committed on `main` (`8c4a337`) and preserved on branch `snapshot/pre-deck-v2`. The run stays on `main`, commits per batch, never pushes.
10. **Raw prompts are read-only:** `drafts/**`, `docs/context/**`, `docs/notes/**`, and the v1 `slide-deck-workflow/**`.
11. **Presenter script:** a new optional full script goes to `docs/plans/presenter-script.md` (the presenter may not use it).
12. **Minimal on-screen text everywhere;** the presenter tells the story. Never blame the audience; negatives are "me/we".
13. **Look and feel:** clean, minimal, big type, WWDC / Google I/O-style motion; engaging without being distracting.
14. **No black bars:** full-bleed viewport + fixed 1920×1080 scaled stage (planner's technical call).
15. **Execution setup:** Opus orchestrator + Opus builder (no screenshot viewing); screenshot checking by Sonnet (reviewer, medium) from contact sheets; Haiku snap-runner + committer; full browser session by Sonnet (low) via Playwright MCP script `tools/e2e-deck.js` (fallback `tools/e2e.mjs`); Opus design director on final contact sheets only (presenter asked for efficiency, 2026-11-05).

## Execution-time decisions

<!-- one line each: date · batch · decision · why -->
- 2026-11-05 · all · `.claude/agents/deck-*` types aren't registered in this session; dispatch `general-purpose` with the matching model override and have each agent read its `.claude/agents/deck-<role>.md` as its role definition first · keeps roles/models per README §2
- 2026-11-05 · all · session 2: `deck-*` agent types are now registered; dispatch them directly (supersedes the general-purpose fallback above) · roles/models come from the agent definitions
- 2026-11-05 · B0 · `tools/e2e-deck.js` checks the corner badge at build `chromeFromBuild` (default 0) instead of always build 0 · S15 hides chrome at b0 by spec; avoids a false failure
- 2026-11-05 · B0 · "As v1" totalBuilds: S05=2, S06=2, S07=1, S16=2, S17=1, S21=3; S15 = v1 1 + 1 = 2 · from legacy buildStep usage
- 2026-11-05 · B0 · corner badge top 33 px / right 120 px, progress pill top-centre, both inside the 96 px top band; hidden on badge-less slides · can't collide with headlines at y=96
- 2026-11-05 · B0 · new manifest field `chromeFromBuild` (S15 = 1) hides badge/progress before that build · S15 b0 spec
- 2026-11-05 · B0 · durations: 0:10 = 0.17 min; S43 (Q&A) = 9 min so pacing sums to ~60 · plan §2
- 2026-11-05 · B0 · canvas change is a 400 ms layered cross-fade (works for gradients); slide transition 450 ms appleEase · plan §4.1/§4.5
- 2026-11-05 · B0 · extra shared components `ActShape` (per-act motif for S01 + chapter cards) and `CanvasBackground` (audience + presenter) · one visual language
- 2026-11-05 · B0 · review finding "show progress pill on badge-less slides" dropped: title, chapter cards, S28, S43 and S15 b0 stay chrome-free · they are full-bleed moments; S15 b0 spec says nothing on the slide
- 2026-11-05 · all · orchestrator runs short batch re-verify snaps (fix rounds, < 1 min) directly instead of dispatching the snap-runner · same raw output, cheaper than an agent turn
- 2026-11-05 · B1 · S03 build 2 dims I–IV to 50% while V lifts · one focal point
- 2026-11-05 · B1 · S02 Portal uses `informatiq.svg` (portal.svg is a 44×44 icon); names shown under each logo per spec, descriptors only in the spotlight
- 2026-11-05 · B1 · chapter-card motifs morph slowly (same ActShape language as S01); only S01's Bad shape glitches
- 2026-11-05 · B1 · S03 widths roughly time-proportional but Act IV weighted up so IV and V are the two widest · §6 says so explicitly; it beats strict proportionality
- 2026-11-05 · B1 · S03 Act IV weight 11 (not 9) so IV > III; deepened act fills kept local to S03 for ≥4.5:1 white text
- 2026-11-05 · B2 · S05 chores shortened to fit a column at 34 px (CRUD APIs, Unit tests, Migrations, Regex, API docs) · fit, minimal text
- 2026-11-05 · B2 · S06 pipeline as a four-step stepper beside a WellMate manual mock; "incremental diff" left to the presenter · minimal text
- 2026-11-05 · B2 · S07 b1 = QR folds into a check ("poll closed"); v1 caption, copy button, timer, kicker and mascot dropped · spec: headline + QR are the slide; keeps v1 build count
- 2026-11-05 · B3 · S09 claims are verbatim verified fragments (Cognition/Devin 2024, OpenAI/Codex 2025, Anthropic/Claude Opus 4 2025), date order; sources in missing-pieces § Facts
- 2026-11-05 · B3 · S09 and S11 use the light CodeWindow so "my terminal" looks the same on both; S09 caret static (no ambient loop)
- 2026-11-05 · B3 · S10 has no headline (spec "No other copy"); S11 b0 centres the headline then glides it up at b1 · avoids an empty b0
- 2026-11-05 · B4 · S12 attempt 3 overshoots (circle with parts bolted on) · reads as "architecture"; dart markers carry glyphs, not numbers
- 2026-11-05 · B4 · S13 TOC scroll and mascot wobble are one-shot · §4.5 allows no ambient loop on S13
- 2026-11-05 · B5 · S15 morph is a manual FLIP in design px (offsetLeft/Top), not Framer layoutId · layoutId measures page px, wrong under the scaled Stage
- 2026-11-05 · B5 · S16 cost weights "Tokens" (b1) and "Time" (b2); framework names only · minimal, no unverified attributions
- 2026-11-05 · B5 · S18 cuts Plan in b2 with Spec/Test/QA · spec says "until only Implement is left"
- 2026-11-05 · B5 · S18 no elephant icon; meter uses a Coins icon instead of a label · spec "if at all"
- 2026-11-05 · B6 · S21 totalBuilds 3 → 2: three escalation states, the "me" bubbles are the headline, older bubbles shrink/mute · spec lists exactly three states
- 2026-11-05 · B6 · S22 log is `git log --oneline --reverse` (newest at bottom); spec's c4d2a8 dropped to fit 4 builds
- 2026-11-05 · B6 · S20 slop page is one full-stage layer that shrinks to a 0.5 framed thumbnail; "purple" in the headline uses the slop gradient
- 2026-11-05 · B7 · S24 bar spans full 1680 px with mascot + tag below it; S25 meat-lurk shows head/eyes only over the fence; S26 b1 question replaces the headline in its slot
- 2026-11-05 · B7 · S26 b2 "clipped:2" flags accepted: Remarks column truncates by spec, popover shows the full text
- 2026-11-05 · B8 · WorkflowMiniMap: segmented pill at left 120 / top 96 (~576×56); Chapter V headlines sit below it (mt-[84px]) · one consistent spot S31–S37
- 2026-11-05 · B8 · S30 b3 stations fly into the mini-map; final frame is headline + mini-map · spec "shrinks toward the mini-map"; loop arrow unlabelled (spoken)
- 2026-11-05 · B8 · S31 layout sources left (b1) / ticket centre / user frame right (b2); ticket "Wellbore search." (INQ-1502) continues the S25/S26 wellbore grid
- 2026-11-05 · B8 · shared `TheNumber` component renders $25,000 for S28 and S38 · guarantees identical geometry
- 2026-11-05 · B9 · S32 brief starts on S31's final box, shrinks to 0.76 for b1–b2; each answered question stamps a check onto a brief row; b3 = unit cards + six-band anatomy
- 2026-11-05 · B9 · S33 "fresh" agents = glow ring + sparkle (no label); b3 swaps the deal diagram for two token meters (one focal point)
- 2026-11-05 · B9 · S34 mini-map active = Orchestrate (routing is part of orchestration); effort levels low/medium/high/max
- 2026-11-05 · B9 · S32 word count over ~20 because the spec asks for 5 Q + 5 A + 6 labels · spec wins
- 2026-11-05 · B10 · S35 headline (37 chars) at 88 px nowrap, bottom of the spec's range; growing doc masked to fade below the headline rather than going off-stage
- 2026-11-05 · B10 · S35 gauge words "meh" → "sharp", no numbers; S36 file purposes Unit by unit · Calls made mid-run · Memory for fresh agents · Parked for a human
- 2026-11-05 · B10 · S37 out-of-sync shown concretely (comments "20 results"/"spud date" vs code limit = 50, byRelevance); mini-map `complete` at b2
- 2026-11-05 · B11 · S38 `chromeFromBuild: 1` so b0 matches S28 exactly (DOM identical; pixel diff = antialias noise); number parks at the top from b1
- 2026-11-05 · B11 · shared `InfinityMark` so the S38 ∞ and S39 ∞ are one shape; S39 b2 morphs ∞ into the gauge arc (no numbers)
- 2026-11-05 · B11 · S40 b1 is a timed story (~5.2 s); b2 ring drains to 4:50 and refills in a loop (keep-alive pulse allowed by §4.5)
- 2026-11-05 · B11 · S38 b1 "It's unlimited." at 120 px (above the 96 headline token) · it's the slide's single line, storytelling tone
- 2026-11-05 · B11 · draw-on paths fade in with opacity so round caps leave no stray dot before drawing
