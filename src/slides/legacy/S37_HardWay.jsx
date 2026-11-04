import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { 
  AlertOctagon, 
  ShieldCheck, 
  FileWarning, 
  Clock, 
  Target, 
  Terminal, 
  Check, 
  ShieldAlert,
  GitBranch
} from 'lucide-react';
import meatSweatSvg from '../assets/meatproxy-emojis-svg/meat-sweat.svg';

/**
 * Slide 37: Learned the hard way.
 * 
 * Corner: 37 / Safety rails (Blue accent dot #1B7ED0, cutTier: 'B')
 * Headline: "Learned the hard way."
 * 
 * Visuals:
 *  - Postmortem incident cards cycling in the same spot, each stamped with the rule produced:
 *    Build 0: Incident 1: "An agent deleted untracked files. Unrecoverable."
 *             → Stamp: "Agents never delete files they didn't create."
 *    Build 1: Incident 2 & 3:
 *             - "An implementer sat idle for ~65 minutes." → "Stop it, resume it. Context intact."
 *             - "A check passed by measuring the wrong element (shared class)." → "Target data-testid, never utility classes."
 *    Build 2: Standing rules card + meat-sweat.svg mascot:
 *             "Explicit paths only. No git add -A, no push, no force."
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Incident Card 1.
 *  - 1: Incidents 2 & 3.
 *  - 2: Standing Rules Card + mascot payoff.
 */

