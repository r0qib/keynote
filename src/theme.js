// Design tokens for the v2 deck. Sizes are design px on the 1920 × 1080 stage.

export const STAGE_WIDTH = 1920;
export const STAGE_HEIGHT = 1080;

export const SAFE_AREA = { x: 120, y: 96 };

export const colors = {
  canvas: '#F4F4F6',
  ink: '#111113',
  muted: '#4A4A55',
  blue: '#1B7ED0',
  green: '#1E9E6A',
  amber: '#D97706',
  coral: '#E5484D',
  teal: '#0E7C86',
  mascot: '#F6A6A4',
  surface: '#FFFFFF',
  line: '#E2E2E8',
};

// accent: corner dot + focal highlight. chapterCanvas: chapter card tint (null = none).
export const ACTS = {
  Opening: { label: 'Opening', accent: colors.blue, chapterCanvas: null },
  Good: { label: 'I · The Good', accent: colors.green, chapterCanvas: '#E5F4EC' },
  Poll: { label: 'Poll', accent: colors.ink, chapterCanvas: null },
  Bad: { label: 'II · The Bad', accent: colors.amber, chapterCanvas: '#F8EEDF' },
  Ugly: { label: 'III · The Ugly', accent: colors.coral, chapterCanvas: '#FAE6E6' },
  Count: { label: 'IV · Making It Count', accent: colors.teal, chapterCanvas: '#E0EFF1' },
  How: { label: 'V · How We Work', accent: colors.blue, chapterCanvas: '#E4EFF8' },
  Epilogue: { label: 'Epilogue', accent: colors.ink, chapterCanvas: null },
  Close: { label: 'Close', accent: colors.blue, chapterCanvas: null },
};

export function actAccent(act) {
  return ACTS[act]?.accent || colors.blue;
}

export function chapterCanvas(act) {
  return ACTS[act]?.chapterCanvas || colors.canvas;
}

// Type scale (design px); mirrored as Tailwind text-* tokens.
export const typeScale = {
  display: { size: 200, lineHeight: 0.95, tracking: '-0.03em', weight: 800 },
  headline: { size: 96, lineHeight: 1.04, tracking: '-0.02em', weight: 800 },
  sub: { size: 48, lineHeight: 1.15, tracking: '-0.01em', weight: 600 },
  body: { size: 36, lineHeight: 1.3, tracking: '0em', weight: 500 },
  label: { size: 28, lineHeight: 1.3, tracking: '0em', weight: 500 },
  code: { size: 30, lineHeight: 1.45, tracking: '0em', weight: 500 },
  badge: { size: 24, lineHeight: 1, tracking: '0.02em', weight: 600 },
};

export const fonts = {
  sans: '-apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, "Segoe UI", Roboto, sans-serif',
  mono: '"SF Mono", ui-monospace, Menlo, Monaco, Consolas, monospace',
};

// Resolves a manifest `canvas` (string or array indexed by buildStep) to a CSS background.
export function resolveCanvas(canvas, buildStep = 0) {
  if (Array.isArray(canvas)) {
    if (canvas.length === 0) return colors.canvas;
    return canvas[Math.min(buildStep, canvas.length - 1)] || colors.canvas;
  }
  return canvas || colors.canvas;
}
