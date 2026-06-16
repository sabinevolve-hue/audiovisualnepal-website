'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem('avn_cookie_consent')) setVisible(true)
    } catch {}
  }, [])

  const accept = () => {
    try { localStorage.setItem('avn_cookie_consent', '1') } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div role="dialog" aria-label="Cookie consent" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, background: '#1D1D1F', color: '#fff', borderRadius: 16, padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 20, boxShadow: '0 8px 40px rgba(0,0,0,0.3)', maxWidth: 680, width: 'calc(100% - 32px)', flexWrap: 'wrap' }}>
      <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0, flex: 1, minWidth: 200 }}>
        We use cookies to improve your experience.{' '}
        <Link href="/privacy-policy" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Privacy Policy</Link>
      </p>
      <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
        <button onClick={() => setVisible(false)} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', borderRadius: 980, padding: '8px 18px', fontSize: 13, cursor: 'pointer' }}>Decline</button>
        <button onClick={accept} style={{ background: '#0071E3', border: 'none', color: '#fff', borderRadius: 980, padding: '8px 18px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Accept</button>
      </div>
    </div>
  )
}
