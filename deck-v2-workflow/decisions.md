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
15. **Execution setup (planner's call):** Opus orchestrator + Opus builder, Sonnet reviewer/writer, Opus design director for the final pass, Haiku committer; visual verification by `tools/snap.mjs` screenshots at 1920×1080 and 1440×900.

## Execution-time decisions

<!-- one line each: date · batch · decision · why -->
