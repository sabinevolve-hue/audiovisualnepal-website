#!/usr/bin/env node
/**
 * scrape-lampro-media.mjs — Fetch official Lampro series pages (known manifest),
 * extract main image + description, self-host. Runs in GitHub Actions.
 */
import { mkdirSync, writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_IMG = resolve(ROOT, 'public/images/lampro-catalog')
const OUT_JSON = resolve(ROOT, 'src/data/lampro-catalog-media.json')
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; AudioVisualNepal-catalog/1.0)' }
const B = 'https://www.lampro.net/products/'

const MANIFEST = {
  'LMini': 'lmini-series-lampro.html',
  'LMini P': 'lmini-p-series-lampro.html',
  'LHP': 'lhp-series-lampro.html',
  'BNXII': 'bnxii-series-lampro.html',
  'LRS': 'lrs-series-lampro.html',
  'RNII': 'rnii-series-led-rental-lampro.html',
  'LRM': 'lrm-series-lampro.html',
  'LXII Pro': 'lxiipro-series-lampro.html',
  'LS Pro': 'lspro-series-lampro.html',
  'LST': 'lst-series-lampro.html',
  'LSK': 'lsk-series-lampro.html',
  'WNX': 'wnx-series-lampro.html',
  'WX': 'wx-series-lampro.html',
  'LCF': 'lcf-series-lampro.html',
  'LC COB': 'lc-cob-series-lampro.html',
  'LCM': 'lcm-lampro-led-module.html',
  'LW': 'lw-series-lampro.html',
  'LDAII': 'ldaii-series.html',
  'LDT': 'ldt-series-lampro.html',
  'LC': 'lc-series-lampro.html',
}

mkdirSync(OUT_IMG, { recursive: true })
let media = {}
try { media = JSON.parse(readFileSync(OUT_JSON, 'utf8')) } catch {}

let hits = 0
for (const [model, path] of Object.entries(MANIFEST)) {
  if (media[model]) continue
  try {
    const res = await fetch(B + path, { headers: UA })
    if (!res.ok) { console.log('miss', model, res.status); continue }
    const html = await res.text()
    let og = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1]
      || html.match(/content="([^"]+)"\s+property="og:image"/)?.[1]
    if (!og) {
      const m = html.match(/(?:src|data-src)="((?:https?:)?\/\/?[^"]*(?:upload|static|uploads)[^"]*\.(?:png|jpg|jpeg|webp))"/i)
      if (m) og = m[1].startsWith('http') ? m[1] : 'https://www.lampro.net' + (m[1].startsWith('/') ? m[1] : '/' + m[1])
    }
    const desc = html.match(/name="description"\s+content="([^"]+)"/)?.[1] || ''
    if (!og) { console.log('no image', model); continue }
    const imgRes = await fetch(og, { headers: UA })
    if (!imgRes.ok) continue
    const slug = model.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const buf = Buffer.from(await imgRes.arrayBuffer())
    await sharp(buf).resize(1000, 1000, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(resolve(OUT_IMG, `${slug}.webp`))
    media[model] = { slug, img: `/images/lampro-catalog/${slug}.webp`, desc: desc.slice(0, 300), source: B + path }
    hits++
    await new Promise((r) => setTimeout(r, 150))
  } catch (e) { console.log('err', model, e.message) }
}
writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
console.log(`matched: ${hits} of ${Object.keys(MANIFEST).length}`)
