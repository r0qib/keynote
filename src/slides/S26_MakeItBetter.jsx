import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  ArrowDown,
  ArrowDownToLine,
  ArrowUpDown,
  Bot,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
  MapPin,
  MousePointer2,
  Rows3,
  Rows4,
  Ruler,
  Search,
  Sparkles,
  Thermometer,
  Wand2,
} from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { SlideFrame, Headline } from '../components/deck';

// One layout box shared by every state, so the grid reads as the same component evolving.
const BOX = { left: 120, top: 236, width: 1680, height: 724 };

const WELLS = [
  { name: 'Wellbore A-12', field: 'Demo North', status: 'Active', tvd: '2,840', md: '3,120', temp: 84, spud: '2019-04-12', remarks: 'Routine.' },
  { name: 'Wellbore B-07', field: 'Demo North', status: 'Drilling', tvd: '1,920', md: '2,050', temp: 62, spud: '2024-09-03', remarks: 'Casing set at 1,900 m.' },
  {
    name: 'Wellbore C-04',
    field: 'Demo West',
    status: 'Suspended',
    tvd: '3,410',
    md: '3,950',
    temp: 104,
    spud: '2016-11-21',
    remarks: 'Suspended after 104 °C at the reservoir top, above the 95 °C tool limit. Awaiting a high-temperature completion plan.',
  },
  { name: 'Wellbore D-19', field: 'Demo North', status: 'Active', tvd: '2,650', md: '2,890', temp: 78, spud: '2021-02-08', remarks: 'On plan.' },
  { name: 'Wellbore E-03', field: 'Demo South', status: 'Active', tvd: '2,210', md: '2,480', temp: 71, spud: '2022-06-30', remarks: 'Logs uploaded.' },
  {
    name: 'Wellbore F-21',
    field: 'Demo West',
    status: 'Drilling',
    tvd: '1,480',
    md: '1,560',
    temp: 55,
    spud: '2025-03-17',
    remarks: 'Kick at 1,450 m handled; mud weight raised and drilling resumed.',
  },
];

const TEMP_LIMIT = 95;
const HOVER_ROW = 2;

const fadeState = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: appleEase } },
  exit: { opacity: 0, scale: 0.99, transition: { duration: 0.22 } },
};

/* ---------- Build 0: before AI ---------- */

const BEFORE_COLS = ['Wellbore', 'Field', 'Status', 'TVD (m)', 'MD (m)', 'Temp (°C)', 'Spud date'];
const BEFORE_WIDTHS = '19% 15% 15% 12% 12% 13% 14%';

