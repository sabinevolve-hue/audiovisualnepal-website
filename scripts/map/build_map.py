"""Build AVN Nepal project-map data from the nepalpublicdata.com map (nepal-geo-data shapes) + project list.
usage: build_map.py <dir with map.json + places.csv> <repo>"""
import json, csv, sys, os
D, REPO = sys.argv[1], sys.argv[2]
m = json.load(open(os.path.join(D, 'map.json')))
places = {r['code']: r for r in csv.DictReader(open(os.path.join(D, 'places.csv')))}

# slug, title, client, sector, segment, local-level code, location text, scope, image, year, href
P = [
 ('siddhartha-bank-head-office', 'Siddhartha Bank Head Office', 'Siddhartha Bank', 'Banking', 'Fine-pitch COB LED', '30608', 'Naxal, Kathmandu', 'COB LMini P1.25 fine-pitch LED display · 110 sq ft', '/images/projects-real/siddhartha-bank-head-office.webp', '', '/projects/siddhartha-bank-head-office'),
 ('cob-control-room-kathmandu', "Nepal's first COB LED control room", 'Corporate client (name withheld)', 'Corporate', 'Control room LED', '30608', 'Kathmandu', 'P1.5 COB · 4 × 2 m · 600 nits · 3,840 Hz', '', '2024', ''),
 ('national-soil-science-research-centre', 'National Soil Science Research Centre', 'Government of Nepal, Ministry of Agriculture', 'Government', 'Outdoor LED', '30802', 'Lalitpur', 'P5 outdoor · 4 × 2.5 m · 6,000 nits · IP65', '', '2023', ''),
 ('tokha-municipality-ward-5', 'Tokha Municipality Ward No. 5', 'Tokha Municipality', 'Government', 'Outdoor LED', '30605', 'Tokha, Kathmandu', 'P6 outdoor · 3 × 2 m · 5,500 nits · IP65', '', '2023', ''),
 ('thamel-hotel-lobby-wall', 'Curved hotel lobby wall, Thamel', '4-star hotel (name withheld)', 'Hospitality', 'Indoor creative LED', '30608', 'Thamel, Kathmandu', 'P2.5 indoor · 6 × 2.5 m curved · 1,000 nits', '', '2024', ''),
 ('retail-chain-digital-signage', 'Multi-branch retail signage network', 'Retail chain (name withheld)', 'Retail', 'Indoor LED signage', '30608', 'Multiple sites, Kathmandu', 'P2.5–P3 indoor · networked CMS', '', '2022–2024', ''),
 ('school-entrance-display-kathmandu', 'School entrance information display', 'Private secondary school (name withheld)', 'Education', 'Outdoor LED', '30608', 'Kathmandu Valley', 'P4 outdoor · 3 × 1.5 m · 5,000 nits', '', '2023', ''),
 ('golyan-group-boardroom', 'Golyan Group corporate boardroom', 'Golyan Group', 'Corporate', 'Boardroom LED', '30608', 'Kathmandu', 'Indoor fine pitch · wireless presentation', '/images/projects-real/ldn-np1.webp', '2026', ''),
 ('huawei-nepal-briefing-room', 'Corporate briefing & event space', 'Huawei Nepal', 'Corporate', 'Boardroom LED', '30608', 'Kathmandu', 'Indoor fine pitch · main wall + secondary · VC integration', '/images/projects-real/ldn-np3.webp', '2026', ''),
 ('kgh-digital-art-gallery', 'Digital & AI art gallery', 'KGH Group · Kathmandu Art House', 'Entertainment', 'Indoor creative LED', '30608', 'Kathmandu', 'Indoor fine pitch · gallery-grade colour', '/images/projects-real/ldn-np2.webp', '2026', ''),
 ('nagdhunga-dooh', 'Nagdhunga highway DOOH screen', 'LED Matrix', 'Advertising', 'Outdoor LED', '30610', 'Nagdhunga, Kathmandu', 'Lampro LDT P8 outdoor · highway-facing', '/images/projects-real/ldn-nagdhunga-dooh.webp', '2026', ''),
 ('universal-advertising-butwal', 'Lakhan Thapa Chowk DOOH screen', 'Universal Advertising Pvt Ltd', 'Advertising', 'Outdoor LED', '50802', 'Lakhan Thapa Chowk, Butwal', 'Lampro LDT P8 outdoor · junction site', '/images/projects-real/ldn-butwal-lakhan-thapa-chowk.webp', '2026', ''),
 ('coffee-break-pokhara', 'Coffee Break restaurant display', 'Coffee Break', 'Hospitality', 'Outdoor LED', '40504', 'Pokhara', 'Lampro LDT P4 outdoor · ~11 m²', '', '2026', ''),
 ('str-advertising-dooh', 'STR Advertising outdoor DOOH screen', 'STR Advertising Pvt Ltd', 'Advertising', 'Outdoor LED', '30608', 'Kathmandu', 'Unilumin P10 outdoor · ~160 m² · curved building wrap', '/images/projects-real/ldn-str-advertising.webp', '', ''),
 ('laxman-babu-bhawan', 'Laxman Babu Bhawan outdoor billboard', 'Laxman Babu Bhawan', 'Advertising', 'Outdoor LED', '30608', 'Naxal, Kathmandu', 'P8 outdoor · ~80 m² · building-mounted', '/images/projects-real/ldn-laxman-babu-bhawan.webp', '', ''),
 ('gwakhancha-restro-bar', 'Gwakhancha Restro & Bar', 'Gwakhancha Restro & Bar', 'Hospitality', 'Indoor creative LED', '30702', 'Taumadhi Square, Bhaktapur', 'BNX 2.5 · 48.5 sq ft', '', '', ''),
 ('maccha-ghar-lazimpat', 'Maccha Ghar', 'Maccha Ghar', 'Hospitality', 'Indoor LED', '30608', 'Lazimpat, Kathmandu', 'LC P4 indoor · 39.6 sq ft', '', '', ''),
 ('vesper-and-vine', 'Vesper and Vine', 'Vesper and Vine Restaurant', 'Hospitality', 'Outdoor LED', '30608', 'Tinchuli, Boudha', 'LC P4 outdoor · 49.6 sq ft', '', '', ''),
 ('reliance-college', 'Reliance College', 'Reliance College', 'Education', 'Indoor LED', '30608', 'Chabahil, Kathmandu', 'LCM P2.5 indoor · 79.4 sq ft', '', '', ''),
 ('purwanchal-cafe-itahari', 'Purwanchal Cafe', 'Purwanchal Cafe', 'Hospitality', 'Outdoor LED', '11306', 'Itahari', 'LC P4 outdoor · 30.9 sq ft', '', '', ''),
 ('nabil-foodland', 'Nabil Foodland & Party Palace', 'Nabil Foodland and Party Palace', 'Hospitality', 'Indoor LED', '30608', 'Narayantar, Kathmandu', 'LC P4 indoor · 39.7 sq ft', '', '', ''),
 ('hotel-kailash-kutee', 'Hotel Kailash Kutee', 'Hotel Kailash Kutee', 'Hospitality', 'Outdoor LED', '30608', 'Thamel, Kathmandu', 'LC P4 outdoor · 26.5 sq ft', '', '', ''),
 ('auranex-restaurant', 'Auranex Restaurant', 'Auranex Restaurant', 'Hospitality', 'Outdoor LED', '30608', 'Town Planning, Kathmandu', 'LC P4 outdoor · 49.6 sq ft', '/images/projects-real/auranex-restaurant.webp', '', ''),
 ('awarded-international-education', 'Awarded International Education', 'Awarded International Education', 'Education', 'Indoor LED', '30608', 'Star Mall, Putalisadak', 'LCM P2.5 indoor · 29.8 sq ft', '/images/projects-real/awarded-international-education.webp', '', ''),
 ('dibya-ratna-consultant', 'Dibya Ratna Consultant', 'Dibya Ratna Consultant Pvt Ltd', 'Corporate', 'Fine-pitch COB LED', '30608', 'Battisputali, Kathmandu', 'LDT COB P1.5 · 33.2 sq ft', '/images/projects-real/dibya-ratna-consultant.webp', '', ''),
 ('jeevan-jyoti-school', 'Jeevan Jyoti School', 'Jeevan Jyoti School', 'Education', 'Indoor LED', '51102', 'Kohalpur, Banke', 'LC P3 indoor · 266 sq ft', '/images/projects-real/jeevan-jyoti-school.webp', '', '/projects/jeevan-jyoti-school'),
 ('fcube-cinemas', 'FCube Cinemas', 'FCube Cinemas', 'Entertainment', 'Indoor LED', '30608', 'Boudha, Kathmandu', 'LC P2.5 indoor fine-pitch LED · 26 sq ft', '/images/projects-real/fcube-cinemas.webp', '', '/projects/fcube-cinemas'),
 ('inland-multi-cuisine-stay', 'Inland Multi Cuisine & Stay', 'Inland Multi Cuisine & Stay', 'Hospitality', 'Outdoor LED', '30604', 'Budhanilkantha, Kathmandu', 'LC P2.5 outdoor LED · 31 sq ft', '/images/projects-real/inland-multi-cuisine-stay.webp', '', ''),
 ('anong-store', 'Anong Store', 'Anong Store', 'Retail', 'Indoor LED', '30802', 'Jawalakhel, Lalitpur', 'LC P2.5 indoor LED · 17 sq ft', '/images/projects-real/anong-store.webp', '', ''),
 ('shree-shiva-enterprises', 'Shree Shiva Enterprises', 'Shree Shiva Enterprises', 'Commercial', 'Outdoor LED', '30801', 'Siddhipur, Lalitpur', 'LC P5 outdoor LED · 40 sq ft', '/images/projects-real/shree-shiva-enterprises.webp', '', ''),
]
recs = []
for s, t, c, sec, seg, lc, loc, scope, img, yr, href in P:
    d = places[lc]['parent']; pr = places[d]['parent']
    recs.append(dict(slug=s, title=t, client=c, sector=sec, segment=seg, line='LED Displays', local=lc, district=d, province=pr,
                     location=loc, scope=scope, image=img, year=yr, href=href))
