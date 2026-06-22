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
 * Client component — swaps to a branded inline SVG fallback via React state
 * when the external CDN image fails (hotlink protection / unavailable).
 */
export function ProductImg({
  src,
  alt,
  style,
  className,
  brandColor = '#0071E3',
  brandName = '',
}: ProductImgProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    const label = brandName || alt.slice(0, 14)
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `${brandColor}12`,
          borderRadius: 12,
          gap: 10,
        }}
        className={className}
      >
        {/* Speaker icon */}
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
          <rect width="56" height="56" rx="14" fill={`${brandColor}20`} />
          <path d="M20 24L28 18v20l-8-6H14v-8h6z" fill={brandColor} opacity="0.7" />
          <path d="M32 22c2.5 2 4 4.5 4 6s-1.5 4-4 6" stroke={brandColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.8" />
          <path d="M35 18c4 3 6.5 6 6.5 10s-2.5 7-6.5 10" stroke={brandColor} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
        </svg>
        <span style={{
          fontFamily: 'Manrope, system-ui, sans-serif',
          fontWeight: 900,
          fontSize: 16,
          color: brandColor,
          letterSpacing: '0.05em',
        }}>
          {label}
        </span>
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={style}
      className={className}
      onError={() => setFailed(true)}
    />
  )
}
