import type { Metadata, Viewport } from 'next'
import { Inter, Manrope } from 'next/font/google'
import { DEFAULT_SEO, SITE } from '@/lib/constants'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat'
import { PageTransition } from '@/components/ui/PageTransition'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: DEFAULT_SEO.defaultTitle,
    template: DEFAULT_SEO.titleTemplate,
  },
  description: DEFAULT_SEO.description,
  keywords: [...DEFAULT_SEO.keywords],
  authors: [{ name: 'AudioVisual Nepal', url: SITE.url }],
  creator: 'AudioVisual Nepal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE.url,
    siteName: SITE.name,
    title: DEFAULT_SEO.defaultTitle,
    description: DEFAULT_SEO.description,
    images: [{ url: '/images/heroes/corporate-hero.webp', width: 1376, height: 768, alt: 'AudioVisual Nepal — professional AV solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_SEO.defaultTitle,
    description: DEFAULT_SEO.description,
    images: ['/images/heroes/corporate-hero.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
}

export const viewport: Viewport = {
  themeColor: '#3B82F6',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body
        className="font-body antialiased"
        style={{ background: 'var(--bg-base)', color: 'var(--text-primary)' }}
      >
        <Header />
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
