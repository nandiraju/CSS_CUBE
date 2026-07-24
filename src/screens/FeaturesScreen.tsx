import React, { useState } from 'react';
import type { FaceId, FeatureItem } from '../types/cube';
import { 
  Box, 
  CheckCircle2, 
  ArrowRight,
  Code
} from 'lucide-react';

interface FeaturesScreenProps {
  onNavigate: (face: FaceId) => void;
}

const FEATURES_DATA: FeatureItem[] = [
  {
    id: 'css-engine',
    title: 'CSS 3D Transforms Engine',
    description: 'Uses pure CSS `perspective`, `transform-style: preserve-3d`, and `translateZ` calculations matching David DeSandro’s classic specification.',
    icon: 'Box',
    tag: 'Core CSS',
    codeSnippet: `.scene-viewport {\n  perspective: 1400px;\n}\n.cube-stage {\n  transform-style: preserve-3d;\n  transform: translateZ(-50vw) rotateY(-90deg);\n}`
  },
  {
    id: 'hardware-accel',
    title: 'GPU Accelerated Smooth 60 FPS',
    description: 'Rotations run strictly on the GPU composite layer using CSS transitions with custom cubic-bezier curves for fluid motion.',
    icon: 'Cpu',
    tag: 'Performance',
    codeSnippet: `.cube-stage {\n  will-change: transform;\n  transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);\n}`
  },
  {
    id: 'responsive-math',
    title: 'Adaptive Full-Screen Depth',
    description: 'Dynamically scales `translateZ` relative to viewport dimensions (`50vw` & `50vh`) so the active face lands perfectly flat at `z=0`.',
    icon: 'Monitor',
    tag: 'Responsive Math',
    codeSnippet: `@media (orientation: portrait) {\n  :root {\n    --cube-depth: 0.95;\n  }\n}`
  },
  {
    id: 'multi-control',
    title: 'Multi-Input D-Pad & Keyboard',
    description: 'Navigate using top navbar links, floating on-screen HUD direction controls, or system Arrow Keys (Left, Right, Up, Down).',
    icon: 'Gamepad2',
    tag: 'Interaction',
    codeSnippet: `window.addEventListener('keydown', (e) => {\n  if (e.key === 'ArrowRight') rotateCube('right');\n});`
  },
  {
    id: 'clean-theme',
    title: 'Clean Minimalist White Aesthetics',
    description: 'Designed with subtle glassmorphic backdrop filters, curated HSL color tokens, crisp typography, and refined shadows.',
    icon: 'Sparkles',
    tag: 'UI/UX Design',
    codeSnippet: `:root {\n  --bg-app: #f8fafc;\n  --surface-glass: rgba(255, 255, 255, 0.75);\n  --border-color: rgba(226, 232, 240, 0.8);\n}`
  },
  {
    id: 'cube-customizer',
    title: 'Real-time 3D Viewport Controls',
    description: 'Tweak perspective depth, animation speed, theme variants, auto-spin speed, and face transparency in real time.',
    icon: 'SlidersHorizontal',
    tag: 'Customizer',
    codeSnippet: `<CubeSettings\n  perspective={1400}\n  transitionSpeed={0.85}\n  theme="clean-white"\n/>`
  }
];

export const FeaturesScreen: React.FC<FeaturesScreenProps> = ({ onNavigate }) => {
  const [activeFeature, setActiveFeature] = useState<FeatureItem>(FEATURES_DATA[0]);

  return (
    <div className="screen-container">
      {/* Section Badge */}
      <div className="section-badge">
        <Box size={16} />
        <span>Right Face — 90° Y Axis Rotation</span>
      </div>

      <h1 className="heading-lg">Engine Features & Architecture</h1>
      <p className="subheading">
        Explore the technical foundation powering this 3D CSS Cube full-screen application.
      </p>

      {/* Grid of Features */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {FEATURES_DATA.map((item) => {
          const isSelected = activeFeature.id === item.id;
          return (
            <div
              key={item.id}
              className="card-white"
              onClick={() => setActiveFeature(item)}
              style={{
                cursor: 'pointer',
                borderColor: isSelected ? 'var(--accent-primary)' : 'var(--border-color)',
                boxShadow: isSelected ? '0 8px 24px var(--accent-glow)' : 'var(--shadow-sm)',
                background: isSelected ? 'var(--accent-light)' : 'var(--surface-card)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <span className="section-badge" style={{ margin: 0, padding: '4px 10px', fontSize: '0.72rem' }}>
                  {item.tag}
                </span>
                {isSelected && <CheckCircle2 size={18} color="var(--accent-primary)" />}
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Live Code Snippet Preview Box */}
      <div className="glass-panel" style={{ padding: '28px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code size={20} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>
              CSS Inspector: {activeFeature.title}
            </h3>
          </div>
          <span style={{ fontSize: '0.78rem', fontWeight: '600', color: 'var(--text-muted)' }}>
            CSS Matrix Code
          </span>
        </div>

        <pre style={{ 
          background: '#0f172a', 
          color: '#e2e8f0', 
          padding: '20px', 
          borderRadius: '12px', 
          fontFamily: 'monospace', 
          fontSize: '0.85rem', 
          lineHeight: '1.6', 
          overflowX: 'auto' 
        }}>
          <code>{activeFeature.codeSnippet}</code>
        </pre>
      </div>

      {/* Navigation Footer */}
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <button className="btn-secondary" onClick={() => onNavigate('home')}>
          ← Back to Home Face
        </button>
        
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn-secondary" onClick={() => onNavigate('about')}>
            <span>View About Screen</span>
          </button>
          <button className="btn-primary" onClick={() => onNavigate('contact')}>
            <span>Next: Contact Face</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
