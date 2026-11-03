import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { 
  CheckCircle2, 
  AlertCircle, 
  ShieldAlert, 
  Terminal, 
  Monitor, 
  GitCommit, 
  ArrowRight, 
  Check, 
  AlertTriangle,
  Lock,
  Layers
} from 'lucide-react';

/**
 * Slide 36: Never trust "it passes".
 * 
 * Corner: 36 / Verification (Blue accent dot #1B7ED0)
 * Headline: "Never trust 'it passes'."
 * 
 * Visuals:
 *  - Build 0: Green checks stack: lint [pass], tsc [clean], 4,900 unit tests [pass] (callback to S13 it.skip), build [clean]
 *  - Build 1: Beside them, browser wireframe labeled "1280 px" with red circled visual bugs:
 *             clipped popover, misaligned column, duplicated tooltip.
 *  - Build 2: Probe split: Orchestrator writes probe → Haiku runner (returns raw JSON) → Sonnet validator (recomputes math)
 *  - Build 3: Commit Gate: git add -- <paths> → pre-commit hooks (design:check → lint) → commit.
 *             Caption: "The last gate. Agents can't skip it: no --no-verify."
 *             Payoff to S02 (the rig) & S13 (skipped tests).
 * 
 * Builds (totalBuilds: 3):
 *  - 0: Green checks stack on entry.
 *  - 1: 1280px browser frame with red circled bugs.
 *  - 2: Runner/validator split architecture.
 *  - 3: Unskippable pre-commit gate.
 */

const GREEN_CHECKS = [
  { name: 'eslint', label: 'lint', status: '0 errors', note: 'passes syntax' },
  { name: 'tsc', label: 'tsc', status: 'clean', note: 'types check out' },
  { name: 'vitest', label: '4,900 unit tests', status: 'passed', note: 'all assertions green' },
  { name: 'vite build', label: 'build', status: 'bundled', note: 'assets output' },
];

