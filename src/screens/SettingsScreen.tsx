import React from 'react';
import type { FaceId, CubeSettings, ThemeVariant } from '../types/cube';
import { Sliders, RotateCw, Eye, Sparkles, RotateCcw } from 'lucide-react';

interface SettingsScreenProps {
  settings: CubeSettings;
  onUpdateSettings: (newSettings: Partial<CubeSettings>) => void;
  onResetCube: () => void;
  onNavigate: (face: FaceId) => void;
}

const THEME_OPTIONS: { id: ThemeVariant; name: string; desc: string; color: string }[] = [
  { id: 'clean-white', name: 'Clean White', desc: 'Crisp minimal slate & indigo glow', color: '#4f46e5' },
  { id: 'warm-white', name: 'Warm Warmth', desc: 'Subtle cream & amber highlight', color: '#d97706' },
  { id: 'nordic-light', name: 'Nordic Mint', desc: 'Serene emerald & forest tones', color: '#059669' },
  { id: 'glass-white', name: 'Frosted Glass', desc: 'Translucent glassmorphism reflections', color: '#3b82f6' }
];

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
  settings, 
  onUpdateSettings, 
  onResetCube,
  onNavigate 
}) => {
  return (
    <div className="screen-container">
      {/* Badge */}
      <div className="section-badge">
        <Sliders size={16} />
        <span>Bottom Face — -90° X Axis Rotation</span>
      </div>

      <h1 className="heading-lg">3D Stage Customizer & Settings</h1>
      <p className="subheading">
        Fine-tune viewport perspective, 3D transform speed, theme palettes, and hardware acceleration options in real time.
      </p>

      {/* Theme Selection Grid */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="var(--accent-primary)" />
          <span>Select White Theme Variant</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {THEME_OPTIONS.map((t) => {
            const isSelected = settings.theme === t.id;
            return (
              <div
                key={t.id}
                className="card-white"
                onClick={() => onUpdateSettings({ theme: t.id })}
                style={{
                  cursor: 'pointer',
                  border: isSelected ? `2px solid ${t.color}` : '1px solid var(--border-color)',
                  background: isSelected ? 'var(--accent-light)' : 'var(--surface-card)',
                  boxShadow: isSelected ? '0 6px 18px var(--accent-glow)' : 'var(--shadow-sm)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: t.color }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{t.name}</h3>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{t.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3D Viewport Controls */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px' }}>
          3D Perspective & Motion Mechanics
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px' }}>
          {/* Perspective Depth */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                CSS Perspective ({settings.perspective}px)
              </label>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Focal Length</span>
            </div>
            <input 
              type="range" 
              min="800" 
              max="2400" 
              step="50"
              value={settings.perspective}
              onChange={(e) => onUpdateSettings({ perspective: Number(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            />
          </div>

          {/* Transition Speed */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Rotation Speed ({settings.transitionSpeed}s)
              </label>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Cubic-Bezier Duration</span>
            </div>
            <input 
              type="range" 
              min="0.3" 
              max="2.0" 
              step="0.05"
              value={settings.transitionSpeed}
              onChange={(e) => onUpdateSettings({ transitionSpeed: Number(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            />
          </div>

          {/* Depth Scale */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Cube Depth Scale ({settings.depthScale.toFixed(2)}x)
              </label>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>TranslateZ Multiplier</span>
            </div>
            <input 
              type="range" 
              min="0.7" 
              max="1.3" 
              step="0.05"
              value={settings.depthScale}
              onChange={(e) => onUpdateSettings({ depthScale: Number(e.target.value) })}
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            />
          </div>
        </div>

        {/* Toggles */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
          {/* Backface Visibility Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--surface-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Eye size={18} color="var(--accent-primary)" />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>Backface Hiding</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Hide rear face during spin</div>
              </div>
            </div>
            <input 
              type="checkbox"
              checked={settings.backfaceVisibility}
              onChange={(e) => onUpdateSettings({ backfaceVisibility: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
            />
          </div>

          {/* Auto Rotation Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--surface-card)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <RotateCw size={18} color="var(--accent-primary)" />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-primary)' }}>Auto-Orbit Spinner</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Continuous subtle turn</div>
              </div>
            </div>
            <input 
              type="checkbox"
              checked={settings.autoRotate}
              onChange={(e) => onUpdateSettings({ autoRotate: e.target.checked })}
              style={{ width: '18px', height: '18px', accentColor: 'var(--accent-primary)' }}
            />
          </div>
        </div>
      </div>

      {/* Reset Stage Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginTop: 'auto' }}>
        <button className="btn-secondary" onClick={onResetCube}>
          <RotateCcw size={18} />
          <span>Reset Cube Orientation</span>
        </button>

        <button className="btn-primary" onClick={() => onNavigate('home')}>
          Return to Home Face
        </button>
      </div>
    </div>
  );
};
