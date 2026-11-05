import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion';
import { SlideFrame, Headline, Kicker, Mascot } from '../components/deck';

// Day bar geometry (design px).
const BAR = { left: 120, top: 316, width: 1680, height: 240 };
const GAP = 8;

const TONES = {
  ink: 'bg-ink text-white',
  grey: 'bg-line text-ink',
  teal: 'bg-accent-teal text-white',
};

// Hours per segment: [before, now]. Zero means hidden.
const SEGMENTS = [
  { key: 'coding', hours: [4, 0.4], tone: 'ink' },
  { key: 'planning', label: 'Planning', hours: [0, 0.9], tone: 'teal' },
  { key: 'designing', label: 'Designing', hours: [0, 0.9], tone: 'teal' },
  { key: 'evaluating', label: 'Evaluating', hours: [0, 0.9], tone: 'teal' },
  { key: 'deciding', label: 'Deciding', hours: [0, 0.9], tone: 'teal' },
  { key: 'meetings', label: 'Meetings', hours: [1, 1], tone: 'grey' },
  { key: 'debugging', label: 'Debugging', hours: [1, 1], tone: 'grey' },
  { key: 'reviews', label: 'Reviews', hours: [1, 1], tone: 'grey' },
  { key: 'thinking', label: 'Thinking', hours: [1, 1], tone: 'grey' },
];

function layoutBar(state) {
  const visible = SEGMENTS.filter((s) => s.hours[state] > 0);
  const total = visible.reduce((sum, s) => sum + s.hours[state], 0);
  const unit = (BAR.width - GAP * (visible.length - 1)) / total;
  let x = 0;
  return SEGMENTS.map((s) => {
    const width = s.hours[state] * unit;
    const box = { left: x, width };
    if (width > 0) x += width + GAP;
    return box;
  });
}

function CodingLabel({ now }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      {now ? (
        <motion.span
          key="ai"
          className="text-[36px] font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          AI
        </motion.span>
      ) : (
        <motion.span
          key="coding"
          className="flex items-baseline gap-[20px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.15 } }}
        >
          <span className="text-[48px] font-bold tracking-[-0.01em]">Coding</span>
          <span className="text-[36px] font-medium text-white/75">~4 h</span>
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function DayBar({ now }) {
  const boxes = layoutBar(now ? 1 : 0);
  return (
    <motion.div
      className="absolute"
      style={BAR}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: appleEase, delay: 0.1 }}
    >
      {SEGMENTS.map((s, i) => {
        const shown = boxes[i].width > 0;
        return (
          <motion.div
            key={s.key}
            className={`absolute top-0 flex h-full items-center justify-center overflow-hidden rounded-[24px] ${TONES[s.tone]}`}
            initial={{ left: boxes[i].left, width: boxes[i].width, opacity: shown ? 1 : 0 }}
            animate={{ left: boxes[i].left, width: boxes[i].width, opacity: shown ? 1 : 0 }}
            transition={{
              duration: 0.9,
              ease: appleEase,
              opacity: { duration: 0.3, delay: shown ? 0.1 : 0.5 },
            }}
          >
            {s.key === 'coding' ? (
              <CodingLabel now={now} />
            ) : (
              <span className="min-w-0 overflow-hidden whitespace-nowrap px-[8px] text-[32px] font-semibold tracking-[-0.01em]">
                {s.label}
              </span>
            )}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

const MASCOT = 300;

function Identity({ decider }) {
  return (
    <motion.div
      className="absolute flex items-center gap-[56px]"
      style={{ left: 120, top: 616, height: MASCOT }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: appleEase, delay: 0.25 }}
    >
      <div className="relative shrink-0" style={{ width: MASCOT, height: MASCOT }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={decider ? 'think' : 'printer'}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.7, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 6, transition: { duration: 0.2 } }}
            transition={gentleSpring}
          >
            <Mascot pose={decider ? 'meat-think' : 'meat-printer'} preset="none" size={MASCOT} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ perspective: 1200 }}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={decider ? 'decider' : 'engineer'}
            className="whitespace-nowrap rounded-[28px] border-[5px] border-ink bg-surface px-[44px] py-[28px] text-sub"
            style={{ transformOrigin: '50% 50%' }}
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: 90, transition: { duration: 0.25, ease: 'easeIn' } }}
            transition={{ duration: 0.55, ease: appleEase }}
          >
            {decider ? (
              <span className="font-semibold text-ink">
                Product owner <span className="text-accent-teal">·</span> Project manager{' '}
                <span className="text-accent-teal">·</span> Decision maker
              </span>
            ) : (
              <span>
                <span className="font-bold text-ink">Engineer:</span>{' '}
                <span className="font-medium text-muted">writes the code</span>
              </span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function S24_RoleShift({ buildStep = 0 }) {
  const now = buildStep >= 1;
  const decider = buildStep >= 2;

  return (
    <SlideFrame>
      <Headline initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
        The role shift.
      </Headline>
      <Kicker variant="aside" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
        (no raise included)
      </Kicker>

      <DayBar now={now} />

      <Identity decider={decider} />
    </SlideFrame>
  );
}
