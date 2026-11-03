import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { ShieldCheck, DollarSign, Clock, AlertCircle } from 'lucide-react';

/**
 * Slide 22: Pick two.
 * 
 * Corner: 22 / Expectations (Coral accent dot #E5484D, cutTier: 'A')
 * Headline: "Pick two."
 * One idea: Methodology, budget, and deadline all at once is not realistic, and we should say so.
 * 
 * Builds (totalBuilds: 2):
 *  - 0: The triangle with 3 vertices ("Follow the methodology", "Stay within budget", "Deliver on time").
 *  - 1: Marker dot glides toward center, gets repelled/pushed to an edge, tries again, and gets pushed out.
 *  - 2: "Pick two." headline lands with punchline: "You cannot have all three at full volume."
 */

export default function S22_PickTwo({ activeSlide, buildStep }) {
  const showRepellingMarker = buildStep >= 1;
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
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            Engineering Constraints
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.06]"
        >
          {showPunchline ? (
            <span>Pick <span className="text-[#E5484D]">two.</span></span>
          ) : (
            <span className="text-neutral-800">The Triple Constraint</span>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Methodology, budget, and deadline all at once is not realistic. We should be honest about it.
        </motion.p>
      </div>

      {/* Center Stage: Large Triangle & Repelling Marker */}
      <div className="my-auto w-full max-w-4xl mx-auto flex flex-col items-center justify-center z-10 py-2 relative min-h-[380px]">
        
        {/* SVG Triangle Stage */}
        <div className="relative w-[340px] sm:w-[440px] md:w-[500px] h-[300px] sm:h-[340px] flex items-center justify-center">
          
          <svg
            viewBox="0 0 500 400"
            className="w-full h-full fill-none stroke-neutral-800 stroke-[3.5] overflow-visible"
            style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
          >
            {/* Shaded triangle area */}
            <polygon
              points="250,55 60,350 440,350"
              className="fill-neutral-100/60 stroke-neutral-800 stroke-[3.5]"
            />

            {/* Subtle center dead-zone circle */}
            <circle
              cx="250"
              cy="250"
              r="34"
              stroke="#E5484D"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="rgba(229, 72, 77, 0.05)"
            />

            {/* Internal edge connector lines */}
            <line x1="250" y1="55" x2="250" y2="250" stroke="#D4D4D8" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="60" y1="350" x2="250" y2="250" stroke="#D4D4D8" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="440" y1="350" x2="250" y2="250" stroke="#D4D4D8" strokeWidth="2" strokeDasharray="3 3" />
          </svg>

          {/* Vertex 1: Top (Follow the methodology) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 flex flex-col items-center">
            <div className="bg-white px-4 py-2 rounded-2xl border-2 border-neutral-300 shadow-md flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0052CC] stroke-[2.5]" />
              <span className="font-mono text-xs sm:text-sm font-bold text-neutral-900 whitespace-nowrap">
                Follow methodology
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 mt-1">Specs & gates</span>
          </div>

          {/* Vertex 2: Bottom-Left (Stay within budget) */}
          <div className="absolute bottom-0 left-0 -translate-x-4 sm:-translate-x-8 translate-y-3 flex flex-col items-center">
            <div className="bg-white px-4 py-2 rounded-2xl border-2 border-neutral-300 shadow-md flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#E5484D] stroke-[2.5]" />
              <span className="font-mono text-xs sm:text-sm font-bold text-neutral-900 whitespace-nowrap">
                Stay within budget
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 mt-1">Token limits</span>
          </div>

          {/* Vertex 3: Bottom-Right (Deliver on time) */}
          <div className="absolute bottom-0 right-0 translate-x-4 sm:translate-x-8 translate-y-3 flex flex-col items-center">
            <div className="bg-white px-4 py-2 rounded-2xl border-2 border-neutral-300 shadow-md flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#D97706] stroke-[2.5]" />
              <span className="font-mono text-xs sm:text-sm font-bold text-neutral-900 whitespace-nowrap">
                Deliver on time
              </span>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 mt-1">Sprint commitments</span>
          </div>

          {/* Interactive Repelling Marker Dot (Build 1 & 2) */}
          {showRepellingMarker && (
            <motion.div
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={
                showPunchline
                  ? {
                      // Final resting position on the edge between Budget and Speed (or Methodology and Budget)
                      x: -90,
                      y: 70,
                      scale: 1,
                    }
                  : {
                      // Glides toward center, pushed out to edge, tries again, pushed out
                      x: [0, 0, -80, 0, 70, -90],
                      y: [40, 20, 60, 20, 60, 70],
                      scale: 1,
                    }
              }
              transition={
                showPunchline
                  ? { duration: 0.8, ease: appleEase }
                  : {
                      duration: 4.5,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut',
                    }
              }
              className="absolute z-20 flex flex-col items-center pointer-events-none"
            >
              <div className="w-6 h-6 rounded-full bg-[#E5484D] border-[3px] border-white shadow-lg flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <span className="mt-1 font-mono text-[10px] font-bold text-[#E5484D] bg-white px-2 py-0.5 rounded-md border-2 border-[#E5484D] shadow-sm whitespace-nowrap">
                You Are Here
              </span>
            </motion.div>
          )}

          {/* Center Impossible Tag */}
          <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
            <span className="font-mono text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
              Impossible Equilibrium
            </span>
          </div>
        </div>

        {/* Build 2 Punchline Banner */}
        <div className="min-h-[50px] mt-8 flex items-center justify-center">
          {showPunchline && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: appleEase }}
              className="bg-neutral-900 text-white px-6 py-2.5 rounded-2xl border-2 border-neutral-800 shadow-lg flex items-center gap-3 text-center"
            >
              <AlertCircle className="w-5 h-5 text-[#E5484D] flex-shrink-0" />
              <span className="text-base sm:text-lg font-bold tracking-tight">
                "You cannot have all three at full volume. Pretending we can is what creates the say/do gap."
              </span>
            </motion.div>
          )}
        </div>

      </div>

      {/* Bottom Pacing Indicator */}
      <div className="z-10 flex items-center justify-between pt-3 border-t-2 border-neutral-200 text-xs text-[#4A4A55] font-mono">
        <span>The Trilemma</span>
        <span className="text-[#E5484D] font-semibold">Methodology · Budget · Speed</span>
      </div>
    </div>
  );
}
