'use client'

import { useState } from 'react'

interface ProductImgProps {
  src: string
  alt: string
  style?: React.CSSProperties
  className?: string
  brandColor?: string
  brandName?: string
}

/**
 * Shows a branded placeholder immediately; swaps to the real image only if
 * it loads successfully. This avoids any flash of broken-image browser UI,
 * since brand CDNs often block hotlink requests from external domains.
 */
export function ProductImg({
  src,
  alt,
  style,
  className,
  brandColor = '#0071E3',
  brandName = '',
}: ProductImgProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const label = brandName || alt.slice(0, 14)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Branded placeholder — always visible until image loads */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          opacity: imageLoaded ? 0 : 1,
          transition: 'opacity 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        {/* Speaker icon */}
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <rect width="60" height="60" rx="16" fill={`${brandColor}20`} />
          <path d="M21 26L30 20v20l-9-6H15v-8h6z" fill={brandColor} opacity="0.6" />
          <path d="M34 24c2.8 2.2 4.5 5 4.5 6.5S36.8 35 34 37" stroke={brandColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.75" />
          <path d="M37 20c5 3.5 7.5 6.8 7.5 10.5S42 37 37 40" stroke={brandColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.45" />
        </svg>
        <span style={{
          fontFamily: 'Manrope, system-ui, sans-serif',
          fontWeight: 900,
          fontSize: 15,
          letterSpacing: '0.06em',
          color: brandColor,
        }}>
          {label}
        </span>
      </div>

      {/* Real image — fades in if it loads */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{
          ...style,
          position: 'absolute',
          inset: 0,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }}
        className={className}
        onLoad={() => setImageLoaded(true)}
        onError={() => { /* do nothing — placeholder stays visible */ }}
      />
    </div>
  )
}
