import Link from 'next/link'
import { SITE, SOLUTIONS_NAV, PRODUCT_CATEGORIES } from '@/lib/constants'
import { Phone, Mail, MapPin } from 'lucide-react'

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Projects', href: '/projects' },
  { label: 'Brands', href: '/brands' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#060D1A', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="container-site py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>

          {/* Brand + Contact */}
          <div className="lg:col-span-1">
            <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18, letterSpacing: '-0.02em', color: '#FFFFFF', textDecoration: 'none', display: 'block', marginBottom: 16 }}>
              AudioVisual<span style={{ color: '#3B82F6' }}>Nepal</span>
            </Link>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: '#475569', marginBottom: 24, maxWidth: 260 }}>
              {SITE.tagline}. Supplying, designing and installing premium AV systems across Nepal.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href={`tel:${SITE.phoneRaw}`} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#64748B', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#3B82F6' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#64748B' }}
              >
                <Phone size={14} style={{ flexShrink: 0 }} /> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#64748B', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#3B82F6' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#64748B' }}
              >
                <Mail size={14} style={{ flexShrink: 0 }} /> {SITE.email}
              </a>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 14, color: '#64748B' }}>
                <MapPin size={14} style={{ flexShrink: 0, marginTop: 2 }} /> {SITE.address}
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 20 }}>Solutions</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SOLUTIONS_NAV.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} style={{ fontSize: 14, color: '#475569', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#475569' }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 20 }}>Products</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {PRODUCT_CATEGORIES.slice(0, 8).map((c) => (
                <li key={c.href}>
                  <Link href={c.href} style={{ fontSize: 14, color: '#475569', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#475569' }}
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company + WhatsApp */}
          <div>
            <h4 style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 20 }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{ fontSize: 14, color: '#475569', textDecoration: 'none', transition: 'color 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#475569' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999, background: '#25D366', color: '#FFFFFF', fontSize: 13, fontWeight: 700, textDecoration: 'none', transition: 'all 0.2s', boxShadow: '0 2px 12px rgba(37,211,102,0.3)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 32, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <p style={{ fontSize: 13, color: '#334155' }}>© {new Date().getFullYear()} AudioVisual Nepal. All rights reserved.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            {[['Privacy Policy', '/privacy-policy'], ['Terms', '/terms'], ['Cookie Policy', '/cookie-policy'], ['Sitemap', '/sitemap.xml']].map(([label, href]) => (
              <Link key={href} href={href} style={{ fontSize: 13, color: '#334155', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#64748B' }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#334155' }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
