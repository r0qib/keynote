import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';
import { appleEase, gentleSpring } from '../motion.js';
import { colors } from '../theme.js';
import { Headline, SlideFrame } from '../components/deck';

// Placeholder: replace with the real poll link before the talk.
export const POLL_URL = 'https://forms.office.com/r/informatiq-ai';
const POLL_LABEL = POLL_URL.replace(/^https?:\/\//, '');

const QR_SIZE = 640;
const QR_MARGIN = 1;
const SCAN = { duration: 1.0, delay: 0.3, ease: 'easeInOut' };

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
  const closed = buildStep >= 1;
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
          <motion.p
            className="mt-[56px] font-mono text-body font-semibold"
            initial={{ opacity: 0, y: 12, color: colors.ink }}
            animate={{ opacity: 1, y: 0, color: closed ? colors.muted : colors.ink }}
            transition={{ duration: 0.5, delay: 0.2, ease: appleEase }}
          >
            {POLL_LABEL}
          </motion.p>
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
