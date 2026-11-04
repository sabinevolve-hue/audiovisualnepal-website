"""ITC pro-sound system drawings (SVG): per-venue signal-flow schematic + plan-view coverage
drawing, plus a rack elevation and a segment map. Original AVN drawings (no manufacturer art)."""
import os, sys, math, json
OUT = sys.argv[1]
os.makedirs(OUT, exist_ok=True)
INK, MUTE, LINE, ACC, ACC2, BG = '#0B1E3D', '#64748B', '#CBD5E1', '#EA580C', '#2563EB', '#FFFFFF'
FONT = "font-family='Inter,Segoe UI,Arial,sans-serif'"

from xml.sax.saxutils import escape as X
def box(x, y, w, h, title, sub='', fill='#F8FAFC', stroke=LINE, tc=INK, r=10):
    title, sub = X(title), X(sub)
    s = f"<rect x='{x}' y='{y}' width='{w}' height='{h}' rx='{r}' fill='{fill}' stroke='{stroke}' stroke-width='1.5'/>"
    s += f"<text x='{x+w/2}' y='{y+h/2-(6 if sub else -5)}' text-anchor='middle' {FONT} font-size='13' font-weight='700' fill='{tc}'>{title}</text>"
    if sub:
        sc = '#CBD5E1' if fill == '#0B1E3D' else MUTE
        s += f"<text x='{x+w/2}' y='{y+h/2+13}' text-anchor='middle' {FONT} font-size='11' fill='{sc}'>{sub}</text>"
    return s

def arrow(x1, y1, x2, y2, label='', c=ACC2, dash=False):
    mx = (x1 + x2) / 2
    d = f"M{x1},{y1} C{mx},{y1} {mx},{y2} {x2},{y2}"
    da = 'stroke-dasharray="5 4"' if dash else ''
    s = f"<path d='{d}' fill='none' stroke='{c}' stroke-width='2' {da} marker-end='url(#ah)'/>"
    if label:
        s += f"<text x='{mx}' y='{(y1+y2)/2-6}' text-anchor='middle' {FONT} font-size='10' fill='{MUTE}'>{label}</text>"
    return s

def svg(w, h, body, title):
    return (f"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 {w} {h}' width='{w}' height='{h}' role='img' aria-label='{title}'>"
            f"<defs><marker id='ah' viewBox='0 0 10 10' refX='9' refY='5' markerWidth='7' markerHeight='7' orient='auto'><path d='M0,0 L10,5 L0,10 z' fill='{ACC2}'/></marker></defs>"
            f"<rect width='{w}' height='{h}' fill='{BG}'/>{body}</svg>")

