import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scissors } from 'lucide-react';
import { appleEase } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline } from '../components/deck';

// `cut`: the build a stage is snipped on (null = never).
const STAGES = [
  { name: 'Plan', w: 190, cut: 2 },
  { name: 'Spec', w: 190, cut: 2 },
  { name: 'Implement', w: 330, cut: null },
  { name: 'Review', w: 240, cut: 1 },
  { name: 'Test', w: 180, cut: 2 },
  { name: 'Docs', w: 190, cut: 1 },
  { name: 'QA', w: 150, cut: 2 },
];
const GAP = 24;
const TRACK_PAD = 28;
const LANE_TOP = 640;
const TRACK_H = 260;
const CHIP_H = 200;
const SOLO_SCALE = 1.45;

const BUDGET = [1, 0.6, 0.25, 0.08];

// Snip, drop, then the lane closes.
const SNIP = 0.45;
const CLOSE = 0.95;

const alive = (stage, build) => stage.cut === null || build < stage.cut;

// Chip centres (x) for the stages still in the lane at `build`, centred on the stage.
function laneLayout(build) {
  const kept = STAGES.filter((s) => alive(s, build));
  const scale = kept.length === 1 ? SOLO_SCALE : 1;
  const total = kept.reduce((sum, s) => sum + s.w, 0) + GAP * (kept.length - 1);
  let x = 960 - total / 2;
  const centres = {};
  kept.forEach((s) => {
    centres[s.name] = x + s.w / 2;
    x += s.w + GAP;
  });
  const height = CHIP_H * scale + (TRACK_H - CHIP_H);
  return { centres, width: total * scale + TRACK_PAD * 2, height, scale };
}

function Coin() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
      <circle cx="44" cy="44" r="42" fill={colors.ink} />
      <circle cx="44" cy="44" r="27" fill="none" stroke={colors.canvas} strokeWidth="6" />
    </svg>
  );
}

export default function S18_Elephant({ buildStep = 0 }) {
  const step = Math.min(buildStep, 3);
  const lane = laneLayout(step);
  const level = BUDGET[step];
  const solo = laneLayout(2);
  const soloChip = STAGES.find((s) => s.cut === null);

  return (
    <SlideFrame>
      <Headline initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
        The elephant in the room.
      </Headline>

      {/* Budget meter */}
      <div className="absolute left-0 top-[356px] w-[1920px] flex items-center justify-center gap-[32px]">
        <Coin />
        <div className="relative h-[88px] w-[1300px] rounded-full border-[5px] border-ink bg-surface p-[8px]">
          <motion.div
            className="h-full rounded-full"
            initial={false}
            animate={{ width: `${level * 100}%`, backgroundColor: level < 0.5 ? colors.coral : colors.ink }}
            transition={{ duration: 0.8, ease: appleEase }}
          />
        </div>
      </div>

      {/* Pipeline lane */}
      <div className="absolute left-0 w-[1920px]" style={{ top: LANE_TOP, height: TRACK_H }}>
        <motion.div
          className="absolute rounded-[48px] bg-[#EDEDF1]"
          initial={false}
          animate={{ left: 960 - lane.width / 2, width: lane.width, top: (TRACK_H - lane.height) / 2, height: lane.height }}
          transition={{ duration: 0.7, ease: appleEase, delay: CLOSE }}
        />

        {STAGES.map((s, i) => {
          const kept = alive(s, step);
          const x = kept ? lane.centres[s.name] : laneLayout(s.cut - 1).centres[s.name];
          return (
            <motion.div
              key={s.name}
              className="absolute flex items-center justify-center rounded-[32px] border-[3px] border-[#CFCFD8] bg-surface text-[48px] font-bold text-ink whitespace-nowrap"
              style={{ left: 0, top: (TRACK_H - CHIP_H) / 2, width: s.w, height: CHIP_H }}
              initial={false}
              animate={
                kept
                  ? { x: x - s.w / 2, y: 0, rotate: 0, opacity: 1, scale: lane.scale }
                  : { x: x - s.w / 2, y: 180, rotate: i % 2 ? 10 : -10, opacity: 0, scale: 1 }
              }
              transition={
                kept
                  ? { duration: 0.7, ease: appleEase, delay: CLOSE }
                  : { duration: 0.5, ease: [0.5, 0, 0.75, 0], delay: SNIP }
              }
            >
              {s.name}
            </motion.div>
          );
        })}

        <AnimatePresence>
          {STAGES.filter((s) => s.cut === step).map((s) => (
            <motion.div
              key={`snip-${s.name}`}
              className="absolute top-0"
              style={{ left: laneLayout(s.cut - 1).centres[s.name] - 44 }}
              initial={{ y: -140, opacity: 0 }}
              animate={{ y: [-140, 86, 86], opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, times: [0, 0.5, 1], ease: appleEase }}
            >
              <Scissors size={88} strokeWidth={2.5} color={colors.coral} style={{ transform: 'rotate(90deg)' }} />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Stamp on the lone chip's top-right corner, clear of its label. */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              key="stamp"
              data-overlap-ok
              className="absolute whitespace-nowrap rounded-[16px] border-[5px] border-accent-coral bg-surface px-[28px] py-[2px] text-[64px] font-black leading-[1.15] tracking-[-0.02em] text-accent-coral shadow-[0_12px_30px_rgba(17,17,19,0.12)]"
              style={{
                left: solo.centres[soloChip.name] + (soloChip.w * SOLO_SCALE) / 2 - 30,
                top: (TRACK_H - CHIP_H * SOLO_SCALE) / 2 - 10,
                x: '-50%',
                y: '-50%',
              }}
              initial={{ opacity: 0, scale: 2.2, rotate: -16 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 420, damping: 26 }}
            >
              One shot.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideFrame>
  );
}