export default function S37_HardWay({ activeSlide, buildStep }) {
  return (
    <div className="h-full w-full flex flex-col justify-between p-8 sm:p-10 md:p-14 lg:p-16 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
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
            Act IV · Safety Rails
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          Learned the hard way.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Every rule in our workflow was written after a real incident.
        </motion.p>
      </div>

      {/* Center Stage: Postmortem Incident Cards Deck */}
      <div className="my-auto w-full max-w-6xl mx-auto z-10 py-2">
        <AnimatePresence>
          
          {/* BUILD 0: INCIDENT 1 */}
          {buildStep === 0 && (
            <motion.div
              key="incident-1"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: appleEase }}
              className="bg-white rounded-3xl p-7 sm:p-9 border-2 border-red-300 shadow-md relative overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-neutral-100">
                <div className="flex items-center gap-2.5 text-red-600 font-mono text-sm font-bold">
                  <FileWarning className="w-5 h-5 stroke-[2.2px]" />
                  <span>INCIDENT #01 · UNTRACKED FILE LOSS</span>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-red-50 border-2 border-red-200 text-red-700 font-bold">
                  Severity: Unrecoverable
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-neutral-50 rounded-2xl p-4 sm:p-5 border-2 border-neutral-200">
                  <div className="text-xs font-mono text-neutral-400 uppercase font-bold mb-1">What Happened</div>
                  <p className="text-lg sm:text-xl font-medium text-neutral-800 leading-snug">
                    "An autonomous cleanup subagent saw uncommitted local files, judged them to be temporary debris, and ran <code className="bg-white px-2 py-0.5 rounded border-2 border-neutral-300 font-mono text-red-600 text-base">rm -rf</code>. Untracked exploratory work was completely gone."
                  </p>
                </div>

                {/* Stamped Rule */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, rotate: -2 }}
                  animate={{ opacity: 1, scale: 1, rotate: -1 }}
                  transition={{ delay: 0.3, duration: 0.4, ...springPhysics }}
                  className="bg-emerald-50 rounded-2xl p-5 border-2 border-emerald-400 flex items-start sm:items-center gap-4 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-6 h-6 stroke-[2.2px]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-emerald-800 font-bold uppercase tracking-wider">
                      Immutable Standing Rule
                    </div>
                    <p className="text-lg sm:text-xl font-bold text-emerald-950 mt-0.5">
                      "Agents never delete files they didn't create."
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* BUILD 1: INCIDENTS 2 & 3 */}
          {buildStep === 1 && (
            <motion.div
              key="incident-2-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: appleEase }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {/* Card 2: Idle Hang */}
              <div className="bg-white rounded-3xl p-6 border-2 border-neutral-300 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
                    <div className="flex items-center gap-2 text-amber-600 font-mono text-xs font-bold">
                      <Clock className="w-4 h-4 stroke-[2.2px]" />
                      <span>INCIDENT #02 · THE 65-MIN HANG</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 border-2 border-amber-200 text-amber-800 font-bold">
                      Token Burn
                    </span>
                  </div>

                  <p className="text-base font-medium text-neutral-800 leading-snug">
                    "An implementer sat waiting on an interactive stdin prompt for ~65 minutes, very politely, burning timeout limits."
                  </p>
                </div>

                <div className="mt-5 p-3.5 rounded-2xl bg-blue-50 border-2 border-blue-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#1B7ED0] text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3px]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#1B7ED0] font-bold">Workflow Rule</div>
                    <div className="text-xs sm:text-sm font-bold text-neutral-900">"Stop it, resume it. Context stays intact."</div>
                  </div>
                </div>
              </div>

              {/* Card 3: Wrong Element Tolerance */}
              <div className="bg-white rounded-3xl p-6 border-2 border-neutral-300 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
                    <div className="flex items-center gap-2 text-red-600 font-mono text-xs font-bold">
                      <Target className="w-4 h-4 stroke-[2.2px]" />
                      <span>INCIDENT #03 · WRONG ELEMENT</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-50 border-2 border-red-200 text-red-700 font-bold">
                      False Green
                    </span>
                  </div>

                  <p className="text-base font-medium text-neutral-800 leading-snug">
                    "A visual check passed because it measured a generic utility class (<code className="font-mono text-xs bg-neutral-100 px-1 py-0.5 rounded border border-neutral-300">.col-flex</code>) shared by another off-screen element."
                  </p>
                </div>

                <div className="mt-5 p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 stroke-[3px]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-emerald-800 font-bold">Verification Rule</div>
                    <div className="text-xs sm:text-sm font-bold text-neutral-900">"Target data-testid only. Never CSS utility classes."</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* BUILD 2: STANDING RULES CARD + MASCOT */}
          {buildStep >= 2 && (
            <motion.div
              key="standing-rules"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: appleEase }}
              className="bg-neutral-900 rounded-3xl p-7 sm:p-9 border-2 border-neutral-800 text-neutral-100 shadow-2xl relative overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b-2 border-neutral-800 gap-2">
                <div className="flex items-center gap-2.5 text-emerald-400 font-mono text-sm font-bold">
                  <ShieldAlert className="w-5 h-5 stroke-[2.2px]" />
                  <span>PERMANENT STANDING SAFETY PROTOCOL</span>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-neutral-800 border-2 border-neutral-700 text-neutral-300">
                  Enforced in session README
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* 3 Strict Rails (8 cols) */}
                <div className="md:col-span-8 space-y-3">
                  <div className="p-3.5 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-red-600/20 border border-red-500 text-red-400 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                      01
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-white">Explicit file paths only</div>
                      <div className="text-xs text-neutral-400 font-mono">No `git add -A` · No wildcard staging</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-600/20 border border-amber-500 text-amber-400 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                      02
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-white">Local commits only</div>
                      <div className="text-xs text-neutral-400 font-mono">No push to remote · No force pushing</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600/20 border border-emerald-500 text-emerald-400 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                      03
                    </div>
                    <div>
                      <div className="text-sm sm:text-base font-bold text-white">Pixel-tight tolerances</div>
                      <div className="text-xs text-neutral-400 font-mono">≤ 4px alignment checks · No loose 40px bounding boxes</div>
                    </div>
                  </div>
                </div>

                {/* Mascot + Quote (4 cols) */}
                <div className="md:col-span-4 flex flex-col items-center justify-center p-4 bg-neutral-800/50 rounded-2xl border border-neutral-700/60 text-center">
                  <img 
                    src={meatSweatSvg} 
                    alt="Sweating mascot" 
                    className="w-20 h-20 drop-shadow-md mb-2"
                  />
                  <div className="text-xs font-mono text-amber-400 font-bold">
                    "Every rule has a story."
                  </div>
                  <div className="text-xs text-neutral-400 mt-1">
                    Keep humans in charge of pushing code to main.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
