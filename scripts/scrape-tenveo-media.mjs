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
// GALLERY BACKFILL from Shopify image arrays
let gAdded = 0
for (const [model, e] of Object.entries(media)) {
  if (e.gallery || !e.source || !e.source.includes('tenveocamera.com')) continue
  const handle = e.source.split('/products/')[1]
  const hitP = store.find((p) => p.handle === handle)
  if (!hitP || !hitP.images || hitP.images.length < 2) continue
  const gallery = []
  let n = 2
  for (const img of hitP.images.slice(1, 5)) {
    try {
      const ir = await fetch(img.src)
      if (!ir.ok) continue
      const buf = Buffer.from(await ir.arrayBuffer())
      const f = `${e.slug}-g${n}.webp`
      await sharp(buf).resize(1000, 1000, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 76 }).toFile(resolve(OUT_IMG, f))
      gallery.push(`/images/tenveo-catalog/${f}`)
      n++
    } catch {}
  }
  if (gallery.length) { e.gallery = gallery; gAdded++ }
  await new Promise((r) => setTimeout(r, 100))
}
console.log('galleries added:', gAdded)

// pass 2: manufacturer site sitemap for models the store didn't carry
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; AudioVisualNepal-catalog/1.0)' }
let poolUrls = []
try {
  for (const smUrl of ['https://www.tenveo-video-conference.com/sitemap.xml', 'https://www.tenveo-video-conference.com/sitemap_index.xml']) {
    const x = await (await fetch(smUrl, { headers: UA })).text()
    poolUrls.push(...[...x.matchAll(/https:\/\/www\.tenveo-video-conference\.com\/[a-z0-9-]+/g)].map((m) => m[0]))
    if (poolUrls.length) break
  }
} catch {}
console.log('manufacturer sitemap pool:', poolUrls.length)
for (const model of models) {
  if (media[model]) continue
  const key = norm(model)
  if (key.length < 4) continue
  const cand = poolUrls.filter((u) => norm(u.split('.com/')[1] || '').includes(key)).sort((a, b) => a.length - b.length)[0]
  if (!cand) continue
  try {
    const res = await fetch(cand, { headers: UA })
    if (!res.ok) continue
    const html = await res.text()
    const og = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1] || html.match(/content="([^"]+)"\s+property="og:image"/)?.[1]
    const desc = html.match(/property="og:description"\s+content="([^"]+)"/)?.[1] || html.match(/name="description"\s+content="([^"]+)"/)?.[1] || ''
    if (!og) continue
    const imgRes = await fetch(og, { headers: UA })
    if (!imgRes.ok) continue
    const slug = model.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    const buf = Buffer.from(await imgRes.arrayBuffer())
    await sharp(buf).resize(1000, 1000, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(resolve(OUT_IMG, `${slug}.webp`))
    media[model] = { slug, img: `/images/tenveo-catalog/${slug}.webp`, desc: desc.slice(0, 280), source: cand }
    hits++
    await new Promise((r) => setTimeout(r, 120))
  } catch { /* skip */ }
}
writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
console.log(`matched: ${hits}, total media: ${Object.keys(media).length} of ${models.length} models`)
