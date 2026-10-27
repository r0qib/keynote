import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw, Wand2 } from 'lucide-react';
import { fadeUp, popIn, bouncierSpring } from '../motion';

const painPoints = [
  { id: 1, text: 'Regex for email validation', x: -280, y: -110, resolved: 'Automated Parser' },
  { id: 2, text: 'Webpack 4 to Vite migration', x: 260, y: -90, resolved: 'Codemod Agent' },
  { id: 3, text: 'Missing TypeScript types', x: -240, y: 100, resolved: 'Zero-Any Types' },
  { id: 4, text: 'Docker network port conflicts', x: 230, y: 110, resolved: 'Isolated Sandboxes' },
  { id: 5, text: 'Mocking 50 GraphQL queries', x: 0, y: -150, resolved: 'Synthetic Test Data' },
  { id: 6, text: 'Resolving rebase conflicts', x: 0, y: 150, resolved: 'AST Merge Engine' },
];

export default function Slide03_Metrics() {
  const [resolved, setResolved] = useState(false);

  return (
    <div className="h-full w-full flex flex-col justify-between p-12 md:p-20 relative overflow-hidden select-none">
      {/* Top Tag */}
      <motion.div variants={fadeUp} className="flex items-center justify-between relative z-20">
        <span className="px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600">
          // physics_playground.tsx
        </span>
        <span className="text-xs font-mono text-neutral-400">03 / Friction to Flow</span>
      </motion.div>

      {/* Main Kinetic Playground */}
      <div className="my-auto relative z-10 flex flex-col items-center justify-center w-full h-[440px]">
        
        {/* Title */}
        <motion.div variants={fadeUp} className="text-center space-y-2 mb-6">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-neutral-900">
            {resolved ? 'Pure Engineering Flow.' : 'Friday Night Chaos.'}
          </h2>
          <p className="text-base md:text-lg text-neutral-500 font-mono">
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
            className={`w-28 h-28 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center gap-1.5 shadow-2xl transition-all cursor-pointer relative z-30 ${
              resolved
                ? 'bg-emerald-500 text-white shadow-emerald-300/60 ring-8 ring-emerald-100'
                : 'bg-neutral-900 text-white shadow-neutral-400/50 hover:bg-neutral-800'
            }`}
          >
            {resolved ? <Sparkles className="w-8 h-8 animate-spin" /> : <Wand2 className="w-8 h-8" />}
            <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-center px-2">
              {resolved ? 'Reset' : 'Dissolve Toil'}
            </span>
          </motion.button>

          {/* Floating Pain Point Debris animating with Framer Motion Physics */}
          {painPoints.map((item, idx) => (
            <motion.div
              key={item.id}
              drag
              dragConstraints={{ left: -320, right: 320, top: -160, bottom: 160 }}
              whileDrag={{ scale: 1.15 }}
              animate={
                resolved
                  ? {
                      x: Math.cos((idx * 2 * Math.PI) / painPoints.length) * 190,
                      y: Math.sin((idx * 2 * Math.PI) / painPoints.length) * 140,
                      scale: 1,
                      backgroundColor: '#FFFFFF',
                      borderColor: '#10B981',
                      color: '#065F46',
                    }
                  : {
                      x: item.x,
                      y: item.y,
                      scale: [0.98, 1.02, 0.98],
                      backgroundColor: '#F3F4F6',
                      borderColor: '#E5E7EB',
                      color: '#4B5563',
                      transition: {
                        duration: 3 + idx * 0.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }
              }
              transition={bouncierSpring}
              className="absolute z-20 px-4 py-2.5 rounded-2xl border shadow-sm font-mono text-xs cursor-grab active:cursor-grabbing flex items-center gap-2"
            >
              <span className={`w-2 h-2 rounded-full ${resolved ? 'bg-emerald-500' : 'bg-rose-400'}`} />
              <span className="font-semibold">{resolved ? item.resolved : item.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div variants={fadeUp} className="relative z-10 flex items-center justify-between text-xs font-mono text-neutral-400">
        <div>Click the orb to trigger Framer Motion spring physics</div>
        <div>Draggable playground items</div>
      </motion.div>
    </div>
  );
}
