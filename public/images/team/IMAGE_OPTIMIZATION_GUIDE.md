# Head Chef Image Optimization Guide

## Image Requirements

The head chef image should be placed at: `/public/images/team/head-chef.jpg`

### Specifications:

1. **Crop Requirements:**
   - Remove the three circular dish insets at the bottom of the image
   - Keep only the chef holding the two wooden platters
   - Focus on the chef from waist up or full body with platters
   - Maintain professional composition

2. **Image Dimensions:**
   - **Recommended**: 1200x1200px (square) or 1200x1600px (portrait)
   - **Minimum**: 800x800px
   - **Aspect Ratio**: 1:1 (square) or 3:4 (portrait) preferred

3. **File Format:**
   - **Primary**: JPEG (`.jpg`)
   - **Quality**: 85-90% (high quality, optimized)
   - **File Size**: < 300KB (optimized)

4. **Image Optimization Steps:**

   ### Using Image Editing Software (Photoshop, GIMP, etc.):
   
   1. **Crop the Image:**
      - Remove bottom section with three circular dish insets
      - Keep chef and the two wooden platters she's holding
      - Ensure chef is centered or follows rule of thirds
   
   2. **Adjustments:**
      - **Brightness/Contrast**: Slight enhancement for professional look
      - **Color Grading**: Warm tones to match website palette
        - Slight increase in warmth (amber/gold tones)
        - Maintain natural skin tones
      - **Background**: 
        - Slight blur if background is distracting
        - Ensure chef and platters are in sharp focus
   
   3. **Export Settings:**
      - Format: JPEG
      - Quality: 85-90%
      - Color Space: sRGB
      - Resolution: 72-96 DPI (web standard)

   ### Using Online Tools:
   
   **Recommended Tools:**
   - **TinyPNG** (tinypng.com) - Compress after editing
   - **Squoosh** (squoosh.app) - Google's image optimizer
   - **ImageOptim** (imageoptim.com) - Mac app
   
   **Steps:**
   1. Crop image using any image editor
   2. Upload to TinyPNG or Squoosh
   3. Adjust quality slider to 85-90%
   4. Download optimized version
   5. Save as `head-chef.jpg` in `/public/images/team/`

5. **Background Enhancement (Optional):**
   
   If the background needs improvement:
   - Apply subtle blur (bokeh effect) to background
   - Keep chef and platters in sharp focus
   - Ensure background doesn't compete with subject
   - Consider adding subtle vignette for focus

6. **Color Grading to Match Website:**
   
   The website uses a warm, elegant color palette:
   - **Primary**: Deep burgundy (#8B1538)
   - **Secondary**: Warm gold (#D4AF37)
   - **Neutral**: Cream (#FAF7F2)
   - **Dark**: Rich charcoal (#1C1917)
   
   **Adjustments:**
   - Slight warm tone adjustment (+5-10 warmth)
   - Maintain natural colors
   - Ensure chef's white jacket appears clean and bright
   - Food colors should appear appetizing and natural

## File Placement

Once optimized, place the image at:
```
/public/images/team/head-chef.jpg
```

## Testing

After placing the image:
1. Run `npm run dev` to test locally
2. Check image loads correctly in IntroSection
3. Verify image looks good on mobile and desktop
4. Ensure proper cropping (no bottom dishes visible)
5. Check image quality and file size

## Alternative Formats

If you have the image in other formats:
- **PNG**: Convert to JPEG for smaller file size
- **WebP**: Can be used but ensure JPEG fallback
- **RAW**: Export as JPEG with above specifications

## Notes

- The image will be displayed using Next.js Image component with automatic optimization
- Responsive sizing is handled automatically
- Blur placeholder is included for smooth loading
- Image is set to `priority` loading for above-the-fold display

