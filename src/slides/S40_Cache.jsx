import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, Mascot } from '../components/deck';

const SLABS = 8;
const STACK = { left: 180, top: 250, width: 760 };
const RING = { left: 1160, top: 269, size: 440, stroke: 28 };
const RING_R = (RING.size - RING.stroke) / 2;
const SLAB_GREY = '#E3E7EE';
const SLAB_HOT = '#F6D5D6';
const HEARTBEAT = 5;

// b1 runs as a short story; each phase starts at t seconds after the build lands.
const STORY = [
  ['walk', 0],
  ['drain', 0.6],
  ['expired', 2.4],
  ['sent', 2.7],
  ['sweep', 3.3],
  ['recached', 4.6],
];

const isWarm = (phase) => ['cached', 'walk', 'drain', 'heartbeat'].includes(phase);
const formatTime = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function S40_Cache({ buildStep = 0 }) {
  const [phase, setPhase] = useState(buildStep === 0 ? 'cached' : buildStep === 1 ? 'walk' : 'heartbeat');
  const ring = useMotionValue(0);
  const seconds = useMotionValue(300);
  const clock = useTransform(seconds, formatTime);
  const ringOpacity = useTransform(ring, [0, 0.01], [0, 1]);

  useEffect(() => {
    if (buildStep !== 1) {
      setPhase(buildStep === 0 ? 'cached' : 'heartbeat');
      return undefined;
    }
    setPhase('walk');
    const timers = STORY.slice(1).map(([name, t]) => setTimeout(() => setPhase(name), t * 1000));
    return () => timers.forEach(clearTimeout);
  }, [buildStep]);

  useEffect(() => {
    let run;
    if (phase === 'cached') {
      seconds.set(300);
      run = animate(ring, 1, { duration: 1.0, ease: appleEase, delay: 0.3 });
    } else if (phase === 'walk') {
      seconds.set(300);
      ring.set(1);
    } else if (phase === 'drain') {
      run = animate(ring, 0, { duration: 1.8, ease: 'linear' });
      const tick = animate(seconds, 0, { duration: 1.8, ease: 'linear' });
      return () => {
        run.stop();
        tick.stop();
      };
    } else if (phase === 'expired') {
      ring.set(0);
      seconds.set(0);
    } else if (phase === 'recached') {
      seconds.set(300);
      run = animate(ring, 1, { duration: 0.6, ease: appleEase });
    } else if (phase === 'heartbeat') {
      ring.set(1);
      run = animate(ring, [1, 0.033, 1], { duration: HEARTBEAT, times: [0, 0.94, 1], ease: 'linear', repeat: Infinity, delay: 0.6 });
    }
    return () => run?.stop();
  }, [phase, ring, seconds]);

  const ringColor = phase === 'recached' ? colors.coral : colors.green;
  const stackBorder = phase === 'sweep' || phase === 'recached' ? colors.coral : isWarm(phase) ? colors.green : '#C9C9D2';

  return (
    <>
      <SlideFrame>
        <Headline initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
          Five minutes.
        </Headline>
      </SlideFrame>

      {/* The context block */}
      <motion.div
        className="absolute rounded-[32px] bg-surface border-[4px] p-[20px] flex flex-col gap-[10px] overflow-hidden"
        style={{ left: STACK.left, top: STACK.top, width: STACK.width }}
        initial={{ opacity: 0, y: 24 }}
        animate={{
          opacity: 1,
          y: 0,
          borderColor: stackBorder,
          boxShadow: isWarm(phase) ? '0 0 64px rgba(30,158,106,0.28)' : phase === 'sweep' ? '0 0 64px rgba(229,72,77,0.32)' : '0 0 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.6, ease: appleEase }}
      >
        {Array.from({ length: SLABS }, (_, i) => (
          <Slab key={i} index={i} phase={phase} />
        ))}
        <AnimatePresence>
          {phase === 'sweep' && (
            <motion.div
              key="sweep"
              className="absolute left-0 right-0 h-[120px]"
              style={{ background: 'linear-gradient(180deg, rgba(229,72,77,0) 0%, rgba(229,72,77,0.55) 60%, rgba(229,72,77,0) 100%)' }}
              initial={{ top: -120 }}
              animate={{ top: 480 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: [0.45, 0, 0.55, 1] }}
            />
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        className="absolute text-[40px] leading-[48px] font-bold text-center"
        style={{ left: STACK.left, top: 756, width: STACK.width }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        100K context
      </motion.div>

      {/* The cache timer */}
      <motion.div
        className="absolute"
        style={{ left: RING.left, top: RING.top, width: RING.size, height: RING.size }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: appleEase, delay: 0.2 }}
      >
        <svg width={RING.size} height={RING.size} viewBox={`0 0 ${RING.size} ${RING.size}`} className="absolute inset-0 -rotate-90" aria-hidden>
          <circle cx={RING.size / 2} cy={RING.size / 2} r={RING_R} fill="none" stroke="#E4E4EA" strokeWidth={RING.stroke} />
          <motion.circle
            cx={RING.size / 2}
            cy={RING.size / 2}
            r={RING_R}
            fill="none"
            strokeWidth={RING.stroke}
            strokeLinecap="round"
            style={{ pathLength: ring, opacity: ringOpacity }}
            animate={{ stroke: ringColor }}
            transition={{ duration: 0.3 }}
          />
        </svg>
        {phase === 'heartbeat' && (
          <motion.span
            className="absolute inset-0 rounded-full border-[6px] border-accent-green"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: [0, 0, 0.45, 0], scale: [1, 1, 1.02, 1.16] }}
            transition={{ duration: HEARTBEAT, times: [0, 0.93, 0.95, 1], ease: 'easeOut', repeat: Infinity, delay: 0.6 }}
          />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {phase === 'heartbeat' ? (
            <>
              <motion.svg
                width="160"
                height="56"
                viewBox="0 0 160 56"
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <motion.path
                  d="M4 30 H52 L64 8 L80 50 L94 18 L104 30 H156"
                  fill="none"
                  stroke={colors.green}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, ease: appleEase, delay: 0.3 }}
                />
              </motion.svg>
              <span className="mt-[8px] font-mono text-[112px] leading-[1] font-bold tracking-[-0.03em]">4:50</span>
            </>
          ) : (
            <motion.span className="font-mono text-[120px] leading-[1] font-bold tracking-[-0.03em]">{clock}</motion.span>
          )}
        </div>
      </motion.div>

      <div className="absolute flex justify-center" style={{ left: RING.left - 80, top: 750, width: RING.size + 160 }}>
        <CachePill phase={phase} />
      </div>

      <AnimatePresence>
        {buildStep === 1 && phase !== 'recached' && phase !== 'sweep' && (
          <Mascot
            key="coffee"
            pose="meat-coffee"
            preset="none"
            size={220}
            className="absolute left-[1620px] top-[700px]"
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], x: [0, 0, 300, 380], y: [0, 0, -12, 0, -12, 0, -12, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.2, times: [0, 0.15, 0.85, 1], ease: 'easeInOut', y: { duration: 2.2, ease: 'easeInOut' } }}
          />
        )}

        {buildStep === 1 && ['sent', 'sweep'].includes(phase) && (
          <motion.div
            key="message"
            className="absolute left-[968px] top-[206px] h-[68px] px-[28px] rounded-[24px] rounded-bl-[8px] bg-ink text-white text-[32px] font-semibold flex items-center whitespace-nowrap"
            initial={{ opacity: 0, x: 60 }}
            animate={phase === 'sent' ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: -360, y: 60, scale: 0.4 }}
            exit={{ opacity: 0 }}
            transition={phase === 'sent' ? gentleSpring : { duration: 0.5, ease: appleEase }}
          >
            ok, continue
          </motion.div>
        )}

        {buildStep >= 2 && <SubAgents key="agents" />}
      </AnimatePresence>
    </>
  );
}

