import React from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../motion';

/**
 * Clean architectural line-art globe with typing indicator bubble
 */
function LineArtGlobe({ isWiped }) {
  return (
    <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full overflow-visible"
        fill="none"
        stroke="#111113"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer boundary sphere */}
        <circle cx="100" cy="100" r="90" fill="#FAFAFB" />

        {/* Longitude ellipses */}
        <ellipse cx="100" cy="100" rx="64" ry="90" />
        <ellipse cx="100" cy="100" rx="32" ry="90" />
        <line x1="100" y1="10" x2="100" y2="190" />

        {/* Latitude lines */}
        <line x1="10" y1="100" x2="190" y2="100" />
        <path d="M 23 60 Q 100 80 177 60" />
        <path d="M 23 140 Q 100 120 177 140" />
        <path d="M 45 35 Q 100 50 155 35" strokeWidth="2" />
        <path d="M 45 165 Q 100 150 155 165" strokeWidth="2" />

        {/* Subtle geometric landmass lines */}
        <path d="M 70 50 Q 85 65 95 60 T 115 75 T 100 110" strokeWidth="2.5" />
        <path d="M 125 90 Q 140 105 130 125 T 110 145" strokeWidth="2.5" />
      </svg>

      {/* Floating Chat Bubble with typing dots */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: appleEase }}
        className="absolute -top-3 -right-3 md:top-2 md:right-2 bg-white border-2 border-[#111113] rounded-2xl px-4 py-2.5 shadow-md flex items-center gap-1.5"
      >
        {isWiped ? (
          <span className="font-mono text-xs font-bold text-[#E5484D] tracking-wide">
            [Signal lost]
          </span>
        ) : (
          <div className="flex items-center gap-1.5 py-0.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-2 h-2 rounded-full bg-[#111113]"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -3, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

/**
 * Slide 03: The Wrong Slide (The Gag)
 * 
 * Corner: 03 / The plan (normal chrome, looks 100% legitimate)
 * Headline: "How AI Will Destroy the Human Race"
 * Sub: "A practical five-step plan"
 * Visual: Serious line-art globe + chat bubble •••
 * Build 1: Blackboard eraser sweeps left-to-right across the headline & sub,
 *          erasing the text with chalk swipe motion and dust specks.
 */
export default function S03_WrongSlide({ activeSlide, buildStep }) {
  const isWiped = buildStep >= 1;

  return (
    <div className="h-full w-full flex flex-col justify-between p-10 md:p-14 lg:p-16 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Section / Normal slide context */}
      <div className="flex items-center justify-between z-10">
        <div className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#4A4A55]">
          Executive Strategy Briefing
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        
        {/* Left Column: Headline & Sub (Subject to Eraser Gag) */}
        <div className="lg:col-span-7 relative">
          
          {/* Container holding the text and eraser */}
          <div className="relative py-4 pr-4">
            
            {/* The Serious Text (Masked or hidden when erased) */}
            <motion.div
              animate={{
                opacity: isWiped ? 0 : 1,
                filter: isWiped ? 'blur(4px)' : 'blur(0px)',
              }}
              transition={{ duration: 0.35, delay: isWiped ? 0.3 : 0 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-black tracking-tight text-[#111113] leading-[1.08]">
                How AI Will Destroy the Human Race
              </h1>

              <p className="font-mono text-xl sm:text-2xl text-[#4A4A55] font-medium mt-6 tracking-tight">
                A practical five-step plan
              </p>
            </motion.div>

            {/* Underneath Revealed Message (Appears on Build 1 after wipe) */}
            <motion.div
              initial={false}
              animate={{
                opacity: isWiped ? 1 : 0,
                y: isWiped ? 0 : 10,
              }}
              transition={{ duration: 0.5, delay: isWiped ? 0.45 : 0, ease: appleEase }}
              className={`absolute inset-0 flex flex-col justify-center ${isWiped ? 'pointer-events-auto' : 'pointer-events-none'}`}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 font-mono text-sm font-semibold w-max mb-4">
                <svg
                  className="w-4 h-4 flex-shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <span>Wait... wrong deck.</span>
              </div>
              <p className="text-3xl sm:text-4xl md:text-5xl font-black text-[#111113] tracking-tight leading-tight">
                That one is for the after-party.
              </p>
              <p className="font-mono text-lg text-[#4A4A55] mt-4 font-medium">
                Let's look at today's real agenda →
              </p>
            </motion.div>

            {/* The Blackboard Eraser Animation (Active on Build 1) */}
            {isWiped && (
              <motion.div
                className="absolute top-0 bottom-0 pointer-events-none z-30 flex items-center"
                initial={{ left: '-15%' }}
                animate={{ left: '105%' }}
                transition={{ duration: 0.9, ease: appleEase }}
              >
                {/* Physical Blackboard Eraser */}
                <div className="w-14 sm:w-16 h-36 sm:h-44 rounded-lg bg-[#C28B59] border-2 border-[#8A5A36] shadow-2xl flex flex-col justify-between p-1.5 rotate-6">
                  {/* Wood grain top */}
                  <div className="w-full text-center font-mono text-[9px] uppercase tracking-widest text-[#5C3A1E] font-bold py-1">
                    DUSTER
                  </div>
                  {/* Thick grey/black felt wiping pad */}
                  <div className="w-full h-10 bg-[#2D2D32] rounded border-t-2 border-[#1A1A1E]" />
                </div>

                {/* Chalk Dust Cloud Specks drifting behind */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-24 h-32 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-neutral-400"
                      style={{
                        width: Math.random() * 6 + 3,
                        height: Math.random() * 6 + 3,
                        left: `${Math.random() * 80}%`,
                        top: `${Math.random() * 80}%`,
                      }}
                      initial={{ opacity: 0.8, scale: 1 }}
                      animate={{ opacity: 0, scale: 2.5, x: -20, y: (i % 2 === 0 ? 1 : -1) * 15 }}
                      transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}

          </div>

        </div>

        {/* Right Column: Globe Graphic */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <LineArtGlobe isWiped={isWiped} />
        </div>

      </div>

      {/* Bottom Status Line */}
      <div className="font-mono text-xs text-[#4A4A55] tracking-wide border-t border-neutral-200/60 pt-4 z-10 flex items-center justify-between">
        <span>InformatiQ Engineering</span>
        <span>Confidential</span>
      </div>

    </div>
  );
}
