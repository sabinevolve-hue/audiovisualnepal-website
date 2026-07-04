import type { NextConfig } from 'next'

const WP_HOST = (process.env.NEXT_PUBLIC_WP_URL || 'https://audiovisualnepal.com')
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '')

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: WP_HOST },
      { protocol: 'http',  hostname: WP_HOST },
      { protocol: 'https', hostname: 'audiovisualnepal.com' },
      { protocol: 'https', hostname: 'www.audiovisualnepal.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
      // Manufacturer CDN domains for product images
      { protocol: 'https', hostname: 'img03.71360.com' },
      { protocol: 'https', hostname: 'www.tenveo-video-conference.com' },
      { protocol: 'https', hostname: 'www.tenveocamera.com' },
      { protocol: 'https', hostname: 'www.infobitav.com' },
      { protocol: 'https', hostname: 'www.dsppatech.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}

export default nextConfig
