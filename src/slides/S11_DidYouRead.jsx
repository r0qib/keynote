import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pin } from 'lucide-react';
import { appleEase } from '../motion';
import { SlideFrame, Headline, CodeWindow } from '../components/deck';

const MARK = { add: '+', del: '-', ctx: ' ' };
const MARK_COLOR = { add: 'text-[#0F7A4E]', del: 'text-[#C0262D]', ctx: 'text-muted' };

// One diff line. `drift` marks a change nobody asked for.
function Line({ kind = 'ctx', drift = false, focus = false, children }) {
  return (
    <div
      className={`flex -mx-[16px] px-[16px] rounded-[8px] leading-[40px] whitespace-pre-wrap ${
        drift ? 'bg-[#FBEFD9] shadow-[inset_6px_0_0_#D97706]' : ''
      } ${focus ? 'font-bold' : ''}`}
    >
      <span className={`w-[40px] shrink-0 font-bold ${MARK_COLOR[kind]}`}>{MARK[kind]}</span>
      <span className={drift ? 'text-[#7A4300]' : kind === 'ctx' ? 'text-muted' : 'text-ink'}>{children}</span>
    </div>
  );
}

function File({ children }) {
  return <div className="mt-[12px] leading-[40px] font-bold text-muted whitespace-pre-wrap">{children}</div>;
}

function Prompt({ children }) {
  return (
    <div className="flex leading-[40px] whitespace-pre-wrap">
      <span className="w-[40px] shrink-0 text-muted">&gt;</span>
      <span className="font-semibold text-ink">{children}</span>
    </div>
  );
}

// Lines that come and go inside a scenario.
function Reveal({ show, children }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const swap = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: appleEase } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: appleEase } },
};

function ScenarioOne() {
  return (
    <motion.div key="one" variants={swap} initial="initial" animate="animate" exit="exit">
      <Prompt>Fix the date format in the wells table. Don&apos;t touch the API.</Prompt>
      <div className="mt-[24px]">
        <File>WellsTable.tsx</File>
        <Line kind="del">{'<td>{well.spudDate}</td>'}</Line>
        <Line kind="add">{'<td>{formatDate(well.spudDate)}</td>'}</Line>
        <File>api/wells.ts</File>
        <Line kind="del" drift>spudDate: row.spud_date,</Line>
        <Line kind="add" drift>spudDate: normalizeDate(row.spud_date),</Line>
      </div>
      <div className="mt-[36px] leading-[40px] whitespace-pre-wrap text-ink">
        <span className="font-semibold text-accent-green">Done ✓ </span>
        Fixed the date format. Also normalized dates in the API for consistency.
      </div>
    </motion.div>
  );
}

function ScenarioTwo({ cleaned }) {
  return (
    <motion.div key="two" variants={swap} initial="initial" animate="animate" exit="exit">
      <div className="-mx-[48px] -mt-[40px] mb-[24px] px-[48px] py-[14px] bg-[#F1F1F4] border-b-2 border-line flex items-center gap-[20px] leading-[42px] whitespace-pre-wrap">
        <Pin size={28} strokeWidth={2.5} className="text-ink shrink-0" />
        <span className="font-bold text-ink">CLAUDE.md</span>
        <span className="text-ink">Keep comments minimal.</span>
      </div>

      <motion.div animate={{ opacity: cleaned ? 0.4 : 1 }} transition={{ duration: 0.5, ease: appleEase }}>
        <Prompt>Make the Save button blue.</Prompt>
      </motion.div>
      <Reveal show={cleaned}>
        <Prompt>Remove the comments.</Prompt>
      </Reveal>

      <div className="mt-[16px]">
        <motion.div animate={{ opacity: cleaned ? 0.4 : 1 }} transition={{ duration: 0.5, ease: appleEase }}>
          <File>theme.css</File>
          <Line kind="add" drift>--color-action-primary-blue-500: #1B7ED0;</Line>
          <File>Button.tsx</File>
        </motion.div>
        <Reveal show={cleaned}>
          <Line kind="add" drift focus>{'// removed all comments'}</Line>
        </Reveal>
        <motion.div animate={{ opacity: cleaned ? 0.4 : 1 }} transition={{ duration: 0.5, ease: appleEase }}>
          <Reveal show={!cleaned}>
            <Line kind="add" drift>{'/** Visual style of a button. */'}</Line>
          </Reveal>
          <Line kind="add" drift>{"export type ButtonVariant = 'primary' | 'secondary';"}</Line>
          <Reveal show={!cleaned}>
            <Line kind="add" drift>{'/** Renders the form actions. */'}</Line>
          </Reveal>
          <Line>{'export function FormActions() {'}</Line>
          <Line kind="add">{'  <Button variant="primary">Save</Button>'}</Line>
          <Line kind="add" drift>{'  <Button variant="primary">Submit</Button>'}</Line>
          <Line kind="add" drift>{'  <Button variant="primary">Cancel</Button>'}</Line>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function S11_DidYouRead({ buildStep = 0 }) {
  const showWindow = buildStep >= 1;
  const closing = buildStep >= 4;

  return (
    <SlideFrame className={showWindow ? 'justify-start' : 'justify-center'}>
      <motion.div layout transition={{ layout: { duration: 0.7, ease: appleEase } }}>
        <Headline initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: appleEase }}>
          Did you even read what I said?
        </Headline>
      </motion.div>

      <AnimatePresence>
        {showWindow && (
          <motion.div
            key="window"
            className="mt-[48px] relative"
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ duration: 0.7, ease: appleEase }}
          >
            <CodeWindow
              title="~/wellmate"
              width={1680}
              bodyClassName="h-[672px]"
              animate={{ opacity: closing ? 0 : 1, scale: closing ? 0.97 : 1 }}
              transition={{ duration: 0.6, ease: appleEase }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {buildStep < 2 ? <ScenarioOne key="one" /> : <ScenarioTwo key="two" cleaned={buildStep >= 3} />}
              </AnimatePresence>
            </CodeWindow>

            {closing && (
              <motion.div
                data-overlap-ok
                className="absolute inset-0 flex flex-col items-center justify-center text-center text-headline text-ink"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: appleEase, delay: 0.25 }}
              >
                <div>Technically correct.</div>
                <div>The best kind of correct.</div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </SlideFrame>
  );
}
