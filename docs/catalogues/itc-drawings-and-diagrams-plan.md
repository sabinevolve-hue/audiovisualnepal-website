# itc Professional Sound — Drawings & Diagrams (brainstorm + what is built)

Goal: every itc product and venue on audiovisualnepal.com should be explained with **original AVN drawings** — not manufacturer artwork — so buyers understand how the system fits their building, and so the drawings can be reused in quotations, BOQs, tenders and social posts.

## 1. Built now (18 SVG drawings, `diagrams/`)

| Drawing | Files | Use |
|---|---|---|
| **Segment map** — capture → mix → process → amplify → reproduce | `itc-segment-map.svg` | Brand page, catalogue cover, sales deck |
| **Venue signal-flow schematic** ×8 — sources, mixer, processing, amplifiers, loudspeakers with itc model labels | `itc-<venue>-flow.svg` | Solution pages, proposals, tender annexures |
| **Venue plan view with coverage cones** ×8 — mains, fills/delays, FOH position, -6 dB coverage | `itc-<venue>-plan.svg` | Site-survey discussion, design sign-off |
| **FOH / amplifier rack elevation** — 19" rack, 1U grid | `itc-rack-elevation.svg` | Installation drawings, BOQ |

Venues: stadium, banquet hall, concert hall, conference hall, KTV room, studio room, theatre, vocal concert / outdoor show.

All drawings are generated from one Python file (`scripts/catalogues/itc/diagrams.py`) — change a model or quantity once and every drawing updates.

## 2. Next drawings to add (brainstorm, prioritised)

| # | Drawing | Why it sells | Effort |
|---|---|---|---|
| 1 | **Line-array side elevation** (hang height, splay angles, throw to last row) | Shows the buyer *why* a line array beats point-source in long halls | M — needs per-model splay data |
| 2 | **Speaker dimension drawings** (front / side, mm) per cabinet family | Architects and interior designers ask for these first | M — dims already in specs |
| 3 | **Amplifier ↔ speaker load chart** (how many cabinets per channel at 8/4/2 Ω) | Removes the #1 design mistake; drives amplifier sales | S |
| 4 | **Wireless microphone frequency plan** (channels per venue, antenna splitter layout) | Multi-mic events, churches, conferences | S |
| 5 | **Conference room ceiling plan** (column / wall speakers, mic positions) | Most common AVN government job | S |
| 6 | **Immersive (WFS) object diagram** — speaker ring, tracking, positioning server | Explains the TS-CJ00 system to non-engineers | M |
| 7 | **Outdoor / temple festival rig** (ground stack + delay towers) | Very Nepal-specific: jatras, concerts, political rallies | S |
| 8 | **Wiring / connector cheat-sheet** (XLR, Speakon, 100 V line, Dante) | Installer training, AMC handover | S |
| 9 | **SPL / coverage heat-map renders** from EASE Focus | Premium proposals; itc speakers are in the EASE library | L — needs EASE licence/time |
| 10 | **Exploded product illustrations** (driver, waveguide, cabinet) | Product-page "anatomy" section | L |

## 3. Style rules (keep every drawing consistent)

- Palette: navy `#0B1E3D` (structure/text), blue `#2563EB` (signal path), orange `#EA580C` (fills, highlights), slate `#64748B` (secondary text), light `#F8FAFC` fills.
- Font: Inter / system sans; titles 20 px bold, labels 12–13 px, notes 11 px.
- Every drawing carries: title, "indicative — confirmed by survey" note, legend, audiovisualnepal.com footer.
- Model names exactly as on the itc spec sheet; quantities as "×n" or "×n/side".
- Export: SVG for the web (sharp, tiny), PNG at 2× for WhatsApp / social, PDF for tenders.

## 4. Where they are used on the website

- `/brands/itc` — segment map + all 8 venue designs (flow + plan) and the rack elevation.
- Product pages — "How it connects" diagram (per-category archetype) + spec sheet PDF download.
- Future: each venue becomes its own landing page (`/solutions/<venue>`), cross-linked from the matching products.
