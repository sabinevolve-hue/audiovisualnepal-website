import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * On-demand ISR revalidation — called by WordPress on save so edits appear instantly.
 * Configure a webhook (e.g. WP Webhooks plugin) to:
 *   POST https://audiovisualnepal.com/api/revalidate?secret=<REVALIDATE_SECRET>&path=/blog
 * Multiple paths: comma-separated. Without ?path, common content roots refresh.
 */
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 })
  }
  const param = req.nextUrl.searchParams.get('path')
  const paths = param
    ? param.split(',').map((p) => p.trim()).filter((p) => p.startsWith('/'))
    : ['/', '/blog', '/projects', '/products', '/brands']
  for (const p of paths) revalidatePath(p, 'layout')
  return NextResponse.json({ ok: true, revalidated: paths, at: new Date().toISOString() })
}

export async function GET(req: NextRequest) {
  return POST(req)
}
