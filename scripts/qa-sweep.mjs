#!/usr/bin/env node
/**
 * qa-sweep.mjs — Weekly production QA: every sitemap URL must return 200,
 * sampled images must serve, key pages must contain expected content.
 * Fails the workflow (which opens a GitHub issue) on any problem.
 */
import { readFileSync, appendFileSync } from 'fs'

const BASE = 'https://www.audiovisualnepal.com'
const failures = []
const note = (m) => { failures.push(m); console.error('FAIL', m) }

// 1. sitemap sweep
const sm = await (await fetch(`${BASE}/sitemap.xml`)).text()
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace('https://audiovisualnepal.com', BASE))
console.log('sitemap urls:', urls.length)
if (urls.length < 80) note(`sitemap shrank to ${urls.length} URLs`)

const check = async (u) => {
  try {
    const r = await fetch(u, { redirect: 'follow', signal: AbortSignal.timeout(20000) })
    if (r.status !== 200) note(`${r.status} ${u}`)
  } catch (e) { note(`ERR ${u} ${e.message}`) }
}
for (let i = 0; i < urls.length; i += 8) await Promise.all(urls.slice(i, i + 8).map(check))

// 2. sampled catalog images (3 per brand from media JSONs)
for (const b of ['infobit', 'dsppa', 'tenveo', 'lampro']) {
  const media = JSON.parse(readFileSync(`src/data/${b}-catalog-media.json`, 'utf8'))
  const entries = Object.values(media)
  for (const e of [entries[0], entries[Math.floor(entries.length / 2)], entries[entries.length - 1]].filter(Boolean)) {
    await check(BASE + e.img)
    if (e.gallery?.[0]) await check(BASE + e.gallery[0])
  }
}
// project photos + heroes
for (const p of ['/images/projects-real/siddhartha-bank-head-office.webp', '/images/heroes/corporate-hero.webp', '/videos/hero-loop.webm']) await check(BASE + p)

// 3. content markers
const markers = [
  [`${BASE}/`, 'Solutions for Every Space'],
  [`${BASE}/boq-lookup`, 'Check your BOQ'],
  [`${BASE}/solution-finder`, 'Find the right AV system'],
  [`${BASE}/brands/infobit/catalog`, 'InfoBit product catalog'],
  [`${BASE}/projects/siddhartha-bank-head-office`, '110 sq ft'],
]
for (const [u, m] of markers) {
  try {
    const t = await (await fetch(u, { signal: AbortSignal.timeout(20000) })).text()
    if (!t.includes(m)) note(`marker missing on ${u}: "${m}"`)
  } catch (e) { note(`ERR ${u} ${e.message}`) }
}

const summary = failures.length
  ? `## ❌ QA sweep: ${failures.length} failure(s)\n\n` + failures.map((f) => `- ${f}`).join('\n')
  : `## ✅ QA sweep passed — ${urls.length} pages, images and markers all healthy`
console.log(summary)
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + '\n')
if (failures.length) process.exit(1)
