import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { CheckCircle2, DollarSign, Clock, BookOpen, GitMerge, ShieldCheck, FileCheck } from 'lucide-react';

/**
 * Slide 19: Proven. Thorough. Not cheap.
 * 
 * Corner: 19 / Methodologies (Coral accent dot #E5484D)
 * Headline: "Proven. Thorough. Not cheap."
 * One idea: The structured AI frameworks are proven and they work, but following them properly
 * takes real tokens, time, and discipline. They are general by design.
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Empty level balance scale + footer tags (Spec Kit · AI-DLC · BMAD · OpenSpec).
 *  - 1: "What you get" weights fill and left pan tilts down (showing real value).
 *  - 2: "What it takes" weights fill, scale balances back level, and closing line appears:
 *       "General by design. Worth it when the job is big enough."
 */

const WHAT_YOU_GET = [
  { label: 'Specs as contracts', icon: FileCheck },
  { label: 'Settled decisions', icon: CheckCircle2 },
  { label: 'Phased work', icon: GitMerge },
  { label: 'Review gates', icon: ShieldCheck },
];

const WHAT_IT_TAKES = [
  { label: 'Tokens ($$$)', icon: DollarSign },
  { label: 'Time & Latency', icon: Clock },
  { label: 'Learning curve', icon: BookOpen },
  { label: 'Process discipline', icon: ShieldCheck },
];

const FRAMEWORK_TAGS = ['Spec Kit', 'AI-DLC', 'BMAD', 'OpenSpec'];

