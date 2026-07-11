#!/usr/bin/env node
/** Build a slim searchable index of every product + catalog model. Run after catalog changes. */
import { readFileSync, writeFileSync } from 'fs'

const idx = []
const seen = new Set()
const push = (m, b, h, i) => {
  const key = (b + '|' + m).toLowerCase()
  if (seen.has(key)) return
  seen.add(key)
  idx.push({ m, b, h, ...(i ? { i } : {}) })
}

// full products
const prod = readFileSync('src/data/products.ts', 'utf8')
for (const match of prod.matchAll(/slug: "([^"]+)",\s*\n\s*name: "([^"]+)", brand: "([^"]+)",[\s\S]*?category: "([^"]+)"[\s\S]*?imageUrl: "([^"]+)"/g)) {
  const [, slug, name, brand, category, img] = match
  push(name.replace(new RegExp('^' + brand + '\\s+', 'i'), ''), brand, `/products/${category}/${slug}`, img)
}

// catalog models
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
for (const b of ['infobit', 'dsppa', 'tenveo', 'lampro']) {
  const cat = JSON.parse(readFileSync(`src/data/${b}-catalog.json`, 'utf8'))
  const media = JSON.parse(readFileSync(`src/data/${b}-catalog-media.json`, 'utf8'))
  const brand = cat.brand
  for (const c of cat.categories)
    for (const s of c.series)
      for (const g of s.groups)
        for (const m of g.models)
          push(m, brand, `/brands/${b}/p/${slugify(m)}`, media[m]?.img)
}

writeFileSync('src/data/model-index.json', JSON.stringify(idx))
console.log('index entries:', idx.length)
