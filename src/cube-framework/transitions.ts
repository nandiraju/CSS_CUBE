/**
 * CubeNavigator Framework — Transition Math
 *
 * All transitions are exactly 90° rotations.
 * The overlay cube always places:
 *   from-face at the "camera position" (z=0 in world space)
 *   to-face   at the adjacent slot (+90° or -90° from from-face)
 *
 * Direction for Y-axis faces follows clockwise order:
 *   front(0°) → right(90°) → back(180°) → left(270°)
 *
 * Filler faces occupy the remaining cube slots to prevent dark gaps
 * during rotation. They use background colors from assigned screens.
 */

import type { FacePosition, ActiveTransition, FillerFace, CubeScreenDef } from './types';

// ─── Constants ────────────────────────────────────────────────────────────────

// Clockwise order for Y-axis direction calculation
const Y_CW: FacePosition[] = ['front', 'right', 'back', 'left'];

// ─── Direction helpers ────────────────────────────────────────────────────────

/**
 * Returns which way the cube should rotate for a Y-axis transition.
 * Uses the shortest clockwise path. Ties (180° = 2 steps) default to 'right'.
 */
function yDirection(from: FacePosition, to: FacePosition): 'right' | 'left' {
  const fi = Y_CW.indexOf(from);
  const ti = Y_CW.indexOf(to);
  const cwSteps = ((ti - fi) + 4) % 4; // 0–3 clockwise steps
  // 1–2 steps clockwise → go right; 3 steps clockwise (= 1 counter) → go left
  return cwSteps <= 2 ? 'right' : 'left';
}

// ─── Background lookup ────────────────────────────────────────────────────────

/**
 * Returns the background for a given face position.
 * Falls back to `fallbackBg` if no screen is assigned to that face.
 */
function faceBg(
  face: FacePosition,
  screens: CubeScreenDef[],
  fallbackBg: string,
): string {
  return screens.find(s => s.face === face)?.background ?? fallbackBg;
}

// ─── Filler face builders ─────────────────────────────────────────────────────

/**
 * Returns 4 filler faces for a Y-axis right-turn transition.
 * Occupied slots: rotateY(0°) and rotateY(+90°)
 * Free slots:     rotateY(180°), rotateY(-90°), top, bottom
 */
function yRightFillers(fromBg: string, screens: CubeScreenDef[]): FillerFace[] {
  return [
    { transform: 'rotateY(180deg) translateZ(50vw)',  bg: fromBg },
    { transform: 'rotateY(-90deg) translateZ(50vw)',  bg: fromBg },
    { transform: 'rotateX(90deg)  translateZ(50vh)',  bg: faceBg('top',    screens, fromBg) },
    { transform: 'rotateX(-90deg) translateZ(50vh)',  bg: faceBg('bottom', screens, fromBg) },
  ];
}

/**
 * Returns 4 filler faces for a Y-axis left-turn transition.
 * Occupied slots: rotateY(0°) and rotateY(-90°)
 * Free slots:     rotateY(+90°), rotateY(180°), top, bottom
 */
function yLeftFillers(fromBg: string, screens: CubeScreenDef[]): FillerFace[] {
  return [
    { transform: 'rotateY(90deg)  translateZ(50vw)',  bg: fromBg },
    { transform: 'rotateY(180deg) translateZ(50vw)',  bg: fromBg },
    { transform: 'rotateX(90deg)  translateZ(50vh)',  bg: faceBg('top',    screens, fromBg) },
    { transform: 'rotateX(-90deg) translateZ(50vh)',  bg: faceBg('bottom', screens, fromBg) },
  ];
}

/**
 * Returns 4 filler faces for an X-axis transition.
 * The 3 Y-axis side faces (not occupied by from/to) use fromBg for a solid look.
 */
function xFillers(
  occupiedXFace: 'top' | 'bottom',
  fromBg: string,
  screens: CubeScreenDef[],
): FillerFace[] {
  const oppFace: FacePosition = occupiedXFace === 'top' ? 'bottom' : 'top';
  const oppTransform = occupiedXFace === 'top'
    ? 'rotateX(-90deg) translateZ(50vh)'
    : 'rotateX(90deg) translateZ(50vh)';
  return [
    { transform: oppTransform,                          bg: faceBg(oppFace, screens, fromBg) },
    { transform: 'rotateY(90deg)  translateZ(50vw)',    bg: fromBg },
    { transform: 'rotateY(-90deg) translateZ(50vw)',    bg: fromBg },
    { transform: 'rotateY(180deg) translateZ(50vw)',    bg: fromBg },
  ];
}

