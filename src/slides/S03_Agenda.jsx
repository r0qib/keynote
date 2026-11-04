import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion.js';
import { colors } from '../theme.js';
import { Headline } from '../components/deck';

// Widths roughly follow talk time (plan §2 minutes), with IV weighted up so IV and V are the widest.
// Fills are deepened act accents so white text stays at 4.5:1 or better.
const CHAPTERS = [
  { numeral: 'I', name: ['The', 'Good'], color: '#198559', weight: 5.5 },
  { numeral: 'II', name: ['The', 'Bad'], color: '#B06005', weight: 6.5 },
  { numeral: 'III', name: ['The', 'Ugly'], color: '#D04246', weight: 10 },
  { numeral: 'IV', name: ['Making', 'It Count'], color: colors.teal, weight: 11 },
  { numeral: 'V', name: ['How', 'We Work'], color: '#1A78C6', weight: 12.5 },
];
const FOCUS = 4;

const TRACK = { left: 120, top: 390, width: 1680, height: 480 };
const FRAME_INSET_X = 16;
const FRAME_TOP = 56;
const FRAME_HEIGHT = TRACK.height - FRAME_TOP * 2;
const GAP = 12;

const totalWeight = CHAPTERS.reduce((sum, c) => sum + c.weight, 0);
const frameSpace = TRACK.width - FRAME_INSET_X * 2 - GAP * (CHAPTERS.length - 1);
const FRAMES = CHAPTERS.reduce((acc, c) => {
  const prev = acc[acc.length - 1];
  const left = prev ? prev.left + prev.width + GAP : FRAME_INSET_X;
  return [...acc, { ...c, left, width: (frameSpace * c.weight) / totalWeight }];
}, []);

const HOLE = { width: 34, height: 22, pitch: 60 };
const HOLE_COUNT = Math.floor((TRACK.width - 40) / HOLE.pitch) + 1;
const HOLE_START = (TRACK.width - (HOLE_COUNT - 1) * HOLE.pitch - HOLE.width) / 2;

function Sprockets({ top }) {
  return Array.from({ length: HOLE_COUNT }, (_, i) => (
    <div
      key={i}
      className="absolute bg-canvas"
      style={{ left: HOLE_START + i * HOLE.pitch, top, width: HOLE.width, height: HOLE.height, borderRadius: 6 }}
    />
  ));
}

export default function S03_Agenda({ buildStep = 0 }) {
  const shown = buildStep >= 1;
  const focused = buildStep >= 2;

  return (
    <div className="absolute inset-0 overflow-hidden text-ink">
      <Headline
        className="absolute whitespace-nowrap"
        style={{ left: 120, top: 128 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: appleEase }}
      >
        Today's feature presentation.
      </Headline>

      <motion.div
        className="absolute bg-ink"
        style={{ ...TRACK, borderRadius: 24 }}
        initial={{ opacity: 0, scaleX: 0.94 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: appleEase }}
      >
        <Sprockets top={(FRAME_TOP - HOLE.height) / 2} />
        <Sprockets top={TRACK.height - FRAME_TOP + (FRAME_TOP - HOLE.height) / 2} />

        {FRAMES.map((f) => (
          <div
            key={`slot-${f.numeral}`}
            className="absolute"
            style={{ left: f.left, top: FRAME_TOP, width: f.width, height: FRAME_HEIGHT, borderRadius: 14, background: 'rgba(255, 255, 255, 0.07)' }}
          />
        ))}

        {FRAMES.map((f, i) => {
          const isFocus = i === FOCUS;
          const lifted = focused && isFocus;
          return (
            <motion.div
              key={f.numeral}
              className="absolute flex flex-col justify-between text-white"
              style={{
                left: f.left,
                top: FRAME_TOP,
                width: f.width,
                height: FRAME_HEIGHT,
                borderRadius: 14,
                padding: 22,
                background: f.color,
                zIndex: isFocus ? 1 : 0,
              }}
              initial={false}
              animate={{
                opacity: shown ? (focused && !isFocus ? 0.7 : 1) : 0,
                x: shown ? 0 : -64,
                y: lifted ? -24 : 0,
                scale: lifted ? 1.02 : 1,
                boxShadow: lifted
                  ? '0 0 0 4px rgba(255, 255, 255, 0.9), 0 28px 64px rgba(27, 126, 208, 0.5)'
                  : '0 0 0 0px rgba(255, 255, 255, 0), 0 0px 0px rgba(27, 126, 208, 0)',
              }}
              transition={
                focused
                  ? { ...gentleSpring, opacity: { duration: 0.5, ease: appleEase } }
                  : { duration: 0.7, delay: shown ? i * 0.12 : 0, ease: appleEase }
              }
            >
              <div className="font-black tracking-[-0.03em]" style={{ fontSize: 88, lineHeight: 1 }}>
                {f.numeral}
              </div>
              <div className="font-bold tracking-[-0.01em]" style={{ fontSize: 52, lineHeight: 1.05 }}>
                {f.name.map((line) => (
                  <div key={line} className="whitespace-nowrap">{line}</div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
