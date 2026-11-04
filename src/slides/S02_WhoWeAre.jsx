import React from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../motion.js';
import { colors } from '../theme.js';
import { Headline } from '../components/deck';

import wellMateLogo from '../assets/informatiq-app-suite-logos/wellMate.svg';
import wellBookLogo from '../assets/informatiq-app-suite-logos/wellBook.svg';
import geologiQLogo from '../assets/informatiq-app-suite-logos/geologiQ.svg';
import offsetAnalyzerLogo from '../assets/informatiq-app-suite-logos/offsetAnalyzer.svg';
import logistiQLogo from '../assets/informatiq-app-suite-logos/logistiQ.svg';
import eventAnalyzerLogo from '../assets/informatiq-app-suite-logos/eventAnalyzer.svg';
import analytiQLogo from '../assets/informatiq-app-suite-logos/analytiQ.svg';
import informatiqLogo from '../assets/informatiq-app-suite-logos/informatiq.svg';

const PRODUCTS = [
  { name: 'WellMate', logo: wellMateLogo, desc: 'Drilling telemetry' },
  { name: 'WellBook', logo: wellBookLogo, desc: 'Well operations' },
  { name: 'GeologiQ', logo: geologiQLogo, desc: 'Subsurface models' },
  { name: 'Offset Analyzer', logo: offsetAnalyzerLogo, desc: 'Offset benchmark' },
  { name: 'LogistiQ', logo: logistiQLogo, desc: 'Offshore logistics' },
  { name: 'Event Analyzer', logo: eventAnalyzerLogo, desc: 'Incident analysis' },
  { name: 'AnalytiQ', logo: analytiQLogo, desc: 'Analytics engine' },
  { name: 'Portal', logo: informatiqLogo, desc: 'Unified portal' },
];

const FINAL_BUILD = PRODUCTS.length + 1;
const CSS_EASE = `cubic-bezier(${appleEase.join(', ')})`;
const BOX_WIDTH = 800;
const COL_CENTRES = [330, 750, 1170, 1590];

// Design-px geometry per state: centre x, top y, logo box, name size, gap logo → name.
const SPOTLIGHT = { cx: 960, top: 290, logoW: 900, logoH: 170, name: 64, gap: 32 };
const tray = (i) => ({ cx: COL_CENTRES[i % 4], top: 690 + Math.floor(i / 4) * 150, logoW: 340, logoH: 76, name: 30, gap: 12 });
const final = (i) => ({ cx: COL_CENTRES[i % 4], top: 380 + Math.floor(i / 4) * 300, logoW: 384, logoH: 120, name: 40, gap: 20 });

function stateFor(i, buildStep) {
  if (buildStep >= FINAL_BUILD) return { mode: 'final', geo: final(i) };
  if (i === buildStep - 1) return { mode: 'spot', geo: SPOTLIGHT };
  if (i < buildStep - 1) return { mode: 'tray', geo: tray(i) };
  return { mode: 'hidden', geo: SPOTLIGHT };
}

