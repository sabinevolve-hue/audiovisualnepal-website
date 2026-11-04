"""Normalise scraped itc data -> itc_catalog.json (one record per product, site-ready)."""
import json, re, sys, os
D = sys.argv[1]
raw = json.loads(open(os.path.join(D, 'products.json')).read().replace('\\u00a0', ' '))

SEG_LABEL = {
 'tc-series': 'TC Series Amplifiers', 'dsp-series': 'DSP Series Amplifiers', 'dante-series': 'Dante Network Amplifiers', 'kt-series': 'KT Series Amplifiers',
 'conference-loudspeaker-series': 'Conference & Column Loudspeakers', 'multifunction-loudspeaker-series': 'Multifunction Loudspeakers',
 'monitor-speaker': 'Stage Monitors', 'subwoofer-series': 'Subwoofers', 'outdoor-loudspeaker-series': 'Outdoor Loudspeakers',
 'cinema-loudspeaker-series': 'Cinema Loudspeakers', 'stadium-horn-speaker-series': 'Stadium Horn Speakers', 'line-array-speaker': 'Line Array Speakers',
 'digital-mixer': 'Digital Mixers', 'mixer-with-dsp': 'Analog Mixers with DSP', 'wireless-microphone': 'Wireless Microphones',
 'wired-handheld-microphone': 'Wired Microphones', 'immersive-sound-system': 'Immersive Sound System', 'peripheral-device': 'Audio Peripherals',
}
SITE_CAT = {  # itc segment -> (site category slug, site category label)
 'tc-series': 'amplifiers', 'dsp-series': 'amplifiers', 'dante-series': 'amplifiers', 'kt-series': 'amplifiers',
 'line-array-speaker': 'line-array-speakers', 'subwoofer-series': 'subwoofers',
 'conference-loudspeaker-series': 'pro-loudspeakers', 'multifunction-loudspeaker-series': 'pro-loudspeakers', 'monitor-speaker': 'pro-loudspeakers',
 'outdoor-loudspeaker-series': 'pro-loudspeakers', 'cinema-loudspeaker-series': 'pro-loudspeakers', 'stadium-horn-speaker-series': 'pro-loudspeakers',
 'digital-mixer': 'mixing-consoles', 'mixer-with-dsp': 'mixing-consoles', 'wireless-microphone': 'microphones', 'wired-handheld-microphone': 'microphones',
 'immersive-sound-system': 'immersive-sound', 'peripheral-device': 'audio-peripherals',
}
PRIORITY = ['line-array-speaker', 'subwoofer-series', 'monitor-speaker', 'cinema-loudspeaker-series', 'outdoor-loudspeaker-series', 'stadium-horn-speaker-series',
            'conference-loudspeaker-series', 'multifunction-loudspeaker-series', 'digital-mixer', 'mixer-with-dsp', 'dante-series', 'kt-series', 'dsp-series', 'tc-series',
            'wireless-microphone', 'wired-handheld-microphone', 'immersive-sound-system', 'peripheral-device']
APPS = {
 'amplifiers': ['Events', 'Religious', 'Education', 'Hotel', 'Government'], 'line-array-speakers': ['Events', 'Stadium', 'Religious', 'Entertainment'],
 'subwoofers': ['Events', 'Entertainment', 'Hotel', 'Stadium'], 'pro-loudspeakers': ['Corporate', 'Education', 'Hotel', 'Religious', 'Events'],
 'mixing-consoles': ['Events', 'Religious', 'Education', 'Broadcast'], 'microphones': ['Corporate', 'Education', 'Events', 'Religious', 'Hotel'],
 'immersive-sound': ['Entertainment', 'Events', 'Corporate'], 'audio-peripherals': ['Corporate', 'Government', 'Education', 'Events'],
}
USE = {
 'amplifiers': 'powering loudspeaker systems in halls, auditoriums, places of worship, banquet venues and live events',
 'line-array-speakers': 'flown or ground-stacked main systems in concert halls, stadiums, outdoor shows and large auditoriums',
 'subwoofers': 'low-frequency extension for line arrays and full-range systems in live, club and installation work',
 'pro-loudspeakers': 'speech and music reinforcement in conference rooms, banquet halls, theatres, KTV and multipurpose venues',
 'mixing-consoles': 'front-of-house and installation mixing in halls, churches, temples, schools and live events',
 'microphones': 'speech, vocal and instrument pickup for conferences, lectures, worship and live performance',
 'immersive-sound': 'object-based immersive audio in theatres, exhibitions, theme venues and premium auditoriums',
 'audio-peripherals': 'system integration — processing, feedback control, connectivity and wireless microphone distribution',
}

def slug(s): return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')

