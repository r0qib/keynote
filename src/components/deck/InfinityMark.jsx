import React from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../../motion.js';
import { colors } from '../../theme.js';

// Lemniscate traced from the centre crossing, as [x, y] points around (0, 0).
// `loop` stretches the lobes vertically so it reads like a typeset ∞.
export function infinityPoints(width, count = 160, loop = 1.25) {
  const a = width / 2;
  return Array.from({ length: count }, (_, i) => {
    const t = Math.PI / 2 + (i / (count - 1)) * Math.PI * 2;
    const d = 1 + Math.sin(t) ** 2;
    return [(a * Math.cos(t)) / d, ((a * Math.sin(t) * Math.cos(t)) / d) * loop];
  });
}

// Points → "M x y L x y …" with fixed precision, so two point lists of equal length can morph.
export function pointsToPath(points, dx = 0, dy = 0) {
  return points.map(([x, y], i) => `${i ? 'L' : 'M'} ${(x + dx).toFixed(1)} ${(y + dy).toFixed(1)}`).join(' ');
}

export function infinitySize(width, stroke = 40, loop = 1.25) {
  return { width: width + stroke, height: Math.ceil(width * 0.3536 * loop + stroke) };
}

// A drawn ∞ that draws itself on. Pass motion props to move or fade the whole mark.
export default function InfinityMark({ width = 860, stroke = 40, color = colors.ink, delay = 0, duration = 1.6, className = '', style, ...motionProps }) {
  const size = infinitySize(width, stroke);
  const d = pointsToPath(infinityPoints(width), size.width / 2, size.height / 2);
  return (
    <motion.svg width={size.width} height={size.height} viewBox={`0 0 ${size.width} ${size.height}`} className={`block ${className}`} style={style} {...motionProps}>
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration, delay, ease: appleEase, opacity: { duration: 0.1, delay } }}
      />
    </motion.svg>
  );
}
