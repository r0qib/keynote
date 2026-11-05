import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, Kicker, Mascot } from '../components/deck';

const FLOOR_Y = 920;
const FENCE_TOP = 690;
const FENCE_SPAN = [900, 1800];
const PICKET = { width: 52, gap: 22, point: 28 };
const PITCH = PICKET.width + PICKET.gap;
const PICKET_COUNT = Math.floor((FENCE_SPAN[1] - FENCE_SPAN[0] + PICKET.gap) / PITCH);
const FENCE_WIDTH = PICKET_COUNT * PITCH - PICKET.gap;
const FENCE_LEFT = FENCE_SPAN[0] + (FENCE_SPAN[1] - FENCE_SPAN[0] - FENCE_WIDTH) / 2;
const TICKET_WIDTH = 720;
// The head shows above the fence; the laptop (lower 60% of the pose) stays hidden below FENCE_TOP.
const MASCOT = { left: 905, size: 400, peek: 156 };

const CRITERIA = ['Table: name, field, status', 'Search', 'Pagination'];

function Ticket() {
  return (
    <motion.div
      data-mock
      className="absolute rounded-[32px] border-[6px] border-ink bg-surface px-[44px] py-[40px] shadow-[0_24px_48px_rgba(17,17,19,0.10)]"
      style={{ left: 120, width: TICKET_WIDTH, bottom: 1080 - FLOOR_Y }}
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...gentleSpring, delay: 0.35 }}
    >
      <div className="flex items-center gap-[16px]">
        <span className="rounded-[12px] bg-tint-count px-[16px] py-[6px] font-mono text-[28px] font-semibold text-accent-teal">INQ-1428</span>
        <span className="text-[28px] font-medium text-muted">Story</span>
      </div>
      <div className="mt-[24px] text-[46px] font-bold leading-[1.12] text-ink">Show a list of wellbores.</div>
      <div className="mt-[28px] flex flex-col gap-[16px]">
        {CRITERIA.map((c) => (
          <div key={c} className="flex items-center gap-[16px] text-[32px] font-medium text-muted">
            <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[10px] bg-accent-green">
              <Check size={28} strokeWidth={3.5} color="#FFFFFF" />
            </span>
            {c}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Fence() {
  const railY = [FENCE_TOP + 70, FLOOR_Y - 70];
  return (
    <svg className="absolute left-0 top-0" width="1920" height="1080" viewBox="0 0 1920 1080" aria-hidden="true">
      {railY.map((y, i) => (
        <motion.path
          key={y}
          d={`M ${FENCE_LEFT - 12} ${y} L ${FENCE_LEFT + FENCE_WIDTH + 12} ${y}`}
          stroke={colors.ink}
          strokeWidth="18"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.9, ease: appleEase, delay: i * 0.1 }}
        />
      ))}
      {Array.from({ length: PICKET_COUNT }, (_, i) => {
        const x = FENCE_LEFT + i * (PICKET.width + PICKET.gap);
        const { width: w, point: p } = PICKET;
        return (
          <motion.path
            key={i}
            d={`M ${x} ${FLOOR_Y} L ${x} ${FENCE_TOP} L ${x + w / 2} ${FENCE_TOP - p} L ${x + w} ${FENCE_TOP} L ${x + w} ${FLOOR_Y} Z`}
            fill={colors.surface}
            stroke={colors.ink}
            strokeWidth="5"
            strokeLinejoin="round"
            style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5, ease: appleEase, delay: 0.15 + i * 0.04 }}
          />
        );
      })}
    </svg>
  );
}

// Abstract "great product" silhouettes, no text. Bottoms sit behind the fence.
function Products() {
  const rise = (delay) => ({
    initial: { y: 320, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.9, ease: appleEase, delay },
  });
  return (
    <>
      {/* Phone */}
      <motion.div
        className="absolute rounded-[48px] bg-ink p-[14px]"
        style={{ left: 1290, top: 320, width: 200, height: 460 }}
        {...rise(0.7)}
      >
        <div className="flex h-full flex-col gap-[14px] rounded-[36px] bg-surface p-[20px]">
          <div className="mx-auto h-[10px] w-[56px] rounded-full bg-line" />
          <div className="h-[100px] rounded-[20px] bg-accent-teal" />
          <div className="flex gap-[12px]">
            <div className="h-[60px] flex-1 rounded-[14px] bg-tint-count" />
            <div className="h-[60px] flex-1 rounded-[14px] bg-tint-how" />
          </div>
          <div className="h-[16px] w-[80%] rounded-full bg-line" />
          <div className="h-[16px] w-[60%] rounded-full bg-line" />
        </div>
      </motion.div>

      {/* Dashboard window */}
      <motion.div
        className="absolute rounded-[32px] border-[6px] border-ink bg-surface"
        style={{ left: 1520, top: 420, width: 280, height: 400 }}
        {...rise(0.85)}
      >
        <div className="flex gap-[10px] border-b-[4px] border-line px-[24px] py-[18px]">
          {['#E5484D', '#D97706', '#1E9E6A'].map((c) => (
            <span key={c} className="h-[18px] w-[18px] rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex h-[170px] items-end gap-[12px] px-[24px] pt-[24px]">
          {[45, 70, 55, 95, 80].map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-[10px] ${i === 3 ? 'bg-accent-teal' : 'bg-tint-how'}`}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </motion.div>

      {/* Floating card */}
      <motion.div
        className="absolute flex items-center justify-center rounded-[36px] bg-accent-teal shadow-[0_24px_48px_rgba(14,124,134,0.25)]"
        style={{ left: 1650, top: 236, width: 150, height: 150 }}
        {...rise(1.0)}
      >
        <svg width="96" height="96" viewBox="0 0 130 130" aria-hidden="true">
          <circle cx="65" cy="65" r="48" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="16" />
          <circle
            cx="65"
            cy="65"
            r="48"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 48 * 0.72} ${2 * Math.PI * 48}`}
            transform="rotate(-90 65 65)"
          />
        </svg>
      </motion.div>
    </>
  );
}

function Peek() {
  return (
    <div className="absolute overflow-hidden" style={{ left: MASCOT.left, top: FENCE_TOP - MASCOT.size, width: MASCOT.size, height: MASCOT.size }}>
      <motion.div
        initial={{ y: MASCOT.size }}
        animate={{ y: MASCOT.size - MASCOT.peek }}
        transition={{ ...gentleSpring, delay: 0.75 }}
      >
        <Mascot pose="meat-lurk" preset="none" size={MASCOT.size} />
      </motion.div>
    </div>
  );
}

export default function S25_TicketFloor({ buildStep = 0 }) {
  const fence = buildStep >= 1;

  return (
    <SlideFrame>
      <Headline initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
        The ticket is the floor,
        <br />
        not the ceiling.
      </Headline>

      <AnimatePresence>
        {fence && (
          <Kicker
            key="line"
            className="mt-[28px] !text-accent-teal"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: appleEase, delay: 1.2 }}
          >
            Look over the fence.
          </Kicker>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fence && (
          <motion.div key="beyond" className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.2 } }}>
            <Products />
            <Fence />
            <Peek />
          </motion.div>
        )}
      </AnimatePresence>

      <svg className="absolute left-0 top-0" width="1920" height="1080" viewBox="0 0 1920 1080" aria-hidden="true">
        <motion.path
          d={`M 60 ${FLOOR_Y} L 1860 ${FLOOR_Y}`}
          stroke={colors.ink}
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: appleEase }}
        />
      </svg>

      <Ticket />
    </SlideFrame>
  );
}
