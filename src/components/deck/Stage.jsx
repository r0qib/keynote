import React, { useLayoutEffect, useRef, useState } from 'react';
import { STAGE_WIDTH, STAGE_HEIGHT } from '../../theme.js';

// Fixed 1920 × 1080 design stage, scaled uniformly to fit its positioned parent and centred.
export default function Stage({ children, className = '', style }) {
  const outerRef = useRef(null);
  const [box, setBox] = useState({ scale: 0, left: 0, top: 0 });

  useLayoutEffect(() => {
    const el = outerRef.current;
    if (!el) return undefined;
    const measure = () => {
      const { clientWidth: w, clientHeight: h } = el;
      if (!w || !h) return;
      const scale = Math.min(w / STAGE_WIDTH, h / STAGE_HEIGHT);
      setBox({
        scale,
        left: (w - STAGE_WIDTH * scale) / 2,
        top: (h - STAGE_HEIGHT * scale) / 2,
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={outerRef} className={`absolute inset-0 overflow-hidden ${className}`} style={style}>
      <div
        data-testid="slide-stage"
        className="absolute origin-top-left"
        style={{
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          left: box.left,
          top: box.top,
          transform: `scale(${box.scale})`,
          visibility: box.scale ? 'visible' : 'hidden',
        }}
      >
        {children}
      </div>
    </div>
  );
}
