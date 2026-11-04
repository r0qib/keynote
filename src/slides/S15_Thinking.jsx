import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, gentleSpring, typingDot } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, TypingBubble, Mascot } from '../components/deck';

// Bubble geometry mirrors TypingBubble at size 400 (dot 13%, gap 8.5%).
const BUBBLE = 400;
const BUBBLE_H = Math.round(BUBBLE * 0.46);
const BIG_DOT = Math.round(BUBBLE * 0.13);
const BIG_STEP = BIG_DOT + Math.round(BUBBLE * 0.085);
const CENTER = { x: 960, y: 540 };

// The ellipsis at the end of the headline.
const DOT = 18;
const DOT_STEP = 30;

// One hour of chat-driven development, 28 px per minute across 1680 px.
const LANE_W = 1680;
const LANE_H = 280;
const LANE_TOP = 640;
const LANE_LIFT = 120; // b1 sits higher until the focus chart arrives
const SEGMENTS = [
  { kind: 'work', x: 0, w: 84 },
  { kind: 'phone', x: 84, w: 308 },
  { kind: 'work', x: 392, w: 112 },
  { kind: 'coffee', x: 504, w: 616 },
  { kind: 'work', x: 1120, w: 84 },
  { kind: 'tab', x: 1204, w: 476 },
];
const FOCUS_PATH =
  'M 0 60 L 84 60 L 150 235 L 392 240 L 420 95 L 504 95 L 570 255 L 1120 258 L 1148 130 L 1204 130 L 1270 275 L 1680 278';
const PEAKS = [
  [42, 60],
  [448, 95],
  [1162, 130],
];

// Position of `el` inside `root` in layout (design) px, unaffected by the stage scale.
function offsetWithin(el, root) {
  let x = 0;
  let y = 0;
  let node = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent;
  }
  return node === root ? { x, y } : null;
}

function Phone() {
  return (
    <svg width="130" height="210" viewBox="0 0 104 168" aria-hidden="true">
      <rect x="4" y="4" width="96" height="160" rx="18" fill="#FFFFFF" stroke={colors.ink} strokeWidth="5" />
      <rect x="20" y="24" width="64" height="44" rx="8" fill="#CFCFD8" />
      <rect x="20" y="78" width="64" height="44" rx="8" fill="#CFCFD8" />
      <rect x="20" y="132" width="40" height="10" rx="5" fill="#CFCFD8" />
    </svg>
  );
}

function BrowserTab() {
  return (
    <svg width="300" height="202" viewBox="0 0 232 156" aria-hidden="true">
      <rect x="4" y="4" width="224" height="148" rx="16" fill="#FFFFFF" stroke={colors.ink} strokeWidth="5" />
      <path d="M 4 40 L 228 40" stroke={colors.ink} strokeWidth="5" />
      <circle cx="26" cy="22" r="6" fill={colors.ink} />
      <circle cx="46" cy="22" r="6" fill={colors.ink} />
      <rect x="24" y="58" width="80" height="74" rx="8" fill="#CFCFD8" />
      <rect x="120" y="60" width="88" height="12" rx="6" fill="#CFCFD8" />
      <rect x="120" y="86" width="72" height="12" rx="6" fill="#CFCFD8" />
      <rect x="120" y="112" width="84" height="12" rx="6" fill="#CFCFD8" />
    </svg>
  );
}

function Segment({ kind, x, w, i }) {
  const isWork = kind === 'work';
  return (
    <motion.div
      className="absolute top-0 h-full flex items-center justify-center"
      style={{ left: x, width: w, backgroundColor: isWork ? colors.blue : '#ECECF1', borderLeft: i ? '4px solid #FAFAFB' : 'none' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: appleEase, delay: 0.45 + i * 0.08 }}
    >
      {kind === 'phone' && <Phone />}
      {kind === 'tab' && <BrowserTab />}
      {kind === 'coffee' && (
        <Mascot
          pose="meat-coffee"
          preset="none"
          size={240}
          initial={{ opacity: 0, scale: 0.8, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ ...gentleSpring, delay: 0.8 }}
        />
      )}
    </motion.div>
  );
}

