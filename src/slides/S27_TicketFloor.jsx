import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { CheckSquare, Calendar, Sparkles, ExternalLink, ArrowRight, Check } from 'lucide-react';

/**
 * Slide 27: The ticket is the floor, not the ceiling.
 * 
 * Corner: 27 / Add value (Blue accent dot #1B7ED0, cutTier: 'B')
 * Headline: "The ticket is the floor, not the ceiling."
 * 
 * Builds (totalBuilds: 2):
 *  - 0: The base ticket requirement card alone in the center.
 *  - 1: Value-add idea chips float out and settle around the ticket:
 *       "keyboard navigation", "saved views", "empty state", "loading skeleton", "density toggle", "accessibility".
 *  - 2: Headline banner: "Look over the fence: competitors, best practices, great products."
 *       The empty calendar block from S06 returns in a corner: "That's what the time is for."
 */

const VALUE_CHIPS = [
  { id: 'kbd', label: 'Keyboard accessibility', pos: '-top-6 -left-6 sm:-top-8 sm:-left-12', delay: 0.1 },
  { id: 'views', label: 'Saved views & column presets', pos: '-top-6 -right-6 sm:-top-8 sm:-right-12', delay: 0.2 },
  { id: 'empty', label: 'Empathetic empty state + reset CTA', pos: 'top-1/3 -left-10 sm:-left-20', delay: 0.3 },
  { id: 'skel', label: 'Loading skeleton (zero layout shift)', pos: 'top-1/3 -right-10 sm:-right-20', delay: 0.4 },
  { id: 'density', label: 'Density toggle (compact / comfortable)', pos: '-bottom-6 -left-6 sm:-bottom-8 sm:-left-12', delay: 0.5 },
  { id: 'a11y', label: 'WCAG AA accessible & aria live regions', pos: '-bottom-6 -right-6 sm:-bottom-8 sm:-right-12', delay: 0.6 },
];

export default function S27_TicketFloor({ activeSlide, buildStep }) {
  const showChips = buildStep >= 1;
  const showLookOverFence = buildStep >= 2;

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
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B7ED0]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            Act IV · Elevating The Craft
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          The ticket is the floor, not the ceiling.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          With the time we got back, go beyond the bare requirement.
        </motion.p>
      </div>

      {/* Center Stage: The Ticket Card + Orbiting Value Chips */}
      <div className="my-auto w-full max-w-4xl mx-auto flex items-center justify-center relative py-6 min-h-[360px]">
        
        {/* The Base Ticket Card (Center) */}
        <motion.div
          layout
          className="w-full max-w-lg bg-white rounded-2xl p-6 sm:p-7 border-2 border-neutral-300 shadow-md relative z-10"
        >
          {/* Ticket Header */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b-2 border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-[#1B7ED0] border-2 border-blue-200">
                INQ-1428
              </span>
              <span className="font-mono text-xs text-neutral-400">Story</span>
            </div>
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-neutral-100 text-[#4A4A55]">
              Priority: Medium
            </span>
          </div>

          {/* Ticket Headline Requirement */}
          <div className="text-xl sm:text-2xl font-black tracking-tight text-[#111113] mb-3 leading-snug">
            "As a user, I want to see a list of wellbores."
          </div>

          {/* Bare Acceptance Criteria */}
          <div className="space-y-2 mt-4 pt-3 border-t-2 border-neutral-100">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Acceptance Criteria (The Floor):
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4A4A55]">
              <span className="w-4 h-4 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-700" strokeWidth={3} />
              </span>
              <span>Fetch wellbore list from <code className="font-mono bg-neutral-100 px-1 py-0.5 rounded text-neutral-800">/api/wells</code></span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4A4A55]">
              <span className="w-4 h-4 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-700" strokeWidth={3} />
              </span>
              <span>Render standard HTML table with Name, Field, Status</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-[#4A4A55]">
              <span className="w-4 h-4 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-700" strokeWidth={3} />
              </span>
              <span>Add basic next/prev pagination controls</span>
            </div>
          </div>

          {/* Floor Caption */}
          <div className="mt-4 pt-3 border-t-2 border-neutral-100 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
            <span>Before AI: "Done is done. No time for more."</span>
            <span className="font-semibold text-neutral-500">Shipped</span>
          </div>

          {/* Value Chips Orbiting (Build 1) */}
          {showChips && (
            <>
              {VALUE_CHIPS.map((chip) => (
                <motion.div
                  key={chip.id}
                  initial={{ opacity: 0, scale: 0.6, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ ...springPhysics, delay: chip.delay }}
                  className={`absolute ${chip.pos} z-20 bg-white px-3.5 py-2 rounded-xl border-2 border-[#1B7ED0] shadow-lg flex items-center gap-2 text-xs font-semibold text-[#111113] whitespace-nowrap`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#1B7ED0] flex-shrink-0" />
                  <span>{chip.label}</span>
                </motion.div>
              ))}
            </>
          )}
        </motion.div>

        {/* Build 2: Mini Calendar from S06 Returns in Bottom Corner */}
        {showLookOverFence && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: appleEase }}
            className="hidden md:flex absolute -right-6 lg:-right-12 bottom-0 w-64 bg-white rounded-2xl p-4 border-2 border-neutral-300 shadow-md flex-col z-20"
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b-2 border-neutral-100">
              <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                <Calendar className="w-3.5 h-3.5 text-[#1B7ED0]" />
                <span>Reclaimed Time</span>
              </div>
              <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 rounded border-2 border-emerald-200">
                Hours saved
              </span>
            </div>
            
            {/* Visual calendar representation */}
            <div className="grid grid-cols-5 gap-1 my-1">
              {['M', 'T', 'W', 'T', 'F'].map((day, idx) => (
                <div key={idx} className="h-10 rounded bg-blue-50 border-2 border-blue-200 flex flex-col items-center justify-between p-1">
                  <span className="text-[9px] font-mono font-bold text-neutral-400">{day}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1B7ED0]" />
                </div>
              ))}
            </div>

            <div className="mt-2 text-xs font-bold text-[#111113] leading-snug">
              "That's what the time is for."
            </div>
            <div className="text-[10px] text-neutral-400 mt-0.5">
              A much better use than Reels.
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Banner (Build 2) */}
      <div className="z-10 pt-3 border-t-2 border-neutral-200">
        {showLookOverFence ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase }}
            className="flex flex-wrap items-center justify-between gap-4 bg-blue-50 px-4 py-2.5 rounded-xl border-2 border-blue-200"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B7ED0] flex-shrink-0" />
              <span className="text-sm font-bold text-[#111113]">
                Look over the fence: competitors, best practices, great products.
              </span>
            </div>
            <span className="font-mono text-xs text-[#1B7ED0] font-semibold">
              Taste is the differentiator →
            </span>
          </motion.div>
        ) : (
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>The ticket specifies the contract. You design the experience.</span>
            <span>Beyond the baseline</span>
          </div>
        )}
      </div>
    </div>
  );
}
