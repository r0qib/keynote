import React from 'react';
import { motion } from 'framer-motion';
import { FileText, X } from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, Kicker, WorkflowMiniMap, CodeWindow } from '../components/deck';

const BORDER = '#D4D4DC';
const CORAL_TINT = 'rgba(229,72,77,0.12)';

// Code window: scaled up and centred from build 1 (below the kicker); smaller beside the stack at build 0.
const CODE = { width: 1240, big: 1.12, left: (1920 - 1240 * 1.12) / 2, top: 396, small: 0.85, smallLeft: 746, smallTop: 330 };
// CodeWindow chrome: 64 px title bar, body padding overridden to 28 px; text-code line height 30 × 1.45.
const CODE_BAR = 64;
const CODE_PAD = 28;
const LINE_H = 43.5;
const CODE_BODY_TOP = CODE_BAR + CODE_PAD;

const STACK = { left: 120, top: 330, width: 440, sheet: 116, step: 64 };
const STRIP = { top: 912, width: (1680 - 2 * 40) / 3, height: 72, gap: 40 };
const stripLeft = (k) => 120 + k * (STRIP.width + STRIP.gap);

const DOCS = [
  { file: 'architecture.md' },
  { file: 'search-api.md' },
  { file: 'components.md' },
  { file: 'state-flow.md' },
  { file: 'data-model.md' },
  { file: 'conventions.md' },
  { file: 'product-context.md', keep: 'Product context' },
  { file: 'decisions.md', keep: 'Decision records' },
  { file: 'memory-bank.md', keep: 'Memory bank' },
];

const K = { color: colors.blue };
const CODE_LINES = [
  [['export function ', K], ['searchWellbores(query, { limit = 50 }) {']],
  [['  // Returns 20 results (see search-api.md)']],
  [['  const ', K], ['terms = tokenize(query);']],
  [['  return ', K], ['wellbores']],
  [['    .filter((w) => terms.every((t) => w.name.includes(t)))']],
  [['    // Sorted by spud date (data-model.md)']],
  [['    .sort(byRelevance(terms))']],
  [['    .slice(0, limit);']],
  [['}']],
];
const STALE = { 1: 'search-api.md', 5: 'data-model.md' };

const sheetTop = (i) => STACK.top + i * STACK.step;
const lineY = (k) => CODE.smallTop + (CODE_BODY_TOP + k * LINE_H + LINE_H / 2) * CODE.small;
const smallOffset = { x: CODE.smallLeft - CODE.left, y: CODE.smallTop - CODE.top, scale: CODE.small };

function Code({ clean }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: CODE.left, top: CODE.top, transformOrigin: '0 0' }}
      initial={{ ...smallOffset, opacity: 0, y: smallOffset.y + 24 }}
      animate={{ opacity: 1, ...(clean ? { x: 0, y: 0, scale: CODE.big } : smallOffset) }}
      transition={{ duration: 0.9, ease: appleEase, delay: clean ? 0.5 : 0.25, opacity: { duration: 0.5, delay: 0.25 } }}
    >
      <CodeWindow title="search.js" width={CODE.width} bodyClassName="!py-[28px]" data-mock>
        {CODE_LINES.map((segments, k) => {
          const stale = Boolean(STALE[k]);
          return (
            <motion.div
              key={k}
              className="-mx-[48px] overflow-hidden px-[48px]"
              style={{ background: stale ? CORAL_TINT : 'transparent', boxShadow: stale ? `inset 8px 0 0 ${colors.coral}` : 'none' }}
              initial={false}
              animate={{ height: stale && clean ? 0 : LINE_H, opacity: stale && clean ? 0 : 1 }}
              transition={{ duration: 0.5, ease: appleEase, delay: clean ? 0.15 : 0 }}
            >
              {segments.map(([text, style], s) => (
                <span key={s} style={stale ? { color: '#B4232A' } : style}>
                  {text}
                </span>
              ))}
            </motion.div>
          );
        })}
      </CodeWindow>
    </motion.div>
  );
}

