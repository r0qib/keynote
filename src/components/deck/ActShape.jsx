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

// Second pose per act with the same command structure, so `d` can morph between them.
const ACT_SHAPE_ALT = {
  Good: 'M540 120 C770 92 930 300 892 522 C858 760 690 902 470 890 C240 878 110 700 120 470 C130 252 320 148 540 120 Z',
  Bad: 'M490 104 L620 190 L760 140 L850 320 L912 440 L826 572 L860 720 L712 812 L566 900 L450 860 L280 862 L226 690 L94 572 L188 430 L150 290 L320 200 Z',
  Ugly: 'M500 110 C700 96 870 230 884 440 C896 600 846 690 818 790 C800 850 812 960 764 968 C712 976 714 870 666 866 C620 862 628 980 566 984 C506 988 524 880 466 876 C396 872 350 940 284 900 C180 840 110 720 104 556 C96 316 296 122 500 110 Z',
  Count: 'M500 90 C660 220 870 400 866 610 C862 800 700 916 500 916 C300 916 136 800 134 610 C130 400 340 220 500 90 Z',
  How: 'M500 110 C736 104 900 280 896 500 C892 730 720 896 500 900 C270 904 104 722 108 500 C112 270 268 116 500 110 Z M500 320 C396 316 316 400 320 500 C324 604 404 684 500 680 C600 676 684 596 680 500 C676 400 596 324 500 320 Z',
};

const drift = (duration, delay) => ({
  animate: { x: [0, 36, -18, 0], y: [0, -28, 22, 0], rotate: [0, 5, -4, 0] },
  transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' },
});

const morph = (d, alt, duration, delay) => ({
  initial: { d },
  animate: { d: [d, alt, d] },
  transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' },
});

// A rare, small horizontal pixel-shift (about 0.3 s in every 7 s).
const GLITCH = {
  animate: { x: [0, 0, 14, -8, 4, 0, 0] },
  transition: { duration: 7, times: [0, 0.9, 0.915, 0.93, 0.945, 0.96, 1], repeat: Infinity, ease: 'linear' },
};

export default function ActShape({
  act = 'Good',
  color,
  size = 1000,
  opacity = 0.16,
  drift: driftOn = true,
  morph: morphOn = false,
  glitch = false,
  duration = 26,
  delay = 0,
  className = '',
  style,
}) {
  const d = ACT_SHAPE_PATHS[act] || ACT_SHAPE_PATHS.Good;
  const alt = ACT_SHAPE_ALT[act] || ACT_SHAPE_ALT.Good;
  const pathProps = morphOn ? morph(d, alt, duration * 0.9, delay) : { d };
  return (
    <motion.svg
      viewBox="0 0 1000 1000"
      width={size}
      height={size}
      className={`overflow-visible ${className}`}
      style={style}
      aria-hidden="true"
      {...(driftOn ? drift(duration, delay) : {})}
    >
      <motion.g {...(glitch ? GLITCH : {})}>
        <motion.path {...pathProps} fill={color} fillOpacity={opacity} fillRule="evenodd" />
      </motion.g>
    </motion.svg>
  );
}
