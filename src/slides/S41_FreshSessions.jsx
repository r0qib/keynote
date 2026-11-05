import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline } from '../components/deck';

const WIDTH = 720;
const CENTER_Y = 620;
// Row pitch and height: yesterday, compacted once, compacted twice.
const STATES = [
  { pitch: 52, h: 40 },
  { pitch: 44, h: 34 },
  { pitch: 38, h: 28 },
];
const ROWS = [
  { human: true, w: 300 },
  { w: 620 },
  { human: true, w: 220 },
  { w: 560 },
  { w: 660, lost: 'the decision from turn 40' },
  { human: true, w: 340 },
  { w: 520 },
  { human: true, w: 260 },
  { w: 600, lost: 'the edge case' },
  { human: true, w: 200 },
  { w: 640 },
  { w: 480 },
];
const LEFT = [600, 300, 120];

// Compaction keyframes: squeeze, hold, squeeze again.
const SQUEEZE = { duration: 2.4, delay: 0.7, times: [0, 0.25, 0.55, 0.8, 1], ease: appleEase };
const SQUEEZE_STATES = [0, 1, 1, 2, 2];

const stackTop = (s) => CENTER_Y - (ROWS.length * STATES[s].pitch - (STATES[s].pitch - STATES[s].h)) / 2;
const rowY = (i, s) => stackTop(s) + i * STATES[s].pitch;

export default function S41_FreshSessions({ buildStep = 0 }) {
  const settled = buildStep === 0 ? 0 : 2;
  return (
    <>
      <SlideFrame>
        <Headline initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
          Start fresh.
        </Headline>
      </SlideFrame>

      <motion.div
        className="absolute top-0 h-[1080px]"
        style={{ width: WIDTH }}
        initial={{ opacity: 0, x: LEFT[0], y: 24 }}
        animate={{ opacity: buildStep >= 2 ? 0.7 : 1, x: LEFT[Math.min(buildStep, 2)], y: 0 }}
        transition={{ duration: 0.7, ease: appleEase }}
      >
        <motion.div
          className="absolute left-0 right-0 flex items-center justify-between"
          initial={{ y: stackTop(0) - 76 }}
          animate={buildStep === 1 ? { y: SQUEEZE_STATES.map((s) => stackTop(s) - 76) } : { y: stackTop(settled) - 76 }}
          transition={buildStep === 1 ? SQUEEZE : { duration: 0.6, ease: appleEase }}
        >
          <span className="text-[40px] leading-[52px] font-bold">Yesterday</span>
          {buildStep >= 1 && (
            <motion.span
              className="h-[64px] px-[28px] rounded-full bg-accent-coral text-white text-body font-bold flex items-center"
              initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
              animate={buildStep === 1 ? { opacity: [0, 1, 1, 1], scale: [0.6, 1, 1.12, 1], rotate: -3 } : { opacity: 1, scale: 1, rotate: -3 }}
              transition={buildStep === 1 ? { duration: 2.2, delay: 0.9, times: [0, 0.15, 0.68, 0.8], rotate: { duration: 0.4, delay: 0.9 } } : { duration: 0.3 }}
            >
              Compacted
            </motion.span>
          )}
        </motion.div>

        {ROWS.map((row, i) => (
          <Row key={i} index={i} row={row} buildStep={buildStep} settled={settled} />
        ))}

        {buildStep === 1 && <Plates />}
      </motion.div>

      <AnimatePresence>
        {buildStep === 1 && (
          <motion.div key="lost" className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
            <LostChip text={ROWS[4].lost} from={{ x: LEFT[1] + 60, y: rowY(4, 0) }} to={{ x: 1160, y: 736, rotate: 5 }} delay={0.95} />
            <LostChip text={ROWS[8].lost} from={{ x: LEFT[1] + 60, y: rowY(8, 1) }} to={{ x: 1290, y: 852, rotate: -4 }} delay={2.25} />
          </motion.div>
        )}
        {buildStep >= 2 && <Handoff key="handoff" />}
      </AnimatePresence>
    </>
  );
}

