'use client'

import { useState } from 'react'
import { ProductImg } from '@/components/ui/ProductImg'

export default function ProductGallery({
  images, alt, brandColor, brandName, badge,
}: {
  images: string[]; alt: string; brandColor: string; brandName: string; badge?: string;
}) {
  const [i, setI] = useState(0)
  return (
    <div>
      <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', background: `linear-gradient(135deg, ${brandColor}12 0%, #F8FAFC 100%)`, border: `1.5px solid ${brandColor}25`, aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 2, background: '#0B1E3D', border: `1.5px solid ${brandColor}60`, borderRadius: 10, padding: '5px 14px', fontSize: 12, fontWeight: 900, letterSpacing: '0.06em', color: '#FFFFFF', fontFamily: 'Manrope, sans-serif' }}>
          {brandName}
        </div>
        {badge && (
          <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 2, background: badge === 'Best Seller' ? '#D97706' : badge === 'New' ? '#059669' : brandColor, color: '#fff', padding: '4px 12px', borderRadius: 980, fontSize: 11, fontWeight: 700, letterSpacing: '0.05em' }}>
            {badge}
          </div>
        )}
        <ProductImg key={images[i]} src={images[i]} alt={`${alt} — photo ${i + 1}`} objectFit="contain" brandColor={brandColor} brandName={brandName} />
      </div>
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: 8, marginTop: 10, overflowX: 'auto' }}>
          {images.map((img, j) => (
            <button
              key={img}
              onClick={() => setI(j)}
              aria-label={`Photo ${j + 1}`}
              style={{
                width: 64, height: 64, flexShrink: 0, borderRadius: 12, background: '#FFFFFF', cursor: 'pointer', padding: 4,
                border: j === i ? `2px solid ${brandColor}` : '1.5px solid rgba(11,30,61,0.12)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
