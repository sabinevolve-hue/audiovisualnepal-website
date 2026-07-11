#!/usr/bin/env node
/** Derive product↔solution↔case relations from existing data. Run after content changes. */
import { readFileSync, writeFileSync, readdirSync } from 'fs'

const SOLUTIONS = {
  'corporate': 'Corporate Offices', 'government': 'Government', 'education': 'Education',
  'hotels': 'Hotels & Hospitality', 'hospitals': 'Hospitals', 'religious': 'Religious Places',
  'transportation': 'Transportation', 'smart-meeting-rooms': 'Smart Meeting Rooms',
}
const products = {}
const add = (slug, kind, label, href) => {
  if (!slug) return
  products[slug] ??= { solutions: [], cases: [] }
  if (!products[slug][kind].some((x) => x.href === href)) products[slug][kind].push({ label, href })
}
const slugFromHref = (h) => (h.match(/^\/products\/[^/]+\/([^/"]+)/) || [])[1]

// scenes + solution pages
const sceneMap = { smartMeetingRoom: 'smart-meeting-rooms', corporate: 'corporate', government: 'government', education: 'education', hotels: 'hotels', hospitals: 'hospitals', religious: 'religious', transportation: 'transportation' }
for (const f of readdirSync('src/components/solutions/scenes')) {
  const sol = sceneMap[f.replace('.tsx', '')]
  if (!sol) continue
  const s = readFileSync(`src/components/solutions/scenes/${f}`, 'utf8')
  for (const m of s.matchAll(/href: "(\/products\/[^"]+)"/g)) add(slugFromHref(m[1]), 'solutions', SOLUTIONS[sol], `/solutions/${sol}`)
}
for (const sol of Object.keys(SOLUTIONS)) {
  try {
    const s = readFileSync(`src/app/solutions/${sol}/page.tsx`, 'utf8')
    for (const m of s.matchAll(/href: "(\/products\/[^"]+)"/g)) add(slugFromHref(m[1]), 'solutions', SOLUTIONS[sol], `/solutions/${sol}`)
  } catch {}
}
// case studies
const cs = readFileSync('src/data/caseStudies.ts', 'utf8')
for (const block of cs.split('slug: "').slice(1)) {
  const slug = block.split('"')[0]
  const title = (block.match(/title: "([^"]+)"/) || [])[1]
  for (const m of block.matchAll(/href: "(\/products\/[^"]+)"/g)) add(slugFromHref(m[1]), 'cases', title, `/projects/${slug}`)
}

// catalog category -> solutions (keyword rules) for lite pages
const RULES = [
  [/evacuation|voice alarm|pava/i, ['hospitals', 'transportation', 'government']],
  [/ceiling/i, ['corporate', 'education', 'hospitals']],
  [/column/i, ['religious', 'hotels', 'transportation']],
  [/horn/i, ['religious', 'transportation', 'education']],
  [/conference|meeting|delegate/i, ['smart-meeting-rooms', 'government', 'corporate']],
  [/camera|videobar|video bar|webcam/i, ['smart-meeting-rooms', 'government', 'education']],
  [/wireless presentation|presentation/i, ['corporate', 'smart-meeting-rooms', 'education']],
  [/video wall|led|display|dooh|matrix/i, ['corporate', 'hotels', 'transportation']],
  [/rental|staging|creative/i, ['hotels', 'corporate']],
  [/amplifier|mixer|audio distribution/i, ['religious', 'hotels', 'education']],
  [/ip (network )?audio|paging|network pa/i, ['hospitals', 'transportation', 'education']],
  [/microphone|speakerphone|speaker/i, ['smart-meeting-rooms', 'corporate', 'government']],
  [/podium|lectern/i, ['education', 'government']],
  [/kvm|extender|cable|mount|control|switch|hub|dante|capture|converter|sdi|power/i, ['corporate', 'smart-meeting-rooms']],
]
const categorySolutions = {}
for (const b of ['infobit', 'dsppa', 'tenveo', 'lampro']) {
  const cat = JSON.parse(readFileSync(`src/data/${b}-catalog.json`, 'utf8'))
  categorySolutions[b] = {}
  for (const c of cat.categories) {
    const rule = RULES.find(([re]) => re.test(c.category))
    categorySolutions[b][c.category] = (rule ? rule[1] : ['corporate']).map((s) => ({ label: SOLUTIONS[s], href: `/solutions/${s}` }))
  }
}

writeFileSync('src/data/relations.json', JSON.stringify({ products, categorySolutions }, null, 1))
console.log('products with relations:', Object.keys(products).length, '| catalog categories mapped:', Object.values(categorySolutions).reduce((n, o) => n + Object.keys(o).length, 0))
