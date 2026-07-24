import React, { useState } from 'react';
import type { FaceId } from '../types/cube';
import { Mail, Send, CheckCircle2, MapPin, Clock, Globe, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactScreenProps {
  onNavigate: (face: FaceId) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '3D Cube Engine Inquiry',
    inquiryType: 'consulting',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitted(true);
    
    // Trigger festive confetti celebrate effect
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="screen-container">
      {/* Badge */}
      <div className="section-badge">
        <Mail size={16} />
        <span>Left Face — -90° Y Axis Rotation</span>
      </div>

      <h1 className="heading-lg">Get in Touch with Our 3D Team</h1>
      <p className="subheading">
        Have questions about CSS 3D transforms, custom cube layouts, or full-screen React implementations? Drop us a line below.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '40px' }}>
        {/* Form Container */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                background: 'var(--accent-light)', 
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                Message Received!
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '24px' }}>
                Thank you for reaching out, <strong>{formData.name}</strong>. Our team will review your inquiry and respond within 24 hours.
              </p>
              <button 
                className="btn-secondary" 
                onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '3D Cube Engine Inquiry', inquiryType: 'consulting', message: '' }); }}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px' }}>
                Send us a Direct Message
              </h2>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Your Full Name *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface-card)',
                    fontSize: '0.92rem',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <input 
                  type="email" 
                  required
                  placeholder="sarah@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface-card)',
                    fontSize: '0.92rem',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Inquiry Topic
                </label>
                <select
                  value={formData.inquiryType}
                  onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface-card)',
                    fontSize: '0.92rem',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                >
                  <option value="consulting">3D Web Architecture & Consulting</option>
                  <option value="integration">React App Integration</option>
                  <option value="custom">Custom Theme Design</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Message Details *
                </label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Tell us about your project requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--surface-card)',
                    fontSize: '0.92rem',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontFamily: 'var(--font-body)',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                <span>Send Message Now</span>
                <Send size={18} />
              </button>
            </form>
          )}
        </div>

        {/* Contact Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { icon: Mail, title: 'Email Support', detail: 'hello@cubespace.io', sub: '24/7 Developer assistance' },
            { icon: MapPin, title: 'Headquarters', detail: 'San Francisco, CA', sub: 'Silicon Valley Innovation Hub' },
            { icon: Clock, title: 'Response Time', detail: '< 2 Hours', sub: 'Average turnaround time' },
            { icon: Globe, title: 'Global Network', detail: 'Worldwide Remote', sub: 'Serving teams in 45+ countries' }
          ].map((item, idx) => (
            <div key={idx} className="card-white" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
                <item.icon size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase' }}>{item.title}</h4>
                <div style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--text-primary)', marginTop: '2px' }}>{item.detail}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Nav */}
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button className="btn-secondary" onClick={() => onNavigate('home')}>
          ← Back to Home Face
        </button>
        <button className="btn-primary" onClick={() => onNavigate('gallery')}>
          <span>Explore Gallery Face (Top)</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
