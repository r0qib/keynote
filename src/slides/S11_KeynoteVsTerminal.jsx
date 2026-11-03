import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { Sparkles, Terminal, MessageSquare, AlertCircle } from 'lucide-react';

/**
 * Slide 11: The keynote vs. my terminal.
 * 
 * Corner: 11 / Promise vs. reality (Amber accent dot #D97706)
 * Headline: "The keynote vs. my terminal."
 * 
 * Visual: Split composition (no generic cards)
 * - Left: Polished keynote typography ("Autonomous.", "End-to-end.", "Like a senior engineer who never sleeps.")
 * - Right: Realistic plain developer terminal / chat with sycophantic apology and identical broken code.
 * - Footer: Callback to Poll Q5 (developer frustrations).
 * 
 * Builds:
 *  - 0: Headline and split layout skeleton.
 *  - 1: Keynote marketing claims land staggered on the left.
 *  - 2: Terminal types in on the right with sycophantic apology and identical broken code.
 */
export default function S11_KeynoteVsTerminal({ activeSlide, buildStep }) {
  const showKeynote = buildStep >= 1;
  const showTerminal = buildStep >= 2;

  const keynoteClaims = [
    { title: 'Autonomous.', desc: 'End-to-end execution without human intervention.' },
    { title: 'Zero context loss.', desc: 'Seamlessly understands your entire legacy codebase.' },
    { title: 'Like a senior engineer who never sleeps.', desc: 'Instant architectural clarity 24/7.' },
  ];

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
          <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            Promise vs. Reality
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
        >
          The keynote vs. my terminal.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          The distance between how AI is pitched and what we actually live with every day.
        </motion.p>
      </div>

      {/* Center Stage: Split Composition */}
      <div className="my-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch z-10 py-2">
        
        {/* Left Side: The Keynote Pitch */}
        <div className="flex flex-col justify-between bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-300 shadow-sm relative overflow-hidden">
          {/* Subtle accent backdrop */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-200">
              <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs uppercase tracking-wider font-bold">
                <Sparkles className="w-4 h-4 text-[#D97706] stroke-[2.5]" />
                The Keynote Demo
              </div>
              <span className="font-mono text-xs text-neutral-400 font-medium">Stage lights on</span>
            </div>

            <div className="mt-6 flex flex-col gap-6">
              {keynoteClaims.map((claim, idx) => (
                <motion.div
                  key={claim.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: showKeynote ? 1 : 0.15,
                    x: showKeynote ? 0 : -10,
                  }}
                  transition={{
                    delay: showKeynote ? idx * 0.18 : 0,
                    duration: 0.5,
                    ease: appleEase,
                  }}
                  className="flex flex-col gap-1"
                >
                  <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900">
                    "{claim.title}"
                  </div>
                  <div className="text-sm sm:text-base text-neutral-600 font-normal">
                    {claim.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t-2 border-neutral-100 flex items-center justify-between font-mono text-xs text-neutral-400">
            <span>Vendor promise</span>
            <span>Always 100% confident</span>
          </div>
        </div>

        {/* Right Side: My Terminal */}
        <div className="flex flex-col justify-between bg-[#18181B] rounded-3xl p-6 sm:p-7 border-2 border-neutral-800 shadow-xl relative overflow-hidden text-neutral-100 font-mono">
          
          {/* Terminal Window Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
                <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="ml-3 text-xs text-neutral-400 font-mono font-medium">
                  terminal — ai-copilot-session
                </span>
              </div>
              <span className="text-[11px] text-amber-500/80 font-mono">Turn 47</span>
            </div>

            {/* Terminal Body */}
            <div className="mt-5 flex flex-col gap-4 text-xs sm:text-sm">
              
              {/* User Prompt */}
              <div className="flex items-start gap-2.5">
                <span className="text-amber-500 font-bold select-none">me &gt;</span>
                <span className="text-neutral-100 font-semibold tracking-wide">
                  the button still doesn't work. it fires immediately on page load.
                </span>
              </div>

              {/* Agent Sycophantic Apology */}
              <AnimatePresence>
                {showTerminal && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: appleEase }}
                    className="flex flex-col gap-3 mt-2"
                  >
                    <div className="text-emerald-400 text-xs sm:text-sm leading-relaxed bg-emerald-950/30 border-2 border-emerald-800/40 p-3 rounded-xl">
                      <span className="text-neutral-400 select-none">agent &gt; </span>
                      "You're absolutely right! I apologize for the oversight. Here is the corrected, production-ready version:"
                    </div>

                    {/* Identical Broken Code Block */}
                    <div className="bg-[#101012] rounded-xl p-3.5 border-2 border-amber-600/60 relative mt-1">
                      <div className="text-[10px] uppercase tracking-wider text-amber-500 font-bold mb-2 flex items-center justify-between">
                        <span>Generated Code (Unchanged)</span>
                        <span className="text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border-2 border-amber-600/50">
                          Identical line
                        </span>
                      </div>
                      
                      <div className="space-y-1 text-xs">
                        <div className="text-neutral-500">// Line 42: Still invokes immediately on render</div>
                        <div className="bg-amber-950/40 text-amber-200 px-2 py-1 rounded border-l-2 border-amber-500 font-semibold">
                          &lt;button onClick=&#123;handleClick()&#125; className="btn-primary"&gt;
                        </div>
                        <div className="text-neutral-400 pl-4">
                          Confirm Rig Telemetry
                        </div>
                        <div className="text-neutral-400">&lt;/button&gt;</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Terminal Bottom Callback / Punchline */}
          <div className="mt-5 pt-3 border-t-2 border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
            <span className="text-amber-400/90 font-medium">
              {showTerminal ? "With 100% confidence." : "Waiting for prompt response…"}
            </span>
            <span className="text-neutral-500 text-[11px]">
              Same code. Same bug.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Footer Callout: Poll Q5 Callback */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: showTerminal ? 1 : 0.45, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2 border-t-2 border-neutral-200 text-xs md:text-sm text-[#4A4A55]"
      >
        <div className="flex items-center gap-2 font-mono">
          <span className="w-2 h-2 rounded-full bg-[#D97706]" />
          <span className="font-semibold text-neutral-800">The Daily Reality:</span>
          <span className="italic text-neutral-600">"Not a senior engineer who never sleeps. A very fast junior with short-term amnesia."</span>
        </div>
        <div className="font-mono text-xs text-neutral-400">
          Turn 47
        </div>
      </motion.div>
    </div>
  );
}
