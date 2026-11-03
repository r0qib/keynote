import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { 
  Crown, 
  Cpu, 
  Zap, 
  ShieldCheck, 
  Terminal, 
  Code2, 
  Lock,
  Sparkles,
  Layers
} from 'lucide-react';

/**
 * Slide 34: Pay for judgment, not for typing.
 * 
 * Corner: 34 / Model routing (Blue accent dot #1B7ED0)
 * Headline: "Pay for judgment, not for typing."
 * 
 * Visuals:
 *  - Three horizontal model tiers stacked vertically with weight hints ($$$ / $$ / $):
 *     1. Opus · judges ($$$): Orchestrator, architecture, planning. Note: "never writes product code".
 *     2. Sonnet · builds & reviews ($$): Implementer, reviewer, explorer, validator. Workhorse.
 *     3. Haiku · runs ($): Browser runner, committer. Note: "only when fully scripted".
 *  - Build 3: Frontmatter configuration snippet slides in:
 *     name: dir-implementer, model: sonnet, effort: medium, maxTurns: 150
 *     Caption: "Routing can't drift mid-run."
 * 
 * Builds (totalBuilds: 3):
 *  - 0: Opus tier on screen.
 *  - 1: Sonnet tier enters.
 *  - 2: Haiku tier enters.
 *  - 3: Frontmatter snippet slides in + spoken payoff.
 */

