import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, TerminalSquare, Check } from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, WorkflowMiniMap } from '../components/deck';

const BORDER = '#D4D4DC';

// Laptop + progress.md move as one group; centred until the new session needs the right side.
const GROUP = { top: 330, width: 1320, centred: 120 + (1680 - 1320) / 2, left: 120 };
const SCREEN = { left: 40, top: 50, width: 640, height: 440 };
const BASE = { left: 0, top: SCREEN.top + SCREEN.height, width: 720, height: 32 };
const CARD = { left: 800, top: 20, width: 520, height: 620 };
const ROW = { top: 112, height: 60 };
const UNITS = 8;
const RESUME = 7;

const NODE = { left: 1520, width: 280, height: 240 };
const resumeRowY = GROUP.top + CARD.top + ROW.top + (RESUME - 1) * ROW.height + ROW.height / 2;

const FILES = [
  { name: 'progress.md', purpose: 'Unit by unit' },
  { name: 'decisions.md', purpose: 'Mid-run calls' },
  { name: 'notes.md', purpose: 'Memory for fresh agents', disposable: true },
  { name: 'review-log.md', purpose: 'Parked for a human' },
];
const FAN = { top: 340, width: 390, height: 620, gap: 40 };
const fanLeft = (i) => 120 + i * (FAN.width + FAN.gap);
const NOTE_BARS = [300, 240, 280, 200, 260, 220, 290, 180];

// Shows `from`, then switches to `to` after `delay` ms.
function useDelayed(from, to, delay) {
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (from === to) {
      setValue(to);
      return undefined;
    }
    setValue(from);
    const t = setTimeout(() => setValue(to), delay);
    return () => clearTimeout(t);
  }, [from, to, delay]);
  return value;
}

const MARK_COLOR = { x: colors.green, '~': colors.blue, ' ': colors.muted };

