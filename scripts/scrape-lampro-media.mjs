#!/usr/bin/env node
/**
 * scrape-lampro-media.mjs (v6) — CURATED per-model imagery via cross-page dedup.
 * Lampro series pages share ~5 decorative /media images at the top of every page,
 * which earlier heuristics wrongly picked (identical hero for all models). v6 does a
 * two-pass scan: collect every /media image on all 20 pages, drop any that appears on
 * more than one page (shared chrome/decoration), then per model keep only the images
 * UNIQUE to that page — those are the real product photos. Force-refreshes all models.
 */
import { mkdirSync, writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_IMG = resolve(ROOT, 'public/images/lampro-catalog')
const OUT_JSON = resolve(ROOT, 'src/data/lampro-catalog-media.json')
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36' }
const B = 'https://www.lampro.net/products/'

const MANIFEST = {
  'LMini': 'lmini-series-lampro.html', 'LMini P': 'lmini-p-series-lampro.html',
  'LHP': 'lhp-series-lampro.html', 'BNXII': 'bnxii-series-lampro.html',
  'LRS': 'lrs-series-lampro.html', 'RNII': 'rnii-series-led-rental-lampro.html',
  'LRM': 'lrm-series-lampro.html', 'LXII Pro': 'lxiipro-series-lampro.html',
  'LS Pro': 'lspro-series-lampro.html', 'LST': 'lst-series-lampro.html',
  'LSK': 'lsk-series-lampro.html', 'WNX': 'wnx-series-lampro.html',
  'WX': 'wx-series-lampro.html', 'LCF': 'lcf-series-lampro.html',
  'LC COB': 'lc-cob-series-lampro.html', 'LCM': 'lcm-lampro-led-module.html',
  'LW': 'lw-series-lampro.html', 'LDAII': 'ldaii-series.html',
  'LDT': 'ldt-series-lampro.html', 'LC': 'lc-series-lampro.html',
}

mkdirSync(OUT_IMG, { recursive: true })
let media = {}
try { media = JSON.parse(readFileSync(OUT_JSON, 'utf8')) } catch {}

const absUrl = (u) => (u.startsWith('http') ? u : 'https://www.lampro.net' + (u.startsWith('/') ? u : '/' + u))

// Every /media image URL anywhere in the HTML, in document order, deduped within page.
function pageImages(html) {
  const raw = [...html.matchAll(/\/media\/[A-Za-z0-9_\-\/.]+?\.(?:webp|png|jpe?g)/gi)].map((m) => absUrl(m[0]))
  const drop = /(logo|icon|flag|qrcode|avatar|share|wechat|weixin|favicon|placeholder|loading|blank|spacer)/i
  const seen = new Set()
  return raw.filter((u) => (!drop.test(u) && !seen.has(u)) ? (seen.add(u), true) : false)
}

// PASS 1 — fetch every page, record image lists + global frequency
const pages = {}
const freq = new Map()
for (const [model, path] of Object.entries(MANIFEST)) {
  try {
    const res = await fetch(B + path, { headers: UA })
    if (!res.ok) { console.log('miss', model, res.status); pages[model] = []; continue }
    const html = await res.text()
    const imgs = pageImages(html)
    pages[model] = imgs
    for (const u of new Set(imgs)) freq.set(u, (freq.get(u) || 0) + 1)
    await new Promise((r) => setTimeout(r, 120))
  } catch (e) { console.log('err p1', model, e.message); pages[model] = [] }
}

async function grab(url, outFile, quality) {
  const r = await fetch(url, { headers: UA })
  if (!r.ok) return false
  const buf = Buffer.from(await r.arrayBuffer())
  if (buf.length < 3000) return false // shared spacers/decorations are tiny
  const meta = await sharp(buf).metadata().catch(() => null)
  if (!meta || (meta.width || 0) < 200 || (meta.height || 0) < 200) return false
  await sharp(buf).resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }).webp({ quality }).toFile(outFile)
  return true
}

// PASS 2 — per model, keep images UNIQUE to that page (freq === 1) = real product photos
let fixed = 0
for (const [model, path] of Object.entries(MANIFEST)) {
  try {
    const unique = pages[model].filter((u) => freq.get(u) === 1)
    if (!unique.length) { console.log('no unique images', model); continue }
    const prev = media[model] || {}
    const slug = prev.slug || model.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

    const heroOk = await grab(unique[0], resolve(OUT_IMG, `${slug}.webp`), 82)
    if (!heroOk) { console.log('hero failed', model); continue }

    const gallery = []
    let n = 2
    for (const u of unique.slice(1)) {
      if (gallery.length >= 4) break
      const f = `${slug}-g${n}.webp`
      if (await grab(u, resolve(OUT_IMG, f), 80)) { gallery.push(`/images/lampro-catalog/${f}`); n++ }
    }

    media[model] = {
      slug,
      img: `/images/lampro-catalog/${slug}.webp`,
      desc: prev.desc || '',
      source: B + path,
      ...(gallery.length ? { gallery } : {}),
    }
    fixed++
    console.log('ok', model, '→ hero +', gallery.length, 'gallery (', unique.length, 'unique available )')
  } catch (e) { console.log('err p2', model, e.message) }
}

writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
console.log(`refreshed imagery for ${fixed} of ${Object.keys(MANIFEST).length} models`)
