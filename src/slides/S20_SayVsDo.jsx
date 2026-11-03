import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import meatMeeting from '../assets/meatproxy-emojis-svg/meat-meeting.svg';
import { CornerDownLeft, Users, Terminal, Sparkles } from 'lucide-react';

/**
 * Slide 20: What we say vs. what we do.
 * 
 * Corner: 20 / Say vs. do (Coral accent dot #E5484D)
 * Headline: "What we say vs. what we do."
 * One idea: What we claim we do with AI and what actually happens are different.
 * 
 * Builds (totalBuilds: 1):
 *  - 0: Left pane ("In the meeting") with quote "We follow spec-driven development." and meat-meeting mascot.
 *  - 1: Right pane ("At 6:47 PM") reveals with terminal input "fix it" and animated Enter keystroke.
 *       Anchors Poll Q4 callback.
 */

export default function S20_SayVsDo({ activeSlide, buildStep }) {
  const showRightPane = buildStep >= 1;
  const [typedText, setTypedText] = useState('');
  const [isEnterPressed, setIsEnterPressed] = useState(false);

  // Animate typing "fix it" and Enter press on Build 1
  useEffect(() => {
    if (showRightPane) {
      setTypedText('');
      setIsEnterPressed(false);
      const target = 'fix it';
      let index = 0;
      
      const interval = setInterval(() => {
        if (index <= target.length) {
          setTypedText(target.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setIsEnterPressed(true);
          }, 350);
        }
      }, 140);

      return () => clearInterval(interval);
    } else {
      setTypedText('');
      setIsEnterPressed(false);
    }
  }, [showRightPane]);

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
            The Reality Gap
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
        >
          What we say vs. <span className="text-[#E5484D]">what we do.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          No judgment; I'm on the right-hand side too. The joke is on us, not the frameworks.
        </motion.p>
      </div>

      {/* Center Stage: Split Screen with 2px vertical rule */}
      <div className="my-auto w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 z-10 py-2 border-2 border-neutral-300 rounded-3xl bg-white shadow-xl overflow-hidden min-h-[380px]">
        
        {/* Left Pane: In the meeting */}
        <div className="p-6 sm:p-8 flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 border-neutral-300 bg-neutral-50/60 relative">
          <div>
            {/* Stage Label */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-800">
                  In the Meeting · 11:30 AM
                </span>
              </div>
              <span className="text-[11px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border-2 border-emerald-300 font-semibold">
                Architecture Standup
              </span>
            </div>

            {/* Quote */}
            <div className="bg-white p-5 rounded-2xl border-2 border-neutral-300 shadow-sm relative mb-6">
              <div className="font-mono text-xs text-neutral-400 mb-1">What we tell our peers:</div>
              <p className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight leading-snug">
                "We follow <span className="text-[#0052CC] underline decoration-2 underline-offset-4">spec-driven development</span>."
              </p>
              <div className="mt-3 text-xs text-neutral-500 font-mono flex items-center gap-2">
                <span>✓ Design RFCs</span>
                <span>✓ Schema gates</span>
                <span>✓ Two human reviewers</span>
              </div>
            </div>
          </div>

          {/* Mascot in the meeting */}
          <div className="flex items-center gap-4 pt-4 border-t-2 border-neutral-200">
            <img
              src={meatMeeting}
              alt="Meat meeting mascot"
              className="w-14 h-14 object-contain flex-shrink-0"
            />
            <div className="text-xs font-mono text-neutral-600">
              <div className="font-bold text-neutral-800">The Model Citizen</div>
              <div>"Everything is versioned, peer-reviewed, and documented."</div>
            </div>
          </div>
        </div>

        {/* Right Pane: At 6:47 PM (Build 1) */}
        <div className="p-6 sm:p-8 flex flex-col justify-between bg-neutral-900 text-neutral-100 relative">
          {showRightPane ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: appleEase }}
              className="h-full flex flex-col justify-between"
            >
              <div>
                {/* Stage Label */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-[#E5484D] text-white flex items-center justify-center">
                      <Terminal className="w-4 h-4 stroke-[2.5]" />
                    </span>
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-200">
                      At 6:47 PM · Friday Night
                    </span>
                  </div>
                  <span className="text-[11px] font-mono bg-red-950/80 text-red-400 px-2.5 py-0.5 rounded-full border-2 border-red-800 font-semibold animate-pulse">
                    Deploy in 13 min
                  </span>
                </div>

                {/* Real terminal chat input */}
                <div className="bg-black/90 p-5 rounded-2xl border-2 border-neutral-700 shadow-inner mb-6">
                  <div className="flex items-center justify-between text-neutral-500 text-xs font-mono mb-2">
                    <span>Claude Code / Terminal Chat</span>
                    <span className="text-[#E5484D] font-bold">Raw Prompting</span>
                  </div>

                  {/* Terminal command line */}
                  <div className="font-mono text-2xl sm:text-3xl text-white font-bold flex items-center gap-2 min-h-[44px]">
                    <span className="text-[#E5484D] select-none">&gt;</span>
                    <span>{typedText}</span>
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="w-3 h-7 bg-white inline-block"
                    />
                  </div>

                  <div className="mt-4 pt-3 border-t-2 border-neutral-800 flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-mono">
                      No spec. No RFC. Just prayer.
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 text-neutral-500 font-mono text-sm">
              <span className="text-neutral-400">At 6:47 PM · Friday Night</span>
            </div>
          )}
        </div>

      </div>

      {/* Bottom Pacing Indicator */}
      <div className="z-10 flex items-center justify-between pt-3 border-t-2 border-neutral-200 text-xs text-[#4A4A55] font-mono">
        <span>Architectural Intent vs. Terminal Reality</span>
        <span className="text-[#E5484D] font-semibold">The Say / Do Gap</span>
      </div>
    </div>
  );
}
