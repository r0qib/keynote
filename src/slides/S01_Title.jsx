import React from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../motion.js';
import { colors } from '../theme.js';
import { ActShape } from '../components/deck';
import bs23Logo from '../assets/bs23_logo.webp';

// Three act shapes on the right, clear of the title even at drift extremes, on desynchronised cycles.
const SHAPES = [
  { act: 'Good', color: colors.green, size: 540, left: 1450, top: 30, duration: 28, blend: true },
  { act: 'Bad', color: colors.amber, size: 470, left: 1500, top: 420, duration: 23, glitch: true },
  { act: 'Ugly', color: colors.coral, size: 500, left: 1190, top: 620, duration: 26, blend: true },
];

const LINES = [
  [{ text: 'The' }, { text: 'Good', color: colors.green, after: ',' }, { text: 'the' }, { text: 'Bad', color: colors.amber }],
  [{ text: 'and' }, { text: 'the' }, { text: 'Ugly', color: colors.coral }],
];

const wordIn = (i) => ({
  initial: { opacity: 0, y: 56, filter: 'blur(12px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.8, delay: 0.15 + i * 0.07, ease: appleEase },
});

export default function S01_Title() {
  let wordIndex = 0;

  return (
    <div className="absolute inset-0 overflow-hidden text-ink">
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: appleEase }}
        aria-hidden="true"
      >
        {SHAPES.map(({ act, color, size, left, top, duration, glitch, blend }) => (
          <ActShape
            key={act}
            act={act}
            color={color}
            size={size}
            opacity={0.2}
            duration={duration}
            glitch={glitch}
            morph
            className="absolute"
            style={{ left, top, mixBlendMode: blend ? 'multiply' : 'normal' }}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 px-safe-x flex flex-col justify-center">
        <motion.p
          className="font-semibold tracking-[-0.01em]"
          style={{ fontSize: 52, lineHeight: 1.1 }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: appleEase }}
        >
          AI-Assisted Development
        </motion.p>

        <h1 className="font-black tracking-[-0.03em]" style={{ fontSize: 160, lineHeight: 1, marginTop: 28 }}>
          {LINES.map((line, li) => (
            <span key={li} className="block whitespace-nowrap">
              {line.map((word, wi) => (
                <React.Fragment key={wi}>
                  {wi > 0 && ' '}
                  <motion.span className="inline-block" {...wordIn(wordIndex++)}>
                    {word.color ? <span style={{ color: word.color }}>{word.text}</span> : word.text}
                    {word.after}
                  </motion.span>
                </React.Fragment>
              ))}
            </span>
          ))}
        </h1>

        <motion.p
          className="text-body text-muted"
          style={{ marginTop: 56 }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: appleEase }}
        >
          Rokibul Islam · InformatiQ team
        </motion.p>
      </div>

      <motion.img
        src={bs23Logo}
        alt="Brain Station 23"
        className="absolute block"
        style={{ left: 120, bottom: 96, height: 52 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9, ease: appleEase }}
      />
    </div>
  );
}
