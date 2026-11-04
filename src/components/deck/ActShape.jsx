import React from 'react';
import { motion } from 'framer-motion';

// One soft organic shape per act (viewBox 1000 × 1000), shared by S01 and the chapter cards.
export const ACT_SHAPE_PATHS = {
  Good: 'M520 96 C742 104 914 268 906 498 C898 742 724 912 486 904 C252 896 92 728 98 494 C104 262 290 88 520 96 Z',
  Bad: 'M470 80 L612 168 L782 122 L838 300 L934 418 L842 560 L878 742 L700 790 L586 930 L438 842 L262 884 L210 704 L70 590 L170 446 L128 268 L306 222 Z',
  Ugly: 'M498 92 C690 80 880 210 898 420 C912 584 850 664 812 760 C790 818 802 900 760 912 C716 924 712 846 668 842 C622 838 632 948 572 950 C512 952 528 862 470 858 C400 854 356 916 290 878 C190 820 108 700 98 540 C86 300 290 104 498 92 Z',
  Count: 'M500 70 C640 210 880 380 880 600 C880 800 710 930 500 930 C290 930 120 800 120 600 C120 380 360 210 500 70 Z',
  How: 'M500 90 C726 90 910 274 910 500 C910 726 726 910 500 910 C274 910 90 726 90 500 C90 274 274 90 500 90 Z M500 300 C390 300 300 390 300 500 C300 610 390 700 500 700 C610 700 700 610 700 500 C700 390 610 300 500 300 Z',
};

const DRIFT = {
  animate: { x: [0, 36, -18, 0], y: [0, -28, 22, 0], rotate: [0, 5, -4, 0] },
  transition: { duration: 26, repeat: Infinity, ease: 'easeInOut' },
};

export default function ActShape({ act = 'Good', color, size = 1000, opacity = 0.16, drift = true, className = '', style }) {
  const d = ACT_SHAPE_PATHS[act] || ACT_SHAPE_PATHS.Good;
  return (
    <motion.svg
      viewBox="0 0 1000 1000"
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden="true"
      {...(drift ? DRIFT : {})}
    >
      <path d={d} fill={color} fillOpacity={opacity} fillRule="evenodd" />
    </motion.svg>
  );
}
