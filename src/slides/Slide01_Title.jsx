import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Cpu, Zap, Flame } from 'lucide-react';
import { fadeUp, popIn, floatAnim } from '../motion';

export default function Slide01_Title() {
  return (
    <div className="h-full w-full flex flex-col justify-between p-8 md:p-14 lg:p-16 3xl:p-20 4k:p-24 relative overflow-hidden">
      
      {/* Dynamic Background Ambient Light Gradients */}
      <motion.div 
        animate={{ 
          scale: [1, 1.15, 1],
          rotate: [0, 90, 0],
          opacity: [0.35, 0.55, 0.35]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -left-24 w-[500px] 3xl:w-[700px] h-[500px] 3xl:h-[700px] bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, -90, 0],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-24 -right-24 w-[550px] 3xl:w-[750px] h-[550px] 3xl:h-[750px] bg-gradient-to-tl from-emerald-200 via-teal-200 to-sky-200 rounded-full blur-3xl pointer-events-none"
      />

      {/* Top Bar: Playful Badge */}
      <motion.div variants={fadeUp} className="relative z-10 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 3xl:px-5 3xl:py-2.5 rounded-full bg-neutral-900 text-white text-xs md:text-sm 3xl:text-base font-mono font-medium shadow-sm">
          <Terminal className="w-3.5 h-3.5 3xl:w-4 3xl:h-4 text-emerald-400" />
          <span>informatiq_meetup.sh</span>
        </div>
        <div className="flex items-center gap-2 text-xs md:text-sm 3xl:text-base font-mono text-neutral-400">
          <span className="w-2 h-2 3xl:w-2.5 3xl:h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>live keynote</span>
        </div>
      </motion.div>

      {/* Center Stage: Giant Kinetic Focus & Morphing Aura */}
      <div className="my-auto relative z-10 flex flex-col items-center text-center max-w-4xl lg:max-w-5xl 3xl:max-w-6xl 4k:max-w-7xl mx-auto space-y-8 lg:space-y-10 3xl:space-y-12 4k:space-y-16">
        
        {/* Google I/O style Morphing Living Core */}
        <div className="relative">
          <motion.div
            animate={{
              borderRadius: [
                '60% 40% 30% 70% / 60% 30% 70% 40%',
                '30% 60% 70% 40% / 50% 60% 30% 60%',
                '60% 40% 30% 70% / 60% 30% 70% 40%',
              ],
              rotate: [0, 180, 360],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56 3xl:w-64 3xl:h-64 4k:w-72 4k:h-72 bg-gradient-to-tr from-violet-600 via-indigo-500 to-emerald-400 shadow-[0_15px_50px_rgba(79,70,229,0.35)] flex items-center justify-center relative mx-auto"
          >
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="text-white/90"
            >
              <Cpu className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 4k:w-28 4k:h-28" />
            </motion.div>
          </motion.div>

          {/* Floating Orbiting Pills with Framer Motion spring physics */}
          <motion.div
            variants={popIn}
            className="absolute -top-4 -left-16 md:-left-24 lg:-left-32 4k:-left-40 px-4 py-2 3xl:px-5 3xl:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-lg text-xs md:text-sm 3xl:text-base font-mono text-neutral-800 flex items-center gap-2"
            animate={{ y: [-4, 4, -4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="w-4 h-4 3xl:w-5 3xl:h-5 text-amber-500" />
            <span>zero boilerplate</span>
          </motion.div>

          <motion.div
            variants={popIn}
            className="absolute -bottom-2 -right-16 md:-right-24 lg:-right-32 4k:-right-40 px-4 py-2 3xl:px-5 3xl:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-neutral-200/80 shadow-lg text-xs md:text-sm 3xl:text-base font-mono text-neutral-800 flex items-center gap-2"
            animate={{ y: [4, -4, 4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            <Zap className="w-4 h-4 3xl:w-5 3xl:h-5 text-emerald-500" />
            <span>infinite leverage</span>
          </motion.div>
        </div>

        {/* Dynamic Kinetic Typography */}
        <div className="space-y-4 3xl:space-y-6">
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl lg:text-8xl 3xl:text-9xl 4k:text-[112px] font-black tracking-tight text-neutral-900 leading-[0.96]"
          >
            How We Actually <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-600">
              Build with AI.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-base md:text-xl lg:text-2xl 3xl:text-3xl text-neutral-500 max-w-2xl lg:max-w-3xl 3xl:max-w-4xl mx-auto font-normal leading-relaxed"
          >
            Moving beyond chatbot sidebars to full-blown autonomous developer pipelines.
          </motion.p>
        </div>
      </div>

      {/* Bottom Subtext */}
      <motion.div variants={fadeUp} className="relative z-10 flex items-center justify-between text-xs md:text-sm 3xl:text-base font-mono text-neutral-400">
        <div>Informatiq Engineering</div>
        <div>// real production code, not slide-ware</div>
      </motion.div>
    </div>
  );
}
