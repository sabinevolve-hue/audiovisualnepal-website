'use client'

interface ProductImgProps {
  src: string
  alt: string
  style?: React.CSSProperties
  className?: string
}

/** Client component — allows onError handler for broken image hiding */
export function ProductImg({ src, alt, style, className }: ProductImgProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      style={style}
      className={className}
      onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }}
    />
  )
}
