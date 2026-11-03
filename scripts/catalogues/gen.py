import json, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from data import PROJ, TRIO

REPO = sys.argv[1]
DOCS = os.path.join(REPO, 'docs', 'catalogues')
os.makedirs(DOCS, exist_ok=True)
SITE = 'https://www.audiovisualnepal.com'

for p in PROJ:
    p.update(brand='Wincomn', brandSlug='wincomn', category='projectors', imgdir='/images/projectors-catalog/', dldir='/downloads/projectors/')
for p in TRIO:
    p.update(brand='Triolion', brandSlug='triolion', category='video-walls', imgdir='/images/triolion-catalog/', dldir='/downloads/triolion/', line='Triolion')

def url(p): return f"{SITE}/products/{p['category']}/{p['id']}"

def md_product(p):
    o = [f"### {p['name']}", '', f"**{p['tag']}**", '',
         f"| | |", "|---|---|", f"| Brand / Line | {p['brand']} · {p.get('line','')} |", f"| Model | {p['model']} |",
         f"| Segment | {p['sub']} |", f"| Warranty | {p['war']} |", f"| Product page | [{url(p)}]({url(p)}) |",
         f"| Datasheet | [{p.get('dllabel', p['model'] + ' Datasheet')}]({SITE}{p['dldir']}{p['dl']}) |", '',
         *p['desc'].split('\n'), '', '**Key highlights**', '']
    o += [f"- **{t}** — {d}" for t, d in p['feats']]
    o += ['', '**Technical specifications**', '', '| Group | Specification | Value |', '|---|---|---|']
    o += [f"| {g} | {l} | {v} |" for l, v, g, _ in p['specs']]
    o += ['', f"**Applications:** {', '.join(p['apps'])}", '', '---', '']
    return '\n'.join(o)

HDR = "> Source: official manufacturer datasheets supplied to AudioVisual Nepal ({src}). Specifications are as published by the manufacturer and may change; confirm at quotation. Descriptions are rewritten by AVN.\n"

# Projectors doc grouped by segment
segs = ['4K UHD Laser', 'Installation Laser (WUXGA)', 'High-Brightness Large Venue', 'Simulation & Training']
doc = ['# Wincomn & Krinda Laser Projectors — Product Catalogue', '',
       HDR.format(src='Krinda Catalogue 2026.10.14, Wincomn Catalogue 2026.10.16'), '',
       '**Manufacturer:** Beijing Wincomn Technology Co., Ltd — Bldg.7, No.11 Kangding Street, Economic-Technological Development Area, Beijing, China · www.wincomn.com · info@wincomn.com',
       '', '**Krinda** is Wincomn\'s own projector brand (WUXGA installation, large-venue and simulation models). The **C-4K** series and **C-WU2500** are sold under the Wincomn name.', '',
       '## Range at a glance', '', '| Model | Segment | Resolution | Brightness | Light life | Weight |', '|---|---|---|---|---|---|']
def sv(p, label):
    for l, v, g, _ in p['specs']:
        if l == label: return v
    return '—'
for s in segs:
    for p in [x for x in PROJ if x['sub'] == s]:
        res = sv(p, 'Native Resolution') if sv(p, 'Native Resolution') != '—' else (sv(p, 'Resolution') if sv(p, 'Resolution') != '—' else sv(p, 'Image Resolution'))
        doc.append(f"| [{p['model']}]({url(p)}) | {s} | {res} | {sv(p,'Brightness')} | {sv(p,'Light Life')} | {sv(p,'Weight')} |")
doc.append('')
for s in segs:
    doc += [f'## {s}', '']
    doc += [md_product(p) for p in PROJ if p['sub'] == s]
open(os.path.join(DOCS, 'wincomn-krinda-projectors.md'), 'w').write('\n'.join(doc))

