import React, { useEffect } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'framer-motion';
import { FileCode, FileText } from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { SlideFrame, Headline, CodeWindow, Mascot } from '../components/deck';

// Stage coordinates. The prompt sits at the centre of the content area; files land around it.
const ORIGIN = { x: 960, y: 612 };
const FILES = [
  { name: 'ThemeProvider.tsx', x: 420, y: 300 },
  { name: 'ThemeStrategyFactory.ts', x: 960, y: 300 },
  { name: 'ThemeContext.ts', x: 1500, y: 300 },
  { name: 'ThemeRegistry.ts', x: 380, y: 456 },
  { name: 'useThemeObserver.ts', x: 1540, y: 456 },
  { name: 'useTheme.ts', x: 340, y: 612 },
  { name: 'theme.config.ts', x: 1580, y: 612 },
  { name: 'tokens/dark.ts', x: 380, y: 768 },
  { name: 'tokens/light.ts', x: 1540, y: 768 },
  { name: 'ThemeToggle.tsx', x: 420, y: 924 },
  { name: 'ThemeToggle.test.tsx', x: 960, y: 924 },
  { name: 'ThemeToggle.stories.tsx', x: 1500, y: 924 },
];

const TOC = [
  { t: '# Theme Architecture', head: true },
  { t: '## Table of contents', head: true },
  { t: '1. Philosophy of Darkness', p: 3 },
  { t: '   1.1 What is a theme?', p: 4 },
  { t: '   1.2 What is darkness?', p: 5 },
  { t: '2. Stakeholders and Personas', p: 7 },
  { t: '3. Guiding Principles', p: 9 },
  { t: '4. Theme Lifecycle', p: 11 },
  { t: '   4.1 Initialisation', p: 12 },
  { t: '   4.2 Hydration', p: 13 },
  { t: '   4.3 Theme Lifecycle Hooks', p: 14 },
  { t: '   4.4 Teardown', p: 16 },
  { t: '5. The ThemeStrategyFactory', p: 17 },
  { t: '6. Token Taxonomy', p: 20 },
  { t: '   6.1 Light tokens', p: 21 },
  { t: '   6.2 Dark tokens', p: 22 },
  { t: '   6.3 Dim tokens (future)', p: 24 },
  { t: '7. Accessibility', p: 25 },
  { t: '8. Performance Budget', p: 27 },
  { t: '9. Migration Strategy (v1 → v2)', p: 29 },
  { t: '10. Risks and Mitigations', p: 32 },
  { t: '11. Governance Committee', p: 34 },
  { t: '12. Open Questions', p: 36 },
  { t: 'Appendix A: Glossary', p: 38 },
  { t: 'Appendix B: Sunset Plan for Light Mode', p: 40 },
];

const LINE = 44;
const VISIBLE = 13;
const SCROLL_MAX = (TOC.length - VISIBLE) * LINE;

function FileChip({ name, x, y, i }) {
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: x, top: y }}>
      <motion.div
        className="flex items-center gap-[14px] h-[80px] px-[24px] rounded-[18px] bg-surface border-2 border-line shadow-[0_12px_32px_rgba(17,17,19,0.08)]"
        initial={{ x: ORIGIN.x - x, y: ORIGIN.y - y, scale: 0.3, opacity: 0 }}
        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0, transition: { duration: 0.35, ease: appleEase } }}
        transition={{ duration: 0.8, ease: appleEase, delay: 0.05 + i * 0.04 }}
      >
        <FileCode size={32} strokeWidth={2.5} className="text-accent-amber shrink-0" />
        <span className="font-mono text-label font-semibold text-ink whitespace-nowrap">{name}</span>
      </motion.div>
    </div>
  );
}

// One TOC line; fades as it scrolls past either edge of the window.
function TocLine({ line, i, scroll }) {
  const top = i * LINE;
  const opacity = useTransform(scroll, (s) => {
    const y = top - s;
    return Math.max(0, Math.min(1, (y + LINE) / LINE, (VISIBLE * LINE - y) / LINE));
  });
  return (
    <motion.div className="flex items-baseline justify-between whitespace-pre" style={{ height: LINE, opacity }}>
      <span className={line.head ? 'font-bold text-ink' : 'text-ink'}>{line.t}</span>
      {line.p && <span className="text-muted">{line.p}</span>}
    </motion.div>
  );
}

function ArchitectureDoc() {
  const scroll = useMotionValue(0);
  const pages = useTransform(scroll, [0, SCROLL_MAX], [1, 40], { clamp: true });
  const pageText = useTransform(pages, (p) => `page 1 of ${Math.round(p)}`);
  const y = useTransform(scroll, (s) => -s);

  useEffect(() => {
    const controls = animate(scroll, SCROLL_MAX, { duration: 2.6, delay: 0.7, ease: [0.45, 0, 0.25, 1] });
    return () => controls.stop();
  }, [scroll]);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: 160 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: appleEase, delay: 0.15 }}
    >
      <CodeWindow title="THEME_ARCHITECTURE.md" width={1160} bodyClassName="overflow-hidden" style={{ height: 740 }}>
        <div className="relative overflow-hidden" style={{ height: VISIBLE * LINE }}>
          <motion.div style={{ y }}>
            {TOC.map((line, i) => (
              <TocLine key={line.t} line={line} i={i} scroll={scroll} />
            ))}
          </motion.div>
        </div>
      </CodeWindow>
      <div className="absolute top-0 right-[28px] h-[64px] flex items-center gap-[12px]">
        <FileText size={28} strokeWidth={2.5} className="text-muted" />
        <motion.span className="font-mono text-badge font-semibold text-ink tabular-nums">{pageText}</motion.span>
      </div>
    </motion.div>
  );
}

export default function S13_Overengineered({ buildStep = 0 }) {
  const exploded = buildStep === 1;
  const showDoc = buildStep >= 2;

  return (
    <SlideFrame>
      <Headline initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
        Enterprise-grade dark mode.
      </Headline>

      <AnimatePresence>
        {!showDoc && (
          <motion.div
            key="prompt"
            className="absolute flex items-center gap-[24px] h-[104px] px-[48px] rounded-full bg-ink text-white font-mono text-[40px] font-semibold whitespace-nowrap"
            style={{ left: ORIGIN.x, top: ORIGIN.y, translateX: '-50%', translateY: '-50%' }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.35, ease: appleEase } }}
            transition={{ duration: 0.7, ease: appleEase, delay: 0.2 }}
          >
            <span className="text-[#9A9AA8]">&gt;</span>
            Add a dark mode toggle.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {exploded && FILES.map((f, i) => <FileChip key={f.name} i={i} {...f} />)}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showDoc && (
          <motion.div key="doc" className="absolute flex items-center justify-between" style={{ left: 120, right: 120, top: 244, height: 740 }}>
            <motion.div
              className="w-[440px] flex justify-center"
              initial={{ opacity: 0, scale: 0.6, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: [0, -6, 5, -3, 0] }}
              transition={{ ...gentleSpring, delay: 0.5, rotate: { delay: 1.0, duration: 0.8, ease: 'easeInOut' } }}
            >
              <Mascot pose="meat-mindblown" preset="none" size={400} />
            </motion.div>
            <ArchitectureDoc />
          </motion.div>
        )}
      </AnimatePresence>
    </SlideFrame>
  );
}
