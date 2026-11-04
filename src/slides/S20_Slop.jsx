import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase } from '../motion';
import { colors } from '../theme';
import { SlideFrame } from '../components/deck';

// Slop palette (purple is intentional).
const SLOP_BG = 'linear-gradient(135deg, #5B21B6 0%, #7C3AED 40%, #A855F7 70%, #DB2777 100%)';
const GLASS = 'bg-white/15 border-[3px] border-white/40 backdrop-blur-md';
const RAINBOW = 'linear-gradient(90deg, #FDE68A 22%, #FBCFE8 50%, #C4B5FD 78%)';

const PILLS = [
  { text: '10x faster', bg: 'linear-gradient(90deg, #F472B6, #FB923C)' },
  { text: 'Next-gen', bg: 'linear-gradient(90deg, #818CF8, #22D3EE)' },
  { text: 'Seamless', bg: 'linear-gradient(90deg, #34D399, #A3E635)' },
  { text: 'Enterprise-ready', bg: 'linear-gradient(90deg, #FBBF24, #F472B6)' },
];
const CARDS = ['Lightning fast', 'AI-native', 'Infinitely scalable'];

const SPARKLES = [
  { x: 250, y: 260, s: 72, d: 0 },
  { x: 1600, y: 210, s: 56, d: 0.8 },
  { x: 180, y: 640, s: 44, d: 1.6 },
  { x: 1720, y: 330, s: 64, d: 0.4 },
  { x: 560, y: 150, s: 36, d: 1.2 },
  { x: 1470, y: 520, s: 40, d: 2 },
];

// Thumbnail of the slop on the clean slide.
const THUMB = { scale: 0.62, x: 365, y: 222 };

function Sparkle({ size = 40, color = '#FFFFFF', className = '', style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path d="M12 0 L14.6 9.4 L24 12 L14.6 14.6 L12 24 L9.4 14.6 L0 12 L9.4 9.4 Z" fill={color} />
    </svg>
  );
}

function AiBadge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-[12px] rounded-full px-[26px] py-[10px] text-[28px] font-semibold text-white ${GLASS} ${className}`}>
      <Sparkle size={26} />
      {children}
    </span>
  );
}

// A 2024 AI landing page, composed on the full 1920 × 1080 stage.
function SlopPage({ framed }) {
  return (
    <div className="absolute inset-0 overflow-hidden" data-mock>
      <motion.div
        className="absolute inset-0"
        style={{ background: SLOP_BG }}
        initial={false}
        animate={{ opacity: framed ? 1 : 0 }}
        transition={{ duration: 0.4, ease: appleEase }}
      />
      <div className="absolute left-[260px] top-[120px] h-[620px] w-[620px] rounded-full bg-[#F472B6]/40 blur-[120px]" />
      <div className="absolute right-[200px] top-[420px] h-[560px] w-[560px] rounded-full bg-[#60A5FA]/30 blur-[120px]" />

      <div className="absolute left-0 top-[150px] flex w-[1920px] justify-center">
        <AiBadge>AI-powered</AiBadge>
      </div>

      <h2
        className="absolute left-0 top-[236px] w-[1920px] text-center text-[150px] font-black leading-[1.0] tracking-[-0.03em]"
        style={{ backgroundImage: RAINBOW, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}
      >
        Revolutionize
        <br />
        Your Workflow
      </h2>

      <p className="absolute left-0 top-[560px] w-[1920px] text-center text-[40px] font-medium text-white/90">
        Unlock the power of next-gen AI. Seamlessly.
      </p>

      <div className="absolute left-0 top-[650px] flex w-[1920px] justify-center gap-[20px]">
        {PILLS.map((p) => (
          <span key={p.text} className="rounded-full px-[30px] py-[10px] text-[28px] font-bold text-white" style={{ background: p.bg }}>
            {p.text}
          </span>
        ))}
      </div>

      <div className="absolute left-0 top-[770px] flex w-[1920px] justify-center gap-[36px]">
        {CARDS.map((c) => (
          <div key={c} className={`flex h-[180px] w-[420px] flex-col justify-between rounded-[32px] p-[28px] ${GLASS}`}>
            <div className="flex items-center justify-between">
              <Sparkle size={44} color="#FDE68A" />
              <span className="rounded-full bg-white/25 px-[16px] py-[6px] text-[24px] font-semibold text-white">AI-powered</span>
            </div>
            <span className="text-[36px] font-bold text-white">{c}</span>
          </div>
        ))}
      </div>

      <div className={`absolute left-[1530px] top-[600px] flex items-center gap-[14px] rounded-[32px] rounded-br-[8px] px-[30px] py-[18px] shadow-[0_20px_50px_rgba(30,0,60,0.35)] ${GLASS}`}>
        <Sparkle size={34} color="#FBCFE8" />
        <span className="text-[32px] font-bold text-white">Ask AI</span>
      </div>

      {SPARKLES.map((s) => (
        <motion.div
          key={`${s.x}-${s.y}`}
          data-overlap-ok
          className="absolute"
          style={{ left: s.x, top: s.y }}
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.85, 1.1, 0.85], rotate: [0, 20, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: s.d, ease: 'easeInOut' }}
        >
          <Sparkle size={s.s} color="#FFFFFF" />
        </motion.div>
      ))}
    </div>
  );
}

export default function S20_Slop({ buildStep = 0 }) {
  const framed = buildStep >= 1;
  const principle = buildStep >= 2;

  return (
    <SlideFrame>
      <motion.div
        className="absolute left-0 top-0 h-[1080px] w-[1920px] overflow-hidden"
        style={{ transformOrigin: '0 0' }}
        initial={false}
        animate={
          framed
            ? { x: THUMB.x, y: THUMB.y, scale: THUMB.scale, borderRadius: 52, opacity: principle ? 0.45 : 1, boxShadow: '0 40px 120px rgba(17,17,19,0.28)' }
            : { x: 0, y: 0, scale: 1, borderRadius: 0, opacity: 1, boxShadow: '0 0px 0px rgba(17,17,19,0)' }
        }
        transition={{ duration: 0.9, ease: appleEase }}
      >
        <SlopPage framed={framed} />
      </motion.div>

      <AnimatePresence>
        {framed && (
          <motion.h1
            key="headline"
            className="absolute left-0 top-[96px] w-[1920px] text-center text-headline text-ink"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: appleEase, delay: 0.45 }}
          >
            Everything is{' '}
            <span className="text-transparent" style={{ backgroundImage: SLOP_BG, WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              purple
            </span>{' '}
            now.
          </motion.h1>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {principle && (
          <motion.p
            key="principle"
            className="absolute left-0 top-[912px] w-[1920px] text-center text-sub font-bold text-ink"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.7, ease: appleEase }}
          >
            AI should follow our <span style={{ color: colors.blue }}>principles</span>, not its defaults.
          </motion.p>
        )}
      </AnimatePresence>
    </SlideFrame>
  );
}
