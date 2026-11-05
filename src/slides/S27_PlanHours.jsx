import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline } from '../components/deck';

// Day axis: 09:00 at x 340, 18:00 at x 1660.
const X0 = 340;
const DAY_END = 1660;
const PX_PER_H = (DAY_END - X0) / 9;
const hx = (h) => X0 + (h - 9) * PX_PER_H;

const LANE_H = 200;
const ME_TOP = 392;
const AGENTS_TOP = 632;
const AXIS_Y = 872;
const TICKS = [9, 12, 15, 18];
const PLAN_W = hx(12) - X0;

// S15's interrupted focus line, stretched over a whole day: prompt, wait, scroll, prompt…
const SPIKY = [
  [0, 34], [40, 30], [70, 168], [170, 174], [195, 44], [235, 40], [262, 172], [410, 178],
  [432, 56], [462, 52], [490, 164], [560, 170], [585, 36], [635, 34], [662, 176], [800, 172],
  [826, 60], [856, 58], [884, 168], [1000, 176], [1024, 42], [1070, 40], [1098, 172], [1200, 178],
  [1222, 54], [1252, 52], [1280, 170], [1320, 174],
];
// The same 28 points folded into one solid block: top edge left to right, bottom edge back.
const HALF = SPIKY.length / 2;
const BLOCK = SPIKY.map((_, i) =>
  i < HALF ? [(PLAN_W * i) / (HALF - 1), 20] : [PLAN_W - (PLAN_W * (i - HALF)) / (HALF - 1), 180],
);
const toPath = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y}`).join(' ');

// While I wait, the agent works in short bursts.
const BLIPS = [[70, 130], [262, 330], [490, 545], [662, 730], [884, 950], [1098, 1160], [1280, 1320]];
const UNITS = 8;
// The execute band runs past 18:00 and fades out before the safe-area edge.
const BAND_END = 1800;
const TAIL = BAND_END - DAY_END;
const UNIT_PITCH = 54;

const ME_BLOCKS = [
  { label: 'Review', from: 12.5, to: 14 },
  { label: 'Next plan', from: 14.5, to: 16.5 },
  { label: 'Client', from: 16.75, to: 18 },
];

// The sun rides a low arc over the day.
const SUN_X = [hx(9), hx(11.25), hx(13.5), hx(15.75), hx(18)];
const SUN_Y = [352, 338, 334, 338, 352];

function Sun({ buildStep }) {
  const travel = buildStep < 2;
  return (
    <motion.svg
      className="absolute left-0 top-0"
      width="80"
      height="80"
      viewBox="-40 -40 80 80"
      aria-hidden="true"
      style={{ marginLeft: -40, marginTop: -40 }}
      key={travel ? `sun-${buildStep}` : 'sun-rest'}
      initial={travel ? { x: SUN_X[0], y: SUN_Y[0] } : false}
      animate={{ x: travel ? SUN_X : SUN_X[4], y: travel ? SUN_Y : SUN_Y[4] }}
      transition={{ duration: buildStep === 0 ? 1.5 : 2.4, ease: 'easeInOut', delay: 0.3 }}
    >
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <line
            key={i}
            x1={Math.cos(a) * 27}
            y1={Math.sin(a) * 27}
            x2={Math.cos(a) * 37}
            y2={Math.sin(a) * 37}
            stroke={colors.amber}
            strokeWidth="6"
            strokeLinecap="round"
          />
        );
      })}
      <circle r="19" fill={colors.amber} />
    </motion.svg>
  );
}

function Lane({ top, label }) {
  return (
    <>
      <div
        className="absolute flex items-center text-[44px] font-bold leading-none text-ink"
        style={{ left: 120, top, height: LANE_H }}
      >
        {label}
      </div>
      <div className="absolute rounded-[24px] bg-[#EEEEF2]" style={{ left: X0, top, width: DAY_END - X0, height: LANE_H }} />
    </>
  );
}

function Axis() {
  return (
    <>
      <div className="absolute h-[4px] rounded-full bg-[#C9C9D2]" style={{ left: X0, top: AXIS_Y - 2, width: DAY_END - X0 }} />
      {TICKS.map((h) => (
        <div key={h} className="absolute" style={{ left: hx(h), top: AXIS_Y - 12 }}>
          <div className="mx-auto h-[24px] w-[4px] -translate-x-1/2 rounded-full bg-[#C9C9D2]" />
          <div className="absolute left-0 top-[34px] -translate-x-1/2 whitespace-nowrap font-mono text-[28px] font-semibold leading-none text-muted">
            {String(h).padStart(2, '0')}:00
          </div>
        </div>
      ))}
      {/* End of the working day */}
      <div
        className="absolute w-0 border-l-[4px] border-dashed border-[#C9C9D2]"
        style={{ left: DAY_END - 2, top: ME_TOP - 16, height: AXIS_Y - ME_TOP + 4 }}
      />
    </>
  );
}

function FocusShape({ planned }) {
  return (
    <svg
      className="absolute overflow-visible"
      style={{ left: X0, top: ME_TOP }}
      width={DAY_END - X0}
      height={LANE_H}
      viewBox={`0 0 ${DAY_END - X0} ${LANE_H}`}
      aria-hidden="true"
    >
      <motion.path
        fill={colors.teal}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ d: toPath(SPIKY), pathLength: 0, fillOpacity: 0, stroke: colors.coral }}
        animate={
          planned
            ? { d: toPath(BLOCK), pathLength: 1, fillOpacity: 1, stroke: colors.teal }
            : { d: toPath(SPIKY), pathLength: 1, fillOpacity: 0, stroke: colors.coral }
        }
        transition={{
          d: { duration: 0.9, ease: appleEase },
          pathLength: { duration: 1.5, ease: appleEase, delay: 0.3 },
          fillOpacity: { duration: 0.35, delay: planned ? 0.6 : 0 },
          stroke: { duration: 0.5 },
        }}
      />
    </svg>
  );
}

function PlanBlock() {
  return (
    <motion.div
      className="absolute flex items-center rounded-[24px] px-[36px] text-[40px] font-bold leading-none text-white"
      style={{ left: X0, top: ME_TOP + 16, width: PLAN_W, height: LANE_H - 32, background: colors.teal }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.3, delay: 0.85 }}
    >
      Plan · ~3 h
    </motion.div>
  );
}

function Blips() {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
      transition={{ duration: 0.4, delay: 1.0 }}
    >
      {BLIPS.map(([a, b]) => (
        <div
          key={a}
          className="absolute rounded-[12px] bg-[#9A9AA8]"
          style={{ left: X0 + a, top: AGENTS_TOP + 64, width: b - a, height: LANE_H - 128 }}
        />
      ))}
    </motion.div>
  );
}

function ExecuteBand() {
  const left = hx(12);
  const unitsLeft = 990;
  const fade = `linear-gradient(to right, #000 calc(100% - ${TAIL}px), transparent 100%)`;
  return (
    <motion.div
      className="absolute overflow-hidden rounded-l-[24px]"
      style={{
        left,
        top: AGENTS_TOP + 16,
        width: BAND_END - left,
        height: LANE_H - 32,
        background: colors.ink,
        transformOrigin: '0% 50%',
        WebkitMaskImage: fade,
        maskImage: fade,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 1.1, ease: appleEase, delay: 1.0 }}
    >
      <div className="absolute left-[36px] top-0 flex h-full items-center text-[40px] font-bold leading-none text-white">Execute</div>
      {Array.from({ length: UNITS }, (_, i) => (
        <motion.div
          key={i}
          className="absolute flex h-[44px] w-[44px] items-center justify-center rounded-[10px] border-[4px]"
          style={{ left: unitsLeft - left + i * UNIT_PITCH, top: (LANE_H - 32 - 44) / 2 }}
          initial={{ borderColor: 'rgba(255,255,255,0.45)', backgroundColor: 'rgba(30,158,106,0)' }}
          animate={{ borderColor: colors.green, backgroundColor: colors.green }}
          transition={{ duration: 0.25, delay: 1.9 + i * 0.14 }}
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...gentleSpring, delay: 1.9 + i * 0.14 }}
            className="flex"
          >
            <Check size={28} strokeWidth={4} color="#FFFFFF" />
          </motion.span>
        </motion.div>
      ))}
      <motion.div
        className="absolute top-0 flex h-full items-center gap-[12px] whitespace-nowrap text-[36px] font-semibold leading-none text-white"
        style={{ right: TAIL }}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: appleEase, delay: 2.0 }}
      >
        Overnight
        <ArrowRight size={40} strokeWidth={3} />
      </motion.div>
    </motion.div>
  );
}

