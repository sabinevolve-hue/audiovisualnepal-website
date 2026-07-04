'use client'

import { useState, FormEvent } from 'react'
import { SITE, PROJECT_TYPES } from '@/lib/constants'
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle } from 'lucide-react'

const darkCard = { background: '#FFFFFF', border: '1px solid rgba(11,30,61,0.1)', borderRadius: 16 }
const inputStyle = {
  width: '100%',
  background: '#FFFFFF',
  border: '1px solid rgba(11,30,61,0.1)',
  borderRadius: 12,
  padding: '14px 16px',
  fontSize: 15,
  color: '#0B1E3D',
  outline: 'none',
  boxSizing: 'border-box' as const,
}

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', projectType: '', message: '' })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setStatus(res.ok ? 'success' : 'error')
    } catch { setStatus('error') }
  }

  return (
    <main style={{ paddingTop: 80, background: '#FFFFFF' }}>
      {/* Hero */}
      <section style={{ padding: '100px 24px 80px', background: 'linear-gradient(180deg, #F0F4F8 0%, #FFFFFF 100%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(37,99,235,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.06) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
          <p style={{ fontSize: 12, fontWeight: 700, color: '#3B82F6', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 20 }}>Get In Touch</p>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(36px,5vw,60px)', fontWeight: 800, color: '#0B1E3D', letterSpacing: '-0.03em', lineHeight: 1.08, marginBottom: 20 }}>
            Let&apos;s Design Your<br />Perfect System
          </h1>
          <p style={{ fontSize: 18, color: '#64748B', lineHeight: 1.7 }}>
            Share your project details and our engineers will respond within 24 hours with a customised proposal.
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'start' }}>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#0B1E3D', marginBottom: 8 }}>Contact Details</h2>

            {[
              { href: `tel:${SITE.phoneRaw}`, icon: <Phone size={16} color="#3B82F6" />, label: 'Call us', value: SITE.phone },
              { href: `mailto:${SITE.email}`, icon: <Mail size={16} color="#3B82F6" />, label: 'Email us', value: SITE.email },
            ].map(item => (
              <a key={item.label} href={item.href} style={{ ...darkCard, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}>
                <div style={{ width: 40, height: 40, background: 'rgba(59,130,246,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#64748B', marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: '#334155' }}>{item.value}</div>
                </div>
              </a>
            ))}

            <div style={{ ...darkCard, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 40, height: 40, background: 'rgba(59,130,246,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MapPin size={16} color="#3B82F6" />
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 3 }}>Visit us</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#334155' }}>Kathmandu, Nepal</div>
              </div>
            </div>

            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" style={{ ...darkCard, padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}>
              <div style={{ width: 40, height: 40, background: 'rgba(37,211,102,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MessageCircle size={16} color="#25D366" />
              </div>
              <div>
                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 3 }}>WhatsApp</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: '#334155' }}>Chat instantly</div>
              </div>
            </a>

            <div style={{ ...darkCard, padding: '24px' }}>
              <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 700, color: '#0B1E3D', marginBottom: 16 }}>Office Hours</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#64748B' }}>Sunday – Friday</span>
                  <span style={{ color: '#334155', fontWeight: 500 }}>9:00 AM – 6:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                  <span style={{ color: '#64748B' }}>Saturday</span>
                  <span style={{ color: '#334155', fontWeight: 500 }}>10:00 AM – 4:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div style={{ ...darkCard, padding: '40px 36px' }}>
            {status === 'success' ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '48px 0' }}>
                <CheckCircle size={56} color="#3B82F6" style={{ marginBottom: 24 }} />
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 24, fontWeight: 700, color: '#0B1E3D', marginBottom: 12 }}>Message Received!</h3>
                <p style={{ color: '#64748B', maxWidth: 320 }}>Our team will review your requirements and respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Full Name <span style={{ color: '#3B82F6' }}>*</span></label>
                    <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Company</label>
                    <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Optional" style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Email <span style={{ color: '#3B82F6' }}>*</span></label>
                    <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Phone <span style={{ color: '#3B82F6' }}>*</span></label>
                    <input type="tel" required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+977 98XXXXXXXX" style={inputStyle} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Project Type <span style={{ color: '#3B82F6' }}>*</span></label>
                  <select required value={form.projectType} onChange={e => setForm({ ...form, projectType: e.target.value })} style={{ ...inputStyle, appearance: 'none' as const }}>
                    <option value="" style={{ background: '#FFFFFF' }}>Select project type</option>
                    {PROJECT_TYPES.map(t => <option key={t} value={t} style={{ background: '#FFFFFF' }}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 8 }}>Project Details <span style={{ color: '#3B82F6' }}>*</span></label>
                  <textarea required rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Describe your space, number of rooms, and what you're trying to achieve..." style={{ ...inputStyle, resize: 'none' }} />
                </div>
                {status === 'error' && <p style={{ color: '#F87171', fontSize: 14 }}>Something went wrong. Please try again or WhatsApp us directly.</p>}
                <button type="submit" disabled={status === 'loading'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#3B82F6', color: '#FFFFFF', border: 'none', borderRadius: 12, padding: '16px 32px', fontSize: 16, fontWeight: 600, cursor: 'pointer', opacity: status === 'loading' ? 0.6 : 1 }}>
                  <Send size={16} />
                  {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
