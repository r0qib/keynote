import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import meatCoffee from '../assets/meatproxy-emojis-svg/meat-coffee.svg';

/**
 * Slide 18: Doomscrolling…
 * 
 * Corner: 18 / Time between chats (Coral accent dot #E5484D)
 * One idea: Chat-driven development wastes our time and shreds our focus.
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Claude Code spinner cycling: "Thinking…" -> "Pondering…" -> "Brewing…" -> lands on "Doomscrolling…"
 *  - 1: Horizontal timeline representing "an hour of chat-driven development" with short blue bursts
 *       and long grey gaps with icons (phone/Reels, tea cup, second tab) and meat-coffee in the longest gap.
 *  - 2: Spiky "your focus" line chart drawn across the top with "context rot (yours)" caption.
 *       Anchors Poll Q2 callback.
 */

const SPINNER_WORDS = ['Thinking…', 'Pondering…', 'Brewing…', 'Doomscrolling…'];

export default function S18_Thinking({ activeSlide, buildStep }) {
  const [spinnerIndex, setSpinnerIndex] = useState(0);

  // Cycle spinner words on mount or build 0
  useEffect(() => {
    if (spinnerIndex < SPINNER_WORDS.length - 1) {
      const timer = setTimeout(() => {
        setSpinnerIndex((prev) => Math.min(prev + 1, SPINNER_WORDS.length - 1));
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [spinnerIndex]);

  const currentWord = SPINNER_WORDS[spinnerIndex];
  const isLanded = spinnerIndex === SPINNER_WORDS.length - 1;
  const showTimeline = true;
  const showFocusLine = buildStep >= 1;

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 sm:p-10 md:p-14 lg:p-18 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Header */}
      <div className="z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            The Attention Problem
          </span>
        </motion.div>

        {/* Dynamic Claude Code Spinner Headline */}
        <div className="flex items-center gap-4 min-h-[70px] sm:min-h-[85px]">
          {/* Animated Terminal Spinner Glyph */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-[#111113] text-[#FAFAFB] flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-neutral-800">
            {isLanded ? (
              <span className="w-3 h-3 rounded-full bg-[#E5484D] animate-ping" />
            ) : (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-4 h-4 border-2 border-neutral-400 border-t-[#E5484D] rounded-full"
              />
            )}
          </div>

          <motion.h1
            key={currentWord}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: appleEase }}
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.06] ${
              isLanded ? 'text-[#E5484D]' : 'text-[#111113]'
            }`}
          >
            {currentWord}
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Chat-driven development wastes our time and shreds our focus.
        </motion.p>
      </div>

      {/* Center Stage: Timeline & Focus Graph */}
      <div className="my-auto w-full max-w-5xl mx-auto flex flex-col justify-center z-10 py-4 min-h-[360px]">
        
        {/* Top Focus Line Chart (Build 2) */}
        <div className="w-full relative h-28 sm:h-32 mb-2">
          {showFocusLine ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: appleEase }}
              className="w-full h-full relative"
            >
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-1">
                <span className="font-semibold text-neutral-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E5484D]" />
                  Your Mental Focus Model
                </span>
                <span className="text-neutral-400">Context decays between chat rounds</span>
              </div>

              {/* SVG Spiky Line Chart */}
              <svg className="w-full h-20 sm:h-24 overflow-visible" viewBox="0 0 1000 100" preserveAspectRatio="none">
                {/* Horizontal baseline */}
                <line x1="0" y1="90" x2="1000" y2="90" stroke="#E4E4E7" strokeWidth="2" strokeDasharray="4 4" />
                
                {/* Spiky focus line: burst (y=20), drop (y=88), burst (y=25), deep drop (y=92), burst (y=30), collapse (y=95) */}
                <motion.path
                  d="M 0,25 
                     L 60,25 
                     L 100,88 
                     L 240,88 
                     L 280,20 
                     L 340,20 
                     L 390,92 
                     L 630,92 
                     L 670,30 
                     L 730,30 
                     L 780,95 
                     L 1000,95"
                  fill="none"
                  stroke="#E5484D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, ease: appleEase }}
                />

                {/* Point indicators */}
                <circle cx="60" cy="25" r="4.5" fill="#0052CC" />
                <circle cx="280" cy="20" r="4.5" fill="#0052CC" />
                <circle cx="670" cy="30" r="4.5" fill="#0052CC" />
              </svg>

              {/* Deepest drop callout tag */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...springPhysics, delay: 1.1 }}
                className="absolute top-12 left-[48%] -translate-x-1/2 bg-white px-3 py-1.5 rounded-xl border-2 border-[#E5484D] shadow-md flex items-center gap-1.5 font-mono text-xs text-[#E5484D] font-bold"
              >
                <span className="w-2 h-2 rounded-full bg-[#E5484D] animate-ping" />
                <span>context rot (yours)</span>
              </motion.div>
            </motion.div>
          ) : null}
        </div>

        {/* The 1-Hour Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="w-full bg-white rounded-3xl p-5 sm:p-6 border-2 border-neutral-300 shadow-lg relative"
        >
            {/* Header & Meta */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b-2 border-neutral-100">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-800">
                  An Hour of Chat-Driven Development
                </span>
                <span className="bg-neutral-100 text-neutral-600 font-mono text-[11px] px-2.5 py-0.5 rounded-full border-2 border-neutral-300">
                  Illustrative
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-[#0052CC] font-semibold">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#0052CC]" /> You (Prompt / Review)
                </span>
                <span className="flex items-center gap-1.5 text-neutral-500">
                  <span className="w-2.5 h-2.5 rounded-sm bg-neutral-300" /> Waiting for Agent
                </span>
              </div>
            </div>

            {/* Timeline Bar Track */}
            <div className="w-full h-16 sm:h-20 bg-neutral-100 rounded-2xl flex items-stretch overflow-hidden border-2 border-neutral-300 relative">
              
              {/* Segment 1: Prompt (3 min) */}
              <div className="w-[8%] bg-[#0052CC] flex flex-col items-center justify-center text-white font-mono text-[10px] sm:text-xs font-bold border-r-2 border-white/40 px-1 text-center">
                <span>Prompt</span>
                <span className="text-[9px] opacity-80 font-normal">2m</span>
              </div>

              {/* Gap 1: Phone / Reels (14 min) */}
              <div className="w-[18%] bg-neutral-200/80 flex flex-col items-center justify-center border-r-2 border-neutral-300 px-2 relative group">
                <div className="flex items-center gap-1 text-neutral-600 mb-1">
                  {/* Phone SVG */}
                  <svg className="w-4 h-4 stroke-2 stroke-neutral-700 fill-none" viewBox="0 0 24 24">
                    <rect x="5" y="2" width="14" height="20" rx="2" />
                    <line x1="12" y1="18" x2="12" y2="18.01" />
                  </svg>
                  <span className="font-mono text-[11px] font-semibold text-neutral-700">Reels</span>
                </div>
                <span className="font-mono text-[9px] text-neutral-500">"just 1 sec"</span>
              </div>

              {/* Segment 2: Review & Next Prompt (4 min) */}
              <div className="w-[10%] bg-[#0052CC] flex flex-col items-center justify-center text-white font-mono text-[10px] sm:text-xs font-bold border-r-2 border-white/40 px-1 text-center">
                <span>Diff Fix</span>
                <span className="text-[9px] opacity-80 font-normal">3m</span>
              </div>

              {/* Gap 2: Longest Gap with meat-coffee mascot (24 min) */}
              <div className="w-[34%] bg-amber-50/70 flex items-center justify-center gap-3 border-r-2 border-neutral-300 px-3 relative overflow-hidden">
                <img
                  src={meatCoffee}
                  alt="Meat Coffee mascot"
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain flex-shrink-0 animate-bounce"
                  style={{ animationDuration: '3s' }}
                />
                <div className="flex flex-col">
                  <span className="font-mono text-xs sm:text-sm font-bold text-neutral-800 flex items-center gap-1">
                    Cha break #4
                  </span>
                  <span className="font-mono text-[10px] text-neutral-500">
                    "It will finish any second now…"
                  </span>
                </div>
              </div>

              {/* Segment 3: Review again (3 min) */}
              <div className="w-[8%] bg-[#0052CC] flex flex-col items-center justify-center text-white font-mono text-[10px] sm:text-xs font-bold border-r-2 border-white/40 px-1 text-center">
                <span>Run</span>
                <span className="text-[9px] opacity-80 font-normal">2m</span>
              </div>

              {/* Gap 3: Second tab doomscroll (18 min) */}
              <div className="w-[22%] bg-neutral-200/80 flex flex-col items-center justify-center px-2">
                <div className="flex items-center gap-1.5 text-neutral-700 mb-0.5">
                  {/* Browser Tab SVG */}
                  <svg className="w-4 h-4 stroke-2 stroke-neutral-700 fill-none" viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="16" rx="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <circle cx="7" cy="7" r="1" />
                    <circle cx="11" cy="7" r="1" />
                  </svg>
                  <span className="font-mono text-[11px] font-semibold">Second Tab</span>
                </div>
                <span className="font-mono text-[9px] text-neutral-500">Hacker News / Reddit</span>
              </div>
            </div>

            {/* Time labels below bar */}
            <div className="flex justify-between items-center mt-2 px-1 font-mono text-[10px] text-neutral-400">
              <span>0m (Start)</span>
              <span>15m</span>
              <span>30m</span>
              <span>45m</span>
              <span>60m (Diff arrived, mental model gone)</span>
            </div>
          </motion.div>

      </div>

      {/* Bottom Pacing Indicator */}
      <div className="z-10 flex items-center justify-between pt-3 border-t-2 border-neutral-200 text-xs text-[#4A4A55] font-mono">
        <span>Fragmented Attention Loop</span>
        <span className="text-[#E5484D] font-semibold">"It isn't a time problem. It's an attention problem."</span>
      </div>
    </div>
  );
}
