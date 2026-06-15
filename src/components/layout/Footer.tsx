import Link from 'next/link'
import { SITE, SOLUTIONS_NAV, PRODUCT_CATEGORIES } from '@/lib/constants'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white/50 border-t border-white/[0.06]">
      <div className="container-site py-16">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/[0.06]">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-display font-extrabold text-lg text-white tracking-tight block mb-4">
              AudioVisual<span className="text-[#0071E3]">Nepal</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-[260px]">
              {SITE.tagline}. Supplying, designing and installing premium AV systems across Nepal.
            </p>
            <div className="space-y-2.5">
              <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Phone size={14} /> {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 text-sm hover:text-white transition-colors">
                <Mail size={14} /> {SITE.email}
              </a>
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={14} /> {SITE.address}
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-[13px] font-semibold text-white mb-5 tracking-wide">Solutions</h4>
            <ul className="space-y-2.5">
              {SOLUTIONS_NAV.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-sm hover:text-white transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-[13px] font-semibold text-white mb-5 tracking-wide">Products</h4>
            <ul className="space-y-2.5">
              {PRODUCT_CATEGORIES.slice(0, 9).map((cat) => (
                <li key={cat.href}>
                  <Link href={cat.href} className="text-sm hover:text-white transition-colors">
                    {cat.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-sm text-[#0071E3] hover:text-blue-400 transition-colors">
                  View all →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[13px] font-semibold text-white mb-5 tracking-wide">Company</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Projects', href: '/projects' },
                { label: 'Brands',   href: '/brands' },
                { label: 'Blog',     href: '/blog' },
                { label: 'Contact',  href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social */}
            <div className="mt-6">
              <h4 className="text-[13px] font-semibold text-white mb-3 tracking-wide">Follow Us</h4>
              <div className="flex gap-3">
                {Object.entries(SITE.social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs hover:bg-[#0071E3] transition-colors capitalize"
                    title={platform}
                  >
                    {platform[0].toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs">
          <span>© {new Date().getFullYear()} AudioVisual Nepal. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms"          className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/sitemap.xml"    className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
