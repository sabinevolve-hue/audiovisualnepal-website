#!/bin/bash
# ─────────────────────────────────────────────────────────────────────────────
#  AudioVisual Nepal — One-Command Vercel Deployment Script
#  Run this from inside the audiovisualnepal-nextjs/ folder:
#
#    chmod +x deploy.sh
#    ./deploy.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e

echo ""
echo "╔═══════════════════════════════════════════════════╗"
echo "║   AudioVisual Nepal — Vercel Deployment Script    ║"
echo "╚═══════════════════════════════════════════════════╝"
echo ""

# 1. Install Vercel CLI if not present
if ! command -v vercel &> /dev/null; then
  echo "▶ Installing Vercel CLI..."
  npm install -g vercel
fi

# 2. Install dependencies
echo "▶ Installing dependencies..."
npm install

# 3. Check for .env.local
if [ ! -f ".env.local" ]; then
  echo ""
  echo "⚠️  No .env.local found. Copying from .env.example..."
  cp .env.example .env.local
  echo ""
  echo "  Open .env.local and fill in:"
  echo "  - NEXT_PUBLIC_SANITY_PROJECT_ID"
  echo "  - SANITY_API_TOKEN"
  echo "  - RESEND_API_KEY"
  echo ""
  read -p "Press Enter when you've updated .env.local, or skip to deploy now: "
fi

# 4. Verify build locally
echo "▶ Running build check..."
npm run build

echo ""
echo "✅ Build successful!"
echo ""

# 5. Deploy to Vercel
echo "▶ Deploying to Vercel..."
echo "  (A browser window will open to log in on first run)"
echo ""

vercel deploy --prod

echo ""
echo "╔═══════════════════════════════════════════════════╗"
echo "║  ✅ Deployment complete!                          ║"
echo "║                                                   ║"
echo "║  Next steps:                                      ║"
echo "║  1. Add your custom domain in Vercel dashboard    ║"
echo "║  2. Point audiovisualnepal.com DNS to Vercel      ║"
echo "║  3. Set env vars in Vercel project settings       ║"
echo "╚═══════════════════════════════════════════════════╝"
echo ""