t = TRIO[0]
open(os.path.join(DOCS, 'triolion-tmc6000-g2-video-wall-controller.md'), 'w').write('\n'.join([
    '# Triolion TMC6000-G2 Video Wall Controller', '', HDR.format(src='TMC6000-G2 Series Video Wall Controller Specifications V2026-07-29'), '',
    '**Manufacturer:** Beijing Triolion Science & Technology Co., Ltd (DLP / LCD / LED video wall systems).', '', md_product(t),
    '## Configuration code', '', '`TMC60XX H XX D XX V XX A XX P XX U XX F XX Y -G2`', '',
    '| Code | Meaning |', '|---|---|', '| 60XX | XX-channel output |', '| HXX | XX-channel HDMI 1.4 input |', '| DXX | XX-channel DVI input |',
    '| VXX | XX-channel VGA input |', '| AXX | XX-channel video (CVBS) input |', '| PXX | XX-channel simultaneous IP-stream decoding (incl. IP cameras) |',
    '| UXX | XX-channel 8K/4K HDMI/DP input |', '| FXX | XX-channel fibre input |', '| Y | Signal preview & redisplay function |', '| G2 | Version |', '',
    '## Chassis options', '', '| Chassis | Size (W×H×D mm) | Weight (full) | Slots | PSU |', '|---|---|---|---|---|',
    '| 2.5U | 482×111×310 | 4 kg | 1 control + 5/3 signal | 250 W (460 W opt.) |', '| 4U | 482×178×310 | 11 kg | 1 control + 9/7/5 signal | 250 W, opt. 460 W redundant hot-swap |',
    '| 6.5U | 482×289×310 | 20 kg | 1 control + 19/13 signal | 250 W, opt. 460 W redundant hot-swap |', '| 12U | 482×533×310 | 38 kg | 1 control + 27 signal | 460 W, opt. redundant hot-swap |', '',
    '## Feature list (manufacturer)', '', *[f'{i}. {x}' for i, x in enumerate([
      'IP stream decoding (IP cameras)', '4K base image across the whole wall (IP decoding card needed)', 'Signal preview & redisplay on control PC, iPad and phone',
      'Customised output resolution per group (preview card needed)', 'Redundant power supply', 'Hot-swappable graphic cards, fans and PSU', 'Automatic graphic-card temperature detection',
      'Virtual mouse — move/zoom windows and annotate the wall', 'Signal cutting of main and subsidiary windows', 'Highlight cursor / spotlight', '8K & 4K HDMI/DP inputs, 4K IP inputs, 4K HDMI outputs',
      'Output cards grouped for multiple walls', 'Anti-burn-in black-line scan for LCD', 'Crestron and AMX central control', 'C/S client, web browser (iOS/Android) and app control',
      'Multi-webpage sources on the wall', 'LCD bezel compensation', 'Output brightness/darkness adjustment', 'Rolling captions', 'Signal cutting into 4 / 9 / 16 sub-windows', 'Audio output', 'Touch LCD screen support'], 1)], ''
]))

lcd = TRIO[1:]
open(os.path.join(DOCS, 'triolion-b-series-lcd-video-wall.md'), 'w').write('\n'.join([
    '# Triolion B-Series LCD Video Wall Displays (46" / 49" / 55")', '', HDR.format(src='TRIOLION LCD Display Screen Specifications (B Series) 2023-12-01'), '',
    '## Series models (from the manufacturer sheet)', '', '| Model | Size | Bezel options in series | Brightness |', '|---|---|---|---|',
    '| TRD1046B7 / B8 / BA | 46" | 3.5 / 2.6 / 0.88 mm | 500 cd/m² |', '| TRD1049B7 | 49" | 3.5 mm | 500 cd/m² |',
    '| TRD1055B7 / B8 / B9 / BA / BB | 55" | 3.5 / 1.7 / 0.88 mm | 500 or 700 cd/m² |', '',
    '> Note: the source sheet merges several columns, so the exact bezel/brightness of each suffix should be confirmed with Triolion before quoting.', '',
    '## I/O solutions', '', '| Solution | Signal input | Signal output | Control in | Control out |', '|---|---|---|---|---|',
    '| 1 | VGA, DVI, HDMI, CVBS | CVBS loop-out | RS232 (RJ45), debug ISP, IR (opt.) | RS232 ×2 (RJ45) |',
    '| 2 | VGA, DVI, HDMI, CVBS, RJ45 loop-in | RJ45 loop-out (VGA/DVI/HDMI/CVBS) | RS232, RJ45, USB, IR (opt.) | RJ45 loop-out |',
    '| 3 | VGA, DVI, HDMI MHL, HDMI 4K, DP 4K | DP loop-out | RS232 (RJ45), IR (opt.) | RS232 (RJ45) |',
    '| 4 | VGA, DVI, HDMI 4K, DP 4K, USB (opt.) | HDMI loop-out (4K), audio | RS232 (RJ45), USB, IR (opt.) | RS232 ×2 (RJ45) |', '',
    *[md_product(p) for p in lcd]]))

