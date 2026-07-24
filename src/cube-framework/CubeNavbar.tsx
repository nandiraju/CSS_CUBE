/**
 * CubeNavigator Framework — Built-in Navbar
 *
 * Auto-generated from screen definitions. Shown by default; opt out with
 * showNavbar={false} on <CubeNavigator>.
 *
 * The active-link highlight is a single sliding pill animated with GSAP.
 * It glides to the clicked link immediately — it does not wait for the
 * cube transition to finish.
 *
 * Customize via the .cnav-* CSS classes in cube-framework.css.
 */

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import type { CubeScreenDef } from './types';

interface CubeNavbarProps {
  screens: CubeScreenDef[];
  activeScreenId: string;
  isTransitioning: boolean;
  onNavigate: (id: string) => void;
  /** Gap between nav items in px */
  spacing?: number;
  /** Horizontal item padding in px (vertical = half) */
  itemPadding?: number;
}

const CubeNavbar: React.FC<CubeNavbarProps> = ({
  screens,
  activeScreenId,
  isTransitioning,
  onNavigate,
  spacing = 2,
  itemPadding = 12,
}) => {
  const linksRef  = useRef<HTMLDivElement>(null);
  const pillRef   = useRef<HTMLDivElement>(null);
  // Last link the pill was sent to — kept in a ref so the ResizeObserver
  // callback never re-measures against a stale id.
  const targetRef = useRef<string>(activeScreenId);
  // Link clicked mid-transition: lets the label color follow the pill
  // immediately instead of waiting for the cube rotation to finish.
  const [pendingId, setPendingId] = useState<string | null>(null);
  const highlightedId = pendingId ?? activeScreenId;

  /** Slide the pill under the link for `id` (instant when immediate=true). */
  const movePill = useCallback((id: string, immediate = false) => {
    const links = linksRef.current;
    const pill  = pillRef.current;
    const btn   = links?.querySelector<HTMLButtonElement>(`[data-screen-id="${id}"]`);
    if (!links || !pill || !btn) return;
    targetRef.current = id;
    gsap.to(pill, {
      x: btn.offsetLeft,
      width: btn.offsetWidth,
      duration: immediate ? 0 : 0.45,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, []);

  // Initial position before first paint; re-measure when layout shifts
  // (font swap, viewport resize, active-label weight change).
  useLayoutEffect(() => {
    movePill(targetRef.current, true);
    const links = linksRef.current;
    if (!links) return;
    const ro = new ResizeObserver(() => {
      const pill = pillRef.current;
      // Mid-slide layout shift (bold active label changes button widths):
      // re-aim the tween from the pill's current position — never snap,
      // or the slide animation would be killed the moment it starts.
      if (pill && gsap.isTweening(pill)) {
        movePill(targetRef.current);
      } else {
        movePill(targetRef.current, true);
      }
    });
    ro.observe(links);
    return () => ro.disconnect();
  }, [movePill]);

  // Covers programmatic navigation (useCubeNavigate from screen content):
  // when the active screen changes without a navbar click, slide to it.
  // Also clears the pending highlight once the transition lands.
  useEffect(() => {
    if (targetRef.current !== activeScreenId) movePill(activeScreenId);
    setPendingId(null);
  }, [activeScreenId, movePill]);

  const handleClick = (id: string) => {
    if (isTransitioning || id === activeScreenId) return;
    setPendingId(id);
    movePill(id);   // slide now — don't wait for the cube rotation
    onNavigate(id);
  };

  return (
    <nav
      className="cnav"
      style={{
        '--cnav-gap': `${spacing}px`,
        '--cnav-pad-x': `${itemPadding}px`,
        '--cnav-pad-y': `${Math.round(itemPadding / 2)}px`,
      } as React.CSSProperties}
    >
      <div className="cnav-inner">
        {/* Logo slot */}
        <div className="cnav-logo">
          <span className="cnav-logo-icon">⬡</span>
        </div>

        <div className="cnav-divider" />

        {/* Screen links — one button per registered screen */}
        <div className="cnav-links" ref={linksRef}>
          {/* GSAP-driven sliding highlight */}
          <div className="cnav-pill" ref={pillRef} />

          {screens.map((screen) => {
            const isActive = screen.id === highlightedId;
            return (
              <button
                key={screen.id}
                id={`cnav-btn-${screen.id}`}
                data-screen-id={screen.id}
                className={`cnav-link${isActive ? ' cnav-link--active' : ''}`}
                onClick={() => handleClick(screen.id)}
                disabled={isTransitioning}
                aria-current={isActive ? 'page' : undefined}
                title={screen.label ?? screen.id}
              >
                {screen.icon && (
                  <span className="cnav-link-icon">{screen.icon}</span>
                )}
                {screen.label && (
                  <span className="cnav-link-label" data-label={screen.label}>{screen.label}</span>
                )}
                {!screen.icon && !screen.label && (
                  <span className="cnav-link-label" data-label={screen.id}>{screen.id}</span>
                )}
              </button>
            );
          })}
        </div>

        <div className="cnav-divider" />

        {/* Face position indicator badge */}
        <div className="cnav-badge" title="Current cube face">
          <span className="cnav-badge-face">
            {screens.find(s => s.id === activeScreenId)?.face ?? '—'}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default CubeNavbar;
