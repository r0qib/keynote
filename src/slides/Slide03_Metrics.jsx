import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Wand2 } from 'lucide-react';
import { fadeUp, popIn, bouncierSpring } from '../motion';

const painPoints = [
  { id: 1, text: 'Regex for email validation', x: -380, y: -100, resolved: 'Automated Parser' },
  { id: 2, text: 'Webpack 4 to Vite migration', x: 380, y: -90, resolved: 'Codemod Agent' },
  { id: 3, text: 'Missing TypeScript types', x: -440, y: 50, resolved: 'Zero-Any Types' },
  { id: 4, text: 'Docker network port conflicts', x: 440, y: 60, resolved: 'Isolated Sandboxes' },
  { id: 5, text: 'Mocking 50 GraphQL queries', x: -250, y: 170, resolved: 'Synthetic Test Data' },
  { id: 6, text: 'Resolving rebase conflicts', x: 250, y: 170, resolved: 'AST Merge Engine' },
];

export default function Slide03_Metrics() {
  const [resolved, setResolved] = useState(false);

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 md:p-14 lg:p-16 3xl:p-20 4k:p-24 relative overflow-hidden select-none">
      {/* Top Tag */}
      <motion.div variants={fadeUp} className="flex items-center justify-between relative z-20">
        <span className="px-3.5 py-1.5 3xl:px-5 3xl:py-2.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs md:text-sm 3xl:text-base font-mono text-neutral-600">
          // physics_playground.tsx
        </span>
        <span className="text-xs md:text-sm 3xl:text-base font-mono text-neutral-400">03 / Friction to Flow</span>
      </motion.div>

      {/* Main Kinetic Playground */}
      <div className="my-auto relative z-10 flex flex-col items-center justify-center w-full h-[460px] lg:h-[540px] 3xl:h-[620px]">
        
        {/* Title */}
        <motion.div variants={fadeUp} className="text-center space-y-2 mb-10 lg:mb-14 3xl:mb-16">
          <h2 className="text-4xl md:text-6xl lg:text-7xl 3xl:text-8xl 4k:text-9xl font-black tracking-tight text-neutral-900">
            {resolved ? 'Pure Engineering Flow.' : 'Friday Night Chaos.'}
          </h2>
          <p className="text-base md:text-lg lg:text-xl 3xl:text-2xl text-neutral-500 font-mono">
            {resolved
              ? '✓ 6 common developer headaches automated by agents in the background.'
              : '// The trivial toil that used to drain your cognitive battery.'}
          </p>
        </motion.div>

        {/* Central Magnetized Core */}
        <div className="relative flex items-center justify-center">
          
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setResolved((prev) => !prev)}
            className={`w-32 h-32 md:w-36 md:h-36 lg:w-44 lg:h-44 3xl:w-48 3xl:h-48 rounded-full flex flex-col items-center justify-center gap-2 shadow-2xl transition-all cursor-pointer relative z-30 ${
              resolved
                ? 'bg-emerald-500 text-white shadow-emerald-300/60 ring-8 ring-emerald-100'
                : 'bg-neutral-900 text-white shadow-neutral-400/50 hover:bg-neutral-800'
            }`}
          >
            {resolved ? <Sparkles className="w-8 h-8 lg:w-11 lg:h-11 animate-spin" /> : <Wand2 className="w-8 h-8 lg:w-11 lg:h-11" />}
            <span className="text-[11px] lg:text-xs 3xl:text-sm font-mono font-bold tracking-wider uppercase text-center px-3">
              {resolved ? 'Reset' : 'Dissolve Toil'}
            </span>
          </motion.button>

          {/* Floating Pain Point Debris animating with Framer Motion Physics */}
          {painPoints.map((item, idx) => (
            <motion.div
              key={item.id}
              drag
              dragConstraints={{ left: -600, right: 600, top: -280, bottom: 280 }}
              whileDrag={{ scale: 1.15 }}
              initial={{ x: item.x, y: item.y, opacity: 0, scale: 0.8 }}
              animate={
                resolved
                  ? {
                      x: Math.cos((idx * 2 * Math.PI) / painPoints.length) * 360,
                      y: Math.sin((idx * 2 * Math.PI) / painPoints.length) * 125 + 15,
                      opacity: 1,
                      scale: 1,
                      backgroundColor: '#FFFFFF',
                      borderColor: '#10B981',
                      color: '#065F46',
                    }
                  : {
                      x: item.x,
                      y: [item.y - 8, item.y + 8, item.y - 8],
                      opacity: 1,
                      scale: [0.98, 1.02, 0.98],
                      backgroundColor: '#F3F4F6',
                      borderColor: '#E5E7EB',
                      color: '#4B5563',
                    }
              }
              transition={
                resolved
                  ? bouncierSpring
                  : {
                      y: {
                        duration: 3 + idx * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                      scale: {
                        duration: 3 + idx * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                      opacity: { duration: 0.35 },
                    }
              }
              className="absolute z-20 px-4 py-2.5 lg:px-6 lg:py-3.5 3xl:px-7 3xl:py-4 rounded-2xl border shadow-sm font-mono text-xs md:text-sm lg:text-base 3xl:text-lg cursor-grab active:cursor-grabbing flex items-center gap-2.5"
            >
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${resolved ? 'bg-emerald-500' : 'bg-rose-400'}`} />
              <span className="font-semibold whitespace-nowrap">{resolved ? item.resolved : item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div variants={fadeUp} className="relative z-10 flex items-center justify-between text-xs md:text-sm 3xl:text-base font-mono text-neutral-400">
        <div>Click the orb to trigger Framer Motion spring physics</div>
        <div>Draggable playground items</div>
      </motion.div>
    </div>
  );
}
