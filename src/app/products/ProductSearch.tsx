'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface Category {
  label: string
  href: string
  icon: string
  count?: number
}

export default function ProductSearch({ categories }: { categories: Category[] }) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return categories
    return categories.filter(c => c.label.toLowerCase().includes(q))
  }, [query, categories])

  return (
    <>
      <div style={{ maxWidth: 520, margin: '0 auto 48px', position: 'relative' }}>
        <div style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: '#64748B', pointerEvents: 'none' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
        </div>
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search products… e.g. Dante mixer, ceiling speaker"
          style={{ width: '100%', boxSizing: 'border-box', padding: '14px 18px 14px 44px', fontSize: 15, border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 980, outline: 'none', color: '#FFFFFF', background: 'rgba(255,255,255,0.05)', transition: 'border-color 0.15s, background 0.15s' }}
          onFocus={e => { e.target.style.borderColor = '#3B82F6'; e.target.style.background = 'rgba(59,130,246,0.08)' }}
          onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.05)' }}
        />
        {query && (
          <button onClick={() => setQuery('')} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748B', fontSize: 20, lineHeight: 1 }} aria-label="Clear search">×</button>
        )}
      </div>

      {query && (
        <p style={{ textAlign: 'center', fontSize: 14, color: '#64748B', marginBottom: 32 }}>
          {filtered.length === 0 ? `No categories found for "${query}"` : `${filtered.length} categor${filtered.length === 1 ? 'y' : 'ies'} matching "${query}"`}
        </p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
        {filtered.map((cat) => (
          <Link key={cat.href} href={cat.href}
            style={{ textDecoration: 'none', display: 'block', background: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: '28px 24px', border: '1px solid rgba(255,255,255,0.07)', transition: 'all 0.2s' }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(59,130,246,0.08)'; el.style.borderColor = 'rgba(59,130,246,0.3)'; el.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'rgba(255,255,255,0.03)'; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.transform = 'none' }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>{cat.icon}</div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 17, fontWeight: 700, color: '#FFFFFF', marginBottom: 6 }}>{cat.label}</h3>
            {cat.count ? <p style={{ fontSize: 13, color: '#64748B', marginBottom: 12 }}>{cat.count} products</p> : null}
            <div style={{ fontSize: 13, color: '#3B82F6', fontWeight: 600 }}>Browse →</div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && query && (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <p style={{ color: '#64748B', marginBottom: 16 }}>Try searching for: Speakers, Conference, Microphone, Amplifier</p>
          <button onClick={() => setQuery('')} style={{ background: '#3B82F6', color: '#fff', border: 'none', borderRadius: 980, padding: '10px 24px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Show all categories</button>
        </div>
      )}
    </>
  )
}
