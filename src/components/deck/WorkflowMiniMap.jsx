import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, gentleSpring } from '../../motion.js';
import { colors } from '../../theme.js';

export const WORKFLOW_STAGES = ['Gather', 'Plan', 'Orchestrate', 'Remember'];

// Same spot on every chapter V content slide. Headlines below it start at y = 180 (mt-[84px] in SlideFrame).
export const MINI_MAP_POS = { left: 120, top: 96, height: 56 };

// Upcoming stations: darker than muted so they still read at 26 px on a call.
const UPCOMING = '#3A3A44';

const stageIndex = (active) => (typeof active === 'number' ? active : WORKFLOW_STAGES.indexOf(active));

/**
 * Compact workflow map: four stations, the active one highlighted, earlier ones done.
 * `active`: stage name or index (null for none). `complete`: every station done.
 * Each station carries `data-station` so a slide can measure it for a morph.
 */
export default function WorkflowMiniMap({ active = null, complete = false, className = '', style, ...motionProps }) {
  const current = complete ? -1 : stageIndex(active);
  const doneBefore = complete ? WORKFLOW_STAGES.length : current;

  return (
    <motion.div
      className={`absolute flex items-center gap-[4px] rounded-full border-[4px] border-[#D4D4DC] bg-surface p-[1px] ${className}`}
      style={{ ...MINI_MAP_POS, ...style }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: appleEase }}
      {...motionProps}
    >
      {WORKFLOW_STAGES.map((name, i) => {
        const isActive = i === current;
        const isDone = i < doneBefore;
        return (
          <div
            key={name}
            data-station={name}
            className="relative flex h-[46px] items-center gap-[8px] whitespace-nowrap rounded-full px-[12px] text-[26px] font-semibold leading-none"
            style={{ color: isActive ? '#FFFFFF' : isDone ? colors.ink : UPCOMING }}
          >
            {isActive && (
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: colors.blue }}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...gentleSpring, delay: 0.2 }}
              />
            )}
            <motion.span
              className="relative block h-[14px] w-[14px] rounded-full"
              initial={false}
              animate={{
                backgroundColor: isActive ? '#FFFFFF' : isDone ? colors.blue : 'rgba(255,255,255,0)',
                borderColor: isActive ? '#FFFFFF' : isDone ? colors.blue : UPCOMING,
              }}
              transition={{ duration: 0.4, ease: appleEase }}
              style={{ borderWidth: 3, borderStyle: 'solid' }}
            />
            <span className="relative">{name}</span>
          </div>
        );
      })}
    </motion.div>
  );
}
