#!/usr/bin/env node
/**
 * download-media.mjs — Download AI-generated textures and hero video, optimize, self-host.
 * Runs in GitHub Actions (needs internet + ffmpeg). Textures -> WebP via sharp; video -> WebM + MP4 via ffmpeg.
 */
import { mkdirSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const TEX_OUT = resolve(ROOT, 'public/images/textures')
const VID_OUT = resolve(ROOT, 'public/videos')
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FE57AoxJhtKb7zrCZN8kIwXpXD'

const TEXTURES = {
  'speaker-grille': 'hf_20260705_141108_f339210c-f762-42c1-9174-1c92f7cdc33c.png',
  'rack-cables': 'hf_20260705_141111_affeb233-2871-4b1a-8598-01fd170a3c03.png',
}
const VIDEO = 'hf_20260705_141104_a962a9c3-faea-4164-bb5c-e46595f40c30.mp4'

mkdirSync(TEX_OUT, { recursive: true })
mkdirSync(VID_OUT, { recursive: true })

let fail = 0
for (const [name, file] of Object.entries(TEXTURES)) {
  try {
    const res = await fetch(`${CDN}/${file}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    await sharp(buf).resize(1200).webp({ quality: 72 }).toFile(resolve(TEX_OUT, `${name}.webp`))
    console.log(`ok  ${name}.webp`)
  } catch (e) { console.error(`FAIL ${name}: ${e.message}`); fail++ }
}

try {
  const res = await fetch(`${CDN}/${VIDEO}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const raw = resolve('/tmp', 'hero-raw.mp4')
  writeFileSync(raw, Buffer.from(await res.arrayBuffer()))
  execSync(`ffmpeg -y -i ${raw} -an -vf scale=1280:-2 -c:v libvpx-vp9 -crf 42 -b:v 0 ${resolve(VID_OUT, 'hero-loop.webm')}`, { stdio: 'inherit' })
  execSync(`ffmpeg -y -i ${raw} -an -vf scale=1280:-2 -c:v libx264 -crf 30 -preset slow -movflags +faststart ${resolve(VID_OUT, 'hero-loop.mp4')}`, { stdio: 'inherit' })
  console.log('ok  hero-loop.webm + hero-loop.mp4')
} catch (e) { console.error(`FAIL video: ${e.message}`); fail++ }

if (fail > 0) process.exit(1)
