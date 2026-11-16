"""Uniview / Uniarch catalogue generator.
Source: uniview-products.json (extracted from the authorised Uniview Nepal channel price list, Q4 2026 v1.2;
prices intentionally not stored in this public repo). Run:  python3 scripts/catalogues/uniview/gen.py .
Writes src/data/univiewProducts.ts and docs/catalogues/uniview-catalogue.md."""
import json, os, re, sys
REPO = sys.argv[1] if len(sys.argv) > 1 else '.'
HERE = os.path.dirname(os.path.abspath(__file__))
P = json.load(open(os.path.join(HERE, 'uniview-products.json')))
SITE = 'https://www.audiovisualnepal.com'

RULES = [  # (regex on feature, title)
 (r'switching capacity', 'Switching Capacity'), (r'max capacity', 'PoE Budget'), (r'ieee ?802|comply', 'Standards'), (r'transmission distance on|extend mode', 'Long-Reach PoE (250 m)'),
 (r'working modes', 'Working Modes'), (r'housing', 'Housing'), (r'raid', 'RAID'), (r'sip|udm|traffic monitoring', 'Smart Functions'), (r'wavelength', 'Wavelength'),
 (r'transfer rate', 'Data Rate'), (r'transmission distance', 'Transmission Distance'), (r'light on/off|led light|led distance|built-in leds', 'Supplement Light'), (r'colorhunter technology', 'Colour Imaging'),
 (r'roi \(', 'Encoding'), (r'combo ports', 'Ports'), (r'buffer', 'Packet Buffer'), (r'full-duplex', 'Audio'), (r'bezel|eye protection', 'Design'), (r'input signal', 'Input'), (r'tempered|glass', 'Cover Glass'), (r'mdi', 'Ports'), (r'desktop mount|wall mount', 'Mounting'), (r'ethernet', 'Network'), (r'forwarding', 'Forwarding Rate'), (r'power budget', 'PoE Budget'),
 (r'packet buffer', 'Packet Buffer'), (r'poe mode', 'PoE Modes'), (r'loop detection|mirroring|vlan|layer ?2|webui|phone app|cloud', 'Management'),
 (r'\bports?\b.*(rj45|sfp|poe|gigabit)|(rj45|sfp).*\bports?\b|\d+ ?x ?10/100', 'Ports'),
 (r'capacity: .*va', 'Capacity'), (r'input voltage', 'Input Voltage'), (r'output voltage', 'Output Voltage'), (r'^battery', 'Battery'), (r'switch time', 'Transfer Time'),
 (r'^protection', 'Protection'), (r'sockets', 'Outlets'), (r'dimensions', 'Dimensions & Weight'),
 (r'hsyv|4×2', 'Construction'), (r'gauge|awg', 'Conductor Gauge'), (r'dc resistance', 'DC Resistance'), (r'pitch', 'Twist Pitch'), (r'^material', 'Conductor Material'),
 (r'tensile', 'Tensile Strength'), (r'thickness', 'Insulation Thickness'), (r'packing length', 'Length'),
 (r'tvi|ahd|bnc|coax', 'HD Analog (TVI/AHD/CVI/CVBS)'), (r'wdr', 'WDR'), (r'built-in mic|audio compression|microphone|two-way audio|speaker', 'Audio'),
 (r'cmos|sensor', 'Image Sensor'), (r'mm@f|mm ?@ ?f|f\d\.\d', 'Lens'), (r'zoom', 'Optical Zoom'), (r'lens', 'Lens'),
 (r'(\d+mp|\d{3,4}\s?[*×x]\s?\d{3,4}|1080p|4k).*(record|fps|resolution)|recording', 'Resolution'),
 (r'channel.*(input|ip video)|ip video input|-ch.*input|channel ip', 'Channels'), (r'sata|hdd', 'Storage'), (r'hdmi|vga', 'Video Output'),
 (r'bandwidth', 'Bandwidth'), (r'onvif|api|sdk|third-party', 'Integration'), (r'h\.26[45]|ultra 265|compression', 'Video Compression'),
 (r'\bir\b|warm ?light|white light|illumination|light distance|dual-light|smart ir', 'Night Vision'), (r'micro ?sd|sd card|edge storage', 'Edge Storage'),
 (r'mic|audio|speaker|two-way', 'Audio'), (r'anpr|license plate|lpr', 'ANPR'), (r'pan|tilt', 'Pan / Tilt'), (r'ip6\d|ik10|weatherproof|vandal', 'Protection'),
 (r'alarm', 'Alarm I/O'), (r'wi-?fi|4g|wireless|bluetooth', 'Wireless'), (r'intrusion|people counting|face|tracking|smart features|deterrence|human|vehicle', 'Smart Analytics'),
 (r'poe|dc ?12|dc 5v|power supply|power input|ac:? ?100|ac 90', 'Power'), (r'temperature|operating environment', 'Operating Environment'),
 (r'brightness|cd/m|lm\b|luminous', 'Brightness'), (r'resolution', 'Resolution'), (r'touch', 'Touch'), (r'cpu|ram|android|storage', 'Platform'),
 (r'vesa', 'Mounting'), (r'view|178°', 'Viewing Angle'), (r'display size|active display', 'Display Area'), (r'angle|color temp', 'Beam & Colour'),
 (r'dimming', 'Dimming'), (r'consumption', 'Power Consumption'), (r'microphone|far-field|noise', 'Audio'), (r'plug|compatib', 'Compatibility'),
]
def title(f):
    l = f.lower()
    for rx, t in RULES:
        if re.search(rx, l): return t
    return 'Feature'

