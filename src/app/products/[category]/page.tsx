import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
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
    <main style={{ paddingTop: 80 }}>
      {/* Hero */}
      <section style={{ background: '#1D1D1F', padding: '64px 24px 56px', color: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#0071E3', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>
            <Link href="/" style={{ color: '#0071E3', textDecoration: 'none' }}>Home</Link>
            {' / '}
            <Link href="/products" style={{ color: '#0071E3', textDecoration: 'none' }}>Products</Link>
            {' / '}{cat.name}
          </div>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 16 }}>
            {cat.name}
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.55)', maxWidth: 560 }}>
            Genuine {cat.name.toLowerCase()} from authorized brands — with full manufacturer warranty.
          </p>
        </div>
      </section>

      {/* Category Nav Strip */}
      <section style={{ background: '#F5F5F7', padding: '14px 24px', borderBottom: '1px solid #E8E8ED', overflowX: 'auto' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {categories.map(c => (
            <Link key={c.id} href={`/products/${c.slug}`}
              style={{
                padding: '6px 16px', borderRadius: 980, fontSize: 13, fontWeight: 500,
                textDecoration: 'none', whiteSpace: 'nowrap',
                background: c.slug === category ? '#0071E3' : '#FFFFFF',
                color: c.slug === category ? '#FFFFFF' : '#1D1D1F',
                border: `1px solid ${c.slug === category ? '#0071E3' : '#E8E8ED'}`,
              }}>
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      <section style={{ padding: '56px 24px', background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Search */}
          <form method="GET" style={{ marginBottom: 32, display: 'flex', gap: 12, maxWidth: 480 }}>
            <input type="text" name="search" defaultValue={search}
              placeholder={`Search ${cat.name.toLowerCase()}…`}
              style={{ flex: 1, padding: '10px 18px', border: '1px solid #E8E8ED', borderRadius: 980, fontSize: 15, outline: 'none', fontFamily: 'Inter, sans-serif' }} />
            <button type="submit"
              style={{ background: '#0071E3', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: 980, fontSize: 15, fontWeight: 500, cursor: 'pointer' }}>
              Search
            </button>
          </form>

          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#6E6E73' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
              <p style={{ fontSize: 18 }}>No products found{search ? ` for "${search}"` : ''}.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {products.map(product => {
                const title = stripHtml(product.title.rendered)
                const specs = (() => { try { return JSON.parse(product.meta.specifications ?? '[]') } catch { return [] } })()
                return (
                  <Link key={product.id} href={`/products/${category}/${product.slug}`}
                    style={{ textDecoration: 'none', display: 'block', background: '#FFFFFF', borderRadius: 16, border: '1px solid #E8E8ED', overflow: 'hidden' }}>
                    <div style={{ position: 'relative', height: 220, background: '#F5F5F7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {product.featured_image_url
                        ? <Image src={product.featured_image_url} alt={title} fill style={{ objectFit: 'contain', padding: 16 }} />
                        : <span style={{ fontSize: 56 }}>📦</span>}
                      {product.meta.badge && (
                        <span style={{ position: 'absolute', top: 12, left: 12, background: '#0071E3', color: '#fff', padding: '3px 10px', borderRadius: 980, fontSize: 11, fontWeight: 600 }}>
                          {product.meta.badge}
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '20px' }}>
                      {product.meta.brand_name && (
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#0071E3', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
                          {product.meta.brand_name}
                        </div>
                      )}
                      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 16, fontWeight: 700, color: '#1D1D1F', marginBottom: 8, lineHeight: 1.3 }}>
                        {title}
                      </h2>
                      {product.meta.sku && <div style={{ fontSize: 12, color: '#6E6E73', marginBottom: 8 }}>SKU: {product.meta.sku}</div>}
                      {specs.slice(0, 2).map((s: { label: string; value: string }, i: number) => (
                        <div key={i} style={{ fontSize: 13, color: '#6E6E73', marginBottom: 3 }}>
                          <strong style={{ color: '#1D1D1F' }}>{s.label}:</strong> {s.value}
                        </div>
                      ))}
                      <div style={{ marginTop: 16, fontSize: 13, fontWeight: 600, color: '#0071E3' }}>View Details →</div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {products.length === 12 && (
            <div style={{ textAlign: 'center', marginTop: 48, display: 'flex', gap: 12, justifyContent: 'center' }}>
              {page > 1 && (
                <Link href={`/products/${category}?page=${page - 1}`}
                  style={{ padding: '10px 24px', border: '1px solid #E8E8ED', borderRadius: 980, fontSize: 14, color: '#1D1D1F', textDecoration: 'none' }}>
                  ← Previous
                </Link>
              )}
              <Link href={`/products/${category}?page=${page + 1}`}
                style={{ padding: '10px 24px', background: '#0071E3', color: '#fff', borderRadius: 980, fontSize: 14, fontWeight: 500, textDecoration: 'none' }}>
                Next Page →
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
