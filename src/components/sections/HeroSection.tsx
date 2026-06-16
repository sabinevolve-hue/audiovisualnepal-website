import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-20 pb-20 overflow-hidden bg-[#000]">
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }
        .hero-item {
          opacity: 0;
          animation: heroFadeUp 0.6s ease forwards;
        }
      `}</style>

      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 30%, rgba(0,113,227,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 60% 40% at 20% 70%, rgba(0,80,200,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 70%, rgba(0,150,255,0.08) 0%, transparent 60%),
            linear-gradient(180deg, #000 0%, #0a0a1a 60%, #111827 100%)
          `,
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-[900px]">
        <div className="hero-item eyebrow mb-6" style={{ animationDelay: '0ms' }}>
          Nepal&apos;s Leading AV Solutions Provider
        </div>

        <h1 className="hero-item heading-hero text-white mb-7" style={{ animationDelay: '80ms' }}>
          Experience Sound &amp; Vision<br />
          <span className="gradient-text">Beyond Expectations.</span>
        </h1>

        <p className="hero-item text-[clamp(16px,2.2vw,21px)] text-white/60 leading-relaxed max-w-[680px] mx-auto mb-12" style={{ animationDelay: '160ms' }}>
          Professional Audio Visual Solutions for Government, Education,<br className="hidden sm:block" />
          Hospitality and Enterprise Projects Across Nepal.
        </p>

        <div className="hero-item flex flex-wrap gap-4 justify-center" style={{ animationDelay: '240ms' }}>
          <Link href="/solutions" className="btn-primary">
            Explore Solutions <ArrowRight size={16} />
          </Link>
          <Link href="/contact" className="btn-ghost">
            Request Quotation
          </Link>
        </div>
      </div>

      {/* Scroll indicator — hidden on mobile */}
      <div
        className="hero-item absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        style={{ animationDelay: '500ms' }}
      >
        <span className="text-[11px] text-white/35 uppercase tracking-[0.12em]">Scroll</span>
        <div
          className="w-px h-12"
          style={{
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
            animation: 'scrollLine 2s ease infinite',
          }}
        />
      </div>
    </section>
  )
}