function Slab({ index, phase }) {
  const swept = phase === 'sweep' || phase === 'recached';
  const color = phase === 'sweep' ? [SLAB_GREY, colors.coral, SLAB_HOT] : swept ? SLAB_HOT : SLAB_GREY;
  const widths = [[300, 180], [220, 260], [340, 120], [260, 200], [180, 300], [320, 160], [240, 220], [280, 140]][index];
  return (
    <motion.div
      className="relative h-[46px] rounded-[12px] flex items-center gap-[16px] px-[20px]"
      animate={{ backgroundColor: color }}
      transition={phase === 'sweep' ? { duration: 0.5, delay: 0.1 + index * 0.1, times: [0, 0.4, 1] } : { duration: 0.4 }}
    >
      {widths.map((w, i) => (
        <span key={i} className="h-[12px] rounded-full bg-[#111113]/[0.14]" style={{ width: w }} />
      ))}
    </motion.div>
  );
}

function CachePill({ phase }) {
  const recached = phase === 'recached';
  const warm = isWarm(phase);
  return (
    <motion.span
      className={`h-[68px] px-[36px] rounded-full flex items-center text-body font-semibold text-white whitespace-nowrap ${warm || recached ? '' : 'line-through decoration-[4px]'}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{
        opacity: warm || recached ? 1 : 0.55,
        y: 0,
        backgroundColor: recached ? colors.coral : warm ? colors.green : '#8A8A96',
        boxShadow: warm ? '0 0 40px rgba(30,158,106,0.55)' : recached ? '0 0 40px rgba(229,72,77,0.5)' : '0 0 0px rgba(0,0,0,0)',
      }}
      transition={{ duration: 0.4, ease: appleEase }}
    >
      {recached ? 're-cached' : 'cached'}
    </motion.span>
  );
}

const AGENT_X = [420, 740, 1060, 1380];
const BUS_Y = 840;

// b2: sub-agents work below while the main session keeps the cache warm.
function SubAgents() {
  return (
    <motion.div className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      <svg className="absolute inset-0" width="1920" height="1080" viewBox="0 0 1920 1080" aria-hidden>
        <motion.path
          d={`M560 812 V${BUS_Y} M${AGENT_X[0]} ${BUS_Y} H${AGENT_X[3]} ${AGENT_X.map((x) => `M${x} ${BUS_Y} V872`).join(' ')}`}
          fill="none"
          stroke={colors.ink}
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: appleEase, delay: 0.2, opacity: { duration: 0.1, delay: 0.2 } }}
        />
      </svg>
      {AGENT_X.map((x, i) => (
        <motion.div
          key={x}
          className="absolute w-[240px] h-[96px] rounded-[24px] bg-surface border-[4px] border-ink px-[24px] flex flex-col justify-center gap-[14px]"
          style={{ left: x - 120, top: 872 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...gentleSpring, delay: 0.5 + i * 0.08 }}
        >
          <span className="h-[12px] rounded-full bg-[#D5DAE3]" style={{ width: [150, 120, 160, 110][i] }} />
          <span className="h-[16px] rounded-full bg-[#EEF1F6] overflow-hidden">
            <motion.span
              className="block h-full rounded-full bg-accent-teal"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.6 + i * 0.5, ease: 'easeInOut', delay: 0.9 }}
            />
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
