import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, CodeWindow, infinityPoints, pointsToPath } from '../components/deck';

export default function S39_TheMorning({ buildStep = 0 }) {
  return (
    <>
      <SlideFrame>
        <Headline initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
          Access revoked.
        </Headline>
      </SlideFrame>

      <AnimatePresence mode="wait">
        {buildStep === 0 && <Morning key="morning" />}
        {buildStep === 1 && <Leaderboard key="leaderboard" />}
        {buildStep >= 2 && <Gauge key="gauge" />}
      </AnimatePresence>
    </>
  );
}

const EXIT = { opacity: 0, y: -24, transition: { duration: 0.35, ease: appleEase } };

// b0: the terminal refuses, and the missed email sits in the corner.
function Morning() {
  const lines = [
    { prompt: true, text: 'claude' },
    { error: true, text: 'Error: access denied for this account' },
    { prompt: true, text: 'claude' },
    { error: true, text: 'Error: access denied for this account' },
  ];
  return (
    <motion.div className="absolute inset-0" exit={EXIT}>
      <CodeWindow
        variant="terminal"
        title="~/wellbore-search"
        width={1240}
        className="absolute left-[120px] top-[292px]"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: appleEase, delay: 0.15 }}
      >
        <div className="text-[42px] leading-[64px]">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: line.error ? -10 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, ease: appleEase, delay: 0.5 + i * 0.35 }}
              className={line.error ? 'text-[#FF8A8D]' : ''}
            >
              {line.prompt && <span className="text-[#8FD19E]">$ </span>}
              {line.text}
            </motion.div>
          ))}
        </div>
      </CodeWindow>

      <motion.div
        className="absolute left-[1460px] top-[560px] w-[340px] flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.8, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...gentleSpring, delay: 2.0 }}
      >
        <div className="relative w-[260px] h-[184px]">
          <svg width="260" height="184" viewBox="0 0 260 184" aria-hidden>
            <rect x="8" y="16" width="232" height="160" rx="20" fill={colors.surface} stroke={colors.ink} strokeWidth="8" />
            <path d="M20 30 L124 108 L228 30" fill="none" stroke={colors.ink} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <motion.span
            className="absolute right-[-12px] top-[-14px] w-[72px] h-[72px] rounded-full bg-accent-coral text-white text-[40px] font-bold flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.15, 1] }}
            transition={{ duration: 0.5, ease: appleEase, delay: 2.4 }}
          >
            1
          </motion.span>
        </div>
        <span className="mt-[24px] text-body font-semibold text-muted whitespace-nowrap">Usage warning</span>
      </motion.div>
    </motion.div>
  );
}

const SLOTS = 10;
const PITCH = 58;
const ROW_H = 46;
const BAR_MAX = 900;
const OTHERS = [0.78, 0.7, 0.62, 0.55, 0.48, 0.42, 0.36, 0.3, 0.25];
const ME_FROM = { slot: 6, length: 0.39 };
const RISE_DELAY = 1.0;

// b1: anonymous top 10; one row climbs to the top.
function Leaderboard() {
  const rise = { ...gentleSpring, delay: RISE_DELAY };
  return (
    <motion.div
      className="absolute left-[240px] top-[236px] w-[1440px] h-[724px] rounded-[32px] bg-surface border-[3px] border-line shadow-[0_24px_60px_rgba(17,17,19,0.10)] px-[48px] pt-[32px]"
      data-mock
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={EXIT}
      transition={{ duration: 0.6, ease: appleEase }}
    >
      <div className="text-[44px] leading-[56px] font-bold">Top 10 users</div>
      <div className="relative mt-[28px]" style={{ height: SLOTS * PITCH }}>
        {Array.from({ length: SLOTS }, (_, i) => (
          <span key={i} className="absolute left-0 w-[56px] font-mono text-label font-semibold text-muted flex items-center" style={{ top: i * PITCH, height: ROW_H }}>
            {i + 1}
          </span>
        ))}

        {OTHERS.map((length, i) => {
          const from = i < ME_FROM.slot ? i : i + 1;
          return (
            <motion.span
              key={i}
              className="absolute left-[80px] rounded-full bg-[#D5DAE3]"
              style={{ height: ROW_H - 16, width: BAR_MAX * length, marginTop: 8 }}
              initial={{ y: from * PITCH }}
              animate={{ y: (i + 1) * PITCH }}
              transition={rise}
            />
          );
        })}

        <motion.div
          className="absolute left-[-24px] right-[-24px] rounded-[16px] flex items-center"
          style={{ height: ROW_H + 8, marginTop: -4 }}
          initial={{ y: ME_FROM.slot * PITCH, backgroundColor: 'rgba(252,239,239,0)' }}
          animate={{ y: 0, backgroundColor: 'rgba(252,239,239,1)' }}
          transition={rise}
        >
          <motion.span
            className="ml-[104px] rounded-full"
            style={{ height: ROW_H - 16 }}
            initial={{ width: BAR_MAX * ME_FROM.length, backgroundColor: '#D5DAE3' }}
            animate={{ width: BAR_MAX, backgroundColor: colors.coral }}
            transition={{ duration: 0.9, ease: appleEase, delay: RISE_DELAY + 0.1 }}
          />
          <motion.span
            className="ml-[32px] text-[40px] font-bold whitespace-nowrap"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: appleEase, delay: RISE_DELAY + 0.7 }}
          >
            me · $25,000
          </motion.span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Gauge geometry in the SVG box; the ∞ and the arc share a point count so `d` can morph.
