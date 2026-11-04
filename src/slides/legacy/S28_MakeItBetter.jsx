import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { appleEase, springPhysics } from '../motion';
import { 
  Sparkles, 
  Bot, 
  AlertTriangle, 
  Filter, 
  Search, 
  ArrowUpDown, 
  Check, 
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Zap,
  Rocket,
  Globe,
  Palette,
  Ruler,
  Info
} from 'lucide-react';

/**
 * Slide 28: Let's make it better.
 * 
 * Corner: 28 / Make it better (Blue accent dot #1B7ED0)
 * Headline: "Let's make it better."
 * 
 * Component: Wellbore Data Grid evolving across 4 states:
 *  - Build 0: "Before AI" (Plain table, "It worked. It was fine.")
 *  - Build 1: "With AI" (Full purple slop, rainbow pills, floating robot, broken at 1280px)
 *  - Build 2: Blackboard eraser sweeps the slop away ("…just kidding.")
 *  - Build 3: "With AI, done right" (Calm InformatiQ grid, filters, density, hover, skeleton)
 *             Punchline: "Before: bounded by hours. Now: bounded by imagination."
 * 
 * Builds: totalBuilds = 3
 */

const WELLBORE_DATA = [
  { id: 'WB-01', name: 'Wellbore A-12', field: 'Demo North', status: 'Active', tvd: '2,840 m', md: '3,120 m', temp: '84°C' },
  { id: 'WB-02', name: 'Wellbore B-07', field: 'Demo North', status: 'Drilling', tvd: '1,920 m', md: '2,050 m', temp: '62°C' },
  { id: 'WB-03', name: 'Wellbore C-04', field: 'Demo West', status: 'Suspended', tvd: '3,410 m', md: '3,950 m', temp: '104°C' },
  { id: 'WB-04', name: 'Wellbore D-19', field: 'Demo North', status: 'Active', tvd: '2,650 m', md: '2,890 m', temp: '78°C' },
];

