import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, ArrowUpRight, Rocket } from 'lucide-react';
import { fadeUp, popIn, bouncierSpring } from '../motion';

const particles = [
  { id: 1, text: '🚀', x: -140, y: -90 },
  { id: 2, text: '⚡', x: 150, y: -80 },
  { id: 3, text: '✨', x: -180, y: 70 },
  { id: 4, text: '🔥', x: 190, y: 80 },
  { id: 5, text: '💻', x: 0, y: -130 },
  { id: 6, text: '🎉', x: 0, y: 130 },
];

export default function Slide06_Future() {
  const [celebrated, setCelebrated] = useState(false);

  return (
    <div className="h-full w-full flex flex-col justify-between p-12 md:p-20 relative overflow-hidden select-none">
      {/* Background Soft Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-violet-100 via-emerald-50 to-pink-100 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Top Tag */}
      <motion.div variants={fadeUp} className="relative z-10 flex items-center justify-between">
        <span className="px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600">
          // closing_keynote.sh
        </span>
        <span className="text-xs font-mono text-neutral-400">06 / Go Build</span>
      </motion.div>

      {/* Center Kinetic Typography Climax */}
      <div className="my-auto max-w-4xl mx-auto text-center space-y-10 relative z-10">
        <div className="space-y-4">
          <motion.h2
            variants={fadeUp}
            className="text-6xl md:text-9xl font-black tracking-tight text-neutral-900 leading-[0.95]"
          >
            Less Glue Code. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600">
              More Magic.
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-neutral-500 max-w-2xl mx-auto font-normal leading-relaxed"
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
            className="px-8 py-4 rounded-full bg-neutral-900 text-white font-mono text-sm font-semibold shadow-2xl hover:bg-neutral-800 transition-all cursor-pointer flex items-center gap-3 mx-auto"
          >
            <Rocket className="w-4 h-4 text-emerald-400" />
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
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl pointer-events-none"
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
      <motion.div variants={fadeUp} className="relative z-10 flex items-center justify-between text-xs font-mono text-neutral-400 pt-6 border-t border-neutral-200/80">
        <div>Informatiq Tech Talks • 2026</div>
        <div className="flex items-center gap-2 text-neutral-800 font-semibold">
          <span>Q&A Time</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </motion.div>
    </div>
  );
}
