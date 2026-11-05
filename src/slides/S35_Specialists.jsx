import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, FolderGit2, PenTool, Code2, ScanEye, Check } from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, WorkflowMiniMap } from '../components/deck';

const BORDER = '#D4D4DC';

const DOC = { left: 740, top: 300, width: 600, bottom: 984, start: 260, end: 1500 };
// Centred on the doc's visible midpoint.
const GENERAL = { left: 120, width: 560, height: 240, top: (DOC.top + DOC.bottom) / 2 - 120 };

const REPO = { left: 120, top: 330, width: 440, height: 640 };
const TEMPLATE = { left: 32, top: 120, width: 368, height: 300 };
const TEMPLATE_CENTER = {
  x: REPO.left + TEMPLATE.left + TEMPLATE.width / 2,
  y: REPO.top + TEMPLATE.top + TEMPLATE.height / 2,
};

const AGENT_ROW = { left: 600, width: 740, height: 196, top: 330, gap: 26 };
const rowTop = (i) => AGENT_ROW.top + i * (AGENT_ROW.height + AGENT_ROW.gap);
const AGENTS = [
  { name: 'grid-designer', Icon: PenTool },
  { name: 'grid-implementer', Icon: Code2 },
  { name: 'grid-reviewer', Icon: ScanEye },
];

const GAUGE = { left: 1400, top: 450, width: 400, r: 165, stroke: 30 };
// Gauge svg sits below the 36 px label + 24 px gap.
const SVG_TOP = 60;
const SHIP = { width: 520, height: 120 };
// b2: the gauge grows into the focal point; the pill sits between repo and gauge.
const GAUGE_GROW = { scale: 1.3, x: -110 };
const SHIP_LEFT = 635;
const LINK_Y = rowTop(1) + AGENT_ROW.height / 2;
const LINKS = [
  `M ${REPO.left + REPO.width + 10} ${LINK_Y} H ${SHIP_LEFT - 12}`,
  `M ${SHIP_LEFT + SHIP.width + 12} ${LINK_Y} H 1250 M 1236 ${LINK_Y - 14} L 1250 ${LINK_Y} L 1236 ${LINK_Y + 14}`,
];

// Long instruction doc: bar widths repeat; every fifth bar is a patched-in rule.
const DOC_BARS = Array.from({ length: 44 }, (_, i) => ({ w: [480, 400, 500, 340, 440, 300][i % 6], patch: i % 5 === 3 }));

function GeneralAgent() {
  return (
    <div
      className="absolute flex items-center gap-[24px] rounded-[32px] border-[4px] bg-surface px-[32px]"
      style={{ ...GENERAL, borderColor: BORDER }}
    >
      <span className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-[26px] bg-[#EFEFF3]">
        <Bot size={52} strokeWidth={2.4} color={colors.muted} />
      </span>
      <span className="whitespace-nowrap font-mono text-[44px] font-bold leading-none text-ink">code-reviewer</span>
    </div>
  );
}

function GrowingDoc() {
  return (
    <div
      className="absolute overflow-hidden"
      style={{
        left: DOC.left,
        top: DOC.top,
        width: DOC.width,
        height: DOC.bottom - DOC.top,
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 160px)',
        maskImage: 'linear-gradient(to bottom, transparent 0, #000 160px)',
      }}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 flex flex-col-reverse gap-[22px] overflow-hidden rounded-[28px] border-[4px] bg-surface px-[44px] py-[40px]"
        style={{ borderColor: BORDER }}
        initial={{ height: DOC.start }}
        animate={{ height: DOC.end }}
        transition={{ duration: 2.8, ease: [0.45, 0, 0.55, 1], delay: 0.5 }}
      >
        {DOC_BARS.map(({ w, patch }, i) => (
          <span
            key={i}
            className="block h-[14px] shrink-0 rounded-full"
            style={{ width: w, background: patch ? '#F3C98B' : '#DCDCE3' }}
          />
        ))}
      </motion.div>
    </div>
  );
}

