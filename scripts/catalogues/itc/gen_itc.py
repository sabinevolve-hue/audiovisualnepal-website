"""itc pro sound: md docs + AVN spec-sheet PDFs + site TS data.
usage: gen_itc.py <itc_dir> <repo_dir>"""
import json, os, sys, re, glob
D, REPO = sys.argv[1], sys.argv[2]
cat = json.load(open(os.path.join(D, 'itc_catalog.json')))
venues = json.load(open(os.path.join(D, 'diagrams', 'venues.json')))
sols = {s['file']: s for s in json.load(open(os.path.join(D, 'solutions.json')))}
SITE = 'https://www.audiovisualnepal.com'
CAT_LABEL = {'amplifiers': 'Amplifiers', 'line-array-speakers': 'Line Array Speakers', 'pro-loudspeakers': 'Professional Loudspeakers', 'subwoofers': 'Subwoofers',
             'mixing-consoles': 'Mixing Consoles', 'microphones': 'Microphones', 'immersive-sound': 'Immersive Sound', 'audio-peripherals': 'Audio Peripherals'}
CAT_ORDER = list(CAT_LABEL)

def low(s): return s[0].lower() + s[1:] if s and not s[:2].isupper() else s

def describe(r):
    vs = r['variants']
    p1 = f"The itc {r['model'].split('/')[0] if vs else r['model']} {'family' if vs else ''} is a {low(r['type'])} from itc's {r['segment_label']} range, built for {r['use']}.".replace('  ', ' ')
    if vs: p1 += f" It is offered in {len(vs)} versions — {', '.join(vs)} — so one design language covers rooms of different sizes."
    hl = r['highlights'][:3]
    p2 = ''
    if hl:
        def lab(l):
            if ' — ' in l: return 'power at ' + l.split(' — ')[-1] + ' (continuous · max)'
            return l.split(' (')[0].lower()
        p2 = 'Key figures: ' + '; '.join(f"{lab(l)} {v}" for l, v in hl) + '.'
    ft = [f[0] for f in r['features'][:4]]
    if ft: p2 += ' Highlights include ' + ', '.join(low(x).rstrip('.') for x in ft[:-1]) + (f" and {low(ft[-1]).rstrip('.')}" if len(ft) > 1 else low(ft[0]).rstrip('.')) + '.'
    p3 = "AudioVisual Nepal supplies, installs and commissions itc professional sound systems across Nepal — with system design, acoustic simulation on request, and local after-sales support."
    return [p1, p2.strip(), p3]

for r in cat:
    r['description'] = describe(r)
    r['images'] = [f"/images/itc-catalog/{r['id']}{'' if i == 0 else f'-g{i+1}'}.webp" for i in range(len(r['gallery']))] or []
    r['sheet'] = f"/downloads/itc/{r['id']}-spec-sheet.pdf"

# ---------- markdown ----------
DOCS = os.path.join(D, 'docs'); os.makedirs(DOCS, exist_ok=True)
def url(r): return f"{SITE}/products/{r['site_category']}/{r['id']}"
md = ['# itc Professional Sound — Product Catalogue', '',
      '> Source: itcprosound.com (Guangzhou itc), scraped November 2026. Specifications as published by the manufacturer; descriptions rewritten by AudioVisual Nepal. Confirm figures at quotation.', '',
      '**Manufacturer:** Guangzhou itc Professional Sound — HQ: Building A13-1, Yiku Industrial Park, Panyu District, Guangzhou, China · Factory: No.56 Nanlidong Road, Shiqi, Panyu · OEM/ODM manufacturer with 30+ years of experience; products listed in the EASE / EASE Focus libraries.', '',
      '## Segment overview', '', '| AVN category | itc series | Products |', '|---|---|---|']
for c in CAT_ORDER:
    rs = [r for r in cat if r['site_category'] == c]
    series = sorted({r['segment_label'] for r in rs})
    md.append(f"| {CAT_LABEL[c]} | {', '.join(series)} | {len(rs)} |")
md += ['', f'**Total:** {len(cat)} product pages.', '', '![Segment map](diagrams/itc-segment-map.svg)', '']
md += ['## Core technology', '',
       '- **Amplifiers:** AVMF (adaptive variable modulation frequency), MPAL (multi-track precise audio loop adjustment), ADPEC (adaptive dynamic power-efficient conversion); DSP + FIR processing; >95% efficiency on the TC Series; full protection (DC, short, overload, overheat).',
       '- **Loudspeakers:** neodymium drivers, low-distortion waveguides, built-in DSP on active models, precise crossovers; models included in EASE / EASE Focus for acoustic simulation.',
       '- **Ease Immersive:** object-based spatial audio (WFS) with real-time positioning, >90% sweet-spot coverage, PSN / Art-Net tracking for lighting follow.', '']
for c in CAT_ORDER:
    rs = [r for r in cat if r['site_category'] == c]
    md += [f'## {CAT_LABEL[c]} ({len(rs)})', '']
    for s in sorted({r['segment_label'] for r in rs}):
        md += [f'### {s}', '', '| Model | Type | Key figures | Page |', '|---|---|---|---|']
        for r in [x for x in rs if x['segment_label'] == s]:
            k = '; '.join(f"{l.split(' (')[0]}: {v}" for l, v in r['highlights'][:3]).replace('|', '/')
            md.append(f"| {r['model']} | {r['type']} | {k} | [view]({url(r)}) |")
        md.append('')
