// Apple / Google I/O-grade keynote easing curves & spring physics
export const appleEase = [0.16, 1, 0.3, 1];
export const playfulEase = [0.34, 1.56, 0.64, 1];

export const springPhysics = {
  type: 'spring',
  stiffness: 280,
  damping: 22,
};

export const bouncierSpring = {
  type: 'spring',
  stiffness: 400,
  damping: 18,
};

// Resilient, smooth slide transitions that never leave white/blank screens
export const slideVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
    scale: 0.98,
  }),
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: appleEase,
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -40 : 40,
    scale: 0.985,
    transition: {
      duration: 0.35,
      ease: appleEase,
    },
  }),
};

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: appleEase },
  },
};

export const popIn = {
  initial: { opacity: 0, scale: 0.75 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: bouncierSpring,
  },
};

// SVG Path Drawing variant
export const drawSvg = {
  initial: { pathLength: 0, opacity: 0 },
  animate: (delay = 0) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay, duration: 1.4, ease: appleEase },
      opacity: { delay, duration: 0.3 },
    },
  }),
};

// Continuous floating aura animation
export const floatAnim = {
  animate: {
    y: [-8, 8, -8],
    rotate: [-1.5, 1.5, -1.5],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
