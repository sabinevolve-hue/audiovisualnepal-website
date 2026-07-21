#!/usr/bin/env node
/** Localize Nepal context imagery + regenerated sector heroes. Runs in GitHub Actions. */
import { mkdirSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_3FE57AoxJhtKb7zrCZN8kIwXpXD'

// slug -> [destination dir, remote filename]
const FILES = {
  'government-hero':          ['public/images/heroes',  'hf_20260721_065427_b8e11326-9711-42af-a62c-36266923bc2f.png'],
  'hotels-hero':              ['public/images/heroes',  'hf_20260721_065435_50589dde-fb66-4123-a724-4c98e40997c6.png'],
  'education-hero':           ['public/images/heroes',  'hf_20260721_065438_bab3729c-e137-4d07-9306-814d4aa29c2e.png'],
  'hospitals-hero':           ['public/images/heroes',  'hf_20260721_065447_d752d289-5546-4e93-ace7-39a8f0b56ab8.png'],
  'smart-meeting-rooms-hero': ['public/images/heroes',  'hf_20260721_065637_873cf572-a7d6-403a-95cc-d088930896c9.png'],
  'pagoda-temple':            ['public/images/nepal',   'hf_20260721_065651_5fa5298c-dd61-4b4a-a910-de5d0064ffc0.png'],
  'himalaya-panorama':        ['public/images/nepal',   'hf_20260721_065701_12d80e8e-ced6-4278-85bc-4845c8ccc731.png'],
}

let fail = 0
for (const [slug, [dir, file]] of Object.entries(FILES)) {
  if (file.endsWith('_FILE')) { console.log('skip (pending):', slug); continue }
  const out = resolve(ROOT, dir)
  mkdirSync(out, { recursive: true })
  try {
    const res = await fetch(`${CDN}/${file}`)
    if (!res.ok) throw new Error('HTTP ' + res.status)
    const buf = Buffer.from(await res.arrayBuffer())
    await sharp(buf).webp({ quality: 82 }).toFile(resolve(out, `${slug}.webp`))
    console.log('ok', slug)
  } catch (e) { console.error('FAIL', slug, e.message); fail++ }
}
if (fail > 0) process.exit(1)