open(os.path.join(DOCS, 'itc-prosound-catalogue.md'), 'w').write('\n'.join(md))

# full spec sheets md (one file, every product)
ss = ['# itc Professional Sound — Technical Specifications (all products)', '', '> Companion to itc-prosound-catalogue.md. One section per product: description, highlights, full parameter table.', '']
for c in CAT_ORDER:
    ss += [f'## {CAT_LABEL[c]}', '']
    for r in [x for x in cat if x['site_category'] == c]:
        ss += [f"### {r['full_name']}", '', f"*{r['segment_label']}* · AVN page: {url(r)} · Spec sheet: {SITE}{r['sheet']}", '']
        ss += r['description'] + ['']
        if r['features']:
            ss += ['**Features**', ''] + [f"- **{t}**{(' — ' + d) if d else ''}" for t, d in r['features']] + ['']
        if r['variants']: ss += [f"**Versions:** {' · '.join(r['variants'])} (values listed in the same order)", '']
        ss += ['| Group | Parameter | Value |', '|---|---|---|'] + [f"| {g} | {l} | {v.replace('|', '/')} |" for g, l, v in r['specs']] + ['', f"**Applications:** {', '.join(r['applications'])}", '', '---', '']
open(os.path.join(DOCS, 'itc-technical-specifications.md'), 'w').write('\n'.join(ss))

# solutions md
SOLMAP = {'stadium': '3326.html', 'banquet-hall': '3319.html', 'concert-hall': '3321.html', 'conference-hall': '3325.html', 'ktv': '3324.html', 'studio-room': '3322.html', 'theatre': '3320.html', 'vocal-concert': '3323.html'}
sm = ['# itc Professional Sound — Venue Solutions', '', '> Eight venue solutions. Each has an AVN system design (signal flow + plan-view coverage drawing) built from the itc range. Quantities are indicative and confirmed by survey.', '']
for k, v in venues.items():
    src = sols.get(SOLMAP[k], {})
    txt = src.get('text', '')
    adv = []
    if 'System Advantages' in txt:
        part = txt.split('System Advantages', 1)[1].split('\n')
        adv = [x for x in part if x and not re.search(r'[A-Z]{2,}-\d', x)][:7]
    sm += [f"## {v['title']}", '', f"Reference room: {v['dims'][0]} × {v['dims'][1]} m", '',
           f"![{v['title']} signal flow](diagrams/itc-{k}-flow.svg)", '', f"![{v['title']} plan view](diagrams/itc-{k}-plan.svg)", '',
           '| Stage | Equipment | itc model |', '|---|---|---|']
    sm += [f'| Source | {a} | {b} |' for a, b in v['sources']] + [f"| Mix | {v['mixer'][0]} | {v['mixer'][1]} |", f"| Process | {v['proc'][0]} | {v['proc'][1]} |"]
    sm += [f'| Power | {a} | {b} |' for a, b in v['amps']] + [f'| Loudspeakers | {a} | {b} |' for a, b in v['spk']] + ['']
    if adv: sm += ['**System goals (manufacturer):**', ''] + [f'- {a}' for a in adv] + ['']
open(os.path.join(DOCS, 'itc-venue-solutions.md'), 'w').write('\n'.join(sm))

