#!/usr/bin/env node
/** Fetch official manufacturer logos and self-host them. Runs in GitHub Actions. */
import { mkdirSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = resolve(ROOT, 'public/images/brand-logos')
const UA = { 'User-Agent': 'Mozilla/5.0 (compatible; AudioVisualNepal/1.0)' }

const SITES = {
  dsppa: 'https://www.dsppatech.com/',
  infobit: 'https://www.infobitav.com/',
  tenveo: 'https://www.tenveo-video-conference.com/',
  focus: 'https://www.gzfocus.com/',
  lampro: 'https://www.lampro.net/',
}

mkdirSync(OUT, { recursive: true })
const found = {}
for (const [slug, site] of Object.entries(SITES)) {
  try {
    const html = await (await fetch(site, { headers: UA })).text()
    const cands = [...html.matchAll(/(?:src|data-src)="([^"]*logo[^"]*\.(?:png|svg|webp|jpe?g))"/gi)].map((m) => m[1])
    if (!cands.length) { console.log('no logo found:', slug); continue }
    const url = cands[0].startsWith('http') ? cands[0] : new URL(cands[0], site).href
    const res = await fetch(url, { headers: UA })
    if (!res.ok) { console.log('fetch fail:', slug, res.status); continue }
    const buf = Buffer.from(await res.arrayBuffer())
    if (url.endsWith('.svg')) {
      writeFileSync(resolve(OUT, `${slug}.svg`), buf)
      found[slug] = `/images/brand-logos/${slug}.svg`
    } else {
      await sharp(buf).resize(420, 160, { fit: 'inside', withoutEnlargement: true }).webp({ quality: 90 }).toFile(resolve(OUT, `${slug}.webp`))
      found[slug] = `/images/brand-logos/${slug}.webp`
    }
    console.log('ok', slug, url)
  } catch (e) { console.log('err', slug, e.message) }
}
writeFileSync(resolve(ROOT, 'src/data/brand-logos.json'), JSON.stringify(found, null, 1))
console.log('logos:', Object.keys(found).length)
