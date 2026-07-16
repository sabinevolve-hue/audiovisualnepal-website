#!/usr/bin/env node
/**
 * scrape-lampro-media.mjs (v5) — CURATED per-model imagery.
 * Lampro's series pages have NO og:image and lazy-load the hero via JS, so older
 * heuristics grabbed the wrong asset. v5 instead reads each model's OWN official
 * series page and self-hosts its inline product images (hero + up to 4 gallery),
 * preferring the /media/tmp/.../page/ content images that are unique to that model.
 * Force-refreshes every model so previously-wrong images are corrected.
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

const abs = (u) => (u.startsWith('http') ? u : 'https://www.lampro.net' + (u.startsWith('/') ? u : '/' + u))

// Collect inline product images from a series page, in document order, deduped,
// preferring the model-specific /media/tmp/.../page/ content images.
function extractImages(html) {
  const raw = [...html.matchAll(/(?:src|data-src|data-original)="([^"]*\/media\/[^"]+\.(?:webp|png|jpe?g))"/gi)].map((m) => abs(m[1]))
  const seen = new Set()
  const uniq = raw.filter((u) => (seen.has(u) ? false : (seen.add(u), true)))
  // drop obvious non-product assets (logos, icons, flags, qrcodes, avatars)
  const clean = uniq.filter((u) => !/(logo|icon|flag|qrcode|avatar|share|wechat|weixin|favicon)/i.test(u))
  const page = clean.filter((u) => /\/media\/tmp\/[^"]*\/page\//i.test(u))
  const rest = clean.filter((u) => !page.includes(u))
  return [...page, ...rest]
}

async function grab(url, outFile, quality) {
  const r = await fetch(url, { headers: UA })
  if (!r.ok) return false
  const buf = Buffer.from(await r.arrayBuffer())
  if (buf.length < 2000) return false // skip tiny spacers/icons
  await sharp(buf).resize(1000, 1000, { fit: 'inside', withoutEnlargement: true }).webp({ quality }).toFile(outFile)
  return true
}

let fixed = 0
for (const [model, path] of Object.entries(MANIFEST)) {
  try {
    const res = await fetch(B + path, { headers: UA })
    if (!res.ok) { console.log('miss', model, res.status); continue }
    const html = await res.text()
    const imgs = extractImages(html)
    if (!imgs.length) { console.log('no product images', model); continue }

    const prev = media[model] || {}
    const slug = prev.slug || model.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const metaDesc = html.match(/name="description"\s+content="([^"]+)"/)?.[1] || ''

    // hero = first product image
    const heroOk = await grab(imgs[0], resolve(OUT_IMG, `${slug}.webp`), 80)
    if (!heroOk) { console.log('hero failed', model); continue }

    // gallery = next distinct product images (up to 4)
    const gallery = []
    let n = 2
    for (const u of imgs.slice(1)) {
      if (gallery.length >= 4) break
      const f = `${slug}-g${n}.webp`
      if (await grab(u, resolve(OUT_IMG, f), 78)) { gallery.push(`/images/lampro-catalog/${f}`); n++ }
    }

    media[model] = {
      slug,
      img: `/images/lampro-catalog/${slug}.webp`,
      desc: (prev.desc && prev.desc.length > 40) ? prev.desc : metaDesc.slice(0, 300),
      source: B + path,
      ...(gallery.length ? { gallery } : {}),
    }
    fixed++
    console.log('ok', model, '→ hero + ' + gallery.length + ' gallery')
    await new Promise((r) => setTimeout(r, 150))
  } catch (e) { console.log('err', model, e.message) }
}

writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
console.log(`refreshed imagery for ${fixed} of ${Object.keys(MANIFEST).length} models`)
