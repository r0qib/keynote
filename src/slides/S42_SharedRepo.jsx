import React, { useEffect } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'framer-motion';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline } from '../components/deck';

// Diagram box on the stage; every coordinate below is local to it.
const BOX = { left: 120, top: 260, width: 1680, height: 720 };
const HUB = { x: 500, y: 110, w: 680, h: 500 };
const NODE = { w: 280, h: 116 };
const NODE_Y = [70, 360, 650];
const SPOKE_Y = [250, 360, 470];

const ITEMS = [
  { label: 'Agents', tag: 'v2.0', color: colors.blue },
  { label: 'Skills', tag: 'v1.4', color: colors.green },
  { label: 'Plugins', tag: 'v1.2', color: colors.amber },
  { label: 'Workflows', tag: 'v3.1', color: colors.teal },
];

const PROJECTS = ['WellMate', 'WellBook', 'GeologiQ', 'LogistiQ', 'AnalytiQ', 'Portal'];

// Spoke i: 0–2 go left, 3–5 go right. Cubic bezier from the hub edge to the node.
const spoke = (i) => {
  const left = i < 3;
  const row = i % 3;
  const x0 = left ? HUB.x : HUB.x + HUB.w;
  const x3 = left ? 30 + NODE.w : 1650 - NODE.w;
  const mid = (x0 + x3) / 2;
  return [
    [x0, SPOKE_Y[row]],
    [mid, SPOKE_Y[row]],
    [mid, NODE_Y[row]],
    [x3, NODE_Y[row]],
  ];
};
const SPOKES = PROJECTS.map((_, i) => spoke(i));
const spokePath = ([a, b, c, d]) => `M${a[0]} ${a[1]} C${b[0]} ${b[1]} ${c[0]} ${c[1]} ${d[0]} ${d[1]}`;
const bezier = (p, t) => {
  const u = 1 - t;
  const k = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [0, 1].map((axis) => p.reduce((sum, pt, n) => sum + k[n] * pt[axis], 0));
};

const PACKET = { start: 0.9, perItem: 0.22, perSpoke: 0.05, duration: 0.9 };
const packetDelay = (spokeIndex, itemIndex) => PACKET.start + itemIndex * PACKET.perItem + spokeIndex * PACKET.perSpoke;

// b2: our hub shrinks into the centre of a company field of similar hubs.
const OURS = { cx: 960, cy: 550, scale: 0.42 };
const GHOST_SCALE = 0.22;
const GHOSTS = [
  { cx: 400, cy: 290 },
  { cx: 1520, cy: 290 },
  { cx: 1615, cy: 550 },
  { cx: 1520, cy: 810 },
  { cx: 400, cy: 810 },
  { cx: 305, cy: 550 },
];
const HALO_PAD = 24;
const SPOKE_COLOR = '#9AA1AE';
const RING = GHOSTS.map((g, i) => [g, GHOSTS[(i + 1) % GHOSTS.length]]);

