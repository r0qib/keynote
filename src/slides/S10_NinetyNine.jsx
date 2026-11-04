import React, { useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform } from 'framer-motion';
import { appleEase } from '../motion';

const SIZE = 680;
const C = SIZE / 2;
const R = 318;
const STROKE = 36;
const CIRC = 2 * Math.PI * R;
const SPLIT = 70;
// Start angle (deg clockwise from 12 o'clock) that centres the lost 70–99% segment at the bottom.
const START = 236;

const INK = '#111113';
const AMBER = '#D97706';
const CRACKED = '#B4B4C0';

// Point on the ring at `pct` of the way round from START.
function polar(r, pct) {
  const a = ((START + pct * 3.6) * Math.PI) / 180;
  return [C + r * Math.sin(a), C - r * Math.cos(a)];
}

// Zigzag crack across the stroke band at `pct`.
function crackPath(pct) {
  const pts = [
    polar(R + 22, pct),
    polar(R + 8, pct + 0.9),
    polar(R - 4, pct - 0.6),
    polar(R - 22, pct + 0.5),
  ];
  return pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');
}

const CRACKS = [crackPath(80), crackPath(91)];

export default function S10_NinetyNine({ buildStep = 0 }) {
  const split = buildStep >= 1;
  const value = useMotionValue(0);
  const label = useTransform(value, (v) => Math.round(v));
  const kept = useTransform(value, (v) => `${(CIRC * Math.min(v, SPLIT)) / 100} ${CIRC}`);
  const lost = useTransform(value, (v) => `0 ${(CIRC * SPLIT) / 100} ${(CIRC * Math.max(v - SPLIT, 0)) / 100} ${CIRC}`);

  useEffect(() => {
    const controls = animate(value, 99, { duration: 1.1, delay: 0.15, ease: appleEase });
    return () => controls.stop();
  }, [value]);

  return (
    <div className="absolute inset-0 text-ink">
      <motion.div
        className="absolute"
        style={{ left: 960 - C, top: 540 - C, width: SIZE, height: SIZE }}
        initial={false}
        animate={split ? { x: -440, scale: 0.82 } : { x: 0, scale: 1 }}
        transition={{ duration: 0.9, ease: appleEase, delay: split ? 0.3 : 0 }}
      >
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="absolute inset-0 overflow-visible">
          <motion.circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            stroke="#ECECF1"
            strokeWidth={STROKE}
            initial={false}
            animate={{ opacity: split ? 0 : 1 }}
            transition={{ duration: 0.5, delay: split ? 0.3 : 0 }}
          />
          <motion.circle
            cx={C}
            cy={C}
            r={R}
            fill="none"
            strokeWidth={STROKE}
            transform={`rotate(${START - 90} ${C} ${C})`}
            style={{ strokeDasharray: kept }}
            initial={false}
            animate={{ stroke: split ? AMBER : INK }}
            transition={{ duration: 0.5, delay: split ? 0.3 : 0 }}
          />
          <motion.g
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            initial={false}
            animate={split ? { x: -20, y: 170, rotate: 6, opacity: 0.5 } : { x: 0, y: 0, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: appleEase, delay: split ? 0.3 : 0 }}
          >
            <motion.circle
              cx={C}
              cy={C}
              r={R}
              fill="none"
              strokeWidth={STROKE}
              transform={`rotate(${START - 90} ${C} ${C})`}
              style={{ strokeDasharray: lost }}
              initial={false}
              animate={{ stroke: split ? CRACKED : INK }}
              transition={{ duration: 0.3 }}
            />
            {CRACKS.map((d) => (
              <motion.path
                key={d}
                d={d}
                fill="none"
                stroke="#FAFAFB"
                strokeWidth={6}
                strokeLinejoin="round"
                initial={false}
                animate={{ pathLength: split ? 1 : 0, opacity: split ? 1 : 0 }}
                transition={{ duration: 0.3, ease: appleEase }}
              />
            ))}
          </motion.g>
        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-extrabold tracking-[-0.04em] leading-none tabular-nums" style={{ fontSize: 240 }}>
            <motion.span>{label}</motion.span>
            <span style={{ fontSize: 120 }}>%</span>
          </span>
        </div>
      </motion.div>

      {split && (
        <motion.div
          className="absolute left-[880px] top-[540px] font-extrabold leading-[1.02] tracking-[-0.03em]"
          style={{ fontSize: 120, y: '-50%' }}
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: appleEase, delay: 0.55 }}
        >
          <div>
            of <span className="text-accent-amber">70%</span>
          </div>
          <div>of the time.</div>
        </motion.div>
      )}
    </div>
  );
}
