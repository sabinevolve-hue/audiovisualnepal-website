"""Build the partner-site feed (evolvetech.com.np WooCommerce import) from the site TS data.
usage: gen_feed.py <repo>"""
import json, re, sys, os, html
REPO = sys.argv[1]
SITE = 'https://www.audiovisualnepal.com'
items = []
for fn in ('itcProducts.ts', 'itcConferenceProducts.ts'):
    ts = open(os.path.join(REPO, 'src/data', fn)).read()
    items += json.loads(ts[ts.index('= [') + 2: ts.rindex('] as Product[]') + 1])
CAT = {'amplifiers': 'itc Amplifiers', 'line-array-speakers': 'itc Line Array Speakers', 'pro-loudspeakers': 'itc Professional Loudspeakers', 'subwoofers': 'itc Subwoofers',
       'mixing-consoles': 'itc Mixing Consoles', 'microphones': 'itc Microphones', 'immersive-sound': 'itc Immersive Sound', 'audio-peripherals': 'itc Audio Peripherals',
       'conference-systems': 'itc Conference Systems', 'video-conferencing': 'itc Video Conference'}
E = html.escape
out = []
for p in items:
    d = ''.join(f'<p>{E(x)}</p>' for x in p['description'].split('\n\n'))
    if p['keyFeatures']:
        d += '<h3>Key features</h3><ul>' + ''.join(f"<li><strong>{E(f['title'])}</strong>{(' — ' + E(f['desc'])) if f['desc'] != f['title'] else ''}</li>" for f in p['keyFeatures']) + '</ul>'
    groups = []
    for s in p['specs']:
        if s['group'] not in groups: groups.append(s['group'])
    d += '<h3>Technical specifications</h3><table><tbody>'
    for g in groups:
        d += f'<tr><th colspan="2">{E(g)}</th></tr>' + ''.join(f"<tr><td>{E(s['label'])}</td><td>{E(s['value'])}</td></tr>" for s in p['specs'] if s['group'] == g)
    d += '</tbody></table>'
    d += f"<p><strong>Spec sheet:</strong> <a href=\"{SITE}{p['pdfUrl']}\" target=\"_blank\" rel=\"noopener\">Download the {E(p['name'])} spec sheet (PDF)</a></p>"
    d += f"<p><strong>Applications:</strong> {E(', '.join(p['applications']))}</p><p>Price on request — <a href=\"/contact-us/\">contact us</a> or WhatsApp +977 976-2109538 for a system design and quotation.</p>"
    hl = [s['value'] for s in p['specs'] if s.get('highlight')][:3]
    short = f"<p>{E(p['tagline'])}.</p>" + ('<ul>' + ''.join(f'<li>{E(v)}</li>' for v in hl) + '</ul>' if hl else '')
    out.append(dict(name=p['name'], slug=p['slug'], sku=p['slug'].upper().replace('ITC-', 'ITC-'), cat=CAT[p['category']], series=p['subcategory'],
                    description=d, short_description=short, images=[SITE + g for g in (p.get('gallery') or [p['imageUrl']])][:4]))
os.makedirs(os.path.join(REPO, 'public/feeds'), exist_ok=True)
json.dump(out, open(os.path.join(REPO, 'public/feeds/itc-products.json'), 'w'), ensure_ascii=False, separators=(',', ':'))
print(len(out), os.path.getsize(os.path.join(REPO, 'public/feeds/itc-products.json')))
