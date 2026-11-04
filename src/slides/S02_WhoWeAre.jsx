import React from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../motion';

import wellMateLogo from '../assets/informatiq-app-suite-logos/wellMate.svg';
import wellBookLogo from '../assets/informatiq-app-suite-logos/wellBook.svg';
import logistiQLogo from '../assets/informatiq-app-suite-logos/logistiQ.svg';
import analytiQLogo from '../assets/informatiq-app-suite-logos/analytiQ.svg';
import geologiQLogo from '../assets/informatiq-app-suite-logos/geologiQ.svg';
import eventAnalyzerLogo from '../assets/informatiq-app-suite-logos/eventAnalyzer.svg';
import offsetAnalyzerLogo from '../assets/informatiq-app-suite-logos/offsetAnalyzer.svg';
import portalLogo from '../assets/informatiq-app-suite-logos/portal.svg';

const APPS = [
  { name: 'WellMate', logo: wellMateLogo, desc: 'Drilling telemetry' },
  { name: 'WellBook', logo: wellBookLogo, desc: 'Well operations' },
  { name: 'LogistiQ', logo: logistiQLogo, desc: 'Offshore logistics' },
  { name: 'AnalytiQ', logo: analytiQLogo, desc: 'Analytics engine' },
  { name: 'GeologiQ', logo: geologiQLogo, desc: 'Subsurface models' },
  { name: 'Event Analyzer', logo: eventAnalyzerLogo, desc: 'Incident analysis' },
  { name: 'Offset Analyzer', logo: offsetAnalyzerLogo, desc: 'Offset benchmark' },
  { name: 'Portal', logo: portalLogo, desc: 'Unified portal' },
];

/**
 * Clean architectural line-art offshore drilling rig
 */
function OffshoreRigVector() {
  return (
    <svg
      viewBox="0 0 220 200"
      className="w-56 sm:w-64 md:w-80 lg:w-96 h-auto overflow-visible"
      fill="none"
      stroke="#111113"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Derrick Tower (Center) */}
      <path d="M 88 120 L 104 20 L 116 20 L 132 120" />
      {/* Crown block top */}
      <rect x="102" y="14" width="16" height="6" fill="#FAFAFB" />
      <line x1="110" y1="14" x2="110" y2="6" />
      {/* Derrick cross trusses */}
      <line x1="93" y1="100" x2="127" y2="100" />
      <line x1="97" y1="80" x2="123" y2="80" />
      <line x1="100" y1="60" x2="120" y2="60" />
      <line x1="103" y1="40" x2="117" y2="40" />
      {/* Cross diagonals */}
      <line x1="93" y1="100" x2="123" y2="80" />
      <line x1="127" y1="100" x2="97" y2="80" />
      <line x1="97" y1="80" x2="120" y2="60" />
      <line x1="123" y1="80" x2="100" y2="60" />
      <line x1="100" y1="60" x2="117" y2="40" />
      <line x1="120" y1="60" x2="103" y2="40" />

      {/* Main Platform Deck */}
      <rect x="44" y="120" width="136" height="16" fill="#FAFAFB" />
      <line x1="44" y1="128" x2="180" y2="128" />

      {/* Living Quarters & Machinery module (Left deck) */}
      <rect x="52" y="96" width="34" height="24" fill="#FAFAFB" />
      <line x1="58" y1="104" x2="64" y2="104" />
      <line x1="72" y1="104" x2="78" y2="104" />

      {/* Helipad (Far left cantilever) */}
      <path d="M 16 100 L 46 100" />
      <path d="M 22 100 L 44 120" />
      <line x1="16" y1="96" x2="46" y2="96" strokeWidth="2" />
      <circle cx="31" cy="98" r="8" strokeWidth="2" />
      <text
        x="31"
        y="102"
        fontSize="8"
        fontFamily="sans-serif"
        fontWeight="bold"
        fill="#111113"
        stroke="none"
        textAnchor="middle"
      >
        H
      </text>

      {/* Crane Boom (Right side) */}
      <path d="M 148 120 L 176 80 L 192 68" />
      <line x1="148" y1="120" x2="170" y2="100" />
      <line x1="192" y1="68" x2="192" y2="108" strokeDasharray="3 3" />

      {/* Flare Boom (Far right angled out) */}
      <line x1="172" y1="128" x2="204" y2="110" />
      <line x1="168" y1="134" x2="200" y2="114" />
      <path d="M 204 110 Q 210 106 208 102 Q 206 108 202 110" />

      {/* Substructure Columns / Legs */}
      <rect x="58" y="136" width="14" height="54" fill="#FAFAFB" />
      <rect x="103" y="136" width="14" height="54" fill="#FAFAFB" />
      <rect x="148" y="136" width="14" height="54" fill="#FAFAFB" />

      {/* Cross braces */}
      <line x1="72" y1="144" x2="103" y2="176" />
      <line x1="103" y1="144" x2="72" y2="176" />
      <line x1="117" y1="144" x2="148" y2="176" />
      <line x1="148" y1="144" x2="117" y2="176" />

      {/* Lower Pontoon Hull */}
      <rect x="46" y="180" width="130" height="10" rx="2" fill="#FAFAFB" />

      {/* Sea Horizon waterline ripple marks */}
      <line x1="36" y1="194" x2="60" y2="194" strokeWidth="2" />
      <line x1="80" y1="194" x2="120" y2="194" strokeWidth="2" />
      <line x1="145" y1="194" x2="185" y2="194" strokeWidth="2" />
    </svg>
  );
}