def model_of(name):
    m = re.search(r'((?:[A-Z]{1,4}-?[A-Z0-9]*\d[A-Z0-9\-]*)(?:\s*/\s*[A-Z]{1,4}-?[A-Z0-9]*\d[A-Z0-9\-]*)*)\s*$', name)
    return m.group(1).replace(' ', '') if m else name.split()[-1]

def group_of(label):
    l = label.lower()
    if any(k in l for k in ['power', 'output']): return 'Output'
    if any(k in l for k in ['frequency', 'spl', 'coverage', 'angle', 'sensitivity', 'directiv', 'polar', 'thd', 'snr', 'dynamic', 'crosstalk', 'damping', 'gain']): return 'Performance'
    if any(k in l for k in ['impedance', 'input', 'interface', 'socket', 'connector', 'channel', 'dante', 'usb', 'network', 'port']): return 'Connectivity'
    if any(k in l for k in ['unit', 'driver', 'woofer', 'tweeter', 'speaker', 'capsule', 'element', 'pickup', 'type']): return 'Transducers'
    if any(k in l for k in ['dimension', 'weight', 'size', 'material', 'cabinet', 'finish', 'colour', 'color', 'mount', 'protection', 'ip']): return 'Physical'
    if any(k in l for k in ['voltage', 'supply', 'consumption', 'battery', 'cooling']): return 'Power & Cooling'
    return 'General'

def specs_of(rows):
    out, variants = [], None
    if rows and rows[0][0].strip().lower() in ('model', 'models') and len(rows[0]) > 2:
        variants = rows[0][1:]
        for r in rows[1:]:
            if len(r) < 2: continue
            vals = r[1:]
            if len(set(vals)) == 1: v = vals[0]
            else: v = ' / '.join(vals)
            out.append([r[0], v])
        return out, variants
    hdr = None
    for r in rows:
        if r[0].lower().startswith('notes'): break
        if len(r) == 1: hdr = r[0]; continue
        if len(r) == 2:
            if r[0].lower() == 'model': continue
            out.append([r[0], r[1]])
        else:
            if any(x.lower() in ('continuous amplifier', 'maximum power*', 'continuous', 'maximum') for x in r[1:]):
                hdr = 'Power (continuous · max)'; continue
            lab = (f'{hdr} — ' if hdr and r[0].startswith(('Stereo', 'Bridge', 'Parallel', '2Ω', '4Ω', '8Ω')) else '') + r[0]
            out.append([lab, ' · '.join(r[1:])])
    return out, variants

HL_KEYS = ['rated power', 'output power', 'power', 'frequency', 'max spl', 'maximum spl', 'coverage', 'channel', 'sensitivity', 'impedance']
cat_count = {}
recs, seen = [], set()
for p in raw:
    if not p['segments']: continue
    seg = sorted(p['segments'], key=lambda s: PRIORITY.index(s))[0]
    model = model_of(p['name'])
    if p['name'] in seen: continue
    seen.add(p['name'])
    sc = SITE_CAT[seg]
    specs, variants = specs_of(p['spec_rows'])
    typ = re.sub(r'\s*' + re.escape(model.split('/')[0]) + r'.*$', '', p['name']).strip() or SEG_LABEL[seg]
    hl = []
    for k in HL_KEYS:
        for l, v in specs:
            if k in l.lower() and [l, v] not in hl and len(hl) < 4 and len(v) < 90: hl.append([l, v])
    if len(hl) < 3:
        for l, v in specs:
            if [l, v] not in hl and len(hl) < 3 and len(v) < 90: hl.append([l, v])
    feats = [[t, d] for t, d in p['features'] if t][:8]
    if not feats and p['highlights']:
        feats = [[h.split(':')[0][:60], h] for h in p['highlights'][:4]]
    recs.append(dict(
        id=f"itc-{slug(model.split('/')[0])}", src_id=p['id'], src_url=p['url'], name=f"itc {model}" if not p['name'].lower().startswith('itc') else p['name'],
        full_name=p['name'], model=model, variants=variants, type=typ, itc_segment=seg, segment_label=SEG_LABEL[seg], site_category=sc,
        excerpt=p['excerpt'], features=feats, highlights=hl, specs=[[group_of(l), l, v] for l, v in specs],
        gallery=p['gallery'][:4], pdf=(p['pdfs'][0] if p['pdfs'] else None), applications=APPS[sc], use=USE[sc]))
    cat_count[sc] = cat_count.get(sc, 0) + 1

# unique ids
ids = {}
for r in recs:
    if r['id'] in ids: ids[r['id']] += 1; r['id'] += f"-{ids[r['id']]}"
    else: ids[r['id']] = 1
json.dump(recs, open(os.path.join(D, 'itc_catalog.json'), 'w'), indent=1, ensure_ascii=False)
print(len(recs), cat_count)