function MeBlocks() {
  return ME_BLOCKS.map(({ label, from, to }, i) => (
    <motion.div
      key={label}
      className="absolute flex items-center justify-center whitespace-nowrap rounded-[20px] border-[5px] bg-surface text-[36px] font-semibold leading-none text-ink"
      style={{ left: hx(from), top: ME_TOP + 40, width: hx(to) - hx(from), height: LANE_H - 80, borderColor: colors.teal }}
      initial={{ opacity: 0, y: 24, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ ...gentleSpring, delay: 0.2 + i * 0.18 }}
    >
      {label}
    </motion.div>
  ));
}

export default function S27_PlanHours({ buildStep = 0 }) {
  const planned = buildStep >= 1;
  const free = buildStep >= 2;

  return (
    <SlideFrame>
      <Headline initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
        Plan for hours.
        <br />
        Let it run for hours.
      </Headline>

      <Lane top={ME_TOP} label="Me" />
      <Lane top={AGENTS_TOP} label="Agents" />
      <Axis />
      <Sun buildStep={buildStep} />

      <AnimatePresence>{!planned && <Blips key="blips" />}</AnimatePresence>
      <AnimatePresence>{planned && <ExecuteBand key="execute" />}</AnimatePresence>

      <FocusShape planned={planned} />
      <AnimatePresence>{planned && <PlanBlock key="plan" />}</AnimatePresence>
      <AnimatePresence>{free && <MeBlocks key="me" />}</AnimatePresence>
    </SlideFrame>
  );
}
