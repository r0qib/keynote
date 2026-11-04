import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { Folder, FileCode, ChevronRight, Zap } from 'lucide-react';

const ENTERPRISE_FILES = [
  { name: 'ThemeProvider.tsx', lines: '+312' },
  { name: 'ThemeContext.ts', lines: '+144' },
  { name: 'ThemeStrategyFactory.ts', lines: '+285' },
  { name: 'ThemeRegistry.ts', lines: '+198' },
  { name: 'useThemeObserver.ts', lines: '+167' },
  { name: 'theme.config.ts', lines: '+95' },
  { name: 'ThemeToggle.tsx', lines: '+118' },
  { name: 'ThemeToggle.test.tsx', lines: '+430' },
  { name: 'ThemeToggle.stories.tsx', lines: '+185' },
  { name: 'docs/THEME_ARCHITECTURE.md', lines: '+250' },
];

/**
 * Slide 15: Enterprise-grade hello world.
 * 
 * Act II: The Bad
 * Headline: "Enterprise-grade hello world."
 * One idea: AI's tendency to overcomplicate simple requirements with endless abstractions.
 * 
 * Builds:
 *  - 0: Simple Prompt on left ("Add a dark mode toggle.").
 *  - 1: Massive 10-file directory tree expands on the right (+2,184 lines).
 *  - 2: Punchline: "What was actually needed: document.documentElement.classList.toggle('dark');"
 */
export default function S15_Overengineered({ activeSlide, buildStep }) {
  const showPunchline = buildStep >= 2;

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
            Scope & Abstraction
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
        >
          Enterprise-grade hello world.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Sometimes it does exactly what you asked for. And far, far too much of it.
        </motion.p>
      </div>

      {/* Center Stage: Left User Request vs Right Enterprise Architecture */}
      <div className="my-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch z-10 py-1">
        
        {/* Left Side: The Request (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-4">
            <div className="bg-white border-2 border-neutral-300 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col gap-3">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold">The Prompt</span>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111113] leading-snug">
                "Add a dark mode toggle."
              </div>
            </div>
          </div>

          {/* Build 2 Punchline: What was actually needed */}
          <div className="min-h-[120px] flex items-end">
            <AnimatePresence>
              {showPunchline && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={springPhysics}
                  className="w-full bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-5 shadow-md flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs sm:text-sm font-bold uppercase tracking-wide">
                    <Zap className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    What was actually needed:
                  </div>
                  <div className="bg-[#18181B] text-emerald-400 font-mono text-sm sm:text-base px-4 py-3 rounded-xl border border-neutral-700 font-semibold overflow-x-auto">
                    document.documentElement.classList.toggle('dark');
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: The AI-Generated Abstraction Empire (7 cols) */}
        <div className="lg:col-span-7 bg-[#18181B] rounded-3xl p-6 sm:p-8 border-2 border-neutral-800 shadow-xl flex flex-col justify-between text-neutral-100 font-mono">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div className="flex items-center gap-2 text-sm text-neutral-300">
              <Folder className="w-4 h-4 text-amber-500" />
              <span>src/infrastructure/theming/</span>
            </div>
            <span className="text-sm font-bold text-amber-400 bg-amber-950/60 px-3 py-1 rounded-lg border border-amber-600/40">
              +2,184 lines
            </span>
          </div>

          {/* Animated File List */}
          <div className="flex-1 py-4 flex flex-col gap-1.5 overflow-hidden">
            {ENTERPRISE_FILES.map((file, idx) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: idx * 0.05,
                  duration: 0.35,
                  ease: appleEase,
                }}
                className="flex items-center justify-between py-1 px-2 rounded hover:bg-neutral-800/50 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <ChevronRight className="w-3 h-3 text-neutral-500 flex-shrink-0" />
                  <FileCode className={`w-3.5 h-3.5 flex-shrink-0 ${
                    file.name.includes('.md') ? 'text-blue-400' : 'text-amber-400'
                  }`} />
                  <span className="truncate text-neutral-300">
                    {file.name}
                  </span>
                </div>

                <span className="text-neutral-500 font-mono flex-shrink-0 ml-2">
                  {file.lines}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom Review Burden Note */}
          <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs sm:text-sm text-neutral-400">
            <span className="text-amber-400 font-medium">10 files, 14 classes, 3 design patterns</span>
            <span className="text-neutral-400">1 line of human intent.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