function Gauge({ value, word, color, grow }) {
  const { r, stroke, width } = GAUGE;
  const cx = width / 2;
  const cy = r + stroke;
  const NEEDLE = r - 36;
  const arc = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ left: GAUGE.left, top: GAUGE.top, width: GAUGE.width }}
      initial={false}
      animate={grow ? GAUGE_GROW : { scale: 1, x: 0 }}
      transition={{ duration: 0.8, ease: appleEase, delay: grow ? 0.5 : 0 }}
    >
      <span className="text-[36px] font-semibold leading-none text-muted">Quality</span>
      <svg width={width} height={cy + stroke / 2 + 4} className="mt-[24px]" aria-hidden="true">
        <path d={arc} fill="none" stroke="#E4E4EA" strokeWidth={stroke} strokeLinecap="round" />
        <motion.path
          d={arc}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          initial={{ pathLength: 0, stroke: color }}
          animate={{ pathLength: value, stroke: color }}
          transition={{ duration: 0.9, ease: appleEase, delay: 0.3 }}
        />
        <circle cx={cx} cy={cy} r={20} fill={colors.ink} />
      </svg>
      <motion.span
        className="absolute rounded-full bg-ink"
        style={{ left: cx - 5, top: SVG_TOP + cy - NEEDLE, width: 10, height: NEEDLE, transformOrigin: '50% 100%' }}
        initial={{ rotate: -90 }}
        animate={{ rotate: -90 + 180 * value }}
        transition={{ ...gentleSpring, delay: 0.3 }}
      />
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          className="mt-[24px] text-[64px] font-bold leading-none"
          style={{ color }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: appleEase }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </motion.div>
  );
}

function Links() {
  return (
    <svg className="absolute left-0 top-0" width="1920" height="1080" aria-hidden="true">
      {LINKS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke={colors.ink}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.4, ease: appleEase, delay: 0.35 + i * 0.4 }, opacity: { duration: 0.1, delay: 0.35 + i * 0.4 } }}
        />
      ))}
    </svg>
  );
}

function Repo({ pulse }) {
  return (
    <motion.div
      className="absolute rounded-[32px] border-[4px] bg-surface"
      style={{ ...REPO, borderColor: BORDER }}
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: appleEase, delay: 0.3 }}
    >
      <div className="absolute left-[32px] top-[36px] flex items-center gap-[16px]">
        <FolderGit2 size={44} strokeWidth={2.4} color={colors.ink} />
        <span className="text-[36px] font-bold leading-none text-ink">Workflow repo</span>
      </div>
      <motion.div
        className="absolute flex flex-col rounded-[24px] border-[4px] border-dashed bg-tint-how px-[32px] pt-[32px]"
        style={{ ...TEMPLATE, borderColor: colors.blue }}
        initial={false}
        animate={{ scale: pulse ? [1, 1.04, 1, 1.04, 1, 1.04, 1] : 1 }}
        transition={{ duration: 1.3, delay: 0.75, ease: 'easeInOut' }}
      >
        <span className="text-[32px] font-bold leading-none text-ink">Template</span>
        <div className="mt-[28px] flex flex-col">
          {['role:', 'rules:', 'context:', 'verify:'].map((line) => (
            <span key={line} className="font-mono text-[28px] font-medium leading-[44px] text-ink">{line}</span>
          ))}
        </div>
      </motion.div>
      <div className="absolute bottom-[36px] left-[32px] right-[32px] flex flex-col">
        {['agents/', 'skills/', 'workflows/'].map((line) => (
          <span key={line} className="font-mono text-[28px] font-medium leading-[44px] text-muted">{line}</span>
        ))}
      </div>
    </motion.div>
  );
}

