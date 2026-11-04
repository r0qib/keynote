import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { Brain, Cpu, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * Slide 31: How I actually work.
 * 
 * Act IV: Making It Good
 * Headline: "How I actually work."
 * One idea: Plan attended with a human. Execute unattended with agents. Review at checkpoints.
 * 
 * Builds:
 *  - 0: The 3 broad phases shown across the canvas.
 *  - 1: Phase 1 (Planning details: brainstorming, grill-me interview, settled plan.md).
 *  - 2: Phase 2 (Unattended execution: Implementer + Reviewer DAG, verification gates).
 *  - 3: Phase 3 (Checkpoint Review: Human in browser, verifying real output).
 */
export default function S31_MyLoop({ activeSlide, buildStep }) {
  const showPlan = buildStep >= 1;
  const showExec = buildStep >= 2;
  const showReview = buildStep >= 3;

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
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
        >
          How I actually work.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Plan attended with a human. Execute unattended with agents. Review at checkpoints.
        </motion.p>
      </div>

      {/* Main Center Stage: The 3 Core Pillars */}
      <div className="my-auto w-full max-w-6xl mx-auto z-10 py-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          
          {/* Phase 1: Deep Planning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
            className={`bg-white rounded-3xl p-6 sm:p-8 border-2 shadow-sm flex flex-col justify-between transition-all ${
              showPlan ? 'border-[#1B7ED0] shadow-md ring-2 ring-[#1B7ED0]/20' : 'border-neutral-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1B7ED0] bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  Phase 1 · Attended
                </span>
                <span className="text-xs font-mono font-semibold text-neutral-400">Human + AI</span>
              </div>

              <div className="text-2xl font-black tracking-tight text-[#111113] mb-4 flex items-center gap-2.5">
                <Brain className="w-6 h-6 text-[#1B7ED0]" />
                <span>Deep Planning</span>
              </div>

              <div className="space-y-3 text-sm text-[#4A4A55]">
                {showPlan ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 font-medium"
                    >
                      <span className="font-mono font-bold text-[#1B7ED0] mr-2">1.</span>
                      <strong>Brainstorm alone:</strong> Clarify what to build, and what <em>not</em> to build.
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 font-medium"
                    >
                      <span className="font-mono font-bold text-[#1B7ED0] mr-2">2.</span>
                      <strong>AI Interview:</strong> It grills me on edge cases until zero doubts remain.
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 font-medium"
                    >
                      <span className="font-mono font-bold text-[#1B7ED0] mr-2">3.</span>
                      <strong>Execution Plan:</strong> Lock in <code className="font-mono font-bold text-neutral-800">plan.md</code> and verification criteria.
                    </motion.div>
                  </>
                ) : (
                  <p className="text-neutral-400 font-medium py-6 text-center">
                    All requirements and edge cases answered upfront before writing code.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-100 text-xs font-mono text-neutral-400">
              Focus time: ~2–3 hours upfront
            </div>
          </motion.div>

          {/* Phase 2: Autonomous Run */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
            className={`bg-white rounded-3xl p-6 sm:p-8 border-2 shadow-sm flex flex-col justify-between transition-all ${
              showExec ? 'border-emerald-500 shadow-md ring-2 ring-emerald-500/20' : 'border-neutral-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Phase 2 · Unattended
                </span>
                <span className="text-xs font-mono font-semibold text-neutral-400">Agents Only</span>
              </div>

              <div className="text-2xl font-black tracking-tight text-[#111113] mb-4 flex items-center gap-2.5">
                <Cpu className="w-6 h-6 text-emerald-600" />
                <span>Autonomous Run</span>
              </div>

              <div className="space-y-3 text-sm text-[#4A4A55]">
                {showExec ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-xl bg-neutral-900 text-neutral-100 font-mono text-xs"
                    >
                      <div className="text-emerald-400 font-bold mb-1">Queue Execution</div>
                      <div className="text-neutral-300">✓ Unit 1: Schema & Data Model</div>
                      <div className="text-neutral-300">✓ Unit 2: UI View Skeleton</div>
                      <div className="text-amber-400 animate-pulse">⟳ Unit 3: Verification Gate</div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 font-medium text-xs sm:text-sm"
                    >
                      Never stops to ask questions. Decides, logs rationale in decisions.md, and advances.
                    </motion.div>
                  </>
                ) : (
                  <p className="text-neutral-400 font-medium py-6 text-center">
                    Agents execute sequentially across fresh context windows.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-100 text-xs font-mono text-neutral-400">
              Execution: Hours to a full day (unattended)
            </div>
          </motion.div>

          {/* Phase 3: Checkpoint Review */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5, ease: appleEase }}
            className={`bg-white rounded-3xl p-6 sm:p-8 border-2 shadow-sm flex flex-col justify-between transition-all ${
              showReview ? 'border-amber-500 shadow-md ring-2 ring-amber-500/20' : 'border-neutral-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-100">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                  Phase 3 · Attended
                </span>
                <span className="text-xs font-mono font-semibold text-neutral-400">Human Checkpoint</span>
              </div>

              <div className="text-2xl font-black tracking-tight text-[#111113] mb-4 flex items-center gap-2.5">
                <Eye className="w-6 h-6 text-amber-600" />
                <span>Checkpoint Review</span>
              </div>

              <div className="space-y-3 text-sm text-[#4A4A55]">
                {showReview ? (
                  <>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 font-medium"
                    >
                      <strong>Human in the Browser:</strong>
                      <p className="text-xs text-neutral-600 mt-1">
                        Review diffs in git, test live in browser, review logged decisions.
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 font-mono text-xs text-neutral-700 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>One review pass. Max 1 fix round. Then merge.</span>
                    </motion.div>
                  </>
                ) : (
                  <p className="text-neutral-400 font-medium py-6 text-center">
                    Human reviews batch diffs, tests in browser, and signs off.
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-neutral-100 text-xs font-mono text-neutral-400">
              Review time: 15–20 minutes per batch
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}
