// Apple / Google I/O-grade keynote easing curves & spring physics
export const appleEase = [0.16, 1, 0.3, 1];
export const playfulEase = [0.34, 1.56, 0.64, 1];

// Resilient spring configs that also act as safe callable fallbacks if passed directly to ease
function createSpringConfig(config) {
  const fn = function(t) { return t; };
  return Object.assign(fn, config);
}

export const springPhysics = createSpringConfig({
  type: 'spring',
  stiffness: 280,
  damping: 22,
});

export const bouncierSpring = createSpringConfig({
  type: 'spring',
  stiffness: 400,
  damping: 18,
});

// Resilient, smooth slide transitions that never leave white/blank screens
export const slideVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 24 : -24,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: appleEase,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.05,
    },
  },
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

// Deck shell: slide change (≤ 500 ms) and canvas colour cross-fade (≤ 400 ms).
export const slideTransition = { duration: 0.45, ease: appleEase };
export const canvasTransition = { duration: 0.4, ease: appleEase };

export const gentleSpring = { type: 'spring', stiffness: 280, damping: 22 };

// Mascot presets (ambient loops; use only where the spec allows).
export const mascotPresets = {
  none: {},
  bob: {
    animate: { y: [0, -14, 0] },
    transition: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
  },
  blink: {
    animate: { scaleY: [1, 1, 0.9, 1, 1] },
    transition: { duration: 4, times: [0, 0.46, 0.5, 0.54, 1], repeat: Infinity, ease: 'easeInOut' },
  },
  wave: {
    animate: { rotate: [0, 8, -6, 8, 0] },
    transition: { duration: 1.8, repeat: Infinity, repeatDelay: 0.6, ease: 'easeInOut' },
  },
};

// Typing indicator: dots rise in sequence, slowly.
export const typingDot = (i, lift = 8) => ({
  animate: { y: [0, -lift, 0], opacity: [0.35, 1, 0.35] },
  transition: { duration: 1.4, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' },
});
