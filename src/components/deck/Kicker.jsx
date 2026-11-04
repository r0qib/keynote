import React from 'react';
import { motion } from 'framer-motion';

// Sub-headline / kicker line in the secondary colour.
export default function Kicker({ children, as = 'p', className = '', ...motionProps }) {
  const Tag = motion[as] || motion.p;
  return (
    <Tag className={`text-sub font-medium text-muted ${className}`} {...motionProps}>
      {children}
    </Tag>
  );
}