open(os.path.join(DOCS, 'README.md'), 'w').write('\n'.join([
    '# AVN Catalogue Docs', '', 'Markdown reference docs generated from manufacturer catalogues. Source of truth: `scripts/catalogues/data.py` → run `python3 scripts/catalogues/gen.py .` to regenerate these docs and `src/data/newBrands.ts`.', '',
    '| Doc | Brand | Products |', '|---|---|---|',
    f'| [wincomn-krinda-projectors.md](wincomn-krinda-projectors.md) | Wincomn / Krinda | {len(PROJ)} laser projectors |',
    '| [triolion-tmc6000-g2-video-wall-controller.md](triolion-tmc6000-g2-video-wall-controller.md) | Triolion | TMC6000-G2 controller |',
    '| [triolion-b-series-lcd-video-wall.md](triolion-b-series-lcd-video-wall.md) | Triolion | 46/49/55" LCD wall displays |',
    '| [projectors-segment-plan.md](projectors-segment-plan.md) | — | Projector segment brainstorm & roadmap |', '',
    'Images: `public/images/projectors-catalog/`, `public/images/triolion-catalog/` · Datasheets: `public/downloads/projectors/`, `public/downloads/triolion/`.', '']))

# ---- TS ----
def ts(p):
    return {
      'id': p['id'], 'slug': p['id'], 'name': p['name'], 'brand': p['brand'], 'brandSlug': p['brandSlug'], 'category': p['category'],
      'subcategory': p['sub'], 'tagline': p['tag'], **({'badge': p['badge']} if p.get('badge') else {}),
      'imageUrl': p['imgdir'] + p['img'], 'imageFallback': '#0B1E3D', 'description': p['desc'],
      'keyFeatures': [{'title': a, 'desc': b} for a, b in p['feats']],
      'specs': [dict(label=l, value=v, group=g, **({'highlight': True} if h else {})) for l, v, g, h in p['specs']],
      'applications': p['apps'], 'warranty': p['war'], 'relatedSlugs': p['rel'],
      'downloads': [{'label': p.get('dllabel', p['model'] + ' Datasheet'), 'url': p['dldir'] + p['dl'], 'type': 'datasheet'}],
      'pdfUrl': p['dldir'] + p['dl'],
      **({'brandProductUrl': 'https://www.wincomn.com'} if p['brandSlug'] == 'wincomn' else {}),
    }
out = ['// AUTO-GENERATED by scripts/catalogues/gen.py from scripts/catalogues/data.py — edit the data file, then regenerate.',
       "import type { Product } from './products'", '',
       f"export const WINCOMN: Product[] = {json.dumps([ts(p) for p in PROJ], ensure_ascii=False, indent=2)} as Product[]", '',
       f"export const TRIOLION: Product[] = {json.dumps([ts(p) for p in TRIO], ensure_ascii=False, indent=2)} as Product[]", '']
open(os.path.join(REPO, 'src', 'data', 'newBrands.ts'), 'w').write('\n'.join(out))
print('generated', len(PROJ), len(TRIO))
