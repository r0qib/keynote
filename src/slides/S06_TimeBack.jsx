import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import meatCoolSvg from '../assets/meatproxy-emojis-svg/meat-cool.svg';

const DAYS = [
  {
    day: 'MON',
    label: 'Monday',
    chore: 'CRUD endpoints',
    oldTime: '2 days',
    newTime: '15 min',
    desc: 'Scaffolding controllers, DTOs, mappers, boilerplate routes',
  },
  {
    day: 'TUE',
    label: 'Tuesday',
    chore: 'Unit tests',
    oldTime: '1 day',
    newTime: '10 min',
    desc: 'Mocking fixtures, assert boilerplate, edge-case tables',
  },
  {
    day: 'WED',
    label: 'Wednesday',
    chore: 'Migration script',
    oldTime: '1 day',
    newTime: '12 min',
    desc: 'Backfill scripts, column alter SQL, rollbacks',
  },
  {
    day: 'THU',
    label: 'Thursday',
    chore: 'That one regex',
    oldTime: '3 hours',
    newTime: '45 sec',
    desc: 'Fighting lookaheads, escaped slashes, boundary bugs',
  },
  {
    day: 'FRI',
    label: 'Friday',
    chore: 'Docs nobody reads',
    oldTime: 'Friday',
    newTime: '5 min',
    desc: 'Updating markdown wikis, OpenAPI specs that rot',
  },
];

/**
 * Slide 06: We got our time back.
 * 
 * Corner: 06 / Time back (Green accent dot #1E9E6A)
 * Headline: "We got our time back."
 * 
 * Builds:
 *  - 0: Full week calendar packed with solid chore blocks.
 *  - 1: Chore blocks shrink with spring physics into thin slivers (10-15 min),
 *       leaving the calendar vast, open, and white. Mascot meat-cool slides in with sunglasses.
 *  - 2: Quiet ink statement appears across the open space: "…so what are we doing with it?"
 */
export default function S06_TimeBack({ activeSlide, buildStep }) {
  const isShrunk = buildStep >= 1;
  const showQuestion = buildStep >= 2;

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 sm:p-10 md:p-14 lg:p-16 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Header: Headline & Subtitle */}
      <div className="z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E9E6A]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            Act I · The Win
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.1]"
        >
          We got our time back.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          The boilerplate, scaffolding, and toil dissolved into minutes.
        </motion.p>
      </div>

      {/* Center Stage: The 5-Day Week Calendar */}
      <div className="relative my-auto w-full max-w-6xl mx-auto py-2 z-10">
        
        {/* Calendar Grid Container */}
        <div className="grid grid-cols-5 gap-3 md:gap-4 lg:gap-5">
          {DAYS.map((item, index) => {
            return (
              <div
                key={item.day}
                className="flex flex-col bg-white rounded-2xl border-2 border-neutral-200/90 shadow-sm overflow-hidden h-[340px] md:h-[380px] lg:h-[400px]"
              >
                {/* Day Header */}
                <div className="flex items-center justify-between px-3 py-2.5 border-b-2 border-neutral-100 bg-neutral-50/70">
                  <span className="font-mono text-xs md:text-sm font-bold tracking-wider text-[#111113]">
                    {item.day}
                  </span>
                  <span className="text-[11px] md:text-xs font-medium text-neutral-400 hidden sm:inline">
                    {item.label}
                  </span>
                </div>

                {/* Day Column Body with Spring Collapsing Chore Block */}
                <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-start relative">
                  
                  {/* The Chore Block (Full in Build 0, Shrunk Sliver in Build 1 & 2) */}
                  <motion.div
                    layout
                    transition={springPhysics}
                    animate={{
                      height: isShrunk ? 44 : 280,
                    }}
                    className={`w-full rounded-xl p-2.5 sm:p-3 flex flex-col justify-between transition-colors duration-500 overflow-hidden relative ${
                      isShrunk
                        ? 'bg-emerald-50/90 border-2 border-[#1E9E6A]/40 text-emerald-950 shadow-sm'
                        : 'bg-neutral-100 border-2 border-neutral-300 text-neutral-800'
                    }`}
                  >
                    {/* Header Row of the Block */}
                    <div className="flex items-start justify-between gap-1">
                      <div className="font-bold text-xs sm:text-sm md:text-base leading-tight truncate">
                        {item.chore}
                      </div>
                      <motion.span
                        key={isShrunk ? 'shrunk' : 'full'}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`text-[10px] sm:text-xs font-mono font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
                          isShrunk
                            ? 'bg-[#1E9E6A] text-white'
                            : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {isShrunk ? item.newTime : item.oldTime}
                      </motion.span>
                    </div>

                    {/* Extended Description (Visible only when full in Build 0) */}
                    {!isShrunk && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 flex-1 flex flex-col justify-between"
                      >
                        <p className="text-[11px] sm:text-xs text-neutral-500 line-clamp-3 leading-relaxed">
                          {item.desc}
                        </p>
                        <div className="pt-2 border-t-2 border-neutral-200/80 flex items-center gap-1.5 text-[10px] font-mono text-neutral-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                          Manual engineering
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Empty Opened Area (Faint grid pattern visible when shrunk) */}
                  {isShrunk && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="flex-1 mt-3 rounded-lg border-2 border-dashed border-neutral-200/70 flex flex-col items-center justify-center p-2 text-center"
                    >
                      <span className="font-mono text-[10px] text-neutral-300 uppercase tracking-widest">
                        Reclaimed
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mascot meat-cool: Slides in with sunglasses in Build 1 & 2 */}
        <AnimatePresence>
          {isShrunk && (
            <motion.div
              initial={{ opacity: 0, x: 80, y: 30, scale: 0.7 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ ...springPhysics, delay: 0.25 }}
              className="absolute -bottom-8 -right-4 sm:-right-8 md:-bottom-10 md:-right-10 flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border-2 border-neutral-200 shadow-xl z-30"
            >
              <img
                src={meatCoolSvg}
                alt="Meatproxy cool"
                className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0"
              />
              <div className="pr-1">
                <div className="font-mono text-xs font-bold text-[#1E9E6A]">
                  TOIL DISSOLVED
                </div>
                <div className="text-xs text-neutral-500 font-medium">
                  Friday feels like Friday
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Build 2: Quiet Ink Statement across the empty calendar */}
        <AnimatePresence>
          {showQuestion && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.6, ease: appleEase }}
              className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
            >
              <div className="bg-[#111113]/90 backdrop-blur-md text-[#FAFAFB] px-8 py-5 rounded-2xl shadow-2xl border-2 border-neutral-800 text-center max-w-xl mx-4">
                <p className="text-2xl sm:text-3xl md:text-4xl font-serif italic text-white leading-tight">
                  "…so what are we doing with it?"
                </p>
                <p className="mt-2.5 font-mono text-xs sm:text-sm text-neutral-400 tracking-wide">
                  The first draft is practically free. Where did our focus go?
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Footer Callout */}
      <div className="flex items-center justify-between pt-3 border-t-2 border-neutral-200/60 z-10 text-xs md:text-sm text-[#4A4A55]">
        <div className="flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#1E9E6A]" />
          <span>Before: 5 days of grinding</span>
          <span className="text-neutral-300">→</span>
          <span className="font-semibold text-[#111113]">Now: Scaffolding in minutes</span>
        </div>
        <div className="font-mono text-xs text-neutral-400 hidden sm:block">
          InformatiQ Dev Loop
        </div>
      </div>
    </div>
  );
}
