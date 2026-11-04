import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Mascot } from '../components/deck';

// My prompts, one per build. Heights are derived from the type so the stack can be laid out by hand.
const PROMPTS = [
  { lines: ['make it better'], size: 160, leading: 1.1, padY: 48, padX: 72, pose: 'meat-typing' },
  { lines: ['Make it better.', 'Make no mistakes.'], size: 120, leading: 1.1, padY: 48, padX: 60, pose: 'meat-sweat' },
  { lines: ['MAKE. NO.', 'MISTAKES.'], size: 180, leading: 1.0, padY: 48, padX: 60, pose: 'meat-fire', loud: true },
];
// Scale by age: the newest prompt is full size, older ones step back.
const AGE_SCALE = [1, 0.6, 0.45];
const GAP = 28;
const RIGHT = 1340; // right edge of the bubbles
const MASCOT = 300;

const heightOf = (p) => p.lines.length * p.size * p.leading + p.padY * 2;

// Top (design px) of each visible bubble, with the stack centred on the stage.
function layout(step) {
  const hs = PROMPTS.slice(0, step + 1).map((p, i) => heightOf(p) * AGE_SCALE[step - i]);
  const total = hs.reduce((a, b) => a + b, 0) + GAP * step;
  let y = 540 - total / 2;
  return hs.map((h) => {
    const top = y;
    y += h + GAP;
    return top;
  });
}

function Bubble({ prompt, top, scale }) {
  const { lines, size, leading, padY, padX, loud } = prompt;
  const old = scale < 1;
  let word = 0;
  return (
    <motion.div
      className="absolute rounded-[40px] border-[3px] tracking-[-0.02em] whitespace-nowrap"
      style={{
        right: 1920 - RIGHT,
        top: 0,
        padding: `${padY}px ${padX}px`,
        fontSize: size,
        lineHeight: leading,
        borderBottomRightRadius: 10,
        transformOrigin: '100% 0%',
        backgroundColor: loud ? colors.coral : colors.surface,
        borderColor: loud ? colors.coral : colors.line,
        fontWeight: loud ? 900 : 700,
      }}
      initial={{ opacity: 0, y: top + 60, scale: 0.85 }}
      animate={{
        opacity: 1,
        y: top,
        scale,
        color: loud ? colors.surface : old ? colors.muted : colors.ink,
        x: loud ? [0, 0, -16, 14, -10, 6, 0] : 0,
      }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{
        default: { duration: 0.7, ease: appleEase },
        x: loud ? { duration: 1.5, times: [0, 0.62, 0.7, 0.78, 0.86, 0.93, 1] } : { duration: 0.3 },
      }}
    >
      {lines.map((line) => (
        <span key={line} className="block">
          {loud
            ? line.split(' ').map((w, i) => {
                const delay = 0.25 + word++ * 0.22;
                return (
                  <motion.span
                    key={w}
                    className="inline-block"
                    style={{ marginLeft: i ? '0.28em' : 0 }}
                    initial={{ opacity: 0, scale: 1.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 26, delay }}
                  >
                    {w}
                  </motion.span>
                );
              })
            : line}
        </span>
      ))}
    </motion.div>
  );
}

export default function S21_MakeNoMistakes({ buildStep = 0 }) {
  const step = Math.min(buildStep, PROMPTS.length - 1);
  const tops = layout(step);
  const newest = PROMPTS[step];
  const mascotTop = tops[step] + heightOf(newest) - MASCOT;

  return (
    <SlideFrame>
      <AnimatePresence>
        {PROMPTS.slice(0, step + 1).map((p, i) => (
          <Bubble key={p.lines.join(' ')} prompt={p} top={tops[i]} scale={AGE_SCALE[step - i]} />
        ))}
      </AnimatePresence>

      <motion.div
        className="absolute left-0 top-0"
        style={{ x: RIGHT + 48 }}
        initial={{ opacity: 0, y: mascotTop + 40 }}
        animate={{ opacity: 1, y: mascotTop }}
        transition={{ duration: 0.7, ease: appleEase }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={newest.pose}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            transition={gentleSpring}
          >
            <Mascot pose={newest.pose} preset="blink" size={MASCOT} />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </SlideFrame>
  );
}
