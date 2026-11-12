import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';
import { appleEase, gentleSpring } from '../motion.js';
import { colors } from '../theme.js';
import { Headline, SlideFrame } from '../components/deck';

export const POLL_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeyGE2MdQ7CtcFBG0Ui6CWwbMfpkZ1JuyOraXECVXS6Ic55pg/viewform?usp=publish-editor';

const QR_SIZE = 640;
const QR_MARGIN = 1;
const SCAN = { duration: 1.0, delay: 0.3, ease: 'easeInOut' };

const TIMER_SECONDS = 120;
const TIMER_WARN = 10;
const RING = 168;
const RING_STROKE = 14;
const RING_R = (RING - RING_STROKE) / 2;
const RING_C = 2 * Math.PI * RING_R;

// Remaining seconds; counts down from the first build that sets `running`, resets at build 0.
function useCountdown(running, frozen) {
  const startRef = useRef(null);
  const [now, setNow] = useState(() => performance.now());

  useEffect(() => {
    if (!running) {
      startRef.current = null;
      return undefined;
    }
    if (startRef.current === null) startRef.current = performance.now();
    if (frozen) return undefined;
    let raf;
    const tick = () => {
      setNow(performance.now());
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [running, frozen]);

  if (!running || startRef.current === null) return TIMER_SECONDS;
  return Math.max(0, TIMER_SECONDS - (now - startRef.current) / 1000);
}

function PollTimer({ running, closed }) {
  const remaining = useCountdown(running, closed);
  const secs = Math.ceil(remaining);
  const label = `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;
  const warn = running && !closed && remaining <= TIMER_WARN;
  const tone = closed ? colors.muted : warn ? colors.coral : running ? colors.ink : colors.muted;

  return (
    <motion.div
      className="mt-[80px] flex items-center gap-[40px]"
      style={{ transformOrigin: 'left center' }}
      initial={{ opacity: 0, y: 12, scale: 0.62 }}
      animate={{ opacity: closed ? 0.55 : 1, y: 0, scale: running ? 1 : 0.62 }}
      transition={{ opacity: { duration: 0.5 }, y: { duration: 0.5, delay: 0.35, ease: appleEase }, scale: gentleSpring }}
    >
      <svg width={RING} height={RING} viewBox={`0 0 ${RING} ${RING}`} className="shrink-0 -rotate-90">
        <circle cx={RING / 2} cy={RING / 2} r={RING_R} fill="none" stroke={colors.line} strokeWidth={RING_STROKE} />
        <motion.circle
          cx={RING / 2}
          cy={RING / 2}
          r={RING_R}
          fill="none"
          strokeWidth={RING_STROKE}
          strokeLinecap="round"
          strokeDasharray={RING_C}
          strokeDashoffset={RING_C * (1 - remaining / TIMER_SECONDS)}
          style={{ opacity: remaining > 0 ? 1 : 0 }}
          animate={{ stroke: tone }}
          transition={{ duration: 0.4 }}
        />
      </svg>
      <motion.span
        key={warn ? secs : 'steady'}
        className="font-mono font-bold tabular-nums"
        style={{ fontSize: 140, lineHeight: 1, letterSpacing: '-0.02em' }}
        initial={warn ? { scale: 1.08, color: tone } : false}
        animate={{ scale: 1, color: tone }}
        transition={{ scale: { duration: 0.5, ease: appleEase }, color: { duration: 0.4 } }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}

function useQrPath(text) {
  return useMemo(() => {
    const { modules } = QRCode.create(text, { errorCorrectionLevel: 'Q' });
    const n = modules.size;
    let d = '';
    for (let y = 0; y < n; y += 1) {
      for (let x = 0; x < n; x += 1) {
        if (modules.get(x, y)) d += `M${x} ${y}h1v1h-1z`;
      }
    }
    return { d, size: n };
  }, [text]);
}

export default function S07_Poll({ buildStep = 0 }) {
  const running = buildStep >= 1;
  const closed = buildStep >= 2;
  const qr = useQrPath(POLL_URL);
  const box = qr.size + QR_MARGIN * 2;

  return (
    <SlideFrame>
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col">
          <Headline
            style={{ fontSize: 112, lineHeight: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: appleEase }}
          >
            Be honest.
            <br />
            It&rsquo;s anonymous.
          </Headline>
          <PollTimer running={running} closed={closed} />
        </div>

        <motion.div
          className="relative rounded-[40px] border-[3px] bg-surface p-[40px] shadow-[0_24px_60px_rgba(17,17,19,0.08)]"
          initial={{ opacity: 0, scale: 0.94, borderColor: colors.line }}
          animate={
            closed
              ? { opacity: 1, scale: [1, 1.04, 1], borderColor: colors.green, backgroundColor: '#EEF7F2' }
              : { opacity: 1, scale: 1, borderColor: colors.line, backgroundColor: colors.surface }
          }
          transition={
            closed
              ? { scale: { duration: 0.7, delay: 0.25, ease: appleEase }, default: { duration: 0.5, ease: appleEase } }
              : { ...gentleSpring, delay: 0.1 }
          }
        >
          <div className="relative" style={{ width: QR_SIZE, height: QR_SIZE }}>
            <motion.svg
              viewBox={`${-QR_MARGIN} ${-QR_MARGIN} ${box} ${box}`}
              width={QR_SIZE}
              height={QR_SIZE}
              shapeRendering="crispEdges"
              className="absolute inset-0"
              initial={{ clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)', opacity: closed ? 0 : 1, scale: closed ? 0.9 : 1 }}
              transition={{ clipPath: SCAN, opacity: { duration: 0.4 }, scale: { duration: 0.5, ease: appleEase } }}
              aria-label={POLL_URL}
            >
              <path d={qr.d} fill={colors.ink} />
            </motion.svg>

            <motion.div
              className="absolute inset-x-[-12px] h-[6px] rounded-full bg-ink"
              initial={{ top: '0%', opacity: 0 }}
              animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
              transition={{ top: SCAN, opacity: { ...SCAN, times: [0, 0.1, 0.85, 1] } }}
            />

            <AnimatePresence>
              {closed && (
                <motion.svg
                  key="done"
                  viewBox="0 0 640 640"
                  width={QR_SIZE}
                  height={QR_SIZE}
                  className="absolute inset-0"
                >
                  <motion.path
                    d="M168 336 L276 444 L484 212"
                    fill="none"
                    stroke={colors.green}
                    strokeWidth="56"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: appleEase }}
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
