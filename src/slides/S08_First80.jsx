import React, { useState, useEffect } from 'react';
import { motion, animate, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { Rocket, Sparkles } from 'lucide-react';

/**
 * Slide 08: Day one feels like magic.
 * 
 * Corner: 08 / Day one (Green accent dot #1E9E6A)
 * Headline: "Day one feels like magic."
 * 
 * Visual: Massive, thick high-contrast progress bar centered on canvas.
 * 
 * Builds:
 *  - 0: Headline and empty 0% progress bar.
 *  - 1: Bar rockets 0% -> 80% with animated counter in ~0.6s, then stops dead with a spring stop.
 *       Text below: "the first 80% (in an afternoon)".
 *       A blinking terminal caret "|" blinks continuously at the 80% mark as a cliffhanger pause.
 */
export default function S08_First80({ activeSlide, buildStep }) {
  const isRocketed = buildStep >= 1;
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (isRocketed) {
      const controls = animate(0, 80, {
        duration: 0.65,
        ease: appleEase,
        onUpdate: (val) => setPercent(Math.round(val)),
      });
      return () => controls.stop();
    } else {
      setPercent(0);
    }
  }, [isRocketed]);

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 sm:p-10 md:p-14 lg:p-20 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Header */}
      <div className="z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E9E6A]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            Speed & Momentum
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
        >
          Day one feels like magic.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-3 font-normal"
        >
          Scaffolding, architecture, schemas, and mock UI — completed before lunch.
        </motion.p>
      </div>

      {/* Center Stage: Massive High-Contrast Progress Bar */}
      <div className="my-auto w-full max-w-5xl mx-auto flex flex-col gap-6 z-10 py-4">
        
        {/* Progress Bar Container */}
        <div className="relative w-full bg-neutral-200/90 rounded-3xl p-3 sm:p-4 border-2 border-neutral-300 shadow-inner h-24 sm:h-28 md:h-32 flex items-center">
          
          {/* Track 100% Background Marker */}
          <div className="absolute right-6 sm:right-8 font-mono text-sm md:text-base font-bold text-neutral-400 select-none">
            100%
          </div>

          {/* 80% Stop-Line Marker & Guide */}
          <div className="absolute left-[80%] top-0 bottom-0 w-0.5 border-r-2 border-dashed border-neutral-400/80 z-20 pointer-events-none" />

          {/* Rocketing Green Bar */}
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: isRocketed ? '80%' : '0%' }}
            transition={{
              duration: 0.65,
              ease: appleEase,
            }}
            className="h-full rounded-2xl bg-gradient-to-r from-[#1E9E6A] to-[#168557] relative flex items-center justify-end pr-4 sm:pr-6 shadow-md overflow-hidden"
          >
            {/* Subtle inner sheen / gloss */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

            {/* Live Percent Counter Inside Bar */}
            <div className="relative z-10 flex items-center gap-2">
              <span className="font-mono text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight drop-shadow-sm">
                {percent}%
              </span>

              {/* Blinking Cliffhanger Caret | at the 80% mark */}
              {isRocketed && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.75,
                    ease: 'easeInOut',
                  }}
                  className="w-1.5 sm:w-2 h-7 sm:h-9 md:h-10 bg-white rounded-sm inline-block shadow-sm"
                />
              )}
            </div>
          </motion.div>
        </div>

        {/* Labels & Callouts Underneath the Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-2">
          
          {/* Left: The First 80% */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isRocketed ? 1 : 0.4, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-100 border-2 border-[#1E9E6A]/50 flex items-center justify-center text-[#1E9E6A]">
              <Rocket className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-[#111113] tracking-tight">
                the first 80%
              </div>
              <div className="font-mono text-xs sm:text-sm text-[#1E9E6A] font-semibold">
                (in an afternoon)
              </div>
            </div>
          </motion.div>

          {/* Right: The Remaining 20% (Cliffhanger) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isRocketed ? 1 : 0.3 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex items-center gap-3 text-right sm:text-left self-end sm:self-auto"
          >
            <div className="text-right">
              <div className="text-sm sm:text-base font-semibold text-neutral-400">
                the last 20%
              </div>
              <div className="font-mono text-xs text-neutral-400 italic">
                to be continued…
              </div>
            </div>
            <div className="w-8 h-8 rounded-xl border-2 border-dashed border-neutral-300 flex items-center justify-center text-neutral-400 font-mono text-xs font-bold">
              20
            </div>
          </motion.div>
        </div>

        {/* Presenter Quote / Humorous Kicker Card */}
        <AnimatePresence>
          {isRocketed && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: appleEase }}
              className="mt-4 p-5 sm:p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-[#1E9E6A] text-4xl font-serif leading-none">“</span>
                <p className="text-base sm:text-lg md:text-xl font-medium text-neutral-800 italic">
                  Ten-x engineer. Already drafting the LinkedIn post.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
