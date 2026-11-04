import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../theme.js';

export function ChatAvatar({ from }) {
  if (from === 'me') {
    return <span className="block rounded-full flex-shrink-0" style={{ width: 56, height: 56, backgroundColor: colors.mascot }} />;
  }
  return (
    <span className="flex items-center justify-center rounded-full flex-shrink-0 bg-ink" style={{ width: 56, height: 56 }}>
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
        <path d="M12 2 L14.2 9.8 L22 12 L14.2 14.2 L12 22 L9.8 14.2 L2 12 L9.8 9.8 Z" fill="#FFFFFF" />
      </svg>
    </span>
  );
}

// One chat turn. Human ("me") and AI turns share the same bubble; only side and avatar differ.
export default function ChatTurn({ from = 'ai', children, mono = false, className = '', style, ...motionProps }) {
  const isMe = from === 'me';
  return (
    <motion.div
      className={`flex items-start gap-[20px] ${isMe ? 'flex-row-reverse self-end' : 'self-start'} ${className}`}
      style={style}
      {...motionProps}
    >
      <ChatAvatar from={from} />
      <div
        className={`bg-surface border-2 border-line rounded-[28px] px-[36px] py-[24px] text-body text-ink ${mono ? 'font-mono' : ''}`}
        style={{ borderTopLeftRadius: isMe ? 28 : 8, borderTopRightRadius: isMe ? 8 : 28 }}
      >
        {children}
      </div>
    </motion.div>
  );
}
