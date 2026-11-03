import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import meatProxy from '../assets/meatproxy-emojis-svg/meat-proxy.svg';
import meatShrug from '../assets/meatproxy-emojis-svg/meat-shrug.svg';
import { User, Bot, ArrowRight, ArrowLeft, MessageSquare, AlertCircle } from 'lucide-react';

/**
 * Slide 24: Don't be a meat proxy.
 * 
 * Corner: 24 / Meat proxy (Coral accent dot #E5484D)
 * Headline: "Don't be a meat proxy."
 * One idea: A human who only forwards between client and AI adds nothing but latency,
 * and can't answer "why".
 * 
 * Builds (totalBuilds: 3):
 *  - 0: The pipe diagram: Client -> [meat-proxy] -> AI with bidirectional arrows.
 *  - 1: Four humorous name tags pop up around the blob:
 *       "The Human Clipboard" · "The Prompt Courier" · "The Certified Forwarder" · "The One-Tab Engineer"
 *  - 2: Speech bubble from blob to AI: "Who is JSON?"
 *  - 3: Speech bubble from client: "Why does it work like that?"
 *       Blob swaps to meat-shrug ("The model said so.")
 *       Punchline lands: "Your value-add shouldn't be latency."
 *       Anchors Poll Q7 callback.
 */

const NAME_TAGS = [
  { text: 'The Human Clipboard', pos: '-top-7 -left-12 sm:-left-20' },
  { text: 'The Prompt Courier', pos: '-top-7 -right-12 sm:-right-20' },
  { text: 'The Certified Forwarder', pos: '-bottom-8 -left-14 sm:-left-24' },
  { text: 'The One-Tab Engineer', pos: '-bottom-8 -right-14 sm:-right-24' },
];

