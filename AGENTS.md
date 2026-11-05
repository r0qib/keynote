# Slide Deck: Agent Instructions

> **Active workflow:** [`deck-v2-workflow/`](./deck-v2-workflow/README.md). Start there.
> **Spec:** [`docs/plans/slide-deck-plan.md`](./docs/plans/slide-deck-plan.md) (v2, slides S01–S43)
> **Presenter material:** [`docs/plans/presenter-notes.md`](./docs/plans/presenter-notes.md), [`docs/plans/presenter-script.md`](./docs/plans/presenter-script.md)
> **Manifest:** [`src/slides/manifest.js`](./src/slides/manifest.js)

The v1 workflow in `slide-deck-workflow/` is history. Don't follow it, and don't edit it.

## Rules

1. **Unattended.** During the v2 run, never ask the presenter questions. Decide, log the decision in `deck-v2-workflow/decisions.md`, and continue.
2. **Follow the protocol** in `deck-v2-workflow/README.md`:
   - an Opus orchestrator dispatches one agent at a time from `.claude/agents/deck-*.md`;
   - it verifies with `npm run build` and `npm run snap`;
   - one review and one fix round per batch;
   - one commit per batch on `main`, explicit paths only, never push.
3. **Files are the memory:** `deck-v2-workflow/progress.md`, `decisions.md`, `important-notes.md`, `review-log.md`, `missing-pieces.md`.
4. **Read-only paths** (raw inputs and history): `drafts/**`, `docs/context/**`, `docs/notes/**`, `slide-deck-workflow/**`, and the branch `snapshot/pre-deck-v2`.
5. **Slides** live in `src/slides/S<id>_<Name>.jsx` and are registered in `src/slides/manifest.js`. They are designed on the fixed 1920×1080 stage, in design px, with no responsive classes. Shared parts live in `src/components/deck/` (import from its `index.js`). The v1 slides are only on the branch `snapshot/pre-deck-v2`.
