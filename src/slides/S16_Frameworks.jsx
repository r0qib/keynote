import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline } from '../components/deck';

const FRAMEWORKS = ['Spec Kit', 'AI-DLC', 'BMAD', 'OpenSpec'];

const PIVOT = { x: 960, y: 680 };
const HALF = 500; // pivot to each platform post
const BEAM = 16;
const POST = 56;
const PLATFORM_W = 620;
const PLATFORM_H = 20;
const LOAD_H = 240; // tallest load (the 2 × 2 framework cards)
const GROUP_H = LOAD_H + PLATFORM_H + POST;

// Beam angle per build: the frameworks outweigh, then tokens level it, then time tips it.
const TILT = [-6, 0, 6];
const TIP = { type: 'spring', stiffness: 140, damping: 20, mass: 1.2 };

const WEIGHTS = [
  { label: 'Tokens', build: 1, w: 300, h: 176, fill: colors.coral },
  { label: 'Time', build: 2, w: 220, h: 150, fill: colors.ink },
];

function Weight({ label, w, h, fill }) {
  const ring = 34;
  return (
    <div className="relative" style={{ width: w, height: h }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="absolute inset-0" aria-hidden="true">
        <circle cx={w / 2} cy={ring} r={ring - 10} fill="none" stroke={fill} strokeWidth="12" />
        <path d={`M ${w * 0.18} ${ring + 16} L ${w * 0.82} ${ring + 16} L ${w} ${h} L 0 ${h} Z`} fill={fill} strokeLinejoin="round" />
      </svg>
      <span
        className="absolute inset-x-0 bottom-0 flex items-center justify-center text-[44px] font-bold text-white whitespace-nowrap"
        style={{ height: h - ring - 16 }}
      >
        {label}
      </span>
    </div>
  );
}

// A platform on a post, riding the beam end. `side` is -1 (left) or 1 (right).
function Pan({ side, angle, children }) {
  const rad = (angle * Math.PI) / 180;
  const endX = PIVOT.x + side * HALF;
  return (
    <motion.div
      className="absolute flex flex-col items-center justify-end"
      style={{ left: endX - PLATFORM_W / 2, top: PIVOT.y - BEAM / 2 - GROUP_H, width: PLATFORM_W, height: GROUP_H }}
      initial={false}
      animate={{ x: -side * HALF * (1 - Math.cos(rad)), y: side * HALF * Math.sin(rad) }}
      transition={{ ...TIP, delay: 0.35 }}
    >
      <div className="flex items-end justify-center gap-[20px]" style={{ height: LOAD_H }}>
        {children}
      </div>
      <div className="w-full rounded-full bg-ink" style={{ height: PLATFORM_H }} />
      <div className="bg-ink" style={{ width: 12, height: POST }} />
    </motion.div>
  );
}

export default function S16_Frameworks({ buildStep = 0 }) {
  const step = Math.min(buildStep, 2);
  const angle = TILT[step];

  return (
    <SlideFrame>
      <Headline initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
        Proven. Thorough.{' '}
        <motion.span
          className="text-accent-coral"
          initial={false}
          animate={{ opacity: step >= 1 ? 1 : 0 }}
          transition={{ duration: 0.5, ease: appleEase, delay: step >= 1 ? 0.6 : 0 }}
        >
          Not cheap.
        </motion.span>
      </Headline>

      <div className="absolute inset-0 pointer-events-none">
        {/* Stand */}
        <svg width="1920" height="1080" className="absolute inset-0" aria-hidden="true">
          <path d={`M ${PIVOT.x} ${PIVOT.y} L ${PIVOT.x - 120} 930 L ${PIVOT.x + 120} 930 Z`} fill={colors.ink} strokeLinejoin="round" />
          <rect x={PIVOT.x - 230} y="922" width="460" height="24" rx="12" fill={colors.ink} />
        </svg>

        <motion.div
          className="absolute rounded-full bg-ink"
          style={{ left: PIVOT.x - HALF - 24, top: PIVOT.y - BEAM / 2, width: HALF * 2 + 48, height: BEAM }}
          initial={false}
          animate={{ rotate: angle }}
          transition={{ ...TIP, delay: 0.35 }}
        />
        <div
          className="absolute rounded-full bg-surface border-[8px] border-ink"
          style={{ left: PIVOT.x - 24, top: PIVOT.y - 24, width: 48, height: 48 }}
        />

        <Pan side={-1} angle={angle}>
          <div className="grid grid-cols-2 gap-[16px]">
            {FRAMEWORKS.map((name, i) => (
              <motion.div
                key={name}
                className="flex items-center justify-center rounded-[20px] border-2 border-line bg-surface text-[44px] font-bold text-ink shadow-[0_10px_30px_rgba(17,17,19,0.10)] whitespace-nowrap"
                style={{ width: 300, height: 112 }}
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...gentleSpring, delay: 0.25 + (3 - i) * 0.1 }}
              >
                {name}
              </motion.div>
            ))}
          </div>
        </Pan>

        <Pan side={1} angle={angle}>
          <AnimatePresence>
            {WEIGHTS.filter((wt) => step >= wt.build).map((wt) => (
              <motion.div
                key={wt.label}
                initial={{ opacity: 0, y: -280 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -120, transition: { duration: 0.3, ease: appleEase } }}
                transition={{ y: { type: 'spring', stiffness: 300, damping: 26 }, opacity: { duration: 0.2 } }}
              >
                <Weight {...wt} />
              </motion.div>
            ))}
          </AnimatePresence>
        </Pan>
      </div>
    </SlideFrame>
  );
}
