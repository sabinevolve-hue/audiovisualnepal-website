# AudioVisual Nepal — Next.js Website

Premium Apple-style professional AV solutions website built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, and Sanity CMS.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Header + Footer + WhatsApp)
│   ├── page.tsx                # Homepage (8 sections)
│   ├── contact/page.tsx        # Contact form with API route
│   ├── products/
│   │   └── [category]/
│   │       ├── page.tsx        # Product category listing
│   │       └── [slug]/page.tsx # Individual product page
│   ├── api/contact/route.ts    # Contact form API
│   ├── sitemap.ts              # Auto-generated sitemap
│   └── robots.ts
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Sticky header with mega-menus
│   │   └── Footer.tsx          # Full footer with all links
│   ├── sections/               # Homepage sections
│   │   ├── HeroSection.tsx
│   │   ├── StatsSection.tsx    # Animated counters
│   │   ├── SolutionsSection.tsx
│   │   ├── ProductEcosystem.tsx
│   │   ├── WhySection.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── BrandsSection.tsx
│   │   └── CTASection.tsx
│   └── ui/
│       ├── WhatsAppFloat.tsx
│       └── RevealWrapper.tsx   # Scroll-reveal animation
│
├── lib/
│   ├── constants.ts            # All site data (nav, products, brands, stats)
│   └── sanity.schema.ts        # Sanity CMS document schemas
│
└── types/index.ts              # TypeScript types for all content models
```

## CMS Setup (Sanity)

1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Copy schemas from `src/lib/sanity.schema.ts` into `/sanity/schemas/`
3. Add env vars:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_write_token   # for form submissions
   ```
4. Replace placeholder data in product/project pages with Sanity GROQ queries

## Contact Form Email Setup

In `src/app/api/contact/route.ts`, uncomment the Resend section and add:
```
RESEND_API_KEY=your_resend_key
```

## Phase Execution Order

| Phase | Focus                          | Status |
|-------|-------------------------------|--------|
| 1     | Information Architecture       | ✅ Done |
| 2     | Design System & Globals        | ✅ Done |
| 3     | Homepage (8 sections)         | ✅ Done |
| 4     | Solutions Pages                | 🔲 Next |
| 5     | Product Category Pages         | ✅ Template done |
| 6     | Individual Product Pages       | ✅ Template done |
| 7     | Projects Section               | 🔲 Next |
| 8     | Blog & SEO Content             | 🔲 Next |
| 9     | Technical SEO                  | ✅ sitemap + robots done |
| 10    | AI Search Optimization         | 🔲 Next |

## Key Design Tokens

| Token     | Value    |
|-----------|----------|
| White     | #FFFFFF  |
| Black     | #111111  |
| Gray BG   | #F5F5F7  |
| Blue      | #0071E3  |
| Font      | Manrope + Inter |
