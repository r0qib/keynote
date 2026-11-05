import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../../motion.js';
import { actAccent, STAGE_WIDTH, SAFE_AREA } from '../../theme.js';
import ActShape from './ActShape.jsx';

const NAME_MAX = 184;
const NAME_WIDTH = STAGE_WIDTH - SAFE_AREA.x * 2;
const SHAPE_SIZE = 1100;
const SHAPE_RIGHT = -140;
// The motif's visible edge sits ~9% inside its box; keep it this far clear of the title (drift included).
const SHAPE_INSET = SHAPE_SIZE * 0.09;
const SHAPE_CLEAR = 100;

// Full-bleed chapter card: accent numeral + chapter name, one drifting act motif behind.
// Features rich cinematic backdrop glow and prominent contrast for act transition.
export default function ChapterCard({ numeral, name, act }) {
  const accent = actAccent(act);
  const nameRef = useRef(null);
  const [nameSize, setNameSize] = useState(NAME_MAX);
  const [shapeRight, setShapeRight] = useState(SHAPE_RIGHT);

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

  // Push the motif right (bleeding off the stage) when a long title would run into it.
  useLayoutEffect(() => {
    const place = () => {
      const el = nameRef.current;
      if (!el) return;
      const titleRight = el.offsetLeft + el.offsetWidth;
      const maxRight = STAGE_WIDTH - SHAPE_SIZE + SHAPE_INSET - titleRight - SHAPE_CLEAR;
      setShapeRight(Math.min(SHAPE_RIGHT, maxRight));
    };
    place();
    document.fonts?.ready.then(place);
  }, [nameSize]);

  return (
    <div className="absolute inset-0 overflow-hidden text-ink">
      {/* Dynamic ambient backdrop illumination for contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 75% 45%, ${accent}1F 0%, transparent 70%), radial-gradient(circle at 18% 50%, ${accent}0D 0%, transparent 60%)`,
        }}
      />

      <motion.div
        className="absolute"
        style={{ right: shapeRight, top: -10 }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: appleEase }}
      >
        <ActShape act={act} color={accent} size={SHAPE_SIZE} opacity={0.24} morph />
      </motion.div>

      <div className="absolute inset-0 px-safe-x flex flex-col justify-center">
        {/* Act category kicker indicator */}
        <motion.div
          className="flex items-center gap-[16px] mb-[28px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: appleEase }}
        >
          <span
            className="w-[18px] h-[18px] rounded-full shadow-[0_0_16px] flex-shrink-0"
            style={{ backgroundColor: accent, boxShadow: `0 0 16px ${accent}` }}
          />
          <span
            className="font-mono text-[32px] font-bold tracking-[0.25em] uppercase"
            style={{ color: accent }}
          >
            ACT {numeral}
          </span>
        </motion.div>

        <motion.div
          className="font-black leading-none tracking-[-0.03em] drop-shadow-sm"
          style={{ fontSize: 240, color: accent }}
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: appleEase }}
        >
          {numeral}
        </motion.div>
        <motion.div
          ref={nameRef}
          className="self-start font-extrabold leading-[1.15] tracking-[-0.03em] whitespace-nowrap text-ink mt-[12px]"
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
