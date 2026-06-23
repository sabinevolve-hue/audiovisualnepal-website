'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, SOLUTIONS_NAV, PRODUCT_CATEGORIES, SITE } from '@/lib/constants'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

// SVG icons for solution dropdown (no emoji)
const SOL_ICONS: Record<string, JSX.Element> = {
  '/solutions/corporate': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>,
  '/solutions/government': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 22h18M4 9h16M2 9l10-7 10 7"/></svg>,
  '/solutions/education': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/></svg>,
  '/solutions/hotels': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="15" rx="2"/><path d="M2 7l10-5 10 5"/></svg>,
  '/solutions/hospitals': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v8M8 12h8"/><rect x="2" y="6" width="20" height="16" rx="2"/></svg>,
  '/solutions/religious': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z"/></svg>,
  '/solutions/transportation': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72"/></svg>,
  '/solutions/smart-meeting-rooms': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 10l4.553-2.069A1 1 0 0 1 21 8.845v6.31a1 1 0 0 1-1.447.894L15 14"/><rect x="1" y="6" width="14" height="12" rx="2"/></svg>,
}

export default function Header() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ScrollProgress color="#3B82F6" height={2} />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled ? 'rgba(6,13,26,0.92)' : 'rgba(6,13,26,0.15)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="container-site flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <Link href="/" style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 18, letterSpacing: '-0.02em', color: '#FFFFFF', textDecoration: 'none', flexShrink: 0 }}>
            AudioVisual<span style={{ color: '#3B82F6' }}>Nepal</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6 list-none" style={{ margin: 0, padding: 0 }}>
            {NAV_LINKS.map((link) => (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => link.hasDropdown ? setActive(link.label) : setActive(null)}
                onMouseLeave={() => setActive(null)}
              >
                <Link
                  href={link.href}
                  style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.72)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.72)' }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown size={12} style={{ marginTop: 1, transition: 'transform 0.2s', transform: activeDropdown === link.label ? 'rotate(180deg)' : 'none' }} />
                  )}
                </Link>

                {/* Solutions Dropdown */}
                <AnimatePresence>
                  {link.label === 'Solutions' && activeDropdown === 'Solutions' && (
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[500px]"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                    >
                      <div style={{ borderRadius: 20, padding: 16, background: 'rgba(10,15,30,0.97)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.1)', backdropFilter: 'blur(20px)' }}>
                        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', marginBottom: 10, paddingLeft: 10 }}>Industries We Serve</p>
                        <div className="grid grid-cols-2 gap-0.5">
                          {SOLUTIONS_NAV.map((s) => (
                            <Link key={s.href} href={s.href} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', borderRadius: 12, textDecoration: 'none', transition: 'background 0.15s', color: '#94A3B8' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLAnchorElement).style.color = '#F1F5F9' }}
                              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8' }}
                            >
                              <span style={{ color: '#3B82F6', flexShrink: 0 }}>{SOL_ICONS[s.href]}</span>
                              <span style={{ fontSize: 13, fontWeight: 500 }}>{s.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Products Dropdown */}
                <AnimatePresence>
                  {link.label === 'Products' && activeDropdown === 'Products' && (
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[580px]"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.16 }}
                    >
                      <div style={{ borderRadius: 20, padding: 16, background: 'rgba(10,15,30,0.97)', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(59,130,246,0.1)', backdropFilter: 'blur(20px)' }}>
                        <p style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#475569', marginBottom: 10, paddingLeft: 10 }}>Product Categories</p>
                        <div className="grid grid-cols-3 gap-0.5">
                          {PRODUCT_CATEGORIES.slice(0, 12).map((cat) => (
                            <Link key={cat.href} href={cat.href} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 10px', borderRadius: 10, textDecoration: 'none', color: '#94A3B8', transition: 'background 0.15s' }}
                              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.05)'; (e.currentTarget as HTMLAnchorElement).style.color = '#F1F5F9' }}
                              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = '#94A3B8' }}
                            >
                              <span style={{ fontSize: 14 }}>{cat.icon}</span>
                              <span style={{ fontSize: 12, fontWeight: 500 }}>{cat.label}</span>
                            </Link>
                          ))}
                        </div>
                        <div style={{ marginTop: 12, paddingTop: 12, paddingLeft: 10, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          <Link href="/products" style={{ fontSize: 13, fontWeight: 600, color: '#3B82F6', textDecoration: 'none' }}>
                            View all {PRODUCT_CATEGORIES.length} categories →
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={`tel:${SITE.phoneRaw}`} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', transition: 'color 0.15s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#FFFFFF' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.65)' }}
            >
              <Phone size={13} /> {SITE.phone}
            </a>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', padding: '8px 18px', borderRadius: 999, background: '#0071E3', color: '#FFFFFF', fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: '-0.01em', transition: 'all 0.2s', boxShadow: '0 2px 12px rgba(0,113,227,0.35)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 20px rgba(0,113,227,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 2px 12px rgba(0,113,227,0.35)' }}
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            style={{ color: '#FFFFFF', background: mobileOpen ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', cursor: 'pointer' }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="lg:hidden px-6 pb-6"
              style={{ background: 'rgba(6,13,26,0.98)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="pt-4 space-y-0.5">
                {NAV_LINKS.map((link, i) => (
                  <motion.div key={link.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                    <Link
                      href={link.href}
                      style={{ display: 'block', fontSize: 16, fontWeight: 500, padding: '12px 0', color: 'rgba(255,255,255,0.75)', borderBottom: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', transition: 'color 0.15s' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div style={{ paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <a href={`tel:${SITE.phoneRaw}`} style={{ display: 'block', textAlign: 'center', padding: '12px 24px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
                    {SITE.phone}
                  </a>
                  <Link href="/contact" style={{ display: 'block', textAlign: 'center', padding: '12px 24px', borderRadius: 999, background: '#0071E3', color: '#FFFFFF', textDecoration: 'none', fontSize: 14, fontWeight: 700 }} onClick={() => setMobileOpen(false)}>
                    Request Quotation
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  )
}
