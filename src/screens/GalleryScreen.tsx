import React, { useState } from 'react';
import type { FaceId } from '../types/cube';
import { Image, Filter, ArrowRight, Eye } from 'lucide-react';

interface GalleryScreenProps {
  onNavigate: (face: FaceId) => void;
}

interface GalleryItem {
  id: string;
  title: string;
  category: '3d-web' | 'css-matrix' | 'ui-design';
  image: string;
  likes: number;
  tags: string[];
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    title: 'Minimalist Prism Stage',
    category: '3d-web',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
    likes: 342,
    tags: ['Pure CSS', 'Glassmorphism']
  },
  {
    id: '2',
    title: 'Monochrome Spatial HUD',
    category: 'ui-design',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80',
    likes: 512,
    tags: ['Clean White', 'HUD Controls']
  },
  {
    id: '3',
    title: 'DeSandro 3D Matrix Box',
    category: 'css-matrix',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80',
    likes: 820,
    tags: ['Preserve-3D', 'TranslateZ']
  },
  {
    id: '4',
    title: 'Fluid Viewport Perspective',
    category: '3d-web',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
    likes: 289,
    tags: ['Responsive Math', 'GPU 60fps']
  },
  {
    id: '5',
    title: 'Soft Shadow Light Theme',
    category: 'ui-design',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80',
    likes: 415,
    tags: ['White App', 'Typography']
  },
  {
    id: '6',
    title: 'Interactive D-Pad Controller',
    category: 'css-matrix',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
    likes: 670,
    tags: ['Keyboard Nav', 'Touch Drag']
  }
];

export const GalleryScreen: React.FC<GalleryScreenProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const filteredItems = filter === 'all' 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <div className="screen-container">
      {/* Badge */}
      <div className="section-badge">
        <Image size={16} />
        <span>Top Face — +90° X Axis Rotation</span>
      </div>

      <h1 className="heading-lg">3D Showcase & Visual Gallery</h1>
      <p className="subheading">
        Explore visual experiments and architectural blueprints crafted with CSS 3D Transforms.
      </p>

      {/* Filter Chips */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <Filter size={18} color="var(--text-muted)" />
        {[
          { id: 'all', label: 'All Artifacts' },
          { id: '3d-web', label: '3D Web Stages' },
          { id: 'css-matrix', label: 'CSS Matrix Math' },
          { id: 'ui-design', label: 'Clean White UI' }
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              border: filter === f.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
              background: filter === f.id ? 'var(--accent-primary)' : 'var(--surface-card)',
              color: filter === f.id ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Gallery Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '40px' }}>
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="card-white"
            style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
            onClick={() => setSelectedImage(item)}
          >
            <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
              <img 
                src={item.image} 
                alt={item.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} 
              />
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'linear-gradient(to top, rgba(15,23,42,0.6) 0%, transparent 60%)', 
                display: 'flex', 
                alignItems: 'flex-end', 
                padding: '12px' 
              }}>
                <span style={{ color: '#ffffff', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Eye size={14} /> Preview Case
                </span>
              </div>
            </div>

            <div style={{ padding: '16px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {item.title}
              </h3>
              
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {item.tags.map((t, idx) => (
                  <span key={idx} style={{ fontSize: '0.72rem', padding: '3px 8px', borderRadius: '4px', background: 'var(--accent-light)', color: 'var(--accent-primary)', fontWeight: '600' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Preview Modal */}
      {selectedImage && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }} onClick={() => setSelectedImage(null)}>
          <div 
            className="glass-panel" 
            style={{ maxWidth: '600px', width: '100%', overflow: 'hidden', padding: '24px', background: 'var(--surface-card)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.image} 
              alt={selectedImage.title} 
              style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '12px', marginBottom: '16px' }} 
            />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              {selectedImage.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '20px' }}>
              This visual artifact showcases CSS 3D transform depth isolation and responsive matrix scaling.
            </p>
            <button className="btn-primary" onClick={() => setSelectedImage(null)} style={{ width: '100%' }}>
              Close Lightbox
            </button>
          </div>
        </div>
      )}

      {/* Footer Nav */}
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-secondary" onClick={() => onNavigate('home')}>
          ← Back to Home Face
        </button>
        <button className="btn-primary" onClick={() => onNavigate('settings')}>
          <span>Next: Settings Face (Bottom)</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
