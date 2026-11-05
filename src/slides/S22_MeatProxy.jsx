import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, Mascot, CodeWindow } from '../components/deck';

const COMMITS = [
  ['a1f3c2', 'forward client email to AI'],
  ['b7e9d1', 'paste AI answer to client'],
  ['d9b6e3', 'ask AI what the client meant'],
  ['e2c1f7', 'who is JSON?'],
];

// Pipe geometry, laid out around a centre line at y = 400; the whole row drops lower while it's alone.
const ROW_Y = 400;
const ALONE_OFFSET = 160;
const NODE = 200;
const MASCOT = 300;
const SEGMENTS = [
  [360, 770],
  [1150, 1560],
];

function Arrows({ from, to, delay }) {
  const head = 22;
  return (
    <g stroke={colors.ink} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <motion.path
        d={`M ${from} ${ROW_Y - 22} L ${to} ${ROW_Y - 22} M ${to - head} ${ROW_Y - 22 - head} L ${to} ${ROW_Y - 22} L ${to - head} ${ROW_Y - 22 + head}`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: appleEase, delay }}
      />
      <motion.path
        d={`M ${to} ${ROW_Y + 22} L ${from} ${ROW_Y + 22} M ${from + head} ${ROW_Y + 22 - head} L ${from} ${ROW_Y + 22} L ${from + head} ${ROW_Y + 22 + head}`}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, ease: appleEase, delay: delay + 0.15 }}
      />
    </g>
  );
}

function Node({ x, label, dark, children }) {
  return (
    <div className="absolute flex flex-col items-center" style={{ left: x, top: ROW_Y - NODE / 2, width: NODE }}>
      <div
        className={`flex items-center justify-center rounded-[48px] border-[6px] ${dark ? 'border-ink bg-ink' : 'border-ink bg-surface'}`}
        style={{ width: NODE, height: NODE }}
      >
        {children}
      </div>
      <span className="mt-[20px] text-[40px] font-semibold leading-none text-ink">{label}</span>
    </div>
  );
}

export default function S22_MeatProxy({ buildStep = 0 }) {
  const shown = Math.min(buildStep, COMMITS.length);
  const shrug = buildStep >= 5;

  return (
    <SlideFrame>
      <Headline initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
        Don&apos;t be a <span className="text-accent-coral">meat proxy.</span>
      </Headline>

      <motion.div
        className="absolute left-0 top-0 h-[1080px] w-[1920px]"
        initial={false}
        animate={{ y: shown > 0 ? 0 : ALONE_OFFSET }}
        transition={{ duration: 0.8, ease: appleEase }}
      >
        <svg className="absolute left-0 top-0" width="1920" height="1080" viewBox="0 0 1920 1080" aria-hidden="true">
          <Arrows from={SEGMENTS[0][0]} to={SEGMENTS[0][1]} delay={0.3} />
          <Arrows from={SEGMENTS[1][0]} to={SEGMENTS[1][1]} delay={0.55} />
        </svg>

        <Node x={120} label="Client">
          <User size={112} strokeWidth={2.2} color={colors.ink} />
        </Node>

        <Node x={1600} label="AI" dark>
          <svg viewBox="0 0 24 24" width="104" height="104" aria-hidden="true">
            <path d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z" fill="#FFFFFF" />
          </svg>
        </Node>

        <div className="absolute" style={{ left: 960 - MASCOT / 2, top: ROW_Y - MASCOT / 2, width: MASCOT, height: MASCOT }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={shrug ? 'shrug' : 'proxy'}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              transition={gentleSpring}
            >
              <Mascot pose={shrug ? 'meat-shrug' : 'meat-proxy'} preset="blink" size={MASCOT} />
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {shrug && (
            <motion.div
              key="said-so"
              className="absolute whitespace-nowrap rounded-[32px] rounded-bl-[8px] bg-ink px-[36px] py-[24px] text-[44px] font-bold leading-[1.1] text-white"
              style={{ left: 1120, top: 236, transformOrigin: '0% 100%' }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ ...gentleSpring, delay: 0.35 }}
            >
              The model said so.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {shown > 0 && (
          <CodeWindow
            key="log"
            variant="terminal"
            data-mock
            className="absolute"
            style={{ left: 340, top: 590 }}
            bodyClassName="py-[32px]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: appleEase, delay: 0.2 }}
          >
            <div className="text-[#B4B4C0]">$ git log --oneline --reverse</div>
            {COMMITS.slice(0, shown).map(([hash, msg], i) => {
              const last = i === COMMITS.length - 1;
              return (
                <motion.div
                  key={hash}
                  initial={{ clipPath: 'inset(0 100% 0 0)' }}
                  animate={{ clipPath: 'inset(0 0% 0 0)' }}
                  transition={{ duration: 0.7, ease: 'linear', delay: i === 0 ? 0.6 : 0.1 }}
                >
                  <span className="text-[#E8C46A]">{hash}</span>{' '}
                  <span className={last ? 'font-bold text-accent-coral' : ''}>{msg}</span>
                </motion.div>
              );
            })}
          </CodeWindow>
        )}
      </AnimatePresence>
    </SlideFrame>
  );
}
