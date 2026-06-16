import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy — AudioVisual Nepal',
  description: 'Privacy Policy for AudioVisual Nepal. Learn how we collect, use and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <main style={{ paddingTop: 80 }}>
      <section style={{ background: '#1D1D1F', padding: '60px 24px 48px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(32px,4vw,48px)', fontWeight: 800, color: '#FFFFFF', marginBottom: 12 }}>Privacy Policy</h1>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14 }}>Last updated: June 2026</p>
      </section>

      <nav aria-label="Breadcrumb" style={{ background: '#F5F5F7', padding: '12px 24px', borderBottom: '1px solid #E8E8ED' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', fontSize: 13, color: '#6E6E73', display: 'flex', gap: 8 }}>
          <Link href="/" style={{ color: '#0071E3', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: '#1D1D1F', fontWeight: 500 }}>Privacy Policy</span>
        </div>
      </nav>

      <section style={{ padding: '64px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', fontSize: 16, lineHeight: 1.8, color: '#374151' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#1D1D1F', marginBottom: 12, marginTop: 40 }}>1. Who We Are</h2>
          <p>AudioVisual Nepal is a professional audio visual solutions provider based in Kathmandu, Nepal.</p>

          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#1D1D1F', marginBottom: 12, marginTop: 40 }}>2. Information We Collect</h2>
          <p>When you use our contact form, we collect your name, email, phone, company, and project details.</p>

          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#1D1D1F', marginBottom: 12, marginTop: 40 }}>3. How We Use Your Information</h2>
          <p>We use your information to respond to inquiries, deliver services, and improve our website.</p>

          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#1D1D1F', marginBottom: 12, marginTop: 40 }}>4. Cookies</h2>
          <p>We use essential cookies only. You can disable them in your browser settings.</p>

          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 22, fontWeight: 700, color: '#1D1D1F', marginBottom: 12, marginTop: 40 }}>5. Contact Us</h2>
          <p>Email: <a href={`mailto:${SITE.email}`} style={{ color: '#0071E3' }}>{SITE.email}</a></p>
        </div>
      </section>
    </main>
  )
}
