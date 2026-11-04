import React from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../motion';
import bs23Logo from '../assets/bs23_logo.webp';

/**
 * Slide 01: Title
 * 
 * Headline: "AI-Assisted Development" (kicker above)
 * Title: "The Good, the Bad and the Ugly" (huge typography, ≥72px)
 * Animated Underlines: "Good" (green #1E9E6A), "Bad" (amber #D97706), "Ugly" (coral #E5484D)
 * Presenter info: "Rokibul Islam · InformatiQ team"
 * Company logo: BS23 logo quiet in bottom-left (~28px tall, opacity-80)
 * Builds: 0 (No clicks)
 */
export default function S01_Title({ activeSlide, buildStep }) {
  return (
    <div className="h-full w-full flex flex-col justify-between p-10 md:p-16 lg:p-20 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Header / Kicker */}
      <motion.div 
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
        className="flex items-center gap-3"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#1B7ED0] flex-shrink-0" />
        <span className="font-mono text-sm md:text-base font-semibold tracking-wider uppercase text-[#4A4A55]">
          AI-Assisted Development
        </span>
      </motion.div>

      {/* Main Title Center Stage */}
      <div className="my-auto max-w-5xl">
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[84px] font-black tracking-tight text-[#111113] leading-[1.08]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: appleEase }}
        >
          {'The '}
          
          {/* The Good */}
          <span className="relative inline-block">
            <span>Good</span>
            <motion.span 
              className="absolute left-0 bottom-[-4px] md:bottom-[-8px] right-0 h-[4px] md:h-[5px] bg-[#1E9E6A] rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 0.5, ease: appleEase }}
            />
          </span>

          {', the '}

          {/* The Bad */}
          <span className="relative inline-block">
            <span>Bad</span>
            <motion.span 
              className="absolute left-0 bottom-[-4px] md:bottom-[-8px] right-0 h-[4px] md:h-[5px] bg-[#D97706] rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.1, duration: 0.5, ease: appleEase }}
            />
          </span>

          <br className="hidden sm:inline" />
          {' and the '}

          {/* The Ugly */}
          <span className="relative inline-block">
            <span>Ugly</span>
            <motion.span 
              className="absolute left-0 bottom-[-4px] md:bottom-[-8px] right-0 h-[4px] md:h-[5px] bg-[#E5484D] rounded-full origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.5, ease: appleEase }}
            />
          </span>
        </motion.h1>

        {/* Presenter Name & Team */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease: appleEase }}
          className="text-lg md:text-2xl text-[#4A4A55] font-normal mt-8 md:mt-12 tracking-tight"
        >
          Rokibul Islam · InformatiQ team
        </motion.p>
      </div>

      {/* Bottom Bar: Quiet BS23 Logo & Metadata */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="flex items-center justify-between pt-6 border-t border-neutral-200/60"
      >
        <div className="flex items-center gap-3">
          <img 
            src={bs23Logo} 
            alt="Brain Station 23" 
            className="h-7 md:h-8 object-contain opacity-80"
          />
        </div>

        <div className="font-mono text-xs md:text-sm text-[#4A4A55] tracking-wide">
          Internal Engineering Keynote · 2026
        </div>
      </motion.div>

    </div>
  );
}
