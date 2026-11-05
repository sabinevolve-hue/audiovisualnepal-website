'use client'

import { useEffect } from 'react'

/**
 * Lead attribution — one delegated listener for the whole site.
 *
 * 1. WhatsApp: every wa.me / api.whatsapp.com link keeps its plain, crawlable
 *    href in the HTML. When a visitor is about to use it (pointerdown, keyboard
 *    focus, click) we rewrite the href so the chat opens with a prefilled line
 *    naming what they were looking at and where:
 *      "Hi, I'm interested in <subject>. (Page: <path>)"
 *    If the link already has ?text=, that text is kept and the page reference
 *    is appended. Only location.pathname is used: no query string, no PII.
 *    Subject = nearest [data-wa-subject] ancestor, else the page title minus
 *    the site-name suffix.
 *    GA4's own outbound-click rule already turns these into `whatsapp_click`,
 *    so no extra GA event is sent for WhatsApp.
 *
 * 2. GA4: `phone_click` for tel: links and `email_click` for mailto: links
 *    (param link_url; page_location is added by gtag automatically).
 */

const WA_RE = /^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i
const PAGE_TAG = /\s*\(Page: [^)]*\)\s*$/
const MAX_SUBJECT = 80
const MAX_PATH = 120

type Gtag = (...args: unknown[]) => void

function clip(s: string, max: number): string {
  const t = s.replace(/\s+/g, ' ').trim()
  if (t.length <= max) return t
  const cut = t.slice(0, max)
  const sp = cut.lastIndexOf(' ')
  return (sp > max * 0.6 ? cut.slice(0, sp) : cut).trim() + '…'
}

function currentPath(): string {
  let p = window.location.pathname || '/'
  try { p = decodeURI(p) } catch { /* keep encoded */ }
  return clip(p, MAX_PATH)
}

function subjectFor(a: HTMLAnchorElement): string {
  const explicit = a.closest<HTMLElement>('[data-wa-subject]')?.dataset.waSubject
  if (explicit && explicit.trim()) return clip(explicit, MAX_SUBJECT)
  // "Product name | Site" -> "Product name"
  const title = (document.title || '').split(' | ')[0]
  return clip(title, MAX_SUBJECT)
}

/** Build the attributed WhatsApp URL from the link's original (generic) href. */
export function buildWhatsAppHref(base: string, subject: string, path: string): string {
  let url: URL
  try { url = new URL(base) } catch { return base }
  const ref = `(Page: ${path})`
  const existing = (url.searchParams.get('text') || '').replace(PAGE_TAG, '').trim()
  const text = existing
    ? `${existing} ${ref}`
    : subject
      ? `Hi, I'm interested in ${subject}. ${ref}`
      : `Hi, I have an enquiry. ${ref}`
  url.searchParams.set('text', text)
  // URLSearchParams encodes spaces as "+"; WhatsApp prefers %20. Only touch
  // the query: the path may legitimately hold "+977…".
  const query = url.searchParams.toString().replace(/\+/g, '%20')
  return `${url.origin}${url.pathname}?${query}`
}

function anchorFrom(e: Event): HTMLAnchorElement | null {
  const t = e.target
  if (!(t instanceof Element)) return null
  return t.closest<HTMLAnchorElement>('a[href]')
}

function attributeWhatsApp(a: HTMLAnchorElement): void {
  // Remember the server-rendered href so repeated hovers/clicks don't stack.
  const base = a.dataset.waBase || a.getAttribute('href') || ''
  if (!WA_RE.test(base)) return
  a.dataset.waBase = base
  a.setAttribute('href', buildWhatsAppHref(base, subjectFor(a), currentPath()))
}

export default function LeadAttribution() {
  useEffect(() => {
    const prime = (e: Event) => {
      const a = anchorFrom(e)
      if (a) attributeWhatsApp(a)
    }

    const onClick = (e: MouseEvent) => {
      const a = anchorFrom(e)
      if (!a) return
      // Capture phase runs before the browser follows the link, so the
      // rewritten href is the one that opens.
      attributeWhatsApp(a)

      const href = a.getAttribute('href') || ''
      const scheme = href.slice(0, 7).toLowerCase()
      const name = scheme.startsWith('tel:') ? 'phone_click' : scheme === 'mailto:' ? 'email_click' : null
      if (!name) return
      const gtag = (window as unknown as { gtag?: Gtag }).gtag
      if (typeof gtag === 'function') {
        // Strip any ?subject=/&body= from mailto so no message content is sent.
        gtag('event', name, { link_url: href.split('?')[0] })
      }
    }

    document.addEventListener('pointerdown', prime, true)
    document.addEventListener('focusin', prime, true)
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('pointerdown', prime, true)
      document.removeEventListener('focusin', prime, true)
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  return null
}
