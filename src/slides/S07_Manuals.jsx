import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, bouncierSpring } from '../motion';
import meatDoneSvg from '../assets/meatproxy-emojis-svg/meat-done.svg';
import { 
  GitBranch, 
  GitCompare, 
  Camera, 
  FileText, 
  UserCheck, 
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const PIPELINE_STEPS = [
  {
    id: 1,
    title: 'Code Release',
    subtitle: 'App commit / tag triggers workflow',
    icon: GitBranch,
  },
  {
    id: 2,
    title: 'Incremental Diff',
    subtitle: 'Only processes UI states that changed',
    icon: GitCompare,
    highlight: true,
  },
  {
    id: 3,
    title: 'Annotated Docs',
    subtitle: 'Headless captures with numbered pins',
    icon: Camera,
  },
  {
    id: 4,
    title: 'Engineer Signoff',
    subtitle: 'Staff engineer reviews & approves',
    icon: UserCheck,
    isHumanGate: true,
  },
];

/**
 * Slide 07: Our user manuals write themselves.
 * 
 * Corner: 07 / Our best "good"
 * Headline: "Our user manuals write themselves."
 * 
 * Left: 4-stage automated documentation pipeline.
 * Right: Clean neutral UI mockup with numbered callouts (1), (2), (3).
 * 
 * Builds:
 *  - 0: Pipeline stages + UI mockup
 *  - 1: Callouts animate onto screenshot, "Incremental Diff" glows
 *  - 2: "Engineer Signoff" lights up with checkmark and meat-done stamp:
 *       "A human still signs off. We removed the toil, not the person."
 */
export default function S07_Manuals({ activeSlide, buildStep }) {
  const showCallouts = buildStep >= 1;
  const showHumanSignoff = buildStep >= 2;

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
          <span className="w-2.5 h-2.5 rounded-full bg-[#1E9E6A]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            Automated Documentation
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          Our user manuals write themselves.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Everyone needs manuals. Nobody writes them. They're stale on day one.
        </motion.p>
      </div>

      {/* Main Content Split: Pipeline on Left, Mockup on Right */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center z-10 w-full max-w-7xl mx-auto py-2">
        
        {/* Left Side: 4-Stage Pipeline (6 cols) */}
        <div className="lg:col-span-6 flex flex-col gap-3 bg-white p-5 sm:p-6 rounded-2xl border-2 border-neutral-200/90 shadow-sm relative">
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-100">
            <span className="font-mono text-xs font-bold tracking-wider text-neutral-500 uppercase">
              Pipeline Architecture
            </span>
            <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Autonomous
            </span>
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            {PIPELINE_STEPS.map((step, idx) => {
              const Icon = step.icon;
              const isCleverBit = step.highlight;
              const isHuman = step.isHumanGate;

              return (
                <div key={step.id} className="relative">
                  <motion.div
                    animate={{
                      scale: isCleverBit && showCallouts ? 1.015 : 1,
                      borderColor: isHuman && showHumanSignoff
                        ? '#1E9E6A'
                        : isCleverBit && showCallouts
                        ? '#1E9E6A'
                        : '#E5E7EB',
                    }}
                    transition={{ duration: 0.35 }}
                    className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all relative ${
                      isHuman && showHumanSignoff
                        ? 'bg-emerald-50/90 text-emerald-950 shadow-md ring-2 ring-[#1E9E6A]/30'
                        : isCleverBit && showCallouts
                        ? 'bg-emerald-50/60 text-[#111113] shadow-sm'
                        : 'bg-white text-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      {/* Step Number & Icon */}
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 border-2 ${
                          isHuman && showHumanSignoff
                            ? 'bg-[#1E9E6A] text-white border-[#1E9E6A]'
                            : isCleverBit && showCallouts
                            ? 'bg-[#1E9E6A] text-white border-[#1E9E6A]'
                            : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                        }`}
                      >
                        {isHuman && showHumanSignoff ? (
                          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                        ) : (
                          <Icon className="w-4 h-4 stroke-[2]" />
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-base leading-tight">
                            {step.title}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-500 font-normal">
                          {step.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Right status badge */}
                    <div className="flex items-center gap-2">
                      {isCleverBit && (
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-[#1E9E6A]">
                          Diff only
                        </span>
                      )}
                      {isHuman && showHumanSignoff && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={bouncierSpring}
                          className="font-mono text-xs font-bold text-[#1E9E6A] bg-white px-2.5 py-0.5 rounded-md border-2 border-[#1E9E6A]/40"
                        >
                          APPROVED
                        </motion.span>
                      )}
                    </div>
                  </motion.div>

                  {/* Connecting Arrow */}
                  {idx < PIPELINE_STEPS.length - 1 && (
                    <div className="flex justify-center -my-1 z-10">
                      <svg width="16" height="10" viewBox="0 0 16 10" fill="none" className="text-neutral-300">
                        <path d="M8 0V7M8 7L4 4M8 7L12 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Sample Neutral Screenshot Card (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center relative">
          
          {/* Screenshot Card Container */}
          <div className="w-full bg-white rounded-2xl border-2 border-neutral-300 shadow-xl overflow-hidden relative">
            
            {/* Window Chrome Header */}
            <div className="bg-neutral-100 px-3 py-2 border-b-2 border-neutral-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              </div>
              <span className="font-mono text-[11px] text-neutral-400">
                app.internal/rig-control/telemetry
              </span>
              <div className="w-8" />
            </div>

            {/* Simulated UI Window Body */}
            <div className="p-4 sm:p-5 bg-neutral-50/50 flex flex-col gap-3 relative min-h-[280px]">
              
              {/* Mock App Header */}
              <div className="flex items-center justify-between pb-3 border-b-2 border-neutral-200">
                <div>
                  <div className="font-bold text-sm text-[#111113]">Subsea BPV Monitor</div>
                  <div className="text-[11px] text-neutral-400">Sector 4 · Live Node</div>
                </div>

                {/* Target 1: Status Badge */}
                <div className="relative">
                  <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border-2 border-emerald-300 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1E9E6A] animate-ping" />
                    LIVE TELEMETRY
                  </span>

                  {/* Callout 1 Pin */}
                  <AnimatePresence>
                    {showCallouts && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={bouncierSpring}
                        className="absolute -top-3 -right-3 z-20 flex items-center gap-1.5"
                      >
                        <span className="w-6 h-6 rounded-full bg-[#1E9E6A] text-white font-mono text-xs font-black flex items-center justify-center shadow-lg ring-2 ring-white">
                          1
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Target 2: Pressure Chart & Control Card */}
              <div className="bg-white p-3 rounded-xl border-2 border-neutral-200 shadow-sm relative">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-neutral-700">Annular Pressure</span>
                  <span className="font-mono text-xs text-neutral-500">4,120 PSI</span>
                </div>
                <svg viewBox="0 0 100 24" className="w-full h-10 stroke-[#1B7ED0] fill-none stroke-[2.5]">
                  <path d="M0,16 Q20,4 40,14 T80,8 L100,12" />
                </svg>

                {/* Callout 2 Pin */}
                <AnimatePresence>
                  {showCallouts && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0, x: -10 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      transition={{ ...bouncierSpring, delay: 0.15 }}
                      className="absolute -bottom-2 -left-2 z-20 flex items-center gap-1.5"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#1E9E6A] text-white font-mono text-xs font-black flex items-center justify-center shadow-lg ring-2 ring-white">
                        2
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Callouts Legend underneath */}
              <AnimatePresence>
                {showCallouts && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                    className="mt-1 pt-2 border-t-2 border-neutral-100 flex flex-col gap-1.5 text-xs text-neutral-600"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#1E9E6A] text-white font-mono text-[9px] font-bold flex items-center justify-center flex-shrink-0">1</span>
                      <span className="truncate">Live telemetry indicator state</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#1E9E6A] text-white font-mono text-[9px] font-bold flex items-center justify-center flex-shrink-0">2</span>
                      <span className="truncate">Annular pressure threshold monitoring</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Stamp Mascot: meat-done cleanly anchored inside mockup header */}
          <AnimatePresence>
            {showHumanSignoff && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={springPhysics}
                className="mt-4 flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-[#1E9E6A]/50"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={meatDoneSvg}
                    alt="Approved"
                    className="w-10 h-10 flex-shrink-0"
                  />
                  <div>
                    <div className="font-bold text-sm text-[#111113]">
                      "A human still signs off."
                    </div>
                    <div className="text-xs text-neutral-600">
                      We removed the repetitive toil, not the human engineer.
                    </div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#1E9E6A] px-2.5 py-1 rounded-md bg-white border border-[#1E9E6A]/30">
                  Reviewed
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Clean bottom note */}
      <div className="pt-2 text-sm text-[#4A4A55] font-mono">
        Git commit <span className="text-neutral-400">→</span> Incremental UI diff <span className="text-neutral-400">→</span> Headless annotated screenshots <span className="text-neutral-400">→</span> <span className="text-[#1E9E6A] font-semibold">Human approval</span>
      </div>
    </div>
  );
}
