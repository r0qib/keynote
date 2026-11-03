import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { HelpCircle, Check, Terminal, FileCode2, Stamp } from 'lucide-react';

/**
 * Slide 32: Every question, answered up front.
 * 
 * Corner: 32 / Planning (Blue accent dot #1B7ED0)
 * Headline: "Every question, answered up front."
 * 
 * Visuals:
 *  - Left: AI question bubbles stack up.
 *  - Right: Stamped answers into plan.md § Settled Decisions card + 4 plan sections.
 *  - Bottom / Right: Kickoff terminal snippet with the blue highlighted rule:
 *    "Do not ask me anything; log decisions in decisions.md."
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Question bubbles.
 *  - 1: Stamped into settled decisions document card.
 *  - 2: Plan anatomy and kickoff terminal snippet.
 */

const QUESTIONS = [
  { q: 'Grid or list view for wellbores?', a: 'Clean data grid with sortable columns & sticky header.' },
  { q: 'What if there are zero results?', a: 'Empty state illustration with a clear "Reset filters" CTA.' },
  { q: 'Do we need en + nb translations?', a: 'English only for MVP; wrap text in i18n keys for future.' },
  { q: 'Which depth reference to show?', a: 'True Vertical Depth (TVD) primary; Measured Depth (MD) in tooltip.' },
];

const PLAN_SECTIONS = [
  { num: '01', title: 'Global Constraints', desc: 'No purple, Teams 2px lines, InformatiQ tokens' },
  { num: '02', title: 'Review Focus', desc: 'Teams video legibility, responsive break at 1280px' },
  { num: '03', title: 'Shared Contracts', desc: 'Wellbore DTO schema & immutable prop types' },
  { num: '04', title: 'DAG Units', desc: 'Scope, target files, deps, verify commands' },
];

export default function S32_AskEverything({ activeSlide, buildStep }) {
  const showStamped = buildStep >= 1;
  const showTerminalAndAnatomy = buildStep >= 2;

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
            Act IV · The Planning Protocol
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          Every question, answered up front.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Settled before execution starts, so execution never has to ask.
        </motion.p>
      </div>

      {/* Center Stage: Questions & Settled Plan Document */}
      <div className="my-auto w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch z-10 py-2">
        
        {/* Left Column: AI Question Bubbles (Stacking up) */}
        <div className="md:col-span-5 flex flex-col justify-center space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-xs uppercase font-bold tracking-wider text-neutral-500 flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#1B7ED0]" />
              <span>AI Interrogation Phase</span>
            </span>
            <span className="text-[11px] font-mono text-neutral-400">Collaborative Discovery</span>
          </div>

          <div className="space-y-2.5">
            {QUESTIONS.map((item, idx) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springPhysics, delay: idx * 0.12 }}
                className={`p-3 rounded-xl border-2 transition-all ${
                  showStamped
                    ? 'bg-neutral-50 border-neutral-300 opacity-90'
                    : 'bg-white border-[#1B7ED0] shadow-sm'
                }`}
              >
                <div className="text-xs font-bold text-[#111113] flex items-start gap-1.5">
                  <span className="font-mono text-[#1B7ED0] text-[11px]">Q:</span>
                  <span>"{item.q}"</span>
                </div>

                {showStamped && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 pt-2 border-t-2 border-neutral-200 text-xs text-neutral-700 flex items-start gap-1.5 font-sans"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="font-medium">{item.a}</span>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: plan.md Document & Kickoff Snippet */}
        <div className="md:col-span-7 flex flex-col justify-between space-y-3">
          
          {/* Document Card: plan.md § Settled Decisions */}
          <div className="bg-white rounded-2xl p-5 border-2 border-neutral-300 shadow-sm relative overflow-hidden flex-1 flex flex-col justify-between">
            {/* Stamp Badge */}
            {showStamped && (
              <motion.div
                initial={{ scale: 2, rotate: -25, opacity: 0 }}
                animate={{ scale: 1, rotate: -8, opacity: 1 }}
                transition={{ ...springPhysics, delay: 0.2 }}
                className="absolute top-4 right-5 px-3 py-1 rounded border-2 border-emerald-600 text-emerald-700 font-mono text-xs font-black uppercase tracking-widest bg-emerald-50 shadow-sm z-20 pointer-events-none flex items-center gap-1"
              >
                <Check className="w-3.5 h-3.5 text-emerald-600" strokeWidth={3} />
                <span>SETTLED & CONTRACTED</span>
              </motion.div>
            )}

            <div>
              <div className="flex items-center gap-2 pb-3 mb-3 border-b-2 border-neutral-100">
                <FileCode2 className="w-4 h-4 text-[#1B7ED0]" />
                <span className="font-mono text-xs font-bold text-[#111113]">
                  temp-notes/data-inventory-redesign/plan.md
                </span>
                <span className="font-mono text-[10px] text-neutral-400">§ Settled Decisions</span>
              </div>

              {/* Four Core Sections Anatomy (Build 2) */}
              {showTerminalAndAnatomy ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-2 gap-2 my-1"
                >
                  {PLAN_SECTIONS.map((sec) => (
                    <div key={sec.num} className="bg-neutral-50 p-2.5 rounded-xl border-2 border-neutral-200">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-[#1B7ED0]">
                        <span>{sec.num}</span>
                        <span>{sec.title}</span>
                      </div>
                      <div className="text-[11px] text-[#4A4A55] mt-1 leading-tight font-medium">
                        {sec.desc}
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <div className="py-6 text-center text-xs font-mono text-neutral-400">
                  {showStamped ? 'Plan sections contracted. Ready for kickoff prompt.' : 'Waiting for human confirmation…'}
                </div>
              )}
            </div>

            {/* Kickoff Terminal Snippet (Build 2) */}
            {showTerminalAndAnatomy && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5, ease: appleEase }}
                className="mt-3 bg-[#111113] text-white rounded-xl p-3 font-mono text-xs border-2 border-neutral-800 shadow-md"
              >
                <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b-2 border-neutral-800 text-[10px] text-neutral-400">
                  <div className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#1B7ED0]" />
                    <span>The Kickoff Prompt (Actual snippet)</span>
                  </div>
                  <span className="text-emerald-400">Run unattended</span>
                </div>
                <div className="text-neutral-300 leading-relaxed text-[11px]">
                  Continue the data-inventory redesign. Read <span className="text-neutral-400 font-semibold">temp-notes/data-inventory-redesign/README.md</span> and follow its session protocol autonomously.{' '}
                  <span className="bg-[#1B7ED0] text-white px-1.5 py-0.5 rounded font-bold">
                    Do not ask me anything; log decisions in decisions.md.
                  </span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="z-10 pt-3 border-t-2 border-neutral-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-xs sm:text-sm text-[#4A4A55] font-semibold">
            {showTerminalAndAnatomy ? (
              <span>Why it works: it decides, logs the reason, and keeps going while you're away.</span>
            ) : (
              <span>Every ambiguity resolved up front is 10 fewer interruptions during execution.</span>
            )}
          </div>

          <div className="font-mono text-xs text-[#1B7ED0] font-bold">
            Settled Decisions Contract
          </div>
        </div>
      </div>
    </div>
  );
}
