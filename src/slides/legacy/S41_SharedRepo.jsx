import React from 'react';
import { motion } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { 
  GitFork, 
  Users, 
  Terminal, 
  BookOpen, 
  Cpu, 
  Wrench, 
  Layers, 
  MessageSquare,
  Sparkles,
  Share2,
  FolderGit2
} from 'lucide-react';

/**
 * Slide 41: Build it once. Share it with everyone.
 * 
 * Corner: 41 / Team toolbox (Blue accent dot #1B7ED0, cutTier: 'B')
 * Headline: "Build it once. Share it with everyone."
 * 
 * Visuals:
 *  - Central "Team AI Repo" node radiating outward via vector spokes to team engineers.
 *  - 5 items flowing outward along spokes:
 *    1. Skills (domain knowledge, design tokens)
 *    2. Plugins (linters, test rigs)
 *    3. Commands (/plan, /verify, /checkpoint)
 *    4. Subagents (implementer, reviewer, runner)
 *    5. Workflows (including "user-manual generator" callback to S07)
 *  - Build 2: Bottom takeaway: "Every team should have one. Want a starting point? Ping me."
 * 
 * Builds (totalBuilds: 2):
 *  - 0: Central repo node and radial spokes to team members.
 *  - 1: 5 tool categories flow outward along spokes.
 *  - 2: Bottom takeaway + presenter handle offer.
 */

const SHARED_ITEMS = [
  { id: 'skills', title: 'Domain Skills', icon: BookOpen, desc: 'Wellbore depth math & design tokens' },
  { id: 'plugins', title: 'Custom Plugins', icon: Wrench, desc: '1280px DOM inspector & headless runner' },
  { id: 'commands', title: 'Slash Commands', icon: Terminal, desc: '/plan · /verify · /checkpoint' },
  { id: 'subagents', title: 'Curated Agents', icon: Cpu, desc: 'Sonnet implementer & Haiku committer' },
  { id: 'workflows', title: 'Living Workflows', icon: Layers, desc: 'Automated release documentation & diffs' },
];

export default function S41_SharedRepo({ activeSlide, buildStep }) {
  const showItems = buildStep >= 1;
  const showTakeaway = buildStep >= 2;

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 sm:p-10 md:p-14 lg:p-16 relative bg-[#FAFAFB] text-[#111113] select-none overflow-hidden">
      
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
            Act IV · Team Toolbox
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          Build it once. Share it with everyone.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          Centralize skills, plugins, commands, agents, and workflows in one internal repository.
        </motion.p>
      </div>

      {/* Center Stage: Central Team AI Repo Node + Radiating Spokes & Category Cards */}
      <div className="my-auto w-full max-w-6xl mx-auto z-10 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Central Repo Hub (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: appleEase }}
              className="bg-neutral-900 rounded-3xl p-6 sm:p-8 border-2 border-neutral-800 text-neutral-100 shadow-2xl relative w-full max-w-md overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#1B7ED0] text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FolderGit2 className="w-8 h-8 stroke-[2.2px]" />
              </div>

              <div className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                Internal Private Repository
              </div>
              <h3 className="text-2xl font-black text-white mt-1">
                team-ai-toolbox.git
              </h3>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Single source of truth for Claude Code, Copilot, & autonomous agent protocols.
              </p>

              <div className="mt-5 pt-4 border-t-2 border-neutral-800 flex items-center justify-around text-xs font-mono text-neutral-300">
                <span className="flex items-center gap-1.5">
                  <GitFork className="w-4 h-4 text-emerald-400" />
                  <span>Version controlled</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#1B7ED0]" />
                  <span>All engineers sync</span>
                </span>
              </div>
            </motion.div>
          </div>

          {/* 5 Shared Items List (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-2.5">
            {SHARED_ITEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: showItems ? 1 : 0.25, 
                    x: showItems ? 0 : 10,
                    filter: showItems ? 'blur(0px)' : 'blur(1px)'
                  }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className={`bg-white rounded-2xl p-4 border-2 ${showItems ? 'border-neutral-300 shadow-sm' : 'border-neutral-200'} flex items-center justify-between transition-all`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border-2 border-blue-200 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#1B7ED0] stroke-[2.2px]" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#111113] flex items-center gap-2">
                        <span>{item.title}</span>
                      </div>
                      <div className="text-xs text-[#4A4A55] mt-0.5 font-medium">
                        {item.desc}
                      </div>
                    </div>
                  </div>

                  <span className="hidden sm:inline font-mono text-[11px] text-neutral-400 px-2 py-1 rounded bg-neutral-100 border-2 border-neutral-200">
                    shared
                  </span>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Build 2 Bottom Card */}
      {showTakeaway && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: appleEase }}
          className="z-10 bg-[#111113] rounded-2xl p-4 sm:p-5 border border-neutral-800 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#1B7ED0] text-white flex items-center justify-center shrink-0 font-bold">
              <Sparkles className="w-5 h-5 stroke-[2.2px]" />
            </div>
            <div>
              <p className="text-base font-bold text-white leading-snug">
                "Every team should have one. A one-time setup, then faster and more consistent."
              </p>
              <p className="text-xs text-neutral-400 mt-0.5">
                Want a sanitized starter repo with our agent configs and verification hooks? Ping me on Teams.
              </p>
            </div>
          </div>
          <span className="font-mono text-xs font-bold px-3 py-1 bg-neutral-800 text-blue-400 rounded-lg border border-neutral-700 shrink-0">
            Open Invitation
          </span>
        </motion.div>
      )}

    </div>
  );
}
