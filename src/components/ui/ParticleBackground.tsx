'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  fadeDir: 1 | -1
}

interface ParticleBackgroundProps {
  count?: number
  color?: string
  speed?: number
  maxRadius?: number
  connectDistance?: number
  className?: string
}

export function ParticleBackground({
  count = 60,
  color = '0, 113, 227',   // RGB string, used in rgba()
  speed = 0.4,
  maxRadius = 2.5,
  connectDistance = 120,
  className = '',
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let particles: Particle[] = []
    let w = 0, h = 0

    const resize = () => {
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }

    const spawn = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * speed * 2,
      vy: (Math.random() - 0.5) * speed * 2,
      radius: Math.random() * maxRadius + 0.5,
      alpha: Math.random(),
      fadeDir: Math.random() > 0.5 ? 1 : -1,
    })

    const init = () => {
      resize()
      particles = Array.from({ length: count }, spawn)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx
        p.y += p.vy

        // Wrap
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        // Fade pulse
        p.alpha += p.fadeDir * 0.003
        if (p.alpha >= 0.8) p.fadeDir = -1
        if (p.alpha <= 0.1) p.fadeDir = 1

        // Draw dot
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color}, ${p.alpha})`
        ctx.fill()

        // Connect nearby
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j]
          const dx = p.x - q.x
          const dy = p.y - q.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectDistance) {
            const lineAlpha = (1 - dist / connectDistance) * 0.25 * Math.min(p.alpha, q.alpha)
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(${color}, ${lineAlpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animId = requestAnimationFrame(draw)
    }

    init()
    draw()

    const ro = new ResizeObserver(init)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [count, color, speed, maxRadius, connectDistance])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden
    />
  )
}
