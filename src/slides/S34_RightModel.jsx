import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, WorkflowMiniMap } from '../components/deck';

const LEVELS = ['low', 'medium', 'high', 'max'];
// The visible tiers are centred in the content area (y 300–984) and settle upward as tiers arrive.
const AREA = { top: 300, height: 684 };
const TIER = { height: 216, gap: 18 };
const SLIDER = { left: 1090, width: 540, trackY: 118 };
const BASE_LEVEL = 1; // medium
const LEVEL_INK = '#3A3A44';

// level: where the slider lands when the task arrives (build 3).
const TIERS = [
  { name: 'Opus', power: 3, jobs: ['Plan', 'Decide', 'Design', 'Review'], task: 'Architecture', level: 3 },
  { name: 'Sonnet', power: 2, jobs: ['Implement', 'Unit tests'], task: 'Complex feature', level: 2 },
  { name: 'Haiku', power: 1, jobs: ['Run scripts', 'Commit', 'Clean up'], task: 'Scripted chore', level: 0 },
];

const levelX = (level) => (level / (LEVELS.length - 1)) * SLIDER.width;

function tierTop(i, visible) {
  const stack = visible * TIER.height + (visible - 1) * TIER.gap;
  return AREA.top + (AREA.height - stack) / 2 + i * (TIER.height + TIER.gap);
}

function PowerBars({ power }) {
  return (
    <div className="flex items-end gap-[8px]">
      {[28, 44, 60].map((h, i) => (
        <span key={h} className="block w-[14px] rounded-full" style={{ height: h, background: i < power ? colors.blue : '#D4D4DC' }} />
      ))}
    </div>
  );
}

function TaskTag({ text, level, i }) {
  // Centred over its level; pinned to the column edge at either end.
  const last = LEVELS.length - 1;
  const pos = level === 0 ? { left: -20 } : level === last ? { right: -20 } : { left: levelX(level) };
  const centred = level !== 0 && level !== last;
  return (
    <div className={`absolute top-[16px] ${centred ? '-translate-x-1/2' : ''}`} style={pos}>
      <motion.div
        className="flex h-[64px] items-center whitespace-nowrap rounded-[32px] border-[4px] bg-tint-how px-[26px] text-[36px] font-semibold leading-none"
        style={{ borderColor: colors.blue, color: colors.blue }}
        initial={{ opacity: 0, x: 160, y: -24 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ ...gentleSpring, delay: 0.15 + i * 0.22 }}
      >
        {text}
      </motion.div>
    </div>
  );
}

function EffortSlider({ level, moved, task, i }) {
  const current = moved ? level : BASE_LEVEL;
  const x = levelX(current);
  const transition = { type: 'spring', stiffness: 220, damping: 24, delay: moved ? 0.55 + i * 0.22 : 0 };
  return (
    <div className="absolute top-0 h-full" style={{ left: SLIDER.left, width: SLIDER.width }}>
      <AnimatePresence>{moved && <TaskTag key="tag" text={task} level={level} i={i} />}</AnimatePresence>

      <div className="absolute left-0 right-0 h-[18px] rounded-full bg-[#E4E4EA]" style={{ top: SLIDER.trackY - 9 }} />
      <motion.div
        className="absolute left-0 h-[18px] rounded-full"
        style={{ top: SLIDER.trackY - 9, background: colors.blue }}
        initial={false}
        animate={{ width: x }}
        transition={transition}
      />
      {LEVELS.map((name, l) => (
        <div key={name} className="absolute flex flex-col items-center" style={{ left: levelX(l), top: SLIDER.trackY - 15, transform: 'translateX(-50%)' }}>
          <span className="block h-[30px] w-[6px] rounded-full bg-[#C4C4CE]" />
          <motion.span
            className="mt-[14px] whitespace-nowrap text-[30px] font-semibold leading-none"
            initial={false}
            animate={{ color: l === current ? colors.blue : LEVEL_INK }}
            transition={{ duration: 0.3, delay: transition.delay + 0.2 }}
          >
            {name}
          </motion.span>
        </div>
      ))}
      <motion.span
        className="absolute block h-[56px] w-[56px] rounded-full border-[6px] bg-surface shadow-[0_6px_16px_rgba(17,17,19,0.16)]"
        style={{ top: SLIDER.trackY - 28, left: -28, borderColor: colors.blue }}
        initial={false}
        animate={{ x }}
        transition={transition}
      />
    </div>
  );
}

function Tier({ tier, i, visible, moved }) {
  const { name, power, jobs, task, level } = tier;
  const top = tierTop(i, visible);
  return (
    <motion.div
      className="absolute rounded-[36px] border-[4px] border-[#D4D4DC] bg-surface"
      style={{ left: 120, width: 1680, height: TIER.height }}
      initial={{ opacity: 0, x: -60, top }}
      animate={{ opacity: 1, x: 0, top }}
      transition={{ duration: 0.7, ease: appleEase, top: gentleSpring }}
    >
      <div className="absolute left-[44px] top-0 flex h-full items-center gap-[24px]">
        <PowerBars power={power} />
        <span className="text-[56px] font-extrabold leading-none tracking-[-0.02em] text-ink">{name}</span>
      </div>

      <div className="absolute left-[340px] top-0 flex h-full items-center gap-[14px]">
        {jobs.map((job, j) => (
          <motion.span
            key={job}
            className="flex h-[80px] items-center whitespace-nowrap rounded-full bg-[#F0F0F3] px-[24px] text-[36px] font-semibold leading-none text-ink"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: appleEase, delay: 0.25 + j * 0.08 }}
          >
            {job}
          </motion.span>
        ))}
      </div>

      <EffortSlider level={level} moved={moved} task={task} i={i} />
    </motion.div>
  );
}

export default function S34_RightModel({ buildStep = 0 }) {
  const moved = buildStep >= 3;
  const visible = Math.min(buildStep + 1, TIERS.length);
  return (
    <SlideFrame>
      <WorkflowMiniMap active="Orchestrate" />
      <Headline
        className="mt-[84px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
      >
        Right model. Right effort.
      </Headline>

      {TIERS.map((tier, i) => i <= buildStep && <Tier key={tier.name} tier={tier} i={i} visible={visible} moved={moved} />)}
    </SlideFrame>
  );
}
