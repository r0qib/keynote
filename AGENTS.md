# Autonomous Slide Generation Protocol (AntiGravity CLI)

> **Active Workflow Directory:** [`slide-deck-workflow/`](./slide-deck-workflow/README.md)  
> **Source Plans:** [`docs/plans/slide-deck-plan.md`](./docs/plans/slide-deck-plan.md) and [`docs/plans/presenter-notes.md`](./docs/plans/presenter-notes.md)  
> **Slide Manifest:** [`src/slides/manifest.js`](./src/slides/manifest.js)  

## Autonomous Implementation Protocol

When executing the slide generation phase:
1. **Unattended Execution:** Do NOT pause to ask questions to the user. All design and technical decisions must be made autonomously and logged in [`slide-deck-workflow/decision log.md`](./slide-deck-workflow/decision%20log.md).
2. **Minimal Subagents (Implementer + Reviewer Pair):**
   - Keep sub-agent count to the absolute minimum.
   - For each batch, dispatch **1 Implementer subagent** to write components and manifest entries.
   - Dispatch **1 Reviewer subagent** to inspect diff against design guidelines and run verification: `npm run build`.
   - Max 1 fix round between Reviewer and Implementer.
3. **Execution Loop per Batch:**
   - Read [`slide-deck-workflow/progress.md`](./slide-deck-workflow/progress.md) to locate the next pending batch.
   - Read the corresponding slide specifications in [`docs/plans/slide-deck-plan.md`](./docs/plans/slide-deck-plan.md).
   - Implement the slide component in `src/slides/S<id>_<name>.jsx` (overwriting legacy demo slides in place).
   - Update `src/slides/manifest.js` to register the component.
   - Run verification gate: `npm run build`.
   - If an asset, URL, or specific fact is missing, log it in [`slide-deck-workflow/missing pieces.md`](./slide-deck-workflow/missing%20pieces.md).
   - If an architectural or layout judgment was made, log it in [`slide-deck-workflow/decision log.md`](./slide-deck-workflow/decision%20log.md).
   - Mark batch slides as completed `[x]` in [`slide-deck-workflow/progress.md`](./slide-deck-workflow/progress.md).
