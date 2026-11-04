import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { ShieldCheck, Coins, Hourglass, Layers } from 'lucide-react';

const FRAMEWORKS = [
  { name: 'AWS AI-DLC', org: 'Amazon Web Services', desc: 'Lifecycle & delivery contracts' },
  { name: 'GitHub Spec Kit', org: 'GitHub', desc: 'Specification-driven development' },
  { name: 'B-MAD Method', org: 'Open Source', desc: 'Benchmark multi-agent workflows' },
  { name: 'OpenSpec', org: 'Standardization', desc: 'Machine-verifiable schemas' },
];

const FRICTION_POINTS = [
  {
    icon: Coins,
    title: 'The Token Reality',
    desc: 'Multi-agent spec loops burn heavy tokens upfront. On monthly team budgets, running full frameworks on every ticket is unaffordable.',
    color: '#D97706',
  },
  {
    icon: Layers,
    title: 'Overhead on Everyday Tasks',
    desc: 'For an everyday bug or 2-hour UI tweak, 6 layers of formal specification turns agile AI iteration into waterfall development.',
    color: '#E5484D',
  },
  {
    icon: Hourglass,
    title: 'Latency & Context Compaction',
    desc: 'Exhaustive loops mean long waits. As sessions grow massive, LLMs auto-compact context and silently lose architectural nuance.',
    color: '#1B7ED0',
  },
];

/**
 * Slide 19: Great frameworks. Real-world friction.
 * 
 * Act III: The Ugly
 * Headline: "Thorough by design. What stops us in practice?"
 * One idea: Respect the world-class frameworks (AI-DLC, Spec Kit, BMAD),
 * but honestly address what stops teams from following them step-by-step.
 * 
 * Builds:
 *  - 0: The 4 industry frameworks shown respectfully.
 *  - 1: The 3 real-world friction barriers (Cost/Tokens, Waterfall overhead, Context decay).
 *  - 2: The constructive takeaway: "We don't reject them. We right-size their principles."
 */
export default function S19_Frameworks({ activeSlide, buildStep }) {
  const showFriction = buildStep >= 1;
  const showTakeaway = buildStep >= 2;

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
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            Methodology & Practice
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
        >
          Thorough by design. <span className="text-[#E5484D]">What stops us in practice?</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          AWS AI-DLC, Spec Kit, and B-MAD are great methodologies. But following them step-by-step has real friction.
        </motion.p>
      </div>

      {/* Main Content Area */}
      <div className="my-auto w-full max-w-6xl mx-auto flex flex-col gap-6 z-10 py-1">
        
        {/* Top: The 4 Industry Methodologies (Respected & Acknowledged) */}
        <div>
          <div className="font-mono text-xs uppercase tracking-wider text-neutral-400 font-bold mb-3 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>The Gold Standards</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {FRAMEWORKS.map((fw) => (
              <div
                key={fw.name}
                className="bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="font-bold text-base text-[#111113]">
                    {fw.name}
                  </div>
                  <div className="font-mono text-xs text-neutral-400 mt-0.5">
                    {fw.org}
                  </div>
                </div>
                <div className="text-xs text-[#4A4A55] mt-2">
                  {fw.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Build 1: The 3 Real-World Friction Barriers */}
        <div className="min-h-[160px]">
          {showFriction && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: appleEase }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {FRICTION_POINTS.map((fp, idx) => {
                const Icon = fp.icon;
                return (
                  <motion.div
                    key={fp.title}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className="bg-white p-5 rounded-2xl border-2 border-neutral-200/90 shadow-md flex flex-col gap-2"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${fp.color}15`, color: fp.color }}
                      >
                        <Icon className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <span className="font-bold text-base text-[#111113]">
                        {fp.title}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4A4A55] leading-relaxed">
                      {fp.desc}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>

        {/* Build 2: Constructive Keynote Takeaway */}
        <div className="min-h-[50px] flex items-center justify-center">
          {showTakeaway && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: appleEase }}
              className="text-center font-bold text-lg sm:text-xl text-neutral-900 bg-neutral-100 px-6 py-2.5 rounded-full border border-neutral-300 shadow-sm"
            >
              "We don't reject them. <span className="text-[#1B7ED0]">We borrow their discipline and right-size the process."</span>
            </motion.div>
          )}
        </div>

      </div>

    </div>
  );
}
