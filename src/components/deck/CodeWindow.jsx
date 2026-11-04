import React from 'react';
import { motion } from 'framer-motion';

const VARIANTS = {
  editor: { body: 'bg-surface text-ink', bar: 'bg-[#F1F1F4] border-b-2 border-line', title: 'text-muted' },
  terminal: { body: 'bg-[#16171C] text-[#ECECF1]', bar: 'bg-[#22232A]', title: 'text-[#B4B4C0]' },
};

// Large editor or terminal chrome. Content is mono at the code size (30 px).
export default function CodeWindow({ variant = 'editor', title, width = 1240, children, className = '', bodyClassName = '', style, ...motionProps }) {
  const v = VARIANTS[variant] || VARIANTS.editor;
  return (
    <motion.div
      className={`rounded-[24px] overflow-hidden border-2 ${variant === 'terminal' ? 'border-[#2C2D35]' : 'border-line'} shadow-[0_24px_60px_rgba(17,17,19,0.12)] ${className}`}
      style={{ width, ...style }}
      {...motionProps}
    >
      <div className={`flex items-center gap-[12px] h-[64px] px-[28px] ${v.bar}`}>
        <span className="w-[16px] h-[16px] rounded-full bg-[#FF5F57]" />
        <span className="w-[16px] h-[16px] rounded-full bg-[#FEBC2E]" />
        <span className="w-[16px] h-[16px] rounded-full bg-[#28C840]" />
        {title && <span className={`ml-[20px] font-mono text-badge font-medium ${v.title}`}>{title}</span>}
      </div>
      <div className={`font-mono text-code whitespace-pre px-[48px] py-[40px] ${v.body} ${bodyClassName}`}>{children}</div>
    </motion.div>
  );
}
