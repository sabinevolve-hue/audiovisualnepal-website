import Link from 'next/link'
import { BRANDS } from '@/lib/constants'

export default function BrandsSection() {
  return (
    <section id="brands" className="section-padding bg-white">
      <div className="container-site">
        <div className="text-center mb-16 reveal">
          <div className="eyebrow mb-4">Trusted Brands</div>
          <h2 className="heading-section">
            World-Class Brands.<br />Local Expertise.
          </h2>
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              className="group bg-[#F5F5F7] hover:bg-[#111111] px-9 py-5 rounded-2xl font-display font-bold text-lg text-[#555] hover:text-white transition-all duration-250 hover:scale-105 reveal"
            >
              {brand.name}
            </Link>
          ))}
        </div>

        <p className="text-center text-sm text-[#6E6E73] mt-10 reveal">
          Authorized distributor for all brands. Full manufacturer warranty on every product.
        </p>
      </div>
    </section>
  )
}
