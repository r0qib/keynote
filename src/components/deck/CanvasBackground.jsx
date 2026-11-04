import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { canvasTransition } from '../../motion.js';

// Full-bleed slide background. A new canvas fades in over the previous one (works for gradients too).
export default function CanvasBackground({ canvas }) {
  const [layers, setLayers] = useState({ under: canvas, over: canvas });
  if (layers.over !== canvas) setLayers({ under: layers.over, over: canvas });

  return (
    <>
      <div className="absolute inset-0" style={{ background: layers.under }} />
      <motion.div
        key={layers.over}
        className="absolute inset-0"
        style={{ background: layers.over }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={canvasTransition}
      />
    </>
  );
}
