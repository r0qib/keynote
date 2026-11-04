import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, MousePointer2, Trash2 } from 'lucide-react';
import { appleEase, springPhysics } from '../motion';
import { SlideFrame, Headline, CodeWindow } from '../components/deck';

// Verified wording; sources in deck-v2-workflow/missing-pieces.md § Facts.
const CLAIMS = [
  { quote: 'The first AI software engineer.', source: 'Cognition · Devin · 2024' },
  { quote: 'Can work on many tasks in parallel.', source: 'OpenAI · Codex · 2025' },
  { quote: 'The best coding model in the world.', source: 'Anthropic · Claude Opus 4 · 2025' },
];

const REQUEST = 'Add a confirmation before deleting a well.';
const REPLY = 'Added a confirmation dialog.';

// Reveals `text` one character at a time once `active` turns true.
function useTypewriter(text, active, { delay = 0, speed = 24, instant = false } = {}) {
  const [count, setCount] = useState(instant ? text.length : 0);
  useEffect(() => {
    if (!active) {
      setCount(0);
      return undefined;
    }
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        setCount((n) => {
          if (n >= text.length) {
            clearInterval(interval);
            return n;
          }
          return n + 1;
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [active, text, delay, speed]);
  return text.slice(0, count);
}

function Caret() {
  return <span className="inline-block w-[16px] h-[34px] bg-ink align-[-6px] ml-[4px]" />;
}

// Delete → toast → the confirmation dialog, too late.
function DeleteMock() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const deleted = setTimeout(() => setPhase(1), 800);
    const asked = setTimeout(() => setPhase(2), 1900);
    return () => {
      clearTimeout(deleted);
      clearTimeout(asked);
    };
  }, []);

  return (
    <motion.div
      data-mock
      data-overlap-ok
      className="relative mt-[40px] h-[376px] rounded-[20px] bg-[#F4F4F7] border-2 border-line overflow-hidden font-sans whitespace-normal"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: appleEase }}
    >
      <div className="absolute left-[28px] top-[22px] text-[28px] font-bold text-ink">Wells</div>

      <motion.div
        className="absolute left-[24px] right-[24px] top-[80px] h-[88px] rounded-[16px] bg-surface border-2 border-line flex items-center justify-between pl-[28px] pr-[20px]"
        animate={phase >= 1 ? { opacity: 0, x: -32 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: appleEase }}
      >
        <span className="text-[30px] font-semibold text-ink">Well A-12</span>
        <motion.span
          className="flex items-center gap-[8px] h-[56px] px-[22px] rounded-[12px] border-2 border-accent-coral text-accent-coral text-[26px] font-semibold"
          animate={{ scale: [1, 1, 0.9, 1] }}
          transition={{ duration: 0.8, times: [0, 0.75, 0.85, 1] }}
        >
          <Trash2 size={24} strokeWidth={2.5} />
          Delete
        </motion.span>
      </motion.div>

      <motion.div
        className="absolute left-[580px] top-[260px] text-ink"
        initial={{ x: 0, y: 0, opacity: 1 }}
        animate={{ x: 50, y: -144, opacity: phase >= 2 ? 0 : 1 }}
        transition={{ x: { duration: 0.6, ease: appleEase }, y: { duration: 0.6, ease: appleEase }, opacity: { duration: 0.2 } }}
      >
        <MousePointer2 size={44} fill="#111113" stroke="#FFFFFF" strokeWidth={1.5} />
      </motion.div>

      <motion.div
        className="absolute inset-0 bg-ink/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="absolute left-[140px] top-[36px] w-[560px] rounded-[20px] bg-surface px-[36px] py-[30px] shadow-[0_24px_60px_rgba(17,17,19,0.25)]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={springPhysics}
      >
        <div className="text-[30px] leading-[1.25] font-semibold text-ink">Are you sure you want to delete this well?</div>
        <div className="mt-[26px] flex justify-end gap-[16px] text-[26px] font-semibold">
          <span className="h-[56px] px-[24px] rounded-[12px] border-2 border-line text-ink flex items-center">Cancel</span>
          <span className="h-[56px] px-[24px] rounded-[12px] bg-accent-coral text-white flex items-center">Delete</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute left-[24px] bottom-[24px] flex items-center gap-[14px] rounded-[14px] bg-ink px-[24px] py-[14px] text-[28px] font-medium text-white"
        initial={{ opacity: 0, y: 24 }}
        animate={phase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={springPhysics}
      >
        <Check size={28} strokeWidth={3} className="text-[#4ADE9B]" />
        Well deleted.
      </motion.div>
    </motion.div>
  );
}

export default function S09_KeynoteVsTerminal({ buildStep = 0 }) {
  const mountedLate = useRef(buildStep >= 3).current;
  const request = useTypewriter(REQUEST, buildStep >= 2, { delay: 200, speed: 24, instant: mountedLate });
  const requestDone = request.length === REQUEST.length;
  const reply = useTypewriter(REPLY, buildStep >= 2 && requestDone, { delay: 350, speed: 18, instant: mountedLate });
  const replying = buildStep >= 2 && requestDone;

  return (
    <SlideFrame>
      <Headline initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
        The keynote vs. my terminal.
      </Headline>

      <div className="mt-[56px] flex flex-1 gap-[56px]">
        <div className="w-[760px] shrink-0 rounded-[32px] bg-ink px-[64px] py-[56px] flex flex-col justify-center gap-[56px]">
          {CLAIMS.map((claim, i) => {
            const shown = i === 0 || buildStep >= 1;
            return (
              <motion.figure
                key={claim.source}
                initial={false}
                animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{ duration: 0.7, ease: appleEase, delay: shown && i > 0 ? (i - 1) * 0.15 : 0 }}
              >
                <blockquote className="text-[48px] leading-[1.12] font-bold tracking-[-0.01em] text-white">
                  <span className="text-accent-amber">“</span>
                  {claim.quote}
                  <span className="text-accent-amber">”</span>
                </blockquote>
                <figcaption className="mt-[14px] text-[26px] font-medium text-[#B4B4C0]">{claim.source}</figcaption>
              </motion.figure>
            );
          })}
        </div>

        <CodeWindow title="~/wellmate" width={864} bodyClassName="h-[664px]">
          <div className="flex whitespace-pre-wrap leading-[43px] text-ink">
            <span className="w-[36px] shrink-0 text-muted">&gt;</span>
            <span className="font-semibold">
              {request}
              {!replying && <Caret />}
            </span>
          </div>
          {replying && (
            <div className="mt-[20px] whitespace-pre-wrap leading-[43px] text-ink">
              {reply.length > 0 && <span className="font-semibold text-accent-green">Done ✓ </span>}
              {reply}
            </div>
          )}
          {buildStep >= 3 && <DeleteMock />}
        </CodeWindow>
      </div>
    </SlideFrame>
  );
}
