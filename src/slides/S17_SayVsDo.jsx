import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, CornerDownLeft } from 'lucide-react';
import { appleEase, gentleSpring } from '../motion';
import { colors } from '../theme';
import { SlideFrame, Headline, Mascot, CodeWindow } from '../components/deck';

const PROMPT = 'fix it';

// Types the prompt on `active`, then presses Enter. Resets when inactive.
function useTyping(active) {
  const [typed, setTyped] = useState(0);
  const [entered, setEntered] = useState(false);
  useEffect(() => {
    setTyped(0);
    setEntered(false);
    if (!active) return undefined;
    const timers = [];
    for (let i = 1; i <= PROMPT.length; i += 1) {
      timers.push(setTimeout(() => setTyped(i), 500 + i * 130));
    }
    timers.push(setTimeout(() => setEntered(true), 500 + PROMPT.length * 130 + 450));
    return () => timers.forEach(clearTimeout);
  }, [active]);
  return { text: PROMPT.slice(0, typed), entered };
}

export default function S17_SayVsDo({ buildStep = 0 }) {
  const doing = buildStep >= 1;
  const { text, entered } = useTyping(doing);

  return (
    <SlideFrame>
      <Headline initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
        What we say vs. <span className="text-accent-coral">what we do.</span>
      </Headline>

      <div className="flex flex-1 min-h-0 gap-[80px] mt-[64px]">
        <motion.div
          className="flex-1 flex flex-col rounded-[36px] border-2 border-line bg-surface p-[64px] shadow-[0_24px_60px_rgba(17,17,19,0.08)]"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: appleEase, delay: 0.15 }}
        >
          <div className="flex items-center gap-[20px] text-body font-semibold text-muted">
            <Users size={44} strokeWidth={2.5} />
            <span>In the meeting</span>
          </div>
          <p className="mt-[48px] text-[76px] font-extrabold leading-[1.08] tracking-[-0.02em] text-ink">
            <span className="block whitespace-nowrap">&ldquo;We follow</span>
            <span className="block whitespace-nowrap text-accent-blue">spec-driven</span>
            <span className="block whitespace-nowrap">development.&rdquo;</span>
          </p>
          <Mascot
            pose="meat-meeting"
            preset="none"
            size={240}
            className="mt-auto self-end"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...gentleSpring, delay: 0.5 }}
          />
        </motion.div>

        <CodeWindow
          variant="terminal"
          width="auto"
          className="flex-1 flex flex-col"
          bodyClassName="flex-1 flex flex-col !px-[64px] !py-[56px]"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: appleEase, delay: 0.3 }}
        >
          <div className="flex items-center gap-[20px] font-sans text-body font-semibold text-[#B4B4C0]">
            <Clock size={44} strokeWidth={2.5} />
            <span>At 6:47 PM</span>
          </div>
          <div className="mt-[72px] flex items-center text-[104px] font-bold leading-none">
            <span className="text-accent-coral mr-[36px]">&gt;</span>
            <span className="text-white">{text}</span>
            <span className="ml-[10px] inline-block w-[28px] h-[96px] bg-white" />
          </div>
          <motion.div
            className="mt-auto self-end flex items-center justify-center w-[148px] h-[140px] rounded-[28px] border-b-[10px]"
            initial={false}
            animate={
              entered
                ? { y: 8, backgroundColor: colors.coral, borderColor: '#9E2A2F', color: '#FFFFFF' }
                : { y: 0, backgroundColor: '#2C2D35', borderColor: '#0E0F12', color: '#8A8A96' }
            }
            transition={entered ? { type: 'spring', stiffness: 600, damping: 24 } : { duration: 0.2 }}
          >
            <CornerDownLeft size={68} strokeWidth={2.5} />
          </motion.div>
        </CodeWindow>
      </div>
    </SlideFrame>
  );
}
