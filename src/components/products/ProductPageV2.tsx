'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { ARCHETYPES } from '@/data/categoryArchetypes'

function scopeCss(css: string): string {
  const scope = '.pv2'
  css = css.replace(/\/\*[\s\S]*?\*\//g, '')
  const parse = (str: string): string => {
    let res = '', idx = 0
    while (idx < str.length) {
      const open = str.indexOf('{', idx)
      if (open < 0) break
      const sel = str.slice(idx, open).trim()
      if (sel.startsWith('@media') || sel.startsWith('@supports')) {
        let depth = 1, j = open + 1
        while (j < str.length && depth > 0) { const ch = str[j]; if (ch === '{') depth++; else if (ch === '}') depth--; j++ }
        res += sel + '{' + parse(str.slice(open + 1, j - 1)) + '}'
        idx = j
      } else {
        const close = str.indexOf('}', open)
        const body = str.slice(open + 1, close)
        const scoped = sel.split(',').map((x) => { const t = x.trim(); if (!t) return t; return t === scope ? t : scope + ' ' + t }).join(',')
        res += scoped + '{' + body + '}'
        idx = close + 1
      }
    }
    return res
  }
  return parse(css)
}

type Spec = { label: string; value: string; highlight?: boolean; group?: string }
type Feat = { title: string; desc: string }
type Product = {
  name: string; slug: string; category: string; brand: string; badge?: string
  subcategory?: string; tagline?: string; description?: string; imageUrl?: string
  gallery?: string[]; keyFeatures?: Feat[]; specs?: Spec[]; applications?: string[]; warranty?: string
}

const PHONE = '+977 9762109538'
const wa = (t: string) => `https://wa.me/9779762109538?text=${encodeURIComponent(t)}`

export default function ProductPageV2({ product, categoryKey }: { product: Product; categoryKey: string }) {
  const a = ARCHETYPES[categoryKey]
  const heroRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const [stuck, setStuck] = useState(false)
  const [active, setActive] = useState(0)
  const [flowLabel, setFlowLabel] = useState('')
  const [playing, setPlaying] = useState(false)

  const b = a?.builder
  const [seg, setSeg] = useState(b?.segs[0]?.key || '')
  const [vals, setVals] = useState<Record<string, number>>(() => {
    const o: Record<string, number> = {}; b?.sliders.forEach(s => (o[s.id] = s.value)); return o
  })

  const secs = ['build', 'connect', 'packs', 'why', 'compare', 'specs', 'faq'].filter(id => id !== 'build' || b)
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) setStuck(heroRef.current.getBoundingClientRect().bottom < 0)
      const y = window.scrollY + 120; let idx = 0
      secs.forEach((id, i) => { const el = document.getElementById(id); if (el && el.offsetTop <= y) idx = i })
      setActive(idx)
    }
    window.addEventListener('scroll', onScroll); return () => window.removeEventListener('scroll', onScroll)
  })

  if (!a) return null
  const accent = a.accent
  const tint = (al: number) => {
    const h = accent.replace('#', ''); const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), bl = parseInt(h.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${bl}, ${al})`
  }
  const defaultMsg = 'Grey boxes are products we supply — hover to see what to pair.'
  const out = b ? b.compute(seg, vals) : null

  function play() {
    if (playing) return; setPlaying(true)
    let t = 0
    a!.diagram.flow.forEach((f, i) => {
      setTimeout(() => {
        setFlowLabel(f.label)
        const p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('d', f.d)
        const len = p.getTotalLength(); const dot = dotRef.current!; let start: number | null = null
        dot.setAttribute('opacity', '1')
        const step = (ts: number) => { if (start === null) start = ts; const k = Math.min((ts - start) / f.dur, 1); const pt = p.getPointAtLength(k * len); dot.setAttribute('cx', String(pt.x)); dot.setAttribute('cy', String(pt.y)); if (k < 1) requestAnimationFrame(step) }
        requestAnimationFrame(step)
      }, t)
      t += f.dur
    })
    setTimeout(() => { setFlowLabel('Delivered across the whole system.'); dotRef.current?.setAttribute('opacity', '0'); setPlaying(false); setTimeout(() => setFlowLabel(''), 2500) }, t + 300)
  }

  const specGroups: { g: string; rows: Spec[] }[] = []
  ;(product.specs || []).forEach(s => {
    const g = s.group || 'Specifications'; let e = specGroups.find(x => x.g === g); if (!e) { e = { g, rows: [] }; specGroups.push(e) }; e.rows.push(s)
  })
  const spineLabels: Record<string, string> = { build: b?.title || 'Configure', connect: 'How it connects', packs: 'Packs', why: 'Why us', compare: 'Compare', specs: 'Specs', faq: 'FAQ' }

  return (
    <main className="pv2" style={{ ['--ac' as string]: accent, ['--acd' as string]: tint(0.08), ['--acl' as string]: tint(0.28) } as React.CSSProperties}>
      {/* sticky */}
      <div className={'pv2-sticky' + (stuck ? ' show' : '')}><div className="in">
        <div className="nm">{product.name}<small>{product.tagline}</small></div><div className="sp" />
        <span className="resp">⚡ Engineer replies in ~2 hrs</span>
        <a className="btn wa" href={wa(`Hi, I'm interested in the ${product.name}. Please share pricing.`)}>WhatsApp</a>
        <Link className="btn q" href={`/contact?product=${encodeURIComponent(product.name)}`}>Request price</Link>
      </div></div>

      <div className="cw">
        <div className="crumb">Home › Products › <b>{product.name}</b></div>
        <div className="hero" ref={heroRef}>
          <div className="shot">
            {product.imageUrl
              ? <img src={product.imageUrl} alt={product.name} onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
              : <div className="fb">{product.brand}<br /><b>{product.name}</b></div>}
          </div>
          <div>
            <div className="chips">{product.badge && <span className="badge">{product.badge}</span>}<span className="chip">{product.brand}</span>{product.subcategory && <span className="chip">{product.subcategory}</span>}</div>
            <h1>{product.name}</h1>
            <div className="tagline">{product.tagline}</div>
            <div className="outcome">🛡️ <b>The outcome:</b> {a.outcome}</div>
            <div className="glance">{a.glance.map((g, i) => <div className="g" key={i}><div className="v">{g.v}</div><div className="k">{g.k}</div></div>)}</div>
            {product.applications?.length ? <><div className="ideal">Ideal for</div><div className="tags">{product.applications.map(t => <span className="tag" key={t}>{t}</span>)}</div></> : null}
            <div className="cta">
              <a className="btn wa" href={wa(`Hi, I'm interested in the ${product.name}.`)}>WhatsApp Enquiry</a>
              <Link className="btn q" href={`/contact?product=${encodeURIComponent(product.name)}`}>Request Quotation</Link>
              <a className="btn c" href={`tel:${PHONE.replace(/\s/g, '')}`}>Call {PHONE}</a>
            </div>
            <div className="ctanote">💬 <b>We quote per site</b> after free sizing. Typical reply ~2 hours.</div>
            <div className="trust">{a.trust.map((t, i) => <div className="t" key={i}><div className="ic">✓</div><div><div className="tt">{t.tt}</div><div className="ts">{t.ts}</div></div></div>)}</div>
          </div>
        </div>
      </div>

      <nav className="pv2-spine"><div className="in">{secs.map((id, i) => <a key={id} href={'#' + id} className={i === active ? 'active' : ''}>{spineLabels[id]}</a>)}</div></nav>

      {b && out && (
        <section className="block soft" id="build">
          <div className="cw">
            <div className="eyebrow">{b.eyebrow}</div><h2>{b.title}</h2><p className="lead">{b.lead}</p>
            <div className="builder">
              <div className="bc">
                <p className="q">{b.segLabel}</p>
                <div className="seg">{b.segs.map(s => <button key={s.key} className={seg === s.key ? 'on' : ''} onClick={() => setSeg(s.key)}>{s.label}</button>)}</div>
                {b.sliders.map(s => (
                  <div key={s.id}>
                    <div className="sl"><span>{s.label}</span><span>{s.fmt ? s.fmt(vals[s.id]) : vals[s.id]}</span></div>
                    <input type="range" min={s.min} max={s.max} value={vals[s.id]} onChange={e => setVals(v => ({ ...v, [s.id]: +e.target.value }))} />
                  </div>
                ))}
                <p className="bnote">{b.note}</p>
              </div>
              <div className="bo">
                <div className="rec">Recommended</div><div className="host">{out.host}</div><div className="hostsub">{out.hostSub}</div>
                <div className="ogrid">{out.cells.map((c, i) => <div className="cell" key={i}><div className="cv">{c.cv}</div><div className="ck">{c.ck}</div></div>)}</div>
                <div className="onote">{out.note}</div>
                <Link className="go" href={`/contact?product=${encodeURIComponent(product.name)}&inquiry=build`}>Quote this exact build →<small>Pricing &amp; a BOQ in ~2 hours</small></Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="block" id="connect">
        <div className="cw">
          <div className="eyebrow">Integration</div><h2>{a.diagram.title}</h2><p className="lead">{a.diagram.lead}</p>
          <div className="dcard">
            <div className="dtop"><button className="play" onClick={play} disabled={playing}>{a.diagram.playLabel}</button><div className="fl">{flowLabel || defaultMsg}</div></div>
            <svg ref={svgRef} viewBox={a.diagram.viewBox} role="img" aria-label={`${product.name} connection diagram`}>
              {a.diagram.edges.map((e, i) => <path key={i} d={e.d} fill="none" stroke="#CBD5E1" strokeWidth={2} strokeLinecap="round" />)}
              {a.diagram.edges.map((e, i) => e.lt ? <text key={'l' + i} className="el" x={e.lx} y={e.ly}>{e.lt}</text> : null)}
              <g>
                <rect x={a.diagram.center.x} y={a.diagram.center.y} width={a.diagram.center.w} height={a.diagram.center.h} rx={12} fill="#0B1E3D" />
                <text className="nt" x={a.diagram.center.x + a.diagram.center.w / 2} y={a.diagram.center.y + 40} textAnchor="middle" fill="#fff">{product.name}</text>
                {a.diagram.center.sub && <text className="ns" x={a.diagram.center.x + a.diagram.center.w / 2} y={a.diagram.center.y + 60} textAnchor="middle" fill="#9fb3d1">{a.diagram.center.sub}</text>}
                {a.diagram.center.sub2 && <text className="ns" x={a.diagram.center.x + a.diagram.center.w / 2} y={a.diagram.center.y + 76} textAnchor="middle" fill="#9fb3d1">{a.diagram.center.sub2}</text>}
              </g>
              {a.diagram.nodes.map((n, i) => (
                <g key={i} className={n.shop ? 'nd shop' : 'nd'} onMouseEnter={() => n.shop && setFlowLabel('🛒 Pair with: ' + n.pair)} onMouseLeave={() => { if (!playing) setFlowLabel('') }}>
                  <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={10} fill="#fff" stroke="#cbd5e1" />
                  <text className="nt" x={n.x + 16} y={n.y + 28}>{n.title}</text>
                  {n.sub && <text className="ns" x={n.x + 16} y={n.y + 46}>{n.sub}</text>}
                  {n.shop && <text className="nsh" x={n.x + 16} y={n.y + 59}>AV Nepal supplies →</text>}
                </g>
              ))}
              <circle ref={dotRef} r={6} fill={accent} opacity={0} />
            </svg>
            <div className="legend">{a.diagram.legend.map((l, i) => <span key={i}><i style={{ background: l.c }} />{l.t}</span>)}</div>
            <div className="dnote">💡 {a.diagram.note}</div>
          </div>
        </div>
      </section>

      <section className="block soft" id="packs">
        <div className="cw">
          <div className="eyebrow">Ready-made starting points</div><h2>Popular packs</h2>
          <div className="packs">{a.packs.map((p, i) => (
            <div className="pk" key={i}><div className="pt">{p.pt}</div><div className="pf">{p.pf}</div>
              <ul>{p.items.map((it, j) => <li key={j}><span className="d">•</span>{it}</li>)}</ul>
              <Link href={`/contact?product=${encodeURIComponent(p.pt)}`}>Get this pack quoted →</Link></div>
          ))}</div>
        </div>
      </section>

      <section className="block" id="why">
        <div className="cw">
          <div className="eyebrow">Why buy from us</div><h2>You're not buying a box — you're buying a working system</h2>
          <div className="steps">{a.whyUs.map((s, i) => <div className="step" key={i}><div className="num">{i + 1}</div><div className="st">{s.st}</div><div className="sd">{s.sd}</div></div>)}</div>
        </div>
      </section>

      <section className="block soft" id="compare">
        <div className="cw">
          <div className="eyebrow">Choosing a model</div><h2>Where it sits in the range</h2>
          <div className="cmp">{a.compare.map((c, i) => (
            <div className={c.here ? 'c this' : 'c'} key={i}>{c.here && <div className="fm">You're viewing</div>}
              <div className="mn">{c.mn}</div><div className="tier" style={c.here ? { color: accent } : undefined}>{c.tier}</div>
              {c.rows.map((r, j) => <div className="row" key={j}>{j === 0 ? <b>{r}</b> : r}</div>)}</div>
          ))}</div>
          <div className="ch">Not sure which fits? <b style={{ color: accent }}>Send us the floor plan</b> — we'll recommend the right model.</div>
        </div>
      </section>

      {product.keyFeatures?.length ? (
        <section className="block" id="features">
          <div className="cw"><div className="eyebrow">Why this system</div><h2>Key features</h2>
            <div className="feat">{product.keyFeatures.map((f, i) => <div className="fc" key={i}><div className="ft">{f.title}</div><div className="fd">{f.desc}</div></div>)}</div>
          </div>
        </section>
      ) : null}

      <section className="block soft" id="specs">
        <div className="cw"><div className="eyebrow">Technical data</div><h2>Specifications</h2>
          <table><tbody>{specGroups.map((grp, i) => (
            <>{grp.g !== 'Specifications' && <tr className="grp" key={'g' + i}><td colSpan={2}>{grp.g}</td></tr>}
              {grp.rows.map((s, j) => <tr className={s.highlight ? 'hl' : ''} key={i + '-' + j}><td className="l">{s.label}</td><td className="v">{s.value}{s.highlight && <span className="ph">KEY</span>}</td></tr>)}</>
          ))}</tbody></table>
          <div className="dl">
            <Link href={`/contact?product=${encodeURIComponent(product.name)}&inquiry=datasheet`}><span className="ic">📄</span><span><span className="dt">Datasheet</span><br /><span className="dd">Full specs &amp; wiring — sent in 24h</span></span></Link>
            <Link href={`/contact?product=${encodeURIComponent(product.name)}&inquiry=brochure`}><span className="ic">📘</span><span><span className="dt">Product brochure</span><br /><span className="dd">Series overview</span></span></Link>
            <Link href={`/contact?product=${encodeURIComponent(product.name)}&inquiry=engineer`}><span className="ic">🎧</span><span><span className="dt">Talk to an engineer</span><br /><span className="dd">Design &amp; compatibility</span></span></Link>
          </div>
        </div>
      </section>

      <section className="block" id="faq">
        <div className="cw"><div className="eyebrow">Before you ask</div><h2>Common questions</h2>
          <div className="faq">{a.faq.map((f, i) => <details key={i} open={i === 0}><summary>{f.q}</summary><div className="fa">{f.a}</div></details>)}</div>
        </div>
      </section>

      <div className="cw">
        <div className="final">
          <h2>Planning a project?</h2>
          <p>Share your floor plan or BOQ — our engineers size it and send one quotation with installation cost.</p>
          <Link className="btn q" href={`/contact?product=${encodeURIComponent(product.name)}`}>Request a system quote →</Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: scopeCss(`
        .pv2{background:#fff;color:#1e293b;padding-top:80px;font-family:var(--font-display),system-ui,sans-serif}
        .cw{max-width:1120px;margin:0 auto;padding:0 24px}
        .btn{border-radius:999px;padding:10px 18px;font-size:13.5px;font-weight:700;text-decoration:none;display:inline-flex;align-items:center;gap:7px;cursor:pointer;border:none;white-space:nowrap}
        .btn.wa{background:#25D366;color:#fff}.btn.q{background:var(--ac);color:#fff}.btn.c{background:#fff;color:#0B1E3D;border:1px solid rgba(11,30,61,.1)}
        .pv2-sticky{position:fixed;top:0;left:0;right:0;z-index:60;background:rgba(255,255,255,.96);backdrop-filter:blur(8px);border-bottom:1px solid rgba(11,30,61,.1);transform:translateY(-100%);transition:transform .25s}
        .pv2-sticky.show{transform:translateY(0)}
        .pv2-sticky .in{max-width:1120px;margin:0 auto;padding:10px 24px;display:flex;align-items:center;gap:14px}
        .pv2-sticky .nm{font-weight:800;color:#0B1E3D;font-size:15px}.pv2-sticky .nm small{display:block;font-weight:600;color:#64748b;font-size:11.5px}
        .pv2-sticky .sp{flex:1}.pv2-sticky .resp{font-size:11.5px;color:#64748b;font-weight:600}
        .crumb{font-size:13px;color:#64748b;padding:6px 0}.crumb b{color:#0B1E3D}
        .hero{display:grid;grid-template-columns:1fr 1fr;gap:44px;padding:10px 0 40px;align-items:start}
        .shot{position:relative;border-radius:20px;overflow:hidden;background:#F8FAFC;border:1px solid rgba(11,30,61,.1);aspect-ratio:4/3;display:flex;align-items:center;justify-content:center}
        .shot img{width:100%;height:100%;object-fit:contain;padding:22px}
        .shot .fb{color:#0B1E3D;text-align:center;font-weight:800}
        .chips{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
        .chip{font-size:12px;font-weight:700;padding:4px 11px;border-radius:999px;background:var(--acd);color:var(--ac);border:1px solid var(--acl)}
        .badge{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:#fff;background:var(--ac);padding:4px 10px;border-radius:6px}
        h1{font-size:clamp(28px,4vw,40px);font-weight:900;letter-spacing:-.03em;color:#0B1E3D;margin:6px 0 4px;line-height:1.1}
        .tagline{font-size:16px;color:#64748b;font-weight:600;margin-bottom:14px}
        .outcome{font-size:14px;color:#0B1E3D;background:var(--acd);border-left:3px solid var(--ac);border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:16px}
        .glance{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:4px 0 16px}
        .glance .g{background:#F8FAFC;border:1px solid rgba(11,30,61,.1);border-radius:12px;padding:12px 8px;text-align:center}
        .glance .v{font-size:17px;font-weight:900;color:#0B1E3D}.glance .k{font-size:10px;font-weight:700;text-transform:uppercase;color:#64748b;margin-top:3px}
        .ideal{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#64748b;margin-bottom:8px}
        .tags{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:18px}
        .tag{font-size:12px;font-weight:600;color:#475569;background:#F8FAFC;border:1px solid rgba(11,30,61,.1);border-radius:8px;padding:5px 10px}
        .cta{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px}
        .ctanote{font-size:12px;color:#64748b;margin-bottom:16px}.ctanote b{color:var(--ac)}
        .trust{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
        .trust .t{display:flex;gap:9px;align-items:flex-start}
        .trust .ic{width:30px;height:30px;border-radius:8px;background:var(--acd);color:var(--ac);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-weight:900}
        .trust .tt{font-size:12.5px;font-weight:700;color:#0B1E3D;line-height:1.2}.trust .ts{font-size:11px;color:#64748b}
        .pv2-spine{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.97);backdrop-filter:blur(8px);border-top:1px solid rgba(11,30,61,.1);border-bottom:1px solid rgba(11,30,61,.1)}
        .pv2-spine .in{max-width:1120px;margin:0 auto;padding:0 24px;display:flex;gap:6px;overflow-x:auto}
        .pv2-spine a{font-size:13px;font-weight:700;color:#64748b;text-decoration:none;padding:14px 12px;border-bottom:2px solid transparent;white-space:nowrap}
        .pv2-spine a.active{color:var(--ac);border-bottom-color:var(--ac)}
        .block{padding:46px 0;border-top:1px solid rgba(11,30,61,.1);scroll-margin-top:52px}
        .block.soft{background:#F8FAFC}
        .eyebrow{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--ac);margin-bottom:8px}
        h2{font-size:26px;font-weight:900;letter-spacing:-.02em;color:#0B1E3D}
        .lead{font-size:15px;color:#64748b;margin-top:6px;max-width:680px}
        .builder{margin-top:24px;display:grid;grid-template-columns:1fr 1fr;gap:22px;align-items:stretch}
        .bc{background:#fff;border:1px solid rgba(11,30,61,.1);border-radius:20px;padding:24px}
        .bc .q{font-size:12px;font-weight:800;text-transform:uppercase;color:#64748b;margin:0 0 10px}
        .seg{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px}
        .seg button{font:inherit;font-size:13px;font-weight:700;color:#475569;background:#F8FAFC;border:1.5px solid rgba(11,30,61,.1);border-radius:10px;padding:9px 13px;cursor:pointer}
        .seg button.on{background:#0B1E3D;color:#fff;border-color:#0B1E3D}
        .sl{display:flex;justify-content:space-between;font-size:13px;font-weight:700;color:#0B1E3D;margin:0 0 8px}
        .bc input[type=range]{width:100%;accent-color:var(--ac);height:6px;margin-bottom:18px}
        .bnote{font-size:11.5px;color:#64748b;margin-top:8px}
        .bo{background:linear-gradient(135deg,#0B1E3D,#12294d);color:#fff;border-radius:20px;padding:26px;display:flex;flex-direction:column}
        .bo .rec{font-size:12px;font-weight:700;text-transform:uppercase;color:#93b4ff;margin-bottom:6px}
        .bo .host{font-size:23px;font-weight:900}.bo .hostsub{font-size:12.5px;color:rgba(255,255,255,.65);margin-bottom:18px}
        .ogrid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:18px}
        .cell{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px 14px}
        .cell .cv{font-size:20px;font-weight:900;color:#fff}.cell .ck{font-size:11px;color:rgba(255,255,255,.65);font-weight:600}
        .onote{font-size:11.5px;color:rgba(255,255,255,.55);margin-top:auto;margin-bottom:14px}
        .go{background:var(--ac);color:#fff;text-align:center;border-radius:999px;padding:12px;font-weight:800;font-size:14px;text-decoration:none}
        .go small{display:block;font-weight:600;font-size:11px;color:rgba(255,255,255,.85);margin-top:2px}
        .dcard{margin-top:22px;border:1px solid rgba(11,30,61,.1);border-radius:20px;background:#F8FAFC;padding:20px}
        .dtop{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:6px}
        .play{background:#0B1E3D;color:#fff;border:none;border-radius:999px;padding:9px 18px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}.play:disabled{opacity:.5}
        .fl{font-size:13px;color:#64748b;font-weight:600;min-height:20px}
        svg{width:100%;height:auto;display:block;user-select:none}
        .nd.shop{cursor:pointer}.nd.shop:hover rect{stroke:var(--ac);stroke-width:2}
        .nt{font-size:13px;font-weight:800;fill:#0B1E3D}.ns{font-size:10.5px;fill:#64748b}.nsh{font-size:9.5px;font-weight:700;fill:var(--ac)}.el{font-size:10px;fill:#94a3b8;font-weight:600}
        .legend{display:flex;gap:18px;flex-wrap:wrap;margin-top:12px;font-size:12px;color:#64748b}
        .legend span{display:inline-flex;align-items:center;gap:6px}.legend i{width:16px;height:3px;border-radius:2px;display:inline-block}
        .dnote{font-size:12.5px;color:#64748b;margin-top:12px;background:#fff;border:1px dashed var(--acl);border-radius:10px;padding:10px 12px}
        .packs{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:22px}
        .pk{border:1px solid rgba(11,30,61,.1);border-radius:16px;padding:20px;background:#fff}
        .pk .pt{font-weight:900;color:#0B1E3D;font-size:15px}.pk .pf{font-size:12px;color:#64748b;margin:2px 0 12px}
        .pk ul{list-style:none;display:flex;flex-direction:column;gap:6px;margin-bottom:14px;padding:0}
        .pk li{font-size:12.5px;color:#475569;display:flex;gap:8px}.pk li .d{color:var(--ac);font-weight:900}
        .pk a{font-size:12.5px;font-weight:700;color:var(--ac);text-decoration:none}
        .steps{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:22px}
        .step{border:1px solid rgba(11,30,61,.1);border-radius:14px;padding:18px 14px;background:#fff}
        .step .num{width:26px;height:26px;border-radius:8px;background:var(--ac);color:#fff;font-weight:900;font-size:13px;display:flex;align-items:center;justify-content:center;margin-bottom:10px}
        .step .st{font-weight:800;color:#0B1E3D;font-size:13.5px}.step .sd{font-size:12px;color:#64748b;margin-top:3px}
        .cmp{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:22px}
        .cmp .c{border:1px solid rgba(11,30,61,.1);border-radius:16px;padding:20px;background:#fff;text-align:center}
        .cmp .c.this{border:2px solid var(--ac);position:relative}
        .cmp .fm{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:var(--ac);color:#fff;font-size:10px;font-weight:800;text-transform:uppercase;padding:3px 12px;border-radius:999px}
        .cmp .mn{font-weight:900;color:#0B1E3D;font-size:16px}.cmp .tier{font-size:11px;font-weight:700;text-transform:uppercase;color:#64748b;margin:2px 0 12px}
        .cmp .row{font-size:12.5px;color:#475569;padding:6px 0;border-top:1px solid rgba(11,30,61,.1)}.cmp .row b{color:#0B1E3D}
        .ch{text-align:center;font-size:13px;color:#64748b;margin-top:16px}
        .feat{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:22px}
        .fc{border:1px solid rgba(11,30,61,.1);border-radius:14px;padding:18px;background:#fff}
        .fc .ft{font-weight:800;color:#0B1E3D;font-size:14.5px;margin-bottom:5px}.fc .fd{font-size:13px;color:#64748b}
        table{width:100%;border-collapse:collapse;margin-top:18px;font-size:14px}
        .grp td{background:#0B1E3D;color:#fff;font-weight:800;font-size:11px;text-transform:uppercase;letter-spacing:.06em;padding:8px 14px}
        td{padding:11px 14px;border-bottom:1px solid rgba(11,30,61,.1)}
        td.l{color:#64748b;width:42%}td.v{color:#0B1E3D;font-weight:700}tr.hl td.v{color:var(--ac)}
        .ph{font-size:10px;font-weight:800;color:var(--ac);border:1px solid var(--acl);border-radius:999px;padding:1px 7px;margin-left:8px}
        .dl{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:22px}
        .dl a{border:1px solid rgba(11,30,61,.1);border-radius:14px;padding:18px;background:#fff;text-decoration:none;display:flex;gap:12px;align-items:center}
        .dl .ic{font-size:22px}.dl .dt{font-weight:800;color:#0B1E3D;font-size:13.5px}.dl .dd{font-size:11.5px;color:#64748b}
        details{border-bottom:1px solid rgba(11,30,61,.1)}
        summary{cursor:pointer;list-style:none;padding:16px 4px;font-weight:700;color:#0B1E3D;font-size:15px;display:flex;justify-content:space-between;align-items:center}
        summary::-webkit-details-marker{display:none}summary::after{content:'+';color:var(--ac);font-weight:900;font-size:20px}
        details[open] summary::after{content:'−'}.fa{padding:0 4px 18px;font-size:13.5px;color:#475569}
        .final{margin:34px 0 90px;border-radius:22px;background:linear-gradient(135deg,#0B1E3D,#12294d);padding:40px 30px;text-align:center;color:#fff}
        .final h2{color:#fff}.final p{color:rgba(255,255,255,.75);max-width:460px;margin:10px auto 20px;font-size:14.5px}
        @media(max-width:860px){.hero,.builder{grid-template-columns:1fr}.glance{grid-template-columns:repeat(2,1fr)}.feat,.dl,.packs{grid-template-columns:1fr}.steps{grid-template-columns:1fr 1fr}.cmp{grid-template-columns:1fr}.pv2-sticky .resp{display:none}}
      `) }} />
    </main>
  )
}
