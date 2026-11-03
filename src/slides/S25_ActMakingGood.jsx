import React from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../motion';

/**
 * Slide 25: Act IV · Making It Good
 * 
 * Chapter Card Template:
 * - Dark canvas (bg-[#111113])
 * - Top & bottom solid letterbox bars
 * - Centered typography:
 *   * Kicker: "ACT IV" (tracking-widest font-mono) with InformatiQ brand blue dot (#1B7ED0)
 *   * Huge title: "Making It Good" in InformatiQ blue (#1B7ED0)
 *   * Subtitle: "From typist to orchestrator."
 * - Builds: 0
 */
export default function S25_ActMakingGood({ activeSlide, buildStep }) {
  return (
    <div className="h-full w-full flex flex-col justify-between items-center relative bg-[#111113] text-[#FAFAFB] select-none overflow-hidden p-8 md:p-14 lg:p-20">
      
      {/* Top Cinematic Solid Letterbox Bar */}
      <div className="absolute top-0 left-0 right-0 h-4 sm:h-6 md:h-8 bg-black z-20 border-b-2 border-neutral-900" />

      {/* Subtle InformatiQ blue radial glow in background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-45"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(27, 126, 208, 0.24) 0%, rgba(17, 17, 19, 0) 70%)',
        }}
      />

      {/* Top spacer */}
      <div className="h-8" />

      {/* Center Stage Content */}
      <div className="my-auto flex flex-col items-center text-center max-w-4xl z-10 px-4">
        
        {/* Act Kicker */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="flex items-center gap-3 mb-6 sm:mb-8"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B7ED0] flex-shrink-0 animate-pulse" />
          <span className="font-mono text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] uppercase text-neutral-400">
            Act IV
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B7ED0] flex-shrink-0 animate-pulse" />
        </motion.div>

        {/* Huge Title: "Making It Good" */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: appleEase }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tight text-[#1B7ED0] leading-[1.05]"
        >
          Making It Good
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6, ease: appleEase }}
          className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-neutral-300 tracking-tight"
        >
          From typist to orchestrator.
        </motion.p>
      </div>

      {/* Presenter quiet anchor note at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="z-10 font-mono text-xs text-neutral-500 tracking-wider uppercase mb-2"
      >
        InformatiQ Engineering · The Workflow
      </motion.div>

      {/* Bottom Cinematic Solid Letterbox Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-6 md:h-8 bg-black z-20 border-t-2 border-neutral-900" />
    </div>
  );
}
