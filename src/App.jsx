import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  LayoutGrid, 
  X 
} from 'lucide-react';
import { slideVariants } from './motion';

// Slide imports
import Slide01_Title from './slides/Slide01_Title';
import Slide02_Philosophy from './slides/Slide02_Philosophy';
import Slide03_Metrics from './slides/Slide03_Metrics';
import Slide04_Pillars from './slides/Slide04_Pillars';
import Slide05_Workflow from './slides/Slide05_Workflow';
import Slide06_Future from './slides/Slide06_Future';

const slides = [
  { id: 1, title: 'Living Orb // Keynote Opener', component: Slide01_Title },
  { id: 2, title: 'Synaptic Bridge // Mental Model', component: Slide02_Philosophy },
  { id: 3, title: 'Kinetic Chaos // Friday Night Toil', component: Slide03_Metrics },
  { id: 4, title: 'Temperature Dial // Tuning the Engine', component: Slide04_Pillars },
  { id: 5, title: 'Agent Swarm // Autonomous Network', component: Slide05_Workflow },
  { id: 6, title: 'Kinetic Finale // Less Glue Code', component: Slide06_Future },
];

export default function App() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isDockHovered, setIsDockHovered] = useState(false);

  const total = slides.length;

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < total) {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
      setShowOverview(false);
    }
  }, [current, total]);

  const nextSlide = useCallback(() => {
    if (current < total - 1) {
      setDirection(1);
      setCurrent((prev) => prev + 1);
    }
  }, [current, total]);

  const prevSlide = useCallback(() => {
    if (current > 0) {
      setDirection(-1);
      setCurrent((prev) => prev - 1);
    }
  }, [current]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['input', 'textarea'].includes(e.target.tagName.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key === 'Enter') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'o' || e.key === 'O' || e.key === 'Escape') {
        setShowOverview((prev) => !prev);
      } else if (e.key === 'Home') {
        goToSlide(0);
      } else if (e.key === 'End') {
        goToSlide(total - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, goToSlide, total]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const ActiveSlideComponent = slides[current].component;
  const progressPercent = ((current + 1) / total) * 100;

  return (
    <div className="relative w-screen h-screen bg-[#000000] flex items-center justify-center p-3 md:p-5 overflow-hidden select-none">
      
      {/* 
        MacBook Liquid-Retina Style Screen Canvas 
        Curved corners: rounded-[28px] md:rounded-[36px]
        Framed seamlessly against pure black outer bezel
        Pure CSS 16:9 widescreen: fits both width and height dynamically!
      */}
      <main className="w-full max-w-[calc((100vh-2.5rem)*16/9)] max-h-full aspect-video bg-[#FAFAFB] slide-canvas relative rounded-[28px] md:rounded-[36px] shadow-[0_25px_85px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] overflow-hidden flex flex-col">
        
        {/* 
          Floating Inset Progress Indicator 
          Inset from top with padding, perfectly rounded pill, never cuts corners!
        */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 w-32 3xl:w-48 h-1 3xl:h-1.5 bg-neutral-200/50 rounded-full overflow-hidden z-30 pointer-events-none">
          <motion.div 
            className="h-full bg-neutral-900 rounded-full"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        {/* Slide Content with AnimatePresence */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full absolute inset-0"
          >
            <ActiveSlideComponent />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 
        Auto-Hiding macOS-Style Floating Dock 
        Hover zone at the bottom edge reveals the dock smoothly
      */}
      <div 
        onMouseEnter={() => setIsDockHovered(true)}
        onMouseLeave={() => setIsDockHovered(false)}
        className="fixed bottom-0 left-0 right-0 h-20 z-50 flex items-end justify-center pb-5"
      >
        <motion.footer
          initial={false}
          animate={{
            y: isDockHovered ? 0 : 48,
            opacity: isDockHovered ? 1 : 0,
            scale: isDockHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-neutral-200/90 shadow-2xl text-neutral-700 pointer-events-auto"
        >
          <button
            onClick={prevSlide}
            disabled={current === 0}
            aria-label="Previous slide"
            className="p-1.5 rounded-full hover:bg-neutral-100 disabled:opacity-25 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button 
            onClick={() => setShowOverview(true)}
            className="px-2.5 text-xs font-mono font-semibold text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            {String(current + 1).padStart(2, '0')} <span className="text-neutral-300">/</span> {String(total).padStart(2, '0')}
          </button>

          <button
            onClick={nextSlide}
            disabled={current === total - 1}
            aria-label="Next slide"
            className="p-1.5 rounded-full hover:bg-neutral-100 disabled:opacity-25 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-3.5 bg-neutral-200 mx-1" />

          <button
            onClick={() => setShowOverview(true)}
            title="Slide Overview (O)"
            className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-neutral-900 cursor-pointer"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            title="Fullscreen (F)"
            className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-neutral-900 cursor-pointer"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </motion.footer>
      </div>

      {/* Slide Navigator Modal */}
      <AnimatePresence>
        {showOverview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-6"
            onClick={() => setShowOverview(false)}
          >
            <motion.div
              initial={{ scale: 0.94, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAFAFB] rounded-3xl p-8 max-w-4xl w-full max-h-[85vh] overflow-y-auto border border-neutral-200 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-6 border-b border-neutral-200/80 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-neutral-900">Slide Navigator</h3>
                  <p className="text-xs text-neutral-500 font-mono">Jump to any playground slide</p>
                </div>
                <button
                  onClick={() => setShowOverview(false)}
                  className="p-2 rounded-full hover:bg-neutral-200/60 text-neutral-600 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {slides.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => goToSlide(idx)}
                    className={`text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                      current === idx 
                        ? 'border-neutral-900 bg-neutral-900 text-white shadow-lg' 
                        : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-800'
                    }`}
                  >
                    <div className="text-xs font-mono mb-2 opacity-50">SLIDE {String(idx + 1).padStart(2, '0')}</div>
                    <div className="text-sm font-semibold truncate">{s.title}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
