import React from 'react';
import { motion } from 'framer-motion';
import { appleEase } from '../motion';
import { TheNumber } from '../components/deck';

export default function S28_TheNumber() {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 0.84, 1] }}
      transition={{ opacity: { duration: 7, times: [0, 0.5, 1], repeat: Infinity, ease: 'easeInOut', delay: 1.6 } }}
    >
      <TheNumber
        initial={{ opacity: 0, scale: 0.96, filter: 'blur(12px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.1, ease: appleEase, delay: 0.2 }}
      />
    </motion.div>
  );
}
