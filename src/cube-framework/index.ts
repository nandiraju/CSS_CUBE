/**
 * CubeNavigator Framework — Public API
 *
 * Everything a consuming app needs:
 *
 * @example
 * import { CubeNavigator, useCubeNavigate } from './cube-framework';
 * import type { CubeScreenDef, FacePosition } from './cube-framework';
 */

// Main component
export { default as CubeNavigator } from './CubeNavigator';

// Hook for screens to navigate without prop drilling
export { useCubeNavigate } from './CubeContext';

// Types
export type {
  FacePosition,
  CubeScreenDef,
  CubeScreenContext,
  CubeNavigatorProps,
  CubeTransitionStyle,
} from './types';
