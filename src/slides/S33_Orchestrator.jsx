import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, FolderCode, PenTool, Code2, ScanEye, FlaskConical, Sparkles } from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, WorkflowMiniMap } from '../components/deck';

const CODEBASE = { left: 120, top: 316, width: 320, height: 648 };
const COL = { left: 500, width: 310, gap: 20 };
const colLeft = (i) => COL.left + i * (COL.width + COL.gap);
const ROW_W = 4 * COL.width + 3 * COL.gap;
const ORCH = { width: 520, height: 104, top: 316, left: COL.left + (ROW_W - 520) / 2 };
const PACK_TOP = 460;
const CARD_H = 140;
// On build 1 the pack sits lower, as the focal point; it rises when the agents arrive.
const PACK_SHIFT = 170;
const AGENT = { top: 650, height: 300 };
const CHIP = { top: AGENT.top + 156, height: 54, gap: 12, inset: 24 };

const CARDS = [
  { label: 'Conventions', color: colors.blue },
  { label: 'Design rules', color: colors.teal },
  { label: 'Domain', color: colors.amber },
  { label: 'Tests', color: colors.green },
];
const AGENTS = [
  { name: 'Designer', Icon: PenTool, cards: [1, 2] },
  { name: 'Implementer', Icon: Code2, cards: [0, 2] },
  { name: 'Reviewer', Icon: ScanEye, cards: [0, 3] },
  { name: 'Tester', Icon: FlaskConical, cards: [3] },
];

const CODE_LINES = [
  [0, 200], [24, 150], [24, 220], [48, 120], [48, 180], [24, 90], [0, 160],
  [0, 220], [24, 170], [48, 110], [48, 190], [24, 130], [0, 100], [0, 200], [24, 140],
];

function CodeLines({ lines, scanned, gap = 22, delayStep = 0.055 }) {
  return (
    <div className="flex flex-col" style={{ gap }}>
      {lines.map(([indent, w], i) => (
        <motion.div
          key={i}
          className="h-[14px] rounded-full"
          style={{ marginLeft: indent, width: w }}
          initial={false}
          animate={{ backgroundColor: scanned ? '#B9D6F2' : '#DCDCE3' }}
          transition={{ duration: 0.3, delay: scanned ? 0.15 + i * delayStep : 0 }}
        />
      ))}
    </div>
  );
}

function Codebase({ scanned }) {
  return (
    <div
      data-mock
      className="absolute overflow-hidden rounded-[32px] border-[4px] border-[#D4D4DC] bg-surface px-[32px] pt-[28px]"
      style={CODEBASE}
    >
      <div className="flex items-center gap-[14px]">
        <FolderCode size={40} strokeWidth={2.4} color={colors.ink} />
        <span className="text-[36px] font-bold leading-none text-ink">Codebase</span>
      </div>
      <div className="mt-[36px]">
        <CodeLines lines={CODE_LINES} scanned={scanned} />
      </div>
      {scanned && (
        <motion.div
          className="absolute left-0 right-0 h-[96px] border-b-[6px]"
          style={{ top: 0, background: 'rgba(27,126,208,0.16)', borderColor: colors.blue }}
          initial={{ y: -96, opacity: 1 }}
          animate={{ y: CODEBASE.height, opacity: [1, 1, 0] }}
          transition={{ duration: 1.0, ease: [0.45, 0, 0.55, 1], times: [0, 0.85, 1] }}
        />
      )}
    </div>
  );
}

function Orchestrator() {
  return (
    <motion.div
      className="absolute flex items-center justify-center gap-[20px] rounded-full bg-ink"
      style={ORCH}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: appleEase, delay: 0.15 }}
    >
      <Network size={46} strokeWidth={2.4} color="#FFFFFF" />
      <span className="text-[44px] font-bold leading-none text-white">Orchestrator</span>
    </motion.div>
  );
}

function ContextCard({ label, color, left, top, width, height, size, from, delay, restY = 0 }) {
  return (
    <motion.div
      className="absolute flex items-center overflow-hidden whitespace-nowrap rounded-[18px] border-[4px] bg-surface font-semibold leading-none text-ink"
      style={{ left, top, width, height, borderColor: color, fontSize: size }}
      initial={{ ...from, opacity: 0, scale: 0.6 }}
      animate={{ x: 0, y: restY, opacity: 1, scale: 1 }}
      transition={{ ...gentleSpring, delay }}
    >
      <span className="h-full w-[14px] shrink-0" style={{ background: color }} />
      <span className="pl-[20px]">{label}</span>
    </motion.div>
  );
}

function Agent({ name, Icon, i }) {
  return (
    <motion.div
      className="absolute flex flex-col items-center rounded-[32px] border-[4px] bg-surface pt-[20px]"
      style={{ left: colLeft(i), top: AGENT.top, width: COL.width, height: AGENT.height }}
      initial={{ opacity: 0, y: 40, borderColor: '#D4D4DC', boxShadow: '0 0 0 0px rgba(27,126,208,0)' }}
      animate={{ opacity: 1, y: 0, borderColor: colors.blue, boxShadow: '0 0 0 8px rgba(27,126,208,0.18)' }}
      transition={{
        opacity: { duration: 0.4, delay: 0.3 + i * 0.08 },
        y: { ...gentleSpring, delay: 0.3 + i * 0.08 },
        borderColor: { duration: 0.5, delay: 1.2 + i * 0.06 },
        boxShadow: { duration: 0.6, ease: appleEase, delay: 1.2 + i * 0.06 },
      }}
    >
      <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[18px] bg-tint-how">
        <Icon size={34} strokeWidth={2.4} color={colors.blue} />
      </span>
      <span className="mt-[12px] text-[36px] font-bold leading-[44px] text-ink">{name}</span>
      <motion.span
        className="absolute right-[18px] top-[18px]"
        initial={{ opacity: 0, scale: 0.4, rotate: -30 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ ...gentleSpring, delay: 1.25 + i * 0.06 }}
      >
        <Sparkles size={32} strokeWidth={2.4} color={colors.blue} />
      </motion.span>
    </motion.div>
  );
}

