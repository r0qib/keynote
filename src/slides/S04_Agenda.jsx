import React from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../motion';

const CHAPTERS = [
  {
    num: 'I',
    title: 'The Good',
    color: '#1E9E6A',
    summary: 'Boilerplate gone, fast iterations, time back',
    isHero: false,
  },
  {
    num: 'II',
    title: 'The Bad',
    color: '#D97706',
    summary: 'Keynotes vs terminal, infinite loops, 99% traps',
    isHero: false,
  },
  {
    num: 'III',
    title: 'The Ugly',
    color: '#E5484D',
    summary: 'Doomscrolling, framework theater, the meat proxy',
    isHero: false,
  },
  {
    num: 'IV',
    title: 'Making It Good',
    color: '#1B7ED0',
    summary: 'Orchestration, verification gates, real cost discipline',
    isHero: true,
  },
];

/**
 * Slide 04: Agenda
 * 
 * Corner: 04 / Today
 * Kicker: "Today's feature presentation"
 * Visual: Cinematic thin solid letterbox bars top and bottom
 * Chapters: The Good, The Bad, The Ugly, Making It Good
 * Builds:
 *  - 0: Chapter names write on / fade in
 *  - 1: First three dim slightly (opacity-45), "Making It Good" gets blue underline & "the longest chapter" tag
 *  - 2: Footer fades in: "+ a poll · + Q&A"
 */
export default function S04_Agenda({ activeSlide, buildStep }) {
  return (
    <div className="h-full w-full flex flex-col justify-between p-10 md:p-14 lg:p-16 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Cinematic Top Letterbox Bar */}
      <div className="absolute top-0 left-0 right-0 h-4 sm:h-5 md:h-6 bg-[#111113] z-20" />

      {/* Top Header / Kicker */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: appleEase }}
        className="pt-2 z-10"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B7ED0]" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#4A4A55]">
            Today's feature presentation
          </span>
        </div>
      </motion.div>

      {/* Main Content: The Four Chapters Grid */}
      <div className="my-auto z-10 w-full py-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {CHAPTERS.map((chapter, index) => {
            const isDimmed = buildStep >= 1 && !chapter.isHero;

            return (
              <motion.div
                key={chapter.num}
                initial={{ opacity: 0, y: 24 }}
                animate={{
                  opacity: isDimmed ? 0.42 : 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: appleEase,
                }}
                className={`relative rounded-2xl p-6 md:p-7 border-2 flex flex-col justify-between transition-colors ${
                  chapter.isHero && buildStep >= 1
                    ? 'border-[#1B7ED0] bg-white shadow-md'
                    : 'border-neutral-200/90 bg-white/70'
                }`}
              >
                <div>
                  {/* Top Act Number & Accent Dot */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs sm:text-sm font-bold text-[#4A4A55] tracking-widest">
                      ACT {chapter.num}
                    </span>
                    <span
                      className="w-3.5 h-3.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: chapter.color }}
                    />
                  </div>

                  {/* Chapter Name with potential Blue Underline */}
                  <div className="relative inline-block mb-3">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111113] tracking-tight">
                      {chapter.title}
                    </h2>

                    {/* Underline for Making It Good on Build 1 */}
                    {chapter.isHero && (
                      <motion.div
                        className="absolute left-0 bottom-[-4px] right-0 h-[3px] md:h-[4px] bg-[#1B7ED0] rounded-full origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: buildStep >= 1 ? 1 : 0 }}
                        transition={{ duration: 0.5, ease: appleEase }}
                      />
                    )}
                  </div>

                  {/* Summary / Subtitle */}
                  <p className="text-xs sm:text-sm text-[#4A4A55] leading-relaxed mt-2 font-medium">
                    {chapter.summary}
                  </p>
                </div>

                {/* Build 1 Hero Tag: "the longest chapter" */}
                {chapter.isHero && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: buildStep >= 1 ? 1 : 0,
                      y: buildStep >= 1 ? 0 : 8,
                    }}
                    transition={{ duration: 0.4, ease: appleEase, delay: 0.2 }}
                    className="mt-6"
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1B7ED0]/10 text-[#1B7ED0] font-mono text-xs font-bold tracking-wide">
                      <svg
                        className="w-3.5 h-3.5 fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      the longest chapter (~45%)
                    </span>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Build 2: Footer (+ a poll · + Q&A) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: buildStep >= 2 ? 1 : 0,
          y: buildStep >= 2 ? 0 : 12,
        }}
        transition={{ duration: 0.45, ease: appleEase }}
        className="z-10 pb-2 border-t border-neutral-200/80 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
      >
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs sm:text-sm font-semibold text-[#111113]">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#1B7ED0]" />
            + Live Interactive Poll (after Act I)
          </span>
          <span className="text-[#4A4A55]">•</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#111113]" />
            + Q&A Session (Humans only)
          </span>
        </div>

        <div className="font-mono text-xs text-[#4A4A55]">
          Pacing: ~80 min total
        </div>
      </motion.div>

      {/* Cinematic Bottom Letterbox Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-4 sm:h-5 md:h-6 bg-[#111113] z-20" />

    </div>
  );
}
