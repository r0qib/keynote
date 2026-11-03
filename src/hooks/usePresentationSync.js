import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { getActiveSlides } from '../slides/manifest.js';

const SYNC_CHANNEL_NAME = 'informatiq-slide-sync';
const STORAGE_KEY = 'informatiq-presentation-state';

/**
 * Hook for dual-window presentation synchronization
 * 
 * Supports Microsoft Teams dual-window workflow:
 * - Audience window (clean presentation on Teams screen share)
 * - Presenter window (notes, pacing, previews on private screen)
 * 
 * Synchronizes bidirectional state via native BroadcastChannel with localStorage persistence.
 */
export function usePresentationSync() {
  const activeSlides = useMemo(() => getActiveSlides(), []);
  const totalSlides = activeSlides.length;

  // Unique identifier for this tab/window to prevent echo loops
  const clientId = useMemo(() => Math.random().toString(36).substring(2, 9) + '_' + Date.now(), []);

  // Initialize state from localStorage if available
  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const s = parsed.state || parsed;
        const validSlideIndex = Math.max(0, Math.min(s.activeSlideIndex || 0, totalSlides - 1));
        const maxBuilds = activeSlides[validSlideIndex]?.totalBuilds || 0;
        return {
          activeSlideIndex: validSlideIndex,
          buildStep: Math.max(0, Math.min(s.buildStep || 0, maxBuilds)),
          direction: s.direction === -1 ? -1 : 1,
          isPaused: typeof s.isPaused === 'boolean' ? s.isPaused : true,
          timerSeconds: typeof s.timerSeconds === 'number' ? s.timerSeconds : 0,
          lastStartedAt: s.lastStartedAt || null,
        };
      }
    } catch (e) {
      console.warn('Failed to parse stored presentation state:', e);
    }
    return {
      activeSlideIndex: 0,
      buildStep: 0,
      direction: 1,
      isPaused: true,
      timerSeconds: 0,
      lastStartedAt: null,
    };
  });

  const channelRef = useRef(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  // Broadcast state updates to channel and storage
  const broadcast = useCallback((updater) => {
    setState((prev) => {
      const partial = typeof updater === 'function' ? updater(prev) : updater;
      const next = { ...prev, ...partial };

      // Prevent unnecessary broadcasts if state is identical
      if (
        prev.activeSlideIndex === next.activeSlideIndex &&
        prev.buildStep === next.buildStep &&
        prev.direction === next.direction &&
        prev.isPaused === next.isPaused &&
        prev.timerSeconds === next.timerSeconds &&
        prev.lastStartedAt === next.lastStartedAt
      ) {
        return prev;
      }

      // Broadcast to other windows/tabs
      try {
        if (channelRef.current) {
          channelRef.current.postMessage({
            type: 'SYNC_STATE',
            senderId: clientId,
            payload: next,
            timestamp: Date.now(),
          });
        }
      } catch (err) {
        console.warn('BroadcastChannel error:', err);
      }

      // Sync to localStorage
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          senderId: clientId,
          state: next,
          timestamp: Date.now(),
        }));
      } catch (err) {
        console.warn('localStorage error:', err);
      }

      return next;
    });
  }, [clientId]);

  // Set up BroadcastChannel and localStorage listeners
  useEffect(() => {
    let channel;
    try {
      channel = new BroadcastChannel(SYNC_CHANNEL_NAME);
      channelRef.current = channel;

      channel.onmessage = (event) => {
        const data = event.data;
        if (!data || data.senderId === clientId) return;

        if (data.type === 'SYNC_STATE' && data.payload) {
          const incoming = data.payload;
          setState((prev) => {
            const validIndex = Math.max(0, Math.min(incoming.activeSlideIndex ?? prev.activeSlideIndex, totalSlides - 1));
            return {
              ...prev,
              activeSlideIndex: validIndex,
              buildStep: incoming.buildStep ?? prev.buildStep,
              direction: incoming.direction ?? prev.direction,
              isPaused: incoming.isPaused ?? prev.isPaused,
              timerSeconds: incoming.timerSeconds ?? prev.timerSeconds,
              lastStartedAt: incoming.lastStartedAt ?? prev.lastStartedAt,
            };
          });
        }
      };
    } catch (e) {
      console.warn('BroadcastChannel not supported, falling back to localStorage only:', e);
    }

    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY && event.newValue) {
        try {
          const parsed = JSON.parse(event.newValue);
          if (parsed && parsed.senderId !== clientId && parsed.state) {
            const incoming = parsed.state;
            setState((prev) => {
              const validIndex = Math.max(0, Math.min(incoming.activeSlideIndex ?? prev.activeSlideIndex, totalSlides - 1));
              return {
                ...prev,
                activeSlideIndex: validIndex,
                buildStep: incoming.buildStep ?? prev.buildStep,
                direction: incoming.direction ?? prev.direction,
                isPaused: incoming.isPaused ?? prev.isPaused,
                timerSeconds: incoming.timerSeconds ?? prev.timerSeconds,
                lastStartedAt: incoming.lastStartedAt ?? prev.lastStartedAt,
              };
            });
          }
        } catch (e) {}
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      if (channel) {
        channel.close();
      }
    };
  }, [clientId, totalSlides]);

  // Smooth live timer tick calculation (wall-clock based to prevent drift)
  const [effectiveTimerSeconds, setEffectiveTimerSeconds] = useState(state.timerSeconds);

  useEffect(() => {
    const updateTick = () => {
      const current = stateRef.current;
      if (!current.isPaused && current.lastStartedAt) {
        const elapsed = Math.floor((Date.now() - current.lastStartedAt) / 1000);
        setEffectiveTimerSeconds(current.timerSeconds + elapsed);
      } else {
        setEffectiveTimerSeconds(current.timerSeconds);
      }
    };

    updateTick();
    const interval = setInterval(updateTick, 500);
    return () => clearInterval(interval);
  }, []);

  // Navigation actions
  const goToSlide = useCallback((targetIndex) => {
    const index = Math.max(0, Math.min(targetIndex, totalSlides - 1));
    broadcast((prev) => ({
      activeSlideIndex: index,
      buildStep: 0,
      direction: index >= prev.activeSlideIndex ? 1 : -1,
    }));
  }, [broadcast, totalSlides]);

  const nextBuildOrSlide = useCallback(() => {
    broadcast((prev) => {
      const currentSlide = activeSlides[prev.activeSlideIndex];
      const maxBuilds = currentSlide?.totalBuilds || 0;

      if (prev.buildStep < maxBuilds) {
        return {
          buildStep: prev.buildStep + 1,
          direction: 1,
        };
      } else if (prev.activeSlideIndex < totalSlides - 1) {
        return {
          activeSlideIndex: prev.activeSlideIndex + 1,
          buildStep: 0,
          direction: 1,
        };
      }
      return prev;
    });
  }, [broadcast, activeSlides, totalSlides]);

  const prevBuildOrSlide = useCallback(() => {
    broadcast((prev) => {
      if (prev.buildStep > 0) {
        return {
          buildStep: prev.buildStep - 1,
          direction: -1,
        };
      } else if (prev.activeSlideIndex > 0) {
        const prevIndex = prev.activeSlideIndex - 1;
        const prevSlide = activeSlides[prevIndex];
        return {
          activeSlideIndex: prevIndex,
          buildStep: prevSlide?.totalBuilds || 0,
          direction: -1,
        };
      }
      return prev;
    });
  }, [broadcast, activeSlides]);

  // Timer actions
  const startTimer = useCallback(() => {
    broadcast((prev) => {
      if (!prev.isPaused) return prev;
      return {
        isPaused: false,
        lastStartedAt: Date.now(),
      };
    });
  }, [broadcast]);

  const pauseTimer = useCallback(() => {
    broadcast((prev) => {
      if (prev.isPaused) return prev;
      const elapsed = prev.lastStartedAt ? Math.floor((Date.now() - prev.lastStartedAt) / 1000) : 0;
      return {
        isPaused: true,
        timerSeconds: prev.timerSeconds + elapsed,
        lastStartedAt: null,
      };
    });
  }, [broadcast]);

  const toggleTimer = useCallback(() => {
    if (stateRef.current.isPaused) {
      startTimer();
    } else {
      pauseTimer();
    }
  }, [startTimer, pauseTimer]);

  const resetTimer = useCallback(() => {
    broadcast({
      isPaused: true,
      timerSeconds: 0,
      lastStartedAt: null,
    });
    setEffectiveTimerSeconds(0);
  }, [broadcast]);

  const activeSlide = activeSlides[state.activeSlideIndex] || activeSlides[0];

  return {
    activeSlideIndex: state.activeSlideIndex,
    buildStep: state.buildStep,
    direction: state.direction,
    isPaused: state.isPaused,
    timerSeconds: effectiveTimerSeconds,
    activeSlide,
    activeSlides,
    totalSlides,
    goToSlide,
    nextBuildOrSlide,
    prevBuildOrSlide,
    startTimer,
    pauseTimer,
    toggleTimer,
    resetTimer,
  };
}
