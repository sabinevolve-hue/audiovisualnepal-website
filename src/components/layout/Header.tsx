'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { NAV_LINKS, SOLUTIONS_NAV, PRODUCT_CATEGORIES, SITE } from '@/lib/constants'
import { Menu, X, ChevronDown, Phone } from 'lucide-react'

export default function Header() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [activeDropdown, setActive]   = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-black/[0.08] shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container-site flex items-center justify-between h-14 gap-8">
        {/* Logo */}
        <Link href="/" className="font-display font-extrabold text-[17px] tracking-tight shrink-0">
          AudioVisual<span className="text-[#0071E3]">Nepal</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-7 list-none">
          {NAV_LINKS.map((link) => (
            <li
              key={link.href}
              className="relative"
              onMouseEnter={() => link.hasDropdown ? setActive(link.label) : setActive(null)}
              onMouseLeave={() => setActive(null)}
            >
              <Link
                href={link.href}
                className="flex items-center gap-1 text-[13px] text-black/80 hover:text-black transition-colors"
              >
                {link.label}
                {link.hasDropdown && <ChevronDown size={12} className="mt-0.5" />}
              </Link>

              {/* Solutions Dropdown */}
              {link.label === 'Solutions' && activeDropdown === 'Solutions' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[520px]">
                  <div className="bg-white rounded-2xl shadow-2xl border border-black/[0.06] p-6">
                    <p className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-[0.08em] mb-4">
                      Industries We Serve
                    </p>
                    <div className="grid grid-cols-2 gap-1">
                      {SOLUTIONS_NAV.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F5F5F7] transition-colors group"
                        >
                          <span className="text-xl">{s.icon}</span>
                          <span className="text-sm font-medium text-black group-hover:text-[#0071E3] transition-colors">
                            {s.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Products Dropdown */}
              {link.label === 'Products' && activeDropdown === 'Products' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-[680px]">
                  <div className="bg-white rounded-2xl shadow-2xl border border-black/[0.06] p-6">
                    <p className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-[0.08em] mb-4">
                      Product Categories
                    </p>
                    <div className="grid grid-cols-3 gap-1">
                      {PRODUCT_CATEGORIES.slice(0, 12).map((cat) => (
                        <Link
                          key={cat.href}
                          href={cat.href}
                          className="flex items-center gap-2 p-2.5 rounded-xl hover:bg-[#F5F5F7] transition-colors group"
                        >
                          <span className="text-base">{cat.icon}</span>
                          <span className="text-[13px] font-medium text-black group-hover:text-[#0071E3] transition-colors">
                            {cat.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-black/[0.06]">
                      <Link
                        href="/products"
                        className="text-[13px] font-medium text-[#0071E3] hover:underline"
                      >
                        View all {PRODUCT_CATEGORIES.length} categories →
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${SITE.phoneRaw}`}
            className="flex items-center gap-1.5 text-[13px] text-black/70 hover:text-black transition-colors"
          >
            <Phone size={13} />
            {SITE.phone}
          </a>
          <Link
            href="/contact"
            className="btn-primary btn-sm"
          >
            Get Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-black/5 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-black/[0.08] px-6 py-6 space-y-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-base font-medium text-black hover:text-[#0071E3] py-2 border-b border-black/[0.04] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <a href={`tel:${SITE.phoneRaw}`} className="btn-secondary text-center">
              📞 {SITE.phone}
            </a>
            <Link href="/contact" className="btn-primary text-center" onClick={() => setMobileOpen(false)}>
              Request Quotation
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
