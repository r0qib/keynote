import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, Kicker, ChatTurn, ChatAvatar, TypingBubble } from '../components/deck';

// `build`: the build a human turn appears on. `reply`: the attempt an AI turn belongs to.
const TURNS = [
  { from: 'me', build: 0, text: 'Draw a circle.' },
  { from: 'ai', reply: 1, text: "Perfect! Here's your circle." },
  { from: 'me', build: 2, text: "That's a rectangle." },
  { from: 'ai', reply: 2, text: "You're absolutely right, my apologies!" },
  { from: 'me', build: 3, text: 'Just a circle.' },
  { from: 'ai', reply: 3, text: "You're right to push back." },
];

const STROKE = { stroke: colors.amber, strokeWidth: 8, strokeLinejoin: 'round', strokeLinecap: 'round', fill: 'rgba(217, 119, 6, 0.12)' };
const draw = (delay = 0) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { pathLength: { delay, duration: 0.9, ease: appleEase }, opacity: { delay, duration: 0.2 } },
});
const bolt = (delay) => ({
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { ...gentleSpring, delay },
  style: { transformBox: 'fill-box', transformOrigin: 'center' },
});

// Reveals the AI reply for `target` after a typing pause; going back is instant.
function useReply(target, delayMs) {
  const [shown, setShown] = useState(target);
  useEffect(() => {
    if (target <= shown) {
      setShown(target);
      return undefined;
    }
    const t = setTimeout(() => setShown(target), delayMs);
    return () => clearTimeout(t);
  }, [target]); // eslint-disable-line react-hooks/exhaustive-deps
  return shown;
}

function Attempt({ n }) {
  if (n === 1) return <motion.path d="M 120 180 L 480 180 L 480 420 L 120 420 Z" {...STROKE} {...draw(0.1)} />;
  if (n === 2) return <motion.path d="M 215 180 L 385 180 L 500 420 L 100 420 Z" {...STROKE} {...draw(0.1)} />;
  // The overshoot: a circle with everything bolted on.
  return (
    <g>
      <motion.circle cx="300" cy="300" r="130" {...STROKE} {...draw(0.1)} />
      <motion.g {...bolt(0.7)}>
        <path d="M 300 170 L 300 96" {...STROKE} fill="none" />
        <circle cx="300" cy="78" r="18" {...STROKE} />
      </motion.g>
      <motion.g {...bolt(0.85)}>
        <path d="M 430 300 L 464 300" {...STROKE} fill="none" />
        <rect x="464" y="256" width="88" height="88" rx="10" {...STROKE} />
      </motion.g>
      <motion.g {...bolt(1.0)}>
        <path d="M 170 300 L 136 300" {...STROKE} fill="none" />
        <path d="M 136 250 L 136 350 L 50 300 Z" {...STROKE} />
      </motion.g>
      <motion.g {...bolt(1.15)}>
        <path d="M 300 430 L 300 466" {...STROKE} fill="none" />
        <rect x="236" y="466" width="128" height="60" rx="10" {...STROKE} />
      </motion.g>
      <motion.g {...bolt(1.3)}>
        <path d="M 392 208 L 420 180" {...STROKE} fill="none" />
        <circle cx="440" cy="160" r="26" {...STROKE} />
      </motion.g>
    </g>
  );
}

// Mini glyph of each attempt, drawn inside its dart marker.
function Glyph({ n }) {
  const g = { stroke: '#FFFFFF', strokeWidth: 6, fill: 'none', strokeLinejoin: 'round', strokeLinecap: 'round', transform: 'scale(1.2)' };
  if (n === 1) return <rect x="-18" y="-13" width="36" height="26" {...g} />;
  if (n === 2) return <path d="M -9 -13 L 9 -13 L 19 13 L -19 13 Z" {...g} />;
  return (
    <>
      <circle cx="0" cy="3" r="12" {...g} />
      <path d="M 0 -9 L 0 -20 M 12 3 L 20 3 M -12 3 L -20 3" {...g} />
    </>
  );
}