const BOX = { left: 460, top: 220, width: 1000, height: 640 };
const POINTS = 160;
const HUB = { x: 500, y: 560 };
const RADIUS = 400;
const INFINITY_D = pointsToPath(infinityPoints(860, POINTS), 500, 330);
const ARC_D = pointsToPath(
  Array.from({ length: POINTS }, (_, i) => {
    const a = Math.PI - (i / (POINTS - 1)) * Math.PI;
    return [RADIUS * Math.cos(a), -RADIUS * Math.sin(a)];
  }),
  HUB.x,
  HUB.y,
);
const DANGER_D = `M ${HUB.x + RADIUS * Math.cos(Math.PI / 6)} ${HUB.y - RADIUS * Math.sin(Math.PI / 6)} A ${RADIUS} ${RADIUS} 0 0 1 ${HUB.x + RADIUS} ${HUB.y}`;
const TICKS = [150, 120, 90, 60, 30].map((deg) => {
  const a = (deg * Math.PI) / 180;
  const r1 = RADIUS - 56;
  const r2 = RADIUS - 92;
  return `M ${HUB.x + r1 * Math.cos(a)} ${HUB.y - r1 * Math.sin(a)} L ${HUB.x + r2 * Math.cos(a)} ${HUB.y - r2 * Math.sin(a)}`;
});
const NEEDLE = 290;
const SNAP = 1.0;

// b2: the ∞ snaps into a gauge with a needle. No numbers.
function Gauge() {
  return (
    <motion.div className="absolute" style={BOX} exit={EXIT}>
      <svg className="absolute inset-0" width={BOX.width} height={BOX.height} viewBox={`0 0 ${BOX.width} ${BOX.height}`} aria-hidden>
        <motion.path
          fill="none"
          stroke={colors.ink}
          strokeWidth="40"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ d: INFINITY_D, pathLength: 0 }}
          animate={{ d: ARC_D, pathLength: 1 }}
          transition={{ pathLength: { duration: 0.7, ease: appleEase }, d: { duration: 0.6, ease: appleEase, delay: SNAP } }}
        />
        <motion.path
          d={DANGER_D}
          fill="none"
          stroke={colors.coral}
          strokeWidth="40"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: appleEase, delay: SNAP + 0.6 }}
        />
        {TICKS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            stroke={colors.muted}
            strokeWidth="10"
            strokeLinecap="round"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: SNAP + 0.6 + i * 0.05 }}
          />
        ))}
      </svg>
      <motion.div
        className="absolute w-[16px] rounded-full bg-ink"
        style={{ left: HUB.x - 8, top: HUB.y - NEEDLE, height: NEEDLE + 8, originX: 0.5, originY: NEEDLE / (NEEDLE + 8) }}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: -38, opacity: 1 }}
        transition={{ rotate: { ...gentleSpring, delay: SNAP + 0.8 }, opacity: { duration: 0.2, delay: SNAP + 0.7 } }}
      />
      <motion.span
        className="absolute w-[68px] h-[68px] rounded-full bg-ink"
        style={{ left: HUB.x - 34, top: HUB.y - 34 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ ...gentleSpring, delay: SNAP + 0.6 }}
      />
    </motion.div>
  );
}