function Row({ index, row, buildStep, settled }) {
  const squeezing = buildStep === 1;
  const ys = SQUEEZE_STATES.map((s) => rowY(index, s));
  const hs = SQUEEZE_STATES.map((s) => STATES[s].h);
  const lostAt = index === 4 ? 1 : index === 8 ? 3 : null;
  const gone = lostAt !== null && buildStep >= 1;
  const barOpacity = squeezing && lostAt !== null ? SQUEEZE_STATES.map((_, k) => (k < lostAt ? 1 : 0)) : gone ? 0 : 1;
  const holeOpacity = squeezing && lostAt !== null ? SQUEEZE_STATES.map((_, k) => (k < lostAt ? 0 : 1)) : gone ? 1 : 0;
  const t = squeezing ? SQUEEZE : { duration: 0.6, ease: appleEase };
  const align = row.human ? 'right-0' : 'left-0';

  return (
    <motion.div
      className="absolute left-0 right-0"
      initial={{ y: rowY(index, 0), height: STATES[0].h, opacity: 0 }}
      animate={squeezing ? { y: ys, height: hs, opacity: 1 } : { y: rowY(index, settled), height: STATES[settled].h, opacity: 1 }}
      transition={{ ...t, opacity: { duration: 0.4, delay: 0.1 + index * 0.04 } }}
    >
      <motion.span
        className={`absolute top-0 bottom-0 ${align} rounded-[12px]`}
        style={{ width: row.w, background: row.human ? colors.ink : '#D5DAE3' }}
        initial={{ opacity: 1 }}
        animate={{ opacity: barOpacity }}
        transition={t}
      />
      {lostAt !== null && (
        <motion.span
          className={`absolute top-0 bottom-0 ${align} rounded-[12px] border-[5px] border-dashed border-accent-coral`}
          style={{ width: row.w, background: 'rgba(229,72,77,0.12)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: holeOpacity }}
          transition={t}
        />
      )}
    </motion.div>
  );
}

// Two plates press the stack, once and then again.
function Plates() {
  const edge = (s, side) => (side === 'top' ? stackTop(s) - 28 : stackTop(s) + ROWS.length * STATES[s].pitch - (STATES[s].pitch - STATES[s].h) + 16);
  return ['top', 'bottom'].map((side) => (
    <motion.span
      key={side}
      className="absolute left-[-30px] right-[-30px] h-[12px] rounded-full bg-ink"
      initial={{ y: edge(0, side) - (side === 'top' ? 24 : -24), opacity: 0 }}
      animate={{ y: SQUEEZE_STATES.map((s) => edge(s, side)), opacity: [1, 1, 1, 1, 0] }}
      transition={SQUEEZE}
    />
  ));
}

function LostChip({ text, from, to, delay }) {
  return (
    <motion.div
      className="absolute left-0 top-0 h-[68px] px-[28px] rounded-[18px] bg-surface border-[4px] border-dashed border-accent-coral text-body font-semibold text-muted flex items-center whitespace-nowrap"
      initial={{ opacity: 0, x: from.x, y: from.y, rotate: 0 }}
      animate={{ opacity: [0, 1, 1, 0.8], x: [from.x, from.x + 260, to.x, to.x], y: [from.y, from.y - 30, to.y, to.y], rotate: [0, 0, to.rotate, to.rotate] }}
      transition={{ duration: 1.4, delay, times: [0, 0.2, 0.7, 1], ease: 'easeInOut' }}
    >
      {text}
    </motion.div>
  );
}

const WINDOW = { left: 1080, top: 332, width: 720, height: 576 };
const DOC = { left: 1120, top: 440 };
const DOC_ROWS = ['Decisions', 'Status', 'Files', 'Next'];

// b2: a handoff doc leaves yesterday's stack and lights up a fresh session.
function Handoff() {
  return (
    <motion.div className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      <motion.div
        className="absolute rounded-[28px] bg-surface border-[4px] overflow-hidden"
        style={WINDOW}
        data-mock
        initial={{ opacity: 0, y: 24, borderColor: colors.line, boxShadow: '0 0 0px rgba(30,158,106,0)' }}
        animate={{ opacity: 1, y: 0, borderColor: colors.green, boxShadow: '0 0 80px rgba(30,158,106,0.35)' }}
        transition={{ duration: 0.6, ease: appleEase, borderColor: { duration: 0.5, delay: 2.3 }, boxShadow: { duration: 0.8, delay: 2.3 } }}
      >
        <div className="h-[72px] flex items-center gap-[12px] px-[28px] border-b-[3px] border-line bg-[#F4F6FA]">
          <span className="w-[16px] h-[16px] rounded-full bg-[#FF5F57]" />
          <span className="w-[16px] h-[16px] rounded-full bg-[#FEBC2E]" />
          <span className="w-[16px] h-[16px] rounded-full bg-[#28C840]" />
          <span className="ml-[16px] text-[32px] font-semibold">Fresh session</span>
        </div>
      </motion.div>

      <svg className="absolute left-[864px] top-[596px]" width="196" height="48" viewBox="0 0 196 48" aria-hidden>
        <motion.path
          d="M6 24 H180 M160 8 L182 24 L160 40"
          fill="none"
          stroke={colors.ink}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: appleEase, delay: 1.5, opacity: { duration: 0.1, delay: 1.5 } }}
        />
      </svg>

      <motion.div
        className="absolute w-[640px] h-[432px] rounded-[24px] bg-surface border-[4px] border-ink p-[40px] shadow-[0_24px_60px_rgba(17,17,19,0.14)]"
        style={DOC}
        data-mock
        initial={{ opacity: 0, x: -960, y: 0, scale: 0.6 }}
        animate={{ opacity: [0, 1, 1, 1], x: [-960, -960, -480, 0], y: [0, 0, -60, 0], scale: [0.6, 0.6, 0.8, 1] }}
        transition={{ duration: 2.0, delay: 0.3, times: [0, 0.3, 0.65, 1], ease: appleEase }}
      >
        <div className="flex items-center gap-[20px] h-[56px]">
          <svg width="40" height="48" viewBox="0 0 40 48" aria-hidden>
            <path d="M4 4 H26 L36 14 V44 H4 Z M26 4 V14 H36" fill="none" stroke={colors.ink} strokeWidth="5" strokeLinejoin="round" />
          </svg>
          <span className="text-[40px] leading-[52px] font-bold">Handoff</span>
        </div>
        <div className="mt-[28px] flex flex-col gap-[20px]">
          {DOC_ROWS.map((label, i) => (
            <div key={label} className="h-[52px] flex items-center gap-[24px]">
              <span className="w-[210px] text-body font-semibold">{label}</span>
              <span className="h-[16px] rounded-full bg-[#D5DAE3]" style={{ width: [260, 200, 280, 220][i] }} />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
