'use client'

import { useState } from 'react'

interface ProductImgProps {
  src: string
  alt: string
  objectFit?: 'contain' | 'cover'
  /** @deprecated pass objectFit instead */
  style?: React.CSSProperties
  className?: string
  brandColor?: string
  brandName?: string
  /** ignored – kept for API compat */
  fill?: boolean
}

/**
 * Renders the real product image immediately.
 * Falls back to a branded placeholder only when src is empty or the image
 * fails to load (404, CORS block, hotlink protection, etc.).
 */
export function ProductImg({
  src,
  alt,
  objectFit = 'contain',
  style,
  className,
  brandColor = '#0071E3',
  brandName = '',
}: ProductImgProps) {
  const [failed, setFailed] = useState(false)
  const label = brandName || alt.slice(0, 14)
  const fit = (style?.objectFit as 'contain' | 'cover' | undefined) ?? objectFit

  const altLow = alt.toLowerCase()
  const isCamera = altLow.includes('camera') || altLow.includes('ptz') || altLow.includes('cam')
  const isSpeaker = altLow.includes('speaker') || altLow.includes('mic') || altLow.includes('audio') || altLow.includes('speakerphone')
  const isController = altLow.includes('controller') || altLow.includes('keyboard') || altLow.includes('joystick')
  const isDisplay = altLow.includes('wall') || altLow.includes('display') || altLow.includes('switch') || altLow.includes('matrix') || altLow.includes('iwall') || altLow.includes('iswitch')
  const isPA = altLow.includes('amplifier') || altLow.includes('amp') || altLow.includes('pava') || altLow.includes('evacuation') || altLow.includes('horn') || altLow.includes('column')

  if (!src || failed) {
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect width="80" height="80" rx="20" fill={`${brandColor}15`} />
          {isCamera ? (
            <>
              <rect x="18" y="28" width="44" height="30" rx="6" stroke={brandColor} strokeWidth="2.5" fill="none" opacity="0.7"/>
              <circle cx="40" cy="43" r="8" stroke={brandColor} strokeWidth="2.5" fill="none" opacity="0.7"/>
              <circle cx="40" cy="43" r="3" fill={brandColor} opacity="0.5"/>
              <rect x="30" y="22" width="14" height="6" rx="3" stroke={brandColor} strokeWidth="2" fill="none" opacity="0.5"/>
            </>
          ) : isSpeaker ? (
            <>
              <rect x="28" y="20" width="24" height="30" rx="12" stroke={brandColor} strokeWidth="2.5" fill="none" opacity="0.7"/>
              <path d="M20 42c0 11 8.954 20 20 20s20-8.954 20-20" stroke={brandColor} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7"/>
              <line x1="40" y1="62" x2="40" y2="68" stroke={brandColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
              <line x1="32" y1="68" x2="48" y2="68" stroke={brandColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>
            </>
          ) : isController ? (
            <>
              <rect x="12" y="28" width="56" height="28" rx="6" stroke={brandColor} strokeWidth="2.5" fill="none" opacity="0.7"/>
              <circle cx="28" cy="42" r="6" stroke={brandColor} strokeWidth="2" fill="none" opacity="0.6"/>
              <circle cx="28" cy="42" r="2" fill={brandColor} opacity="0.5"/>
              <rect x="40" y="36" width="18" height="3" rx="1.5" fill={brandColor} opacity="0.5"/>
              <rect x="40" y="43" width="14" height="3" rx="1.5" fill={brandColor} opacity="0.5"/>
            </>
          ) : isDisplay ? (
            <>
              <rect x="12" y="20" width="56" height="36" rx="4" stroke={brandColor} strokeWidth="2.5" fill="none" opacity="0.7"/>
              <rect x="18" y="26" width="20" height="16" rx="2" fill={brandColor} opacity="0.15"/>
              <rect x="42" y="26" width="20" height="7" rx="2" fill={brandColor} opacity="0.15"/>
              <rect x="42" y="35" width="20" height="7" rx="2" fill={brandColor} opacity="0.15"/>
              <rect x="28" y="56" width="24" height="4" rx="2" fill={brandColor} opacity="0.4"/>
            </>
          ) : isPA ? (
            <>
              <rect x="10" y="24" width="60" height="14" rx="3" stroke={brandColor} strokeWidth="2.5" fill="none" opacity="0.7"/>
              <rect x="10" y="42" width="60" height="14" rx="3" stroke={brandColor} strokeWidth="2.5" fill="none" opacity="0.7"/>
              <circle cx="55" cy="31" r="4" stroke={brandColor} strokeWidth="1.5" fill="none" opacity="0.6"/>
              <circle cx="55" cy="49" r="4" stroke={brandColor} strokeWidth="1.5" fill="none" opacity="0.6"/>
              <rect x="16" y="28" width="28" height="6" rx="1.5" fill={brandColor} opacity="0.2"/>
              <rect x="16" y="46" width="20" height="6" rx="1.5" fill={brandColor} opacity="0.2"/>
            </>
          ) : (
            <>
              <rect x="12" y="26" width="56" height="32" rx="5" stroke={brandColor} strokeWidth="2.5" fill="none" opacity="0.7"/>
              <circle cx="40" cy="42" r="9" stroke={brandColor} strokeWidth="2" fill="none" opacity="0.5"/>
              <circle cx="40" cy="42" r="4" fill={brandColor} opacity="0.35"/>
              <circle cx="56" cy="30" r="3" fill={brandColor} opacity="0.5"/>
            </>
          )}
        </svg>
        <span style={{
          fontFamily: 'Manrope, system-ui, sans-serif',
          fontWeight: 800,
          fontSize: 12,
          letterSpacing: '0.06em',
          color: brandColor,
          opacity: 0.75,
          textTransform: 'uppercase',
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
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: fit,
        padding: fit === 'contain' ? '20px' : '0px',
      }}
      onError={() => setFailed(true)}
    />
  )
}
