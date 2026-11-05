import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, Minimize, LayoutGrid, Monitor } from 'lucide-react';
import { slideTransition } from './motion.js';
import { actAccent, resolveCanvas } from './theme.js';
import { getSlideCornerBadge } from './slides/manifest.js';
import { getSlideComponent } from './slides/registry.js';
import { usePresentationSync } from './hooks/usePresentationSync.js';
import PresenterView from './components/PresenterView.jsx';
import SlideNavigatorModal from './components/SlideNavigatorModal.jsx';
import SlideErrorBoundary from './components/SlideErrorBoundary.jsx';
import Stage from './components/deck/Stage.jsx';
import CanvasBackground from './components/deck/CanvasBackground.jsx';

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

  // --- Audience view: full-bleed canvas, scaled 1920 × 1080 stage ---
  const { activeSlide, activeSlideIndex, totalSlides, buildStep, direction } = sync;
  const ActiveSlideComponent = getSlideComponent(activeSlide?.componentName);
  const progressPercent = ((activeSlideIndex + 1) / totalSlides) * 100;
  const showChrome = buildStep >= (activeSlide?.chromeFromBuild || 0);
  const cornerBadge = showChrome ? getSlideCornerBadge(activeSlideIndex) : null;
  const actColor = actAccent(activeSlide?.act);
  const canvas = resolveCanvas(activeSlide?.canvas, buildStep);
  const dark = activeSlide?.darkCanvas;
  const onDark = Array.isArray(dark) ? Boolean(dark[Math.min(buildStep, dark.length - 1)]) : Boolean(dark);

  return (
    <div
      data-testid="slide-viewport"
      className="fixed inset-0 w-screen h-screen overflow-hidden select-none bg-black flex items-center justify-center p-2 sm:p-3 md:p-4"
    >
      {/* 
        macOS / Display-framed rounded card canvas:
        Curved corners, subtle bezel border, and deep ambient drop shadow against the black bezel backdrop
      */}
      <main className="relative w-full h-full max-w-[calc((100vh-1rem)*16/9)] md:max-w-[calc((100vh-2rem)*16/9)] max-h-full aspect-video rounded-2xl md:rounded-[28px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.08)] bg-canvas flex flex-col">
        <CanvasBackground canvas={canvas} />

        <Stage>
          <motion.div
            key={activeSlide?.id || activeSlideIndex}
            initial={{ opacity: 0, x: direction > 0 ? 24 : -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={slideTransition}
            className="absolute inset-0"
          >
            <SlideErrorBoundary
              slideId={activeSlide?.id || `slide-${activeSlideIndex}`}
              buildStep={buildStep}
            >
              <ActiveSlideComponent activeSlide={activeSlide} buildStep={buildStep} />
            </SlideErrorBoundary>
          </motion.div>

          {/* Chrome: progress pill (top centre) and corner badge (top right), in the top margin band */}
          {cornerBadge && (
            <>
              <div
                className={`absolute top-[41px] left-1/2 -translate-x-1/2 w-[200px] h-[8px] rounded-full overflow-hidden pointer-events-none z-30 ${onDark ? 'bg-white/35' : 'bg-[#D9D9E0]'}`}
              >
                <motion.div
                  className={`h-full rounded-full ${onDark ? 'bg-white' : 'bg-ink'}`}
                  initial={false}
                  animate={{ width: `${progressPercent}%` }}
                  transition={slideTransition}
                />
              </div>
              <div
                data-testid="corner-badge"
                className={`absolute top-[33px] right-safe-x z-30 flex items-center gap-[12px] font-mono text-badge pointer-events-none whitespace-nowrap ${onDark ? 'text-white' : 'text-muted'}`}
                style={onDark ? { textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)' } : undefined}
              >
                <span
                  className="w-[14px] h-[14px] rounded-full flex-shrink-0"
                  style={{ backgroundColor: onDark ? '#FFFFFF' : actColor }}
                />
                <span>{cornerBadge}</span>
              </div>
            </>
          )}
        </Stage>
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
