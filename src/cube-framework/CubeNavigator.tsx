/**
 * CubeNavigator Framework — Main Component
 *
 * Drop-in 3D cube navigation shell. Accepts screen definitions and
 * handles all state, transitions, and rendering.
 *
 * @example
 * <CubeNavigator
 *   screens={[
 *     {
 *       id: 'home',
 *       face: 'front',
 *       background: 'linear-gradient(145deg, #fff 0%, #f1f5f9 100%)',
 *       label: 'Home',
 *       render: ({ navigate }) => <HomeScreen onNavigate={navigate} />,
 *     },
 *     // Add up to 5 more screens — one per face
 *   ]}
 *   initialScreen="home"
 *   duration={1}
 *   perspective={1200}
 * />
 */

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { flushSync } from 'react-dom';
import type { CubeNavigatorProps, ActiveTransition, CubeScreenContext } from './types';
import { buildTransition } from './transitions';
import CubeOverlay from './CubeOverlay';
import CubeNavbar from './CubeNavbar';
import { CubeProvider } from './CubeContext';
import './cube-framework.css';

const CubeNavigator: React.FC<CubeNavigatorProps> = ({
  screens,
  initialScreen,
  duration = 1,
  perspective = 1200,
  showNavbar = true,
  backdrop,
  autoRotateMs,
  depthScale = 1,
  backfaceVisible = false,
  transitionStyle = 'cube',
  navSpacing = 2,
  navItemPadding = 12,
}) => {
  // Default to first screen if initialScreen not specified
  const firstId = initialScreen ?? screens[0]?.id ?? '';

  const [activeId, setActiveId]         = useState<string>(firstId);
  const [transition, setTransition]     = useState<ActiveTransition | null>(null);
  // True while a CSS View Transition (slide/fade style) is running
  const [vtActive, setVtActive]         = useState(false);
  const isTransitioning = transition !== null || vtActive;


  // Separated so we can reference it without stale closure
  const handleNavigate = useCallback((toId: string) => {
    if (toId === activeId || isTransitioning) return;

    // ── slide / fade: same-document CSS View Transition ─────────────────────
    // The flat screen swaps synchronously inside startViewTransition; the
    // browser animates between the old/new snapshots using the
    // ::view-transition-* rules in cube-framework.css. The navbar has its own
    // view-transition-name, so it stays still while the screen animates.
    if (transitionStyle !== 'cube') {
      if (typeof document.startViewTransition !== 'function') {
        setActiveId(toId); // progressive enhancement: unsupported → instant swap
        return;
      }
      const root = document.documentElement;
      const fromIdx = screens.findIndex(s => s.id === activeId);
      const toIdx   = screens.findIndex(s => s.id === toId);
      root.dataset.cnavVt    = transitionStyle;
      root.dataset.cnavVtDir = toIdx >= fromIdx ? 'forward' : 'back';
      root.style.setProperty('--cnav-vt-duration', `${duration}s`);
      setVtActive(true);
      const vt = document.startViewTransition(() => {
        flushSync(() => setActiveId(toId));
      });
      vt.finished.finally(() => {
        delete root.dataset.cnavVt;
        delete root.dataset.cnavVtDir;
        setVtActive(false);
      });
      return;
    }

    // ── cube: 3D overlay rotation ────────────────────────────────────────────
    const tx = buildTransition(activeId, toId, screens, backdrop);
    setTransition(tx);
  }, [activeId, isTransitioning, screens, backdrop, transitionStyle, duration]);

  const handleTransitionComplete = useCallback(() => {
    if (!transition) return;
    setActiveId(transition.toId);
    setTransition(null);
  }, [transition]);

  // ── Auto-rotate ─────────────────────────────────────────────────────────────
  // Advances to the next registered screen on an interval. handleNavigate
  // already ignores ticks that land mid-transition.
  useEffect(() => {
    if (!autoRotateMs || autoRotateMs <= 0) return;
    const timer = setInterval(() => {
      const idx = screens.findIndex(s => s.id === activeId);
      const next = screens[(idx + 1) % screens.length];
      if (next) handleNavigate(next.id);
    }, autoRotateMs);
    return () => clearInterval(timer);
  }, [autoRotateMs, screens, activeId, handleNavigate]);

  // ── Context value ───────────────────────────────────────────────────────────
  const ctxValue = useMemo<CubeScreenContext & { _setActiveScreen: (id: string) => void }>(() => ({
    navigate: handleNavigate,
    currentScreen: activeId,
    isTransitioning,
    screens,
    _setActiveScreen: setActiveId,
  }), [handleNavigate, activeId, isTransitioning, screens]);

  // ── Render helpers ──────────────────────────────────────────────────────────

  /** Renders a screen's content with full navigation context */
  const renderScreen = useCallback((screenId: string) => {
    const screen = screens.find(s => s.id === screenId);
    if (!screen) return null;
    const ctx: CubeScreenContext = {
      navigate: handleNavigate,
      currentScreen: activeId,
      isTransitioning,
      screens,
    };
    return screen.render(ctx);
  }, [screens, handleNavigate, activeId, isTransitioning]);

  const activeScreen = screens.find(s => s.id === activeId);
  const fromScreen   = transition ? screens.find(s => s.id === transition.fromId) : null;
  const toScreen     = transition ? screens.find(s => s.id === transition.toId)   : null;

  return (
    <CubeProvider value={ctxValue}>
      <div className="cnav-root">
        {/* Built-in navbar */}
        {showNavbar && (
          <CubeNavbar
            screens={screens}
            activeScreenId={activeId}
            isTransitioning={isTransitioning}
            onNavigate={handleNavigate}
            spacing={navSpacing}
            itemPadding={navItemPadding}
          />
        )}

        {/* ── Flat interactive screen ─────────────────────────────────────── */}
        {/* Always present and always interactive. Hidden visually under the   */}
        {/* overlay during transition but never unmounted.                      */}
        <div
          className="cnav-screen"
          style={{ background: activeScreen?.background }}
        >
          {renderScreen(activeId)}
        </div>

        {/* ── 3D overlay ─────────────────────────────────────────────────── */}
        {/* Mounted only during a transition. pointer-events:none.             */}
        {transition && fromScreen && toScreen && (
          <CubeOverlay
            key={`${transition.fromId}→${transition.toId}`}
            transition={transition}
            duration={duration}
            perspective={perspective}
            backdrop={backdrop}
            depthScale={depthScale}
            backfaceVisible={backfaceVisible}
            fromBg={fromScreen.background}
            toBg={toScreen.background}
            renderContent={renderScreen}
            onComplete={handleTransitionComplete}
          />
        )}
      </div>
    </CubeProvider>
  );
};

export default CubeNavigator;
