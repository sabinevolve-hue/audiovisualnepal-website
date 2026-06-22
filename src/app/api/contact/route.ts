import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Try WordPress REST API — but never let its failure block the user
    try {
      const wpBase = (process.env.NEXT_PUBLIC_WP_URL || 'https://cms.audiovisualnepal.com').replace(/\/$/, '')
      await fetch(`${wpBase}/wp-json/avn/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:         body.name,
          email:        body.email,
          company:      body.company     || '',
          phone:        body.phone       || '',
          project_type: body.projectType || '',
          message:      body.message,
        }),
      })
    } catch (wpErr) {
      // Log but don't fail — enquiry details are in server logs
      console.warn('WP contact endpoint unavailable:', wpErr)
      console.log('CONTACT_SUBMISSION:', JSON.stringify({
        name: body.name, email: body.email, phone: body.phone,
        company: body.company, projectType: body.projectType,
        message: body.message, timestamp: new Date().toISOString(),
      }))
    }

    // Always return success to the user
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact form error:', err)
    return NextResponse.json({ error: 'Please try again or contact us directly.' }, { status: 500 })
  }
}
