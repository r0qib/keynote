import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../../motion.js';
import { actAccent, STAGE_WIDTH, SAFE_AREA } from '../../theme.js';
import ActShape from './ActShape.jsx';

const NAME_MAX = 184;
const NAME_WIDTH = STAGE_WIDTH - SAFE_AREA.x * 2;

// Full-bleed chapter card: accent numeral + chapter name, one drifting act motif behind.
// The tinted canvas comes from the manifest `canvas`.
export default function ChapterCard({ numeral, name, act }) {
  const accent = actAccent(act);
  const nameRef = useRef(null);
  const [nameSize, setNameSize] = useState(NAME_MAX);

  // Shrink the name (never grow past NAME_MAX) so it always fits the safe-area width on one line.
  useLayoutEffect(() => {
    const fit = () => {
      const el = nameRef.current;
      if (!el || !el.offsetWidth) return;
      setNameSize((size) => Math.min(NAME_MAX, Math.floor((size * NAME_WIDTH) / el.offsetWidth)));
    };
    fit();
    document.fonts?.ready.then(fit);
  }, [name]);

  return (
    <div className="absolute inset-0 overflow-hidden text-ink">
      <motion.div
        className="absolute"
        style={{ right: -140, top: -10 }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: appleEase }}
      >
        <ActShape act={act} color={accent} size={1100} morph />
      </motion.div>

      <div className="absolute inset-0 px-safe-x flex flex-col justify-center">
        <motion.div
          className="font-black leading-none tracking-[-0.03em]"
          style={{ fontSize: 240, color: accent }}
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          {numeral}
        </motion.div>
        <motion.div
          ref={nameRef}
          className="self-start font-extrabold leading-[1.2] tracking-[-0.03em] whitespace-nowrap"
          style={{ fontSize: nameSize }}
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 0.9, delay: 0.25, ease: appleEase }}
        >
          {name}
        </motion.div>
      </div>
    </div>
  );
}
