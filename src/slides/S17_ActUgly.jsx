import React from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../motion';

/**
 * Slide 17: Act III · The Ugly
 * 
 * Chapter Card Template:
 * - Dark canvas (bg-[#111113])
 * - Top & bottom solid black letterbox bars
 * - Centered typography:
 *   * Kicker: "ACT III" with coral dot indicators (#E5484D)
 *   * Huge title: "The Ugly" in brand coral (#E5484D)
 *   * Build 0: "The Ugly" holds
 *   * Build 1: "…is us." types in underneath, completing the pivotal line:
 *     "The Bad is the AI. The Ugly… is us."
 * 
 * Builds: 1 (Build 0: chapter card; Build 1: "…is us." types in)
 */
export default function S17_ActUgly({ activeSlide, buildStep }) {
  const showPunchline = buildStep >= 1;

  return (
    <div className="h-full w-full flex flex-col justify-between items-center relative bg-[#111113] text-[#FAFAFB] select-none overflow-hidden p-8 md:p-14 lg:p-20">
      
      {/* Top Cinematic Solid Letterbox Bar */}
      <div className="absolute top-0 left-0 right-0 h-4 sm:h-6 md:h-8 bg-black z-20 border-b-2 border-neutral-900" />

      {/* Subtle coral radial glow in background */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(229, 72, 77, 0.22) 0%, rgba(17, 17, 19, 0) 70%)',
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
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D] flex-shrink-0 animate-pulse" />
          <span className="font-mono text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] uppercase text-neutral-400">
            Act III
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D] flex-shrink-0 animate-pulse" />
        </motion.div>

        {/* Huge Title: "The Ugly" */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: appleEase }}
          className="text-6xl sm:text-7xl md:text-8xl lg:text-[110px] font-black tracking-tight text-[#E5484D] leading-[1.05]"
        >
          The Ugly
        </motion.h1>

        {/* Build 1: "…is us." */}
        <div className="min-h-[48px] sm:min-h-[64px] mt-6 sm:mt-8 flex items-center justify-center">
          {showPunchline ? (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: appleEase }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-[#A1A1AA] tracking-tight flex items-center gap-1 font-mono"
            >
              <span>…is us.</span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                className="w-3 h-8 sm:h-10 bg-[#E5484D] inline-block ml-1"
              />
            </motion.p>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-base sm:text-lg text-neutral-600 font-mono"
            >
              (The Bad was the AI.)
            </motion.p>
          )}
        </div>
      </div>

      {/* Presenter quiet anchor note at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="z-10 font-mono text-xs text-neutral-500 tracking-wider uppercase mb-2"
      >
        InformatiQ Engineering · Retrospective
      </motion.div>

      {/* Bottom Cinematic Solid Letterbox Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-6 md:h-8 bg-black z-20 border-t-2 border-neutral-900" />
    </div>
  );
}
