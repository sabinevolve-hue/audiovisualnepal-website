#!/usr/bin/env node
/**
 * scrape-focus-media.mjs — Fetch official Focus (gzfocus.com) smart-podium product
 * pages, extract per-product gallery images, self-host. Fixes wrong-image bug where
 * several Focus SKUs reused another product's photo. Runs in GitHub Actions.
 */
import { mkdirSync, writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_IMG = resolve(ROOT, 'public/images/focus-catalog')
const OUT_JSON = resolve(ROOT, 'src/data/focus-catalog-media.json')
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; AudioVisualNepal-catalog/1.0)' }

// slug -> official gzfocus product page (verified on product-200002.html)
const MANIFEST = {
  'focus-st100':  'https://www.gzfocus.com/product-item-10.html',
  'focus-st200':  'https://www.gzfocus.com/product-item-11.html',
  'focus-st400':  'https://www.gzfocus.com/product-item-12.html',
  'focus-fk535n': 'https://www.gzfocus.com/product-item-14.html',
  'focus-fk500n': 'https://www.gzfocus.com/product-item-16.html',
  'focus-st600':  'https://www.gzfocus.com/product-item-50.html',
}

// shared header/footer/decorative images to exclude
const DECOR = new Set([
  '45ed5f0a70aec7d08994218558f8724d', '5f8133f492443bfd5b9deddfb47b90ca',
  'f218b3a11d97ee465d740ad47e8ac982', '79016aeaffebcdf3cbd727b477430615',
  'd4dc435195a32901256cff04d45e227e', '219cd532a15082fc270c524dc5daaa48',
  '1b78b4ec62395e9d017fdd0d4465ab18', '41c2ee1ad627607d96cf7765f9349112',
  'b923e7bbe7108c8becc2e9773fd9d417', 'b8c', 'fb42988f237ac01bc57008794f28e17a',
])

mkdirSync(OUT_IMG, { recursive: true })
let media = {}
try { media = JSON.parse(readFileSync(OUT_JSON, 'utf8')) } catch {}

let ok = 0, fail = 0
for (const [slug, url] of Object.entries(MANIFEST)) {
  try {
    const res = await fetch(url, { headers: UA })
    if (!res.ok) { console.error('miss', slug, res.status); fail++; continue }
    const html = await res.text()
    const raw = [...html.matchAll(/https:\/\/img03\.71360\.com\/w3\/2vzk06\/[^\s"')]+\.(?:jpg|jpeg|png|webp)/gi)].map((m) => m[0])
    const imgs = [...new Set(raw)].filter((u) => {
      const id = (u.match(/\/([0-9a-f]{32})\./) || [])[1]
      return id && !DECOR.has(id)
    }).slice(0, 5)
    if (!imgs.length) { console.error('no product imgs', slug); fail++; continue }
    const locals = []
    let n = 1
    for (const u of imgs) {
      try {
        const ir = await fetch(u, { headers: UA })
        if (!ir.ok) continue
        const buf = Buffer.from(await ir.arrayBuffer())
        const f = n === 1 ? `${slug}.webp` : `${slug}-g${n}.webp`
        await sharp(buf).resize(1000, 1000, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(resolve(OUT_IMG, f))
        locals.push(`/images/focus-catalog/${f}`)
        n++
      } catch {}
    }
    if (!locals.length) { fail++; continue }
    media[slug] = { img: locals[0], gallery: locals.slice(1, 5), source: url }
    ok++
    await new Promise((r) => setTimeout(r, 200))
  } catch (e) { console.error('err', slug, e.message); fail++ }
}
writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
console.log(`ok: ${ok}, fail: ${fail}`)
if (ok === 0) process.exit(1)
