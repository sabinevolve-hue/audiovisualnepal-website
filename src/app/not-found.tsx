import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <main style={{ minHeight: '100vh', background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(59,130,246,0.15) 0%, transparent 70%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
        {/* 404 */}
        <div style={{
          fontFamily: 'Manrope, sans-serif',
          fontSize: 'clamp(96px, 20vw, 160px)',
          fontWeight: 800,
          letterSpacing: '-0.05em',
          lineHeight: 1,
          background: 'linear-gradient(135deg, #60a5fa, #3b82f6, #0071E3)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 24,
        }}>
          404
        </div>

        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, color: '#FFFFFF', marginBottom: 16, letterSpacing: '-0.02em' }}>
          Page Not Found
        </h1>

        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, marginBottom: 40 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Let us help you find what you need.
        </p>

        {/* Quick links */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <Link href="/" style={{ display: 'inline-block', background: '#3B82F6', color: '#FFFFFF', padding: '13px 28px', borderRadius: 980, fontSize: 15, fontWeight: 600, textDecoration: 'none' }}>
            ← Back to Home
          </Link>
          <Link href="/contact" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', padding: '13px 28px', borderRadius: 980, fontSize: 15, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.12)' }}>
            Contact Us
          </Link>
        </div>

        {/* Popular links */}
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            { label: 'Solutions', href: '/solutions' },
            { label: 'Products', href: '/products' },
            { label: 'Projects', href: '/projects' },
            { label: 'About', href: '/about' },
          ].map(link => (
            <Link key={link.href} href={link.href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.2s' }}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