export default function S42_SharedRepo({ buildStep = 0 }) {
  const spread = buildStep >= 1;
  const company = buildStep >= 2;
  const boxCenter = { x: BOX.left + BOX.width / 2, y: BOX.top + BOX.height / 2 };

  return (
    <>
      <AnimatePresence>{company && <CompanyField key="field" />}</AnimatePresence>

      <motion.div
        className="absolute"
        style={{ ...BOX, transformOrigin: '50% 50%' }}
        initial={false}
        animate={
          company
            ? { scale: OURS.scale, x: OURS.cx - boxCenter.x, y: OURS.cy - boxCenter.y }
            : { scale: 1, x: 0, y: 0 }
        }
        transition={{ duration: 0.9, ease: appleEase }}
      >
        <Spokes spread={spread} animateIn={buildStep === 1} />
        {PROJECTS.map((name, i) => (
          <ProjectNode key={name} name={name} index={i} spread={spread} animateIn={buildStep === 1} />
        ))}
        {buildStep === 1 && SPOKES.map((p, i) => ITEMS.map((item, k) => <Packet key={`${i}-${k}`} path={p} color={item.color} delay={packetDelay(i, k)} />))}
        <Hub spread={spread} company={company} />
      </motion.div>

      <SlideFrame>
        <Headline
          className="whitespace-nowrap"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
        >
          Build it once. Share it with everyone.
        </Headline>
      </SlideFrame>

      <AnimatePresence>
        {company && (
          <motion.p
            key="kicker"
            className="absolute left-0 right-0 text-center font-semibold text-ink tracking-[-0.01em]"
            style={{ top: 912, fontSize: 56, lineHeight: '64px' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 2.0, ease: appleEase } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            Reusable code → <span className="text-accent-blue">reusable AI engineering.</span>
          </motion.p>
        )}
      </AnimatePresence>
    </>
  );
}

function Hub({ spread, company }) {
  return (
    <motion.div
      className="absolute rounded-[40px] bg-surface border-[6px] flex flex-col"
      style={{ left: HUB.x, top: HUB.y, width: HUB.w, height: HUB.h, padding: 44 }}
      initial={{ opacity: 0, scale: 0.92, borderColor: colors.ink }}
      animate={{ opacity: 1, scale: spread ? 1 : 1.28, borderColor: company ? colors.blue : colors.ink }}
      transition={{ duration: 0.8, ease: appleEase }}
    >
      <div className="flex items-center gap-[20px]" style={{ height: 56 }}>
        <BranchMark />
        <span className="font-extrabold tracking-[-0.02em]" style={{ fontSize: 46, lineHeight: '56px' }}>
          Team AI repo
        </span>
      </div>
      <div className="flex flex-col gap-[12px]" style={{ marginTop: 32 }}>
        {ITEMS.map((item, k) => (
          <motion.div
            key={item.label}
            className="flex items-center rounded-[20px] bg-[#F3F5F8]"
            style={{ height: 72, paddingLeft: 28, paddingRight: 16 }}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 + k * 0.08, ease: appleEase }}
          >
            <span className="rounded-full shrink-0" style={{ width: 22, height: 22, background: item.color }} />
            <span className="ml-[20px] text-[40px] leading-[48px] font-semibold">{item.label}</span>
            <motion.span
              className="ml-auto h-[48px] px-[16px] rounded-[12px] bg-surface border-[3px] border-line font-mono text-[28px] font-semibold text-muted flex items-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ...gentleSpring, delay: 0.7 + k * 0.1 }}
            >
              {item.tag}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function BranchMark() {
  return (
    <span className="w-[56px] h-[56px] rounded-[16px] bg-accent-blue flex items-center justify-center shrink-0">
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" aria-hidden>
        <circle cx="9" cy="7" r="4" />
        <circle cx="9" cy="27" r="4" />
        <circle cx="25" cy="13" r="4" />
        <path d="M9 11 V23 M25 17 C25 22 9 19 9 23" />
      </svg>
    </span>
  );
}

function Spokes({ spread, animateIn }) {
  return (
    <svg className="absolute inset-0" width={BOX.width} height={BOX.height} viewBox={`0 0 ${BOX.width} ${BOX.height}`} aria-hidden>
      {SPOKES.map((p, i) => (
        <motion.path
          key={i}
          d={spokePath(p)}
          fill="none"
          stroke={SPOKE_COLOR}
          strokeWidth="10"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={spread ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={animateIn ? { duration: 0.6, delay: 0.2 + i * 0.06, ease: appleEase } : { duration: 0.3 }}
        />
      ))}
    </svg>
  );
}

function ProjectNode({ name, index, spread, animateIn }) {
  const left = index < 3 ? 30 : 1650 - NODE.w;
  const top = NODE_Y[index % 3] - NODE.h / 2;
  return (
    <motion.div
      className="absolute rounded-[28px] bg-surface border-[5px] border-ink flex flex-col items-center justify-center gap-[12px]"
      style={{ left, top, width: NODE.w, height: NODE.h }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={spread ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
      transition={animateIn ? { ...gentleSpring, delay: 0.5 + index * 0.06 } : { duration: 0.3 }}
    >
      <span className="text-[36px] leading-[40px] font-bold">{name}</span>
      <span className="flex gap-[10px]">
        {ITEMS.map((item, k) => (
          <motion.span
            key={item.label}
            className="rounded-full"
            style={{ width: 16, height: 16, background: item.color }}
            initial={{ opacity: 0, scale: 0 }}
            animate={spread ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={animateIn ? { ...gentleSpring, delay: packetDelay(index, k) + PACKET.duration - 0.05 } : { duration: 0.2 }}
          />
        ))}
      </span>
    </motion.div>
  );
}

// One item travelling along a spoke, hub to project.
function Packet({ path, color, delay }) {
  const t = useMotionValue(0);
  const x = useTransform(t, (v) => bezier(path, v)[0]);
  const y = useTransform(t, (v) => bezier(path, v)[1]);
  const opacity = useTransform(t, [0, 0.08, 0.9, 1], [0, 1, 1, 0]);

  useEffect(() => {
    const controls = animate(t, 1, { duration: PACKET.duration, delay, ease: appleEase });
    return () => controls.stop();
  }, [t, delay]);

  return (
    <motion.span
      className="absolute left-0 top-0 rounded-full"
      style={{ width: 28, height: 28, marginLeft: -14, marginTop: -14, background: color, x, y, opacity }}
    />
  );
}

// b2 field: links, a halo marking ours, and six wordless hubs. Fades out on the way back to b1.
function CompanyField() {
  const halo = {
    width: BOX.width * OURS.scale + HALO_PAD * 2,
    height: BOX.height * OURS.scale + HALO_PAD * 2,
  };
  return (
    <motion.div className="absolute inset-0" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      <svg className="absolute inset-0" width="1920" height="1080" viewBox="0 0 1920 1080" aria-hidden>
        {RING.map(([a, b], i) => (
          <motion.line
            key={`r${i}`}
            x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy}
            stroke={SPOKE_COLOR}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 1.3 + i * 0.05, ease: appleEase }}
          />
        ))}
        {GHOSTS.map((g, i) => (
          <motion.line
            key={`o${i}`}
            x1={OURS.cx} y1={OURS.cy} x2={g.cx} y2={g.cy}
            stroke={colors.blue}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 1.1 + i * 0.05, ease: appleEase }}
          />
        ))}
      </svg>
      <motion.div
        className="absolute rounded-[56px] border-[6px] border-accent-blue"
        style={{
          ...halo,
          left: OURS.cx - halo.width / 2,
          top: OURS.cy - halo.height / 2,
          background: '#E6F0FA',
          boxShadow: '0 0 0 12px rgba(27,126,208,0.14)',
        }}
        initial={{ opacity: 0, scale: 1.08 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.6, ease: appleEase }}
      />
      {GHOSTS.map((g, i) => (
        <GhostHub key={i} {...g} delay={0.5 + i * 0.08} />
      ))}
    </motion.div>
  );
}

// A hub like ours, outlines only.
function GhostHub({ cx, cy, delay }) {
  const w = BOX.width * GHOST_SCALE;
  const h = BOX.height * GHOST_SCALE;
  return (
    <motion.svg
      className="absolute"
      style={{ left: cx - w / 2, top: cy - h / 2 }}
      width={w}
      height={h}
      viewBox={`-24 -24 ${BOX.width + 48} ${BOX.height + 48}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ ...gentleSpring, delay }}
      aria-hidden
    >
      <rect x="-24" y="-24" width={BOX.width + 48} height={BOX.height + 48} rx="96" fill={colors.canvas} />
      {SPOKES.map((p, i) => (
        <path key={i} d={spokePath(p)} fill="none" stroke={SPOKE_COLOR} strokeWidth="20" strokeLinecap="round" />
      ))}
      {PROJECTS.map((_, i) => (
        <rect
          key={i}
          x={i < 3 ? 30 : 1650 - NODE.w}
          y={NODE_Y[i % 3] - NODE.h / 2}
          width={NODE.w}
          height={NODE.h}
          rx="28"
          fill={colors.surface}
          stroke="#7A808C"
          strokeWidth="20"
        />
      ))}
      <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="40" fill={colors.surface} stroke="#7A808C" strokeWidth="22" />
    </motion.svg>
  );
}
