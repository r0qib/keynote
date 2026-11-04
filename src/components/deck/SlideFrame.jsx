import React from 'react';

// Safe-area frame: 120 px left/right, 96 px top/bottom on the design stage.
export default function SlideFrame({ children, className = '', style }) {
  return (
    <div className={`absolute inset-0 px-safe-x py-safe-y flex flex-col text-ink ${className}`} style={style}>
      {children}
    </div>
  );
}