const DART_R = 44;

// Each correction lands further from the bull.
const HITS = [
  { n: 1, r: 112, angle: -38 },
  { n: 2, r: 172, angle: 148 },
  { n: 3, r: 236, angle: 64 },
];

function Target() {
  const rings = [
    { r: 270, fill: '#EEEEF2' },
    { r: 210, fill: '#FFFFFF' },
    { r: 150, fill: '#EEEEF2' },
    { r: 90, fill: '#FFFFFF' },
  ];
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: appleEase }}
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
    >
      {rings.map(({ r, fill }) => (
        <circle key={r} cx="300" cy="300" r={r} fill={fill} stroke="#CFCFD8" strokeWidth="4" />
      ))}
      <circle cx="300" cy="300" r="34" fill={colors.amber} />
      {HITS.map(({ n, r, angle }, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 300 + r * Math.cos(rad);
        const y = 300 + r * Math.sin(rad);
        const delay = 0.6 + i * 0.4;
        return (
          <g key={n} transform={`translate(${x} ${y})`}>
            <motion.circle
              r={DART_R}
              fill="none"
              stroke={colors.ink}
              strokeWidth="6"
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
              transition={{ delay: delay + 0.15, duration: 0.6, ease: appleEase }}
            />
            <motion.g
              initial={{ scale: 2.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...gentleSpring, delay }}
            >
              <circle r={DART_R} fill={colors.ink} />
              <Glyph n={n} />
            </motion.g>
          </g>
        );
      })}
    </motion.g>
  );
}

export default function S12_Circle({ buildStep = 0 }) {
  const target = Math.min(buildStep, 3);
  const shown = useReply(target, target === 1 ? 1100 : 1300);
  const typing = shown < target;
  const showTarget = buildStep >= 4;

  const visible = TURNS.filter((t) => (t.from === 'me' ? buildStep >= t.build : shown >= t.reply));

  return (
    <SlideFrame>
      <Headline initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
        I asked for a circle.
      </Headline>
      <Kicker
        variant="aside"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase, delay: 0.15 }}
      >
        (Read: a simple architecture.)
      </Kicker>

      <div className="flex flex-1 min-h-0 gap-[64px] mt-[36px]">
        <div className="w-[920px] shrink-0 flex flex-col gap-[12px]">
          {visible.map((t) => (
            <ChatTurn
              key={t.text}
              from={t.from}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: appleEase }}
            >
              <span className="whitespace-nowrap">{t.text}</span>
            </ChatTurn>
          ))}
          <AnimatePresence>
            {typing && (
              <motion.div
                key={`typing-${target}`}
                className="self-start flex items-center gap-[20px]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                transition={{ duration: 0.35, ease: appleEase, delay: target === 1 ? 0.1 : 0.35 }}
              >
                <ChatAvatar from="ai" />
                <TypingBubble size={140} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.div
          className="flex-1 rounded-[36px] bg-surface border-2 border-line flex items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: appleEase, delay: 0.2 }}
        >
          <svg viewBox="0 0 600 600" width="620" height="620" aria-hidden="true">
            <AnimatePresence>
              {!showTarget && (
                <motion.circle
                  key="ghost"
                  cx="300"
                  cy="300"
                  r="200"
                  fill="none"
                  stroke="#CFCFD8"
                  strokeWidth="4"
                  strokeDasharray="14 12"
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                />
              )}
            </AnimatePresence>
            <AnimatePresence mode="wait">
              {showTarget ? (
                <Target key="target" />
              ) : (
                shown > 0 && (
                  <motion.g key={`attempt-${shown}`} exit={{ opacity: 0, transition: { duration: 0.25 } }}>
                    <Attempt n={shown} />
                  </motion.g>
                )
              )}
            </AnimatePresence>
          </svg>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
