#!/usr/bin/env node
/** Localize verified project photos from evolvetech.com.np. */
import { mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'public/images/projects-real')
const B = 'https://evolvetech.com.np/wp-content/uploads/'

const MANIFEST = {
  'siddhartha-bank-head-office': '2026/04/Screenshot-2026-04-16-085006-1.png',
  'jeevan-jyoti-school': '2026/05/Screenshot-2026-05-12-120402.png',
  'dibya-ratna-consultant': '2026/05/Screenshot-2026-05-19-105705.png',
  'awarded-international-education': '2026/05/Screenshot-2026-05-19-110842.png',
  'auranex-restaurant': '2026/05/Screenshot-2026-05-28-154624.png',
  'fcube-cinemas': '2026/01/WhatsApp-Image-2026-01-20-at-13.22.53.jpeg',
  'inland-multi-cuisine-stay': '2026/04/Screenshot-2026-04-26-114302.png',
  'anong-store': '2026/04/Screenshot-2026-04-19-111640.png',
  'shree-shiva-enterprises': '2026/04/Screenshot-2026-04-19-114631.png',
}

mkdirSync(OUT, { recursive: true })
let fail = 0
for (const [slug, path] of Object.entries(MANIFEST)) {
  try {
    const res = await fetch(B + path, { headers: { 'User-Agent': 'Mozilla/5.0 (AudioVisualNepal)' } })
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const buf = Buffer.from(await res.arrayBuffer())
    await sharp(buf).resize(1200, 1200, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 80 }).toFile(resolve(OUT, `${slug}.webp`))
    console.log('ok', slug)
  } catch (e) { console.error('FAIL', slug, e.message); fail++ }
}
if (fail > 0) process.exit(1)
