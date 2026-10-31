import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Terminal, GitCommit, CheckCircle2, Play, Cpu } from 'lucide-react';
import { fadeUp, popIn, drawSvg } from '../motion';

const swarmNodes = [
  { id: 'planner', name: 'Planner Agent', role: 'Decomposes RFC into micro-tasks', color: 'from-violet-500 to-indigo-500' },
  { id: 'coder', name: 'Coder Agent', role: 'Writes strict TypeScript + Vitest tests', color: 'from-indigo-500 to-blue-500' },
  { id: 'reviewer', name: 'Guardrail Linter', role: 'Executes compiler & container sandbox', color: 'from-emerald-500 to-teal-500' },
];

export default function Slide05_Workflow() {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 3);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full w-full flex flex-col justify-between p-8 md:p-14 lg:p-16 3xl:p-20 4k:p-24 relative overflow-hidden">
      {/* Category header */}
      <motion.div variants={fadeUp} className="flex items-center justify-between relative z-10">
        <span className="px-3.5 py-1.5 3xl:px-5 3xl:py-2.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs md:text-sm 3xl:text-base font-mono text-neutral-600">
          // autonomous_swarm.svg
        </span>
        <span className="text-xs md:text-sm 3xl:text-base font-mono text-neutral-400">05 / The Swarm</span>
      </motion.div>

      {/* Main Infographic Stage */}
      <div className="my-auto space-y-8 lg:space-y-12 3xl:space-y-16 relative z-10">
        <motion.div variants={fadeUp} className="text-center max-w-3xl 3xl:max-w-4xl mx-auto space-y-3 3xl:space-y-4">
          <h2 className="text-4xl md:text-6xl lg:text-7xl 3xl:text-8xl 4k:text-9xl font-bold tracking-tight text-neutral-900">
            Agents Talking to Agents.
          </h2>
          <p className="text-base md:text-xl lg:text-2xl 3xl:text-3xl text-neutral-500">
            The breakthrough isn’t one smart chatbot. It’s specialized agents verifying each other.
          </p>
        </motion.div>

        {/* Dynamic Animated Node Network */}
        <div className="max-w-6xl 3xl:max-w-7xl 4k:max-w-[1540px] mx-auto w-full relative">
          
          {/* Animated Connecting SVG Data Wave */}
          <div className="hidden md:block absolute top-1/2 left-20 right-20 -translate-y-1/2 h-16 -z-0 pointer-events-none">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 600 60" fill="none">
              <path
                d="M 50 30 L 300 30 L 550 30"
                stroke="#E5E7EB"
                strokeWidth="4"
                strokeDasharray="6 6"
              />
              <motion.path
                d="M 50 30 L 300 30 L 550 30"
                stroke="url(#agentGrad)"
                strokeWidth="4"
                variants={drawSvg}
                custom={0.1}
              />
              <defs>
                <linearGradient id="agentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="50%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* 3 Interactive Agents */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 3xl:gap-10 4k:gap-14 relative z-10">
            {swarmNodes.map((node, i) => {
              const isActive = pulseIndex === i;
              return (
                <motion.div
                  key={node.id}
                  variants={popIn}
                  initial="initial"
                  animate="animate"
                  whileHover={{ y: -6 }}
                  className={`p-7 lg:p-9 3xl:p-11 4k:p-12 rounded-3xl 4k:rounded-[40px] bg-white border-2 transition-all shadow-xl flex flex-col justify-between h-64 lg:h-76 3xl:h-88 4k:h-96 ${
                    isActive ? 'border-neutral-900 shadow-neutral-200/80 ring-4 ring-neutral-100' : 'border-neutral-200/70 shadow-sm'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4 3xl:mb-6">
                      <div className={`w-12 h-12 lg:w-16 lg:h-16 3xl:w-20 3xl:h-20 rounded-2xl bg-gradient-to-tr ${node.color} text-white flex items-center justify-center shadow-md`}>
                        <Bot className="w-6 h-6 lg:w-8 lg:h-8 3xl:w-10 3xl:h-10" />
                      </div>
                      <span className={`text-[11px] lg:text-xs 3xl:text-sm font-mono font-bold px-2.5 py-1 3xl:px-3 3xl:py-1.5 rounded-full ${
                        isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-100 text-neutral-500'
                      }`}>
                        {isActive ? 'ACTIVE TICK' : 'IDLE'}
                      </span>
                    </div>

                    <div className="text-xs lg:text-sm 3xl:text-base font-mono text-neutral-400 mb-1">NODE 0{i + 1}</div>
                    <h3 className="text-xl lg:text-2xl 3xl:text-3xl 4k:text-4xl font-bold text-neutral-900 mb-2">{node.name}</h3>
                    <p className="text-xs md:text-sm lg:text-base 3xl:text-lg 4k:text-xl font-mono text-neutral-500 leading-relaxed">{node.role}</p>
                  </div>

                  <div className="pt-3 3xl:pt-4 border-t border-neutral-100 flex items-center justify-between text-xs md:text-sm 3xl:text-base font-mono">
                    <span className="text-neutral-400">Handshake verified</span>
                    <CheckCircle2 className="w-4 h-4 lg:w-5 lg:h-5 3xl:w-6 3xl:h-6 text-emerald-500" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <motion.div variants={fadeUp} className="relative z-10 flex items-center justify-between text-xs md:text-sm 3xl:text-base font-mono text-neutral-400">
        <div>Continuous background agent pipeline</div>
        <div>// Zero human friction</div>
      </motion.div>
    </div>
  );
}