dists = sorted({r['district'] for r in recs})
out = dict(viewBox=m['meta']['viewBox'], nepal=m['nepal'], province=m['province'], district=m['district'],
           local={k: v for k, v in m['local'].items() if k[:3] in dists},
           label={k: [round(v[0], 1), round(v[1], 1)] for k, v in m['label'].items() if len(k) <= 3 or k[:3] in dists},
           name={k: places[k]['name_en'] for k in places if k != 'NP' and (len(k) <= 3 or k[:3] in dists)},
           ltype={k: places[k]['type_en'] for k in places if len(k) == 5 and k[:3] in dists},
           source='Boundaries: nepal-geo-data 0.3.3 (MIT, Bedbyas Pokhrel), simplified, via nepalpublicdata.com; codes and names: National Statistics Office. Approximate, for illustration.')
os.makedirs(os.path.join(REPO, 'public', 'data'), exist_ok=True)
s = json.dumps(out, separators=(',', ':'), ensure_ascii=False)
open(os.path.join(REPO, 'public', 'data', 'nepal-map.json'), 'w').write(s)
ts = ('// Installed projects with NSO place codes (local level -> district -> province) for the Nepal project map.\n'
      '// Generated by scripts/map/build_map.py. Sources: AVN verified projects + Evolve Tech own installations\n'
      '// (leddisplaynepal.com, attribution "own" only — never manufacturer reference installs).\n\n'
      'export type MapProject = { slug: string; title: string; client: string; sector: string; segment: string; line: string; local: string; district: string; province: string; location: string; scope: string; image: string; year: string; href: string }\n\n'
      'export const MAP_PROJECTS: MapProject[] = ' + json.dumps(recs, ensure_ascii=False, indent=1) + '\n')
open(os.path.join(REPO, 'src', 'data', 'projectMap.ts'), 'w').write(ts)
print('map bytes', len(s), 'projects', len(recs), 'districts', dists)
