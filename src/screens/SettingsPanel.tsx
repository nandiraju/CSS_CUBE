/**
 * SettingsPanel — dark-themed settings screen for the bottom cube face.
 *
 * Every control here is wired to a real CubeNavigator prop (unlike the old
 * light-theme SettingsScreen, where most controls were no-ops):
 *   perspective      → CSS perspective depth
 *   transitionSpeed  → cube rotation duration
 *   depthScale       → mid-rotation zoom-out ("keynote pull-back")
 *   backdrop         → void + cube-side color during rotation
 *   autoRotate       → auto-advance through screens every 4s
 *   backfaceVisible  → show face backsides mid-spin
 */

import React from 'react';
import { Sliders, RotateCw, Eye, RotateCcw } from 'lucide-react';
import type { CubeTransitionStyle } from '../cube-framework';

// ── Settings model ────────────────────────────────────────────────────────────

export interface CubeAppSettings {
  perspective: number;        // px, 800–2400
  transitionSpeed: number;    // s, 0.3–2
  depthScale: number;         // 0.7–1, 1 = no zoom
  backdrop: string | null;    // void color; null = classic gradient fillers
  autoRotate: boolean;        // advance every AUTO_ROTATE_MS
  backfaceVisible: boolean;
  transitionStyle: CubeTransitionStyle; // cube | slide | fade
  navSpacing: number;         // px gap between navbar items, 0–16
  navItemPadding: number;     // px horizontal padding per navbar item, 8–28
}

export const DEFAULT_SETTINGS: CubeAppSettings = {
  perspective: 1200,
  transitionSpeed: 1,
  depthScale: 1,
  backdrop: '#000000',
  autoRotate: false,
  backfaceVisible: false,
  transitionStyle: 'cube',
  navSpacing: 2,
  navItemPadding: 12,
};

const STYLE_OPTIONS: { value: CubeTransitionStyle; label: string; desc: string }[] = [
  { value: 'cube',  label: 'Cube 3D', desc: '90° rotation in the void' },
  { value: 'slide', label: 'Slide',   desc: 'View Transitions API' },
  { value: 'fade',  label: 'Fade',    desc: 'View Transitions API' },
];

export const AUTO_ROTATE_MS = 4000;

const VOID_OPTIONS: { label: string; value: string | null; swatch: string }[] = [
  { label: 'Pure Black', value: '#000000', swatch: '#000000' },
  { label: 'Charcoal',   value: '#18181b', swatch: '#18181b' },
  { label: 'Deep Space', value: '#020617', swatch: '#020617' },
  { label: 'Classic',    value: null,      swatch: 'linear-gradient(135deg, #7f1d1d, #14532d, #5b21b6)' },
];

// ── Shared styles ─────────────────────────────────────────────────────────────

const ACCENT = '#67e8f9';

const cardStyle: React.CSSProperties = {
  background: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '14px',
  padding: '20px',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.9rem',
  fontWeight: 600,
  color: '#ffffff',
};

const hintStyle: React.CSSProperties = {
  fontSize: '0.78rem',
  color: 'rgba(255, 255, 255, 0.45)',
};

// ── Component ─────────────────────────────────────────────────────────────────

