import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History, Globe, Newspaper, Boxes, User, FileText, Check,
  ShieldCheck, BookOpen, Target, FlaskConical, BadgeCheck, Bot,
} from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, WorkflowMiniMap } from '../components/deck';

// Same box S31 ends on.
const BRIEF = { left: 560, top: 330, width: 800, height: 640 };
const CENTRE = { x: BRIEF.left + BRIEF.width / 2, y: BRIEF.top + BRIEF.height / 2 };
// During the questions the brief shrinks to make room on both sides.
const SHRINK = 0.76;
const BRIEF_LEFT = CENTRE.x - (BRIEF.width * SHRINK) / 2;
const BRIEF_RIGHT = CENTRE.x + (BRIEF.width * SHRINK) / 2;

const BRIEF_ROWS = [
  { Icon: History, bars: [500, 340] },
  { Icon: Globe, bars: [460, 400] },
  { Icon: Newspaper, bars: [520, 280] },
  { Icon: Boxes, bars: [440, 380] },
  { Icon: User, bars: [500, 320] },
];

// side: which side of the brief; top: question bubble top; from: fly-in offset.
const QUESTIONS = [
  { q: 'Zero results?', a: 'Show nearby wells', side: 'left', top: 404, from: { x: -260, y: -200 } },
  { q: 'Offline?', a: 'Cache last results', side: 'right', top: 470, from: { x: 320, y: -120 } },
  { q: 'Which users first?', a: 'Drilling engineers', side: 'left', top: 592, from: { x: -360, y: 0 } },
  { q: 'How do we verify it?', a: 'Playwright run', side: 'left', top: 780, from: { x: -260, y: 220 } },
  { q: 'Mobile?', a: 'Not in v1', side: 'right', top: 700, from: { x: 320, y: 200 } },
];
const Q_H = 72;
const GAP = 8; // bubble to arrow
const ARROW_W = 44;

const UNITS = [1, 2, 3, 4, 5, 6];
const OPEN_UNIT = 3;
const UNIT = { left: 120, top: 330, width: 500, height: 90, gap: 18 };
const OPEN_CARD = { left: 720, top: 316, width: 1080, height: 640 };
const BANDS = [
  { label: 'Rules', Icon: ShieldCheck, bars: [420, 260] },
  { label: 'Context (short)', Icon: BookOpen, bars: [140] },
  { label: 'Task', Icon: Target, bars: [480, 300] },
  { label: 'Tests', Icon: FlaskConical, bars: [380, 220] },
  { label: 'Verify', Icon: BadgeCheck, bars: [320] },
  { label: 'Agent rules', Icon: Bot, bars: [360, 200] },
];

const unitTop = (i) => UNIT.top + i * (UNIT.height + UNIT.gap);

