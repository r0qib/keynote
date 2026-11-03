import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Clock, AlertTriangle, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { fadeUp } from '../motion.js';

// Act accent colors matching design system
const ACT_COLORS = {
  Opening: '#1B7ED0',
  Good: '#1E9E6A',
  Poll: '#111113', // Neutral ink dot: interlude sits between acts and belongs to none
  Bad: '#D97706',
  Ugly: '#E5484D',
  'Making Good': '#1B7ED0',
  Finale: '#1B7ED0',
};

export default function PlaceholderSlide({ activeSlide, buildStep = 0 }) {
  const slide = activeSlide || {
    id: 'S??',
    title: 'Slide Pending Implementation',
    act: 'Opening',
    cornerLabel: '',
    cutTier: null,
    durationMinutes: 1.0,
    totalBuilds: 0,
    componentName: 'PendingComponent',
    notes: 'Placeholder notes.',
  };

  const actColor = slide.dotColor || ACT_COLORS[slide.act] || '#1B7ED0';

  return (
    <div className="w-full h-full flex flex-col justify-between p-12 md:p-16 lg:p-20 relative bg-[#FAFAFB] text-[#111113] overflow-hidden select-none">
      {/* Top Meta Bar */}
      <motion.div variants={fadeUp} initial="initial" animate="animate" className="flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          {/* Act Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border-2 border-neutral-200 text-xs md:text-sm font-semibold tracking-wide">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: actColor }} />
            <span className="text-[#111113]">Act: {slide.act}</span>
          </div>

          {/* Slide ID Pill */}
          <div className="px-3 py-1.5 rounded-full bg-neutral-900 text-white font-mono text-xs md:text-sm font-bold">
            {slide.id}
          </div>

          {/* Cut Tier (if applicable) */}
          {slide.cutTier && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold border-2 ${
              slide.cutTier === 'A'
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-orange-50 text-orange-800 border-orange-300'
            }`}>
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Cut Tier {slide.cutTier}</span>
            </div>
          )}
        </div>

        {/* Duration & Corner badge */}
        <div className="flex items-center gap-4 text-xs md:text-sm font-mono text-[#4A4A55]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-neutral-500" />
            <span>{slide.durationMinutes ? `${slide.durationMinutes} min` : '—'}</span>
          </div>
          {slide.cornerLabel && (
            <div className="px-3 py-1 rounded bg-neutral-200/70 text-neutral-700 font-mono">
              {slide.cornerLabel}
            </div>
          )}
        </div>
      </motion.div>

      {/* Center Stage: Title & Blueprint Box */}
      <div className="my-auto max-w-5xl z-10 space-y-8">
        <motion.div variants={fadeUp} initial="initial" animate="animate" transition={{ delay: 0.1 }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111113] leading-[1.15]">
            {slide.title}
          </h1>
        </motion.div>

        {/* Multi-step Build Indicator */}
        {slide.totalBuilds > 0 && (
          <motion.div 
            variants={fadeUp} 
            initial="initial" 
            animate="animate" 
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 pt-2"
          >
            <span className="text-xs font-mono font-semibold text-[#4A4A55] uppercase tracking-wider">
              Build Steps ({buildStep} / {slide.totalBuilds}):
            </span>
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full border-2 transition-all ${
                buildStep === 0 ? 'bg-neutral-900 border-neutral-900 scale-110' : 'bg-neutral-300 border-neutral-400'
              }`} title="Initial State (0)" />
              {Array.from({ length: slide.totalBuilds }).map((_, idx) => {
                const stepNum = idx + 1;
                const isCurrent = buildStep === stepNum;
                const isPassed = buildStep > stepNum;
                return (
                  <React.Fragment key={idx}>
                    <div className="w-4 h-[2px] bg-neutral-300" />
                    <span
                      className={`w-3 h-3 rounded-full border-2 transition-all ${
                        isCurrent
                          ? 'border-neutral-900 bg-neutral-900 scale-125'
                          : isPassed
                          ? 'border-neutral-700 bg-neutral-700'
                          : 'border-neutral-300 bg-white'
                      }`}
                      title={`Build Step ${stepNum}`}
                    />
                  </React.Fragment>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Blueprint Placeholder Card */}
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ delay: 0.25 }}
          className="p-6 md:p-8 rounded-2xl border-2 border-dashed border-neutral-300 bg-white/70 backdrop-blur-sm space-y-4 max-w-3xl"
        >
          <div className="flex items-center justify-between text-xs font-mono text-[#4A4A55]">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-neutral-600" />
              <span>COMPONENT: <code className="text-neutral-900 font-bold">src/slides/{slide.componentName}.jsx</code></span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-300 font-semibold text-neutral-600">
              Awaiting Batch Pass
            </span>
          </div>

          <p className="text-sm md:text-base text-[#4A4A55] font-sans leading-relaxed">
            {slide.notes || 'No presenter notes registered for this slide.'}
          </p>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 pt-2 border-t border-neutral-200">
            <span>AntiGravity Autonomous Slide Engine</span>
            <span>•</span>
            <span>100% Verified Build Gate</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Info Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 border-t border-neutral-200/80 pt-4 z-10">
        <div>InformatiQ · AI-Assisted Development</div>
        <div>Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700 font-semibold">→</kbd> or <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700 font-semibold">Space</kbd> to advance</div>
      </div>
    </div>
  );
}
