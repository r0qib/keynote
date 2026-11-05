# Morning Report

_Written by the orchestrator at the end of Z1 (2026-11-05)._

## Status
- **Batches:** B0–B12, D1, T1 and Z1 are all done. Nothing is blocked. There is one commit per batch on `main`, nothing was pushed, and `snapshot/pre-deck-v2` was not touched.
- **Build:** `npm run build` passes. The only warning is Vite's chunk-size notice.
- **Final snap** (`.snaps/final/`, all 43 slides, every build at 1920×1080 plus the final build at 1440×900, settle 3000 ms): no CRASH, console, NAV or letterbox flags. Two expected flags remain:
  - S26 b2 `clipped:2`: the Remarks column is cut off with "…" on purpose, as the spec asks, and the popover shows the full text.
  - S40 b1 `overlap:1` at a 3 s settle: the "ok, continue" bubble is still moving across "Five minutes." when the screenshot is taken. At its real settle (5.5 s) the slide is clean (`.snaps/final-s40`).
- **Final browser session** (`tools/e2e-deck.js`, Playwright MCP): **pass**, 16/16 checks, 43 slides, 131 steps. It covers navigation both ways, live corner badges, End/Home, key mashing, presenter ↔ audience sync, the timer, the overview, and no black bars at 16:9, 16:10, 720p and MacBook sizes.
- **Contact sheets** of each slide's final build: `.snaps/final/contact-01.png` to `contact-05.png`.

## Look at these first
1. **S30 b3**: I dropped the spec's "map shrinks toward the mini-map" ending. The shrink left faded layers over the headline and an empty stage. b3 now holds the full map with a 6 px loop arrow back to Gather.
2. **S02 b9**: each logo in the final grid now has its name plus the descriptor, and all logos take up the same visual area. Please confirm the descriptors (see below).
3. **S03**: the agenda strip widths follow the minutes in plan §2, but Act IV is weighted up so IV and V are the two widest, as §6 asks.
4. **S21**: it has 2 builds, not v1's 3, because the spec lists exactly three escalation states. The growing "me" bubbles are the headline.
5. **S09**: the vendor quotes are verbatim fragments with sources in `missing-pieces.md § Facts`. OpenAI's page blocks fetchers, so I verified it through a web.archive.org snapshot.
6. **S40 b1**: this is a ~5 s timed story. Click through it live once to check the pacing.
7. **S38 b0 = S28 b0**: the $25,000 is the shared `TheNumber` component. The DOM check shows identical boxes and fonts, and the pixel diff is only antialias noise.
8. **Section V and the epilogue mocks** (S31–S36, S40): the grey placeholder bars are now short real strings, such as unit names, file lines and sub-agent names. Skim them for wording you'd rather not show.

## Calls the run made (full list in `decisions.md`)
- Chrome (corner badge and progress pill) is hidden on the title, chapter cards, S28, S43, and S15/S38 at b0. The manifest controls this with `chromeFromBuild`.
- S20 b0 uses a white badge on the purple canvas (manifest `darkCanvas`).
- S07 b1: the QR code closes into a green check ("poll closed"). The v1 caption, copy button and timer are gone.
- S18 cuts "Plan" as well, leaving only Implement. There is no elephant icon.
- S34 highlights the "Orchestrate" station, because routing is part of orchestration.
- Poll readbacks in the notes are remapped to existing slides: Q1 S30, Q2 S15, Q3 S24, Q4 S17, Q5 S11, Q6 S18, Q7 S22, Q8 S43.
- `src/slides/legacy/` is deleted. The v1 sources live on `snapshot/pre-deck-v2`.

## Still needed from you
- **Poll URL**: `POLL_URL` in `src/slides/S07_Poll.jsx` is still the v1 placeholder `https://forms.office.com/r/informatiq-ai`.
- **S02 descriptors**: confirm or edit them in `src/slides/S02_WhoWeAre.jsx`. They are Drilling telemetry, Well operations, Subsurface models, Offset benchmark, Offshore logistics, Incident analysis, Analytics engine and Unified portal.
- **Script placeholders** in `docs/plans/presenter-script.md`: "(Add the one sentence only you know)" at WellMate, and "(read Qn)" at the poll readbacks.

## Parked polish (LOW, see `review-log.md`)
- Hard-coded greys and greens in S05, S06 and S19 should move to theme tokens, and `POLL_URL` to a constants file.
- S13 b0 prompt pill could be bigger. S12 b0 and S24 b0/b1 still have some empty space.
- S36 b3 file cards still have a few unlabelled filler bars.

## Rehearsal checklist
- Run `npm run dev`, open `/` and `/?presenter=true`, and press F for full screen.
- The script is about 6,478 words, roughly 50 min at 130 wpm, and the talk clock ends at 50:41 before Q&A. S39 and S41 run long for their 1:15 slots, so rehearse those two.
- If you run long, disable the cut-A slides in `src/slides/manifest.js` (`enabled: false`) first.
