#!/usr/bin/env node
/**
 * download-images.mjs — Download all product images from manufacturer CDNs
 * 
 * Usage:  node scripts/download-images.mjs
 * 
 * Downloads every imageUrl + gallery image to:
 *   /public/images/products/[brandSlug]/[slug]/main.[ext]
 *   /public/images/products/[brandSlug]/[slug]/gallery-N.[ext]
 *
 * Then writes scripts/image-replacements.json mapping old URLs -> new local paths.
 * After running, commit public/images/ and update products.ts URLs.
 */

import { createWriteStream, mkdirSync, existsSync, writeFileSync, readFileSync } from 'fs'
import { get as httpsGet } from 'https'
import { get as httpGet } from 'http'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT      = resolve(__dirname, '..')
const PUBLIC    = resolve(ROOT, 'public', 'images', 'products')

// ── Parse product image URLs from products.ts ────────────────────────────────
const src = readFileSync(resolve(ROOT, 'src', 'data', 'products.ts'), 'utf8')

// Extract {slug, brandSlug, imageUrl, gallery[]}
const products = []
const productBlocks = src.split(/(?=\s+\{\s*\n\s+id:)/)
for (const block of productBlocks) {
  const idMatch       = block.match(/\bid:\s*"([^"]+)"/)
  const slugMatch     = block.match(/\bslug:\s*"([^"]+)"/)
  const brandMatch    = block.match(/\bbrandSlug:\s*"([^"]+)"/)
  const imageMatch    = block.match(/\bimageUrl:\s*"([^"]+)"/)
  const galleryMatch  = [...block.matchAll(/gallery:\s*\[([\s\S]*?)\]/g)]
  
  if (!idMatch || !slugMatch || !brandMatch || !imageMatch) continue
  
  const galleryUrls = []
  if (galleryMatch.length > 0) {
    const galleryContent = galleryMatch[0][1]
    const urlMatches = [...galleryContent.matchAll(/"(https?:\/\/[^"]+)"/g)]
    for (const m of urlMatches) galleryUrls.push(m[1])
  }
  
  products.push({
    id: idMatch[1], slug: slugMatch[1], brandSlug: brandMatch[1],
    imageUrl: imageMatch[1], gallery: galleryUrls
  })
}

console.log(`Found ${products.length} products with images`)

// ── Download helper ──────────────────────────────────────────────────────────
function download(url, dest, redirects = 0) {
  return new Promise((res, rej) => {
    if (redirects > 5) { rej(new Error('Too many redirects')); return }
    if (existsSync(dest)) { res(dest); return }
    mkdirSync(dirname(dest), { recursive: true })
    const file = createWriteStream(dest)
    const get = url.startsWith('https') ? httpsGet : httpGet
    const req = get(url, { headers: { 'User-Agent': 'Mozilla/5.0 AudioVisualNepal/1.0' } }, r => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        file.close()
        try { require('fs').unlinkSync(dest) } catch {}
        download(r.headers.location, dest, redirects + 1).then(res).catch(rej)
        return
      }
      if (r.statusCode !== 200) {
        file.close()
        rej(new Error(`HTTP ${r.statusCode}`))
        return
      }
      r.pipe(file)
      file.on('finish', () => { file.close(); res(dest) })
    })
    req.on('error', rej)
  })
}

function extOf(url) {
  const u = url.split('?')[0]
  if (u.includes('.webp')) return 'webp'
  if (u.includes('.png'))  return 'png'
  return 'jpg'
}

// ── Main loop ────────────────────────────────────────────────────────────────
const replacements = {}
let ok = 0, fail = 0

for (const p of products) {
  const dir = `${PUBLIC}/${p.brandSlug}/${p.slug}`

  // main image
  if (p.imageUrl && p.imageUrl.startsWith('http')) {
    const ext   = extOf(p.imageUrl)
    const dest  = `${dir}/main.${ext}`
    const local = `/images/products/${p.brandSlug}/${p.slug}/main.${ext}`
    try {
      await download(p.imageUrl, dest)
      replacements[p.imageUrl] = local
      process.stdout.write(`✓ ${p.slug} main\n`)
      ok++
    } catch (e) {
      process.stdout.write(`✗ ${p.slug} main: ${e.message}\n`)
      fail++
    }
  }

  // gallery
  for (let i = 0; i < p.gallery.length; i++) {
    const url   = p.gallery[i]
    if (!url || !url.startsWith('http')) continue
    const ext   = extOf(url)
    const dest  = `${dir}/gallery-${i}.${ext}`
    const local = `/images/products/${p.brandSlug}/${p.slug}/gallery-${i}.${ext}`
    try {
      await download(url, dest)
      replacements[url] = local
      process.stdout.write(`✓ ${p.slug} gallery[${i}]\n`)
      ok++
    } catch (e) {
      process.stdout.write(`✗ ${p.slug} gallery[${i}]: ${e.message}\n`)
      fail++
    }
  }
}

console.log(`\nDone: ${ok} downloaded, ${fail} failed`)

// Write replacement map
writeFileSync(
  resolve(ROOT, 'scripts', 'image-replacements.json'),
  JSON.stringify(replacements, null, 2)
)
console.log(`Saved scripts/image-replacements.json (${Object.keys(replacements).length} entries)`)
console.log('\nNext: node scripts/apply-image-replacements.mjs')