export default function S19_Frameworks({ activeSlide, buildStep }) {
  const showWhatYouGet = buildStep >= 1;
  const showWhatItTakes = buildStep >= 2;

  // Scale tilt calculation:
  // 0: level (0 deg)
  // 1: left pan dips down (-7 deg)
  // 2: level (0 deg, balanced weight)
  const beamAngle = buildStep === 1 ? -7 : 0;

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
            Frameworks & Methodologies
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
        >
          Proven. Thorough. <span className="text-[#E5484D]">Not cheap.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Structured frameworks deliver results. The question is if we can afford them on every ticket.
        </motion.p>
      </div>

      {/* Center Stage: Interactive Line-Art Balance Scale */}
      <div className="my-auto w-full max-w-5xl mx-auto flex flex-col items-center justify-center z-10 py-2 relative">
        
        {/* Scale Container */}
        <div className="w-full relative h-[300px] sm:h-[340px] flex items-center justify-center">
          
          {/* Central Fulcrum Stand */}
          <div className="absolute bottom-6 flex flex-col items-center z-0">
            {/* Triangular pivot base */}
            <svg width="60" height="70" viewBox="0 0 60 70" className="fill-neutral-200 stroke-neutral-800 stroke-[3]">
              <polygon points="30,5 5,65 55,65" />
              <circle cx="30" cy="8" r="4" className="fill-neutral-900" />
            </svg>
            <div className="w-44 h-3 bg-neutral-800 rounded-full mt-[-2px]" />
          </div>

          {/* Central Pillar */}
          <div className="absolute bottom-16 w-3.5 h-36 bg-neutral-800 rounded-t-sm z-0" />

          {/* Pivoting Beam Assembly */}
          <motion.div
            animate={{ rotate: beamAngle }}
            transition={springPhysics}
            className="w-[82%] sm:w-[740px] h-4 bg-neutral-800 rounded-full relative flex items-center justify-between z-10 origin-center"
            style={{ transformOrigin: '50% 50%' }}
          >
            {/* Center Pivot Jewel */}
            <div className="absolute left-1/2 -top-2.5 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-[3.5px] border-neutral-900 flex items-center justify-center shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E5484D]" />
            </div>

            {/* Left Pan Assembly (What You Get) */}
            <div className="relative -left-2 -top-1">
              {/* Chains / Wire Lines */}
              <svg width="220" height="90" viewBox="0 0 220 90" className="stroke-neutral-800 stroke-2 fill-none overflow-visible">
                <line x1="110" y1="0" x2="15" y2="90" />
                <line x1="110" y1="0" x2="205" y2="90" />
                <path d="M 5,90 Q 110,105 215,90" strokeWidth="3.5" stroke="#111113" fill="#F4F4F5" />
              </svg>

              {/* Left Pan Contents (What You Get) */}
              <div className="absolute top-[-75px] left-1/2 -translate-x-1/2 w-[220px] flex flex-col items-center">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E9E6A] mb-2 px-3 py-1 bg-emerald-50 rounded-full border-2 border-emerald-200">
                  What You Get
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                  {WHAT_YOU_GET.map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{
                        opacity: showWhatYouGet ? 1 : 0,
                        scale: showWhatYouGet ? 1 : 0.8,
                        y: showWhatYouGet ? 0 : -10,
                      }}
                      transition={{ ...springPhysics, delay: idx * 0.1 }}
                      className="bg-white px-3 py-1.5 rounded-xl border-2 border-neutral-300 shadow-sm flex items-center gap-2 text-xs font-semibold text-neutral-800"
                    >
                      <item.icon className="w-3.5 h-3.5 text-[#1E9E6A] flex-shrink-0 stroke-[2.5]" />
                      <span className="truncate">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Pan Assembly (What It Takes) */}
            <div className="relative -right-2 -top-1">
              {/* Chains / Wire Lines */}
              <svg width="220" height="90" viewBox="0 0 220 90" className="stroke-neutral-800 stroke-2 fill-none overflow-visible">
                <line x1="110" y1="0" x2="15" y2="90" />
                <line x1="110" y1="0" x2="205" y2="90" />
                <path d="M 5,90 Q 110,105 215,90" strokeWidth="3.5" stroke="#111113" fill="#F4F4F5" />
              </svg>

              {/* Right Pan Contents (What It Takes) */}
              <div className="absolute top-[-75px] left-1/2 -translate-x-1/2 w-[220px] flex flex-col items-center">
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#E5484D] mb-2 px-3 py-1 bg-red-50 rounded-full border-2 border-red-200">
                  What It Takes
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                  {WHAT_IT_TAKES.map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{
                        opacity: showWhatItTakes ? 1 : 0,
                        scale: showWhatItTakes ? 1 : 0.8,
                        y: showWhatItTakes ? 0 : -10,
                      }}
                      transition={{ ...springPhysics, delay: idx * 0.1 }}
                      className="bg-white px-3 py-1.5 rounded-xl border-2 border-neutral-300 shadow-sm flex items-center gap-2 text-xs font-semibold text-neutral-800"
                    >
                      <item.icon className="w-3.5 h-3.5 text-[#E5484D] flex-shrink-0 stroke-[2.5]" />
                      <span className="truncate">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

          </motion.div>
        </div>

        {/* Build 2 Closing Takeaway Line */}
        <div className="min-h-[42px] mt-4 flex items-center justify-center">
          {showWhatItTakes && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: appleEase }}
              className="text-base sm:text-lg md:text-xl font-bold text-neutral-900 bg-neutral-100 px-5 py-2 rounded-2xl border-2 border-neutral-300 shadow-sm text-center"
            >
              "General by design. <span className="text-[#0052CC]">Worth it when the job is big enough."</span>
            </motion.div>
          )}
        </div>

        {/* Bottom Frameworks Registry Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 mr-2 font-semibold">
            Industry Frameworks:
          </span>
          {FRAMEWORK_TAGS.map((tag) => (
            <span
              key={tag}
              className="font-mono text-xs font-semibold px-3 py-1 rounded-xl bg-white border-2 border-neutral-300 text-neutral-700 shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

      </div>

      {/* Bottom Pacing Indicator */}
      <div className="z-10 flex items-center justify-between pt-3 border-t-2 border-neutral-200 text-xs text-[#4A4A55] font-mono">
        <span>Framework Evaluation</span>
        <span className="text-neutral-500 font-semibold">Thorough processes have real costs</span>
      </div>
    </div>
  );
}