export default function S28_MakeItBetter({ activeSlide, buildStep }) {
  const [hoveredRow, setHoveredRow] = useState(null);
  const [density, setDensity] = useState('comfortable'); // 'comfortable' | 'compact'
  const [showSkeleton, setShowSkeleton] = useState(false);

  // States mapped by buildStep
  // 0: Before AI
  // 1: With AI (Slop)
  // 2: Eraser Sweep ("Just kidding")
  // 3: With AI Done Right
  const stateIndex = Math.min(buildStep, 3);

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
            Act IV · Craft in Practice
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: appleEase }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#111113] leading-[1.08]"
        >
          Let's make it better.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: appleEase }}
          className="text-base sm:text-lg md:text-xl text-[#4A4A55] mt-2 font-normal"
        >
          AI lets us ship far more polish in the same time, if we bring the taste.
        </motion.p>
      </div>

      {/* Center Stage: The Evolving Data Grid Container */}
      <div className="my-auto w-full max-w-6xl mx-auto z-10 py-2 relative">
        
        {/* State Label & Metadata Bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold border-2 ${
              stateIndex === 0 ? 'bg-neutral-100 text-neutral-700 border-neutral-300' :
              stateIndex === 1 ? 'bg-purple-100 text-purple-900 border-purple-400' :
              stateIndex === 2 ? 'bg-amber-100 text-amber-900 border-amber-400' :
              'bg-blue-50 text-[#1B7ED0] border-[#1B7ED0]'
            }`}>
              {stateIndex === 0 && '01 · Before AI ("It worked. It was bare-bones.")'}
              {stateIndex === 1 && '02 · Unconstrained AI ("Generic Purple Slop")'}
              {stateIndex === 2 && '03 · Sweeping the slop away…'}
              {stateIndex === 3 && '04 · AI with Engineering Taste (InformatiQ Design System)'}
            </span>
          </div>

          <div className="font-mono text-xs text-neutral-500 font-semibold">
            {stateIndex === 3 ? (
              <span className="text-[#1B7ED0]">Same ticket. Same deadline. Higher standard.</span>
            ) : (
              <span>Wellbore Data Grid Component</span>
            )}
          </div>
        </div>

        {/* The Grid Window Canvas */}
        <div className="relative min-h-[360px] w-full rounded-2xl bg-white border-2 border-neutral-300 shadow-lg overflow-hidden flex flex-col justify-between">
          
          {/* ========================================================= */}
          {/* STATE 0: Before AI (Plain Table)                          */}
          {/* ========================================================= */}
          {stateIndex === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-5 flex-1 flex flex-col justify-between"
            >
              <div>
                <div className="text-sm font-semibold text-neutral-600 mb-3 font-sans">
                  Wellbores Overview (v1.0)
                </div>
                <table className="w-full border-collapse border-2 border-neutral-300 text-left text-xs font-sans">
                  <thead>
                    <tr className="bg-neutral-100 border-b-2 border-neutral-300 text-neutral-700">
                      <th className="p-2.5 border-r-2 border-neutral-300 font-semibold">Wellbore Name</th>
                      <th className="p-2.5 border-r-2 border-neutral-300 font-semibold">Field</th>
                      <th className="p-2.5 border-r-2 border-neutral-300 font-semibold">Status</th>
                      <th className="p-2.5 font-semibold">Depth (TVD)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WELLBORE_DATA.map((row) => (
                      <tr key={row.id} className="border-b-2 border-neutral-200">
                        <td className="p-2.5 border-r-2 border-neutral-200 font-medium">{row.name}</td>
                        <td className="p-2.5 border-r-2 border-neutral-200">{row.field}</td>
                        <td className="p-2.5 border-r-2 border-neutral-200">{row.status}</td>
                        <td className="p-2.5 font-mono">{row.tvd}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Standard Plain Pagination */}
              <div className="flex items-center justify-between pt-3 mt-4 border-t-2 border-neutral-200 text-xs text-neutral-500 font-sans">
                <span>Showing 1 to 4 of 4 entries</span>
                <div className="flex items-center gap-1 font-mono">
                  <button className="px-2 py-1 border-2 border-neutral-300 rounded bg-neutral-50 text-neutral-400 cursor-not-allowed">
                    &lt; Prev
                  </button>
                  <span className="px-2 py-1 border-2 border-neutral-300 rounded bg-neutral-200 font-bold">1</span>
                  <button className="px-2 py-1 border-2 border-neutral-300 rounded bg-neutral-50 text-neutral-400 cursor-not-allowed">
                    Next &gt;
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* STATE 1: With AI (Full Slop with purple & sparkles)        */}
          {/* ========================================================= */}
          {stateIndex === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex-1 flex flex-col justify-between overflow-hidden"
            >
              {/* Purple-to-indigo gradient slop header */}
              <div className="bg-gradient-to-r from-purple-700 via-indigo-600 to-purple-800 p-4 text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" />
                  <span className="font-extrabold tracking-wide text-base">
                    AI-POWERED ULTRA WELL ANALYTICS SUITE 3.0 PRO
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold border-2 border-white/30 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-yellow-300" />
                    <span>99.8% AI ACCURATE</span>
                  </span>
                </div>
              </div>

              {/* Glass table rows with rainbow pills */}
              <div className="p-4 flex-1">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b-2 border-purple-200 text-purple-900 bg-purple-50/50">
                      <th className="p-2 font-bold flex items-center gap-1">
                        <Rocket className="w-3.5 h-3.5 text-purple-700" /> Wellbore
                      </th>
                      <th className="p-2 font-bold">
                        <span className="inline-flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-indigo-700" /> Field
                        </span>
                      </th>
                      <th className="p-2 font-bold">
                        <span className="inline-flex items-center gap-1">
                          <Palette className="w-3.5 h-3.5 text-pink-700" /> Status
                        </span>
                      </th>
                      <th className="p-2 font-bold">
                        <span className="inline-flex items-center gap-1">
                          <Ruler className="w-3.5 h-3.5 text-purple-700" /> TVD Depth
                        </span>
                      </th>
                      <th className="p-2 font-bold text-red-600">
                        <span className="inline-flex items-center gap-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-red-600" /> Temp (Truncated at 1280px)
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {WELLBORE_DATA.map((row, i) => (
                      <tr key={row.id} className="border-b-2 border-purple-100 bg-white/60 hover:bg-purple-50/40">
                        <td className="p-2 font-bold text-purple-900 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                          <span>{row.name}</span>
                        </td>
                        <td className="p-2 font-medium text-indigo-800">{row.field}</td>
                        <td className="p-2">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            i === 0 ? 'bg-pink-500 text-white shadow-sm' :
                            i === 1 ? 'bg-cyan-400 text-black shadow-sm' :
                            i === 2 ? 'bg-lime-400 text-black shadow-sm' :
                            'bg-amber-400 text-black shadow-sm'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="p-2 font-mono font-bold text-purple-700">{row.tvd}</td>
                        <td className="p-2 text-neutral-400 italic">Overflow... [Cut]</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Floating Robot Bubble */}
              <div className="absolute bottom-10 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3.5 py-2 rounded-2xl shadow-xl flex items-center gap-2 border-2 border-purple-300">
                <Bot className="w-4 h-4 text-yellow-300" />
                <span className="text-xs font-bold">Ask AI about your wells!</span>
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              </div>

              {/* Broken Layout Indicator at 1280px (sets up S36 callback) */}
              <div className="w-full bg-red-100 border-t-2 border-red-500 p-2 flex items-center justify-between text-xs text-red-800 font-mono font-bold">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>[!] Broken layout at 1280px width: Right column clipped & horizontal scroll forced</span>
                </div>
                <span className="bg-red-200 px-2 py-0.5 rounded text-[10px]">Uncaught responsive bug</span>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* STATE 2: Eraser Wipe ("...just kidding")                   */}
          {/* ========================================================= */}
          {stateIndex === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="relative flex-1 flex flex-col justify-center items-center p-8 bg-neutral-100"
            >
              {/* Physical Blackboard Eraser wiping across (callback to S03) */}
              <motion.div
                className="absolute top-0 bottom-0 pointer-events-none z-30 flex items-center"
                initial={{ left: '-15%' }}
                animate={{ left: '105%' }}
                transition={{ duration: 1.1, ease: appleEase }}
              >
                <div className="w-16 h-40 rounded-lg bg-[#C28B59] border-2 border-[#8A5A36] shadow-2xl flex flex-col justify-between p-1.5 rotate-6">
                  <div className="w-full text-center font-mono text-[9px] uppercase tracking-widest text-[#5C3A1E] font-bold py-1">
                    DUSTER
                  </div>
                  <div className="w-full h-10 bg-[#2D2D32] rounded border-t-2 border-[#1A1A1E]" />
                </div>
              </motion.div>

              {/* Just Kidding Card */}
              <div className="text-center z-10 max-w-md">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border-2 border-amber-400 text-amber-900 font-mono text-xs font-bold mb-3">
                  <span>…just kidding.</span>
                </div>
                <h3 className="text-2xl font-black text-[#111113] tracking-tight">
                  Sweeping the slop away.
                </h3>
                <p className="text-sm text-[#4A4A55] mt-2">
                  No purple gradients. No floating robot badges. No broken column cutoffs.
                </p>
              </div>
            </motion.div>
          )}

          {/* ========================================================= */}
          {/* STATE 3: With AI, Done Right (InformatiQ Design System)     */}
          {/* ========================================================= */}
          {stateIndex === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: appleEase }}
              className="flex-1 flex flex-col justify-between p-4 sm:p-5"
            >
              {/* Professional Toolbar with Filters & Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-neutral-100">
                {/* Search & Inline Filter Chips */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="relative flex items-center">
                    <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5" />
                    <input
                      type="text"
                      readOnly
                      value="Search wellbores…"
                      className="pl-8 pr-7 py-1 text-xs rounded-lg border-2 border-neutral-200 bg-neutral-50 font-mono text-neutral-400 w-44"
                    />
                    <span className="absolute right-2 text-[10px] font-mono text-neutral-400 bg-neutral-200 px-1 rounded">/</span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-blue-50 text-[#1B7ED0] border-2 border-blue-200 font-mono text-xs font-semibold">
                    <span>Field: Demo North</span>
                    <span className="text-[10px] font-bold cursor-pointer">×</span>
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 border-2 border-neutral-200 font-mono text-xs">
                    <Filter className="w-3 h-3 text-neutral-500" />
                    <span>+ Filter</span>
                  </span>
                </div>

                {/* Density Toggle & Skeleton Toggle */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowSkeleton(!showSkeleton)}
                    className="px-2.5 py-1 rounded-lg border-2 border-neutral-200 font-mono text-[11px] font-semibold text-neutral-600 hover:border-[#1B7ED0] transition-colors"
                  >
                    {showSkeleton ? 'Show Data' : 'Preview Skeleton'}
                  </button>

                  <div className="flex items-center rounded-lg border-2 border-neutral-200 p-0.5 bg-neutral-100 text-[11px] font-mono font-semibold">
                    <button
                      onClick={() => setDensity('comfortable')}
                      className={`px-2 py-0.5 rounded ${density === 'comfortable' ? 'bg-white shadow-xs text-[#111113]' : 'text-neutral-500'}`}
                    >
                      Comfortable
                    </button>
                    <button
                      onClick={() => setDensity('compact')}
                      className={`px-2 py-0.5 rounded ${density === 'compact' ? 'bg-white shadow-xs text-[#111113]' : 'text-neutral-500'}`}
                    >
                      Compact
                    </button>
                  </div>
                </div>
              </div>

              {/* Data Table */}
              <div className="flex-1 overflow-x-auto mt-2">
                {showSkeleton ? (
                  // Skeleton State (Build 3 demonstration)
                  <div className="space-y-2 py-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-9 bg-neutral-100 rounded-lg animate-pulse flex items-center px-4 justify-between">
                        <div className="w-28 h-3.5 bg-neutral-200 rounded" />
                        <div className="w-20 h-3.5 bg-neutral-200 rounded" />
                        <div className="w-16 h-3.5 bg-neutral-200 rounded" />
                        <div className="w-24 h-3.5 bg-neutral-200 rounded" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b-2 border-neutral-200 text-neutral-500 font-mono">
                        <th className="py-2 px-3 font-semibold">
                          <div className="flex items-center gap-1 cursor-pointer hover:text-[#111113]">
                            <span>Wellbore</span>
                            <ArrowUpDown className="w-3 h-3 text-neutral-400" />
                          </div>
                        </th>
                        <th className="py-2 px-3 font-semibold">Field</th>
                        <th className="py-2 px-3 font-semibold">Status</th>
                        <th className="py-2 px-3 font-semibold">Depth (TVD)</th>
                        <th className="py-2 px-3 font-semibold text-right">Telemetry</th>
                      </tr>
                    </thead>
                    <tbody>
                      {WELLBORE_DATA.map((row, idx) => (
                        <tr
                          key={row.id}
                          onMouseEnter={() => setHoveredRow(row.id)}
                          onMouseLeave={() => setHoveredRow(null)}
                          className={`border-b-2 border-neutral-100 transition-colors cursor-pointer ${
                            density === 'compact' ? 'py-1' : 'py-2.5'
                          } ${
                            idx === 0 ? 'bg-blue-50/50 ring-2 ring-[#1B7ED0] rounded' : 'hover:bg-neutral-50'
                          }`}
                        >
                          <td className="py-2 px-3 font-semibold text-[#111113] flex items-center gap-2">
                            {idx === 0 && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#1B7ED0]" />
                            )}
                            <span>{row.name}</span>
                          </td>
                          <td className="py-2 px-3 text-neutral-600 font-mono">{row.field}</td>
                          <td className="py-2 px-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold border-2 ${
                              row.status === 'Active' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                              row.status === 'Drilling' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                              'bg-neutral-100 text-neutral-700 border-neutral-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                row.status === 'Active' ? 'bg-emerald-600' :
                                row.status === 'Drilling' ? 'bg-blue-600 animate-pulse' :
                                'bg-neutral-400'
                              }`} />
                              <span>{row.status}</span>
                            </span>
                          </td>
                          <td className="py-2 px-3 font-mono font-medium text-neutral-700">{row.tvd}</td>
                          <td className="py-2 px-3 text-right">
                            <span className="font-mono text-[11px] text-neutral-500">
                              {row.temp} · {row.md} MD
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              {/* Hover Detail Preview Card (Floating) */}
              {hoveredRow && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute bottom-14 right-6 bg-white px-3.5 py-2 rounded-xl border-2 border-[#1B7ED0] shadow-lg text-xs font-mono z-30 pointer-events-none"
                >
                  <div className="font-bold text-[#111113] flex items-center gap-1.5 mb-0.5">
                    <Info className="w-3.5 h-3.5 text-[#1B7ED0]" />
                    <span>Telemetry Preview · {WELLBORE_DATA.find((r) => r.id === hoveredRow)?.name}</span>
                  </div>
                  <div className="text-[10px] text-neutral-500">
                    Formation: Sandstone · Flow Rate: 1,420 bpd · Inclination: 14.2°
                  </div>
                </motion.div>
              )}

              {/* Table Footer with Accessibility & Keyboard Indicator */}
              <div className="flex items-center justify-between pt-3 border-t-2 border-neutral-100 text-[11px] font-mono text-neutral-500">
                <div className="flex items-center gap-3 text-neutral-500 font-mono text-[11px]">
                  <span>Keyboard navigable</span>
                  <span>•</span>
                  <span>Screen reader verified</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>InformatiQ DS v4 · 100% WCAG AA</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

    </div>
  );
}