# ---- venue system definitions (models from the itc solution pages + catalogue) ----
VENUES = {
 'stadium': dict(title='Stadium & Sports Ground', dims=(160, 110),
   sources=[('Wireless mics', 'T-592UV'), ('Announcer desk', 'TS-301DM'), ('Playback / BGM', 'Media player')],
   mixer=('Digital mixer', 'TS-24PD-12'), proc=('Feedback suppressor', 'TS-224DX'),
   amps=[('Amplifiers — mains', 'TC-21000 ×4'), ('Amplifiers — subs', 'TC-23000 ×2')],
   spk=[('Line array mains', 'KF-D212 ×8/side'), ('Array subwoofers', 'KF-D218S ×4/side'), ('Stand fills', 'KF-D15H'), ('Long-throw horns', 'TS-3H')],
   plan='stadium'),
 'banquet-hall': dict(title='Banquet Hall', dims=(40, 25),
   sources=[('Wireless mics', 'T-592UH ×4'), ('Lectern mic', 'TS-548MD'), ('Music / DJ', 'Line input')],
   mixer=('Mixer with DSP', 'TS-16PFX-4'), proc=('Audio processor', 'TS-3400MIX'),
   amps=[('Amplifier', 'TC-21000'), ('Amplifier — fills', 'TC-4500B')],
   spk=[('Main line array', 'KS-210 ×4/side'), ('Delay / fill', 'KS-10H'), ('Portable column', 'KS-12A35'), ('Stage monitor', 'KS-14F')],
   plan='hall'),
 'concert-hall': dict(title='Concert Hall', dims=(50, 30),
   sources=[('Instrument & vocal mics', 'TS-316M / TS-304DM'), ('Wireless vocal', 'T-592UW'), ('Stage DI / playback', 'Line input')],
   mixer=('Digital mixer', 'TS-32PD-12'), proc=('Digital mixer DSP', 'EQ / delay / matrix'),
   amps=[('Amplifiers — mains', 'TC-21200 ×4'), ('Amplifiers — subs', 'TC-23000 ×2')],
   spk=[('Line array mains', 'KS-210 ×6/side'), ('Array subwoofers', 'KS-S218 ×3/side'), ('Front fill', 'KS-10H'), ('Monitors', 'KS-14F ×4')],
   plan='hall'),
 'conference-hall': dict(title='Conference Hall', dims=(30, 20),
   sources=[('Gooseneck / desk mics', 'TS-301DM2'), ('Wireless handheld', 'T-592UL'), ('PC / video audio', 'Desktop socket TS-18D')],
   mixer=('Smart mixer', 'TS-D1604X'), proc=('Feedback suppressor', 'TS-224D'),
   amps=[('4-ch DSP amplifier', 'TC-D4350'), ('Amplifier', 'TC-2500B')],
   spk=[('Column speakers', 'TS-803C ×2'), ('Fill speakers', 'TS-608A'), ('Wall speakers', 'TS-605T'), ('Rear delay', 'TS-606H')],
   plan='conference'),
 'ktv': dict(title='KTV / Karaoke Room', dims=(6, 5),
   sources=[('Wireless mics', 'T-592US ×2'), ('KTV player', 'Song system'), ('BGM', 'Line input')],
   mixer=('KTV processor / amplifier', 'T-2350KS'), proc=('Built-in DSP', 'Reverb · echo · anti-feedback'),
   amps=[('Power amplifier — subs', 'KT-P21000')],
   spk=[('Main full-range', 'KT-H12 ×2'), ('Subwoofer', 'KT-DS218'), ('Effects speakers', 'TS-29B ×2')],
   plan='ktv'),
 'studio-room': dict(title='Studio Room', dims=(8, 6),
   sources=[('Vocal mic', 'TS-304DM'), ('Instrument / overhead', 'TS-316M'), ('DAW playback', 'USB / line')],
   mixer=('Digital mixer', 'TS-32PD-12'), proc=('Monitor control', 'Mixer matrix'),
   amps=[('Active monitors', 'self-powered')],
   spk=[('Main monitors', 'TS-612P ×2'), ('Near-field', 'TS-610P ×2'), ('Talkback', 'TS-605T')],
   plan='studio'),
 'theatre': dict(title='Theatre', dims=(35, 28),
   sources=[('Headset / lavalier', 'T-592UT ×8'), ('Orchestra mics', 'TS-316M'), ('Playback / effects', 'Show control')],
   mixer=('Digital mixer', 'TS-24PD-12'), proc=('Immersive controller', 'TS-CJ00A (option)'),
   amps=[('Amplifiers — mains', 'TC-21000 ×3'), ('Amplifiers — surrounds', 'TC-4500B')],
   spk=[('Proscenium array', 'KS-210 ×4/side'), ('Subwoofers', 'KS-S218 ×2'), ('Front / balcony fill', 'KS-10H'), ('Stage monitors', 'KS-14F')],
   plan='hall'),
 'vocal-concert': dict(title='Vocal Concert / Outdoor Show', dims=(60, 40),
   sources=[('Wireless vocal', 'T-592UW ×4'), ('Band mics', 'TS-338 / TS-316M'), ('Backing tracks', 'Line input')],
   mixer=('Digital mixer', 'TS-32PD-12'), proc=('Mixer DSP', 'System EQ / delay'),
   amps=[('Amplifiers — arrays', 'TC-21200 ×6'), ('Amplifiers — subs', 'TC-23000 ×3')],
   spk=[('Flown line array', 'LA-2800K ×8/side'), ('Ground subs', 'LA-1800K ×6/side'), ('Side fill', 'KS-12A35'), ('Wedges', 'KS-14F ×6')],
   plan='stadium'),
}

