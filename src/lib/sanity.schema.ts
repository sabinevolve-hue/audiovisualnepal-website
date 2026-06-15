// ─── SANITY CMS SCHEMA ───────────────────────────────────────────────────────
// Place these schemas in your /sanity/schemas/ directory.
// Each export is a Sanity document schema definition.

// ── Product ───────────────────────────────────────────────────────────────────
export const productSchema = {
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    { name: 'content',   title: 'Content'   },
    { name: 'specs',     title: 'Specs'     },
    { name: 'media',     title: 'Media'     },
    { name: 'seo',       title: 'SEO'       },
  ],
  fields: [
    { name: 'name',  title: 'Product Name', type: 'string', group: 'content', validation: (R: any) => R.required() },
    { name: 'slug',  title: 'Slug',         type: 'slug',   group: 'content', options: { source: 'name' }, validation: (R: any) => R.required() },
    { name: 'sku',   title: 'SKU / Model',  type: 'string', group: 'content' },
    {
      name: 'brand', title: 'Brand', type: 'reference', group: 'content',
      to: [{ type: 'brand' }],
    },
    {
      name: 'category', title: 'Category', type: 'string', group: 'content',
      options: {
        list: [
          'speakers', 'ceiling-speakers', 'column-speakers', 'wall-mount-speakers',
          'horn-speakers', 'subwoofers', 'amplifiers', 'mixers', 'microphones',
          'wireless-systems', 'conference-systems', 'ip-network-audio', 'pa-systems',
          'voice-evacuation', 'digital-podiums', 'audio-matrix', 'classroom-audio', 'portable-speakers',
        ],
      },
      validation: (R: any) => R.required(),
    },
    { name: 'shortDescription', title: 'Short Description (1–2 sentences)', type: 'text',  group: 'content', rows: 3 },
    { name: 'description',      title: 'Full Description',                   type: 'array', group: 'content', of: [{ type: 'block' }] },
    {
      name: 'specs', title: 'Specifications', type: 'array', group: 'specs',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'value', title: 'Value', type: 'string' },
        ],
      }],
    },
    { name: 'features',     title: 'Key Features',     type: 'array', group: 'specs', of: [{ type: 'string' }] },
    { name: 'applications', title: 'Applications',     type: 'array', group: 'specs', of: [{ type: 'string' }] },
    { name: 'mainImage',    title: 'Main Image',        type: 'image', group: 'media', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] },
    { name: 'gallery',      title: 'Image Gallery',     type: 'array', group: 'media', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'datasheetUrl', title: 'Datasheet PDF URL', type: 'url',   group: 'media' },
    {
      name: 'relatedProducts', title: 'Related Products', type: 'array', group: 'content',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    },
    { name: 'inStock',  title: 'In Stock',  type: 'boolean', group: 'content', initialValue: true  },
    { name: 'featured', title: 'Featured',  type: 'boolean', group: 'content', initialValue: false },
    {
      name: 'seo', title: 'SEO', type: 'object', group: 'seo',
      fields: [
        { name: 'metaTitle',       title: 'Meta Title (max 60 chars)',       type: 'string' },
        { name: 'metaDescription', title: 'Meta Description (max 160 chars)', type: 'text', rows: 3 },
      ],
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'mainImage' },
  },
}

// ── Brand ─────────────────────────────────────────────────────────────────────
export const brandSchema = {
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    { name: 'name',        title: 'Brand Name',  type: 'string',  validation: (R: any) => R.required() },
    { name: 'slug',        title: 'Slug',         type: 'slug',    options: { source: 'name' } },
    { name: 'logo',        title: 'Logo',          type: 'image',   options: { hotspot: true } },
    { name: 'description', title: 'Description',  type: 'text',    rows: 3 },
    { name: 'website',     title: 'Website URL',  type: 'url'   },
    { name: 'featured',    title: 'Featured',      type: 'boolean', initialValue: false },
  ],
  preview: { select: { title: 'name', media: 'logo' } },
}

