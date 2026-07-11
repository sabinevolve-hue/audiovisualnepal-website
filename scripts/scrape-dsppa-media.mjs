#!/usr/bin/env node
/**
 * scrape-dsppa-media.mjs — Match DSPPA catalog models against dsppatech.com via
 * sitemap URL tokens, scrape og:image + description, self-host. Runs in Actions.
 */
import { mkdirSync, writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_IMG = resolve(ROOT, 'public/images/dsppa-catalog')
const OUT_JSON = resolve(ROOT, 'src/data/dsppa-catalog-media.json')
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; AudioVisualNepal-catalog/1.0)' }
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '')
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const catalog = JSON.parse(readFileSync(resolve(ROOT, 'src/data/dsppa-catalog.json'), 'utf8'))
const models = []
for (const c of catalog.categories) for (const s of c.series) for (const g of s.groups) for (const m of g.models) models.push(m)

const sm = await (await fetch('https://www.dsppatech.com/sitemap.xml', { headers: UA })).text()
const urls = [...sm.matchAll(/https:\/\/www\.dsppatech\.com\/[a-z0-9-]+/g)].map((m) => m[0])
console.log('sitemap urls:', urls.length)

mkdirSync(OUT_IMG, { recursive: true })
let media = {}
try { media = JSON.parse(readFileSync(OUT_JSON, 'utf8')) } catch {}

let hits = 0
for (const model of models) {
  if (media[model]) continue
  const key = norm(model)
  if (key.length < 4) continue
  const candidates = urls
    .filter((u) => {
      const slugPart = u.split('.com/')[1]
      return slugPart.split('-').some((seg) => norm(seg) === key) || (key.length >= 6 && norm(slugPart).includes(key))
    })
    .sort((a, b) => a.length - b.length)
  if (!candidates.length) continue
  try {
    const res = await fetch(candidates[0], { headers: UA })
    if (!res.ok) continue
    const html = await res.text()
    const og = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1] || html.match(/content="([^"]+)"\s+property="og:image"/)?.[1]
    const desc = html.match(/property="og:description"\s+content="([^"]+)"/)?.[1] || html.match(/name="description"\s+content="([^"]+)"/)?.[1] || ''
    if (!og) continue
    const imgRes = await fetch(og, { headers: UA })
    if (!imgRes.ok) continue
    const slug = slugify(model)
    const buf = Buffer.from(await imgRes.arrayBuffer())
    await sharp(buf).resize(1000, 1000, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 78 }).toFile(resolve(OUT_IMG, `${slug}.webp`))
    media[model] = { slug, img: `/images/dsppa-catalog/${slug}.webp`, desc: desc.replace(/&amp;/g, '&').slice(0, 300), source: candidates[0] }
    hits++
    if (hits % 20 === 0) writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
    await new Promise((r) => setTimeout(r, 120))
  } catch { /* skip */ }
}
writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
console.log(`matched: ${hits}, total media: ${Object.keys(media).length} of ${models.length}`)