export default function S34_TheTeam({ activeSlide, buildStep }) {
  const showSonnet = buildStep >= 1;
  const showHaiku = buildStep >= 2;
  const showFrontmatter = buildStep >= 3;

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
            Act IV · Model Routing
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          Pay for judgment, not for typing.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          The expensive model does judgment; cheap models do mechanics.
        </motion.p>
      </div>

      {/* Center Stage: 3 Model Tiers + Frontmatter Drawer */}
      <div className="my-auto w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center z-10 py-2">
        
        {/* Left Column: Stacked Mixing-Desk Tiers (7 or 8 cols depending on Build 3) */}
        <div className={`transition-all duration-500 ease-out ${showFrontmatter ? 'lg:col-span-7' : 'lg:col-span-12'} flex flex-col gap-3.5`}>
          
          {/* TIER 1: OPUS */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
            className="bg-white rounded-2xl p-5 border-2 border-neutral-300 shadow-sm relative overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-50 border-2 border-amber-300 flex items-center justify-center shrink-0">
                  <Crown className="w-6 h-6 text-amber-600 stroke-[2.2px]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-[#111113]">Opus</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-neutral-100 text-[#4A4A55] border-2 border-neutral-200">
                      $$$ · High judgment
                    </span>
                  </div>
                  <p className="text-sm text-[#4A4A55] mt-0.5">
                    Orchestrator · System Architecture · Upfront Planning
                  </p>
                </div>
              </div>

              {/* Strict Rule Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border-2 border-red-200 text-red-700 text-xs font-mono font-bold shrink-0 self-start sm:self-center">
                <Lock className="w-3.5 h-3.5 stroke-2" />
                <span>Never writes product code</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t-2 border-neutral-100 flex items-center justify-between text-xs text-[#4A4A55]">
              <span className="font-medium">Conducts the interview, defines contracts, settles ambiguity.</span>
              <span className="font-mono text-neutral-400 font-semibold">10–15 turns / session</span>
            </div>
          </motion.div>

          {/* TIER 2: SONNET */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showSonnet ? 1 : 0.25, 
              y: showSonnet ? 0 : 10,
              filter: showSonnet ? 'blur(0px)' : 'blur(1px)'
            }}
            transition={{ duration: 0.5, ease: appleEase }}
            className={`bg-white rounded-2xl p-5 border-2 ${showSonnet ? 'border-[#1B7ED0] shadow-md ring-2 ring-[#1B7ED0]/10' : 'border-neutral-200'} relative overflow-hidden transition-colors`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-50 border-2 border-[#1B7ED0]/30 flex items-center justify-center shrink-0">
                  <Cpu className="w-6 h-6 text-[#1B7ED0] stroke-[2.2px]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-[#111113]">Sonnet</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 text-[#1B7ED0] border-2 border-blue-200">
                      $$ · The workhorse
                    </span>
                  </div>
                  <p className="text-sm text-[#4A4A55] mt-0.5">
                    Implementer · Code Reviewer · Explorer · Validator
                  </p>
                </div>
              </div>

              {/* Role Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border-2 border-blue-200 text-[#1B7ED0] text-xs font-mono font-bold shrink-0 self-start sm:self-center">
                <Code2 className="w-3.5 h-3.5 stroke-2" />
                <span>Writes diffs & checks math</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t-2 border-neutral-100 flex items-center justify-between text-xs text-[#4A4A55]">
              <span className="font-medium">Follows plan contracts step-by-step; bounded to ≤ 5 fix rounds.</span>
              <span className="font-mono text-neutral-400 font-semibold">85% of execution tokens</span>
            </div>
          </motion.div>

          {/* TIER 3: HAIKU */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: showHaiku ? 1 : 0.25, 
              y: showHaiku ? 0 : 10,
              filter: showHaiku ? 'blur(0px)' : 'blur(1px)'
            }}
            transition={{ duration: 0.5, ease: appleEase }}
            className={`bg-white rounded-2xl p-5 border-2 ${showHaiku ? 'border-emerald-500 shadow-sm' : 'border-neutral-200'} relative overflow-hidden transition-colors`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center shrink-0">
                  <Zap className="w-6 h-6 text-emerald-600 stroke-[2.2px]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold tracking-tight text-[#111113]">Haiku</span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border-2 border-emerald-200">
                      $ · Pennies
                    </span>
                  </div>
                  <p className="text-sm text-[#4A4A55] mt-0.5">
                    Browser Runner · Git Committer · Script Executor
                  </p>
                </div>
              </div>

              {/* Scripted Only Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 border-2 border-neutral-200 text-[#4A4A55] text-xs font-mono font-bold shrink-0 self-start sm:self-center">
                <Terminal className="w-3.5 h-3.5 stroke-2" />
                <span>Only when fully scripted</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t-2 border-neutral-100 flex items-center justify-between text-xs text-[#4A4A55]">
              <span className="font-medium">Runs deterministic commands verbatim; returns raw unparsed JSON.</span>
              <span className="font-mono text-neutral-400 font-semibold">&lt; $0.05 / feature</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Frontmatter Configuration (Slides in on Build 3) */}
        {showFrontmatter && (
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.55, ease: appleEase }}
            className="lg:col-span-5 flex flex-col gap-3"
          >
            <div className="bg-[#111113] rounded-2xl p-5 border-2 border-neutral-800 text-neutral-100 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-800 text-xs font-mono">
                <span className="text-neutral-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-[#1B7ED0]" />
                  .claude/agents/dir-implementer.md
                </span>
                <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border-2 border-emerald-800">
                  Fixed Schema
                </span>
              </div>

              {/* Frontmatter YAML Snippet */}
              <div className="font-mono text-sm leading-relaxed text-neutral-300">
                <span className="text-neutral-500">---</span><br />
                <span className="text-blue-400">name</span>: <span className="text-emerald-300">dir-implementer</span><br />
                <span className="text-blue-400">model</span>: <span className="text-amber-300 font-bold">sonnet</span><br />
                <span className="text-blue-400">effort</span>: <span className="text-neutral-100">medium</span><br />
                <span className="text-blue-400">maxTurns</span>: <span className="text-neutral-100">150</span><br />
                <span className="text-neutral-500">---</span><br />
                <span className="text-neutral-500 text-xs mt-2 block italic">
                  # System prompt constraints follow...
                </span>
              </div>

              <div className="mt-4 pt-3 border-t-2 border-neutral-800 flex items-center gap-2 text-xs text-neutral-300 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Routing can't drift mid-run.</span>
              </div>
            </div>

            {/* Presenter Spoken Payoff Banner */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="bg-amber-50 rounded-xl p-3.5 border-2 border-amber-200 text-amber-900 text-xs font-semibold flex items-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0 stroke-[2.2px]" />
              <span>"The most expensive model shouldn't be doing grep and git."</span>
            </motion.div>
          </motion.div>
        )}

      </div>

      {/* Bottom Footer Callout */}
      <div className="z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#4A4A55] border-t-2 border-neutral-200 pt-3 gap-2">
        <span className="font-mono">Rule: Orchestrator sets the bounds. Agents execute inside them.</span>
        <span className="font-medium text-[#111113]">No model auto-escalation · Zero accidental costs</span>
      </div>

    </div>
  );
}