function Sheet({ file, keep, i, collapsed }) {
  const k = keep ? DOCS.filter((d) => d.keep).findIndex((d) => d.file === file) : -1;
  const strip = collapsed && keep;
  const geometry = strip
    ? { left: stripLeft(k), top: STRIP.top, width: STRIP.width, height: STRIP.height }
    : { left: STACK.left, top: sheetTop(i), width: STACK.width, height: STACK.sheet };
  const gone = collapsed && !keep;

  return (
    <motion.div
      data-mock
      className="absolute overflow-hidden rounded-[20px] border-[4px] bg-surface"
      style={{ zIndex: i, borderColor: BORDER }}
      initial={{ ...geometry, opacity: 0, y: 30 }}
      animate={{
        ...geometry,
        opacity: gone ? 0 : 1,
        y: gone ? 40 : 0,
        scale: gone ? 0.92 : 1,
        filter: gone ? 'blur(10px)' : 'blur(0px)',
      }}
      transition={
        collapsed
          ? { duration: 0.7, ease: appleEase, delay: gone ? (8 - i) * 0.05 : 0.45 }
          : { duration: 0.5, ease: appleEase, delay: 0.1 + i * 0.06 }
      }
    >
      <motion.div
        className="absolute left-[24px] top-[14px] flex items-center gap-[12px]"
        initial={false}
        animate={{ opacity: strip ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <FileText size={30} strokeWidth={2.4} color={colors.muted} />
        <span className="whitespace-nowrap font-mono text-[30px] font-semibold leading-[34px] text-ink">{file}</span>
      </motion.div>
      {keep && (
        <motion.div
          className="absolute inset-0 flex items-center gap-[16px] pl-[32px]"
          initial={false}
          animate={{ opacity: strip ? 1 : 0 }}
          transition={{ duration: 0.4, delay: strip ? 0.7 : 0 }}
        >
          <span className="absolute bottom-0 left-0 top-0 w-[6px]" style={{ background: colors.blue }} />
          <FileText size={32} strokeWidth={2.4} color={colors.blue} />
          <span className="whitespace-nowrap text-[32px] font-semibold leading-none text-ink">{keep}</span>
        </motion.div>
      )}
    </motion.div>
  );
}

function SyncMarks({ visible }) {
  const links = Object.entries(STALE).map(([line, file]) => {
    const i = DOCS.findIndex((d) => d.file === file);
    return { x1: STACK.left + STACK.width, y1: sheetTop(i) + 31, x2: CODE.smallLeft, y2: lineY(Number(line)) };
  });
  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      style={{ pointerEvents: 'none', zIndex: 20 }}
    >
      <svg className="absolute inset-0" width={1920} height={1080} aria-hidden="true">
        {links.map(({ x1, y1, x2, y2 }, n) => (
          <motion.line
            key={n}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={colors.coral}
            strokeWidth={6}
            strokeDasharray="14 12"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: appleEase, delay: 1.0 + n * 0.3 }}
          />
        ))}
      </svg>
      {links.map(({ x1, y1, x2, y2 }, n) => (
        <motion.span
          key={n}
          className="absolute flex h-[52px] w-[52px] items-center justify-center rounded-full"
          style={{ left: (x1 + x2) / 2 - 26, top: (y1 + y2) / 2 - 26, background: colors.coral }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ ...gentleSpring, delay: 1.4 + n * 0.3 }}
        >
          <X size={32} strokeWidth={3.6} color="#FFFFFF" />
        </motion.span>
      ))}
      <motion.span
        className="absolute whitespace-nowrap text-[44px] font-bold leading-none"
        style={{ left: CODE.smallLeft, top: 824, color: colors.coral }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: appleEase, delay: 2.0 }}
      >
        Out of sync
      </motion.span>
    </motion.div>
  );
}

export default function S37_CodeContext({ buildStep = 0 }) {
  const collapsed = buildStep >= 1;
  const complete = buildStep >= 2;

  return (
    <SlideFrame>
      <WorkflowMiniMap active="Remember" complete={complete} />
      <Headline
        className="mt-[84px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
      >
        Code is the new context.
      </Headline>
      <Kicker
        className="mt-[20px]"
        initial={false}
        animate={{ opacity: complete ? 1 : 0, y: complete ? 0 : 16 }}
        transition={{ ...gentleSpring, delay: complete ? 0.5 : 0 }}
      >
        Better code. Fewer docs.
      </Kicker>

      {DOCS.map((d, i) => (
        <Sheet key={d.file} {...d} i={i} collapsed={collapsed} />
      ))}
      <Code clean={collapsed} />
      <SyncMarks visible={!collapsed} />
    </SlideFrame>
  );
}
