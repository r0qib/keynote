import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { 
  DollarSign, 
  Cpu, 
  GitCommit, 
  CheckCircle2, 
  TrendingDown, 
  Zap,
  Sparkles,
  BarChart3
} from 'lucide-react';

/**
 * Slide 38: The receipts.
 * 
 * Corner: 38 / Numbers (Blue accent dot #1B7ED0, cutTier: 'A')
 * Headline: "The receipts."
 * 
 * Visuals:
 *  - 3 large kinetic stats counting up rapidly (≤ 600ms):
 *    Stat 1 (Build 0): 13 units on ~0.25M orchestrator tokens ($1.50 per unit, total ~$20)
 *    Stat 2 (Build 1): ~165k tokens for 2 scripted browser checkpoints (data-grid overhaul)
 *    Stat 3 (Build 2): 10–30 commits per feature across data-grid overhaul & inventory redesign
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Stat 1 on entry.
 *  - 1: Stat 2 counts up.
 *  - 2: Stat 3 counts up + Takeaway banner ("Affordable autonomy").
 */

function Counter({ end, duration = 600, suffix = '', prefix = '' }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setVal(Math.floor(progress * end));
      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setVal(end);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [end, duration]);

  return <span>{prefix}{val.toLocaleString()}{suffix}</span>;
}

export default function S38_Receipts({ activeSlide, buildStep }) {
  const showStat2 = buildStep >= 1;
  const showStat3 = buildStep >= 2;

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
            Act IV · The Financials
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          The receipts.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Affordable autonomy. Real production token costs from our team.
        </motion.p>
      </div>

      {/* Center Stage: 3 Kinetic Stat Cards */}
      <div className="my-auto w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch z-10 py-2">
        
        {/* STAT 1: 13 UNITS ON ~0.25M TOKENS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-neutral-300 shadow-sm flex flex-col justify-between relative overflow-hidden"
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-neutral-100">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                Data Inventory Redesign
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border-2 border-emerald-200 text-emerald-700 font-bold">
                Round 1 Complete
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-[#111113]">
                <Counter end={13} duration={500} />
              </span>
              <span className="text-xl sm:text-2xl font-bold text-neutral-500">units</span>
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 border-2 border-blue-200 text-[#1B7ED0] text-xs font-mono font-bold">
              <Cpu className="w-3.5 h-3.5 stroke-[2.2px]" />
              <span>~0.25M orchestrator tokens</span>
            </div>

            <p className="text-sm text-[#4A4A55] mt-4 leading-relaxed font-medium">
              13 complete, tested React features for approximately <strong>$1.50 per unit</strong> (~$20 total).
            </p>
          </div>

          <div className="mt-5 pt-3 border-t-2 border-neutral-100 flex items-center justify-between text-xs text-emerald-700 font-mono font-bold">
            <span className="flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>Fraction of dev time cost</span>
            </span>
            <span>~$1.50 / unit</span>
          </div>
        </motion.div>

        {/* STAT 2: ~165K TOKENS BROWSER CHECKPOINTS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showStat2 ? 1 : 0.25, 
            y: showStat2 ? 0 : 10,
            filter: showStat2 ? 'blur(0px)' : 'blur(1px)'
          }}
          transition={{ duration: 0.5, ease: appleEase }}
          className={`bg-white rounded-3xl p-6 sm:p-7 border-2 ${showStat2 ? 'border-[#1B7ED0] shadow-md ring-2 ring-[#1B7ED0]/10' : 'border-neutral-200'} flex flex-col justify-between relative overflow-hidden transition-all`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-neutral-100">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                Data Grid Overhaul
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 border-2 border-blue-200 text-[#1B7ED0] font-bold">
                1280px Headless
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-[#111113]">
                {showStat2 ? <Counter end={165} duration={500} prefix="~" suffix="k" /> : '~165k'}
              </span>
              <span className="text-xl sm:text-2xl font-bold text-neutral-500">tokens</span>
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border-2 border-emerald-200 text-emerald-700 text-xs font-mono font-bold">
              <Zap className="w-3.5 h-3.5 stroke-[2.2px]" />
              <span>2 full browser checkpoints</span>
            </div>

            <p className="text-sm text-[#4A4A55] mt-4 leading-relaxed font-medium">
              Headless browser DOM probes executed via scripted Haiku. Checked popovers, alignment, and viewport bounds.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t-2 border-neutral-100 flex items-center justify-between text-xs text-[#1B7ED0] font-mono font-bold">
            <span>Haiku runner + Sonnet math</span>
            <span>&lt; $0.40 total</span>
          </div>
        </motion.div>

        {/* STAT 3: 10–30 COMMITS PER FEATURE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showStat3 ? 1 : 0.25, 
            y: showStat3 ? 0 : 10,
            filter: showStat3 ? 'blur(0px)' : 'blur(1px)'
          }}
          transition={{ duration: 0.5, ease: appleEase }}
          className={`bg-white rounded-3xl p-6 sm:p-7 border-2 ${showStat3 ? 'border-neutral-900 shadow-md' : 'border-neutral-200'} flex flex-col justify-between relative overflow-hidden transition-all`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-neutral-100">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase">
                Production History
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 border-2 border-neutral-200 text-[#4A4A55] font-bold">
                Atomic Git Tree
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-[#111113]">
                10–30
              </span>
              <span className="text-xl sm:text-2xl font-bold text-neutral-500">commits</span>
            </div>

            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-100 border-2 border-neutral-300 text-neutral-800 text-xs font-mono font-bold">
              <GitCommit className="w-3.5 h-3.5 stroke-[2.2px]" />
              <span>Per major overhaul feature</span>
            </div>

            <p className="text-sm text-[#4A4A55] mt-4 leading-relaxed font-medium">
              Data-grid overhaul · Data-inventory redesign ×2 · Design-system token migration. Every commit verified & bisectable.
            </p>
          </div>

          <div className="mt-5 pt-3 border-t-2 border-neutral-100 flex items-center justify-between text-xs text-neutral-600 font-mono font-bold">
            <span>Discrete units</span>
            <span>Clean git history</span>
          </div>
        </motion.div>

      </div>

      {/* Build 2 Takeaway Banner */}
      {showStat3 ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: appleEase }}
          className="z-10 bg-[#111113] rounded-2xl p-4 sm:p-5 border-2 border-neutral-800 text-neutral-100 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-neutral-900 flex items-center justify-center shrink-0 font-bold">
              <DollarSign className="w-5 h-5 stroke-[2.5px]" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-bold text-white">
                "The answer to the elephant: spend where judgment is needed."
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Autonomy doesn't mean burning $500 on unstructured chat prompt loops.
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 bg-neutral-800 text-emerald-400 rounded-lg border-2 border-neutral-700 shrink-0">
            Measurable ROI
          </span>
        </motion.div>
      ) : (
        <div className="z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#4A4A55] border-t-2 border-neutral-200 pt-3 gap-2">
          <span className="font-mono">Real-world telemetry: small units and targeted prompts prevent token compounding.</span>
          <span className="font-medium text-[#111113]">Bounded tasks · Predictable budgets</span>
        </div>
      )}

    </div>
  );
}