def flow(key, v):
    W, H = 1100, 470
    b = f"<text x='30' y='38' {FONT} font-size='20' font-weight='800' fill='{INK}'>{v['title']} — system signal flow</text>"
    b += f"<text x='30' y='60' {FONT} font-size='12' fill='{MUTE}'>Indicative design by AudioVisual Nepal using itc professional sound equipment. Final quantities confirmed by site survey / EASE simulation.</text>"
    cols = [40, 290, 520, 750]
    # column headers
    for x, t in zip(cols, ['SOURCES', 'MIXING', 'PROCESSING &amp; POWER', 'LOUDSPEAKERS']):
        b += f"<text x='{x}' y='95' {FONT} font-size='11' font-weight='800' letter-spacing='1.5' fill='{ACC}'>{t}</text>"
    ys = [115, 205, 295]
    for i, (t, s) in enumerate(v['sources']):
        b += box(cols[0], ys[i], 200, 62, t, s)
    b += box(cols[1], 195, 180, 82, v['mixer'][0], v['mixer'][1], fill='#0B1E3D', stroke='#0B1E3D', tc='#FFFFFF')
    for i in range(len(v['sources'])):
        b += arrow(cols[0] + 200, ys[i] + 31, cols[1], 236, 'mic/line' if i < 2 else 'line')
    b += box(cols[2], 115, 190, 62, v['proc'][0], v['proc'][1], fill='#FFF7ED', stroke='#FDBA74')
    b += arrow(cols[1] + 180, 236, cols[2], 146, 'AES/analog')
    ay = [215, 305]
    for i, (t, s) in enumerate(v['amps'][:2]):
        b += box(cols[2], ay[i], 190, 62, t, s, fill='#EFF6FF', stroke='#93C5FD')
        b += arrow(cols[2] + 95, 177, cols[2] + 95, ay[i], '', dash=True) if i == 0 else ''
    if len(v['amps']) > 1:
        b += f"<path d='M{cols[2]+95},277 L{cols[2]+95},305' stroke='{ACC2}' stroke-width='2' stroke-dasharray='5 4' marker-end='url(#ah)'/>"
    sy = [100, 180, 260, 340]
    for i, (t, s) in enumerate(v['spk'][:4]):
        b += box(cols[3], sy[i], 300, 60, t, s)
        src = ay[0] + 31 if (i == 0 or len(v['amps']) == 1 or i >= 2) else ay[1] + 31
        if i == 1 and len(v['amps']) > 1: src = ay[1] + 31
        b += arrow(cols[2] + 190, src, cols[3], sy[i] + 30, 'speaker line' if i == 0 else '')
    b += f"<g transform='translate(40,420)'><rect width='14' height='4' y='-2' fill='{ACC2}'/><text x='22' y='4' {FONT} font-size='11' fill='{MUTE}'>Audio signal</text>"
    b += f"<rect x='130' width='14' height='4' y='-2' fill='none' stroke='{ACC2}' stroke-dasharray='4 3'/><text x='152' y='4' {FONT} font-size='11' fill='{MUTE}'>Processed feed</text>"
    b += f"<rect x='270' y='-8' width='14' height='14' rx='3' fill='#0B1E3D'/><text x='292' y='4' {FONT} font-size='11' fill='{MUTE}'>Control point (FOH)</text>"
    b += f"<text x='520' y='4' {FONT} font-size='11' fill='{MUTE}'>audiovisualnepal.com · Survey, design, install &amp; AMC across Nepal</text></g>"
    return svg(W, H, b, f"{v['title']} signal flow")

