import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../theme.js';

// Exact geometry of the hero number. S28 and S38 b0 must match pixel for pixel.
export const THE_NUMBER = {
  text: '$25,000',
  top: 420,
  height: 240,
  fontSize: 240,
  fontWeight: 800,
  letterSpacing: '-0.03em',
  lineHeight: 1,
  color: colors.ink,
};

// Full-stage-width row, centred. Place it directly in a full-stage container (left 0 = stage x 0).
export default function TheNumber({ className = '', style, ...motionProps }) {
  const { text, top, height, fontSize, fontWeight, letterSpacing, lineHeight, color } = THE_NUMBER;
  return (
    <motion.div
      className={`absolute left-0 w-[1920px] whitespace-nowrap text-center font-sans ${className}`}
      style={{ top, height, fontSize, fontWeight, letterSpacing, lineHeight, color, ...style }}
      {...motionProps}
    >
      {text}
    </motion.div>
  );
}
