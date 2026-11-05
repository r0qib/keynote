import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FileText, Network, Files } from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, Mascot } from '../components/deck';

const R = 112;
const STATIONS = [
  { name: 'Gather', Icon: Search, x: 322, y: 572 },
  { name: 'Plan', Icon: FileText, x: 727, y: 652 },
  { name: 'Orchestrate', Icon: Network, x: 1192, y: 572 },
  { name: 'Remember', Icon: Files, x: 1597, y: 652 },
];
const ZONES = [
  { label: 'With me', left: 120, width: 810, fill: '#EDF4FB', ink: colors.blue },
  { label: 'Without me', left: 990, width: 810, fill: '#F0F0F3', ink: colors.muted },
];
const ZONE_TOP = 316;
const ZONE_H = 660;
const LOOP_Y = 900;

const curve = (a, b) => {
  const mid = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${mid} ${a.y} ${mid} ${b.y} ${b.x} ${b.y}`;
};
const [G, P, O, M] = STATIONS;
const PATH_WITH = curve(G, P);
const PATH_WITHOUT = `${curve(P, O)} ${curve(O, M).replace('M', 'L')}`;
// Remember, round the bottom of both zones, back into Gather.
const LOOP = `M ${M.x + R + 10} ${M.y} C ${M.x + R + 60} ${M.y} 1760 ${M.y + 40} 1760 ${M.y + 100} L 1760 ${LOOP_Y - 40} Q 1760 ${LOOP_Y} 1720 ${LOOP_Y} L 208 ${LOOP_Y} Q 168 ${LOOP_Y} 168 ${LOOP_Y - 40} L 168 ${G.y + 60} Q 168 ${G.y} ${G.x - R - 22} ${G.y}`;

const LOOP_HEAD = `M ${G.x - R - 4} ${G.y} L ${G.x - R - 40} ${G.y - 24} L ${G.x - R - 40} ${G.y + 24} Z`;
const LOOP_DRAW = 1.1;

function Station({ station, delay, pulse }) {
  const { name, Icon, x, y } = station;
  return (
    <motion.div
      className="absolute"
      style={{ left: x - R, top: y - R, width: 2 * R, height: 2 * R }}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ ...gentleSpring, delay }}
    >
      <div className="flex h-full w-full items-center justify-center rounded-full border-[6px] border-ink bg-surface">
        <Icon size={104} strokeWidth={2.2} color={colors.ink} />
      </div>
      {pulse && (
        <motion.div
          className="absolute inset-0 rounded-full border-[6px]"
          style={{ borderColor: colors.blue }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: [0, 1, 0], scale: [1, 1, 1.35] }}
          transition={{ duration: 0.9, ease: appleEase, delay: LOOP_DRAW, times: [0, 0.2, 1] }}
        />
      )}
      <div className="absolute left-1/2 top-[248px] -translate-x-1/2 whitespace-nowrap text-[48px] font-bold leading-none text-ink">
        {name}
      </div>
    </motion.div>
  );
}

function Zone({ zone, children }) {
  return (
    <motion.div
      className="absolute rounded-[40px]"
      style={{ left: zone.left, top: ZONE_TOP, width: zone.width, height: ZONE_H, background: zone.fill }}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease: appleEase }}
    >
      <div className="absolute left-[48px] top-[36px] text-[40px] font-semibold leading-none" style={{ color: zone.ink }}>
        {zone.label}
      </div>
      {children}
    </motion.div>
  );
}

function DrawPath({ d, delay, duration = 0.8, strokeWidth = 8, color = colors.ink }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration, ease: appleEase, delay }}
    />
  );
}

export default function S30_WorkflowMap({ buildStep = 0 }) {
  const withMe = buildStep >= 1;
  const withoutMe = buildStep >= 2;
  const loop = buildStep >= 3;

  return (
    <SlideFrame>
      <div className="absolute inset-0">
        <AnimatePresence>
          {withMe && (
            <Zone key="with" zone={ZONES[0]}>
              <Mascot
                pose="meat-think"
                preset="none"
                size={140}
                className="absolute left-[350px] top-[24px]"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ ...gentleSpring, delay: 1.1 }}
              />
            </Zone>
          )}
        </AnimatePresence>
        <AnimatePresence>{withoutMe && <Zone key="without" zone={ZONES[1]} />}</AnimatePresence>

        <svg className="absolute left-0 top-0" width="1920" height="1080" viewBox="0 0 1920 1080" aria-hidden="true">
          <AnimatePresence>
            {withMe && <DrawPath key="with" d={PATH_WITH} delay={0.45} />}
            {withoutMe && <DrawPath key="without" d={PATH_WITHOUT} delay={0.35} duration={1.1} />}
            {loop && <DrawPath key="loop" d={LOOP} delay={0.1} duration={LOOP_DRAW} strokeWidth={6} color={colors.blue} />}
            {loop && (
              <motion.path
                key="loop-head"
                d={LOOP_HEAD}
                fill={colors.blue}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.2, delay: LOOP_DRAW }}
              />
            )}
          </AnimatePresence>
        </svg>

        <AnimatePresence>
          {STATIONS.map((st, i) => {
            const shown = i < 2 ? withMe : withoutMe;
            const delay = i % 2 === 0 ? 0.25 : 0.95;
            return shown && <Station key={st.name} station={st} delay={delay} pulse={loop && i === 0} />;
          })}
        </AnimatePresence>
      </div>

      <Headline
        className="relative"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: appleEase }}
      >
        How we work now.
      </Headline>
    </SlideFrame>
  );
}
