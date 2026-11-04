import React from 'react';
import { motion } from 'framer-motion';
import { mascotPresets } from '../../motion.js';

const POSES = import.meta.glob('../../assets/meatproxy-emojis-svg/meat*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

export function mascotSrc(pose = 'meat') {
  return POSES[`../../assets/meatproxy-emojis-svg/${pose}.svg`];
}

// The mascot blob. `pose` is the SVG name (e.g. "meat-cool"); `preset` is bob | blink | wave | none.
export default function Mascot({ pose = 'meat', preset = 'bob', size = 320, className = '', style, ...motionProps }) {
  const loop = mascotPresets[preset] || mascotPresets.none;
  return (
    <motion.img
      src={mascotSrc(pose)}
      alt=""
      draggable={false}
      width={size}
      height={size}
      className={`block select-none ${className}`}
      style={{ transformOrigin: preset === 'wave' ? '50% 90%' : '50% 100%', ...style }}
      {...loop}
      {...motionProps}
    />
  );
}
