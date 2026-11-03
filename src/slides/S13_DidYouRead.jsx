import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { MessageSquare, GitCommit, CheckCircle2, FileCode2 } from 'lucide-react';
import meatCrySvg from '../assets/meatproxy-emojis-svg/meat-cry.svg';

/**
 * Slide 13: Did you even read what I said?
 * 
 * Corner: 13 / Selective hearing (Amber accent dot #D97706, cutTier: 'B')
 * Headline: "Did you even read what I said?"
 * One idea: It appears to follow the instruction, and doesn't.
 * 
 * Visual: 3 instruction -> result pairs cycling cleanly in the EXACT SAME SPOT:
 *  - Pair 1 (Build 0): "Make the tests pass. Don't touch the tests." -> it.skip -> ✓ All tests pass
 *  - Pair 2 (Build 1): "Only change the button colour." -> 14 files changed, 612 insertions(+), 88 deletions(-)
 *  - Pair 3 (Build 2): "No comments in the code, please." -> // Removed all comments as requested + meat-cry.svg
 * 
 * Builds:
 *  - 0: Pair 1
 *  - 1: Pair 2 replaces Pair 1
 *  - 2: Pair 3 replaces Pair 2, revealing meat-cry.svg in the corner
 */
export default function S13_DidYouRead({ activeSlide, buildStep }) {
  // Current active pair index clamped between 0 and 2
  const activePair = Math.min(Math.max(buildStep, 0), 2);

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
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            Instruction Compliance
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
        >
          Did you even read what I said?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          It aims for "looks done". Green tests look done, so skipping them counts.
        </motion.p>
      </div>

      {/* Center Stage: Fixed Viewport Container for In-Place Replacement */}
      <div className="my-auto w-full max-w-4xl mx-auto min-h-[340px] sm:min-h-[380px] flex items-center justify-center z-10 py-2">
        <AnimatePresence mode="wait">
          
          {/* Pair 1: Tests pass */}
          {activePair === 0 && (
            <motion.div
              key="pair-tests"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: appleEase }}
              className="w-full flex flex-col gap-4"
            >
              {/* User Prompt Bubble */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-neutral-300 flex items-center justify-center font-mono text-xs font-bold text-neutral-700">
                  You
                </div>
                <div className="bg-white border-2 border-neutral-300 rounded-2xl px-5 py-3 shadow-sm text-base sm:text-lg md:text-xl font-semibold text-neutral-900">
                  "Make the tests pass. Don't touch the tests."
                </div>
              </div>

              {/* Terminal / Code Result */}
              <div className="bg-[#18181B] text-neutral-100 rounded-2xl p-6 border-2 border-neutral-800 shadow-xl font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-800 text-neutral-400 text-xs">
                  <span>tests/rig-telemetry.spec.ts — diff</span>
                  <span className="text-amber-500 font-bold">1 line changed</span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="bg-red-950/40 text-red-300 px-3 py-1.5 rounded border-l-2 border-red-500">
                    - it('calculates drill string depth accurately', () =&gt; &#123; ... &#125;)
                  </div>
                  <div className="bg-amber-950/40 text-amber-300 px-3 py-1.5 rounded border-l-2 border-amber-500 font-bold">
                    + it.skip('calculates drill string depth accurately', () =&gt; &#123; ... &#125;)
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t-2 border-neutral-800 flex items-center justify-between text-emerald-400 font-bold">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold text-base">✓</span>
                    <span>PASS src/telemetry.spec.ts (42 passed, 1 skipped)</span>
                  </div>
                  <span className="text-xs text-neutral-500 font-normal">All tests green!</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-500 font-mono px-2">
                <span>"Technically correct. The best kind of correct."</span>
                <span className="text-neutral-400">Green checks don't mean working software</span>
              </div>
            </motion.div>
          )}

          {/* Pair 2: Button color -> 14 files */}
          {activePair === 1 && (
            <motion.div
              key="pair-button"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: appleEase }}
              className="w-full flex flex-col gap-4"
            >
              {/* User Prompt Bubble */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-neutral-300 flex items-center justify-center font-mono text-xs font-bold text-neutral-700">
                  You
                </div>
                <div className="bg-white border-2 border-neutral-300 rounded-2xl px-5 py-3 shadow-sm text-base sm:text-lg md:text-xl font-semibold text-neutral-900">
                  "Only change the button colour."
                </div>
              </div>

              {/* Terminal / Git Diff Summary */}
              <div className="bg-[#18181B] text-neutral-100 rounded-2xl p-6 border-2 border-neutral-800 shadow-xl font-mono text-xs sm:text-sm">
                <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-800 text-neutral-400 text-xs">
                  <span>git status &amp;&amp; git diff --stat</span>
                  <span className="text-amber-500 font-bold">Stage blast radius</span>
                </div>

                <div className="mt-4 flex flex-col gap-1.5 text-xs text-neutral-300">
                  <div className="text-neutral-400">tailwind.config.js       |  42 ++++++++++++++++++</div>
                  <div className="text-neutral-400">src/styles/theme.css      |  89 ++++++++++++++++++++++++++++++</div>
                  <div className="text-neutral-400">src/components/Button.tsx |  18 +++++-</div>
                  <div className="text-neutral-400">src/components/Header.tsx |  64 ++++++++++++++++++---</div>
                  <div className="text-neutral-400">package.json              |   3 +-</div>
                  <div className="text-neutral-500 italic">... and 9 other files refactored to align the color hierarchy</div>
                </div>

                <div className="mt-5 pt-3 border-t-2 border-neutral-800 flex items-center justify-between text-amber-400 font-bold">
                  <div className="flex items-center gap-2">
                    <GitCommit className="w-4 h-4 text-amber-500" />
                    <span>14 files changed, 612 insertions(+), 88 deletions(-)</span>
                  </div>
                  <span className="text-xs text-emerald-400 font-normal">Button color is indeed changed ✓</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-neutral-500 font-mono px-2">
                <span>"The colour is right, though."</span>
                <span className="text-neutral-600">Refactored the whole UI hierarchy unprompted</span>
              </div>
            </motion.div>
          )}

          {/* Pair 3: No comments in code */}
          {activePair === 2 && (
            <motion.div
              key="pair-comments"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: appleEase }}
              className="w-full flex flex-col gap-4 relative"
            >
              {/* User Prompt Bubble */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-neutral-300 flex items-center justify-center font-mono text-xs font-bold text-neutral-700">
                  You
                </div>
                <div className="bg-white border-2 border-neutral-300 rounded-2xl px-5 py-3 shadow-sm text-base sm:text-lg md:text-xl font-semibold text-neutral-900">
                  "No comments in the code, please."
                </div>
              </div>

              {/* Terminal / Code File */}
              <div className="bg-[#18181B] text-neutral-100 rounded-2xl p-6 border-2 border-neutral-800 shadow-xl font-mono text-xs sm:text-sm relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-800 text-neutral-400 text-xs">
                  <span>src/calc/formationPressure.ts</span>
                  <span className="text-emerald-400 font-bold">Compliant</span>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="bg-amber-950/50 text-amber-300 px-3 py-2 rounded border-l-2 border-amber-500 font-bold">
                    // Removed all comments as requested
                  </div>
                  <div className="text-neutral-300 px-3 py-1">
                    export function calculatePorePressure(tvd: number, gradient: number) &#123;
                  </div>
                  <div className="text-neutral-400 px-6">
                    return tvd * gradient * 0.052;
                  </div>
                  <div className="text-neutral-300 px-3 py-1">&#125;</div>
                </div>

                <div className="mt-5 pt-3 border-t-2 border-neutral-800 flex items-center justify-between text-neutral-400">
                  <span>Total comments in file: 1</span>
                  <span className="text-neutral-500 text-xs">It explained that it removed comments</span>
                </div>
              </div>

              {/* Sad Mascot Blob: meat-cry.svg sitting in corner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={springPhysics}
                className="absolute -right-4 -bottom-10 sm:-right-8 sm:-bottom-12 flex items-center gap-3 z-30"
              >
                <div className="bg-white/95 border-2 border-neutral-300 rounded-2xl px-3 py-1.5 shadow-md font-mono text-[11px] text-neutral-700">
                  *deadpan silence*
                </div>
                <img
                  src={meatCrySvg}
                  alt="Mascot meat crying"
                  className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-md select-none pointer-events-none"
                />
              </motion.div>

              <div className="flex items-center justify-between text-xs text-neutral-500 font-mono px-2">
                <span>"A comment explaining that it removed all comments."</span>
                <span className="text-neutral-400">Strict compliance at its finest</span>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom Step Indicator Bar */}
      <div className="z-10 flex items-center justify-between pt-3 border-t-2 border-neutral-200 text-xs text-[#4A4A55] font-mono">
        <div className="flex items-center gap-3">
          <span>
            {activePair === 0 && 'Skipping tests to get green checks'}
            {activePair === 1 && 'Refactoring 14 files for a button color'}
            {activePair === 2 && 'Adding a comment to say comments are gone'}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((idx) => (
            <span
              key={idx}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activePair === idx ? 'bg-[#D97706] w-6' : 'bg-neutral-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
