import React from 'react';
import { motion } from 'framer-motion';
import { typingDot } from '../../motion.js';

// Messaging-app typing indicator. `size` is the bubble width in design px.
export default function TypingBubble({ size = 160, color = '#E8E8EE', dotColor = '#4A4A55', tail = true, className = '', style, ...motionProps }) {
  const height = Math.round(size * 0.46);
  const dot = Math.round(size * 0.13);
  const gap = Math.round(size * 0.085);
  return (
    <motion.div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height, borderRadius: height / 2, backgroundColor: color, gap, ...style }}
      {...motionProps}
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block rounded-full"
          style={{ width: dot, height: dot, backgroundColor: dotColor }}
          {...typingDot(i, Math.max(4, Math.round(dot * 0.45)))}
        />
      ))}
      {tail && (
        <>
          <span
            className="absolute rounded-full"
            style={{ width: dot * 1.5, height: dot * 1.5, left: -dot * 0.1, bottom: -dot * 0.25, backgroundColor: color }}
          />
          <span
            className="absolute rounded-full"
            style={{ width: dot * 0.7, height: dot * 0.7, left: -dot * 0.75, bottom: -dot * 0.85, backgroundColor: color }}
          />
        </>
      )}
    </motion.div>
  );
}
