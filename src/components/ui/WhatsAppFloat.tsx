'use client'

import { SITE } from '@/lib/constants'

export default function WhatsAppFloat() {
  return (
    <a
      href={SITE.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl
                 transition-all duration-250 hover:scale-110 animate-[popIn_0.5s_ease_1.5s_both]"
      style={{
        background: '#25D366',
        boxShadow: '0 8px 24px rgba(37,211,102,0.35)',
      }}
      aria-label="Chat with us on WhatsApp"
    >
      💬
    </a>
  )
}