// ─── Main builder ─────────────────────────────────────────────────────────────

/**
 * Builds the full transition descriptor between any two registered screens.
 *
 * The transition descriptor contains:
 * - Where to place from/to faces in the 3D overlay cube
 * - Start and end cube transforms for the animation
 * - Background-only filler faces to prevent dark gaps
 */
export function buildTransition(
  fromId: string,
  toId: string,
  screens: CubeScreenDef[],
  backdrop?: string,
): ActiveTransition {
  const tx = buildTransitionFaces(fromId, toId, screens);
  // With a backdrop, every filler side of the cube is painted that color
  // (Apple-keynote look: dark cube body, only from/to faces show content).
  return backdrop
    ? { ...tx, fillerFaces: tx.fillerFaces.map(f => ({ ...f, bg: backdrop })) }
    : tx;
}

function buildTransitionFaces(
  fromId: string,
  toId: string,
  screens: CubeScreenDef[],
): ActiveTransition {
  const fromScreen = screens.find(s => s.id === fromId)!;
  const toScreen   = screens.find(s => s.id === toId)!;
  const fromFace   = fromScreen.face;
  const toFace     = toScreen.face;
  const fromBg     = fromScreen.background;

  // ── X-axis: → top ──────────────────────────────────────────────────────────
  if (toFace === 'top') {
    return {
      fromId, toId,
      fromFaceTransform:  'rotateX(0deg)  translateZ(50vh)',
      toFaceTransform:    'rotateX(90deg) translateZ(50vh)',
      cubeStartTransform: 'translateZ(-50vh) rotateX(0deg)',
      cubeEndTransform:   'translateZ(-50vh) rotateX(-90deg)',
      fillerFaces: xFillers('top', fromBg, screens),
    };
  }

  // ── X-axis: from top → any Y-face ──────────────────────────────────────────
  if (fromFace === 'top') {
    return {
      fromId, toId,
      fromFaceTransform:  'rotateX(90deg) translateZ(50vh)',
      toFaceTransform:    'rotateX(0deg)  translateZ(50vh)',
      cubeStartTransform: 'translateZ(-50vh) rotateX(-90deg)',
      cubeEndTransform:   'translateZ(-50vh) rotateX(0deg)',
      fillerFaces: xFillers('top', fromBg, screens),
    };
  }

  // ── X-axis: → bottom ───────────────────────────────────────────────────────
  if (toFace === 'bottom') {
    return {
      fromId, toId,
      fromFaceTransform:  'rotateX(0deg)   translateZ(50vh)',
      toFaceTransform:    'rotateX(-90deg) translateZ(50vh)',
      cubeStartTransform: 'translateZ(-50vh) rotateX(0deg)',
      cubeEndTransform:   'translateZ(-50vh) rotateX(90deg)',
      fillerFaces: xFillers('bottom', fromBg, screens),
    };
  }

  // ── X-axis: from bottom → any Y-face ───────────────────────────────────────
  if (fromFace === 'bottom') {
    return {
      fromId, toId,
      fromFaceTransform:  'rotateX(-90deg) translateZ(50vh)',
      toFaceTransform:    'rotateX(0deg)   translateZ(50vh)',
      cubeStartTransform: 'translateZ(-50vh) rotateX(90deg)',
      cubeEndTransform:   'translateZ(-50vh) rotateX(0deg)',
      fillerFaces: xFillers('bottom', fromBg, screens),
    };
  }

  // ── Y-axis (front ↔ right ↔ back ↔ left) ────────────────────────────────
  const dir = yDirection(fromFace, toFace);

  return dir === 'right'
    ? {
        fromId, toId,
        fromFaceTransform:  'rotateY(0deg)  translateZ(50vw)',
        toFaceTransform:    'rotateY(90deg) translateZ(50vw)',
        cubeStartTransform: 'translateZ(-50vw) rotateY(0deg)',
        cubeEndTransform:   'translateZ(-50vw) rotateY(-90deg)',
        fillerFaces: yRightFillers(fromBg, screens),
      }
    : {
        fromId, toId,
        fromFaceTransform:  'rotateY(0deg)   translateZ(50vw)',
        toFaceTransform:    'rotateY(-90deg) translateZ(50vw)',
        cubeStartTransform: 'translateZ(-50vw) rotateY(0deg)',
        cubeEndTransform:   'translateZ(-50vw) rotateY(90deg)',
        fillerFaces: yLeftFillers(fromBg, screens),
      };
}
