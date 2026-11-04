"""itc conference & video-conference products (itctech.com.cn) -> itc_catalog.json schema.
usage: normalize_conf.py <itcc_dir> <existing_ids_file>"""
import json, re, sys, os, glob
from bs4 import BeautifulSoup
D = sys.argv[1]
existing = set(open(sys.argv[2]).read().split()) if len(sys.argv) > 2 else set()
lst = {x['id']: x for x in json.load(open(os.path.join(D, 'listing.json')))}
SEG = {'406': ('Digital Conference Systems', 'conference-systems'), '407': ('Wireless Conference Systems', 'conference-systems'),
       '408': ('Paperless Conference Systems', 'conference-systems'), '409': ('Simultaneous Interpretation', 'conference-systems'),
       '482': ('itc HD Video Conference', 'video-conferencing')}
USE = {'conference-systems': 'council chambers, boardrooms, government and university meeting halls, courts and conference centres',
       'video-conferencing': 'hybrid meeting rooms, boardrooms, training rooms and multi-site government and corporate conferencing'}
APPS = {'conference-systems': ['Government', 'Corporate', 'Education', 'Hotel'], 'video-conferencing': ['Corporate', 'Government', 'Education']}
BASE = 'https://www.itctech.com.cn'

def fix(t):
    t = re.sub(r'\b([a-z]{1,2}) ([a-z]) ([a-z])\b', r'\1\2\3', t)
    t = re.sub(r'\b([b-zB-HJ-Z]) ([a-z]{2,})', r'\1\2', t)
    t = re.sub(r'(\d) (\d+(?:[a-zA-Z%]|$))', r'\1\2', t)
    return re.sub(r'\s+', ' ', t).strip()

def short(t, n=60):
    t = t.rstrip('.')
    if len(t) <= n: return t
    cut = re.split(r'[,;:，]| — | - ', t)[0]
    if len(cut) <= n: return cut
    return t[:n].rsplit(' ', 1)[0] + '…'

def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')
def group_of(l):
    l = l.lower()
    if any(k in l for k in ['frequency', 'sensitivity', 'snr', 'thd', 'spl', 'dynamic', 'crosstalk', 'directivity', 'response', 'sampling']): return 'Audio'
    if any(k in l for k in ['camera', 'video', 'resolution', 'zoom', 'lens', 'sensor', 'frame', 'codec', 'angle']): return 'Video'
    if any(k in l for k in ['port', 'interface', 'input', 'output', 'network', 'protocol', 'usb', 'hdmi', 'rs', 'wifi', 'wireless', 'channel', 'cascade', 'band', 'transmission', 'distance']): return 'Connectivity'
    if any(k in l for k in ['power', 'battery', 'voltage', 'consumption', 'supply']): return 'Power'
    if any(k in l for k in ['dimension', 'weight', 'size', 'color', 'colour', 'installation', 'material', 'rod', 'opening', 'screen', 'display']): return 'Physical'
    return 'General'

recs, seen = [], set()
for f in sorted(glob.glob(os.path.join(D, 'prod', '*.html'))):
    pid = os.path.basename(f)[:-5]
    s = BeautifulSoup(open(f, errors='ignore').read(), 'lxml')
    if not s.select_one('.cpxq'): continue
    name = (s.title.string or '').strip()
    if not name or name in seen: continue
    seen.add(name)
    cats = lst.get(pid, {}).get('cats', ['406'])
    seglabel, sc = SEG[cats[0]]
    txt = s.select_one('.cpxq_txt')
    lines = [x.strip() for x in (txt.get_text('\n', strip=True).split('\n') if txt else [])]
    feats = [re.sub(r'^\*\s*', '', x) for x in lines if x.startswith('*')]
    if not feats: feats = [x for x in lines if len(x) > 30][:6]
    rows = []
    tb = txt.find('table') if txt else None
    if tb:
        for tr in tb.find_all('tr'):
            cells = [re.sub(r'\s+', ' ', c.get_text(' ', strip=True)).replace('TS- ', 'TS-').replace(' A', 'A') if i == 0 or tr == tb.find('tr') else re.sub(r'\s+', ' ', c.get_text(' ', strip=True)) for i, c in enumerate(tr.find_all(['td', 'th']))]
            if any(cells): rows.append(cells)
    variants = None; specs = []
    if rows and rows[0][0].lower().startswith('model') and len(rows[0]) > 2:
        variants = [re.sub(r'\s+', '', v) for v in rows[0][1:]]
        for r in rows[1:]:
            if len(r) >= 2:
                vals = r[1:]
                specs.append([r[0], vals[0] if len(set(vals)) == 1 else ' / '.join(vals)])
    else:
        for r in rows:
            if len(r) >= 2 and r[0].lower() != 'model': specs.append([r[0], ' · '.join(r[1:])])
    m = re.match(r'\s*((?:[A-Z]{1,4}-?[A-Z0-9]*\d[A-Z0-9\-]*)(?:\s*/\s*[A-Z]{1,4}-?[A-Z0-9]*\d[A-Z0-9\-]*)*)\s*(.*)', name)
    model = m.group(1).replace(' ', '') if m else name.split()[0]
    typ = (m.group(2).strip() if m and m.group(2).strip() else seglabel)
    imgs = []
    for i in s.select('.cpxq_pic img, .xqpicbox img'):
        u = i.get('src') or i.get('data-original')
        if u and u not in imgs: imgs.append(BASE + u if u.startswith('/') else u)
    if not imgs and lst.get(pid, {}).get('thumb'): imgs = [BASE + lst[pid]['thumb']]
    pdfs = sorted({BASE + a['href'] if a['href'].startswith('/') else a['href'] for a in s.find_all('a', href=True) if a['href'].lower().endswith('.pdf')})
    specs = [[fix(re.sub(r'\b([A-Z]) ([a-z])', r'\1\2', l)), fix(v)] for l, v in specs]
    feats = [fix(x) for x in feats]
    if not re.fullmatch(r'[A-Z]{1,5}-?[A-Z0-9\-]*\d[A-Z0-9/\-]*', model) or not specs: continue
    hl = [[l, v] for l, v in specs if any(k in l.lower() for k in ['frequency', 'resolution', 'zoom', 'channel', 'sensitivity', 'battery', 'distance', 'screen', 'band'])][:4] or specs[:3]
    rid = 'itc-' + slug(model.split('/')[0])
    while rid in existing: rid += '-c'
    existing.add(rid)
    recs.append(dict(id=rid, src_id=pid, src_url=f'{BASE}/pro/index/art/{pid}.html', name=f'itc {model}', full_name=f'itc {name}', model=model, variants=variants,
                     type=typ, itc_segment=cats[0], segment_label=seglabel, site_category=sc, excerpt='', features=[[short(x), x if len(short(x)) < len(x.rstrip('.')) else ''] for x in feats[:8]],
                     highlights=hl, specs=[[group_of(l), l, v] for l, v in specs], gallery=imgs[:4], pdf=pdfs[0] if pdfs else None,
                     applications=APPS[sc], use=USE[sc]))
json.dump(recs, open(os.path.join(D, 'itc_catalog.json'), 'w'), indent=1, ensure_ascii=False)
import collections
print(len(recs), collections.Counter(r['segment_label'] for r in recs), sum(1 for r in recs if not r['specs']), sum(1 for r in recs if not r['gallery']))
