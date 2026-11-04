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

const LEFT_CHIPS = [
  { id: 'kbd', label: 'Keyboard navigation' },
  { id: 'views', label: 'Saved views & column presets' },
  { id: 'empty', label: 'Empathetic empty state + CTA' },
];

const RIGHT_CHIPS = [
  { id: 'skel', label: 'Loading skeleton (zero CLS)' },
  { id: 'density', label: 'Compact / comfortable density' },
  { id: 'a11y', label: 'WCAG AA accessible' },
];

export default function S27_TicketFloor({ activeSlide, buildStep }) {
  const showChips = buildStep >= 1;
  const showLookOverFence = buildStep >= 2;

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 sm:p-10 md:p-14 lg:p-16 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
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

      {/* Center Stage: Left Chips + Center Ticket Card + Right Chips / Calendar */}
      <div className="my-auto w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center z-10 py-2">
        
        {/* Left Column: 3 Value Chips */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-3.5">
          {showChips && LEFT_CHIPS.map((chip, idx) => (
            <motion.div
              key={chip.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springPhysics, delay: idx * 0.1 }}
              className="bg-white p-3.5 rounded-2xl border-2 border-[#1B7ED0] shadow-md flex items-center gap-3 text-xs sm:text-sm font-bold text-[#111113]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#1B7ED0] shrink-0" />
              <span>{chip.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Center Column: The Base Ticket Card (6 cols) */}
        <div className="lg:col-span-6 flex justify-center">
          <motion.div
            layout
            className="w-full bg-white rounded-3xl p-7 sm:p-8 border-2 border-neutral-300 shadow-xl relative"
          >
            {/* Ticket Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b-2 border-neutral-100">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-50 text-[#1B7ED0] border-2 border-blue-200">
                  INQ-1428
                </span>
                <span className="font-mono text-xs text-neutral-400 font-semibold">User Story</span>
              </div>
              <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-md bg-neutral-100 text-[#4A4A55]">
                Priority: Medium
              </span>
            </div>

            {/* Ticket Headline Requirement */}
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-[#111113] mb-4 leading-snug">
              "As a user, I want to see a list of wellbores."
            </div>

            {/* Bare Acceptance Criteria */}
            <div className="space-y-2.5 mt-4 pt-3.5 border-t-2 border-neutral-100">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 mb-2">
                Acceptance Criteria (The Bare Floor):
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#4A4A55]">
                <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-700" strokeWidth={3} />
                </span>
                <span>Fetch wellbore list from <code className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-800">/api/wells</code></span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#4A4A55]">
                <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-700" strokeWidth={3} />
                </span>
                <span>Render standard HTML table with Name, Field, Status</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-[#4A4A55]">
                <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-emerald-700" strokeWidth={3} />
                </span>
                <span>Add basic next/prev pagination controls</span>
              </div>
            </div>

            {/* Floor Caption */}
            <div className="mt-4 pt-3.5 border-t-2 border-neutral-100 text-xs font-mono text-neutral-400 flex items-center justify-between">
              <span>Before AI: "Done is done. No time for more."</span>
              <span className="font-semibold text-neutral-600">Shipped baseline</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: 3 Value Chips OR Calendar on Build 2 (3 cols) */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-3.5">
          {showLookOverFence ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: appleEase }}
              className="bg-white rounded-3xl p-5 border-2 border-neutral-300 shadow-xl flex flex-col"
            >
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b-2 border-neutral-100">
                <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-neutral-500">
                  <Calendar className="w-4 h-4 text-[#1B7ED0]" />
                  <span>Reclaimed Focus</span>
                </div>
                <span className="font-mono text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Hours saved
                </span>
              </div>
              
              {/* Visual calendar representation */}
              <div className="grid grid-cols-5 gap-1.5 my-1.5">
                {['M', 'T', 'W', 'T', 'F'].map((day, idx) => (
                  <div key={idx} className="h-10 rounded-xl bg-blue-50 border-2 border-blue-200 flex flex-col items-center justify-between p-1">
                    <span className="text-[10px] font-mono font-bold text-neutral-400">{day}</span>
                    <span className="w-2 h-2 rounded-full bg-[#1B7ED0]" />
                  </div>
                ))}
              </div>

              <div className="mt-2.5 text-sm font-bold text-[#111113] leading-snug">
                "That's what the time is for."
              </div>
              <div className="text-xs text-neutral-500 mt-0.5">
                Polishing edges instead of churning boilerplate.
              </div>
            </motion.div>
          ) : showChips ? (
            RIGHT_CHIPS.map((chip, idx) => (
              <motion.div
                key={chip.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...springPhysics, delay: idx * 0.1 }}
                className="bg-white p-3.5 rounded-2xl border-2 border-[#1B7ED0] shadow-md flex items-center gap-3 text-xs sm:text-sm font-bold text-[#111113]"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#1B7ED0] shrink-0" />
                <span>{chip.label}</span>
              </motion.div>
            ))
          ) : null}
        </div>

      </div>

      {/* Build 2 Keynote Punchline */}
      {showLookOverFence && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="z-10 max-w-5xl mx-auto w-full bg-[#111113] text-white px-6 py-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1B7ED0] flex-shrink-0" />
            <span className="text-base sm:text-lg font-bold">
              Look over the fence: competitors, best practices, great products.
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-[#1B7ED0] uppercase tracking-wider bg-blue-950/60 px-3 py-1 rounded-lg border border-[#1B7ED0]/40 shrink-0">
            Taste is the differentiator
          </span>
        </motion.div>
      )}
    </div>
  );
}
