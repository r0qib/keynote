import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { TheNumber, Headline, InfinityMark, Mascot } from '../components/deck';

// b1+: the number parks small at the top (row centre 540 → 150).
const NUMBER_PARKED = { opacity: 0.85, scale: 0.3, y: -390, filter: 'blur(0px)' };
const NUMBER_HERO = { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' };

const APP = { left: 280, top: 392, width: 1000, height: 460 };
const WIPE_DELAY = 1.4;
const WIPE_DURATION = 1.1;

export default function S38_Unlimited({ buildStep = 0 }) {
  return (
    <div className="absolute inset-0 text-ink">
      <TheNumber
        initial={{ opacity: 0, scale: 0.96, filter: 'blur(12px)' }}
        animate={buildStep === 0 ? NUMBER_HERO : NUMBER_PARKED}
        transition={buildStep === 0 ? { duration: 1.1, ease: appleEase, delay: 0.2 } : { duration: 0.8, ease: appleEase }}
      />

      <AnimatePresence>
        {buildStep >= 1 && (
          <Headline
            key="headline"
            className="absolute left-0 top-[232px] w-[1920px] text-center whitespace-nowrap"
            style={{ fontSize: 120 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.7, ease: appleEase, delay: 0.25 }}
          >
            {'“It’s unlimited.”'}
          </Headline>
        )}

        {buildStep === 1 && (
          <motion.div
            key="infinity"
            className="absolute left-[510px] top-[404px]"
            exit={{ opacity: 0, scale: 0.86, transition: { duration: 0.45, ease: appleEase } }}
          >
            <InfinityMark width={860} stroke={40} delay={0.5} duration={1.6} />
          </motion.div>
        )}

        {buildStep === 1 && (
          <motion.div
            key="from-to"
            className="absolute left-0 top-[866px] w-[1920px] flex items-center justify-center gap-[32px]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, ease: appleEase, delay: 1.4 }}
          >
            <span className="h-[68px] px-[32px] flex items-center rounded-full border-[3px] border-[#C9C9D2] text-body font-semibold text-muted">
              GitHub Copilot
            </span>
            <svg width="96" height="40" viewBox="0 0 96 40" aria-hidden>
              <path d="M4 20 H84 M66 6 L86 20 L66 34" fill="none" stroke={colors.ink} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="h-[68px] px-[32px] flex items-center rounded-full bg-ink text-body font-semibold text-white">
              Claude Code
            </span>
          </motion.div>
        )}

        {buildStep >= 2 && <AllIn key="all-in" />}
      </AnimatePresence>
    </div>
  );
}

// b2: a sketchy wireframe draws on, then the polished app wipes over it; one month later.
function AllIn() {
  return (
    <motion.div className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      <motion.div
        className="absolute"
        style={APP}
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: appleEase, delay: 0.3 }}
      >
        <Wireframe />
        <motion.div
          className="absolute inset-0"
          initial={{ clipPath: 'inset(0% 100% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: WIPE_DURATION, ease: appleEase, delay: WIPE_DELAY }}
        >
          <PolishedApp />
        </motion.div>
        <motion.div
          className="absolute top-[-16px] bottom-[-16px] w-[6px] rounded-full bg-accent-blue"
          initial={{ left: -3, opacity: 0 }}
          animate={{ left: [-3, APP.width - 3], opacity: [0, 1, 1, 0] }}
          transition={{ duration: WIPE_DURATION, ease: appleEase, delay: WIPE_DELAY, opacity: { duration: WIPE_DURATION, times: [0, 0.1, 0.8, 1], delay: WIPE_DELAY } }}
        />
      </motion.div>

      <svg className="absolute left-[280px] top-[884px]" width="1120" height="40" viewBox="0 0 1120 40" aria-hidden>
        <circle cx="10" cy="20" r="10" fill={colors.ink} />
        <motion.path
          d="M10 20 H1100 M1084 6 L1104 20 L1084 34"
          fill="none"
          stroke={colors.ink}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: WIPE_DURATION, ease: appleEase, delay: WIPE_DELAY, opacity: { duration: 0.1, delay: WIPE_DELAY } }}
        />
      </svg>

      <motion.div
        className="absolute left-[1424px] top-[872px] text-sub font-bold whitespace-nowrap"
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: appleEase, delay: WIPE_DELAY + WIPE_DURATION - 0.1 }}
      >
        1 month
      </motion.div>

      <Mascot
        pose="meat-rocket"
        preset="none"
        size={300}
        className="absolute left-[1372px] top-[500px]"
        initial={{ opacity: 0, y: 180, rotate: -8 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ ...gentleSpring, delay: 0.5 }}
      />
    </motion.div>
  );
}

const SKETCH = { fill: 'none', stroke: colors.ink, strokeWidth: 6, strokeLinecap: 'round', strokeLinejoin: 'round' };