interface SettingsPanelProps {
  settings: CubeAppSettings;
  onUpdate: (partial: Partial<CubeAppSettings>) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onUpdate }) => {
  const slider = (
    label: string,
    hint: string,
    value: number,
    min: number,
    max: number,
    step: number,
    key: 'perspective' | 'transitionSpeed' | 'depthScale' | 'navSpacing' | 'navItemPadding',
    format: (v: number) => string,
  ) => (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <span style={labelStyle}>{label} — {format(value)}</span>
        <span style={hintStyle}>{hint}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onUpdate({ [key]: Number(e.target.value) })}
        style={{ width: '100%', accentColor: ACCENT }}
      />
    </div>
  );

  const toggle = (
    label: string,
    hint: string,
    icon: React.ReactNode,
    checked: boolean,
    key: 'autoRotate' | 'backfaceVisible',
  ) => (
    <div style={{ ...cardStyle, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ color: ACCENT, display: 'flex' }}>{icon}</span>
        <div>
          <div style={labelStyle}>{label}</div>
          <div style={hintStyle}>{hint}</div>
        </div>
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onUpdate({ [key]: e.target.checked })}
        style={{ width: '18px', height: '18px', accentColor: ACCENT, flexShrink: 0 }}
      />
    </div>
  );

  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '110px 24px 60px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '640px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#ffffff',
              margin: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Sliders size={30} color={ACCENT} />
            Settings
          </h1>
          <p style={{ ...hintStyle, fontSize: '0.95rem', marginTop: '8px', color: ACCENT }}>
            Bottom face — every control drives the cube live
          </p>
        </div>

        {/* Transition style */}
        <div style={cardStyle}>
          <div style={{ ...labelStyle, marginBottom: '12px' }}>Transition style</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
            {STYLE_OPTIONS.map((opt) => {
              const selected = settings.transitionStyle === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => onUpdate({ transitionStyle: opt.value })}
                  style={{
                    padding: '12px 10px',
                    borderRadius: '10px',
                    border: selected ? `1px solid ${ACCENT}` : '1px solid rgba(255,255,255,0.12)',
                    background: selected ? 'rgba(103, 232, 249, 0.1)' : 'rgba(255,255,255,0.03)',
                    color: selected ? '#ffffff' : 'rgba(255,255,255,0.65)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  <div>{opt.label}</div>
                  <div style={{ ...hintStyle, fontWeight: 500, marginTop: '4px' }}>{opt.desc}</div>
                </button>
              );
            })}
          </div>
          <div style={{ ...hintStyle, marginTop: '10px' }}>
            Slide &amp; Fade use document.startViewTransition — navbar stays still, only the
            screen animates. Firefox falls back to an instant swap; reduced-motion is respected.
          </div>
        </div>

        {/* Sliders */}
        {slider('Perspective', 'Focal length', settings.perspective, 800, 2400, 50, 'perspective', v => `${v}px`)}
        {slider('Rotation speed', 'Transition duration', settings.transitionSpeed, 0.3, 2, 0.05, 'transitionSpeed', v => `${v.toFixed(2)}s`)}
        {slider('Mid-spin zoom', '1.00 = off · keynote pull-back', settings.depthScale, 0.7, 1, 0.05, 'depthScale', v => `${v.toFixed(2)}×`)}
        {slider('Nav item spacing', 'Gap between navbar links', settings.navSpacing, 0, 16, 1, 'navSpacing', v => `${v}px`)}
        {slider('Nav item padding', 'Inside each navbar link', settings.navItemPadding, 8, 28, 1, 'navItemPadding', v => `${v}px`)}

        {/* Void color */}
        <div style={cardStyle}>
          <div style={{ ...labelStyle, marginBottom: '12px' }}>Rotation void</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '10px' }}>
            {VOID_OPTIONS.map((opt) => {
              const selected = settings.backdrop === opt.value;
              return (
                <button
                  key={opt.label}
                  onClick={() => onUpdate({ backdrop: opt.value })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: selected ? `1px solid ${ACCENT}` : '1px solid rgba(255,255,255,0.12)',
                    background: selected ? 'rgba(103, 232, 249, 0.1)' : 'rgba(255,255,255,0.03)',
                    color: selected ? '#ffffff' : 'rgba(255,255,255,0.65)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  <span
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: opt.swatch,
                      border: '1px solid rgba(255,255,255,0.25)',
                      flexShrink: 0,
                    }}
                  />
                  {opt.label}
                </button>
              );
            })}
          </div>
          <div style={{ ...hintStyle, marginTop: '10px' }}>
            Classic = cube sides reuse screen gradients (pre-keynote look)
          </div>
        </div>

        {/* Toggles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {toggle('Auto-orbit', `Next face every ${AUTO_ROTATE_MS / 1000}s`, <RotateCw size={18} />, settings.autoRotate, 'autoRotate')}
          {toggle('Backface visible', 'Show face backsides mid-spin', <Eye size={18} />, settings.backfaceVisible, 'backfaceVisible')}
        </div>

        {/* Reset */}
        <button
          onClick={() => onUpdate(DEFAULT_SETTINGS)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '12px 24px',
            marginTop: '8px',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.06)',
            color: '#ffffff',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={17} />
          Reset to defaults
        </button>
      </div>
    </div>
  );
};