def cone(cx, cy, ang, spread, length, c):
    a1, a2 = math.radians(ang - spread / 2), math.radians(ang + spread / 2)
    p1 = (cx + length * math.cos(a1), cy + length * math.sin(a1)); p2 = (cx + length * math.cos(a2), cy + length * math.sin(a2))
    return f"<path d='M{cx},{cy} L{p1[0]:.1f},{p1[1]:.1f} A{length},{length} 0 0 1 {p2[0]:.1f},{p2[1]:.1f} Z' fill='{c}' fill-opacity='0.13' stroke='{c}' stroke-opacity='0.5'/>"

def spk(cx, cy, rot, c=INK):
    return f"<rect x='{cx-9}' y='{cy-6}' width='18' height='12' rx='2' fill='{c}' transform='rotate({rot} {cx} {cy})'/>"

def plan(key, v):
    W, H = 1100, 560
    b = f"<text x='30' y='38' {FONT} font-size='20' font-weight='800' fill='{INK}'>{v['title']} — plan view &amp; coverage</text>"
    b += f"<text x='30' y='60' {FONT} font-size='12' fill='{MUTE}'>Not to scale · reference room {v['dims'][0]} × {v['dims'][1]} m · shaded areas show nominal -6 dB horizontal coverage</text>"
    x0, y0, w, h = 90, 90, 760, 420
    t = v['plan']
    b += f"<defs><clipPath id='room'><rect x='{x0}' y='{y0}' width='{w}' height='{h}' rx='6'/></clipPath></defs>"
    b += f"<rect x='{x0}' y='{y0}' width='{w}' height='{h}' rx='6' fill='#F8FAFC' stroke='{INK}' stroke-width='2'/><g clip-path='url(#room)'>"
    if t in ('hall', 'conference', 'studio', 'ktv'):
        sd = 90 if t != 'ktv' else 140
        b += f"<rect x='{x0}' y='{y0}' width='{sd}' height='{h}' fill='#E2E8F0'/><text x='{x0+sd/2}' y='{y0+h/2}' text-anchor='middle' transform='rotate(-90 {x0+sd/2} {y0+h/2})' {FONT} font-size='13' font-weight='700' fill='{MUTE}'>{'STAGE' if t!='studio' else 'CONTROL DESK'}{'' if t!='ktv' else ' / SCREEN'}</text>"
        if t != 'ktv':
            for r in range(6):
                for c in range(9):
                    b += f"<rect x='{x0+sd+60+c*68}' y='{y0+40+r*62}' width='30' height='18' rx='3' fill='#CBD5E1'/>"
        L, R = (x0 + sd + 8, y0 + 30), (x0 + sd + 8, y0 + h - 30)
        b += cone(*L, 28, 90, w * 0.9, ACC2) + cone(*R, -28, 90, w * 0.9, ACC2) + spk(*L, 28) + spk(*R, -28)
        b += f"<text x='{L[0]+16}' y='{L[1]-6}' {FONT} font-size='11' font-weight='700' fill='{INK}'>{v['spk'][0][1]}</text>"
        b += f"<text x='{R[0]+16}' y='{R[1]+18}' {FONT} font-size='11' font-weight='700' fill='{INK}'>{v['spk'][0][1]}</text>"
        if t in ('hall', 'conference'):
            for yy in (y0 + h * 0.28, y0 + h * 0.72):
                b += cone(x0 + w * 0.5, yy, 0, 80, 230, ACC) + spk(x0 + w * 0.5, yy, 0, ACC)
            b += f"<text x='{x0+w*0.5-10}' y='{y0+h*0.28-14}' {FONT} font-size='11' fill='{ACC}' font-weight='700'>{v['spk'][2][1]} — delay ring</text>"
            b += f"<rect x='{x0+w-120}' y='{y0+h/2-28}' width='90' height='56' rx='6' fill='#0B1E3D'/><text x='{x0+w-75}' y='{y0+h/2+4}' text-anchor='middle' {FONT} font-size='11' font-weight='700' fill='#fff'>FOH / MIX</text>"
        if t == 'ktv':
            b += f"<rect x='{x0+w/2-120}' y='{y0+h-140}' width='240' height='70' rx='30' fill='#CBD5E1'/><text x='{x0+w/2}' y='{y0+h-100}' text-anchor='middle' {FONT} font-size='12' fill='{MUTE}'>Sofa / seating</text>"
            b += spk(x0 + sd + 20, y0 + h / 2, 0, ACC) + f"<text x='{x0+sd+34}' y='{y0+h/2+4}' {FONT} font-size='11' fill='{ACC}' font-weight='700'>{v['spk'][1][1]}</text>"
    else:  # stadium / outdoor
        b += f"<ellipse cx='{x0+w/2}' cy='{y0+h/2}' rx='{w/2-70}' ry='{h/2-70}' fill='#DCFCE7' stroke='#16A34A'/>"
        b += f"<text x='{x0+w/2}' y='{y0+h/2+4}' text-anchor='middle' {FONT} font-size='14' font-weight='700' fill='#15803D'>{'FIELD' if key=='stadium' else 'AUDIENCE'}</text>"
        for (cx, cy, a) in [(x0 + 40, y0 + 40, 35), (x0 + w - 40, y0 + 40, 145), (x0 + 40, y0 + h - 40, -35), (x0 + w - 40, y0 + h - 40, -145)]:
            b += cone(cx, cy, a, 70, 330, ACC2) + spk(cx, cy, a)
        for i in range(5):
            cx = x0 + 130 + i * 125
            b += cone(cx, y0 + 12, 90, 60, 70, ACC) + spk(cx, y0 + 12, 90, ACC) + cone(cx, y0 + h - 12, -90, 60, 70, ACC) + spk(cx, y0 + h - 12, -90, ACC)
        b += f"<text x='{x0+50}' y='{y0+30}' {FONT} font-size='11' font-weight='700' fill='{INK}'>{v['spk'][0][1]}</text>"
        b += f"<text x='{x0+120}' y='{y0+h+28}' {FONT} font-size='11' font-weight='700' fill='{ACC}'>{v['spk'][2][1]} — stand / near fills</text>"
    b += "</g>"
    # legend
    lx = 880
    b += f"<text x='{lx}' y='110' {FONT} font-size='12' font-weight='800' fill='{INK}'>Loudspeakers</text>"
    for i, (tt, s) in enumerate(v['spk']):
        b += f"<rect x='{lx}' y='{126+i*42}' width='14' height='10' rx='2' fill='{INK if i!=2 else ACC}'/><text x='{lx+22}' y='{135+i*42}' {FONT} font-size='12' font-weight='700' fill='{INK}'>{tt}</text><text x='{lx+22}' y='{151+i*42}' {FONT} font-size='11' fill='{MUTE}'>{s}</text>"
    b += f"<text x='{lx}' y='{140+len(v['spk'])*42+20}' {FONT} font-size='12' font-weight='800' fill='{INK}'>Design targets</text>"
    for i, tt in enumerate(['SPL uniformity ±3 dB', 'STI ≥ 0.6 speech zones', 'Delay-aligned fills', 'EASE model on request']):
        b += f"<text x='{lx}' y='{140+len(v['spk'])*42+42+i*18}' {FONT} font-size='11' fill='{MUTE}'>• {tt}</text>"
    return svg(W, H, b, f"{v['title']} plan view")