export default function S36_DontTrust({ activeSlide, buildStep }) {
  const show1280px = buildStep >= 1;
  const showProbeSplit = buildStep >= 2;
  const showCommitGate = buildStep >= 3;

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
            Act IV · Verification Engineering
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          Never trust "it passes".
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Green checks aren't proof. Verify for real, and let unskippable gates have the last word.
        </motion.p>
      </div>

      {/* Center Stage: Split between Tests, 1280px Browser Reality, and Probe Split */}
      <div className="my-auto w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch z-10 py-2">
        
        {/* Left Column: Stack of Green Checks (3 or 4 cols) */}
        <div className="lg:col-span-3 flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-5 border-2 border-neutral-300 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                Terminal Output
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border-2 border-emerald-200 text-emerald-700 font-bold flex items-center gap-1">
                <span>ALL GREEN</span>
                <Check className="w-3 h-3 stroke-[3px]" />
              </span>
            </div>

            <div className="space-y-2">
              {GREEN_CHECKS.map((chk, i) => (
                <motion.div
                  key={chk.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="p-2.5 rounded-xl border-2 border-emerald-200 bg-emerald-50/50 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3px]" />
                    </div>
                    <div>
                      <span className="font-mono font-bold text-[#111113]">{chk.label}</span>
                      <div className="text-[10px] text-neutral-500">{chk.note}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-emerald-700 font-bold">
                    {chk.status}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t-2 border-neutral-100 text-[10px] text-red-600 font-mono font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 stroke-2 shrink-0 text-red-500" />
            <span>Green is a claim, not proof.</span>
          </div>
        </div>

        {/* Middle Column: 1280px Wireframe Reality (4 or 5 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-5 border-2 border-neutral-300 shadow-sm relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#1B7ED0]" />
                <span className="text-xs font-mono font-bold text-[#111113]">Browser Viewport</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 border-2 border-blue-200 text-[#1B7ED0] font-bold">
                1280 px (Rig standard)
              </span>
            </div>

            {/* Simulated 1280px layout with real visual bugs */}
            {show1280px ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: appleEase }}
                className="bg-neutral-50 rounded-xl p-3 border-2 border-neutral-200 text-xs relative space-y-2.5 overflow-hidden"
              >
                {/* Header row with column misalign */}
                <div className="grid grid-cols-3 gap-2 font-mono text-[11px] font-bold text-neutral-700 pb-1.5 border-b-2 border-neutral-200 relative">
                  <div>Wellbore</div>
                  <div>TVD (m)</div>
                  <div className="relative">
                    Flow Rate
                    {/* Bug 1: Misaligned column */}
                    <span className="absolute -top-1 -right-1 px-1.5 py-0.2 bg-red-100 border-2 border-red-400 text-red-700 text-[9px] rounded-full font-bold">
                      offset!
                    </span>
                  </div>
                </div>

                {/* Row 1 */}
                <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-neutral-600 items-center">
                  <div>15/9-F-12 A</div>
                  <div>3,412.5</div>
                  <div className="text-red-600 font-bold">840 bbl/d</div>
                </div>

                {/* Bug 2: Clipped popover card hanging off the screen */}
                <div className="relative pt-1">
                  <div className="p-2 bg-white rounded-lg border-2 border-red-400 text-[10px] shadow-sm relative max-w-[190px]">
                    <div className="font-bold text-neutral-800">Telemetry Sensor 04</div>
                    <div className="text-neutral-500 text-[9px]">Status: Active telemetry feed</div>
                    {/* Overflow label */}
                    <div className="absolute -top-2 -right-3 bg-red-600 text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                      Clipped at 1280px!
                    </div>
                  </div>
                </div>

                {/* Bug 3: Duplicate tooltip */}
                <div className="flex items-center gap-1.5 pt-1 text-[10px] text-neutral-500">
                  <span className="px-1.5 py-0.5 bg-neutral-200 rounded font-mono text-[9px]">Tooltip A</span>
                  <span className="px-1.5 py-0.5 bg-red-100 border-2 border-red-400 text-red-700 rounded font-mono text-[9px] font-bold">
                    Duplicate Tooltip!
                  </span>
                </div>

              </motion.div>
            ) : (
              <div className="h-44 flex items-center justify-center text-xs text-neutral-400 italic">
                Awaiting viewport inspection...
              </div>
            )}
          </div>

          <div className="mt-3 pt-2 border-t-2 border-neutral-100 text-[10px] text-[#4A4A55] font-mono flex items-center justify-between">
            <span>Unit tests see DOM nodes.</span>
            <span className="text-red-600 font-bold">Humans see the layout break.</span>
          </div>
        </div>

        {/* Right Column: Probe Split Architecture (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-2xl p-4 sm:p-5 border-2 border-neutral-300 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                Verification Probe Split
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 border-2 border-blue-200 text-[#1B7ED0] font-bold">
                Cheapest Model · Hard Numbers
              </span>
            </div>

            {showProbeSplit ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: appleEase }}
                className="space-y-3"
              >
                {/* Step 1: Orchestrator writes probe */}
                <div className="p-2.5 rounded-xl border-2 border-neutral-200 bg-neutral-50 text-xs">
                  <div className="font-bold text-[#111113] flex items-center justify-between">
                    <span>1. Orchestrator writes probe script</span>
                    <span className="font-mono text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border-2 border-amber-200">
                      Opus
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-1">
                    Evaluates exact bounding rects, computed styles, scroll offsets.
                  </p>
                </div>

                {/* Step 2: Haiku runner */}
                <div className="p-2.5 rounded-xl border-2 border-emerald-300 bg-emerald-50/50 text-xs">
                  <div className="font-bold text-[#111113] flex items-center justify-between">
                    <span>2. Haiku runs probe in headless browser</span>
                    <span className="font-mono text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded border-2 border-emerald-300">
                      Haiku · &lt;$0.01
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-600 mt-1 font-mono">
                    Returns raw JSON: <code className="bg-white px-1 py-0.5 rounded border-2 border-neutral-200">{"{ right: 1294, width: 280 }"}</code>
                  </p>
                </div>

                {/* Step 3: Sonnet validator */}
                <div className="p-2.5 rounded-xl border-2 border-blue-300 bg-blue-50/50 text-xs">
                  <div className="font-bold text-[#111113] flex items-center justify-between">
                    <span>3. Sonnet validator checks the math</span>
                    <span className="font-mono text-[10px] text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded border-2 border-blue-300">
                      Sonnet
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-600 mt-1">
                    Never opens a browser. Simply asserts <code className="font-mono">right ≤ 1280</code>.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-44 flex items-center justify-center text-xs text-neutral-400 italic">
                Awaiting probe architecture...
              </div>
            )}
          </div>

          <div className="mt-3 pt-2 border-t-2 border-neutral-100 text-[10px] text-[#4A4A55] font-mono flex items-center justify-between">
            <span className="font-bold text-[#111113]">"Scripts over clicking."</span>
            <span className="text-[#1B7ED0]">Cheapest model. Numbers you can check.</span>
          </div>
        </div>

      </div>

      {/* Step 3 / Build 3: Unskippable Commit Gate */}
      {showCommitGate ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: appleEase }}
          className="z-10 bg-neutral-900 rounded-xl p-4 border-2 border-neutral-800 text-neutral-100 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-emerald-400 font-bold">The Last Gate: Git Pre-Commit Hook</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border-2 border-red-700 font-bold">
                  no --no-verify allowed
                </span>
              </div>
              <div className="font-mono text-xs text-neutral-300 mt-1 flex flex-wrap items-center gap-2">
                <span className="text-blue-400 font-semibold">git add -- &lt;paths&gt;</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                <span className="text-amber-300">pre-commit: design:check</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500" />
                <span className="text-emerald-300 font-bold">commit a1b2c3d</span>
              </div>
            </div>
          </div>

          <div className="text-xs text-neutral-400 font-medium self-end sm:self-center shrink-0">
            <span className="text-white font-semibold">"Remember the rig? This is why we check."</span>
          </div>
        </motion.div>
      ) : (
        <div className="z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#4A4A55] border-t-2 border-neutral-200 pt-3 gap-2">
          <span className="font-mono">An agent without a definition of done will happily invent one.</span>
          <span className="font-medium text-[#111113]">Strict bounds · Deterministic gates</span>
        </div>
      )}

    </div>
  );
}
