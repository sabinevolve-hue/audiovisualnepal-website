import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Cookie Policy — AudioVisual Nepal',
  description: 'Cookie Policy for AudioVisual Nepal website.',
}

export default function CookiePolicyPage() {
  return (
    <main style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg-base)' }}>
      <div className="container-site px-6 py-16 max-w-3xl">
        <h1 className="text-[40px] font-black text-white mb-4">Cookie Policy</h1>
        <p className="text-[14px] mb-12" style={{ color: 'var(--text-tertiary)' }}>Last updated: June 2026</p>

        {[
          { title: 'What Are Cookies', body: 'Cookies are small text files placed on your device when you visit our website. They help us provide a better experience by remembering your preferences and understanding how you use our site.' },
          { title: 'Cookies We Use', body: 'We use essential cookies required for the site to function (such as session cookies), and optional analytics cookies to understand traffic patterns. We do not use advertising or tracking cookies.' },
          { title: 'Analytics', body: 'If you consent, we may use Google Analytics to collect anonymised data about page views, session duration, and referral sources. This data cannot identify you personally.' },
          { title: 'Managing Cookies', body: 'You can control and delete cookies through your browser settings. Note that disabling essential cookies may affect how the website functions.' },
          { title: 'Contact', body: `For questions about our cookie use, contact us at ${SITE.email} or call ${SITE.phone}.` },
        ].map(({ title, body }) => (
          <div key={title} className="mb-10">
            <h2 className="text-[20px] font-bold text-white mb-3">{title}</h2>
            <p className="text-[16px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{body}</p>
          </div>
        ))}

        <div className="flex gap-4 mt-12">
          <Link href="/privacy-policy" className="text-[14px] transition-colors hover:text-white" style={{ color: 'var(--text-brand)' }}>Privacy Policy</Link>
          <Link href="/terms" className="text-[14px] transition-colors hover:text-white" style={{ color: 'var(--text-brand)' }}>Terms of Service</Link>
        </div>
      </div>
    </main>
  )
}
