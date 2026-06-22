'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, SOLUTIONS_NAV, PRODUCT_CATEGORIES, SITE } from '@/lib/constants'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'
import { ScrollProgress } from '@/components/ui/ScrollProgress'

export default function Header() {
  const [scrolled, setScrolled]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActive] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <ScrollProgress color="var(--brand)" height={2} />

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.80)',
          backdropFilter: 'saturate(180%) blur(20px)',
          WebkitBackdropFilter: 'saturate(180%) blur(20px)',
          borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
        }}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <nav className="container-site flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <Link href="/" className="font-display font-extrabold text-[18px] tracking-tight shrink-0">
            AudioVisual<span style={{ color: 'var(--brand)' }}>Nepal</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6 list-none">
            {NAV_LINKS.map((link) => (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => link.hasDropdown ? setActive(link.label) : setActive(null)}
                onMouseLeave={() => setActive(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 text-[13px] font-medium transition-colors duration-200 hover:text-[var(--text-primary)]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown
                      size={12}
                      className={`mt-0.5 transition-transform duration-200 ${activeDropdown === link.label ? 'rotate-180' : ''}`}
                    />
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
                      transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div
                        className="rounded-2xl p-4 bg-white"
                        style={{ border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg)' }}
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 px-2" style={{ color: 'var(--text-tertiary)' }}>
                          Industries We Serve
                        </p>
                        <div className="grid grid-cols-2 gap-0.5">
                          {SOLUTIONS_NAV.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              className="flex items-center gap-2.5 p-2.5 rounded-xl transition-colors duration-150 hover:bg-[var(--bg-subtle)] group"
                            >
                              <span className="text-lg">{s.icon}</span>
                              <span className="text-[13px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                                {s.label}
                              </span>
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
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[620px]"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      <div
                        className="rounded-2xl p-4 bg-white"
                        style={{ border: '1px solid var(--border-default)', boxShadow: 'var(--shadow-lg)' }}
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.1em] mb-3 px-2" style={{ color: 'var(--text-tertiary)' }}>
                          Product Categories
                        </p>
                        <div className="grid grid-cols-3 gap-0.5">
                          {PRODUCT_CATEGORIES.slice(0, 12).map((cat) => (
                            <Link
                              key={cat.href}
                              href={cat.href}
                              className="flex items-center gap-2 p-2.5 rounded-xl transition-colors duration-150 hover:bg-[var(--bg-subtle)] group"
                            >
                              <span className="text-sm">{cat.icon}</span>
                              <span className="text-[12px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                                {cat.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 px-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                          <Link href="/products" className="text-[13px] font-semibold text-[var(--text-brand)] hover:underline">
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
            <a
              href={`tel:${SITE.phoneRaw}`}
              className="flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-200 hover:text-[var(--text-primary)]"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Phone size={13} />
              {SITE.phone}
            </a>
            <Link href="/contact" className="btn-primary btn-sm">
              Get Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-primary)', background: mobileOpen ? 'var(--bg-subtle)' : 'transparent' }}
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
              style={{ background: 'rgba(255,255,255,0.97)', borderTop: '1px solid var(--border-subtle)' }}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="pt-4 space-y-0.5">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
                    <Link
                      href={link.href}
                      className="block text-[16px] font-medium py-3 transition-colors hover:text-[var(--text-brand)]"
                      style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-subtle)' }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-5 flex flex-col gap-3">
                  <a href={`tel:${SITE.phoneRaw}`} className="btn-secondary text-center">
                    {SITE.phone}
                  </a>
                  <Link href="/contact" className="btn-primary text-center" onClick={() => setMobileOpen(false)}>
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
