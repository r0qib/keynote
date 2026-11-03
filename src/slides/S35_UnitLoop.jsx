import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { 
  CheckCircle2, 
  RotateCw, 
  AlertTriangle, 
  GitCommit, 
  FileText, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

/**
 * Slide 35: One unit at a time.
 * 
 * Corner: 35 / Execution (Blue accent dot #1B7ED0)
 * Headline: "One unit at a time."
 * 
 * Visuals:
 *  - Cyclic unit loop with solid SVG lines (≥ 2px):
 *    pick unit → implement (Sonnet) → verify (orchestrator re-runs) → review (HIGH/MEDIUM only) → one fix round → commit (Haiku, hooks run) → log + curate notes → next
 *  - Red side-arc from verify back to implement: "red? same implementer, ≤ 5 rounds"
 *  - Right side: Mini DAG checklist ticking [x] as units complete.
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Unit loop path and stages.
 *  - 1: Traveling dot completes the loop; DAG checklist ticks [x].
 *  - 2: Kicker banner lands: "One review. One fix round. Perfectionism loops are where token budgets go to die."
 */

const STAGES = [
  { id: 'pick', label: '1. Pick Unit', model: 'Orchestrator', desc: 'From DAG deps' },
  { id: 'impl', label: '2. Implement', model: 'Sonnet', desc: 'Fresh context' },
  { id: 'verify', label: '3. Verify', model: 'Orchestrator', desc: 'Re-runs checks' },
  { id: 'review', label: '4. Review', model: 'Sonnet (reviewer)', desc: 'HIGH / MED only' },
  { id: 'fix', label: '5. Fix Round', model: 'Implementer', desc: 'Max 1 round' },
  { id: 'commit', label: '6. Commit', model: 'Haiku', desc: 'Explicit paths' },
  { id: 'log', label: '7. Log & Notes', model: 'Orchestrator', desc: 'Curate memory' },
];

const DAG_UNITS = [
  { id: 'U1', title: 'Data model & types', status: 'done', commits: '1 commit' },
  { id: 'U2', title: 'Sticky header & layout', status: 'done', commits: '1 commit' },
  { id: 'U3', title: 'Inline filter pills', status: 'done', commits: '1 commit' },
  { id: 'U4', title: 'Keyboard focus ring (j/k)', status: 'active', commits: '1 commit' },
  { id: 'U5', title: 'Telemetry export probe', status: 'pending', commits: 'pending' },
];

export default function S35_UnitLoop({ activeSlide, buildStep }) {
  const isLoopRunning = buildStep >= 1;
  const showKicker = buildStep >= 2;

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
            Act IV · Execution Discipline
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          One unit at a time.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Implement, verify independently, review once, commit. Repeat.
        </motion.p>
      </div>

      {/* Center Stage: Loop Architecture + DAG Checklist */}
      <div className="my-auto w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch z-10 py-2">
        
        {/* Left Column: The Unit Execution Loop (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-white rounded-2xl p-5 sm:p-6 border-2 border-neutral-300 shadow-sm relative">
          
          <div className="flex items-center justify-between pb-3 mb-2 border-b-2 border-neutral-100">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#1B7ED0]">
              <RotateCw className={`w-4 h-4 ${isLoopRunning ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span>Disciplined Execution Loop</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-50 border-2 border-blue-200 text-[#1B7ED0] font-bold">
              1 unit = 1 clean commit
            </span>
          </div>

          {/* Flow Stages Visual Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-auto relative">
            
            {/* Top row: Steps 1, 2, 3 */}
            {STAGES.slice(0, 3).map((st, idx) => (
              <div 
                key={st.id}
                className={`p-3 rounded-xl border-2 transition-all relative ${
                  st.id === 'verify' 
                    ? 'border-amber-400 bg-amber-50/50' 
                    : st.id === 'impl' 
                      ? 'border-[#1B7ED0] bg-blue-50/40' 
                      : 'border-neutral-200 bg-neutral-50'
                }`}
              >
                <div className="text-[11px] font-bold font-mono text-[#111113]">{st.label}</div>
                <div className="text-[10px] font-mono font-semibold text-[#1B7ED0] mt-0.5">{st.model}</div>
                <div className="text-[10px] text-[#4A4A55] mt-1">{st.desc}</div>
              </div>
            ))}

            {/* Red Arc feedback box */}
            <div className="p-2.5 rounded-xl border-2 border-red-300 bg-red-50/70 flex flex-col justify-center">
              <div className="flex items-center gap-1 text-[10px] font-mono font-bold text-red-700">
                <AlertTriangle className="w-3 h-3 stroke-[2.2px] text-red-600" />
                <span>Verify Failed?</span>
              </div>
              <p className="text-[10px] text-red-800 leading-snug mt-1 font-medium">
                Red? Same implementer fixes it (≤ 5 rounds). Keeps context!
              </p>
            </div>

            {/* Bottom row: Steps 4, 5, 6, 7 */}
            {STAGES.slice(3).map((st) => (
              <div 
                key={st.id}
                className={`p-3 rounded-xl border-2 transition-all ${
                  st.id === 'review'
                    ? 'border-emerald-400 bg-emerald-50/50'
                    : st.id === 'commit'
                      ? 'border-neutral-700 bg-neutral-900 text-neutral-100'
                      : 'border-neutral-200 bg-neutral-50'
                }`}
              >
                <div className={`text-[11px] font-bold font-mono ${st.id === 'commit' ? 'text-white' : 'text-[#111113]'}`}>
                  {st.label}
                </div>
                <div className={`text-[10px] font-mono font-semibold mt-0.5 ${st.id === 'commit' ? 'text-emerald-400' : 'text-[#1B7ED0]'}`}>
                  {st.model}
                </div>
                <div className={`text-[10px] mt-1 ${st.id === 'commit' ? 'text-neutral-300' : 'text-[#4A4A55]'}`}>
                  {st.desc}
                </div>
              </div>
            ))}

          </div>

          {/* SVG Connector Arc for Loop Feedback */}
          <div className="mt-4 pt-3 border-t-2 border-neutral-100 flex items-center justify-between text-xs text-[#4A4A55]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 stroke-[2.2px]" />
              <span className="font-medium">Orchestrator re-runs verify commands independently.</span>
            </div>
            <span className="font-mono text-[11px] text-neutral-400">Strictly 0 silent passes</span>
          </div>

        </div>

        {/* Right Column: Mini DAG Checklist (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-white rounded-2xl p-5 border-2 border-neutral-300 shadow-sm">
          
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
              <span className="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wide">
                Feature DAG Queue
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 border-2 border-neutral-200 text-[#4A4A55] font-bold">
                progress.md
              </span>
            </div>

            <div className="space-y-2">
              {DAG_UNITS.map((u, i) => {
                const isUnitDone = u.status === 'done' || (u.id === 'U4' && isLoopRunning);
                const isUnitActive = u.id === 'U4' && !isLoopRunning;

                return (
                  <motion.div
                    key={u.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className={`p-2.5 rounded-xl border-2 flex items-center justify-between text-xs transition-colors ${
                      isUnitDone
                        ? 'border-emerald-300 bg-emerald-50/60'
                        : isUnitActive
                          ? 'border-[#1B7ED0] bg-blue-50/60 ring-2 ring-[#1B7ED0]/15'
                          : 'border-neutral-200 bg-neutral-50/50 opacity-70'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded flex items-center justify-center border-2 shrink-0 ${
                        isUnitDone 
                          ? 'bg-emerald-600 border-emerald-600 text-white' 
                          : isUnitActive
                            ? 'bg-white border-[#1B7ED0] text-[#1B7ED0]'
                            : 'bg-white border-neutral-300 text-transparent'
                      }`}>
                        {isUnitDone ? (
                          <Check className="w-3.5 h-3.5 stroke-[3px]" />
                        ) : isUnitActive ? (
                          <span className="w-2 h-2 rounded-full bg-[#1B7ED0]" />
                        ) : null}
                      </div>
                      <span className={`font-medium ${isUnitDone ? 'text-emerald-950 font-semibold' : 'text-[#111113]'}`}>
                        {u.title}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-neutral-500 shrink-0 font-medium">
                      {isUnitDone ? 'committed' : isUnitActive ? 'running...' : 'queued'}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t-2 border-neutral-100 text-[11px] text-neutral-500 font-mono flex items-center justify-between">
            <span>State: {isLoopRunning ? '4 / 5 completed' : '3 / 5 completed'}</span>
            <span className="text-[#1B7ED0] font-bold">Safe to revert anytime</span>
          </div>

        </div>

      </div>

      {/* Kicker Banner lands on Build 2 */}
      {showKicker ? (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: appleEase }}
          className="z-10 bg-amber-50 rounded-xl p-4 border-2 border-amber-300 text-amber-950 shadow-sm flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <div>
              <p className="text-sm sm:text-base font-bold text-amber-950">
                "One review. One fix round. Perfectionism loops are where token budgets go to die."
              </p>
              <p className="text-xs text-amber-800 mt-0.5">
                Review HIGH / MEDIUM issues only. Don't bikeshed formatting or subjective nits.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline font-mono text-xs font-bold px-3 py-1 bg-white rounded-lg border-2 border-amber-200 text-amber-800 shrink-0 ml-4">
            Max 1 fix round
          </span>
        </motion.div>
      ) : (
        <div className="z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#4A4A55] border-t-2 border-neutral-200 pt-3 gap-2">
          <span className="font-mono">Progress is atomic: each unit produces a green test run and a clean commit.</span>
          <span className="font-medium text-[#111113]">Discrete steps · Zero snowballing errors</span>
        </div>
      )}

    </div>
  );
}
