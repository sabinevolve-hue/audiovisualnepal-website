import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for AudioVisual Nepal.',
}

export default function TermsPage() {
  return (
    <main style={{ paddingTop: 80, background: '#FFFFFF' }}>
      <section style={{ background: '#F8FAFC', padding: '60px 24px 48px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 800, color: '#0B1E3D', marginBottom: 12 }}>Terms of Service</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Last updated: June 2026</p>
      </section>
      <nav aria-label="Breadcrumb" style={{ background: '#F1F5F9', padding: '12px 24px', borderBottom: '1px solid rgba(11,30,61,0.1)' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', fontSize: 13, color: '#64748B', display: 'flex', gap: 8 }}>
          <Link href="/" style={{ color: '#3B82F6', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: '#0B1E3D', fontWeight: 500 }}>Terms of Service</span>
        </div>
      </nav>
      <section style={{ padding: '64px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', fontSize: 16, lineHeight: 1.8, color: '#374151' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#0B1E3D', marginBottom: 12, marginTop: 40 }}>1. Acceptance of Terms</h2>
          <p>By accessing AudioVisual Nepal website ({SITE.url}), you agree to these Terms of Service.</p>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#0B1E3D', marginBottom: 12, marginTop: 40 }}>2. Use of the Website</h2>
          <p>You agree to use this website only for lawful purposes and must not cause damage or impair availability to other users.</p>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#0B1E3D', marginBottom: 12, marginTop: 40 }}>3. Products and Services</h2>
          <p>All products are subject to availability. Prices are indicative and confirmed through formal quotation. We reserve the right to refuse service.</p>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#0B1E3D', marginBottom: 12, marginTop: 40 }}>4. Intellectual Property</h2>
          <p>All content including text, graphics, logos, and images is property of AudioVisual Nepal. You may not reproduce content without written permission.</p>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#0B1E3D', marginBottom: 12, marginTop: 40 }}>5. Limitation of Liability</h2>
          <p>AudioVisual Nepal shall not be liable for any indirect, incidental, or consequential damages arising from use of this website or services.</p>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#0B1E3D', marginBottom: 12, marginTop: 40 }}>6. Governing Law</h2>
          <p>These terms are governed by the laws of Nepal. Disputes shall be resolved in the courts of Kathmandu, Nepal.</p>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#0B1E3D', marginBottom: 12, marginTop: 40 }}>7. Contact</h2>
          <p>Questions? Email us at <a href={`mailto:${SITE.email}`} style={{ color: '#3B82F6' }}>{SITE.email}</a></p>
        </div>
      </section>
    </main>
  )
}
