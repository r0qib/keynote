import React from 'react';
import { motion } from 'framer-motion';

// Slide headline at the design-scale headline size. Pass motion props for the entrance.
export default function Headline({ children, as = 'h1', className = '', ...motionProps }) {
  const Tag = motion[as] || motion.h1;
  return (
    <Tag className={`text-headline text-ink ${className}`} {...motionProps}>
      {children}
    </Tag>
  );
}