// ── Project ───────────────────────────────────────────────────────────────────
export const projectSchema = {
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'info',    title: 'Info'    },
    { name: 'content', title: 'Content' },
    { name: 'media',   title: 'Media'   },
  ],
  fields: [
    { name: 'title',    title: 'Project Title', type: 'string',   group: 'info', validation: (R: any) => R.required() },
    { name: 'slug',     title: 'Slug',           type: 'slug',     group: 'info', options: { source: 'title' } },
    { name: 'client',   title: 'Client Name',    type: 'string',   group: 'info' },
    { name: 'location', title: 'Location',       type: 'string',   group: 'info' },
    {
      name: 'industry', title: 'Industry', type: 'string', group: 'info',
      options: { list: ['government', 'education', 'hospitality', 'healthcare', 'religious', 'transportation', 'corporate', 'retail'] },
    },
    { name: 'completedAt',   title: 'Completion Date',  type: 'date',    group: 'info' },
    { name: 'challenge',     title: 'The Challenge',    type: 'text',    group: 'content', rows: 4 },
    { name: 'solution',      title: 'Our Solution',     type: 'array',   group: 'content', of: [{ type: 'block' }] },
    {
      name: 'productsUsed', title: 'Products Used', type: 'array', group: 'content',
      of: [{ type: 'reference', to: [{ type: 'product' }] }],
    },
    {
      name: 'testimonial', title: 'Client Testimonial', type: 'object', group: 'content',
      fields: [
        { name: 'quote',    title: 'Quote',    type: 'text',   rows: 3 },
        { name: 'author',   title: 'Author',   type: 'string' },
        { name: 'position', title: 'Position', type: 'string' },
      ],
    },
    { name: 'coverImage', title: 'Cover Image', type: 'image', group: 'media', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] },
    { name: 'gallery',    title: 'Gallery',     type: 'array', group: 'media', of: [{ type: 'image', options: { hotspot: true } }] },
    { name: 'featured',   title: 'Featured',    type: 'boolean', initialValue: false },
  ],
  preview: { select: { title: 'title', subtitle: 'client', media: 'coverImage' } },
}

// ── Blog Post ─────────────────────────────────────────────────────────────────
export const postSchema = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'seo',     title: 'SEO'     },
  ],
  fields: [
    { name: 'title',       title: 'Title',          type: 'string',   group: 'content', validation: (R: any) => R.required() },
    { name: 'slug',        title: 'Slug',            type: 'slug',     group: 'content', options: { source: 'title' } },
    { name: 'publishedAt', title: 'Published Date',  type: 'datetime', group: 'content' },
    { name: 'excerpt',     title: 'Excerpt',         type: 'text',     group: 'content', rows: 3 },
    { name: 'body',        title: 'Body',            type: 'array',    group: 'content', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'mainImage',   title: 'Main Image',      type: 'image',    group: 'content', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] },
    {
      name: 'categories', title: 'Categories', type: 'array', group: 'content',
      of: [{ type: 'string' }],
      options: {
        list: [
          'Buying Guide', 'Installation Tips', 'Product News', 'Case Study',
          'Technical Deep Dive', 'Industry News', 'Nepal Market',
        ],
      },
    },
    {
      name: 'seo', title: 'SEO', type: 'object', group: 'seo',
      fields: [
        { name: 'metaTitle',       title: 'Meta Title',       type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text',  rows: 3 },
        { name: 'focusKeyword',    title: 'Focus Keyword',    type: 'string' },
      ],
    },
  ],
  preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'mainImage' } },
}

// ── Enquiry (contact form submissions) ────────────────────────────────────────
export const enquirySchema = {
  name: 'enquiry',
  title: 'Enquiry',
  type: 'document',
  readOnly: true,
  fields: [
    { name: 'name',        title: 'Name',         type: 'string'   },
    { name: 'company',     title: 'Company',      type: 'string'   },
    { name: 'email',       title: 'Email',        type: 'string'   },
    { name: 'phone',       title: 'Phone',        type: 'string'   },
    { name: 'projectType', title: 'Project Type', type: 'string'   },
    { name: 'message',     title: 'Message',      type: 'text'     },
    { name: 'submittedAt', title: 'Submitted At', type: 'datetime' },
  ],
  preview: { select: { title: 'name', subtitle: 'projectType' } },
}
