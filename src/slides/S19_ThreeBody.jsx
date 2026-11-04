import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, Mascot } from '../components/deck';

// Vertex centres (design px) and where the mascot stands (feet) when it reaches each one.
const CORNERS = [
  { label: 'The framework', x: 960, y: 300, stand: { x: 960, y: 580 } },
  { label: 'On time', x: 1500, y: 880, stand: { x: 1250, y: 800 } },
  { label: 'The budget', x: 420, y: 880, stand: { x: 670, y: 800 } },
];
const CENTRE = { x: 960, y: 790 };
const PILL_W = 400;
const PILL_H = 112;
const MASCOT = 210;
// Dimmed corners keep an opaque fill so the triangle stroke never shows through.
const DIM_BORDER = '#B4B4C0';
const DIM_TEXT = '#8A8A96';

// Each lap is slower than the last, until it settles at a crawl.
const hopDuration = (lap) => Math.min(0.7 + lap * 0.4, 2.1);
const restDuration = (lap) => Math.min(0.5 + lap * 0.25, 1.4);

const outline = `M ${CORNERS.map((c) => `${c.x} ${c.y}`).join(' L ')} Z`;

function useRun(running) {
  const [hop, setHop] = useState(0);
  useEffect(() => {
    if (!running) {
      setHop(0);
      return undefined;
    }
    const lap = Math.floor(hop / 3);
    const t = setTimeout(() => setHop((h) => h + 1), (hopDuration(lap) + restDuration(lap)) * 1000);
    return () => clearTimeout(t);
  }, [running, hop]);
  return hop;
}

export default function S19_ThreeBody({ buildStep = 0 }) {
  const running = buildStep === 1;
  const collapsed = buildStep >= 2;
  const hop = useRun(running);
  const lap = Math.floor(hop / 3);
  const target = hop % 3;
  const dur = hopDuration(lap);

  const feet = collapsed ? CENTRE : CORNERS[target].stand;
  const pose = collapsed ? 'meat-melt' : lap === 0 ? 'meat-onit' : 'meat-sweat';

  return (
    <SlideFrame>
      <Headline initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
        The three-body problem.
      </Headline>

      <svg className="absolute left-0 top-0" width="1920" height="1080" viewBox="0 0 1920 1080" aria-hidden="true">
        <motion.path
          d={outline}
          fill="#F1F1F4"
          stroke={colors.ink}
          strokeWidth="8"
          strokeLinejoin="round"
          initial={{ pathLength: 0, fillOpacity: 0 }}
          animate={{ pathLength: 1, fillOpacity: 1 }}
          transition={{ pathLength: { duration: 1.1, ease: appleEase }, fillOpacity: { duration: 0.6, delay: 0.6 } }}
        />
      </svg>

      {CORNERS.map((c, i) => {
        const lit = running && target === i;
        const dim = running && !lit;
        return (
          <motion.div
            key={c.label}
            className="absolute flex items-center justify-center rounded-full border-[6px] text-[48px] font-bold leading-none tracking-[-0.01em] whitespace-nowrap"
            style={{ left: c.x - PILL_W / 2, top: c.y - PILL_H / 2, width: PILL_W, height: PILL_H }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: lit ? 1.08 : 1,
              rotate: dim ? [-2.5, 2.5, -2.5] : 0,
              backgroundColor: lit ? colors.coral : colors.surface,
              borderColor: lit || collapsed ? colors.coral : dim ? DIM_BORDER : colors.ink,
              color: lit ? colors.surface : dim ? DIM_TEXT : colors.ink,
            }}
            transition={{
              default: { duration: 0.45, ease: appleEase, delay: lit ? dur * 0.8 : 0 },
              opacity: { duration: 0.45, ease: appleEase, delay: 0.5 + i * 0.12 },
              scale: lit ? gentleSpring : { duration: 0.5, ease: appleEase, delay: running ? 0 : 0.5 + i * 0.12 },
              rotate: dim ? { duration: 0.5 + i * 0.07, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 },
            }}
          >
            {c.label}
          </motion.div>
        );
      })}

      {buildStep >= 1 && (
        <motion.div
          className="absolute left-0 top-0"
          style={{ width: MASCOT, height: MASCOT, transformOrigin: '50% 100%' }}
          initial={{ x: CORNERS[0].stand.x - MASCOT / 2, y: CORNERS[0].stand.y - MASCOT, opacity: 0, scale: 0.6 }}
          animate={{ x: feet.x - MASCOT / 2, y: feet.y - MASCOT, opacity: 1, scale: collapsed ? 1.25 : 1 }}
          transition={{
            x: { duration: collapsed ? 1.1 : dur, ease: 'easeInOut' },
            y: { duration: collapsed ? 1.1 : dur, ease: 'easeInOut' },
            opacity: { duration: 0.3 },
            scale: collapsed ? { duration: 0.6, ease: appleEase, delay: 0.9 } : gentleSpring,
          }}
        >
          {/* Hop while running; a squash as it puddles. */}
          <motion.div
            key={collapsed ? 'melt' : 'run'}
            style={{ transformOrigin: '50% 100%' }}
            animate={
              collapsed
                ? { y: 0, scaleY: [1, 1, 0.78, 1.04, 1], scaleX: [1, 1, 1.16, 0.98, 1] }
                : { y: [0, -26, 0] }
            }
            transition={
              collapsed
                ? { duration: 1.6, times: [0, 0.55, 0.72, 0.86, 1], ease: 'easeOut' }
                : { duration: 0.32 + lap * 0.12, repeat: Infinity, ease: 'easeOut' }
            }
          >
            <Mascot pose={pose} preset="none" size={MASCOT} />
          </motion.div>
        </motion.div>
      )}
    </SlideFrame>
  );
}
