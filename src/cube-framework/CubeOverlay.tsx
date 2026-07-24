/**
 * CubeNavigator Framework — 3D Overlay Component
 *
 * Renders a full-screen preserve-3d container that animates the cube rotation.
 * Sits on top of the flat interactive screen during transitions only.
 * pointer-events: none — the flat screen underneath remains fully interactive.
 */

import React, { useRef, useLayoutEffect } from 'react';
import type { ActiveTransition } from './types';

interface CubeOverlayProps {
  transition: ActiveTransition;
  duration: number;       // seconds
  perspective: number;    // px
  /** Render the screen content inside the from/to face divs */
  renderContent: (screenId: string) => React.ReactNode;
  /** Background for from-face (must match the flat screen below) */
  fromBg: string;
  /** Background for to-face */
  toBg: string;
  /** Void color behind the cube during rotation (default transparent) */
  backdrop?: string;
  /** Mid-rotation zoom-out scale, 1 = off (see CubeNavigatorProps.depthScale) */
  depthScale?: number;
  /** Show face backsides during rotation (default false) */
  backfaceVisible?: boolean;
  onComplete: () => void;
}

const CubeOverlay: React.FC<CubeOverlayProps> = ({
  transition,
  duration,
  perspective,
  renderContent,
  fromBg,
  toBg,
  backdrop,
  depthScale = 1,
  backfaceVisible = false,
  onComplete,
}) => {
  const innerRef = useRef<HTMLDivElement>(null);

  // Apply animation: set start transform synchronously, then trigger end transform
  // on the next animation frame so the browser paints the start state first.
  useLayoutEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    el.style.transition = 'none';
    el.style.transform = transition.cubeStartTransform;
    void el.getBoundingClientRect(); // force reflow — critical for animation to work

    requestAnimationFrame(() => {
      el.style.transition = `transform ${duration}s linear`;
      el.style.transform = transition.cubeEndTransform;
    });
  }, []); // run once on mount

  // ── Face style helper ────────────────────────────────────────────────────────
  const face = (transform: string, bg: string, interactive = false): React.CSSProperties => ({
    position: 'absolute',
    inset: 0,
    transform,
    background: bg,
    overflow: 'hidden',
    backfaceVisibility: backfaceVisible ? 'visible' : 'hidden',
    WebkitBackfaceVisibility: backfaceVisible ? 'visible' : 'hidden',
    pointerEvents: interactive ? 'auto' : 'none',
  });

  // Keynote "pull back": zoom the whole projected scene out to depthScale at
  // the 50% mark and back — driven by the cnav-zoom keyframes in the CSS.
  const zoomActive = depthScale < 0.999;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        perspective: `${perspective}px`,
        perspectiveOrigin: '50% 50%',
        pointerEvents: 'none',
        zIndex: 100,
        background: backdrop,
        ...(zoomActive
          ? ({
              '--cnav-zoom': String(depthScale),
              animation: `cnav-zoom ${duration}s ease-in-out both`,
            } as React.CSSProperties)
          : null),
      }}
    >
      <div
        ref={innerRef}
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
        onTransitionEnd={(e) => {
          if (e.target === innerRef.current) onComplete();
        }}
      >
        {/* From face — with content so the start looks pixel-identical to the flat screen */}
        <div style={face(transition.fromFaceTransform, fromBg)}>
          {renderContent(transition.fromId)}
        </div>

        {/* To face — with content so the end looks pixel-identical to the flat screen */}
        <div style={face(transition.toFaceTransform, toBg)}>
          {renderContent(transition.toId)}
        </div>

        {/* Filler faces — background only, prevent dark gap showing through cube edges */}
        {transition.fillerFaces.map((f, i) => (
          <div key={i} style={face(f.transform, f.bg)} />
        ))}
      </div>
    </div>
  );
};

export default CubeOverlay;
