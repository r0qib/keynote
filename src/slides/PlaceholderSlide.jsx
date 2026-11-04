import React from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../motion.js';
import { actAccent } from '../theme.js';
import SlideFrame from '../components/deck/SlideFrame.jsx';
import Headline from '../components/deck/Headline.jsx';

// Stand-in for slides that aren't built yet: id, title and build position.
export default function PlaceholderSlide({ activeSlide, buildStep = 0 }) {
  const slide = activeSlide || { id: 'S??', title: 'Untitled', act: 'Opening', totalBuilds: 0 };
  const accent = actAccent(slide.act);
  const builds = slide.totalBuilds || 0;

  return (
    <SlideFrame className="justify-center">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
        className="flex flex-col gap-[40px] max-w-[1500px]"
      >
        <div className="flex items-center gap-[20px] font-mono text-sub">
          <span className="w-[24px] h-[24px] rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
          <span>{slide.id}</span>
        </div>
        <Headline>{slide.title}</Headline>
        {builds > 0 && (
          <div className="flex items-center gap-[16px]" aria-label={`Build ${buildStep} of ${builds}`}>
            {Array.from({ length: builds + 1 }).map((_, i) => (
              <span
                key={i}
                className="w-[24px] h-[24px] rounded-full border-[3px]"
                style={{
                  borderColor: i <= buildStep ? accent : '#C9C9D2',
                  backgroundColor: i <= buildStep ? accent : 'transparent',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </SlideFrame>
  );
}
