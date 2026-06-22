// ─── WordPress REST API Client ────────────────────────────────────────────────
// All data for audiovisualnepal.com is served from the WordPress REST API.
// Base URL: https://audiovisualnepal.com/wp-json
//
// Custom endpoints registered by the audiovisualnepal-headless plugin:
//   /wp/v2/products          → av_product CPT
//   /wp/v2/projects          → av_project CPT
//   /wp/v2/brands            → av_brand CPT
//   /wp/v2/product-categories→ product_category taxonomy
//   /wp/v2/industries        → industry taxonomy
//   /avn/v1/contact          → contact form submission
//   /avn/v1/settings         → site settings

const WP_BASE  = (process.env.NEXT_PUBLIC_WP_URL  || 'https://audiovisualnepal.com').replace(/\/$/, '')
const WP_API   = `${WP_BASE}/wp-json/wp/v2`
const AVN_API  = `${WP_BASE}/wp-json/avn/v1`

// ─── Core fetch with Next.js ISR ─────────────────────────────────────────────
async function wpFetch<T>(
  endpoint: string,
  options?: RequestInit & { revalidate?: number }
): Promise<T> {
  const { revalidate = 3600, ...fetchOptions } = options ?? {}
  const url = endpoint.startsWith('http') ? endpoint : `${WP_API}${endpoint}`

  let res: Response
  try {
    res = await fetch(url, {
      ...fetchOptions,
      next: { revalidate },
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    })
  } catch {
    // Network/SSL error — return empty fallback so build doesn't fail
    return ([] as unknown) as T
  }

  if (!res.ok) {
    // Return empty fallback for any non-200 to prevent page crashes
    console.warn(`WP API ${res.status}: ${endpoint}`)
    return ([] as unknown) as T
  }

  return res.json()
}

// ─── TypeScript Types ─────────────────────────────────────────────────────────
export interface WPPost {
  id: number
  slug: string
  status: string
  link: string
  date: string
  modified: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  featured_media: number
  featured_image_url?: string
  featured_image_thumb?: string
  categories: number[]
  tags: number[]
  meta: Record<string, string>
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url: string; media_details?: { sizes?: Record<string, { source_url: string }> } }>
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>
  }
}

export interface WPProduct {
  id: number
  slug: string
  status: string
  link: string
  date: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  featured_image_url?: string
  featured_image_thumb?: string
  product_category: number[]
  meta: {
    sku?: string
    brand_name?: string
    short_desc?: string
    specifications?: string   // JSON string
    features?: string         // JSON string
    applications?: string     // JSON string
    datasheet_url?: string
    video_url?: string
    in_stock?: string
    featured?: string
    badge?: string
    meta_title?: string
    meta_description?: string
  }
}

export interface WPProject {
  id: number
  slug: string
  status: string
  link: string
  date: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  featured_image_url?: string
  featured_image_thumb?: string
  industry: number[]
  meta: {
    client?: string
    location?: string
    completion_date?: string
    challenge?: string
    products_used?: string    // JSON string
    testimonial_quote?: string
    testimonial_name?: string
    testimonial_role?: string
    featured?: string
    meta_title?: string
    meta_description?: string
  }
}

export interface WPBrand {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  featured_image_url?: string
  meta: {
    website_url?: string
    tagline?: string
    country?: string
    featured?: string
  }
}

export interface WPTerm {
  id: number
  name: string
  slug: string
  description: string
  count: number
  link: string
}

export interface WPMedia {
  id: number
  source_url: string
  alt_text: string
  media_details: {
    width: number
    height: number
    sizes?: Record<string, { source_url: string; width: number; height: number }>
  }
}

// ─── Helper: parse JSON meta field safely ────────────────────────────────────
export function parseJsonMeta<T = unknown>(value: string | undefined, fallback: T): T {
  if (!value) return fallback
  try { return JSON.parse(value) as T }
  catch { return fallback }
}

// ─── Helper: strip HTML tags ─────────────────────────────────────────────────
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').trim()
}

// ─── BLOG POSTS ───────────────────────────────────────────────────────────────
export interface GetPostsParams {
  page?: number
  perPage?: number
  categoryId?: number
  search?: string
  embed?: boolean
}

export async function getPosts(params: GetPostsParams = {}) {
  const { page = 1, perPage = 10, categoryId, search, embed = true } = params
  const qs = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    status: 'publish',
    ...(categoryId && { categories: String(categoryId) }),
    ...(search && { search }),
    ...(embed && { _embed: '1' }),
  })
  return wpFetch<WPPost[]>(`/posts?${qs}`)
}

export async function getPost(slug: string) {
  const posts = await wpFetch<WPPost[]>(`/posts?slug=${slug}&_embed=1`)
  return posts[0] ?? null
}

