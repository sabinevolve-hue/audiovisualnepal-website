import { NextResponse } from 'next/server'

const TO = process.env.CONTACT_TO || 'sales@audiovisualnepal.com'
// Resend requires a verified sender domain. Until audiovisualnepal.com is verified in Resend,
// their shared onboarding sender works for delivery to your own inbox.
const FROM = process.env.CONTACT_FROM || 'AudioVisual Nepal <onboarding@resend.dev>'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Honeypot — bots fill hidden fields; pretend success and drop
    if (body.website) return NextResponse.json({ ok: true })

    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const enquiry = {
      name: String(body.name).slice(0, 200),
      email: String(body.email).slice(0, 200),
      phone: String(body.phone).slice(0, 60),
      company: String(body.company || '').slice(0, 200),
      projectType: String(body.projectType || '').slice(0, 120),
      message: String(body.message).slice(0, 5000),
      at: new Date().toISOString(),
    }

    let delivered = false
    let via = 'none'
    const keyPresent = !!process.env.RESEND_API_KEY

    // 1) Primary: email via Resend (no SDK needed — REST API)
    if (process.env.RESEND_API_KEY) {
      try {
        const html = `
          <h2>New enquiry from audiovisualnepal.com</h2>
          <p><strong>Name:</strong> ${escapeHtml(enquiry.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(enquiry.email)}</p>
          <p><strong>Phone:</strong> ${escapeHtml(enquiry.phone)}</p>
          <p><strong>Company:</strong> ${escapeHtml(enquiry.company) || '—'}</p>
          <p><strong>Project type:</strong> ${escapeHtml(enquiry.projectType) || '—'}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap">${escapeHtml(enquiry.message)}</p>
          <hr><p style="color:#888;font-size:12px">Received ${enquiry.at}</p>`
        const r = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from: FROM,
            to: [TO],
            reply_to: enquiry.email,
            subject: `New enquiry — ${enquiry.name}${enquiry.projectType ? ` (${enquiry.projectType})` : ''}`,
            html,
          }),
        })
        delivered = r.ok
        via = r.ok ? 'resend' : `resend_fail_${r.status}`
        if (!r.ok) console.error('Resend failed:', r.status, await r.text())
      } catch (e) {
        console.error('Resend error:', e)
      }
    }

    // 2) Secondary: WordPress endpoint if configured (best-effort, verified)
    if (!delivered && process.env.NEXT_PUBLIC_WP_URL) {
      try {
        const wpBase = process.env.NEXT_PUBLIC_WP_URL.replace(/\/$/, '')
        const r = await fetch(`${wpBase}/wp-json/avn/v1/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(enquiry),
        })
        if (r.ok) via = 'wp'
      } catch { /* ignore */ }
    }

    // Always keep a copy in server logs as a last resort
    console.log('CONTACT_SUBMISSION:', JSON.stringify({ ...enquiry, delivered }))

    // Tell the client whether email delivery succeeded so it can offer the WhatsApp fallback
    return NextResponse.json({ success: true, delivered, via, keyPresent })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Please try again or contact us directly.' }, { status: 500 })
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string))
}
