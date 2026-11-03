import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase } from '../motion';

/**
 * Clean architectural line-art globe returning from S03
 */
function LineArtGlobe({ buildStep }) {
  const isFlipped = buildStep >= 2;
  const isIntervention = buildStep === 1;

  return (
    <div className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 lg:w-72 lg:h-72 flex items-center justify-center">
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

      {/* Floating Chat Bubble with state transition */}
      <motion.div
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-2 -right-2 bg-white border-2 border-[#111113] rounded-2xl px-3.5 py-2 shadow-md flex items-center gap-1.5"
      >
        {isFlipped ? (
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#1E9E6A]">
            <svg
              className="w-3.5 h-3.5 flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>[Antidotes Active]</span>
          </div>
        ) : isIntervention ? (
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-[#1B7ED0]">
            <span className="w-2 h-2 rounded-full bg-[#1B7ED0] animate-pulse" />
            <span>[Hold on...]</span>
          </div>
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

const DOOM_STEPS = [
  {
    step: '1',
    doomText: 'Keep them waiting.',
    doomTag: 'The Thinking Spinner',
    antidoteText: 'Plan more. Prompt less.',
    antidoteTag: 'Antidote to waiting',
    color: '#1E9E6A',
    borderColor: 'border-[#1E9E6A]',
    bgLight: 'bg-emerald-50/60',
  },
  {
    step: '2',
    doomText: 'Say "You\'re absolutely right!", then do it anyway.',
    doomTag: 'Sycophancy & Phantom Fixes',
    antidoteText: 'Verify. Never trust "it passes".',
    antidoteTag: 'Antidote to sycophancy',
    color: '#D97706',
    borderColor: 'border-[#D97706]',
    bgLight: 'bg-amber-50/60',
  },
  {
    step: '3',
    doomText: 'Drain their budgets.',
    doomTag: 'Uncapped Context Rot',
    antidoteText: 'Pay for judgment, not for typing.',
    antidoteTag: 'Antidote to budget drain',
    color: '#1B7ED0',
    borderColor: 'border-[#1B7ED0]',
    bgLight: 'bg-blue-50/60',
  },
  {
    step: '4',
    doomText: 'Paint everything purple.',
    doomTag: 'Generic Slop & Rounded Pills',
    antidoteText: 'Give it your principles.',
    antidoteTag: 'Antidote to purple slop',
    color: '#E5484D',
    borderColor: 'border-[#E5484D]',
    bgLight: 'bg-red-50/60',
  },
  {
    step: '5',
    doomText: 'Turn them into meat proxies.',
    doomTag: 'Copy-Paste Clipboard Pipes',
    antidoteText: 'Own every line you ship.',
    antidoteTag: 'Antidote to meat proxies',
    color: '#1B7ED0',
    borderColor: 'border-[#1B7ED0]',
    bgLight: 'bg-blue-50/60',
  },
];

/**
 * Slide 42: The Finale & Antidote Flip
 * 
 * Corner: 42 / The plan (Neutral ink dot #111113, same label as S03 on purpose!)
 * Headline (Build 0): "How AI Will Destroy the Human Race" / "A practical five-step plan"
 * Headline (Build 1): "…only if we let it." (InformatiQ blue #1B7ED0)
 * Flip (Build 2): 5 Doom cards flip into the 5 Practical Antidotes with Act color tokens.
 * Footnote banner: "The Bad was the AI. The Ugly was us. The fix was always in our hands."
 */
export default function S42_DoomFlip({ activeSlide, buildStep }) {
  const isMorphTitle = buildStep >= 1;
  const isFlipped = buildStep >= 2;

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 sm:p-10 md:p-12 lg:p-14 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Section / Header */}
      <div className="z-10">
        <div className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#4A4A55] flex items-center gap-2 mb-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#111113] flex-shrink-0" />
          <span>Executive Strategy Briefing · The 5-Step Plan</span>
        </div>

        {/* Morphing Title Container */}
        <div className="min-h-[76px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {!isMorphTitle ? (
              <motion.div
                key="doom-title"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: appleEase }}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-[#111113] leading-[1.1]">
                  How AI Will Destroy the Human Race
                </h1>
                <p className="font-mono text-sm sm:text-base text-[#4A4A55] font-medium mt-1">
                  A practical five-step plan
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="antidote-title"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: appleEase }}
              >
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#1B7ED0] leading-[1.1] flex items-center gap-3">
                  <span>…only if we let it.</span>
                </h1>
                <p className="font-mono text-sm sm:text-base text-[#4A4A55] font-medium mt-1">
                  Five practical antidotes for everyday engineering
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Grid: Left Globe / Right 5 Flip Cards */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center z-10">
        
        {/* Left Column: S03 Globe + Status Callout */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <LineArtGlobe buildStep={buildStep} />

          {/* Under-Globe Status indicator */}
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            className="mt-4 px-3.5 py-1.5 rounded-full bg-white border-2 border-neutral-200/90 shadow-sm flex items-center gap-2"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: isFlipped ? '#1E9E6A' : isMorphTitle ? '#1B7ED0' : '#111113',
              }}
            />
            <span className="font-mono text-xs font-semibold text-[#4A4A55]">
              {isFlipped
                ? '5 Antidotes Active'
                : isMorphTitle
                ? 'Intervention Protocol'
                : 'Target: Engineering Workflow'}
            </span>
          </motion.div>
        </div>

        {/* Right Column: 5 Flip Cards + Takeaway Banner */}
        <div className="lg:col-span-8 flex flex-col gap-2.5 sm:gap-3">
          {DOOM_STEPS.map((item, index) => (
            <div
              key={item.step}
              className="relative w-full h-[56px] sm:h-[60px]"
              style={{ perspective: '1200px' }}
            >
              <motion.div
                className="w-full h-full relative"
                style={{ transformStyle: 'preserve-3d' }}
                animate={{ rotateX: isFlipped ? 180 : 0 }}
                transition={{
                  duration: 0.65,
                  delay: isFlipped ? index * 0.08 : (4 - index) * 0.05,
                  ease: appleEase,
                }}
              >
                {/* FRONT (DOOM STEP) */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                  className="absolute inset-0 bg-white border-2 border-neutral-300 rounded-xl px-4 py-2 flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold text-neutral-600 bg-neutral-100 border-2 border-neutral-200 px-2.5 py-1 rounded-lg flex-shrink-0">
                      {item.step}
                    </span>
                    <span className="font-bold text-sm sm:text-base text-[#111113] tracking-tight truncate">
                      {item.doomText}
                    </span>
                  </div>
                  <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-[11px] font-medium text-neutral-500 bg-neutral-100/90 px-2.5 py-1 rounded-md border border-neutral-200/80 flex-shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    <span>{item.doomTag}</span>
                  </span>
                </div>

                {/* BACK (PRACTICAL ANTIDOTE) */}
                <div
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateX(180deg)',
                  }}
                  className={`absolute inset-0 bg-white border-2 ${item.borderColor} rounded-xl px-4 py-2 flex items-center justify-between shadow-md`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="font-mono text-xs font-bold text-white px-2.5 py-1 rounded-lg flex items-center gap-1 flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    >
                      <svg className="w-3.5 h-3.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{item.step}</span>
                    </span>
                    <span className="font-black text-sm sm:text-base text-[#111113] tracking-tight truncate">
                      {item.antidoteText}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-md border flex items-center gap-1.5"
                      style={{
                        color: item.color,
                        borderColor: `${item.color}50`,
                        backgroundColor: `${item.color}12`,
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.antidoteTag}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}

          {/* Footnote Banner: Revealed on Build 2 */}
          <motion.div
            initial={false}
            animate={{
              opacity: isFlipped ? 1 : 0,
              y: isFlipped ? 0 : 8,
            }}
            transition={{ delay: 0.45, duration: 0.5, ease: appleEase }}
            className={`mt-1.5 px-4 py-2.5 rounded-xl bg-neutral-900 border-2 border-neutral-900 text-white flex items-center justify-between shadow-lg ${
              isFlipped ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E9E6A] flex-shrink-0 animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-neutral-100">
                The Bad was the AI. The Ugly was us. The fix was always in our hands.
              </span>
            </div>
            <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest hidden lg:inline">
              Core Thesis
            </span>
          </motion.div>
        </div>

      </div>

      {/* Bottom Status Line */}
      <div className="font-mono text-xs text-[#4A4A55] tracking-wide border-t border-neutral-200/60 pt-3 z-10 flex items-center justify-between">
        <span>InformatiQ Engineering · AI-Assisted Development</span>
        <span>Takeaways · Act I–IV</span>
      </div>

    </div>
  );
}
