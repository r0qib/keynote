import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize, 
  Minimize, 
  LayoutGrid, 
  Monitor,
  ExternalLink
} from 'lucide-react';
import { slideVariants, appleEase } from './motion.js';
import { getSlideCornerBadge } from './slides/manifest.js';
import { getSlideComponent } from './slides/registry.js';
import { usePresentationSync } from './hooks/usePresentationSync.js';
import PresenterView from './components/PresenterView.jsx';
import SlideNavigatorModal from './components/SlideNavigatorModal.jsx';
import SlideErrorBoundary from './components/SlideErrorBoundary.jsx';

// Act accent colors matching design system (Rule 4.1)
const ACT_COLORS = {
  Opening: '#1B7ED0',
  Good: '#1E9E6A',
  Poll: '#111113', // Neutral ink dot: interlude sits between acts and belongs to none
  Bad: '#D97706',
  Ugly: '#E5484D',
  'Making Good': '#1B7ED0',
  Finale: '#1B7ED0',
};

function checkIsPresenterMode() {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname;
  const search = new URLSearchParams(window.location.search);
  const hash = window.location.hash;

  return (
    path.startsWith('/presenter') ||
    search.get('presenter') === 'true' ||
    search.has('presenter') ||
    hash.includes('presenter')
  );
}