const WIREFRAME_SHAPES = [
  'M30 6 H970 Q994 6 994 30 V430 Q994 454 970 454 H30 Q6 454 6 430 V30 Q6 6 30 6 Z',
  'M6 72 H994',
  'M226 72 V454',
  'M36 38 m-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0',
  'M84 38 H190 M780 38 H900',
  'M42 118 H186 M42 168 H160 M42 218 H176 M42 268 H150',
  'M256 100 H478 V212 H256 Z M500 100 H722 V212 H500 Z M744 100 H966 V212 H744 Z',
  'M280 140 H400 M280 180 H360 M524 140 H660 M524 180 H600 M768 140 H880 M768 180 H840',
  'M256 238 H710 V426 H256 Z',
  'M284 396 L350 340 L410 366 L480 300 L550 326 L620 270 L684 290',
  'M734 238 H966 V426 H734 Z M734 238 L966 426 M966 238 L734 426',
];

function Wireframe() {
  return (
    <svg width={APP.width} height={APP.height} viewBox={`0 0 ${APP.width} ${APP.height}`} className="absolute inset-0" aria-hidden>
      <defs>
        <filter id="s38-rough" x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="5" />
        </filter>
      </defs>
      <rect x="6" y="6" width="988" height="448" rx="24" fill={colors.surface} />
      <g filter="url(#s38-rough)">
        {WIREFRAME_SHAPES.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            {...SKETCH}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: appleEase, delay: 0.4 + i * 0.05, opacity: { duration: 0.1, delay: 0.4 + i * 0.05 } }}
          />
        ))}
      </g>
    </svg>
  );
}

function PolishedApp() {
  return (
    <div className="absolute inset-0 rounded-[24px] overflow-hidden bg-surface border-[3px] border-line shadow-[0_24px_60px_rgba(17,17,19,0.14)]" data-mock>
      <div className="absolute left-0 right-0 top-0 h-[72px] flex items-center gap-[20px] px-[24px] border-b-[3px] border-line">
        <span className="w-[32px] h-[32px] rounded-[10px] bg-accent-blue" />
        <span className="w-[110px] h-[18px] rounded-full bg-[#D5DAE3]" />
        <span className="w-[80px] h-[18px] rounded-full bg-[#E4E7EE]" />
        <span className="ml-auto w-[140px] h-[36px] rounded-full bg-[#EEF1F6]" />
        <span className="w-[36px] h-[36px] rounded-full bg-mascot" />
      </div>
      <div className="absolute left-0 top-[72px] bottom-0 w-[224px] bg-[#F4F6FA] px-[20px] pt-[28px] flex flex-col gap-[18px]">
        <span className="h-[34px] rounded-[10px] bg-accent-blue" />
        {[150, 120, 160, 110].map((w) => (
          <span key={w} className="h-[18px] rounded-full bg-[#D5DAE3]" style={{ width: w }} />
        ))}
      </div>
      {[
        { left: 254, color: colors.blue },
        { left: 498, color: colors.teal },
        { left: 742, color: colors.green },
      ].map((card) => (
        <div key={card.left} className="absolute top-[98px] w-[224px] h-[114px] rounded-[16px] border-[3px] border-line p-[20px] flex flex-col justify-between" style={{ left: card.left }}>
          <span className="w-[90px] h-[14px] rounded-full bg-[#D5DAE3]" />
          <span className="w-[140px] h-[30px] rounded-[8px]" style={{ background: card.color }} />
        </div>
      ))}
      <div className="absolute left-[254px] top-[236px] w-[456px] h-[192px] rounded-[16px] border-[3px] border-line overflow-hidden">
        <svg width="456" height="192" viewBox="0 0 456 192" className="absolute inset-0" aria-hidden>
          <path d="M0 170 L60 128 L120 146 L190 88 L260 108 L330 52 L400 70 L456 40 V192 H0 Z" fill="#DCEBFA" />
          <path d="M0 170 L60 128 L120 146 L190 88 L260 108 L330 52 L400 70 L456 40" fill="none" stroke={colors.blue} strokeWidth="6" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="absolute left-[732px] top-[236px] w-[234px] h-[192px] rounded-[16px] overflow-hidden bg-[#E6F2F3]">
        <svg width="234" height="192" viewBox="0 0 234 192" className="absolute inset-0" aria-hidden>
          <ellipse cx="117" cy="96" rx="96" ry="70" fill="none" stroke="#9CCBD0" strokeWidth="4" />
          <ellipse cx="117" cy="96" rx="62" ry="44" fill="none" stroke="#6DB2B9" strokeWidth="4" />
          <ellipse cx="117" cy="96" rx="28" ry="20" fill="none" stroke={colors.teal} strokeWidth="4" />
          <circle cx="82" cy="70" r="9" fill={colors.ink} />
          <circle cx="150" cy="118" r="9" fill={colors.ink} />
          <circle cx="164" cy="64" r="9" fill={colors.blue} />
        </svg>
      </div>
    </div>
  );
}