def rack():
    W, H = 620, 640
    units = [('Digital mixer interface', 'TS-24PD-12 stagebox / I/O', 2, '#0B1E3D'), ('Audio processor', 'TS-3400MIX', 1, '#334155'), ('Feedback suppressor', 'TS-224DX', 1, '#334155'),
             ('Wireless receiver', 'T-592UW', 1, '#475569'), ('Antenna splitter', 'T-523A', 1, '#475569'), ('Amplifier — mains L/R', 'TC-21000', 2, '#1E3A8A'),
             ('Amplifier — subs', 'TC-23000', 2, '#1E3A8A'), ('Amplifier — fills/monitors', 'TC-4500B (4-ch)', 2, '#1E3A8A'), ('Power sequencer / distribution', 'Sequenced mains', 1, '#64748B'), ('Vent panel', '', 1, '#E2E8F0')]
    b = f"<text x='30' y='38' {FONT} font-size='20' font-weight='800' fill='{INK}'>Typical FOH / amplifier rack</text>"
    b += f"<text x='30' y='58' {FONT} font-size='12' fill='{MUTE}'>19-inch rack elevation · 1U = 44.45 mm · indicative</text>"
    x, y, w, u = 120, 80, 380, 34
    tot = sum(n for *_, n, _ in units)
    b += f"<rect x='{x-24}' y='{y-10}' width='{w+48}' height='{tot*u+20}' rx='6' fill='#1F2937'/>"
    for t, s, n, c in units:
        b += f"<rect x='{x}' y='{y}' width='{w}' height='{n*u-3}' rx='3' fill='{c}'/>"
        tc = '#FFFFFF' if c != '#E2E8F0' else MUTE
        b += f"<text x='{x+14}' y='{y+n*u/2+1}' {FONT} font-size='12' font-weight='700' fill='{tc}'>{t}</text><text x='{x+w-14}' y='{y+n*u/2+1}' text-anchor='end' {FONT} font-size='11' fill='{tc}' opacity='0.8'>{s}</text>"
        b += f"<text x='{x-34}' y='{y+n*u/2+4}' text-anchor='end' {FONT} font-size='10' fill='{MUTE}'>{n}U</text>"
        y += n * u
    return svg(W, H, b, 'FOH and amplifier rack elevation')

