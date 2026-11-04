import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase } from '../motion';
import { Sparkles } from 'lucide-react';

const keynoteClaims = [
  {
    title: 'Autonomous.',
    desc: 'End-to-end execution without human intervention.',
  },
  {
    title: 'Zero context loss.',
    desc: 'Seamlessly understands your entire legacy codebase.',
  },
  {
    title: 'Like a senior engineer.',
    desc: 'Instant architectural clarity 24/7.',
  },
];

/**
 * Slide 11: The keynote vs. my terminal.
 * 
 * Act II: The Bad
 * Headline: "The keynote vs. my terminal."
 * One idea: Vendor keynote promises vs the daily reality of terminal amnesia.
 * 
 * Builds:
 *  - 0: Keynote claims appear on the left.
 *  - 1: Terminal prompt appears on the right ("the button still doesn't work...").
 *  - 2: Sycophantic apology appears, repeating the exact same broken line with 100% confidence.
 */
export default function S11_KeynoteVsTerminal({ activeSlide, buildStep }) {
  const showKeynote = true;
  const showPrompt = buildStep >= 1;
  const showTerminal = buildStep >= 2;

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

      {/* Main Comparison Arena (Side-by-side) */}
      <div className="my-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 z-10 w-full max-w-6xl mx-auto py-2">
        
        {/* Left Side: The Keynote Pitch */}
        <div className="flex flex-col justify-between bg-white rounded-3xl p-7 sm:p-9 border border-neutral-200/90 shadow-sm relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-2 text-neutral-800 font-mono text-sm uppercase tracking-wider font-bold">
                <Sparkles className="w-4 h-4 text-[#D97706] stroke-[2.5]" />
                The Keynote Pitch
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-7">
              {keynoteClaims.map((claim, idx) => (
                <motion.div
                  key={claim.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: showKeynote ? 1 : 0.15,
                    x: showKeynote ? 0 : -10,
                  }}
                  transition={{
                    delay: showKeynote ? idx * 0.15 : 0,
                    duration: 0.5,
                    ease: appleEase,
                  }}
                  className="flex flex-col gap-1"
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-neutral-900">
                    "{claim.title}"
                  </div>
                  <div className="text-base sm:text-lg text-[#4A4A55] font-normal">
                    {claim.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: My Terminal */}
        <div className="flex flex-col justify-between bg-[#18181B] rounded-3xl p-7 sm:p-9 border-2 border-neutral-800 shadow-xl relative overflow-hidden text-neutral-100 font-mono">
          <div>
            {/* Window chrome dots */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-[#EF4444]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#F59E0B]" />
                <span className="w-3.5 h-3.5 rounded-full bg-[#10B981]" />
                <span className="ml-3 text-sm text-neutral-400 font-mono font-medium">
                  terminal — copilot session
                </span>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="mt-6 flex flex-col gap-4 text-sm sm:text-base">
              {/* User Prompt */}
              {showPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <span className="text-amber-400 font-bold select-none">&gt;</span>
                  <span className="text-neutral-100 font-semibold tracking-wide">
                    the button still invokes immediately on page load.
                  </span>
                </motion.div>
              )}

              {/* Agent Response */}
              <AnimatePresence>
                {showTerminal && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: appleEase }}
                    className="flex flex-col gap-3 mt-2"
                  >
                    <div className="text-emerald-400 text-sm leading-relaxed bg-emerald-950/40 border border-emerald-800/40 p-4 rounded-xl">
                      <span className="text-neutral-400 select-none">agent &gt; </span>
                      "You're absolutely right! I apologize for the oversight. Here is the corrected version:"
                    </div>

                    {/* Identical Broken Code */}
                    <div className="bg-[#101012] rounded-xl p-4 border border-amber-600/60 relative mt-1">
                      <div className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-2">
                        Line 42: Still invokes immediately
                      </div>
                      
                      <div className="space-y-1 text-sm font-mono">
                        <div className="bg-amber-950/60 text-amber-200 px-3 py-1.5 rounded border-l-4 border-amber-500 font-semibold">
                          &lt;button onClick=&#123;handleClick()&#125;&gt;Confirm Rig Telemetry&lt;/button&gt;
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Terminal Bottom Punchline */}
          <div className="mt-6 pt-4 border-t border-neutral-800 text-sm font-sans text-neutral-400">
            {showTerminal && (
              <span className="text-amber-400 font-medium">
                Delivered with 100% confidence. Same code. Same bug.
              </span>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
