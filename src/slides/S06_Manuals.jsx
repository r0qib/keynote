import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, MapPin, FileText, UserCheck } from 'lucide-react';
import { appleEase, gentleSpring } from '../motion.js';
import { colors } from '../theme.js';
import { Headline, Mascot, SlideFrame } from '../components/deck';

const STAGES = [
  { label: 'Capture', icon: Camera },
  { label: 'Annotate', icon: MapPin },
  { label: 'Write', icon: FileText },
  { label: 'Review', icon: UserCheck },
];

// Index of the last lit stage per build.
const LIT_UNTIL = [0, 2, 3];

const STEPS = ['Pick the well.', 'Set the depth range.', 'Click Export.'];

const WELLS = ['Well A-12', 'Well B-07', 'Well C-03', 'Well D-21', 'Well E-15'];

// Pin centres inside the 800 × 580 screenshot.
const PINS = [
  { n: 1, x: 228, y: 180 },
  { n: 2, x: 660, y: 98 },
  { n: 3, x: 616, y: 488 },
];

const PAGE_HEIGHT = 660;
const CIRCLE = 64;
const UNLIT_FILL = '#D9D9E0';
const UNLIT_BORDER = '#B9B9C4';

function Stepper({ buildStep }) {
  const lit = LIT_UNTIL[Math.min(buildStep, LIT_UNTIL.length - 1)];
  return (
    <div className="mt-[32px] flex items-center gap-[24px]">
      {STAGES.map(({ label, icon: Icon }, i) => {
        const on = i <= lit;
        return (
          <React.Fragment key={label}>
            {i > 0 && (
              <div className="relative h-[4px] flex-1 rounded-full bg-line">
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent-green"
                  style={{ originX: 0 }}
                  initial={false}
                  animate={{ scaleX: on ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: on ? i * 0.12 - 0.08 : 0, ease: appleEase }}
                />
              </div>
            )}
            <div className="flex items-center gap-[20px]">
              <motion.div
                className="flex items-center justify-center rounded-full border-[3px]"
                style={{ width: CIRCLE, height: CIRCLE }}
                initial={false}
                animate={{
                  backgroundColor: on ? colors.green : colors.surface,
                  borderColor: on ? colors.green : UNLIT_BORDER,
                  color: on ? '#FFFFFF' : colors.muted,
                }}
                transition={{ duration: 0.4, delay: on ? i * 0.12 : 0 }}
              >
                <Icon size={32} strokeWidth={2.25} />
              </motion.div>
              <motion.span
                className="text-body font-semibold"
                initial={false}
                animate={{ color: on ? colors.ink : colors.muted }}
                transition={{ duration: 0.4, delay: on ? i * 0.12 : 0 }}
              >
                {label}
              </motion.span>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

// Text that wipes in over a grey skeleton bar once `written` is true.
function Written({ written, delay = 0, className = '', children }) {
  return (
    <span className={`relative inline-block ${className}`}>
      <motion.span
        className="absolute inset-y-[18%] left-0 right-[12%] rounded-full bg-[#D9D9E0]"
        initial={false}
        animate={{ opacity: written ? 0 : 1 }}
        transition={{ duration: 0.3, delay: written ? delay + 0.3 : 0 }}
      />
      <motion.span
        className="relative block whitespace-nowrap"
        initial={false}
        animate={{ clipPath: written ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)' }}
        transition={{ duration: 0.7, delay: written ? delay : 0, ease: appleEase }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function Screenshot({ annotated }) {
  return (
    <div className="relative h-[580px] w-[800px] shrink-0 overflow-hidden rounded-[22px] border-2 border-line bg-[#F4F5F7]">
      <div className="absolute inset-x-0 top-0 flex h-[60px] items-center gap-[10px] border-b-2 border-line bg-surface px-[22px]">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[16px] w-[16px] rounded-full bg-line" />
        ))}
        <span className="ml-[16px] text-[24px] font-semibold text-ink">WellMate</span>
      </div>

      <div className="absolute bottom-0 left-0 top-[60px] w-[240px] border-r-2 border-line bg-surface px-[16px] pt-[24px]">
        {WELLS.map((w, i) => (
          <div
            key={w}
            className="mb-[12px] flex h-[56px] items-center rounded-[12px] px-[16px] text-[24px]"
            style={
              i === 1
                ? { backgroundColor: '#E3EFFA', color: colors.blue, fontWeight: 700 }
                : { color: colors.muted, fontWeight: 500 }
            }
          >
            {w}
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 left-[240px] right-0 top-[60px] px-[36px]">
        <div className="mt-[28px] w-fit text-[24px] font-semibold text-muted">Depth range</div>
        <div className="relative mt-[28px] h-[10px] rounded-full bg-[#DADAE2]">
          <div className="absolute inset-y-0 left-[100px] w-[260px] rounded-full bg-accent-blue" />
          {[100, 360].map((x) => (
            <span
              key={x}
              className="absolute top-1/2 h-[30px] w-[30px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-accent-blue bg-surface"
              style={{ left: x }}
            />
          ))}
        </div>
        <div className="mt-[44px] h-[240px] rounded-[16px] border-2 border-line bg-surface p-[18px]">
          <svg viewBox="0 0 360 160" className="h-full w-full" preserveAspectRatio="none">
            <polyline
              points="0,130 40,112 80,120 120,84 160,92 200,56 240,70 280,40 320,52 360,24"
              fill="none"
              stroke={colors.blue}
              strokeWidth="4"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="absolute bottom-[32px] right-[36px] flex h-[60px] items-center rounded-[14px] bg-accent-blue px-[30px] text-[26px] font-semibold text-white">
          Export
        </div>
      </div>

      <AnimatePresence>
        {annotated &&
          PINS.map((p, i) => (
            <motion.span
              key={p.n}
              data-overlap-ok
              className="absolute flex h-[60px] w-[60px] items-center justify-center rounded-full border-[3px] border-white bg-accent-green text-[30px] font-bold text-white shadow-[0_6px_16px_rgba(17,17,19,0.18)]"
              style={{ left: p.x - 30, top: p.y - 30 }}
              initial={{ opacity: 0, scale: 0.4, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ ...gentleSpring, delay: 0.1 + i * 0.15 }}
            >
              {p.n}
            </motion.span>
          ))}
      </AnimatePresence>
    </div>
  );
}

function ManualPage({ buildStep }) {
  const written = buildStep >= 1;
  const reviewed = buildStep >= 2;
  return (
    <motion.div
      data-mock
      className="relative mt-auto flex gap-[64px] rounded-[32px] border-2 border-line bg-surface p-[38px] shadow-[0_24px_60px_rgba(17,17,19,0.08)]"
      style={{ height: PAGE_HEIGHT }}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: appleEase }}
    >
      <Screenshot annotated={written} />

      <div className="flex flex-col pt-[8px]">
        <div className="w-fit font-mono text-[26px] font-semibold text-muted">WellMate · User guide</div>
        <Written written={written} delay={0} className="mt-[12px] self-start text-[48px] font-bold leading-[1.15] text-ink">
          Export a drilling report
        </Written>

        <ol className="mt-[44px] flex flex-col gap-[28px]">
          {STEPS.map((step, i) => (
            <li key={step} className="flex items-center gap-[20px]">
              <motion.span
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full text-[28px] font-bold"
                initial={false}
                animate={{
                  backgroundColor: written ? colors.green : UNLIT_FILL,
                  color: written ? '#FFFFFF' : colors.muted,
                }}
                transition={{ duration: 0.4, delay: written ? 0.55 + i * 0.15 : 0 }}
              >
                {i + 1}
              </motion.span>
              <Written written={written} delay={0.55 + i * 0.15} className="text-body font-semibold text-ink">
                {step}
              </Written>
            </li>
          ))}
        </ol>
      </div>

      <AnimatePresence>
        {reviewed && (
          <motion.div
            key="stamp"
            className="absolute bottom-[96px] right-[280px] rounded-[14px] border-[4px] border-accent-green px-[24px] py-[8px] text-[40px] font-extrabold uppercase tracking-[0.12em] text-accent-green"
            initial={{ opacity: 0, scale: 1.6, rotate: -14 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            exit={{ opacity: 0 }}
            transition={{ ...gentleSpring, delay: 0.35 }}
          >
            Reviewed
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {reviewed && (
          <motion.div
            key="mascot"
            className="absolute bottom-[38px] right-[48px]"
            initial={{ opacity: 0, y: 48, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={gentleSpring}
          >
            <Mascot pose="meat-done" preset="none" size={200} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function S06_Manuals({ buildStep = 0 }) {
  return (
    <SlideFrame>
      <Headline
        className="whitespace-nowrap"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
      >
        Our user manuals write themselves.
      </Headline>

      <Stepper buildStep={buildStep} />
      <ManualPage buildStep={buildStep} />
    </SlideFrame>
  );
}
