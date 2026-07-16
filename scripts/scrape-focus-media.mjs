#!/usr/bin/env node
/**
 * scrape-focus-media.mjs (v3) — reliable real podium photos via og:image + date-folder.
 * Each gzfocus product page exposes its clean hero as <meta og:image> (reliably present
 * in <head>), and every one of that product's own photos lives in the SAME dated upload
 * folder (e.g. /20240810/), while shared header/footer/spec decorations use other dates.
 * v3 takes og:image as the hero and keeps only img03 images from the hero's date-folder
 * as the gallery — cleanly isolating each product's real photos. Self-hosts them.
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

const clean = (u) => u.split('?')[0]

async function grab(url, outFile, quality) {
  const r = await fetch(url, { headers: UA })
  if (!r.ok) return false
  const buf = Buffer.from(await r.arrayBuffer())
  if (buf.length < 4000) return false
  const meta = await sharp(buf).metadata().catch(() => null)
  if (!meta || (meta.width || 0) < 300 || (meta.height || 0) < 300) return false
  await sharp(buf).resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }).webp({ quality }).toFile(outFile)
  return true
}

let ok = 0, fail = 0
for (const [slug, url] of Object.entries(MANIFEST)) {
  try {
    const res = await fetch(url, { headers: UA })
    if (!res.ok) { console.error('miss', slug, res.status); fail++; continue }
    const html = await res.text()
    const og = html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1]
      || html.match(/content="([^"]+)"\s+property="og:image"/i)?.[1]
    if (!og) { console.error('no og:image', slug); fail++; continue }
    const dateDir = (clean(og).match(/\/(\d{8})\//) || [])[1]
    // all img03 product images sharing the hero's date-folder = this product's own photos
    const all = [...html.matchAll(/https:\/\/img03\.71360\.com\/[A-Za-z0-9_\/-]+\.(?:jpg|jpeg|png|webp)/gi)].map((m) => clean(m[0]))
    const same = dateDir ? all.filter((u) => u.includes(`/${dateDir}/`)) : []
    const ordered = [clean(og), ...same.filter((u) => u !== clean(og))]
    const uniq = [...new Set(ordered)]

    const locals = []
    let n = 1
    for (const u of uniq) {
      if (locals.length >= 5) break
      const f = n === 1 ? `${slug}.webp` : `${slug}-g${n}.webp`
      if (await grab(u, resolve(OUT_IMG, f), 82)) { locals.push(`/images/focus-catalog/${f}`); n++ }
    }
    if (!locals.length) { console.error('downloads failed', slug); fail++; continue }
    media[slug] = { img: locals[0], gallery: locals.slice(1, 5), source: url }
    ok++
    await new Promise((r) => setTimeout(r, 150))
  } catch (e) { console.error('err', slug, e.message); fail++ }
}
writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
console.log(`ok: ${ok}, fail: ${fail}`)
if (ok === 0) process.exit(1)
