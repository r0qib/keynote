import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { History, Globe, Newspaper, Boxes, User, FileText } from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, Mascot, WorkflowMiniMap } from '../components/deck';

const CENTRE = { x: 960, y: 652 };
const TICKET = { left: 720, top: 520, width: 480, height: 264 };
// S32 starts from this box.
const BRIEF = { left: 560, top: 330, width: 800, height: 640 };

const CARD_H = 112;
const SOURCES = [
  { label: 'Past projects', Icon: History, left: 160, top: 374, from: { x: 260, y: -520 }, via: { x: 160, y: -170 } },
  { label: 'How others solved it', Icon: Globe, left: 120, top: 522, from: { x: -640, y: -120 }, via: { x: -220, y: -50 } },
  { label: 'That blog post', Icon: Newspaper, left: 120, top: 670, from: { x: -640, y: 120 }, via: { x: -220, y: 50 } },
  { label: 'Our existing assets', Icon: Boxes, left: 160, top: 818, from: { x: 260, y: 520 }, via: { x: 160, y: 170 } },
];
const CARD_W = 440; // approximate, for the flow into the ticket

const FRAME = { left: 1300, top: 374, width: 500, height: 556 };
const THOUGHTS = ['Who uses this?', 'What do I need first?', 'What comes next?'];

// Everything gathered lands in the brief, one row each (S32 mirrors these rows).
const BRIEF_ROWS = [
  ...SOURCES.map(({ label, Icon }) => ({ Icon, text: label })),
  ...THOUGHTS.map((text) => ({ Icon: User, text })),
];

const flowInto = (cx, cy, i) => ({
  x: CENTRE.x - cx,
  y: CENTRE.y - cy,
  scale: 0.25,
  opacity: 0,
  transition: { duration: 0.7, ease: appleEase, delay: i * 0.05 },
});

function SourceCard({ source, i, composed }) {
  const { label, Icon, left, top, from, via } = source;
  return (
    <motion.div
      className="absolute flex items-center gap-[20px] whitespace-nowrap rounded-[28px] border-[4px] border-line bg-surface py-[20px] pl-[20px] pr-[32px] shadow-[0_16px_36px_rgba(17,17,19,0.08)]"
      style={{ left, top, height: CARD_H }}
      initial={{ x: from.x, y: from.y, opacity: 0, rotate: -6 }}
      animate={
        composed
          ? flowInto(left + CARD_W / 2, top + CARD_H / 2, i)
          : {
              x: [from.x, via.x, 0],
              y: [from.y, via.y, 0],
              opacity: [0, 1, 1],
              rotate: [-6, -2, 0],
              scale: 1,
              transition: { duration: 0.95, ease: appleEase, times: [0, 0.45, 1], delay: 0.15 + i * 0.22 },
            }
      }
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[18px] bg-tint-how">
        <Icon size={38} strokeWidth={2.4} color={colors.blue} />
      </span>
      <span className="text-[36px] font-semibold leading-none text-ink">{label}</span>
    </motion.div>
  );
}

