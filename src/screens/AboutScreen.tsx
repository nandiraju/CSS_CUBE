import React from 'react';
import type { FaceId, Milestone, TeamMember } from '../types/cube';
import { Compass, Users, History, ArrowRight } from 'lucide-react';

interface AboutScreenProps {
  onNavigate: (face: FaceId) => void;
}

const MILESTONES: Milestone[] = [
  {
    year: '2024',
    title: 'CSS 3D Transforms Exploration',
    description: 'Studied classic 3D web transforms by David DeSandro, creating early CSS cube prototypes.',
    status: 'completed'
  },
  {
    year: '2025',
    title: 'Full-Screen Viewport Math',
    description: 'Formulated dynamic translateZ calculations for zero-gap full screen 3D stage rotations.',
    status: 'completed'
  },
  {
    year: '2026',
    title: 'React White App Release',
    description: 'Launched full-screen React white app with glassmorphism theme tokens and multi-input HUD controls.',
    status: 'current'
  }
];

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Alex Vance',
    role: 'Lead 3D Web Architect',
    bio: 'Specialist in hardware-accelerated WebGL and CSS 3D graphics.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    skills: ['CSS 3D', 'React 19', 'GPU Shader Math']
  },
  {
    name: 'Elena Rostova',
    role: 'Principal UI/UX Designer',
    bio: 'Creator of pristine minimalist white design systems and micro-interactions.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    skills: ['Glassmorphism', 'Design Systems', 'Typography']
  },
  {
    name: 'Marcus Chen',
    role: 'Senior Frontend Engineer',
    bio: 'Focused on 60 FPS performance, touch gestures, and accessibility standards.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    skills: ['TypeScript', 'Vite', 'State Management']
  }
];

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <div className="screen-container">
      {/* Badge */}
      <div className="section-badge">
        <Compass size={16} />
        <span>Back Face — 180° Y Axis Rotation</span>
      </div>

      <h1 className="heading-lg">About CubeSpace & Our Vision</h1>
      <p className="subheading">
        We bridge classic web graphics innovations with modern React application architecture to deliver mesmerizing full-screen 3D spatial user experiences.
      </p>

      {/* Story & Mission Block */}
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>
          Inspired by David DeSandro’s 3D Transforms
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '20px' }}>
          In the early era of modern web development, David DeSandro introduced groundbreaking tutorials showcasing CSS 3D transforms: perspective, preserve-3d, and translateZ math. Our project reimagines these core CSS principles as a complete, production-ready React White SPA shell.
        </p>

        {/* Tech Stack Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['React 19', 'TypeScript', 'Pure CSS 3D', 'Vite 6', 'Lucide Icons', 'Google Fonts'].map((tech, idx) => (
            <span key={idx} style={{ 
              padding: '6px 14px', 
              background: 'var(--surface-card)', 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-full)', 
              fontSize: '0.82rem', 
              fontWeight: '600', 
              color: 'var(--text-primary)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              ⚡ {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <History size={20} color="var(--accent-primary)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            Project Milestones
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {MILESTONES.map((m, idx) => (
            <div key={idx} className="card-white" style={{ position: 'relative' }}>
              <div style={{ 
                display: 'inline-block', 
                padding: '4px 10px', 
                borderRadius: '6px', 
                background: m.status === 'current' ? 'var(--accent-primary)' : 'var(--accent-light)', 
                color: m.status === 'current' ? '#ffffff' : 'var(--accent-primary)',
                fontSize: '0.8rem',
                fontWeight: '800',
                marginBottom: '10px'
              }}>
                {m.year}
              </div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
                {m.title}
              </h3>
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Showcase */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <Users size={20} color="var(--accent-primary)" />
          <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            Meet the Team
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="card-white" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <img 
                src={member.avatar} 
                alt={member.name} 
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-light)' }} 
              />
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{member.name}</h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '6px' }}>{member.role}</div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4', marginBottom: '10px' }}>{member.bio}</p>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {member.skills.map((s, sIdx) => (
                    <span key={sIdx} style={{ fontSize: '0.72rem', padding: '2px 8px', background: 'var(--accent-light)', color: 'var(--accent-primary)', borderRadius: '4px', fontWeight: '600' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Nav */}
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-secondary" onClick={() => onNavigate('features')}>
          ← Features Face
        </button>
        <button className="btn-primary" onClick={() => onNavigate('contact')}>
          <span>Proceed to Contact</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
