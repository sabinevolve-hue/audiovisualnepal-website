# AudioVisual Nepal — Site Maintainer Guide

For the non-developer maintaining audiovisualnepal.com. The site is a Next.js frontend
(interactive scenes, animations) fed by two content sources: WordPress (day-to-day content)
and code data files (structural content, developer-managed).

## What you edit in WordPress (no developer, live within minutes)

Log in at cms.audiovisualnepal.com/wp-admin.

| Content | Where in wp-admin | Appears on site at |
|---|---|---|
| Blog articles | Posts | /blog and homepage insights |
| Projects / case studies + photos | Projects (custom type) | /projects and homepage |
| Products (name, specs, images, price) | Products (custom type) | /products/... |
| Brand info | Brands (custom type) | /brands/... |
| All images | Media Library | wherever attached |

Publish/Update in WordPress → the site refreshes automatically (instantly once the
revalidation webhook is configured; otherwise within 1 hour).

## What needs a developer (git + deploy)

Page layouts and design, the interactive room scenes, solution pages, the solution finder,
the Nepal map, brand catalog structures (InfoBit/DSPPA taxonomies), navigation, SEO metadata.

## One-time WordPress setup (developer, pending credentials)

1. Custom post types `product`, `project`, `brand` exposed via REST (the frontend already
   reads /wp-json/wp/v2 and /wp-json/avn/v1 — match existing field names in src/lib/wordpress.ts).
2. Set `REVALIDATE_SECRET` env var in Vercel; configure a WP "on save" webhook to
   POST https://audiovisualnepal.com/api/revalidate?secret=SECRET
3. Migrate the 40 products from src/data/products.ts into WP (scripted import).
4. Application Password for automation: wp-admin → Users → Profile → Application Passwords.

## Standing rules (do not break)

- Never hotlink images — upload to the Media Library or let the GitHub Actions localize them.
- Never present stock or AI images as real installation photos ("Illustration" label until real).
- Only publish real model numbers and verifiable claims (500+ projects, 77 districts, 4 brands).

## Automated pipelines (GitHub Actions — run on their own)

- download-images / download-heroes / download-media: self-host product, hero and motion media.
- scrape-infobit-media: pulls official InfoBit product images + summaries for the catalog.
Trigger manually: GitHub repo → Actions → workflow → Run workflow.