export default function App() {
  const sync = usePresentationSync();
  const [isPresenter, setIsPresenter] = useState(checkIsPresenterMode);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isDockHovered, setIsDockHovered] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__informatiqSync = sync;
    }
  }, [sync]);

  const openPresenterView = useCallback(() => {
    window.open('/?presenter=true', 'informatiq-presenter', 'width=1440,height=900');
  }, []);

  // Monitor URL changes for presenter mode
  useEffect(() => {
    const handleUrlChange = () => {
      setIsPresenter(checkIsPresenterMode());
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation for Audience View
  useEffect(() => {
    if (isPresenter) return;

    const handleKeyDown = (e) => {
      if (['input', 'textarea'].includes(e.target.tagName.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key === 'Enter') {
        e.preventDefault();
        sync.nextBuildOrSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        e.preventDefault();
        sync.prevBuildOrSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'o' || e.key === 'O') {
        e.preventDefault();
        setShowOverview((prev) => !prev);
      } else if (e.key === 'Escape') {
        setShowOverview(false);
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        openPresenterView();
      } else if (e.key === 'Home') {
        e.preventDefault();
        sync.goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        sync.goToSlide(sync.totalSlides - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPresenter, sync, toggleFullscreen]);

  // If in presenter mode, render PresenterView
  if (isPresenter) {
    return <PresenterView sync={sync} />;
  }

  // --- Audience Presentation View ---
  const { activeSlide, activeSlideIndex, totalSlides, buildStep, direction } = sync;
  const ActiveSlideComponent = getSlideComponent(activeSlide?.componentName);
  const progressPercent = ((activeSlideIndex + 1) / totalSlides) * 100;
  const cornerBadge = getSlideCornerBadge(activeSlideIndex);
  const actColor = activeSlide?.dotColor || ACT_COLORS[activeSlide?.act] || '#1B7ED0';

  return (
    <div className="relative w-screen h-screen bg-[#000000] flex items-center justify-center p-2 sm:p-3 overflow-hidden select-none">
      
      {/* 
        16:9 Presentation Canvas
        Teams Screen-Share Optimized:
        - Solid #FAFAFB canvas, no repeating dot patterns
        - Sleek, thin black bezel
        - Fits viewport without page scrollbars
      */}
      <main className="w-full max-w-[calc((100vh-1.5rem)*16/9)] max-h-full aspect-video bg-[#FAFAFB] slide-canvas relative rounded-2xl md:rounded-[28px] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)] overflow-hidden flex flex-col">
        
        {/* Floating Top-Center Inset Progress Bar */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 md:w-48 h-1 md:h-1.5 bg-neutral-200/60 rounded-full overflow-hidden z-30 pointer-events-none">
          <motion.div 
            className="h-full bg-neutral-900 rounded-full"
            initial={false}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        {/* Top-Right Corner Label (Omitted on unbadged slides: S01, chapter cards S05, S10, S17, S25, S43) */}
        {cornerBadge && (
          <div className="absolute top-5 right-7 z-30 flex items-center gap-2 font-mono text-xs md:text-sm tracking-wide text-[#4A4A55] pointer-events-none">
            <span 
              className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
              style={{ backgroundColor: actColor }} 
            />
            <span className="font-semibold">{cornerBadge}</span>
          </div>
        )}

        {/* Slide Content with Immediate Mount & Clean Transition */}
        <motion.div
          key={activeSlide?.id || activeSlideIndex}
          initial={{ opacity: 0, x: direction > 0 ? 16 : -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.18, ease: appleEase }}
          className="w-full h-full absolute inset-0"
        >
          <SlideErrorBoundary
            slideId={activeSlide?.id || `slide-${activeSlideIndex}`}
            buildStep={buildStep}
          >
            <ActiveSlideComponent
              activeSlide={activeSlide}
              buildStep={buildStep}
            />
          </SlideErrorBoundary>
        </motion.div>
      </main>

      {/* 
        Auto-Hiding Floating Dock at Bottom
        Hovering the bottom edge reveals the dock smoothly
      */}
      <div 
        onMouseEnter={() => setIsDockHovered(true)}
        onMouseLeave={() => setIsDockHovered(false)}
        className="fixed bottom-0 left-0 right-0 h-16 z-50 flex items-end justify-center pb-3"
      >
        <motion.footer
          initial={false}
          animate={{
            y: isDockHovered ? 0 : 44,
            opacity: isDockHovered ? 1 : 0,
            scale: isDockHovered ? 1 : 0.95,
          }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-xl border border-neutral-300/80 shadow-2xl text-neutral-700 pointer-events-auto"
        >
          {/* Previous Button */}
          <button
            onClick={sync.prevBuildOrSlide}
            disabled={activeSlideIndex === 0 && buildStep === 0}
            aria-label="Previous step / slide"
            className="p-1.5 rounded-full hover:bg-neutral-100 disabled:opacity-25 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Slide Index Modal Button */}
          <button 
            onClick={() => setShowOverview(true)}
            title="Open Slide Navigator (O)"
            className="px-2.5 text-xs font-mono font-semibold text-neutral-700 hover:text-neutral-900 transition-colors cursor-pointer"
          >
            {String(activeSlideIndex + 1).padStart(2, '0')} <span className="text-neutral-300">/</span> {String(totalSlides).padStart(2, '0')}
          </button>

          {/* Next Button */}
          <button
            onClick={sync.nextBuildOrSlide}
            disabled={activeSlideIndex === totalSlides - 1 && buildStep === (activeSlide?.totalBuilds || 0)}
            aria-label="Next step / slide"
            className="p-1.5 rounded-full hover:bg-neutral-100 disabled:opacity-25 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="w-[1px] h-3.5 bg-neutral-200 mx-1" />

          {/* Slide Navigator Modal Button */}
          <button
            onClick={() => setShowOverview(true)}
            title="Slide Navigator (O)"
            className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-neutral-900 cursor-pointer"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          {/* Open Presenter View Button */}
          <button
            onClick={openPresenterView}
            title="Open Presenter View in new window"
            className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-neutral-900 cursor-pointer flex items-center gap-1"
          >
            <Monitor className="w-4 h-4 text-blue-600" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen (F)"
            className="p-1.5 rounded-full hover:bg-neutral-100 transition-colors text-neutral-500 hover:text-neutral-900 cursor-pointer"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </motion.footer>
      </div>

      {/* Slide Navigator Modal */}
      <SlideNavigatorModal
        isOpen={showOverview}
        onClose={() => setShowOverview(false)}
        activeSlides={sync.activeSlides}
        currentIndex={activeSlideIndex}
        onSelectSlide={(idx) => sync.goToSlide(idx)}
      />
    </div>
  );
}
