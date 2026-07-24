import React from 'react';
import type { FaceId } from '../types/cube';
import { 
  Box, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Zap, 
  Compass, 
  ShieldCheck, 
  Sliders, 
  Mail,
  Code2
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (face: FaceId) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate }) => {
  return (
    <div className="screen-container">
      {/* Hero Badge */}
      <div className="section-badge">
        <Sparkles size={16} />
        <span>3D CSS Transform Architecture</span>
      </div>

      {/* Hero Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'center', marginBottom: '60px' }}>
        <div>
          <h1 className="heading-xl">
            Experience Navigation in Full-Screen <span style={{ color: 'var(--accent-primary)' }}>3D Cube Space</span>
          </h1>
          <p className="subheading">
            A clean, modern React white application driven by pure CSS 3D Matrix calculations. Rotate seamlessly across 6 interactive full-screen application faces.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <button className="btn-primary" onClick={() => onNavigate('features')}>
              <span>Explore Features</span>
              <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('about')}>
              <Compass size={18} />
              <span>Learn About Us</span>
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('contact')}>
              <Mail size={18} />
              <span>Contact Us</span>
            </button>
          </div>
        </div>

        {/* Visual Interactive Preview Card */}
        <div className="glass-panel" style={{ padding: '32px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '120px', height: '120px', background: 'var(--accent-glow)', borderRadius: '50%', filter: 'blur(30px)', pointerEvents: 'none' }} />
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--accent-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box size={22} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)' }}>Cube Engine Status</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-success)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-success)' }} />
                  60 FPS Hardware Accelerated
                </span>
              </div>
            </div>
            <button className="dpad-btn" title="Customize 3D Cube" onClick={() => onNavigate('settings')}>
              <Sliders size={18} />
            </button>
          </div>

          <div style={{ background: '#0f172a', borderRadius: '12px', padding: '16px', color: '#94a3b8', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: '1.6', marginBottom: '20px', overflowX: 'auto' }}>
            <div style={{ color: '#38bdf8' }}>/* DeSandro 3D Matrix Formula */</div>
            <div>.cube-stage &#123;</div>
            <div style={{ paddingLeft: '16px' }}>transform-style: <span style={{ color: '#f43f5e' }}>preserve-3d</span>;</div>
            <div style={{ paddingLeft: '16px' }}>transform: <span style={{ color: '#a855f7' }}>translateZ(-50vw)</span></div>
            <div style={{ paddingLeft: '32px' }}><span style={{ color: '#eab308' }}>rotateY(var(--y)) rotateX(var(--x))</span>;</div>
            <div>&#125;</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <div style={{ background: 'var(--surface-card)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>FRONT FACE</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--accent-primary)' }}>Home Screen</div>
            </div>
            <div style={{ background: 'var(--surface-card)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>TOTAL FACES</div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-primary)' }}>6 Spatial Sides</div>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Counter Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '60px' }}>
        {[
          { label: '3D CSS Performance', value: '100%', sub: 'Pure GPU pipeline', icon: Zap },
          { label: 'Responsive Projection', value: 'Adaptive', sub: 'Zero gap viewport calculation', icon: Layers },
          { label: 'Nav Controls', value: 'Multi-Input', sub: 'HUD, Keyboard & Touch', icon: Compass },
          { label: 'Clean White Theme', value: 'Minimal', sub: 'Glassmorphism & Light UX', icon: ShieldCheck }
        ].map((item, idx) => (
          <div key={idx} className="card-white" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
              <item.icon size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>
                {item.value}
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>{item.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Spatial Grid Navigator */}
      <div style={{ marginTop: 'auto' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code2 size={18} color="var(--accent-primary)" />
          <span>Quick 3D Face Teleportation</span>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          {[
            { id: 'features' as FaceId, name: 'Features', dir: 'Rotate Right (+90° Y)', desc: 'Explore CSS 3D features' },
            { id: 'about' as FaceId, name: 'About Us', dir: 'Rotate Rear (180° Y)', desc: 'Company vision & team' },
            { id: 'contact' as FaceId, name: 'Contact', dir: 'Rotate Left (-90° Y)', desc: 'Send us a message' },
            { id: 'gallery' as FaceId, name: 'Gallery', dir: 'Rotate Top (+90° X)', desc: 'Visual 3D portfolio' },
            { id: 'settings' as FaceId, name: 'Settings', dir: 'Rotate Bottom (-90° X)', desc: 'Configure 3D stage' }
          ].map((face) => (
            <button
              key={face.id}
              className="card-white"
              onClick={() => onNavigate(face.id)}
              style={{
                textAlign: 'left',
                cursor: 'pointer',
                border: '1px solid var(--border-color)',
                background: 'var(--surface-card)'
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: '700', textTransform: 'uppercase' }}>
                {face.dir}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '4px' }}>
                {face.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                {face.desc}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
