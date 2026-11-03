import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { 
  FolderTree, 
  FileText, 
  MessageSquare, 
  AlertOctagon, 
  RefreshCw, 
  CheckCircle,
  Folder,
  ArrowRight
} from 'lucide-react';

/**
 * Slide 33: The files are the memory. Not the chat.
 * 
 * Corner: 33 / Working folder (Blue accent dot #1B7ED0)
 * Headline: "The files are the memory. Not the chat."
 * 
 * Visuals:
 *  - Left: Chat transcript fading away with lost context ("context rot (the chat's)").
 *  - Right: temp-notes/<feature>/ directory structure with 6 file roles.
 *  - Build 2: Fresh "new session" connects to the files and resumes instantly.
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Chat window with fading context rot.
 *  - 1: Working folder tree expands with all files and roles.
 *  - 2: New session node connects: "Crash? Context limit? Next morning? Resume without amnesia."
 */

const FILES = [
  { name: 'README.md', role: 'Session protocol', desc: 'How agents run, verify, and stay bounded' },
  { name: 'plan.md', role: 'Decisions + unit DAG', desc: 'Settled contracts & execution order' },
  { name: 'specs/*.md', role: 'The UI spec', desc: 'Component props, styling tokens & contracts' },
  { name: 'progress.md', role: '[ ] [~] [x] [!] state', desc: 'Unit status, git commit hashes, token counts' },
  { name: 'decisions.md', role: 'Autonomy log', desc: 'One-line "why" for every architectural choice' },
  { name: 'important-notes.md', role: 'Living memory', desc: 'Gotchas, discoveries, and lessons learned' },
  { name: 'human-review.md', role: 'Questions for me', desc: 'Non-blocking checkpoint queue' },
];

