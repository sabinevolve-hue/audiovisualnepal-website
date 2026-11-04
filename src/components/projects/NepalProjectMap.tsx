'use client'

// Nepal project map — same boundary data as nepalpublicdata.com (nepal-geo-data, NSO codes).
// Province → district → local-level (municipality) drill-down, pins at the municipality
// where each installation is, district shading by project count, sector filter and a synced list.
// `compact` = smaller embed for solution / product pages, optionally pre-filtered.

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { MAP_PROJECTS, type MapProject } from '@/data/projectMap'

type MapData = {
  viewBox: string
  nepal: string
  province: Record<string, string>
  district: Record<string, string>
  local: Record<string, string>
  label: Record<string, number[]>
  name: Record<string, string>
  ltype: Record<string, string>
  source: string
}

type Props = {
  compact?: boolean
  sectors?: string[]
  lines?: string[]
  title?: string
  subtitle?: string
}

const SECTOR_COLORS: Record<string, string> = {
  Banking: '#1D4ED8', Corporate: '#2563EB', Government: '#0F766E', Hospitality: '#C2410C', Retail: '#BE185D',
  Education: '#7C3AED', Entertainment: '#DB2777', Advertising: '#CA8A04', Commercial: '#475569',
}
const FULL_VB = [0, 0, 1000, 579]
const SHADES = ['#F1F5F9', '#DBEAFE', '#93C5FD', '#3B82F6', '#1D4ED8']
// Kathmandu Valley districts are tiny at national scale — treat them as one zoom group
const VALLEY = ['306', '307', '308']
const groupOf = (d: string) => (VALLEY.includes(d) ? 'KV' : d)
const members = (g: string | null) => (!g ? [] : g === 'KV' ? VALLEY : [g])

function shade(n: number, max: number) {
  if (!n) return SHADES[0]
  const t = Math.log(n + 1) / Math.log(max + 1)
  return SHADES[Math.min(4, 1 + Math.floor(t * 3.999))]
}

