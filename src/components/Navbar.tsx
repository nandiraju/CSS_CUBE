import React from 'react';
import type { FaceId } from '../types/cube';
import { Box, Home, Zap, Info, Mail, Image, Sliders, RotateCw } from 'lucide-react';

interface NavbarProps {
  activeFace: FaceId;
  onNavigate: (face: FaceId) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
}

const NAV_ITEMS: { id: FaceId; label: string; icon: React.FC<{ size?: number }> }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'features', label: 'Features', icon: Zap },
  { id: 'about', label: 'About', icon: Info },
  { id: 'contact', label: 'Contact', icon: Mail },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'settings', label: 'Settings', icon: Sliders }
];

export const Navbar: React.FC<NavbarProps> = ({ 
  activeFace, 
  onNavigate, 
  autoRotate, 
  onToggleAutoRotate 
}) => {
  return (
    <nav className="glass-panel floating-navbar">
      {/* Brand Icon */}
      <div 
        onClick={() => onNavigate('home')} 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          cursor: 'pointer', 
          paddingRight: '12px',
          borderRight: '1px solid var(--border-color)',
          marginRight: '4px'
        }}
      >
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '8px', 
          background: 'var(--accent-primary)', 
          color: '#ffffff', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 2px 8px var(--accent-glow)'
        }}>
          <Box size={18} />
        </div>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: '800', fontSize: '1rem', color: 'var(--text-primary)', display: 'none', minWidth: '100px' }}>
          CubeSpace <span style={{ color: 'var(--accent-primary)' }}>3D</span>
        </span>
      </div>

      {/* Nav Link Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeFace === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-link ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Auto Rotate Quick Button */}
      <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '8px', marginLeft: '4px' }}>
        <button
          onClick={onToggleAutoRotate}
          title={autoRotate ? 'Disable Auto Spin' : 'Enable Auto Orbit'}
          style={{
            padding: '8px',
            borderRadius: '50%',
            border: 'none',
            background: autoRotate ? 'var(--accent-light)' : 'transparent',
            color: autoRotate ? 'var(--accent-primary)' : 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
        >
          <RotateCw size={18} className={autoRotate ? 'spin-anim' : ''} />
        </button>
      </div>
    </nav>
  );
};