function UserFrame({ composed }) {
  return (
    <motion.div
      className="absolute rounded-[40px] border-[6px] border-dashed bg-tint-how"
      style={{ ...FRAME, borderColor: colors.blue }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={composed ? { opacity: 0, transition: { duration: 0.4 } } : { opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, ease: appleEase }}
    >
      <motion.div
        className="absolute bottom-[20px] left-1/2 -ml-[120px]"
        initial={{ x: 220, opacity: 0 }}
        animate={{ x: 0, opacity: 1, y: [0, -36, 0] }}
        transition={{ x: { duration: 0.7, ease: appleEase, delay: 0.2 }, opacity: { duration: 0.3, delay: 0.2 }, y: { duration: 0.7, ease: 'easeOut', delay: 0.2, times: [0, 0.45, 1] } }}
      >
        <Mascot pose="meat-think" preset="none" size={240} />
      </motion.div>
    </motion.div>
  );
}

function Thought({ text, i, composed }) {
  const top = FRAME.top + 28 + i * 86;
  return (
    <div className="absolute flex justify-center" style={{ left: FRAME.left, width: FRAME.width, top }}>
      <motion.div
        className="flex h-[68px] items-center whitespace-nowrap rounded-[34px] border-[4px] bg-surface px-[26px] text-[36px] font-semibold leading-none text-ink"
        style={{ borderColor: colors.blue }}
        initial={{ opacity: 0, scale: 0.7, y: 20 }}
        animate={
          composed
            ? flowInto(FRAME.left + FRAME.width / 2, top + 34, i + 4)
            : { opacity: 1, scale: 1, x: 0, y: 0, transition: { ...gentleSpring, delay: 0.95 + i * 0.25 } }
        }
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
      >
        {text}
      </motion.div>
    </div>
  );
}

function TicketContent({ composed }) {
  return (
    <motion.div
      data-mock
      className="absolute left-[40px] top-[40px]"
      animate={{ opacity: composed ? 0 : 1 }}
      transition={{ duration: 0.3, delay: composed ? 0.35 : 0.3 }}
    >
      <div className="flex items-center gap-[16px] whitespace-nowrap">
        <span className="rounded-[12px] bg-tint-how px-[16px] py-[6px] font-mono text-[28px] font-semibold text-accent-blue">INQ-1502</span>
        <span className="text-[28px] font-medium text-muted">Story</span>
      </div>
      <div className="mt-[28px] whitespace-nowrap text-[48px] font-bold leading-[1.1] text-ink">Wellbore search.</div>
    </motion.div>
  );
}

function BriefContent() {
  return (
    <motion.div
      data-mock
      className="absolute inset-[40px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay: 0.95 }}
    >
      <div className="flex items-center gap-[24px]">
        <span className="flex h-[64px] w-[64px] items-center justify-center rounded-[18px]" style={{ background: colors.blue }}>
          <FileText size={40} strokeWidth={2.4} color="#FFFFFF" />
        </span>
        <span className="text-[56px] font-extrabold leading-none text-ink">Brief</span>
        <span className="ml-auto whitespace-nowrap text-[32px] font-medium text-muted">Wellbore search</span>
      </div>
      <div className="mt-[20px] h-[4px] rounded-full bg-line" />
      <div className="mt-[20px] flex flex-col gap-[8px]">
        {BRIEF_ROWS.map(({ Icon, text }, i) => (
          <motion.div
            key={text}
            className="flex h-[56px] items-center gap-[20px]"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: appleEase, delay: 1.05 + i * 0.08 }}
          >
            <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[12px] bg-tint-how">
              <Icon size={26} strokeWidth={2.4} color={colors.blue} />
            </span>
            <span className="whitespace-nowrap text-[28px] font-semibold leading-none text-ink">{text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function S31_Gather({ buildStep = 0 }) {
  const sources = buildStep >= 1;
  const user = buildStep >= 2;
  const composed = buildStep >= 3;

  return (
    <SlideFrame>
      <WorkflowMiniMap active="Gather" />
      <Headline
        className="mt-[84px]"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
      >
        The requirement is just the start.
      </Headline>

      <AnimatePresence>
        {sources && SOURCES.map((s, i) => <SourceCard key={s.label} source={s} i={i} composed={composed} />)}
      </AnimatePresence>

      <AnimatePresence>{user && <UserFrame key="frame" composed={composed} />}</AnimatePresence>
      <AnimatePresence>
        {user && THOUGHTS.map((t, i) => <Thought key={t} text={t} i={i} composed={composed} />)}
      </AnimatePresence>

      <motion.div
        className="absolute overflow-hidden rounded-[32px] border-[6px] border-ink bg-surface shadow-[0_24px_48px_rgba(17,17,19,0.10)]"
        initial={{ ...TICKET, opacity: 0, y: 30 }}
        animate={composed ? { ...BRIEF, opacity: 1, y: 0 } : { ...TICKET, opacity: 1, y: 0 }}
        transition={composed ? { duration: 0.8, ease: appleEase, delay: 0.45 } : { ...gentleSpring, delay: 0.3 }}
      >
        <TicketContent composed={composed} />
        <AnimatePresence>{composed && <BriefContent key="brief" />}</AnimatePresence>
      </motion.div>
    </SlideFrame>
  );
}