# ---------- spec sheet PDFs ----------
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader, simpleSplit
pdfmetrics.registerFont(TTFont('DV', '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DVB', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'))
SH = os.path.join(REPO, 'public', 'downloads', 'itc'); os.makedirs(SH, exist_ok=True)
NAVY, BLUE, GREY = (11/255, 30/255, 61/255), (37/255, 99/255, 235/255), (100/255, 116/255, 139/255)
def sheet(r):
    W, H = A4; c = canvas.Canvas(os.path.join(SH, f"{r['id']}-spec-sheet.pdf"), pagesize=A4)
    c.setTitle(f"{r['full_name']} — Spec sheet"); c.setAuthor('AudioVisual Nepal')
    c.setFillColorRGB(*NAVY); c.rect(0, H - 70, W, 70, fill=1, stroke=0)
    c.setFillColorRGB(1, 1, 1); c.setFont('DVB', 15); c.drawString(36, H - 40, 'AudioVisual Nepal'); c.setFont('DV', 8.5)
    c.drawString(36, H - 56, 'Authorised itc professional sound supplier · Kathmandu · +977 9762109538 · audiovisualnepal.com')
    c.drawRightString(W - 36, H - 40, 'PRODUCT SPEC SHEET')
    y = H - 104
    c.setFillColorRGB(*BLUE); c.setFont('DVB', 9); c.drawString(36, y, f"itc · {r['segment_label'].upper()}")
    c.setFillColorRGB(*NAVY); c.setFont('DVB', 17); c.drawString(36, y - 22, r['model'][:46]); c.setFont('DV', 10.5); c.setFillColorRGB(*GREY); c.drawString(36, y - 38, r['type'][:70])
    img = os.path.join(REPO, 'public', r['images'][0].lstrip('/')) if r['images'] else None
    if img and os.path.exists(img):
        from PIL import Image as _I
        tmp = '/tmp/_sheet_img.jpg'; im = _I.open(img).convert('RGB'); im.thumbnail((520, 520)); im.save(tmp, 'JPEG', quality=80); img = tmp
    top = y - 52
    if img and os.path.exists(img):
        try: c.drawImage(ImageReader(img), W - 36 - 190, top - 170, 190, 170, preserveAspectRatio=True, anchor='c', mask='auto')
        except Exception: pass
    c.setFillColorRGB(0.2, 0.25, 0.33); c.setFont('DV', 9)
    ty = top - 4
    for para in r['description'][:2]:
        for ln in simpleSplit(para, 'DV', 9, W - 72 - 205):
            c.drawString(36, ty, ln); ty -= 12.5
        ty -= 5
    ty = min(ty, top - 180) - 8
    if r['features']:
        c.setFillColorRGB(*NAVY); c.setFont('DVB', 10.5); c.drawString(36, ty, 'Key features'); ty -= 15; c.setFont('DV', 8.6); c.setFillColorRGB(0.2, 0.25, 0.33)
        for t, d in r['features'][:5]:
            for i, ln in enumerate(simpleSplit(f"• {t}{(' — ' + d) if d else ''}", 'DV', 8.6, W - 72)[:2]):
                c.drawString(36 if i == 0 else 44, ty, ln); ty -= 11.5
        ty -= 6
    c.setFillColorRGB(*NAVY); c.setFont('DVB', 10.5); c.drawString(36, ty, 'Technical specifications'); ty -= 6
    if r['variants']:
        ty -= 11; c.setFont('DV', 8); c.setFillColorRGB(*GREY); c.drawString(36, ty, 'Versions: ' + ' · '.join(r['variants']) + '  (values in the same order)')
    ty -= 6; colw = 190
    for g, l, v in r['specs']:
        lines = simpleSplit(v, 'DV', 8.3, W - 72 - colw - 8)[:3]
        h = 6 + 10.5 * len(lines)
        if ty - h < 70: c.setFont('DV', 7.5); c.setFillColorRGB(*GREY); c.drawString(36, 60, 'Continued specifications on request.'); break
        c.setStrokeColorRGB(0.89, 0.91, 0.94); c.line(36, ty, W - 36, ty)
        c.setFillColorRGB(*GREY); c.setFont('DV', 8.3); c.drawString(36, ty - 11, l.replace('Power (continuous · max) — ', 'Power cont./max — ')[:40])
        c.setFillColorRGB(*NAVY)
        for i, ln in enumerate(lines): c.drawString(36 + colw, ty - 11 - i * 10.5, ln)
        ty -= h
    c.setFillColorRGB(*GREY); c.setFont('DV', 7.2)
    c.drawString(36, 34, 'Specifications as published by the manufacturer and subject to change; confirm at quotation. Price on request.')
    c.drawString(36, 24, f"Product page: {SITE}/products/{r['site_category']}/{r['id']}")
    c.showPage(); c.save()
for r in cat: sheet(r)

# ---------- TS for the site ----------
def ts(r):
    return dict(id=r['id'], slug=r['id'], name=r['name'], brand='itc', brandSlug='itc', category=r['site_category'], subcategory=r['segment_label'],
                tagline=f"{r['type']}{' — ' + '; '.join(v for _, v in r['highlights'][:1]) if r['highlights'] else ''}"[:120],
                imageUrl=r['images'][0] if r['images'] else '', gallery=r['images'], imageFallback='#0B1E3D', description='\n\n'.join(r['description']),
                keyFeatures=[{'title': t, 'desc': d or t} for t, d in r['features'][:6]],
                specs=[dict(label=l, value=v, group=g, **({'highlight': True} if [l, v] in r['highlights'] else {})) for g, l, v in r['specs']],
                applications=r['applications'], warranty='As per manufacturer — supported locally', relatedSlugs=[],
                downloads=[{'label': f"{r['model']} spec sheet (AVN)", 'url': r['sheet'], 'type': 'datasheet'}], pdfUrl=r['sheet'])
items = [ts(r) for r in cat]
by_sub = {}
for it in items: by_sub.setdefault(it['subcategory'], []).append(it['slug'])
for it in items:
    sib = [s for s in by_sub[it['subcategory']] if s != it['slug']]
    it['relatedSlugs'] = sib[:3]
open(os.path.join(REPO, 'src', 'data', 'itcProducts.ts'), 'w').write(
    '// AUTO-GENERATED from the itc catalogue scrape (see docs/catalogues/itc-*.md). Edit the source, then regenerate.\n'
    "import type { Product } from './products'\n\n"
    f"export const ITC: Product[] = {json.dumps(items, ensure_ascii=False, indent=1)} as Product[]\n")
print('md + ', len(glob.glob(SH + '/*.pdf')), 'sheets, ', len(items), 'ts items')
