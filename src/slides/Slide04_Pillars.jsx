import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Zap, AlertTriangle, Smile, Bot, Sparkles } from 'lucide-react';
import { fadeUp, popIn } from '../motion';

const levels = [
  {
    temp: '0.0',
    name: 'Deterministic Machine',
    desc: 'Writes strict regex, SQL queries, and math. Emotionless compiler.',
    mood: 'robot',
    bg: 'from-blue-50 to-cyan-50',
    color: '#3B82F6',
    border: 'border-blue-300',
  },
  {
    temp: '0.7',
    name: 'Informatiq Sweet Spot',
    desc: 'Creative architecture, writes idiomatic TypeScript, catches edge cases.',
    mood: 'smart',
    bg: 'from-emerald-50 to-teal-50',
    color: '#10B981',
    border: 'border-emerald-300',
  },
  {
    temp: '1.6',
    name: 'Overdrive / Chaos Mode',
    desc: 'Starts rhyming in iambic pentameter and invents non-existent npm packages.',
    mood: 'wild',
    bg: 'from-amber-50 to-rose-50',
    color: '#F43F5E',
    border: 'border-rose-300',
  },
];

export default function Slide04_Pillars() {
  const [levelIdx, setLevelIdx] = useState(1);
  const current = levels[levelIdx];

  return (
    <div className="h-full w-full flex flex-col justify-between p-12 md:p-20 relative overflow-hidden">
      {/* Top Bar */}
      <motion.div variants={fadeUp} className="flex items-center justify-between relative z-10">
        <span className="px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono text-neutral-600">
          // temperature_dial.tsx
        </span>
        <span className="text-xs font-mono text-neutral-400">04 / Tuning the Beast</span>
      </motion.div>

      {/* Main Interactive Stage */}
      <div className="my-auto max-w-4xl mx-auto w-full space-y-10 relative z-10">
        <div className="text-center space-y-2">
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900">
            Tuning the Engine.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-lg text-neutral-500">
            From deterministic compiler to complete creative hallucinations.
          </motion.p>
        </div>

        {/* The Interactive Interactive SVG Character Showcase */}
        <div className="flex flex-col items-center justify-center space-y-8">
          
          {/* Reactive SVG Avatar */}
          <motion.div
            key={current.temp}
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            className={`w-36 h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-tr ${current.bg} border-2 ${current.border} shadow-2xl flex flex-col items-center justify-center p-6 relative`}
          >
            {/* Morphing Animated Eyes & Smile */}
            <div className="flex items-center gap-6 mb-4">
              <motion.div
                animate={{
                  scaleY: levelIdx === 0 ? 0.3 : levelIdx === 1 ? 1 : [1, 0.2, 1],
                  rotate: levelIdx === 2 ? [0, 360] : 0,
                }}
                transition={{ duration: levelIdx === 2 ? 2 : 0.3, repeat: levelIdx === 2 ? Infinity : 0 }}
                className="w-5 h-5 rounded-full bg-neutral-900"
              />
              <motion.div
                animate={{
                  scaleY: levelIdx === 0 ? 0.3 : levelIdx === 1 ? 1 : [1, 0.2, 1],
                  rotate: levelIdx === 2 ? [0, -360] : 0,
                }}
                transition={{ duration: levelIdx === 2 ? 2 : 0.3, repeat: levelIdx === 2 ? Infinity : 0 }}
                className="w-5 h-5 rounded-full bg-neutral-900"
              />
            </div>

            {/* Mouth */}
            <motion.div
              animate={{
                width: levelIdx === 0 ? 28 : levelIdx === 1 ? 40 : 50,
                height: levelIdx === 0 ? 4 : levelIdx === 1 ? 12 : 24,
                borderRadius: levelIdx === 0 ? 2 : 12,
              }}
              className="bg-neutral-900"
            />

            <span className="absolute bottom-2 text-[10px] font-mono font-bold uppercase text-neutral-400">
              temp: {current.temp}
            </span>
          </motion.div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-3 p-1.5 bg-neutral-100 rounded-full border border-neutral-200">
            {levels.map((lvl, idx) => (
              <button
                key={lvl.temp}
                onClick={() => setLevelIdx(idx)}
                className={`px-5 py-2 rounded-full font-mono text-xs font-semibold transition-all cursor-pointer ${
                  levelIdx === idx
                    ? 'bg-neutral-900 text-white shadow-md'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                {lvl.name.split(' ')[0]} ({lvl.temp})
              </button>
            ))}
          </div>

          {/* Dynamic Description Box */}
          <motion.div
            key={`desc-${current.temp}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-lg"
          >
            <h4 className="text-xl font-bold text-neutral-900 mb-1">{current.name}</h4>
            <p className="text-sm font-mono text-neutral-500 leading-relaxed">{current.desc}</p>
          </motion.div>
        </div>
      </div>

      <motion.div variants={fadeUp} className="relative z-10 text-xs font-mono text-neutral-400 text-center">
        Toggle presets to see reactive SVG emotion states
      </motion.div>
    </div>
  );
}
