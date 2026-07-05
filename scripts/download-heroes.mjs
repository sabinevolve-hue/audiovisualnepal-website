#!/usr/bin/env node
/**
 * download-heroes.mjs — Download AI-generated solution hero images and convert to WebP.
 * Runs in GitHub Actions (sandbox/local may lack CDN access).
 * Output: public/images/heroes/<slug>-hero.webp
 */
import { mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'public/images/heroes')
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FE57AoxJhtKb7zrCZN8kIwXpXD'

const HEROES = {
  'corporate': 'hf_20260705_025045_e2174d3d-13d6-4fdb-ac3e-871bd6b3e0b5.png',
  'government': 'hf_20260705_025053_f2f9a5b3-d570-4259-ae85-36c4fb1d4889.png',
  'education': 'hf_20260705_025055_8660294e-348f-454f-8520-9906e37a4755.png',
  'hotels': 'hf_20260705_025058_f5f3e1c5-ed29-4f4f-8862-f1584bc9ab49.png',
  'hospitals': 'hf_20260705_025212_6cda372a-d753-4846-9100-b2f4df21cc80.png',
  'religious': 'hf_20260705_025218_272bbd3e-2489-4418-be26-dc938fb589a1.png',
  'transportation': 'hf_20260705_025225_ba5ee52a-604b-4232-9c2b-5eb7bdab7330.png',
  'smart-meeting-rooms': 'hf_20260705_025227_2e796be5-2a5c-4dd8-8f31-34d483a6cd15.png',
}

mkdirSync(OUT, { recursive: true })

let ok = 0, fail = 0
for (const [slug, file] of Object.entries(HEROES)) {
  const url = `${CDN}/${file}`
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    await sharp(buf).webp({ quality: 80 }).toFile(resolve(OUT, `${slug}-hero.webp`))
    console.log(`ok  ${slug}-hero.webp`)
    ok++
  } catch (e) {
    console.error(`FAIL ${slug}: ${e.message}`)
    fail++
  }
}
console.log(`done: ${ok} ok, ${fail} failed`)
if (fail > 0) process.exit(1)
