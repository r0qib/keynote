import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { AlertTriangle, Gauge, DollarSign } from 'lucide-react';

/**
 * Slide 21: The elephant in the room.
 * 
 * Corner: 21 / The elephant (Coral accent dot #E5484D)
 * Headline: "The elephant in the room."
 * One idea: The AI budget quietly shapes how we work: we cut corners.
 * 
 * Builds (totalBuilds: 3):
 *  - 0: The headline and large line-art elephant vector enters slowly.
 *  - 1: "Tokens." appears on the elephant's body with a token budget meter.
 *  - 2: Three quiet lines appear staggered:
 *       - "We one-shot to save budget."
 *       - "We skip the review pass."
 *       - "We watch the meter more than the output."
 *  - 3: Dark cinematic mode switch for the Stark quote:
 *       "I'm limited by the [technology -> token budget] of my time."
 *       Anchors Poll Q6 callback.
 */

const QUIET_LINES = [
  'We one-shot to save budget.',
  'We skip the review pass.',
  'We watch the meter more than the output.',
];

export default function S21_Elephant({ activeSlide, buildStep }) {
  const isCinematicQuote = buildStep >= 3;
  const showTokensMeter = buildStep >= 1;
  const showQuietLines = buildStep >= 2;

  return (
    <div
      className={`h-full w-full flex flex-col justify-between p-8 sm:p-10 md:p-14 lg:p-18 relative select-none overflow-hidden transition-colors duration-700 ${
        isCinematicQuote ? 'bg-[#111113] text-[#FAFAFB]' : 'bg-[#FAFAFB] text-[#111113]'
      }`}
    >
      <AnimatePresence>
        
        {/* Builds 0, 1, 2: The Elephant Canvas */}
        {!isCinematicQuote ? (
          <motion.div
            key="elephant-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: appleEase }}
            className="h-full w-full flex flex-col justify-between"
          >
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
                  Economics & Habits
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: appleEase }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
              >
                The elephant <span className="text-[#E5484D]">in the room.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
                className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
              >
                The AI budget quietly shapes how we work. And we cut corners to survive it.
              </motion.p>
            </div>

            {/* Center Stage: Large Line-Art Elephant & Quiet Lines */}
            <div className="my-auto w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10 py-4 min-h-[360px]">
              
              {/* Left Column: Elephant Vector (7 cols) */}
              <div className="md:col-span-7 flex flex-col items-center justify-center relative">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, ease: appleEase }}
                  className="relative w-full max-w-[420px] aspect-[4/3] flex items-center justify-center"
                >
                  {/* Custom High-Fidelity Line-Art Elephant Vector */}
                  <svg
                    viewBox="0 0 400 300"
                    className="w-full h-full fill-none stroke-neutral-800 stroke-[3] overflow-visible"
                    style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                  >
                    {/* Elephant Body Contours */}
                    {/* Back and rump */}
                    <path d="M 80,210 C 60,180 50,110 130,70 C 190,40 270,55 310,95 C 330,115 340,140 330,170" />
                    
                    {/* Head, Ear curve and flap */}
                    <path d="M 310,95 C 290,105 260,135 270,185 C 275,210 295,225 315,220 C 330,215 345,190 340,165 C 335,140 320,110 310,95" />
                    
                    {/* Trunk */}
                    <path d="M 330,150 C 360,160 385,185 380,225 C 375,255 345,260 335,245 C 330,235 340,220 355,225" />
                    
                    {/* Tusk */}
                    <path d="M 325,190 C 345,200 365,205 375,195" strokeWidth="2.5" />
                    
                    {/* Eye */}
                    <circle cx="312" cy="130" r="3" fill="#111113" />

                    {/* Legs */}
                    {/* Front Right Leg */}
                    <path d="M 310,215 L 310,270 L 285,270 L 285,210" />
                    {/* Front Left Leg */}
                    <path d="M 270,205 L 260,265 L 240,265 L 245,200" strokeWidth="2" stroke="#52525B" />
                    {/* Back Left Leg */}
                    <path d="M 160,190 L 155,265 L 135,265 L 140,195" strokeWidth="2" stroke="#52525B" />
                    {/* Back Right Leg */}
                    <path d="M 125,200 L 120,270 L 95,270 L 100,205" />

                    {/* Belly line */}
                    <path d="M 145,210 C 190,215 230,210 260,205" />

                    {/* Tail */}
                    <path d="M 78,160 C 65,180 62,210 68,225" strokeWidth="2.5" />
                  </svg>

                  {/* Build 1: "Tokens." Overlay Badge & Budget Meter */}
                  {showTokensMeter && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={springPhysics}
                      className="absolute top-[38%] left-[32%] -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border-2 border-[#E5484D] shadow-xl flex flex-col items-center min-w-[190px]"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D] animate-ping" />
                        <span className="font-mono text-xl font-black text-[#E5484D] uppercase tracking-wide">
                          Tokens.
                        </span>
                      </div>

                      <div className="w-full bg-neutral-200 h-3 rounded-full overflow-hidden border-2 border-neutral-300 mt-2">
                        <motion.div
                          initial={{ width: '0%' }}
                          animate={{ width: '88%' }}
                          transition={{ duration: 1.2, ease: appleEase }}
                          className="h-full bg-[#E5484D]"
                        />
                      </div>

                      <div className="flex justify-between w-full font-mono text-[10px] text-neutral-500 mt-1.5 font-bold">
                        <span>88% Consumed</span>
                        <span className="text-[#E5484D]">Daily Cap</span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>

                <span className="font-mono text-xs text-neutral-400 mt-2">
                  "Budget planned in taka. Tokens priced in dollars."
                </span>
              </div>

              {/* Right Column: Three Quiet Lines (5 cols, Build 2) */}
              <div className="md:col-span-5 flex flex-col justify-center">
                {showQuietLines ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col gap-4"
                  >
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Quiet Behavioral Shifts:
                    </div>

                    {QUIET_LINES.map((line, idx) => (
                      <motion.div
                        key={line}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.25, duration: 0.5, ease: appleEase }}
                        className="bg-white p-4 rounded-2xl border-2 border-neutral-300 shadow-sm flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-lg bg-red-100 text-[#E5484D] flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 mt-0.5 border-2 border-red-200">
                          {idx + 1}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-neutral-800 leading-snug">
                          {line}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : null}
              </div>

            </div>

          </motion.div>
        ) : (
          
          /* Build 3: Cinematic Dark Canvas Stark Quote */
          <motion.div
            key="cinematic-quote"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: appleEase }}
            className="h-full w-full flex flex-col justify-between items-center text-center py-6"
          >
            {/* Top Cinematic Badge */}
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
              <span className="w-2 h-2 rounded-full bg-[#E5484D] animate-ping" />
              <span>A Developer's Dilemma</span>
            </div>

            {/* Centered Kinetic Quote */}
            <div className="max-w-4xl mx-auto my-auto px-4 flex flex-col items-center">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: appleEase }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-neutral-200 tracking-tight leading-relaxed font-serif"
              >
                "I'm limited by the{' '}
                <span className="relative inline-block font-sans font-bold">
                  {/* Struck-through original word */}
                  <span className="line-through decoration-[#E5484D] decoration-4 text-neutral-500">
                    technology
                  </span>
                  {/* Replacement animated word */}
                  <motion.span
                    initial={{ opacity: 0, y: -10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -58, scale: 1 }}
                    transition={{ ...springPhysics, delay: 0.3 }}
                    className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[#E5484D] font-mono text-xl sm:text-2xl md:text-3xl font-black bg-neutral-900 px-3 py-1 rounded-xl border-2 border-[#E5484D] shadow-xl"
                  >
                    token budget
                  </motion.span>
                </span>
                {' '}of my time."
              </motion.div>

              {/* Attribution */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="mt-12 font-mono text-sm sm:text-base text-neutral-400 flex items-center gap-3"
              >
                <span className="w-8 h-[2px] bg-neutral-600" />
                <span>Howard Stark, <span className="italic text-neutral-300">Iron Man 2</span> (adapted for developers)</span>
                <span className="w-8 h-[2px] bg-neutral-600" />
              </motion.div>
            </div>

            {/* Footer Takeaway */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="font-mono text-xs text-neutral-400 tracking-wider uppercase"
            >
              The advertised way of working assumes someone else is paying.
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
