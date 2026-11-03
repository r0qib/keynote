import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { 
  Sliders, 
  Gauge, 
  ShieldAlert, 
  Cpu, 
  FileCode, 
  Terminal, 
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

/**
 * Slide 40: Right model. Right effort. Right context.
 * 
 * Corner: 40 / Cheap tricks (Blue accent dot #1B7ED0)
 * Headline: "Right model. Right effort. Right context."
 * 
 * Visuals:
 *  - Three large dials / hardware sliders in a row:
 *    1. Model: Haiku · Sonnet · Opus (Rule: "Write your routing down once.")
 *    2. Effort: low · medium · max (Rule: "Low for simple. High for hard.")
 *    3. Context: Scoped briefs + permissions.deny (Rule: "Sub-agents with scoped briefs. Keep files out.")
 *       Myth-buster: .claudeignore does nothing in Claude Code; use permissions.deny.
 *  - Build 2: Punchline lands: "Not 'improve the UI'. Say what, where, and how you'll check it."
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Dial 1 (Model) set & rules.
 *  - 1: Dial 2 (Effort) & Dial 3 (Context) engage with rules & JSON deny snippet.
 *  - 2: Bottom punchline lands.
 */

export default function S40_Routing({ activeSlide, buildStep }) {
  const showEffortAndContext = buildStep >= 1;
  const showPunchline = buildStep >= 2;

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
            Act IV · Everyday Levers
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          Right model. Right effort. Right context.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          The three everyday cost levers you control on every feature.
        </motion.p>
      </div>

      {/* Center Stage: Three Hardware Dials / Control Panels */}
      <div className="my-auto w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch z-10 py-2">
        
        {/* LEVER 1: MODEL ROUTING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="bg-white rounded-3xl p-6 border-2 border-neutral-300 shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-neutral-100">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#1B7ED0]" />
                <span>Lever 01 · Model</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 border-2 border-blue-200 text-[#1B7ED0] font-bold">
                Tiered
              </span>
            </div>

            {/* Visual Hardware Selector */}
            <div className="bg-neutral-100 p-1.5 rounded-2xl border-2 border-neutral-200 grid grid-cols-3 gap-1 text-center font-mono text-xs font-bold mb-4">
              <div className="py-2 rounded-xl bg-white text-neutral-600 border-2 border-neutral-200">
                Haiku
              </div>
              <div className="py-2 rounded-xl bg-[#1B7ED0] text-white shadow-sm ring-2 ring-[#1B7ED0]/20">
                Sonnet
              </div>
              <div className="py-2 rounded-xl bg-white text-neutral-600 border-2 border-neutral-200">
                Opus
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-blue-50 border-2 border-blue-200">
                <div className="font-bold text-[#1B7ED0]">Rule: Write routing down once.</div>
                <div className="text-[11px] text-[#4A4A55] mt-1">
                  Sonnet for 85% of work · Opus for architecture · Haiku for scripts.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-neutral-100 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
            <span>Defined in agent frontmatter</span>
            <span className="text-[#1B7ED0] font-bold">Zero drift</span>
          </div>
        </motion.div>

        {/* LEVER 2: REASONING EFFORT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showEffortAndContext ? 1 : 0.25, 
            y: showEffortAndContext ? 0 : 10,
            filter: showEffortAndContext ? 'blur(0px)' : 'blur(1px)'
          }}
          transition={{ duration: 0.5, ease: appleEase }}
          className={`bg-white rounded-3xl p-6 border-2 ${showEffortAndContext ? 'border-[#1B7ED0] shadow-md ring-2 ring-[#1B7ED0]/10' : 'border-neutral-200'} flex flex-col justify-between transition-all`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-neutral-100">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-emerald-600" />
                <span>Lever 02 · Effort</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border-2 border-emerald-200 text-emerald-700 font-bold">
                Thinking Budget
              </span>
            </div>

            {/* Visual Hardware Selector */}
            <div className="bg-neutral-100 p-1.5 rounded-2xl border-2 border-neutral-200 grid grid-cols-3 gap-1 text-center font-mono text-xs font-bold mb-4">
              <div className="py-2 rounded-xl bg-white text-neutral-600 border-2 border-neutral-200">
                low
              </div>
              <div className="py-2 rounded-xl bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/20">
                medium
              </div>
              <div className="py-2 rounded-xl bg-white text-neutral-600 border-2 border-neutral-200">
                max
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 border-2 border-emerald-200">
                <div className="font-bold text-emerald-800">Rule: Low for simple. High for hard.</div>
                <div className="text-[11px] text-[#4A4A55] mt-1">
                  Don't burn deep chain-of-thought tokens adjusting CSS margins or renaming imports.
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-neutral-100 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
            <span>effort: medium (default)</span>
            <span className="text-emerald-700 font-bold">Fast iterations</span>
          </div>
        </motion.div>

        {/* LEVER 3: CONTEXT BOUNDARIES & PERMISSIONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showEffortAndContext ? 1 : 0.25, 
            y: showEffortAndContext ? 0 : 10,
            filter: showEffortAndContext ? 'blur(0px)' : 'blur(1px)'
          }}
          transition={{ duration: 0.5, ease: appleEase }}
          className={`bg-white rounded-3xl p-6 border-2 ${showEffortAndContext ? 'border-neutral-900 shadow-md' : 'border-neutral-200'} flex flex-col justify-between transition-all`}
        >
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-neutral-100">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Lever 03 · Context</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 border-2 border-neutral-300 text-neutral-800 font-bold">
                Scoped Briefs
              </span>
            </div>

            {/* permissions.deny code snippet */}
            <div className="bg-[#111113] rounded-xl p-3 border-2 border-neutral-800 text-neutral-200 font-mono text-[11px] leading-relaxed mb-3">
              <span className="text-neutral-500">// .claude/settings.json</span><br />
              <span className="text-blue-400">"permissions"</span>: &#123;<br />
              &nbsp;&nbsp;<span className="text-amber-300">"deny"</span>: [<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">"Read(./.env)"</span>,<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-emerald-300">"Read(./dist/**)"</span><br />
              &nbsp;&nbsp;]<br />
              &#125;
            </div>

            <div className="p-2.5 rounded-xl bg-amber-50 border-2 border-amber-200 text-xs">
              <div className="font-bold text-amber-900">Myth: .claudeignore works</div>
              <div className="text-[11px] text-amber-800 mt-0.5">
                Claude Code ignores .claudeignore! Use explicit <code className="font-mono bg-white px-1 py-0.5 rounded border-2 border-amber-300">permissions.deny</code>.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t-2 border-neutral-100 text-[10px] font-mono text-neutral-500 flex items-center justify-between">
            <span>Scoped file boundaries</span>
            <span className="text-amber-800 font-bold">No noise ingestion</span>
          </div>
        </motion.div>

      </div>

      {/* Build 2 Punchline Banner */}
      {showPunchline ? (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: appleEase }}
          className="z-10 bg-neutral-900 rounded-2xl p-4 sm:p-5 border-2 border-neutral-800 text-neutral-100 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-neutral-900 flex items-center justify-center shrink-0 font-bold">
              <Sparkles className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-bold text-white">
                "Not 'improve the UI'. Say what, where, and how you'll check it."
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Specific prompts with deterministic verification criteria prevent endless back-and-forth guessing.
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 bg-neutral-800 text-amber-400 rounded-lg border-2 border-neutral-700 shrink-0">
            Rule: Zero Ambiguity
          </span>
        </motion.div>
      ) : (
        <div className="z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#4A4A55] border-t-2 border-neutral-200 pt-3 gap-2">
          <span className="font-mono">Fine-tune the three dials before launching a single command.</span>
          <span className="font-medium text-[#111113]">Minimal tokens · Maximum determinism</span>
        </div>
      )}

    </div>
  );
}
