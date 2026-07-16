#!/usr/bin/env node
/**
 * scrape-focus-media.mjs (v2) — real per-product podium photos via cross-page dedup.
 * gzfocus product pages share header/footer/spec decorations and lazy-load a tiny
 * placeholder as the first image (the old 664B broken hero). v2 collects every
 * img03.71360.com image across all 6 product pages, drops any that appears on more
 * than one page (shared chrome), rejects tiny/low-res files on download, and keeps
 * only the images UNIQUE to each product = the real podium shots. Self-hosts them.
 */
import { mkdirSync, writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_IMG = resolve(ROOT, 'public/images/focus-catalog')
const OUT_JSON = resolve(ROOT, 'src/data/focus-catalog-media.json')
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36' }

const MANIFEST = {
  'focus-st100':  'https://www.gzfocus.com/product-item-10.html',
  'focus-st200':  'https://www.gzfocus.com/product-item-11.html',
  'focus-st400':  'https://www.gzfocus.com/product-item-12.html',
  'focus-fk535n': 'https://www.gzfocus.com/product-item-14.html',
  'focus-fk500n': 'https://www.gzfocus.com/product-item-16.html',
  'focus-st600':  'https://www.gzfocus.com/product-item-50.html',
}

mkdirSync(OUT_IMG, { recursive: true })
let media = {}
try { media = JSON.parse(readFileSync(OUT_JSON, 'utf8')) } catch {}

const imgRe = /https:\/\/img03\.71360\.com\/[A-Za-z0-9_\/-]+\/[0-9a-f]{6,}\.(?:jpg|jpeg|png|webp)/gi
function pageImages(html) {
  const raw = [...html.matchAll(imgRe)].map((m) => m[0])
  const seen = new Set()
  return raw.filter((u) => (seen.has(u) ? false : (seen.add(u), true)))
}

// PASS 1 — collect per-page images + global frequency
const pages = {}
const freq = new Map()
for (const [slug, url] of Object.entries(MANIFEST)) {
  try {
    const res = await fetch(url, { headers: UA })
    if (!res.ok) { console.error('miss', slug, res.status); pages[slug] = []; continue }
    const html = await res.text()
    const imgs = pageImages(html)
    pages[slug] = imgs
    for (const u of new Set(imgs)) freq.set(u, (freq.get(u) || 0) + 1)
    await new Promise((r) => setTimeout(r, 180))
  } catch (e) { console.error('p1 err', slug, e.message); pages[slug] = [] }
}

async function grab(url, outFile, quality) {
  const r = await fetch(url, { headers: UA })
  if (!r.ok) return false
  const buf = Buffer.from(await r.arrayBuffer())
  if (buf.length < 4000) return false            // kills the 664B placeholder + icons
  const meta = await sharp(buf).metadata().catch(() => null)
  if (!meta || (meta.width || 0) < 300 || (meta.height || 0) < 300) return false
  await sharp(buf).resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }).webp({ quality }).toFile(outFile)
  return true
}

// PASS 2 — keep only images unique to each product page
let ok = 0, fail = 0
for (const [slug, url] of Object.entries(MANIFEST)) {
  try {
    const unique = pages[slug].filter((u) => freq.get(u) === 1)
    if (!unique.length) { console.error('no unique imgs', slug); fail++; continue }
    const locals = []
    let n = 1
    for (const u of unique) {
      if (locals.length >= 5) break
      const f = n === 1 ? `${slug}.webp` : `${slug}-g${n}.webp`
      if (await grab(u, resolve(OUT_IMG, f), 82)) { locals.push(`/images/focus-catalog/${f}`); n++ }
    }
    if (!locals.length) { console.error('all downloads failed', slug); fail++; continue }
    media[slug] = { img: locals[0], gallery: locals.slice(1, 5), source: url }
    ok++
    await new Promise((r) => setTimeout(r, 150))
  } catch (e) { console.error('p2 err', slug, e.message); fail++ }
}
writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
console.log(`ok: ${ok}, fail: ${fail}`)
if (ok === 0) process.exit(1)