export default function NepalProjectMap({ compact = false, sectors, lines, title, subtitle }: Props) {
  const [map, setMap] = useState<MapData | null>(null)
  const [err, setErr] = useState(false)
  const [district, setDistrict] = useState<string | null>(null)
  const [sector, setSector] = useState<string>('All')
  const [hover, setHover] = useState<{ code: string; x: number; y: number } | null>(null)
  const [active, setActive] = useState<string | null>(null)
  const [vb, setVb] = useState<number[]>(FULL_VB)
  const svgRef = useRef<SVGSVGElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let live = true
    fetch('/data/nepal-map.json').then(r => r.json()).then(d => { if (live) setMap(d) }).catch(() => setErr(true))
    return () => { live = false }
  }, [])

  const base = useMemo(() => {
    let p = MAP_PROJECTS
    if (lines?.length) p = p.filter(x => lines.includes(x.line))
    if (sectors?.length) {
      const f = p.filter(x => sectors.includes(x.sector))
      if (f.length) p = f
    }
    return p
  }, [sectors, lines])

  const sectorList = useMemo(() => ['All', ...Array.from(new Set(base.map(p => p.sector))).sort()], [base])
  const filtered = useMemo(() => base.filter(p => sector === 'All' || p.sector === sector), [base, sector])
  const inSel = (d: string) => !district || members(district).includes(d)
  const listed = useMemo(() => filtered.filter(p => inSel(p.district)), [filtered, district]) // eslint-disable-line react-hooks/exhaustive-deps

  const byDistrict = useMemo(() => {
    const m: Record<string, MapProject[]> = {}
    filtered.forEach(p => { (m[p.district] ||= []).push(p) })
    return m
  }, [filtered])
  const byLocal = useMemo(() => {
    const m: Record<string, MapProject[]> = {}
    filtered.filter(p => inSel(p.district)).forEach(p => { (m[p.local] ||= []).push(p) })
    return m
  }, [filtered, district]) // eslint-disable-line react-hooks/exhaustive-deps
  const bubbles = useMemo(() => {
    const m: Record<string, number> = {}
    filtered.forEach(p => { const g = groupOf(p.district); m[g] = (m[g] ?? 0) + 1 })
    return m
  }, [filtered])
  const maxD = Math.max(1, ...Object.values(byDistrict).map(a => a.length))
  const provinces = new Set(filtered.map(p => p.province)).size
  const municipalities = new Set(filtered.map(p => p.local)).size

  // zoom to a district using the path's own bounding box
  useEffect(() => {
    if (!district || !svgRef.current) { setVb(FULL_VB); return }
    const els = members(district).map(c => svgRef.current!.querySelector<SVGPathElement>(`[data-d="${c}"]`)).filter(Boolean) as SVGPathElement[]
    if (!els.length) return
    const bs = els.map(e => e.getBBox())
    const x0 = Math.min(...bs.map(b => b.x)), y0 = Math.min(...bs.map(b => b.y))
    const b = { x: x0, y: y0, width: Math.max(...bs.map(b => b.x + b.width)) - x0, height: Math.max(...bs.map(b => b.y + b.height)) - y0 }
    const pad = Math.max(b.width, b.height) * 0.25
    let w = b.width + pad * 2, h = b.height + pad * 2
    const ar = 1000 / 579
    if (w / h > ar) h = w / ar; else w = h * ar
    setVb([b.x + b.width / 2 - w / 2, b.y + b.height / 2 - h / 2, w, h])
  }, [district, map])

  const k = vb[2] / 1000 // scale for pins / strokes
  const nm = (c: string) => (c === 'KV' ? 'Kathmandu Valley' : map?.name[c] ?? c)

  function pick(p: MapProject) {
    setActive(p.slug)
    if (district !== groupOf(p.district)) setDistrict(groupOf(p.district))
  }

  function move(e: React.MouseEvent, code: string) {
    const r = wrapRef.current?.getBoundingClientRect()
    if (!r) return
    setHover({ code, x: e.clientX - r.left, y: e.clientY - r.top })
  }

  const h = compact ? 'h-[300px] sm:h-[360px]' : 'h-[340px] sm:h-[460px] lg:h-[520px]'

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600">Installations across Nepal</p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900 sm:text-3xl" style={{ fontFamily: 'Manrope, sans-serif', letterSpacing: '-0.02em' }}>
            {title ?? 'Where our systems are installed'}
          </h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            {subtitle ?? 'Click a district to zoom to its municipalities. Pins sit on the local level (metro, sub-metro, municipality or rural municipality) where each project is installed.'}
          </p>
        </div>
        <div className="flex gap-2 text-center">
          {[{ v: filtered.length, l: 'Projects' }, { v: municipalities, l: 'Municipalities' }, { v: Object.keys(byDistrict).length, l: 'Districts' }, { v: provinces, l: 'Provinces' }].map(s => (
            <div key={s.l} className="rounded-xl bg-slate-50 px-3 py-2">
              <div className="text-lg font-extrabold text-slate-900">{s.v}</div>
              <div className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {sectorList.length > 2 && (
        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by sector">
          {sectorList.map(s => (
            <button key={s} type="button" onClick={() => { setSector(s); setActive(null) }}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${sector === s ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'}`}>
              {s !== 'All' && <span className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" style={{ background: SECTOR_COLORS[s] ?? '#64748B' }} />}
              {s}{s !== 'All' ? ` · ${base.filter(p => p.sector === s).length}` : ''}
            </button>
          ))}
        </div>
      )}

      <div className={`mt-4 grid gap-4 ${compact ? 'lg:grid-cols-[1fr_300px]' : 'lg:grid-cols-[1fr_340px]'}`}>
        <div ref={wrapRef} className={`relative overflow-hidden rounded-2xl border border-slate-100 bg-gradient-to-b from-sky-50 to-white ${h}`} onMouseLeave={() => setHover(null)}>
          {!map && (
            <div className="absolute inset-0 grid place-items-center text-sm text-slate-400">{err ? 'Map could not load — see the project list.' : 'Loading map of Nepal…'}</div>
          )}
          {map && (
            <svg ref={svgRef} viewBox={vb.join(' ')} className="h-full w-full" style={{ transition: 'all .5s ease' }} role="img" aria-label="Map of Nepal showing project locations by district and municipality">
              <path d={map.nepal} fill="#E2E8F0" stroke="none" />
              {Object.entries(map.district).map(([c, d]) => {
                const n = byDistrict[c]?.length ?? 0
                const sel = members(district).includes(c)
                return (
                  <path key={c} d={d} data-d={c}
                    fill={district && !sel ? (n ? '#E0EAFF' : '#F1F5F9') : sel ? '#FFFFFF' : shade(n, maxD)}
                    stroke="#FFFFFF" strokeWidth={0.8 * k}
                    className="cursor-pointer transition-colors hover:brightness-95"
                    onMouseMove={e => move(e, c)}
                    onClick={() => { if (!sel) { setDistrict(groupOf(c)); setActive(null) } }}>
                    <title>{`${nm(c)} — ${n} project${n === 1 ? '' : 's'}`}</title>
                  </path>
                )
              })}
              {district && Object.entries(map.local).filter(([c]) => members(district).includes(c.slice(0, 3))).map(([c, d]) => (
                <path key={c} d={d} fill={byLocal[c] ? '#DBEAFE' : '#F8FAFC'} stroke="#94A3B8" strokeWidth={0.35 * k}
                  onMouseMove={e => move(e, c)} className="cursor-default">
                  <title>{`${nm(c)} (${map.ltype[c] ?? 'local level'})`}</title>
                </path>
              ))}
              {Object.values(map.province).map((d, i) => (
                <path key={i} d={d} fill="none" stroke="#64748B" strokeWidth={1.1 * k} pointerEvents="none" />
              ))}
              {members(district).map(c => map.district[c] && (
                <path key={c} d={map.district[c]} fill="none" stroke="#1D4ED8" strokeWidth={1.6 * k} pointerEvents="none" />
              ))}

              {/* full view: one bubble per district; zoomed: one pin per municipality */}
              {!district && Object.entries(bubbles).map(([c, n]) => {
                const pt = c === 'KV' ? [(map.label['306'][0] + map.label['307'][0] + map.label['308'][0]) / 3, (map.label['306'][1] + map.label['307'][1] + map.label['308'][1]) / 3] : map.label[c]
                if (!pt) return null
                const r = (7 + Math.sqrt(n) * 3) * k
                return (
                  <g key={c} className="cursor-pointer" onClick={() => setDistrict(c)} onMouseMove={e => move(e, c)}>
                    <circle cx={pt[0]} cy={pt[1]} r={r + 3 * k} fill="#2563EB" opacity={0.18} />
                    <circle cx={pt[0]} cy={pt[1]} r={r} fill="#1D4ED8" stroke="#fff" strokeWidth={1.5 * k} />
                    <text x={pt[0]} y={pt[1]} dy="0.35em" textAnchor="middle" fontSize={r * 1.05} fontWeight={800} fill="#fff" pointerEvents="none">{n}</text>
                  </g>
                )
              })}
              {district && Object.entries(byLocal).map(([c, arr]) => {
                const pt = map.label[c]; if (!pt) return null
                const r = (6 + Math.sqrt(arr.length) * 2.4) * k
                const on = arr.some(p => p.slug === active)
                const col = arr.length === 1 ? (SECTOR_COLORS[arr[0].sector] ?? '#1D4ED8') : '#1D4ED8'
                return (
                  <g key={c} className="cursor-pointer" onMouseMove={e => move(e, c)} onClick={() => setActive(arr[0].slug)}>
                    <path d={`M${pt[0]},${pt[1]} l${-r * 0.75},${-r * 1.4} a${r},${r} 0 1,1 ${r * 1.5},0 z`} fill={col} stroke={on ? '#0B1E3D' : '#fff'} strokeWidth={(on ? 2 : 1.2) * k} />
                    <text x={pt[0]} y={pt[1] - r * 1.75} dy="0.35em" textAnchor="middle" fontSize={r * 0.95} fontWeight={800} fill="#fff" pointerEvents="none">{arr.length}</text>
                    <text x={pt[0]} y={pt[1] + r * 0.9} textAnchor="middle" fontSize={7.5 * k} fontWeight={700} fill="#0B1E3D" stroke="#fff" strokeWidth={2.2 * k} paintOrder="stroke" pointerEvents="none">{nm(c)}</text>
                  </g>
                )
              })}
            </svg>
          )}

          {hover && map && (
            <div className="pointer-events-none absolute z-10 rounded-lg bg-slate-900/90 px-3 py-2 text-xs text-white shadow-lg"
              style={{ left: Math.min(hover.x + 12, (wrapRef.current?.clientWidth ?? 400) - 200), top: hover.y + 12, maxWidth: 220 }}>
              <div className="font-bold">{nm(hover.code)}</div>
              <div className="opacity-80">
                {hover.code.length === 5 ? `${map.ltype[hover.code] ?? 'Local level'} · ${(byLocal[hover.code] ?? []).length} project(s)`
                  : hover.code.length === 3 ? `District · ${(byDistrict[hover.code] ?? []).length} project(s)`
                  : hover.code === 'KV' ? `Kathmandu, Lalitpur & Bhaktapur · ${bubbles.KV ?? 0} project(s)` : ''}
              </div>
            </div>
          )}

          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
            {district && (
              <button type="button" onClick={() => { setDistrict(null); setActive(null) }} className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-blue-700 shadow ring-1 ring-slate-200 hover:bg-white">
                ← All of Nepal
              </button>
            )}
            {district && map && (
              <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow ring-1 ring-slate-200">
                {district === 'KV' ? 'Kathmandu Valley' : `${nm(district)} district`} · {nm(members(district)[0].slice(0, 1))}
              </span>
            )}
          </div>
          {!district && (
            <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-lg bg-white/90 px-2 py-1 text-[10px] text-slate-500 ring-1 ring-slate-200">
              <span>Fewer</span>{SHADES.slice(1).map(c => <span key={c} className="inline-block h-2.5 w-4 rounded-sm" style={{ background: c }} />)}<span>More projects</span>
            </div>
          )}
        </div>

        <div className={`flex flex-col rounded-2xl border border-slate-100 bg-slate-50/60 ${h}`}>
          <div className="border-b border-slate-200 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
            {district && map ? `${listed.length} in ${nm(district)}` : `${listed.length} projects`}{sector !== 'All' ? ` · ${sector}` : ''}
          </div>
          <ul className="flex-1 space-y-2 overflow-y-auto p-3">
            {listed.map(p => {
              const on = active === p.slug
              const body = (
                <div className="flex gap-3">
                  {p.image ? (
                    <Image src={p.image} alt={p.title} width={64} height={48} className="h-12 w-16 flex-none rounded-md object-cover" />
                  ) : (
                    <div className="grid h-12 w-16 flex-none place-items-center rounded-md text-[10px] font-bold text-white" style={{ background: SECTOR_COLORS[p.sector] ?? '#64748B' }}>{p.sector}</div>
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-slate-900">{p.title}</div>
                    <div className="truncate text-xs text-slate-500">{p.location}{map ? ` · ${nm(p.local)}` : ''}</div>
                    <div className="truncate text-[11px] text-slate-600">{p.scope}</div>
                  </div>
                </div>
              )
              return (
                <li key={p.slug}>
                  <div role="button" tabIndex={0} onClick={() => pick(p)} onKeyDown={e => { if (e.key === 'Enter') pick(p) }}
                    className={`cursor-pointer rounded-xl border bg-white p-2.5 transition ${on ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-blue-300'}`}>
                    {body}
                    {on && p.href && (
                      <Link href={p.href} className="mt-2 inline-block text-xs font-semibold text-blue-600 hover:underline">Read the case study →</Link>
                    )}
                  </div>
                </li>
              )
            })}
            {!listed.length && <li className="p-4 text-sm text-slate-500">No projects match this filter yet.</li>}
          </ul>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <span>We supply and install in all 77 districts — contact us for references near your site.</span>
        <span>{map?.source ?? 'Boundaries: nepal-geo-data (MIT) via nepalpublicdata.com.'}</span>
      </div>
    </div>
  )
}
