import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { Clock, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';

/**
 * Slide 14: I asked for a circle.
 * 
 * Corner: 14 / The last 20% (Amber accent dot #D97706)
 * Headline: "I asked for a circle."
 * One idea: AI is great at starting and bad at finishing. Fixing one thing breaks another.
 * 
 * Visual & Morphing:
 *  - User prompt chips on left
 *  - Agent replies on right
 *  - SVG shape center stage that morphs between:
 *    * Build 0: Rectangle
 *    * Build 1: Trapezium
 *    * Build 2: Skewed Polygon / Triangle + "Perfect! Here's your circle. ✓"
 *  - Build 3: S08's progress bar returns along the bottom, jittering 81% -> 79% -> 82% -> 78%,
 *    with an elapsed clock counting: 1h -> 4h -> day 2 -> day 6.
 *    "The bar goes nowhere, the clock goes everywhere."
 */

// 4-point paths for seamless Framer Motion path interpolation
const SHAPE_PATHS = {
  // Build 0: Sharp rectangle
  rectangle: 'M 80 60 L 320 60 L 320 240 L 80 240 Z',
  // Build 1: Trapezium (narrow top, wide base)
  trapezium: 'M 140 60 L 260 60 L 330 240 L 70 240 Z',
  // Build 2+: Skewed irregular polygon / acute triangle variant
  polygon: 'M 200 50 L 330 230 L 290 250 L 70 240 Z',
};

const JITTER_STATES = [
  { percent: 81, clock: '1 h' },
  { percent: 79, clock: '4 h' },
  { percent: 82, clock: 'day 2' },
  { percent: 78, clock: 'day 6' },
];

export default function S14_Circle({ activeSlide, buildStep }) {
  const currentStep = Math.min(Math.max(buildStep, 0), 3);
  const showJitterBar = currentStep >= 3;

  // Jitter cycle for Build 3
  const [jitterIndex, setJitterIndex] = useState(0);

  useEffect(() => {
    if (!showJitterBar) {
      setJitterIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setJitterIndex((prev) => (prev + 1) % JITTER_STATES.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [showJitterBar]);

  // Determine active SVG path and shape labels
  let currentPath = SHAPE_PATHS.rectangle;
  let shapeName = 'Rectangle';
  let agentBubble = 'Here is your custom vector shape!';

  if (currentStep === 1) {
    currentPath = SHAPE_PATHS.trapezium;
    shapeName = 'Trapezium';
    agentBubble = 'I apologize! Refactored the geometry per your feedback.';
  } else if (currentStep >= 2) {
    currentPath = SHAPE_PATHS.polygon;
    shapeName = 'Irregular Polygon';
    agentBubble = "Perfect! Here's your circle. ✓";
  }

  const currentJitter = JITTER_STATES[jitterIndex];

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
            The Finishing Problem
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
        >
          I asked for a circle.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          AI is great at starting and brutal at finishing. Fixing one thing breaks another.
        </motion.p>
      </div>

      {/* Center Stage: Interactive Morphing Shape Arena */}
      <div className="my-auto w-full max-w-5xl mx-auto flex flex-col z-10 py-1">
        
        {/* Top Dialog Row: User prompt chips left, Agent replies right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center mb-3">
          
          {/* User Prompt Box */}
          <div className="flex flex-col gap-2">
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neutral-400" />
              Developer Prompts
            </div>
            
            <div className="space-y-1.5">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border-2 border-neutral-300 rounded-xl px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm"
              >
                1. "Draw a circle."
              </motion.div>

              {currentStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: appleEase }}
                  className="bg-white border-2 border-neutral-300 rounded-xl px-4 py-2 text-sm font-semibold text-neutral-800 shadow-sm"
                >
                  2. "That's a rectangle. A circle, please."
                </motion.div>
              )}

              {currentStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: appleEase }}
                  className="bg-amber-50 border-2 border-amber-500 rounded-xl px-4 py-2 text-sm font-extrabold text-[#D97706] shadow-sm"
                >
                  3. "A. CIRCLE."
                </motion.div>
              )}
            </div>
          </div>

          {/* Agent Reply Box */}
          <div className="flex flex-col gap-2 md:items-end">
            <div className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D97706]" />
              AI Assistant
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`agent-reply-${currentStep}`}
                initial={{ opacity: 0, scale: 0.95, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -6 }}
                transition={{ duration: 0.35, ease: appleEase }}
                className={`border-2 rounded-2xl px-5 py-3 shadow-md max-w-md ${
                  currentStep >= 2
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                    : 'bg-[#18181B] border-neutral-700 text-neutral-100 font-medium'
                }`}
              >
                <div className="text-xs font-mono text-neutral-400 mb-0.5">Response:</div>
                <div className="text-sm sm:text-base flex items-center gap-2">
                  <span>{agentBubble}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Center Canvas: Morphing SVG Shape */}
        <div className="relative w-full h-44 sm:h-52 bg-white rounded-3xl border-2 border-neutral-300 shadow-sm flex items-center justify-center overflow-hidden">
          {/* Morphing Vector Path */}
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full max-w-sm sm:max-w-md z-10"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* The Target Ghost Circle (What was actually asked for) */}
            <circle
              cx="200"
              cy="150"
              r="85"
              fill="none"
              stroke="#D4D4D8"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            <text
              x="200"
              y="155"
              textAnchor="middle"
              className="font-mono text-[11px] fill-neutral-400 font-medium select-none"
            >
              (what you asked for: radius r=85)
            </text>

            {/* The Actual Rendered Morphing Shape */}
            <motion.path
              d={currentPath}
              initial={false}
              animate={{ d: currentPath }}
              transition={{
                duration: 0.75,
                ease: appleEase,
              }}
              fill="rgba(217, 119, 6, 0.12)"
              stroke="#D97706"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </svg>

          {/* Floating Shape Label Badge */}
          <div className="absolute top-4 left-6 z-20 flex items-center gap-2">
            <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-md bg-neutral-900 text-white font-bold">
              Rendered: {shapeName}
            </span>
            {currentStep >= 2 && (
              <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border-2 border-emerald-400 font-bold">
                Status: Marked Complete ✓
              </span>
            )}
          </div>
        </div>

        {/* Build 3: S08's Jittering Stuck Progress Bar Returns */}
        <AnimatePresence>
          {showJitterBar && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: appleEase }}
              className="mt-4 bg-neutral-100 rounded-2xl p-3 sm:p-4 border-2 border-amber-500/70 shadow-md flex flex-col gap-2"
            >
              {/* Progress Track & Jitter Bar */}
              <div className="relative w-full bg-neutral-200 rounded-xl h-12 flex items-center px-3 border-2 border-neutral-300 overflow-hidden">
                
                {/* 100% Target Marker */}
                <span className="absolute right-4 font-mono text-xs font-bold text-neutral-400">
                  100% Done
                </span>

                {/* 80% Threshold Line */}
                <div className="absolute left-[80%] top-0 bottom-0 w-0.5 border-r-2 border-dashed border-neutral-400 z-20" />

                {/* Jittering Bar */}
                <motion.div
                  initial={false}
                  animate={{ width: `${currentJitter.percent}%` }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="h-full rounded-lg bg-gradient-to-r from-amber-600 to-amber-500 flex items-center justify-end pr-3 shadow text-white font-mono font-black text-lg select-none"
                >
                  <span className="drop-shadow-sm flex items-center gap-1">
                    {currentJitter.percent}%
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  </span>
                </motion.div>
              </div>

              {/* Bar Footer Details: Clock Runaway vs Progress Stuck */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono text-neutral-600 px-1 gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-700">The last 20%:</span>
                  <span>Jittering between 78% and 82%</span>
                </div>

                {/* Elapsed Runaway Clock */}
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg border-2 border-neutral-300">
                  <Clock className="w-3.5 h-3.5 text-red-500 stroke-[2.5]" />
                  <span className="text-neutral-500">Elapsed time:</span>
                  <span className="font-bold text-red-600 text-sm">{currentJitter.clock}</span>
                  <span className="text-[10px] text-neutral-400">(and counting...)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Bottom Footer Quote */}
      <div className="z-10 flex items-center justify-between pt-2 border-t-2 border-neutral-200 text-xs text-[#4A4A55] font-mono">
        <span>"Three minutes to build the feature. Forty-five minutes on one dropdown z-index."</span>
        <span className="text-[#D97706] font-semibold">The bar goes nowhere, the clock goes everywhere</span>
      </div>
    </div>
  );
}
