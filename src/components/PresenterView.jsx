import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  LayoutGrid, 
  Clock, 
  AlertTriangle,
  CheckCircle2,
  Layers,
  Monitor,
  Maximize,
  Minimize,
  Timer
} from 'lucide-react';
import { getSlideComponent } from '../slides/registry.js';
import SlideNavigatorModal from './SlideNavigatorModal.jsx';
import SlideErrorBoundary from './SlideErrorBoundary.jsx';

const ACT_COLORS = {
  Opening: '#1B7ED0',
  Good: '#1E9E6A',
  Poll: '#111113', // Neutral ink dot: interlude sits between acts and belongs to none
  Bad: '#D97706',
  Ugly: '#E5484D',
  'Making Good': '#1B7ED0',
  Finale: '#1B7ED0',
};

/**
 * SlideFrame
 * Renders any slide component inside a responsive 16:9 container,
 * scaled from a 1920x1080 canvas using ResizeObserver.
 */
function SlideFrame({ Component, activeSlide, buildStep, label, isNext = false }) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        if (width > 0) {
          setScale(width / 1920);
        }
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  if (!Component) {
    return (
      <div className="w-full aspect-video rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col items-center justify-center text-neutral-500 font-mono text-xs md:text-sm">
        <span>End of Presentation</span>
        <span className="text-[11px] text-neutral-600 mt-1">No subsequent slide</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-1">
        <span className="font-semibold tracking-wider text-neutral-300">{label}</span>
        {isNext ? (
          <span className="text-neutral-500">{activeSlide?.id} · {activeSlide?.durationMinutes}m</span>
        ) : (
          <span className="text-neutral-400">
            {activeSlide?.totalBuilds > 0 ? `Build ${buildStep} / ${activeSlide.totalBuilds}` : 'Single Step'}
          </span>
        )}
      </div>

      <div 
        ref={containerRef} 
        className={`w-full aspect-video rounded-xl overflow-hidden bg-[#FAFAFB] relative border shadow-lg ${
          isNext ? 'border-neutral-800 opacity-90' : 'border-neutral-700 ring-2 ring-neutral-700/50'
        }`}
      >
        <div
          className="origin-top-left absolute top-0 left-0 pointer-events-none select-none"
          style={{
            width: '1920px',
            height: '1080px',
            transform: `scale(${scale})`,
          }}
        >
          <SlideErrorBoundary
            slideId={activeSlide?.id || 'preview'}
            buildStep={buildStep}
          >
            <Component activeSlide={activeSlide} buildStep={buildStep} />
          </SlideErrorBoundary>
        </div>
      </div>
    </div>
  );
}

/**
 * Formats notes with visual badges for [1], [2], quotes, pauses, etc.
 */