function Specialist({ name, Icon, i }) {
  const top = rowTop(i);
  const from = {
    x: TEMPLATE_CENTER.x - (AGENT_ROW.left + AGENT_ROW.width / 2),
    y: TEMPLATE_CENTER.y - (top + AGENT_ROW.height / 2),
  };
  return (
    <motion.div
      className="absolute flex items-center rounded-[32px] border-[4px] bg-surface pl-[32px] pr-[28px]"
      style={{ left: AGENT_ROW.left, top, width: AGENT_ROW.width, height: AGENT_ROW.height, borderColor: colors.blue }}
      initial={{ ...from, opacity: 0, scale: 0.4, boxShadow: '0 0 0 0px rgba(27,126,208,0)' }}
      animate={{ x: 0, y: 0, opacity: 1, scale: 1, boxShadow: '0 0 0 8px rgba(27,126,208,0.18)' }}
      exit={{
        ...from,
        opacity: 0,
        scale: 0.3,
        transition: { duration: 0.6, ease: appleEase, delay: 0.7 + i * 0.12 },
      }}
      transition={{
        ...gentleSpring,
        delay: 0.8 + i * 0.4,
        opacity: { duration: 0.3, delay: 0.8 + i * 0.4 },
        boxShadow: { duration: 0.6, ease: appleEase, delay: 1.1 + i * 0.4 },
      }}
    >
      <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-[22px] bg-tint-how">
        <Icon size={42} strokeWidth={2.4} color={colors.blue} />
      </span>
      <span className="ml-[24px] whitespace-nowrap font-mono text-[36px] font-bold leading-none text-ink">{name}</span>
      <div className="ml-auto flex h-[132px] w-[200px] shrink-0 flex-col justify-center rounded-[18px] border-[4px] border-[#D4D4DC] px-[24px]">
        {['role', 'rules', 'verify'].map((line) => (
          <span key={line} className="font-mono text-[24px] font-medium leading-[34px] text-muted">{line}</span>
        ))}
      </div>
    </motion.div>
  );
}

function Shipped() {
  return (
    <motion.div
      className="absolute flex items-center justify-center gap-[24px] rounded-full bg-ink"
      style={{
        ...SHIP,
        left: SHIP_LEFT,
        top: rowTop(1) + (AGENT_ROW.height - SHIP.height) / 2,
        zIndex: 2,
      }}
      initial={{ opacity: 0, scale: 1.5, rotate: -6 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ ...gentleSpring, opacity: { duration: 0.2 } }}
    >
      <span className="flex h-[68px] w-[68px] items-center justify-center rounded-full" style={{ background: colors.green }}>
        <Check size={44} strokeWidth={3.4} color="#FFFFFF" />
      </span>
      <span className="text-[48px] font-bold leading-none text-white">Feature shipped</span>
    </motion.div>
  );
}

export default function S35_Specialists({ buildStep = 0 }) {
  const specialists = buildStep >= 1;
  const shipped = buildStep >= 2;

  return (
    <SlideFrame>
      <WorkflowMiniMap active="Orchestrate" />
      <Headline
        className="mt-[84px] whitespace-nowrap"
        style={{ fontSize: 88 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
      >
        Built for this feature. Then retired.
      </Headline>

      <AnimatePresence>
        {!specialists && (
          <motion.div
            key="general"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 40, transition: { duration: 0.4, ease: appleEase } }}
            transition={{ duration: 0.5, ease: appleEase, delay: 0.15 }}
          >
            <GrowingDoc />
            <GeneralAgent />
            <span
              className="absolute h-[6px] rounded-full bg-[#D4D4DC]"
              style={{ left: GENERAL.left + GENERAL.width, top: GENERAL.top + GENERAL.height / 2 - 3, width: DOC.left - GENERAL.left - GENERAL.width }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {specialists && <Repo pulse={!shipped} />}
      <AnimatePresence>
        {specialists && !shipped && AGENTS.map((a, i) => <Specialist key={a.name} {...a} i={i} />)}
      </AnimatePresence>
      {shipped && <Links />}
      {shipped && <Shipped />}

      <Gauge
        value={specialists ? 0.88 : 0.4}
        word={specialists ? 'sharp' : 'meh'}
        color={specialists ? colors.blue : colors.amber}
        grow={shipped}
      />
    </SlideFrame>
  );
}
