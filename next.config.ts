import type { NextConfig } from 'next'

const WP_HOST = (process.env.NEXT_PUBLIC_WP_URL || 'https://audiovisualnepal.com')
  .replace(/^https?:\/\//, '')
  .replace(/\/$/, '')

const nextConfig: NextConfig = {
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Served from Cloudflare Workers: images are delivered as-is (no Vercel optimizer).
    // Nearly all are already small WebP files.
    unoptimized: true,
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
        // Partner-site import feed (evolvetech.com.np WooCommerce) — read-only JSON
        source: '/feeds/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://evolvetech.com.np' },
          { key: 'Cache-Control', value: 'public, max-age=300' },
        ],
      },
      {
        // Moved from vercel.json when the site moved to Cloudflare Workers (Nov 2026).
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; media-src 'self'; connect-src 'self' https: https://www.google-analytics.com https://analytics.google.com https://*.analytics.google.com https://www.googletagmanager.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self' https://wa.me",
          },
        ],
      },
      {
        source: '/(.*)\\.(jpg|jpeg|png|webp|avif|gif|ico|svg)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default nextConfig
