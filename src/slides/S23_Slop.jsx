import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import feedbackImg from '../assets/template_layout_feedback.png';
import { Sparkles, Rocket, ArrowRight, Zap, CheckCircle2, ShieldAlert } from 'lucide-react';

/**
 * Slide 23: Everything is purple now.
 * 
 * Corner: 23 / Slop (Coral accent dot #E5484D)
 * Headline: "Everything is purple now."
 * One idea: AI output is becoming generic and recognizable, and we feed it.
 * 
 * Visual:
 *  - The ONLY slide where purple gradients are permitted (because purple IS the joke).
 * 
 * Builds (totalBuilds: 3):
 *  - 0: A believable generic AI landing page mockup with purple gradient, glass cards, rocket, buzzwords.
 *  - 1: Zoom out into a grid of 12 near-identical AI slop landing pages ("Spot the difference.").
 *  - 2: "Exhibit A: The first AI draft of this deck" slides in with real annotations.
 *  - 3: Clears to the golden rule: "AI should follow our principles, not define them."
 *       Footnote: "No purple gradients were harmed in the rest of this deck."
 */

const GRID_SLOP_TITLES = [
  'Supercharge your flow',
  'Unleash next-gen AI',
  'Frictionless synergy',
  'Hyper-scale your team',
  'Seamless intelligence',
  'Automate everything',
  'Next-level velocity',
  '10x your dev stack',
  'Smarter than ever',
  'Empower your future',
  'AI-first productivity',
  'The modern cloud layer',
];