function Mark({ from, to, delay }) {
  const state = useDelayed(from, to, delay);
  return (
    <motion.span
      key={state}
      className="inline-block font-bold"
      style={{ color: MARK_COLOR[state] }}
      initial={from === to ? false : { scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={gentleSpring}
    >
      [{state}]
    </motion.span>
  );
}

// Per-build mark for each unit: [from, to, delay ms].
function unitMark(unit, buildStep) {
  if (unit <= 4) return ['x', 'x', 0];
  if (unit === 5) return buildStep === 0 ? [' ', 'x', 700] : ['x', 'x', 0];
  if (unit === 6) return buildStep === 0 ? [' ', 'x', 1300] : ['x', 'x', 0];
  if (unit === 7) {
    if (buildStep === 0) return [' ', '~', 1800];
    if (buildStep === 1) return ['~', '~', 0];
    return ['~', 'x', 2000];
  }
  if (unit === 8) return buildStep >= 2 ? [' ', '~', 2500] : [' ', ' ', 0];
  return [' ', ' ', 0];
}

function ProgressCard({ buildStep }) {
  const resuming = buildStep >= 2;
  return (
    <div
      data-mock
      className="absolute overflow-hidden rounded-[32px] border-[4px] bg-surface"
      style={{ ...CARD, borderColor: resuming ? colors.blue : BORDER }}
    >
      <div className="absolute left-[36px] top-[36px] flex items-center gap-[16px]">
        <FileText size={40} strokeWidth={2.4} color={colors.ink} />
        <span className="font-mono text-[34px] font-bold leading-none text-ink">progress.md</span>
      </div>
      {resuming && (
        <motion.div
          className="absolute left-0 right-0 border-b-[6px]"
          style={{ top: ROW.top, height: ROW.height, background: 'rgba(27,126,208,0.12)', borderColor: colors.blue }}
          initial={{ y: -ROW.height, opacity: 0 }}
          animate={{ y: (RESUME - 1) * ROW.height, opacity: 1 }}
          transition={{ duration: 0.9, ease: appleEase, delay: 0.9 }}
        />
      )}
      {Array.from({ length: UNITS }, (_, i) => {
        const unit = i + 1;
        const [from, to, delay] = unitMark(unit, buildStep);
        return (
          <div
            key={unit}
            className="absolute left-[44px] flex items-center gap-[24px] font-mono text-[32px] leading-none"
            style={{ top: ROW.top + i * ROW.height, height: ROW.height }}
          >
            <Mark from={from} to={to} delay={delay} />
            <span className={unit === RESUME && resuming ? 'font-bold text-ink' : 'text-ink'}>Unit {unit}</span>
          </div>
        );
      })}
    </div>
  );
}

function Battery({ draining }) {
  return (
    <div className="flex items-center">
      <div className="relative h-[30px] w-[60px] rounded-[8px] border-[4px] border-[#B4B4C0] p-[3px]">
        <motion.span
          className="block h-full rounded-[3px]"
          initial={false}
          animate={{ width: draining ? '0%' : '70%', backgroundColor: draining ? colors.coral : colors.green }}
          transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
        />
      </div>
      <span className="ml-[3px] h-[12px] w-[5px] rounded-r-[3px] bg-[#B4B4C0]" />
    </div>
  );
}

const LOG = [
  { text: 'unit 4 · tests pass ✓', delay: 0 },
  { text: 'unit 5 · tests pass ✓', delay: 0.7 },
  { text: 'unit 6 · tests pass ✓', delay: 1.3 },
  { text: 'unit 7 · working…', delay: 1.8 },
];

function Laptop({ dead }) {
  return (
    <>
      <div
        className="absolute overflow-hidden rounded-[28px] border-[14px] border-ink bg-[#16171C]"
        style={SCREEN}
        data-mock
      >
        <div className="flex h-[72px] items-center justify-between bg-[#22232A] px-[28px]">
          <span className="font-mono text-[28px] font-medium text-[#B4B4C0]">session</span>
          <Battery draining={dead} />
        </div>
        <div className="flex flex-col gap-[18px] px-[32px] pt-[32px] font-mono text-[30px] leading-none text-[#ECECF1]">
          {LOG.map(({ text, delay }) => (
            <motion.span
              key={text}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: appleEase, delay }}
            >
              {text}
            </motion.span>
          ))}
        </div>
        <AnimatePresence>
          {dead && (
            <motion.div
              key="off"
              className="absolute inset-0 flex items-center justify-center bg-[#000000]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.95 }}
            >
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: appleEase, delay: 1.4 }}
              >
                <div className="h-[84px] w-[168px] rounded-[18px] border-[8px] border-[#5A5A66] p-[8px]">
                  <span className="block h-full w-[18px] rounded-[6px]" style={{ background: colors.coral }} />
                </div>
                <span className="ml-[6px] h-[32px] w-[12px] rounded-r-[6px] bg-[#5A5A66]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="absolute rounded-b-[24px] rounded-t-[6px] bg-[#C9C9D2]" style={BASE} />
    </>
  );
}

function NewSession() {
  const top = resumeRowY - NODE.height / 2;
  return (
    <>
      <motion.span
        className="absolute h-[6px] rounded-full"
        style={{ left: GROUP.left + CARD.left + CARD.width, top: resumeRowY - 3, width: NODE.left - (GROUP.left + CARD.left + CARD.width), background: colors.blue, transformOrigin: 'right' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: appleEase, delay: 0.6 }}
      />
      <motion.div
        className="absolute flex flex-col items-center justify-center gap-[20px] rounded-[32px] border-[4px] bg-surface"
        style={{ left: NODE.left, top, width: NODE.width, height: NODE.height }}
        initial={{ opacity: 0, x: 40, borderColor: BORDER, boxShadow: '0 0 0 0px rgba(27,126,208,0)' }}
        animate={{ opacity: 1, x: 0, borderColor: colors.blue, boxShadow: '0 0 0 10px rgba(27,126,208,0.18)' }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 0.4, delay: 0.2 },
          x: { ...gentleSpring, delay: 0.2 },
          borderColor: { duration: 0.5, delay: 0.45 },
          boxShadow: { duration: 0.6, ease: appleEase, delay: 0.45 },
        }}
      >
        <span className="flex h-[80px] w-[80px] items-center justify-center rounded-[24px] bg-tint-how">
          <TerminalSquare size={48} strokeWidth={2.4} color={colors.blue} />
        </span>
        <span className="text-[36px] font-bold leading-none text-ink">New session</span>
      </motion.div>
    </>
  );
}

