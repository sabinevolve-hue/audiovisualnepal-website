'use client'

interface ProductImgProps {
  src: string
  alt: string
  style?: React.CSSProperties
  className?: string
  brandColor?: string
  brandName?: string
}

/**
 * Client component so onError handler is allowed.
 * When the external CDN image fails (hotlink protection), renders a branded
 * SVG placeholder using the brand colour + name so the page still looks polished.
 */
export function ProductImg({
  src,
  alt,
  style,
  className,
  brandColor = '#0071E3',
  brandName = '',
}: ProductImgProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement
    const color = brandColor.replace(/^#/, '')
    const label = brandName || alt.slice(0, 12)
    // Build a self-contained SVG data URI — no external request needed
    const svg = [
      `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">`,
      `<rect width="480" height="360" fill="#${color}12"/>`,
      `<rect x="140" y="100" width="200" height="160" rx="20" fill="#${color}22"/>`,
      // Speaker icon outline
      `<path d="M200 160 L220 145 L220 215 L200 200 Z" fill="#${color}99"/>`,
      `<rect x="200" y="165" width="8" height="30" rx="4" fill="#${color}99"/>`,
      `<path d="M228 155 Q248 180 228 205" stroke="#${color}99" stroke-width="6" fill="none" stroke-linecap="round"/>`,
      `<path d="M238 148 Q268 180 238 212" stroke="#${color}66" stroke-width="5" fill="none" stroke-linecap="round"/>`,
      // Brand name
      `<text x="240" y="292" text-anchor="middle" font-family="system-ui,sans-serif" font-size="22" font-weight="900" fill="#${color}">${label}</text>`,
      `</svg>`,
    ].join('')
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    img.onerror = null // prevent infinite loop
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={style}
      className={className}
      onError={handleError}
    />
  )
}
