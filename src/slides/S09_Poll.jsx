import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { 
  Copy, 
  Check, 
  ShieldCheck, 
  ScanLine, 
  Play, 
  Pause, 
  RotateCcw
} from 'lucide-react';
import meatTypingSvg from '../assets/meatproxy-emojis-svg/meat-typing.svg';
import QRCode from 'qrcode';

/**
 * Slide 09: Be honest. It's anonymous. (Live Poll Interlude)
 * 
 * Corner: 09 / Your turn (Neutral ink dot #111113)
 * Duration: 3:30 | Builds: 1
 * One idea: Before the bad news, tell us yours. Honestly.
 * 
 * Visual Layout:
 *  - Kicker: "Before the bad news…" (font-mono uppercase with neutral dot)
 *  - Headline: "Be honest. It's anonymous." (≥72px, ink #111113)
 *  - Build 1: "(Trust me. I'm one of you.)" slides in under the headline with an afterthought feel in secondary ink #4A4A55.
 *  - Hero Visual (Left of centre):
 *      * Ultra-crisp vector SVG QR code (≥360px) with generous quiet zone and sharp edges for lossy Teams compression.
 *      * Short link in bold font-mono: forms.office.com/r/informatiq-ai
 *      * Interactive copy helper: "Link's in the Teams chat too · Click to copy"
 *      * Footnote pill: "8 questions · 2 minutes · No names recorded"
 *      * Subtle 2:30 pacing ring countdown aid for presenter.
 *  - Mascot Visual (Right of centre):
 *      * meat-typing.svg typing at laptop with floating code particles.
 *      * Thought / callout bubble: "I can't see who answered. Only the percentages."
 *        and "Camera on, brain optional? Answer question 4."
 */

export const POLL_CONFIG = {
  url: 'https://forms.office.com/r/informatiq-ai',
  shortLink: 'forms.office.com/r/informatiq-ai',
  totalQuestions: 8,
  estimatedMinutes: 2,
  pacingSeconds: 150, // 2:30 pacing aid
};