def segment_map(segs):
    W, H = 1100, 520
    b = f"<text x='30' y='40' {FONT} font-size='22' font-weight='800' fill='{INK}'>itc professional sound — product segments</text>"
    b += f"<text x='30' y='62' {FONT} font-size='12' fill='{MUTE}'>How the range fits together: capture → mix → process → amplify → reproduce</text>"
    stages = [('CAPTURE', ['Microphones']), ('MIX', ['Mixing Consoles']), ('PROCESS &amp; CONTROL', ['Audio Peripherals', 'Immersive Sound']), ('AMPLIFY', ['Amplifiers']), ('REPRODUCE', ['Line Array Speakers', 'Professional Loudspeakers', 'Subwoofers'])]
    x = 30
    for i, (st, items) in enumerate(stages):
        b += f"<text x='{x}' y='110' {FONT} font-size='11' font-weight='800' letter-spacing='1.5' fill='{ACC}'>{st}</text>"
        for j, it in enumerate(items):
            n = segs.get(it, 0)
            b += box(x, 125 + j * 110, 190, 90, it, f'{n} products' if n else '', fill='#F8FAFC' if i % 2 else '#EFF6FF')
        if i < len(stages) - 1:
            b += arrow(x + 190, 170, x + 215, 170)
        x += 215
    return svg(W, H, b, 'itc product segment map')

def _esc(o):
    if isinstance(o, str): return X(o)
    if isinstance(o, (list, tuple)): return type(o)(_esc(i) for i in o)
    if isinstance(o, dict): return {k: (_esc(v) if k != 'plan' else v) for k, v in o.items()}
    return o

if __name__ == '__main__':
    RAW = VENUES
    VENUES = {k: _esc(v) for k, v in RAW.items()}
    files = []
    for k, v in VENUES.items():
        for kind, fn in (('flow', flow), ('plan', plan)):
            p = os.path.join(OUT, f'itc-{k}-{kind}.svg'); open(p, 'w').write(fn(k, v)); files.append(p)
    open(os.path.join(OUT, 'itc-rack-elevation.svg'), 'w').write(rack())
    segs = json.loads(sys.argv[2]) if len(sys.argv) > 2 else {}
    open(os.path.join(OUT, 'itc-segment-map.svg'), 'w').write(segment_map(segs))
    json.dump({k: {kk: vv for kk, vv in v.items() if kk != 'plan'} for k, v in RAW.items()}, open(os.path.join(OUT, 'venues.json'), 'w'), indent=1)
    print(len(files) + 2, 'drawings')
