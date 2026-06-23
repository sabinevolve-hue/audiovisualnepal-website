import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — Get a Free AV Consultation | AudioVisual Nepal',
  description: 'Reach our team for professional AV system design, pricing and installation across Nepal. Call +977 9762109538 or send us your project details.',
  alternates: { canonical: 'https://audiovisualnepal.com/contact' },
  openGraph: {
    title: 'Contact AudioVisual Nepal — Get a Free AV Consultation',
    description: 'Reach our team for professional AV system design, pricing and installation across Nepal. Call +977 9762109538 or send us your project details.',
    url: 'https://audiovisualnepal.com/contact',
    siteName: 'AudioVisual Nepal',
    images: [{ url: '/og-image.svg', width: 1200, height: 630, alt: 'AudioVisual Nepal' }],
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