function Session({ buildStep }) {
  const shifted = buildStep >= 2;
  return (
    <motion.div
      className="absolute"
      style={{ top: GROUP.top, left: 0, width: GROUP.width, height: CARD.top + CARD.height }}
      initial={{ opacity: 0, x: GROUP.centred, y: 24 }}
      animate={{ opacity: 1, x: shifted ? GROUP.left : GROUP.centred, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.35, ease: appleEase } }}
      transition={{ duration: 0.6, ease: appleEase, delay: 0.1 }}
    >
      <Laptop dead={buildStep >= 1} />
      <ProgressCard buildStep={buildStep} />
    </motion.div>
  );
}

function FileCard({ name, purpose, disposable, i }) {
  const from = {
    x: GROUP.left + CARD.left - fanLeft(i) + i * 10,
    y: GROUP.top + CARD.top - FAN.top + i * 10,
  };
  return (
    <motion.div
      className="absolute rounded-[32px] border-[4px] bg-surface px-[36px] pt-[40px]"
      style={{ left: fanLeft(i), top: FAN.top, width: FAN.width, height: FAN.height, borderColor: i === 0 ? colors.blue : BORDER, zIndex: 4 - i }}
      initial={{ ...from, rotate: -4 + i * 3, opacity: 0 }}
      animate={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
      transition={{ ...gentleSpring, delay: 0.35 + i * 0.1, opacity: { duration: 0.25, delay: 0.3 } }}
    >
      <FileText size={44} strokeWidth={2.4} color={i === 0 ? colors.blue : colors.ink} />
      <div className="mt-[24px] font-mono text-[34px] font-bold leading-none text-ink">{name}</div>
      <div className="mt-[20px] h-[92px] text-[36px] font-semibold leading-[46px] text-muted">{purpose}</div>
      <div className="relative mt-[32px] flex flex-col gap-[24px]">
        {NOTE_BARS.map((w, k) => (
          <motion.span
            key={k}
            className="block h-[14px] rounded-full bg-[#DCDCE3]"
            style={{ width: w }}
            initial={false}
            animate={{ opacity: disposable && k > 0 ? 0.12 : 1 }}
            transition={{ duration: 0.8, ease: appleEase, delay: disposable ? 1.9 + k * 0.05 : 0 }}
          />
        ))}
        {disposable && (
          <motion.span
            className="absolute left-0 right-0 top-[64px] text-center text-[36px] font-bold leading-none"
            style={{ color: colors.coral }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: appleEase, delay: 2.3 }}
          >
            90% disposable
          </motion.span>
        )}
      </div>
      {disposable && (
        <motion.div
          className="absolute bottom-[32px] left-[36px] flex items-center gap-[12px]"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...gentleSpring, delay: 1.4 }}
        >
          <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full" style={{ background: colors.green }}>
            <Check size={28} strokeWidth={3.4} color="#FFFFFF" />
          </span>
          <span className="text-[28px] font-semibold leading-none text-ink">Feature shipped</span>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function S36_FilesMemory({ buildStep = 0 }) {
  const folder = buildStep >= 3;

  return (
    <SlideFrame>
      <WorkflowMiniMap active="Remember" />
      <Headline
        className="mt-[84px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
      >
        The files are the memory.
      </Headline>

      <AnimatePresence>
        {!folder && <Session key="session" buildStep={buildStep} />}
        {buildStep === 2 && <NewSession key="new" />}
      </AnimatePresence>
      {folder && FILES.map((f, i) => <FileCard key={f.name} {...f} i={i} />)}
    </SlideFrame>
  );
}
