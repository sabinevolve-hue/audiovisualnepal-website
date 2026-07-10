#!/usr/bin/env node
/**
 * scrape-tenveo-media.mjs — Match Tenveo catalog models against the official
 * Shopify store (tenveocamera.com products.json), download the primary image,
 * self-host, and store a short pricing-free summary. Runs in GitHub Actions.
 */
import { mkdirSync, writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_IMG = resolve(ROOT, 'public/images/tenveo-catalog')
const OUT_JSON = resolve(ROOT, 'src/data/tenveo-catalog-media.json')
const norm = (s) => s.toLowerCase().replace(/^tevo-?/, '').replace(/[^a-z0-9]/g, '')

const catalog = JSON.parse(readFileSync(resolve(ROOT, 'src/data/tenveo-catalog.json'), 'utf8'))
const models = []
for (const c of catalog.categories)
  for (const s of c.series)
    for (const g of s.groups)
      for (const m of g.models) models.push(m)

// pull the full store
const store = []
for (let page = 1; page <= 8; page++) {
  const r = await fetch(`https://www.tenveocamera.com/products.json?limit=250&page=${page}`)
  if (!r.ok) break
  const j = await r.json()
  if (!j.products?.length) break
  store.push(...j.products)
}
console.log('store products:', store.length)

mkdirSync(OUT_IMG, { recursive: true })
let media = {}
try { media = JSON.parse(readFileSync(OUT_JSON, 'utf8')) } catch {}

const strip = (h) => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
let hits = 0
for (const model of models) {
  if (media[model]) continue
  const key = norm(model)
  if (key.length < 3) continue
  const hit = store.find((p) =>
    p.variants?.some((v) => v.sku && norm(v.sku) === key) ||
    norm(p.handle).includes(key) ||
    p.variants?.some((v) => v.sku && norm(v.sku).includes(key))
  )
  if (!hit || !hit.images?.length) continue
  try {
    const imgRes = await fetch(hit.images[0].src)
    if (!imgRes.ok) continue
    const slug = model.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const buf = Buffer.from(await imgRes.arrayBuffer())
    await sharp(buf).resize(1000, 1000, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(resolve(OUT_IMG, `${slug}.webp`))
    media[model] = {
      slug,
      img: `/images/tenveo-catalog/${slug}.webp`,
      desc: (hit.title + '. ' + strip(hit.body_html || '')).slice(0, 280),
      source: `https://www.tenveocamera.com/products/${hit.handle}`,
    }
    hits++
    await new Promise((r) => setTimeout(r, 100))
  } catch { /* skip */ }
}
writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
console.log(`matched: ${hits}, total media: ${Object.keys(media).length} of ${models.length} models`)
