# Review Log (non-blocking findings for the presenter)

Reviewers always find something. HIGH/MEDIUM get fixed in the batch; LOW and leftovers park here for a quick human glance.

| Batch | Slide · build | Finding | Status |
| --- | --- | --- | --- |

## B0
- LOW · src/motion.js: `gentleSpring` exported but unused (use or delete in Z1).
- LOW · CodeWindow title bar is 24 px (chrome; ok unless snap flags it).
- LOW · ChatTurn "me" avatar is a plain salmon circle; may look empty on S12/S32. Consider a small meat-* pose.
- LOW · src/slides/registry.js header comments verbose, mention legacy `Slide*.jsx`.

## B1
- LOW · S23 b0: "Making It Count" runs over the teal drop shape (legible); could shift/shrink the shape.
- LOW · Chapter-card numerals read ~180 px cap height vs plan "~240 px" (font-size is 240); fine unless Z1 disagrees.
- LOW · S01 title at 160 px (below display 200) for the two-line fit; deliberate.

## B2
- LOW · S05/S06: repeated hard-coded greys/greens (#ECECF0, #D2D2DA, #E6E6EC, #EEF7F2) → theme tokens.
- LOW · S07: `POLL_URL` exported from a component file (react-refresh warning); move to a constants file.

## B3
- LOW · S09 b0: claim 1 at the top of the dark panel with ~60% empty until b1 (slots reserved). Consider centring then sliding up.
- LOW · S09 claim 2 "Can work on many tasks in parallel." is a capitalised mid-sentence fragment (logged as verbatim fragment).
- LOW · S11 b1/b2: ~150 px dead space at the bottom of the code window (fixed height avoids jumps; sound).

## B4 (review PASS)
- LOW · S12 b4: dart-marker glyphs small (~36 px, 5 px strokes); r 44 / stroke 6 would survive Teams 720p.
- LOW · S12 b0: chat column and canvas mostly empty; a larger ghost circle would fill the canvas.
- LOW · S13 b0: single 40 px prompt pill in an empty stage; ~48 px would hold it better.
- LOW · S13 b2: ~170 px empty strip under the last TOC line; window height ~680.
- MEDIUM? · S11 b0→b1 headline glide uses Framer `layout`; under the scaled Stage (≠1920×1080) the in-flight path may be off. Z1: check at 1440×900 or switch to a manual offset.

## B5
- LOW · S15 code: BIG_* constants mirror TypingBubble internals by hand; export a helper if reused.
- LOW · S17 b0: Enter key idle colour #8A8A96 on #2C2D35 is low contrast (decorative).

## B6
- LOW · S20 b0: corner badge has weak contrast on the purple gradient (shell chrome); Z1 could add a light text shadow on dark canvases.
- LOW · S19: raw hex "#F1F1F4" triangle fill → theme token.

## B7
- LOW · S24 b0/b1: bottom ~150 px empty; bar could be 240 tall.
- LOW · S26 b1: TEMP header icon/label sit ~15 px left of the values (cosmetic, fits the joke).
- LOW · S26 b2: skeleton is a 650 ms one-shot; confirm it's visible live.

## B8
- LOW · S30 b3 / S31 b0–b1 are sparse by spec sequence (not broken).
- LOW · S31: source-card CARD_W is approximate for the flow into the ticket; measure for exact convergence.

## B9
- LOW · S32 b1/b2: brief shrinks to 0.76 (inner text ~24 px); consider 0.85 with bubbles pushed out.
- LOW · S32 b3: unit-card stack (500 wide) lighter than the open card. Fine.

## B10
- LOW · S36 b3: unlabelled filler bars in the file cards could go.
- LOW · S35 headline at 88 px (not 96) to fit one line; deliberate.

## B11
- LOW · S38 b1 headline at 120 px (not the 96 token); deliberate.
- LOW · S40 b2: sub-agent cards unlabelled and bottom-heavy (y 872–968); acceptable.
