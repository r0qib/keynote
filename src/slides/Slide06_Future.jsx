import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, ArrowUpRight, Rocket } from 'lucide-react';
import { fadeUp, popIn, bouncierSpring } from '../motion';

const particles = [
  { id: 1, text: '🚀', x: -220, y: -130 },
  { id: 2, text: '⚡', x: 230, y: -120 },
  { id: 3, text: '✨', x: -260, y: 100 },
  { id: 4, text: '🔥', x: 270, y: 110 },
  { id: 5, text: '💻', x: 0, y: -180 },
  { id: 6, text: '🎉', x: 0, y: 180 },
];

export default function Slide06_Future() {
  const [celebrated, setCelebrated] = useState(false);

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 md:p-14 lg:p-16 3xl:p-20 4k:p-24 relative overflow-hidden select-none">
      {/* Background Soft Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] 3xl:w-[1000px] h-[700px] 3xl:h-[1000px] bg-gradient-to-tr from-violet-100 via-emerald-50 to-pink-100 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Tag */}
      <motion.div variants={fadeUp} className="relative z-10 flex items-center justify-between">
        <span className="px-3.5 py-1.5 3xl:px-5 3xl:py-2.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs md:text-sm 3xl:text-base font-mono text-neutral-600">
          // closing_keynote.sh
        </span>
        <span className="text-xs md:text-sm 3xl:text-base font-mono text-neutral-400">06 / Go Build</span>
      </motion.div>

      {/* Center Kinetic Typography Climax */}
      <div className="my-auto max-w-4xl lg:max-w-5xl 3xl:max-w-6xl 4k:max-w-7xl mx-auto text-center space-y-8 lg:space-y-12 3xl:space-y-16 relative z-10">
        <div className="space-y-4 3xl:space-y-6">
          <motion.h2
            variants={fadeUp}
            className="text-6xl md:text-8xl lg:text-9xl 3xl:text-[130px] 4k:text-[150px] font-black tracking-tight text-neutral-900 leading-[0.95]"
          >
            Less Glue Code. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600">
              More Magic.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-2xl lg:text-3xl 3xl:text-4xl text-neutral-500 max-w-2xl lg:max-w-3xl 3xl:max-w-5xl mx-auto font-normal leading-relaxed"
          >
            AI didn’t make engineering boring. It took away the boring parts so we can build what matters.
          </motion.p>
        </div>

        {/* Interactive Kinetic Trigger */}
        <div className="relative inline-block">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setCelebrated((prev) => !prev)}
            className="px-8 py-4 lg:px-10 lg:py-5 3xl:px-12 3xl:py-6 rounded-full bg-neutral-900 text-white font-mono text-sm md:text-base lg:text-lg 3xl:text-xl font-semibold shadow-2xl hover:bg-neutral-800 transition-all cursor-pointer flex items-center gap-3 mx-auto"
          >
            <Rocket className="w-4 h-4 lg:w-5 lg:h-5 3xl:w-6 3xl:h-6 text-emerald-400" />
            <span>{celebrated ? 'Engineering Recharged!' : 'Fire the Engines'}</span>
          </motion.button>

          {/* Burst Particles */}
          <AnimatePresence>
            {celebrated && (
              <>
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ scale: 0, x: 0, y: 0 }}
                    animate={{ scale: 1.6, x: p.x, y: p.y }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={bouncierSpring}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl lg:text-4xl 3xl:text-5xl pointer-events-none"
                  >
                    {p.text}
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Speaker Footer */}
      <motion.div variants={fadeUp} className="relative z-10 flex items-center justify-between text-xs md:text-sm 3xl:text-base font-mono text-neutral-400 pt-6 border-t border-neutral-200/80">
        <div>Informatiq Tech Talks • 2026</div>
        <div className="flex items-center gap-2 text-neutral-800 font-semibold">
          <span>Q&A Time</span>
          <ArrowUpRight className="w-4 h-4 3xl:w-5 3xl:h-5" />
        </div>
      </motion.div>
    </div>
  );
}