function Product({ product, index, buildStep }) {
  const { mode, geo } = stateFor(index, buildStep);
  const isSpot = mode === 'spot';
  const isHidden = mode === 'hidden';
  // The incoming product waits a beat while the previous one glides into the tray.
  const delay = isSpot ? 0.3 : mode === 'final' ? index * 0.04 : 0;
  const move = { duration: 0.9, delay, ease: appleEase };

  return (
    <motion.div
      className="absolute left-0 top-0 flex flex-col items-center"
      style={{ width: BOX_WIDTH }}
      initial={false}
      animate={{
        x: geo.cx - BOX_WIDTH / 2,
        y: geo.top + (isHidden ? 48 : 0),
        opacity: isHidden ? 0 : 1,
        scale: isHidden ? 0.96 : 1,
      }}
      transition={move}
    >
      <motion.div
        initial={false}
        animate={{ width: geo.logoW, height: geo.logoH }}
        transition={move}
      >
        <img src={product.logo} alt="" draggable={false} className="block w-full h-full object-contain" />
      </motion.div>
      <motion.div
        className="font-bold text-ink whitespace-nowrap tracking-[-0.01em]"
        style={{ lineHeight: 1.15, fontSize: geo.name, transition: `font-size 0.9s ${CSS_EASE} ${delay}s` }}
        initial={false}
        animate={{ marginTop: geo.gap }}
        transition={move}
      >
        {product.name}
      </motion.div>
      <motion.div
        className="text-body text-muted whitespace-nowrap"
        style={{ marginTop: 6 }}
        initial={false}
        animate={{ opacity: isSpot ? 1 : 0 }}
        transition={{ duration: isSpot ? 0.6 : 0.3, delay: isSpot ? 0.5 : 0, ease: appleEase }}
      >
        {product.desc}
      </motion.div>
    </motion.div>
  );
}

// Offshore rig line art, sitting on the horizon at its waterline (y = 194 of 200).
function Rig({ width }) {
  return (
    <svg
      viewBox="0 0 220 200"
      width={width}
      height={(width * 200) / 220}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <g>
        <path d="M88 120 L104 20 L116 20 L132 120" vectorEffect="non-scaling-stroke" />
        <path d="M110 20 V6" vectorEffect="non-scaling-stroke" />
        <path d="M93 100 H127 M97 80 H123 M100 60 H120 M103 40 H117" vectorEffect="non-scaling-stroke" />
        <path d="M93 100 L123 80 M127 100 L97 80 M97 80 L120 60 M123 80 L100 60 M100 60 L117 40 M120 60 L103 40" vectorEffect="non-scaling-stroke" />
        <rect x="44" y="120" width="136" height="16" vectorEffect="non-scaling-stroke" />
        <rect x="52" y="96" width="34" height="24" vectorEffect="non-scaling-stroke" />
        <path d="M16 96 H46 M22 96 L44 120" vectorEffect="non-scaling-stroke" />
        <path d="M148 120 L176 80 L192 68 M148 120 L170 100" vectorEffect="non-scaling-stroke" />
        <path d="M172 128 L204 110" vectorEffect="non-scaling-stroke" />
        <path d="M65 136 V182 M110 136 V182 M155 136 V182" vectorEffect="non-scaling-stroke" />
        <path d="M65 144 L110 176 M110 144 L65 176 M110 144 L155 176 M155 144 L110 176" vectorEffect="non-scaling-stroke" />
        <rect x="46" y="182" width="130" height="10" rx="2" vectorEffect="non-scaling-stroke" />
      </g>
    </svg>
  );
}

const HORIZON_Y = 1000;
const RIG_WIDTH = 160;

export default function S02_WhoWeAre({ buildStep = 0 }) {
  return (
    <div className="absolute inset-0 overflow-hidden text-ink">
      <svg className="absolute left-0 top-0" width="1920" height="1080" aria-hidden="true">
        <motion.line
          x1="0"
          y1={HORIZON_Y}
          x2="1920"
          y2={HORIZON_Y}
          stroke={colors.ink}
          strokeOpacity="0.22"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: appleEase }}
        />
      </svg>
      <motion.div
        className="absolute"
        style={{ left: 1920 - RIG_WIDTH - 24, top: HORIZON_Y - (RIG_WIDTH * 194) / 220, color: colors.ink }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: appleEase }}
      >
        <Rig width={RIG_WIDTH} />
      </motion.div>

      <Headline
        className="absolute whitespace-nowrap"
        style={{ left: 120, top: 128, fontSize: 88 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: appleEase }}
      >
        We build software for the North Sea.
      </Headline>

      {PRODUCTS.map((product, i) => (
        <Product key={product.name} product={product} index={i} buildStep={buildStep} />
      ))}
    </div>
  );
}
