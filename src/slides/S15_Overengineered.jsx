import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { Folder, FileCode, CheckCircle2, ChevronRight, FileText, Zap } from 'lucide-react';

/**
 * Slide 15: Enterprise-grade hello world.
 * 
 * Corner: 15 / Overkill (Amber accent dot #D97706, cutTier: 'A')
 * Headline: "Enterprise-grade hello world."
 * One idea: Sometimes it does exactly what you asked, and far, far more.
 * 
 * Visual:
 *  - Left side: User prompt bubble "Add a dark mode toggle."
 *  - Right side: IDE file tree listing 10+ enterprise abstractions cascading down,
 *    with a line counter climbing up to +2,184 lines.
 *  - Bottom punchline (Build 2): "What I needed: document.documentElement.classList.toggle('dark')"
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Prompt bubble.
 *  - 1: File tree cascades down as line counter ticks up to +2,184 lines.
 *  - 2: Bottom punchline reveals the single one-line alternative.
 */

const FILE_TREE = [
  { name: 'ThemeProvider.tsx', type: 'code', lines: '+312' },
  { name: 'ThemeContext.ts', type: 'code', lines: '+144' },
  { name: 'ThemeStrategyFactory.ts', type: 'code', lines: '+285' },
  { name: 'ThemeRegistry.ts', type: 'code', lines: '+198' },
  { name: 'useThemeObserver.ts', type: 'code', lines: '+167' },
  { name: 'theme.config.ts', type: 'code', lines: '+95' },
  { name: 'ThemeToggle.tsx', type: 'code', lines: '+118' },
  { name: 'ThemeToggle.test.tsx', type: 'test', lines: '+430' },
  { name: 'ThemeToggle.stories.tsx', type: 'story', lines: '+185' },
  { name: 'docs/THEME_ARCHITECTURE.md', type: 'doc', lines: '+250' },
];

export default function S15_Overengineered({ activeSlide, buildStep }) {
  const showTree = buildStep >= 1;
  const showPunchline = buildStep >= 2;

  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (showTree) {
      const controls = animate(0, 2184, {
        duration: 1.1,
        ease: appleEase,
        onUpdate: (val) => setLineCount(Math.round(val)),
      });
      return () => controls.stop();
    } else {
      setLineCount(0);
    }
  }, [showTree]);

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
        
        {/* Left Side: The Request (4 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          
          <div className="flex flex-col gap-4">
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
              User Request
            </div>

            {/* Prompt Bubble */}
            <div className="bg-white border-2 border-neutral-300 rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col gap-3">
              <div className="text-xs font-mono text-neutral-400">Prompt:</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#111113] leading-snug">
                "Add a dark mode toggle."
              </div>
              <div className="text-xs text-neutral-500 font-sans mt-2">
                A simple frontend feature. Just toggle a CSS class on the root HTML tag.
              </div>
            </div>
          </div>

          {/* Build 2 Punchline: What I actually needed */}
          <div className="min-h-[110px] flex items-end">
            <AnimatePresence>
              {showPunchline && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={springPhysics}
                  className="w-full bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2 text-emerald-800 font-mono text-xs font-bold uppercase tracking-wide">
                    <Zap className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                    What I actually needed:
                  </div>
                  <div className="bg-[#18181B] text-emerald-400 font-mono text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border-2 border-neutral-700 font-semibold overflow-x-auto">
                    document.documentElement.classList.toggle('dark');
                  </div>
                  <div className="text-[11px] font-mono text-emerald-700">
                    One single line of vanilla code. Zero dependencies.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Right Side: What The AI Delivered (7 cols) */}
        <div className="lg:col-span-7 bg-[#18181B] rounded-3xl p-5 sm:p-7 border-2 border-neutral-800 shadow-xl text-neutral-100 flex flex-col justify-between font-mono">
          
          {/* Header Bar with Counter */}
          <div className="flex items-center justify-between pb-4 border-b-2 border-neutral-800">
            <div className="flex items-center gap-2">
              <Folder className="w-4 h-4 text-amber-500" />
              <span className="text-xs sm:text-sm font-bold text-neutral-200">
                src/infrastructure/theming/
              </span>
            </div>

            {/* Animated Lines Counter */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-400 font-normal">Generated:</span>
              <span className="text-sm sm:text-base font-extrabold text-amber-400 bg-amber-950/70 border-2 border-amber-600/50 px-2.5 py-0.5 rounded-lg">
                +{lineCount.toLocaleString()} lines
              </span>
            </div>
          </div>

          {/* File Tree List */}
          <div className="py-3 space-y-1.5 text-xs sm:text-[13px]">
            {FILE_TREE.map((file, idx) => (
              <motion.div
                key={file.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{
                  opacity: showTree ? 1 : 0.08,
                  x: showTree ? 0 : -8,
                }}
                transition={{
                  delay: showTree ? idx * 0.06 : 0,
                  duration: 0.35,
                  ease: appleEase,
                }}
                className="flex items-center justify-between py-1 px-2.5 rounded hover:bg-neutral-800/50 transition-colors"
              >
                <div className="flex items-center gap-2.5 truncate">
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-500 flex-shrink-0" />
                  {file.type === 'doc' ? (
                    <FileText className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  ) : (
                    <FileCode className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  )}
                  <span className={file.type === 'doc' ? 'text-blue-300 font-semibold' : 'text-neutral-200'}>
                    {file.name}
                  </span>
                </div>

                <span className="text-neutral-500 text-[11px] font-mono flex-shrink-0 ml-2">
                  {file.lines}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom Review Burden Note */}
          <div className="pt-3 border-t-2 border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
            <span className="text-amber-500 font-medium">10 files, 14 classes, 3 design patterns</span>
            <span className="text-neutral-500 text-[11px]">And you still have to review all of it.</span>
          </div>

        </div>

      </div>

      {/* Bottom Footer Quote */}
      <div className="z-10 flex items-center justify-between pt-2 border-t-2 border-neutral-200 text-xs text-[#4A4A55] font-mono">
        <span>"It writes the statistical average of code it trained on. A lot of that is enterprise boilerplate."</span>
        <span className="text-[#D97706] font-semibold">Simplicity is our job</span>
      </div>
    </div>
  );
}
