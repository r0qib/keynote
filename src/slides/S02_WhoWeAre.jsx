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
  { name: 'WellMate', logo: wellMateLogo },
  { name: 'WellBook', logo: wellBookLogo },
  { name: 'LogistiQ', logo: logistiQLogo },
  { name: 'AnalytiQ', logo: analytiQLogo },
  { name: 'GeologiQ', logo: geologiQLogo },
  { name: 'Event Analyzer', logo: eventAnalyzerLogo },
  { name: 'Offset Analyzer', logo: offsetAnalyzerLogo },
  { name: 'Portal', logo: portalLogo },
];

/**
 * Clean architectural line-art offshore drilling rig
 */
function OffshoreRigVector() {
  return (
    <svg
      viewBox="0 0 220 200"
      className="w-48 sm:w-60 md:w-72 lg:w-80 h-auto overflow-visible"
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
      {/* Small subtle flare tip */}
      <path d="M 204 110 Q 210 106 208 102 Q 206 108 202 110" />

      {/* Substructure Columns / Legs plunging down to horizon */}
      <rect x="58" y="136" width="14" height="54" fill="#FAFAFB" />
      <rect x="103" y="136" width="14" height="54" fill="#FAFAFB" />
      <rect x="148" y="136" width="14" height="54" fill="#FAFAFB" />

      {/* Cross braces between legs */}
      <line x1="72" y1="144" x2="103" y2="176" />
      <line x1="103" y1="144" x2="72" y2="176" />
      <line x1="117" y1="144" x2="148" y2="176" />
      <line x1="148" y1="144" x2="117" y2="176" />

      {/* Lower Pontoon Hull at waterline */}
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
 * Corner: 02 / Who we are
 * Headline: "We build software for the middle of the North Sea."
 * Sub/Kicker: "Client: InformatiQ, Norway · Offshore drilling"
 * Visual: Horizon line across lower third + Vector Rig + 8 app logos
 * Builds:
 *  - 0: Horizon draws, rig rises
 *  - 1: 8 app logos rise staggered left-to-right
 *  - 2: Stakes line in ink: "When our code is wrong, someone on a rig reads the wrong number."
 */
export default function S02_WhoWeAre({ activeSlide, buildStep }) {
  return (
    <div className="h-full w-full flex flex-col justify-between p-10 md:p-14 lg:p-16 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Header & Headline Section */}
      <div className="max-w-4xl z-10">
        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="font-mono text-xs sm:text-sm font-semibold tracking-wide uppercase text-[#4A4A55] mb-3"
        >
          Client: InformatiQ, Norway · Offshore drilling
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: appleEase, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          We build software for the middle of the North Sea.
        </motion.h1>

        {/* Build 2: The Stakes Line */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ 
            opacity: buildStep >= 2 ? 1 : 0,
            y: buildStep >= 2 ? 0 : 16
          }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="mt-6 md:mt-8 flex items-center gap-3.5"
        >
          <div className="w-1.5 h-8 md:h-10 bg-[#111113] rounded-full flex-shrink-0" />
          <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#111113] tracking-tight">
            When our code is wrong, someone on a rig reads the wrong number.
          </p>
        </motion.div>
      </div>

      {/* Horizon and Rig Section (Lower Third) */}
      <div className="relative w-full mt-auto pt-6">
        
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

        {/* Content Sitting on Horizon: App Logos on Left, Rig on Right */}
        <div className="relative z-10 flex flex-col md:flex-row items-end justify-between w-full pb-2">
          
          {/* Build 1: The 8 App Suite Logos Skyline */}
          <div className="w-full md:w-3/5 lg:w-2/3 pb-3">
            <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 items-end">
              {APPS.map((app, index) => (
                <motion.div
                  key={app.name}
                  initial={{ opacity: 0, y: 35 }}
                  animate={{
                    opacity: buildStep >= 1 ? 1 : 0,
                    y: buildStep >= 1 ? 0 : 35,
                  }}
                  transition={{
                    duration: 0.45,
                    ease: appleEase,
                    delay: buildStep >= 1 ? index * 0.08 : 0,
                  }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-white border-2 border-neutral-200/90 shadow-sm flex items-center justify-center p-2 mb-2 group-hover:border-[#1B7ED0] transition-colors">
                    <img
                      src={app.logo}
                      alt={app.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="font-mono text-[11px] sm:text-xs font-semibold text-[#4A4A55] tracking-tight truncate max-w-[85px]">
                    {app.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Build 0: Vector Offshore Rig Rising out of the Sea */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: appleEase }}
            className="flex-shrink-0 mb-[-2px] md:pl-6"
          >
            <OffshoreRigVector />
          </motion.div>

        </div>
      </div>

    </div>
  );
}
