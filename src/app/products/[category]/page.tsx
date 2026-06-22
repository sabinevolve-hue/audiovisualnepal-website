import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Search } from 'lucide-react'
import { getProducts, getProductCategories, stripHtml } from '@/lib/wordpress'

export const revalidate = 3600

type Props = { params: Promise<{ category: string }>; searchParams: Promise<{ page?: string; search?: string }> }

export async function generateStaticParams() {
  const cats = await getProductCategories()
  return cats.map(c => ({ category: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cats = await getProductCategories()
  const cat  = cats.find(c => c.slug === category)
  if (!cat) return { title: 'Products — AudioVisual Nepal' }
  return {
    title: `${cat.name} — AudioVisual Nepal`,
    description: `Professional ${cat.name.toLowerCase()} for Nepal. Genuine products, expert support, nationwide delivery.`,
  }
}

export default async function ProductCategoryPage({ params, searchParams }: Props) {
  const { category } = await params
  const sp     = await searchParams
  const page   = Number(sp.page ?? 1)
  const search = sp.search

  const [categories, products] = await Promise.all([
    getProductCategories(),
    getProducts({ categorySlug: category, page, perPage: 12, search }),
  ])

  const cat = categories.find(c => c.slug === category)
  if (!cat) notFound()

  return (
    <main style={{ paddingTop: 64, background: 'var(--bg-base)', minHeight: '100vh' }}>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative py-20 px-6 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(0,113,227,0.08) 0%, transparent 100%)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        {/* Grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 100% at 50% 0%, black 0%, transparent 100%)',
          }}
        />

        <div className="container-site relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-[12px] mb-8" style={{ color: 'var(--text-tertiary)' }}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/products" className="hover:text-white transition-colors">Products</Link>
            <ChevronRight size={12} />
            <span style={{ color: 'var(--text-brand)' }}>{cat.name}</span>
          </nav>

          <h1 className="heading-section text-white mb-4">{cat.name}</h1>
          <p className="text-[18px] max-w-[520px]" style={{ color: 'var(--text-secondary)' }}>
            Genuine {cat.name.toLowerCase()} from authorised brands — full manufacturer warranty.
          </p>
        </div>
      </section>

      {/* ── Category Nav ─────────────────────────────────────────────────── */}
      <div
        className="sticky top-16 z-40 px-6 py-3 overflow-x-auto"
        style={{ background: 'rgba(6,6,10,0.92)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-subtle)' }}
      >
        <div className="container-site flex gap-2 flex-nowrap">
          {categories.map(c => (
            <Link
              key={c.id}
              href={`/products/${c.slug}`}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 whitespace-nowrap"
              style={c.slug === category
                ? { background: 'var(--brand)', color: '#fff' }
                : { background: 'var(--surface-1)', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }
              }
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ── Products Grid ─────────────────────────────────────────────────── */}
      <section className="section-padding px-6">
        <div className="container-site">

          {/* Search */}
          <form method="GET" className="flex gap-3 mb-12 max-w-md">
            <div className="flex-1 relative">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                name="search"
                defaultValue={search}
                placeholder={`Search ${cat.name.toLowerCase()}…`}
                className="w-full pl-10 pr-4 py-2.5 rounded-full text-[14px] outline-none border focus:border-[var(--brand)] transition-colors duration-200"
                style={{
                  background: 'var(--surface-1)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full text-[14px] font-semibold text-white transition-all duration-200 hover:opacity-90"
              style={{ background: 'var(--brand)' }}
            >
              Search
            </button>
          </form>

          {products.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-[48px] mb-4 opacity-30">🔍</div>
              <p className="text-[18px]" style={{ color: 'var(--text-secondary)' }}>
                No products found{search ? ` for "${search}"` : ''}.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {products.map(product => {
                const title = stripHtml(product.title.rendered)
                const specs = (() => { try { return JSON.parse(product.meta.specifications ?? '[]') } catch { return [] } })()
                return (
                  <Link
                    key={product.id}
                    href={`/products/${category}/${product.slug}`}
                    className="group block rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5"
                    style={{
                      background: 'var(--surface-1)',
                      border: '1px solid var(--border-default)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-brand)' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-default)' }}
                  >
                    {/* Image */}
                    <div
                      className="relative h-52 overflow-hidden flex items-center justify-center"
                      style={{ background: 'var(--surface-2)' }}
                    >
                      {product.featured_image_url ? (
                        <Image
                          src={product.featured_image_url}
                          alt={title}
                          fill
                          className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12 opacity-20">
                          <rect x="4" y="12" width="40" height="28" rx="3" stroke="white" strokeWidth="2"/>
                          <path d="M14 12V8a4 4 0 018 0v4M26 12V8a4 4 0 018 0v4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                      {product.meta.badge && (
                        <span
                          className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full text-white"
                          style={{ background: 'var(--brand)' }}
                        >
                          {product.meta.badge}
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div className="p-5">
                      {product.meta.brand_name && (
                        <div className="text-[11px] font-bold uppercase tracking-[0.08em] mb-2" style={{ color: 'var(--text-brand)' }}>
                          {product.meta.brand_name}
                        </div>
                      )}
                      <h2 className="font-display font-bold text-[15px] text-white mb-2 leading-snug line-clamp-2">
                        {title}
                      </h2>
                      {product.meta.sku && (
                        <div className="text-[11px] mb-3" style={{ color: 'var(--text-tertiary)' }}>
                          SKU: {product.meta.sku}
                        </div>
                      )}
                      {specs.slice(0, 2).map((s: { label: string; value: string }, i: number) => (
                        <div key={i} className="text-[12px] mb-1" style={{ color: 'var(--text-secondary)' }}>
                          <span className="text-white font-medium">{s.label}:</span> {s.value}
                        </div>
                      ))}
                      <div className="mt-4 flex items-center gap-1 text-[13px] font-semibold transition-colors duration-300" style={{ color: 'var(--text-brand)' }}>
                        View Details
                        <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          {products.length === 12 && (
            <div className="flex gap-3 justify-center mt-16">
              {page > 1 && (
                <Link
                  href={`/products/${category}?page=${page - 1}${search ? `&search=${search}` : ''}`}
                  className="px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-200 hover:text-white"
                  style={{ border: '1px solid var(--border-default)', color: 'var(--text-secondary)' }}
                >
                  ← Previous
                </Link>
              )}
              <Link
                href={`/products/${category}?page=${page + 1}${search ? `&search=${search}` : ''}`}
                className="px-6 py-2.5 rounded-full text-[14px] font-semibold text-white transition-all duration-200 hover:opacity-90"
                style={{ background: 'var(--brand)' }}
              >
                Next Page →
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
