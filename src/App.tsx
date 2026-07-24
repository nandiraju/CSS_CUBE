/**
 * App.tsx — CubeNavigator consumer
 *
 * Four screens on the horizontal ring of the cube (front / right / back / left).
 * Each screen has its own dark background and a single block of text centered
 * both vertically and horizontally. Navigation happens only through the
 * built-in top navbar, whose active highlight slides with GSAP.
 */

import React, { useState } from 'react';
import { CubeNavigator } from './cube-framework';
import type { CubeScreenDef } from './cube-framework';
import { SettingsPanel, DEFAULT_SETTINGS, AUTO_ROTATE_MS } from './screens/SettingsPanel';
import type { CubeAppSettings } from './screens/SettingsPanel';
import './index.css';

// ── Centered text block shared by all four screens ───────────────────────────

interface CenteredScreenProps {
  title: string;
  subtitle: string;
  /** Accent color for the subtitle — matches the screen's palette */
  tint: string;
}

const CenteredScreen: React.FC<CenteredScreenProps> = ({ title, subtitle, tint }) => (
  <div
    style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 24px',
    }}
  >
    <h1
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(2.5rem, 7vw, 5rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
        color: '#ffffff',
        margin: 0,
      }}
    >
      {title}
    </h1>
    <p
      style={{
        marginTop: '14px',
        fontSize: 'clamp(1rem, 2vw, 1.25rem)',
        fontWeight: 500,
        color: tint,
      }}
    >
      {subtitle}
    </p>
  </div>
);

// ── Screens — one per cube face, six distinct dark palettes ──────────────────

const STATIC_SCREENS: CubeScreenDef[] = [
  {
    id: 'midnight',
    face: 'front',
    background: 'linear-gradient(145deg, #020617 0%, #1e293b 100%)',
    label: 'Midnight',
    render: () => (
      <CenteredScreen
        title="Midnight"
        subtitle="Front face — deep slate blue"
        tint="#93c5fd"
      />
    ),
  },
  {
    id: 'ember',
    face: 'right',
    background: 'linear-gradient(145deg, #1c0505 0%, #7f1d1d 100%)',
    label: 'Ember',
    render: () => (
      <CenteredScreen
        title="Ember"
        subtitle="Right face — smoldering crimson"
        tint="#fca5a5"
      />
    ),
  },
  {
    id: 'forest',
    face: 'back',
    background: 'linear-gradient(145deg, #021410 0%, #14532d 100%)',
    label: 'Forest',
    render: () => (
      <CenteredScreen
        title="Forest"
        subtitle="Back face — deep evergreen"
        tint="#86efac"
      />
    ),
  },
  {
    id: 'nebula',
    face: 'left',
    background: 'linear-gradient(145deg, #150526 0%, #5b21b6 100%)',
    label: 'Nebula',
    render: () => (
      <CenteredScreen
        title="Nebula"
        subtitle="Left face — cosmic violet"
        tint="#d8b4fe"
      />
    ),
  },
  {
    id: 'aurum',
    face: 'top',
    background: 'linear-gradient(145deg, #1c1205 0%, #92400e 100%)',
    label: 'Aurum',
    render: () => (
      <CenteredScreen
        title="Aurum"
        subtitle="Top face — molten gold"
        tint="#fcd34d"
      />
    ),
  },
];

// ── App ───────────────────────────────────────────────────────────────────────

export const App: React.FC = () => {
  const [settings, setSettings] = useState<CubeAppSettings>(DEFAULT_SETTINGS);

  const screens: CubeScreenDef[] = [
    ...STATIC_SCREENS,
    {
      id: 'settings',
      face: 'bottom',
      background: 'linear-gradient(145deg, #041418 0%, #155e75 100%)',
      label: 'Settings',
      render: () => (
        <SettingsPanel
          settings={settings}
          onUpdate={(partial) => setSettings(prev => ({ ...prev, ...partial }))}
        />
      ),
    },
  ];

  return (
    <CubeNavigator
      screens={screens}
      initialScreen="midnight"
      duration={settings.transitionSpeed}
      perspective={settings.perspective}
      showNavbar={true}
      backdrop={settings.backdrop ?? undefined}
      autoRotateMs={settings.autoRotate ? AUTO_ROTATE_MS : undefined}
      depthScale={settings.depthScale}
      backfaceVisible={settings.backfaceVisible}
      transitionStyle={settings.transitionStyle}
      navSpacing={settings.navSpacing}
      navItemPadding={settings.navItemPadding}
    />
  );
};

export default App;