// Mathematically generated high-contrast vector QR SVG for 'https://forms.office.com/r/informatiq-ai'
// ViewBox 39x39 with crispEdges, guaranteed sharp down to the pixel on Teams screen share
const DEFAULT_QR_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 39" shape-rendering="crispEdges"><path fill="#ffffff" d="M0 0h39v39H0z"/><path stroke="#000000" d="M3 3.5h7m1 0h1m1 0h1m1 0h1m1 0h8m1 0h2m1 0h7M3 4.5h1m5 0h1m2 0h2m2 0h1m1 0h3m3 0h1m4 0h1m5 0h1M3 5.5h1m1 0h3m1 0h1m2 0h1m4 0h1m2 0h8m1 0h1m1 0h3m1 0h1M3 6.5h1m1 0h3m1 0h1m2 0h1m3 0h1m2 0h1m2 0h2m5 0h1m1 0h3m1 0h1M3 7.5h1m1 0h3m1 0h1m1 0h2m2 0h1m2 0h1m2 0h1m4 0h1m2 0h1m1 0h3m1 0h1M3 8.5h1m5 0h1m1 0h2m2 0h1m1 0h1m2 0h2m1 0h1m1 0h1m3 0h1m5 0h1M3 9.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 10.5h2m1 0h1m8 0h1m2 0h1M4 11.5h7m1 0h1m2 0h2m1 0h1m1 0h1m4 0h2m3 0h2m3 0h1M3 12.5h2m1 0h2m2 0h1m1 0h3m1 0h2m3 0h2m3 0h1m2 0h2m1 0h4M4 13.5h3m2 0h2m1 0h1m1 0h4m3 0h1m1 0h3m2 0h2m1 0h1m1 0h2M4 14.5h1m2 0h1m2 0h2m2 0h1m4 0h1m3 0h3m2 0h2m1 0h5M4 15.5h1m1 0h1m2 0h2m3 0h1m1 0h1m1 0h1m2 0h1m3 0h4m1 0h3m1 0h2M3 16.5h2m1 0h1m5 0h2m1 0h2m1 0h2m3 0h1m2 0h1m1 0h2m3 0h3M4 17.5h1m4 0h3m4 0h4m2 0h1m2 0h1m1 0h5m2 0h1M4 18.5h2m2 0h1m1 0h1m1 0h2m2 0h1m3 0h1m1 0h4m2 0h2m3 0h1M3 19.5h1m3 0h3m3 0h1m1 0h1m1 0h3m1 0h2m2 0h1m1 0h2m1 0h2m3 0h1M3 20.5h1m3 0h2m2 0h2m1 0h2m1 0h2m1 0h5m1 0h1m2 0h2m1 0h2m1 0h1M3 21.5h2m1 0h1m2 0h1m2 0h1m1 0h3m1 0h2m3 0h2m2 0h1m2 0h2m1 0h1M3 22.5h1m3 0h2m3 0h2m2 0h5m1 0h1m1 0h4m1 0h6M3 23.5h2m4 0h2m3 0h2m1 0h2m4 0h1m1 0h1m2 0h1m1 0h3m1 0h2M3 24.5h1m1 0h1m1 0h1m2 0h1m1 0h1m1 0h1m4 0h2m3 0h1m1 0h1m2 0h1m2 0h1m2 0h1M3 25.5h1m1 0h1m3 0h4m1 0h3m2 0h1m3 0h1m1 0h1m2 0h1m1 0h3m1 0h1M3 26.5h1m1 0h4m1 0h6m1 0h1m2 0h1m3 0h1m2 0h1m1 0h1m1 0h3M3 27.5h1m1 0h1m3 0h2m1 0h1m1 0h1m1 0h4m5 0h1m1 0h5m3 0h1M11 28.5h2m4 0h1m2 0h1m1 0h2m2 0h2m3 0h1m1 0h1m1 0h1M3 29.5h7m1 0h2m3 0h1m1 0h2m3 0h2m1 0h2m1 0h1m1 0h1m1 0h2M3 30.5h1m5 0h1m1 0h3m2 0h2m1 0h1m1 0h1m2 0h4m3 0h5M3 31.5h1m1 0h3m1 0h1m1 0h2m1 0h1m4 0h2m1 0h1m1 0h1m2 0h6m1 0h2M3 32.5h1m1 0h3m1 0h1m1 0h1m4 0h1m2 0h3m1 0h2m1 0h1m1 0h1m2 0h1m3 0h1M3 33.5h1m1 0h3m1 0h1m1 0h3m2 0h3m1 0h1m1 0h1m2 0h2m2 0h2m1 0h2M3 34.5h1m5 0h1m1 0h1m2 0h1m4 0h2m1 0h3m3 0h2m1 0h3M3 35.5h7m2 0h1m1 0h1m2 0h2m1 0h1m1 0h1m2 0h4m1 0h1m3 0h1"/></svg>`;

