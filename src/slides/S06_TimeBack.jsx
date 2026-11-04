import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import meatCoolSvg from '../assets/meatproxy-emojis-svg/meat-cool.svg';

const DAYS = [
  { day: 'MON', label: 'Monday', chore: 'CRUD APIs', time: '15 min', desc: 'Schemas, controllers, endpoints' },
  { day: 'TUE', label: 'Tuesday', chore: 'Unit Tests', time: '10 min', desc: 'Fixtures, mocks, assertions' },
  { day: 'WED', label: 'Wednesday', chore: 'DB Migrations', time: '12 min', desc: 'Schema alters & backfill scripts' },
  { day: 'THU', label: 'Thursday', chore: 'Parsers & Regex', time: '1 min', desc: 'Wellbore telemetry parser regex' },
  { day: 'FRI', label: 'Friday', chore: 'API Docs', time: '5 min', desc: 'Automated OpenAPI specifications' },
];

/**
 * Slide 06: We got our time back.
 * 
 * Act I: The Good
 * Headline: "We got our time back."
 * One idea: Boilerplate and routine chores dissolved from days into minutes.
 * 
 * Builds:
 *  - 0: Full week blocked out with manual scaffolding chores.
 *  - 1: Chores collapse into thin slivers at the top. The week opens wide.
 *  - 2: The thought-provoking pivot: "...so what are we doing with it?"
 */
export default function S06_TimeBack({ activeSlide, buildStep }) {
  const isShrunk = buildStep >= 1;
  const showQuestion = buildStep >= 2;

  return (
    <div className="h-full w-full flex flex-col justify-between p-10 md:p-14 lg:p-16 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Header */}
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

        <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-6">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: appleEase }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
          >
            We got our time back.
          </motion.h1>

          {/* Build 2 Pivot Question beside/below headline with no overlap */}
          <AnimatePresence>
            {showQuestion && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: appleEase }}
                className="flex items-center gap-2 font-serif italic text-2xl sm:text-3xl text-[#1E9E6A] font-semibold"
              >
                <span>"…so what are we doing with it?"</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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

                {/* Day Column Body */}
                <div className="p-2 sm:p-2.5 flex-1 flex flex-col justify-start relative">
                  
                  {/* The Chore Block (Full in Build 0, Collapsed in Build 1 & 2) */}
                  <motion.div
                    layout
                    transition={springPhysics}
                    animate={{
                      height: isShrunk ? 54 : 280,
                    }}
                    className={`w-full rounded-xl p-2.5 flex flex-col justify-between transition-colors duration-500 overflow-hidden relative ${
                      isShrunk
                        ? 'bg-emerald-50/90 border-2 border-[#1E9E6A]/50 text-emerald-950 shadow-sm'
                        : 'bg-neutral-100 border-2 border-neutral-300 text-neutral-800'
                    }`}
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-xs sm:text-sm text-[#111113]">
                        {item.chore}
                      </span>
                      <span
                        className={`font-mono text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded-md ${
                          isShrunk
                            ? 'bg-[#1E9E6A] text-white'
                            : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {item.time}
                      </span>
                    </div>

                    {/* Pre-AI full explanation */}
                    {!isShrunk && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 flex-1 flex flex-col justify-between"
                      >
                        <p className="text-xs text-neutral-600 leading-relaxed">
                          {item.desc}
                        </p>
                        <div className="pt-2 border-t border-neutral-200 flex items-center gap-1.5 text-[11px] font-mono text-neutral-500">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                          Manual 8-hour sprint
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Empty Opened Area when shrunk */}
                  {isShrunk && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="flex-1 mt-3 rounded-xl border-2 border-dashed border-emerald-200/80 bg-emerald-50/20 flex flex-col items-center justify-center p-3 text-center"
                    >
                      <span className="font-mono text-xs font-bold text-[#1E9E6A] uppercase tracking-wider">
                        Reclaimed
                      </span>
                      <span className="text-[11px] text-neutral-400 mt-1">
                        Focus time
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mascot meat-cool: Sits cleanly in bottom corner without blocking content */}
        <AnimatePresence>
          {isShrunk && (
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ ...springPhysics, delay: 0.25 }}
              className="absolute -bottom-6 -right-2 sm:-right-4 flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border-2 border-emerald-200 shadow-lg z-10"
            >
              <img
                src={meatCoolSvg}
                alt="Meatproxy cool"
                className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0"
              />
              <span className="font-bold text-xs sm:text-sm text-[#111113]">
                Toil dissolved.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Subtle bottom note */}
      <div className="pt-2 text-sm text-[#4A4A55] font-mono">
        Before: 5 days of grinding <span className="text-neutral-400">→</span> <span className="text-[#1E9E6A] font-semibold">Now: Scaffolding in minutes</span>
      </div>

    </div>
  );
}
