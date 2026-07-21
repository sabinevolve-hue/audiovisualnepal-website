#!/usr/bin/env node
/**
 * build-hero-montage.mjs — Download the four Nepal AV clips, crossfade them into
 * one seamless ~18s loop, encode WebM + MP4, and extract a poster frame.
 * Runs in GitHub Actions (needs ffmpeg).
 */
import { mkdirSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'public/videos')
const TMP = '/tmp/montage'
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FE57AoxJhtKb7zrCZN8kIwXpXD'

// order defines the narrative: heritage audio -> heritage visual -> chamber -> valley boardroom
const CLIPS = [
  'hf_20260721_071410_a66936e6-5232-46ce-888b-6a46b5a6c389.mp4',
  'hf_20260721_071426_99155034-41a1-4e16-b56c-a9ff93a8849a.mp4',
  'hf_20260721_071445_2059b0ef-fb5b-4ff8-83f3-acb11c7bd4b1.mp4',
  'hf_20260721_071502_6cfd5b6b-1495-4093-8307-2b223abb869d.mp4',
]

mkdirSync(OUT, { recursive: true })
mkdirSync(TMP, { recursive: true })

const files = []
for (let i = 0; i < CLIPS.length; i++) {
  const name = CLIPS[i]
  if (name.endsWith('_CLIP')) { console.log('pending, skipping:', name); continue }
  const res = await fetch(`${CDN}/${name}`)
  if (!res.ok) { console.error('FAIL fetch', name, res.status); process.exit(1) }
  const f = `${TMP}/c${i}.mp4`
  writeFileSync(f, Buffer.from(await res.arrayBuffer()))
  files.push(f)
  console.log('downloaded', name)
}
if (files.length < 2) { console.error('not enough clips'); process.exit(1) }

// normalise each clip: 1280x720, 24fps, no audio, slight slow-motion for calm
const norm = files.map((f, i) => {
  const o = `${TMP}/n${i}.mp4`
  execSync(`ffmpeg -y -i ${f} -an -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setpts=1.15*PTS,fps=24" -c:v libx264 -pix_fmt yuv420p -crf 20 -preset medium ${o}`, { stdio: 'inherit' })
  return o
})

// crossfade chain (0.8s transitions)
const D = 0.8
let filter = ''
let prev = '[0:v]'
let offset = 0
const durations = norm.map((f) =>
  parseFloat(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${f}`).toString().trim())
)
for (let i = 1; i < norm.length; i++) {
  offset += durations[i - 1] - D
  const out = i === norm.length - 1 ? '[vout]' : `[x${i}]`
  filter += `${prev}[${i}:v]xfade=transition=fade:duration=${D}:offset=${offset.toFixed(2)}${out};`
  prev = `[x${i}]`
}
filter = filter.replace(/;$/, '')

const inputs = norm.map((f) => `-i ${f}`).join(' ')
const merged = `${TMP}/merged.mp4`
execSync(`ffmpeg -y ${inputs} -filter_complex "${filter}" -map "[vout]" -c:v libx264 -pix_fmt yuv420p -crf 20 -preset medium ${merged}`, { stdio: 'inherit' })

// encode web deliverables
execSync(`ffmpeg -y -i ${merged} -an -c:v libvpx-vp9 -crf 44 -b:v 0 -row-mt 1 -pix_fmt yuv420p ${resolve(OUT, 'hero-loop.webm')}`, { stdio: 'inherit' })
execSync(`ffmpeg -y -i ${merged} -an -c:v libx264 -profile:v main -level 4.0 -pix_fmt yuv420p -crf 31 -preset slow -movflags +faststart ${resolve(OUT, 'hero-loop.mp4')}`, { stdio: 'inherit' })
execSync(`ffmpeg -y -i ${merged} -vframes 1 -q:v 3 ${TMP}/poster.jpg`, { stdio: 'inherit' })
execSync(`ffmpeg -y -i ${TMP}/poster.jpg -vf scale=1600:-2 ${resolve(ROOT, 'public/images/heroes/hero-poster.webp')}`, { stdio: 'inherit' })

// SOLUTION_CLIPS — also publish each clip individually for its matching solution page
const SOLUTION_MAP = ['religious', 'hotels', 'government', 'smart-meeting-rooms']
norm.forEach((f, i) => {
  const slug = SOLUTION_MAP[i]
  if (!slug) return
  execSync(`ffmpeg -y -i ${f} -an -c:v libvpx-vp9 -crf 46 -b:v 0 -row-mt 1 -pix_fmt yuv420p ${resolve(OUT, `solution-${slug}.webm`)}`, { stdio: 'inherit' })
  execSync(`ffmpeg -y -i ${f} -an -c:v libx264 -profile:v main -level 4.0 -pix_fmt yuv420p -crf 32 -preset slow -movflags +faststart ${resolve(OUT, `solution-${slug}.mp4`)}`, { stdio: 'inherit' })
  console.log('solution clip:', slug)
})

console.log('montage built: hero-loop.webm + hero-loop.mp4 + poster + 4 solution clips')
