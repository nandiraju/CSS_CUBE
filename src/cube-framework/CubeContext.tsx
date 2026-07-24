/**
 * CubeNavigator Framework — React Context
 *
 * Provides navigation state to any component tree inside CubeNavigator.
 * Screens can use the `useCubeNavigate` hook instead of prop drilling.
 */

import React, { createContext, useContext } from 'react';
import type { CubeScreenContext } from './types';

// ─── Context ──────────────────────────────────────────────────────────────────

/** Internal shape — matches CubeScreenContext + setter */
interface CubeContextValue extends CubeScreenContext {
  _setActiveScreen: (id: string) => void;
}

const CubeContext = createContext<CubeContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

interface CubeProviderProps {
  value: CubeContextValue;
  children: React.ReactNode;
}

export const CubeProvider: React.FC<CubeProviderProps> = ({ value, children }) => (
  <CubeContext.Provider value={value}>{children}</CubeContext.Provider>
);

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * Use inside any component rendered within CubeNavigator to access navigation.
 *
 * @example
 * const { navigate, currentScreen, isTransitioning } = useCubeNavigate();
 * <button onClick={() => navigate('features')}>Go to Features</button>
 */
export function useCubeNavigate(): CubeScreenContext {
  const ctx = useContext(CubeContext);
  if (!ctx) {
    throw new Error('useCubeNavigate must be used inside a <CubeNavigator>');
  }
  return {
    navigate: ctx.navigate,
    currentScreen: ctx.currentScreen,
    isTransitioning: ctx.isTransitioning,
    screens: ctx.screens,
  };
}

export { CubeContext };
export type { CubeContextValue };
