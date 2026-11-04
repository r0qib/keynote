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
        <div className="w-full flex items-center justify-between relative px-4 sm:px-12 max-w-5xl">
          
          {/* Node 1: Client */}
          <div className="flex flex-col items-center z-10 w-32 sm:w-40">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white border-2 border-neutral-300 shadow-md flex items-center justify-center relative">
              <User className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-800 stroke-[2]" />
              
              {/* Build 3 Client Question Bubble */}
              {showPunchline && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={springPhysics}
                  className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-neutral-900 text-white font-mono text-sm px-4 py-2 rounded-xl border border-neutral-700 shadow-xl"
                >
                  "Why does it work like that?"
                </motion.div>
              )}
            </div>
            <span className="mt-3 font-mono text-sm sm:text-base font-bold text-neutral-800">Client</span>
            <span className="font-mono text-xs text-neutral-500">Business requirements</span>
          </div>

          {/* Pipe Segment 1: Client -> You */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
            <div className="w-full h-12 flex flex-col justify-center relative">
              <div className="flex items-center text-neutral-400 gap-1 w-full justify-center">
                <span className="h-[3px] flex-1 bg-neutral-300" />
                <ArrowRight className="w-5 h-5 text-neutral-600 stroke-[2.5] flex-shrink-0" />
              </div>
              <div className="flex items-center text-neutral-400 gap-1 w-full justify-center mt-1.5">
                <ArrowLeft className="w-5 h-5 text-neutral-600 stroke-[2.5] flex-shrink-0" />
                <span className="h-[3px] flex-1 bg-neutral-300" />
              </div>
            </div>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest mt-1">
              Copy-Paste
            </span>
          </div>

          {/* Node 2: Center Mascot (Meat Proxy / Meat Shrug) */}
          <div className="flex flex-col items-center z-20 relative mx-4">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white border-4 border-[#E5484D] shadow-2xl flex items-center justify-center relative p-3">
              <AnimatePresence>
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

              {/* Build 1: Name Tags */}
              {showNameTags && !showPunchline && (
                <>
                  {NAME_TAGS.map((tag, idx) => (
                    <motion.div
                      key={tag.text}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ ...springPhysics, delay: idx * 0.12 }}
                      className={`absolute ${tag.pos} bg-white px-3 py-1.5 rounded-xl border-2 border-neutral-800 shadow-lg whitespace-nowrap font-mono text-xs font-bold text-neutral-800 z-30`}
                    >
                      {tag.text}
                    </motion.div>
                  ))}
                </>
              )}

              {/* Build 2: "Who is JSON?" chat bubble */}
              {showWhoIsJson && !showPunchline && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={springPhysics}
                  className="absolute -top-16 -right-20 sm:-right-28 bg-[#E5484D] text-white font-mono text-xs sm:text-sm font-black px-4 py-2 rounded-2xl shadow-xl border-2 border-white whitespace-nowrap flex items-center gap-1.5 z-40"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>"Who is JSON?"</span>
                </motion.div>
              )}

              {/* Build 3: Shrug subcaption */}
              {showPunchline && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="absolute -bottom-10 whitespace-nowrap bg-neutral-900 text-white font-mono text-xs font-bold px-3 py-1 rounded-full border border-neutral-700 shadow-md"
                >
                  "The model said so."
                </motion.div>
              )}
            </div>

            <span className="mt-3 font-mono text-sm sm:text-base font-black text-[#E5484D]">You</span>
            <span className="font-mono text-xs text-neutral-500">The Human Clipboard</span>
          </div>

          {/* Pipe Segment 2: You -> AI */}
          <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
            <div className="w-full h-12 flex flex-col justify-center relative">
              <div className="flex items-center text-neutral-400 gap-1 w-full justify-center">
                <span className="h-[3px] flex-1 bg-neutral-300" />
                <ArrowRight className="w-5 h-5 text-neutral-600 stroke-[2.5] flex-shrink-0" />
              </div>
              <div className="flex items-center text-neutral-400 gap-1 w-full justify-center mt-1.5">
                <ArrowLeft className="w-5 h-5 text-neutral-600 stroke-[2.5] flex-shrink-0" />
                <span className="h-[3px] flex-1 bg-neutral-300" />
              </div>
            </div>
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest mt-1">
              Diffs & Halts
            </span>
          </div>

          {/* Node 3: AI / Model */}
          <div className="flex flex-col items-center z-10 w-32 sm:w-40">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-neutral-900 border-2 border-neutral-700 shadow-md flex items-center justify-center text-white relative">
              <Bot className="w-10 h-10 sm:w-12 sm:h-12 text-[#1B7ED0] stroke-[2]" />
            </div>
            <span className="mt-3 font-mono text-sm sm:text-base font-bold text-neutral-800">AI Model</span>
            <span className="font-mono text-xs text-neutral-500">Autonomous tokens</span>
          </div>

        </div>

        {/* Build 3: Punchline Landing */}
        <div className="min-h-[60px] mt-14 flex flex-col items-center justify-center">
          {showPunchline && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: appleEase }}
              className="flex flex-col items-center text-center gap-3"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111113] tracking-tight bg-white px-8 py-3 rounded-2xl border-2 border-neutral-300 shadow-lg">
                "Your value-add shouldn't be <span className="text-[#E5484D] underline decoration-4 underline-offset-8">latency</span>."
              </div>
            </motion.div>
          )}
        </div>

      </div>

    </div>
  );
}
