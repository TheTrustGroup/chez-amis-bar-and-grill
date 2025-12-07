# Favicon Setup Guide

## Logo Image Required

To complete the favicon setup, you need to convert your logo image to the following formats:

### Required Files:

1. **favicon.ico** (16x16, 32x32, 48x48 multi-size ICO file)
   - Location: `/public/favicon.ico`
   - Format: ICO (multi-resolution)
   - Sizes: 16x16, 32x32, 48x48 pixels

2. **icon.svg** (Scalable vector icon)
   - Location: `/public/icon.svg`
   - Format: SVG
   - Already created with simplified logo design

3. **apple-touch-icon.png** (Apple devices)
   - Location: `/public/apple-touch-icon.png`
   - Format: PNG
   - Size: 180x180 pixels
   - For iOS home screen

### Logo Description:
- Red fork and spoon crossed
- Black banner with "Chez Amis" and "BAR & GRILL" text
- White background

### Conversion Tools:

1. **Online Tools:**
   - https://favicon.io/ - Convert PNG to ICO
   - https://realfavicongenerator.net/ - Generate all favicon formats
   - https://www.favicon-generator.org/ - Multi-format generator

2. **Manual Conversion:**
   - Use ImageMagick: `convert logo.png -resize 32x32 favicon.ico`
   - Use Photoshop/GIMP to export as ICO
   - Use online SVG to ICO converters

### Steps:

1. **Prepare Logo Image:**
   - Ensure logo is on transparent or white background
   - Square aspect ratio (1:1)
   - High resolution (at least 512x512px)

2. **Generate Favicon Files:**
   - Upload logo to https://realfavicongenerator.net/
   - Download generated files
   - Place in `/public/` directory

3. **File Structure:**
```
/public/
  ├── favicon.ico          (Multi-size ICO)
  ├── icon.svg             (SVG icon - already created)
  └── apple-touch-icon.png (180x180 PNG)
```

4. **Test:**
   - Clear browser cache
   - Check favicon appears in browser tab
   - Test on mobile devices

### Current Status:
- ✅ Metadata configured in `app/layout.tsx`
- ✅ SVG icon created (simplified version)
- ⏳ Waiting for actual logo image files

### Next Steps:
1. Locate your logo image file
2. Convert to required formats
3. Place files in `/public/` directory
4. Restart dev server

