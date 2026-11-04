import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Layers, AlertTriangle } from 'lucide-react';
import { actAccent } from '../theme.js';

export default function SlideNavigatorModal({
  isOpen,
  onClose,
  activeSlides,
  currentIndex,
  onSelectSlide,
}) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
      >
        <motion.div
          initial={{ scale: 0.95, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#FAFAFB] text-[#111113] rounded-3xl p-6 md:p-8 max-w-5xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-neutral-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-neutral-200">
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Slide Navigator</h2>
              <p className="text-xs md:text-sm text-[#4A4A55] font-mono mt-0.5">
                {activeSlides.length} Active Slides · Click any slide to jump immediately
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-neutral-200/80 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
              aria-label="Close Navigator"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Grid of Slides */}
          <div className="overflow-y-auto py-5 pr-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 flex-1">
            {activeSlides.map((slide, idx) => {
              const isSelected = idx === currentIndex;
              const actColor = actAccent(slide.act);

              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    onSelectSlide(idx);
                    onClose();
                  }}
                  className={`text-left p-4 rounded-xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                      : 'border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-sm text-[#111113]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: isSelected ? '#FFFFFF' : actColor }}
                      />
                      <span className={`text-xs font-mono font-bold ${isSelected ? 'text-neutral-300' : 'text-neutral-500'}`}>
                        {String(idx + 1).padStart(2, '0')} · {slide.id}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {slide.cutTier && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded font-mono ${
                            isSelected
                              ? 'bg-amber-400 text-neutral-950'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          Tier {slide.cutTier}
                        </span>
                      )}
                      <span className={`text-[11px] font-mono flex items-center gap-1 ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                        <Clock className="w-3 h-3" />
                        {slide.durationMinutes}m
                      </span>
                    </div>
                  </div>

                  <div className="text-sm font-semibold leading-snug line-clamp-2">
                    {slide.title}
                  </div>

                  <div className="flex items-center justify-between w-full pt-1 border-t border-neutral-200/40 text-[11px] font-mono">
                    <span className={isSelected ? 'text-neutral-400' : 'text-neutral-500'}>
                      {slide.act}
                    </span>
                    {slide.totalBuilds > 0 && (
                      <span className={isSelected ? 'text-neutral-400' : 'text-neutral-500'}>
                        {slide.totalBuilds} {slide.totalBuilds === 1 ? 'build' : 'builds'}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-mono text-neutral-500">
            <span>Shortcut: Press <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-700 font-semibold">O</kbd> to toggle</span>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