function BriefRow({ Icon, bars, i, stamped }) {
  return (
    <div className="flex h-[80px] items-center gap-[24px]">
      <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[16px] bg-tint-how">
        <Icon size={32} strokeWidth={2.4} color={colors.blue} />
      </span>
      <div className="flex flex-col gap-[12px]">
        {bars.map((w) => (
          <motion.div
            key={w}
            className="h-[16px] rounded-full"
            style={{ width: w }}
            initial={false}
            animate={{ backgroundColor: stamped ? '#B9D6F2' : '#DCDCE3' }}
            transition={{ duration: 0.4, delay: stamped ? 0.65 + i * 0.14 : 0 }}
          />
        ))}
      </div>
      <AnimatePresence>
        {stamped && (
          <motion.span
            className="ml-auto flex h-[56px] w-[56px] items-center justify-center rounded-full"
            style={{ background: colors.blue }}
            initial={{ opacity: 0, scale: 1.8, rotate: -14 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ ...gentleSpring, delay: 0.6 + i * 0.14 }}
          >
            <Check size={34} strokeWidth={3.4} color="#FFFFFF" />
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

function Brief({ asking, stamped }) {
  return (
    <motion.div
      className="absolute overflow-hidden rounded-[32px] border-[6px] border-ink bg-surface shadow-[0_24px_48px_rgba(17,17,19,0.10)]"
      style={BRIEF}
      initial={false}
      animate={{ scale: asking ? SHRINK : 1, opacity: 1 }}
      exit={{ scale: 0.4, opacity: 0, transition: { duration: 0.45, ease: appleEase, delay: 0.1 } }}
      transition={{ duration: 0.7, ease: appleEase }}
    >
      <div data-mock className="absolute inset-[44px]">
        <div className="flex items-center gap-[24px]">
          <span className="flex h-[72px] w-[72px] items-center justify-center rounded-[20px]" style={{ background: colors.blue }}>
            <FileText size={44} strokeWidth={2.4} color="#FFFFFF" />
          </span>
          <span className="text-[56px] font-extrabold leading-none text-ink">Brief</span>
          <span className="ml-auto whitespace-nowrap text-[32px] font-medium text-muted">Wellbore search</span>
        </div>
        <div className="mt-[28px] h-[4px] rounded-full bg-line" />
        <div className="mt-[28px] flex flex-col gap-[12px]">
          {BRIEF_ROWS.map((row, i) => (
            <BriefRow key={i} {...row} i={i} stamped={stamped} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// One AI question with its arrow into the brief, and my answer below it.
function QuestionPair({ item, i, answered }) {
  const { q, a, side, top, from } = item;
  const left = side === 'left';
  const edge = left ? BRIEF_LEFT - GAP - ARROW_W : BRIEF_RIGHT + GAP;
  const anchor = left ? { right: 1920 - (edge - GAP) } : { left: edge + ARROW_W + GAP };
  const delay = 0.15 + i * 0.2;

  // Full-width row, so scaling it pulls the pair towards the stage centre.
  return (
    <motion.div
      className="absolute"
      style={{ top, left: 0, width: 1920, height: 0 }}
      exit={{ y: CENTRE.y - top - Q_H / 2, scale: 0.3, opacity: 0, transition: { duration: 0.45, ease: appleEase, delay: i * 0.04 } }}
    >
      <motion.div
        className={`absolute flex flex-col gap-[12px] ${left ? 'items-end' : 'items-start'}`}
        style={{ top: 0, ...anchor }}
        initial={{ x: from.x, y: from.y, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ ...gentleSpring, delay }}
      >
        <div className="flex h-[72px] items-center whitespace-nowrap rounded-[36px] border-[4px] border-ink bg-surface px-[28px] text-[36px] font-semibold leading-none text-ink">
          {q}
        </div>
        <AnimatePresence>
          {answered && (
            <motion.div
              className="flex h-[64px] items-center gap-[14px] whitespace-nowrap rounded-[32px] px-[24px] text-[36px] font-semibold leading-none text-white"
              style={{ background: colors.blue }}
              initial={{ opacity: 0, y: -24, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ ...gentleSpring, delay: 0.1 + i * 0.12 }}
            >
              <Check size={34} strokeWidth={3.4} color="#FFFFFF" className="shrink-0" />
              {a}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <svg className="absolute overflow-visible" style={{ left: edge, top: Q_H / 2 - 20 }} width={ARROW_W} height={40} aria-hidden="true">
        <motion.path
          d={left ? 'M2 20 H40 M28 8 L40 20 L28 32' : 'M42 20 H4 M16 8 L4 20 L16 32'}
          fill="none"
          stroke={colors.ink}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ pathLength: { duration: 0.35, ease: appleEase, delay: delay + 0.3 }, opacity: { duration: 0.1, delay: delay + 0.3 } }}
        />
      </svg>
    </motion.div>
  );
}

function UnitCard({ n, i }) {
  const open = n === OPEN_UNIT;
  const top = unitTop(i);
  return (
    <motion.div
      className="absolute flex items-center gap-[24px] rounded-[24px] bg-surface px-[28px]"
      style={{
        left: UNIT.left,
        top,
        width: UNIT.width,
        height: UNIT.height,
        border: `${open ? 6 : 4}px solid ${open ? colors.blue : '#D4D4DC'}`,
      }}
      initial={{ x: CENTRE.x - UNIT.left - UNIT.width / 2, y: CENTRE.y - top - UNIT.height / 2, scale: 0.6, opacity: 0 }}
      animate={{ x: open ? 16 : 0, y: 0, scale: 1, opacity: 1 }}
      transition={{ ...gentleSpring, delay: 0.2 + i * 0.06 }}
    >
      <span className="whitespace-nowrap text-[36px] font-bold leading-none text-ink">Unit {n}</span>
      <div className="ml-auto flex flex-col gap-[10px]">
        <div className="h-[14px] w-[180px] rounded-full bg-[#DCDCE3]" />
        <div className="h-[14px] w-[120px] rounded-full bg-[#DCDCE3]" />
      </div>
    </motion.div>
  );
}

function OpenUnit() {
  const linkY = unitTop(OPEN_UNIT - 1) + UNIT.height / 2;
  const linkLeft = UNIT.left + UNIT.width + 16;
  return (
    <>
      <motion.div
        className="absolute h-[6px] rounded-full"
        style={{ left: linkLeft, top: linkY - 3, width: OPEN_CARD.left - linkLeft, background: colors.blue, transformOrigin: 'left center' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: appleEase, delay: 0.55 }}
      />
      <motion.div
        className="absolute rounded-[36px] border-[6px] bg-surface px-[36px] pt-[30px] shadow-[0_24px_48px_rgba(17,17,19,0.10)]"
        style={{ ...OPEN_CARD, borderColor: colors.blue, transformOrigin: 'left center' }}
        initial={{ opacity: 0, scale: 0.3, x: -80 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.7, ease: appleEase, delay: 0.6 }}
      >
        <div className="text-[56px] font-extrabold leading-none text-ink">Unit {OPEN_UNIT}</div>
        <div className="mt-[30px] flex flex-col gap-[12px]">
          {BANDS.map(({ label, Icon, bars }, i) => (
            <motion.div
              key={label}
              className="flex h-[72px] items-center gap-[20px] rounded-[18px] bg-tint-how px-[24px]"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: appleEase, delay: 0.9 + i * 0.08 }}
            >
              <Icon size={36} strokeWidth={2.4} color={colors.blue} />
              <span className="whitespace-nowrap text-[36px] font-semibold leading-none text-ink">{label}</span>
              <div className="ml-auto flex items-center gap-[12px]">
                {bars.map((w) => (
                  <div key={w} className="h-[16px] rounded-full bg-[#C6D6E6]" style={{ width: w }} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </>
  );
}

export default function S32_PlanTogether({ buildStep = 0 }) {
  const asking = buildStep >= 1;
  const answered = buildStep >= 2;
  const split = buildStep >= 3;

  return (
    <SlideFrame>
      <WorkflowMiniMap active="Plan" />
      <Headline
        className="mt-[84px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
      >
        Plan with a co-worker.
      </Headline>

      <AnimatePresence>{!split && <Brief key="brief" asking={asking} stamped={answered} />}</AnimatePresence>
      <AnimatePresence>
        {asking && !split && QUESTIONS.map((item, i) => <QuestionPair key={item.q} item={item} i={i} answered={answered} />)}
      </AnimatePresence>

      {split && UNITS.map((n, i) => <UnitCard key={n} n={n} i={i} />)}
      {split && <OpenUnit />}
    </SlideFrame>
  );
}
