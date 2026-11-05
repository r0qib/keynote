import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { Mascot } from '../components/deck';

const MASCOT_SIZE = 640;

const textIn = (delay, y = 32) => ({
  initial: { opacity: 0, y, filter: 'blur(12px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, delay, ease: appleEase },
});

export default function S43_Thanks() {
  return (
    <div className="absolute inset-0 overflow-hidden text-ink">
      <div className="absolute inset-y-0 left-[120px] flex flex-col justify-center" style={{ width: 1040 }}>
        <motion.h1 className="font-black tracking-[-0.03em] whitespace-nowrap" style={{ fontSize: 192, lineHeight: 1 }} {...textIn(0.1, 56)}>
          Questions?
        </motion.h1>
        <motion.p className="text-sub font-medium text-muted" style={{ marginTop: 28 }} {...textIn(0.45)}>
          (Humans only.)
        </motion.p>
        <motion.p
          className="flex items-center gap-[20px] text-body font-semibold text-ink"
          style={{ marginTop: 88 }}
          {...textIn(1.1, 16)}
        >
          <span className="rounded-full shrink-0" style={{ width: 20, height: 20, background: colors.green }} />
          Session ended. Cache kept warm for 4:50.
        </motion.p>
      </div>

      {/* Hero: rises in on a spring, then a slow wave from the base. */}
      <Mascot
        pose="meat-wave"
        preset="none"
        size={MASCOT_SIZE}
        className="absolute"
        style={{ left: 1190, top: 540 - MASCOT_SIZE / 2 + 20, transformOrigin: '50% 92%' }}
        initial={{ opacity: 0, y: 160, scale: 0.9, rotate: 0 }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: [0, 6, -2, 6, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 0.2 },
          y: { ...gentleSpring, delay: 0.2 },
          scale: { ...gentleSpring, delay: 0.2 },
          rotate: { duration: 2, delay: 1.2, repeat: Infinity, repeatDelay: 1.2, ease: 'easeInOut' },
        }}
      />
    </div>
  );
}
