// ─── PRODUCT TYPES ──────────────────────────────────────────────────────────

export type ProductCategory =
  | 'speakers'
  | 'ceiling-speakers'
  | 'column-speakers'
  | 'wall-mount-speakers'
  | 'horn-speakers'
  | 'subwoofers'
  | 'amplifiers'
  | 'mixers'
  | 'microphones'
  | 'wireless-systems'
  | 'conference-systems'
  | 'ip-network-audio'
  | 'pa-systems'
  | 'voice-evacuation'
  | 'digital-podiums'
  | 'audio-matrix'
  | 'classroom-audio'
  | 'portable-speakers'

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  _id: string
  _type: 'product'
  name: string
  slug: { current: string }
  sku: string
  category: ProductCategory
  brand: string
  shortDescription: string
  description: any[] // Portable text
  mainImage: SanityImage
  gallery: SanityImage[]
  specs: ProductSpec[]
  features: string[]
  applications: string[]
  relatedProducts: Product[]
  datasheetUrl?: string
  inStock: boolean
  featured: boolean
}

// ─── PROJECT TYPES ──────────────────────────────────────────────────────────

export type IndustryType =
  | 'government'
  | 'education'
  | 'hospitality'
  | 'healthcare'
  | 'religious'
  | 'transportation'
  | 'corporate'
  | 'retail'

export interface Project {
  _id: string
  _type: 'project'
  title: string
  slug: { current: string }
  client: string
  location: string
  industry: IndustryType
  completedAt: string
  coverImage: SanityImage
  gallery: SanityImage[]
  challenge: string
  solution: any[] // Portable text
  productsUsed: Product[]
  testimonial?: {
    quote: string
    author: string
    position: string
  }
  featured: boolean
}

// ─── BLOG TYPES ─────────────────────────────────────────────────────────────

export interface BlogPost {
  _id: string
  _type: 'post'
  title: string
  slug: { current: string }
  author: {
    name: string
    image: SanityImage
  }
  publishedAt: string
  excerpt: string
  body: any[] // Portable text
  mainImage: SanityImage
  categories: string[]
  readingTimeMinutes: number
  seo: SEOMeta
}

// ─── BRAND TYPES ────────────────────────────────────────────────────────────

export interface Brand {
  _id: string
  _type: 'brand'
  name: string
  slug: { current: string }
  logo: SanityImage
  description: string
  website: string
  featured: boolean
}

// ─── SHARED ─────────────────────────────────────────────────────────────────

export interface SanityImage {
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface SEOMeta {
  metaTitle?: string
  metaDescription?: string
  ogImage?: SanityImage
  noIndex?: boolean
}

// ─── CONTACT FORM ────────────────────────────────────────────────────────────

export interface ContactFormData {
  name: string
  company?: string
  email: string
  phone: string
  projectType: string
  message: string
}

export type ProjectType =
  | 'Government'
  | 'Education'
  | 'Hotel & Hospitality'
  | 'Healthcare'
  | 'Religious'
  | 'Corporate'
  | 'Transportation'
  | 'Other'
