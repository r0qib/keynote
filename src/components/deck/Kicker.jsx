import React from 'react';
import { motion } from 'framer-motion';

const VARIANTS = {
  kicker: 'text-sub font-medium text-muted',
  // Parenthetical aside, 16 px under the line it qualifies.
  aside: 'mt-[16px] text-[40px] leading-[1.25] font-medium text-muted',
};

// Sub-headline / kicker line in the secondary colour. `variant="aside"` for parenthetical asides.
export default function Kicker({ children, as = 'p', variant = 'kicker', className = '', ...motionProps }) {
  const Tag = motion[as] || motion.p;
  return (
    <Tag className={`${VARIANTS[variant] || VARIANTS.kicker} ${className}`} {...motionProps}>
      {children}
    </Tag>
  );
}
