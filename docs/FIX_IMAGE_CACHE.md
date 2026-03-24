# Fix Image Cache Issue

## Problem
The uploaded image isn't showing because Next.js caches optimized images.

## Solution

### Step 1: Clear Next.js Cache
```bash
rm -rf .next
```

### Step 2: Clear Browser Cache
- **Chrome/Edge**: Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
- **Safari**: Press `Cmd+Option+R`
- **Firefox**: Press `Cmd+Shift+R` (Mac) or `Ctrl+F5` (Windows)

### Step 3: Restart Development Server
```bash
npm run dev
```

### Step 4: Verify Image File
The image should be at:
```
/public/images/team/head-chef.jpg
```

Current file info:
- Size: 1.3MB
- Dimensions: 3022x2269 pixels
- Format: JPEG
- Status: ✅ Valid image file

## Alternative: Force Image Refresh
If the above doesn't work, you can temporarily rename the image file to force a refresh:
1. Rename `head-chef.jpg` to `head-chef-new.jpg`
2. Update the path in `components/about/TeamGrid.tsx` line 25
3. After confirming it works, rename back to `head-chef.jpg`