export default function S23_Slop({ activeSlide, buildStep }) {
  const isPrinciple = buildStep >= 3;
  const isExhibitA = buildStep === 2;
  const isGrid = buildStep === 1;

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 sm:p-10 md:p-14 lg:p-18 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Header (Hidden on final principle to maximize contrast) */}
      {!isPrinciple && (
        <div className="z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
            className="flex items-center gap-2 mb-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D]" />
            <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
              Design & Aesthetics
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: appleEase }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
          >
            Everything is <span className="text-purple-600 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">purple</span> now.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
            className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
          >
            Raise a hand if you've seen this exact website. Give it no opinions, and it gives you the internet's average.
          </motion.p>
        </div>
      )}

      {/* Center Stage Arena */}
      <div className="my-auto w-full max-w-5xl mx-auto flex items-center justify-center z-10 py-2 relative min-h-[400px]">
        <AnimatePresence>
          
          {/* Build 0: Single Full Generic AI Slop Landing Page */}
          {buildStep === 0 && (
            <motion.div
              key="slop-single"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: appleEase }}
              className="w-full max-w-3xl rounded-3xl overflow-hidden border-2 border-purple-300 shadow-2xl relative"
              style={{
                background: 'linear-gradient(135deg, #1E1035 0%, #2E0854 50%, #0F0728 100%)',
              }}
            >
              {/* Fake Browser Chrome */}
              <div className="h-9 bg-purple-950/80 border-b border-purple-800/60 px-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="font-mono text-[11px] text-purple-300">https://supercharge-nexus-ai.io</span>
                <div className="w-10" />
              </div>

              {/* Slop Content Body */}
              <div className="p-8 sm:p-10 flex flex-col items-center text-center text-white relative overflow-hidden">
                {/* Purple glowing orb */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />

                {/* Sparkle Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 text-xs font-mono mb-4 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-purple-300 animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Next-Generation Neural Synthesis 2.0</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white max-w-xl leading-tight">
                  Supercharge your workflow with{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-300 bg-clip-text text-transparent">
                    Intelligent Synergies.
                  </span>
                </h2>

                <p className="mt-3 text-sm text-purple-200/80 max-w-md">
                  Empower frictionless velocity with autonomous agents designed to hyper-scale your modern cloud paradigm.
                </p>

                {/* Call to action */}
                <div className="mt-6 flex items-center gap-3">
                  <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg hover:opacity-90">
                    <Rocket className="w-4 h-4" />
                    <span>Get Started Free</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs text-purple-300 underline font-mono">Book Demo →</span>
                </div>

                {/* 3 Glass Cards */}
                <div className="grid grid-cols-3 gap-3 w-full mt-8">
                  {['Zero Latency', 'Autonomous Ops', 'Enterprise Scale'].map((feature, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 backdrop-blur-md border border-purple-400/20 text-left">
                      <Zap className="w-4 h-4 text-purple-400 mb-1" />
                      <div className="text-xs font-bold text-white">{feature}</div>
                      <div className="text-[10px] text-purple-200/60 mt-0.5">Powered by deep LLM magic.</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Build 1: 12-Tile Slop Grid ("Spot the difference") */}
          {isGrid && (
            <motion.div
              key="slop-grid"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: appleEase }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-full flex items-center justify-between mb-3 px-2">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-700">
                  The Internet's Average Landing Page
                </span>
                <span className="font-mono text-xs font-bold bg-purple-100 text-purple-800 px-3 py-1 rounded-full border-2 border-purple-300">
                  Spot the difference. (There isn't one.)
                </span>
              </div>

              {/* 12-page grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 w-full">
                {GRID_SLOP_TITLES.map((title, i) => (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                    className="aspect-[16/10] rounded-xl p-2.5 flex flex-col justify-between border-2 border-purple-300 shadow-sm relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #1E1035 0%, #2E0854 50%, #0F0728 100%)',
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    </div>

                    <div className="text-[10px] font-black text-white leading-tight">
                      {title}
                    </div>

                    <div className="h-2 w-12 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-sm" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-3 text-xs font-mono text-neutral-500">
                Code slop too: 3 date helper libs, a new pattern every PR, architecture by mood.
              </div>
            </motion.div>
          )}

          {/* Build 2: Exhibit A (Real annotated deck screenshot) */}
          {isExhibitA && (
            <motion.div
              key="exhibit-a"
              initial={{ opacity: 0, y: 20, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={springPhysics}
              className="w-full max-w-3xl flex flex-col items-center"
            >
              <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-red-400 shadow-2xl relative">
                
                {/* Red Exhibit Badge */}
                <div className="absolute -top-4 -left-3 bg-[#E5484D] text-white font-mono text-xs font-black uppercase px-4 py-1 rounded-xl shadow-lg border-2 border-white flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 stroke-[2.5]" />
                  <span>Exhibit A: The first AI draft of this deck!</span>
                </div>

                {/* Screenshot with presenter annotations */}
                <div className="rounded-2xl overflow-hidden border-2 border-neutral-300 mt-2 max-h-[290px] sm:max-h-[330px]">
                  <img
                    src={feedbackImg}
                    alt="Exhibit A: First AI draft of this deck with red review notes"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs font-mono text-neutral-700 px-1">
                  <span className="font-bold text-red-600">
                    "Nobody is above it. Including me."
                  </span>
                  <span className="text-neutral-500">
                    Actual red ink review notes from planning phase
                  </span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Build 3: Grand Golden Principle */}
          {isPrinciple && (
            <motion.div
              key="golden-principle"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: appleEase }}
              className="w-full max-w-4xl flex flex-col items-center text-center px-4"
            >
              <div className="flex items-center gap-2 mb-6 font-mono text-xs sm:text-sm uppercase tracking-widest text-neutral-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-[#111113]" />
                <span>The Core Engineering Axiom</span>
              </div>

              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.08]">
                "AI should follow our <span className="underline decoration-[#0052CC] decoration-4 underline-offset-8">principles</span>, not define them."
              </h2>

              <p className="mt-8 text-lg sm:text-xl text-neutral-600 max-w-2xl font-light">
                When you give it no opinions, it gives you the internet's average. Give it standards, constraints, and architecture.
              </p>

              {/* Footnote */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-10 font-mono text-xs text-neutral-400 bg-neutral-100 px-4 py-1.5 rounded-full border-2 border-neutral-300"
              >
                * No purple gradients were harmed in the rest of this deck. Checked twice.
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