function FormattedNotes({ notesText, currentBuildStep }) {
  if (!notesText) {
    return (
      <p className="text-neutral-500 italic text-base">
        No cue notes defined for this slide.
      </p>
    );
  }

  // Split by double newline or periods followed by space
  const lines = notesText.split(/(?<=[.?!])\s+/);

  return (
    <div className="space-y-3.5 text-base md:text-lg leading-relaxed text-neutral-200">
      {lines.map((line, idx) => {
        // Detect build marker like [1], [2], [3]
        const buildMatch = line.match(/\[(\d+)\]/);
        const markerStep = buildMatch ? parseInt(buildMatch[1], 10) : null;
        const isCurrentBuild = markerStep !== null && currentBuildStep === markerStep;

        // Check if line contains a quote
        const isQuote = line.includes('"');
        // Check for pause warning
        const isPause = line.toLowerCase().includes('(pause)');
        // Check for point/warm-up
        const isPoint = line.toLowerCase().startsWith('point:');

        return (
          <div
            key={idx}
            className={`p-3 rounded-xl transition-all ${
              isCurrentBuild
                ? 'bg-blue-950/70 border-2 border-blue-500 text-white shadow-md'
                : isQuote
                ? 'bg-neutral-900/90 border-l-4 border-amber-500 pl-3.5 text-amber-200/90 font-medium'
                : isPoint
                ? 'bg-neutral-900 border border-neutral-800 text-neutral-100 font-semibold'
                : 'hover:bg-neutral-900/40 text-neutral-200'
            }`}
          >
            {markerStep !== null && (
              <span
                className={`inline-block mr-2 px-2 py-0.5 rounded text-xs font-mono font-bold ${
                  isCurrentBuild
                    ? 'bg-blue-500 text-white animate-pulse'
                    : 'bg-neutral-800 text-neutral-400'
                }`}
              >
                CLICK [{markerStep}]
              </span>
            )}

            {isPause && (
              <span className="inline-block mr-2 px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                (PAUSE 2s)
              </span>
            )}

            <span>{line}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function PresenterView({ sync }) {
  const {
    activeSlideIndex,
    buildStep,
    timerSeconds,
    isPaused,
    activeSlide,
    activeSlides,
    totalSlides,
    goToSlide,
    nextBuildOrSlide,
    prevBuildOrSlide,
    toggleTimer,
    resetTimer,
  } = sync;

  const [showNavigator, setShowNavigator] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Compute pacing
  let cumulativeTargetSeconds = 0;
  for (let i = 0; i <= activeSlideIndex; i++) {
    cumulativeTargetSeconds += Math.round((activeSlides[i]?.durationMinutes || 1.0) * 60);
  }

  const diffFromTarget = timerSeconds - cumulativeTargetSeconds;
  const absDiff = Math.abs(diffFromTarget);
  const diffMins = Math.floor(absDiff / 60);
  const diffSecs = absDiff % 60;
  const diffTimeFormatted = `${diffMins}:${diffSecs.toString().padStart(2, '0')}`;

  let pacingStatus = 'on-pace';
  let pacingBadge = {
    text: `On Pace (${diffFromTarget >= 0 ? '+' : '-'}${diffTimeFormatted})`,
    bg: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400',
  };

  if (diffFromTarget > 60) {
    pacingStatus = 'behind';
    pacingBadge = {
      text: `Behind Schedule (+${diffTimeFormatted})`,
      bg: 'bg-amber-500/20 border-amber-500/50 text-amber-400',
    };
  } else if (diffFromTarget < -60) {
    pacingStatus = 'ahead';
    pacingBadge = {
      text: `Ahead of Schedule (-${diffTimeFormatted})`,
      bg: 'bg-sky-500/20 border-sky-500/50 text-sky-400',
    };
  }

  // Format Elapsed Time
  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Components for current and next slide
  const CurrentSlideComp = getSlideComponent(activeSlide?.componentName);
  const nextSlide = activeSlides[activeSlideIndex + 1] || null;
  const NextSlideComp = nextSlide ? getSlideComponent(nextSlide.componentName) : null;

  const actColor = activeSlide?.dotColor || ACT_COLORS[activeSlide?.act] || '#1B7ED0';

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['input', 'textarea'].includes(e.target.tagName.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key === 'Enter') {
        e.preventDefault();
        nextBuildOrSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'Backspace') {
        e.preventDefault();
        prevBuildOrSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSlide(totalSlides - 1);
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        toggleTimer();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        resetTimer();
      } else if (e.key === 'o' || e.key === 'O') {
        e.preventDefault();
        setShowNavigator((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextBuildOrSlide, prevBuildOrSlide, goToSlide, toggleTimer, resetTimer, totalSlides]);

  const popOutAudience = () => {
    window.open('/', 'InformatiqAudience', 'width=1920,height=1080');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#0C0D10] text-neutral-100 flex flex-col overflow-hidden select-none presenter-dark font-sans">
      
      {/* ===================== TOP STATUS & TIMER BAR ===================== */}
      <header className="h-16 border-b border-neutral-800 bg-[#121318] px-6 flex items-center justify-between flex-shrink-0 z-20">
        
        {/* Left: Presentation info & Slide Index */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span 
              className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${actColor === '#111113' ? 'border border-neutral-400 bg-neutral-200' : ''}`} 
              style={actColor !== '#111113' ? { backgroundColor: actColor } : undefined} 
            />
            <span className="font-bold text-sm md:text-base tracking-tight text-white">
              InformatiQ Presenter
            </span>
          </div>

          <div className="h-4 w-[1px] bg-neutral-800" />

          {/* Slide counter button */}
          <button
            onClick={() => setShowNavigator(true)}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 text-xs md:text-sm font-mono font-semibold transition-colors cursor-pointer border border-neutral-700"
            title="Open Slide Navigator (O)"
          >
            <span>SLIDE {String(activeSlideIndex + 1).padStart(2, '0')}</span>
            <span className="text-neutral-500">/</span>
            <span className="text-neutral-400">{String(totalSlides).padStart(2, '0')}</span>
          </button>

          {/* Cut Tier badge */}
          {activeSlide?.cutTier && (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
              activeSlide.cutTier === 'A'
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                : 'bg-orange-500/20 text-orange-400 border-orange-500/40'
            }`}>
              CUT TIER {activeSlide.cutTier}
            </span>
          )}
        </div>

        {/* Center: Live Timer & Pacing Checkpoint */}
        <div className="flex items-center gap-5">
          {/* Digital Timer */}
          <div className="flex items-center gap-3 bg-neutral-900 border border-neutral-750 px-4 py-1.5 rounded-xl shadow-inner">
            <Timer className={`w-4 h-4 ${isPaused ? 'text-neutral-500' : 'text-emerald-400 animate-pulse'}`} />
            <span className="font-mono text-2xl md:text-3xl font-bold tracking-wider text-white">
              {formatTime(timerSeconds)}
            </span>

            {/* Timer controls */}
            <div className="flex items-center gap-1 ml-2 border-l border-neutral-800 pl-2">
              <button
                onClick={toggleTimer}
                className="p-1 rounded-md hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title={isPaused ? 'Start Timer (P)' : 'Pause Timer (P)'}
              >
                {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
              </button>
              <button
                onClick={resetTimer}
                className="p-1 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                title="Reset Timer (R)"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Pacing Indicator */}
          <div className="hidden lg:flex items-center gap-2">
            <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${pacingBadge.bg}`}>
              {pacingBadge.text}
            </span>
            <span className="text-xs font-mono text-neutral-500">
              (Target: {formatTime(cumulativeTargetSeconds)})
            </span>
          </div>
        </div>

        {/* Right: Window Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={popOutAudience}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-semibold border border-neutral-700 transition-colors cursor-pointer"
            title="Pop out Audience Screen on Teams monitor"
          >
            <Monitor className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Audience Window</span>
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </button>

          <button
            onClick={() => setShowNavigator(true)}
            className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Slide Navigator (O)"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Fullscreen"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ===================== MAIN 2-COLUMN VIEWPORT ===================== */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 overflow-hidden">
        
        {/* ================= LEFT: SLIDE PREVIEWS & STAGE (5/12 cols) ================= */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-5 h-full overflow-y-auto pr-1">
          
          {/* Current Slide Preview */}
          <SlideFrame
            Component={CurrentSlideComp}
            activeSlide={activeSlide}
            buildStep={buildStep}
            label="ON SCREEN NOW"
          />

          {/* Next Slide Preview */}
          <SlideFrame
            Component={NextSlideComp}
            activeSlide={nextSlide}
            buildStep={0}
            label="COMING UP NEXT"
            isNext={true}
          />

          {/* Bottom Stage Controls */}
          <div className="flex items-center justify-between bg-[#121318] p-3.5 rounded-2xl border border-neutral-800 mt-auto">
            <button
              onClick={prevBuildOrSlide}
              disabled={activeSlideIndex === 0 && buildStep === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 disabled:hover:bg-neutral-800 text-white font-semibold text-sm transition-all cursor-pointer border border-neutral-700"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back (←)</span>
            </button>

            {/* Build indicator pill */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                {activeSlide?.totalBuilds > 0 ? (
                  buildStep === 0 ? 'Initial State' : `Build ${buildStep} of ${activeSlide.totalBuilds}`
                ) : (
                  'No Builds'
                )}
              </span>
              {activeSlide?.totalBuilds > 0 && (
                <div className="flex items-center gap-1.5 mt-1">
                  <span className={`w-2 h-2 rounded-full ${buildStep === 0 ? 'bg-blue-400' : 'bg-neutral-600'}`} />
                  {Array.from({ length: activeSlide.totalBuilds }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        buildStep === i + 1
                          ? 'bg-blue-500 scale-125'
                          : buildStep > i + 1
                          ? 'bg-neutral-400'
                          : 'bg-neutral-700'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={nextBuildOrSlide}
              disabled={activeSlideIndex === totalSlides - 1 && buildStep === (activeSlide?.totalBuilds || 0)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:hover:bg-blue-600 text-white font-bold text-sm transition-all cursor-pointer shadow-lg shadow-blue-900/30"
            >
              <span>{activeSlide?.totalBuilds > buildStep ? 'Next Build' : 'Next Slide'} (Space / →)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ================= RIGHT: NOTES & CUE CARDS (7/12 cols) ================= */}
        <div className="lg:col-span-7 flex flex-col bg-[#121318] rounded-2xl border border-neutral-800 p-6 md:p-8 overflow-hidden shadow-xl">
          
          {/* Active Slide Header Meta */}
          <div className="pb-5 border-b border-neutral-800 flex-shrink-0 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold"
                  style={
                    actColor === '#111113'
                      ? { backgroundColor: '#27272A', color: '#FAFAFB', border: '1px solid #52525B' }
                      : { backgroundColor: `${actColor}25`, color: actColor, border: `1px solid ${actColor}50` }
                  }
                >
                  {activeSlide?.act}
                </span>
                <span className="text-xs font-mono text-neutral-400 font-bold">
                  {activeSlide?.id}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  Planned: {activeSlide?.durationMinutes} min
                </span>
                {activeSlide?.cornerLabel && (
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                    {activeSlide.cornerLabel}
                  </span>
                )}
              </div>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
              {activeSlide?.title}
            </h1>
          </div>

          {/* Notes Content Section (Scrollable) */}
          <div className="flex-1 overflow-y-auto py-5 pr-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
              <span>Presenter Cues & Talking Points</span>
              <div className="flex-1 h-[1px] bg-neutral-800" />
            </div>

            <FormattedNotes notesText={activeSlide?.notes} currentBuildStep={buildStep} />
          </div>

          {/* Next Slide Sneak-Peek Footer */}
          {nextSlide && (
            <div className="pt-4 border-t border-neutral-800 flex-shrink-0 flex items-center justify-between text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-2 truncate pr-4">
                <span className="text-neutral-500 uppercase">Coming next:</span>
                <span className="text-neutral-300 font-bold truncate">
                  {nextSlide.id} · {nextSlide.title}
                </span>
              </div>
              <span className="text-neutral-500 flex-shrink-0">{nextSlide.durationMinutes}m</span>
            </div>
          )}
        </div>
      </div>

      {/* Slide Navigator Modal */}
      <SlideNavigatorModal
        isOpen={showNavigator}
        onClose={() => setShowNavigator(false)}
        activeSlides={activeSlides}
        currentIndex={activeSlideIndex}
        onSelectSlide={(idx) => goToSlide(idx)}
      />
    </div>
  );
}
