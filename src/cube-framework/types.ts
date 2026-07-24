/**
 * CubeNavigator Framework — Types
 *
 * The cube has 6 faces:
 *
 *         [top]
 * [left] [front] [right] [back]
 *        [bottom]
 *
 * Y-axis faces (front, right, back, left) rotate horizontally.
 * X-axis faces (top, bottom) rotate vertically from any Y-face.
 */

import type React from 'react';

// ─── Face positions ───────────────────────────────────────────────────────────

export type FacePosition = 'front' | 'right' | 'back' | 'left' | 'top' | 'bottom';

/**
 * How screen changes animate:
 * - 'cube'  — 3D cube rotation (the default)
 * - 'slide' — screens slide horizontally via the CSS View Transitions API
 * - 'fade'  — cross-fade via the CSS View Transitions API
 * Slide/fade fall back to an instant swap in browsers without
 * document.startViewTransition (e.g. Firefox), and respect
 * prefers-reduced-motion.
 */
export type CubeTransitionStyle = 'cube' | 'slide' | 'fade';

// ─── Screen definition ────────────────────────────────────────────────────────

export interface CubeScreenContext {
  /** Navigate to another screen by id — triggers the 3D cube transition */
  navigate: (screenId: string) => void;
  /** The currently displayed screen id */
  currentScreen: string;
  /** True while a cube transition animation is playing */
  isTransitioning: boolean;
  /** All registered screens (useful for building custom nav menus) */
  screens: CubeScreenDef[];
}

export interface CubeScreenDef {
  /** Unique screen identifier used for navigation */
  id: string;
  /**
   * Which face of the cube this screen occupies.
   * Determines the rotation direction when navigating to/from this screen.
   */
  face: FacePosition;
  /**
   * CSS background string for this screen.
   * Applied to both the flat interactive layer AND the 3D overlay face,
   * guaranteeing a seamless visual match at transition boundaries.
   * @example 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)'
   */
  background: string;
  /** Optional label shown in the built-in navbar */
  label?: string;
  /** Optional icon shown in the built-in navbar */
  icon?: React.ReactNode;
  /**
   * Render function — receives navigation context, returns screen JSX.
   * @example render: ({ navigate }) => <HomeScreen onNavigate={navigate} />
   */
  render: (ctx: CubeScreenContext) => React.ReactNode;
}

// ─── Navigator props ──────────────────────────────────────────────────────────

export interface CubeNavigatorProps {
  /** All screen definitions — each occupies one cube face (max 6) */
  screens: CubeScreenDef[];
  /** Screen id to show on first render (defaults to first screen) */
  initialScreen?: string;
  /** Transition animation duration in seconds (default: 1) */
  duration?: number;
  /** CSS perspective depth in px (default: 1200) */
  perspective?: number;
  /**
   * Show the built-in floating navbar (default: true).
   * Pass false to hide it and use your own navigation UI.
   */
  showNavbar?: boolean;
  /**
   * Color of everything that isn't a screen face during the rotation:
   * the void behind the cube AND the cube's filler sides.
   * Default: undefined — void stays transparent (flat screen shows through)
   * and filler faces reuse screen backgrounds.
   * @example '#000000' — Apple-keynote style cube against a black void
   */
  backdrop?: string;
  /**
   * Auto-advance to the next screen every N milliseconds.
   * Undefined or 0 disables auto-rotation. Ticks that land mid-transition
   * are skipped safely.
   */
  autoRotateMs?: number;
  /**
   * Mid-rotation zoom-out factor (0.7–1). The cube shrinks to this scale at
   * the 50% mark of a transition and returns to 1 — the keynote "pull back"
   * effect. 1 (default) disables the zoom.
   */
  depthScale?: number;
  /**
   * Show face backsides during rotation (default false = hidden).
   * Mostly visible when `backdrop` is unset.
   */
  backfaceVisible?: boolean;
  /** Screen-change animation (default 'cube'). See CubeTransitionStyle. */
  transitionStyle?: CubeTransitionStyle;
  /** Gap between navbar items in px (default 2). */
  navSpacing?: number;
  /**
   * Horizontal padding of each navbar item in px (default 12).
   * Vertical padding scales at half this value.
   */
  navItemPadding?: number;
}

// ─── Internal transition data (not exported — framework internal) ─────────────

export interface FillerFace {
  transform: string;
  bg: string;
}

export interface ActiveTransition {
  fromId: string;
  toId: string;
  fromFaceTransform: string;
  toFaceTransform: string;
  cubeStartTransform: string;
  cubeEndTransform: string;
  fillerFaces: FillerFace[];
}
