import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { Brain, Cpu, Eye, CheckCircle2, RotateCw, ArrowRight, CornerDownLeft } from 'lucide-react';

/**
 * Slide 31: How I actually work.
 * 
 * Corner: 31 / Feature-specific workflows (Blue accent dot #1B7ED0)
 * Headline: "How I actually work."
 * 
 * Visual: Three connected regions:
 *  - Phase 1 · Attended (Plan): You + AI (1. Brainstorm alone, 2. AI interview, 3. Plan & workflow files)
 *  - Phase 2 · Unattended (Execute): Agents execute sequentially, unit by unit
 *  - Phase 3 · Attended (Review): Checkpoint review + looping "continue" arrow back to execute
 * 
 * Builds (totalBuilds: 3):
 *  - 0: Three phase regions overview.
 *  - 1: Phase 1 details (3 planning steps).
 *  - 2: Phase 2 details (kickoff vector, running unit ticks).
 *  - 3: Phase 3 review checkpoint, looping continue arrow, and 3 foundational signpost rules:
 *       "Every question answered up front" · "The files are the memory" · "The right model for each job".
 */

export default function S31_MyLoop({ activeSlide, buildStep }) {
  const showPlan = buildStep >= 1;
  const showExec = buildStep >= 2;
  const showReviewAndRules = buildStep >= 3;

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
            Act IV · The Loop
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          How I actually work.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Plan attended with a human. Execute unattended with agents. Review at checkpoints.
        </motion.p>
      </div>

      {/* Center Stage: Three Phase Regions Connected with Vector Arrows */}
      <div className="my-auto w-full max-w-5xl mx-auto flex flex-col justify-center z-10 py-2">
        
        {/* The 3 Phase Regions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
          
          {/* ========================================================= */}
          {/* PHASE 1: Attended (Plan)                                  */}
          {/* ========================================================= */}
          <div className="bg-white rounded-2xl p-5 border-2 border-neutral-300 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B7ED0] bg-blue-50 px-2 py-0.5 rounded border-2 border-blue-200">
                  Phase 1 · Attended
                </span>
                <span className="text-xs font-mono font-semibold text-neutral-400">You + AI</span>
              </div>

              <div className="text-lg font-black tracking-tight text-[#111113] mb-3 flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#1B7ED0]" />
                <span>Deep Planning</span>
              </div>

              {/* Steps (Build 1) */}
              <div className="space-y-2.5 text-xs text-[#4A4A55]">
                {showPlan ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="p-2 rounded-lg bg-neutral-50 border-2 border-neutral-200 font-medium"
                    >
                      <span className="font-mono font-bold text-[#1B7ED0] mr-1.5">1.</span>
                      <strong>Brainstorm alone:</strong> Write what to do, and what <em>not</em> to do.
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="p-2 rounded-lg bg-neutral-50 border-2 border-neutral-200 font-medium"
                    >
                      <span className="font-mono font-bold text-[#1B7ED0] mr-1.5">2.</span>
                      <strong>AI interview:</strong> It grills me on edge cases until zero doubts remain.
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3, duration: 0.4 }}
                      className="p-2 rounded-lg bg-neutral-50 border-2 border-neutral-200 font-medium"
                    >
                      <span className="font-mono font-bold text-[#1B7ED0] mr-1.5">3.</span>
                      <strong>Workflow generation:</strong> Settle <code className="font-mono bg-white px-1 py-0.5 rounded border-2 border-neutral-300">plan.md</code> & unit specs.
                    </motion.div>
                  </>
                ) : (
                  <div className="text-neutral-400 font-mono text-xs py-4 text-center">
                    (Click next to view planning breakdown)
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-2 border-t-2 border-neutral-100 text-[11px] font-mono text-neutral-400">
              Duration: ~2–3 hours upfront
            </div>
          </div>

          {/* ========================================================= */}
          {/* PHASE 2: Unattended (Execute)                             */}
          {/* ========================================================= */}
          <div className="bg-white rounded-2xl p-5 border-2 border-neutral-300 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border-2 border-emerald-200">
                  Phase 2 · Unattended
                </span>
                <span className="text-xs font-mono font-semibold text-neutral-400">Agents Only</span>
              </div>

              <div className="text-lg font-black tracking-tight text-[#111113] mb-3 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-700" />
                <span>Autonomous Run</span>
              </div>

              {/* Execution details (Build 2) */}
              <div className="space-y-2 text-xs font-mono">
                {showExec ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-2 rounded-lg bg-neutral-900 text-white font-mono text-[11px] space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-neutral-400 border-b-2 border-neutral-700 pb-1">
                        <span>Autonomous Queue</span>
                        <span className="text-emerald-400">2 / 4 complete</span>
                      </div>
                      <div className="text-emerald-400 flex items-center gap-1.5">
                        <span>[x]</span> <span>Unit 1: API Client & DTO</span>
                      </div>
                      <div className="text-emerald-400 flex items-center gap-1.5">
                        <span>[x]</span> <span>Unit 2: Grid Table Skeleton</span>
                      </div>
                      <div className="text-amber-300 flex items-center gap-1.5 animate-pulse">
                        <span>[~]</span> <span>Unit 3: Keyboard Nav Hook</span>
                      </div>
                      <div className="text-neutral-500 flex items-center gap-1.5">
                        <span>[ ]</span> <span>Unit 4: Verification Gate</span>
                      </div>
                    </motion.div>

                    <div className="text-[11px] text-[#4A4A55] font-sans font-medium pt-1">
                      Never stops to ask. Decides, logs reason in <code className="font-mono bg-neutral-100 px-1 rounded border-2 border-neutral-200">decisions.md</code>, and advances.
                    </div>
                  </>
                ) : (
                  <div className="text-neutral-400 font-mono text-xs py-4 text-center">
                    (Kickoff prompt fires autonomous execution)
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-2 border-t-2 border-neutral-100 text-[11px] font-mono text-neutral-400">
              Duration: Hours to a full day
            </div>
          </div>

          {/* ========================================================= */}
          {/* PHASE 3: Attended (Review & Loop)                         */}
          {/* ========================================================= */}
          <div className="bg-white rounded-2xl p-5 border-2 border-neutral-300 shadow-sm flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2 py-0.5 rounded border-2 border-amber-200">
                  Phase 3 · Attended
                </span>
                <span className="text-xs font-mono font-semibold text-neutral-400">Human Checkpoint</span>
              </div>

              <div className="text-lg font-black tracking-tight text-[#111113] mb-3 flex items-center gap-2">
                <Eye className="w-5 h-5 text-amber-700" />
                <span>Checkpoint Review</span>
              </div>

              {/* Review details (Build 3) */}
              <div className="space-y-2 text-xs text-[#4A4A55]">
                {showReviewAndRules ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="p-2.5 rounded-lg bg-blue-50 border-2 border-blue-200 font-medium"
                    >
                      <div className="font-bold text-[#111113] mb-1">Human in the browser:</div>
                      <p className="leading-snug">
                        Review diffs in git, test live in browser, answer questions in <code className="font-mono bg-white px-1 rounded border-2 border-neutral-200">human-review.md</code>.
                      </p>
                    </motion.div>

                    {/* Animated Looping Continue Arrow */}
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-neutral-100 text-[#111113] font-mono text-xs font-bold border-2 border-neutral-200">
                      <RotateCw className="w-4 h-4 text-[#1B7ED0] animate-spin" />
                      <span>Say "continue" → loops back</span>
                    </div>
                  </>
                ) : (
                  <div className="text-neutral-400 font-mono text-xs py-4 text-center">
                    (Review checkpoints & continuation loop)
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-2 border-t-2 border-neutral-100 text-[11px] font-mono text-neutral-400">
              Duration: 15–20 min per batch
            </div>
          </div>
        </div>

        {/* Build 3: Three Signpost Rules (Bottom of Center Stage) */}
        {showReviewAndRules && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: appleEase }}
            className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3"
          >
            <div className="bg-blue-50/70 rounded-xl p-3 border-2 border-blue-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase text-[#1B7ED0]">Rule 01 · Planning</div>
                <div className="text-xs font-bold text-[#111113]">Every question answered up front.</div>
              </div>
            </div>

            <div className="bg-blue-50/70 rounded-xl p-3 border-2 border-blue-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase text-[#1B7ED0]">Rule 02 · Memory</div>
                <div className="text-xs font-bold text-[#111113]">The files are the memory.</div>
              </div>
            </div>

            <div className="bg-blue-50/70 rounded-xl p-3 border-2 border-blue-200 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono font-bold uppercase text-[#1B7ED0]">Rule 03 · Execution</div>
                <div className="text-xs font-bold text-[#111113]">The right model for each job.</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Footer */}
      <div className="z-10 pt-3 border-t-2 border-neutral-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-xs sm:text-sm text-[#4A4A55] font-semibold">
            Meta: this presentation deck was created using the exact same loop.
          </div>

          <div className="font-mono text-xs text-neutral-400">
            Phase 1 → Phase 2 → Phase 3
          </div>
        </div>
      </div>
    </div>
  );
}
