import type { NextConfig } from 'next'

const WP_HOST = (process.env.NEXT_PUBLIC_WP_URL || 'https://audiovisualnepal.com')
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: WP_HOST },
      { protocol: 'http',  hostname: WP_HOST },
      { protocol: 'https', hostname: 'audiovisualnepal.com' },
      { protocol: 'https', hostname: 'www.audiovisualnepal.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'secure.gravatar.com' },
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
