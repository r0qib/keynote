import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { Brain, Cpu, Coffee, CheckCircle, ArrowRight } from 'lucide-react';

/**
 * Slide 29: Plan for hours. Let it run for hours.
 * 
 * Corner: 29 / Plan first (Blue accent dot #1B7ED0)
 * Headline: "Plan for hours. Let it run for hours."
 * 
 * Visual: S18's spiky focus line (shared element) morphing into a sustained plateau.
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Spiky fragmented line from S18 returns (chat-driven chaos & context rot).
 *  - 1: Line smooths into a high planning plateau (~3h deep focus) followed by
 *       an autonomous execution band (agents running hours/day), while your line
 *       moves to a low cognitive lane (review, next plan, coffee).
 *  - 2: Punchline lands: "Plan it well, then one-shot the plan."
 *       Fairness subline: "Small bug? Quick question? Chat is fine."
 */

export default function S29_PlanHours({ activeSlide, buildStep }) {
  const isSmooth = buildStep >= 1;
  const showPunchline = buildStep >= 2;

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
            Act IV · Deep Planning
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          Plan for hours. Let it run for hours.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Flow beats interruptions. Planning keeps all the context in your head.
        </motion.p>
      </div>

      {/* Center Stage: The Focus Line Comparison Canvas */}
      <div className="my-auto w-full max-w-5xl mx-auto flex flex-col justify-center z-10 py-2 min-h-[360px]">
        
        {/* State Label & Subtext */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-neutral-400">
              Focus Architecture:
            </span>
            <span className={`px-2.5 py-0.5 rounded-full font-mono text-xs font-bold border-2 ${
              isSmooth 
                ? 'bg-blue-50 text-[#1B7ED0] border-[#1B7ED0]'
                : 'bg-red-50 text-[#E5484D] border-[#E5484D]'
            }`}>
              {isSmooth ? 'The New Loop · Deep Focus & Autonomous Execution' : 'The Old Chat Loop · Continuous Interruptions'}
            </span>
          </div>

          <div className="font-mono text-xs text-neutral-500">
            {isSmooth ? 'Unattended flow' : 'Fragmented loop'}
          </div>
        </div>

        {/* The Visual Line Graphic */}
        <div className="w-full bg-white rounded-2xl p-6 sm:p-7 border-2 border-neutral-300 shadow-sm relative overflow-hidden">
          
          {!isSmooth ? (
            /* BUILD 0: The S18 Spiky Focus Line */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full relative"
            >
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500 mb-2">
                <span className="font-semibold text-[#E5484D] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#E5484D]" />
                  Chat-Driven Mental Focus (Fragmented)
                </span>
                <span className="italic text-neutral-400">Short bursts → long doomscrolling gaps</span>
              </div>

              {/* Spiky SVG */}
              <svg className="w-full h-32 sm:h-36 overflow-visible" viewBox="0 0 1000 120" preserveAspectRatio="none">
                <line x1="0" y1="105" x2="1000" y2="105" stroke="#E4E4E7" strokeWidth="2" strokeDasharray="4 4" />
                
                <motion.path
                  d="M 0,30 L 60,30 L 100,105 L 240,105 L 280,25 L 340,25 L 390,110 L 630,110 L 670,35 L 730,35 L 780,112 L 1000,112"
                  fill="none"
                  stroke="#E5484D"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle cx="60" cy="30" r="4.5" fill="#111113" />
                <circle cx="280" cy="25" r="4.5" fill="#111113" />
                <circle cx="670" cy="35" r="4.5" fill="#111113" />
              </svg>

              {/* S18 Context Rot Callout */}
              <div className="absolute top-16 left-[50%] -translate-x-1/2 bg-white px-3 py-1.5 rounded-xl border-2 border-[#E5484D] shadow-sm flex items-center gap-1.5 font-mono text-xs text-[#E5484D] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#E5484D] animate-ping" />
                <span>context rot (yours)</span>
              </div>
            </motion.div>
          ) : (
            /* BUILD 1 & 2: The Smoothed Deep Planning Plateau */
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: appleEase }}
              className="w-full relative space-y-4"
            >
              {/* Timeline Header */}
              <div className="grid grid-cols-12 gap-3 pb-2 border-b-2 border-neutral-100 font-mono text-xs">
                <div className="col-span-4 text-[#1B7ED0] font-bold flex items-center gap-1.5">
                  <Brain className="w-4 h-4" />
                  <span>Phase 1: Deep Focus Planning (~3h)</span>
                </div>
                <div className="col-span-5 text-neutral-800 font-bold flex items-center gap-1.5">
                  <Cpu className="w-4 h-4 text-[#1B7ED0]" />
                  <span>Phase 2: Autonomous Execution (hours to day)</span>
                </div>
                <div className="col-span-3 text-neutral-500 font-semibold flex items-center gap-1.5 justify-end">
                  <Coffee className="w-4 h-4 text-amber-600" />
                  <span>Phase 3: Review</span>
                </div>
              </div>

              {/* Dual Track Graphic Visualization */}
              <div className="space-y-3 py-1">
                {/* Track 1: You (High Plateau in Deep Focus) */}
                <div className="flex items-center gap-3">
                  <span className="w-16 font-mono text-xs font-bold text-[#1B7ED0]">YOU</span>
                  <div className="flex-1 h-12 bg-neutral-100 rounded-xl p-1.5 flex gap-2">
                    {/* High Deep Planning Block (3 hours) */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '38%' }}
                      transition={springPhysics}
                      className="h-full bg-[#1B7ED0] text-white rounded-lg flex items-center justify-between px-3 font-mono text-xs font-bold shadow-sm"
                    >
                      <span className="truncate">Deep Focus (~3 h)</span>
                      <span className="text-[10px] opacity-80 hidden sm:inline">100% flow</span>
                    </motion.div>

                    {/* Low cognitive baseline (review, next plan, coffee) */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="flex-1 h-full bg-white border-2 border-neutral-300 rounded-lg flex items-center justify-between px-3 font-mono text-xs text-neutral-600"
                    >
                      <span className="truncate">Next feature, code review, or coffee</span>
                      <span className="text-[10px] text-emerald-600 font-bold hidden sm:inline">Zero context fatigue</span>
                    </motion.div>
                  </div>
                </div>

                {/* Track 2: Autonomous Agents (Unattended execution) */}
                <div className="flex items-center gap-3">
                  <span className="w-16 font-mono text-xs font-bold text-[#2D2D32]">AGENTS</span>
                  <div className="flex-1 h-12 bg-neutral-100 rounded-xl p-1.5 flex gap-2">
                    {/* Idle while human plans */}
                    <div className="w-[38%] h-full bg-neutral-200/70 border-2 border-dashed border-neutral-300 rounded-lg flex items-center justify-center font-mono text-xs text-neutral-400">
                      <span>Waiting for settled plan…</span>
                    </div>

                    {/* Long autonomous execution band */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '62%' }}
                      transition={{ ...springPhysics, delay: 0.3 }}
                      className="h-full bg-[#111113] text-white rounded-lg flex items-center justify-between px-3.5 font-mono text-xs font-bold shadow-md"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="truncate">Autonomous execution (hours to a full day)</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-mono hidden sm:inline">
                        Sequential units
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Focus Architecture Insight */}
              <div className="pt-2 flex items-center justify-between text-xs text-[#4A4A55]">
                <span>Planning keeps all the context in your head. That's flow, and it's the part you cannot delegate.</span>
                <span className="font-mono text-xs font-semibold text-[#1B7ED0]">No interruptions</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Punchline (Build 2) */}
      <div className="z-10 pt-3 border-t-2 border-neutral-200">
        {showPunchline ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
            className="flex flex-wrap items-center justify-between gap-4 bg-blue-50 px-4 py-2.5 rounded-xl border-2 border-blue-200"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#1B7ED0] flex-shrink-0" />
              <span className="text-sm font-bold text-[#111113]">
                Plan it well, then one-shot the plan.
              </span>
              <span className="text-xs text-[#4A4A55] hidden sm:inline">
                (~90% lands cleanly on the first unattended run)
              </span>
            </div>
            <span className="font-mono text-xs text-neutral-500">
              Small bug? Quick question? Chat is fine.
            </span>
          </motion.div>
        ) : (
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Invest up front so execution never stops to ask.</span>
            <span>Flow beats churn</span>
          </div>
        )}
      </div>
    </div>
  );
}
