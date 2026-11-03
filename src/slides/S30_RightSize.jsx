import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { MessageSquare, Layers, ShieldCheck, Zap, GitCommit, FileText } from 'lucide-react';

/**
 * Slide 30: One workflow per feature
 * 
 * Corner: 30 / Right-size it (Blue accent dot #1B7ED0)
 * Headline: "One workflow per feature."
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Horizontal spectrum: "Chatbot" (left) <---> "Full framework" (right).
 *  - 1: "Me" marker glides to the right end, eases back, and settles left-of-center.
 *       Note: Borrow the frameworks' best ideas, sized to one feature.
 *  - 2: Three size tiers appear:
 *       - Typo · small bug -> just chat
 *       - Medium feature -> a plan + one session
 *       - Big feature (10-30 commits) -> custom workflow + autonomous agents
 *       Anchors Poll Q1 callback.
 */

const TIERS = [
  {
    tier: 'Small',
    scope: 'Typo · Small bug · Quick regex',
    method: 'Just chat',
    icon: Zap,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    desc: '1 prompt in terminal or IDE. Zero ceremony, instant output.',
  },
  {
    tier: 'Medium',
    scope: 'Single component · New utility',
    method: 'A plan + one session',
    icon: FileText,
    color: 'text-neutral-800',
    bg: 'bg-neutral-100',
    border: 'border-neutral-300',
    desc: 'Light spec written first. Executed in a single fresh context window.',
  },
  {
    tier: 'Large',
    scope: 'Big feature (10–30 commits)',
    method: 'Custom workflow + agents',
    icon: Layers,
    color: 'text-[#1B7ED0]',
    bg: 'bg-blue-50',
    border: 'border-[#1B7ED0]',
    desc: 'Dedicated temp-notes folder, DAG units, verification gates, autonomous run.',
  },
];

export default function S30_RightSize({ activeSlide, buildStep }) {
  const showMarker = buildStep >= 1;
  const showTiers = buildStep >= 2;

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
            Act IV · Pragmatic Workflows
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          One workflow per feature.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Don't run every task through one process. Size the process to the task.
        </motion.p>
      </div>

      {/* Center Stage: The Spectrum & Tier Cards */}
      <div className="my-auto w-full max-w-5xl mx-auto flex flex-col justify-center z-10 py-2">
        
        {/* Spectrum Container */}
        <div className="w-full bg-white rounded-2xl p-6 sm:p-7 border-2 border-neutral-300 shadow-sm relative mb-5">
          
          {/* Top Spectrum Labels */}
          <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider mb-5">
            <div className="flex items-center gap-2 text-neutral-600">
              <MessageSquare className="w-4 h-4 text-neutral-400" />
              <span>Chatbot (Ad-hoc)</span>
            </div>
            
            <div className="flex items-center gap-2 text-neutral-600">
              <span>Full Framework (BMAD / AI-DLC)</span>
              <ShieldCheck className="w-4 h-4 text-neutral-400" />
            </div>
          </div>

          {/* The Horizontal Line / Track */}
          <div className="relative h-4 bg-neutral-100 rounded-full border-2 border-neutral-200 flex items-center px-1">
            <div className="absolute left-0 right-0 h-1 bg-[#1B7ED0]/60 rounded-full" />
            
            {/* The "Me" Marker (Build 1) */}
            {showMarker && (
              <motion.div
                initial={{ left: '5%' }}
                animate={{
                  left: ['5%', '92%', '42%'],
                }}
                transition={{
                  duration: 1.4,
                  times: [0, 0.45, 1],
                  ease: appleEase,
                }}
                className="absolute -top-7 -translate-x-1/2 flex flex-col items-center z-20"
              >
                {/* Marker Pill */}
                <div className="bg-[#1B7ED0] text-white px-3 py-1 rounded-full text-xs font-mono font-bold shadow-md flex items-center gap-1.5 border-2 border-white whitespace-nowrap">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>Where I live (Right-sized)</span>
                </div>
                {/* Pointer Arrow */}
                <div className="w-2.5 h-2.5 bg-[#1B7ED0] rotate-45 -mt-1 shadow-xs" />
              </motion.div>
            )}
          </div>

          {/* Explanatory notes under spectrum */}
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mt-4 pt-2 border-t-2 border-neutral-100">
            <span>Fast · Zero overhead · Fragile on large tasks</span>
            <span>Rigorous · Thorough · Token-heavy</span>
          </div>
        </div>

        {/* Build 2: Three Sizing Tiers */}
        {showTiers && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
            className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4"
          >
            {TIERS.map((tier, idx) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springPhysics, delay: idx * 0.1 }}
                  className={`bg-white rounded-xl p-4 sm:p-5 border-2 ${tier.border} shadow-sm flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                        {tier.tier} Tier
                      </span>
                      <div className={`w-6 h-6 rounded-lg ${tier.bg} flex items-center justify-center ${tier.color}`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="text-xs font-mono font-semibold text-neutral-500 mb-1">
                      {tier.scope}
                    </div>

                    <div className={`text-base font-black tracking-tight ${tier.color} mb-2`}>
                      {tier.method}
                    </div>

                    <p className="text-xs text-[#4A4A55] leading-relaxed">
                      {tier.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t-2 border-neutral-100 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span>Overhead: {idx === 0 ? '0%' : idx === 1 ? '15%' : '25%'}</span>
                    <span className="font-semibold text-neutral-600">
                      {idx === 2 ? 'InformatiQ Standard' : 'Everyday'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Bottom Footer & Poll Callback */}
      <div className="z-10 pt-3 border-t-2 border-neutral-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-xs sm:text-sm text-[#4A4A55] font-semibold">
            {showTiers ? (
              <span>The right end isn't bad — borrow its contracts, skip its bureaucracy.</span>
            ) : (
              <span>Size the workflow to the feature. Not the company.</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-neutral-500">
            <span className="w-2 h-2 rounded-full bg-[#1B7ED0]" />
            <span>Workflow Choice · Matching process weight to feature risk</span>
          </div>
        </div>
      </div>
    </div>
  );
}
