import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics, bouncierSpring } from '../motion';
import { Send, CornerDownLeft, Sparkles, AlertCircle } from 'lucide-react';

/**
 * Slide 16: Make it better. Make no mistakes.
 * 
 * Corner: 16 / Our prompts (Amber accent dot #D97706)
 * Headline: "Make it better. Make no mistakes."
 * One idea: Pivot. Look at *our* prompts. Maybe it isn't only the AI.
 * 
 * Builds (totalBuilds: 3):
 *  - 0: First 2 phrases on screen ("make it better", "improve the UI").
 *  - 1: Phrases stack heavier and desperate ("think step by step", "make it perfect", "MAKE NO MISTAKES", "please.").
 *  - 2: Camera pulls back revealing all phrases are inside a single chat input box labelled "You".
 *  - 3: Everything clears to one centered punchline statement: "The Bad is the AI." (holding for S17).
 */

const PHRASES = [
  { text: 'make it better', level: 0, size: 'text-2xl sm:text-3xl', weight: 'font-normal', color: 'text-neutral-500' },
  { text: 'improve the UI', level: 0, size: 'text-2xl sm:text-3xl', weight: 'font-medium', color: 'text-neutral-700' },
  { text: 'think step by step', level: 1, size: 'text-3xl sm:text-4xl', weight: 'font-semibold', color: 'text-neutral-800' },
  { text: 'make it perfect', level: 1, size: 'text-3xl sm:text-4xl', weight: 'font-bold', color: 'text-neutral-900' },
  { text: 'MAKE NO MISTAKES', level: 1, size: 'text-4xl sm:text-5xl md:text-6xl', weight: 'font-black', color: 'text-[#D97706]' },
  { text: 'please.', level: 1, size: 'text-xl sm:text-2xl', weight: 'font-light italic', color: 'text-neutral-500' },
];

export default function S16_MakeNoMistakes({ activeSlide, buildStep }) {
  const isFinalPunchline = buildStep >= 3;
  const isZoomedOut = buildStep >= 2;
  const showDesperate = buildStep >= 1;

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
            The Prompting Spiral
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
        >
          Make it better. Make no mistakes.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Look at our prompts. Maybe it isn't only the AI.
        </motion.p>
      </div>

      {/* Center Stage Arena */}
      <div className="my-auto w-full max-w-4xl mx-auto flex items-center justify-center z-10 py-2 min-h-[380px]">
        <AnimatePresence>
          
          {/* Builds 0, 1, 2: Kinetic Prompts Stacking & Camera Pull Back */}
          {!isFinalPunchline ? (
            <motion.div
              key="prompts-arena"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{
                opacity: 1,
                scale: isZoomedOut ? 0.92 : 1,
              }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: appleEase }}
              className={`w-full transition-all duration-500 ${
                isZoomedOut
                  ? 'bg-white rounded-3xl p-6 sm:p-8 border-2 border-neutral-300 shadow-xl'
                  : 'bg-transparent'
              }`}
            >
              {/* Build 2 Revealed Header: "You" Chat Box Frame */}
              {isZoomedOut && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-neutral-900 text-white font-mono text-xs flex items-center justify-center font-bold">
                      You
                    </span>
                    <span className="font-mono text-xs text-neutral-500 font-semibold tracking-wide">
                      Single Prompt Box
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Kinetic Phrases Stacking */}
              <div className="flex flex-col items-center justify-center text-center gap-2 sm:gap-3 font-mono">
                {PHRASES.map((phrase, idx) => {
                  const isVisible = phrase.level === 0 || showDesperate;
                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={phrase.text}
                      initial={{ opacity: 0, y: 14, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        delay: phrase.level === 1 ? (idx - 2) * 0.12 : idx * 0.1,
                        duration: 0.45,
                        ease: appleEase,
                      }}
                      className={`${phrase.size} ${phrase.weight} ${phrase.color} tracking-tight leading-tight select-none`}
                    >
                      {phrase.text === 'MAKE NO MISTAKES' ? (
                        <span className="bg-amber-100 text-[#D97706] px-4 py-1.5 rounded-2xl border-2 border-[#D97706] inline-block shadow-sm">
                          {phrase.text}
                        </span>
                      ) : (
                        `> ${phrase.text}`
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Build 2 Revealed Input Footer & Action Buttons */}
              {isZoomedOut && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between gap-3"
                >
                  <div className="text-sm text-neutral-500 font-sans italic">
                    "Send that to a junior engineer and they'd quit. Or draw a rectangle."
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D97706] text-white font-mono text-xs font-bold shadow hover:bg-amber-700 transition">
                      <span>Send</span>
                      <CornerDownLeft className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            /* Build 3: Massive Punchline Holding for S17 */
            <motion.div
              key="punchline-statement"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: appleEase }}
              className="flex flex-col items-center justify-center text-center max-w-3xl"
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-[#111113] leading-[1.05]">
                The Bad is the <span className="text-[#D97706]">AI.</span>
              </h2>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