function FocusChart() {
  return (
    <motion.div
      className="absolute left-[120px] top-[290px]"
      style={{ width: LANE_W, height: 300 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.25 } }}
      transition={{ duration: 0.3 }}
    >
      <span className="absolute left-0 top-[-4px] text-[32px] leading-[1.2] font-semibold text-muted">Focus</span>
      <svg width={LANE_W} height="300" viewBox={`0 0 ${LANE_W} 300`} className="overflow-visible" aria-hidden="true">
        <motion.path
          d={FOCUS_PATH}
          fill="none"
          stroke={colors.coral}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3, ease: appleEase, delay: 0.35 }}
        />
        {PEAKS.map(([cx, cy], i) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy={cy}
            r="14"
            fill={colors.blue}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ ...gentleSpring, delay: 0.4 + i * 0.35 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}
      </svg>
      <motion.span
        className="absolute left-[1300px] top-[118px] whitespace-nowrap rounded-full border-[3px] border-accent-coral bg-surface px-[28px] py-[10px] font-mono text-body font-bold text-accent-coral"
        initial={{ opacity: 0, y: -16, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...gentleSpring, delay: 1.5 }}
      >
        context rot
      </motion.span>
    </motion.div>
  );
}

export default function S15_Thinking({ buildStep = 0 }) {
  const rootRef = useRef(null);
  const dotsRef = useRef(null);
  const [box, setBox] = useState(null);
  const [live, setLive] = useState(false);
  const bubble = buildStep === 0;
  const showChart = buildStep >= 2;

  useLayoutEffect(() => {
    const measure = () => setBox(offsetWithin(dotsRef.current, rootRef.current));
    measure();
    document.fonts?.ready.then(measure);
  }, []);

  // Place the dots without animating until the first measurement has painted.
  useEffect(() => {
    if (!box || live) return undefined;
    const id = requestAnimationFrame(() => setLive(true));
    return () => cancelAnimationFrame(id);
  }, [box, live]);

  const dotTarget = (i) => {
    if (!bubble || !box) return { x: 0, y: 0, scale: 1 };
    return {
      x: CENTER.x + (i - 1) * BIG_STEP - (box.x + i * DOT_STEP + DOT / 2),
      y: CENTER.y - (box.y + DOT / 2),
      scale: BIG_DOT / DOT,
    };
  };

  return (
    <div ref={rootRef} className="absolute inset-0">
      <AnimatePresence>
        {bubble && (
          <motion.div
            key="bubble"
            className="absolute"
            style={{ left: CENTER.x - BUBBLE / 2, top: CENTER.y - BUBBLE_H / 2 }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.45, ease: appleEase } }}
            transition={{ duration: 0.6, ease: appleEase }}
          >
            <TypingBubble
              size={BUBBLE}
              dots={false}
              animate={{ scale: [1, 1.025, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <SlideFrame>
        <Headline className="whitespace-nowrap" style={{ fontSize: 112 }}>
          <motion.span
            className="inline-block"
            initial={false}
            animate={bubble ? { opacity: 0, x: -24 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: appleEase, delay: bubble ? 0 : 0.35 }}
          >
            Doomscrolling
          </motion.span>
          <span
            ref={dotsRef}
            className="relative inline-block ml-[10px]"
            style={{ width: DOT_STEP * 2 + DOT, height: DOT }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="absolute top-0 block"
                style={{ left: i * DOT_STEP, width: DOT, height: DOT, opacity: box ? 1 : 0 }}
                initial={false}
                animate={dotTarget(i)}
                transition={live ? { duration: 0.9, ease: appleEase, delay: i * 0.04 } : { duration: 0 }}
              >
                <motion.span
                  className="block w-full h-full rounded-full"
                  style={{ backgroundColor: bubble ? colors.muted : colors.coral, transition: 'background-color 0.6s' }}
                  {...(bubble
                    ? typingDot(i, 8)
                    : { animate: { y: 0, opacity: 1 }, transition: { duration: 0.3 } })}
                />
              </motion.span>
            ))}
          </span>
        </Headline>
      </SlideFrame>

      <AnimatePresence>{showChart && <FocusChart key="chart" />}</AnimatePresence>

      <AnimatePresence>
        {!bubble && (
          <motion.div
            key="timeline"
            className="absolute left-[120px]"
            style={{ top: LANE_TOP, width: LANE_W }}
            initial={{ opacity: 0, y: 40 - LANE_LIFT }}
            animate={{ opacity: 1, y: showChart ? 0 : -LANE_LIFT }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.8, ease: appleEase, delay: showChart ? 0 : 0.4 }}
          >
            <div className="relative overflow-hidden rounded-[32px]" style={{ width: LANE_W, height: LANE_H }}>
              {SEGMENTS.map((seg, i) => (
                <Segment key={seg.x} {...seg} i={i} />
              ))}
            </div>
            <div className="relative mt-[16px] h-[36px] font-mono text-label text-muted">
              <span className="absolute left-0">0</span>
              <span className="absolute left-1/2 -translate-x-1/2">30</span>
              <span className="absolute right-0">60 min</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