export default function S33_FilesMemory({ activeSlide, buildStep }) {
  const showFolderTree = buildStep >= 1;
  const showNewSession = buildStep >= 2;

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 sm:p-10 md:p-14 lg:p-18 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
      {/* Top Header */}
      <div className="z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: appleEase }}
          className="flex items-center gap-2 mb-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#1B7ED0]" />
          <span className="font-mono text-xs md:text-sm uppercase tracking-wider text-[#4A4A55] font-semibold">
            Act IV · Persistence Architecture
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          The files are the memory. Not the chat.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          State lives in the repository, not ephemeral chat history. Any session can resume.
        </motion.p>
      </div>

      {/* Center Stage: Chat Context Rot vs. Working Folder Tree */}
      <div className="my-auto w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch z-10 py-2">
        
        {/* Left Column: The Fragile Chat Window (Context Rot) */}
        <div className="md:col-span-5 flex flex-col justify-between bg-white rounded-2xl p-5 border-2 border-neutral-300 shadow-sm relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
              <div className="flex items-center gap-2 text-neutral-500 font-mono text-xs font-bold">
                <MessageSquare className="w-4 h-4 text-neutral-400" />
                <span>One Continuous Chat Thread</span>
              </div>
              <span className="text-[10px] font-mono text-red-600 bg-red-50 px-1.5 py-0.5 rounded border-2 border-red-200 font-bold">
                Turn 47 · 185k tokens
              </span>
            </div>

            {/* Simulated Chat Messages Fading Out */}
            <div className="space-y-2.5 relative">
              {/* Turn 2: Faded Out */}
              <div className="p-2.5 rounded-xl bg-neutral-100 border-2 border-neutral-200 opacity-30 select-none">
                <div className="text-[10px] font-mono text-neutral-400">Turn 2 · Architecture Plan</div>
                <div className="text-xs text-neutral-500 line-through">"Use True Vertical Depth as default..."</div>
              </div>

              {/* Turn 14: Dissolving */}
              <div className="p-2.5 rounded-xl bg-neutral-100 border-2 border-neutral-200 opacity-45 select-none">
                <div className="text-[10px] font-mono text-neutral-400">Turn 14 · Design Tokens</div>
                <div className="text-xs text-neutral-500">"Never use purple, keep 2px borders..."</div>
              </div>

              {/* Turn 32: Partial */}
              <div className="p-2.5 rounded-xl bg-neutral-100 border-2 border-neutral-200 opacity-70">
                <div className="text-[10px] font-mono text-neutral-500">Turn 32 · Unit 3 Bug Fix</div>
                <div className="text-xs text-neutral-700">"Fixed pagination index offset..."</div>
              </div>

              {/* Turn 47: The Crash / Amnesia */}
              <div className="p-2.5 rounded-xl bg-red-50 border-2 border-red-200 text-red-900">
                <div className="text-[10px] font-mono font-bold text-red-700 flex items-center justify-between">
                  <span>Turn 47 · AI Assistant</span>
                  <span>Amnesia!</span>
                </div>
                <div className="text-xs font-semibold mt-1">
                  "Could you remind me what depth reference we agreed on?"
                </div>
              </div>

              {/* Context Rot Callout Tag (Direct callback to S18) */}
              <div className="absolute top-1/3 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-xl border-2 border-[#E5484D] shadow-md flex items-center gap-1.5 font-mono text-xs text-[#E5484D] font-bold z-20">
                <AlertOctagon className="w-3.5 h-3.5 text-[#E5484D]" />
                <span>context rot (the chat's)</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-2 border-t-2 border-neutral-100 text-[11px] font-mono text-neutral-400">
            Eliminates chat history decay.
          </div>
        </div>

        {/* Right Column: The Working Directory (temp-notes/) */}
        <div className="md:col-span-7 flex flex-col justify-between bg-white rounded-2xl p-5 border-2 border-[#1B7ED0] shadow-sm relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-neutral-100">
              <div className="flex items-center gap-2">
                <Folder className="w-4 h-4 text-[#1B7ED0]" />
                <span className="font-mono text-xs font-bold text-[#111113]">
                  temp-notes/data-inventory-redesign/
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#1B7ED0] bg-blue-50 px-2 py-0.5 rounded border-2 border-blue-200 font-bold">
                7 Living Files
              </span>
            </div>

            {/* File Tree (Build 1) */}
            {showFolderTree ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="space-y-1.5"
              >
                {FILES.map((f, i) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...springPhysics, delay: i * 0.08 }}
                    className="p-2 rounded-xl bg-neutral-50 hover:bg-blue-50/50 border-2 border-neutral-200 transition-colors flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#1B7ED0]" />
                      <code className="font-mono font-bold text-[#111113]">{f.name}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-semibold text-neutral-600 bg-white px-2 py-0.5 rounded border-2 border-neutral-200">
                        {f.role}
                      </span>
                      <span className="text-[11px] text-neutral-400 hidden sm:inline">
                        {f.desc}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-12 text-center text-xs font-mono text-neutral-400">
                (Click next to inspect working directory schema)
              </div>
            )}
          </div>

          {/* Build 2: Fresh Agent Resumes Without Amnesia */}
          {showNewSession && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
              className="mt-3 bg-blue-50 rounded-xl p-3 border-2 border-blue-200 flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-[#1B7ED0] animate-spin" />
                <span className="text-xs font-bold text-[#111113]">
                  New Session / Fresh Agent connects & reads files:
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-[#1B7ED0]">
                Zero token bleed · Instant sync
              </span>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="z-10 pt-3 border-t-2 border-neutral-200">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="font-mono text-xs sm:text-sm text-[#4A4A55] font-semibold">
            {showNewSession ? (
              <span className="text-[#1B7ED0] font-bold">
                Crash? Context limit? Next morning? Resume without amnesia.
              </span>
            ) : (
              <span>The chat is ephemeral scratch space. The repository files are the source of truth.</span>
            )}
          </div>

          <div className="font-mono text-xs text-neutral-400">
            temp-notes/ Architecture
          </div>
        </div>
      </div>
    </div>
  );
}