export default function S24_MeatProxy({ activeSlide, buildStep }) {
  const showNameTags = buildStep >= 1;
  const showWhoIsJson = buildStep >= 2;
  const showPunchline = buildStep >= 3;

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
            The Human Middleman
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
        >
          Don't be a <span className="text-[#E5484D]">meat proxy.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          If the AI can do the task without your judgment, you're not an engineer. You're an expensive network proxy.
        </motion.p>
      </div>

      {/* Center Stage: Horizontal Pipe Diagram */}
      <div className="my-auto w-full max-w-5xl mx-auto flex flex-col items-center justify-center z-10 py-2 relative min-h-[380px]">
        
        {/* The 3-Node Horizontal Pipeline */}
        <div className="w-full flex items-center justify-between relative px-4 sm:px-10 max-w-4xl">
          
          {/* Node 1: Client / Product Manager */}
          <div className="flex flex-col items-center z-10 w-28 sm:w-36">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white border-2 border-neutral-300 shadow-md flex items-center justify-center relative">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-800 stroke-[2]" />
              
              {/* Build 3 Client Question Bubble */}
              {showPunchline && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={springPhysics}
                  className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 text-white font-mono text-xs px-3 py-1.5 rounded-xl border-2 border-neutral-700 shadow-lg"
                >
                  "Why does it work like that?"
                </motion.div>
              )}
            </div>
            <span className="mt-2 font-mono text-xs sm:text-sm font-bold text-neutral-800">Client</span>
            <span className="font-mono text-[10px] text-neutral-400">Spec & Expectations</span>
          </div>

          {/* Pipe Segment 1: Client -> You */}
          <div className="flex-1 flex flex-col items-center justify-center px-2 relative">
            <div className="w-full h-10 flex flex-col justify-center relative">
              {/* Forward arrow */}
              <div className="flex items-center text-neutral-400 gap-1 w-full justify-center">
                <span className="h-[2.5px] flex-1 bg-neutral-300" />
                <ArrowRight className="w-4 h-4 text-neutral-500 stroke-[2.5] flex-shrink-0" />
              </div>
              {/* Return arrow */}
              <div className="flex items-center text-neutral-400 gap-1 w-full justify-center mt-1">
                <ArrowLeft className="w-4 h-4 text-neutral-500 stroke-[2.5] flex-shrink-0" />
                <span className="h-[2.5px] flex-1 bg-neutral-300" />
              </div>
            </div>
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mt-0.5">
              Copy-Paste
            </span>
          </div>

          {/* Node 2: Center Mascot (Meat Proxy / Meat Shrug) */}
          <div className="flex flex-col items-center z-20 relative mx-2">
            
            {/* Mascot Container */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white border-2 border-[#E5484D] shadow-xl flex items-center justify-center relative p-2">
              <AnimatePresence mode="wait">
                {showPunchline ? (
                  <motion.img
                    key="meat-shrug"
                    src={meatShrug}
                    alt="Meat shrug mascot"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <motion.img
                    key="meat-proxy"
                    src={meatProxy}
                    alt="Meat proxy mascot"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full object-contain"
                  />
                )}
              </AnimatePresence>

              {/* Build 1: Four Name Tags Pop Up */}
              {showNameTags && !showPunchline && (
                <>
                  {NAME_TAGS.map((tag, idx) => (
                    <motion.div
                      key={tag.text}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ ...springPhysics, delay: idx * 0.15 }}
                      className={`absolute ${tag.pos} bg-white px-2.5 py-1 rounded-lg border-2 border-neutral-800 shadow-md whitespace-nowrap font-mono text-[10px] sm:text-xs font-bold text-neutral-800 z-30`}
                    >
                      {tag.text}
                    </motion.div>
                  ))}
                </>
              )}

              {/* Build 2: "Who is JSON?" chat bubble to AI */}
              {showWhoIsJson && !showPunchline && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={springPhysics}
                  className="absolute -top-16 -right-16 sm:-right-24 bg-[#E5484D] text-white font-mono text-xs font-black px-3 py-1.5 rounded-xl shadow-lg border-2 border-white whitespace-nowrap flex items-center gap-1.5 z-40"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>"Who is JSON?"</span>
                </motion.div>
              )}

              {/* Build 3: Shrug subcaption */}
              {showPunchline && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute -bottom-8 whitespace-nowrap bg-neutral-100 text-neutral-700 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full border-2 border-neutral-300"
                >
                  "The model said so."
                </motion.div>
              )}
            </div>

            <span className="mt-2 font-mono text-xs sm:text-sm font-bold text-[#E5484D]">You</span>
            <span className="font-mono text-[10px] text-neutral-400">Passive Forwarder</span>
          </div>

          {/* Pipe Segment 2: You -> AI */}
          <div className="flex-1 flex flex-col items-center justify-center px-2 relative">
            <div className="w-full h-10 flex flex-col justify-center relative">
              {/* Forward arrow */}
              <div className="flex items-center text-neutral-400 gap-1 w-full justify-center">
                <span className="h-[2.5px] flex-1 bg-neutral-300" />
                <ArrowRight className="w-4 h-4 text-neutral-500 stroke-[2.5] flex-shrink-0" />
              </div>
              {/* Return arrow */}
              <div className="flex items-center text-neutral-400 gap-1 w-full justify-center mt-1">
                <ArrowLeft className="w-4 h-4 text-neutral-500 stroke-[2.5] flex-shrink-0" />
                <span className="h-[2.5px] flex-1 bg-neutral-300" />
              </div>
            </div>
            <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest mt-0.5">
              Diffs & Halts
            </span>
          </div>

          {/* Node 3: AI / Model */}
          <div className="flex flex-col items-center z-10 w-28 sm:w-36">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-neutral-900 border-2 border-neutral-700 shadow-md flex items-center justify-center text-white relative">
              <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-[#0052CC] stroke-[2]" />
            </div>
            <span className="mt-2 font-mono text-xs sm:text-sm font-bold text-neutral-800">AI Model</span>
            <span className="font-mono text-[10px] text-neutral-400">Tokens In / Out</span>
          </div>

        </div>

        {/* Build 3: Punchline Landing */}
        <div className="min-h-[55px] mt-12 flex flex-col items-center justify-center">
          {showPunchline && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: appleEase }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#111113] tracking-tight bg-white px-6 py-2.5 rounded-2xl border-2 border-neutral-300 shadow-md">
                "Your value-add shouldn't be <span className="text-[#E5484D] underline decoration-2 underline-offset-4">latency</span>."
              </div>
            </motion.div>
          )}
        </div>

      </div>

      {/* Bottom Pacing Indicator */}
      <div className="z-10 flex items-center justify-between pt-3 border-t-2 border-neutral-200 text-xs text-[#4A4A55] font-mono">
        <span>The Prompt Courier Problem</span>
        <span className="text-[#E5484D] font-semibold">Engineering judgment cannot be outsourced</span>
      </div>
    </div>
  );
}
