import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import meatThink from '../assets/meatproxy-emojis-svg/meat-think.svg';

/**
 * Slide 26: Promoted to orchestrator
 * 
 * Corner: 26 / The role shift (Blue accent dot #1B7ED0)
 * Headline: "Promoted to orchestrator."
 * Sub: "(no raise included)"
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Bar labelled "Before": [writing code 70%][debugging 20%][thinking 10%].
 *  - 1: Bar morphs dynamically with spring physics into "Now":
 *       [planning & architecture 60%][reviewing & verification 30%][writing code 10%].
 *       Mascot meat-think sits thoughtfully beside it.
 *  - 2: Five verbs appear along a drawn vector pipeline:
 *       Understand → Decide → Delegate → Verify → Own.
 *       Kicker at bottom: "Engineering isn't dead. (Not yet.)" Anchors Poll Q3 callback.
 */

const VERBS = [
  { step: '01', verb: 'Understand', desc: 'The real problem & domain constraints' },
  { step: '02', verb: 'Decide', desc: 'Architecture, contracts & non-negotiables' },
  { step: '03', verb: 'Delegate', desc: 'Sized units to autonomous agents' },
  { step: '04', verb: 'Verify', desc: 'Automated test gates & visual human check' },
  { step: '05', verb: 'Own', desc: 'Production deployment & long-term maintenance' },
];

export default function S26_RoleShift({ activeSlide, buildStep }) {
  const isNow = buildStep >= 1;
  const showVerbs = buildStep >= 2;

  // Segment allocations
  const segments = isNow
    ? [
        { label: 'Planning & Architecture', pct: 60, bg: 'bg-[#1B7ED0]', text: 'text-white', sub: 'Contracts & design' },
        { label: 'Review & Verification', pct: 30, bg: 'bg-[#2D2D32]', text: 'text-white', sub: 'Diff inspection & gates' },
        { label: 'Code', pct: 10, bg: 'bg-[#E4E4E7]', text: 'text-[#111113]', sub: 'Surgical edits' },
      ]
    : [
        { label: 'Writing Code', pct: 70, bg: 'bg-[#111113]', text: 'text-white', sub: 'Typing by hand' },
        { label: 'Debugging', pct: 20, bg: 'bg-[#4A4A55]', text: 'text-white', sub: 'Console logs & stack traces' },
        { label: 'Thinking', pct: 10, bg: 'bg-[#E4E4E7]', text: 'text-[#111113]', sub: 'Between interruptions' },
      ];

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
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B7ED0]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            Act IV · Making It Good
          </span>
        </motion.div>

        <div className="flex flex-wrap items-baseline gap-3">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: appleEase }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
          >
            Promoted to orchestrator.
          </motion.h1>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="font-mono text-lg sm:text-xl md:text-2xl text-[#4A4A55] font-normal"
          >
            (no raise included)
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Our job moved from typing to thinking. That is where our value lives now.
        </motion.p>
      </div>

      {/* Center Stage: Allocation Bar & Mascot */}
      <div className="my-auto w-full max-w-5xl mx-auto flex flex-col justify-center z-10 py-2">
        
        {/* Allocation Header with Poll Q3 callback */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs md:text-sm uppercase font-bold tracking-wider text-[#111113]">
              A day in the work:
            </span>
            <motion.span
              key={isNow ? 'now' : 'before'}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={springPhysics}
              className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider border-2 ${
                isNow
                  ? 'bg-blue-50 text-[#1B7ED0] border-[#1B7ED0]'
                  : 'bg-neutral-100 text-[#4A4A55] border-neutral-300'
              }`}
            >
              {isNow ? 'Now (Orchestrator)' : 'Before AI (Typist)'}
            </motion.span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-[#4A4A55]">
            <span className="w-2 h-2 rounded-full bg-[#1B7ED0]" />
            <span>Audience Perspective · The shift from typist to reviewer</span>
          </div>
        </div>

        {/* Dynamic Allocation Bar & Mascot Container */}
        <div className="relative flex items-center gap-4 sm:gap-6">
          {/* Morphing Horizontal Bar */}
          <div className="flex-1 h-20 sm:h-24 rounded-2xl p-2 bg-white border-2 border-neutral-300 shadow-sm flex overflow-hidden gap-1.5">
            {segments.map((seg, idx) => (
              <motion.div
                key={seg.label}
                layout
                initial={false}
                animate={{ width: `${seg.pct}%` }}
                transition={springPhysics}
                className={`${seg.bg} ${seg.text} rounded-xl h-full flex flex-col justify-center px-3 sm:px-4 overflow-hidden relative select-none`}
              >
                <div className="flex items-baseline justify-between gap-1">
                  <span className="font-mono text-xs sm:text-sm md:text-base font-black tracking-tight truncate">
                    {seg.label}
                  </span>
                  <span className="font-mono text-xs sm:text-sm md:text-base font-bold opacity-90">
                    {seg.pct}%
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs opacity-75 truncate mt-0.5 font-medium">
                  {seg.sub}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Thoughtful Mascot: meat-think */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...springPhysics, delay: 0.3 }}
            className="flex-shrink-0 flex flex-col items-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white border-2 border-neutral-300 shadow-sm flex items-center justify-center p-2 relative">
              <img
                src={meatThink}
                alt="meat-think mascot"
                className="w-full h-full object-contain"
              />
              {isNow && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={springPhysics}
                  className="absolute -top-2 -right-2 px-1.5 py-0.5 rounded-full bg-[#1B7ED0] text-white font-mono text-[10px] font-bold border-2 border-white shadow-sm"
                >
                  60% plan
                </motion.span>
              )}
            </div>
            <span className="font-mono text-[10px] text-neutral-500 mt-1 uppercase tracking-wider font-semibold">
              {isNow ? 'Orchestrating' : 'Typing'}
            </span>
          </motion.div>
        </div>

        {/* Build 2: Five Verbs Vector Pipeline */}
        {showVerbs && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: appleEase }}
            className="mt-6 pt-4 border-t-2 border-neutral-200"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs uppercase font-bold tracking-wider text-neutral-500">
                The 5 Verbs of Orchestration
              </span>
              <span className="text-xs text-neutral-500 font-medium">
                A proxy forwards. An orchestrator thinks before and after.
              </span>
            </div>

            {/* Pipeline Nodes */}
            <div className="grid grid-cols-5 gap-3 md:gap-4 relative">
              {VERBS.map((v, i) => (
                <motion.div
                  key={v.verb}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springPhysics, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-neutral-200 shadow-sm flex flex-col justify-between relative group hover:border-[#1B7ED0] hover:shadow-md transition-all min-h-[140px]"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-[#1B7ED0] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      {v.step}
                    </span>
                    {i < VERBS.length - 1 && (
                      <span className="text-neutral-300 font-mono text-sm font-bold">→</span>
                    )}
                  </div>
                  <div className="font-black text-base sm:text-lg text-[#111113] tracking-tight">
                    {v.verb}
                  </div>
                  <div className="text-xs sm:text-sm text-[#4A4A55] leading-snug mt-1">
                    {v.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
}
