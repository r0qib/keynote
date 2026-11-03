import React from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../motion';
import meatWave from '../assets/meatproxy-emojis-svg/meat-wave.svg';
import bs23Logo from '../assets/bs23_logo.webp';

/**
 * Slide 43: Finale / Q&A Slide
 * 
 * Corner: none (unbadged)
 * Headline: "Questions?"
 * Subtitle: "(Humans only.)"
 * Visual: Mascot meat-wave waving goodbye with idle floating motion.
 * Details: Presenter card, BS23 company branding, action prompt banner, links.
 * Builds: 0 (single step)
 */
export default function S43_Thanks({ activeSlide, buildStep }) {
  return (
    <div className="h-full w-full flex flex-col justify-between p-8 sm:p-12 md:p-14 lg:p-16 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Header Context */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: appleEase }}
        className="z-10 flex items-center justify-between"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B7ED0] flex-shrink-0" />
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#4A4A55]">
            InformatiQ Tech Talk · Finale & Discussion
          </span>
        </div>
        <div className="font-mono text-xs text-[#4A4A55] hidden sm:block">
          Open Discussion
        </div>
      </motion.div>

      {/* Main Grid: Left Details & Right Mascot Hero */}
      <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        
        {/* Left Column: Headline, Action Banner, Presenter Info */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
          
          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: appleEase }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[82px] font-black tracking-tight text-[#111113] leading-none">
              Questions?
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-mono text-neutral-500 font-medium mt-3">
              (Humans only.)
            </p>
          </motion.div>

          {/* Action Prompt Banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: appleEase }}
            className="bg-white border-2 border-neutral-300 rounded-2xl p-4 sm:p-5 shadow-sm max-w-xl"
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-blue-50 border-2 border-blue-200 text-[#1B7ED0] flex-shrink-0">
                <svg
                  className="w-5 h-5 stroke-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <div className="font-mono text-xs uppercase font-bold text-neutral-400 tracking-wider">
                  The floor is open
                </div>
                <p className="text-sm sm:text-base font-semibold text-[#111113] leading-snug">
                  Ask me anything: workflows, prompt templates, incident postmortems, or how to avoid the purple.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Presenter Card & Social Channels */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6, ease: appleEase }}
            className="flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm text-[#4A4A55]"
          >
            {/* Presenter Pill */}
            <div className="flex items-center gap-3 bg-neutral-100/90 border-2 border-neutral-200 px-3.5 py-2 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-[#111113] text-white flex items-center justify-center font-bold text-xs tracking-wider">
                IQ
              </div>
              <div>
                <div className="font-bold text-[#111113]">
                  [Presenter name]
                </div>
                <div className="text-[11px] text-neutral-500 font-sans">
                  InformatiQ team · Brain Station 23
                </div>
              </div>
            </div>

            {/* Links / Handles */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border-2 border-neutral-200 text-xs font-semibold text-[#111113]">
                <svg className="w-4 h-4 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>github.com/brainstation-23</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border-2 border-neutral-200 text-xs font-semibold text-[#111113]">
                <span className="w-2 h-2 rounded-full bg-[#1E9E6A] flex-shrink-0" />
                <span>teams: @presenter</span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Right Column: Hero Mascot Waving */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: appleEase }}
            className="relative flex flex-col items-center"
          >
            {/* Mascot with gentle idle waving float */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 1.5, -1.5, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative"
            >
              <img
                src={meatWave}
                alt="Meat Proxy Waving"
                className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain drop-shadow-md select-none pointer-events-none"
              />

              {/* Floating Goodbye / Callback Speech Bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, duration: 0.5, ease: appleEase }}
                className="absolute -top-3 -right-2 md:top-0 md:-right-4 bg-white border-2 border-[#111113] rounded-2xl px-4 py-2 shadow-lg flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#1E9E6A]" />
                <span className="font-mono text-xs sm:text-sm font-bold text-[#111113] tracking-tight">
                  See you at the after-party!
                </span>
              </motion.div>
            </motion.div>

            {/* Quiet caption underneath */}
            <div className="font-mono text-xs text-neutral-400 mt-2">
              `meat-wave` · The reformed Meat Proxy
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Footer: BS23 Logo Quiet & Company Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex items-center justify-between pt-4 border-t border-neutral-200/60 z-10"
      >
        <div className="flex items-center gap-3">
          <img
            src={bs23Logo}
            alt="Brain Station 23"
            className="h-7 w-auto object-contain opacity-80"
          />
          <span className="text-xs font-mono text-[#4A4A55]">
            Brain Station 23 / InformatiQ, Norway
          </span>
        </div>
        <div className="text-xs font-mono text-[#4A4A55] tracking-wide hidden sm:block">
          AI-Assisted Development: The Good, the Bad and the Ugly
        </div>
      </motion.div>

    </div>
  );
}
