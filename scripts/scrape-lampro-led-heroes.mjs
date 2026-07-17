#!/usr/bin/env node
/**
 * scrape-lampro-led-heroes.mjs — self-host REAL Lampro photos for the 6 curated LED
 * products. lampro.net serves stripped HTML to datacenter IPs so the pages can't be
 * scraped from CI, but the CDN image assets download fine. These exact per-model image
 * URLs were harvested with a browser-grade fetch; here we just download + self-host them.
 */
import { mkdirSync, writeFileSync, readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_IMG = resolve(ROOT, 'public/images/lampro-catalog')
const OUT_JSON = resolve(ROOT, 'src/data/lampro-catalog-media.json')
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36', 'Referer': 'https://www.lampro.net/products' }
const B = 'https://www.lampro.net/media/tmp/webp/page/'

// slug -> [hero, gallery...] (image hashes on lampro's CDN)
const CURATED = {
  'lmini':    ['a7930ff65a447a72cbb2aca80c11206f', '95ba638ad196db62782b9e2681e354aa', '7c78f85b55f3fdb8fcee22a7c69d6f48', '3bd0ac970cac9eaeec0c626f0e812df4', '2a34212bce95ac4b7371c04df50b1098'],
  'bnxii':    ['50e75c654a9c5b05554f7e41f8c29a96', '69c35291439e0a99d16c4d79301f47d8', '3f5efe3e7236afd4847647ccac1ce884', '2eb0e57839b1f5df297f2e6584bcd3eb', 'fc2b932c056ae5a4fa0b582ea283a938'],
  'lhp':      ['32741f9ae4ae44ae1ceafa8af0605ee8', 'fe81b6fb834e69478f74775e583d4683', '51e999ec4686df478f2c1a31d27bb2fc', '1198ca18594871d1d0e835e0ec7a371a'],
  'lrs':      ['75a77d7c16f7743922a032ab48b8cb29', '09da810592bd0e7e21e06ddfb2527993'],
  'lst':      ['45b8f7e595a7620e3072216488a0021e', 'd203069cabf9b18317078cd36efa5464', 'e8fb53cb06b87d6a51557e5b68dcf032', '4f87180e01248ca8850d795a4fefc08e'],
  'lxii-pro': ['1b7ed773e1706cb9ac195c57c4099e0d', '1dfb1ce52a6ea3d32a9265db50f1147b', 'e474581a71f3a678aa2697eee5050d9b', 'd880cbd1fc7ddb49848aca14e9fbd20c', '924f2a749fae825dbf0b91f4750f653d'],
}

mkdirSync(OUT_IMG, { recursive: true })
let media = {}
try { media = JSON.parse(readFileSync(OUT_JSON, 'utf8')) } catch {}

async function grab(url, out, q) {
  const r = await fetch(url, { headers: UA })
  if (!r.ok) return false
  const buf = Buffer.from(await r.arrayBuffer())
  if (buf.length < 3000) return false
  await sharp(buf).resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }).webp({ quality: q }).toFile(out)
  return true
}

let ok = 0
for (const [slug, hashes] of Object.entries(CURATED)) {
  const locals = []
  let n = 1
  for (const h of hashes) {
    if (locals.length >= 5) break
    const f = n === 1 ? `${slug}.webp` : `${slug}-g${n}.webp`
    if (await grab(B + h + '.webp', resolve(OUT_IMG, f), n === 1 ? 82 : 80)) { locals.push(`/images/lampro-catalog/${f}`); n++ }
    await new Promise((r) => setTimeout(r, 120))
  }
  if (locals.length) {
    // find the media key whose slug matches (keys are model names)
    const key = Object.keys(media).find((k) => media[k] && media[k].slug === slug)
    if (key) media[key] = { ...media[key], img: locals[0], gallery: locals.slice(1, 5) }
    ok++
    console.log('ok', slug, '→ hero +', locals.length - 1, 'gallery')
  } else console.error('failed', slug)
}
writeFileSync(OUT_JSON, JSON.stringify(media, null, 1))
console.log(`self-hosted real photos for ${ok} of ${Object.keys(CURATED).length} LED products`)
if (ok === 0) process.exit(1)
