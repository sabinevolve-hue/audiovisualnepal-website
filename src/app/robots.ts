import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

const AI_AND_SEARCH_BOTS = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'GPTBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'Claude-SearchBot',
  'Google-Extended',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        // Explicitly welcome search and AI answer-engine crawlers (same scope as '*').
        userAgent: AI_AND_SEARCH_BOTS,
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