APPS = {'cctv-cameras': ['Corporate', 'Government', 'Education', 'Retail', 'Hotel', 'Hospital', 'Transportation'],
        'video-recorders': ['Corporate', 'Government', 'Education', 'Retail', 'Hotel', 'Hospital'],
        'network-switches': ['Corporate', 'Government', 'Education', 'Hotel', 'Hospital'],
        'ups-power': ['Corporate', 'Government', 'Retail'], 'monitors-displays': ['Corporate', 'Government', 'Education'],
        'video-conferencing': ['Corporate', 'Education', 'Government']}
KIND = {'cctv-cameras': 'surveillance camera', 'video-recorders': 'video recorder', 'network-switches': 'networking product',
        'ups-power': 'UPS', 'monitors-displays': 'display', 'video-conferencing': 'conference camera'}

def build(p, i, sibs):
    feats = [re.sub(r';\s*[Rr]ecording', ' recording', f) for f in p['features']]
    if p.get('verify'):  # drop feature lines that contradict the model code; confirmed at quotation
        feats = [f for f in feats if not re.search(r'\d(\.\d)?\s?(MP|megapixel)', f, re.I)]
    kf, seen = [], {}
    for f in feats:
        t = title(f); seen[t] = seen.get(t, 0) + 1
        if seen[t] > 1:  # second line of the same kind: name it from its own words
            w = re.sub(r'^(support|supports)\s+', '', f, flags=re.I).split()
            t = ' '.join(w[:4]).rstrip(',;:'); t = t[0].upper() + t[1:]
        kf.append({'title': t, 'desc': f})
    specs = [{'label': k['title'], 'value': k['desc'], 'group': p['sub']} for k in kf]
    hl = 0
    for s in specs:
        if hl < 3 and s['label'].split(' (')[0] in ('Resolution', 'Image Sensor', 'Channels', 'Ports', 'PoE Budget', 'Switching Capacity', 'Capacity', 'Storage', 'Lens', 'Optical Zoom', 'Night Vision', 'Touch', 'Brightness', 'Length', 'Conductor Material'):
            s['highlight'] = True; hl += 1
    brand_name = p['line']
    lead = f"The {brand_name} {p['model']} is a {p['name']}" + (' from Uniarch, the value line of Uniview' if brand_name == 'Uniarch' else ' from Uniview') + '.'
    body = ' '.join(f.rstrip('.') + '.' for f in feats[:4])
    tail = (f"AudioVisual Nepal is an authorised Uniview partner and supplies, installs and configures this {KIND[p['category']]} across Nepal — "
            "with system design, cabling, NVR and mobile-app setup, and after-sales support.")
    rel = [s['slug'] for s in sibs if s['slug'] != p['slug']]
    k = sibs.index(p) if p in sibs else 0
    rel = (rel[k:] + rel[:k])[:3]
    return {'id': p['slug'], 'slug': p['slug'], 'name': f"{brand_name} {p['model']}", 'brand': 'Uniview', 'brandSlug': 'uniview',
            'category': p['category'], 'subcategory': p['sub'], 'tagline': p['name'],
            'imageUrl': f"/images/uniview-catalog/{p['img']}", 'imageFallback': '#0B1E3D',
            'description': f"{lead} {body}\n\n{tail}", 'keyFeatures': kf[:8], 'specs': specs,
            'applications': (['Transportation', 'Government'] if 'ANPR' in p['sub'] else APPS[p['category']]),
            'warranty': 'Uniview Manufacturer', 'relatedSlugs': rel,
            'brandProductUrl': 'https://www.uniview.com'}

