import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics, bouncierSpring } from '../motion';

/**
 * Slide 12: 99% of 50% of the time.
 * 
 * Corner: 12 / Accuracy (Amber accent dot #D97706)
 * One idea: Instruction-following is inconsistent, and you never know which half you're in.
 * 
 * Visual: Pure kinetic typography only, centered and massive.
 * 
 * Builds:
 *  - 0: "AI follows your instructions 99% of the time." with full stop. Audience nods.
 *  - 1: The full stop pushes away; "…of 50% of the time." slides in from the right:
 *       "99% of 50% of the time." (with #D97706 amber accent on 50%).
 */
export default function S12_NinetyNine({ activeSlide, buildStep }) {
  const isTwist = buildStep >= 1;

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-16 lg:p-20 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Header / Kicker */}
      <div className="z-10">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            Instruction Following
          </span>
        </motion.div>
      </div>

      {/* Center Stage: Pure Kinetic Typography */}
      <div className="my-auto w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center z-10 py-6">
        
        {/* Lead-in Line */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-neutral-500 tracking-tight mb-4 sm:mb-6"
        >
          AI follows your instructions
        </motion.div>

        {/* Hero Kinetic Typography Line */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 md:gap-x-5 text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-black tracking-tight leading-[1.08] min-h-[1.2em]">
          
          {/* "99%" - Permanent Anchor */}
          <span className="text-[#111113]">
            99%
          </span>

          <AnimatePresence mode="wait">
            {!isTwist ? (
              /* Build 0: "of the time." */
              <motion.span
                key="build0-phrase"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: appleEase }}
                className="text-neutral-900 inline-flex items-center"
              >
                of the time.
              </motion.span>
            ) : (
              /* Build 1: "of 50% of the time." */
              <motion.span
                key="build1-twist"
                initial={{ opacity: 0, x: 40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={bouncierSpring}
                className="inline-flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4"
              >
                <span className="text-neutral-500 font-semibold text-3xl sm:text-5xl md:text-6xl lg:text-[76px]">
                  of
                </span>
                
                {/* 50% Highlight in Brand Amber */}
                <span className="text-[#D97706] underline decoration-4 md:decoration-8 underline-offset-8">
                  50%
                </span>

                <span className="text-[#111113]">
                  of the time.
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Punchline Subtext / Presenter Thought */}
        <div className="h-20 sm:h-24 flex items-center justify-center mt-8 sm:mt-12">
          <AnimatePresence>
            {isTwist && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5, ease: appleEase }}
                className="flex flex-col items-center gap-2"
              >
                <div className="text-lg sm:text-xl md:text-2xl font-medium text-neutral-800 tracking-tight">
                  "The worst part isn't the 50%. It's that you never know which half you're in."
                </div>
                <div className="font-mono text-xs sm:text-sm text-neutral-500">
                  Instruction decay: turn 3's strict rule competing with 40 turns of chat history.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Pacing Indicator */}
      <div className="z-10 flex items-center justify-between pt-4 border-t-2 border-neutral-200 text-xs text-[#4A4A55] font-mono">
        <span>The Inconsistency Dilemma</span>
        <span className="text-neutral-500">Unpredictable failure modes</span>
      </div>
    </div>
  );
}
