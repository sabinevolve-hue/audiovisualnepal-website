#!/usr/bin/env node
/**
 * build-nepal-map.mjs — Fetch real Nepal district GeoJSON and convert every district
 * to an SVG path + label centroid. Writes src/data/nepal-districts.json for the
 * interactive projects map. Deterministic equirectangular projection into a fixed viewBox.
 */
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SRC = 'https://raw.githubusercontent.com/mesaugat/geoJSON-Nepal/master/nepal-districts.geojson'

// Nepal bounding box
const LON0 = 80.0, LON1 = 88.25, LAT0 = 26.3, LAT1 = 30.5
const W = 1000, H = (W * (LAT1 - LAT0)) / (LON1 - LON0) // keep aspect
const px = (lon) => ((lon - LON0) / (LON1 - LON0)) * W
const py = (lat) => H - ((lat - LAT0) / (LAT1 - LAT0)) * H // invert Y

const res = await fetch(SRC)
if (!res.ok) throw new Error('geojson fetch failed ' + res.status)
const gj = await res.json()

const districts = []
for (const f of gj.features) {
  const nameRaw = f.properties.DISTRICT || f.properties.district || f.properties.NAME || f.properties.Name || Object.values(f.properties)[0]
  const name = String(nameRaw).trim().replace(/\b\w/g, (c) => c.toUpperCase())
  const geom = f.geometry
  const polys = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates
  let d = ''
  let cx = 0, cy = 0, n = 0
  for (const poly of polys) {
    for (const ring of poly) {
      d += 'M'
      ring.forEach(([lon, lat], i) => {
        const X = px(lon).toFixed(1), Y = py(lat).toFixed(1)
        d += (i ? 'L' : '') + X + ',' + Y + ' '
        cx += +X; cy += +Y; n++
      })
      d += 'Z'
    }
  }
  districts.push({ name, d, cx: Math.round(cx / n), cy: Math.round(cy / n) })
}

writeFileSync(resolve(ROOT, 'src/data/nepal-districts.json'), JSON.stringify({ viewBox: `0 0 ${W} ${Math.round(H)}`, districts }))
console.log('districts:', districts.length, '| viewBox 0 0', W, Math.round(H))