export default function S09_Poll({ activeSlide, buildStep = 0 }) {
  const showTrustLine = buildStep >= 1;

  // Dynamic QR Code SVG State
  const [qrSvg, setQrSvg] = useState(DEFAULT_QR_SVG);
  const [copied, setCopied] = useState(false);

  // Subtle Presenter Pacing Ring State (2:30 countdown)
  const [secondsRemaining, setSecondsRemaining] = useState(POLL_CONFIG.pacingSeconds);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Generate QR dynamically if url changes
  useEffect(() => {
    let isMounted = true;
    if (QRCode && QRCode.toString) {
      QRCode.toString(POLL_CONFIG.url, {
        type: 'svg',
        margin: 3,
        errorCorrectionLevel: 'Q',
      })
        .then((svg) => {
          if (isMounted && svg) {
            setQrSvg(svg);
          }
        })
        .catch((err) => {
          console.warn('QR code generation fallback active', err);
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // Pacing Timer interval
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else if (secondsRemaining === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, secondsRemaining]);

  const handleCopyLink = useCallback(() => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(POLL_CONFIG.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  }, []);

  const formatPacingTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Ring calculations: radius = 13, circumference ≈ 81.68
  const RING_RADIUS = 13;
  const CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
  const elapsedFraction = (POLL_CONFIG.pacingSeconds - secondsRemaining) / POLL_CONFIG.pacingSeconds;
  const strokeDashoffset = CIRCUMFERENCE * (1 - elapsedFraction);

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 sm:p-10 md:p-12 lg:p-16 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Header */}
      <div className="z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="flex items-center gap-2 mb-2"
        >
          {/* Neutral ink dot: interlude sits between acts and belongs to none */}
          <span className="w-2.5 h-2.5 rounded-full bg-[#111113]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            Act Interlude · Before the bad news…
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-[#111113] leading-[1.05]"
        >
          Be honest. It's anonymous.
        </motion.h1>

        {/* Build 1: Afterthought Line with reserved space to prevent layout jump */}
        <div className="min-h-[38px] sm:min-h-[44px] flex items-center mt-1">
          <AnimatePresence>
            {showTrustLine && (
              <motion.p
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ ...springPhysics, delay: 0.1 }}
                className="text-xl sm:text-2xl md:text-3xl font-medium text-[#4A4A55] tracking-tight italic"
              >
                (Trust me. I'm one of you.)
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main Center Stage: QR Code Hero + Meatproxy Mascot */}
      <div className="my-auto w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 z-10 py-2">
        
        {/* LEFT / CENTER: Hero QR Code Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: appleEase }}
          className="bg-white rounded-3xl border-2 border-neutral-300 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07)] p-6 sm:p-7 md:p-8 flex flex-col items-center relative max-w-[460px] md:max-w-[480px] w-full"
        >
          {/* Card Header: Live Poll Badge & Subtle Presenter Pacing Ring */}
          <div className="w-full flex items-center justify-between pb-4 mb-2 border-b-2 border-neutral-100">
            <div className="flex items-center gap-2">
              <ScanLine className="w-4 h-4 text-[#111113] stroke-[2.2]" />
              <span className="font-mono text-xs font-bold tracking-wider text-[#111113] uppercase">
                Audience Poll
              </span>
            </div>

            {/* Subtle Presenter Pacing Ring (2:30 pacing aid) */}
            <div 
              className="flex items-center gap-2 bg-neutral-50 px-2.5 py-1 rounded-full border-2 border-neutral-200 cursor-pointer group select-none transition-colors hover:bg-neutral-100"
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              title="Presenter 2:30 pacing countdown"
            >
              <div className="relative w-7 h-7 flex items-center justify-center">
                <svg className="w-7 h-7 -rotate-90" viewBox="0 0 32 32">
                  <circle
                    cx="16"
                    cy="16"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="#E4E4E7"
                    strokeWidth="2.5"
                  />
                  <circle
                    cx="16"
                    cy="16"
                    r={RING_RADIUS}
                    fill="none"
                    stroke="#111113"
                    strokeWidth="2.5"
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-linear"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-neutral-600 group-hover:text-[#111113]">
                  {isTimerRunning ? (
                    <Pause className="w-2.5 h-2.5 stroke-[2.5]" />
                  ) : (
                    <Play className="w-2.5 h-2.5 ml-0.5 stroke-[2.5]" />
                  )}
                </div>
              </div>

              <div className="flex flex-col text-left">
                <span className="font-mono text-xs font-bold text-[#111113] leading-none">
                  {formatPacingTime(secondsRemaining)}
                </span>
                <span className="text-[9px] font-mono font-medium text-neutral-400 uppercase tracking-tight leading-none mt-0.5">
                  Pacing
                </span>
              </div>

              {secondsRemaining < POLL_CONFIG.pacingSeconds && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSecondsRemaining(POLL_CONFIG.pacingSeconds);
                    setIsTimerRunning(false);
                  }}
                  className="p-1 rounded-full hover:bg-neutral-200 text-neutral-400 hover:text-neutral-700 transition-colors ml-0.5"
                  title="Reset pacing timer"
                >
                  <RotateCcw className="w-2.5 h-2.5 stroke-[2.5]" />
                </button>
              )}
            </div>
          </div>

          {/* Ultra-Crisp Scannable Vector QR Code with Pure White Quiet Zone */}
          <div className="relative p-3 sm:p-4 bg-white rounded-2xl border-2 border-neutral-100 flex items-center justify-center shadow-xs">
            <div 
              className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] [&_svg]:w-full [&_svg]:h-full [&_svg]:block select-none pointer-events-none"
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
          </div>

          {/* Short Link Display in Bold Font-Mono */}
          <div className="mt-4 w-full flex flex-col items-center gap-1.5">
            <div className="font-mono font-bold text-sm sm:text-base md:text-lg text-[#111113] tracking-wider bg-neutral-100/90 border-2 border-neutral-200 px-4 py-1.5 rounded-xl select-text text-center w-full">
              {POLL_CONFIG.shortLink}
            </div>

            {/* Click to Copy / Teams Chat Helper */}
            <button
              type="button"
              onClick={handleCopyLink}
              className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-[#4A4A55] hover:text-[#111113] transition-colors py-1 px-3 rounded-lg hover:bg-neutral-100 cursor-pointer select-none font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#1E9E6A] stroke-[2.5]" />
                  <span className="text-[#1E9E6A] font-bold">Copied to clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#4A4A55] stroke-[2]" />
                  <span>Link's in the Teams chat too · Click to copy</span>
                </>
              )}
            </button>

            {/* Footnote Pill */}
            <div className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#4A4A55] bg-neutral-100 border-2 border-neutral-200 px-3.5 py-1 rounded-full">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-500 stroke-[2.2]" />
              <span>8 questions · 2 minutes · No names recorded</span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT / CENTER: Mascot meat-typing & Callout Bubble */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: appleEase }}
          className="flex flex-col items-center justify-center relative max-w-sm w-full"
        >
          {/* Callout Speech Bubble pointing down to Meatproxy */}
          <div className="relative bg-white rounded-2xl border-2 border-neutral-300 p-4 sm:p-5 shadow-md w-full mb-3">
            {/* Bubble Tail */}
            <div className="absolute -bottom-2.5 left-16 sm:left-20 w-4 h-4 bg-white border-b-2 border-r-2 border-neutral-300 rotate-45 transform" />

            <p className="text-base sm:text-lg font-bold text-[#111113] leading-snug">
              "I can't see who answered. Only the percentages."
            </p>

            <p className="text-xs sm:text-sm text-[#4A4A55] mt-1.5 font-medium leading-relaxed">
              Camera on, brain optional? Answer question 4.
            </p>

            <div className="mt-3 pt-2.5 border-t-2 border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span className="font-bold text-[#111113]">100% ANONYMOUS</span>
              <span className="text-neutral-400">Takes ~2 minutes</span>
            </div>
          </div>

          {/* Mascot Image (Static & Crisp for Teams Screen-Share) */}
          <div className="relative mt-2 flex items-center justify-center">
            <img
              src={meatTypingSvg}
              alt="Meatproxy typing on laptop"
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 object-contain select-none pointer-events-none drop-shadow-sm"
            />
          </div>
        </motion.div>

      </div>

      {/* Bottom Live Connection Footer */}
      <div className="z-10 flex items-center justify-between border-t-2 border-neutral-200/80 pt-3 text-xs font-mono text-[#4A4A55]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#111113]" />
          <span>Interactive Audience Survey</span>
        </div>
        <div className="hidden sm:block text-neutral-400">
          Live responses will guide the discussion
        </div>
      </div>

    </div>
  );
}