/**
 * Slide 02: Who We Are
 * 
 * Prominent application suite presentation with high-impact logos
 * alongside the North Sea drilling context.
 */
export default function S02_WhoWeAre({ activeSlide, buildStep }) {
  return (
    <div className="h-full w-full flex flex-col justify-between p-10 md:p-14 lg:p-16 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Header & Headline Section */}
      <div className="max-w-5xl z-10">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="font-mono text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#4A4A55] mb-2"
        >
          InformatiQ · Energy Software for the North Sea
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: appleEase, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          We build software for the middle of the North Sea.
        </motion.h1>

        {/* Build 2: The High-Stakes Anchor */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ 
            opacity: buildStep >= 2 ? 1 : 0,
            y: buildStep >= 2 ? 0 : 16
          }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="mt-4 flex items-center gap-3.5"
        >
          <div className="w-1.5 h-8 bg-[#E5484D] rounded-full flex-shrink-0" />
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#111113] tracking-tight">
            When our code is wrong, someone on a rig reads the wrong number.
          </p>
        </motion.div>
      </div>

      {/* Main Stage: Prominent Application Suite Showcase & Rig */}
      <div className="relative z-10 my-auto w-full py-4">
        {/* Build 1: Application Suite Grid - Prominent & Legible */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-5 max-w-6xl">
          {APPS.map((app, index) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: buildStep >= 1 ? 1 : 0,
                y: buildStep >= 1 ? 0 : 30,
              }}
              transition={{
                duration: 0.45,
                ease: appleEase,
                delay: buildStep >= 1 ? index * 0.06 : 0,
              }}
              className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-sm hover:border-[#1B7ED0] hover:shadow-md transition-all group"
            >
              {/* App Logo - Large, Clear, and Focused */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 flex-shrink-0 rounded-xl bg-neutral-50/80 border border-neutral-200/70 p-2 flex items-center justify-center group-hover:scale-105 transition-transform">
                <img
                  src={app.logo}
                  alt={app.name}
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>

              {/* App Typography - Large and legible */}
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-base sm:text-lg text-[#111113] tracking-tight whitespace-nowrap group-hover:text-[#1B7ED0] transition-colors">
                  {app.name}
                </span>
                <span className="text-xs sm:text-sm text-[#4A4A55] font-normal leading-tight mt-0.5 whitespace-nowrap">
                  {app.desc}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lower Third: Horizon Line & Architectural Rig */}
      <div className="relative w-full pt-4">
        {/* Full-width Horizon Vector Line */}
        <div className="relative w-full flex items-end">
          <svg
            className="absolute bottom-0 left-0 w-full h-[2px] overflow-visible"
            preserveAspectRatio="none"
          >
            <motion.line
              x1="0"
              y1="1"
              x2="100%"
              y2="1"
              stroke="#111113"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.1, ease: appleEase }}
            />
          </svg>
        </div>

        {/* Rig sitting anchored on the horizon at the right */}
        <div className="relative z-10 flex justify-end w-full pb-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: appleEase }}
            className="flex-shrink-0 mb-[-2px]"
          >
            <OffshoreRigVector />
          </motion.div>
        </div>
      </div>

    </div>
  );
}
