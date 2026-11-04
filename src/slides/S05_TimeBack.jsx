import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion.js';
import { colors } from '../theme.js';
import { Headline, Mascot, SlideFrame } from '../components/deck';

const DAYS = [
  { day: 'Mon', chore: 'CRUD APIs', time: '15 min' },
  { day: 'Tue', chore: 'Unit tests', time: '10 min' },
  { day: 'Wed', chore: 'Migrations', time: '12 min' },
  { day: 'Thu', chore: 'Regex', time: '1 min' },
  { day: 'Fri', chore: 'API docs', time: '5 min' },
];

// Calendar geometry (design px).
const PANEL_HEIGHT = 724;
const HEADER_HEIGHT = 80;
const BODY_PAD = 12;
const FULL_BLOCK = PANEL_HEIGHT - HEADER_HEIGHT - BODY_PAD * 2 - 4;
const SLIVER = 160;
const OPEN_TOP = HEADER_HEIGHT + BODY_PAD + SLIVER + 20;
const PANEL_INNER = 1676;
const MASCOT = 360;
// Build 2: the mascot shrinks to the right edge to make room for the question.
const MASCOT_SMALL = 0.62;
const MASCOT_SHIFT = PANEL_INNER - 48 - (MASCOT * MASCOT_SMALL) / 2 - PANEL_INNER / 2;

function ChoreBlock({ chore, time, shrunk, index }) {
  return (
    <motion.div
      className="flex flex-col justify-between rounded-[20px] border-[3px] px-[18px] py-[18px]"
      initial={false}
      animate={{
        height: shrunk ? SLIVER : FULL_BLOCK,
        backgroundColor: shrunk ? '#EEF7F2' : '#ECECF0',
        borderColor: shrunk ? colors.green : '#D2D2DA',
      }}
      transition={{ ...gentleSpring, delay: shrunk ? index * 0.06 : 0 }}
    >
      <span className="whitespace-nowrap text-[44px] font-bold leading-none tracking-[-0.01em] text-ink">{chore}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={shrunk ? 'after' : 'before'}
          className="self-start rounded-full px-[18px] py-[8px] font-mono text-[40px] font-semibold leading-none"
          style={{
            backgroundColor: shrunk ? colors.green : '#D9D9E0',
            color: shrunk ? '#FFFFFF' : colors.ink,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: appleEase }}
        >
          {shrunk ? time : '1 day'}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

export default function S05_TimeBack({ buildStep = 0 }) {
  const shrunk = buildStep >= 1;
  const asking = buildStep >= 2;

  return (
    <SlideFrame>
      <Headline
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
      >
        We got our time back.
      </Headline>

      <motion.div
        className="relative mt-auto overflow-hidden rounded-[32px] border-2 border-line bg-surface"
        style={{ height: PANEL_HEIGHT }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: appleEase }}
      >
        <div className="absolute inset-0 grid grid-cols-5">
          {DAYS.map((d, i) => (
            <div key={d.day} className="relative flex flex-col">
              {i > 0 && (
                <>
                  <div className="absolute left-0 top-0 w-[2px] bg-line" style={{ height: OPEN_TOP }} />
                  <motion.div
                    className="absolute bottom-0 left-0 w-[2px] bg-line"
                    style={{ top: OPEN_TOP }}
                    initial={false}
                    animate={{ opacity: shrunk ? 0 : 1 }}
                    transition={{ duration: 0.5, delay: shrunk ? 0.3 : 0, ease: appleEase }}
                  />
                </>
              )}
              <div
                className="flex items-center border-b-2 border-line px-[28px] font-mono text-label font-semibold uppercase tracking-[0.08em] text-muted"
                style={{ height: HEADER_HEIGHT }}
              >
                {d.day}
              </div>
              <div style={{ padding: BODY_PAD }}>
                <ChoreBlock chore={d.chore} time={d.time} shrunk={shrunk} index={i} />
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {asking && (
            <motion.p
              key="question"
              className="absolute left-[56px] flex items-center whitespace-nowrap text-headline text-accent-green"
              style={{ top: OPEN_TOP, bottom: 0 }}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: appleEase }}
            >
              …so what are we doing with it?
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {shrunk && (
            <motion.div
              key="mascot"
              className="absolute bottom-[36px]"
              style={{ left: (PANEL_INNER - MASCOT) / 2, originX: 0.5, originY: 1 }}
              initial={{ opacity: 0, y: 60, scale: 0.85 }}
              animate={{
                opacity: 1,
                y: 0,
                x: asking ? MASCOT_SHIFT : 0,
                scale: asking ? MASCOT_SMALL : 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ ...gentleSpring, delay: asking ? 0 : 0.45 }}
            >
              <Mascot pose="meat-cool" preset="blink" size={MASCOT} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </SlideFrame>
  );
}
