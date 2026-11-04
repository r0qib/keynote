import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { 
  RefreshCw, 
  Clock, 
  Trash2, 
  FileText, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu
} from 'lucide-react';

/**
 * Slide 39: It re-reads everything. Every time.
 * 
 * Corner: 39 / Context costs (Blue accent dot #1B7ED0)
 * Headline: "It re-reads everything. Every time."
 * 
 * Visuals:
 *  - Build 0: Message stack growing taller, whole stack travelling to model box and back. Cost meter climbs faster each turn.
 *  - Build 1: Cache TTL timer runs out (5 min API / ~1 h subscription) + idle compaction squashes stack (detail quietly lost).
 *  - Build 2: The fix: /clear empties stack + hand-off note into fresh session. Caption: "One task, one session. Files carry the context."
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Conversation stack next to Model box, re-reading every turn, cost meter climbing.
 *  - 1: Cache TTL expiration & idle compaction amnesia.
 *  - 2: The Fix: /clear + hand-off note into fresh session.
 */

export default function S39_Stateless({ activeSlide, buildStep }) {
  const showFailures = buildStep >= 1;
  const showTheFix = buildStep >= 2;

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
            Act IV · Context Costs
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          It re-reads everything. Every time.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          The model has no memory: message 50 re-sends messages 1 to 49.
        </motion.p>
      </div>

      {/* Center Stage: Stack Growth vs. Cache/Compaction vs. The Fix */}
      <div className="my-auto w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch z-10 py-2">
        
        {/* Left Column: The Sprawling Message Stack (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-2xl p-5 border-2 border-neutral-300 shadow-sm relative">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                Long Chat History
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-50 border-2 border-red-200 text-red-600 font-bold">
                185,000 tokens
              </span>
            </div>

            {/* Visual Chat Stack blocks */}
            <div className="space-y-1.5 relative">
              <div className="p-2 rounded-lg bg-neutral-100 border-2 border-neutral-200 text-[11px] font-mono text-neutral-600 flex justify-between">
                <span>Turn 01: Initial setup & prompt</span>
                <span className="text-neutral-400">1.2k</span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-100 border-2 border-neutral-200 text-[11px] font-mono text-neutral-600 flex justify-between">
                <span>Turn 12: Grid prototype code</span>
                <span className="text-neutral-400">14k</span>
              </div>
              <div className="p-2 rounded-lg bg-neutral-100 border-2 border-neutral-200 text-[11px] font-mono text-neutral-600 flex justify-between">
                <span>Turn 28: Test failure trace</span>
                <span className="text-neutral-400">42k</span>
              </div>
              <div className="p-2 rounded-lg bg-red-50 border-2 border-red-200 text-[11px] font-mono text-red-700 flex justify-between font-bold">
                <span>Turn 49: "Can you fix the color?"</span>
                <span>185k !</span>
              </div>
            </div>

            {/* Payload trip to model diagram */}
            <div className="mt-4 p-3 rounded-xl bg-neutral-50 border-2 border-neutral-200 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-1.5 text-neutral-700 font-bold">
                <Layers className="w-4 h-4 text-[#1B7ED0]" />
                <span>Entire Stack</span>
              </div>
              <ArrowRight className="w-4 h-4 text-red-500 stroke-[2.5px]" />
              <div className="flex items-center gap-1.5 text-neutral-800 font-bold">
                <Cpu className="w-4 h-4 text-neutral-600" />
                <span>Model Box</span>
              </div>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t-2 border-neutral-100 text-[10px] text-red-600 font-mono font-bold flex items-center justify-between">
            <span>Every turn re-reads the full past</span>
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Token bleed</span>
            </span>
          </div>
        </div>

        {/* Middle Column: The Two Silent Traps (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-2xl p-5 border-2 border-neutral-300 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                The Two Silent Traps
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 border-2 border-amber-200 text-amber-800 font-bold">
                Idle Risks
              </span>
            </div>

            {showFailures ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: appleEase }}
                className="space-y-3"
              >
                {/* Trap 1: Cache TTL Expiration */}
                <div className="p-3.5 rounded-xl border-2 border-amber-300 bg-amber-50/60 text-xs">
                  <div className="flex items-center justify-between font-bold text-amber-950 mb-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-600 stroke-[2.2px]" />
                      <span>Cache TTL Expiration</span>
                    </span>
                    <span className="font-mono text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border-2 border-amber-300">
                      5m API / 1h Sub
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-900 leading-snug">
                    Walk away for coffee: cache drops. The next one-line prompt pays 100% full input costs to re-read 180k tokens.
                  </p>
                </div>

                {/* Trap 2: Compaction Amnesia */}
                <div className="p-3.5 rounded-xl border-2 border-red-300 bg-red-50/60 text-xs">
                  <div className="flex items-center justify-between font-bold text-red-950 mb-1">
                    <span className="flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600 stroke-[2.2px]" />
                      <span>Idle Compaction Loss</span>
                    </span>
                    <span className="font-mono text-[10px] text-red-800 bg-red-100 px-1.5 py-0.5 rounded border-2 border-red-300">
                      Lossy Summary
                    </span>
                  </div>
                  <p className="text-[11px] text-red-900 leading-snug">
                    Left overnight: provider auto-compacts the stack into vague summaries. Settled constraints and architecture nuances silently vanish.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-44 flex items-center justify-center text-xs text-neutral-400 italic">
                Awaiting cache & compaction analysis...
              </div>
            )}
          </div>

          <div className="mt-3 pt-2 border-t-2 border-neutral-100 text-[10px] text-neutral-500 font-mono">
            Long sessions rot mathematically & semantically.
          </div>
        </div>

        {/* Right Column: The Protocol Fix (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-2xl p-5 border-2 border-neutral-300 shadow-sm">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
              <span className="text-xs font-mono font-bold text-[#1B7ED0] uppercase">
                The Architectural Fix
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 border-2 border-blue-200 text-[#1B7ED0] font-bold">
                Disciplined Sessions
              </span>
            </div>

            {showTheFix ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: appleEase }}
                className="space-y-3"
              >
                {/* Step 1: /clear */}
                <div className="p-3 rounded-xl border-2 border-neutral-200 bg-neutral-900 text-neutral-100 text-xs font-mono">
                  <div className="flex items-center justify-between text-neutral-400 text-[10px] mb-1">
                    <span>Terminal Command</span>
                    <span className="text-emerald-400">Zero token wipe</span>
                  </div>
                  <div className="text-emerald-400 font-bold text-sm">
                    /clear
                  </div>
                  <div className="text-neutral-400 text-[10px] mt-1">
                    Empties volatile context memory entirely.
                  </div>
                </div>

                {/* Step 2: Hand-off note into fresh session */}
                <div className="p-3 rounded-xl border-2 border-emerald-300 bg-emerald-50/70 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-950 mb-1">
                    <FileText className="w-4 h-4 text-emerald-600 stroke-[2.2px]" />
                    <span>Hand-off Note in Repo</span>
                  </div>
                  <p className="text-[11px] text-emerald-900 leading-snug">
                    Living state recorded in <code className="font-mono bg-white px-1 py-0.5 rounded border-2 border-emerald-300 text-emerald-800">temp-notes/</code>. Fresh session reads ~4k tokens of pure curated facts.
                  </p>
                </div>
              </motion.div>
            ) : (
              <div className="h-44 flex items-center justify-center text-xs text-neutral-400 italic">
                Awaiting session solution...
              </div>
            )}
          </div>

          <div className="mt-3 pt-2 border-t-2 border-neutral-100 text-[10px] text-emerald-700 font-mono font-bold flex items-center justify-between">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Clean state always</span>
            </span>
            <span>&lt; 5k tokens</span>
          </div>
        </div>

      </div>

      {/* Build 2 Bottom Card */}
      {showTheFix && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: appleEase }}
          className="z-10 bg-[#111113] rounded-2xl p-4 sm:p-5 border border-neutral-800 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1B7ED0] text-white flex items-center justify-center shrink-0 font-bold">
              <Sparkles className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <div>
              <p className="text-base font-bold text-white leading-snug">
                "One task, one session. Files carry the context."
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Treat chat sessions like disposable compute containers, not permanent journals.
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 bg-neutral-800 text-[#1B7ED0] rounded-lg border border-neutral-700 shrink-0">
            Rule of thumb
          </span>
        </motion.div>
      )}

    </div>
  );
}
