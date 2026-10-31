import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Binary, Sparkles, Flame, Check } from 'lucide-react';
import { fadeUp, popIn, drawSvg } from '../motion';

export default function Slide02_Philosophy() {
  return (
    <div className="h-full w-full flex flex-col justify-between p-8 md:p-14 lg:p-16 3xl:p-20 4k:p-24 relative overflow-hidden">
      {/* Category header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between relative z-10">
        <span className="px-3.5 py-1.5 3xl:px-5 3xl:py-2.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs md:text-sm 3xl:text-base font-mono text-neutral-600">
          // mental_model.svg
        </span>
        <span className="text-xs md:text-sm 3xl:text-base font-mono text-neutral-400">02 / The Symbiosis</span>
      </motion.div>

      {/* Main Infographic Stage */}
      <div className="my-auto space-y-8 lg:space-y-12 3xl:space-y-16 relative z-10">
        <motion.div variants={fadeUp} className="text-center max-w-3xl 3xl:max-w-4xl mx-auto space-y-3 3xl:space-y-5">
          <h2 className="text-4xl md:text-6xl lg:text-7xl 3xl:text-8xl 4k:text-9xl font-bold tracking-tight text-neutral-900">
            The Pilot & The Rocket.
          </h2>
          <p className="text-base md:text-xl lg:text-2xl 3xl:text-3xl text-neutral-500">
            You bring the architecture and taste. The AI brings 10,000 RPM raw horsepower.
          </p>
        </motion.div>

        {/* Dynamic SVG Synaptic Bridge Graphic */}
        <div className="max-w-5xl lg:max-w-6xl 3xl:max-w-7xl 4k:max-w-[1500px] mx-auto w-full relative">
          
          {/* Animated Connecting SVG Light Cables */}
          <div className="hidden md:block absolute top-1/2 left-32 3xl:left-48 right-32 3xl:right-48 -translate-y-1/2 h-20 -z-0 pointer-events-none">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 80" fill="none">
              <path
                d="M 20 40 C 200 10, 400 70, 580 40"
                stroke="#E2E8F0"
                strokeWidth="4"
                strokeDasharray="6 8"
              />
              <motion.path
                d="M 20 40 C 200 10, 400 70, 580 40"
                stroke="url(#synapseGrad)"
                strokeWidth="5"
                variants={drawSvg}
                custom={0.2}
              />
              <defs>
                <linearGradient id="synapseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Left Entity: Human Engineer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 3xl:gap-20 4k:gap-28 relative z-10 items-center">
            
            <motion.div 
              variants={popIn}
              initial="initial"
              animate="animate"
              whileHover={{ y: -6 }}
              className="p-8 lg:p-10 3xl:p-12 4k:p-14 rounded-3xl 4k:rounded-[40px] bg-white border border-neutral-200/90 shadow-xl shadow-neutral-100 flex flex-col space-y-6 3xl:space-y-8 relative overflow-hidden"
            >
              <div className="w-14 h-14 lg:w-16 lg:h-16 3xl:w-20 3xl:h-20 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center">
                <Lightbulb className="w-7 h-7 lg:w-8 lg:h-8 3xl:w-10 3xl:h-10" />
              </div>

              <div>
                <span className="text-xs lg:text-sm 3xl:text-base font-mono font-semibold text-violet-600 uppercase tracking-widest">
                  The Architect (Human)
                </span>
                <h3 className="text-2xl lg:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-neutral-900 mt-1">
                  Taste, Boundaries & Logic
                </h3>
              </div>

              <ul className="space-y-3 3xl:space-y-4 font-mono text-xs md:text-sm lg:text-base 3xl:text-lg 4k:text-xl text-neutral-600">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 lg:w-5 lg:h-5 3xl:w-6 3xl:h-6 text-emerald-500 shrink-0" /> 
                  <span>System decomposition & data schemas</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 lg:w-5 lg:h-5 3xl:w-6 3xl:h-6 text-emerald-500 shrink-0" /> 
                  <span>Edge case definition & threat modeling</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 lg:w-5 lg:h-5 3xl:w-6 3xl:h-6 text-emerald-500 shrink-0" /> 
                  <span>Deciding what NOT to build</span>
                </li>
              </ul>

              <div className="pt-4 3xl:pt-6 border-t border-neutral-100 text-[11px] md:text-xs lg:text-sm 3xl:text-base font-mono text-neutral-400">
                Role: Pure Strategic Direction
              </div>
            </motion.div>

            {/* Right Entity: Autonomous AI Engine */}
            <motion.div 
              variants={popIn}
              initial="initial"
              animate="animate"
              whileHover={{ y: -6 }}
              className="p-8 lg:p-10 3xl:p-12 4k:p-14 rounded-3xl 4k:rounded-[40px] bg-neutral-900 text-white shadow-2xl flex flex-col space-y-6 3xl:space-y-8 relative overflow-hidden"
            >
              <div className="w-14 h-14 lg:w-16 lg:h-16 3xl:w-20 3xl:h-20 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Binary className="w-7 h-7 lg:w-8 lg:h-8 3xl:w-10 3xl:h-10" />
              </div>

              <div>
                <span className="text-xs lg:text-sm 3xl:text-base font-mono font-semibold text-emerald-400 uppercase tracking-widest">
                  The Multi-Agent Swarm (AI)
                </span>
                <h3 className="text-2xl lg:text-3xl 3xl:text-4xl 4k:text-5xl font-bold text-white mt-1">
                  High-Speed Execution
                </h3>
              </div>

              <ul className="space-y-3 3xl:space-y-4 font-mono text-xs md:text-sm lg:text-base 3xl:text-lg 4k:text-xl text-neutral-300">
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">⚡</span> 
                  <span>1,000 LOC boilerplate in 2.4s</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">⚡</span> 
                  <span>Instant TypeScript type generation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">⚡</span> 
                  <span>Vitest regression harness synthesis</span>
                </li>
              </ul>

              <div className="pt-4 3xl:pt-6 border-t border-neutral-800 text-[11px] md:text-xs lg:text-sm 3xl:text-base font-mono text-neutral-400">
                Role: Infinite Boilerplate Crusher
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      <motion.div variants={fadeUp} className="relative z-10 text-xs md:text-sm 3xl:text-base font-mono text-neutral-400">
        Informatiq Philosophy // Empowering the Engineer
      </motion.div>
    </div>
  );
}
