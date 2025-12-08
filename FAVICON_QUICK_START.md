# 🚀 Quick Start: Generate Favicons from Logo

## Prerequisites
- Logo file at: `public/logo.png`
- Node.js installed

## Step 1: Install Sharp (Image Processing)

```bash
npm install --save-dev sharp
```

## Step 2: Generate Favicons

```bash
node scripts/generate-favicons.js
```

This will create:
- ✅ `favicon-16x16.png`
- ✅ `favicon-32x32.png`
- ✅ `apple-touch-icon.png` (180x180)
- ✅ `android-chrome-192x192.png`
- ✅ `android-chrome-512x512.png`

## Step 3: Create favicon.ico

**Easiest Method:**
1. Go to: https://convertio.co/png-ico/
2. Upload: `public/favicon-32x32.png`
3. Download: `favicon.ico`
4. Save to: `public/favicon.ico`

## Step 4: Test

1. Hard refresh browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Check browser tab - favicon should appear
3. Test on mobile - add to home screen

## ✅ Done!

All configuration is already set up in:
- ✅ `app/layout.tsx` - Favicon metadata
- ✅ `public/site.webmanifest` - Web app manifest

Just create the image files and you're ready!

---

**Need help?** See `FAVICON_GENERATION_GUIDE.md` for detailed instructions.