groups = {}
for p in P: groups.setdefault(p['sub'], []).append(p)
OUT = [build(p, i, groups[p['sub']]) for i, p in enumerate(P)]
ts = ['// AUTO-GENERATED by scripts/catalogues/uniview/gen.py from uniview-products.json — edit the JSON, then regenerate.',
      "import type { Product } from './products'", '',
      'export const UNIVIEW: Product[] = ' + json.dumps(OUT, indent=2, ensure_ascii=False) + '\n']
open(os.path.join(REPO, 'src', 'data', 'univiewProducts.ts'), 'w').write('\n'.join(ts))

# Markdown catalogue (no prices — public repo)
CATN = {'cctv-cameras': 'CCTV & Surveillance Cameras', 'video-recorders': 'Video Recorders (NVR / XVR)', 'network-switches': 'Networking — PoE Switches, SFP & Cables',
        'monitors-displays': 'Monitors & Interactive Displays', 'ups-power': 'UPS & Power Backup', 'video-conferencing': 'Video Conferencing'}
md = ['# Uniview (UNV) & Uniarch — Product Catalogue', '',
      '> AudioVisual Nepal (Audio Visual Solutions Pvt. Ltd.) is an **authorised Uniview partner** in Nepal. Models and features below are taken from the Uniview Nepal channel price list (Q4 2026, v1.2, effective 4 Nov 2026). Prices are kept out of this public file; confirm specifications against the Uniview datasheet before quoting.', '',
      '**Manufacturer:** Zhejiang Uniview Technologies Co., Ltd. (Uniview, UNV) — Hangzhou, China, founded 2005 · www.uniview.com. **Uniarch** is Uniview\'s value line (Wi-Fi/4G cameras, ECO IP cameras and NVRs).', '',
      f'**{len(P)} models** — ' + ', '.join(f"{CATN[c]}: {sum(1 for p in P if p['category']==c)}" for c in CATN), '']
for c in CATN:
    md += [f'## {CATN[c]}', '']
    for sub in dict.fromkeys(p['sub'] for p in P if p['category'] == c):
        md += [f'### {sub}', '', '| # | Model | Description | Key features | Page |', '|---|---|---|---|---|']
        for n, p in enumerate([x for x in P if x['category'] == c and x['sub'] == sub], 1):
            ft = '<br>'.join(f.replace('|', '/') for f in p['features'])
            note = ' ⚠ ' + '; '.join(p['verify']) if p.get('verify') else ''
            md.append(f"| {n} | **{p['model']}** ({p['line']}) | {p['name']}{note} | {ft} | [{SITE}/products/{c}/{p['slug']}]({SITE}/products/{c}/{p['slug']}) |")
        md.append('')
open(os.path.join(REPO, 'docs', 'catalogues', 'uniview-catalogue.md'), 'w').write('\n'.join(md))
print(len(OUT), 'products written')
