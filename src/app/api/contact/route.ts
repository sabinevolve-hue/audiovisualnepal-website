import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // ── Validate ─────────────────────────────────────────────────────────────
    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // ── Proxy to WordPress REST API (/avn/v1/contact) ─────────────────────────
    const wpBase = (process.env.NEXT_PUBLIC_WP_URL || 'https://audiovisualnepal.com').replace(/\/$/, '')
    const wpRes  = await fetch(`${wpBase}/wp-json/avn/v1/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name:         body.name,
        email:        body.email,
        company:      body.company   || '',
        phone:        body.phone     || '',
        project_type: body.projectType || '',
        message:      body.message,
      }),
    })

    const data = await wpRes.json()

    if (!wpRes.ok) {
      console.error('WordPress contact endpoint error:', data)
      return NextResponse.json({ error: data.message || 'Submission failed' }, { status: wpRes.status })
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (err) {
    console.error('Contact form proxy error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