export async function getPostSlugs(): Promise<string[]> {
  const posts = await wpFetch<Array<{ slug: string }>>('/posts?per_page=100&fields=slug')
  return posts.map(p => p.slug)
}

export async function getCategories() {
  return wpFetch<WPTerm[]>('/categories?per_page=50&hide_empty=true')
}

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
export interface GetProductsParams {
  page?: number
  perPage?: number
  categorySlug?: string
  categoryId?: number
  search?: string
  featured?: boolean
  orderby?: 'date' | 'title'
  order?: 'asc' | 'desc'
}

export async function getProducts(params: GetProductsParams = {}) {
  const { page = 1, perPage = 18, categorySlug, categoryId, search, featured, orderby = 'date', order = 'desc' } = params

  let catId = categoryId
  if (categorySlug && !catId) {
    const terms = await wpFetch<WPTerm[]>(`/product-categories?slug=${categorySlug}`)
    catId = terms[0]?.id
  }

  const qs = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    status: 'publish',
    orderby,
    order,
    ...(catId && { product_category: String(catId) }),
    ...(search && { search }),
  })

  const products = await wpFetch<WPProduct[]>(`/products?${qs}`)

  if (featured) {
    return products.filter(p => p.meta.featured === 'yes')
  }
  return products
}

export async function getProduct(slug: string) {
  const products = await wpFetch<WPProduct[]>(`/products?slug=${slug}`)
  return products[0] ?? null
}

export async function getProductSlugs(): Promise<Array<{ category: string; slug: string }>> {
  const products = await wpFetch<Array<{ slug: string; product_category: number[] }>>('/products?per_page=100&fields=slug,product_category')
  const terms    = await getProductCategories()
  const termMap  = Object.fromEntries(terms.map(t => [t.id, t.slug]))

  return products.map(p => ({
    slug: p.slug,
    category: p.product_category[0] ? (termMap[p.product_category[0]] ?? 'general') : 'general',
  }))
}

export async function getProductCategories() {
  return wpFetch<WPTerm[]>('/product-categories?per_page=50&hide_empty=false')
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
export interface GetProjectsParams {
  page?: number
  perPage?: number
  industrySlug?: string
  featured?: boolean
}

export async function getProjects(params: GetProjectsParams = {}) {
  const { page = 1, perPage = 12, industrySlug, featured } = params

  let industryId: number | undefined
  if (industrySlug) {
    const terms = await wpFetch<WPTerm[]>(`/industries?slug=${industrySlug}`)
    industryId = terms[0]?.id
  }

  const qs = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
    status: 'publish',
    ...(industryId && { industry: String(industryId) }),
  })

  const projects = await wpFetch<WPProject[]>(`/projects?${qs}`)
  if (featured) return projects.filter(p => p.meta.featured === 'yes')
  return projects
}

export async function getProject(slug: string) {
  const projects = await wpFetch<WPProject[]>(`/projects?slug=${slug}`)
  return projects[0] ?? null
}

export async function getProjectSlugs(): Promise<string[]> {
  const projects = await wpFetch<Array<{ slug: string }>>('/projects?per_page=100&fields=slug')
  return projects.map(p => p.slug)
}

export async function getIndustries() {
  return wpFetch<WPTerm[]>('/industries?per_page=20')
}

// ─── BRANDS ───────────────────────────────────────────────────────────────────
export async function getBrands(featuredOnly = false) {
  const brands = await wpFetch<WPBrand[]>('/brands?per_page=30&status=publish')
  if (featuredOnly) return brands.filter(b => b.meta.featured === 'yes')
  return brands
}

export async function getBrand(slug: string) {
  const brands = await wpFetch<WPBrand[]>(`/brands?slug=${slug}`)
  return brands[0] ?? null
}

// ─── MEDIA ────────────────────────────────────────────────────────────────────
export async function getMedia(id: number) {
  return wpFetch<WPMedia>(`/media/${id}`)
}

// ─── PAGES ────────────────────────────────────────────────────────────────────
export async function getPage(slug: string) {
  const pages = await wpFetch<WPPost[]>(`/pages?slug=${slug}&_embed=1`)
  return pages[0] ?? null
}

// ─── SITE SETTINGS ────────────────────────────────────────────────────────────
export async function getSiteSettings() {
  return wpFetch<{
    site_name: string
    tagline: string
    admin_email: string
    site_url: string
    wp_version: string
    language: string
  }>(AVN_API + '/settings', { revalidate: 86400 })
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string
  email: string
  company?: string
  phone?: string
  project_type?: string
  message: string
}

export async function submitContactForm(data: ContactFormData) {
  const res = await fetch(`${AVN_API}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.message ?? 'Submission failed')
  return json as { success: boolean; message: string; id: number }
}