function BeforeGrid() {
  return (
    <div className="flex h-full flex-col rounded-[20px] border-[3px] border-[#CFCFD8] bg-surface px-[40px] py-[36px]">
      <div className="flex items-center justify-between">
        <span className="text-[34px] font-bold text-ink">Wellbores</span>
        <div className="flex h-[64px] w-[480px] items-center gap-[14px] rounded-[10px] border-[2px] border-[#CFCFD8] px-[18px]">
          <Search size={26} strokeWidth={2.4} className="text-muted" />
          <span className="text-[26px] text-muted">Search wellbores</span>
        </div>
      </div>

      <div className="mt-[28px] border-[2px] border-[#CFCFD8]">
        <div className="grid h-[60px] items-center bg-[#F1F1F4]" style={{ gridTemplateColumns: BEFORE_WIDTHS }}>
          {BEFORE_COLS.map((c) => (
            <div key={c} className="flex h-full items-center justify-between border-r-[2px] border-[#CFCFD8] px-[18px] last:border-r-0">
              <span className="text-[24px] font-semibold text-ink">{c}</span>
              <ArrowUpDown size={22} strokeWidth={2.4} className="text-muted" />
            </div>
          ))}
        </div>
        {WELLS.map((w) => (
          <div key={w.name} className="grid h-[64px] border-t-[2px] border-[#CFCFD8]" style={{ gridTemplateColumns: BEFORE_WIDTHS }}>
            {[w.name, w.field, w.status, w.tvd, w.md, w.temp, w.spud].map((v, i) => (
              <div key={i} className="flex items-center border-r-[2px] border-[#CFCFD8] px-[18px] text-[26px] text-ink last:border-r-0">
                {v}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between">
        <span className="text-[24px] text-muted">Showing 1–6 of 48</span>
        <div className="flex gap-[8px]">
          {['Prev', '1', '2', '3', 'Next'].map((p) => (
            <span
              key={p}
              className={`flex h-[48px] min-w-[48px] items-center justify-center border-[2px] border-[#CFCFD8] px-[14px] text-[24px] text-ink ${p === '1' ? 'bg-line font-semibold' : 'bg-surface'}`}
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Build 1: the slop ---------- */

const SLOP_COLS = [
  ['Wellbore', Layers],
  ['Field', MapPin],
  ['Status', Activity],
  ['TVD', Ruler],
  ['MD', ArrowDownToLine],
  ['Temp', Thermometer],
  ['Spud', CalendarDays],
];
const SLOP_WIDTHS = '1.45fr 1.15fr 1.25fr 0.9fr 0.9fr 0.9fr 1.1fr';
const RAINBOW = {
  Active: 'linear-gradient(90deg, #22D3EE, #A855F7)',
  Drilling: 'linear-gradient(90deg, #F59E0B, #EC4899)',
  Suspended: 'linear-gradient(90deg, #EF4444, #8B5CF6, #3B82F6)',
};
const SPARKLES = [
  { x: -30, y: -40, size: 64, color: '#FACC15' },
  { x: 560, y: -34, size: 44, color: '#F472B6' },
  { x: 1200, y: 132, size: 40, color: '#FFFFFF' },
  { x: 1640, y: 84, size: 56, color: '#FACC15' },
  { x: -40, y: 470, size: 48, color: '#A78BFA' },
  { x: 880, y: 690, size: 52, color: '#F472B6' },
];

function SlopGrid() {
  return (
    <div className="relative h-full">
      <div
        className="flex h-full flex-col overflow-hidden rounded-[40px] border-[3px] border-white shadow-[0_30px_80px_rgba(124,58,237,0.35)]"
        style={{ background: 'linear-gradient(160deg, #F3E8FF 0%, #FCE7F3 55%, #E0E7FF 100%)' }}
      >
        <div
          className="flex h-[112px] shrink-0 items-center justify-between px-[40px]"
          style={{ background: 'linear-gradient(90deg, #6D28D9, #A855F7, #EC4899)' }}
        >
          <div className="flex items-center gap-[16px] text-white">
            <Sparkles size={40} strokeWidth={2.2} />
            <span className="text-[36px] font-extrabold tracking-[-0.01em]">Wellbore Intelligence</span>
          </div>
          <div className="flex h-[64px] w-[540px] items-center gap-[14px] rounded-full border-[2px] border-white/60 bg-white/20 px-[24px] text-white">
            <Wand2 size={28} strokeWidth={2.2} />
            <span className="text-[24px] font-medium">Ask anything about wells</span>
          </div>
        </div>

        <div className="px-[32px] pt-[20px]">
          <div className="grid h-[48px] items-center px-[24px]" style={{ gridTemplateColumns: SLOP_WIDTHS }}>
            {SLOP_COLS.map(([label, Icon]) => (
              <div key={label} className="flex items-center gap-[10px] text-[#6D28D9]">
                <Icon size={24} strokeWidth={2.4} />
                <span className="text-[24px] font-bold uppercase tracking-[0.04em]">{label}</span>
              </div>
            ))}
          </div>
          {WELLS.map((w) => (
            <div
              key={w.name}
              className="mt-[10px] grid h-[64px] items-center rounded-[20px] border-[2px] border-white/80 bg-white/55 px-[24px] shadow-[0_8px_24px_rgba(124,58,237,0.14)] backdrop-blur"
              style={{ gridTemplateColumns: SLOP_WIDTHS }}
            >
              <span
                className="bg-clip-text text-[26px] font-extrabold text-transparent"
                style={{ backgroundImage: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}
              >
                {w.name}
              </span>
              <span className="text-[26px] font-semibold text-[#5B21B6]">{w.field}</span>
              <span>
                <span className="rounded-full px-[18px] py-[6px] text-[24px] font-bold text-white" style={{ background: RAINBOW[w.status] }}>
                  {w.status}
                </span>
              </span>
              {[w.tvd, w.md, `${w.temp}°`, w.spud.slice(0, 7)].map((v, i) => (
                <span key={i} className="text-[26px] font-semibold text-[#6D28D9]">
                  {v}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {SPARKLES.map((s, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: s.x, top: s.y, color: s.color }}
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ ...gentleSpring, delay: 0.25 + i * 0.07 }}
        >
          <Sparkles size={s.size} strokeWidth={2} fill="currentColor" />
        </motion.div>
      ))}

      <motion.div
        data-overlap-ok
        className="absolute flex items-center gap-[14px] rounded-full px-[34px] py-[20px] text-white shadow-[0_20px_50px_rgba(168,85,247,0.55)]"
        style={{ right: -24, bottom: -28, background: 'linear-gradient(90deg, #7C3AED, #EC4899)' }}
        initial={{ opacity: 0, y: 30, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ ...gentleSpring, delay: 0.6 }}
      >
        <Bot size={36} strokeWidth={2.2} />
        <span className="text-[30px] font-bold">Ask AI</span>
      </motion.div>
    </div>
  );
}

/* ---------- Build 2: with AI, done right ---------- */

// Fixed px columns (inner width 1594) so the hovered cell has a known position.
const DONE_COLS = [250, 210, 220, 150, 150, 180, 434];
const DONE_TEMPLATE = DONE_COLS.map((c) => `${c}px`).join(' ');
const DONE = { padX: 40, padY: 32, border: 3, toolbar: 64, gap: 28, header: 56, row: 68 };
const STATUS_DOT = { Active: '#3E9B74', Drilling: '#C98A2B', Suspended: '#C4554D' };

const rowTop = (i) => DONE.border + DONE.padY + DONE.toolbar + DONE.gap + DONE.header + i * DONE.row;
const REMARKS_LEFT = DONE.border + DONE.padX + DONE_COLS.slice(0, 6).reduce((a, b) => a + b, 0);
// Popover sits inside the Remarks column, running into the grid's right padding.
const POPOVER_LEFT = REMARKS_LEFT + 8;
const POPOVER_WIDTH = BOX.width - DONE.border - 16 - POPOVER_LEFT;

function Toolbar() {
  return (
    <div className="flex h-[64px] items-center gap-[16px]">
      <div className="flex h-full w-[440px] items-center gap-[14px] rounded-[14px] border-[2px] border-line px-[20px]">
        <Search size={26} strokeWidth={2.4} className="text-muted" />
        <span className="text-[26px] text-muted">Search wellbores</span>
      </div>
      {['Status', 'Field', 'Depth'].map((c) => (
        <span key={c} className="flex h-[56px] items-center gap-[10px] rounded-full border-[2px] border-line px-[24px] text-[24px] font-semibold text-ink">
          {c}
          <ChevronDown size={22} strokeWidth={2.6} className="text-muted" />
        </span>
      ))}
      <div className="ml-auto flex rounded-[14px] bg-[#F1F1F4] p-[6px]">
        {[
          ['Compact', Rows4, false],
          ['Comfortable', Rows3, true],
        ].map(([label, Icon, on]) => (
          <span
            key={label}
            className={`flex h-[48px] items-center gap-[10px] rounded-[10px] px-[18px] text-[24px] font-semibold ${on ? 'bg-surface text-ink shadow-[0_2px_8px_rgba(17,17,19,0.10)]' : 'text-muted'}`}
          >
            <Icon size={22} strokeWidth={2.4} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function SkeletonRow({ i }) {
  return (
    <div className="grid items-center border-b-[2px] border-[#F0F0F3]" style={{ gridTemplateColumns: DONE_TEMPLATE, height: DONE.row }}>
      {DONE_COLS.map((_, c) => (
        <div key={c} className="px-[16px]">
          <motion.div
            className="h-[20px] rounded-full bg-[#E9E9EE]"
            style={{ width: `${[70, 60, 55, 45, 45, 40, 80][c] - ((i + c) % 3) * 8}%` }}
            animate={{ opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        </div>
      ))}
    </div>
  );
}

function DataRow({ w, i, hovered }) {
  const hot = w.temp > TEMP_LIMIT;
  return (
    <motion.div
      className="grid items-center border-b-[2px] border-[#F0F0F3]"
      style={{ gridTemplateColumns: DONE_TEMPLATE, height: DONE.row }}
      initial={{ opacity: 0, y: 8, backgroundColor: 'rgba(241,241,244,0)' }}
      animate={{ opacity: 1, y: 0, backgroundColor: hovered ? 'rgba(241,241,244,1)' : 'rgba(241,241,244,0)' }}
      transition={{
        duration: 0.4,
        ease: appleEase,
        delay: i * 0.04,
        backgroundColor: { duration: 0.25, delay: hovered ? 1.25 : 0 },
      }}
    >
      <span className="px-[16px] text-[26px] font-semibold text-ink">{w.name}</span>
      <span className="px-[16px] text-[26px] text-ink">{w.field}</span>
      <span className="flex items-center gap-[12px] px-[16px] text-[26px] text-ink">
        <span className="h-[14px] w-[14px] rounded-full" style={{ background: STATUS_DOT[w.status] }} />
        {w.status}
      </span>
      <span className="px-[16px] text-[26px] tabular-nums text-ink">{w.tvd} m</span>
      <span className="px-[16px] text-[26px] tabular-nums text-ink">{w.md} m</span>
      <span className="px-[16px]">
        <span
          className={`rounded-[8px] text-[26px] tabular-nums ${hot ? 'bg-[#FDECEC] px-[10px] py-[2px] font-semibold text-[#B4232B]' : 'text-ink'}`}
        >
          {w.temp} °C
        </span>
      </span>
      <span className="overflow-hidden text-ellipsis whitespace-nowrap px-[16px] text-[26px] text-muted">{w.remarks}</span>
    </motion.div>
  );
}

function Popover({ text, title }) {
  const top = rowTop(HOVER_ROW) + DONE.row + 14;
  return (
    <motion.div
      data-overlap-ok
      className="absolute rounded-[20px] border-[2px] border-line bg-surface px-[30px] py-[24px] shadow-[0_24px_60px_rgba(17,17,19,0.18)]"
      style={{ left: POPOVER_LEFT, top, width: POPOVER_WIDTH, transformOrigin: '30% 0%' }}
      initial={{ opacity: 0, scale: 0.94, y: -8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ ...gentleSpring, delay: 1.4 }}
    >
      <span
        className="absolute h-[22px] w-[22px] rotate-45 border-l-[2px] border-t-[2px] border-line bg-surface"
        style={{ top: -12, left: REMARKS_LEFT + 152 - POPOVER_LEFT }}
      />
      <div className="text-[24px] font-semibold text-muted">{title}</div>
      <div className="mt-[8px] text-[24px] leading-[1.4] text-ink">{text}</div>
    </motion.div>
  );
}

function Cursor() {
  const target = { x: REMARKS_LEFT + 140, y: rowTop(HOVER_ROW) + DONE.row / 2 - 6 };
  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0"
      initial={{ x: BOX.width - 60, y: BOX.height + 40, opacity: 0 }}
      animate={{ x: target.x, y: target.y, opacity: 1 }}
      transition={{ duration: 0.9, ease: appleEase, delay: 0.3 }}
    >
      <MousePointer2 size={46} strokeWidth={2} fill="#FFFFFF" className="text-ink drop-shadow-[0_4px_8px_rgba(17,17,19,0.25)]" />
    </motion.div>
  );
}

function DoneGrid() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 650);
    return () => clearTimeout(t);
  }, []);

  const hoverWell = WELLS[HOVER_ROW];
  return (
    <div className="relative h-full">
      <div className="flex h-full flex-col rounded-[24px] border-[3px] border-line bg-surface px-[40px] py-[32px] shadow-[0_20px_60px_rgba(17,17,19,0.08)]">
        <Toolbar />
        <div className="mt-[28px] grid h-[56px] items-center border-b-[2px] border-line" style={{ gridTemplateColumns: DONE_TEMPLATE }}>
          {['Wellbore', 'Field', 'Status', 'TVD', 'MD', 'Temp', 'Remarks'].map((c, i) => (
            <span key={c} className="flex items-center gap-[8px] px-[16px] text-[24px] font-semibold text-muted">
              {c}
              {i === 0 && <ArrowDown size={22} strokeWidth={2.6} className="text-ink" />}
            </span>
          ))}
        </div>
        {loaded
          ? WELLS.map((w, i) => <DataRow key={w.name} w={w} i={i} hovered={i === HOVER_ROW} />)
          : WELLS.map((w, i) => <SkeletonRow key={w.name} i={i} />)}
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[24px] text-muted">1–6 of 48</span>
          <div className="flex gap-[10px]">
            {[ChevronLeft, ChevronRight].map((Icon, i) => (
              <span key={i} className="flex h-[48px] w-[48px] items-center justify-center rounded-[12px] border-[2px] border-line text-ink">
                <Icon size={26} strokeWidth={2.4} />
              </span>
            ))}
          </div>
        </div>
      </div>

      {loaded && (
        <>
          <Popover text={hoverWell.remarks} title={hoverWell.name} />
          <Cursor />
        </>
      )}
    </div>
  );
}

/* ---------- Slide ---------- */

const STATES = [BeforeGrid, SlopGrid, DoneGrid];

export default function S26_MakeItBetter({ buildStep = 0 }) {
  const state = Math.min(buildStep, 2);
  const Grid = STATES[state];
  const headline = state === 1 ? "Beautiful, isn't it?" : "Let's make it better.";

  return (
    <SlideFrame>
      <AnimatePresence mode="wait">
        <Headline
          key={headline}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
          transition={{ duration: 0.6, ease: appleEase }}
        >
          {headline}
        </Headline>
      </AnimatePresence>

      <div data-mock className="absolute" style={BOX}>
        <AnimatePresence mode="wait">
          <motion.div key={state} className="absolute inset-0" {...fadeState}>
            <Grid />
          </motion.div>
        </AnimatePresence>
      </div>
    </SlideFrame>
  );
}
