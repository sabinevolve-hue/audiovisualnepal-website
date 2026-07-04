#!/usr/bin/env node
/**
 * apply-image-replacements.mjs
 * Patches products.ts: replaces all external imageUrl / gallery URLs
 * with the local /images/products/... paths written by download-images.mjs
 *
 * Run AFTER download-images.mjs:
 *   node scripts/apply-image-replacements.mjs
 */
import { readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const mapPath = resolve(ROOT, 'scripts', 'image-replacements.json')
let replacements
try {
  replacements = JSON.parse(readFileSync(mapPath, 'utf8'))
} catch {
  console.error('Run download-images.mjs first to generate image-replacements.json')
  process.exit(1)
}

const tsPath = resolve(ROOT, 'src', 'data', 'products.ts')
let src = readFileSync(tsPath, 'utf8')
let count = 0

for (const [oldUrl, newPath] of Object.entries(replacements)) {
  const escaped = oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const re = new RegExp(escaped, 'g')
  const matches = (src.match(re) || []).length
  if (matches > 0) {
    src = src.replace(re, newPath)
    count += matches
    console.log(`✓ Replaced ${matches}× ${oldUrl.split('/').pop()}`)
  }
}

writeFileSync(tsPath, src)
console.log(`\nDone — patched ${count} URL references in products.ts`)
console.log('Commit public/images/ + src/data/products.ts and push.')
