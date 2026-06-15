const reasons = [
  {
    num: '01',
    title: '100% Genuine Products',
    desc: 'Authorized distributor of every brand we carry. Full manufacturer warranty, no grey imports, zero compromises on authenticity.',
  },
  {
    num: '02',
    title: 'Expert System Engineering',
    desc: 'Our acoustic engineers design the system for your space — not a one-size-fits-all catalog solution. Site surveys included.',
  },
  {
    num: '03',
    title: 'End-to-End Project Delivery',
    desc: 'Design, supply, installation, commissioning and after-sales support. A single point of responsibility from brief to handover.',
  },
  {
    num: '04',
    title: 'Nationwide Coverage',
    desc: 'Service teams across all 7 provinces. Rapid response whether you\'re in Kathmandu or the most remote district.',
  },
]

export default function WhySection() {
  return (
    <section id="why" className="section-padding bg-white">
      <div className="container-site">
        <div className="text-center mb-16 reveal">
          <div className="eyebrow mb-4">Why AudioVisual Nepal</div>
          <h2 className="heading-section">Built Different.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5 rounded-2xl overflow-hidden">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="bg-[#F5F5F7] hover:bg-[#EBEBF0] px-12 py-14 transition-colors duration-300 reveal"
              style={{
                borderRadius:
                  i === 0 ? '20px 0 0 0' :
                  i === 1 ? '0 20px 0 0' :
                  i === 2 ? '0 0 0 20px' :
                  '0 0 20px 0',
              }}
            >
              <div
                className="font-display font-extrabold text-[72px] leading-none mb-3 tracking-[-0.04em]"
                style={{ color: 'rgba(0,113,227,0.12)' }}
              >
                {r.num}
              </div>
              <h3 className="font-display font-bold text-2xl mb-3 text-[#111]">{r.title}</h3>
              <p className="text-[16px] text-[#6E6E73] leading-[1.7]">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
