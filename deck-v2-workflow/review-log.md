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
