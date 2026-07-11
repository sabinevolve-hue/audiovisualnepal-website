#!/usr/bin/env node
/**
 * scrape-infobit-media.mjs (v3) — For every model in infobit-catalog.json, try the official
 * infobitav.com product page; extract main image + meta description; download, optimize,
 * self-host. Writes src/data/infobit-catalog-media.json. Runs in GitHub Actions.
 */
import { mkdirSync, writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_IMG = resolve(ROOT, 'public/images/infobit-catalog')
const OUT_JSON = resolve(ROOT, 'src/data/infobit-catalog-media.json')
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; AudioVisualNepal-catalog/1.0)' }

const catalog = JSON.parse(readFileSync(resolve(ROOT, 'src/data/infobit-catalog.json'), 'utf8'))
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const models = []
for (const c of catalog.categories)
  for (const s of c.series)
    for (const g of s.groups)
      for (const m of g.models) models.push(m)

mkdirSync(OUT_IMG, { recursive: true })
let existing = {}
try { existing = JSON.parse(readFileSync(OUT_JSON, 'utf8')) } catch {}

const media = existing
let hits = 0, misses = 0, skipped = 0
const norm = (x) => x.toLowerCase().replace(/[^a-z0-9]/g, '')

// sitemap URL pool for fallback matching
let poolUrls = []
try {
  const idx = await (await fetch('https://www.infobitav.com/sitemap_index.xml', { headers: UA })).text()
  const subs = [...idx.matchAll(/https:[^<]+\.xml/g)].map((m) => m[0])
  for (const sub of subs) {
    const x = await (await fetch(sub, { headers: UA })).text()
    poolUrls.push(...[...x.matchAll(/https:\/\/www\.infobitav\.com\/[a-z0-9-]+\//g)].map((m) => m[0]))
  }
} catch {}
console.log('sitemap pool:', poolUrls.length)

for (const model of models) {
  const slug = slugify(model)
  if (media[model]) { skipped++; continue }
  try {
    let res = await fetch(`https://www.infobitav.com/${slug}/`, { headers: UA, redirect: 'follow' })
    if (!res.ok) {
      const key = norm(model)
      const cand = key.length >= 5
        ? poolUrls.filter((u) => norm(u.split('.com/')[1]).includes(key)).sort((a, b) => a.length - b.length)[0]
        : null
      if (cand) res = await fetch(cand, { headers: UA, redirect: 'follow' })
    }
    if (!res.ok) { misses++; continue }
    const html = await res.text()
    const og = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1]
      || html.match(/content="([^"]+)"\s+property="og:image"/)?.[1]
      || html.match(/https:\/\/www\.infobitav\.com\/wp-content\/uploads\/[^"'\s)]+-B1[^"'\s)]*\.(?:webp|png|jpg)/)?.[0]
    const desc = html.match(/property="og:description"\s+content="([^"]+)"/)?.[1]
      || html.match(/name="description"\s+content="([^"]+)"/)?.[1] || ''
    if (!og) { misses++; continue }
    const imgRes = await fetch(og, { headers: UA })
    if (!imgRes.ok) { misses++; continue }
    const buf = Buffer.from(await imgRes.arrayBuffer())
    await sharp(buf).resize(1000, 1000, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(resolve(OUT_IMG, `${slug}.webp`))
    media[model] = {
      slug,
      img: `/images/infobit-catalog/${slug}.webp`,
      desc: desc.replace(/&amp;/g, '&').replace(/&#\d+;/g, '').slice(0, 300),
      source: `https://www.infobitav.com/${slug}/`,
    }
    hits++
    if (hits % 25 === 0) writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
    await new Promise((r) => setTimeout(r, 120))
  } catch { misses++ }
}

writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
console.log(`hits: ${hits}, misses: ${misses}, skipped(existing): ${skipped}, total in media: ${Object.keys(media).length}`)
if (Object.keys(media).length === 0) process.exit(1)
