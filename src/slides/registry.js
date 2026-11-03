import PlaceholderSlide from './PlaceholderSlide.jsx';

/**
 * Slide Component Registry
 * 
 * Auto-discovers any implemented slides in `src/slides/` matching `S*.jsx` or legacy `Slide*.jsx`.
 * Falls back cleanly to `PlaceholderSlide` for slides that are pending implementation in subsequent batches.
 * This guarantees the presentation is 100% buildable, interactive, and navigable at any phase.
 */

// Eagerly discover all slide components matching S*.jsx and Slide*.jsx
const slideModules = import.meta.glob(['./S*.jsx', './Slide*.jsx'], { eager: true });

export const slideRegistry = {};

for (const [path, module] of Object.entries(slideModules)) {
  // Extract filename without './' and '.jsx'
  // e.g. './S01_Title.jsx' -> 'S01_Title'
  const match = path.match(/\.\/(.+)\.jsx$/);
  if (match && match[1]) {
    const componentName = match[1];
    slideRegistry[componentName] = module.default || module;
  }
}

/**
 * Retrieves the slide React component for a given componentName string.
 * If not yet implemented or not found, returns `PlaceholderSlide`.
 * 
 * @param {string} componentName - The component identifier from slideManifest
 * @returns {React.ComponentType}
 */
export function getSlideComponent(componentName) {
  if (componentName && slideRegistry[componentName]) {
    return slideRegistry[componentName];
  }
  return PlaceholderSlide;
}

export { PlaceholderSlide };
