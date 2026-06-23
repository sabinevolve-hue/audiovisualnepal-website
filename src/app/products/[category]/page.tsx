import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Search, Phone } from 'lucide-react'
import { ProductImg } from '@/components/ui/ProductImg'
import { getProducts, getProductCategories } from '@/lib/wordpress'
import { PRODUCT_CATEGORIES, SITE } from '@/lib/constants'
import { PRODUCTS_BY_CATEGORY } from '@/data/products'

export const revalidate = 3600

const BRAND_COLORS_MAP: Record<string,string> = { dsppa:'#0071E3', itc:'#E74C3C', shure:'#CC0000', jbl:'#F39C12', bose:'#1D2D44', yamaha:'#27AE60', toa:'#7B2FBE', sennheiser:'#1A6EBF' }

type Props = { params: Promise<{ category: string }>; searchParams: Promise<{ page?: string; search?: string }> }

// Build a static category map from constants as fallback
const STATIC_CATS = PRODUCT_CATEGORIES.map((c, i) => ({
  id: i + 1,
  name: c.label,
  slug: c.href.replace('/products/', ''),
  description: '',
  count: c.count,
  link: c.href,
}))

export async function generateStaticParams() {
  return STATIC_CATS.map(c => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = STATIC_CATS.find(c => c.slug === category)
  if (!cat) return { title: 'Products — AudioVisual Nepal' }
  return {
    title: `${cat.name} — AudioVisual Nepal`,
    description: `Professional ${cat.name.toLowerCase()} for Nepal. Genuine products from authorised brands — full manufacturer warranty, expert support, nationwide delivery.`,
  }
}

export default async function ProductCategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  const sp     = await searchParams
  const page   = Number(sp.page ?? 1)
  const search = sp.search

  // Use static category as primary source — no API crash risk
  const cat = STATIC_CATS.find(c => c.slug === category)
  if (!cat) {
    return (
      <main style={{ paddingTop: 80, minHeight: '100vh', background: 'var(--bg-base)' }}>
        <div className="container-site py-24 text-center">
          <h1 className="heading-section text-white mb-4">Category Not Found</h1>
          <Link href="/products" className="btn-primary">Browse All Products</Link>
        </div>
      </main>
    )
  }

  // Try to load real products from CMS — gracefully falls back to static data
  let products: Awaited<ReturnType<typeof getProducts>> = []
  let cmsCategories: Awaited<ReturnType<typeof getProductCategories>> = []
  try {
    ;[cmsCategories, products] = await Promise.all([
      getProductCategories(),
      getProducts({ categorySlug: category, page, perPage: 12, search }),
    ])
  } catch {
    // CMS unavailable — use static data
  }

  // Use static product catalog when CMS is empty
  const staticProducts = PRODUCTS_BY_CATEGORY[category] || []
  const useStatic = products.length === 0 && staticProducts.length > 0

  // Navigation: use static list, merge with any live CMS data
  const navCats = cmsCategories.length > 0
    ? cmsCategories
    : STATIC_CATS

  return (
    <main style={{ paddingTop: 64, background: 'var(--bg-base)', minHeight: '100vh' }}>

      {/* Hero */}
      <section className="relative py-20 px-6 overflow-hidden"
        style={{ background: 'linear-gradient(180deg, #0A1628 0%, #060D1A 100%)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container-site relative">
          <nav className="flex items-center gap-1.5 text-[12px] mb-8" style={{ color: 'var(--text-tertiary)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--text-brand)' }}>{cat.name}</span>
          </nav>
          <h1 className="heading-section text-white mb-4">{cat.name}</h1>
          <p className="text-[18px] max-w-[520px]" style={{ color: 'var(--text-secondary)' }}>
            Genuine {cat.name.toLowerCase()} from authorised brands — full manufacturer warranty, expert support.
          </p>
        </div>
      </section>

      {/* Category Nav */}
      <div className="sticky top-16 z-40 px-6 py-3 overflow-x-auto"
        style={{ background: 'rgba(6,13,26,0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container-site flex gap-2 flex-nowrap">
          {navCats.map((c) => {
            const slug = 'slug' in c ? c.slug : (c as {href:string}).href?.replace('/products/','')
            const name = 'name' in c ? c.name : (c as {label:string}).label
            return (
              <Link key={slug} href={`/products/${slug}`}
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 whitespace-nowrap"
                style={slug === category
                  ? { background: 'var(--brand)', color: '#fff' }
                  : { background: 'var(--surface-1)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}>
                {name}
              </Link>
            )
          })}
        </div>
      </div>

      {/* Products Grid or Enquiry CTA */}
      <section className="section-padding px-6">
        <div className="container-site">

          {products.length > 0 ? (
            <>
              {/* Search */}
              <form method="GET" className="flex gap-3 mb-12 max-w-md">
                <div className="flex-1 relative">
                  <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
                  <input type="text" name="search" defaultValue={search}
                    placeholder={`Search ${cat.name.toLowerCase()}…`}
                    className="w-full pl-10 pr-4 py-2.5 rounded-full text-[14px] outline-none border focus:border-[var(--brand)] transition-colors"
                    style={{ background: 'var(--surface-1)', border: '1px solid var(--border-default)', color: 'var(--text-primary)' }} />
                </div>
                <button type="submit"
                  className="px-6 py-2.5 rounded-full text-[14px] font-semibold text-white transition-all hover:opacity-90"
                  style={{ background: 'var(--brand)' }}>Search</button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map(product => {
                  const title = product.title.rendered.replace(/<[^>]+>/g, '')
                  return (
                    <Link key={product.id} href={`/products/${category}/${product.slug}`}
                      className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5"
                      style={{ background: 'var(--surface-1)', border: '1px solid var(--border-default)' }}>
                      <div className="relative h-52 flex items-center justify-center" style={{ background: 'var(--surface-2)' }}>
                        {product.featured_image_url
                          ? <img src={product.featured_image_url} alt={title} className="object-contain p-4 w-full h-full transition-transform duration-500 group-hover:scale-105" />
                          : <div className="w-12 h-12 opacity-20 text-4xl flex items-center justify-center">📦</div>}
                      </div>
                      <div className="p-5">
                        {product.meta.brand_name && <div className="text-[11px] font-bold uppercase tracking-[0.08em] mb-2" style={{ color: 'var(--text-brand)' }}>{product.meta.brand_name}</div>}
                        <h2 className="font-bold text-[15px] text-white mb-2 leading-snug line-clamp-2">{title}</h2>
                        {product.meta.sku && <div className="text-[11px] mb-3" style={{ color: 'var(--text-tertiary)' }}>SKU: {product.meta.sku}</div>}
                        <div className="mt-4 flex items-center gap-1 text-[13px] font-semibold" style={{ color: 'var(--text-brand)' }}>
                          View Details →
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              {products.length === 12 && (
                <div className="flex gap-3 justify-center mt-16">
                  {page > 1 && (
                    <Link href={`/products/${category}?page=${page - 1}${search ? `&search=${search}` : ''}`}
                      className="px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all hover:text-white"
                      style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}>← Previous</Link>
                  )}
                  <Link href={`/products/${category}?page=${page + 1}${search ? `&search=${search}` : ''}`}
                    className="px-6 py-2.5 rounded-full text-[14px] font-semibold text-white transition-all hover:opacity-90"
                    style={{ background: 'var(--brand)' }}>Next Page →</Link>
                </div>
              )}
            </>
          ) : useStatic ? (
            /* Static Product Grid */
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {staticProducts.map(product => (
                  <a key={product.slug} href={`/products/${product.category}/${product.slug}`}
                    className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5"
                    style={{ background: 'var(--surface-1)', border: '1px solid var(--border-default)', textDecoration: 'none' }}>
                    <div className="relative h-48 flex items-center justify-center"
                      style={{ background: `linear-gradient(135deg, rgba(0,113,227,0.12), rgba(0,113,227,0.04))` }}>
                      <ProductImg src={product.imageUrl} alt={product.name} style={{ width: '65%', height: '85%', objectFit: 'contain' }} brandColor={BRAND_COLORS_MAP[product.brandSlug]} brandName={product.brand} />
                      {product.badge && (
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-bold text-white"
                          style={{ background: product.badge === 'Best Seller' ? '#FF9500' : product.badge === 'New' ? '#34C759' : '#0071E3' }}>
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-[11px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: 'var(--text-brand)' }}>{product.brand}</div>
                      <h2 className="font-bold text-[15px] text-white mb-1 leading-snug">{product.name}</h2>
                      <div className="text-[12px] mb-3" style={{ color: 'var(--text-tertiary)' }}>{product.subcategory}</div>
                      {product.specs.filter(s => s.highlight).slice(0, 2).map(spec => (
                        <span key={spec.label} className="inline-block mr-1.5 mb-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold"
                          style={{ background: 'rgba(0,113,227,0.12)', color: 'var(--text-brand)' }}>
                          {spec.value}
                        </span>
                      ))}
                      <div className="mt-3 text-[13px] font-semibold" style={{ color: 'var(--text-brand)' }}>
                        View Details →
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            /* Enquiry CTA — shown when no products in CMS or static data */
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-8 flex items-center justify-center text-4xl"
                style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
                🎙️
              </div>
              <h2 className="text-[28px] font-bold text-white mb-4">
                {cat.count}+ {cat.name} Available
              </h2>
              <p className="text-[17px] mb-10" style={{ color: 'var(--text-secondary)' }}>
                Our full {cat.name.toLowerCase()} catalog is available. Contact us for specifications, pricing, and availability — we&apos;ll respond within the hour.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <a href={`tel:${SITE.phoneRaw}`}
                  className="flex items-center gap-4 p-6 rounded-2xl transition-all hover:-translate-y-1"
                  style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(0,113,227,0.15)' }}>
                    <Phone size={20} style={{ color: 'var(--brand)' }} />
                  </div>
                  <div className="text-left">
                    <div className="text-[13px] mb-1" style={{ color: 'var(--text-tertiary)' }}>Call us directly</div>
                    <div className="text-[16px] font-semibold text-white">{SITE.phone}</div>
                  </div>
                </a>

                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-4 p-6 rounded-2xl transition-all hover:-translate-y-1"
                  style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(37,211,102,0.15)' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div className="text-left">
                    <div className="text-[13px] mb-1" style={{ color: 'var(--text-tertiary)' }}>WhatsApp us</div>
                    <div className="text-[16px] font-semibold text-white">Chat Now</div>
                  </div>
                </a>
              </div>

              <Link href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-[15px] font-semibold text-white transition-all hover:opacity-90"
                style={{ background: 'var(--brand)' }}>
                Send an Enquiry →
              </Link>

              <p className="text-[13px] mt-6" style={{ color: 'var(--text-tertiary)' }}>
                Also browse our other categories below
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
                {STATIC_CATS.filter(c => c.slug !== category).slice(0, 6).map(c => (
                  <Link key={c.slug} href={`/products/${c.slug}`}
                    className="p-4 rounded-xl text-[13px] font-medium transition-all hover:-translate-y-0.5 text-left"
                    style={{ background: 'var(--surface-1)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                    {c.name}
                    <span className="block text-[11px] mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{c.count} products</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
