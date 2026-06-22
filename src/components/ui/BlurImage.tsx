'use client'

import { motion } from 'framer-motion'
import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface BlurImageProps extends Omit<ImageProps, 'onLoad'> {
  wrapperClassName?: string
}

/**
 * Next/Image with blur-up reveal animation.
 * Shows a shimmer skeleton, then fades in when loaded.
 */
export function BlurImage({ wrapperClassName = '', className = '', alt, ...props }: BlurImageProps) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {/* Shimmer while loading */}
      {!loaded && (
        <div className="absolute inset-0 bg-white/5 animate-shimmer rounded-[inherit]" />
      )}

      <motion.div
        initial={{ opacity: 0, filter: 'blur(12px)', scale: 1.04 }}
        animate={loaded ? { opacity: 1, filter: 'blur(0px)', scale: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full h-full"
      >
        <Image
          {...props}
          alt={alt}
          className={`w-full h-full object-cover ${className}`}
          onLoad={() => setLoaded(true)}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAM0lEQVQImWNgYGBg+P//P8P///8ZGBj+MzAwMPz//5+BgYGBgYGBgYGBgYGBgYGBgf//AEY4Cm6Q6mXgAAAAAElFTkSuQmCC"
        />
      </motion.div>
    </div>
  )
}