function ExploreDeal({ scanned, dealt }) {
  const chips = AGENTS.flatMap((agent, i) =>
    agent.cards.map((c, k) => {
      const left = colLeft(i) + CHIP.inset;
      const top = CHIP.top + k * (CHIP.height + CHIP.gap);
      return { key: `${i}-${c}`, c, left, top, from: { x: colLeft(c) - left, y: PACK_TOP - top }, delay: 0.7 + (i * 2 + k) * 0.07 };
    }),
  );

  return (
    <motion.div className="absolute inset-0" exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.35, ease: appleEase } }}>
      <Codebase scanned={scanned} />
      <Orchestrator />

      {scanned &&
        CARDS.map((card, i) => (
          <ContextCard
            key={card.label}
            {...card}
            left={colLeft(i)}
            top={PACK_TOP}
            width={COL.width}
            height={CARD_H}
            size={40}
            restY={dealt ? 0 : PACK_SHIFT}
            from={{
              x: CODEBASE.left + CODEBASE.width / 2 - (colLeft(i) + COL.width / 2),
              y: CODEBASE.top + CODEBASE.height / 2 - (PACK_TOP + CARD_H / 2),
            }}
            delay={dealt ? i * 0.04 : 0.75 + i * 0.1}
          />
        ))}

      {dealt && AGENTS.map((a, i) => <Agent key={a.name} {...a} i={i} />)}
      {dealt &&
        chips.map(({ key, c, left, top, from, delay }) => (
          <ContextCard
            key={key}
            {...CARDS[c]}
            left={left}
            top={top}
            width={COL.width - CHIP.inset * 2}
            height={CHIP.height}
            size={30}
            from={from}
            delay={delay}
          />
        ))}
    </motion.div>
  );
}

const PANEL = { top: 330, width: 800, height: 640 };
// What the agents explore: the same slice of the repo on both sides.
const TREE = ['src/search/', '  WellboreRepo.ts', '  searchApi.ts', '  filters.ts', 'tests/search.spec.ts'];

function Meter({ fill, color, delay, duration }) {
  return (
    <div className="absolute flex flex-col items-center gap-[18px]" style={{ left: 580, top: 150 }}>
      <div className="relative h-[400px] w-[120px] overflow-hidden rounded-[28px] border-[4px] border-[#D4D4DC] bg-[#EFEFF3]">
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{ height: `${fill * 100}%`, background: color, transformOrigin: 'bottom' }}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration, ease: appleEase, delay }}
        />
      </div>
      <span className="text-[36px] font-bold leading-none text-ink">Tokens</span>
    </div>
  );
}

function Panel({ label, left, beams, fill, color, duration, i }) {
  const xs = beams === 1 ? [240] : [60, 180, 300, 420];
  return (
    <motion.div
      className="absolute rounded-[36px] border-[4px] border-[#D4D4DC] bg-surface"
      style={{ ...PANEL, left }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: appleEase, delay: 0.3 + i * 0.12 }}
    >
      <div className="absolute left-[44px] top-[40px] whitespace-nowrap text-[44px] font-bold leading-none text-ink">{label}</div>

      <svg className="absolute left-[60px] top-[150px]" width={480} height={190} aria-hidden="true">
        {xs.map((x, b) => (
          <motion.polygon
            key={x}
            points={`${x - 10},48 ${x + 10},48 ${x + 52},190 ${x - 52},190`}
            fill="rgba(27,126,208,0.22)"
            style={{ transformOrigin: `${x}px 48px` }}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{ duration: 0.45, ease: appleEase, delay: 0.7 + i * 0.1 + b * 0.12 }}
          />
        ))}
        {xs.map((x) => (
          <circle key={`a${x}`} cx={x} cy={24} r={24} fill={colors.blue} />
        ))}
      </svg>

      <div data-mock className="absolute rounded-[24px] border-[4px] border-[#D4D4DC] bg-[#F7F7F9] px-[28px] py-[26px]" style={{ left: 60, top: 340, width: 480, height: 210 }}>
        {TREE.map((line) => (
          <div key={line} className="whitespace-pre font-mono text-[24px] font-medium leading-[30px]" style={{ color: line.endsWith('/') ? colors.ink : colors.muted }}>
            {line}
          </div>
        ))}
      </div>

      <Meter fill={fill} color={color} delay={0.9 + i * 0.1} duration={duration} />
    </motion.div>
  );
}

function Contrast() {
  return (
    <>
      <Panel label="Explore every time" left={120} beams={4} fill={0.92} color={colors.coral} duration={1.1} i={0} />
      <Panel label="Explore once" left={1000} beams={1} fill={0.22} color={colors.blue} duration={0.6} i={1} />
    </>
  );
}

export default function S33_Orchestrator({ buildStep = 0 }) {
  const scanned = buildStep >= 1;
  const dealt = buildStep >= 2;
  const contrast = buildStep >= 3;

  return (
    <SlideFrame>
      <WorkflowMiniMap active="Orchestrate" />
      <Headline
        className="mt-[84px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
      >
        One manager. Many fresh minds.
      </Headline>

      <AnimatePresence>{!contrast && <ExploreDeal key="deal" scanned={scanned} dealt={dealt} />}</AnimatePresence>
      {contrast && <Contrast />}
    </SlideFrame>
  );
}
